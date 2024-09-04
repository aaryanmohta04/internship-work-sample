"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fetchCustomerGroupbyId,
  updateCustomerGroup,
} from "@/lib/api/CustomerGroup";
import CustomerGroupForm, {
  CustomerGroup,
} from "@/components/CustomerGroupForm";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";

const UpdateCustomerGroups = () => {
  const router = useRouter();
  const { id } = useParams();
  const [customerGroup, setCustomerGroup] = useState<CustomerGroup | null>(
    null
  );

  useEffect(() => {
    const fetchCustomerGroupData = async () => {
      if (typeof id === "string") {
        try {
          const data = await fetchCustomerGroupbyId(parseInt(id, 10));
          setCustomerGroup(data);
        } catch (error) {
          console.error("Error fetching Customer Group:", error);
        }
      }
    };

    fetchCustomerGroupData();
  }, [id]);

  const handleUpdate = async (updatedData: CustomerGroup) => {
    if (!customerGroup) return;

    try {
      await updateCustomerGroup(customerGroup.id || -1, updatedData);
      router.push("/customer-group/listing");
    } catch (error) {
      console.error("Error updating customer Group:", error);
    }
  };

  if (!customerGroup) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container">
        <h1 className="page-title">Update Customer Group</h1>
        <CustomerGroupForm
          initialData={customerGroup}
          onSubmit={handleUpdate}
        />
      </div>
    </Layout>
  );
};

export default withAuth(UpdateCustomerGroups);
