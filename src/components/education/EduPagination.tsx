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

  const handleClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault(); // Prevent page jump
    if (onPageChange && page >= 1 && page <= last_page) {
      onPageChange(page);
    }
  };

  const getPages = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(current_page - 1, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, last_page);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      if (startPage > 2) pages.unshift("...");
      pages.unshift(1);
    }

    if (endPage < last_page) {
      if (endPage < last_page - 1) pages.push("...");
      pages.push(last_page);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <Pagination className="flex justify-center mt-12 mb-8">
      <PaginationContent className="flex justify-center w-4xl mx-auto">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={`rounded-lg border transition-all hover:bg-gray-100 ${
              current_page === 1
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={(e) => handleClick(e, current_page - 1)}
          />
        </PaginationItem>

        {/* Page Numbers */}
        <div className="flex items-center gap-1.5">
          {pages.map((page, idx) =>
            page === "..." ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis className="text-gray-400" />
              </PaginationItem>
            ) : (
              <PaginationItem key={`page-${page}`}>
                <PaginationLink
                  href="#"
                  isActive={page === current_page}
                  className={`
                    w-10 h-10 rounded-lg text-sm font-semibold transition-all border
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
            className={`rounded-lg border transition-all hover:bg-gray-100 ${
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
