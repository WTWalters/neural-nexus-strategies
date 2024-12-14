// src/mocks/handlers.ts
import { rest } from "msw";

export const handlers = [
  // Add your API mocks here
  rest.get("/api/example", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Mocked response" }));
  }),

  // Auth endpoints
  rest.post("/api/auth/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "fake-jwt-token",
        user: {
          id: 1,
          email: "test@example.com",
          name: "Test User",
        },
      }),
    );
  }),

  rest.post("/api/auth/register", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        message: "User created successfully",
      }),
    );
  }),
];
