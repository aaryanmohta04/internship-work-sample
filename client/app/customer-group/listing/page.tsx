"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import {
  deleteCustomerGroup,
  fetchCustomerGroups,
} from "@/lib/api/CustomerGroup";
import withAuth from "@/components/withAuth";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";

const CustomerGroupList = () => {
  const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [discontinued, setDiscontinued] = useState(false);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [isSearchClicked, setSearchClicked] = useState<boolean>(false);
  const router = useRouter();

  const columns = [
    { header: "Group Name", key: "name" },
    { header: "# of Customers", key: "customerCount" },
  ];

  const fetchPageData = async (
    offset: number,
    limit: number,
    isSearched?: boolean
  ) => {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
      search: String(searchQuery),
      discontinued: String(discontinued),
    });

    const [data] = await Promise.all([fetchCustomerGroups(params)]);
    if (data.statusCode == 403) {
      // setForbidden(true);
    } else {
      setCustomerGroups(data.data);
      setTotalRows(data.totalRows);
    }
  };

  const handleSearch = () => {
    setSearchClicked(!isSearchClicked);
  };

  const handleClear = () => {
    setSearchQuery("");
    setDiscontinued(false);
  };

  const handleEdit = (id: number) => {
    router.push(`/customer-group/${id}`);
  };

  const handleCreateClick = () => {
    router.push(`/customer-group/create`);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmed = confirm(
        "Are you sure you want to delete this customer group?"
      );
      if (confirmed) {
        await deleteCustomerGroup(id);
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type keyword here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Discontinued:</label>
              <input
                type="checkbox"
                checked={discontinued}
                onChange={(e) => setDiscontinued(e.target.checked)}
                className="form-checkbox h-5 w-5"
              />
            </div>
            <button onClick={handleSearch} className="btn btn-blue">
              SEARCH
            </button>
            <button onClick={handleClear} className="btn btn-gray">
              CLEAR
            </button>
          </div>
          <button onClick={handleCreateClick} className="btn-link">
            + Add Customer Group
          </button>
        </div>
        <Table
          columns={columns}
          data={customerGroups}
          totalRows={totalRows}
          onDelete={handleDelete}
          onEdit={handleEdit}
          fetchPageData={fetchPageData}
          isSearched={isSearchClicked}
        />
      </div>
    </Layout>
  );
};

export default withAuth(CustomerGroupList);
