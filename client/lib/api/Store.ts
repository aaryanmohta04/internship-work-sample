export async function fetchStoreById(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/stores/${id}`
  );
  const data = await response.json();
  return data;
}

export async function fetchStores(params: URLSearchParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/stores?${params.toString()}`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
}

export async function createStore(store: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/stores`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store),
    }
  );
  return response.json();
}

export async function updateStore(id: number, store: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/stores/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store),
    }
  );
  return response.json();
}

export async function deleteStore(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stores/${id}`, {
    method: "DELETE",
  });
}
