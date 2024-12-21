// File: src/components/ui/input/input.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Search, Mail } from "lucide-react";
import { Input } from "./index";

describe("Input", () => {
  it("renders with default styles", () => {
    render(<Input placeholder="Test input" />);
    const input = screen.getByPlaceholderText("Test input");
    expect(input).toHaveClass("bg-transparent");
    expect(input).toHaveClass("text-[var(--colors-input-foreground)]");
  });

  it("shows error state when error prop is provided", () => {
    render(<Input error="Invalid input" />);
    const wrapper = screen.getByRole("textbox").parentElement;
    expect(wrapper).toHaveClass("border-[var(--colors-form-error)]");
  });

  it("renders in different sizes", () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-8");

    rerender(<Input size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-12");
  });

  it("shows loading state", () => {
    render(<Input isLoading />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders with start icon", () => {
    render(<Input startIcon={<Search data-testid="search-icon" />} />);
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("renders with end icon", () => {
    render(<Input endIcon={<Mail data-testid="mail-icon" />} />);
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });

  it("shows clear button when isClearable and has value", () => {
    render(<Input isClearable value="test" onChange={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onClear when clear button is clicked", () => {
    const onClear = jest.fn();
    render(
      <Input isClearable value="test" onChange={() => {}} onClear={onClear} />,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onClear).toHaveBeenCalled();
  });

  it("applies disabled styles", () => {
    render(<Input disabled />);
    const wrapper = screen.getByRole("textbox").parentElement;
    expect(wrapper).toHaveClass("opacity-50");
    expect(wrapper).toHaveClass("cursor-not-allowed");
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("handles custom className", () => {
    render(<Input className="custom-class" />);
    const wrapper = screen.getByRole("textbox").parentElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("prioritizes loading state over end icon", () => {
    render(<Input isLoading endIcon={<Mail data-testid="mail-icon" />} />);
    expect(screen.queryByTestId("mail-icon")).not.toBeInTheDocument();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("prioritizes clear button over end icon when value exists", () => {
    render(
      <Input
        isClearable
        value="test"
        onChange={() => {}}
        endIcon={<Mail data-testid="mail-icon" />}
      />,
    );
    expect(screen.queryByTestId("mail-icon")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
