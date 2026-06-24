const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function submitEdges(edges) {
  if (!API_BASE_URL) {
    throw new Error("Frontend API URL is not configured. Set VITE_API_BASE_URL and rebuild the app.");
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}/bfhl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: edges })
    });
  } catch {
    throw new Error("Unable to reach the backend. Check the API URL and try again.");
  }

  let payload;

  try {
    payload = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(payload.message || "The request could not be processed.");
  }

  if (!payload || !Array.isArray(payload.hierarchies) || typeof payload.summary !== "object") {
    throw new Error("The API response shape is not valid for this dashboard.");
  }

  return payload;
}
