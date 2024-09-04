import Layout from "@/components/Layout";
import Router, { useRouter } from "next/navigation";
const ForbiddenPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <h1 className="w-full text-center p-10 text-2xl">
        You do not have access to view this resource!
      </h1>
      <div className="flex flex-row justify-center">
        <button
          onClick={() => router.push("/dashboard")}
          className=" text-center text-xl border border-black p-2"
        >
          Go to Dashboard
        </button>
      </div>
    </Layout>
  );
};

export default ForbiddenPage;
