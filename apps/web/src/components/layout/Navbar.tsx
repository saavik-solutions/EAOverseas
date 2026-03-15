import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.jpg';
import { useAuth } from '@/shared/contexts/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="w-full bg-white border-b border-gray-100 lg:border-none sticky top-0 z-50 lg:relative shadow-sm lg:shadow-none">
            {/* Main Header Content (Logo + Desktop Nav + Auth) */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/landing')}>
                    <img src={logo} alt="EA Overseas Logo" className="h-10 lg:h-14 w-auto object-contain" />
                </div>

                {/* Desktop Links */}
                {['/countries', '/about', '/blogs'].map((path) => (
                    <div
                        key={path}
                        onClick={() => navigate(path)}
                        className="relative cursor-pointer group"
                    >
                        <span className={`text-base font-medium transition-colors ${isActive(path) ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'}`}>
                            {path === '/countries' ? 'Countries' : path === '/about' ? 'About Us' : 'Blogs'}
                        </span>
                        {isActive(path) && (
                            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 layout-id-active" />
                        )}
                    </div>
                ))}
                {user && (
                    <>
                        <div onClick={() => navigate('/dashboard')} className="cursor-pointer group">
                            <span className={`text-base font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'}`}>Dashboard</span>
                        </div>
                        <div onClick={() => navigate('/community-feed')} className="cursor-pointer group">
                            <span className={`text-base font-medium transition-colors ${isActive('/community-feed') ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'}`}>Community</span>
                        </div>
                    </>
                )}

                {/* Desktop CTA */}
                <div className="hidden lg:flex items-center gap-4">
                    {!user ? (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-slate-600 hover:text-[#0d6cf2] font-bold text-sm lg:text-base transition-colors"
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="bg-[#2D83F2] hover:bg-blue-600 text-white font-bold px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md"
                            >
                                Get Started
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="size-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs uppercase">
                                    {user.name?.charAt(0)}
                                </div>
                                <span className="text-sm font-bold text-blue-700">{user.name?.split(' ')[0]}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                                <span className="text-xs font-bold uppercase transition-all tracking-wider">Logout</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger Icon (Top Row) */}
                <div className="lg:hidden flex items-center gap-2">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <span className="material-symbols-outlined text-3xl">close</span>
                        ) : (
                            <span className="material-symbols-outlined text-3xl">menu</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu (Transition Breakdown) */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${isMobileMenuOpen ? 'max-h-[400px] opacity-100 shadow-lg' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="flex flex-col gap-4 px-6 py-6 items-center">
                    {['/countries', '/about', '/blogs'].map((path) => (
                        <div
                            key={path}
                            onClick={() => handleNavigation(path)}
                            className={`text-lg font-medium transition-colors cursor-pointer w-full text-center py-2 border-b border-gray-50 last:border-0 ${isActive(path) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            {path === '/countries' ? 'Countries' : path === '/about' ? 'About Us' : 'Blogs'}
                        </div>
                    ))}
                    {user && (
                        <>
                            <div onClick={() => handleNavigation('/dashboard')} className="text-lg font-medium transition-colors cursor-pointer w-full text-center py-2 border-b border-gray-50 text-gray-700 hover:text-blue-600">Dashboard</div>
                            <div onClick={() => handleNavigation('/community-feed')} className="text-lg font-medium transition-colors cursor-pointer w-full text-center py-2 border-b border-gray-50 text-gray-700 hover:text-blue-600">Community</div>
                        </>
                    )}

                    {!user ? (
                        <div className="w-full flex flex-col gap-3 mt-2">
                            <button
                                onClick={() => handleNavigation('/login')}
                                className="w-full border border-gray-200 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all font-display"
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => handleNavigation('/signup')}
                                className="w-full bg-[#2D83F2] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                            >
                                Get Started
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                            className="w-full text-red-500 font-bold py-3 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">logout</span> Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

