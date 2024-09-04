// lib/api/companyProfileApi.ts

export const fetchCompanyProfiles = async (params: URLSearchParams) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/customers?${params.toString()}`
  );
  const data = await response.json();
  return data;
};
