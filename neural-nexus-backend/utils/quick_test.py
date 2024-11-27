# utils/quick_test.py

from neural_nexus_helper import NeuralNexusHelper
import os
from dotenv import load_dotenv

def quick_test_component(component_name: str, code: str):
    """Quick test for a specific component"""
    load_dotenv()
    helper = NeuralNexusHelper(os.getenv('ANTHROPIC_API_KEY'))

    # Get feedback on implementation
    print(f"\n=== Checking {component_name} Implementation ===")
    feedback = helper.check_implementation(code, component_name)
    print(feedback)

    # Get additional guidance
    print(f"\n=== Getting Additional Guidance for {component_name} ===")
    question = f"What are the key considerations for implementing the {component_name} component?"
    guidance = helper.ask_development_question(question)
    print(guidance)

# Example usage
if __name__ == "__main__":
    # Test ROI Calculator component
    test_code = """
    class ROICalculatorViewSet(viewsets.ModelViewSet):
        queryset = ROICalculation.objects.all()
        serializer_class = ROICalculatorSerializer

        def create(self, request):
            data = request.data
            calculation = ROICalculation.objects.create(
                company_size=data['company_size'],
                industry=data['industry'],
                current_costs=data['current_costs']
            )
            return Response(self.serializer_class(calculation).data)
    """

    quick_test_component("ROICalculator", test_code)
