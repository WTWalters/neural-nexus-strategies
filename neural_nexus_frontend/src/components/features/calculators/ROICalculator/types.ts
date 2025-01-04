// Path: neural_nexus_frontend/src/components/features/calculators/ROICalculator/types.ts

export interface ROICalculatorProps {
  onCalculate?: (roi: number) => void;
  className?: string;
}

export interface ROIFormData {
  investment: number;
  returns: number;
}
