"use client"

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Switch } from '@headlessui/react';
import { fetchAttributes } from '@/lib/api/Attribute';
import { fetchClasses, updateClass } from '@/lib/api/Class';
import withAuth from '@/components/withAuth';
import Layout from '@/components/Layout';

const UpdateClassPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [className, setClassName] = useState('');
  const [discontinued, setDiscontinued] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);

  useEffect(() => {
    if (id) {
      fetchClass();
    }
    fetchAttributesData();
  }, [id]);

  const fetchClass = async () => {
    const { data } = await fetchClasses();
    setClassName(data.name);
    setDiscontinued(data.status === 'inactive');
    setIsActive(data.isActive);
    setIsOnline(data.isOnline);
    setSelectedAttributes(data.classAttributes ? data.classAttributes.map((attr: ClassAttribute) => attr.attribute.id) : []);
  };

  const fetchAttributesData = async () => {
    const { data } = await fetchAttributes();
    setAttributes(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: className,
      status: discontinued ? 'inactive' : 'active',
      isActive,
      isOnline,
      attributes: selectedAttributes,
    };

    await updateClass(Number(id), payload);
    router.push('/class');
  };

  const handleAttributeChange = (attributeId: number) => {
    if (selectedAttributes.includes(attributeId)) {
      setSelectedAttributes(selectedAttributes.filter((id) => id !== attributeId));
    } else {
      setSelectedAttributes([...selectedAttributes, attributeId]);
    }
  };

  return (
    <Layout>
        <div className="container">
        <h1 className="page-title">Update Class</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Class Name</label>
            <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Discontinued</label>
            <Switch
                checked={discontinued}
                onChange={setDiscontinued}
                className={`${discontinued ? 'bg-red-600' : 'bg-gray-200'}
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                aria-hidden="true"
                className={`${discontinued ? 'translate-x-5' : 'translate-x-0'}
                pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
            </Switch>
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Online</label>
            <Switch
                checked={isOnline}
                onChange={setIsOnline}
                className={`${isOnline ? 'bg-green-600' : 'bg-gray-200'}
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                aria-hidden="true"
                className={`${isOnline ? 'translate-x-5' : 'translate-x-0'}
                pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
            </Switch>
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Active</label>
            <Switch
                checked={isActive}
                onChange={setIsActive}
                className={`${isActive ? 'bg-green-600' : 'bg-gray-200'}
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                aria-hidden="true"
                className={`${isActive ? 'translate-x-5' : 'translate-x-0'}
                pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
            </Switch>
            </div>
            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Attributes</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {attributes.map((attribute) => (
                <div key={attribute.id} className="flex items-center">
                    <input
                    type="checkbox"
                    checked={selectedAttributes.includes(attribute.id)}
                    onChange={() => handleAttributeChange(attribute.id)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <label className="ml-2 text-sm text-gray-700">{attribute.displayName}</label>
                </div>
                ))}
            </div>
            </div>
            <div className="flex justify-end space-x-4">
            <button
                type="button"
                onClick={() => router.push('/class/listing')}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
                CANCEL
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                UPDATE
            </button>
            </div>
        </form>
        </div>
    </Layout>
  );
};

export default withAuth(UpdateClassPage);