import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useAuthAction } from '@/shared/hooks/useAuthAction';
import { useAuth } from '@/shared/contexts/AuthContext';
import ShareModal from '@/features/shared-modals/ShareModal';
import LoginModal from '@/features/auth/LoginModal';
import { io, Socket } from 'socket.io-client';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';

// --- Types ---
interface Comment {
    _id?: string;
    author?: string;
    avatar?: string;
    text: string;
    time?: string;
    isEdited?: boolean;
    replyTo?: string | null;
}

interface Post {
    _id: string;
    author?: string;
    avatar?: string;
    title: string;
    content: string;
    tags: string[];
    category: string;
    score: number;
    hasLiked: boolean; // single-like per user session
    commentsCount: number;
    comments: Comment[];
    time?: string;
    tldrSummary?: string;
}

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/feed`;
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
// --- Translation Languages ---
const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
];

const TRANSLATION_MIRRORS = [
    "https://libretranslate.de/translate",
    "https://translate.argosopentech.com/translate",
    "https://translate.mentality.rip/translate",
    "https://libretranslate.pussthecat.org/translate"
];

// ─────────────────────────────────────────────────────────────────────────────

const CommunityFeed = () => {
    console.log("CommunityFeed rendering...");
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState<Post | null>(null);
    const [newPostText, setNewPostText] = useState('');
    const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
    const [selectedFilter, setSelectedFilter] = useState('Algorithmic Feed');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleComments, setVisibleComments] = useState<Record<string, boolean>>({});
    const [posts, setPosts] = useState<Post[]>([]);
    const [trendingTopics, setTrendingTopics] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSemanticSearching, setIsSemanticSearching] = useState(false);
    // Inline comment edit state: { postId, idx, draft }
    const [editingComment, setEditingComment] = useState<{ postId: string; idx: number; draft: string } | null>(null);
    const [replyingTo, setReplyingTo] = useState<{ postId: string; commentId: string; authorName: string } | null>(null);
    const [safetyViolation, setSafetyViolation] = useState<{ active: boolean; countdown: number; type: 'post' | 'comment'; postId?: string } | null>(null);
    const [translations, setTranslations] = useState<Record<string, { title: string; content: string; lang: string; isLoading?: boolean }>>({});

    // ── Chat State ──────────────────────────────────────────────────────────
    const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
    const [activeChat, setActiveChat] = useState<{ conversationId: string; partnerName: string; partnerAvatar: string } | null>(null);
    const [socketRef, setSocketRef] = useState<Socket | null>(null);
    const [chatWidth, setChatWidth] = useState(380);
    const chatWidthRef = useRef(380);

    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { user, accessToken } = useAuth();
    const navigate = useNavigate();

    // ── Socket.io Connection ────────────────────────────────────────────────
    useEffect(() => {
        const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] });
        setSocketRef(socket);
        return () => { socket.disconnect(); };
    }, []);

    const handleChatResize = useCallback((delta: number) => {
        const newWidth = Math.max(320, Math.min(600, chatWidthRef.current + delta));
        chatWidthRef.current = newWidth;
        setChatWidth(newWidth);
    }, []);
    const [searchParams] = useSearchParams();
    const sharedPostId = searchParams.get('post');
    const [highlightedPostId, setHighlightedPostId] = useState<string | null>(null);

    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search to avoid spamming the backend
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // ── Backend fetch (falls back to seed data gracefully) ──────────────────
    useEffect(() => {
        const fetchFeed = async () => {
            setIsLoading(true);
            try {
                const topicParam = selectedFilter !== 'Algorithmic Feed' ? `topic=${encodeURIComponent(selectedFilter)}&` : '';
                const searchParam = debouncedSearch ? `search=${encodeURIComponent(debouncedSearch)}&` : '';
                const uId = (user as any)?.id || (user as any)?._id || (user as any)?.uid;
                const userParam = uId ? `userId=${uId}` : '';
                const queryStr = `?${topicParam}${searchParam}${userParam}`;

                const res = await fetch(`${API_URL}${queryStr}`, {
                    headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.posts?.length > 0) {
                        const hydrated: Post[] = data.posts.map((p: any) => ({
                            _id: p._id,
                            author: p.authorId?.name || 'Unknown',
                            authorUsername: p.authorId?.email?.split('@')[0] || p.authorId?.name?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
                            avatar: p.authorId?.avatarUrl || `https://i.pravatar.cc/150?u=${p._id}`,
                            title: p.title,
                            content: p.content,
                            tags: p.tags || [],
                            category: p.tags?.[0] || 'General',
                            score: p.score || 0,
                            hasLiked: p.hasLiked || false,
                            commentsCount: p.commentsCount || 0,
                            comments: p.comments || [],
                            time: new Date(p.createdAt).toLocaleDateString(),
                            tldrSummary: p.tldrSummary,
                        }));
                        setPosts(hydrated);
                    }
                }
            } catch (_) { /* keep seed data */ }
            finally { setIsLoading(false); }
        };

        const fetchTrending = async () => {
            try {
                const res = await fetch(`${API_URL}/trending`, {
                    headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.trending?.length > 0) setTrendingTopics(data.trending);
                }
            } catch (_) { }
        };

        fetchFeed();
        fetchTrending();
    }, [selectedFilter, debouncedSearch]);

    // ── Safety Violation Countdown ──────────────────────────────────────────
    useEffect(() => {
        if (safetyViolation?.active && safetyViolation.countdown > 0) {
            const timer = setTimeout(() => {
                setSafetyViolation(prev => prev ? { ...prev, countdown: prev.countdown - 1 } : null);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (safetyViolation?.active && safetyViolation.countdown === 0) {
            const timer = setTimeout(() => {
                if (safetyViolation.type === 'post') setNewPostText('');
                if (safetyViolation.type === 'comment' && safetyViolation.postId) {
                    setCommentInputs(prev => ({ ...prev, [safetyViolation.postId!]: '' }));
                }
                setSafetyViolation(null);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [safetyViolation]);

    // ── Deep linking (auto-scroll + highlight) ───────────────────────────────
    useEffect(() => {
        if (sharedPostId && posts.length > 0) {
            const timer = setTimeout(() => {
                const element = document.getElementById(`post-${sharedPostId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setHighlightedPostId(sharedPostId);
                    // Remove highlight after 4 seconds
                    setTimeout(() => setHighlightedPostId(null), 4000);
                }
            }, 800); // Delay for data render
            return () => clearTimeout(timer);
        }
    }, [sharedPostId, posts]);

    // ── Handle Auto-Chat Trigger ──────────────────────────────────────────
    useEffect(() => {
        const chatWith = searchParams.get('chatWith');
        if (chatWith && user) {
            setChatSidebarOpen(true);
            // The sidebar will handle loading conversations. 
        }
    }, [searchParams, user]);

    // ── Filtered posts (search + category filter) ────────────────────────────
    const filteredPosts = posts.filter(post => {
        const matchFilter = selectedFilter === 'Algorithmic Feed'
            || post.category === selectedFilter
            || post.tags.includes(selectedFilter);

        const q = searchQuery.toLowerCase().trim();
        const matchSearch = !q
            || post.title.toLowerCase().includes(q)
            || post.content.toLowerCase().includes(q)
            || post.tags.some(t => t.toLowerCase().includes(q))
            || (post.author || '').toLowerCase().includes(q);

        return matchFilter && matchSearch;
    });

    // ── Semantic search animation ────────────────────────────────────────────
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 3) {
            setIsSemanticSearching(true);
            setTimeout(() => setIsSemanticSearching(false), 600);
        }
    };

    // ── Single-like toggle ───────────────────────────────────────────────────
    const handleLike = (postId: string) => {
        executeAction(async () => {
            const uId = user?.firebaseUid || (user as any)?.id || (user as any)?._id || (user as any)?.uid || 'Guest';
            console.log("Liking post", postId, "as user", uId);
            if (!uId) {
                setError("Account identification error. Please try logging out and back in.");
                return;
            }

            let isLiking = false;
            // Optimistic update
            setPosts(prev => prev.map(p => {
                if (p._id !== postId) return p;
                isLiking = !p.hasLiked;
                return { ...p, hasLiked: isLiking, score: p.score + (isLiking ? 1 : -1) };
            }));

            try {
                const res = await fetch(`${API_URL}/${postId}/toggle-like`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ userId: uId })
                });
                if (!res.ok) {
                    // Revert on fail
                    setPosts(prev => prev.map(p => {
                        if (p._id !== postId) return p;
                        return { ...p, hasLiked: !isLiking, score: p.score + (!isLiking ? 1 : -1) };
                    }));
                }
            } catch (err) {
                // Revert on fail
                setPosts(prev => prev.map(p => {
                    if (p._id !== postId) return p;
                    return { ...p, hasLiked: !isLiking, score: p.score + (!isLiking ? 1 : -1) };
                }));
            }
        });
    };

    // ── Toggle comment section ───────────────────────────────────────────────
    const toggleComments = (postId: string) => {
        setVisibleComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    // ── Submit comment ───────────────────────────────────────────────────────
    const handleCommentSubmit = (postId: string) => {
        const text = commentInputs[postId]?.trim();
        if (!text) return;

        executeAction(async () => {
            try {
                const uId = user?.firebaseUid || (user as any)?.id || (user as any)?._id || (user as any)?.uid || 'Guest';
                console.log("Commenting on post", postId, "as user", uId);
                if (!uId) {
                    setError("Account identification error. Please try logging out and back in.");
                    return;
                }

                const res = await fetch(`${API_URL}/${postId}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        authorId: uId,
                        text,
                        parentId: replyingTo?.postId === postId ? replyingTo.commentId : null
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    const newComment: Comment = {
                        _id: data.comment._id,
                        author: user?.name || user?.displayName || 'Guest',
                        avatar: user?.avatarUrl || user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
                        text,
                        time: 'Just now',
                        replyTo: replyingTo?.postId === postId ? replyingTo.commentId : null
                    };
                    setReplyingTo(null);
                    setPosts(prev => prev.map(p => {
                        if (p._id !== postId) return p;
                        return {
                            ...p,
                            commentsCount: p.commentsCount + 1,
                            comments: [newComment, ...p.comments],
                        };
                    }));
                    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
                    setError(null);
                } else {
                    const errData = await res.json();
                    if (res.status === 403 && errData.code === 'SAFETY_VIOLATION') {
                        setSafetyViolation({ active: true, countdown: 5, type: 'comment', postId });
                        setError(null);
                    } else {
                        setError(errData.error || 'Failed to add comment');
                    }
                }
            } catch (err) {
                console.error("Failed to comment", err);
                setError('Connection failed. Is the server running?');
            }
        });
    };

    // ── Create post ──────────────────────────────────────────────────────────
    const handlePostSubmit = () => {
        executeAction(async () => {
            const uId = user?.firebaseUid || (user as any)?.id || (user as any)?._id || (user as any)?.uid || 'Guest';
            console.log("Creating new post with uId:", uId);
            if (!uId) {
                setError("Account identification error. Please try logging out and back in.");
                return;
            }

            if (!newPostText.trim()) return;
            const content = newPostText.trim();
            const autoTags = content.toLowerCase().includes('visa')
                ? ['Visas']
                : content.toLowerCase().includes('scholarship')
                    ? ['Scholarships']
                    : ['General', 'Discussion'];

            const tempId = `temp-${Date.now()}`;
            const optimisticPost: Post = {
                _id: tempId,
                author: user?.name || user?.displayName || 'Guest',
                avatar: user?.avatarUrl || user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
                title: content,
                content: content,
                tags: autoTags,
                category: autoTags[0],
                score: 1,
                hasLiked: false,
                commentsCount: 0,
                comments: [],
                time: 'Just now',
            };

            // Instant Post (Optimistic Update)
            setPosts(prev => [optimisticPost, ...prev]);
            setNewPostText('');
            setIsPosting(true);
            setError(null);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

            try {
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        authorId: uId,
                        title: content,
                        content: content,
                        tags: autoTags
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const data = await res.json();
                    // Update the temp post with the real one from backend
                    setPosts(prev => prev.map(p => p._id === tempId ? {
                        ...p,
                        _id: data.post._id,
                        time: new Date(data.post.createdAt).toLocaleDateString()
                    } : p));
                } else {
                    // Revert on fail
                    setPosts(prev => prev.filter(p => p._id !== tempId));
                    setNewPostText(content); // Restore text

                    let errorMessage = `Failed to create post (${res.status})`;
                    try {
                        const errData = await res.json();
                        if (res.status === 403 && errData.code === 'SAFETY_VIOLATION') {
                            setSafetyViolation({ active: true, countdown: 5, type: 'post' });
                            return;
                        }
                        errorMessage = errData.error || errData.details || errorMessage;
                    } catch (e) {
                        const text = await res.text();
                        errorMessage += `: ${text.substring(0, 50)}`;
                    }
                    setError(errorMessage);
                }
            } catch (err: any) {
                console.error("Failed to post", err);
                setPosts(prev => prev.filter(p => p._id !== tempId)); // Revert
                setNewPostText(content); // Restore text
                setError(`Connection failed: ${err.message || 'Is the server running?'}`);
            } finally {
                setIsPosting(false);
            }
        });
    };

    // ── Post Translation (Integrated High-Reliability) ──────────────────────────
    const handleTranslate = async (postId: string, title: string, content: string, targetLang: string) => {
        if (targetLang === 'en') {
            setTranslations(prev => {
                const next = { ...prev };
                delete next[postId];
                return next;
            });
            return;
        }

        setTranslations(prev => ({
            ...prev,
            [postId]: { ...prev[postId], isLoading: true, lang: targetLang, title, content }
        }));

        let success = false;

        // 1. Primary: High-reliability Backend (via OpenAI)
        try {
            const res = await fetch(`${API_URL}/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texts: [title, content], targetLang })
            });

            if (res.ok) {
                const data = await res.json();
                const translatedText = data.translatedText;
                setTranslations(prev => ({
                    ...prev,
                    [postId]: {
                        title: translatedText[0] || title,
                        content: translatedText[1] || content,
                        lang: targetLang,
                        isLoading: false
                    }
                }));
                success = true;
            }
        } catch (err) {
            console.warn("Backend translation failed, trying mirrors...");
        }

        // 2. Fallback: Open Source Mirrors
        if (!success) {
            for (const mirror of TRANSLATION_MIRRORS) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 8000);

                    const res = await fetch(mirror, {
                        method: "POST",
                        body: JSON.stringify({
                            q: [title, content],
                            source: "auto",
                            target: targetLang,
                            format: "text"
                        }),
                        headers: { "Content-Type": "application/json" },
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);

                    if (res.ok) {
                        const data = await res.json();
                        const translatedText = data.translatedText;

                        setTranslations(prev => ({
                            ...prev,
                            [postId]: {
                                title: Array.isArray(translatedText) ? translatedText[0] : (title),
                                content: Array.isArray(translatedText) ? translatedText[1] : (translatedText || content),
                                lang: targetLang,
                                isLoading: false
                            }
                        }));
                        success = true;
                        break;
                    }
                } catch (err) {
                    console.warn(`Mirror ${mirror} failed...`);
                }
            }
        }

        if (!success) {
            setTranslations(prev => ({
                ...prev,
                [postId]: { ...prev[postId], isLoading: false }
            }));
            // Provide a slightly more descriptive error
            const detail = error ? `: ${error}` : "";
            setError(`Translation service unavailable${detail}. Using your OpenAI key in the backend should prevent this; please check API logs.`);
        }
    };

    // ── Save edited comment ───────────────────────────────────────────────────
    const handleCommentSave = async (postId: string, idx: number) => {
        if (!editingComment || !editingComment.draft.trim()) return;

        const post = posts.find(p => p._id === postId);
        const commentToEdit = post?.comments[idx];

        // MVP: If it's a seed comment without a valid DB _id, allow local update anyway.
        // In real use, only DB comments will be editable.
        if (commentToEdit && commentToEdit._id && !commentToEdit._id.startsWith('seed')) {
            try {
                const uId = (user as any)?.id || (user as any)?._id || (user as any)?.uid;
                await fetch(`${API_URL}/comment/${commentToEdit._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        text: editingComment.draft.trim(),
                        userId: uId
                    })
                });
            } catch (err) {
                console.error("Failed to update comment in DB", err);
            }
        }

        setPosts(prev => prev.map(p => {
            if (p._id !== postId) return p;
            const updated = p.comments.map((c, i) =>
                i === idx ? { ...c, text: editingComment.draft.trim(), isEdited: true } : c
            );
            return { ...p, comments: updated };
        }));
        setEditingComment(null);
    };

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-slate-50 font-['Inter']">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

            <div className="hidden lg:block">
                <PageHeader title="Community Intelligence Feed" />
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* ── CHAT SIDEBAR (Left) ──────────────────────────── */}
                <ChatSidebar
                    currentUserId={user?.uid || ''}
                    currentUserName={user?.displayName || 'Guest'}
                    isOpen={chatSidebarOpen}
                    onClose={() => setChatSidebarOpen(false)}
                    activeConversationId={activeChat?.conversationId}
                    socket={socketRef}
                    onSelectConversation={(conv, partner) => {
                        setActiveChat({
                            conversationId: conv._id,
                            partnerName: partner.name,
                            partnerAvatar: partner.avatarUrl || `https://i.pravatar.cc/150?u=${partner._id}`,
                        });
                        // On mobile, close sidebar when chat is selected
                        if (window.innerWidth < 1024) setChatSidebarOpen(false);
                    }}
                />

                {/* Overlay for mobile sidebar */}
                {chatSidebarOpen && (
                    <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setChatSidebarOpen(false)} />
                )}

                {/* ── MAIN FEED ──────────────────────────────────────── */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative">

                    {/* Sticky Search Bar */}
                    <div className="bg-white border-b border-slate-200 px-6 py-4 z-20 sticky top-0 shadow-sm">
                        <div className="max-w-3xl mx-auto flex items-center gap-3">
                            {/* Chat Toggle Button */}
                            <button
                                onClick={() => setChatSidebarOpen(prev => !prev)}
                                className={`shrink-0 size-10 rounded-xl flex items-center justify-center transition-all shadow-sm ${chatSidebarOpen
                                    ? 'bg-indigo-600 text-white shadow-indigo-200'
                                    : 'bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200'
                                    }`}
                                title="Toggle Chat"
                            >
                                <span className="material-symbols-outlined text-xl">chat</span>
                            </button>
                            <div className="flex-1 relative group">
                                <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] transition-colors ${isSemanticSearching ? 'text-indigo-500' : 'text-slate-400 group-focus-within:text-indigo-500'}`}>
                                    search
                                </span>
                                <input
                                    className="w-full h-11 pl-11 pr-24 rounded-xl bg-slate-100 border border-transparent outline-none text-sm placeholder:text-slate-500 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 transition-all"
                                    placeholder="Search posts, topics or questions..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                    </button>
                                )}
                                {isSemanticSearching && (
                                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[10px] text-indigo-500 font-bold animate-pulse tracking-wide">
                                        NLP…
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Search result count */}
                        {searchQuery.trim() && (
                            <p className="max-w-3xl mx-auto mt-2 text-xs text-slate-400 font-medium">
                                {filteredPosts.length === 0
                                    ? `No results for "${searchQuery}"`
                                    : `${filteredPosts.length} result${filteredPosts.length > 1 ? 's' : ''} for "${searchQuery}"`}
                            </p>
                        )}
                    </div>

                    {/* Feed Content */}
                    <div className="flex-1 overflow-y-auto scroll-smooth p-6">
                        <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-20">

                            {error && (
                                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                    <span className="material-symbols-outlined text-[20px]">error</span>
                                    <p className="text-sm font-bold flex-1">{error}</p>
                                    <button onClick={() => setError(null)} className="p-1 hover:bg-rose-100 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                    </button>
                                </div>
                            )}


                            {/* Post Composer */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                <div className="flex gap-3">
                                    <div
                                        className="size-9 rounded-full bg-slate-200 bg-cover bg-center shrink-0"
                                        style={{ backgroundImage: `url("${user?.avatarUrl || user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest'}")` }}
                                    />
                                    <textarea
                                        className="flex-1 min-h-[56px] text-sm outline-none placeholder:text-slate-400 bg-transparent resize-none border-0 focus:ring-0"
                                        placeholder="What do you want to ask or share? AI will auto-categorize your post."
                                        value={newPostText}
                                        onChange={e => setNewPostText(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handlePostSubmit()}
                                    />
                                </div>
                                <div className="flex items-center justify-end pt-3 mt-3 border-t border-slate-100">
                                    <button
                                        onClick={handlePostSubmit}
                                        disabled={!newPostText.trim() || isPosting}
                                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all shadow flex items-center gap-2 ${newPostText.trim() && !isPosting ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                                    >
                                        {isPosting && <span className="size-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>}
                                        {isPosting ? 'Uploading...' : 'Post'}
                                    </button>
                                </div>
                            </div>

                            {/* Filter Chips */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-6 px-6 scrollbar-hide">
                                {['Algorithmic Feed', 'Admissions', 'Scholarships', 'Visas', 'Finances', 'Career Advice'].map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setSelectedFilter(filter)}
                                        className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5
                                            ${selectedFilter === filter
                                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        {filter === 'Algorithmic Feed' && (
                                            <span className="material-symbols-outlined text-[14px]">dynamic_feed</span>
                                        )}
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            {/* Loading Skeleton */}
                            {isLoading && (
                                <div className="flex flex-col gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 bg-slate-200 rounded-full" />
                                                <div className="h-3 bg-slate-200 rounded w-1/4" />
                                            </div>
                                            <div className="h-4 bg-slate-200 rounded w-3/4" />
                                            <div className="h-3 bg-slate-200 rounded w-full" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Empty State */}
                            {!isLoading && filteredPosts.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <span className="material-symbols-outlined text-slate-300 text-[64px] mb-4">find_in_page</span>
                                    <p className="text-slate-500 font-semibold text-lg">No posts found</p>
                                    <p className="text-slate-400 text-sm mt-1">Try a different keyword or category</p>
                                </div>
                            )}

                            {/* Post List */}
                            {!isLoading && filteredPosts.map(post => (
                                <article
                                    id={`post-${post._id}`}
                                    key={post._id}
                                    className={`bg-white rounded-2xl border transition-all duration-700 overflow-hidden 
                                        ${highlightedPostId === post._id
                                            ? 'border-indigo-500 ring-4 ring-indigo-100 shadow-xl bg-indigo-50/10'
                                            : 'border-slate-200 shadow-sm hover:shadow-md'}`}
                                >
                                    {/* Top: author + meta */}
                                    {/* Content Only (Like moved below) */}
                                    <div className="flex gap-4 p-5">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                                                <div
                                                    className="size-6 rounded-full bg-slate-200 bg-cover bg-center shrink-0 cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all"
                                                    style={{ backgroundImage: `url("${post.avatar}")` }}
                                                    onClick={() => navigate(`/profile/${(post as any).authorUsername || post.author}`)}
                                                />
                                                <span
                                                    className="font-bold text-slate-800 cursor-pointer hover:text-indigo-600 transition-colors"
                                                    onClick={() => navigate(`/profile/${(post as any).authorUsername || post.author}`)}
                                                >
                                                    {post.author}
                                                </span>
                                                <span>•</span>
                                                <span>{post.time}</span>
                                            </div>

                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-base font-bold text-slate-900 leading-snug">
                                                    {translations[post._id]?.isLoading ? 'Translating...' : (translations[post._id]?.title || post.title)}
                                                </h3>

                                                <select
                                                    className="text-[10px] bg-slate-50 border-none rounded p-1 text-slate-500 font-bold focus:ring-0 cursor-pointer"
                                                    value={translations[post._id]?.lang || 'en'}
                                                    onChange={(e) => handleTranslate(post._id, post.title, post.content, e.target.value)}
                                                >
                                                    {SUPPORTED_LANGUAGES.map(l => (
                                                        <option key={l.code} value={l.code}>{l.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {post.content && (
                                                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                                    {translations[post._id]?.isLoading ? 'Please wait...' : (translations[post._id]?.content || post.content)}
                                                </p>
                                            )}

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* AI Summary (shown for posts with a summary when collapsed) */}
                                            {post.tldrSummary && !visibleComments[post._id] && (
                                                <div className="flex gap-2 items-start p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 mb-3">
                                                    <span className="material-symbols-outlined text-indigo-400 text-[16px] mt-0.5 shrink-0">auto_awesome</span>
                                                    <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                                                        <strong>AI Summary:</strong> {post.tldrSummary}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Action Row */}
                                            <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold border-t border-slate-50 pt-3">
                                                {/* Like button in Action Row */}
                                                <button
                                                    onClick={() => handleLike(post._id)}
                                                    className={`flex items-center gap-1.5 transition-colors ${post.hasLiked ? 'text-rose-500' : 'hover:text-rose-500'}`}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: post.hasLiked ? "'FILL' 1" : "'FILL' 0" }}>
                                                        favorite
                                                    </span>
                                                    <span className="tabular-nums">{post.score}</span>
                                                    <span>{post.score === 1 ? 'Like' : 'Likes'}</span>
                                                </button>

                                                <button
                                                    onClick={() => toggleComments(post._id)}
                                                    className={`flex items-center gap-1.5 transition-colors ${visibleComments[post._id] ? 'text-indigo-600' : 'hover:text-indigo-600'}`}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        {visibleComments[post._id] ? 'chat_bubble' : 'chat_bubble_outline'}
                                                    </span>
                                                    {post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}
                                                </button>

                                                <button
                                                    onClick={() => { setShareData(post); setIsShareModalOpen(true); }}
                                                    className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">ios_share</span>
                                                    Share
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── Comment Section ───────────────────── */}
                                    {visibleComments[post._id] && (
                                        <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 flex flex-col gap-4">

                                            {/* Comment Input */}
                                            <div className="flex flex-col gap-2">
                                                {replyingTo?.postId === post._id && (
                                                    <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 self-start">
                                                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Replying to {replyingTo.authorName}</span>
                                                        <button
                                                            onClick={() => setReplyingTo(null)}
                                                            className="material-symbols-outlined text-[14px] text-indigo-400 hover:text-indigo-600 transition-colors"
                                                        >
                                                            close
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="flex gap-3 items-start">
                                                    <div
                                                        className="size-8 rounded-full bg-slate-200 bg-cover bg-center shrink-0 mt-1"
                                                        style={{ backgroundImage: `url("${user?.avatarUrl || user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest'}")` }}
                                                    />
                                                    <div className="flex-1 flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder={replyingTo?.postId === post._id ? `Reply to ${replyingTo.authorName}...` : "Write a comment..."}
                                                            className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 transition-all"
                                                            value={commentInputs[post._id] || ''}
                                                            onChange={e => setCommentInputs(prev => ({ ...prev, [post._id]: e.target.value }))}
                                                            onKeyDown={e => {
                                                                if (e.key === 'Enter') handleCommentSubmit(post._id);
                                                            }}
                                                        />
                                                        <button
                                                            onClick={() => handleCommentSubmit(post._id)}
                                                            disabled={!commentInputs[post._id]?.trim()}
                                                            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors h-[42px]"
                                                        >
                                                            Send
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Comments List */}
                                            {post.comments.length === 0 ? (
                                                <p className="text-xs text-slate-400 text-center py-2">No comments yet — be the first!</p>
                                            ) : (
                                                <div className="flex flex-col gap-4">
                                                    {/* Group comments into parent-child structure for simple one-level threading */}
                                                    {post.comments
                                                        .filter(c => !c.replyTo) // Root comments
                                                        .map((parentComment, pIdx) => {
                                                            const replies = post.comments.filter(c => c.replyTo === parentComment._id);

                                                            const renderCommentObj = (comment: Comment, idx: number, isReply: boolean = false) => {
                                                                const isAI = comment.author === 'AI Assistant';
                                                                const currentUserName = user?.displayName || 'Guest';
                                                                const isOwn = !isAI && comment.author === currentUserName;
                                                                // Use a unique indicator for editing: {postId, commentId}
                                                                const isBeingEdited = editingComment?.postId === post._id && editingComment?.idx === idx;

                                                                return (
                                                                    <div key={comment._id || idx} className={`flex gap-3 group/comment ${isReply ? 'ml-10 mt-1' : ''}`}>
                                                                        <div
                                                                            className={`${isReply ? 'size-6' : 'size-7'} rounded-full bg-slate-200 bg-cover bg-center shrink-0 mt-0.5`}
                                                                            style={{ backgroundImage: `url("${comment.avatar}")` }}
                                                                        />
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className={`rounded-xl px-3.5 py-2.5 ${isAI ? 'bg-indigo-50 border border-indigo-100' : 'bg-white border border-slate-100'}`}>
                                                                                {/* Header row */}
                                                                                <div className="flex items-center gap-1.5 mb-1">
                                                                                    <span className={`text-xs font-bold ${isAI ? 'text-indigo-700' : 'text-slate-900'}`}>
                                                                                        {comment.author}
                                                                                    </span>
                                                                                    {isAI && (
                                                                                        <span className="material-symbols-outlined text-[13px] text-indigo-500">smart_toy</span>
                                                                                    )}
                                                                                    {comment.isEdited && (
                                                                                        <span className="text-[10px] text-slate-400 italic font-medium">(edited)</span>
                                                                                    )}
                                                                                    <span className="text-[10px] text-slate-400 ml-auto whitespace-nowrap">{comment.time}</span>
                                                                                    <div className="flex gap-1">
                                                                                        {!isReply && (
                                                                                            <button
                                                                                                title="Reply"
                                                                                                onClick={() => setReplyingTo({ postId: post._id, commentId: comment._id || '', authorName: comment.author })}
                                                                                                className="opacity-0 group-hover/comment:opacity-100 transition-opacity p-0.5 rounded hover:bg-slate-100 text-slate-400 hover:text-indigo-600"
                                                                                            >
                                                                                                <span className="material-symbols-outlined text-[14px]">reply</span>
                                                                                            </button>
                                                                                        )}
                                                                                        {isOwn && !isBeingEdited && (
                                                                                            <button
                                                                                                title="Edit comment"
                                                                                                onClick={() => {
                                                                                                    // Find the index in original array
                                                                                                    const realIdx = post.comments.findIndex(c => c._id === comment._id);
                                                                                                    setEditingComment({ postId: post._id, idx: realIdx, draft: comment.text });
                                                                                                }}
                                                                                                className="opacity-0 group-hover/comment:opacity-100 transition-opacity p-0.5 rounded hover:bg-slate-100 text-slate-400 hover:text-indigo-600"
                                                                                            >
                                                                                                <span className="material-symbols-outlined text-[14px]">edit</span>
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                {isBeingEdited ? (
                                                                                    <div className="flex flex-col gap-2 mt-1">
                                                                                        <textarea
                                                                                            autoFocus
                                                                                            rows={2}
                                                                                            className="w-full text-xs border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none bg-white"
                                                                                            value={editingComment.draft}
                                                                                            onChange={e => setEditingComment({ ...editingComment, draft: e.target.value })}
                                                                                            onKeyDown={e => {
                                                                                                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCommentSave(post._id, editingComment.idx); }
                                                                                                if (e.key === 'Escape') setEditingComment(null);
                                                                                            }}
                                                                                        />
                                                                                        <div className="flex gap-2 justify-end">
                                                                                            <button
                                                                                                onClick={() => setEditingComment(null)}
                                                                                                className="px-3 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                                                                                            >
                                                                                                Cancel
                                                                                            </button>
                                                                                            <button
                                                                                                onClick={() => handleCommentSave(post._id, editingComment.idx)}
                                                                                                disabled={!editingComment.draft.trim()}
                                                                                                className="px-3 py-1 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-40"
                                                                                            >
                                                                                                Save
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <p className={`text-xs leading-relaxed ${isAI ? 'text-indigo-800' : 'text-slate-700'}`}>
                                                                                        {comment.text}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            };

                                                            return (
                                                                <div key={parentComment._id || pIdx} className="flex flex-col gap-2">
                                                                    {renderCommentObj(parentComment, post.comments.indexOf(parentComment))}
                                                                    {replies.map((reply, rIdx) => renderCommentObj(reply, post.comments.indexOf(reply), true))}
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </main>

                {/* ── RIGHT SIDEBAR ──────────────────────────────────── */}
                <aside className="hidden xl:flex w-72 flex-col h-full border-l border-slate-200 bg-white overflow-y-auto shrink-0 p-5 gap-6">

                    {/* Trending */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-rose-500 text-[20px]">local_fire_department</span>
                            <h3 className="font-extrabold text-slate-900 text-sm">Algorithmic Trending</h3>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium mb-3 pb-3 border-b border-slate-200 uppercase tracking-wide">
                            TF-IDF scan · last 24hrs
                        </p>
                        <div className="flex flex-col divide-y divide-slate-100">
                            {trendingTopics.map((t, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedFilter(t.label)}
                                    className="py-2.5 text-left hover:bg-slate-100 rounded-lg -mx-1 px-1 transition-colors group"
                                >
                                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">{t.label}</p>
                                    <p className="text-sm font-bold text-slate-800 leading-snug line-clamp-1 group-hover:text-indigo-700 transition-colors">{t.topic}</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">{t.activityCount} mentions</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="text-[10px] text-slate-300 text-center font-medium">© 2024 EAOverseas Community v2</p>
                </aside>
            </div>

            {/* Share Modal */}
            {shareData && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    title="Share Discussion"
                    shareUrl={`${window.location.origin}/community-feed?post=${shareData._id}`}
                    preview={{
                        title: shareData.title,
                        subtitle: "EAOverseas Community",
                        image: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
                    }}
                />
            )}

            {/* AI Safety Violation Modal */}
            {safetyViolation?.active && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-rose-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                        <div className="size-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 relative">
                            <span className="material-symbols-outlined text-rose-500 text-[40px] animate-pulse">report</span>
                            <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 animate-ping" />
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 mb-2">Content Flagged by AI</h2>
                        <p className="text-sm text-slate-500 leading-relaxed mb-8">
                            Our AI moderation system detected unsafe or abusive content. To protect the community, your draft will be deleted in:
                        </p>

                        <div className="size-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-3xl font-black mb-8 shadow-xl shadow-rose-900/10">
                            {safetyViolation.countdown}
                        </div>

                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div
                                className="h-full bg-rose-500 transition-all duration-1000 ease-linear"
                                style={{ width: `${(safetyViolation.countdown / 5) * 100}%` }}
                            />
                        </div>
                        <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Auto-Deleting Community Post</p>
                    </div>
                </div>
            )}

            {/* Floating Chat Window → Inline Right Panel */}
            {activeChat && (
                <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)]" style={{ width: chatWidth, height: 'calc(100vh - 6rem)' }}>
                    <div className="h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                        <ChatWindow
                            conversationId={activeChat.conversationId}
                            currentUserId={user?.uid || ''}
                            partnerName={activeChat.partnerName}
                            partnerAvatar={activeChat.partnerAvatar}
                            onClose={() => setActiveChat(null)}
                            socket={socketRef}
                            width={chatWidth}
                            onResize={handleChatResize}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunityFeed;
