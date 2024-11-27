// src/utils/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchFromAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}

// Example usage:
// const services = await fetchFromAPI<ServiceResponse>('/api/services/');
