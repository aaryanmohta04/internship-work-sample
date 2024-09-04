"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { fetchRolesForSelection } from "@/lib/api/Role";
import { Role } from "@/lib/type/Role";
import { User } from "@/lib/type/User";
import { fetchUsers, deleteUser } from "@/lib/api/User";
import Table from "@/components/Table";
import SelectField from "@/components/SelectField";
import ForbiddenPage from "@/components/ForbiddenPage";

const UserListingPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [forbidden, setForbidden] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    fetchRolesData();
  }, []);

  const fetchPageData = async (
    offset: number,
    limit: number,
    isSearched?: boolean
  ) => {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
      search: String(search),
      role: String(role),
      active: String(active),
    });
    const [data] = await Promise.all([fetchUsers(params)]);
    if (data.statusCode == 403) setForbidden(true);
    setUsers(data.data);
    setTotalRows(data.totalRows);
  };

  const fetchRolesData = async () => {
    const params = new URLSearchParams({
      offset: String(0),
      limit: String(0),
    });
    const data = await fetchRolesForSelection();
    setRoles(data);
  };

  const handleCreateClick = () => {
    router.push(`/user/create`);
  };

  const handleSearch = () => {
    setSearchClicked(!isSearchClicked);
  };

  const handleClear = () => {
    setSearch("");
    setRole("");
    setActive(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id != id));
      setTotalRows(totalRows - 1);
    }
  };

  const columns = [
    {
      header: "Name",
      key: "firstName",
      className: "whitespace-wrap",
      customRender: (user: User) =>
        user.firstName && user.lastName ? (
          <span>
            {user.firstName} {user.lastName}
          </span>
        ) : (
          <span className="text-gray-500">N/A</span>
        ),
    },
    { header: "Username", key: "username" },
    { header: "Email Address", key: "email" },
    {
      header: "Contact #",
      key: "mobileNumber",
      className: "whitespace-wrap",
      customRender: (user: User) =>
        user.mobileNumber ? (
          <span className="text-gray-500">{user.mobileNumber}</span>
        ) : (
          <span className="text-gray-500">N/A</span>
        ),
    },
    {
      header: "Permission Level",
      key: "permissions",
      className: "whitespace-wrap",
      customRender: (user: User) =>
        user.userRoles && user.userRoles.length > 0 ? (
          user.userRoles.map((role: any) => (
            <span
              key={role.roleId}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {role.role.name}
            </span>
          ))
        ) : (
          <span className="text-gray-500">N/A</span>
        ),
    },
    {
      header: "Account Type",
      key: "type",
      className: "whitespace-wrap",
      customRender: (user: User) =>
        user.accountType ? (
          <span className="text-gray-500">{user.accountType.name}</span>
        ) : (
          <span className="text-gray-500">N/A</span>
        ),
    },
    {
      header: "Status",
      key: "status",
    },
  ];

  const handleEditClick = (id: number) => {
    router.push(`/user/${id}`);
  };

  if (forbidden) return <ForbiddenPage />;
  return (
    <Layout>
      <div className="container">
        <div className="flex-between mb-4">
          <div className="flex-center space-x-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="select-input"
              placeholder="Type keyword..."
            />
            <SelectField
              id={"selectRole"}
              value={role}
              data={roles}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Select Permission Level"
            />
            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                Active
              </label>
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleSearch} className="btn btn-blue">
              SEARCH
            </button>
            <button onClick={handleClear} className="btn btn-gray">
              CLEAR
            </button>
            <button onClick={handleCreateClick} className="btn-link">
              + Add User
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          data={users}
          totalRows={totalRows}
          onDelete={handleDelete}
          onEdit={handleEditClick}
          fetchPageData={fetchPageData}
          isSearched={isSearchClicked}
        />
      </div>
    </Layout>
  );
};

export default UserListingPage;
