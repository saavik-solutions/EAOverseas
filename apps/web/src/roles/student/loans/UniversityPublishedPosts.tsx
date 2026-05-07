import React from 'react';
import { useNavigate } from 'react-router-dom';
import UniversityLayout from '@/layouts/UniversityLayout';
import { usePosts } from '@/shared/contexts/PostsContext';
import { useAuth } from '@/shared/contexts/AuthContext';

const UniversityPublishedPosts = () => {
    const { posts } = usePosts();
    const { user } = useAuth();
    const navigate = useNavigate();

    const universityName = user?.university?.trim().toLowerCase();

    // Filter posts for this university that are published
    const universityPosts = posts.filter(p =>
        p.institution?.trim().toLowerCase() === universityName &&
        p.status === 'Published'
    );

    return (
        <UniversityLayout title="Published Posts">
            <div className="p-8 max-w-7xl mx-auto w-full space-y-8 font-['Public_Sans']">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Published Posts</h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">View how your posts appear to students on the global feed.</p>
                    </div>
                    <button
                        onClick={() => navigate('/university/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        Back to Dashboard
                    </button>
                </div>

                {universityPosts.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-20 flex flex-col items-center justify-center text-center">
                        <div className="size-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl text-slate-300">post_add</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No published posts yet</h3>
                        <p className="text-slate-500 max-w-sm mb-8">You haven't published any posts yet. Create your first post in the Post Center to start reaching students.</p>
                        <button
                            onClick={() => navigate('/university/post-center')}
                            className="px-6 py-3 bg-[#1E63F3] text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200"
                        >
                            Go to Post Center
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {universityPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-500/30 transition-all duration-300 group flex flex-col h-full">
                                {/* Banner Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.banner}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 capitalize px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black tracking-tight text-[#1E63F3] border border-blue-50">
                                        {post.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1 gap-4">
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg text-slate-900 leading-tight line-clamp-2 group-hover:text-[#1E63F3] transition-colors">
                                            {post.title}
                                        </h3>
                                        {post.grid && post.grid.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.grid.slice(0, 2).map((item, idx) => (
                                                    <span key={idx} className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                                        {item.value}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-2 italic" dangerouslySetInnerHTML={{ __html: post.about }}></div>

                                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {post.tags?.slice(0, 3).map((tag, i) => (
                                                <div key={i} className="size-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400">
                                                    #{tag.replace('#', '').substring(0, 1)}
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => navigate('/university/post-center')}
                                            className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#1E63F3] transition-colors"
                                        >
                                            Edit Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </UniversityLayout>
    );
};

export default UniversityPublishedPosts;
