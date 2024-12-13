// src/__tests__/unit/components/Input.test.tsx
import { render, screen } from "@/tests/test-utils";
import { Input } from "@/components/ui/input";

describe("Input Component", () => {
  it("renders with default attributes", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const { user } = render(<Input />);
    const input = screen.getByRole("textbox");

    await user.type(input, "test input");
    expect(input).toHaveValue("test input");
  });

  it("applies error styles when error prop is true", () => {
    render(<Input error aria-invalid="true" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("forwards ref correctly", () => {
    const ref = jest.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
