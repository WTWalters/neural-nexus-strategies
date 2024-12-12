"""ROI report generation utilities for Neural Nexus Solutions.

This module provides functionality to generate ROI (Return on Investment) analysis
reports in various formats including Excel and PDF. It uses the ROICalculation model
to generate detailed reports with company information, current state metrics, and
projected ROI results.

Example usage:
    calculation = ROICalculation.objects.get(id=1)
    generator = ROIReportGenerator(calculation)

    # Generate Excel report
    excel_buffer = generator.generate_excel()

    # Generate PDF report
    pdf_buffer = generator.generate_pdf()

Typical usage example:
    from leads.exports import ROIReportGenerator
    from leads.models import ROICalculation

    def export_roi_report(calculation_id: int, format: str) -> BytesIO:
        calculation = ROICalculation.objects.get(id=calculation_id)
        generator = ROIReportGenerator(calculation)

        if format == 'excel':
            return generator.generate_excel()
        return generator.generate_pdf()
"""


from datetime import datetime
from decimal import Decimal
import xlsxwriter
from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from .models import ROICalculation

class ROIReportGenerator:
    """Generates ROI analysis reports in Excel and PDF formats.

    This class handles the generation of detailed ROI analysis reports,
    formatting data for presentation, and creating professional-looking
    documents for client distribution.

    Attributes:
        calculation: ROICalculation instance containing analysis data
        contact: Contact instance associated with the ROI calculation
    """

    def __init__(self, calculation: ROICalculation):
        """Initializes the report generator with an ROI calculation.

               Args:
                   calculation: ROICalculation instance to generate reports from
        """
        self.calculation = calculation
        self.contact = calculation.contact
        self.calculation = calculation
        self.contact = calculation.contact

    def format_currency(self, value: Decimal) -> str:
        """Formats decimal values as USD currency strings.

        Args:
            value: Decimal value to format as currency

        Returns:
            str: Formatted currency string (e.g., "$1,234.56")
        """
        return "${:,.2f}".format(value)

    def generate_excel(self) -> BytesIO:
        """Generates an Excel workbook containing the ROI analysis.

        Creates a formatted Excel report with company information,
        current state metrics, and ROI analysis results.

        Returns:
            BytesIO: Buffer containing the generated Excel workbook

        Note:
            The generated Excel file includes:
            - Company information
            - Current state metrics
            - Projected improvements
            - ROI calculations
        """
        buffer = BytesIO()
        workbook = xlsxwriter.Workbook(buffer)
        worksheet = workbook.add_worksheet("ROI Analysis")

        # Formats
        header_format = workbook.add_format({
            'bold': True,
            'font_size': 12,
            'bg_color': '#4F81BD',
            'font_color': 'white',
            'align': 'center',
            'border': 1
        })

        cell_format = workbook.add_format({
            'font_size': 11,
            'align': 'left',
            'border': 1
        })

        number_format = workbook.add_format({
            'font_size': 11,
            'align': 'right',
            'border': 1,
            'num_format': '$#,##0.00'
        })

        percent_format = workbook.add_format({
            'font_size': 11,
            'align': 'right',
            'border': 1,
            'num_format': '0.0%'
        })

        # Company Information
        worksheet.write('A1', 'Company Information', header_format)
        worksheet.write('A2', 'Company:', cell_format)
        worksheet.write('B2', self.contact.company, cell_format)
        worksheet.write('A3', 'Contact:', cell_format)
        worksheet.write('B3', f"{self.contact.first_name} {self.contact.last_name}", cell_format)
        worksheet.write('A4', 'Industry:', cell_format)
        worksheet.write('B4', self.contact.industry, cell_format)

        # Current State
        worksheet.write('A6', 'Current State', header_format)
        current_state_data = [
            ['Annual Revenue', self.calculation.annual_revenue, number_format],
            ['Data Team Size', self.calculation.data_team_size, cell_format],
            ['Manual Hours Weekly', self.calculation.manual_hours_weekly, cell_format],
            ['Current Completion Rate', self.calculation.completion_rate/100, percent_format],
            ['Current Tools Cost', self.calculation.current_tools_cost, number_format]
        ]

        row = 7
        for item in current_state_data:
            worksheet.write(f'A{row}', item[0], cell_format)
            worksheet.write(f'B{row}', item[1], item[2])
            row += 1

        # ROI Results
        worksheet.write('A11', 'ROI Analysis Results', header_format)
        roi_data = [
            ['Time Savings (hours/week)', self.calculation.projected_time_savings, cell_format],
            ['Projected Completion Rate', self.calculation.projected_completion_rate/100, percent_format],
            ['Labor Cost Savings', self.calculation.labor_cost_savings, number_format],
            ['Efficiency Savings', self.calculation.efficiency_savings, number_format],
            ['Total Annual Savings', self.calculation.total_annual_savings, number_format],
            ['ROI', self.calculation.roi_percentage/100, percent_format],
            ['Payback Period (months)', self.calculation.payback_months, cell_format]
        ]

        row = 12
        for item in roi_data:
            worksheet.write(f'A{row}', item[0], cell_format)
            worksheet.write(f'B{row}', item[1], item[2])
            row += 1

        # Adjust column widths
        worksheet.set_column('A:A', 30)
        worksheet.set_column('B:B', 20)

        workbook.close()
        buffer.seek(0)
        return buffer

    def generate_pdf(self) -> BytesIO:
        """Generates a PDF document containing the ROI analysis.

                Creates a professionally formatted PDF report with company information,
                ROI results, and data visualizations.

                Returns:
                    BytesIO: Buffer containing the generated PDF document

                Note:
                    The generated PDF includes:
                    - Company header and information
                    - ROI summary table
                    - Formatted metrics and calculations
                    - Professional styling and layout
                """
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter,
                              rightMargin=72, leftMargin=72,
                              topMargin=72, bottomMargin=72)

        # Styles
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30
        )
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=16,
            spaceAfter=12
        )

        # Build the document
        elements = []

        # Title
        elements.append(Paragraph(
            f"ROI Analysis Report for {self.contact.company}",
            title_style
        ))

        # Company Information
        elements.append(Paragraph("Company Information", heading_style))
        company_data = [
            ["Company", self.contact.company],
            ["Contact", f"{self.contact.first_name} {self.contact.last_name}"],
            ["Industry", self.contact.industry or "N/A"]
        ]
        elements.append(Table(company_data, colWidths=[2*inch, 4*inch]))
        elements.append(Spacer(1, 20))

        # ROI Results
        elements.append(Paragraph("ROI Analysis Results", heading_style))
        roi_data = [
            ["Metric", "Value"],
            ["Annual Savings", self.format_currency(self.calculation.total_annual_savings)],
            ["ROI Percentage", f"{self.calculation.roi_percentage}%"],
            ["Payback Period", f"{self.calculation.payback_months} months"]
        ]

        roi_table = Table(roi_data, colWidths=[3*inch, 3*inch])
        roi_table.setStyle(TableStyle([
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 9),
        ]))
        elements.append(roi_table)

        doc.build(elements)
        buffer.seek(0)
        return buffer
