import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPIMetric } from '../../types';
import Card from './Card';

interface StatCardProps {
    metric: KPIMetric;
}

export default function StatCard({ metric }: StatCardProps) {
    const isPositive = metric.trend === 'up';
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    const formatValue = (value: number, unit?: string) => {
        let formatted: string;
        switch (unit) {
            case '$':
                formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return `$${formatted}`;
            case '%':
                formatted = value.toFixed(2);
                return `${formatted}%`;
            case '/5':
                formatted = value.toFixed(1);
                return `${formatted}/5`;
            default:
                formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return formatted;
        }
    };

    return (
        <Card variant="default" padding="lg" className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600" id={`metric-${metric.name.replace(/\s+/g, '-').toLowerCase()}`}>
                        {metric.name}
                    </p>
                    <p
                        className="text-3xl font-bold text-gray-900 mt-1"
                        aria-labelledby={`metric-${metric.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                        {formatValue(metric.value, metric.unit)}
                    </p>
                </div>
                <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                    role="status"
                    aria-label={`Trend: ${isPositive ? 'increasing' : 'decreasing'} by ${metric.change}%`}
                >
                    <TrendIcon className="w-3 h-3" aria-hidden="true" />
                    {(metric.change ?? 0).toFixed(2)}%
                </div>
            </div>
        </Card>
    );
}