# SaaS Analytics Dashboard

A modern, responsive analytics dashboard built with Next.js, TypeScript, and Tailwind CSS. Features real-time data visualization, interactive filtering, and comprehensive accessibility support.


## 🌐 Live Demo

👉 **Live URL:** https://saas-analytics-dashboard-six.vercel.app/


## 💡 Project Purpose & Real-World Use

This dashboard represents the **analytics interface of a SaaS product** that helps founders, product managers, and business teams monitor key business metrics in one place.

### Real-world scenarios:
- **Startup founders** track revenue growth, user activity, and conversion rates
- **Product teams** monitor feature adoption and customer engagement
- **Marketing teams** analyze user acquisition and retention trends
- **Customer success teams** identify inactive or churn-risk users

Although the current implementation uses simulated data, the architecture mirrors real production dashboards where data would be fetched from analytics services such as Mixpanel, Segment, Stripe, or internal APIs.

The project focuses on **frontend system design**, **data visualization**, and **UX for analytics-heavy applications**, which are core responsibilities of frontend engineers in SaaS companies.


## 🚀 Features

- **Real-time Data Simulation**: Config-driven data generation with realistic API response delays
- **Interactive Charts**: Dynamic charts that respond to date range filters
- **Advanced Table Features**: Sorting and pagination for customer management
- **Responsive Design**: Optimized layouts for all screen sizes
- **Accessibility First**: Full keyboard navigation and screen reader support
- **Loading States**: Skeleton loaders and error handling for better UX
- **Reusable Components**: Modular UI primitives for consistent design

## 🏗️ Architecture

### Data Flow

```
User Interaction → Component State → API Simulation → Data Processing → UI Update
```

#### 1. Data Simulation Layer (`lib/mockData.ts`)
- **Purpose**: Simulate realistic API responses without backend
- **Features**:
  - Configurable data generation parameters
  - Asynchronous functions with configurable delays
  - Date-range aware data filtering
  - Dynamic data generation based on user preferences

#### 2. Component Layer
- **StatCard**: KPI metric display with trend indicators
- **ChartCard**: Chart containers with loading/error states
- **DateRangeFilter**: Interactive date range selection
- **Table**: Sortable, paginated data tables

#### 3. Page Layer
- **Dashboard**: Main analytics overview with real-time updates
- **Customers**: Customer management with advanced filtering

### State Management

- **Local State**: React hooks for component-level state
- **Data Fetching**: Async functions with loading/error states
- **Filtering**: Real-time search and filter combinations
- **Pagination**: Client-side pagination with sorting

## 📊 Data Structure

### Types (`types/index.ts`)
```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  lastLogin?: Date;
}

interface KPIMetric {
  name: string;
  value: number;
  unit?: string;
  change?: number;
  trend: 'up' | 'down' | 'stable';
}

interface ChartData {
  x: string | number;
  y: number;
}
```

### Data Configuration
- **Scalable**: Easily adjust data volume and generation parameters
- **Realistic**: Varied data with trends and statistical distributions
- **Configurable**: Date ranges, customer counts, and metric ranges

## 🎨 UI Components

### Reusable Primitives
- **Card**: Base container with variants (default, elevated, glass)
- **ChartContainer**: Specialized chart wrapper with loading states
- **Skeleton**: Loading state placeholders
- **DateRangeFilter**: Interactive date selection component

### Accessibility Features
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Single column layouts
- **Tablet**: 2-column grids for metrics
- **Desktop**: 4-column KPI cards, 2-column charts
- **Large**: Optimized spacing and typography

### Layout Strategy
- CSS Grid for complex layouts
- Flexbox for component alignment
- Mobile-first responsive design
- Consistent spacing system

## 🔧 Development

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000)

### Project Structure
```
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Card.tsx        # Base card component
│   │   ├── ChartCard.tsx   # Chart container
│   │   ├── StatCard.tsx    # KPI display
│   │   ├── DateRangeFilter.tsx # Date filtering
│   │   └── Skeleton.tsx    # Loading states
│   ├── dashboard/
│   │   ├── page.tsx        # Main dashboard
│   │   └── customers/
│   │       └── page.tsx    # Customer management
│   └── layout.tsx          # App layout
├── lib/
│   └── mockData.ts         # Data simulation
└── types/
    └── index.ts            # TypeScript definitions
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
npm run start
```

### Environment Variables
No environment variables required - all data is simulated client-side.

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for new features
3. Include accessibility features
4. Test responsive behavior
5. Update documentation

## 📄 License

This project is part of a development exercise and is not licensed for production use.
