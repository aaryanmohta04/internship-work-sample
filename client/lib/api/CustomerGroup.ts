export async function fetchCustomerGroups(params: URLSearchParams) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/customer-groups?${params.toString()}`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
}

export async function updateCustomerGroup(id: number, data: any) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-groups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteCustomerGroup(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-groups/${id}`, {
    method: "DELETE",
  });
}

export async function createCustomerGroup(customerGroupData: any) {
  const userId = parseInt(localStorage.getItem("id") || "");
  console.log(userId);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-groups`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...customerGroupData,
        userId: userId,
      }),
    }
  );
  const data = await response.json();
  return data;
}

export async function fetchCustomerGroupbyId(id: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-groups/${id}`,
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
