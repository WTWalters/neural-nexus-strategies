// src/mocks/handlers.ts
import { http, HttpResponse } from "msw"; // Changed from separate imports

export const handlers = [
  // Add your API mocks here
  http.get("/api/example", () => {
    return HttpResponse.json({ message: "Mocked response" });
  }),

  // Auth endpoints
  http.post("/api/auth/login", () => {
    return HttpResponse.json({
      token: "fake-jwt-token",
      user: {
        id: 1,
        email: "test@example.com",
        name: "Test User",
      },
    });
  }),

  http.post("/api/auth/register", () => {
    return HttpResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 },
    );
  }),
];
