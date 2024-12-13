// src/app/(styleguide)/styleguide/page.tsx
import { ColorPaletteDemo } from "./components/color-palette-demo";

export default function StyleguidePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-neutral-800 mb-8">
        Neural Nexus Design System
      </h1>
      <ColorPaletteDemo />
    </div>
  );
}
