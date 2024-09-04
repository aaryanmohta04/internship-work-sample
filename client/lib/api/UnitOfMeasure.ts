export async function fetchUnitsOfMeasure(params: URLSearchParams) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/unit-of-measure?${params.toString()}`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
}
export async function fetchUnitsOfMeasurebyProductId(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/unit-of-measure/product/${id}`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
}

export async function deleteUnitOfMeasure(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/unit-of-measure/${id}`, {
    method: "DELETE",
  });
}
