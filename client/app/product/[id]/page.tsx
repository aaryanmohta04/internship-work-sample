"use client";

import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductById, updateProduct } from "@/lib/api/Product";

const UpdateProductPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [productData, setProductData] = useState<any>();

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const product = await fetchProductById(String(id));
        console.log(product);
        setProductData(product);
      };
      getProduct();
    }
  }, [id]);

  const handleSubmit = async (payload: any) => {
    updateProduct(id as string, payload);
    router.push("/product/listing");
  };

  return (
    <Layout>
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Update Product</h1>
        {productData ? (
          <ProductForm defaultProduct={productData} onSubmit={handleSubmit} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
};

export default UpdateProductPage;
