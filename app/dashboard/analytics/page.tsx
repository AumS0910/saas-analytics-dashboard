"use client";

import { useState } from 'react';
import ChartCard from "@/components/ChartCard";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { mockTrafficSources, mockEngagementTrends } from "../../../lib/mockData";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function AnalyticsPage() {
    const [timeFilter, setTimeFilter] = useState<'7' | '30' | '90'>('30');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
                    <p className="text-gray-600 mt-1">Detailed insights into your platform's performance</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    {[
                        { key: '7', label: 'Last 7 days' },
                        { key: '30', label: 'Last 30 days' },
                        { key: '90', label: 'Last 90 days' }
                    ].map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setTimeFilter(filter.key as '7' | '30' | '90')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeFilter === filter.key
                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Traffic Sources">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={mockTrafficSources.map(item => ({ name: item.source, value: item.value }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(1) : '0'}%`}
                            >
                                {mockTrafficSources.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [value, 'Visitors']} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Engagement Trends">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockEngagementTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="x" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" domain={[0, 100]} />
                            <Tooltip
                                formatter={(value) => [`${value}%`, 'Engagement']}
                                labelStyle={{ color: '#374151' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="y"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
}
