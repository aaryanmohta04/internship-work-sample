export async function fetchAccountTypes() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/account-type`);
    const data = await response.json();
    return data;
}