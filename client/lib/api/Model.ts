export async function fetchModels(params: URLSearchParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/models?${params.toString()}`,
    {
      method: "GET",
    }
  );
  return response;
}

export async function fetchModelsByBrandId(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/${id}/models`
  );
  if (!response.ok) return [];
  const data = await response.json();
  return data;
}
