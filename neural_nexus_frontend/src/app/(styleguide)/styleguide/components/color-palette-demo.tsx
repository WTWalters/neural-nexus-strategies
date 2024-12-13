// src/app/(styleguide)/styleguide/components/color-palette-demo.tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ColorPaletteDemo() {
  return (
    <div className="space-y-12">
      {/* Color Swatches */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          Color Palette
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Primary Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Primary Blues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-20 bg-primary-navy rounded-lg" />
              <div className="h-20 bg-primary rounded-lg" />
              <div className="h-20 bg-primary-light rounded-lg" />
              <div className="h-20 bg-primary-lighter rounded-lg" />
            </CardContent>
          </Card>

          {/* Accent Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Accent Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-20 bg-accent-dark rounded-lg" />
              <div className="h-20 bg-accent rounded-lg" />
              <div className="h-20 bg-accent-light rounded-lg" />
            </CardContent>
          </Card>

          {/* Neutral Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Neutral Palette</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (weight) => (
                  <div
                    key={weight}
                    className={`h-8 rounded-lg bg-neutral-${weight}`}
                  />
                ),
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Button Examples */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </section>

      {/* Example UI Card */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          Example Card
        </h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">
              This is an example card using our new color system with shadcn/ui
              components.
            </p>
            <div className="mt-4">
              <Button>Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
