import type { Metadata } from "next"
import { CircleCheck, DollarSign, Package, TrendingUp, Wallet } from "lucide-react"

import { getOwnerAnalytics } from "@/lib/api/analytics"
import { formatMonth, formatPrice } from "@/lib/formatters"
import { MonthlyBarChart, MonthlyLineChart } from "@/components/dashboard/analytics-charts"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = { title: "Owner Overview" }

export default async function OwnerOverviewPage() {
    const data = await getOwnerAnalytics()

    if (!data) {
        return <EmptyState title="Could not load the analytics" text="Please refresh the page." />
    }

    // the last month in the list is the current month
    const thisMonth = data.monthlyEarnings[data.monthlyEarnings.length - 1]

    return (
        <>
            <PageHeader title="My Rental Business" subtitle="Your listings, rentals and earnings at a glance." />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard label="Total listed equipment" value={data.totalEquipment} Icon={Package} />
                <StatCard label="Completed rentals" value={data.completedRentals} Icon={CircleCheck} />
                <StatCard label="Total earnings" value={formatPrice(data.totalEarnings)} Icon={DollarSign} />
                <StatCard
                    label="Earnings this month"
                    value={formatPrice(thisMonth?.earnings ?? 0)}
                    Icon={Wallet}
                    hint={thisMonth ? formatMonth(thisMonth.month, true) : undefined}
                />
                <StatCard label="Total paid rentals" value={data.totalRentals} Icon={TrendingUp} />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="card-soft p-5 lg:col-span-2">
                    <h2 className="mb-4 font-heading font-semibold">Monthly earnings</h2>
                    <MonthlyLineChart data={data.monthlyEarnings} dataKey="earnings" name="Earnings" money />
                </div>
                <div className="card-soft p-5">
                    <h2 className="mb-2 font-heading font-semibold">Monthly earnings table</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead className="text-right">Rentals</TableHead>
                                <TableHead className="text-right">Earnings</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.monthlyEarnings.map((row) => (
                                <TableRow key={row.month}>
                                    <TableCell>{formatMonth(row.month, true)}</TableCell>
                                    <TableCell className="text-right">{row.rentals}</TableCell>
                                    <TableCell className="text-right">{formatPrice(row.earnings)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="card-soft mt-6 p-5">
                <h2 className="mb-4 font-heading font-semibold">Rentals per month</h2>
                <MonthlyBarChart data={data.monthlyEarnings} dataKey="rentals" name="Rentals" />
            </div>
        </>
    )
}