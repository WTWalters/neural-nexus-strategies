//src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatContent(content: string): string {
  // Convert newlines to proper HTML line breaks and paragraphs
  return content
    .split("\r\n\r\n") // Split into paragraphs
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("\n")
    .replace(/\r\n(?!\r\n)/g, "<br />"); // Handle single line breaks
}
