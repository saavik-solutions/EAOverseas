import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { feedService, PostResponse } from '../services/feedService';
import { universityService, UniversityData } from '../services/universityService';
import { usePosts, Post } from '../shared/contexts/PostsContext';
import UniversityLayout from '../layouts/UniversityLayout';

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

const UniversityPostDetails = () => {
    const { universityName, postId } = useParams<{ universityName: string; postId: string }>();
    const navigate = useNavigate();
    const { posts: allPosts, deletePost } = usePosts();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUni, setCurrentUni] = useState<UniversityData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!postId) return;
            setLoading(true);
            try {
                // Fetch university context
                const uniRes = await universityService.getAll();
                const uniData = uniRes.universities?.find((u: any) => 
                    u.name.toLowerCase().replace(/\s+/g, '-') === universityName
                );
                setCurrentUni(uniData || null);

                // Try fetching from Live API first
                try {
                    const p: PostResponse = await feedService.getById(postId);
                    setPost({
                        id: p._id,
                        label: p.category || 'Article',
                        labelColor: TYPE_COLORS[p.category || 'Article'],
                        title: p.title,
                        about: p.content,
                        institution: p.universityName || p.authorId?.fullName || 'Partner',
                        logo: p.universityLogo || p.authorId?.profilePicture || 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=100&h=100&fit=crop',
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

                const localPost = allPosts.find(p => p.id === postId);
                if (localPost) setPost(localPost);
            } catch (err) {
                console.error('Failed to resolve post data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [postId, universityName]);

    if (loading) {
        return (
            <UniversityLayout universityName={currentUni?.name || 'University'} pageTitle="Post Details">
                <div className="flex-1 bg-slate-50 min-h-screen flex items-center justify-center">
                    <div className="size-12 border-4 border-slate-200 border-t-[#2b6cee] rounded-full animate-spin"></div>
                </div>
            </UniversityLayout>
        );
    }

    if (!post) {
        return (
            <UniversityLayout universityName={currentUni?.name || 'University'} pageTitle="Post Not Found">
                <div className="flex-1 bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6 text-center">
                    <div className="size-20 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                        <span className="material-symbols-outlined text-4xl">search_off</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Post Not Found</h2>
                    <p className="text-slate-500 mt-2 mb-6">This post may have been removed or belongs to another institution.</p>
                    <button onClick={() => navigate(-1)} className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition">Go Back</button>
                </div>
            </UniversityLayout>
        );
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(post.id);
                navigate(`/university-panel/${universityName}/post-center`);
            } catch (err) {
                console.error('Delete failed', err);
            }
        }
    };

    return (
        <UniversityLayout universityName={currentUni?.name || 'University'} pageTitle={post.title}>
            <div className="flex-1 bg-[#f8fafc] min-h-screen pb-20">
                <PageHeader
                    title="Post Details"
                    breadcrumbs={[
                        { label: 'Post Center', link: `/university-panel/${universityName}/post-center` },
                        { label: post.title }
                    ]}
                    actions={
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                            </button>
                            <button onClick={handleDelete} className="px-4 py-2 text-sm font-bold text-rose-600 border border-rose-200 bg-rose-50 rounded-lg hover:bg-rose-100 transition flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">delete</span> Delete
                            </button>
                        </div>
                    }
                />

                <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                                <div className="relative aspect-[21/9] overflow-hidden">
                                    <img src={post.banner} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-8 left-10">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg mb-4 inline-block ${TYPE_COLORS[post.category || 'Article']}`}>{post.category}</span>
                                        <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mt-2">{post.title}</h1>
                                    </div>
                                </div>
                                <div className="p-10">
                                    <div className="prose prose-slate max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed" dangerouslySetInnerHTML={{ __html: post.about }} />
                                    
                                    {post.benefits && post.benefits.length > 0 && (
                                        <div className="mt-12 pt-8 border-t border-slate-100">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Special Benefits</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {post.benefits.map((b, i) => (
                                                    <div key={i} className="flex items-center gap-4 bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                                                        <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-[#2b6cee]"><span className="material-symbols-outlined">{b.icon}</span></div>
                                                        <div><p className="font-black text-slate-900 text-base leading-tight">{b.title}</p><p className="text-xs font-bold text-slate-500">{b.description}</p></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-14 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center overflow-hidden"><img src={post.logo} className="size-full object-contain" alt="" /></div>
                                    <div>
                                        <h3 className="font-black text-slate-900 border-b-2 border-orange-400 leading-none">{post.institution}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span>{post.location}</p>
                                    </div>
                                </div>
                            </div>

                            {post.grid && post.grid.length > 0 && (
                                <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                                    <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">
                                        {post.grid.map((item, i) => (
                                            <div key={i} className="p-6 text-center hover:bg-slate-50 transition-colors">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                                <p className="font-black text-sm text-slate-900">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="bg-[#111318] rounded-[32px] p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 size-32 bg-[#2b6cee]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <h3 className="text-[10px] font-black text-[#2b6cee] uppercase tracking-[0.2em] mb-4">Post Insights</h3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
                                        <div className="text-xl font-black">{post.grid[0].value}</div>
                                        <div className="text-[8px] font-black text-slate-500 uppercase">Impact Score</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
                                        <div className="text-xl font-black">Active</div>
                                        <div className="text-[8px] font-black text-slate-500 uppercase">Status</div>
                                    </div>
                                </div>
                                <button className="w-full py-4 bg-[#2b6cee] hover:bg-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20">
                                    <span className="material-symbols-outlined text-base">share</span> Share Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityPostDetails;
