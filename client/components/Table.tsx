"use client";

import React, { useState, useEffect } from "react";

interface TableProps {
  columns: {
    header: string;
    key: string;
    customRender?: (item: any) => React.ReactNode;
    className?: string;
  }[];
  data: any[];
  totalRows: number;
  fetchPageData: (
    page: number,
    rowsPerPage: number,
    isSearched?: boolean
  ) => Promise<void>;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  isSearched?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  totalRows,
  fetchPageData,
  onEdit,
  onDelete,
  isSearched,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages != 0) {
      setCurrentPage(totalPages);
    }
    fetchPageData((currentPage - 1) * rowsPerPage, rowsPerPage, isSearched);
  }, [currentPage, rowsPerPage, isSearched]);

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const formatBoolean = (value: any) => {
    if (typeof value === "boolean") {
      return value.toString();
    }
    return value;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 border border-grey">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-grey"
              >
                {column.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-grey">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 border border-grey">
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 border-b border-grey py-4${
                    column.className || "whitespace-nowrap"
                  }`}
                >
                  {column.customRender
                    ? column.customRender(item)
                    : formatBoolean(getNestedValue(item, column.key))}
                </td>
              ))}
              {(onDelete || onEdit) && (
                <td className="px-6 py-4  border-b border-grey whitespace-nowrap text-sm font-medium">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Rows per page:
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="px-1 py-2 ml-2 border border-gray-300 rounded-md"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Previous
          </button>
          <span className="mx-2">Page</span>
          <input
            type="number"
            id="pageNumber"
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="py-2 w-12 text-center border border-gray-300 rounded-md"
          />
          <span className="mx-2">of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
        <div>Total rows: {totalRows}</div>
      </div>
    </>
  );
};

export default Table;
