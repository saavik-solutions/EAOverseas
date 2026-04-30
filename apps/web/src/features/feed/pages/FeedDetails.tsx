import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { feedService, PostResponse } from '@/features/feed/services/feedService';
import ShareModal from '@/components/feedback/ShareModal';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';

const FeedDetails = () => {
    const { id: slug } = useParams();
    const navigate = useNavigate();
    const { requireAuth } = useAuth();
    const { togglePost, isPostSaved } = useSavedItems();
    
    const [data, setData] = useState<PostResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const fetchPost = async () => {
        if (!slug) return;
        try {
            const post = await feedService.getById(slug);
            setData(post);
            setError(null);
        } catch (err: any) {
            console.error('Failed to fetch post:', err);
            setError('Post not found');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [slug]);

    const displayData = useMemo(() => {
        if (!data) return null;

        const metadata = data.metadata || {};
        
        return {
            id: data.id,
            title: data.title,
            institution: data.university?.name || metadata.universityName || 'EAOverseas',
            location: data.metadata?.location || data.university?.country || 'Global',
            banner: data.coverImageUrl || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2000&auto=format&fit=crop',
            logo: data.university?.logoUrl || metadata.universityLogo || '/logo.png',
            label: data.category.charAt(0).toUpperCase() + data.category.slice(1),
            verified: true,
            about: data.content,
            applyLink: metadata.applyLink || '#',
            grid: [
                { label: 'Tuition', value: metadata.tuitionFee || 'Check Website', color: metadata.tuitionFee ? 'text-green-600' : 'text-gray-400' },
                { label: 'Duration', value: metadata.programDuration || 'Not Specified', color: 'text-blue-600' },
                { label: 'Deadline', value: metadata.deadline || 'Ongoing', alert: !!metadata.deadline && metadata.deadline !== 'Ongoing' },
                { label: 'Type', value: data.category === 'scholarships' ? 'Fully Funded' : 'Regular', color: 'text-purple-600' }
            ],
            eligibility: metadata.eligibility || [
                'International student status',
                'English proficiency (IELTS/TOEFL)',
                'Relevant academic background',
                'Completed application form'
            ],
            benefits: metadata.benefits || [
                { icon: 'account_balance_wallet', title: 'Financial Support', desc: 'Potential scholarships and grants', bg: 'bg-blue-50', text: 'text-blue-600' },
                { icon: 'language', title: 'Global Exposure', desc: 'Study at a top-tier international university', bg: 'bg-green-50', text: 'text-green-600' },
                { icon: 'work', title: 'Career Services', desc: 'Access to university job boards and fairs', bg: 'bg-purple-50', text: 'text-purple-600' }
            ]
        };
    }, [data]);

    const handleLike = async () => {
        if (!data) return;
        requireAuth(async () => {
            try {
                await feedService.toggleLike(data.id);
                fetchPost(); // Refresh data
            } catch (err) {
                console.error(err);
            }
        });
    };


    const isLiked = data?.userInteractions?.includes('like');

    // Dynamic Label Class
    const getLabelClass = () => {
        if (data?.category === 'scholarships') return 'bg-green-100 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold text-green-700 border border-green-200 shadow-sm';
        if (data?.category === 'visa') return 'bg-purple-100 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold text-purple-700 border border-purple-200 shadow-sm';
        return 'bg-white/95 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold text-primary border border-gray-100 shadow-sm';
    };

    const handleApply = () => {
        if (displayData?.applyLink && displayData.applyLink !== '#') {
            window.open(displayData.applyLink, '_blank');
        }
    };

    const handleSave = () => {
        if (!data) return;
        requireAuth(() => {
            togglePost(data);
        });
    };

    const downloadGuide = () => {
        if (!displayData) return;
        const guideContent = `
EAOverseas Scholarship Guide
============================

Program: ${displayData.title}
Institution: ${displayData.institution}
Location: ${displayData.location}

---

Step-by-Step Application Process:
1. Review the Eligibility Criteria carefully.
2. Prepare all Required Documents (CV, Transcripts, Statement of Purpose).
3. Complete the Online Application Form via the "Apply Now" button.
4. Ensure submission before the deadline.

For further assistance, please reach out to our support team at info@eaoverseas.com.

Good luck!
        `;
        const blob = new Blob([guideContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${displayData.id}_scholarship_guide.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium font-sans">Loading post details...</p>
                </div>
            </div>
        );
    }

    if (error || !displayData) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white border border-gray-200 rounded-xl max-w-md shadow-sm">
                    <span className="material-symbols-outlined text-red-500 !text-[48px] mb-4">error</span>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Oops! Post Not Found</h2>
                    <p className="text-gray-500 mb-6 font-sans">The post you're looking for might have been moved or deleted.</p>
                    <Link to="/feed" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back to Feed
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 h-full overflow-hidden font-sans">
            {/* Center Content */}
            <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
                {/* Header */}
                <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Link to="/" className="hover:text-primary transition-colors">
                            <span className="material-symbols-outlined !text-[18px]">home</span>
                        </Link>
                        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                        <Link to="/feed" className="text-gray-500 hover:text-gray-900 cursor-pointer">Global Feed</Link>
                        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                        <span className="text-gray-900 font-medium">Post Details</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-3 md:p-6 scroll-smooth">
                    <div className="max-w-5xl mx-auto pb-20 relative">
                        
                        {/* Interaction Sidebar (Sticky) */}
                        <div className="hidden lg:flex flex-col items-center gap-1 absolute -left-16 top-0 h-full">
                            <div className="sticky top-24 flex flex-col items-center p-2 rounded-2xl bg-white border border-gray-100 shadow-sm gap-2">
                                <button 
                                    onClick={handleLike}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isLiked ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
                                >
                                    <span className={`material-symbols-outlined !text-[24px] ${isLiked ? '!fill-current' : ''}`}>thumb_up</span>
                                </button>
                                    <span className={`text-xs font-bold ${isLiked ? 'text-blue-600' : 'text-gray-700'}`}>{data?.likeCount || 0}</span>
                                
                                <div className="w-full h-[1px] bg-gray-100 my-1"></div>
                                
                                <button 
                                    onClick={handleSave}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${data && isPostSaved(data) ? 'bg-amber-50 text-amber-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
                                >
                                    <span className={`material-symbols-outlined !text-[24px] ${data && isPostSaved(data) ? '!fill-current' : ''}`}>bookmark</span>
                                </button>
                            </div>
                        </div>

                        <article className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="h-36 md:h-64 w-full relative group bg-gray-100">
                                <img src={displayData.banner} alt="Banner" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                    <span className={getLabelClass()}>{displayData.label}</span>
                                </div>
                            </div>

                            <div className="px-3 py-4 md:px-6 md:pt-6 md:pb-6">
                                <div className="flex flex-col gap-4 md:gap-6">
                                    <div className="flex gap-3 md:gap-4 items-start">
                                        {data?.university?.id ? (
                                            <Link to={`/institution/${data.university.slug}`} className="w-10 h-10 md:w-16 md:h-16 rounded-lg border border-gray-200 bg-white flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-sm hover:border-primary transition-colors">
                                                <img src={displayData.logo} alt="Institution Logo" className="w-full h-full object-contain" />
                                            </Link>
                                        ) : (
                                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg border border-gray-200 bg-white flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-sm">
                                                <img src={displayData.logo} alt="Institution Logo" className="w-full h-full object-contain" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h1 className="text-lg md:text-2xl font-bold text-gray-900 leading-tight mb-2">
                                                {displayData.title}
                                            </h1>
                                            <div className="flex items-center flex-wrap gap-y-1 gap-x-2 md:gap-x-3 text-xs md:text-sm text-gray-500">
                                                {data?.university?.id ? (
                                                    <Link to={`/institution/${data.university.slug}`} className="font-semibold text-gray-900 flex items-center gap-1.5 hover:text-primary">
                                                        <span className="material-symbols-outlined text-[18px]">account_balance</span>
                                                        {displayData.institution}
                                                    </Link>
                                                ) : (
                                                    <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-[18px]">account_balance</span>
                                                        {displayData.institution}
                                                    </span>
                                                )}
                                                <span className="text-gray-300">•</span>
                                                <span className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                                    {displayData.location}
                                                </span>
                                                <span className="text-gray-300">•</span>
                                                {displayData.verified && (
                                                    <span className="text-green-600 font-medium flex items-center gap-1.5 bg-green-50 px-1.5 py-0.5 md:px-2 rounded-full text-[10px] md:text-xs">
                                                        <span className="material-symbols-outlined text-[14px] md:text-[16px]">verified</span>
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                                        {/* Mobile Interactions */}
                                        <div className="flex lg:hidden items-center gap-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                            <button onClick={handleLike} className={`flex items-center gap-2 text-xs font-bold ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}>
                                                <span className={`material-symbols-outlined text-[18px] ${isLiked ? '!fill-current' : ''}`}>thumb_up</span>
                                                {data?.likeCount || 0}
                                            </button>
                                        </div>
                                        
                                        <div className="flex gap-2 module:gap-3 justify-between w-full md:w-auto md:justify-start">
                                            <button onClick={() => setIsShareModalOpen(true)} className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-1.5 md:gap-2 text-xs md:text-sm shadow-sm flex-1 md:flex-none justify-center">
                                                <span className="material-symbols-outlined text-[18px] md:text-[20px]">share</span>
                                                Share
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className={`px-3 py-1.5 md:px-4 md:py-2 bg-white border font-medium rounded-lg transition-colors flex items-center gap-1.5 md:gap-2 text-xs md:text-sm shadow-sm flex-1 md:flex-none justify-center ${data && isPostSaved(data) ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-gray-900 border-gray-200 hover:bg-gray-50 hover:text-primary'}`}
                                            >
                                                <span className={`material-symbols-outlined text-[18px] md:text-[20px] ${data && isPostSaved(data) ? '!fill-current' : ''}`}>
                                                    {data && isPostSaved(data) ? 'bookmark' : 'bookmark_border'}
                                                </span>
                                                {data && isPostSaved(data) ? 'Saved' : 'Save'}
                                            </button>
                                            {displayData.applyLink && (
                                                <button onClick={handleApply} className="px-4 py-1.5 md:px-6 md:py-2.5 bg-blue-600 text-white font-medium rounded-lg flex items-center gap-1.5 md:gap-2 text-xs md:text-sm flex-1 md:flex-none justify-center">
                                                    Apply Now
                                                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">open_in_new</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-200 bg-gray-50/50 divide-x divide-y md:divide-y-0 divide-gray-200">
                                {displayData.grid.map((item, index) => (
                                    <div key={index} className="p-3 md:p-4 flex flex-col items-center justify-center text-center gap-1">
                                        <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</span>
                                        <span className={`text-xs md:text-sm font-bold flex items-center gap-1 ${item.color || 'text-gray-900'} ${item.alert ? 'text-orange-600' : ''}`}>
                                            {item.value}
                                            {item.alert && <span className="material-symbols-outlined text-[14px] md:text-[16px]">schedule</span>}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="px-4 py-6 md:px-6 md:py-8 flex flex-col gap-6 md:gap-8">
                                <section className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: displayData.about }} />

                                {displayData.eligibility && displayData.eligibility.length > 0 && (
                                    <section className="bg-blue-50/40 border border-blue-100 rounded-xl p-6">
                                        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-[22px]">fact_check</span>
                                            Eligibility Criteria
                                        </h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                            {displayData.eligibility.map((item: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                                                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {displayData.benefits && displayData.benefits.length > 0 && (
                                        <section>
                                            <h3 className="text-base font-bold text-gray-900 mb-4">Scholarship Benefits</h3>
                                            <ul className="space-y-3">
                                                {displayData.benefits.map((ben: any, i: number) => (
                                                    <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 group hover:border-blue-200 transition-colors">
                                                        <div className={`w-8 h-8 rounded ${ben.bg} ${ben.text} flex items-center justify-center`}>
                                                            <span className="material-symbols-outlined text-[18px]">{ben.icon}</span>
                                                        </div>
                                                        <div className="text-sm">
                                                            <span className="block font-semibold text-gray-900">{ben.title}</span>
                                                            <span className="text-gray-500">{ben.desc}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {/* Document Section */}
                                    <section>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-base font-bold text-gray-900">Required Documents</h3>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                            <ul className="space-y-3 text-sm text-gray-700">
                                                <li className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-gray-400 text-[18px]">description</span>
                                                    Completed application form
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-gray-400 text-[18px]">description</span>
                                                    CV / Resume
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-gray-400 text-[18px]">description</span>
                                                    Academic Transcripts
                                                </li>
                                            </ul>
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <button onClick={downloadGuide} className="w-full py-2 text-primary text-sm font-medium hover:bg-white rounded-lg border border-transparent hover:border-blue-100 transition-all flex items-center justify-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                                    Download Application Guide
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <section>
                                    <div className="flex justify-start pt-4 border-t border-gray-100">
                                        <Link to="/feed" className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-primary transition-all flex items-center gap-2 text-sm">
                                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                            Back to Global Feed
                                        </Link>
                                    </div>
                                </section>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDEBAR: Widgets */}
            <aside className="hidden xl:flex w-80 flex-col h-full border-l border-border-subtle bg-white overflow-y-auto shrink-0 z-10 p-5 font-sans">
                {/* Trending Widget */}
                <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
                        <h3 className="text-sm font-bold text-text-main">Trending Topics</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['#Fall2026', '#NoIELTS', '#GermanyScholarships', '#FullyFunded', '#MBA'].map(tag => (
                            <Link key={tag} to="/feed" className="text-xs font-medium bg-white text-gray-700 px-3 py-1.5 rounded-md border border-gray-200 hover:border-primary hover:text-primary transition-colors">{tag}</Link>
                        ))}
                    </div>
                </div>
                {/* Deadline Alerts Widget */}
                <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5 border border-gray-100">
                    <div className="flex items-center justify-between mb-3 text-orange-600">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">warning</span>
                            <h3 className="text-sm font-bold text-text-main">Deadline Alerts</h3>
                        </div>
                        <Link to="/feed" className="text-xs font-bold text-primary hover:underline">View All</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="pb-3 border-b border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Chevening Scholarship UK</h4>
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-red-500"></div>
                                <span className="text-xs font-medium text-red-500">Closes in 2 days</span>
                            </div>
                        </div>
                        <div className="pb-3 border-b border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Fulbright Program USA</h4>
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-orange-500"></div>
                                <span className="text-xs font-medium text-orange-500">Closes in 5 days</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Tip */}
                <div className="mt-auto p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex gap-2 items-start">
                        <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
                        <div>
                            <h4 className="text-sm font-bold text-primary mb-1">Quick Tip</h4>
                            <p className="text-xs text-blue-800 leading-relaxed">Early applicants have a 40% higher chance of securing scholarships. Our experts can help you submit early!</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Share Modal */}
            {data && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    title="Share Scholarship"
                    shareUrl={`https://eaoverseas.com/feed-details/${data.slug}`}
                    preview={{
                        title: data.title,
                        subtitle: displayData?.institution || 'EAOverseas',
                        image: data.coverImageUrl || ''
                    }}
                />
            )}
        </div>
    );
};

export default FeedDetails;
