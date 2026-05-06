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
}

const ShareModal: React.FC<ShareModalProps> = ({
    isOpen,
    onClose,
    title = "Share",
    shareUrl,
    preview
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
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-[17px] font-bold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-7">
                    {/* Preview Box */}
                    <div className="flex items-center gap-4 p-4 bg-[#fcfcfc] border border-gray-100 rounded-2xl">
                        <div className="size-12 rounded-xl bg-white border border-gray-100/50 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                            {preview.image ? (
                                <img src={preview.image} alt="" className="w-full h-full object-cover" />
                            ) : typeof preview.icon === 'string' ? (
                                <img src={preview.icon} alt="" className="w-full h-full object-contain p-2" />
                            ) : preview.icon ? (
                                preview.icon
                            ) : (
                                <span className="material-symbols-outlined text-gray-300 text-[28px]">share</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <h4 className="text-[15px] font-bold text-gray-800 leading-snug mb-0.5 line-clamp-1">{preview.title}</h4>
                            <p className="text-[13px] text-gray-400 font-medium">{preview.subtitle}</p>
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

                    {/* Social Share */}
                    <div className="text-left">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">SHARE TO SOCIAL</label>
                        <div className="grid grid-cols-4 gap-3">
                            <button
                                onClick={() => shareToSocial('linkedin')}
                                className="aspect-[1.8/1] rounded-xl bg-[#0077b5] flex items-center justify-center text-white hover:brightness-105 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <i className="fa-brands fa-linkedin-in text-xl"></i>
                            </button>
                            <button
                                onClick={() => shareToSocial('facebook')}
                                className="aspect-[1.8/1] rounded-xl bg-[#1877f2] flex items-center justify-center text-white hover:brightness-105 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <i className="fa-brands fa-facebook-f text-xl"></i>
                            </button>
                            <button
                                onClick={() => shareToSocial('twitter')}
                                className="aspect-[1.8/1] rounded-xl bg-[#1da1f2] flex items-center justify-center text-white hover:brightness-105 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <i className="fa-brands fa-twitter text-xl"></i>
                            </button>
                            <button
                                onClick={() => shareToSocial('whatsapp')}
                                className="aspect-[1.8/1] rounded-xl bg-[#25d366] flex items-center justify-center text-white hover:brightness-105 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <i className="fa-brands fa-whatsapp text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
