// src/lib/utils/image.ts

import { ImageAsset } from "@/types/blog";

export class ImageValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ImageValidationError";
    }
}

interface ValidateImageOptions {
    maxWidth?: number;
    maxHeight?: number;
    allowedFormats?: string[];
    maxSizeKB?: number;
}

export async function validateImage(
    url: string,
    options: ValidateImageOptions = {},
): Promise<ImageAsset> {
    const {
        maxWidth = 2048,
        maxHeight = 2048,
        allowedFormats = ["jpeg", "png", "webp", "gif"],
        maxSizeKB = 5000,
    } = options;

    try {
        // Load image
        const img = new Image();
        const imageLoaded = new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
        img.src = url;
        await imageLoaded;

        // Validate dimensions
        if (img.width > maxWidth) {
            throw new ImageValidationError(
                `Image width ${img.width}px exceeds maximum ${maxWidth}px`,
            );
        }
        if (img.height > maxHeight) {
            throw new ImageValidationError(
                `Image height ${img.height}px exceeds maximum ${maxHeight}px`,
            );
        }

        // Validate format
        const format = url.split(".").pop()?.toLowerCase();
        if (!format || !allowedFormats.includes(format)) {
            throw new ImageValidationError(
                `Image format ${format} not allowed`,
            );
        }

        // Validate file size
        const response = await fetch(url, { method: "HEAD" });
        const size = parseInt(
            response.headers.get("content-length") || "0",
            10,
        );
        if (size > maxSizeKB * 1024) {
            throw new ImageValidationError(
                `Image size ${Math.round(size / 1024)}KB exceeds maximum ${maxSizeKB}KB`,
            );
        }

        // Generate blur data URL
        const blurDataUrl = await generateBlurDataUrl(url);

        return {
            url,
            width: img.width,
            height: img.height,
            format: format as ImageAsset["format"],
            blurDataUrl,
        };
    } catch (error) {
        if (error instanceof ImageValidationError) {
            throw error;
        }
        throw new ImageValidationError("Failed to validate image");
    }
}

async function generateBlurDataUrl(url: string): Promise<string> {
    // Implementation of blur hash or simple blur data URL generation
    // This is a placeholder implementation
    return "data:image/jpeg;base64,...";
}
