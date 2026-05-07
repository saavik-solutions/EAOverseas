import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectionsPopup = ({ isOpen, onClose, connections }) => {
    const popupRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-4 md:mt-0 md:translate-x-0 w-80 z-[100] animate-in fade-in zoom-in-95 duration-200">
            <div ref={popupRef} className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 md:top-1/2 md:left-[-6px] md:-translate-y-1/2 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45 md:-rotate-45 transform"></div>
                <div className="relative bg-white z-10">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-slate-800">Connections</h3>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            {connections.length}
                        </span>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto">
                        {connections.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">group_off</span>
                                <p className="text-sm">No connections yet.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {connections.map((user) => (
                                    <div
                                        key={user.username}
                                        className="p-3 hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                                        onClick={() => {
                                            navigate(`/profile/${user.username}`);
                                            onClose();
                                        }}
                                    >
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                                                {user.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 truncate">{user.role}</p>
                                        </div>
                                        <button
                                            className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
                        <button
                            onClick={() => navigate('/community/feed')}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Find more people
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectionsPopup;
