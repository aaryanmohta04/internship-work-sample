"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import {
  deleteUnitOfMeasure,
  fetchUnitsOfMeasure,
} from "@/lib/api/UnitOfMeasure";
import Table from "@/components/Table";

const UnitsOfMeasureList = () => {
  const [units, setUnits] = useState<UnitOfMeasure[]>([]);
  const [discontinued, setDiscontinued] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchClicked, setSearchClicked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalRows, setTotalRows] = useState(0);

  const router = useRouter();

  const columns = [
    { header: "U/M (Item)", key: "name" },
    { header: "QOH", key: "qoh" },
    {
      header: "Discontinued",
      key: "discontinued",
      customRender: (product: any) =>
        product.discontinued ? <span>Yes</span> : <span>No</span>,
    },
    {
      header: "Online",
      key: "isOnline",
      customRender: (product: any) =>
        product.isOnline ? <span>Yes</span> : <span>No</span>,
    },
    {
      header: "List Price",
      key: "listPrice",
      customRender: (product: any) => <span>{`$${product.listPrice}`}</span>,
    },
    {
      header: "Avg. Cost",
      key: "averageCost",
      customRender: (product: any) => <span>{`$${product.averageCost}`}</span>,
    },
    {
      header: "SZ Margin",
      key: "szMargin",
      customRender: (product: any) => <span>{`${product.szMargin}%`}</span>,
    },
  ];

  const fetchPageData = async (
    offset: number,
    limit: number,
    isSearched?: boolean
  ) => {
    try {
      const params = new URLSearchParams({
        offset: String(offset),
        limit: String(limit),
        searchQuery: String(searchQuery),
        discontinued: String(discontinued),
      });
      const response = await fetchUnitsOfMeasure(params);
      setUnits(response.data);
      setTotalRows(response.totalRows);
    } catch (error) {
      console.error("Failed to fetch units of measure:", error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchClicked(!isSearchClicked);
  };

  const handleClear = () => {
    setSearchQuery("");
    setDiscontinued(false);
    setCurrentPage(1);
    setSearchClicked(!isSearchClicked);
  };

  const handleEdit = (id: number) => {
    router.push(`/units-of-measure/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this U/M?")) {
      try {
        await deleteUnitOfMeasure(id);
        fetchPageData(currentPage - 1, 10); // Re-fetch data after deletion
      } catch (error) {
        console.error("Failed to delete unit of measure:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search U/M (Item) Name OR Brand"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <label className="flex items-center space-x-2">
              <span className="text-gray-700">Discontinued</span>
              <input
                type="checkbox"
                checked={discontinued}
                onChange={(e) => setDiscontinued(e.target.checked)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
            </label>
            <button onClick={handleSearch} className="btn btn-blue">
              SEARCH
            </button>
            <button onClick={handleClear} className="btn btn-gray">
              CLEAR
            </button>
          </div>
          <button
            onClick={() => router.push("/units-of-measure/create")}
            className="btn btn-green"
          >
            + Add U/M (Item)
          </button>
        </div>
        <Table
          columns={columns}
          data={units}
          totalRows={totalRows}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fetchPageData={fetchPageData}
          isSearched={isSearchClicked}
        />
      </div>
    </Layout>
  );
};

export default withAuth(UnitsOfMeasureList);
