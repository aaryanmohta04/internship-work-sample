"use client";

import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";
import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/lib/api/Product";
import { uploadFile } from "@/lib/api/WebsiteBanner";

function addImageProcess(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve({ height: img.height, width: img.width });
    img.onerror = reject;
  });
}

const AddProduct = () => {
  const handleCreate = async (data: any) => {
    try {
      var galleries = [];
      for (var file of data.images) {
        const imagePath = "uploads/product_variety/" + file.file.name;
        const newFile = new File([file.file], imagePath, {
          type: "application/octet-stream",
        });
        let fileData = new FormData();
        fileData.append("file", newFile);
        const imageDimensions = await addImageProcess(file.url);
        galleries.push({
          imageName: file.file.name,
          imagePath: imagePath,
          width: imageDimensions.width,
          height: imageDimensions.height,
          size: file.file.size,
          updatedBy: localStorage.getItem("id"),
          createdBy: localStorage.getItem("id"),
          order: 1,
        });
        await uploadFile(fileData, "product_variety");
      }
      delete data.images;
      await createProduct(galleries, data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="page-title">Add Product</h1>
        <ProductForm onSubmit={handleCreate} />
      </div>
    </Layout>
  );
};

export default withAuth(AddProduct);
