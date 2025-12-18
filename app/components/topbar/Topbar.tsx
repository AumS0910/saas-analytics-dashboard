export default function Topbar() {
    return (
        <header className="h-16 border-b flex items-center px-8">
            <div className="flex-1">
                <p className="text-sm text-gray-500">Welcome back</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    A
                </div>
            </div>
        </header>
    );
}
