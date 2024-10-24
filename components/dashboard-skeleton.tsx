import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Skeleton } from './ui/skeleton';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from './ui/table';

export default function DashboardSkeleton() {
  const columns = [
    { key: 'message_id', className: 'w-[15%]' },
    { key: 'timestamp', className: 'w-[15%]' },
    { key: 'report_name', className: 'w-[40%]' },
    { key: 'credits_used', className: 'w-[30%]' },
  ];
  return (
    <div className="flex flex-col gap-8">
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent className="h-[220px]">
          <Skeleton className="h-full w-full" />
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </CardFooter>
      </Card>
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
