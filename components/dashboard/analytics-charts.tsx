"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import { formatMonth, formatPrice } from "@/lib/formatters"

type MonthRow = { month: string; [key: string]: string | number }

// all colors come from the theme variables in globals.css
const tooltipStyle = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    color: "var(--card-foreground)",
}

const PIE_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--primary)",
]

const withLabels = (data: MonthRow[]) => data.map((row) => ({ ...row, label: formatMonth(row.month) }))

export function MonthlyBarChart({
    data,
    dataKey,
    name,
    money = false,
}: {
    data: MonthRow[]
    dataKey: string
    name: string
    money?: boolean
}) {
    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={withLabels(data)} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                        allowDecimals={false}
                        tickFormatter={(value) => (money ? `$${value}` : String(value))}
                    />
                    <Tooltip
                        cursor={{ fill: "var(--muted)" }}
                        contentStyle={tooltipStyle}
                        formatter={(value) => (money ? formatPrice(Number(value)) : String(value))}
                    />
                    <Bar dataKey={dataKey} name={name} fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export function MonthlyLineChart({
    data,
    dataKey,
    name,
    money = false,
}: {
    data: MonthRow[]
    dataKey: string
    name: string
    money?: boolean
}) {
    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={withLabels(data)} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                        tickFormatter={(value) => (money ? `$${value}` : String(value))}
                    />
                    <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(value) => (money ? formatPrice(Number(value)) : String(value))}
                    />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        name={name}
                        stroke="var(--chart-2)"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "var(--chart-2)" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export function CategoryPieChart({ data }: { data: { category: string; count: number }[] }) {
    if (data.length === 0) {
        return <p className="py-16 text-center text-sm text-muted-foreground">No approved equipment yet.</p>
    }

    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="count" nameKey="category" innerRadius={55} outerRadius={90} paddingAngle={3}>
                        {data.map((_, index) => (
                            <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}