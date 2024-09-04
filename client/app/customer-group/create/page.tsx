"use client";

import { useRouter } from "next/navigation";
import CustomerGroupForm from "@/components/CustomerGroupForm";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";
import { createCustomerGroup } from "@/lib/api/CustomerGroup";

const AddCustomerGroup = () => {
  const router = useRouter();

  const handleCreate = async (customerGroup: {
    name: string;
    status: string;
    customerCount?: number;
  }) => {
    try {
      await createCustomerGroup(customerGroup);
      router.push("/customer-group/listing");
    } catch (error) {
      console.error("Error creating customer Group:", error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="page-title">Add Customer Group</h1>
        <CustomerGroupForm onSubmit={handleCreate} />
      </div>
    </Layout>
  );
};

export default withAuth(AddCustomerGroup);
