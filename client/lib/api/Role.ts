import { Role } from "../type/Role";

export async function fetchRoles(params: URLSearchParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles?${params.toString()}`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
}

export const fetchRolesForSelection = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles/selection`
  );
  const data = await response.json();
  return data;
};

export const fetchRoleById = async (id: number): Promise<Role> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles/${id}`
  );
  return response.json();
};

export const createRole = async (data: {
  name: string;
  status: boolean;
}): Promise<Role> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const updateRole = async (
  id: number,
  data: { name: string; status: boolean }
): Promise<Role> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export async function deleteRole(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/roles/${id}`, {
    method: "DELETE",
  });
}
