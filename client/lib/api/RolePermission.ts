import { Role } from "../type/Role";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchRoles = async (): Promise<Role[]> => {
  // Replace with your API call
  return await fetch(`${API_BASE_URL}/roles`).then((res) => res.json());
};

export const fetchModules = async (): Promise<Module[] | any> => {
  // Replace with your API call
  return await fetch(`${API_BASE_URL}/modules`).then((res) => res.json());
};

export const fetchRolePermissions = async (): Promise<
  RoleModulePermission[] | any
> => {
  // Replace with your API call
  return await fetch(`${API_BASE_URL}/role-modules`).then((res) => res.json());
};

export const updateRolePermissions = async (
  permissions: RoleModulePermission[]
): Promise<void> => {
  // Replace with your API call
  await fetch(`${API_BASE_URL}/role-modules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(permissions),
  });
};
