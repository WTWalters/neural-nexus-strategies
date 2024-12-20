// src/components/features/calculators/ROICalculator/roi-calculator.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/theme-provider";
import { ROICalculator } from "./index";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {ui}
    </ThemeProvider>,
  );
};

describe("ROICalculator", () => {
  it("renders all form elements correctly", () => {
    renderWithTheme(<ROICalculator />);

    expect(screen.getByLabelText(/initial investment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expected returns/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /calculate roi/i }),
    ).toBeInTheDocument();
  });

  it("calculates ROI correctly", async () => {
    const user = userEvent.setup();
    const onCalculate = jest.fn();
    renderWithTheme(<ROICalculator onCalculate={onCalculate} />);

    await user.type(screen.getByLabelText(/initial investment/i), "1000");
    await user.type(screen.getByLabelText(/expected returns/i), "1500");
    await user.click(screen.getByRole("button", { name: /calculate roi/i }));

    await waitFor(() => {
      expect(screen.getByText(/ROI: 50.00%/)).toBeInTheDocument();
      expect(onCalculate).toHaveBeenCalledWith(50);
    });
  });

  it("handles form validation", async () => {
    const user = userEvent.setup();
    renderWithTheme(<ROICalculator />);

    // Try to submit without filling in the form
    await user.click(screen.getByRole("button", { name: /calculate roi/i }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    // Enter invalid investment (0)
    await user.type(screen.getByLabelText(/initial investment/i), "0");
    await user.type(screen.getByLabelText(/expected returns/i), "100");
    await user.click(screen.getByRole("button", { name: /calculate roi/i }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("updates calculation when inputs change", async () => {
    const user = userEvent.setup();
    renderWithTheme(<ROICalculator />);

    // Initial calculation
    await user.type(screen.getByLabelText(/initial investment/i), "1000");
    await user.type(screen.getByLabelText(/expected returns/i), "1500");
    await user.click(screen.getByRole("button", { name: /calculate roi/i }));

    expect(screen.getByText(/ROI: 50.00%/)).toBeInTheDocument();

    // Update values
    await user.clear(screen.getByLabelText(/initial investment/i));
    await user.clear(screen.getByLabelText(/expected returns/i));
    await user.type(screen.getByLabelText(/initial investment/i), "2000");
    await user.type(screen.getByLabelText(/expected returns/i), "3000");
    await user.click(screen.getByRole("button", { name: /calculate roi/i }));

    await waitFor(() => {
      expect(screen.getByText(/ROI: 50.00%/)).toBeInTheDocument();
    });
  });
});
