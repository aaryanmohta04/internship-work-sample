export async function fetchProducts(params: URLSearchParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?${params.toString()}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
}

export async function fetchProductById(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    {
      method: "GET",
      body: JSON.stringify(product),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update product");
  }
  const data = await response.json();
  return data;
}

export async function createProduct(galleries: any[], product: Product) {
  console.log(JSON.stringify({ product: product, galleries: galleries }));
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: product, galleries: galleries }),
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteProduct(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
}
