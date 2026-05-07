import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Socket } from 'socket.io-client';
import { useUserProfile } from '@/shared/contexts/UserProfileContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Participant {
    _id: string;
    name: string;
    avatarUrl?: string;
    role?: string;
}

interface ConversationItem {
    _id: string;
    participants: Participant[];
    lastMessage?: { content: string; createdAt: string; senderId: string };
    updatedAt: string;
}

interface ChatSidebarProps {
    currentUserId: string;
    currentUserName: string;
    isOpen: boolean;
    onClose: () => void;
    onSelectConversation: (conv: ConversationItem, partner: Participant) => void;
    activeConversationId?: string;
    socket: Socket | null;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    currentUserId,
    currentUserName,
    isOpen,
    onClose,
    onSelectConversation,
    activeConversationId,
    socket,
}) => {
    const { userProfile } = useUserProfile();
    const [conversations, setConversations] = useState<ConversationItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    const fetchConversations = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/chat/conversations/${currentUserId}`);
            if (res.ok) {
                const data = await res.json();
                setConversations(data);
            }
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    }, [currentUserId]);

    useEffect(() => {
        if (isOpen) fetchConversations();
    }, [isOpen, fetchConversations]);

    // Refresh on conversation updates
    useEffect(() => {
        if (!socket) return;
        const handler = () => fetchConversations();
        socket.on('conversation_updated', handler);
        return () => { socket.off('conversation_updated', handler); };
    }, [socket, fetchConversations]);

    // Search for users to chat with
    useEffect(() => {
        if (!searchQuery.trim()) { setSearchResults([]); return; }
        const timeout = setTimeout(async () => {
            setSearching(true);
            try {
                // Use feed endpoint to search for users
                const res = await fetch(`${API_BASE}/api/feed/users?search=${encodeURIComponent(searchQuery)}`);
                if (res.ok) {
                    const data = await res.json();
                    const connections = Object.keys(userProfile.connections || {});
                    setSearchResults(data.filter((u: any) => u._id !== currentUserId && connections.includes(u.email?.split('@')[0] || u.name?.toLowerCase().replace(/\s+/g, '_'))));
                }
            } catch (e) { console.error(e); }
            finally { setSearching(false); }
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchQuery, currentUserId, userProfile.connections]); // Added userProfile.connections to dependency array

    const startConversation = async (targetUser: Participant) => {
        try {
            const res = await fetch(`${API_BASE}/api/chat/conversation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUserId, targetUserId: targetUser._id })
            });
            if (res.ok) {
                const conv = await res.json();
                setSearchQuery('');
                setSearchResults([]);
                fetchConversations();
                onSelectConversation(conv, targetUser);
            }
        } catch (e) { console.error(e); }
    };

    const getPartner = (conv: ConversationItem): Participant => {
        return conv.participants.find(p => p.name !== currentUserName) || conv.participants[0];
    };

    const formatTime = (d: string) => {
        const date = new Date(d);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        if (diff < 60000) return 'now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
        if (diff < 86400000) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    return (
        <div className={`
            fixed lg:relative z-50 lg:z-auto
            top-0 left-0 h-full
            w-[320px] max-w-[85vw]
            bg-white border-r border-slate-200
            flex flex-col
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-full'}
            shadow-2xl lg:shadow-none
        `}>
            {/* Header */}
            <div className="shrink-0 px-4 py-4 bg-white border-b border-slate-200">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl text-indigo-600">chat</span>
                        Messages
                    </h2>
                    <button onClick={onClose} className="size-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors lg:hidden">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users to chat..."
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-slate-100 border border-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 transition-all"
                    />
                </div>
            </div>

            {/* Search Results */}
            {searchQuery.trim() && (
                <div className="shrink-0 border-b border-slate-200 max-h-48 overflow-y-auto">
                    {searching ? (
                        <div className="flex items-center justify-center py-4">
                            <span className="material-symbols-outlined text-slate-300 animate-spin">progress_activity</span>
                        </div>
                    ) : searchResults.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">No users found</p>
                    ) : (
                        searchResults.map(user => (
                            <button
                                key={user._id}
                                onClick={() => startConversation(user)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors text-left"
                            >
                                <div
                                    className="size-9 rounded-full bg-slate-200 bg-cover bg-center shrink-0"
                                    style={{ backgroundImage: `url("${user.avatarUrl || `https://i.pravatar.cc/150?u=${user._id}`}")` }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                                    <p className="text-[10px] text-indigo-500 font-medium">{user.role || 'Community Member'}</p>
                                </div>
                                <span className="material-symbols-outlined text-indigo-400 text-lg">add_comment</span>
                            </button>
                        ))
                    )}
                </div>
            )}

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <span className="material-symbols-outlined text-slate-300 animate-spin text-2xl">progress_activity</span>
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                        <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">forum</span>
                        <p className="text-sm font-semibold text-slate-400 mb-1">No conversations yet</p>
                        <p className="text-xs text-slate-300">Search for a user above to start chatting!</p>
                    </div>
                ) : (
                    conversations.map(conv => {
                        const partner = getPartner(conv);
                        const isActive = activeConversationId === conv._id;
                        return (
                            <button
                                key={conv._id}
                                onClick={() => onSelectConversation(conv, partner)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors text-left border-b border-slate-50 ${isActive ? 'bg-indigo-50 border-l-3 border-l-indigo-500' : 'hover:bg-slate-50'
                                    }`}
                            >
                                <div
                                    className="size-11 rounded-full bg-slate-200 bg-cover bg-center shrink-0 ring-2 ring-white shadow-sm"
                                    style={{ backgroundImage: `url("${partner.avatarUrl || `https://i.pravatar.cc/150?u=${partner._id}`}")` }}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm font-semibold truncate ${isActive ? 'text-indigo-700' : 'text-slate-800'}`}>
                                            {partner.name}
                                        </p>
                                        {conv.lastMessage && (
                                            <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                                                {formatTime(conv.lastMessage.createdAt || conv.updatedAt)}
                                            </span>
                                        )}
                                    </div>
                                    {conv.lastMessage ? (
                                        <p className="text-xs text-slate-400 truncate mt-0.5">
                                            {conv.lastMessage.content}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-slate-300 italic mt-0.5">Start a conversation</p>
                                    )}
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
