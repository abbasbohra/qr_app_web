const API_BASE =
  import.meta.env.VITE_API_BASE || "https://tapcardss-api.netlify.app";

export async function apiCall<T = any>(
  endpoint: string,
  body: Record<string, any>,
  token?: string,
): Promise<T> {
  const res = await fetch(`${API_BASE}/api/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Request failed");
  return data;
}
