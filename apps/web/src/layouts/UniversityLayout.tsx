import React, { ReactNode, useState } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface UniversityLayoutProps {
    children: ReactNode;
    universityName?: string;
    pageTitle?: string;
}

const UniversityLayout: React.FC<UniversityLayoutProps> = ({ children, universityName = "University", pageTitle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { universityName: urlUniName } = useParams<{ universityName: string }>();
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Normalize university name for paths
    const uniSlug = (urlUniName || universityName).toLowerCase().replace(/\s+/g, '-');

    const menuItems = [
        { name: 'Overview', icon: 'dashboard', path: `/university-panel/${uniSlug}` },
        { name: 'Courses', icon: 'book', path: `/university-panel/${uniSlug}/courses` },
        { name: 'Admissions', icon: 'assignment_ind', path: `/university-panel/${uniSlug}/admissions` },
        { name: 'Scholarships', icon: 'workspace_premium', path: `/university-panel/${uniSlug}/scholarships` },
        { name: 'Student Interest', icon: 'group', path: '#' },
        { name: 'Analytics', icon: 'analytics', path: '#' },
        { name: 'Post Center', icon: 'feed', path: `/university-panel/${uniSlug}/post-center` },
    ];

    const bottomMenuItems = [
        { name: 'University Profile', icon: 'account_balance', path: '#' },
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
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path || 
                                (item.name === 'Admissions' && location.pathname.includes('/admissions')) ||
                                (item.name === 'Scholarships' && location.pathname.includes('/scholarships')) ||
                                (item.name === 'Courses' && (
                                    location.pathname.includes('/courses') || 
                                    location.pathname.includes('/analytics') || 
                                    location.pathname.includes('/leads') || 
                                    location.pathname.includes('/conversion')
                                ));
                            
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-[#f0f2f4] text-[#2b6cee]'
                                            : 'text-[#616f89] hover:bg-gray-50'
                                    }`}
                                >
                                    <span className={`material-symbols-outlined ${isActive ? 'fill-[1]' : ''}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
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
                <header className="h-14 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 w-full">
                    <div className="flex items-center gap-2">
                        <button 
                            className="lg:hidden p-2 text-[#616f89]"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        {pageTitle && (
                            <h2 className="text-[#111318] text-sm font-black uppercase tracking-tight">
                                {pageTitle}
                            </h2>
                        )}
                        {!pageTitle && (
                            <h2 className="text-[#111318] text-sm font-black uppercase tracking-tight">
                                {universityName}
                            </h2>
                        )}
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <button className="p-2 text-[#616f89] hover:bg-gray-100 rounded-lg relative">
                            <span className="material-symbols-outlined text-[20px] md:text-[24px]">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200 mx-1 md:mx-2"></div>
                        <button 
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-100 transition-all border border-rose-100/50"
                        >
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            Sign Out
                        </button>
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
