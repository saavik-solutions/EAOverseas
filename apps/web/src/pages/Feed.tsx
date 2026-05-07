import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import PageHeader from '@/components/layout/PageHeader';
import { useAuthAction } from '@/shared/hooks/useAuthAction';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useSavedItems } from '@/shared/contexts/SavedItemsContext';
import { usePosts, Post } from '@/shared/contexts/PostsContext';
import LoginModal from '@/features/auth/LoginModal';
import ShareModal from '@/features/shared-modals/ShareModal';

const Feed = () => {
    const { posts } = usePosts();
    const navigate = useNavigate();
    // State for Filter Bar
    const [activeCountry, setActiveCountry] = useState('All Countries');
    const { user, requireAuth, setLoginModalOpen } = useAuth();
    const { togglePost, isPostSaved } = useSavedItems();
    const [activeTopic, setActiveTopic] = useState('All Topics');
    const [sortBy, setSortBy] = useState('Newest');

    // Share Modal State
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState(null);

    const countries = ['All Countries', 'USA', 'UK', 'Canada', 'Germany', 'Australia', 'Europe', 'Global'];
    const topics = ['All Topics', 'Admissions', 'Policy Update', 'Scholarship', 'Event & Webinar'];

    // Helper to get country from location string
    const getCountryFromLocation = (location: string) => {
        if (!location) return 'Global';
        const loc = location.toUpperCase();
        if (loc.includes('USA') || loc.includes('US') || loc.includes('UNITED STATES') || loc.includes('HARVARD') || loc.includes('STANFORD') || loc.includes('MIT') || loc.includes('COLUMBIA') || loc.includes('NEW YORK')) return 'USA';
        if (loc.includes('UK') || loc.includes('UNITED KINGDOM') || loc.includes('LONDON') || loc.includes('OXFORD') || loc.includes('CAMBRIDGE') || loc.includes('MANCHESTER')) return 'UK';
        if (loc.includes('CANADA') || loc.includes('TORONTO') || loc.includes('VANCOUVER') || loc.includes('MCGILL')) return 'Canada';
        if (loc.includes('GERMANY') || loc.includes('BERLIN') || loc.includes('MUNICH') || loc.includes('TUM ')) return 'Germany';
        if (loc.includes('AUSTRALIA') || loc.includes('MELBOURNE') || loc.includes('SYDNEY') || loc.includes('UNSW')) return 'Australia';
        if (loc.includes('SWITZERLAND') || loc.includes('EUROPE') || loc.includes('ETH')) return 'Europe';
        return 'Global';
    };

    const filteredPosts = posts.filter(post => {
        // 1. Filter by Country
        const postCountry = getCountryFromLocation(post.location);
        const matchesCountry = activeCountry === 'All Countries' || postCountry === activeCountry || (activeCountry === 'Europe' && post.tags.includes('#Europe'));

        // 2. Filter by Topic (Pills)
        let matchesTopic = true;
        if (activeTopic !== 'All Topics') {
            const lTopic = activeTopic.toLowerCase().replace(/s$/, ''); // singularize
            const postLabel = post.label.toLowerCase().replace(/s$/, '');
            const postTags = (post.tags || []).map(t => t.toLowerCase().replace(/s$/, ''));

            if (activeTopic === 'Admissions') matchesTopic = postLabel.includes('admission');
            else if (activeTopic === 'Scholarship') matchesTopic = postLabel.includes('scholarship');
            else if (activeTopic === 'Policy Update') matchesTopic = postLabel.includes('policy');
            else if (activeTopic === 'Event & Webinar') matchesTopic = postLabel.includes('event') || postLabel.includes('webinar');
            else matchesTopic = postTags.some(tag => tag.includes(lTopic) || lTopic.includes(tag));
        }

        // 3. Filter by Status (Only show published)
        const matchesStatus = !post.status || post.status === 'Published';

        return matchesCountry && matchesTopic && matchesStatus;
    }).sort((a, b) => {
        // Try to sort by ID descending (since our IDs are currently Date.now() for new posts)
        // Mock posts like 'daad' will sort lower than numeric timestamps
        const idA = isNaN(Number(a.id)) ? 0 : Number(a.id);
        const idB = isNaN(Number(b.id)) ? 0 : Number(b.id);

        if (idA !== idB) return idB - idA;
        return 0; // Default order
    });


    const openShareModal = (postId: string | number) => {
        requireAuth(() => {
            const post = posts.find(p => p.id.toString() === postId.toString());
            setShareData(post || null);
            setIsShareModalOpen(true);
        });
    };

    const handleSave = (post: Post) => {
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
                                            <option>Newest</option>
                                            <option>Most Saved</option>
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
                                {/* Country Slider */}
                                {/* Country Filter Removed (Moved to top) */}

                                {/* Topic Slider */}

                                {/* Topic Slider */}
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
                            {filteredPosts.length === 0 ? (
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
                                filteredPosts.map((post) => (
                                    <article
                                        key={post.id}
                                        onClick={() => requireAuth(() => navigate(`/feed-details/${post.id}`))}
                                        className="flex flex-col bg-white border border-gray-200 rounded-xl p-3 md:p-5 hover:border-blue-200 hover:shadow-sm transition-all group cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div onClick={(e) => { e.stopPropagation(); requireAuth(() => navigate(`/institution/${encodeURIComponent(post.institution)}`)); }} className="group/inst flex items-center gap-3 cursor-pointer">
                                                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100 relative shrink-0 group-hover/inst:border-blue-200 transition-colors">
                                                        <img className="w-full h-full object-contain p-0.5" alt={`${post.institution} Logo`} src={post.logo} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">{post.location}</span>
                                                        <span className="text-[11px] md:text-sm font-bold text-gray-900 group-hover/inst:text-blue-600 transition-colors hover:underline">{post.institution}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className={`px-1.5 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-xs font-semibold border ${post.labelColor || 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                                {post.label}
                                            </span>
                                        </div>
                                        <div className="mb-4">
                                            <img src={post.banner} className="w-full h-36 md:h-64 object-cover rounded-xl mb-3 md:mb-4 border border-gray-100" />
                                            <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>

                                            {/* Grid Details */}
                                            <div className="flex flex-wrap gap-y-2 gap-x-3 md:gap-x-6 text-[11px] md:text-sm text-gray-600 mb-4 bg-gray-50 p-2 md:p-3 rounded-lg border border-gray-100">
                                                {post.grid && post.grid.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-1.5 md:gap-2">
                                                        {item.alert && <span className="material-symbols-outlined text-[14px] md:text-[16px] text-orange-600">schedule</span>}
                                                        <span className={`font-medium ${item.alert ? 'text-orange-600' : ''}`}>
                                                            {item.alert ? `${item.label}: ${item.value}` : item.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="text-[11px] md:text-sm text-gray-600 leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: post.about }}></div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {post.tags && post.tags.map((tag, idx) => (
                                                <span key={idx} className="px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-gray-100 text-gray-600 text-[10px] md:text-xs font-medium border border-gray-200">{tag}</span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); requireAuth(() => handleSave(post)); }}
                                                    className={`p-1.5 md:p-2 rounded-lg transition-colors ${isPostSaved(post) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                                                    title={isPostSaved(post) ? "Unsave" : "Save"}
                                                >
                                                    <span className={`material-symbols-outlined text-[18px] md:text-[22px] ${isPostSaved(post) ? '!fill-current' : ''}`}>
                                                        {isPostSaved(post) ? 'bookmark' : 'bookmark_border'}
                                                    </span>
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); openShareModal(post.id); }} className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Share">
                                                    <span className="material-symbols-outlined text-[18px] md:text-[22px]">share</span>
                                                </button>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); requireAuth(() => navigate(`/feed-details/${post.id}`)); }}
                                                className="px-4 py-1.5 md:px-6 md:py-2 bg-blue-600 border border-transparent text-white text-xs md:text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </article>
                                ))
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
                                    <button key={tag} className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-600 text-xs font-medium rounded-lg border border-gray-100 transition-colors">
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
                                <div className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                    <h4 className="text-sm font-semibold text-gray-800">Chevening Scholarship UK</h4>
                                    <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                                        Closes in 2 days
                                    </p>
                                </div>
                                <div className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                    <h4 className="text-sm font-semibold text-gray-800">Fulbright Program USA</h4>
                                    <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                                        Closes in 5 days
                                    </p>
                                </div>
                                <div className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                    <h4 className="text-sm font-semibold text-gray-800">University of Melbourne - Round 1</h4>
                                    <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                                        Closes next week
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Top Countries */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 text-purple-600">
                                <span className="material-symbols-outlined text-[20px]">public</span>
                                <h3 className="font-bold text-gray-900 text-sm">Top Countries This Week</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {[
                                    { country: 'USA', flag: '🇺🇸', trend: '+12%' },
                                    { country: 'Germany', flag: '🇩🇪', trend: '+8%' },
                                    { country: 'UK', flag: '🇬🇧', trend: '+5%' },
                                ].map((item, idx) => (
                                    <div key={idx} onClick={() => { }} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg shadow-sm border border-gray-200">
                                                {item.flag}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{item.country}</span>
                                        </div>
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{item.trend}</span>
                                    </div>
                                ))}
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
                    shareUrl={`https://eaoverseas.com/feed/${shareData.id}`}
                    preview={{
                        title: shareData.title,
                        subtitle: shareData.institution,
                        image: shareData.banner
                    }}
                />
            )}
        </div >
    );
};

export default Feed;

