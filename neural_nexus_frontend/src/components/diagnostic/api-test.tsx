// Path: neural_nexus_frontend/src/components/diagnostic/api-test.tsx

"use client";

import { useState, useEffect } from "react";

interface EndpointStatus {
  endpoint: string;
  status: "loading" | "success" | "error";
  error?: string;
}

export default function APITest() {
  const [statuses, setStatuses] = useState<EndpointStatus[]>([]);

  const endpoints = [
    "/api/blog/posts/",
    "/api/case-studies/",
    "/api/services/",
  ];

  useEffect(() => {
    const testEndpoints = async () => {
      const results = await Promise.all(
        endpoints.map(async (endpoint) => {
          try {
            const response = await fetch(endpoint);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return {
              endpoint,
              status: "success" as const,
            };
          } catch (error) {
            return {
              endpoint,
              status: "error" as const,
              error: error instanceof Error ? error.message : "Unknown error",
            };
          }
        }),
      );
      setStatuses(results);
    };

    testEndpoints();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">API Endpoint Status</h2>
      <div className="space-y-4">
        {statuses.map((status) => (
          <div key={status.endpoint} className="p-4 rounded-lg border">
            <p className="font-medium">{status.endpoint}</p>
            <p
              className={`mt-2 ${
                status.status === "success"
                  ? "text-green-600"
                  : status.status === "error"
                    ? "text-red-600"
                    : "text-yellow-600"
              }`}
            >
              Status: {status.status}
            </p>
            {status.error && (
              <p className="mt-2 text-sm text-red-600">Error: {status.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
