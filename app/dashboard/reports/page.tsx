"use client";

import { useState } from 'react';
import { Download } from 'lucide-react';
import { mockReports } from "../../../lib/mockData";
import { useToast } from '../../components/Toast';

export default function ReportsPage() {
    const { addToast } = useToast();
    const [exporting, setExporting] = useState<string | null>(null);

    const exportToCSV = (reportId: string, reportTitle: string) => {
        setExporting(reportId);

        // Simulate export delay
        setTimeout(() => {
            const report = mockReports.find(r => r.id === reportId);
            if (!report) return;

            // Create CSV content
            const headers = ['Metric', 'Value', 'Change'];
            const rows = report.data.map(metric => [
                metric.name,
                metric.value.toString(),
                `${metric.change}%`
            ]);

            const csvContent = [headers, ...rows]
                .map(row => row.map(cell => `"${cell}"`).join(','))
                .join('\n');

            // Download CSV
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${reportTitle.replace(/\s+/g, '_')}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setExporting(null);
            addToast('success', `${reportTitle} exported successfully!`);
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                    Reports
                </h1>
                <p className="text-slate-600 mt-2 text-lg">Download and manage your business reports</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockReports.map((report) => (
                    <div key={report.id} className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-white/20 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{report.title}</h3>
                                {report.description && (
                                    <p className="text-slate-600 mt-2">{report.description}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            {report.data.map((metric, index) => (
                                <div key={index} className="flex justify-between items-center py-2 px-3 bg-slate-50/50 rounded-lg">
                                    <span className="text-slate-600 font-medium">{metric.name}:</span>
                                    <span className="font-bold text-slate-900">
                                        {metric.unit === '$' ? `$${metric.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` :
                                            metric.unit === '%' ? `${metric.value}%` :
                                                metric.unit === '/5' ? `${metric.value}/5` :
                                                    metric.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="text-sm text-slate-500 font-medium">
                                Created: {report.createdAt.toLocaleDateString()}
                            </div>
                            <button
                                onClick={() => exportToCSV(report.id, report.title)}
                                disabled={exporting === report.id}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-all duration-200 font-semibold"
                            >
                                <Download className="w-4 h-4" />
                                {exporting === report.id ? 'Exporting...' : 'Download'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}