# leads/services/lead_scoring.py

from django.db import transaction
from django.db.models import Sum
from django.utils import timezone
from typing import Dict, List
from ..models import Contact, LeadScore, Interaction, ROICalculation

class LeadScoringService:
    # Score weights for different types
    DEMOGRAPHIC_WEIGHTS = {
        'company_size': 15,
        'industry_match': 20,
        'complete_profile': 10
    }

    BEHAVIORAL_WEIGHTS = {
        'roi_calculation': 25,
        'contact_form': 15,
        'resource_download': 10
    }

    ENGAGEMENT_WEIGHTS = {
        'interaction_frequency': 20,
        'recency': 15,
        'newsletter_subscription': 10
    }

    @staticmethod
    @transaction.atomic
    def calculate_scores(contact: Contact) -> Dict[str, int]:
        """Calculate and store all score types for a contact."""
        scores = {
            'DEMOGRAPHIC': LeadScoringService._calculate_demographic_score(contact),
            'BEHAVIORAL': LeadScoringService._calculate_behavioral_score(contact),
            'ENGAGEMENT': LeadScoringService._calculate_engagement_score(contact)
        }

        # Store each score type
        for score_type, score_data in scores.items():
            LeadScore.objects.create(
                contact=contact,
                score_type=score_type,
                score=score_data['score'],
                reason=score_data['reason']
            )

        return scores

    @staticmethod
    def _calculate_demographic_score(contact: Contact) -> Dict[str, any]:
        score = 0
        reasons = []

        # Company size scoring
        if contact.company_size:
            if contact.company_size in ['500-1000', '1000+']:
                score += LeadScoringService.DEMOGRAPHIC_WEIGHTS['company_size']
                reasons.append('Large enterprise')
            elif contact.company_size in ['100-500']:
                score += LeadScoringService.DEMOGRAPHIC_WEIGHTS['company_size'] * 0.7
                reasons.append('Mid-size company')

        # Industry scoring
        target_industries = ['Healthcare', 'Manufacturing', 'Financial Services']
        if contact.industry in target_industries:
            score += LeadScoringService.DEMOGRAPHIC_WEIGHTS['industry_match']
            reasons.append(f'Target industry: {contact.industry}')

        # Profile completeness
        profile_fields = [
            contact.first_name, contact.last_name, contact.email,
            contact.company, contact.phone, contact.job_title
        ]
        completeness = sum(1 for f in profile_fields if f) / len(profile_fields)
        profile_score = LeadScoringService.DEMOGRAPHIC_WEIGHTS['complete_profile'] * completeness
        score += profile_score
        reasons.append(f'Profile {int(completeness * 100)}% complete')

        return {
            'score': min(100, int(score)),
            'reason': '; '.join(reasons)
        }

    @staticmethod
    def _calculate_behavioral_score(contact: Contact) -> Dict[str, any]:
        score = 0
        reasons = []

        # ROI Calculator usage
        roi_calcs = ROICalculation.objects.filter(contact=contact).count()
        if roi_calcs > 0:
            score += LeadScoringService.BEHAVIORAL_WEIGHTS['roi_calculation']
            reasons.append(f'Used ROI calculator {roi_calcs} times')

        # Contact form submissions
        form_submissions = Interaction.objects.filter(
            contact=contact,
            type='FORM'
        ).count()
        if form_submissions > 0:
            score += LeadScoringService.BEHAVIORAL_WEIGHTS['contact_form']
            reasons.append('Submitted contact form')

        # Resource downloads
        downloads = Interaction.objects.filter(
            contact=contact,
            type='DOWNLOAD'
        ).count()
        if downloads > 0:
            score += LeadScoringService.BEHAVIORAL_WEIGHTS['resource_download'] * min(downloads, 3)
            reasons.append(f'Downloaded {downloads} resources')

        return {
            'score': min(100, int(score)),
            'reason': '; '.join(reasons)
        }

    @staticmethod
    def _calculate_engagement_score(contact: Contact) -> Dict[str, any]:
        score = 0
        reasons = []

        # Interaction frequency
        interactions = Interaction.objects.filter(contact=contact)
        interaction_count = interactions.count()

        if interaction_count > 0:
            # Frequency score
            if interaction_count >= 5:
                score += LeadScoringService.ENGAGEMENT_WEIGHTS['interaction_frequency']
            else:
                score += (interaction_count / 5) * LeadScoringService.ENGAGEMENT_WEIGHTS['interaction_frequency']
            reasons.append(f'{interaction_count} total interactions')

            # Recency score
            last_interaction = interactions.order_by('-created_at').first()
            days_since = (timezone.now() - last_interaction.created_at).days
            if days_since <= 7:
                score += LeadScoringService.ENGAGEMENT_WEIGHTS['recency']
            elif days_since <= 30:
                score += LeadScoringService.ENGAGEMENT_WEIGHTS['recency'] * 0.5
            reasons.append(f'Last interaction {days_since} days ago')

        # Newsletter subscription
        if hasattr(contact, 'identity') and contact.identity:
            if contact.identity.marketing_consent:
                score += LeadScoringService.ENGAGEMENT_WEIGHTS['newsletter_subscription']
                reasons.append('Newsletter subscriber')

        return {
            'score': min(100, int(score)),
            'reason': '; '.join(reasons)
        }

    @staticmethod
    def get_total_score(contact: Contact) -> int:
        """Calculate weighted total score across all types."""
        return LeadScore.objects.filter(contact=contact).aggregate(
            total=Sum('score'))['total'] or 0
