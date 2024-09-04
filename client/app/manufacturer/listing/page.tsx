"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@headlessui/react";
import {
  fetchManufacturers,
  deleteManufacturer,
  exportManufacturers,
} from "@/lib/api/Manufacturer";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";
import Table from "@/components/Table";
import ForbiddenPage from "@/components/ForbiddenPage";

const columns = [
  { header: "Manufacturer Full Name", key: "name" },
  { header: "MSA Required?", key: "msaRequired" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ManufacturerListing = () => {
  const router = useRouter();
  const [discontinued, setDiscontinued] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [manufacturerData, setManufacturerData] = useState<Manufacturer[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [forbidden, setForbidden] = useState<boolean>(false);
  const fetchPageData = async (offset: number, limit: number) => {
    try {
      const [data] = await Promise.all([
        fetchManufacturers(offset, limit, searchQuery, discontinued, status),
      ]);
      if (data.statusCode == 403) setForbidden(true);
      setManufacturerData(data.data);
      setTotalRows(data.totalRows);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  const fetchManufacturersData = async () => {
    try {
      const { data } = await fetchManufacturers(
        currentPage,
        10,
        searchQuery,
        discontinued,
        status
      );
      if (data.statusCode == 403) setForbidden(true);
      setManufacturerData(data.data);
      setTotalRows(data.totalRows);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this brand?");
      if (confirmed) {
        await deleteManufacturer(id);
        fetchManufacturersData();
      }
    } catch (error) {
      console.error("Error deleting manufacturer:", error);
    }
  };

  const handleEditClick = (id: number) => {
    router.push(`/manufacturer/${id}`);
  };

  const handleCreateClick = () => {
    router.push(`/manufacturer/create`);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchManufacturersData();
  };

  const handleClear = () => {
    setSearchQuery("");
    setDiscontinued(false);
    setStatus("all");
    setCurrentPage(1);
    fetchManufacturersData();
  };

  const handleExport = () => {
    exportManufacturers();
  };

  if (forbidden) return <ForbiddenPage />;
  return (
    <Layout>
      <div className="container">
        <div className="flex-between">
          <div className="flex-center">
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
              className="select-input"
              placeholder="Search Manufacturer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex-gap">
              <span className="switch-label">Discontinued:</span>
              <Switch
                checked={discontinued}
                onChange={setDiscontinued}
                className={classNames(
                  "switch",
                  discontinued ? "switch-checked" : "switch-unchecked"
                )}
              >
                <span
                  className={classNames(
                    "switch-thumb",
                    discontinued
                      ? "switch-thumb-checked"
                      : "switch-thumb-unchecked"
                  )}
                />
              </Switch>
            </div>
            <button onClick={handleSearch} className="btn btn-blue">
              SEARCH
            </button>
            <button onClick={handleClear} className="btn btn-gray">
              CLEAR
            </button>
          </div>
          <div className="flex-center">
            <button onClick={handleCreateClick} className="btn-link">
              + Add Manufacturer
            </button>
            <button onClick={handleExport} className="btn btn-green">
              Export
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          data={manufacturerData}
          totalRows={totalRows}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          fetchPageData={fetchPageData}
        />
      </div>
    </Layout>
  );
};

export default withAuth(ManufacturerListing);
