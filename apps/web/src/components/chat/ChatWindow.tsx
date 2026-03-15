import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Socket } from 'socket.io-client';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Message {
    _id: string;
    conversationId: string;
    senderId: { _id: string; name: string; avatarUrl?: string };
    content: string;
    createdAt: string;
}

interface ChatWindowProps {
    conversationId: string;
    currentUserId: string;
    partnerName: string;
    partnerAvatar: string;
    onClose: () => void;
    socket: Socket | null;
    width: number;
    onResize: (delta: number) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    conversationId,
    currentUserId,
    partnerName,
    partnerAvatar,
    onClose,
    socket,
    width,
    onResize,
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMsg, setNewMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const endRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ startX: number; startWidth: number } | null>(null);

    // Fetch history
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/chat/messages/${conversationId}`);
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        fetchMessages();
    }, [conversationId]);

    // Join room & listen
    useEffect(() => {
        if (!socket) return;
        socket.emit('join_conversation', conversationId);

        const handler = (msg: Message) => {
            if (msg.conversationId === conversationId) {
                setMessages(prev => [...prev, msg]);
            }
        };
        socket.on('receive_message', handler);
        return () => { socket.off('receive_message', handler); };
    }, [socket, conversationId]);

    // Auto-scroll
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!newMsg.trim() || !socket) return;
        socket.emit('send_message', {
            conversationId,
            senderId: currentUserId,
            content: newMsg.trim(),
        });
        setNewMsg('');
    };

    const formatTime = (d: string) => {
        const date = new Date(d);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // ── Drag-to-resize (horizontal, from left edge) ─────────────────────
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        dragRef.current = { startX: e.clientX, startWidth: width };

        const handleMouseMove = (ev: MouseEvent) => {
            if (!dragRef.current) return;
            const delta = dragRef.current.startX - ev.clientX; // dragging left = positive delta = wider
            onResize(delta);
        };

        const handleMouseUp = () => {
            dragRef.current = null;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [width, onResize]);

    return (
        <div className="flex h-full" style={{ width }}>
            {/* Drag handle (left edge) */}
            <div
                onMouseDown={handleMouseDown}
                className="w-1.5 shrink-0 cursor-col-resize bg-slate-200 hover:bg-indigo-400 active:bg-indigo-500 transition-colors group flex items-center justify-center"
                title="Drag to resize"
            >
                <div className="w-0.5 h-8 bg-slate-400 group-hover:bg-white rounded-full transition-colors" />
            </div>

            {/* Chat Panel */}
            <div className="flex-1 flex flex-col min-w-0 bg-white border-l border-slate-200">
                {/* Header — matches feed card style */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white shrink-0">
                    <div
                        className="size-9 rounded-full bg-slate-200 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url("${partnerAvatar}")` }}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{partnerName}</p>
                        <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-emerald-400" />
                            <span className="text-[10px] text-slate-400 font-medium">Online</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="size-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                {/* Messages — matches feed background */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-slate-50" style={{ minHeight: 0 }}>
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <span className="material-symbols-outlined text-slate-300 animate-spin text-2xl">progress_activity</span>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-8">
                            <span className="material-symbols-outlined text-5xl text-slate-200 mb-3">chat_bubble</span>
                            <p className="text-sm font-semibold text-slate-400">Start the conversation!</p>
                            <p className="text-xs text-slate-300 mt-1">Say hello to {partnerName}</p>
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isMine = msg.senderId._id === currentUserId || msg.senderId.name === 'You';
                            return (
                                <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                    {!isMine && (
                                        <div
                                            className="size-6 rounded-full bg-slate-200 bg-cover bg-center shrink-0 mt-1 mr-2"
                                            style={{ backgroundImage: `url("${msg.senderId.avatarUrl || partnerAvatar}")` }}
                                        />
                                    )}
                                    <div className={`max-w-[75%] px-3.5 py-2 rounded-2xl ${isMine
                                            ? 'bg-indigo-600 text-white rounded-br-md'
                                            : 'bg-white text-slate-800 border border-slate-100 rounded-bl-md shadow-sm'
                                        }`}>
                                        <p className="text-[13px] leading-relaxed break-words">{msg.content}</p>
                                        <p className={`text-[9px] mt-0.5 text-right ${isMine ? 'text-indigo-200' : 'text-slate-400'}`}>
                                            {formatTime(msg.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={endRef} />
                </div>

                {/* Input — matches feed card style */}
                <div className="shrink-0 px-3 py-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
                    <input
                        type="text"
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                        placeholder="Type a message..."
                        className="flex-1 text-sm px-4 py-2.5 rounded-xl bg-slate-100 border border-transparent focus:outline-none focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 placeholder:text-slate-400 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!newMsg.trim()}
                        className="size-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-lg">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
