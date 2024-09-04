"use client"

import { useState } from 'react';
//import { useRouter } from 'next/navigation';
import { updatePaymentApiKey } from '@/lib/api/PaymentConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import withAuth from '@/components/withAuth';

const PaymentConfigPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  //const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      //await updatePaymentApiKey(apiKey);
      //router.push('/success'); // Redirect to success page or show a success message
      toast.success('Payment API Key updated successfully');
    } catch (err) {
      setError('Failed to update payment API key');
    }
  };

  return (
    <Layout>
        <div className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-bold text-blue-600 mb-4">Payment Configuration</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                Payment API Key:
            </label>
            <input
                id="apiKey"
                name="apiKey"
                type="text"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
            />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                SAVE
            </button>
            </div>
        </form>
        <ToastContainer />
        </div>
    </Layout>
  );
};

export default withAuth(PaymentConfigPage);