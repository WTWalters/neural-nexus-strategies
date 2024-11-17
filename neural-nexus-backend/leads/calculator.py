from decimal import Decimal
from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class ROIMetrics:
    """Calculated ROI metrics for NNS services"""
    projected_time_savings: int
    projected_completion_rate: int
    labor_cost_savings: Decimal
    efficiency_savings: Decimal
    total_annual_savings: Decimal
    roi_percentage: Decimal
    payback_months: int

class ROICalculator:
    """Calculate ROI metrics for NNS services"""

    # Constants based on NNS service impact analysis
    TIME_SAVINGS_RATE = Decimal('0.60')  # 60% reduction in manual tasks
    COMPLETION_RATE_IMPROVEMENT = 30      # 30% improvement in completion rate
    MAX_COMPLETION_RATE = 95             # Maximum completion rate
    REVENUE_IMPACT_RATE = Decimal('0.001')  # 0.1% of revenue per 1% improvement
    IMPLEMENTATION_COST_MULTIPLIER = Decimal('1.5')  # Implementation cost estimate

    def __init__(self, data: Dict[str, Any], contact_id: int):
        """Initialize with validated input data and contact ID"""
        self.data = {k: Decimal(str(v)) if isinstance(v, (int, float)) and v is not None else v
                    for k, v in data.items()}
        self.contact_id = contact_id

    def calculate_labor_savings(self, projected_time_savings: int) -> Decimal:
        """Calculate annual labor cost savings"""
        yearly_hours = Decimal('2080')  # 52 weeks * 40 hours
        hourly_rate = self.data['avg_salary'] / yearly_hours
        annual_hours_saved = Decimal(str(projected_time_savings * 52))  # yearly savings

        return annual_hours_saved * hourly_rate * Decimal(str(self.data['data_team_size']))

    def calculate_efficiency_impact(self, completion_rate_improvement: int) -> Decimal:
        """Calculate savings from improved efficiency"""
        return self.data['annual_revenue'] * (Decimal(str(completion_rate_improvement)) * self.REVENUE_IMPACT_RATE)

    def calculate_roi(self) -> ROIMetrics:
        """Calculate complete ROI metrics"""
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
