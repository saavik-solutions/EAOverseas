import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const NotificationDropdown = ({ onClose }) => {
    const { notifications, markAllAsRead, markAsRead, clearAll } = useNotification();
    const navigate = useNavigate();

    const handleItemClick = (notification) => {
        markAsRead(notification.id);
        if (notification.actionUrl) {
            navigate(notification.actionUrl);
            onClose();
        }
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="absolute top-12 right-0 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-900">Notifications</h3>
                <div className="flex gap-2">
                    {notifications.length > 0 && (
                        <>
                            <button
                                onClick={markAllAsRead}
                                className="text-xs font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                                Mark all read
                            </button>
                            <button
                                onClick={clearAll}
                                className="text-xs font-medium text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                            >
                                Clear
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            <span className="material-symbols-outlined text-gray-400">notifications_off</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">No notifications yet</p>
                        <p className="text-xs text-gray-500 mt-1">We'll let you know when updates arrive.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                onClick={() => handleItemClick(notification)}
                                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer relative group ${!notification.read ? 'bg-blue-50/30' : ''}`}
                            >
                                <div className="flex gap-3">
                                    <div className={`mt-1 size-8 shrink-0 rounded-full flex items-center justify-center ${notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                        notification.type === 'error' ? 'bg-red-100 text-red-600' :
                                            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-blue-100 text-blue-600'
                                        }`}>
                                        <span className="material-symbols-outlined !text-[18px]">
                                            {notification.icon || 'notifications'}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <p className={`text-sm font-semibold truncate pr-2 ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                                {notification.title}
                                            </p>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                                                {formatTime(notification.timestamp)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                            {notification.message}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 size-2 bg-blue-600 rounded-full"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationDropdown;
