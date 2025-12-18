import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    variant?: 'default' | 'elevated' | 'outlined' | 'glass';
}

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
};

const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white shadow-lg border border-gray-100',
    outlined: 'bg-white border-2 border-gray-200',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg shadow-slate-200/50'
};

export default function Card({ children, className = "", padding = 'md', variant = 'default' }: CardProps) {
    return (
        <div className={`rounded-lg ${paddingClasses[padding]} ${variantClasses[variant]} ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`mt-4 ${className}`}>
            {children}
        </div>
    );
}