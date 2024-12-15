// src/__tests__/unit/components/Button.test.tsx
import { render, screen } from "@/test/test-utils";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

describe("Button Component", () => {
  it("renders with text content", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("handles different variants", () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border");
  });

  it("renders with icon", () => {
    render(
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </Button>,
    );
    expect(screen.getByRole("button")).toContainElement(
      document.querySelector("svg"),
    );
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    const { user } = render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles loading state", () => {
    render(
      <Button disabled>
        <span className="loading loading-spinner" />
        Loading
      </Button>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
