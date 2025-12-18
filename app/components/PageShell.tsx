import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/topbar/Topbar";

export default function PageShell({
    children,

}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex-h-screen">
            <Sidebar />


            <div className="flex flex-col flex-1">
                <Topbar />

                <main className="flex-1 overflow-y-auto p-8 bg-gray-60">
                    {children}
                </main>
            </div>



        </div>
    )
}