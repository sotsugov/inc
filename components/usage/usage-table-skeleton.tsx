import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function TableSkeleton() {
  const columns = [
    { key: 'message_id', className: 'w-[15%]' },
    { key: 'timestamp', className: 'w-[15%]' },
    { key: 'report_name', className: 'w-[40%]' },
    { key: 'credits_used', className: 'w-[30%]' },
  ];

  return (
    <div className="w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Message ID</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Report Name</TableHead>
            <TableHead className="text-right">Credits Used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(8)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className={column.className}>
                  <Skeleton className="h-4 p-2 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
