// src/components/composite/navigation/nav-menu/nav-menu.test.tsx
import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home, Info } from "lucide-react";
import { NavMenu } from "./index";
import { ThemeProvider } from "@/components/theme-provider";

const mockItems = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-4 w-4" data-testid="home-icon" />,
    description: "Go to home page",
  },
  {
    label: "About",
    href: "/about",
    icon: <Info className="h-4 w-4" data-testid="about-icon" />,
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

    await waitFor(() => {
      mockItems.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
        if (item.description) {
          expect(screen.getByText(item.description)).toBeInTheDocument();
        }
      });
    });
  });

  it("renders external links with external icon", async () => {
    const user = userEvent.setup();
    renderNavMenu();

    await user.click(screen.getByText("Menu"));

    await waitFor(() => {
      const externalItem = mockItems.find((item) => item.isExternal);
      const externalLink = screen.getByText(externalItem!.label).closest("a");
      expect(externalLink).toHaveAttribute("target", "_blank");
      expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("renders internal links correctly", async () => {
    const user = userEvent.setup();
    renderNavMenu();

    await user.click(screen.getByText("Menu"));

    await waitFor(() => {
      const internalItem = mockItems.find(
        (item) => item.href && !item.isExternal,
      );
      const internalLink = screen.getByText(internalItem!.label).closest("a");
      expect(internalLink).toHaveAttribute("href", internalItem!.href);
      expect(internalLink).not.toHaveAttribute("target");
    });
  });

  it("handles button items with onClick", async () => {
    const user = userEvent.setup();
    renderNavMenu();

    await user.click(screen.getByText("Menu"));

    await waitFor(async () => {
      const buttonItem = mockItems.find((item) => item.onClick);
      const button = screen.getByText(buttonItem!.label);
      await user.click(button);
      expect(buttonItem!.onClick).toHaveBeenCalled();
    });
  });

  it("shows icons when showIcons is true", async () => {
    const user = userEvent.setup();
    renderNavMenu({ showIcons: true });

    await user.click(screen.getByText("Menu"));

    await waitFor(() => {
      // Look for SVG elements with specific classes
      const homeIcon = screen.getByTestId("home-icon");
      const infoIcon = screen.getByTestId("about-icon");
      expect(homeIcon).toBeInTheDocument();
      expect(infoIcon).toBeInTheDocument();
    });
  });

  it("hides icons when showIcons is false", async () => {
    const user = userEvent.setup();
    renderNavMenu({ showIcons: false });

    await user.click(screen.getByText("Menu"));

    await waitFor(() => {
      // Check that no icon containers are present
      const iconContainers = screen.queryAllByTestId(/^.*-icon$/);
      expect(iconContainers).toHaveLength(0);
    });
  });
});
