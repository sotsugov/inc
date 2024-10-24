'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { UsageReport } from '@/types/usage';
import { useMemo } from 'react';

interface DailyUsage {
  date: string;
  credits: number;
}

interface CreditBarChartProps {
  reports: UsageReport[];
}

export default function CreditBarChart({ reports }: CreditBarChartProps) {
  const chartData = useMemo(() => {
    const getDailyData = (): DailyUsage[] => {
      const dailyTotals = new Map<string, number>();
      const dates = reports.map(
        (r) => new Date(r.timestamp).toISOString().split('T')[0],
      );
      const minDate = new Date(
        Math.min(...dates.map((d) => new Date(d).getTime())),
      );
      const maxDate = new Date(
        Math.max(...dates.map((d) => new Date(d).getTime())),
      );

      for (
        let d = new Date(minDate);
        d <= maxDate;
        d.setDate(d.getDate() + 1)
      ) {
        dailyTotals.set(d.toISOString().split('T')[0], 0);
      }

      reports.forEach((report) => {
        const date = new Date(report.timestamp).toISOString().split('T')[0];
        dailyTotals.set(
          date,
          (dailyTotals.get(date) || 0) + report.credits_used,
        );
      });

      return Array.from(dailyTotals.entries())
        .map(([date, credits]) => ({ date, credits }))
        .sort((a, b) => a.date.localeCompare(b.date));
    };

    return getDailyData();
  }, [reports]);

  const trend = useMemo(() => {
    const calculateTrend = (data: DailyUsage[]) => {
      if (data.length < 2) return { percentage: 0, isUp: true };

      const lastDay = data[data.length - 1].credits;
      const previousDay = data[data.length - 2].credits;

      if (previousDay === 0) return { percentage: 0, isUp: true };

      const percentage = ((lastDay - previousDay) / previousDay) * 100;
      return {
        percentage: Math.abs(percentage),
        isUp: percentage > 0,
      };
    };

    return calculateTrend(chartData);
  }, [chartData]);

  const chartConfig = {
    credits: {
      label: 'Credits Used',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Daily Credit Usage</CardTitle>
          <CardDescription>
            {chartData.length > 0 && (
              <>
                {new Date(chartData[0].date).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                -{' '}
                {new Date(
                  chartData[chartData.length - 1].date,
                ).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                })}
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[220px] w-full">
          <ChartContainer config={chartConfig}>
            <BarChart
              width={600}
              height={200}
              accessibilityLayer
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })
                }
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.toFixed(0)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dashed"
                    formatter={(value) => `${Number(value).toFixed(2)} credits`}
                  />
                }
              />
              <Bar
                dataKey="credits"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {trend.percentage > 0 ? (
              <>
                {trend.isUp ? 'Trending up' : 'Trending down'} by{' '}
                {trend.percentage.toFixed(1)}% from previous day{' '}
                {trend.isUp ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </>
            ) : (
              'No change from previous day'
            )}
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total credits used per day
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
