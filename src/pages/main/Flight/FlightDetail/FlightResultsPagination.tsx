import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePaginationPages } from "@/lib/utils";

interface FlightResultsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const FlightResultsPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: FlightResultsPaginationProps) => {
  const pages = generatePaginationPages({
    currentPage,
    totalPages,
  });

  return (
    <div className="flex justify-end pt-2">
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer rounded-md border bg-background hover:bg-muted"
              }
            />
          </PaginationItem>

          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                  className={`h-10 w-10 cursor-pointer rounded-md border text-sm font-medium ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer rounded-md border bg-background hover:bg-muted"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default FlightResultsPagination;
