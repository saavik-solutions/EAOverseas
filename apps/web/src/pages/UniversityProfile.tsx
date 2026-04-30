import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { universityService, UniversityData } from '../services/universityService';
import { PostResponse } from '../services/feedService';
import PageHeader from '../components/PageHeader';
import ShareModal from '../components/ShareModal';
import { useAuth } from '../context/AuthContext';
import { useSavedItems } from '../context/SavedItemsContext';

const UniversityProfile = () => {
    const { name: identifier } = useParams();
    const navigate = useNavigate();
    const { requireAuth } = useAuth();
    const { togglePost, isPostSaved } = useSavedItems();
    
    const [data, setData] = useState<UniversityData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!identifier) return;
            try {
                setLoading(true);
                const university = await universityService.getById(identifier);
                setData(university);
                setError(null);
            } catch (err: any) {
                console.error('Failed to fetch university:', err);
                setError('University not found');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [identifier]);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium font-sans">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex flex-col flex-1 h-full bg-[#f8f9fc]">
                <PageHeader title="Institution Profile" />
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                    <span className="material-symbols-outlined text-6xl text-red-400 mb-4">school</span>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Institution not found</h2>
                    <p className="text-gray-500 mb-6 max-w-sm">We couldn't find a profile for this university. It may have been removed or the URL is incorrect.</p>
                    <Link to="/feed" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Back to Global Feed
                    </Link>
                </div>
            </div>
        );
    }

    const openShareModal = (post: any) => {
        setShareData(post);
        setIsShareModalOpen(true);
    };

    const handleSave = (post: any) => {
        requireAuth(() => {
            togglePost(post);
        });
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-[#f8f9fc] overflow-hidden font-sans">
            <PageHeader title={data.name} breadcrumbs={[{ label: 'Global Feed', link: '/feed' }, { label: data.name }]} />

            <main className="flex-1 overflow-y-auto bg-white/50 scroll-smooth">
                {/* Banner Section */}
                <div className="h-48 md:h-72 w-full relative bg-gray-200">
                    <img 
                        src={data.bannerUrl || 'https://images.unsplash.com/photo-1523050335392-9befbf08e90e?q=80&w=2000&auto=format&fit=crop'} 
                        alt="Campus" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    <div className="absolute -bottom-10 left-6 md:left-12 flex items-end gap-4 md:gap-6">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white border-4 border-white shadow-lg p-2 overflow-hidden">
                            <img src={data.logoUrl || '/logo.png'} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="mb-12 text-white hidden md:block">
                            <h1 className="text-3xl font-bold mb-1 drop-shadow-md">{data.name}</h1>
                            <div className="flex items-center gap-3 text-white/90">
                                <span className="flex items-center gap-1 text-sm">
                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    {data.city}, {data.country}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                    {/* Main Content */}
                    <div className="flex flex-col gap-8">
                        {/* Highlights Mobile */}
                        <div className="md:hidden">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.name}</h1>
                            <span className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                {data.city}, {data.country}
                            </span>
                        </div>

                        {/* About Section */}
                        <section className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">info</span>
                                About the University
                            </h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {data.description || `Welcome to ${data.name}. We are committed to academic excellence and provide a world-class education for international students from across the globe.`}
                            </p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
                                <div className="flex flex-col">
                                    <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Established</span>
                                    <span className="text-sm md:text-base font-bold text-gray-900">{data.establishedYear || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Students</span>
                                    <span className="text-sm md:text-base font-bold text-gray-900">{data.totalStudents?.toLocaleString() || 'Global'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">QS Ranking</span>
                                    <span className="text-sm md:text-base font-bold text-gray-900">#{data.qsRanking || data.ranking || 'Top 1%'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Intl Students</span>
                                    <span className="text-sm md:text-base font-bold text-gray-900">{data.intlStudentsPct ? `${data.intlStudentsPct}%` : 'Diverse'}</span>
                                </div>
                            </div>
                        </section>

                        {/* Updates Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">article</span>
                                    Recent Updates & Scholarships
                                </h2>
                            </div>

                            <div className="grid gap-6">
                                {data.feedPosts && data.feedPosts.length > 0 ? (
                                    data.feedPosts.map((post: any) => (
                                        <article
                                            key={post.id}
                                            onClick={() => navigate(`/feed-details/${post.slug}`)}
                                            className="flex flex-col bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                                                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase text-[10px] tracking-wide font-bold">
                                                        {post.category}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button onClick={(e) => { e.stopPropagation(); handleSave(post); }} className={`p-1.5 rounded-lg transition-colors ${isPostSaved(post) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}>
                                                        <span className={`material-symbols-outlined text-[20px] ${isPostSaved(post) ? '!fill-current' : ''}`}>bookmark</span>
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); openShareModal(post); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <span className="material-symbols-outlined text-[20px]">share</span>
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {post.coverImageUrl && (
                                                    <div className="w-full md:w-48 h-32 shrink-0 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                                                        <img src={post.coverImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cover" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 leading-tight">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 line-clamp-2 md:line-clamp-3 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: post.content }} />
                                                    <button className="text-primary text-sm font-bold flex items-center gap-1 group/btn">
                                                        View Details
                                                        <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_right_alt</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-12 text-center flex flex-col items-center">
                                        <span className="material-symbols-outlined text-gray-300 text-[48px] mb-4">campaign</span>
                                        <p className="text-gray-500 font-medium">No recent updates for this university.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="flex flex-col gap-6">
                        {/* Stats Card */}
                        <div className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Quick Stats</h3>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">trending_up</span>
                                    </div>
                                    <div>
                                        <span className="block text-xl font-bold leading-none">{data.acceptanceRate ? `${data.acceptanceRate}%` : 'N/A'}</span>
                                        <span className="text-[10px] uppercase font-bold opacity-70">Acceptance Rate</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                    <div>
                                        <span className="block text-xl font-bold leading-none">~$45k</span>
                                        <span className="text-[10px] uppercase font-bold opacity-70">Avg. Tuition / Year</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">groups</span>
                                    </div>
                                    <div>
                                        <span className="block text-xl font-bold leading-none">3.5/5.0</span>
                                        <span className="text-[10px] uppercase font-bold opacity-70">Student Satisfaction</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="w-full mt-8 py-3 bg-white text-primary font-bold rounded-xl shadow-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">chat</span>
                                Ask About this Uni
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Official Resources</h3>
                            <div className="flex flex-col gap-3">
                                <a href={data.websiteUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary hover:text-primary transition-all group">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">language</span>
                                        <span className="text-sm font-semibold">Official Website</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                </a>
                                <button className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary hover:text-primary transition-all group">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">download</span>
                                        <span className="text-sm font-semibold">Brouchure 2025</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[18px]">file_download</span>
                                </button>
                            </div>
                        </div>

                        {/* Location Mini Map Placeholder */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Location</h3>
                            <div className="w-full h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                                <img src={`https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=600&auto=format&fit=crop`} className="w-full h-full object-cover opacity-60 grayscale" alt="Map" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="material-symbols-outlined text-red-500 !text-[32px] drop-shadow-md">location_on</span>
                                        <span className="text-xs font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">{data.city}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 text-center italic">Campus address and directions available for verified users only.</p>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Share Modal */}
            {shareData && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    title="Share Opportunity"
                    shareUrl={`${window.location.origin}/feed-details/${shareData.slug}`}
                    preview={{
                        title: shareData.title,
                        subtitle: data.name,
                        image: shareData.coverImageUrl || ''
                    }}
                />
            )}
        </div>
    );
};

export default UniversityProfile;
