import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuthAction } from '../hooks/useAuthAction';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import ShareModal from '../components/ShareModal';
import { communityService, type CommunityPost as ApiPost } from '../services/communityService';

const CommunityFeed = () => {
    // State for interactive elements
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState(null);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [visibleComments, setVisibleComments] = useState<Record<string, boolean>>({});
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostDescription, setNewPostDescription] = useState('');
    const [selectedPostForModal, setSelectedPostForModal] = useState<any>(null);
    const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
    const [selectedFilter, setSelectedFilter] = useState('All Topics');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCommentCounts, setVisibleCommentCounts] = useState<Record<string, number>>({});
    const [posts, setPosts] = useState<any[]>([]);
    const [comments, setComments] = useState<Record<string, any[]>>({}); // postId -> comments[]
    const [isLoading, setIsLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);

    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { user } = useAuth();
    const navigate = useNavigate();

    // ─── Fetch feed from API ─────────────────────────────────────────────────────
    const fetchFeed = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await communityService.getFeed({
                category: selectedFilter !== 'All Topics' ? selectedFilter : undefined,
                search: searchQuery || undefined,
            });
            // Map API shape to the UI shape the JSX expects
            setPosts(data.map((p) => ({
                id: p.id,
                author: p.author.fullName,
                avatar: p.author.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(p.author.fullName)}`,
                time: new Date(p.createdAt).toLocaleDateString(),
                title: p.title,
                content: p.content || '',
                tags: p.tags,
                category: p.category,
                votes: p.voteScore,
                userVote: p.userVote === 'up' ? 1 : p.userVote === 'down' ? -1 : 0,
                commentsCount: p.commentCount,
                isExpert: p.author.role === 'counsellor',
                comments: [], // loaded on demand
                _apiId: p.id, // keep original UUID
                authorId: p.author.id, // added for delete logic
            })));
        } catch (err) {
            console.error('Failed to load community feed:', err);
        } finally {
            setIsLoading(false);
        }
    }, [selectedFilter, searchQuery]);

    useEffect(() => {
        fetchFeed();
    }, [fetchFeed]);

    // ─── Handlers ──────────────────────────────────────────────────────────────

    const openShareModal = (post) => {
        executeAction(() => {
            setShareData(post);
            setIsShareModalOpen(true);
        });
    };

    const toggleComments = async (postId) => {
        const isVisible = !!visibleComments[postId];
        if (isVisible) {
            setVisibleCommentCounts(curr => ({ ...curr, [postId]: 3 }));
        } else if (!comments[postId]) {
            // Load comments from API on first open
            try {
                const data = await communityService.getComments(postId);
                setComments(prev => ({ ...prev, [postId]: data.map(c => ({
                    id: c.id,
                    author: c.author.fullName,
                    avatar: c.author.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.author.fullName)}`,
                    text: c.text,
                    time: new Date(c.createdAt).toLocaleDateString(),
                    upvotes: c.voteScore,
                    userVote: c.userVote === 'up' ? 1 : c.userVote === 'down' ? -1 : 0,
                    isBest: c.isBest,
                })) }));
            } catch (err) {
                console.error('Failed to load comments:', err);
            }
        }
        setVisibleComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const loadMoreComments = (postId) => {
        setVisibleCommentCounts(prev => ({
            ...prev,
            [postId]: (prev[postId] || 3) + 3
        }));
    };

    const handleCommentVote = async (postId, commentIdx, direction) => {
        executeAction(async () => {
            const postComments = comments[postId] || [];
            const comment = postComments[commentIdx];
            if (!comment?.id) return;

            try {
                const result = await communityService.voteComment(comment.id, direction);
                setComments(prev => {
                    const updated = [...(prev[postId] || [])];
                    const currentVote = updated[commentIdx].userVote || 0;
                    const newVote = result.action === 'removed' ? 0 : direction === 'up' ? 1 : -1;
                    let voteChange = newVote - currentVote;
                    updated[commentIdx] = { ...updated[commentIdx], upvotes: (updated[commentIdx].upvotes || 0) + voteChange, userVote: newVote };
                    return { ...prev, [postId]: updated };
                });
            } catch (err) {
                console.error('Vote failed:', err);
            }
        });
    };

    const handlePostSubmit = async () => {
        executeAction(async () => {
            if (!newPostTitle.trim() || isPosting) return;
            setIsPosting(true);
            try {
                const newPost = await communityService.createPost({
                    title: newPostTitle,
                    content: newPostDescription,
                    category: selectedFilter !== 'All Topics'
                        ? selectedFilter.toLowerCase().replace(/ /g, '_')
                        : 'general',
                    tags: [],
                    isQuestion: newPostTitle.endsWith('?'),
                });
                setPosts(prev => [{
                    id: newPost.id,
                    _apiId: newPost.id,
                    author: newPost.author.fullName,
                    avatar: newPost.author.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newPost.author.fullName)}`,
                    time: 'Just now',
                    title: newPost.title,
                    content: newPost.content || '',
                    tags: newPost.tags,
                    category: newPost.category,
                    votes: 0,
                    userVote: 0,
                    commentsCount: 0,
                    isExpert: false,
                    comments: [],
                    authorId: newPost.author.id,
                }, ...prev]);
                setNewPostTitle('');
                setNewPostDescription('');
            } catch (err) {
                console.error('Post failed:', err);
            } finally {
                setIsPosting(false);
            }
        });
    };

    const handleDeletePost = async (postId) => {
        try {
            await communityService.deletePost(postId);
            setPosts(prev => prev.filter(p => p.id !== postId));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const handleVote = async (postId, direction) => {
        executeAction(async () => {
            try {
                const result = await communityService.votePost(postId, direction);
                setPosts(prev => prev.map(p => {
                    if (p.id !== postId) return p;
                    const currentVote = p.userVote || 0;
                    const newVote = result.action === 'removed' ? 0 : direction === 'up' ? 1 : -1;
                    const voteChange = newVote - currentVote;
                    return { ...p, votes: p.votes + voteChange, userVote: newVote };
                }));
            } catch (err) {
                console.error('Vote failed:', err);
            }
        });
    };

    const handleCommentChange = (postId, text) => {
        setCommentInputs(prev => ({ ...prev, [postId]: text }));
    };

    const handleCommentSubmit = async (postId) => {
        const text = commentInputs[postId];
        if (!text || !text.trim()) return;

        executeAction(async () => {
            try {
                const newComment = await communityService.addComment({ postId, text });
                const mappedComment = {
                    id: newComment.id,
                    author: newComment.author.fullName,
                    avatar: newComment.author.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newComment.author.fullName)}`,
                    text: newComment.text,
                    time: 'Just now',
                    upvotes: 0,
                    userVote: 0,
                };
                setComments(prev => ({
                    ...prev,
                    [postId]: [mappedComment, ...(prev[postId] || [])],
                }));
                setPosts(prev => prev.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p));
                setCommentInputs(prev => ({ ...prev, [postId]: '' }));
                setVisibleCommentCounts(prev => ({ ...prev, [postId]: (prev[postId] || 3) + 1 }));
            } catch (err) {
                console.error('Comment failed:', err);
            }
        });
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <div className="hidden lg:block">
                <PageHeader
                    title="Community Feed"
                    actions={
                        !user ? (
                            <button
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm hidden lg:block"
                                onClick={() => navigate('/landing')}
                            >
                                Enter Website
                            </button>
                        ) : null
                    }
                />
            </div>
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 relative">
                    <div className="bg-white border-b border-gray-200 px-6 py-3 z-20 sticky top-0">
                        <div className="max-w-3xl mx-auto relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input
                                className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 border-none outline-none text-sm placeholder:text-gray-500 focus:bg-white focus:ring-1 focus:ring-blue-200 focus:shadow-sm transition-all font-medium"
                                placeholder="Search for questions, universities, or topics..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scroll-smooth p-6">
                        <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-20">
                            
                            {/* Dual-Field Composer */}
                            <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                                <div className="flex gap-4">
                                    <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                        <span className="material-symbols-outlined text-blue-600">rate_review</span>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-3">
                                        <input
                                            className="w-full text-lg font-bold placeholder:text-gray-400 bg-transparent border-none outline-none"
                                            placeholder="What's the title of your post?"
                                            type="text"
                                            value={newPostTitle}
                                            onChange={(e) => setNewPostTitle(e.target.value)}
                                        />
                                        <textarea
                                            className="w-full text-sm text-gray-600 placeholder:text-gray-400 bg-transparent border-none outline-none resize-none min-h-[80px]"
                                            placeholder="Describe your question or share some details..."
                                            value={newPostDescription}
                                            onChange={(e) => setNewPostDescription(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-50">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                        <span className="material-symbols-outlined !text-[16px]">info</span>
                                        Be helpful and respect the community
                                    </div>
                                    <button
                                        onClick={handlePostSubmit}
                                        className={`px-6 py-2 rounded-full transition-all flex items-center justify-center text-sm font-bold ${newPostTitle.trim() ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                        disabled={!newPostTitle.trim()}
                                    >
                                        Post Discussion
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                                <button
                                    onClick={() => executeAction(() => setSelectedFilter('All Topics'))}
                                    className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${selectedFilter === 'All Topics' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
                                >
                                    All Topics
                                </button>
                                {['Admissions', 'Scholarships', 'Visas', 'Accommodation', 'Career Advice', 'Routine'].map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => executeAction(() => setSelectedFilter(filter))}
                                        className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedFilter === filter ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                {isLoading ? (
                                    <div className="flex flex-col gap-4">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 animate-pulse">
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : posts.length === 0 ? (
                                    <div className="text-center py-16 text-gray-400">
                                        <span className="material-symbols-outlined text-5xl block mb-3">forum</span>
                                        <p className="font-semibold text-lg">No posts yet</p>
                                        <p className="text-sm">Be the first to start a discussion!</p>
                                    </div>
                                ) : (
                                    posts.map(post => (
                                        <article
                                            key={post.id}
                                            className="bg-white rounded-xl border border-gray-200 shadow-sm transition-all group flex overflow-hidden w-full text-left"
                                        >
                                            {/* Voting Column */}
                                            <div className="w-12 bg-gray-50 flex flex-col items-center py-4 gap-1 shrink-0 border-r border-gray-100">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleVote(post.id, 'up'); }}
                                                    className={`hover:bg-blue-50 rounded-lg p-1.5 transition-all ${post.userVote === 1 ? 'text-blue-600' : 'text-gray-400'}`}
                                                >
                                                    <span className="material-symbols-outlined text-[24px]">expand_less</span>
                                                </button>
                                                <span className={`text-sm font-bold ${post.votes > 0 ? 'text-blue-600' : post.votes < 0 ? 'text-red-500' : 'text-gray-600'}`}>
                                                    {post.votes}
                                                </span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleVote(post.id, 'down'); }}
                                                    className={`hover:bg-red-50 rounded-lg p-1.5 transition-all ${post.userVote === -1 ? 'text-red-600' : 'text-gray-400'}`}
                                                >
                                                    <span className="material-symbols-outlined text-[24px]">expand_more</span>
                                                </button>
                                            </div>

                                            <div className="flex-1 p-4 min-w-0">
                                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 flex-wrap">
                                                    <div className="size-6 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${post.avatar}")` }}></div>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); executeAction(() => navigate(`/profile/${post.author}`)); }}
                                                        className="font-medium text-gray-900 hover:underline hover:text-blue-600 transition-colors"
                                                    >
                                                        {post.author}
                                                    </button>
                                                    {post.isExpert && (
                                                        <span className="flex items-center gap-1 text-[10px] font-bold text-orange-700">
                                                            <span className="material-symbols-outlined !text-[14px]">star</span> Expert
                                                        </span>
                                                    )}
                                                    <span className="whitespace-nowrap">• {post.time}</span>
                                                </div>

                                                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight break-words">
                                                    {post.title}
                                                </h3>

                                                {post.content && (
                                                    <div className="relative">
                                                        <p className="text-sm text-gray-600 leading-relaxed mb-3 break-words line-clamp-3 whitespace-pre-wrap">
                                                            {post.content}
                                                        </p>
                                                        {post.content.length > 200 && (
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); setSelectedPostForModal(post); }}
                                                                className="text-blue-600 text-xs font-bold hover:underline mb-3 block"
                                                            >
                                                                View More
                                                            </button>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-3">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">{post.category}</span>
                                                        {post.tags.map(tag => (
                                                            <span key={tag} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium">#{tag}</span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-gray-500 text-xs font-medium">
                                                        <button onClick={(e) => { e.stopPropagation(); toggleComments(post.id); }} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">mode_comment</span>
                                                            <span>{post.commentsCount}</span>
                                                        </button>
                                                        <button onClick={(e) => { e.stopPropagation(); openShareModal(post); }} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">share</span>
                                                        </button>
                                                        {user && post.authorId === user.id && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleDeletePost(post.id); }}
                                                                className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {visibleComments[post.id] && (
                                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                                        <div className="flex gap-3 mb-4">
                                                            <div className="size-8 rounded-full bg-gray-100 bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${user?.avatarUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=Guest'}")` }}></div>
                                                            <div className="flex-1 flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Add a comment..."
                                                                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary transition-all"
                                                                    value={commentInputs[post.id] || ''}
                                                                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                                                    onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                                                                />
                                                                <button
                                                                    onClick={() => handleCommentSubmit(post.id)}
                                                                    disabled={!commentInputs[post.id]?.trim()}
                                                                    className="px-4 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                                                >
                                                                    Post
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-4">
                                                            {(comments[post.id] || []).slice(0, visibleCommentCounts[post.id] || 3).map((comment, idx) => (
                                                                <div key={idx} className="flex gap-3">
                                                                    <div className="size-7 rounded-full bg-gray-100 bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${comment.avatar}")` }}></div>
                                                                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                                                        <div className="flex justify-between items-start mb-1">
                                                                            <p className="text-xs font-bold text-gray-900">{comment.author}</p>
                                                                            <span className="text-[10px] text-gray-400">{comment.time}</span>
                                                                        </div>
                                                                        <p className="text-xs text-gray-700 leading-relaxed">{comment.text}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {(comments[post.id] || []).length > (visibleCommentCounts[post.id] || 3) && (
                                                                <button
                                                                    onClick={() => loadMoreComments(post.id)}
                                                                    className="text-blue-600 text-xs font-bold p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                                >
                                                                    View more comments
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <aside className="hidden xl:flex w-80 flex-col h-full border-l border-gray-200 bg-white overflow-y-auto shrink-0 p-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                        <div className="p-4 bg-blue-600 text-white font-bold text-lg">Trending Today</div>
                        <div className="flex flex-col divide-y divide-gray-100">
                            {[
                                { topic: 'Visas', title: 'F-1 Visa Slot Availability Update', posts: '204 posts' },
                                { topic: 'Destinations', title: 'Best Student Cities in Europe 2024', posts: '89 posts' },
                                { topic: 'Finance', title: 'Forex Card vs Bank Transfer?', posts: '15 posts' }
                            ].map((item, idx) => (
                                <button key={idx} className="p-4 hover:bg-gray-50 text-left transition-colors">
                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">{item.topic}</p>
                                    <p className="text-sm font-bold text-gray-900 mb-1">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.posts}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-xs text-gray-400 flex flex-wrap gap-2 px-2 mt-auto pb-4">
                        <a className="hover:underline" href="#">About</a>
                        <span>•</span>
                        <a className="hover:underline" href="#">Privacy</a>
                        <span>•</span>
                        <a className="hover:underline" href="#">Terms</a>
                        <span>•</span>
                        <span>© 2024 EAOverseas</span>
                    </div>
                </aside>
            </div>

            {/* Share Modal */}
            {shareData && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    title="Share Discussion"
                    shareUrl={`https://eaoverseas.com/community/discussion-${shareData.id}`}
                    preview={{
                        title: shareData.title,
                        subtitle: "EAOverseas Community",
                        icon: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
                    }}
                />
            )}

            {/* Description Modal for "View More" */}
            {selectedPostForModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedPostForModal(null)}>
                    <div 
                        className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-cover bg-center border border-gray-100" style={{ backgroundImage: `url("${selectedPostForModal.avatar}")` }}></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{selectedPostForModal.author}</p>
                                    <p className="text-xs text-gray-500">{selectedPostForModal.time}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedPostForModal(null)}
                                className="size-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
                                aria-label="Close modal"
                            >
                                <span className="material-symbols-outlined !text-[20px]">close</span>
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto bg-white">
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                                {selectedPostForModal.title}
                            </h2>
                            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                                {selectedPostForModal.content}
                            </div>
                            
                            <div className="mt-10 flex flex-wrap gap-2 pt-6 border-t border-gray-50">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">{selectedPostForModal.category}</span>
                                {selectedPostForModal.tags?.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-xs font-medium">#{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0">
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(selectedPostForModal.content);
                                    // Could add a toast here
                                }}
                                className="px-4 py-2 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined !text-[18px]">content_copy</span> Copy Text
                            </button>
                            <button 
                                onClick={() => setSelectedPostForModal(null)}
                                className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunityFeed;
