import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import { feedService, PostResponse } from '../services/feedService';

interface HolidayRequest {
    id: number;
    title: string;
    status: 'pending' | 'approved' | 'rejected';
    consultantName?: string;
    startTime: string;
    endTime: string;
    type: string;
}

const SuperAdminVerifications = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'posts' | 'leaves'>('posts');
    const [leaveRequests, setLeaveRequests] = useState<HolidayRequest[]>([]);
    const [postRequests, setPostRequests] = useState<PostResponse[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [selectedPost, setSelectedPost] = useState<PostResponse | null>(null);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const fetchPendingPosts = async () => {
        try {
            setLoadingPosts(true);
            const data = await feedService.getAll({ status: 'pending' });
            setPostRequests(data);
        } catch (error) {
            console.error("Error loading pending posts:", error);
        } finally {
            setLoadingPosts(false);
        }
    };

    const fetchPendingLeaves = () => {
        try {
            const saved = localStorage.getItem('eao_consultant_schedule');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    const pendingLeaves = parsed.filter((item: any) => 
                        item && 
                        item.type === 'blocked' && 
                        item.title !== 'Lunch Break' && 
                        item.status === 'pending'
                    );
                    setLeaveRequests(pendingLeaves);
                }
            }
        } catch (error) {
            console.error("Error loading leave requests:", error);
        }
    };

    useEffect(() => {
        if (activeTab === 'posts') {
            fetchPendingPosts();
        } else {
            fetchPendingLeaves();
        }
    }, [activeTab]);

    const handlePostStatusUpdate = async (id: string, status: 'published' | 'rejected') => {
        try {
            setProcessingId(id);
            await feedService.updateStatus(id, status);
            setSelectedPost(null);
            fetchPendingPosts();
        } catch (error) {
            console.error(`Failed to ${status} post:`, error);
            alert(`Failed to update post status.`);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <SuperAdminLayout title="Verification Queue">
            <div className="p-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">
                    {/* Tabs / Toggle Header */}
                    <div className="flex border-b border-slate-100 p-2 bg-slate-50/50">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${
                                activeTab === 'posts'
                                    ? 'bg-white text-[#2b6cee] shadow-sm shadow-[#2b6cee]/10'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">feed</span>
                            University Post Request
                        </button>
                        <button
                            onClick={() => setActiveTab('leaves')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${
                                activeTab === 'leaves'
                                    ? 'bg-white text-[#2b6cee] shadow-sm shadow-[#2b6cee]/10'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">person_off</span>
                            Counsellor Leave Request
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 min-h-[400px]">
                        {activeTab === 'posts' ? (
                            <div className="flex flex-col gap-6 animate-fadeIn">
                                <div className="border-l-4 border-[#2b6cee] pl-4 mb-4">
                                    <h2 className="text-lg font-black text-slate-900">University Post Approvals</h2>
                                    <p className="text-sm text-slate-500 font-medium font-sans">Review and publish internal post requests from partnered universities.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-4">
                                    {loadingPosts ? (
                                        [1, 2].map(i => (
                                            <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-28 animate-pulse" />
                                        ))
                                    ) : postRequests.length > 0 ? (
                                        postRequests.map((post) => (
                                            <div key={post.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow group">
                                                <div className="flex gap-5">
                                                    <div className="size-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-[#2b6cee]/30 transition-colors overflow-hidden">
                                                        {post.coverImageUrl ? (
                                                            <img src={post.coverImageUrl} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            <span className="material-symbols-outlined text-[32px]">article</span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="bg-blue-100 text-[#2b6cee] text-[10px] font-black uppercase px-2 py-0.5 rounded italic">{post.category}</span>
                                                            <span className="text-slate-400 text-[10px] uppercase font-bold">• {new Date(post.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                        <h4 className="text-base font-black text-slate-900 line-clamp-1">{post.title}</h4>
                                                        <p className="text-xs text-slate-500 font-medium line-clamp-1 font-sans">
                                                            {post.university?.name || 'Unknown University'} • {post.author.fullName}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 w-full md:w-auto">
                                                    <button 
                                                        onClick={() => setSelectedPost(post)}
                                                        className="flex-1 md:flex-none px-6 py-2.5 text-xs font-bold text-white bg-[#2b6cee] rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all font-sans"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-20 text-center flex flex-col items-center gap-4 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
                                            <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                                                <span className="material-symbols-outlined text-4xl">inventory_2</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-lg font-black text-slate-400">Clear Inbox</h3>
                                                <p className="text-xs text-slate-500 font-medium font-sans">No pending university post requests at the moment.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6 animate-fadeIn">
                                <div className="border-l-4 border-amber-500 pl-4 mb-4">
                                    <h2 className="text-lg font-black text-slate-900">Counsellor Leave Requests</h2>
                                    <p className="text-sm text-slate-500 font-medium font-sans">Manage and review absence requests from institutional consultants.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {leaveRequests.length > 0 ? (
                                        leaveRequests.map((request) => (
                                            <div key={request.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow group">
                                                <div className="flex gap-5">
                                                    <div className="size-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-amber-500/30 transition-colors">
                                                        <span className="material-symbols-outlined text-[32px]">calendar_today</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="bg-amber-100 text-amber-600 text-[10px] font-black uppercase px-2 py-0.5 rounded italic">{request.title}</span>
                                                            <span className="text-slate-400 text-[10px] uppercase font-bold">• New Request</span>
                                                        </div>
                                                        <h4 className="text-base font-black text-slate-900">{request.consultantName || 'Elena Rodriguez'}</h4>
                                                        <p className="text-xs text-slate-500 font-medium line-clamp-1 font-sans">
                                                            Consultant • {request.startTime} - {request.endTime}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 w-full md:w-auto">
                                                    <button 
                                                        onClick={() => navigate(`/superadmin/consultants/holidays/${request.id}`)}
                                                        className="flex-1 md:flex-none px-6 py-2.5 text-xs font-bold text-white bg-amber-600 rounded-xl hover:bg-amber-700 shadow-lg shadow-amber-500/20 transition-all font-sans"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-20 text-center flex flex-col items-center gap-4 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
                                            <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                                                <span className="material-symbols-outlined text-4xl">event_available</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-lg font-black text-slate-400">All Caught Up!</h3>
                                                <p className="text-xs text-slate-500 font-medium font-sans">No pending leave requests found from any consultants.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Post Detail Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-3xl max-h-[85vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2b6cee] border-2 border-white shadow-sm">
                                    <span className="material-symbols-outlined text-[20px] font-black">verified_user</span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-base font-black text-slate-900 leading-tight">Review Post Request</h3>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{selectedPost.university?.name}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedPost(null)}
                                className="size-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 font-sans">
                            {selectedPost.coverImageUrl && (
                                <img src={selectedPost.coverImageUrl} className="w-full h-64 object-cover rounded-2xl mb-6 border border-slate-100 shadow-sm" alt="" />
                            )}
                            
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-blue-100 text-[#2b6cee] text-[11px] font-black uppercase px-2.5 py-1 rounded-lg italic tracking-wide">{selectedPost.category}</span>
                                <span className="text-slate-400 text-xs font-bold font-sans">• {new Date(selectedPost.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>

                            <h1 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{selectedPost.title}</h1>
                            
                            <div className="flex items-center gap-3 mb-8 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="size-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                                    {selectedPost.author.avatarUrl ? (
                                        <img src={selectedPost.author.avatarUrl} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 font-black text-sm">
                                            {selectedPost.author.fullName.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-slate-900">{selectedPost.author.fullName}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">University Administrator</span>
                                </div>
                            </div>

                            <div 
                                className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                            />
                        </div>

                        {/* Modal Footer / Actions */}
                        <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <button 
                                onClick={() => setSelectedPost(null)}
                                className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors font-sans"
                            >
                                Cancel Review
                            </button>
                            <div className="flex items-center gap-3">
                                <button 
                                    disabled={!!processingId}
                                    onClick={() => handlePostStatusUpdate(selectedPost.id, 'rejected')}
                                    className="px-6 py-3 text-sm font-bold text-rose-600 bg-white border-2 border-rose-100 rounded-2xl hover:bg-rose-50 transition-all font-sans disabled:opacity-50"
                                >
                                    Deny Post
                                </button>
                                <button 
                                    disabled={!!processingId}
                                    onClick={() => handlePostStatusUpdate(selectedPost.id, 'published')}
                                    className="px-8 py-3 text-sm font-bold text-white bg-[#2b6cee] rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/25 transition-all font-sans disabled:opacity-50 flex items-center gap-2"
                                >
                                    {processingId ? (
                                        <>
                                            <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Publishing...
                                        </>
                                    ) : (
                                        'Approve & Publish'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </SuperAdminLayout>
    );
};

export default SuperAdminVerifications;
