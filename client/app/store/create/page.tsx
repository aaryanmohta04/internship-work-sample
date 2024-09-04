"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createStore } from '@/lib/api/Store';
import StoreForm from '@/components/StoreForm';
import Layout from '@/components/Layout';
import withAuth from '@/components/withAuth';

const CreateStorePage = () => {
  const router = useRouter();
  const [storeData, setStoreData] = useState<Store>({
    code: '',
    name: '',
    type: [],
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phone: '',
    discontinued: false,
  });

  const handleSubmit = async (data: Store) => {
    if (!data) return;

    try {
      await createStore(data);
      router.push('/manufacturer/listing');
    } catch (error) {
      console.error('Error updating manufacturer:', error);
    }
  };

  return (
    <Layout>
        <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Add Store</h1>
        <StoreForm initialData={storeData} onSubmit={handleSubmit} />
        </div>
    </Layout>
  );
};

export default withAuth(CreateStorePage);