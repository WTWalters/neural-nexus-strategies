# leads/views.py

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.db import transaction
from django.core.mail import send_mail
from .models import Contact, ROICalculation, Interaction, NewsletterSubscription
from .calculator import ROICalculator
from .serializers import ROICalculatorInputSerializer, ROICalculationSerializer, NewsletterSubscriptionSerializer, LeadScoreSerializer
from .exports import ROIReportGenerator
from .services.contact_management import ContactManagementService
from .services.device_tracking import DeviceTrackingService
from .services.lead_scoring import LeadScoringService
import logging

logger = logging.getLogger(__name__)

# Add ContactFormView
class ContactFormView(APIView):
    def post(self, request):
        try:
            with transaction.atomic():
                # Extract base contact data
                contact_data = {
                    'first_name': request.data.get('firstName', '').strip(),
                    'last_name': request.data.get('lastName', '').strip(),
                    'email': request.data.get('email', '').lower().strip(),
                    'company': request.data.get('company', '').strip(),
                    'phone': request.data.get('phone', '').strip(),
                    'source': 'WEBSITE'
                }

                # Extract tracking data
                tracking_data = request.data.get('tracking', {})
                device_id = tracking_data.get('deviceId')
                device_info = tracking_data.get('deviceInfo', {})

                # Create or update contact with identity
                contact, created = ContactManagementService.create_contact_with_identity(
                    **contact_data
                )

                # Track device if we have device info
                if device_id and contact.identity:
                    DeviceTrackingService.track_device(
                        identity=contact.identity,
                        fingerprint=device_id,
                        user_agent=device_info.get('userAgent')
                    )

                # Create interaction record
                Interaction.objects.create(
                    contact=contact,
                    type='FORM',
                    description=request.data.get('message', '')
                )

                # Send email notification
                try:
                    send_mail(
                        subject=f'New Contact Form Submission: {contact.first_name} {contact.last_name}',
                        message=f"""
                        New contact form submission received:

                        Name: {contact.first_name} {contact.last_name}
                        Email: {contact.email}
                        Company: {contact.company}
                        Phone: {contact.phone}

                        Message:
                        {request.data.get('message', '')}
                        """,
                        from_email='noreply@neuralnexus.ai',
                        recipient_list=['whitney.walters@gmail.com'],
                        fail_silently=True,
                    )
                except Exception as e:
                    logger.error(f"Failed to send email notification: {str(e)}")

                return Response({
                    'status': 'success',
                    'message': 'Thank you for your message. We will contact you soon.'
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Error processing contact form: {str(e)}")
            return Response({
                'status': 'error',
                'message': 'There was an error processing your request. Please try again.'
            }, status=status.HTTP_400_BAD_REQUEST)



class ROICalculatorViewSet(viewsets.ModelViewSet):
    """
    ViewSet for ROI calculations with export functionality
    """
    queryset = ROICalculation.objects.all()
    serializer_class = ROICalculationSerializer

    def create(self, request):
        """Calculate and store ROI metrics"""
        serializer = ROICalculatorInputSerializer(data=request.data)

        if serializer.is_valid():
            contact = get_object_or_404(Contact, id=serializer.validated_data['contact_id'])

            # Calculate ROI metrics
            calculator = ROICalculator(serializer.validated_data, contact.id)
            roi_metrics = calculator.calculate_roi()

            # Create ROI calculation record
            calculation = ROICalculation.objects.create(
                contact=contact,
                annual_revenue=serializer.validated_data['annual_revenue'],
                data_team_size=serializer.validated_data['data_team_size'],
                avg_salary=serializer.validated_data['avg_salary'],
                manual_hours_weekly=serializer.validated_data['manual_hours_weekly'],
                report_turnaround_days=serializer.validated_data['report_turnaround_days'],
                completion_rate=serializer.validated_data['completion_rate'],
                data_request_backlog=serializer.validated_data['data_request_backlog'],
                current_tools_cost=serializer.validated_data['current_tools_cost'],
                projected_time_savings=roi_metrics.projected_time_savings,
                projected_completion_rate=roi_metrics.projected_completion_rate,
                labor_cost_savings=roi_metrics.labor_cost_savings,
                efficiency_savings=roi_metrics.efficiency_savings,
                total_annual_savings=roi_metrics.total_annual_savings,
                roi_percentage=roi_metrics.roi_percentage,
                payback_months=roi_metrics.payback_months
            )

            return Response(
                ROICalculationSerializer(calculation).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def excel(self, request, pk=None):
        """Generate Excel report for ROI calculation"""
        calculation = self.get_object()
        generator = ROIReportGenerator(calculation)
        excel_file = generator.generate_excel()

        response = HttpResponse(
            excel_file.read(),
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        filename = f"ROI_Analysis_{calculation.contact.company}_{calculation.created_at.strftime('%Y%m%d')}.xlsx"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response

    @action(detail=True, methods=['get'])
    def pdf(self, request, pk=None):
        """Generate PDF report for ROI calculation"""
        calculation = self.get_object()
        generator = ROIReportGenerator(calculation)
        pdf_file = generator.generate_pdf()

        response = HttpResponse(pdf_file.read(), content_type='application/pdf')
        filename = f"ROI_Analysis_{calculation.contact.company}_{calculation.created_at.strftime('%Y%m%d')}.pdf"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response

    @action(detail=False, methods=['get'])
    def contact_calculations(self, request):
        """Get ROI calculations for a specific contact"""
        contact_id = request.query_params.get('contact_id')
        if contact_id:
            calculations = self.queryset.filter(contact_id=contact_id)
            serializer = self.get_serializer(calculations, many=True)
            return Response(serializer.data)
        return Response(
            {"error": "contact_id is required"},
            status=status.HTTP_400_BAD_REQUEST
        )


class NewsletterSubscriptionView(APIView):
    def post(self, request):
        try:
            # Basic validation
            email = request.data.get('email', '').lower().strip()
            first_name = request.data.get('firstName', '').strip()
            source = request.data.get('source', 'BANNER')

            if not email or not first_name:
                return Response(
                    {'message': 'Email and first name are required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check for existing subscription
            if NewsletterSubscription.objects.filter(email=email).exists():
                return Response(
                    {'message': 'This email is already subscribed'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create subscription
            subscription = NewsletterSubscription.objects.create(
                email=email,
                first_name=first_name,
                source=source,
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )

            return Response(
                {'message': 'Successfully subscribed to newsletter'},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return Response(
                {'message': 'An error occurred while processing your subscription'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class LeadScoringView(APIView):
    def get(self, request, contact_id):
        try:
            contact = Contact.objects.get(id=contact_id)
            scores = LeadScoringService.calculate_scores(contact)
            total_score = LeadScoringService.get_total_score(contact)

            # Get historical scores
            historical_scores = LeadScore.objects.filter(contact=contact).order_by('-created_at')
            historical_data = LeadScoreSerializer(historical_scores, many=True).data

            return Response({
                'total_score': total_score,
                'current_scores': scores,
                'historical_scores': historical_data
            })
        except Contact.DoesNotExist:
            return Response(
                {'error': 'Contact not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error calculating lead scores: {str(e)}")
            return Response(
                {'error': 'Error calculating scores'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
