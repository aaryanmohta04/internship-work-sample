"use client";

import { useRouter } from 'next/navigation';
import ManufacturerForm from '@/components/ManufacturerForm';
import { createManufacturer } from '@/lib/api/Manufacturer';
import Layout from '@/components/Layout';
import withAuth from '@/components/withAuth';

const AddManufacturer = () => {
  const router = useRouter();

  const handleCreate = async (manufacturer: { name: string; msaRequired: boolean; discontinued: boolean; active: boolean; }) => {
    try {
      await createManufacturer(manufacturer);
      router.push('/manufacturer/listing');
    } catch (error) {
      console.error('Error creating manufacturer:', error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="page-title">Add Manufacturer</h1>
        <ManufacturerForm onSubmit={handleCreate} />
      </div>
    </Layout>
  );
}

export default withAuth(AddManufacturer);