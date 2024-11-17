// src/components/blog/Pagination.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handlePageChange(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`/blog?${params.toString()}`);
    }

    return (
        <div className="flex justify-center gap-2 mt-8">
            <Button
                variant="outline"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
}
