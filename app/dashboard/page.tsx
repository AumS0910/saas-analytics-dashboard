"use client";

"use client";

import { useState, useEffect } from 'react';
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import DateRangeFilter, { DateRange } from "@/components/DateRangeFilter";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { fetchKPIMetrics, fetchChartData, fetchRecentActivities } from "../../lib/mockData";
import { formatDistanceToNow, subDays } from 'date-fns';
import { useToast } from '../components/Toast';
import { StatCardSkeleton, ChartCardSkeleton } from '../components/Skeleton';

export default function DashboardPage() {
    const { addToast } = useToast();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [kpiMetrics, setKpiMetrics] = useState<any[]>([]);
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [usersData, setUsersData] = useState<any[]>([]);
    const [recentActivities, setRecentActivities] = useState<any[]>([]);
    const [dateRange, setDateRange] = useState<DateRange>('30d');
    const [customDateRange, setCustomDateRange] = useState<{ start: Date; end: Date } | null>(null);

    const getDateRangeForCharts = () => {
        const now = new Date();
        if (dateRange === 'custom' && customDateRange) {
            return customDateRange;
        }
        const days = dateRange === '7d' ? 7 : 30;
        return {
            start: subDays(now, days),
            end: now
        };
    };

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            const chartDateRange = getDateRangeForCharts();

            const [metrics, revenue, users, activities] = await Promise.all([
                fetchKPIMetrics(),
                fetchChartData('revenue', chartDateRange),
                fetchChartData('users', chartDateRange),
                fetchRecentActivities()
            ]);

            setKpiMetrics(metrics);
            setRevenueData(revenue);
            setUsersData(users);
            setRecentActivities(activities);
        } catch (err) {
            setError('Failed to load dashboard data. Please try again.');
            addToast('error', 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleDateRangeChange = (range: DateRange, customRange?: { start: Date; end: Date }) => {
        setDateRange(range);
        if (customRange) {
            setCustomDateRange(customRange);
        } else if (range !== 'custom') {
            // Reset custom date range when switching to predefined ranges
            setCustomDateRange(null);
        }
        // Data will reload due to useEffect dependency
    };

    useEffect(() => {
        loadData();
    }, [dateRange, customDateRange]);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await loadData();
            addToast('success', 'Dashboard data refreshed successfully!');
        } catch (err) {
            // Error already handled in loadData
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2 text-base lg:text-lg">Welcome back! Here's what's happening with your business today.</p>
                </div>
                <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
                    <DateRangeFilter
                        selectedRange={dateRange}
                        onRangeChange={handleDateRangeChange}
                    />
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                        aria-label="Refresh dashboard data"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-6">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <StatCardSkeleton key={i} />
                    ))
                ) : error ? (
                    <div className="col-span-full bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                            <div>
                                <h3 className="text-sm font-medium text-red-800">Error Loading Data</h3>
                                <p className="text-sm text-red-600 mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : kpiMetrics.length === 0 ? (
                    <div className="col-span-full bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                        <p className="text-gray-500">No KPI metrics available</p>
                    </div>
                ) : (
                    kpiMetrics.map((metric) => (
                        <StatCard key={metric.name} metric={metric} />
                    ))
                )}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                {loading ? (
                    <>
                        <ChartCardSkeleton />
                        <ChartCardSkeleton />
                    </>
                ) : error ? (
                    <>
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                                <div>
                                    <h3 className="text-sm font-medium text-red-800">Error Loading Charts</h3>
                                    <p className="text-sm text-red-600 mt-1">{error}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                                <div>
                                    <h3 className="text-sm font-medium text-red-800">Error Loading Charts</h3>
                                    <p className="text-sm text-red-600 mt-1">{error}</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <ChartCard title="Revenue Over Time">
                            {revenueData.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    No revenue data available
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="x" stroke="#64748b" fontSize={12} />
                                        <YAxis stroke="#64748b" fontSize={12} />
                                        <Tooltip
                                            formatter={(value) => [`$${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0'}`, 'Revenue']}
                                            labelStyle={{ color: '#334155' }}
                                            contentStyle={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="y"
                                            stroke="url(#revenueGradient)"
                                            strokeWidth={3}
                                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5, stroke: '#ffffff' }}
                                            activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                                        />
                                        <defs>
                                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </ChartCard>

                        <ChartCard title="Users per Month">
                            {usersData.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    No user data available
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={usersData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="x" stroke="#64748b" fontSize={12} />
                                        <YAxis stroke="#64748b" fontSize={12} />
                                        <Tooltip
                                            formatter={(value) => [value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0', 'Users']}
                                            labelStyle={{ color: '#334155' }}
                                            contentStyle={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Bar dataKey="y" fill="url(#usersGradient)" radius={[6, 6, 0, 0]} />
                                        <defs>
                                            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" />
                                                <stop offset="100%" stopColor="#059669" />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </ChartCard>
                    </>
                )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-white/20">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    Recent Activity
                </h3>
                <div className="space-y-6">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                                <div className="w-3 h-3 bg-gray-200 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">
                            Failed to load recent activities
                        </div>
                    ) : recentActivities.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No recent activities
                        </div>
                    ) : (
                        recentActivities.map((activity: any) => (
                            <div key={activity.id} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-900">
                                        <span className="font-semibold text-slate-800">{activity.user}</span> {activity.action}
                                    </p>
                                    {activity.details && (
                                        <p className="text-xs text-slate-500 mt-1 bg-slate-50 px-3 py-1 rounded-full inline-block">{activity.details}</p>
                                    )}
                                    <p className="text-xs text-slate-400 mt-2 font-medium">
                                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
