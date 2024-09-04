export async function fetchBrands(params: URLSearchParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function fetchBrandsForSelection() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/selection`
  );
  if (!response.ok) return [];
  return await response.json();
}

export async function searchBrands(query: URLSearchParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands?${query.toString()}`
  );

  const data = await response.json();
  return data;
}

export async function deleteBrand(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/${id}`, {
    method: "DELETE",
  });
}
