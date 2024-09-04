"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchManufacturerById, updateManufacturer } from '@/lib/api/Manufacturer';
import ManufacturerForm from '@/components/ManufacturerForm';
import Layout from '@/components/Layout';
import withAuth from '@/components/withAuth';

const UpdateManufacturer = () => {
  const router = useRouter();
  const { id } = useParams();
  const [manufacturer, setManufacturer] = useState<Manufacturer | null>(null);

  useEffect(() => {
    const fetchManufacturerData = async () => {
      if (typeof id === 'string') {
        try {
          const data = await fetchManufacturerById(parseInt(id, 10));
          setManufacturer(data);
        } catch (error) {
          console.error('Error fetching manufacturer:', error);
        }
      }
    };

    fetchManufacturerData();
  }, [id]);

  const handleUpdate = async (updatedData: Manufacturer) => {
    if (!manufacturer) return;

    try {
      await updateManufacturer(manufacturer.id, updatedData);
      router.push('/manufacturer/listing');
    } catch (error) {
      console.error('Error updating manufacturer:', error);
    }
  };

  if (!manufacturer) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
        <div className="container">
        <h1 className="page-title">Update Manufacturer</h1>
        <ManufacturerForm initialData={manufacturer} onSubmit={handleUpdate} />
        </div>
    </Layout>
  );
}

export default withAuth(UpdateManufacturer);