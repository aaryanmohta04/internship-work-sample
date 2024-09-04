"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteStore, fetchStores } from "@/lib/api/Store";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";
import Table from "@/components/Table";
import ForbiddenPage from "@/components/ForbiddenPage";

const StoresPage = () => {
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [discontinued, setDiscontinued] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [forbidden, setForbidden] = useState<boolean>(false);

  const columns = [
    { header: "Warehouse (Store) Code", key: "code" },
    { header: "Warehouse (Store) Name", key: "name" },
    {
      header: "Warehouse (Store) Type",
      key: "type",
      className: "whitespace-wrap",
      customRender: (item: Store) =>
        item.type && item.type.length > 0 ? (
          item.type.map((type) => (
            <span
              key={type}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {type}
            </span>
          ))
        ) : (
          <span className="text-gray-500">No Class</span>
        ),
    },
  ];

  const fetchPageData = async (offset: number, limit: number) => {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    });
    const [data] = await Promise.all([fetchStores(params)]);
    if (data.statusCode == 403) setForbidden(true);
    setStores(data.data);
    setTotalRows(data.totalRows);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPageData(0, 10);
  };

  const handleClear = () => {
    setSearchQuery("");
    setDiscontinued(false);
    setCurrentPage(1);
    fetchPageData(0, 10);
  };

  const handleEdit = (id: number) => {
    router.push(`/store/${id}`);
  };

  const handleDelete = async (id: number) => {
    await deleteStore(id);
    fetchPageData(0, 10);
  };

  const handleCreate = () => {
    router.push("/store/create");
  };
  if (forbidden) return <ForbiddenPage />;
  return (
    <Layout>
      <div className="p-6 bg-white shadow-md rounded-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
              placeholder="Type keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Discontinued:
              </span>
              <input
                type="checkbox"
                checked={discontinued}
                onChange={(e) => setDiscontinued(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              SEARCH
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              CLEAR
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCreate}
              className="text-blue-600 hover:underline"
            >
              + Add Warehouse (Store)
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          data={stores}
          totalRows={totalRows}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fetchPageData={fetchPageData}
        />
      </div>
    </Layout>
  );
};

export default withAuth(StoresPage);
