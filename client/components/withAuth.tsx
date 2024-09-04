/* eslint-disable react/display-name */
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUser } from "@/lib/api/User";
import { jwtDecode } from "jwt-decode";
import { setCache, getCache } from "@/lib/api/Cache";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);

      const handleUserFetch = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          if (!getCache("roles")) {
            const data = jwtDecode(token);
            const user = await fetchUser(Number(data.sub));
            setCache("roles", JSON.stringify(user.userRoles));
          }
        } else {
          router.push("/login");
        }
      };

      handleUserFetch();
    }, [router]);

    if (!isClient) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
