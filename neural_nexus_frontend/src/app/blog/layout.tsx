// src/app/blog/layout.tsx
import { CategoryFilter } from "@/components/blog/CategoryFilter";

interface Category {
    name: string;
    slug: string;
    count?: number;
}

async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/content/categories/`,
            {
                next: {
                    revalidate: 3600, // Revalidate every hour
                },
            },
        );

        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        return Array.isArray(data) ? data : data.results || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export default async function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const categories = await getCategories();

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-white to-primary-50">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main content */}
                <div className="lg:col-span-3">{children}</div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    <div className="rounded-lg border border-primary-200 p-6 bg-white">
                        <h3 className="text-lg font-semibold mb-4 text-primary-900">
                            Categories
                        </h3>
                        <CategoryFilter categories={categories} />
                    </div>
                </aside>
            </div>
        </div>
    );
}
