'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { UsageReport } from '@/types/usage';
import { formatTimestamp } from '@/lib/utils';
import DashboardSkeleton from './dashboard-skeleton';
import CreditBarChart from './credit-chart';
import { getUsageByUserId } from '@/app/api/getUsage';

interface UsageTableProps {
  userId: number;
}

export default function UsageDashboard({ userId }: UsageTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reports, setReports] = useState<UsageReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoize the initial sorting state
  const initialSortingState = useMemo(() => {
    const sortParams = searchParams.getAll('sort');
    return sortParams.map((param) => {
      const [id, direction] = param.split(':');
      return {
        id,
        desc: direction === 'desc',
      };
    });
  }, [searchParams]);

  const [sorting, setSorting] = useState<SortingState>(initialSortingState);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const reports = await getUsageByUserId(userId);

        if (!reports) {
          throw new Error('Failed to fetch usage data');
        }

        setReports(reports);
      } catch (err) {
        console.error('Failed to fetch usage reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Memoize the updateURL function
  const updateURL = useCallback(
    (newSorting: SortingState) => {
      const params = new URLSearchParams(searchParams.toString());

      // Remove all existing sort parameters
      params.delete('sort');

      // Add new sort parameters
      newSorting.forEach((sort) => {
        params.append('sort', `${sort.id}:${sort.desc ? 'desc' : 'asc'}`);
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  // Memoize the handleSort function
  const handleSort = useCallback(
    (columnId: string, currentSortDir: string | false) => {
      let newSorting: SortingState;

      if (!currentSortDir) {
        newSorting = [...sorting, { id: columnId, desc: false }];
      } else if (currentSortDir === 'asc') {
        newSorting = sorting.map((sort) =>
          sort.id === columnId ? { ...sort, desc: true } : sort,
        );
      } else {
        newSorting = sorting.filter((sort) => sort.id !== columnId);
      }

      setSorting(newSorting);
      updateURL(newSorting);
    },
    [sorting, updateURL],
  );

  // Memoize the columns definition
  const columns = useMemo<ColumnDef<UsageReport>[]>(
    () => [
      {
        accessorKey: 'message_id',
        header: 'Message ID',
        cell: ({ row }) => <div>{row.getValue('message_id')}</div>,
      },
      {
        accessorKey: 'timestamp',
        header: 'Timestamp',
        cell: ({ row }) => (
          <div>{formatTimestamp(row.getValue('timestamp'))}</div>
        ),
      },
      {
        accessorKey: 'report_name',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => handleSort('report_name', column.getIsSorted())}
          >
            Report Name
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 size-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 size-4" />
            ) : (
              <ArrowUpDown className="ml-2 size-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('report_name') || ''}</div>,
      },
      {
        accessorKey: 'credits_used',
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="float-right"
            onClick={() => handleSort('credits_used', column.getIsSorted())}
          >
            Credits Used
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 size-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 size-4" />
            ) : (
              <ArrowUpDown className="ml-2 size-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-right">
            {Number(row.getValue('credits_used')).toFixed(2)}
          </div>
        ),
      },
    ],
    [handleSort],
  );

  const table = useReactTable({
    data: reports,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    enableMultiSort: true,
  });

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8">
      <CreditBarChart reports={reports} />
      <Table className="w-full">
        <TableCaption>A list of recent usage reports</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total reports</TableCell>
            <TableCell className="text-right">{reports.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
