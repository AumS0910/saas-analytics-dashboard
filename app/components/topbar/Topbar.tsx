"use client";

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User, Settings, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const getPageTitle = (pathname: string) => {
    switch (pathname) {
        case '/dashboard':
            return 'Dashboard';
        case '/dashboard/analytics':
            return 'Analytics';
        case '/dashboard/customers':
            return 'Customers';
        case '/dashboard/reports':
            return 'Reports';
        case '/dashboard/settings':
            return 'Settings';
        default:
            return 'Dashboard';
    }
};

export default function Topbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const pageTitle = getPageTitle(pathname);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-white/20 flex items-center px-8 shadow-sm">
            <div className="flex-1">
                <h1 className="text-xl font-bold text-slate-900">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 pl-10 pr-4 py-2 bg-white/60 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300/50 focus:bg-white/80 transition-all duration-200"
                    />
                </div>

                {/* User Avatar */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                        aria-label="User menu"
                    >
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 top-14 w-56 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl z-10">
                            <ul className="py-2">
                                <li>
                                    <button className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors rounded-lg mx-2">
                                        <User className="w-4 h-4 mr-3 text-slate-400" />
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors rounded-lg mx-2">
                                        <Settings className="w-4 h-4 mr-3 text-slate-400" />
                                        Settings
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors rounded-lg mx-2"
                                    >
                                        <LogOut className="w-4 h-4 mr-3 text-slate-400" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
