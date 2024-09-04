"use client";

import ForbiddenPage from "@/components/ForbiddenPage";
import Layout from "@/components/Layout";
import { fetchRoles } from "@/lib/api/Role";
import { fetchModules, fetchRolePermissions } from "@/lib/api/RolePermission";
import { Role } from "@/lib/type/Role";
import React, { useEffect, useState } from "react";

const RolePermissionsPage = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleModules, setRoleModules] = useState<RoleModulePermission[]>([]);
  const [forbidden, setForbidden] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const [modulesData, rolesData, roleModulesData] = await Promise.all([
        fetchModules(),
        fetchRoles(
          new URLSearchParams({
            offset: String(0),
            limit: String(0),
          })
        ),
        fetchRolePermissions(),
      ]);
      if (
        modulesData.statusCode == 403 ||
        rolesData.statusCode == 403 ||
        roleModulesData.statusCode == 403
      )
        setForbidden(true);
      setModules(buildModuleHierarchy(modulesData));
      setRoles(rolesData.data);
      setRoleModules(roleModulesData);
    };

    fetchData();
  }, []);

  const buildModuleHierarchy = (modulesData: Module[]) => {
    const moduleMap: { [key: number]: Module } = {};
    modulesData.forEach((module) => (moduleMap[module.id] = module));
    const rootModules: Module[] = [];

    modulesData.forEach((module) => {
      delete module.children;
      if (module.parentId == null) {
        rootModules.push(module);
      } else {
        const parent = moduleMap[module.parentId];
        //debugger;

        if (parent) {
          if (!parent.newchildren) parent.newchildren = [];
          parent.newchildren.push(module);
          //console.log('second if ',parent);
        }
      }
    });

    return rootModules;
  };

  const ParseName = (moduleName: string) => {
    if (moduleName.includes(" View")) return "View";
    if (moduleName.includes(" (Add/Edit)")) return "Add/Edit";
    if (moduleName.includes(" Delete")) return "Delete";
    return moduleName;
  };

  const renderModules = (modules: Module[], level = 0) => {
    return modules
      .filter((module) => module.id > 232) //remove once old roles are purged
      .map((module) => (
        <React.Fragment key={module.id}>
          <tr>
            <td
              style={{ paddingLeft: `${level * 20}px` }}
              className="sticky left-0 bg-white"
            >
              {module.newchildren && module.newchildren.length > 0 && (
                <span className="font-bold">➔</span>
              )}
              {ParseName(module.name)}
            </td>
            {roles.map((role) => {
              const roleModule = roleModules.find(
                (rm) => rm.moduleId === module.id && rm.roleId === role.id
              );
              return (
                <td key={role.id} className="text-center">
                  <input
                    type="checkbox"
                    checked={!!roleModule}
                    className={`form-checkbox ${
                      roleModule?.halfPermission
                        ? "form-checkbox-indeterminate"
                        : ""
                    }`}
                    readOnly
                  />
                </td>
              );
            })}
          </tr>
          {module.newchildren && renderModules(module.newchildren, level + 1)}
        </React.Fragment>
      ));
  };

  if (forbidden) return <ForbiddenPage />;
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="page-title">User Permissions</h1>
        <div className="overflow-auto max-h-[calc(100vh-150px)]">
          <table className="min-w-full bg-white mt-4">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-white z-30">
                  Menu
                </th>
                {roles.map((role) => (
                  <th
                    key={role.id}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-white z-20"
                  >
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderModules(modules)}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default RolePermissionsPage;
