export interface Customer {
    id: string;
    name: string;
    email: string;
    company?: string;
    status: 'active' | 'inactive' | 'pending';
    createdAt: Date;
    lastLogin?: Date;
}

export interface KPIMetric {
    name: string;
    value: number;
    unit?: string;
    change?: number; // percentage change
    trend: 'up' | 'down' | 'stable';
}

export interface ChartDataPoint {
    x: string | number;
    y: number;
}

export type ChartData = ChartDataPoint[];

export interface Report {
    id: string;
    title: string;
    description?: string;
    data: KPIMetric[];
    createdAt: Date;
    updatedAt: Date;
}