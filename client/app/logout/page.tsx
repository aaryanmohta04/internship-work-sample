"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { resetCache } from "@/lib/api/Cache";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    resetCache();
    router.push("/login");
  }, [router]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
