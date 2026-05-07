import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.jpg';
import { useAuth } from '@/shared/contexts/AuthContext';

const PAISidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const { logout } = useAuth();

    const navItems = [
        { name: 'Profile Form', icon: 'person', path: '/pai/profile-form' },
        { name: 'Resume Upload', icon: 'upload_file', path: '/pai/resume-upload' },
        { name: 'LinkedIn Import', icon: 'work', path: '/pai/linkedin-import' },
        { name: 'GitHub Analysis', icon: 'code', path: '/pai/github-analysis' },
        { name: 'Portfolio Analysis', icon: 'language', path: '/pai/portfolio-analysis' },
        { name: 'Intelligence Report', icon: 'analytics', path: '/pai/intelligence-report' },
    ];

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>
            )}

            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-[70]
                    w-64 flex-col h-full bg-slate-900 text-slate-100 shrink-0 lg:flex
                    transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="px-6 py-5 flex items-center justify-between border-b border-slate-800 bg-slate-950">
                    <img src={logo} alt="EAOverseas" className="h-10 w-auto object-contain bg-white rounded-md p-1" />
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="px-6 py-4 border-b border-slate-800">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modules / PAI</p>
                    <h2 className="text-lg font-semibold mt-1 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Profile Audit Intelligence</h2>
                </div>

                <nav className="flex flex-col gap-1 px-3 mt-4 flex-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');

                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    navigate(item.path);
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg group transition-all duration-200 ${isActive
                                    ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/20 shadow-inner'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white font-medium'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'} transition-colors`}>
                                    {item.icon}
                                </span>
                                <span className="text-sm">
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-left border border-transparent hover:border-slate-700"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        <span className="text-sm font-medium">Exit PAI Module</span>
                    </button>
                    {logout && (
                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="lg:hidden w-full flex items-center gap-3 mt-2 p-3 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            <span className="text-sm font-medium">Sign Out</span>
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
};

export default PAISidebar;
