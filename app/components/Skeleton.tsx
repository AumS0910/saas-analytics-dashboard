interface SkeletonProps {
    className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
    );
}

export function StatCardSkeleton() {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
            </div>
        </div>
    );
}

export function TableSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex space-x-4">
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-16" />
                </div>
            ))}
        </div>
    );
}

export function ChartCardSkeleton() {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/20">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="h-64 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-3/6" />
                <Skeleton className="h-4 w-2/6" />
            </div>
        </div>
    );
}