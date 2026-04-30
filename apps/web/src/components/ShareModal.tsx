import React, { useState } from 'react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    shareUrl: string;
    preview: {
        title: string;
        subtitle: string;
        icon?: string | React.ReactNode;
        image?: string;
    };
    postData?: {
        author: string;
        time: string;
        title: string;
        content: string;
        category: string;
        tags: string[];
        avatar?: string;
    };
}

const ShareModal: React.FC<ShareModalProps> = ({
    isOpen,
    onClose,
    title = "Share",
    shareUrl,
    preview,
    postData
}) => {
    const [copyBtnText, setCopyBtnText] = useState('Copy Link');

    if (!isOpen) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopyBtnText('Copied!');
        setTimeout(() => setCopyBtnText('Copy Link'), 2000);
    };

    const shareToSocial = (platform: string) => {
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedTitle = encodeURIComponent(preview.title);
        let url = '';

        switch (platform) {
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case 'whatsapp':
                url = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
                break;
        }
        if (url) window.open(url, '_blank');
    };

    const isDiscussion = title.toLowerCase().includes('discussion');

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100 flex flex-col max-h-[95vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                    <h3 className="text-[17px] font-bold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6 scrollbar-hide">
                    {/* Post Snapshot Area (Scaled down for preview) */}
                    {postData && (
                        <div className="flex justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 overflow-hidden py-6">
                            <div className="scale-[0.65] origin-center -my-24">
                                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 w-[500px]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="size-12 rounded-full bg-gradient-to-br from-red-500 to-orange-600 text-white flex items-center justify-center text-[15px] font-black shrink-0 overflow-hidden shadow-sm border border-white/20">
                                            {postData.avatar ? (
                                                <img src={postData.avatar} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                postData.author.split(' ').map(n => n[0]).join('').toUpperCase()
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-black text-gray-900 leading-none mb-1.5">{postData.author}</p>
                                            <p className="text-[12px] font-bold text-gray-400 leading-none">{postData.time || new Date().toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                                        {postData.title}
                                    </h2>
                                    
                                    <p className="text-[16px] text-gray-500 font-medium leading-relaxed mb-8 whitespace-pre-wrap">
                                        {postData.content}
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[12px] font-black uppercase tracking-wider border border-blue-100">
                                            {postData.category}
                                        </span>
                                        {postData.tags?.map(tag => (
                                            <span key={tag} className="text-[12px] font-bold text-gray-400">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Share Buttons */}
                    <div className="text-left">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">SHARE TO SOCIAL</label>
                        <div className="grid grid-cols-4 gap-3">
                            <button
                                onClick={() => shareToSocial('whatsapp')}
                                className="aspect-[2/1] rounded-xl bg-[#25d366] flex items-center justify-center text-white hover:brightness-105 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <i className="fa-brands fa-whatsapp text-xl"></i>
                            </button>
                            <button
                                onClick={() => shareToSocial('linkedin')}
                                className="aspect-[2/1] rounded-xl bg-[#0077b5] flex items-center justify-center text-white hover:brightness-105 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <i className="fa-brands fa-linkedin-in text-xl"></i>
                            </button>
                            <button
                                onClick={() => shareToSocial('twitter')}
                                className="aspect-[2/1] rounded-xl bg-[#000000] flex items-center justify-center text-white hover:brightness-105 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <i className="fa-brands fa-x-twitter text-xl"></i>
                            </button>
                            <button
                                onClick={() => shareToSocial('facebook')}
                                className="aspect-[2/1] rounded-xl bg-[#1877f2] flex items-center justify-center text-white hover:brightness-105 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <i className="fa-brands fa-facebook-f text-xl"></i>
                            </button>
                        </div>
                    </div>

                    {/* Link Section */}
                    <div className="text-left">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                            {isDiscussion ? 'DISCUSSION LINK' : 'SHARE LINK'}
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 bg-[#f8f9fa] border border-gray-200 rounded-xl relative group-focus-within:border-blue-400/50 transition-colors">
                                <span className="material-symbols-outlined text-gray-400 text-[18px]">link</span>
                                <input
                                    readOnly
                                    value={shareUrl}
                                    className="bg-transparent border-none text-[14px] text-gray-600 w-full focus:ring-0 p-0 truncate font-medium"
                                />
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className={`px-5 py-2.5 rounded-xl text-[14px] font-bold border transition-all shadow-sm shrink-0 ${copyBtnText === 'Copied!' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                            >
                                {copyBtnText === 'Copied!' ? 'Copied' : 'Copy Link'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="px-12 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-md"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
