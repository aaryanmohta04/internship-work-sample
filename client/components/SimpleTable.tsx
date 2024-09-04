"use client";

import React from "react";

interface TableProps {
  columns: {
    header: string;
    key: string;
    customRender?: (item: any) => React.ReactNode;
    className?: string;
  }[];
  data: any[];
}

const SimpleTable: React.FC<TableProps> = ({ columns, data }) => {
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const formatBoolean = (value: any) => {
    if (typeof value === "boolean") {
      return value.toString();
    }
    return value;
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 mt-10">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td
                key={column.key}
                className={`px-6 py-4 border-b border-gray-300 ${
                  column.className || "whitespace-nowrap"
                }`}
              >
                {column.customRender
                  ? column.customRender(item)
                  : formatBoolean(getNestedValue(item, column.key))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;
