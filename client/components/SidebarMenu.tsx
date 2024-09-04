"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArchiveBoxIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  CubeIcon,
  MegaphoneIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const menuData = [
  {
    title: "DASHBOARD",
    icon: UsersIcon,
    link: "/dashboard", // Direct link to the dashboard
    subMenu: [],
  },
  {
    title: "INVENTORY",
    icon: ArchiveBoxIcon,
    subMenu: [
      { title: "Brands", href: "/brand/listing" },
      { title: "Models", href: "/model/listing" },
      { title: "Products (Varieties)", href: "/product/listing" },
      { title: "U/M (Items)", href: "/units-of-measure/listing" },
      { title: "Manufacturer", href: "/manufacturer/listing" },
      { title: "Classes", href: "/class/listing" },
      { title: "Inventory Adjustments", href: "#" },
      { title: "Merge Inventory", href: "#" },
    ],
  },
  {
    title: "PURCHASE",
    icon: ShoppingBagIcon,
    subMenu: [
      { title: "Vendors", href: "/vendor/listing" },
      { title: "Print Labels", href: "#" },
      { title: "Price Updates", href: "#" },
    ],
  },
  {
    title: "SALES",
    icon: ChartBarIcon,
    subMenu: [
      { title: "Sales Order", href: "#" },
      { title: "POS", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Merge Customer", href: "#" },
      { title: "Customer Group", href: "/customer-group/listing" },
      { title: "Pricing Rules", href: "#" },
      { title: "Payment", href: "#" },
      { title: "Returns", href: "#" },
    ],
  },
  {
    title: "OPERATIONS",
    icon: CubeIcon,
    subMenu: [
      { title: "Picking", href: "#" },
      { title: "Invoices", href: "#" },
      { title: "Shipping", href: "#" },
      { title: "Pickup/Delivery", href: "#" },
      { title: "Manifest", href: "#" },
      { title: "Receiving", href: "#" },
      { title: "Test Transactions", href: "#" },
      { title: "Internal Transfer", href: "#" },
      { title: "Open Invoices", href: "#" },
    ],
  },
  {
    title: "MARKETING",
    icon: MegaphoneIcon,
    subMenu: [{ title: "Deals and Promotions", href: "#" }],
  },
  {
    title: "WAREHOUSE",
    icon: BuildingStorefrontIcon,
    subMenu: [{ title: "Stores", href: "/store/listing" }],
  },
  {
    title: "COMPLIANCE",
    icon: ShieldCheckIcon,
    subMenu: [{ title: "Tobacco Tax", href: "#" }],
  },
  {
    title: "CLIENTS",
    icon: UsersIcon,
    subMenu: [],
  },
  {
    title: "REPORTS",
    icon: UsersIcon,
    subMenu: [
      { title: "Account Payable", href: "#" },
      { title: "Account Receivable", href: "#" },
      { title: "Profitability Report", href: "#" },
      { title: "Valuation Report", href: "#" },
      { title: "Sales Reports", href: "#" },
      { title: "Vendor Reports", href: "#" },
      { title: "Payment Report", href: "#" },
      { title: "Credit Report", href: "#" },
      { title: "MSA Report", href: "#" },
      { title: "ACH Report", href: "#" },
      { title: "Hiram & Solomon Report", href: "#" },
      { title: "Reinado Report", href: "#" },
      { title: "Customer Report", href: "#" },
      { title: "Monthly Tax Report", href: "#" },
      { title: "Out of Stock Report", href: "#" },
      { title: "Negative QOH Report", href: "#" },
      { title: "Product Variety Report", href: "#" },
      { title: "Customer Acquisition Report", href: "#" },
      { title: "Ordering Reports", href: "#" },
    ],
  },
  {
    title: "USERS",
    icon: UsersIcon,
    subMenu: [
      { title: 'User List', href: '/user/listing' },
      { title: 'Roles', href: '/role/listing' },
      { title: 'Permissions', href: '/role-permission/listing' },
    ],
  },
  {
    title: "SETTINGS",
    icon: Cog6ToothIcon,
    subMenu: [
      { title: "Company Profile", href: "#" },
      { title: "Szwholesale.net", href: "/popular-brands/listing" },
      { title: "Payment Configuration", href: "/payment-config" },
    ],
  },
];

const SidebarMenu = () => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Set active menu based on the current route

    menuData.forEach((menu) => {
      if (menu.link === pathname) {
        setActiveMenu(menu.title);
      } else if (menu.subMenu.some((subMenu) => subMenu.href === pathname)) {
        setActiveMenu(menu.title);
      }
    });
  }, [pathname]);

  const handleMenuClick = (title: string) => {
    setActiveMenu(activeMenu === title ? "" : title);
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="px-2">
        <Image src="/logo.png" alt="Logo" width={332} height={78} />
      </div>
      <div className="flex flex-col px-4 overflow-y-auto">
        <ul>
          {menuData.map((menu, index) => (
            <li key={index} className="p-4">
              <div className="flex items-center">
                <menu.icon className="h-6 w-6 mr-2" />
                {menu.link ? (
                  <Link href={menu.link}>
                    <span
                      className={`text-lg font-medium cursor-pointer ${
                        pathname === menu.link ? "text-indigo-500" : ""
                      }`}
                    >
                      {menu.title}
                    </span>
                  </Link>
                ) : (
                  <div
                    className="flex items-center justify-between w-full"
                    onClick={() => handleMenuClick(menu.title)}
                  >
                    <span
                      className={`text-lg font-medium ${
                        activeMenu === menu.title ? "text-indigo-500" : ""
                      }`}
                    >
                      {menu.title}
                    </span>
                    <svg
                      className={`w-5 h-5 transform ${
                        activeMenu === menu.title ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
              {menu.subMenu.length > 0 && activeMenu === menu.title && (
                <ul className="pl-1 mt-2">
                  {menu.subMenu.map((subMenu, subIndex) => (
                    <li
                      key={subIndex}
                      className={`py-2 ${
                        pathname === subMenu.href ? "text-indigo-500" : ""
                      }`}
                    >
                      <Link href={subMenu.href}>
                        <span className="text-lg font-medium cursor-pointer">
                          {subMenu.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
