import { ReactNode } from 'react';
import Card, { CardHeader, CardContent } from './Card';

interface ChartCardProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export default function ChartCard({ title, children, className = "" }: ChartCardProps) {
    return (
        <Card
            variant="glass"
            padding="lg"
            className={`hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 ${className}`}
        >
            <CardHeader>
                <h3 className="text-lg font-bold text-slate-900" id={`chart-${title.replace(/\s+/g, '-').toLowerCase()}`}>
                    {title}
                </h3>
            </CardHeader>
            <CardContent>
                <div
                    className="h-64"
                    role="img"
                    aria-labelledby={`chart-${title.replace(/\s+/g, '-').toLowerCase()}`}
                    aria-describedby={`chart-${title.replace(/\s+/g, '-').toLowerCase()}-description`}
                >
                    {children}
                </div>
                <div id={`chart-${title.replace(/\s+/g, '-').toLowerCase()}-description`} className="sr-only">
                    {title} chart visualization
                </div>
            </CardContent>
        </Card>
    );
}