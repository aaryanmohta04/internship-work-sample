const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function setCache(key: string, value: any): Promise<string> {
  const response = await fetch(`${BASE_URL}/cache`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  });
  // const data = await handleResponse(response);
  return String(response);
}

export async function getCache(key: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/cache/${key}`, {
    method: "GET",
  });
  //   const data = await handleResponse(response);
  return response;
}

export async function deleteCache(key: string): Promise<string> {
  const response = await fetch(`${BASE_URL}/cache/${key}`, {
    method: "DELETE",
  });
  const data = await handleResponse(response);
  return data;
}

export async function resetCache(): Promise<void> {
  await fetch(`${BASE_URL}/cache`, {
    method: "DELETE",
  });
}
