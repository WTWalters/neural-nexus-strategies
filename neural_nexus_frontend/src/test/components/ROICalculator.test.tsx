// src/test/components/ROICalculator.test.tsx
import { render, screen } from "../../test/test-utils";
import { ROICalculator } from "@/components/ROICalculator";

describe("ROICalculator", () => {
  it("renders the calculator", () => {
    render(<ROICalculator />);
    // Add appropriate assertions here
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
