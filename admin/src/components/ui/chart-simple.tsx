import * as React from "react"
import { 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { cn } from "@/lib/utils"

interface ChartProps {
  className?: string
  children: React.ReactNode
}

export function Chart({ className, children }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  className?: string
}

export function ChartTooltip({ active, payload, label, className }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn(
      "rounded-lg border bg-background p-2 shadow-md",
      className
    )}>
      {label && <p className="font-medium">{label}</p>}
      {payload.map((item: any, index: number) => (
        <p key={index} style={{ color: item.color }}>
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  )
}

export {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
}