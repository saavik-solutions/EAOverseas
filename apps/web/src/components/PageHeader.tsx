import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';

interface Breadcrumb {
    label: string;
    link?: string;
}

interface PageHeaderProps {
    title?: string;
    actions?: React.ReactNode;
    breadcrumbs?: Breadcrumb[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actions, breadcrumbs = [] }) => {
    const navigate = useNavigate();
    const { unreadCount } = useNotification();
    const { logout, user } = useAuth();
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
        <header className="sticky top-0 h-16 bg-white flex items-center justify-between px-4 lg:px-8 shrink-0 z-40 shadow-sm border-b border-gray-100">
            <div className="flex flex-col justify-center">
                {breadcrumbs && (
                    <div className={`flex items-center gap-2 font-medium text-gray-500 mb-0.5 ${!title ? 'text-sm' : 'text-xs'}`}>
                        {breadcrumbs.map((b, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <span className="text-gray-300">/</span>}
                                {b.link ? (
                                    <Link to={b.link} className="hover:text-blue-600 transition-colors">{b.label}</Link>
                                ) : (
                                    <span className={!title ? 'text-gray-900 font-bold' : 'text-blue-600'}>{b.label}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
                {title && <h2 className={`text-xl font-bold text-gray-900 leading-tight ${breadcrumbs ? 'text-lg' : ''}`}>{title}</h2>}
            </div>
            <div className="flex items-center gap-4">
                {/* Custom Actions */}
                {actions && (
                    <>
                        {actions}
                        {user && <div className="h-8 w-px bg-gray-200 mx-1"></div>}
                    </>
                )}

                {/* Notification Bell */}
                {user && (
                    <div className="relative hidden lg:block" ref={notificationRef}>
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

                {user && (
                    <>
                        <div className="h-8 w-px bg-gray-200 mx-1"></div>

                        {/* Sign Out Button - Restored (Authenticated Only) */}
                        <button
                            onClick={() => {
                                navigate('/login');
                                setTimeout(() => {
                                    logout();
                                }, 100);
                            }}
                            className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined !text-[20px]">logout</span>
                            Sign Out
                        </button>
                    </>
                )}


            </div>
        </header>
    );
};

export default PageHeader;
