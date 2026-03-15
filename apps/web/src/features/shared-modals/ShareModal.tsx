import React from 'react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    shareUrl: string;
    preview: {
        title: string;
        subtitle: string;
        image: string;
    };
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, shareUrl, preview }) => {
    if (!isOpen) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6">
                    {/* Preview Card */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-6 flex items-center gap-4">
                        <img src={preview.image} alt="" className="size-16 rounded-lg object-cover border border-slate-200" />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-900 truncate">{preview.title}</h4>
                            <p className="text-xs text-slate-500 truncate">{preview.subtitle}</p>
                        </div>
                    </div>

                    {/* Social Share Buttons */}
                    <div className="grid grid-cols-5 gap-3 mb-8">

                        {/* WhatsApp */}
                        <a href={`https://wa.me/?text=${encodeURIComponent(preview.title + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform" style={{ background: '#25D366' }}>
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                                    <path d="M12.048 1.003C5.93 1.003 1.003 5.93 1.003 12.047c0 2.077.543 4.023 1.49 5.699L1 23l5.393-1.415A11.012 11.012 0 0012.048 23C18.166 23 23 18.072 23 11.955c0-6.118-4.834-10.952-10.952-10.952zm0 20.117a9.17 9.17 0 01-4.672-1.278l-.335-.2-3.2.84.852-3.11-.22-.348a9.165 9.165 0 01-1.406-4.977c0-5.063 4.12-9.183 9.183-9.183s9.183 4.12 9.183 9.183-4.12 9.073-9.385 9.073z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">WhatsApp</span>
                        </a>

                        {/* Facebook */}
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform" style={{ background: '#1877F2' }}>
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Facebook</span>
                        </a>

                        {/* X (Twitter) */}
                        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(preview.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform bg-black">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Twitter/X</span>
                        </a>

                        {/* LinkedIn */}
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(preview.title)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform" style={{ background: '#0A66C2' }}>
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">LinkedIn</span>
                        </a>

                        {/* Telegram */}
                        <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(preview.title)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform" style={{ background: '#26A5E4' }}>
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Telegram</span>
                        </a>

                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Direct Link</label>
                        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg border border-slate-200">
                            <input
                                readOnly
                                value={shareUrl}
                                className="bg-transparent border-none flex-1 px-3 py-2 text-sm text-slate-600 outline-none"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="bg-white px-4 py-2 rounded-md shadow-sm text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors border border-slate-200"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
