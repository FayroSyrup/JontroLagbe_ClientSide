import type { Metadata } from "next"
import { CalendarCheck, CircleCheck, DollarSign, Hourglass, Package, Users } from "lucide-react"

import { getAdminAnalytics } from "@/lib/api/analytics"
import { formatMonth, formatPrice } from "@/lib/formatters"
import { CategoryPieChart, MonthlyBarChart, MonthlyLineChart } from "@/components/dashboard/analytics-charts"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = { title: "Admin Overview" }

export default async function AdminOverviewPage() {
    const data = await getAdminAnalytics()

    if (!data) {
        return <EmptyState title="Could not load the analytics" text="Please refresh the page." />
    }

    return (
        <>
            <PageHeader title="Platform Overview" subtitle="Live numbers from users, equipment, bookings and payments." />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard label="Total users" value={data.totalUsers} Icon={Users} />
                <StatCard label="Total equipment" value={data.totalEquipment} Icon={Package} />
                <StatCard label="Total bookings" value={data.totalBookings} Icon={CalendarCheck} hint="Paid bookings only" />
                <StatCard label="Pending approvals" value={data.pendingApprovals} Icon={Hourglass} hint="Equipment waiting for review" />
                <StatCard label="Completed rentals" value={data.completedRentals} Icon={CircleCheck} />
                <StatCard label="Total revenue" value={formatPrice(data.totalRevenue)} Icon={DollarSign} />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="card-soft p-5 lg:col-span-2">
                    <h2 className="mb-4 font-heading font-semibold">Monthly bookings</h2>
                    <MonthlyBarChart data={data.monthlyBookings} dataKey="bookings" name="Bookings" />
                </div>
                <div className="card-soft p-5">
                    <h2 className="mb-4 font-heading font-semibold">Equipment by category</h2>
                    <CategoryPieChart data={data.equipmentByCategory} />
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="card-soft p-5 lg:col-span-2">
                    <h2 className="mb-4 font-heading font-semibold">Monthly revenue</h2>
                    <MonthlyLineChart data={data.monthlyBookings} dataKey="revenue" name="Revenue" money />
                </div>
                <div className="card-soft p-5">
                    <h2 className="mb-2 font-heading font-semibold">Monthly statistics</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead className="text-right">Bookings</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.monthlyBookings.map((row) => (
                                <TableRow key={row.month}>
                                    <TableCell>{formatMonth(row.month, true)}</TableCell>
                                    <TableCell className="text-right">{row.bookings}</TableCell>
                                    <TableCell className="text-right">{formatPrice(row.revenue)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}