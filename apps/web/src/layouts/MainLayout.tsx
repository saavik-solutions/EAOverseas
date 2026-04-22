import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import NotificationDropdown from '../components/NotificationDropdown';
import LoginModal from '../components/LoginModal';
import { useRef, useEffect } from 'react';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, isLoginModalOpen, setLoginModalOpen } = useAuth() || {}; // Safe access just in case
    const location = useLocation();
    const navigate = useNavigate();

    // Routes to EXCLUDE from global scaling (already manually compacted)
    const excludedRoutes = [
        '/college-details',
        '/course-details',
        '/application',
        '/privacy-security',
        '/accommodation',
        '/consultant',
        '/loans',
        '/visas',
        '/counsellor-dashboard'
    ];

    const shouldScale = !excludedRoutes.some(route => location.pathname.startsWith(route));
    // Notification Logic
    const { unreadCount } = useNotification();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex h-screen w-full bg-background-light font-display text-[#111827] overflow-hidden flex-col lg:flex-row">

            {/* Mobile Header */}
            <div className="lg:hidden bg-white px-4 py-3 flex items-center justify-between z-30 shrink-0">
                <img src={logo} alt="EAOverseas" className="h-8 w-auto object-contain" />

                <div className="flex items-center gap-2">
                    {/* Enter Website Button for Guests (Mobile) */}
                    {!user && (
                        <button
                            onClick={() => navigate('/landing')}
                            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm"
                        >
                            Enter Website
                        </button>
                    )}
                    {/* Notification Bell (Mobile) */}
                    {user && (
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={toggleNotifications}
                                className={`relative p-2 transition-colors rounded-full hover:bg-gray-100 ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                            >
                                <span className={`material-symbols-outlined !text-[24px] ${showNotifications ? 'filled' : ''}`}>notifications</span>
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                )}
                            </button>

                            {/* Dropdown */}
                            {showNotifications && (
                                <NotificationDropdown onClose={() => setShowNotifications(false)} />
                            )}
                        </div>
                    )}

                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* The individual pages will handle their own <main> and <Header> structure 
                to allow for maximum flexibility while sharing the Sidebar */}
            <div className={shouldScale ? "contents mobile-scale-down" : "contents"}>
                <Outlet />
            </div>

            {/* Global Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />
        </div>
    );
};

export default MainLayout;
