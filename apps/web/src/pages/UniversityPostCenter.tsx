import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { feedService } from '../services/feedService';
import { universityService, UniversityData } from '../services/universityService';
import { usePosts, Post } from '../shared/contexts/PostsContext';
import UniversityLayout from '../layouts/UniversityLayout';

const TYPE_COLORS: Record<string, string> = {
    Article: 'bg-blue-100 text-blue-700',
    Scholarship: 'bg-indigo-100 text-indigo-700',
    Announcement: 'bg-orange-100 text-orange-700',
    Event: 'bg-pink-100 text-pink-700',
    Guide: 'bg-teal-100 text-teal-700',
    News: 'bg-sky-100 text-sky-700',
    Webinar: 'bg-violet-100 text-violet-700',
    Program: 'bg-emerald-100 text-emerald-700',
};

const STATUS_COLORS: Record<string, string> = {
    Published: 'bg-emerald-100 text-emerald-700',
    Draft: 'bg-slate-100 text-slate-600',
    Archived: 'bg-rose-100 text-rose-700',
    'Under Review': 'bg-yellow-100 text-yellow-700',
};

type ViewMode = 'grid' | 'table';
type FilterType = 'All' | 'Article' | 'Scholarship' | 'Announcement' | 'Event' | 'Guide' | 'News' | 'Webinar' | 'Program';

