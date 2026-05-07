import React, { useState, useEffect, useRef } from 'react';
import { feedService } from '@/features/feed/services/feedService';
import { universityService } from '@/features/colleges/services/universityService';

type PostType = 'Article' | 'Scholarship' | 'Announcement' | 'Event' | 'Guide' | 'News' | 'Webinar' | 'Program';
type PostStatus = 'Draft' | 'Published' | 'Scheduled' | 'Pending';
type Visibility = 'Public' | 'Members Only' | 'University Partners' | 'Internal';

interface PostForm {
    title: string;
    postType: PostType;
    status: PostStatus;
    visibility: Visibility;
    summary: string;
    body: string;
    coverImageUrl: string;
    universityId: string;
    universityName: string;
    country: string;
    tags: string[];
    categories: string[];
    language: string;
    scholarshipAmount: string;
    scholarshipDeadline: string;
    scholarshipEligibility: string;
    eventDate: string;
    eventTime: string;
    eventVenue: string;
    eventRegistrationLink: string;
    webinarLink: string;
    webinarHost: string;
    programName: string;
    programDuration: string;
    tuitionFee: string;
    academicLevel: string;
    intakes: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    scheduledDate: string;
    scheduledTime: string;
    featuredPost: boolean;
    allowComments: boolean;
    pinToTop: boolean;
    sendNotification: boolean;
    grid: { label: string; value: string }[];
    benefits: { icon: string; title: string; description: string }[];
    documents: string[];
    downloadBtn: { label: string; link: string };
}

const POST_TYPES: PostType[] = ['Article', 'Scholarship', 'Program', 'Announcement', 'Event', 'Guide', 'News', 'Webinar'];
const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'New Zealand', 'Singapore', 'Ireland'];
const TYPE_ICONS: Record<PostType, string> = {
    Article: 'article', Scholarship: 'workspace_premium', Announcement: 'campaign',
    Event: 'event', Guide: 'menu_book', News: 'newspaper', Webinar: 'videocam', Program: 'school',
};
const TYPE_COLORS: Record<PostType, string> = {
    Article: 'border-blue-500 bg-blue-50 text-blue-700',
    Scholarship: 'border-purple-500 bg-purple-50 text-purple-700',
    Announcement: 'border-orange-500 bg-orange-50 text-orange-700',
    Event: 'border-pink-500 bg-pink-50 text-pink-700',
    Guide: 'border-teal-500 bg-teal-50 text-teal-700',
    News: 'border-sky-500 bg-sky-50 text-sky-700',
    Webinar: 'border-violet-500 bg-violet-50 text-violet-700',
    Program: 'border-emerald-500 bg-emerald-50 text-emerald-700',
};

