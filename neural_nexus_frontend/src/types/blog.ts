// src/types/blog.ts
// Path: src/types/blog.ts

export interface ImageAsset {
  url: string;
  width: number;
  height: number;
  blurDataUrl?: string;
  altText?: string;
  format?: "jpeg" | "png" | "webp" | "gif";
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
  };
  featured_image?: ImageAsset;
  author: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  estimated_read_time: number;
  view_count: number;
}

export interface PaginationInfo {
  total: number;
  current_page: number;
  total_pages: number;
  per_page: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface BlogListResponse {
  data: BlogPost[];
  pagination: PaginationInfo;
}

export interface CategoryListResponse {
  data: Category[];
  pagination: PaginationInfo;
}
