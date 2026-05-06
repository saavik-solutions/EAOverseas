import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { universityService, UniversityData } from '../services/universityService';
import { feedService } from '../services/feedService';
import { usePosts } from '../shared/contexts/PostsContext';
import UniversityLayout from '../layouts/UniversityLayout';

// ── Types ─────────────────────────────────────────────────────────────────────
type PostType = 'Article' | 'Scholarship' | 'Announcement' | 'Event' | 'Guide' | 'News' | 'Webinar' | 'Program';
type PostStatus = 'Draft' | 'Published' | 'Scheduled' | 'Under Review';
type Visibility = 'Public' | 'Members Only' | 'University Partners' | 'Internal';

interface PostForm {
    // Core
    title: string;
    postType: PostType;
    status: PostStatus;
    visibility: Visibility;
    // Content
    summary: string;
    body: string;
    coverImageUrl: string;
    // Classification
    universityId: string;
    universityName: string;
    country: string;
    tags: string[];
    categories: string[];
    language: string;
    // Type-specific
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
    // SEO
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    // Publishing
    scheduledDate: string;
    scheduledTime: string;
    featuredPost: boolean;
    allowComments: boolean;
    pinToTop: boolean;
    sendNotification: boolean;
    // Dynamic Grid (Highlights)
    grid: { label: string; value: string }[];
    // Dynamic Benefits (Scholarships)
    benefits: { icon: string; title: string; description: string }[];
    // Required Documents
    documents: string[];
    downloadBtn: { label: string; link: string };
}

const POST_TYPES: PostType[] = ['Article', 'Scholarship', 'Program', 'Announcement', 'Event', 'Guide', 'News', 'Webinar'];
const STATUSES: PostStatus[] = ['Draft', 'Under Review', 'Scheduled', 'Published'];
const VISIBILITIES: Visibility[] = ['Public', 'Members Only', 'University Partners', 'Internal'];
const CATEGORIES = ['Admissions', 'Scholarships', 'Visa', 'Career', 'Study Abroad', 'Test Prep', 'Housing', 'Finance', 'Research', 'Events'];
const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'New Zealand', 'Singapore', 'Ireland'];
const SUGGESTED_TAGS = ['Scholarship', 'Admission', 'Visa', 'IELTS', 'TOEFL', 'USA', 'UK', 'Canada', 'Australia', 'STEM', 'MBA', 'Masters', 'Undergraduate', 'Postgraduate', 'Business', 'Engineering', 'Medicine', 'Internship', 'Research', 'Financial Aid', 'GMAT', 'GRE', 'Study Destinations'];

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

const DEFAULT_FORM: PostForm = {
    title: '', postType: 'Article', status: 'Draft', visibility: 'Public',
    summary: '', body: '', coverImageUrl: '',
    universityId: '', universityName: '', country: '', tags: [], categories: [], language: 'English',
    scholarshipAmount: '', scholarshipDeadline: '', scholarshipEligibility: '',
    eventDate: '', eventTime: '', eventVenue: '', eventRegistrationLink: '',
    webinarLink: '', webinarHost: '',
    programName: '', programDuration: '', tuitionFee: '', academicLevel: 'Undergraduate', intakes: '',
    seoTitle: '', seoDescription: '', seoKeywords: '',
    scheduledDate: '', scheduledTime: '',
    featuredPost: false, allowComments: true, pinToTop: false, sendNotification: false,
    grid: [],
    benefits: [],
    documents: [],
    downloadBtn: { label: '', link: '' },
};

const Section = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <span className="material-symbols-outlined text-[#2b6cee]">{icon}</span>
            <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
        </div>
        <div className="p-6 space-y-4">{children}</div>
    </div>
);

