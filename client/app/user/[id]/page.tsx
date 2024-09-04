"use client";

import { useParams, useRouter } from "next/navigation";
import UserForm from "@/components/UserForm";
import { fetchUser, updateUser, createUser } from "@/lib/api/User";
import { User } from "@/lib/type/User";
import { useEffect, useState } from "react";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";

const EditUserPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (id) {
      fetchUserData(Number(id));
    }
  }, [id]);

  const fetchUserData = async (id: number) => {
    const data = await fetchUser(id);
    setUser(data);
  };

  const handleSave = async (data: User) => {
    const currentUser = localStorage.getItem("id");
    if (currentUser == id) {
      localStorage.setItem("roles", JSON.stringify(data.userRoles));
    }
    if (id) {
      await updateUser(Number(id), data);
    } else {
      await createUser(data);
    }
    router.push("/user/listing");
  };

  return (
    <Layout>
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Update User</h1>
        <UserForm user={user} onSave={handleSave} />
      </div>
    </Layout>
  );
};

export default withAuth(EditUserPage);
