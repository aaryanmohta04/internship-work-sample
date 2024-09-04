"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchModels } from "@/lib/api/Model";
import { Switch } from "@headlessui/react";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import ForbiddenPage from "@/components/ForbiddenPage";

const columns = [
  { header: "Brand", key: "brand.name" },
  { header: "Model", key: "name" },
  {
    header: "Class",
    key: "classes",
    className: "whitespace-wrap",
    customRender: (item: Model) =>
      item.classes && item.classes.length > 0 ? (
        item.classes.map((class1) => (
          <span
            key={class1 ? class1.id : 0}
            className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
          >
            {class1?.name}
          </span>
        ))
      ) : (
        <span className="text-gray-500">No Class</span>
      ),
  },
  //{ header: 'Products (Varieties)', key: 'msaRequired' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ModelsPage = () => {
  const [status, setStatus] = useState("all");
  const [models, setModels] = useState<Model[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState(true);
  const [totalRows, setTotalRows] = useState(10);
  const [forbidden, setForbidden] = useState<boolean>(false);
  const router = useRouter();

  const fetchPageData = async (offset: number, limit: number) => {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    });
    const [response] = await Promise.all([fetchModels(params)]);
    if (response.status == 403) {
      setForbidden(true);
    } else {
      const data = await response.json();
      setModels(data.data);
      setTotalRows(data.totalRows);
    }
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log("Search clicked");
  };

  const handleClear = () => {
    setSearchQuery("");
    setActive(true);
  };

  const handleEditClick = (id: number) => {
    router.push(`/models/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log("Delete clicked", id);
  };

  const handleCreateClick = () => {
    router.push("/models/create");
  };

  const handleExport = () => {
    // Implement export functionality
    console.log("Export clicked");
  };
  if (forbidden) return <ForbiddenPage />;
  else
    return (
      <Layout>
        <div className="p-6 bg-white shadow-md rounded-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="select-input"
              >
                <option value="all">Show All</option>
                <option value="active">Show Active</option>
                <option value="inactive">Show Inactive</option>
              </select>
              <input
                type="text"
                className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                placeholder="Search Model"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Discontinued:
                </span>
                <Switch
                  checked={active}
                  onChange={setActive}
                  className={classNames(
                    active ? "bg-green-600" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  )}
                >
                  <span
                    className={classNames(
                      active ? "translate-x-6" : "translate-x-1",
                      "inline-block h-4 w-4 transform bg-white rounded-full transition-transform"
                    )}
                  />
                </Switch>
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
                onClick={handleCreateClick}
                className="text-blue-600 hover:underline"
              >
                + Add Model
              </button>
            </div>
          </div>
          <Table
            columns={columns}
            data={models}
            totalRows={totalRows}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            fetchPageData={fetchPageData}
          />
        </div>
      </Layout>
    );
};

export default withAuth(ModelsPage);
