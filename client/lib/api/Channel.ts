export async function fetchChannels() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/channels`
  );
  const data = await response.json();
  if (!response.ok) return [];
  return data;
}
