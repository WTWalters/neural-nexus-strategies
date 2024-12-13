// src/app/(styleguide)/layout.tsx
export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
