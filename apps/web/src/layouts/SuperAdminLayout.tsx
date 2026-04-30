import React, { ReactNode, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '@/assets/logo.jpg';
import { useAuth } from '@/features/auth/context/AuthContext';

interface SuperAdminLayoutProps {
    children: ReactNode;
    title?: string;
    hideHeader?: boolean;
}

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children, title = '', hideHeader = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isUniPortalOpen, setIsUniPortalOpen] = useState(
        location.pathname.startsWith('/Superadmin/universit') || location.pathname.startsWith('/Superadmin/university-portal')
    );

    const handleDropdownClick = (itemName: string) => {
        if (itemName === 'University Portal') setIsUniPortalOpen(!isUniPortalOpen);
    };

    const isDropdownOpen = (itemName: string) => {
        if (itemName === 'University Portal') return isUniPortalOpen;
        return false;
    };

    const menuItems = [
        { name: 'Overview', icon: 'dashboard', path: '/Superadmin' },
        { 
            name: 'University Portal', 
            icon: 'account_balance', 
            isDropdown: true,
            children: [
                { name: 'Universities', icon: 'account_balance', path: '/Superadmin/universities' },
                { name: 'Posts & Feed', icon: 'feed', path: '/Superadmin/university-portal/posts-feed' }
            ]
        },
        { name: 'Consultants', icon: 'support_agent', path: '/Superadmin/consultants' },
        { name: 'Students', icon: 'group', path: '/Superadmin/students' },
        { name: 'User Management', icon: 'manage_accounts', path: '/Superadmin/users' },
        { name: 'Revenue', icon: 'payments', path: '/Superadmin/revenue' },
    ];

    return (
        <div className="flex h-screen bg-[#f8f6f6] flex-col lg:flex-row">
            {/* Mobile Header */}
            {!hideHeader && (
                <header className="lg:hidden bg-white px-4 py-3 flex flex-row items-center justify-between border-b border-slate-200 z-50 sticky top-0">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="EAOverseas" className="h-8 w-auto object-contain" />
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>
            )}

            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                w-[260px] bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-[70] h-screen
                transition-transform duration-300 lg:translate-x-0 lg:static
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#2b6cee] size-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#2b6cee]/20">
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[#111318] text-lg font-bold leading-none">Super Admin</h1>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Management</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
                    {menuItems.map((item) => (
                        <div key={item.name} className="w-full">
                            {item.isDropdown ? (
                                <>
                                    <button
                                        onClick={() => handleDropdownClick(item.name)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${isDropdownOpen(item.name)
                                            ? 'bg-[#2b6cee]/10 text-[#2b6cee] font-semibold'
                                            : 'text-slate-600 hover:bg-slate-50 font-medium'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                            <span className="text-sm">{item.name}</span>
                                        </div>
                                        <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${isDropdownOpen(item.name) ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-300 ${isDropdownOpen(item.name) ? 'max-h-80 mt-1 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-12 pr-4 py-1 flex flex-col gap-1 border-l-2 border-slate-100 ml-7">
                                            {item.children?.map(child => (
                                                <Link
                                                    key={child.name}
                                                    to={child.path}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                    className={`flex items-center gap-3 py-2 rounded-lg transition-colors ${location.pathname === child.path
                                                        ? 'text-[#2b6cee] font-semibold'
                                                        : 'text-slate-500 hover:text-[#2b6cee] font-medium'
                                                        }`}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">{child.icon}</span>
                                                    <span className="text-xs">{child.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to={item.path!}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${(location.pathname === item.path ||
                                        (item.name === 'Overview' && location.pathname === '/Superadmin') ||
                                        (item.name === 'Universities' && (
                                            location.pathname.startsWith('/Superadmin/university')
                                        )))
                                        ? 'bg-[#2b6cee]/10 text-[#2b6cee] font-semibold'
                                        : 'text-slate-600 hover:bg-slate-50 font-medium'
                                        }`}
                                >
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                    <span className="text-sm">{item.name}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
                    {/* Mobile-only Sign Out */}
                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="lg:hidden w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span className="text-sm font-bold">Sign Out</span>
                    </button>

                    <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5Qrrx8XIF5fczse7_DsDA50G-m4klPEPj-Jz8cPuwhtt-XPwa3SUP2BbNphmG7UchjPfCK28furJVIWSFqncb_cwqMhx2aKkNIZ1_81sua0geMEy6DJ-CshFMH-skwPAOnacVKBFKI-_hdSqcuUAOy091hJ5w4jSF4kGsHihaw6hhuUjjs9S00nZpBJbP9Hcpetr-4gV2s7Ghm3jaj3b87t7rPAy628R_kepXey4RQMBz7GU-HjXxfeJuZ0-PwmbLGQAVQyeAyGc")' }}></div>
                        <div className="flex flex-col min-w-0">
                            <p className="text-[#111318] text-xs font-bold truncate">James Wilson</p>
                            <p className="text-slate-500 text-[10px] truncate">Admin View</p>
                        </div>

                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0 overflow-x-hidden">
                {/* Header (Desktop) */}
                {!hideHeader && (
                    <header className="hidden lg:flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 z-40 shrink-0">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative w-72">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                                <input
                                    className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#2b6cee]/20 transition-all"
                                    placeholder="Search across platform..."
                                    type="text"
                                />
                            </div>
                            <button className="relative bg-white border border-slate-200 size-10 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-slate-600">notifications</span>
                                <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="h-8 w-px bg-slate-200 mx-2"></div>
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-rose-50 text-rose-600 px-4 py-2 rounded-lg hover:bg-rose-100 transition-all flex items-center gap-2 font-semibold"
                            >
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                                Sign Out
                            </button>
                        </div>
                    </header>
                )}

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto min-h-0">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default SuperAdminLayout;
