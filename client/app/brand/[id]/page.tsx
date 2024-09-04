"use client"

import BrandForm from '@/components/BrandForm';
import Layout from '@/components/Layout';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchBrand = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/${id}`);
  const data = await response.json();
  return data;
};

const UpdateBrandPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBrand(id as string).then(setBrandData);
    }
  }, [id]);

  const handleSubmit = async (payload: any) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    router.push('/brand/listing');
  };

  return (
    <Layout>
        <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Update Brand</h1>
        {brandData ? <BrandForm initialData={brandData} onSubmit={handleSubmit} /> : <p>Loading...</p>}
        </div>
    </Layout>
  );
};

export default UpdateBrandPage;