import { render, screen } from "@testing-library/react";
import { Home } from "lucide-react";
import { NavLink } from "./index";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/test-path",
}));

describe("NavLink", () => {
  it("renders basic link correctly", () => {
    render(<NavLink href="/test" label="Test Link" />);

    const link = screen.getByText("Test Link");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/test");
  });

  it("renders icon when provided", () => {
    render(
      <NavLink
        href="/test"
        label="Test Link"
        icon={<Home data-testid="icon" />}
      />,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("shows active state", () => {
    render(<NavLink href="/test" label="Test Link" isActive />);

    expect(screen.getByText("Test Link").closest("a")).toHaveClass("bg-accent");
  });

  it("renders description when provided", () => {
    render(
      <NavLink href="/test" label="Test Link" description="Test Description" />,
    );

    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("handles external links", () => {
    render(
      <NavLink href="https://example.com" label="External Link" isExternal />,
    );

    const link = screen.getByText("External Link").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies variant styles", () => {
    const { rerender } = render(
      <NavLink href="/test" label="Test Link" variant="subtle" />,
    );

    expect(screen.getByText("Test Link").closest("a")).toHaveClass(
      "text-muted-foreground",
    );

    rerender(<NavLink href="/test" label="Test Link" variant="ghost" />);

    expect(screen.getByText("Test Link").closest("a")).toHaveClass(
      "text-muted-foreground/60",
    );
  });

  it("accepts additional className", () => {
    render(<NavLink href="/test" label="Test Link" className="custom-class" />);

    expect(screen.getByText("Test Link").closest("a")).toHaveClass(
      "custom-class",
    );
  });
});
