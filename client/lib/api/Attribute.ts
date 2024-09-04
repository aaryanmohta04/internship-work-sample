export async function fetchAttributes() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/attributes`);
    const data = await response.json();
    return data;
}