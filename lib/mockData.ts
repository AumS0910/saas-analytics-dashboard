import { Customer, KPIMetric, ChartData, Report } from '../types';

// Configuration for data generation
export const dataConfig = {
  customers: {
    count: 50,
    baseData: [
      { name: 'John Doe', email: 'john.doe@example.com', company: 'Tech Corp', status: 'active' as const },
      { name: 'Jane Smith', email: 'jane.smith@example.com', company: 'Data Inc', status: 'active' as const },
      { name: 'Bob Johnson', email: 'bob.johnson@example.com', status: 'inactive' as const },
      { name: 'Alice Brown', email: 'alice.brown@example.com', company: 'Analytics Ltd', status: 'pending' as const },
    ]
  },
  kpiMetrics: {
    baseValues: {
      revenue: { value: 125000, change: 12.5 },
      users: { value: 15420, change: 8.3 },
      conversion: { value: 3.2, change: -1.5 },
      satisfaction: { value: 4.7, change: 0.2 }
    }
  },
  charts: {
    revenue: { period: 12, baseValue: 15000, growth: 1.15, isMonthly: true },
    users: { period: 12, baseValue: 1200, growth: 1.12, isMonthly: true },
    engagement: { period: 8, baseValue: 65, variance: 5, isMonthly: false }
  }
};

// Simulate API delay
const simulateDelay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Generate dynamic customer data
const generateCustomers = (): Customer[] => {
  const customers: Customer[] = [];
  const baseCustomers = dataConfig.customers.baseData;
  const totalCustomers = dataConfig.customers.count;

  for (let i = 0; i < totalCustomers; i++) {
    const baseCustomer = baseCustomers[i % baseCustomers.length];
    const id = (i + 1).toString();
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365));

    customers.push({
      id,
      name: `${baseCustomer.name.split(' ')[0]} ${baseCustomer.name.split(' ')[1]} ${i > 0 ? i : ''}`.trim(),
      email: baseCustomer.email.replace('@', `${i > 0 ? i : ''}@`),
      company: baseCustomer.company,
      status: baseCustomer.status,
      createdAt: createdDate,
      lastLogin: Math.random() > 0.2 ? new Date(createdDate.getTime() + Math.random() * (Date.now() - createdDate.getTime())) : undefined
    });
  }

  return customers;
};

// Generate dynamic KPI metrics
const generateKPIMetrics = (): KPIMetric[] => {
  const base = dataConfig.kpiMetrics.baseValues;
  return [
    {
      name: 'Total Revenue',
      value: base.revenue.value + Math.floor(Math.random() * 10000),
      unit: '$',
      change: base.revenue.change + (Math.random() - 0.5) * 5,
      trend: 'up' as const,
    },
    {
      name: 'Active Users',
      value: base.users.value + Math.floor(Math.random() * 1000),
      change: base.users.change + (Math.random() - 0.5) * 3,
      trend: 'up' as const,
    },
    {
      name: 'Conversion Rate',
      value: base.conversion.value + (Math.random() - 0.5) * 1,
      unit: '%',
      change: base.conversion.change + (Math.random() - 0.5) * 2,
      trend: Math.random() > 0.5 ? 'down' as const : 'up' as const,
    },
    {
      name: 'Customer Satisfaction',
      value: base.satisfaction.value + (Math.random() - 0.5) * 0.5,
      unit: '/5',
      change: base.satisfaction.change + (Math.random() - 0.5) * 0.3,
      trend: 'up' as const,
    },
  ];
};

// Generate chart data based on date range
const generateChartData = (type: 'revenue' | 'users' | 'engagement', dateRange?: { start: Date; end: Date }): ChartData => {
  const config = dataConfig.charts[type];
  const data: ChartData = [];
  const now = new Date();
  const startDate = dateRange?.start || new Date(now.getFullYear(), now.getMonth() - (config.period || 12) + 1, 1);
  const endDate = dateRange?.end || now;

  let currentValue = config.baseValue;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const variance = (Math.random() - 0.5) * (('variance' in config ? config.variance : null) || currentValue * 0.1);
    currentValue = Math.max(0, currentValue + variance);

    if (type === 'engagement') {
      currentValue = Math.min(100, Math.max(0, currentValue));
    }

    data.push({
      x: config.isMonthly ? currentDate.toLocaleDateString('en-US', { month: 'short' }) : `Week ${data.length + 1}`,
      y: Math.round(currentValue)
    });

    // Increment date
    if (config.isMonthly) {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 7);
    }
  }

  return data;
};

