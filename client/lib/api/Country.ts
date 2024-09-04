export async function fetchCountries() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/countries`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
}
