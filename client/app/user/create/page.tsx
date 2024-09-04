"use client";

import { useParams, useRouter } from "next/navigation";
import UserForm from "@/components/UserForm";
import { createUser } from "@/lib/api/User";
import { User } from "@/lib/type/User";
import { useState } from "react";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";

const EditUserPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<User | undefined>(undefined);

  const handleSave = async (data: User) => {
    await createUser(data);
    router.push("/user/listing");
  };

  return (
    <Layout>
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Add User</h1>
        <UserForm user={user} onSave={handleSave} />
      </div>
    </Layout>
  );
};

export default withAuth(EditUserPage);
