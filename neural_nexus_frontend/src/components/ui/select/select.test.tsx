// File: src/components/ui/select/select.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "lucide-react";
import { Select } from "./index";

const mockOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3", disabled: true },
];

const mockGroups = {
  "Group 1": [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
  ],
  "Group 2": [
    { value: "c", label: "Option C" },
    { value: "d", label: "Option D" },
  ],
};

describe("Select", () => {
  it("renders with default styles", () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("bg-[var(--colors-select-background)]");
    expect(select).toHaveClass("border-[var(--colors-select-border)]");
  });

  it("renders all options correctly", () => {
    render(<Select options={mockOptions} />);
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Option 1");
  });

  it("shows error state when error prop is provided", () => {
    render(<Select error options={mockOptions} />);
    expect(screen.getByRole("combobox")).toHaveClass(
      "border-[var(--colors-form-error)]",
    );
  });

  it("renders in different sizes", () => {
    const { rerender } = render(<Select size="sm" options={mockOptions} />);
    expect(screen.getByRole("combobox")).toHaveClass("h-8");

    rerender(<Select size="lg" options={mockOptions} />);
    expect(screen.getByRole("combobox")).toHaveClass("h-12");
  });

  it("shows loading state", () => {
    render(<Select isLoading options={mockOptions} />);
    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders with start icon", () => {
    render(
      <Select
        startIcon={<Search data-testid="search-icon" />}
        options={mockOptions}
      />,
    );
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("renders placeholder option when provided", () => {
    render(<Select options={mockOptions} placeholder="Select an option" />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders clear option when isClearable is true", () => {
    render(<Select options={mockOptions} isClearable />);
    expect(screen.getByText("Clear selection")).toBeInTheDocument();
  });

  it("renders option groups correctly", () => {
    render(<Select groups={mockGroups} />);
    expect(screen.getByRole("group", { name: "Group 1" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Group 2" })).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    render(<Select disabled options={mockOptions} />);
    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(screen.getByRole("combobox")).toHaveClass("cursor-not-allowed");
  });

  it("handles disabled options", () => {
    render(<Select options={mockOptions} />);
    const disabledOption = screen.getByRole("option", { name: "Option 3" });
    expect(disabledOption).toBeDisabled();
  });

  it("applies custom chevron when provided", () => {
    const CustomChevron = () => <div data-testid="custom-chevron">▼</div>;
    render(<Select options={mockOptions} customChevron={<CustomChevron />} />);
    expect(screen.getByTestId("custom-chevron")).toBeInTheDocument();
  });

  it("handles custom className", () => {
    render(<Select options={mockOptions} className="custom-class" />);
    expect(screen.getByRole("combobox").parentElement).toHaveClass(
      "custom-class",
    );
  });
});
