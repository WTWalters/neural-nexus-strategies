import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "./index";

describe("ContentCard", () => {
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
  };

  it("renders basic content correctly", () => {
    render(<ContentCard {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    render(
      <ContentCard
        {...defaultProps}
        image={{
          src: "/test-image.jpg",
          alt: "Test Image",
        }}
      />,
    );

    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });

  it("handles different image aspect ratios", () => {
    const { rerender } = render(
      <ContentCard
        {...defaultProps}
        image={{
          src: "/test-image.jpg",
          alt: "Test Image",
          aspectRatio: "square",
        }}
      />,
    );

    expect(screen.getByAltText("Test Image").parentElement).toHaveClass(
      "aspect-square",
    );

    rerender(
      <ContentCard
        {...defaultProps}
        image={{
          src: "/test-image.jpg",
          alt: "Test Image",
          aspectRatio: "video",
        }}
      />,
    );

    expect(screen.getByAltText("Test Image").parentElement).toHaveClass(
      "aspect-video",
    );
  });

  it("renders actions when provided", () => {
    render(
      <ContentCard
        {...defaultProps}
        actions={
          <>
            <Button>Action 1</Button>
            <Button>Action 2</Button>
          </>
        }
      />,
    );

    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Action 2")).toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(<ContentCard {...defaultProps} href="/test-link" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-link");
  });

  it("applies variant styles correctly", () => {
    const { container, rerender } = render(
      <ContentCard {...defaultProps} variant="elevated" />,
    );

    expect(container.firstChild).toHaveClass("shadow-lg");

    rerender(<ContentCard {...defaultProps} variant="bordered" />);

    expect(container.firstChild).toHaveClass("border-2");
  });

  it("shows loading state", () => {
    const { container } = render(<ContentCard {...defaultProps} isLoading />);

    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("renders footer content when provided", () => {
    render(
      <ContentCard {...defaultProps} footer={<div>Footer Content</div>} />,
    );

    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<ContentCard {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByText("Test Title"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders children content when provided", () => {
    render(
      <ContentCard {...defaultProps}>
        <div>Custom Child Content</div>
      </ContentCard>,
    );

    expect(screen.getByText("Custom Child Content")).toBeInTheDocument();
  });

  it("accepts and applies additional className", () => {
    const { container } = render(
      <ContentCard {...defaultProps} className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("maintains hover styles by default", () => {
    const { container } = render(<ContentCard {...defaultProps} />);

    expect(container.firstChild).toHaveClass("hover:border-border/80");
  });

  it("disables hover styles when hover prop is false", () => {
    const { container } = render(
      <ContentCard {...defaultProps} hover={false} />,
    );

    expect(container.firstChild).not.toHaveClass("hover:border-border/80");
  });
});
