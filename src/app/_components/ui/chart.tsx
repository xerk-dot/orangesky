import { type ReactNode } from "react";
import { Tooltip, type TooltipProps } from "recharts";

export type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

interface ChartContainerProps {
  config: ChartConfig;
  children: ReactNode;
}

export function ChartContainer({ config, children }: ChartContainerProps) {
  return (
    <div
      className="h-[400px] w-full"
      style={{
        "--color-desktop": config.desktop?.color ?? 'defaultColor',
        "--color-mobile": config.mobile?.color ?? 'defaultColor',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}