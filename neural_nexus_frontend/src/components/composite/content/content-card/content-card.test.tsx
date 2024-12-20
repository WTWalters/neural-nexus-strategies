// src/components/composite/content/content-card.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ContentCard } from "./index";

describe("ContentCard", () => {
  const defaultProps = {
    title: "Test Card",
  };

  it("renders basic card with title", () => {
    render(<ContentCard {...defaultProps} />);
    expect(screen.getByText("Test Card")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<ContentCard {...defaultProps} description="Test description" />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders image with correct aspect ratio", () => {
    const image = {
      src: "/test-image.jpg",
      alt: "Test image",
      aspectRatio: "square" as const,
    };
    render(<ContentCard {...defaultProps} image={image} />);
    const img = screen.getByAltText("Test image");
    expect(img).toBeInTheDocument();
    expect(img.parentElement).toHaveClass("aspect-square");
  });

  it("renders as a link when href is provided", () => {
    render(<ContentCard {...defaultProps} href="/test-link" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-link");
  });

  it("applies correct variant styles", () => {
    const { container } = render(
      <ContentCard {...defaultProps} variant="elevated" />,
    );
    const cardElement = container.querySelector(".shadow-lg");
    expect(cardElement).toBeInTheDocument();
  });

  it("shows loading state", () => {
    const { container } = render(<ContentCard {...defaultProps} isLoading />);
    const loadingElement = container.querySelector(".animate-pulse");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(<ContentCard {...defaultProps} footer={<div>Test footer</div>} />);
    expect(screen.getByText("Test footer")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const onClick = jest.fn();
    render(<ContentCard {...defaultProps} onClick={onClick} />);
    fireEvent.click(screen.getByText("Test Card"));
    expect(onClick).toHaveBeenCalled();
  });

  it("renders actions", () => {
    render(
      <ContentCard {...defaultProps} actions={<button>Test action</button>} />,
    );
    expect(
      screen.getByRole("button", { name: "Test action" }),
    ).toBeInTheDocument();
  });

  it("disables hover effect when specified", () => {
    const { container } = render(
      <ContentCard {...defaultProps} hover={false} />,
    );
    expect(container.firstChild).not.toHaveClass("hover:border-border/80");
  });

  it("renders custom children", () => {
    render(
      <ContentCard {...defaultProps}>
        <div>Custom content</div>
      </ContentCard>,
    );
    expect(screen.getByText("Custom content")).toBeInTheDocument();
  });
});
