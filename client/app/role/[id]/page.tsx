"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import RoleForm from "../../../components/RoleForm";
import { fetchRoleById, updateRole } from "@/lib/api/Role";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";

const EditRolePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<{
    name: string;
    isActive: boolean;
  } | null>(null);

  useEffect(() => {
    if (id) {
      const getRole = async () => {
        try {
          const role = await fetchRoleById(Number(id));
          setInitialData({
            name: role.name,
            isActive: role.status === "active",
          });
        } catch (error) {
          console.error("Failed to fetch role:", error);
        }
      };

      getRole();
    }
  }, [id]);

  const handleSubmit = async (data: { name: string; status: boolean }) => {
    try {
      await updateRole(Number(id), data);
      router.push("/role/listing");
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    initialData && (
      <Layout>
        <RoleForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/role/listing")}
        />
      </Layout>
    )
  );
};

export default withAuth(EditRolePage);
