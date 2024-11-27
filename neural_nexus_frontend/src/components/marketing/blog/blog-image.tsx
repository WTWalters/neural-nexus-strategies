// src/components/marketing/blog/blog-image.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageAsset } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogImageProps {
    image: ImageAsset;
    className?: string;
    priority?: boolean;
    onLoad?: () => void;
    onError?: () => void;
}

export function BlogImage({
    image,
    className,
    priority = false,
    onLoad,
    onError,
}: BlogImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative overflow-hidden">
            <Image
                src={image.url}
                alt={image.altText || ""}
                width={image.width}
                height={image.height}
                className={cn(
                    "duration-700 ease-in-out",
                    isLoading
                        ? "grayscale blur-2xl scale-110"
                        : "grayscale-0 blur-0 scale-100",
                    className,
                )}
                onLoadingComplete={() => {
                    setIsLoading(false);
                    onLoad?.();
                }}
                onError={onError}
                priority={priority}
                quality={90}
            />
            {isLoading && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
        </div>
    );
}
