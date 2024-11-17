# leads/views.py

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from .models import Contact, ROICalculation
from .calculator import ROICalculator
from .serializers import ROICalculatorInputSerializer, ROICalculationSerializer
from .exports import ROIReportGenerator

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
