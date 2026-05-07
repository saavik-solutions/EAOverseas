import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.jpg';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
                <div className="hidden lg:flex items-center gap-10">
                    {['/countries', '/about', '/blogs'].map((path) => (
                        <div
                            key={path}
                            onClick={() => navigate(path)}
                        >
                            <span className={`text-base font-medium transition-colors ${isActive(path) ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'}`}>
                                {path === '/countries' ? 'Countries' : path === '/about' ? 'About Us' : 'Blogs'}
                            </span>
                            {isActive(path) && (
                                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 layout-id-active" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-[#2D83F2] hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md"
                    >
                        Explore Community
                    </button>
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

                    <button
                        onClick={() => handleNavigation('/login')}
                        className="w-full bg-[#2D83F2] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2"
                    >
                        Explore Community
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
