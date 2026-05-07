import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/shared/contexts/UserProfileContext';

const ConnectionsPopup = ({ isOpen, onClose }) => {
    const popupRef = useRef(null);
    const navigate = useNavigate();
    const { getConnectionDetails, acceptConnectionRequest, declineConnectionRequest } = useUserProfile();
    const [activeTab, setActiveTab] = useState('connected');
    const { connected, incoming } = getConnectionDetails();

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

    const currentList = activeTab === 'connected' ? connected : incoming;

    return (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-4 md:mt-0 md:translate-x-0 w-80 z-[100] animate-in fade-in zoom-in-95 duration-200">
            <div ref={popupRef} className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 md:top-1/2 md:left-[-6px] md:-translate-y-1/2 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45 md:-rotate-45 transform"></div>
                <div className="relative bg-white z-10 w-full">
                    <div className="flex border-b border-gray-100">
                        <button
                            onClick={() => setActiveTab('connected')}
                            className={`flex-1 py-3 px-4 text-xs font-bold transition-colors relative ${activeTab === 'connected' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Connections ({connected.length})
                            {activeTab === 'connected' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('incoming')}
                            className={`flex-1 py-3 px-4 text-xs font-bold transition-colors relative ${activeTab === 'incoming' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Requests ({incoming.length})
                            {activeTab === 'incoming' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
                            {incoming.length > 0 && <span className="absolute top-2 right-4 size-2 bg-red-500 rounded-full animate-pulse" />}
                        </button>
                    </div>

                    <div className="max-h-[350px] overflow-y-auto">
                        {currentList.length === 0 ? (
                            <div className="p-10 text-center text-gray-400">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-30">
                                    {activeTab === 'connected' ? 'group_off' : 'person_add_disabled'}
                                </span>
                                <p className="text-sm font-medium">
                                    {activeTab === 'connected' ? 'No connections yet.' : 'No pending requests.'}
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {currentList.map((user) => (
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
                                            className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                                                {user.name}
                                            </h4>
                                            <p className="text-[10px] text-slate-500 truncate font-medium uppercase tracking-wide">{user.role}</p>
                                        </div>

                                        {activeTab === 'incoming' ? (
                                            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                                <button
                                                    onClick={() => acceptConnectionRequest(user.username)}
                                                    className="size-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
                                                    title="Accept Request"
                                                >
                                                    <span className="material-symbols-outlined text-lg">check</span>
                                                </button>
                                                <button
                                                    onClick={() => declineConnectionRequest(user.username)}
                                                    className="size-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                                    title="Decline Request"
                                                >
                                                    <span className="material-symbols-outlined text-lg">close</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                View
                                            </button>
                                        )}
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

