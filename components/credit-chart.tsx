'use client';

import { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Rectangle,
} from 'recharts';
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

interface DailyUsage {
  date: string;
  credits: number;
}

interface CreditChartProps {
  reports: UsageReport[];
}

export function CreditChart({ reports }: CreditChartProps) {
  const chartData = useMemo(() => {
    if (!reports?.length) return [] as DailyUsage[];

    const dailyTotals = new Map<string, number>();
    const isoDates = reports.map(
      (r) => new Date(r.timestamp).toISOString().split('T')[0],
    );

    const minDate = new Date(
      Math.min(...isoDates.map((d) => new Date(d).getTime())),
    );
    const maxDate = new Date(
      Math.max(...isoDates.map((d) => new Date(d).getTime())),
    );

    for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
      dailyTotals.set(new Date(d).toISOString().split('T')[0], 0);
    }

    for (const report of reports) {
      const dateKey = new Date(report.timestamp).toISOString().split('T')[0];
      dailyTotals.set(
        dateKey,
        (dailyTotals.get(dateKey) || 0) + report.credits_used,
      );
    }

    return Array.from(dailyTotals.entries())
      .map(([date, credits]) => ({ date, credits }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [reports]);

  const trend = useMemo(() => {
    if (chartData.length < 2) return { percentage: 0, isUp: true };
    const lastDay = chartData[chartData.length - 1].credits;
    const prevDay = chartData[chartData.length - 2].credits;
    if (prevDay === 0) return { percentage: 0, isUp: true };
    const pct = ((lastDay - prevDay) / prevDay) * 100;
    return { percentage: Math.abs(pct), isUp: pct > 0 };
  }, [chartData]);

  const chartConfig = {
    credits: {
      label: 'Credits Used',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
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
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: string) => {
                const d = new Date(value);
                return d.toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={40}
              tickFormatter={(v: number) => `${Math.round(v)}`}
            />
            <ChartTooltip
              cursor={{ fill: 'transparent' }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(String(value)).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                  indicator="line"
                  formatter={(value) => `${Number(value).toFixed(2)} credits`}
                />
              }
            />
            <Bar
              dataKey="credits"
              fill="var(--color-credits)"
              radius={[6, 6, 0, 0]}
              activeBar={
                <Rectangle fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
              }
              maxBarSize={28}
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
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
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
  );
}
