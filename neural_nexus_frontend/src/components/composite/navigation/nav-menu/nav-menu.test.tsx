// src/components/composite/navigation/nav-menu/nav-menu.test.tsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavMenu from "./index";
import { Home, Info } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";

const mockItems = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-4 w-4" />,
    description: "Go to home page",
  },
  {
    label: "About",
    href: "/about",
    icon: <Info className="h-4 w-4" />,
    description: "Learn more about us",
    isExternal: true,
  },
  {
    label: "Click Me",
    onClick: jest.fn(),
    description: "Button item",
  },
];

describe("NavMenu Component", () => {
  const renderNavMenu = (props = {}) => {
    return render(
      <ThemeProvider>
        <NavMenu trigger="Menu" items={mockItems} {...props} />
      </ThemeProvider>,
    );
  };

  it("renders the trigger button", () => {
    renderNavMenu();
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("shows menu items when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderNavMenu();

    const trigger = screen.getByText("Menu");
    await user.click(trigger);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      if (item.description) {
        expect(screen.getByText(item.description)).toBeInTheDocument();
      }
    });
  });

  it("renders external links with external icon", async () => {
    const user = userEvent.setup();
    renderNavMenu();

    await user.click(screen.getByText("Menu"));

    const externalItem = mockItems.find((item) => item.isExternal);
    const externalLink = screen.getByText(externalItem!.label).closest("a");

    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders internal links correctly", async () => {
    const user = userEvent.setup();
    renderNavMenu();

    await user.click(screen.getByText("Menu"));

    const internalItem = mockItems.find(
      (item) => item.href && !item.isExternal,
    );
    const internalLink = screen.getByText(internalItem!.label).closest("a");

    expect(internalLink).toHaveAttribute("href", internalItem!.href);
    expect(internalLink).not.toHaveAttribute("target");
  });

  it("handles button items with onClick", async () => {
    const user = userEvent.setup();
    renderNavMenu();

    await user.click(screen.getByText("Menu"));

    const buttonItem = mockItems.find((item) => item.onClick);
    const button = screen.getByText(buttonItem!.label);
    await user.click(button);

    expect(buttonItem!.onClick).toHaveBeenCalled();
  });

  it("shows icons when showIcons is true", async () => {
    const user = userEvent.setup();
    renderNavMenu({ showIcons: true });

    await user.click(screen.getByText("Menu"));

    const menuContent = screen.getByRole("navigation");
    expect(
      within(menuContent).getAllByRole("img", { hidden: true }),
    ).toHaveLength(mockItems.filter((item) => item.icon).length);
  });

  it("hides icons when showIcons is false", async () => {
    const user = userEvent.setup();
    renderNavMenu({ showIcons: false });

    await user.click(screen.getByText("Menu"));

    const menuContent = screen.getByRole("navigation");
    expect(
      within(menuContent).queryAllByRole("img", { hidden: true }),
    ).toHaveLength(0);
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-nav";
    renderNavMenu({ className: customClass });

    expect(screen.getByRole("navigation")).toHaveClass(customClass);
  });
});
