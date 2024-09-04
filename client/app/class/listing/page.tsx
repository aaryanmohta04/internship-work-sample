"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteClass, fetchClasses, searchClasses } from "@/lib/api/Class";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import ForbiddenPage from "@/components/ForbiddenPage";

const ClassListPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState("all");
  const [classes, setClasses] = useState<Class[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [discontinued, setDiscontinued] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [forbidden, setForbidden] = useState<boolean>(false);

  const columns = [
    { header: "Class Name", key: "name" },
    {
      header: "Attributes",
      key: "classAttributes",
      className: "whitespace-wrap",
      customRender: (item: Class) =>
        item.classAttributes && item.classAttributes.length > 0 ? (
          item.classAttributes.map((classAttribute) => (
            <span
              key={classAttribute.id}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {classAttribute.attribute.displayName}
            </span>
          ))
        ) : (
          <span className="text-gray-500">No Attributes</span>
        ),
    },
  ];

  const fetchPageData = async (offset: number, limit: number) => {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    });
    const [data] = await Promise.all([fetchClasses(params)]);
    if (data.statusCode == 403) {
      setForbidden(true);
    } else {
      setClasses(data.data);
      setTotalRows(data.totalRows);
    }
  };

  const handleSearch = async () => {
    const [data] = await Promise.all([
      searchClasses(searchQuery, discontinued),
    ]);
    setClasses(data);
  };

  const handleClear = () => {
    setSearchQuery("");
    setDiscontinued(false);
    fetchPageData(0, 10);
  };

  const handleCreateClick = () => {
    router.push("/class/create");
  };

  const handleEdit = (id: number) => {
    router.push(`/class/${id}`);
  };

  const handleDelete = async (id: number) => {
    deleteClass(id);
    fetchPageData(0, 10);
  };
  if (forbidden) return <ForbiddenPage />;

  return (
    <Layout>
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
            >
              <option value="all">Show All</option>
              <option value="active">Show Active</option>
              <option value="inactive">Show Inactive</option>
            </select>
            <input
              type="text"
              className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
              placeholder="Search Class"
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
          <button
            onClick={handleCreateClick}
            className="text-blue-600 hover:underline"
          >
            + Add Class
          </button>
        </div>
        <Table
          columns={columns}
          data={classes}
          totalRows={totalRows}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fetchPageData={fetchPageData}
        />
      </div>
    </Layout>
  );
};

export default withAuth(ClassListPage);
