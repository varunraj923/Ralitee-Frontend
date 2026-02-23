import React from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ page, totalPages, category, categoryId }) => {
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setSearchParams({ category, id: categoryId, page: newPage});
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center gap-2 flex-wrap">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 rounded ${
              page === pageNumber ? "bg-black text-white" : "border"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
