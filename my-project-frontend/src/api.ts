const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
    });

    if (response.status === 204) {
        return null;
    }

    return response.json();
}
