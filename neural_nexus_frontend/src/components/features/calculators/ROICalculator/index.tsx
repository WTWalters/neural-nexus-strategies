// src/components/features/calculators/ROICalculator/index.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ROICalculatorProps, ROIFormData } from "./types";

export const ROICalculator: React.FC<ROICalculatorProps> = ({
  onCalculate,
  className,
}) => {
  const [formData, setFormData] = useState<ROIFormData>({
    investment: 0,
    returns: 0,
  });
  const [roi, setRoi] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { investment, returns } = formData;

    if (investment > 0) {
      const calculatedRoi = ((returns - investment) / investment) * 100;
      setRoi(calculatedRoi);
      onCalculate?.(calculatedRoi);
    }
  };

  const handleInputChange =
    (field: keyof ROIFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: Number(e.target.value),
      }));
    };

  return (
    <div className={cn("w-full max-w-md space-y-6", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="investment">Initial Investment</Label>
          <Input
            id="investment"
            type="number"
            value={formData.investment}
            onChange={handleInputChange("investment")}
            placeholder="Enter initial investment"
            min="0"
            required
            aria-describedby="investment-description"
          />
          <p
            id="investment-description"
            className="text-sm text-muted-foreground"
          >
            Enter the amount you plan to invest
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="returns">Expected Returns</Label>
          <Input
            id="returns"
            type="number"
            value={formData.returns}
            onChange={handleInputChange("returns")}
            placeholder="Enter expected returns"
            min="0"
            required
            aria-describedby="returns-description"
          />
          <p id="returns-description" className="text-sm text-muted-foreground">
            Enter the expected total return amount
          </p>
        </div>

        <Button type="submit" className="w-full">
          Calculate ROI
        </Button>

        {roi !== null && (
          <div
            className="mt-6 p-4 rounded-lg bg-muted"
            role="status"
            aria-live="polite"
          >
            <p className="text-lg font-semibold">ROI: {roi.toFixed(2)}%</p>
            <p className="text-sm text-muted-foreground">
              Based on an investment of ${formData.investment} with expected
              returns of ${formData.returns}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ROICalculator;
