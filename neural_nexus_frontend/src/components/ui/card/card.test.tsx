// File: src/components/ui/card/card.test.tsx
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./index";

describe("Card Components", () => {
  describe("Card", () => {
    it("renders with default styles", () => {
      render(<Card>Card Content</Card>);
      const card = screen.getByText("Card Content");
      expect(card).toHaveClass("bg-[var(--colors-card-background)]");
      expect(card).toHaveClass("border-[var(--colors-card-border)]");
    });

    it("applies clickable styles when clickable prop is true", () => {
      render(<Card clickable>Clickable Card</Card>);
      expect(screen.getByText("Clickable Card")).toHaveClass("cursor-pointer");
    });

    it("disables hover effects when disableHover is true", () => {
      render(<Card disableHover>No Hover Card</Card>);
      const card = screen.getByText("No Hover Card");
      expect(card).not.toHaveClass("hover:bg-[var(--colors-card-hover)]");
    });
  });

  describe("CardHeader", () => {
    it("renders with default padding", () => {
      render(<CardHeader>Header Content</CardHeader>);
      expect(screen.getByText("Header Content")).toHaveClass("p-6");
    });

    it("renders with compact padding when compact prop is true", () => {
      render(<CardHeader compact>Compact Header</CardHeader>);
      expect(screen.getByText("Compact Header")).toHaveClass("p-4");
    });
  });

  describe("CardTitle", () => {
    it("renders with correct text styles", () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByText("Card Title");
      expect(title).toHaveClass("text-2xl");
      expect(title).toHaveClass("font-semibold");
    });

    it("preserves line breaks when preserveLineBreaks is true", () => {
      const text = "Multiline\nTitle";
      render(<CardTitle preserveLineBreaks>{text}</CardTitle>);
      // Find by role instead of exact text
      const title = screen.getByRole("heading");
      expect(title).toHaveClass("whitespace-pre-line");
      expect(title.textContent).toBe("Multiline\nTitle");
    });
  });

  describe("CardDescription", () => {
    it("renders with correct text styles", () => {
      render(<CardDescription>Description</CardDescription>);
      expect(screen.getByText("Description")).toHaveClass("text-sm");
    });

    it("applies line clamp when lineClamp prop is provided", () => {
      render(<CardDescription lineClamp={2}>Long Description</CardDescription>);
      expect(screen.getByText("Long Description")).toHaveClass("line-clamp-2");
    });
  });

  describe("CardContent", () => {
    it("renders with default padding", () => {
      render(<CardContent>Content</CardContent>);
      const content = screen.getByText("Content");
      expect(content).toHaveClass("p-6");
      expect(content).toHaveClass("pt-0");
    });

    it("removes padding when noPadding is true", () => {
      render(<CardContent noPadding>No Padding Content</CardContent>);
      const content = screen.getByText("No Padding Content");
      expect(content).not.toHaveClass("p-6");
      expect(content).toHaveClass("pt-0");
    });
  });

  describe("CardFooter", () => {
    it("renders with default center alignment", () => {
      render(<CardFooter>Footer</CardFooter>);
      expect(screen.getByText("Footer")).toHaveClass("justify-center");
    });

    it("aligns items based on align prop", () => {
      render(<CardFooter align="end">End Footer</CardFooter>);
      expect(screen.getByText("End Footer")).toHaveClass("justify-end");
    });
  });
});
