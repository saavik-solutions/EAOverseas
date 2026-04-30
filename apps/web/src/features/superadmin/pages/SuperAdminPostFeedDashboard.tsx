import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { feedService, PostResponse } from '@/features/feed/services/feedService';
import { usePosts, Post } from '@/features/feed/services/PostsContext';
import { universityService, UniversityData } from '@/features/colleges/services/universityService';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

const TYPE_COLORS: Record<string, string> = {
    Article: 'bg-blue-100 text-blue-700',
    Scholarship: 'bg-indigo-100 text-indigo-700',
    Announcement: 'bg-orange-100 text-orange-700',
    Event: 'bg-pink-100 text-pink-700',
    Guide: 'bg-teal-100 text-teal-700',
    News: 'bg-sky-100 text-sky-700',
    Webinar: 'bg-violet-100 text-violet-700',
};

const STATUS_COLORS: Record<string, string> = {
    Published: 'bg-emerald-100 text-emerald-700',
    Draft: 'bg-slate-100 text-slate-600',
    Archived: 'bg-rose-100 text-rose-700',
    'Under Review': 'bg-yellow-100 text-yellow-700',
};

type ViewMode = 'grid' | 'table';
type FilterType = 'All' | 'Article' | 'Scholarship' | 'Announcement' | 'Event' | 'Guide' | 'News' | 'Webinar';

