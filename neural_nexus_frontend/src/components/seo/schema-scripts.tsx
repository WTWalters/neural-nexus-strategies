import Script from "next/script";

interface SchemaScriptsProps {
  schemas: Array<{
    id: string;
    data: object;
  }>;
}

/**
 * Reusable component for rendering JSON-LD schema scripts
 * Accepts an array of schema objects and renders them as structured data
 */
export function SchemaScripts({ schemas }: SchemaScriptsProps) {
  return (
    <>
      {schemas.map((schema) => (
        <Script
          key={schema.id}
          id={schema.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema.data),
          }}
        />
      ))}
    </>
  );
}