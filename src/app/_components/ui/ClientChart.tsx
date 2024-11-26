'use client';

import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import { type ChartConfig } from "./chart";

interface ClientChartProps {
  data: Array<{ month: string; desktop: number; mobile: number }>;
  config: ChartConfig;
}

export function ClientChart({ data, config }: ClientChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month" 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value: string) => value.slice(0, 3)}
            fontSize={12}
          />

          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4500" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff4500" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff8c00" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff8c00" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="mobile"
            type="monotone"
            fill="url(#fillMobile)"
            fillOpacity={0.4}
            stroke="#ff8c00"
            strokeWidth={2}
            stackId="1"
          />
          <Area
            dataKey="desktop"
            type="monotone"
            fill="url(#fillDesktop)"
            fillOpacity={0.4}
            stroke="#ff4500"
            strokeWidth={2}
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 