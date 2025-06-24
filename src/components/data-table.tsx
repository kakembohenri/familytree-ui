/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import Pagination from "./pagination";
import { Skeleton } from "./ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: { original: TData }) => void;
  isLoading?: boolean;
  filterDataByDateRange?: (row: any, dateRange: any) => boolean;
  limit: number;
  page: number;
  totalItems: number;
  onPageChange: (setpage: number) => Promise<void>;
  onLimitChange: (setlimit: number) => Promise<void>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  isLoading,
  filterDataByDateRange,
  limit,
  page,
  totalItems,
  onPageChange,
  onLimitChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [tableData, setTableData] = useState<TData[] | any[]>(
    Array(5).fill({})
  );
  const [showFilters, setShowFilters] = useState(false);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    if (isLoading) {
      setTableData(Array(5).fill({})); // Show default placeholder data
    } else {
      const delay = setTimeout(() => {
        setTableData(data!);
      }, 300); // Adjust delay time as needed
      return () => clearTimeout(delay); // Cleanup on unmount or re-run
    }
  }, [isLoading, data]);

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => (
              <Skeleton
                className="h-[14px] w-[60%] rounded-sm top-[39px]"
                style={{ height: "14px" }}
              />
            ),
          }))
        : columns,
    [isLoading]
  );

  useMemo(() => {
    if (!dateRange?.from || !filterDataByDateRange) return setTableData(data);

    setTableData(data.filter((row) => filterDataByDateRange(row, dateRange)));
  }, [dateRange]);

  const table = useReactTable({
    // data,
    data: tableData,
    columns: tableColumns,
    onPaginationChange: setPagination,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const isFiltered =
    table.getState().columnFilters.length > 0 || dateRange !== undefined;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search users...`}
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className="w-[300px] pl-8"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-muted" : ""}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle filters</span>
          </Button>
          {isFiltered && (
            <Button
              variant="secondary"
              onClick={() => {
                table.resetColumnFilters();
                setDateRange(undefined);
              }}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={cn(onRowClick && "cursor-pointer hover:bg-accent")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="p-4">
          <Pagination
            totalItems={totalItems}
            initialPage={page}
            initialLimit={limit}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
          />
        </div>
      </div>
    </div>
  );
}
