"use client"

import { useRouter } from 'next/navigation';
import BrandForm from '../../../components/BrandForm';
import Layout from '@/components/Layout';

const AddBrandPage = () => {
  const router = useRouter();

  const handleSubmit = async (payload: any) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands`, {
      method: 'POST',
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
        <h1 className="text-2xl font-bold mb-4">Add Brand</h1>
        <BrandForm onSubmit={handleSubmit} />
        </div>
    </Layout>
  );
};

export default AddBrandPage;