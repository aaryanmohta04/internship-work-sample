export async function fetchVendors(params: URLSearchParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vendors?${params.toString()}`,
    { method: "GET" }
  );
    const data = await response.json();
    return data;
}

export async function updateVendor(id: number, store: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendors/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store),
    });
    return response.json();
}

export async function deleteVendor(id: number) {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendors/${id}`, {
      method: 'DELETE',
    });
}