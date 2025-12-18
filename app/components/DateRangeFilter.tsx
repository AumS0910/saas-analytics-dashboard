"use client";

import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

export type DateRange = '7d' | '30d' | 'custom';

interface DateRangeFilterProps {
    selectedRange: DateRange;
    onRangeChange: (range: DateRange, customRange?: { start: Date; end: Date }) => void;
    className?: string;
}

export default function DateRangeFilter({ selectedRange, onRangeChange, className = "" }: DateRangeFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showCustomInputs, setShowCustomInputs] = useState(false);
    const [customStart, setCustomStart] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date.toISOString().split('T')[0];
    });
    const [customEnd, setCustomEnd] = useState(() => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    });

    const ranges = [
        { value: '7d' as DateRange, label: 'Last 7 days' },
        { value: '30d' as DateRange, label: 'Last 30 days' },
        { value: 'custom' as DateRange, label: 'Custom range' },
    ];

    const handleRangeSelect = (range: DateRange) => {
        if (range === 'custom') {
            setShowCustomInputs(true);
            onRangeChange(range);
            // Don't close the dropdown - date inputs will appear
        } else {
            setIsOpen(false);
            setShowCustomInputs(false);
            onRangeChange(range);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            setShowCustomInputs(false);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else if (e.key === 'ArrowDown' && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
        }
    };

    const handleCustomApply = () => {
        if (customStart && customEnd) {
            const start = new Date(customStart);
            const end = new Date(customEnd);

            // Validate that start date is not after end date
            if (start > end) {
                alert('Start date cannot be after end date');
                return;
            }

            // Validate that the date range is not too large (e.g., max 1 year)
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 365) {
                alert('Date range cannot exceed 1 year');
                return;
            }

            onRangeChange('custom', { start, end });
            setIsOpen(false);
            setShowCustomInputs(false);
        } else {
            alert('Please select both start and end dates');
        }
    };

    const getCurrentLabel = () => {
        if (selectedRange === 'custom') {
            return 'Custom range';
        }
        const range = ranges.find(r => r.value === selectedRange);
        return range?.label || 'Select range';
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label="Select date range"
            >
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{getCurrentLabel()}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                    <div className="py-1">
                        {ranges.map((range) => (
                            <button
                                key={range.value}
                                onClick={() => handleRangeSelect(range.value)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                                    selectedRange === range.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                }`}
                                role="option"
                                aria-selected={selectedRange === range.value}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>

                    {showCustomInputs && (
                        <div className="border-t border-gray-200 p-4 space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={customStart}
                                    onChange={(e) => setCustomStart(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    aria-label="Start date"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={customEnd}
                                    onChange={(e) => setCustomEnd(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    aria-label="End date"
                                />
                            </div>
                            <button
                                onClick={handleCustomApply}
                                disabled={!customStart || !customEnd}
                                className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                aria-label="Apply custom date range"
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Overlay to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => {
                        setIsOpen(false);
                        setShowCustomInputs(false);
                    }}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}