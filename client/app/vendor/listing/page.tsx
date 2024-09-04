"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import { fetchVendors, deleteVendor } from "@/lib/api/Vendor";
import Table from "@/components/Table";
import ForbiddenPage from "@/components/ForbiddenPage";

const VendorListingPage = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [forbidden, setForbidden] = useState<boolean>(false);
  const router = useRouter();

  const columns = [
    { header: "Vendor Name", key: "name" },
    { header: "Terms", key: "term" },
    { header: "Is Active?", key: "status" },
    {
      header: "Contact",
      key: "contact",
      className: "whitespace-wrap",
      customRender: (item: Vendor) =>
        item.contacts[0] ? (
          <span>
            {item.contacts[0].firstName} {item.contacts[0].lastName}
          </span>
        ) : (
          <span></span>
        ),
    },
    {
      header: "Email",
      key: "email",
      className: "whitespace-wrap",
      customRender: (item: Vendor) =>
        item.contacts[0] ? (
          <span>{item.contacts[0].email}</span>
        ) : (
          <span></span>
        ),
    },
    {
      header: "Phone",
      key: "phone",
      className: "whitespace-wrap",
      customRender: (item: Vendor) =>
        item.contacts[0] ? (
          <span>{item.contacts[0].mobileNumber}</span>
        ) : (
          <span></span>
        ),
    },
  ];

  const fetchPageData = async (offset: number, limit: number) => {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    });
    const [data] = await Promise.all([fetchVendors(params)]);
    if (data.statusCode == 403) setForbidden(true);
    setVendors(data.data);
    setTotalRows(data.totalRows);
  };

  const handleCreateClick = () => {
    router.push(`/vendor/create`);
  };

  const handleSearch = () => {
    const query = new URLSearchParams({
      search,
      active: active ? "true" : "false",
    });
    //searchVendors(query).then((data: any) => setVendors(data));
  };

  const handleClear = () => {
    setSearch("");
    setActive(true);
    fetchPageData(0, 10);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this vendor?");
      if (confirmed) {
        await deleteVendor(id);
        fetchPageData(0, 10);
      }
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  const handleEditClick = (id: number) => {
    router.push(`/vendor/${id}`);
  };
  if (forbidden) return <ForbiddenPage />;
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="select-input"
              placeholder="Search Vendor"
            />
            <label className="block text-sm font-medium text-gray-700">
              Active
            </label>
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleSearch} className="btn btn-blue">
              SEARCH
            </button>
            <button onClick={handleClear} className="btn btn-gray">
              CLEAR
            </button>
            <button onClick={handleCreateClick} className="btn-link">
              + Add Vendor
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          data={vendors}
          totalRows={totalRows}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          fetchPageData={fetchPageData}
        />
      </div>
    </Layout>
  );
};

export default withAuth(VendorListingPage);
