export async function fetchClasses(params: URLSearchParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/classes?${params.toString()}`
  );
  const data = await response.json();
  return data;
}

export async function fetchClassById(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/${id}`
  );
  const data = await response.json();
  return data;
}

export async function fetchClassesbyModelId(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/${id}/classes`
  );
  if (!response.ok) return [];
  const data = await response.json();
  return data;
}

export async function searchClasses(
  searchQuery: string,
  discontinued: boolean
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/classes?search=${searchQuery}&discontinued=${discontinued}`
  );
  const data = await response.json();
  return data;
}

export async function fetchClassesForSelection() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/selection`
  );
  const data = await response.json();
  return data;
}

export async function createClass(data: any) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateClass(id: number, data: any) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteClass(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/${id}`, {
    method: "DELETE",
  });
}
