import Link from "next/link";
import { LayoutDashboard, BarChart3, Users, Settings } from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col">
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold">SaaSlytics</h1>
                <p className="text-sm text-zinc-500">Analytics Dashboard</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-2 rounded-md text-sm
                       hover:bg-zinc-100 transition"
                    >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
