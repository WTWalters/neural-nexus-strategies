import { render, screen, fireEvent } from "@testing-library/react";
import { Home, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./index";

// Mock items for testing
const mockItems = [
  {
    label: "Home",
    href: "/home",
    icon: <Home data-testid="home-icon" />,
    description: "Go to homepage",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings data-testid="settings-icon" />,
    description: "Manage your settings",
  },
  {
    label: "External",
    href: "https://example.com",
    isExternal: true,
    description: "Visit external site",
  },
  {
    label: "Disabled",
    href: "/disabled",
    disabled: true,
    description: "Disabled item",
  },
  {
    label: "Click Handler",
    onClick: jest.fn(),
    description: "Clickable item",
  },
];

describe("NavMenu", () => {
  it("renders trigger button", () => {
    render(<NavMenu trigger={<Button>Menu</Button>} items={mockItems} />);

    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });

  it("shows menu items when triggered", () => {
    render(<NavMenu trigger={<Button>Menu</Button>} items={mockItems} />);

    // Click trigger to open menu
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    // Check if items are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("External")).toBeInTheDocument();
  });

  it("renders icons when showIcons is true", () => {
    render(
      <NavMenu trigger={<Button>Menu</Button>} items={mockItems} showIcons />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
  });

  it("hides icons when showIcons is false", () => {
    render(
      <NavMenu
        trigger={<Button>Menu</Button>}
        items={mockItems}
        showIcons={false}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    expect(screen.queryByTestId("home-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("settings-icon")).not.toBeInTheDocument();
  });

  it("renders external links correctly", () => {
    render(<NavMenu trigger={<Button>Menu</Button>} items={mockItems} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    const externalLink = screen.getByText("External").closest("a");
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(externalLink).toHaveAttribute("href", "https://example.com");
  });

  it("handles disabled items", () => {
    render(<NavMenu trigger={<Button>Menu</Button>} items={mockItems} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    const disabledItem = screen.getByText("Disabled").closest("a");
    expect(disabledItem).toHaveClass("pointer-events-none");
    expect(disabledItem).toHaveClass("opacity-50");
  });

  it("executes click handlers", () => {
    const clickHandler = jest.fn();
    const items = [
      {
        label: "Click Me",
        onClick: clickHandler,
      },
    ];

    render(<NavMenu trigger={<Button>Menu</Button>} items={items} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    fireEvent.click(screen.getByText("Click Me"));

    expect(clickHandler).toHaveBeenCalled();
  });

  it("renders descriptions", () => {
    render(<NavMenu trigger={<Button>Menu</Button>} items={mockItems} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    expect(screen.getByText("Go to homepage")).toBeInTheDocument();
    expect(screen.getByText("Manage your settings")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <NavMenu
        trigger={<Button>Menu</Button>}
        items={mockItems}
        className="custom-class"
      />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("opens by default when defaultOpen is true", () => {
    render(
      <NavMenu trigger={<Button>Menu</Button>} items={mockItems} defaultOpen />,
    );

    // Check if menu items are visible without clicking trigger
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("handles internal navigation links correctly", () => {
    render(<NavMenu trigger={<Button>Menu</Button>} items={mockItems} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/home");
  });
});
