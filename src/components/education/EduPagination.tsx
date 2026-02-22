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
  onPageChange?: (page: number) => void; // optional callback
}

const EduPagination = ({ pagination, onPageChange }: EduPaginationProps) => {
  const { current_page, last_page } = pagination;

  const handleClick = (page: number) => {
    if (onPageChange) onPageChange(page);
  };

  // Generate an array of pages to display with ellipsis logic
  const getPages = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5; // total visible page numbers (adjust as you like)
    let startPage = Math.max(current_page - 2, 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, last_page);

    // adjust startPage if at the end
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 2) {
      pages.unshift("...");
      pages.unshift(1);
    } else if (startPage === 2) {
      pages.unshift(1);
    }

    if (endPage < last_page - 1) {
      pages.push("...");
      pages.push(last_page);
    } else if (endPage === last_page - 1) {
      pages.push(last_page);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <Pagination className="flex justify-center mt-6">
      <PaginationContent className="space-x-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            disabled={current_page === 1}
            onClick={() => handleClick(current_page - 1)}
          />
        </PaginationItem>

        {pages.map((page, idx) =>
          page === "..." ? (
            <PaginationItem key={idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                isActive={page === current_page}
                onClick={() => handleClick(page as number)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            disabled={current_page === last_page}
            onClick={() => handleClick(current_page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default EduPagination;