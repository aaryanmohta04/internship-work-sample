"use client";

import withAuth from '@/components/withAuth';
import Layout from '@/components/Layout';

const DashboardPage = () => {
  return (
    <Layout>
      <div className="container">
        <h2 className="text-2xl font-bold">Dashboard Content</h2>
        <p>Your main content goes here.</p>
      </div>
    </Layout>
  );
}

export default withAuth(DashboardPage);