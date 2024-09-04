export async function fetchManufacturers(
  offset: number,
  limit: number,
  searchQuery: string,
  discontinued: boolean,
  status: string
) {
  const queryParams = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
    searchQuery: searchQuery,
  });

  if (discontinued) {
    queryParams.append("discontinued", "true");
  }

  if (status === "active") {
    queryParams.append("active", "true");
  } else if (status === "inactive") {
    queryParams.append("active", "false");
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/manufacturers?${queryParams.toString()}`
  );
  const data = await response.json();
  return data;
}

export async function fetchManufacturerByBrandId(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/${id}/manufacturer`
  );
  const data = await response.json();
  return data;
}

export async function fetchManufacturersForSelection() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/manufacturers/selection`
  );
  const data = await response.json();
  return data;
}

export async function fetchManufacturerById(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/manufacturers/${id}`
  );
  const data = await response.json();
  return data;
}

export async function createManufacturer(manufacturer: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/manufacturers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(manufacturer),
    }
  );
  return response.json();
}

export async function updateManufacturer(id: number, manufacturer: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/manufacturers/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(manufacturer),
    }
  );
  return response.json();
}

export async function deleteManufacturer(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/manufacturers/${id}`, {
    method: "DELETE",
  });
}

export async function exportManufacturers() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/manufacturers/export/csv`
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "manufacturers.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting manufacturers:", error);
  }
}
