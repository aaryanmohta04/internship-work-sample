export const fetchModels = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/models`,
    { method: "GET" }
  );
  const data = await response.json();
  return data.data;
};

export const fetchModelsForSelection = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/selection`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
};

export const fetchNewArrivals = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/new-arrivals`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
};

export const createNewArrival = async (modelId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/new-arrivals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ modelId: modelId }),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteNewArrival = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/new-arrivals/${id}`,
    {
      method: "DELETE",
    }
  );
};

export const updateNewArrivalsOrder = async (newArrivals: any[]) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/new-arrivals/order`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArrivals),
    }
  );
};
