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
      style={
        {
          "--color-desktop": config.desktop?.color || 'defaultColor',
          "--color-mobile": config.mobile?.color || 'defaultColor',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function ChartTooltip(props: TooltipProps<any, any>) {
  return <Tooltip {...props} />;
}

export function ChartTooltipContent({ active, payload }: any) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border bg-white p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        {payload.map((item: any) => (
          <div key={item.name} className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-gray-500">
              {item.name}
            </span>
            <span className="font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 