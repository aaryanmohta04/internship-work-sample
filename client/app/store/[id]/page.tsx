"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import StoreForm from '@/components/StoreForm';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import withAuth from '@/components/withAuth';
import { fetchStoreById, updateStore } from '@/lib/api/Store';

const EditStorePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [storeData, setStoreData] = useState<Store | null>(null);

  useEffect(() => {
    if (id) {
      fetchStoreData();
    }
  }, [id]);

  const fetchStoreData = async () => {
    const { data } = await fetchStoreById(Number(id));
    setStoreData(data);
  };

  const handleSubmit = async (data: Store) => {
    if (!data) return;

    try {
      await updateStore(Number(id), data);
      router.push('/store/listing');
    } catch (error) {
      console.error('Error updating store:', error);
    }
  };

  if (!storeData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
        <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Edit Store</h1>
        <StoreForm initialData={storeData} onSubmit={handleSubmit} />
        </div>
    </Layout>
  );
};

export default withAuth(EditStorePage);