import { useState } from 'react';
import Header from '@/components/layout/Header';
import PAISidebar from './PAISidebar';

const PAILayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">
            <PAISidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header configuration */}
                <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 hidden lg:block">
                    <Header onMenuClick={() => setIsSidebarOpen(true)} />
                </div>

                {/* Mobile Header */}
                <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-100 flex items-center justify-between p-4 shadow-sm">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                        <span className="material-symbols-outlined text-[24px]">menu</span>
                    </button>
                    <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        PAI Engine
                    </span>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </div>

                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="flex flex-col min-h-full">
                        <div className="flex-1 max-w-[1400px] w-full mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PAILayout;