const UniversityPostCenter = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const navigate = useNavigate();
    const { deletePost } = usePosts();
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [filterType, setFilterType] = useState<FilterType>('All');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [search, setSearch] = useState('');
    const [apiPosts, setApiPosts] = useState<Post[]>([]);
    const [currentUni, setCurrentUni] = useState<UniversityData | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshData = async () => {
        setLoading(true);
        try {
            const uniRes = await universityService.getAll();
            const uniData = uniRes.universities?.find((u: any) => 
                u.name.toLowerCase().replace(/\s+/g, '-') === universityName
            );
            setCurrentUni(uniData || null);

            const feedRes = await feedService.getAll();
            
            // Map and filter posts for this specific university
            const mapped: Post[] = feedRes
                .filter((p: any) => {
                    const uniSlug = universityName?.toLowerCase();
                    const postUniName = p.universityName?.toLowerCase().replace(/\s+/g, '-');
                    const authorName = p.authorId?.name?.toLowerCase().replace(/\s+/g, '-');
                    return postUniName === uniSlug || authorName === uniSlug;
                })
                .map((p: any) => ({
                    id: p._id,
                    title: p.title,
                    about: p.content,
                    institution: p.universityName || p.authorId?.name || 'Partner',
                    logo: p.universityLogo || p.authorId?.avatarUrl || 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=100&h=100&fit=crop',
                    banner: p.mediaUrls?.[0] || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&h=400&fit=crop',
                    location: p.location || 'Global',
                    tags: p.tags || [],
                    category: p.category || 'Article',
                    status: (p.status?.charAt(0).toUpperCase() + p.status?.slice(1)) || 'Published',
                    grid: [
                        { label: 'Views', value: (p.viewCount || 0).toString() },
                        { label: 'Upvotes', value: (p.score || 0).toString() },
                        { label: 'Comments', value: (p.commentCount || 0).toString() }
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
    }, [universityName]);

    const filtered = apiPosts.filter(p => {
        const matchType = filterType === 'All' || p.category === filterType;
        const matchStatus = filterStatus === 'All' || p.status === filterStatus;
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        return matchType && matchStatus && matchSearch;
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
        { label: 'Uni Posts', value: apiPosts.length, icon: 'article', color: 'text-blue-600 bg-blue-50' },
        { label: 'Published', value: apiPosts.filter(p => p.status === 'Published').length, icon: 'check_circle', color: 'text-emerald-600 bg-emerald-50' },
        { label: 'Total Reach', value: formatValue(totalReach), icon: 'visibility', color: 'text-orange-600 bg-orange-50' },
        { label: 'Engagement', value: apiPosts.reduce((acc, p) => acc + (parseInt(p.grid[1].value) || 0), 0), icon: 'favorite', color: 'text-rose-600 bg-rose-50' },
    ];

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to remove this post?')) {
            try {
                await deletePost(id);
                setApiPosts(prev => prev.filter(p => p.id !== id));
            } catch (err) {
                console.error('Delete failed', err);
            }
        }
    };

    return (
        <UniversityLayout universityName={currentUni?.name || 'University'} pageTitle="Post Center">
            <div className="flex-1 bg-slate-50 min-h-screen">
                <PageHeader
                    title="Post Center"
                    breadcrumbs={[
                        { label: 'University Panel' },
                        { label: 'Post Center' }
                    ]}
                    actions={
                        <div className="flex items-center gap-2">
                            <button onClick={refreshData} disabled={loading} className={`p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 transition-all hover:bg-white flex items-center justify-center ${loading ? 'animate-spin' : ''}`}>
                                <span className="material-symbols-outlined text-[20px]">sync</span>
                            </button>
                            <button
                                onClick={() => navigate(`/university-panel/${universityName}/post-center/new`)}
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
                            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm">
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

                    {/* Filters */}
                    <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="relative w-full lg:w-80">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">search</span>
                            <input
                                type="text"
                                placeholder="Search your posts..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/10 focus:border-[#2b6cee] transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
                            <div className="relative min-w-[140px]">
                                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 appearance-none pr-10">
                                    <option value="All">All Statuses</option>
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Under Review">Under Review</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">filter_list</span>
                            </div>

                            <div className="flex gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white text-[#2b6cee] shadow-sm' : 'text-slate-400'}`}>
                                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                                </button>
                                <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-white text-[#2b6cee] shadow-sm' : 'text-slate-400'}`}>
                                    <span className="material-symbols-outlined text-[18px]">table_rows</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sub-tabs */}
                    <div className="flex gap-8 border-b border-slate-200 px-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {(['All', 'Article', 'Scholarship', 'Program', 'Announcement', 'Event', 'Guide'] as FilterType[]).map(t => (
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

                    {/* Content */}
                    {loading ? (
                        <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-[0.2em] animate-pulse">Syncing institutional records...</div>
                    ) : viewMode === 'grid' ? (
                        filterType === 'Scholarship' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filtered.map(post => (
                                    <ScholarshipCard key={post.id} data={post} onManage={() => navigate(`/university-panel/${universityName}/post-center/${post.id}`)} />
                                ))}
                                {filtered.length === 0 && <EmptyState />}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filtered.map(post => (
                                    <PostCard key={post.id} post={post} onManage={() => navigate(`/university-panel/${universityName}/post-center/${post.id}`)} />
                                ))}
                                {filtered.length === 0 && <EmptyState />}
                            </div>
                        )
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/50">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stats</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filtered.map(post => (
                                        <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-900 text-sm truncate max-w-[250px]">{post.title}</p>
                                                <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase">{post.tags.slice(0, 2).join(' • ') || 'No Tags'}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${TYPE_COLORS[post.category || 'Article']}`}>{post.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-4">
                                                    {post.grid.slice(0, 2).map((g, i) => (
                                                        <div key={i} className="text-center">
                                                            <p className="text-[9px] font-black text-slate-400 uppercase">{g.label}</p>
                                                            <p className="text-xs font-black text-slate-700">{g.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg ${STATUS_COLORS[post.status || 'Published']}`}>{post.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => navigate(`/university-panel/${universityName}/post-center/${post.id}`)} className="size-8 rounded-lg bg-blue-50 text-[#2b6cee] flex items-center justify-center hover:bg-[#2b6cee] hover:text-white transition-all"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                                                    <button onClick={() => handleDelete(post.id)} className="size-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filtered.length === 0 && <div className="py-20 text-center"><EmptyState /></div>}
                        </div>
                    )}
                </div>
            </div>
        </UniversityLayout>
    );
};

const PostCard = ({ post, onManage }: { post: Post; onManage: () => void }) => (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full cursor-pointer" onClick={onManage}>
        <div className="relative h-44 overflow-hidden bg-slate-100">
            <img src={post.banner} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-4 left-4">
                <span className={`text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl backdrop-blur-md border-white/20 shadow-sm ${TYPE_COLORS[post.category || 'Article']}`}>{post.category}</span>
            </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
            <h3 className="font-black text-slate-900 text-sm leading-tight line-clamp-2 mb-4 group-hover:text-[#2b6cee] transition-colors">{post.title}</h3>
            <div className="flex flex-wrap gap-1.5 mb-auto">
                {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-slate-50 text-slate-400 text-[9px] font-black px-2 py-0.5 rounded border border-slate-100 uppercase uppercase">{tag}</span>
                ))}
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-t border-slate-100 mt-4 pt-4">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> {post.grid[0].value}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">campaign</span> {post.status}</span>
                </div>
                <span className="material-symbols-outlined text-[#2b6cee]">arrow_right_alt</span>
            </div>
        </div>
    </div>
);

const ScholarshipCard = ({ data, onManage }: { data: Post; onManage: () => void }) => (
    <div className="bg-white rounded-[32px] p-6 border border-slate-200 hover:border-[#2b6cee]/30 hover:shadow-xl transition-all group flex flex-col h-full cursor-pointer" onClick={onManage}>
        <div className="mb-4">
            <span className="text-[9px] font-black text-[#2b6cee] tracking-[0.2em] uppercase mb-1 block">Institutional Scholarship</span>
            <h3 className="text-lg font-black text-slate-900 leading-tight mb-2 group-hover:text-[#2b6cee] transition-colors">{data.title}</h3>
            <div className="w-10 h-1 bg-[#2b6cee] rounded-full" />
        </div>
        <div className="space-y-3 mb-4">
            {data.grid.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="size-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">
                            {item.label === 'Views' ? 'visibility' : item.label === 'Upvotes' ? 'favorite' : 'info'}
                        </span>
                    </div>
                    <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                        <p className="text-xs font-black text-slate-700">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${STATUS_COLORS[data.status || 'Published']}`}>{data.status}</span>
            <button className="bg-slate-900 text-white size-8 rounded-full flex items-center justify-center hover:bg-[#2b6cee] transition-colors shadow-lg shadow-slate-200">
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
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
        <p className="text-slate-400 text-sm mt-1">Ready to share an update? Click "New Post" to get started.</p>
    </div>
);

export default UniversityPostCenter;
