"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const chartData = [
  { day: "Monday", success: 150, failed: 12 },
  { day: "Tuesday", success: 180, failed: 8 },
  { day: "Wednesday", success: 220, failed: 5 },
  { day: "Thursday", success: 200, failed: 15 },
  { day: "Friday", success: 250, failed: 3 },
  { day: "Saturday", success: 120, failed: 2 },
  { day: "Sunday", success: 90, failed: 1 },
];

const chartConfig = {
  success: {
    label: "Success",
    color: "hsl(var(--chart-2))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Activity</CardTitle>
        <CardDescription>Last 7 days of workflow executions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="success" fill="var(--color-success)" radius={4} />
            <Bar dataKey="failed" fill="var(--color-failed)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
