import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../ui/pagination";

interface EduPaginationProps {
  pagination: {
    current_page: number;
    last_page: number;
  };
  onPageChange?: (page: number) => void;
}

const EduPagination = ({ pagination, onPageChange }: EduPaginationProps) => {
  const { current_page, last_page } = pagination;
  const [maxPagesToShow, setMaxPagesToShow] = useState(10);

  // Dynamically adjust the number of visible pages based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setMaxPagesToShow(3); // Mobile: Show very few pages
      } else if (window.innerWidth < 768) {
        setMaxPagesToShow(5); // Tablets: Show a moderate amount
      } else {
        setMaxPagesToShow(10); // Desktop: Show full 10
      }
    };

    // Run once on mount to set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault(); // Prevent page jump
    if (onPageChange && page >= 1 && page <= last_page) {
      onPageChange(page);
    }
  };

  const getPages = () => {
    const pages: (number | string)[] = [];
    let startPage = Math.max(current_page - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, last_page);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      if (startPage > 2) pages.unshift("...");
      pages.unshift(1);
    }

    // Add last page and ellipsis if needed
    if (endPage < last_page) {
      if (endPage < last_page - 1) pages.push("...");
      pages.push(last_page);
    }

    return pages;
  };

  const pages = getPages();

  return (
    // Replaced hardcoded margins with responsive margins
    <Pagination className="flex justify-center mt-8 mb-6 sm:mt-12 sm:mb-8 w-full px-2">
      {/* Replaced w-4xl with w-full and added flex-wrap so it never overflows horizontally */}
      <PaginationContent className="flex flex-wrap justify-center w-full mx-auto gap-y-2">
        
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={`rounded-lg border transition-all hover:bg-gray-100 px-2 sm:px-4 h-8 sm:h-10 text-xs sm:text-sm ${
              current_page === 1
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={(e) => handleClick(e, current_page - 1)}
          />
        </PaginationItem>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
          {pages.map((page, idx) =>
            page === "..." ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis className="text-gray-400 w-6 sm:w-8" />
              </PaginationItem>
            ) : (
              <PaginationItem key={`page-${page}`}>
                <PaginationLink
                  href="#"
                  isActive={page === current_page}
                  className={`
                    flex items-center justify-center
                    w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-semibold transition-all border
                    ${
                      page === current_page
                        ? "bg-primary border-primary text-white shadow-md hover:bg-primary hover:text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-white hover:bg-primary"
                    }
                  `}
                  onClick={(e) => handleClick(e, page as number)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
        </div>

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            className={`rounded-lg border transition-all hover:bg-gray-100 px-2 sm:px-4 h-8 sm:h-10 text-xs sm:text-sm ${
              current_page === last_page
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={(e) => handleClick(e, current_page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default EduPagination;