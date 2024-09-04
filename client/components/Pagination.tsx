"use client";

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRowsPerPageChange(Number(event.target.value));
  };

  return (
    <div className="flex flex-wrap justify-between items-center mt-4 p-4 bg-white shadow rounded-md">
      <div className="flex items-center mb-2 sm:mb-0">
        <span className="mr-2">Items per page:</span>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="ml-2 border border-gray-300 rounded-md"
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center mb-2 sm:mb-0">
      <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-4 py-1 border border-gray-300 rounded-l-md"
        >
          &laquo;
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-1 border border-gray-300"
        >
          &lsaquo;
        </button>
        <span className="px-2 mr-2">Page </span>
        <input
          type="number"
          value={currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
          className="w-12 text-center border border-gray-300 rounded-md mx-2"
        />
        <span className="mr-2">of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-1 border border-gray-300"
        >
          &rsaquo;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-1 border border-gray-300 rounded-r-md"
        >
          &raquo;
        </button>
      </div>
      <div className="mt-2 sm:mt-0">
        Total rows: {totalRows}
      </div>
    </div>
  );
};

export default Pagination;