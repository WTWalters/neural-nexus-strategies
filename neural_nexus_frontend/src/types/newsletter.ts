// src/types/newsletter.ts
export interface NewsletterFormData {
    firstName: string;
    email: string;
    source: "banner" | "content-end";
}

export type NewsletterStatus = "idle" | "submitting" | "success" | "error";
