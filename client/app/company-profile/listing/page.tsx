"use client";

import { useEffect, useState } from "react";
import { fetchCompanyProfiles } from "@/lib/api/CompanyProfile";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import Table from "@/components/Table";

const renderButtons = () => (
  <div className="flex space-x-1 my-1">
    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md">
      SO
    </button>
    <button className="bg-orange-500 text-white px-4 py-2 rounded-md">
      OH
    </button>
    <button className="bg-lime-500 text-white px-4 py-2 rounded-md">DO</button>
  </div>
);

const columns = [
  {
    header: "",
    key: "buttons",
    className: "whitespace-nowrap",
    customRender: () => renderButtons(),
  },
  {
    header: "Business Name",
    key: "legalName",
    className: "whitespace-wrap",
    customRender: (user: any) =>
      user.legalName ? (
        <span>{user.legalName}</span>
      ) : (
        <span className="text-gray-500">N/A</span>
      ),
  },
  {
    header: "Name",
    key: "name",
    className: "whitespace-wrap",
    customRender: (user: any) =>
      user.contactFirstName && user.contactLastName ? (
        <span>
          {user.contactFirstName} {user.contactLastName}
        </span>
      ) : (
        <span className="text-gray-500">N/A</span>
      ),
  },
  {
    header: "Email",
    key: "email",
    className: "whitespace-wrap",
    customRender: (user: any) =>
      user.email ? (
        <span>{user.email}</span>
      ) : (
        <span className="text-gray-500">N/A</span>
      ),
  },
  {
    header: "Customer Balance",
    key: "credit",
    className: "whitespace-wrap text-right",
    customRender: (user: any) => `$ ${user.credit}`,
  },
  {
    header: "SZ Contact",
    key: "szContact.firstName",
    className: "whitespace-wrap",
    customRender: (user: any) =>
      user.szContact?.firstName ? (
        <span>{user.szContact.firstName}</span>
      ) : (
        <span className="text-gray-500">N/A</span>
      ),
  },
];

const CompanyProfilesPage = () => {
  const [companyProfiles, setCompanyProfiles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isSearchClicked, setSearchClicked] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState(0);
  const [forbidden, setForbidden] = useState<boolean>(false);

  const fetchPageData = async (offset: number, limit: number) => {
    try {
      const params = new URLSearchParams({
        offset: String(offset),
        limit: String(limit),
        searchQuery: String(searchQuery),
        active: String(isActive),
      });
      const data = await fetchCompanyProfiles(params);
      if (data.statusCode == 403) setForbidden(true);
      setCompanyProfiles(data.data);
      setTotalRows(data.totalRows);
    } catch (error) {
      console.error("Failed to load company profiles", error);
    }
  };

  const handleSearch = () => {
    setSearchClicked(!isSearchClicked);
  };

  const handleClear = () => {
    setSearchQuery("");
    setIsActive(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Business Name, Customer Name, Email, Phone"
            className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
          />
          <div className="flex items-center">
            <label className="mr-2">Is Active?</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            SEARCH
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            CLEAR
          </button>
        </div>
        <Table
          columns={columns}
          data={companyProfiles}
          totalRows={totalRows}
          fetchPageData={fetchPageData}
          isSearched={isSearchClicked}
        />
      </div>
    </Layout>
  );
};

export default withAuth(CompanyProfilesPage);
