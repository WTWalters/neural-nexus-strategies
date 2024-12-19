// section-header.test.tsx
import { render, screen } from "@testing-library/react";
import { SectionHeader } from "./index";

describe("SectionHeader", () => {
  const defaultProps = {
    title: "Test Section",
  };

  it("renders with basic props", () => {
    render(<SectionHeader {...defaultProps} />);
    expect(screen.getByText("Test Section")).toHaveClass("text-2xl");
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeader {...defaultProps} subtitle="Test subtitle" />);
    expect(screen.getByText("Test subtitle")).toHaveClass(
      "text-muted-foreground",
    );
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<SectionHeader {...defaultProps} size="sm" />);
    expect(screen.getByText("Test Section")).toHaveClass("text-lg");

    rerender(<SectionHeader {...defaultProps} size="lg" />);
    expect(screen.getByText("Test Section")).toHaveClass("text-3xl");
  });

  it("adds divider when specified", () => {
    const { container } = render(<SectionHeader {...defaultProps} divider />);
    expect(container.firstChild).toHaveClass("border-b");
  });

  it("applies correct alignment", () => {
    const { rerender } = render(
      <SectionHeader {...defaultProps} align="center" />,
    );
    expect(
      screen.getByText("Test Section").parentElement?.parentElement,
    ).toHaveClass("text-center");

    rerender(<SectionHeader {...defaultProps} align="right" />);
    expect(
      screen.getByText("Test Section").parentElement?.parentElement,
    ).toHaveClass("text-right");
  });

  it("renders actions", () => {
    render(
      <SectionHeader
        {...defaultProps}
        actions={<button>Test action</button>}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Test action" }),
    ).toBeInTheDocument();
  });

  it("positions actions correctly with center alignment", () => {
    render(
      <SectionHeader
        {...defaultProps}
        align="center"
        actions={<button>Test action</button>}
      />,
    );
    const actionContainer = screen.getByRole("button", {
      name: "Test action",
    }).parentElement;
    expect(actionContainer).toHaveClass("flex-1", "justify-end");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SectionHeader {...defaultProps} className="test-class" />,
    );
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("maintains responsive text sizes", () => {
    const { container } = render(<SectionHeader {...defaultProps} size="md" />);
    const titleElement = screen.getByText("Test Section");
    expect(titleElement).toHaveClass("text-2xl", "font-bold", "tracking-tight");
  });

  it("handles long titles and subtitles", () => {
    render(
      <SectionHeader
        title="Very long title that should still be handled gracefully"
        subtitle="And an equally long subtitle that needs to be displayed properly"
      />,
    );
    expect(screen.getByText(/Very long title/)).toBeInTheDocument();
    expect(screen.getByText(/equally long subtitle/)).toBeInTheDocument();
  });
});
