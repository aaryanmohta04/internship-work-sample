export const fetchBanners = async (): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/website-banner`
  );
  if (!response.ok && response.status != 403) {
    return [];
  }
  return response.json();
};

export const createBanner = async (
  banner: WebsiteBanner
): Promise<WebsiteBanner> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/website-banner`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(banner),
    }
  );
  return response.json();
};

export const uploadFile = async (
  file: any,
  location: string
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/s3/upload/${location}`,
      {
        method: "POST",
        body: file,
      }
    );
    if (!response.ok) {
      console.log("file upload failed");
    }
    return;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const updateBanner = async (
  id: number,
  banner: WebsiteBanner
): Promise<WebsiteBanner> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/website-banner/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(banner),
    }
  );
  return response.json();
};

export const deleteBanner = async (id: number): Promise<void> => {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/website-banner/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
};

export const updateBannerOrder = async (
  Banners: { id: number; order: number }[]
) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/website-banner/order`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Banners),
    }
  );
};
