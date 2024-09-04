"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { Role } from "@/lib/type/Role";
import { deleteRole, fetchRoles } from "@/lib/api/Role";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import Table from "@/components/Table";
import ForbiddenPage from "@/components/ForbiddenPage";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<boolean>();
  const [totalRows, setTotalRows] = useState(0);
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [forbidden, setForbidden] = useState<boolean>(false);
  const router = useRouter();

  const columns = [
    { header: "Permission Level", key: "name" },
    { header: "Status", key: "status" },
  ];

  const fetchPageData = async (offset: number, limit: number) => {
    if (active == undefined) {
      setActive(false);
    }
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
      search: String(search),
      active: String(active),
    });
    const [data] = await Promise.all([fetchRoles(params)]);
    if (data.statusCode == 403) setForbidden(true);
    setRoles(data.data);
    setTotalRows(data.totalRows);
  };

  const handleSearch = () => {
    setSearchClicked(!isSearchClicked);
  };

  const handleClear = () => {
    setSearch("");
    setSearchClicked(!isSearchClicked);
    setActive(undefined);
  };

  const handleEditClick = (id: number) => {
    router.push(`/role/${id}`);
  };

  const handleDelete = (id: number) => {
    deleteRole(id);
    setRoles(roles.filter((role) => role.id != id));
    setTotalRows(totalRows - 1);
    fetchPageData(0, 10);
  };

  const handleCreateClick = () => {
    router.push("/role/create");
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
              placeholder="Search Keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Active:</span>
              <Switch
                checked={active}
                onChange={() => setActive(!active)}
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
              + Add User Role
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          data={roles}
          totalRows={totalRows}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          fetchPageData={fetchPageData}
          isSearched={isSearchClicked}
        />
      </div>
    </Layout>
  );
};

export default withAuth(RolesPage);
