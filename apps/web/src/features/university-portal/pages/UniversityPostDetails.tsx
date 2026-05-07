import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '@/shared/components/layout/PageHeader';
import { feedService, PostResponse } from '@/features/feed/services/feedService';
import { universityService, UniversityData } from '@/features/colleges/services/universityService';
import { usePosts, Post } from '@/features/feed/services/PostsContext';
import UniversityLayout from '@/layouts/UniversityLayout';
import EditPostModal from '@/features/university-portal/components/EditPostModal';

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
    const [post, setPost] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUni, setCurrentUni] = useState<UniversityData | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

                // Try fetching from Live API
                const p: PostResponse = await feedService.getById(postId);
                const mappedPost = {
                    id: p.id,
                    title: p.title,
                    content: p.content,
                    category: p.category || 'Article',
                    categoryColor: TYPE_COLORS[p.category || 'Article'],
                    institution: p.university?.name || p.author?.fullName || 'Partner',
                    location: p.metadata?.location || p.metadata?.country || 'Global',
                    logo: p.university?.logoUrl || p.author?.avatarUrl || 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=100&h=100&fit=crop',
                    banner: p.coverImageUrl || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=1200&h=400&fit=crop',
                    isVerified: true,
                    // Stats Grid - Always ensure 4 items exist
                    grid: [
                        { label: 'TUITION', value: p.metadata?.tuitionFee || 'N/A', color: 'text-emerald-600' },
                        { label: 'DURATION', value: p.metadata?.programDuration || 'N/A', color: 'text-blue-600' },
                        { label: 'DEADLINE', value: p.metadata?.scholarshipDeadline || 'N/A', color: 'text-orange-600', icon: 'schedule' },
                        { label: 'TYPE', value: p.category || 'Article', color: 'text-purple-600' }
                    ],
                    // Detailed Content
                    summary: p.metadata?.summary || '',
                    eligibility: p.metadata?.scholarshipEligibility ? [p.metadata.scholarshipEligibility] : (p.metadata?.documents || []),
                    benefits: p.metadata?.benefits || [],
                    requiredDocuments: p.metadata?.documents || ['Completed application form', 'CV / Resume', 'Academic Transcripts'],
                    applyLink: p.metadata?.eventRegistrationLink || p.metadata?.webinarLink || '#'
                };
                setPost(mappedPost);
            } catch (err) {
                console.error('Failed to resolve post data', err);
                const localPost = allPosts.find(p => p.id === postId);
                if (localPost) setPost(localPost);
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
            <div className="flex-1 bg-white min-h-screen pb-16">
                {/* 1. Slimmer Banner */}
                <div className="relative w-full h-[320px] overflow-hidden">
                    <img src={post.banner} alt="" className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-8">
                        <span className="px-3 py-1 bg-[#e8fbf3] text-[#10b981] rounded-full text-[10px] font-bold border border-[#d1fae5]">
                            {post.category.endsWith('s') ? post.category : `${post.category}s`}
                        </span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-12 relative z-10">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        {/* 2. Header Info (Smaller) */}
                        <div className="flex items-start gap-5 mb-6">
                            <div className="size-16 rounded-xl border border-slate-100 p-2 bg-white flex items-center justify-center shadow-sm">
                                <img src={post.logo} alt="" className="size-full object-contain" />
                            </div>
                            <div className="flex-1 pt-1">
                                <h1 className="text-2xl font-black text-slate-900 mb-2">{post.title}</h1>
                                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px]">account_balance</span>
                                        {post.institution}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                                        {post.location}
                                    </div>
                                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                        <span className="material-symbols-outlined text-[14px] font-bold">verified</span>
                                        <span className="text-[9px] uppercase tracking-wider">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-50 w-full mb-6"></div>

                        {/* 3. Administrative Actions */}
                        <div className="flex items-center gap-3 mb-8">
                            <button onClick={() => setIsEditModalOpen(true)} className="px-5 py-2.5 bg-[#2b6cee] text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition flex items-center gap-2 shadow-lg shadow-blue-500/10">
                                <span className="material-symbols-outlined text-[18px]">edit</span> Edit Details
                            </button>
                            <button onClick={handleDelete} className="px-5 py-2.5 border border-rose-200 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">delete</span> Delete
                            </button>
                        </div>

                        {/* 4. Stats Grid (More compact) */}
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-50 border-y border-slate-50 mb-8 py-2">
                            {post.grid.map((stat: any, i: number) => (
                                <div key={i} className="py-3 md:py-1 text-center">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                                    <div className={`flex items-center justify-center gap-1 font-bold text-xs ${stat.color || 'text-slate-900'}`}>
                                        {stat.value}
                                        {stat.icon && <span className="material-symbols-outlined text-[16px]">{stat.icon}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 5. Main Content */}
                        <div className="space-y-10">
                            <div className="prose prose-slate max-w-none prose-p:text-sm prose-p:leading-relaxed">
                                <p className="text-base text-slate-600 font-medium">{post.summary}</p>
                                <div className="mt-6 pt-6 border-t border-slate-50" dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>

                            {/* 6. Eligibility Criteria */}
                            <div className="bg-[#f8faff] rounded-2xl p-6 border border-blue-50">
                                <div className="flex items-center gap-2.5 mb-5">
                                    <span className="material-symbols-outlined text-[#2b6cee] text-[20px]">fact_check</span>
                                    <h3 className="text-base font-black text-slate-900">Eligibility Criteria</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10">
                                    {post.eligibility.map((item: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <span className="material-symbols-outlined text-slate-400 text-[18px]">check_circle</span>
                                            <p className="text-xs font-bold text-slate-600">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* 7. Scholarship Benefits */}
                                <div>
                                    <h3 className="text-base font-black text-slate-900 mb-5">Scholarship Benefits</h3>
                                    <div className="space-y-3">
                                        {(post.benefits.length > 0 ? post.benefits : [
                                            { title: 'Living Allowance', desc: '$37,000 per year', icon: 'savings' },
                                            { title: 'Relocation Grant', desc: '$3,000 for overseas students', icon: 'local_shipping' }
                                        ]).map((benefit: any, i: number) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-[#2b6cee]/20 transition-all group">
                                                <div className="size-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-[#2b6cee]/5 group-hover:text-[#2b6cee] transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">{benefit.icon || 'star'}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 leading-tight">{benefit.title}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{benefit.desc || benefit.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 8. Required Documents */}
                                <div>
                                    <h3 className="text-base font-black text-slate-900 mb-5">Required Documents</h3>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                        <div className="space-y-4 mb-8">
                                            {post.requiredDocuments.map((doc: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">description</span>
                                                    <p className="text-xs font-bold text-slate-600">{doc}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <button 
                                                onClick={() => window.open(post.applyLink)}
                                                className="w-full py-3 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-700 hover:bg-slate-100 transition flex items-center justify-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">download</span>
                                                Download Application Guide
                                            </button>
                                            <label className="w-full py-3 bg-slate-100 border border-dashed border-slate-300 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-200 transition flex items-center justify-center gap-2 cursor-pointer">
                                                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                                Update Guide (PDF)
                                                <input 
                                                    type="file" 
                                                    accept=".pdf" 
                                                    className="hidden" 
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        const formData = new FormData();
                                                        formData.append('file', file);
                                                        try {
                                                            const token = localStorage.getItem('eaoverseas_token');
                                                            const res = await fetch('http://localhost:4000/api/upload/image', {
                                                                method: 'POST',
                                                                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                                                                body: formData
                                                            });
                                                            if (res.ok) {
                                                                const data = await res.json();
                                                                if (data.url) {
                                                                    await feedService.update(post.id, { metadata: { ...post.metadata, eventRegistrationLink: data.url } });
                                                                    alert('Application guide updated!');
                                                                    window.location.reload();
                                                                }
                                                            }
                                                        } catch (err) {
                                                            console.error('Upload failed', err);
                                                        }
                                                    }} 
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {post && (
                <EditPostModal 
                    postId={post.id} 
                    isOpen={isEditModalOpen} 
                    onClose={() => setIsEditModalOpen(false)} 
                    onSuccess={() => window.location.reload()} 
                />
            )}
        </UniversityLayout>
    );
};

export default UniversityPostDetails;
