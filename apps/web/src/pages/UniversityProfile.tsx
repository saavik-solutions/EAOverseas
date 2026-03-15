import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ShareModal from '@/features/shared-modals/ShareModal';
import LoginModal from '@/features/auth/LoginModal';
import { useAuthAction } from '@/shared/hooks/useAuthAction';
import PageHeader from '@/components/layout/PageHeader';
import { postsData } from '@workspace/common';

interface Post {
    id: string;
    label: string;
    labelColor?: string;
    banner: string;
    logo: string;
    title: string;
    institution: string;
    location: string;
    verified: boolean;
    tags: string[];
    applyLink: string;
    grid?: {
        label: string;
        value: string;
        alert?: boolean;
        color?: string;
    }[];
    about: string;
}

const UniversityProfile = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const decodedName = decodeURIComponent(name || '');
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();

    // Filter posts for this institution
    const institutionPosts = Object.values(postsData).filter(
        (post: Post) => post.institution === decodedName
    );

    // Get institution details from the first post (assuming consistent data)
    const institutionDetails = institutionPosts.length > 0 ? institutionPosts[0] : null;

    if (!institutionDetails) {
        return (
            <div className="flex flex-col flex-1 h-full bg-[#f8f9fc]">
                <PageHeader title="Institution Profile" />
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <span className="material-symbols-outlined text-6xl mb-4">school</span>
                    <h2 className="text-xl font-semibold">Institution not found</h2>
                    <Link to="/feed" className="mt-4 text-blue-600 hover:underline">Back to Feed</Link>
                </div>
            </div>
        );
    }

    // Share Modal State (Reused from Feed logic if needed, simplified for now)
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState<Post | null>(null);
    const [copyBtnText, setCopyBtnText] = useState('Copy Link');

    const openShareModal = (post: Post) => {
        setShareData(post);
        setIsShareModalOpen(true);
        setCopyBtnText('Copy Link');
    };

    const copyToClipboard = () => {
        if (shareData) {
            navigator.clipboard.writeText(`https://eaoverseas.com/feed/${shareData.id}`);
            setCopyBtnText('Copied!');
            setTimeout(() => setCopyBtnText('Copy Link'), 2000);
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-[#f8f9fc] overflow-hidden">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <PageHeader title={decodedName} breadcrumbs={[{ label: 'Global Feed', link: '/feed' }, { label: decodedName }]} />

            <main className="flex-1 overflow-y-auto bg-gray-50 font-sans">
                <div className="max-w-5xl mx-auto p-8">

                    {/* Institution Header Card */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-white border-2 border-gray-100 p-2 shadow-sm shrink-0">
                            <img
                                src={institutionDetails.logo}
                                alt={institutionDetails.institution}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{institutionDetails.institution}</h1>
                            <div className="flex items-center gap-4 text-gray-600 mb-4">
                                <span className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full">
                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    {institutionDetails.location}
                                </span>
                                {institutionDetails.verified && (
                                    <span className="flex items-center gap-1 text-sm text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                        <span className="material-symbols-outlined text-[18px]">verified</span>
                                        Verified Institution
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-600 leading-relaxed max-w-3xl" dangerouslySetInnerHTML={{ __html: institutionDetails.about }}></p>
                        </div>
                    </div>

                    {/* Posts Section */}
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600">article</span>
                        Recent Updates & Opportunities
                        <span className="text-sm font-normal text-gray-500 ml-2">({institutionPosts.length})</span>
                    </h2>

                    <div className="grid gap-6">
                        {institutionPosts.map((post: Post) => (
                            <article
                                key={post.id}
                                onClick={() => executeAction(() => navigate(`/feed-details/${post.id}`))}
                                className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {/* Logo reused here for context, though redundant with header it helps generic card feel */}
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100 relative shrink-0">
                                            <img className="w-full h-full object-contain p-0.5" alt={`${post.institution} Logo`} src={post.logo} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{post.location}</span>
                                            <span className="text-sm font-bold text-gray-900">{post.institution}</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${post.labelColor || 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                        {post.label}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <img src={post.banner} className="w-full h-64 object-cover rounded-xl mb-4 border border-gray-100" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>

                                    {/* Grid Details */}
                                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600 mb-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        {post.grid && post.grid.map((item, idx) => (
                                            <div key={idx} className={`flex items-center gap-2 ${item.alert ? 'text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full ring-1 ring-orange-200' : ''}`}>
                                                {item.alert && <span className="material-symbols-outlined text-[16px]">schedule</span>}
                                                <span className={`${item.alert ? 'font-bold' : 'font-medium'}`}>{item.alert ? `${item.label}: ${item.value}` : item.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-gray-600 leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: post.about }}></div>
                                </div>

                                <div className="flex items-center gap-2 mb-5">
                                    {post.tags && post.tags.map((tag, idx) => (
                                        <span key={idx} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-semibold border border-gray-200">{tag}</span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); executeAction(() => { }); }}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Save"
                                        >
                                            <span className="material-symbols-outlined text-[24px]">bookmark_border</span>
                                        </button>
                                        <button onClick={() => openShareModal(post)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Share">
                                            <span className="material-symbols-outlined text-[24px]">share</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => executeAction(() => navigate(`/feed-details/${post.id}`))}
                                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            {/* Share Modal (Copied from Feed.jsx) */}
            {isShareModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-scale-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Share Opportunity</h3>
                            <button onClick={() => setIsShareModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <span className="material-symbols-outlined text-gray-500">close</span>
                            </button>
                        </div>
                        <div className="flex gap-4 justify-center mb-8">
                            {/* Social Buttons - Simplified for brevity */}
                            <button className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined">link</span></div>
                                <span className="text-xs font-medium text-gray-600">Copy Link</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <span className="material-symbols-outlined text-gray-400">link</span>
                            <input type="text" readOnly value={`https://eaoverseas.com/feed/${shareData?.id}`} className="bg-transparent text-sm text-gray-600 flex-1 outline-none" />
                            <button onClick={copyToClipboard} className="px-4 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">{copyBtnText}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UniversityProfile;

