// src/test/unit/components/Input.test.tsx
import React from "react"; // Add this import
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input Component", () => {
  it("renders with default attributes", () => {
    render(<Input placeholder="test placeholder" />);
    expect(screen.getByPlaceholderText("test placeholder")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "test");
    expect(onChange).toHaveBeenCalled();
  });

  it("applies error styles when error prop is true", () => {
    render(<Input data-testid="input" error={true} />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("data-error", "true");
    expect(input.className).toContain("border-red-500");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
