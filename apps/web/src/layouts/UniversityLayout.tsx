import React, { ReactNode, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useNotification } from '@/shared/contexts/NotificationContext';
import { useScholarships } from '@/shared/contexts/ScholarshipsContext';
import NotificationDropdown from '@/features/notifications/NotificationDropdown';
import logo from '@/assets/logo.jpg';
import { useRef, useEffect } from 'react';

interface UniversityLayoutProps {
    children: ReactNode;
    title: string;
}

const UniversityLayout: React.FC<UniversityLayoutProps> = ({ children, title }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();
    const { unreadCount } = useNotification();
    const { scholarships } = useScholarships();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    const stateUni = location.state?.university?.name;
    const effectiveUniversity = stateUni || user?.university || "";

    const menuItems = [
        { name: 'Dashboard', icon: 'dashboard', path: '/university/dashboard' },
        { name: 'Scholarship', icon: 'settings_suggest', path: '/university/management' },
        { name: 'Post Center', icon: 'post_add', path: '/university/post-center' },
        { name: 'Programs', icon: 'school', path: '/university/programs' },
    ];

    const mockPrograms = [
        { name: 'MSc Data Science', path: '/university/programs', type: 'Program', icon: 'school' },
        { name: 'Global MBA (Executive)', path: '/university/programs', type: 'Program', icon: 'school' },
        { name: 'BSc Computer Science', path: '/university/programs', type: 'Program', icon: 'school' }
    ];

    const searchResults = searchQuery.trim() === '' ? [] : [
        ...menuItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map(item => ({ ...item, type: 'Page' })),
        ...mockPrograms.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())),
        ...scholarships.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())).map(s => ({ name: s.title, path: '/university/management', icon: 'settings_suggest', type: 'Scholarship' }))
    ].slice(0, 6);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex h-screen bg-background-light flex-col lg:flex-row font-['Public_Sans'] overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200 z-50 sticky top-0">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="EAOverseas" className="h-8 w-auto object-contain" />
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2 text-slate-500">
                        <span className="material-symbols-outlined !text-[24px]">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-[70] h-full
                transition-transform duration-300 lg:translate-x-0 lg:static
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="px-6 py-5 border-b border-slate-50">
                    <div className="flex items-center justify-between mb-2">
                        <img src={logo} alt="EAOverseas" className="h-8 w-auto object-contain" />
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-1 mt-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.name === 'Scholarship' && location.pathname === '/university/scholarship-analytics');
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50 font-medium'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[22px] ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                                    {item.icon}
                                </span>
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 mt-auto">
                    <Link
                        to="/university/profile"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${location.pathname === '/university/profile'
                            ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50 font-medium'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-[22px] ${location.pathname === '/university/profile' ? 'text-blue-600' : 'text-slate-400'}`}>
                            person
                        </span>
                        <span className="text-sm">Profile</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto flex flex-col bg-background-light">
                {/* Top Navbar */}
                <header className="sticky top-0 z-40 h-16 flex items-center justify-between bg-white px-8 border-b border-slate-200 shadow-sm">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-none">{title}</h2>
                        {effectiveUniversity && <span className="text-[10px] font-black text-[#1E63F3] uppercase tracking-widest mt-0.5">{effectiveUniversity}</span>}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative max-w-xs hidden md:block" ref={searchRef}>
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                            <input
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm w-64 text-slate-900 placeholder:text-slate-400 shadow-sm transition-all"
                                placeholder="Search..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsSearchOpen(true);
                                }}
                                onFocus={() => setIsSearchOpen(true)}
                            />

                            {/* Search Dropdown */}
                            {isSearchOpen && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="py-2">
                                        {searchResults.map((result, idx) => (
                                            <Link
                                                key={idx}
                                                to={result.path}
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                }}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                                            >
                                                <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                                    <span className="material-symbols-outlined text-slate-400 !text-[18px] group-hover:text-blue-600">{result.icon}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-slate-700">{result.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{result.type}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className={`relative p-2 transition-colors rounded-full hover:bg-gray-100 ${isNotificationsOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}
                            >
                                <span className="material-symbols-outlined !text-[24px]">notifications</span>
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                )}
                            </button>

                            {isNotificationsOpen && (
                                <NotificationDropdown onClose={() => setIsNotificationsOpen(false)} />
                            )}
                        </div>

                        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined !text-[20px]">logout</span>
                            Sign Out
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-x-hidden min-h-0">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default UniversityLayout;