interface EditPostModalProps {
    postId: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ postId, isOpen, onClose, onSuccess }) => {
    const [form, setForm] = useState<PostForm | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const bodyEditableRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && postId) {
            const fetchPost = async () => {
                setLoading(true);
                try {
                    const p = await feedService.getById(postId);
                    const categoryMapRev: Record<string, PostType> = {
                        'articles': 'Article',
                        'scholarships': 'Scholarship',
                        'programs': 'Program',
                        'announcements': 'Announcement',
                        'events': 'Event',
                        'guides': 'Guide',
                        'news': 'News',
                        'webinars': 'Webinar'
                    };

                    setForm({
                        title: p.title || '',
                        postType: categoryMapRev[p.category] || (p.category.charAt(0).toUpperCase() + p.category.slice(1) as PostType) || 'Article',
                        status: (p.status.charAt(0).toUpperCase() + p.status.slice(1)) as PostStatus,
                        visibility: p.metadata?.visibility || 'Public',
                        summary: p.metadata?.summary || '',
                        body: p.content || '',
                        coverImageUrl: p.coverImageUrl || '',
                        universityId: p.universityId || '',
                        universityName: p.university?.name || '',
                        country: p.metadata?.country || '',
                        tags: p.tags || [],
                        categories: p.metadata?.categories || [],
                        language: p.metadata?.language || 'English',
                        scholarshipAmount: p.metadata?.scholarshipAmount || '',
                        scholarshipDeadline: p.metadata?.scholarshipDeadline || '',
                        scholarshipEligibility: p.metadata?.scholarshipEligibility || '',
                        eventDate: p.metadata?.eventDate || '',
                        eventTime: p.metadata?.eventTime || '',
                        eventVenue: p.metadata?.eventVenue || '',
                        eventRegistrationLink: p.metadata?.eventRegistrationLink || '',
                        webinarLink: p.metadata?.webinarLink || '',
                        webinarHost: p.metadata?.webinarHost || '',
                        programName: p.metadata?.programName || '',
                        programDuration: p.metadata?.programDuration || '',
                        tuitionFee: p.metadata?.tuitionFee || '',
                        academicLevel: p.metadata?.academicLevel || 'Undergraduate',
                        intakes: p.metadata?.intakes || '',
                        seoTitle: p.metadata?.seoTitle || '',
                        seoDescription: p.metadata?.seoDescription || '',
                        seoKeywords: p.metadata?.seoKeywords || '',
                        scheduledDate: p.metadata?.scheduledDate || '',
                        scheduledTime: p.metadata?.scheduledTime || '',
                        featuredPost: p.metadata?.featuredPost || false,
                        allowComments: p.metadata?.allowComments !== false,
                        pinToTop: p.metadata?.pinToTop || false,
                        sendNotification: false,
                        grid: p.metadata?.grid || [],
                        benefits: p.metadata?.benefits || [],
                        documents: p.metadata?.documents || [],
                        downloadBtn: p.metadata?.downloadBtn || { label: '', link: '' },
                    });
                } catch (err) {
                    console.error('Failed to fetch post', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchPost();
        }
    }, [isOpen, postId]);

    useEffect(() => {
        if (form && bodyEditableRef.current && !bodyEditableRef.current.innerHTML) {
            bodyEditableRef.current.innerHTML = form.body;
        }
    }, [form]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!form || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const postData = {
                ...form,
                content: bodyEditableRef.current?.innerHTML || form.body,
                category: form.postType.toLowerCase() === 'article' ? 'articles' : form.postType.toLowerCase() + 's',
                status: form.status.toLowerCase()
            };
            await feedService.update(postId, postData);
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Update failed', err);
            alert('Failed to update post');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all";

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-black text-slate-900">Edit Post Details</h2>
                        <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-widest">Update your institutional content</p>
                    </div>
                    <button onClick={onClose} className="size-10 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="size-10 border-4 border-slate-200 border-t-[#2b6cee] rounded-full animate-spin"></div>
                        </div>
                    ) : form && (
                        <>
                            {/* Type Selector */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Content Type</label>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                                    {POST_TYPES.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setForm({ ...form, postType: type })}
                                            className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all text-center ${form.postType === type
                                                ? TYPE_COLORS[type]
                                                : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">{TYPE_ICONS[type]}</span>
                                            <span className="text-[9px] font-black leading-tight uppercase">{type}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 mb-2 uppercase">Post Title</label>
                                        <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 mb-2 uppercase">Summary</label>
                                        <textarea value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} rows={2} className={inputCls} />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 mb-2 uppercase">Banner Image URL</label>
                                        <input type="text" value={form.coverImageUrl} onChange={e => setForm({ ...form, coverImageUrl: e.target.value })} className={inputCls} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-slate-700 mb-2 uppercase">Status</label>
                                            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as PostStatus })} className={inputCls}>
                                                <option>Draft</option>
                                                <option>Pending</option>
                                                <option>Published</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-slate-700 mb-2 uppercase">Country</label>
                                            <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className={inputCls}>
                                                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rich Text Editor */}
                            <div>
                                <label className="block text-xs font-black text-slate-700 mb-2 uppercase">Full Content</label>
                                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-100">
                                        {['format_bold', 'format_italic', 'format_underlined', 'format_list_bulleted'].map(icon => (
                                            <button key={icon} onClick={() => document.execCommand(icon.replace('format_', '').replace('underlined', 'underline').replace('list_bulleted', 'insertUnorderedList'), false)} className="size-8 rounded hover:bg-white flex items-center justify-center text-slate-500">
                                                <span className="material-symbols-outlined text-[18px]">{icon}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div 
                                        ref={bodyEditableRef}
                                        contentEditable={true}
                                        className="min-h-[200px] p-6 focus:outline-none prose prose-sm max-w-none text-slate-600" 
                                    />
                                </div>
                            </div>

                            {/* Specific Fields Grid */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Tuition / Cost</label>
                                    <input type="text" value={form.tuitionFee} onChange={e => setForm({ ...form, tuitionFee: e.target.value })} placeholder="e.g. Full Fee Offset" className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Duration</label>
                                    <input type="text" value={form.programDuration} onChange={e => setForm({ ...form, programDuration: e.target.value })} placeholder="e.g. 3-4 Years" className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Deadline</label>
                                    <input type="text" value={form.scholarshipDeadline} onChange={e => setForm({ ...form, scholarshipDeadline: e.target.value })} placeholder="e.g. Oct 31, 2025" className={inputCls} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
                    <button onClick={onClose} className="px-6 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Cancel</button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting || loading}
                        className="px-8 py-2.5 bg-[#2b6cee] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="size-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;
