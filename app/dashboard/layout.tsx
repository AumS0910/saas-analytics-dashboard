import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../topbar/Topbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-black text-zinc-100">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Topbar />
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