const Field = ({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) => (
    <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">
            {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {children}
        {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
);

const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all";
const selectCls = `${inputCls} appearance-none`;

const editorStyle = `
    .editor-placeholder:empty:before {
        content: attr(placeholder);
        color: #94a3b8;
        cursor: text;
    }
    .editor-content ul {
        list-style-type: disc !important;
        margin-left: 1.5rem !important;
        padding-left: 0.5rem !important;
    }
    .editor-content ol {
        list-style-type: decimal !important;
        margin-left: 1.5rem !important;
        padding-left: 0.5rem !important;
    }
    .editor-content li {
        display: list-item !important;
    }
`;

const UniversityNewPost = () => {
    const { universityName: urlUniName } = useParams<{ universityName: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState<PostForm>(DEFAULT_FORM);
    const [activeSection, setActiveSection] = useState<'content' | 'seo' | 'settings'>('content');
    const [tagInput, setTagInput] = useState('');
    const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
    const [gridLabel, setGridLabel] = useState('');
    const [gridValue, setGridValue] = useState('');
    const [benefitTitle, setBenefitTitle] = useState('');
    const [benefitDesc, setBenefitDesc] = useState('');
    const [benefitIcon, setBenefitIcon] = useState('work');
    const [docInput, setDocInput] = useState('');

    const bodyEditableRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initial load of content into editable div
    useEffect(() => {
        if (bodyEditableRef.current && !bodyEditableRef.current.innerHTML) {
            bodyEditableRef.current.innerHTML = form.body;
        }
    }, [form.body]);

    useEffect(() => {
        const fetchUni = async () => {
            try {
                const data = await universityService.getAll();
                const matchedUni = (data.universities || []).find((u: any) => 
                    u.name.toLowerCase().replace(/\s+/g, '-') === urlUniName
                );
                if (matchedUni) {
                    setForm(prev => ({ 
                        ...prev, 
                        universityId: matchedUni._id, 
                        universityName: matchedUni.name,
                        country: matchedUni.country || ''
                    }));
                }
            } catch (err) {
                console.error('Failed to resolve university', err);
            }
        };
        fetchUni();
    }, [urlUniName]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const localUrl = URL.createObjectURL(file);
        setForm(prev => ({ ...prev, coverImageUrl: localUrl }));

        const formData = new FormData();
        formData.append('image', file);
        try {
            const token = localStorage.getItem('eaoverseas_token');
            const res = await fetch('http://localhost:4000/api/upload/image', {
                method: 'POST',
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                body: formData
            });
            if (res.ok) {
                const data = await res.json();
                if (data.url) setForm(prev => ({ ...prev, coverImageUrl: data.url }));
            }
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    const applyEditorTool = (tool: string) => {
        const editor = bodyEditableRef.current;
        if (!editor) return;
        editor.focus();
        switch (tool) {
            case 'format_bold': document.execCommand('bold', false); break;
            case 'format_italic': document.execCommand('italic', false); break;
            case 'format_underlined': document.execCommand('underline', false); break;
            case 'format_list_bulleted': document.execCommand('insertUnorderedList', false); break;
            case 'format_list_numbered': document.execCommand('insertOrderedList', false); break;
            case 'link': {
                const url = prompt('Enter the link URL:', 'https://');
                if (url) document.execCommand('createLink', false, url);
                break;
            }
            case 'image': {
                const url = prompt('Enter the image URL:');
                if (url) document.execCommand('insertImage', false, url);
                break;
            }
            case 'code': {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const code = document.createElement('code');
                    code.className = "bg-slate-100 px-1.5 py-0.5 rounded text-rose-500 font-mono text-xs";
                    code.textContent = selection.toString() || 'code';
                    range.deleteContents();
                    range.insertNode(code);
                }
                break;
            }
        }
        setForm(prev => ({ ...prev, body: editor.innerHTML }));
    };

    const handleBodyChange = () => {
        if (bodyEditableRef.current) {
            setForm(prev => ({ ...prev, body: bodyEditableRef.current!.innerHTML }));
        }
    };

    const addBenefit = () => {
        if (benefitTitle.trim() && benefitDesc.trim()) {
            setForm(prev => ({
                ...prev,
                benefits: [...prev.benefits, { icon: benefitIcon, title: benefitTitle.trim(), description: benefitDesc.trim() }]
            }));
            setBenefitTitle('');
            setBenefitDesc('');
        }
    };

    const removeBenefit = (index: number) => {
        setForm(prev => ({ ...prev, benefits: prev.benefits.filter((_, i) => i !== index) }));
    };

    const addDoc = () => {
        if (docInput.trim()) {
            setForm(prev => ({ ...prev, documents: [...prev.documents, docInput.trim()] }));
            setDocInput('');
        }
    };

    const removeDoc = (index: number) => {
        setForm(prev => ({ ...prev, documents: prev.documents.filter((_, i) => i !== index) }));
    };

    const addGridItem = () => {
        if (gridLabel.trim() && gridValue.trim() && form.grid.length < 6) {
            setForm(prev => ({ ...prev, grid: [...prev.grid, { label: gridLabel.trim(), value: gridValue.trim() }] }));
            setGridLabel('');
            setGridValue('');
        }
    };

    const removeGridItem = (index: number) => {
        setForm(prev => ({ ...prev, grid: prev.grid.filter((_, i) => i !== index) }));
    };

    const handleTagInput = (val: string) => {
        setTagInput(val);
        if (val.trim()) {
            const filtered = SUGGESTED_TAGS.filter(t => t.toLowerCase().includes(val.toLowerCase()) && !form.tags.includes(t)).slice(0, 5);
            setTagSuggestions(filtered);
        } else {
            setTagSuggestions([]);
        }
    };

    const addTag = (tag: string) => {
        if (!form.tags.includes(tag)) setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
        setTagInput('');
        setTagSuggestions([]);
    };

    const removeTag = (tag: string) => {
        setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };

    const set = (key: keyof PostForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [key]: e.target.value }));
    };

    const setBool = (key: keyof PostForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [key]: e.target.checked }));
    };

    const toggleCategory = (cat: string) => {
        setForm(prev => ({
            ...prev,
            categories: prev.categories.includes(cat) ? prev.categories.filter(c => c !== cat) : [...prev.categories, cat],
        }));
    };

    const { addPost } = usePosts();

    const handleSubmit = async (submitStatus: PostStatus) => {
        const postData = {
            ...form,
            status: submitStatus.toLowerCase(),
            content: form.body,
            category: form.postType,
            universityId: form.universityId === 'all' ? null : form.universityId
        };
        try {
            const savedPost = await feedService.create(postData);
            addPost({
                ...postData,
                id: savedPost.post?._id || `post-${Date.now()}`,
                label: form.postType,
                institution: form.universityName,
                grid: [{ label: 'Views', value: '0' }, { label: 'Category', value: form.postType }]
            });
            navigate(`/university-panel/${urlUniName}/post-center`);
        } catch (err: any) {
            alert(`Failed: ${err.message}`);
        }
    };

    const showScholarshipFields = form.postType === 'Scholarship';
    const showEventFields = form.postType === 'Event';
    const showWebinarFields = form.postType === 'Webinar';
    const showProgramFields = form.postType === 'Program';

    return (
        <UniversityLayout universityName={form.universityName || 'University'} pageTitle="Create New Post">
            <style>{editorStyle}</style>
            <div className="flex-1 bg-slate-50 min-h-screen">
                <PageHeader
                    title="Create New Post"
                    breadcrumbs={[
                        { label: 'Post Center', link: `/university-panel/${urlUniName}/post-center` },
                        { label: 'New Post' }
                    ]}
                    actions={
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleSubmit('Draft')} className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition">
                                Save Draft
                            </button>
                            <button onClick={() => handleSubmit('Published')} className="px-4 py-2 text-sm font-bold text-white bg-[#2b6cee] rounded-lg hover:bg-blue-700 transition shadow-lg">
                                Publish Now
                            </button>
                        </div>
                    }
                />

                <div className="p-6">
                    {/* Post Type Selector */}
                    <div className="mb-6">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Select Post Type</p>
                        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                            {POST_TYPES.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setForm(prev => ({ ...prev, postType: type }))}
                                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${form.postType === type
                                        ? TYPE_COLORS[type]
                                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[22px]">{TYPE_ICONS[type]}</span>
                                    <span className="text-[11px] font-bold leading-tight">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* ── Left Column ── */}
                        <div className="xl:col-span-2 space-y-6">
                            <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit">
                                {(['content', 'seo', 'settings'] as const).map(tab => (
                                    <button key={tab} onClick={() => setActiveSection(tab)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${activeSection === tab ? 'bg-[#2b6cee] text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                    >{tab === 'seo' ? 'SEO' : tab}</button>
                                ))}
                            </div>

                            {activeSection === 'content' && (
                                <div className="space-y-5">
                                    <Section title="Post Details" icon="edit">
                                        <Field label="Post Title" required hint="Use a clear, descriptive title (60–80 characters recommended)">
                                            <input type="text" value={form.title} onChange={set('title')} placeholder="Enter headline..." className={inputCls} />
                                        </Field>
                                        <Field label="Summary / Excerpt" required hint="Shown in search results (max 200 chars)">
                                            <textarea value={form.summary} onChange={set('summary')} rows={2} maxLength={200} placeholder="Write a short summary..." className={inputCls} />
                                        </Field>
                                        <Field label="Cover Image URL">
                                            <div className="flex gap-2">
                                                <input type="url" value={form.coverImageUrl} onChange={set('coverImageUrl')} placeholder="https://..." className={`${inputCls} flex-1`} />
                                                <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition">
                                                    <span className="material-symbols-outlined text-[18px]">upload</span> Upload
                                                </button>
                                                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                            </div>
                                            {form.coverImageUrl && <img src={form.coverImageUrl} className="mt-3 w-full h-40 object-cover rounded-xl border border-slate-200" alt="Preview" />}
                                        </Field>
                                        <Field label="Full Content Body" required>
                                            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                                <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-100">
                                                    {['format_bold', 'format_italic', 'format_underlined', 'format_list_bulleted', 'format_list_numbered', 'code'].map(icon => (
                                                        <button key={icon} onClick={() => applyEditorTool(icon)} className="size-8 rounded hover:bg-white flex items-center justify-center text-slate-500">
                                                            <span className="material-symbols-outlined text-[18px]">{icon}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                                <div 
                                                    ref={bodyEditableRef}
                                                    contentEditable={true}
                                                    onInput={handleBodyChange}
                                                    className="min-h-[300px] p-6 focus:outline-none prose prose-sm max-w-none editor-placeholder editor-content" 
                                                    placeholder="Write your content here..."
                                                />
                                            </div>
                                        </Field>
                                    </Section>

                                    {showScholarshipFields && (
                                        <Section title="Scholarship Details" icon="workspace_premium">
                                            <div className="grid grid-cols-2 gap-4">
                                                <Field label="Grant Amount">
                                                    <input type="text" value={form.scholarshipAmount} onChange={set('scholarshipAmount')} placeholder="e.g. $10,000" className={inputCls} />
                                                </Field>
                                                <Field label="Application Deadline">
                                                    <input type="date" value={form.scholarshipDeadline} onChange={set('scholarshipDeadline')} className={inputCls} />
                                                </Field>
                                            </div>
                                            <Field label="Eligibility Criteria">
                                                <textarea value={form.scholarshipEligibility} onChange={set('scholarshipEligibility')} className={inputCls} placeholder="Who is eligible?" />
                                            </Field>
                                            <div className="pt-4 border-t border-slate-100">
                                                <Field label="Add Benefit Title">
                                                    <div className="flex gap-2">
                                                        <input type="text" value={benefitTitle} onChange={e => setBenefitTitle(e.target.value)} placeholder="e.g. Full Tuition" className={inputCls} />
                                                        <button onClick={addBenefit} className="size-[46px] bg-[#2b6cee] text-white rounded-xl flex items-center justify-center"><span className="material-symbols-outlined">add</span></button>
                                                    </div>
                                                </Field>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                                    {form.benefits.map((b, i) => (
                                                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center group">
                                                            <span className="text-sm font-bold">{b.title}</span>
                                                            <button onClick={() => removeBenefit(i)} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Section>
                                    )}

                                    {showEventFields && (
                                        <Section title="Event Details" icon="event">
                                            <div className="grid grid-cols-2 gap-4">
                                                <Field label="Event Date">
                                                    <input type="date" value={form.eventDate} onChange={set('eventDate')} className={inputCls} />
                                                </Field>
                                                <Field label="Event Time">
                                                    <input type="time" value={form.eventTime} onChange={set('eventTime')} className={inputCls} />
                                                </Field>
                                            </div>
                                            <Field label="Location / Venue">
                                                <input type="text" value={form.eventVenue} onChange={set('eventVenue')} placeholder="Online or Address" className={inputCls} />
                                            </Field>
                                        </Section>
                                    )}

                                    {showProgramFields && (
                                        <Section title="Program Details" icon="school">
                                            <div className="grid grid-cols-2 gap-4">
                                                <Field label="Program Name">
                                                    <input type="text" value={form.programName} onChange={set('programName')} className={inputCls} />
                                                </Field>
                                                <Field label="Academic Level">
                                                    <select value={form.academicLevel} onChange={set('academicLevel')} className={selectCls}>
                                                        {['Undergraduate', 'Postgraduate', 'PhD'].map(l => <option key={l}>{l}</option>)}
                                                    </select>
                                                </Field>
                                            </div>
                                        </Section>
                                    )}

                                    <Section title="Specifications" icon="grid_view">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field label="Label">
                                                <input type="text" value={gridLabel} onChange={e => setGridLabel(e.target.value)} placeholder="e.g. Intake" className={inputCls} />
                                            </Field>
                                            <Field label="Value">
                                                <div className="flex gap-2">
                                                    <input type="text" value={gridValue} onChange={e => setGridValue(e.target.value)} placeholder="e.g. Fall 2025" className={inputCls} />
                                                    <button onClick={addGridItem} className="size-[46px] bg-[#2b6cee] text-white rounded-xl flex items-center justify-center shrink-0"><span className="material-symbols-outlined">add</span></button>
                                                </div>
                                            </Field>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                                            {form.grid.map((g, i) => (
                                                <div key={i} className="bg-white border border-slate-200 p-3 rounded-xl flex justify-between items-center group">
                                                    <div>
                                                        <p className="text-[9px] font-black text-[#2b6cee] uppercase">{g.label}</p>
                                                        <p className="text-xs font-bold truncate">{g.value}</p>
                                                    </div>
                                                    <button onClick={() => removeGridItem(i)} className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                                </div>
                                            ))}
                                        </div>
                                    </Section>
                                </div>
                            )}

                            {activeSection === 'seo' && (
                                <Section title="Search Engine Optimization" icon="search">
                                    <Field label="SEO Title">
                                        <input type="text" value={form.seoTitle} onChange={set('seoTitle')} className={inputCls} />
                                    </Field>
                                    <Field label="Meta Description">
                                        <textarea value={form.seoDescription} onChange={set('seoDescription')} className={inputCls} rows={3} />
                                    </Field>
                                    <div className="bg-white border border-slate-200 p-4 rounded-xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Google Preview</p>
                                        <p className="text-blue-700 font-bold truncate">{form.seoTitle || form.title || 'Untitled Post'}</p>
                                        <p className="text-slate-600 text-xs mt-1 line-clamp-2">{form.seoDescription || form.summary || 'Post summary will appear here...'}</p>
                                    </div>
                                </Section>
                            )}

                            {activeSection === 'settings' && (
                                <Section title="Publishing Settings" icon="settings">
                                    <div className="space-y-3">
                                        {[
                                            { key: 'featuredPost', label: 'Feature this post', icon: 'star' },
                                            { key: 'allowComments', label: 'Allow comments', icon: 'chat_bubble' },
                                            { key: 'sendNotification', label: 'Send notification', icon: 'notifications' },
                                        ].map(opt => (
                                            <label key={opt.key} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition">
                                                <span className="material-symbols-outlined text-slate-400">{opt.icon}</span>
                                                <span className="flex-1 text-sm font-bold">{opt.label}</span>
                                                <input type="checkbox" checked={form[opt.key as keyof PostForm] as boolean} onChange={setBool(opt.key as keyof PostForm)} className="size-5 rounded accent-[#2b6cee]" />
                                            </label>
                                        ))}
                                    </div>
                                </Section>
                            )}
                        </div>

                        {/* ── Right Column ── */}
                        <div className="space-y-5">
                            {/* Publish Status */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                                <h3 className="font-bold text-sm flex items-center gap-2"><span className="material-symbols-outlined text-[#2b6cee] text-[18px]">send</span> Publish Controls</h3>
                                <Field label="Current Status">
                                    <select value={form.status} onChange={set('status')} className={selectCls}>
                                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </Field>
                            </div>

                            {/* Institutional Context (Locked) */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                                <h3 className="font-bold text-sm flex items-center gap-2"><span className="material-symbols-outlined text-[#2b6cee] text-[18px]">account_balance</span> Institutional Context</h3>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Authenticated University</p>
                                    <p className="text-sm font-black text-slate-900">{form.universityName}</p>
                                </div>
                                <Field label="Target Country">
                                    <select value={form.country} onChange={set('country')} className={selectCls}>
                                        <option value="">Select Country</option>
                                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </Field>
                            </div>

                            {/* Tags */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                                <h3 className="font-bold text-sm flex items-center gap-2"><span className="material-symbols-outlined text-[#2b6cee] text-[18px]">label</span> Categorization</h3>
                                <Field label="Select Tags">
                                    <input type="text" value={tagInput} onChange={e => handleTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag(tagInput))} placeholder="Add tag..." className={inputCls} />
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {form.tags.map(t => (
                                            <button key={t} onClick={() => removeTag(t)} className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 hover:bg-rose-50 hover:text-rose-600 transition-colors">{t} <span className="material-symbols-outlined text-[14px]">close</span></button>
                                        ))}
                                    </div>
                                </Field>
                                <Field label="Explore Categories">
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {CATEGORIES.map(cat => (
                                            <button key={cat} onClick={() => toggleCategory(cat)} className={`px-2.5 py-1 rounded-full text-[10px] font-black border transition-all ${form.categories.includes(cat) ? 'bg-[#2b6cee] text-white border-[#2b6cee]' : 'bg-white text-slate-500 border-slate-200'}`}>{cat}</button>
                                        ))}
                                    </div>
                                </Field>
                            </div>

                            {/* Tips */}
                            <div className="bg-[#111318] rounded-2xl p-6 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 size-32 bg-[#2b6cee]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-[#2b6cee] mb-4">Post Strategy</h4>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <span className="material-symbols-outlined text-green-400 text-lg shadow-green-400/20 shadow-lg">check_circle</span>
                                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed">Engagement increases by <span className="text-white font-bold">45%</span> with high-quality visual content.</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
                                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed">Clearly stated deadlines drive <span className="text-white font-bold">immediate action</span> for scholarships.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityNewPost;
