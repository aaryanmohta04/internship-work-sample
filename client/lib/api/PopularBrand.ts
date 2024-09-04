// lib/api/popularBrand.ts

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPopularBrands = async () => {
  const response = await fetch(`${API_URL}/popular-brands`);
  const data = await response.json();
  return data;
};

export const addPopularBrand = async (brandId: number) => {
  const response = await fetch(`${API_URL}/popular-brands`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ brandId: brandId }),
  });
  const data = await response.json();
  return data;
};

export const updatePopularBrandOrder = async (
  popularBrands: { brand: Brand; order: number }[]
) => {
  return await fetch(`${API_URL}/popular-brands/order`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(popularBrands),
  });
};

export const deletePopularBrand = async (id: number) => {
  console.log(id);
  const response = await fetch(`${API_URL}/popular-brands/delete`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  return response;
};

export async function SearchPopularBrands(searchQuery: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/search?q=${searchQuery}`);
  const data = await response.json();
  return data;
}