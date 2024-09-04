export async function login(email: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  return response;
}

export async function fetchUsers(params: URLSearchParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?${params.toString()}`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
}

export async function fetchUser(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`
  );
  const data = await response.json();
  return data;
}

export async function deleteUser(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/delete/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

export async function createUser(data: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
}

export async function updateUser(id: number, data: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
}
