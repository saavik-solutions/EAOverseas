import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import PageHeader from '@/components/layout/PageHeader';
import { feedService, PostResponse } from '@/features/feed/services/feedService';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';
import LoginModal from '@/features/auth/components/LoginModal';
import ShareModal from '@/components/feedback/ShareModal';

const Feed = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // State for Filter Bar
    const [activeCountry, setActiveCountry] = useState('All Countries');
    const { user, requireAuth, isLoginModalOpen, setLoginModalOpen } = useAuth();
    const { togglePost, isPostSaved } = useSavedItems();
    const [activeTopic, setActiveTopic] = useState('All Topics');
    const [sortBy, setSortBy] = useState('Newest');

    // Share Modal State
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState<PostResponse | null>(null);

    const countries = ['All Countries', 'USA', 'UK', 'Canada', 'Germany', 'Australia', 'Europe', 'Global'];
    const topics = ['All Topics', 'Admissions', 'Scholarships', 'Visas', 'Accomodation', 'Career Advice', 'Routine'];

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await feedService.getAll({ search: debouncedSearch });
            setPosts(data);
            setError(null);
        } catch (err: any) {
            console.error('Failed to fetch posts:', err);
            setError('Failed to load feed. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Helper to get country from location string
    const getCountryFromLocation = (location?: string) => {
        if (!location) return 'Global';
        const loc = location.toUpperCase();
        if (loc.includes('USA') || loc.includes('US')) return 'USA';
        if (loc.includes('UK') || loc.includes('UNITED KINGDOM') || loc.includes('LONDON')) return 'UK';
        if (loc.includes('CANADA') || loc.includes('TORONTO')) return 'Canada';
        if (loc.includes('GERMANY') || loc.includes('BERLIN') || loc.includes('MUNICH')) return 'Germany';
        if (loc.includes('AUSTRALIA') || loc.includes('MELBOURNE') || loc.includes('SYDNEY')) return 'Australia';
        if (loc.includes('SWITZERLAND') || loc.includes('EUROPE')) return 'Europe';
        return 'Global';
    };

    const handleLike = async (id: string) => {
        requireAuth(async () => {
            try {
                await feedService.toggleLike(id);
                // Optimistic UI or Fetch
                const data = await feedService.getAll();
                setPosts(data);
            } catch (err) {
                console.error(err);
            }
        });
    };


    const filteredPosts = posts.filter(post => {
        // 1. Filter by Country
        const postCountry = getCountryFromLocation(post.metadata?.location);
        const matchesCountry = activeCountry === 'All Countries' || postCountry === activeCountry || (activeCountry === 'Europe' && (post.tags || []).includes('Europe'));

        // 2. Filter by Topic (Pills)
        let matchesTopic = true;
        if (activeTopic !== 'All Topics') {
            const label = post.category.toLowerCase();
            if (activeTopic === 'Admissions') matchesTopic = label.includes('admission');
            else if (activeTopic === 'Scholarships') matchesTopic = label.includes('scholarship');
            else if (activeTopic === 'Visas') matchesTopic = label.includes('visa');
            else if (activeTopic === 'Accomodation') matchesTopic = label.includes('accomodation');
            else if (activeTopic === 'Career Advice') matchesTopic = label.includes('career');
            else if (activeTopic === 'Routine') matchesTopic = label.includes('routine');
            else matchesTopic = (post.tags || []).some(tag => tag.toLowerCase().includes(activeTopic.toLowerCase()));
        }

        return matchesCountry && matchesTopic;
    }).sort((a, b) => {
        if (sortBy === 'Most Saved') {
            const savedA = a.bookmarkCount ?? a.likeCount ?? 0;
            const savedB = b.bookmarkCount ?? b.likeCount ?? 0;
            return savedB - savedA;
        }
        
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
    });

    const openShareModal = (post: PostResponse) => {
        setShareData(post);
        setIsShareModalOpen(true);
    };

    const handleSave = (post: any) => {
        requireAuth(() => {
            togglePost(post);
        });
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveCountry(e.target.value);
    };

    const handleTopicChange = (topic: string) => {
        setActiveTopic(activeTopic === topic ? 'All Topics' : topic);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    const resetFilters = () => {
        setActiveCountry('All Countries');
        setActiveTopic('All Topics');
        setSortBy('Newest');
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-[#f8f9fc] overflow-hidden">
            {/* Header */}
            <div className="hidden lg:block">
                <PageHeader
                    title="Global Feed"
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

            <main className="flex-1 overflow-y-auto bg-gray-50 font-sans">
                <div className="p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 max-w-7xl mx-auto">

                    <div className="flex flex-col gap-6">

                        {/* Enhanced Filter Bar - Slider Style */}
                        <div className="flex flex-col gap-4">

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-500">Sort:</span>
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={handleSortChange}
                                            className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                        >
                                            <option value="Newest">Newest</option>
                                            <option value="Most Saved">Most Saved</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 !text-[18px] text-gray-500 pointer-events-none">sort</span>
                                    </div>

                                    {/* Region Dropdown */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-gray-500">Region:</span>
                                        <div className="relative">
                                            <select
                                                value={activeCountry}
                                                onChange={handleCountryChange}
                                                className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                            >
                                                {countries.map(c => (
                                                    <option key={c} value={c}>{c === 'All Countries' ? 'All Locations' : c}</option>
                                                ))}
                                            </select>
                                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 !text-[18px] text-gray-500 pointer-events-none">expand_more</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={resetFilters}
                                        className="text-xs font-medium text-blue-600 hover:underline px-2"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>

                            {/* Horizontal Filters Container */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">Topic</span>
                                    {topics.map((topic) => (
                                        <button
                                            key={topic}
                                            onClick={() => handleTopicChange(topic)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${activeTopic === topic
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                                }`}
                                        >
                                            {topic === 'All Topics' ? 'All Topics' : topic}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Feed Posts */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            {loading ? (
                                <div className="flex flex-col gap-6">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                                <div className="flex flex-col gap-2">
                                                    <div className="h-2 w-20 bg-gray-200 rounded" />
                                                    <div className="h-3 w-32 bg-gray-200 rounded" />
                                                </div>
                                            </div>
                                            <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                                            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                                            <div className="h-4 w-1/2 bg-gray-200 rounded" />
                                        </div>
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="text-center py-20 bg-white rounded-xl border border-red-100">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
                                        <span className="material-symbols-outlined text-red-400 !text-[32px]">error</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{error}</h3>
                                    <button onClick={fetchPosts} className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                        Try Again
                                    </button>
                                </div>
                            ) : filteredPosts.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                        <span className="material-symbols-outlined text-gray-400 !text-[32px]">filter_list_off</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">No posts match your filters</h3>
                                    <p className="text-gray-500 mt-2 mb-6">Try adjusting your country or topic filters.</p>
                                    <button onClick={resetFilters} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                        Clear All Filters
                                    </button>
                                </div>
                            ) : (
                                filteredPosts.map((post) => {
                                    const instName = post.university?.name || post.metadata?.universityName || 'EAOverseas';
                                    const instLogo = post.university?.logoUrl || post.metadata?.universityLogo || '/logo.png';
                                    const instLocation = post.metadata?.location || post.university?.country || 'Global';
                                    const universitySlug = post.university?.slug || encodeURIComponent(instName);
                                    
                                    const isLiked = post.userInteractions?.includes('like');

                                    return (
                                        <article
                                            key={post.id}
                                            onClick={() => navigate(`/feed-details/${post.slug}`) }
                                            className="flex flex-col bg-white border border-gray-200 rounded-xl p-3 md:p-5 hover:border-blue-200 hover:shadow-sm transition-all group cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div onClick={(e) => { e.stopPropagation(); navigate(`/institution/${universitySlug}`); }} className="group/inst flex items-center gap-3 cursor-pointer">
                                                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100 relative shrink-0 group-hover/inst:border-blue-200 transition-colors">
                                                            <img className="w-full h-full object-contain p-0.5" alt={`${instName} Logo`} src={instLogo} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">{instLocation}</span>
                                                            <span className="text-[11px] md:text-sm font-bold text-gray-900 group-hover/inst:text-blue-600 transition-colors hover:underline">{instName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`px-1.5 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-xs font-semibold border bg-blue-50 text-blue-700 border-blue-100 uppercase`}>
                                                    {post.category}
                                                </span>
                                            </div>
                                            <div className="mb-4">
                                                {post.coverImageUrl && (
                                                    <img src={post.coverImageUrl} className="w-full h-36 md:h-64 object-cover rounded-xl mb-3 md:mb-4 border border-gray-100" />
                                                )}
                                                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>

                                                {/* Grid Details from Metadata */}
                                                {(post.metadata?.tuitionFee || post.metadata?.programDuration) && (
                                                    <div className="flex flex-wrap gap-y-2 gap-x-3 md:gap-x-6 text-[11px] md:text-sm text-gray-600 mb-4 bg-gray-50 p-2 md:p-3 rounded-lg border border-gray-100">
                                                        {post.metadata.tuitionFee && (
                                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                                <span className="font-medium text-slate-500">Tuition:</span>
                                                                <span className="font-semibold text-slate-900">{post.metadata.tuitionFee}</span>
                                                            </div>
                                                        )}
                                                        {post.metadata.programDuration && (
                                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                                <span className="font-medium text-slate-500">Duration:</span>
                                                                <span className="font-semibold text-slate-900">{post.metadata.programDuration}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="text-[11px] md:text-sm text-gray-600 leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {post.tags && post.tags.map((tag, idx) => (
                                                    <span key={idx} className="px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-gray-100 text-gray-600 text-[10px] md:text-xs font-medium border border-gray-200">{tag}</span>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                                                            className={`p-1 flex items-center gap-1.5 text-[11px] md:text-xs font-bold transition-all ${isLiked ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                                                            title={isLiked ? "Unlike" : "Like"}
                                                        >
                                                            <span className={`material-symbols-outlined text-[18px] md:text-[20px] ${isLiked ? '!fill-current' : ''}`}>thumb_up</span>
                                                            <span>{post.likeCount || 0}</span>
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleSave(post); }}
                                                            className={`p-1.5 md:p-2 rounded-lg transition-colors ${isPostSaved(post) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                                                            title={isPostSaved(post) ? "Unsave" : "Save"}
                                                        >
                                                            <span className={`material-symbols-outlined text-[18px] md:text-[22px] ${isPostSaved(post) ? '!fill-current' : ''}`}>
                                                                {isPostSaved(post) ? 'bookmark' : 'bookmark_border'}
                                                            </span>
                                                        </button>
                                                        <button onClick={(e) => { e.stopPropagation(); openShareModal(post); }} className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Share">
                                                            <span className="material-symbols-outlined text-[18px] md:text-[22px]">share</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); navigate(`/feed-details/${post.slug}`); }}
                                                    className="hidden md:block px-4 py-1.5 md:px-6 md:py-2 bg-blue-600 border border-transparent text-white text-xs md:text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })
                            )}
                        </div>

                    </div>

                    {/* Right Column: Widgets */}
                    <div className="flex flex-col gap-6">
                        {/* Search Widget */}
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
                            <input
                                type="text"
                                placeholder="Search updates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>

                        {/* Trending Topics */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 text-blue-600">
                                <span className="material-symbols-outlined text-[20px]">trending_up</span>
                                <h3 className="font-bold text-gray-900 text-sm">Trending Topics</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['#Fall2026', '#NoIELTS', '#GermanyScholarships', '#FullyFunded', '#MBA', '#STEM'].map(tag => (
                                    <button 
                                        key={tag} 
                                        onClick={() => setSearchQuery(tag)}
                                        className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-600 text-xs font-medium rounded-lg border border-gray-100 transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Deadline Alerts */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-orange-600">
                                    <span className="material-symbols-outlined text-[20px]">warning</span>
                                    <h3 className="font-bold text-gray-900 text-sm">Deadline Alerts</h3>
                                </div>
                                <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
                            </div>
                            <div className="flex flex-col gap-4">
                                {posts.filter(p => ['scholarships', 'admissions', 'exams'].includes(p.category.toLowerCase())).slice(0, 3).map(post => (
                                    <div key={post.id} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0 cursor-pointer" onClick={() => navigate(`/feed-details/${post.slug}`)}>
                                        <h4 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h4>
                                        <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                                            {post.metadata?.deadline ? `Closes ${post.metadata.deadline}` : 'Action Required Soon'}
                                        </p>
                                    </div>
                                ))}
                                {posts.filter(p => ['scholarships', 'admissions', 'exams'].includes(p.category.toLowerCase())).length === 0 && (
                                    <p className="text-xs text-gray-500">No immediate deadlines.</p>
                                )}
                            </div>
                        </div>

                        {/* Quick Tip Widget */}
                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 mb-2 text-blue-700">
                                <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                                <h3 className="font-bold text-sm">Quick Tip</h3>
                            </div>
                            <p className="text-xs text-blue-800 leading-relaxed">
                                Early applicants have a 40% higher chance of securing scholarships. Don't wait for the deadline!
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Share Modal */}
            {shareData && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    title="Share Opportunity"
                    shareUrl={`https://eaoverseas.com/feed-details/${shareData.slug}`}
                    preview={{
                        title: shareData.title,
                        subtitle: shareData.university?.name || shareData.metadata?.universityName || 'EAOverseas',
                        image: shareData.coverImageUrl || ''
                    }}
                />
            )}

            {/* Login Modal */}
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setLoginModalOpen(false)} 
            />
        </div>
    );
};

export default Feed;
