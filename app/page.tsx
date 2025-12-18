import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

export default function Home() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 p-6">
                    <h1>Welcome to SaaS Analytics Dashboard</h1>
                </main>
            </div>
        </div>
    );
}