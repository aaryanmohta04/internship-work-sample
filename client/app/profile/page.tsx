"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProfileForm from "@/components/ProfileForm";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";
import { fetchUser, updateUser } from "@/lib/api/User";

const ProfilePage = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Fetch user data (replace with actual user ID)
    const fetchUserData = async () => {
      const data  = await fetchUser();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (data: Partial<User>) => {
    try {
      await updateUser(data);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      router.push("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container">
        <h1 className="page-title">Update Profile</h1>
        <ProfileForm initialData={userData} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default withAuth(ProfilePage);
