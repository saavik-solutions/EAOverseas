import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useSavedItems } from '../context/SavedItemsContext';

const SavedPosts = () => {
    const navigate = useNavigate();
    const { savedPosts, togglePost } = useSavedItems();

    const handleRemove = (post) => {
        togglePost(post);
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            <PageHeader title={
                <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Link to="/profile" className="md:hidden text-slate-500 hover:text-blue-600 mr-1 flex items-center">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </Link>
                    <Link to="/profile" className="hidden md:flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px] md:text-[20px]">home</span>
                    </Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <Link to="/profile" className="hidden md:block text-gray-500 hover:text-blue-600 transition-colors">
                        Profile
                    </Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <span className="text-[#111418] font-semibold">Saved Posts</span>
                </div>
            } />

            <div className="flex-1 overflow-y-auto w-full p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-[1000px] flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-[#111418]">Saved Posts ({savedPosts.length})</h1>
                        <button onClick={() => navigate('/feed')} className="text-blue-600 text-sm font-semibold hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                            Explore Feed
                        </button>
                    </div>

                    {savedPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {savedPosts.map((post) => (
                                <article key={post.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group relative flex flex-col">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={post.banner} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${post.labelColor || 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                                {post.label}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <img src={post.logo} alt={post.institution} className="w-6 h-6 object-contain" />
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{post.location}</span>
                                        </div>
                                        <h3 className="font-bold text-[#111418] text-lg mb-2 leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                        <div className="text-sm text-gray-500 line-clamp-2 mb-4" dangerouslySetInnerHTML={{ __html: post.about }}></div>

                                        <div className="mt-auto flex gap-3">
                                            <button
                                                onClick={() => navigate(`/feed-details/${post.id}`)}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                                            >
                                                Read Article
                                            </button>
                                            <button
                                                onClick={() => handleRemove(post)}
                                                className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                title="Remove from saved"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">bookmark_remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <div className="p-4 bg-gray-50 rounded-full mb-4">
                                <span className="material-symbols-outlined text-gray-400 text-4xl">dynamic_feed</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#111418] mb-1">No posts saved yet</h3>
                            <p className="text-slate-500 text-sm mb-6">Explore the global feed to find interesting articles and updates.</p>
                            <Link to="/feed" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                                Go to Feed
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedPosts;
