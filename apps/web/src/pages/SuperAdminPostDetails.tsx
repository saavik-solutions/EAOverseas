import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { feedService, PostResponse } from '../services/feedService';
import { usePosts, Post } from '../shared/contexts/PostsContext';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

const TYPE_COLORS: Record<string, string> = {
    Article: 'bg-blue-100 text-blue-700 border-blue-200',
    Scholarship: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Announcement: 'bg-amber-100 text-amber-700 border-amber-200',
    Event: 'bg-rose-100 text-rose-700 border-rose-200',
    Guide: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    News: 'bg-sky-100 text-sky-700 border-sky-200',
    Webinar: 'bg-violet-100 text-violet-700 border-violet-200',
    Program: 'bg-purple-100 text-purple-700 border-purple-200',
};

const TYPE_ICONS: Record<string, string> = {
    Article: 'article',
    Scholarship: 'payments',
    Announcement: 'campaign',
    Event: 'calendar_today',
    Guide: 'menu_book',
    News: 'newspaper',
    Webinar: 'videocam',
    Program: 'school',
};

const SuperAdminPostDetails = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const { posts: allPosts, deletePost } = usePosts();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return;
            setLoading(true);
            try {
                // Try fetching from Live API first
                try {
                    const p: PostResponse = await feedService.getById(postId);
                    setPost({
                        id: p._id,
                        label: p.category || 'Article',
                        labelColor: TYPE_COLORS[p.category || 'Article'],
                        title: p.title,
                        about: p.content,
                        institution: p.authorId?.fullName || p.universityName || 'EA Overseas',
                        logo: p.authorId?.profilePicture || p.universityLogo || 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=100&h=100&fit=crop',
                        banner: p.mediaUrls?.[0] || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&h=400&fit=crop',
                        location: p.location || 'Global',
                        tags: p.tags || [],
                        category: p.category || 'Article',
                        status: 'Published',
                        grid: p.metadata?.grid || [
                            { label: 'Views', value: (p.viewCount || 0).toLocaleString() },
                            { label: 'Score', value: (p.score || 0).toString() },
                            { label: 'Comments', value: (p.commentCount || 0).toString() }
                        ],
                        benefits: p.metadata?.benefits || [],
                        documents: p.metadata?.documents || [],
                        downloadBtn: p.metadata?.downloadBtn || { label: '', link: '' }
                    });
                    setLoading(false);
                    return;
                } catch (e) {
                    console.warn('API fetch failed, falling back to local state', e);
                }

                // Fallback to local state if API fails (common in development/mixed environments)
                const localPost = allPosts.find(p => p.id === postId);
                if (localPost) {
                    setPost(localPost);
                }
            } catch (err) {
                console.error('Failed to resolve post data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    if (loading) {
        return (
            <div className="flex-1 bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="size-12 border-4 border-slate-200 border-t-[#2b6cee] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex-1 bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <div className="size-20 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <span className="material-symbols-outlined text-4xl">search_off</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">Post Not Found</h2>
                <p className="text-slate-500 mt-2 mb-6">The post you are looking for might have been deleted or moved.</p>
                <button onClick={() => navigate(-1)} className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition">
                    Go Back
                </button>
            </div>
        );
    }

    const postType = post.category || post.label;

    const handleDelete = async () => {
        if (window.confirm('This action cannot be undone. Are you sure you want to delete this post from the cloud?')) {
            try {
                // await feedService.delete(postId);
                deletePost(post.id);
                navigate('/superadmin/university-portal/posts-feed');
            } catch (err) {
                console.error('Delete failed', err);
            }
        }
    };

    return (
        <SuperAdminLayout hideHeader={true}>
        <div className="flex-1 bg-[#f8fafc] min-h-screen pb-20">
            <PageHeader
                title="Post Details"
                breadcrumbs={[
                    { label: 'University Portal' },
                    { label: 'Posts & Feed', link: '/superadmin/university-portal/posts-feed' },
                    { label: post.title }
                ]}
                actions={
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            Edit Post
                        </button>
                        <button onClick={handleDelete} className="px-4 py-2 text-sm font-bold text-rose-600 border border-rose-200 bg-rose-50 rounded-lg hover:bg-rose-100 transition flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            Delete
                        </button>
                    </div>
                }
            />

            <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* ── Main Content Area (8 Cols) ── */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* High Impact Hero */}
                        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden group">
                            <div className="relative aspect-[21/9] overflow-hidden">
                                <img
                                    src={post.banner || post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-10 right-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${TYPE_COLORS[postType]}`}>
                                            {postType}
                                        </span>
                                        {post.status && (
                                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full text-[10px] font-bold uppercase">
                                                {post.status}
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-md">
                                        {post.title}
                                    </h1>
                                </div>
                            </div>

                            <div className="p-10">
                                {/* Post Body */}
                                <div
                                    className="prose prose-slate max-w-none prose-lg prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-[#2b6cee] prose-img:rounded-3xl"
                                    dangerouslySetInnerHTML={{ __html: post.about }}
                                />

                                {/* dynamic benefits section */}
                                {post.benefits && post.benefits.length > 0 && (
                                    <div className="mt-12 pt-8 border-t border-slate-100">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Program Benefits & Outcomes</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {post.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-center gap-5 bg-slate-50 p-6 rounded-[32px] border border-slate-100 hover:border-[#2b6cee]/20 hover:bg-white hover:shadow-xl hover:shadow-[#2b6cee]/5 transition-all group">
                                                    <div className="size-14 bg-white rounded-2xl flex items-center justify-center text-[#2b6cee] shadow-sm group-hover:bg-[#2b6cee] group-hover:text-white transition-all">
                                                        <span className="material-symbols-outlined text-3xl font-light">{benefit.icon}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-lg leading-tight mb-1">{benefit.title}</p>
                                                        <p className="text-sm font-bold text-slate-500 leading-relaxed">{benefit.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mt-12 pt-8 border-t border-slate-100">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tagged Topics</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-600 font-bold text-xs rounded-xl border border-slate-100 hover:border-slate-200 transition-colors cursor-default">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Engagement Stats (Visible on Mobile) */}
                        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: 'Likes', value: (post.grid?.find(g => g.label === 'Score')?.value || '0'), icon: 'favorite', color: 'text-rose-500 bg-rose-50' },
                                { label: 'Comments', value: (post.grid?.find(g => g.label === 'Comments')?.value || '0'), icon: 'chat_bubble', color: 'text-blue-500 bg-blue-50' },
                                { label: 'Views', value: (post.grid?.find(g => g.label === 'Views')?.value || '0'), icon: 'visibility', color: 'text-emerald-500 bg-emerald-50' },
                                { label: 'Shared', value: '1.2k', icon: 'share', color: 'text-amber-500 bg-amber-50' },
                            ].map(stat => (
                                <div key={stat.label} className="bg-white p-4 rounded-3xl border border-slate-200 text-center">
                                    <span className={`material-symbols-outlined mb-1 ${stat.color} p-2 rounded-xl text-xl`}>{stat.icon}</span>
                                    <div className="font-black text-slate-900">{stat.value}</div>
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Sidebar (4 Cols) ── */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Institution Card */}
                        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-16 rounded-[20px] bg-slate-50 border border-slate-100 p-2 shadow-inner flex items-center justify-center overflow-hidden">
                                    <img src={post.logo} alt={post.institution} className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="font-black text-slate-900 border-b-2 border-orange-400 leading-none">
                                            {post.institution}
                                        </h3>
                                        {post.verified && <span className="material-symbols-outlined text-[16px] text-[#2b6cee] filled">verified</span>}
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                                        {post.location}
                                    </p>
                                </div>
                            </div>
                            <Link to={`/superadmin/universities`} className="w-full py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-2 group">
                                View Institution Profile
                                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>

                        {/* Dynamic Post Specifications Bar */}
                        {post.grid && post.grid.length > 0 && (
                            <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
                                    {post.grid.slice(0, 4).map((item, i) => (
                                        <div key={i} className="p-6 text-center hover:bg-slate-50 transition-colors">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{item.label}</p>
                                            <p className={`font-bold text-sm ${
                                                item.label.toLowerCase() === 'tuition' ? 'text-emerald-600' :
                                                item.label.toLowerCase() === 'duration' ? 'text-blue-600' :
                                                item.label.toLowerCase() === 'deadline' ? 'text-orange-600' :
                                                item.label.toLowerCase() === 'type' ? 'text-purple-600' : 'text-slate-900'
                                            }`}>
                                                {item.value}
                                                {item.label.toLowerCase() === 'deadline' && <span className="material-symbols-outlined text-[14px] ml-1 align-middle">schedule</span>}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Required Documents Section */}
                        {post.documents && post.documents.length > 0 && (
                            <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                                <div className="p-8 space-y-8">
                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Application Prerequisites</h4>
                                        <h5 className="font-black text-slate-900 text-lg">Required Documents</h5>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {post.documents.map((doc, idx) => (
                                            <div key={idx} className="flex items-center gap-4 group">
                                                <div className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#2b6cee]/10 group-hover:text-[#2b6cee] transition-all">
                                                    <span className="material-symbols-outlined text-[18px]">description</span>
                                                </div>
                                                <p className="text-slate-600 font-bold text-sm tracking-tight">{doc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {post.downloadBtn && post.downloadBtn.label && (
                                        <div className="pt-8 border-t border-slate-100 flex justify-center">
                                            <a 
                                                href={post.downloadBtn.link || '#'} 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-900 rounded-[24px] font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all group active:scale-95 shadow-xl shadow-slate-200"
                                            >
                                                <span className="material-symbols-outlined group-hover:translate-y-0.5 transition-transform">download</span>
                                                {post.downloadBtn.label}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Engagement & Outreach */}
                        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Partner Outreach</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                                    <div className="text-xl font-black text-slate-900">4.2k</div>
                                    <div className="text-[9px] font-bold text-slate-400 uppercase">Impressions</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                                    <div className="text-xl font-black text-slate-900">890</div>
                                    <div className="text-[9px] font-bold text-slate-400 uppercase">Applications</div>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-3xl flex items-center gap-4">
                                <div className="size-12 bg-[#2b6cee] rounded-2xl flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-outlined">share</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-slate-900">Public URL</p>
                                    <p className="text-[10px] text-blue-600 font-medium truncate">eaoverseas.com/feed/{post.id}</p>
                                </div>
                                <button className="size-8 bg-white border border-blue-200 rounded-lg flex items-center justify-center text-[#2b6cee] hover:bg-blue-100 transition">
                                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminPostDetails;
