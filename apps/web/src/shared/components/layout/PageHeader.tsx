import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '@/features/notifications/context/NotificationContext';
import { useAuth } from '@/features/auth';
import NotificationDropdown from '@/features/notifications/NotificationDropdown';

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
                {/* Custom Actions (e.g., Save, Submit buttons) */}
                {actions && (
                    <div className="flex items-center gap-2">
                        {actions}
                    </div>
                )}

                {/* Notifications */}
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

                        {showNotifications && (
                            <NotificationDropdown onClose={() => setShowNotifications(false)} />
                        )}
                    </div>
                )}

                {/* Sign Out Button */}
                {user && (
                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-100 transition-all border border-rose-100/50 shadow-sm shadow-rose-100/20"
                    >
                        <span className="material-symbols-outlined !text-[18px]">logout</span>
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                )}
            </div>
        </header>
    );
};

export default PageHeader;