// API simulation functions
export const fetchCustomers = async (): Promise<Customer[]> => {
  await simulateDelay(800);
  return generateCustomers();
};

export const fetchKPIMetrics = async (): Promise<KPIMetric[]> => {
  await simulateDelay(600);
  return generateKPIMetrics();
};

export const fetchChartData = async (type: 'revenue' | 'users' | 'engagement', dateRange?: { start: Date; end: Date }): Promise<ChartData> => {
  await simulateDelay(1000);
  return generateChartData(type, dateRange);
};

export const fetchRecentActivities = async () => {
  await simulateDelay(500);
  return mockRecentActivities;
};

export const fetchTrafficSources = async () => {
  await simulateDelay(700);
  return mockTrafficSources;
};

export const fetchReports = async () => {
  await simulateDelay(900);
  return mockReports;
};

// Legacy exports for backward compatibility (will be removed)
export const mockCustomers: Customer[] = generateCustomers();
export const mockKPIMetrics: KPIMetric[] = generateKPIMetrics();
export const mockRevenueChartData: ChartData = generateChartData('revenue');
export const mockUsersChartData: ChartData = generateChartData('users');

export interface TrafficSource {
    source: string;
    value: number;
    percentage: number;
}

export const mockTrafficSources: TrafficSource[] = [
    { source: 'Organic Search', value: 4500, percentage: 45 },
    { source: 'Direct', value: 2700, percentage: 27 },
    { source: 'Social Media', value: 1350, percentage: 13.5 },
    { source: 'Email', value: 900, percentage: 9 },
    { source: 'Paid Ads', value: 450, percentage: 4.5 },
    { source: 'Referrals', value: 100, percentage: 1 },
];

export const mockEngagementTrends: ChartData = generateChartData('engagement');

export interface RecentActivity {
    id: string;
    user: string;
    action: string;
    timestamp: Date;
    details?: string;
}

export const mockRecentActivities: RecentActivity[] = [
    {
        id: '1',
        user: 'John Doe',
        action: 'Logged in',
        timestamp: new Date('2024-12-18T09:00:00Z'),
        details: 'From Chrome on Windows',
    },
    {
        id: '2',
        user: 'Jane Smith',
        action: 'Generated report',
        timestamp: new Date('2024-12-18T08:30:00Z'),
        details: 'Monthly analytics report',
    },
    {
        id: '3',
        user: 'Bob Johnson',
        action: 'Updated profile',
        timestamp: new Date('2024-12-18T08:00:00Z'),
    },
    {
        id: '4',
        user: 'Alice Brown',
        action: 'Signed up',
        timestamp: new Date('2024-12-18T07:45:00Z'),
        details: 'New customer registration',
    },
    {
        id: '5',
        user: 'System',
        action: 'Backup completed',
        timestamp: new Date('2024-12-18T06:00:00Z'),
        details: 'Daily database backup',
    },
];

export const mockReports: Report[] = [
    {
        id: '1',
        title: 'Monthly Revenue Report',
        description: 'Comprehensive analysis of monthly revenue trends',
        data: generateKPIMetrics().slice(0, 2),
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-15'),
    },
    {
        id: '2',
        title: 'User Engagement Analysis',
        description: 'Detailed breakdown of user engagement metrics',
        data: generateKPIMetrics().slice(2, 4),
        createdAt: new Date('2024-11-28'),
        updatedAt: new Date('2024-12-10'),
    },
    {
        id: '3',
        title: 'Traffic Sources Overview',
        description: 'Analysis of traffic sources and their performance',
        data: [],
        createdAt: new Date('2024-12-05'),
        updatedAt: new Date('2024-12-17'),
    },
];