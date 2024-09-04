"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import { deleteProduct, fetchProducts } from "@/lib/api/Product";
import Table from "@/components/Table";

const ProductListingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [discontinued, setDiscontinued] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchClicked, setSearchClicked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalRows, setTotalRows] = useState(0);
  const [forbidden, setForbidden] = useState<boolean>(false);

  const router = useRouter();

  const columns = [
    { header: "Brand Name", key: "brand.name" },
    { header: "Model Name", key: "model.name" },
    { header: "Product (Varieties)", key: "name" },
    { header: "Manufacturer", key: "brand.manufacturer.name" },
    { header: "Default Class", key: "classEntity.name" },
  ];

  const fetchPageData = async (
    offset: number,
    limit: number,
    isSearched?: boolean
  ) => {
    try {
      console.log("fetching data with search Query : ", searchQuery);
      const params = new URLSearchParams({
        offset: String(offset),
        limit: String(limit),
        searchQuery: String(searchQuery),
      });
      const data = await fetchProducts(params);
      if (data.statusCode == 403) setForbidden(true);
      setProducts(data.data);
      setTotalRows(data.totalRows);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleSearch = () => {
    setSearchClicked(!isSearchClicked);
  };

  const handleClear = () => {
    setSearchQuery("");
    setDiscontinued(false);
    setCurrentPage(1);
    // fetchPageData();
  };

  const handleEdit = (id: number) => {
    router.push(`/product/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        // fetchPageData();
      } catch (error) {
        console.error("Failed to delete product:", error);
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
              placeholder="Search Product (Variety)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <button onClick={handleSearch} className="btn btn-blue">
              SEARCH
            </button>
            <button onClick={handleClear} className="btn btn-gray">
              CLEAR
            </button>
          </div>
          <button
            onClick={() => router.push("/product/create")}
            className="btn btn-green"
          >
            + Add Product (Variety)
          </button>
        </div>
        <Table
          columns={columns}
          data={products}
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

export default withAuth(ProductListingPage);
