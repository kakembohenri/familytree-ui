"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PaginationProps {
  totalItems: number;
  initialPage?: number;
  initialLimit?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export default function Pagination({
  totalItems,
  initialPage = 1,
  initialLimit = 10,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  const handleLimitChange = (value: string) => {
    const newLimit = Number.parseInt(value);
    setLimit(newLimit);
    onLimitChange?.(newLimit);

    // Adjust current page if it would exceed the new total pages
    const newTotalPages = Math.ceil(totalItems / newLimit);
    if (currentPage > newTotalPages) {
      handlePageChange(newTotalPages);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Items per page:</span>
        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder={limit.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center mx-2">
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {Math.min((currentPage - 1) * limit + 1, totalItems)} -{" "}
        {Math.min(currentPage * limit, totalItems)} of {totalItems} items
      </div>
    </div>
  );
}
