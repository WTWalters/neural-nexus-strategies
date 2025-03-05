# Neural Nexus Logo Usage Guide

This document provides information on how to use the Neural Nexus logo throughout the application.

## Available Logo Files

- **SVG Logo**: `/public/assets/logo.svg` - Full SVG logo file
- **Favicon**: `/public/favicon.svg` - SVG favicon
- **Animation CSS**: `/public/assets/logo-animation.css` - CSS for logo animations

## React Component

The logo is available as a reusable React component:

```tsx
import { Logo } from "@/components/ui/logo";

// Basic usage
<Logo />

// Custom size
<Logo width={60} height={60} />

// Without animation
<Logo showAnimation={false} />

// With custom class
<Logo className="my-custom-class" />
```

## Props

The Logo component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | number | 40 | Width of the logo in pixels |
| height | number | 40 | Height of the logo in pixels |
| showAnimation | boolean | true | Whether to show the animation effects |
| className | string | "" | Additional CSS classes to apply |

## Animations

The logo has two animations:
1. Path drawing animation with CSS `stroke-dasharray` and `stroke-dashoffset`
2. Pulsing neural connection line

These animations are defined in the `/public/assets/logo-animation.css` file and are loaded automatically by the Logo component when `showAnimation` is true.

## Preview

You can preview the logo with animations at `/logo-preview.html` in the browser.

## Implementation Examples

### In Header

```tsx
import { Logo } from "@/components/ui/logo";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <div className="flex items-center gap-3">
            <Logo width={40} height={40} />
            <span>Neural Nexus Strategies</span>
          </div>
        </Link>
      </nav>
    </header>
  );
}
```

### In Footer

```tsx
import { Logo } from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer>
      <div className="flex items-center justify-center">
        <Logo width={30} height={30} showAnimation={false} />
        <span>© 2025 Neural Nexus Strategies</span>
      </div>
    </footer>
  );
}
```
