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
    title = "Share Discussion",
    shareUrl,
    preview,
    postData
}) => {
    const [copyBtnText, setCopyBtnText] = useState('Copy');

    if (!isOpen) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopyBtnText('Copied!');
        setTimeout(() => setCopyBtnText('Copy'), 2000);
    };

    const shareToSocial = (platform: string) => {
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedTitle = encodeURIComponent(preview?.title || postData?.title || 'Share');
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
            case 'telegram':
                url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
                break;
        }
        if (url) window.open(url, '_blank');
    };

    const displayTitle = postData?.title || preview?.title || 'testing';
    const displaySubtitle = postData ? 'EAOverseas Community' : preview?.subtitle || 'EAOverseas Community';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[24px] w-full max-w-[460px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h3 className="text-[18px] font-bold text-[#111827]">{title}</h3>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                </div>

                <div className="p-8 flex flex-col gap-8">
                    {/* Post Snapshot Card */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="w-16 h-16 rounded-xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center shrink-0">
                             {postData?.avatar || preview?.image ? (
                                <img src={postData?.avatar || preview?.image} alt="" className="w-full h-full object-cover" />
                             ) : (
                                <div className="w-full h-full bg-gray-50"></div>
                             )}
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-[16px] font-bold text-[#111827] leading-tight mb-1 line-clamp-1">{displayTitle}</h4>
                            <p className="text-[13px] text-[#6b7280]">{displaySubtitle}</p>
                        </div>
                    </div>

                    {/* Social Share Buttons */}
                    <div className="flex justify-between items-center px-2">
                        <button onClick={() => shareToSocial('whatsapp')} className="flex flex-col items-center gap-3 group">
                            <div className="w-[52px] h-[52px] rounded-full bg-[#25d366] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                                <i className="fa-brands fa-whatsapp text-[28px]"></i>
                            </div>
                            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">WhatsApp</span>
                        </button>
                        
                        <button onClick={() => shareToSocial('facebook')} className="flex flex-col items-center gap-3 group">
                            <div className="w-[52px] h-[52px] rounded-full bg-[#1877f2] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                                <i className="fa-brands fa-facebook-f text-[24px]"></i>
                            </div>
                            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">Facebook</span>
                        </button>
                        
                        <button onClick={() => shareToSocial('twitter')} className="flex flex-col items-center gap-3 group">
                            <div className="w-[52px] h-[52px] rounded-full bg-[#000000] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                                <i className="fa-brands fa-x-twitter text-[24px]"></i>
                            </div>
                            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">Twitter/X</span>
                        </button>
                        
                        <button onClick={() => shareToSocial('linkedin')} className="flex flex-col items-center gap-3 group">
                            <div className="w-[52px] h-[52px] rounded-full bg-[#0077b5] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                                <i className="fa-brands fa-linkedin-in text-[24px]"></i>
                            </div>
                            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">LinkedIn</span>
                        </button>
                        
                        <button onClick={() => shareToSocial('telegram')} className="flex flex-col items-center gap-3 group">
                            <div className="w-[52px] h-[52px] rounded-full bg-[#229ED9] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                                <i className="fa-brands fa-telegram text-[26px] -ml-0.5"></i>
                            </div>
                            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">Telegram</span>
                        </button>
                    </div>

                    {/* Direct Link Section */}
                    <div>
                        <label className="block text-[12px] font-bold text-[#9ca3af] uppercase tracking-wider mb-2.5">DIRECT LINK</label>
                        <div className="flex items-center justify-between p-1.5 bg-[#f3f4f6] border border-[#e5e7eb] rounded-xl focus-within:border-[#d1d5db] focus-within:bg-[#f9fafb] transition-colors">
                            <input
                                readOnly
                                value={shareUrl}
                                className="bg-transparent border-none text-[14px] text-[#4b5563] w-full focus:ring-0 px-3 outline-none truncate font-medium"
                            />
                            <button
                                onClick={copyToClipboard}
                                className={`px-5 py-2.5 rounded-lg text-[14px] font-bold bg-white border shadow-sm transition-colors shrink-0 ${copyBtnText === 'Copied!' ? 'text-[#059669] border-[#059669] bg-[#ecfdf5]' : 'text-[#111827] border-[#e5e7eb] hover:bg-gray-50'}`}
                            >
                                {copyBtnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
