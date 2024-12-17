import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./index";

describe("SectionHeader", () => {
  it("renders title correctly", () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeader title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(
      <SectionHeader
        title="Test Title"
        actions={<Button>Test Action</Button>}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Test Action" }),
    ).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<SectionHeader title="Test Title" size="lg" />);
    expect(screen.getByText("Test Title")).toHaveClass("text-3xl");

    rerender(<SectionHeader title="Test Title" size="sm" />);
    expect(screen.getByText("Test Title")).toHaveClass("text-lg");
  });

  it("applies alignment classes correctly", () => {
    const { container, rerender } = render(
      <SectionHeader title="Test Title" align="center" />,
    );
    expect(container.firstChild).toHaveClass("text-center");

    rerender(<SectionHeader title="Test Title" align="right" />);
    expect(container.firstChild).toHaveClass("text-right");
  });

  it("shows divider when divider prop is true", () => {
    const { container } = render(<SectionHeader title="Test Title" divider />);
    expect(container.firstChild).toHaveClass("border-b");
  });

  it("accepts and applies additional className", () => {
    const { container } = render(
      <SectionHeader title="Test Title" className="test-class" />,
    );
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("handles multiple action elements", () => {
    render(
      <SectionHeader
        title="Test Title"
        actions={
          <>
            <Button>Action 1</Button>
            <Button>Action 2</Button>
          </>
        }
      />,
    );
    expect(
      screen.getByRole("button", { name: "Action 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Action 2" }),
    ).toBeInTheDocument();
  });

  it("maintains correct layout with all props", () => {
    const { container } = render(
      <SectionHeader
        title="Test Title"
        subtitle="Test Subtitle"
        actions={<Button>Action</Button>}
        size="md"
        align="center"
        divider
        className="custom-class"
      />,
    );

    // Check all elements are present
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();

    // Check layout classes
    expect(container.firstChild).toHaveClass(
      "border-b",
      "text-center",
      "custom-class",
    );
  });
});
