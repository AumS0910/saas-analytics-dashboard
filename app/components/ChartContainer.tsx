import { ReactNode } from 'react';
import Card, { CardHeader, CardContent } from './Card';

interface ChartContainerProps {
    title: string;
    children: ReactNode;
    className?: string;
    height?: string;
    loading?: boolean;
    error?: string | null;
    emptyMessage?: string;
}

export default function ChartContainer({
    title,
    children,
    className = "",
    height = "h-64",
    loading = false,
    error = null,
    emptyMessage = "No data available"
}: ChartContainerProps) {
    return (
        <Card variant="glass" className={className}>
            <CardHeader>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            </CardHeader>
            <CardContent>
                <div className={height}>
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-full text-red-500 text-center">
                            <div>
                                <p className="text-sm font-medium">Error loading chart</p>
                                <p className="text-xs mt-1">{error}</p>
                            </div>
                        </div>
                    ) : (
                        children || (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                {emptyMessage}
                            </div>
                        )
                    )}
                </div>
            </CardContent>
        </Card>
    );
}