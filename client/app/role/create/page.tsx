"use client";

import Layout from "@/components/Layout";
import RoleForm from "@/components/RoleForm";
import withAuth from "@/components/withAuth";
import { createRole } from "@/lib/api/Role";
import { useRouter } from "next/navigation";

const CreateRolePage = () => {
  const router = useRouter();

  const handleSubmit = async (data: { name: string; status: boolean }) => {
    try {
      await createRole(data);
      router.push("/role/listing");
    } catch (error) {
      console.error("Failed to create role:", error);
    }
  };

  return (
    <Layout>
      <RoleForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/role/listing")}
      />
    </Layout>
  );
};

export default withAuth(CreateRolePage);
