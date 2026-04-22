import React, { ReactNode, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface UniversityLayoutProps {
    children: ReactNode;
    universityName?: string;
}

const UniversityLayout: React.FC<UniversityLayoutProps> = ({ children, universityName = "University" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { name: 'Overview', icon: 'dashboard', path: `/university-panel/${universityName.toLowerCase().replace(/\s+/g, '-')}` },
        { name: 'University Profile', icon: 'account_balance', path: '#' },
        { name: 'Courses', icon: 'book', path: '#' },
        { name: 'Admissions', icon: 'assignment_ind', path: '#' },
        { name: 'Scholarships', icon: 'workspace_premium', path: '#' },
        { name: 'Student Interest', icon: 'group', path: '#' },
        { name: 'Analytics', icon: 'analytics', path: '#' },
    ];

    const bottomMenuItems = [
        { name: 'Settings', icon: 'settings', path: '#' },
    ];

    return (
        <div className="flex min-h-screen bg-white font-sans text-[#111318]">
            {/* Sidebar */}
            <aside className={`
                w-64 bg-white border-r border-[#e5e7eb] flex flex-col fixed h-full z-50
                transition-transform duration-300 lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 flex flex-col gap-8 h-full">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#2b6cee] rounded-lg p-2 text-white flex items-center justify-center">
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div>
                            <h1 className="text-base font-bold leading-tight">EAOverseas</h1>
                            <p className="text-[#616f89] text-xs font-normal">Partner Portal</p>
                        </div>
                    </div>
                    
                    <nav className="flex flex-col gap-1 grow">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-[#f0f2f4] text-[#2b6cee]'
                                        : 'text-[#616f89] hover:bg-gray-50'
                                }`}
                            >
                                <span className={`material-symbols-outlined ${location.pathname === item.path ? 'fill-[1]' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-4 border-t border-[#f0f2f4]">
                        {bottomMenuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-[#616f89] transition-colors"
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col lg:ml-64">
                {/* Top Navigation */}
                <header className="h-16 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10 w-full">
                    <div className="flex items-center gap-2">
                        <button 
                            className="lg:hidden p-2 text-[#616f89]"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <span className="hidden sm:inline text-[#616f89] text-sm font-medium">Dashboard</span>
                        <span className="hidden sm:inline material-symbols-outlined text-[#616f89] text-sm">chevron_right</span>
                        <h2 className="text-[#111318] text-sm md:text-base font-bold truncate max-w-[200px] md:max-w-none">
                            {universityName}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <button className="p-2 text-[#616f89] hover:bg-gray-100 rounded-lg relative">
                            <span className="material-symbols-outlined text-[20px] md:text-[24px]">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200 mx-1 md:mx-2"></div>
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-bold leading-none">Admin User</p>
                                <p className="text-xs text-[#616f89] mt-1">Registrar Office</p>
                            </div>
                            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-cover bg-center bg-[#f0f2f4]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwQLg9YEjR9iYp2q63dpcJ9kQ7dQ_fyTfsIO-ZLzIy4KUcbr2Q-8SSbD4apZOdvzRS0IM3Ms0EiJ8f96nzY_ur8iUNoZJTjrZNKQhuw0LCVXZtnFklt3ICsttqVC-PfSQB83XnSHafIs9wC29Ijg67x98fRQWiob7WYrM9NUwqSAus2ClMp1J11Gv2sMq4MFOis7pdFTC9hkKOYv5VESg4EHM6TUNe2KCX3lX-2I7Dse0uHkKxy0XzJqENMVlQfqH3bdvueScXb_k")' }}></div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default UniversityLayout;
