import Link from "next/link";
import { LayoutGrid, BarChart3, Users, Settings } from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
    return (
        <aside className="w-64 border-r bg-white">
            <div className="px-6 py-5 border-b">
                <h1 className="text-xl font-semibold">SaaSlytics</h1>
                <p className="text-sm text-gray-500">Analytics Dashboard</p>
            </div>

            <nav className="px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