const SuperAdminPostFeedDashboard = () => {
    const navigate = useNavigate();
    const { deletePost } = usePosts();
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [filterType, setFilterType] = useState<FilterType>('All');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [filterUniversity, setFilterUniversity] = useState('All');
    const [search, setSearch] = useState('');
    const [universities, setUniversities] = useState<UniversityData[]>([]);
    const [apiPosts, setApiPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshData = async () => {
        setLoading(true);
        try {
            const [uniRes, feedRes] = await Promise.all([
                universityService.getAll(),
                feedService.getAll()
            ]);
            setUniversities(uniRes.universities || []);

            // Map API posts to UI Post interface
            const mapped: Post[] = feedRes.map((p: any) => ({
                id: p._id,
                title: p.title,
                about: p.content,
                institution: p.universityName || p.authorId?.name || 'EA Overseas',
                logo: p.universityLogo || p.authorId?.avatarUrl || 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=100&h=100&fit=crop',
                banner: p.mediaUrls?.[0] || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&h=400&fit=crop',
                location: p.location || 'Global',
                tags: p.tags || [],
                category: p.category || 'Article',
                status: 'Published',
                grid: [
                    { label: 'Views', value: p.viewCount.toString() },
                    { label: 'Upvotes', value: p.score.toString() },
                    { label: 'Comments', value: p.commentCount.toString() }
                ]
            }));
            setApiPosts(mapped);
        } catch (err) {
            console.error('Data sync failed', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const filtered = apiPosts.filter(p => {
        const type = p.category || p.label;
        const matchType = filterType === 'All' || type === filterType;
        const matchStatus = filterStatus === 'All' || p.status === filterStatus;
        const matchUniversity = filterUniversity === 'All' || p.institution === filterUniversity;
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.institution.toLowerCase().includes(search.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        return matchType && matchStatus && matchSearch && matchUniversity;
    });

    const formatValue = (val: number) => {
        if (val >= 1000) return (val / 1000).toFixed(1) + 'k';
        return val.toString();
    };

    const totalReach = apiPosts.reduce((acc, p) => {
        const viewItem = p.grid.find(i => i.label === 'Views');
        return acc + (viewItem ? parseInt(viewItem.value.replace(/,/g, '')) || 0 : 0);
    }, 0);

    const stats = [
        { label: 'Live Posts', value: apiPosts.length, icon: 'article', color: 'text-blue-600 bg-blue-50' },
        { label: 'Published', value: apiPosts.filter(p => p.status === 'Published').length, icon: 'check_circle', color: 'text-emerald-600 bg-emerald-50' },
        { label: 'Active Partners', value: new Set(apiPosts.map(p => p.institution)).size, icon: 'hub', color: 'text-purple-600 bg-purple-50' },
        { label: 'System Reach', value: formatValue(totalReach), icon: 'visibility', color: 'text-orange-600 bg-orange-50' },
    ];

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to permanently remove this post from the cloud?')) {
            try {
                await feedService.delete(id);
                setApiPosts(prev => prev.filter(p => p.id !== id));
            } catch (err) {
                console.error('Delete failed', err);
            }
        }
    };

    return (
        <SuperAdminLayout hideHeader={true}>
            <div className="flex-1 bg-slate-50 min-h-screen">
            <PageHeader
                title="Post & Feed Dashboard"
                breadcrumbs={[
                    { label: 'University Portal' },
                    { label: 'Posts & Feed' }
                ]}
                actions={
                    <div className="flex items-center gap-2">
                        <button
                            onClick={refreshData}
                            disabled={loading}
                            className={`p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 transition-all hover:bg-white flex items-center justify-center ${loading ? 'animate-spin opacity-50' : ''}`}
                            title="Synchronize Live Data"
                        >
                            <span className="material-symbols-outlined text-[20px]">sync</span>
                        </button>
                        <button
                            onClick={() => navigate('/Superadmin/university-portal/posts-feed/new')}
                            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-black hover:bg-black transition-all shadow-md active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            New Post
                        </button>
                    </div>
                }
            />

            <div className="p-6 space-y-6">

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map(s => (
                        <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`size-12 rounded-xl flex items-center justify-center ${s.color}`}>
                                <span className="material-symbols-outlined">{s.icon}</span>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-slate-900">{s.value}</div>
                                <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters & Controls */}
                <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    {/* Search */}
                    <div className="relative w-full lg:w-80">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">search</span>
                        <input
                            type="text"
                            placeholder="Search posts, authors, tags..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/10 focus:border-[#2b6cee] transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
                        {/* University filter */}
                        <div className="relative min-w-[160px]">
                            <select
                                value={filterUniversity}
                                onChange={e => setFilterUniversity(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 hover:border-slate-300 transition-all outline-none focus:ring-2 focus:ring-[#2b6cee]/10 appearance-none pr-10"
                            >
                                <option value="All">All Universities</option>
                                {universities.map(u => <option key={u._id} value={u.name}>{u.name}</option>)}
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">unfold_more</span>
                        </div>

                        {/* Status filter */}
                        <div className="relative min-w-[140px]">
                            <select
                                value={filterStatus}
                                onChange={e => setFilterStatus(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 hover:border-slate-300 transition-all outline-none focus:ring-2 focus:ring-[#2b6cee]/10 appearance-none pr-10"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                                <option value="Archived">Archived</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">filter_list</span>
                        </div>

                        {/* View toggle */}
                        <div className="flex gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 ml-auto lg:ml-0">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-[#2b6cee] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-[#2b6cee] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">table_rows</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sub-tabs */}
                <div className="flex gap-8 border-b border-slate-200 px-2">
                    {(['All', 'Article', 'Scholarship', 'Announcement', 'Event', 'Guide'] as FilterType[]).map(t => (
                        <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={`pb-4 px-1 text-xs font-black uppercase tracking-widest transition-all relative ${filterType === t ? 'text-[#2b6cee]' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {t}
                            {filterType === t && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#2b6cee] rounded-full" />}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                {viewMode === 'grid' ? (
                    filterType === 'Scholarship' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map(post => (
                                <ScholarshipCard key={post.id} data={post} onManage={() => navigate(`/Superadmin/university-portal/posts-feed/${post.id}`)} />
                            ))}
                            {filtered.length === 0 && <EmptyState />}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filtered.map(post => (
                                <PostCard key={post.id} post={post} onManage={() => navigate(`/Superadmin/university-portal/posts-feed/${post.id}`)} />
                            ))}
                            {filtered.length === 0 && <EmptyState />}
                        </div>
                    )
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/50">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Post Information</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filtered.map(post => (
                                        <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-900 text-sm truncate max-w-[200px]">{post.title}</p>
                                                <div className="flex gap-1 mt-1.5">
                                                    {post.tags.slice(0, 2).map(t => (
                                                        <span key={t} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{t}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full flex items-center justify-center bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                                        <img src={post.logo} alt="" className="size-full object-contain p-1" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-700">{post.institution}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${TYPE_COLORS[post.category || post.label]}`}>{post.category || post.label}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${STATUS_COLORS[post.status || 'Published']}`}>{post.status || 'Published'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => navigate(`/Superadmin/university-portal/posts-feed/${post.id}`)} className="size-8 rounded-lg bg-blue-50 text-[#2b6cee] flex items-center justify-center hover:bg-[#2b6cee] hover:text-white transition-all">
                                                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                                                    </button>
                                                    <button onClick={() => handleDelete(post.id)} className="size-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filtered.length === 0 && <div className="py-20 text-center"><EmptyState /></div>}
                        </div>
                    </div>
                )}

            </div>
            </div>
        </SuperAdminLayout>
    );
};

// ─── Helper Components ────────────────────────────────────────────────────────

const PostCard = ({ post, onManage }: { post: Post; onManage: () => void }) => (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer" onClick={onManage}>
        <div className="relative h-48 overflow-hidden bg-slate-100">
            <img src={post.banner || post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4 flex gap-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl backdrop-blur-md ${TYPE_COLORS[post.category || post.label]} border-white/20 shadow-sm`}>
                    {post.category || post.label}
                </span>
            </div>
            <button className="absolute top-4 right-4 size-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-[#2b6cee] transition shadow-lg opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300">
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
            </button>
        </div>

        <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2.5 mb-3">
                <div className="size-7 rounded-full flex items-center justify-center bg-white border border-slate-100 shadow-sm p-1 shrink-0 overflow-hidden">
                    <img src={post.logo} alt="" className="size-full object-contain" />
                </div>
                <span className="text-xs font-bold text-slate-500 truncate">{post.institution}</span>
                {post.verified && <span className="material-symbols-outlined text-[14px] text-blue-500 filled">verified</span>}
            </div>

            <h3 className="font-black text-slate-900 text-base leading-tight line-clamp-2 mb-4 group-hover:text-[#2b6cee] transition-colors">{post.title}</h3>

            <div className="flex flex-wrap gap-2 mb-auto">
                {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-100">{tag}</span>
                ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-t border-slate-100 mt-5 pt-4">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-[#2b6cee] opacity-70">pin_drop</span>{post.location}</span>
                <button className="text-[#2b6cee] flex items-center gap-1 hover:gap-2 transition-all">
                    Manage <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
            </div>
        </div>
    </div>
);

const ScholarshipCard = ({ data, onManage }: { data: Post; onManage: () => void }) => (
    <div className="bg-white rounded-[32px] p-6 border border-slate-200 hover:border-[#2b6cee]/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group relative flex flex-col h-full cursor-pointer" onClick={onManage}>
        {/* University Header */}
        <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-slate-50 border border-slate-100 p-2 group-hover:border-blue-100 transition-colors overflow-hidden">
                    <img src={data.logo} alt={data.institution} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-black text-slate-900 border-b-2 border-orange-400 uppercase tracking-tighter max-w-[120px] truncate">{data.institution}</span>
                        {data.verified && (
                            <span className="bg-blue-50 text-[#2b6cee] text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                                <span className="size-1 bg-[#2b6cee] rounded-full animate-pulse" /> VERIFIED
                            </span>
                        )}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{data.location}</span>
                </div>
            </div>
        </div>

        {/* Badge & Title */}
        <div className="mb-6">
            <span className="text-[9px] font-black text-[#2b6cee] tracking-[0.2em] uppercase mb-2 block">Scholarship Offering</span>
            <h3 className="text-xl font-black text-slate-900 leading-[1.1] mb-2 group-hover:text-[#2b6cee] transition-colors">{data.title}</h3>
            <div className="w-12 h-1 bg-[#2b6cee] rounded-full group-hover:w-20 transition-all duration-500" />
        </div>

        {/* Details List */}
        <div className="space-y-4 mb-4">
            {data.grid.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className={`size-8 rounded-xl flex items-center justify-center ${i === 0 ? 'bg-blue-50 text-[#2b6cee]' : i === 1 ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}`}>
                        <span className="material-symbols-outlined text-[18px]">
                            {item.label === 'Deadline' ? 'schedule' : item.label === 'Funding' ? 'payments' : 'info'}
                        </span>
                    </div>
                    <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                        <p className="text-xs font-black text-slate-700">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${STATUS_COLORS[data.status || 'Published']}`}>
                {data.status || 'Published'}
            </span>
            <button className="bg-[#2b6cee] text-white px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-2 group-hover:pr-6 duration-300">
                Manage <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
            </button>
        </div>
    </div>
);

const EmptyState = () => (
    <div className="col-span-full py-20 bg-white rounded-[32px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
            <span className="material-symbols-outlined text-4xl">folder_off</span>
        </div>
        <h4 className="text-lg font-black text-slate-900">No matching posts</h4>
        <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search terms.</p>
    </div>
);

export default SuperAdminPostFeedDashboard;
