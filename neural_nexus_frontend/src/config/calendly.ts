// src/config/calendly.ts
export const CALENDLY_CONFIG = {
  USERNAME:
    process.env.NEXT_PUBLIC_CALENDLY_USERNAME ||
    "wwalters-neuralnexusstrategies",
  SHOW_DETAILS: process.env.NEXT_PUBLIC_CALENDLY_SHOW_DETAILS === "false",
  SHOW_COOKIES: process.env.NEXT_PUBLIC_CALENDLY_SHOW_COOKIES === "false",
};
