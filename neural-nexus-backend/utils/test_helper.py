 #utils/test_helper.py

from neural_nexus_helper import NeuralNexusHelper
import os
from dotenv import load_dotenv

def test_neural_nexus_helper():
    # Load environment variables
    load_dotenv()

    # Initialize helper
    helper = NeuralNexusHelper(os.getenv('ANTHROPIC_API_KEY'))

    # Test 1: ROI Calculator API Structure
    print("\n=== ROI Calculator API Design ===")
    response = helper.ask_development_question(
        "How should we structure the ROI calculator API endpoints and data models based on our requirements?"
    )
    print(response)

    # Test 2: Implementation Review
    print("\n=== Implementation Review ===")
    example_code = """
    from rest_framework import viewsets
    from .models import ROICalculation
    from .serializers import ROICalculatorSerializer

    class ROICalculatorViewSet(viewsets.ModelViewSet):
        queryset = ROICalculation.objects.all()
        serializer_class = ROICalculatorSerializer

        def create(self, request):
            data = request.data
            calculation = ROICalculation.objects.create(
                company_size=data['company_size'],
                industry=data['industry'],
                current_costs=data['current_costs'],
                service_type=data['service_type']
            )
            result = self.calculate_roi(calculation)
            calculation.result = result
            calculation.save()
            return Response(self.serializer_class(calculation).data)

        def calculate_roi(self, calculation):
            # Basic calculation
            base_savings = calculation.current_costs * 0.15
            return {
                'annual_savings': base_savings,
                'roi_percentage': (base_savings / calculation.current_costs) * 100
            }
    """
    feedback = helper.check_implementation(example_code, "ROICalculator")
    print(feedback)

if __name__ == "__main__":
    test_neural_nexus_helper()
