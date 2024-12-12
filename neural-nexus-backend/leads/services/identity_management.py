# neural-nexus-backend/leads/services/identity_management.py

# neural-nexus-backend/leads/services/identity_management.py

# neural-nexus-backend/leads/services/identity_management.py

from django.db import transaction
from django.utils import timezone
from typing import Optional
from ..models import Identity, IdentityEmail, IdentityDevice

class IdentityMergeService:
    def __init__(self, primary_identity: Identity, secondary_identity: Identity):
        self.primary = primary_identity
        self.secondary = secondary_identity

    def validate_merge(self) -> list[str]:
        """
        Validate that the merge can proceed.
        Returns list of validation errors, empty if valid.
        """
        errors = []

        if self.primary == self.secondary:
            errors.append("Cannot merge an identity with itself")

        if self.primary.merged_with:
            errors.append("Primary identity has already been merged")

        if self.secondary.merged_with:
            errors.append("Secondary identity has already been merged")

        return errors

    @transaction.atomic
    def merge(self) -> tuple[bool, Optional[str]]:
        """
        Merge the secondary identity into the primary identity.
        Returns (success, error_message)
        """
        # Validate merge
        errors = self.validate_merge()
        if errors:
            return False, errors[0]

        try:
            # Merge emails - keep primary's email as primary
            secondary_emails = IdentityEmail.objects.filter(identity=self.secondary)
            # First, mark all secondary emails as non-primary
            secondary_emails.update(is_primary=False)
            # Then move them to primary identity
            secondary_emails.update(identity=self.primary)

            # Merge devices
            IdentityDevice.objects.filter(
                identity=self.secondary
            ).update(
                identity=self.primary
            )

            # Update secondary identity to mark as merged
            self.secondary.merged_with = self.primary
            self.secondary.is_active = False
            self.secondary.save(update_fields=['merged_with', 'is_active'])

            # If secondary had a primary email and primary doesn't, adopt it
            if (self.secondary.primary_email and not self.primary.primary_email):
                self.primary.primary_email = self.secondary.primary_email
                self.primary.save(update_fields=['primary_email'])

            # Update consent if secondary had more recent consent
            if (self.secondary.consent_updated_at and
                (not self.primary.consent_updated_at or
                 self.secondary.consent_updated_at > self.primary.consent_updated_at)):
                self.primary.marketing_consent = self.secondary.marketing_consent
                self.primary.analytics_consent = self.secondary.analytics_consent
                self.primary.consent_updated_at = self.secondary.consent_updated_at
                self.primary.save(update_fields=[
                    'marketing_consent',
                    'analytics_consent',
                    'consent_updated_at'
                ])

            # Verify the merge
            verification = self.verify_merge()
            if not verification[0]:
                raise Exception(verification[1])

            return True, None

        except Exception as e:
            return False, str(e)

    def verify_merge(self) -> tuple[bool, Optional[str]]:
        """
        Verify that the merge was successful.
        Returns (success, error_message)
        """
        try:
            # Refresh from database
            self.primary.refresh_from_db()
            self.secondary.refresh_from_db()

            # 1. Verify secondary is properly marked
            if not self.secondary.merged_with == self.primary:
                return False, "Secondary identity not properly marked as merged"
            if self.secondary.is_active:
                return False, "Secondary identity still marked as active"

            # 2. Verify emails
            primary_emails = self.primary.emails.all()
            secondary_emails = self.secondary.emails.all()

            # Check no emails left on secondary
            if secondary_emails.exists():
                return False, "Secondary identity still has emails"

            # Check only one primary email
            primary_email_count = primary_emails.filter(is_primary=True).count()
            if primary_email_count != 1:
                return False, f"Invalid number of primary emails: {primary_email_count}"

            # 3. Verify devices
            if self.secondary.devices.exists():
                return False, "Secondary identity still has devices"

            # All verifications passed
            return True, None

        except Exception as e:
            return False, f"Verification failed: {str(e)}"
