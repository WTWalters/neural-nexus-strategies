"""ROI calculation engine for Neural Nexus Solutions.

This module provides functionality for calculating Return on Investment (ROI)
metrics for Neural Nexus services, including time savings, efficiency improvements,
and financial projections.

Typical usage example:
    data = {
        'manual_hours_weekly': 40,
        'completion_rate': 65,
        'avg_salary': 85000,
        'data_team_size': 5,
        'annual_revenue': 1000000,
        'current_tools_cost': 50000
    }
    calculator = ROICalculator(data, contact_id=1)
    metrics = calculator.calculate_roi()
    print(f"Annual Savings: ${metrics.total_annual_savings:,.2f}")
"""

from decimal import Decimal
from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class ROIMetrics:
    """Container for calculated ROI metrics.

        Attributes:
            projected_time_savings: Weekly hours saved through automation
            projected_completion_rate: Improved project completion percentage
            labor_cost_savings: Annual savings from reduced manual work
            efficiency_savings: Annual savings from improved efficiency
            total_annual_savings: Combined total annual savings
            roi_percentage: Return on investment as a percentage
            payback_months: Months required to recover implementation cost
        """
    projected_time_savings: int
    projected_completion_rate: int
    labor_cost_savings: Decimal
    efficiency_savings: Decimal
    total_annual_savings: Decimal
    roi_percentage: Decimal
    payback_months: int

class ROICalculator:
    """Calculates ROI metrics for Neural Nexus services.

        This calculator uses empirical data and industry standards to project
        potential savings and ROI from implementing Neural Nexus solutions.

        Attributes:
            TIME_SAVINGS_RATE: Expected reduction in manual task time (60%)
            COMPLETION_RATE_IMPROVEMENT: Expected improvement in completion rate (30%)
            MAX_COMPLETION_RATE: Maximum achievable completion rate (95%)
            REVENUE_IMPACT_RATE: Revenue impact per 1% improvement (0.1%)
            IMPLEMENTATION_COST_MULTIPLIER: Implementation cost estimate multiplier (1.5x)
        """

    # Constants based on NNS service impact analysis
    TIME_SAVINGS_RATE = Decimal('0.60')  # 60% reduction in manual tasks
    COMPLETION_RATE_IMPROVEMENT = 30      # 30% improvement in completion rate
    MAX_COMPLETION_RATE = 95             # Maximum completion rate
    REVENUE_IMPACT_RATE = Decimal('0.001')  # 0.1% of revenue per 1% improvement
    IMPLEMENTATION_COST_MULTIPLIER = Decimal('1.5')  # Implementation cost estimate

    def __init__(self, data: Dict[str, Any], contact_id: int):
        """Initializes calculator with input data and contact information.

        Args:
            data: Dictionary containing ROI calculation inputs
            contact_id: Unique identifier for the contact

        Note:
            Expected data dictionary keys:
            - manual_hours_weekly: Current manual hours spent
            - completion_rate: Current project completion rate
            - avg_salary: Average team member salary
            - data_team_size: Number of team members
            - annual_revenue: Company annual revenue
            - current_tools_cost: Current technology spend
        """
        self.data = {k: Decimal(str(v)) if isinstance(v, (int, float)) and v is not None else v
                    for k, v in data.items()}
        self.contact_id = contact_id

    def calculate_labor_savings(self, projected_time_savings: int) -> Decimal:
        """Calculates annual cost savings from reduced manual labor.

                Args:
                    projected_time_savings: Weekly hours saved through automation

                Returns:
                    Decimal: Annual labor cost savings

                Note:
                    Calculation assumes a standard 2080-hour work year
                    (52 weeks × 40 hours).
                """
        yearly_hours = Decimal('2080')  # 52 weeks * 40 hours
        hourly_rate = self.data['avg_salary'] / yearly_hours
        annual_hours_saved = Decimal(str(projected_time_savings * 52))  # yearly savings

        return annual_hours_saved * hourly_rate * Decimal(str(self.data['data_team_size']))

    def calculate_efficiency_impact(self, completion_rate_improvement: int) -> Decimal:
        """Calculates financial impact of improved efficiency.

                Args:
                    completion_rate_improvement: Percentage points improvement in completion rate

                Returns:
                    Decimal: Annual savings from improved efficiency
                """
        return self.data['annual_revenue'] * (Decimal(str(completion_rate_improvement)) * self.REVENUE_IMPACT_RATE)

    def calculate_roi(self) -> ROIMetrics:
        """Calculates complete set of ROI metrics.

                Returns:
                    ROIMetrics: Container with all calculated ROI metrics

                Note:
                    Calculations include:
                    - Time savings projections
                    - Completion rate improvements
                    - Labor and efficiency savings
                    - ROI percentage and payback period
                """
        # Calculate time savings
        projected_time_savings = int(self.data['manual_hours_weekly'] * self.TIME_SAVINGS_RATE)

        # Calculate completion rate improvement
        current_completion = self.data['completion_rate']
        projected_completion_rate = min(self.MAX_COMPLETION_RATE,
                                     current_completion + self.COMPLETION_RATE_IMPROVEMENT)
        completion_rate_improvement = projected_completion_rate - current_completion

        # Calculate savings
        labor_savings = self.calculate_labor_savings(projected_time_savings)
        efficiency_savings = self.calculate_efficiency_impact(completion_rate_improvement)

        # Calculate implementation cost and ROI
        implementation_cost = self.data['current_tools_cost'] * self.IMPLEMENTATION_COST_MULTIPLIER
        total_annual_savings = labor_savings + efficiency_savings

        # Calculate ROI percentage and payback period
        roi_percentage = (total_annual_savings / implementation_cost * Decimal('100')
                        if implementation_cost > 0 else Decimal('0'))

        payback_months = int((implementation_cost / total_annual_savings * Decimal('12'))
                           if total_annual_savings > 0 else 0)

        return ROIMetrics(
            projected_time_savings=projected_time_savings,
            projected_completion_rate=projected_completion_rate,
            labor_cost_savings=labor_savings,
            efficiency_savings=efficiency_savings,
            total_annual_savings=total_annual_savings,
            roi_percentage=roi_percentage,
            payback_months=payback_months
        )
