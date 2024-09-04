const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const updatePaymentApiKey = async (apiKey: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/payment`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiKey }),
  });

  if (!response.ok) {
    throw new Error('Failed to update payment API key');
  }
};