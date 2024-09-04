"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBrand, searchBrands, fetchBrands } from "@/lib/api/Brand";
import { fetchManufacturersForSelection } from "@/lib/api/Manufacturer";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import ForbiddenPage from "@/components/ForbiddenPage";

const BrandListingPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [search, setSearch] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [discontinued, setDiscontinued] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [forbidden, setForbidden] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchManufacturersData();
  }, []);

  const fetchPageData = async (offset: number, limit: number) => {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    });

    const [data] = await Promise.all([fetchBrands(params)]);
    if (data.statusCode == 403) {
      setForbidden(true);
    } else {
      setBrands(data.data);
      setTotalRows(data.totalRows);
    }
  };

  const fetchManufacturersData = async () => {
    const [data] = await Promise.all([fetchManufacturersForSelection()]);
    setManufacturers(data);
  };

  const handleCreateClick = () => {
    router.push(`/brand/create`);
  };

  const handleSearch = () => {
    const query = new URLSearchParams({
      search,
      manufacturer,
      discontinued: discontinued ? "true" : "false",
    });
    searchBrands(query).then((data) => setBrands(data));
  };

  const handleClear = () => {
    setSearch("");
    setManufacturer("");
    setDiscontinued(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this brand?");
      if (confirmed) {
        await deleteBrand(id);
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleEditClick = (id: number) => {
    router.push(`/brand/${id}`);
  };

  const columns = [
    { header: "Brand Full Name", key: "name" },
    { header: "Manufacturer", key: "manufacturer.name" },
    { header: "Models", key: "models.length" },
  ];
  if (forbidden) return <ForbiddenPage />;
  else
    return (
      <Layout>
        <div className="container">
          <div className="flex-between">
            <div className="flex-center">
              <label className="block text-sm font-medium text-gray-700">
                Search Brand
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="select-input"
              />

              <label className="block text-sm font-medium text-gray-700">
                Manufacturer
              </label>
              <select
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="select-input"
              >
                <option value="">Select manufacturer</option>
                {manufacturers.map((mfg) => (
                  <option key={mfg.id} value={mfg.id}>
                    {mfg.name}
                  </option>
                ))}
              </select>

              <label className="block text-sm font-medium text-gray-700 mr-2">
                Discontinued
              </label>
              <input
                type="checkbox"
                checked={discontinued}
                onChange={(e) => setDiscontinued(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
            </div>
            <button onClick={handleSearch} className="btn btn-blue">
              SEARCH
            </button>
            <button onClick={handleClear} className="btn btn-gray">
              CLEAR
            </button>
            <button onClick={handleCreateClick} className="btn-link">
              + Add Brand
            </button>
          </div>
          <Table
            columns={columns}
            data={brands}
            totalRows={totalRows}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            fetchPageData={fetchPageData}
          />
        </div>
      </Layout>
    );
};

export default withAuth(BrandListingPage);
