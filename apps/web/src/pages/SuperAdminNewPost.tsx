import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { universityService, UniversityData } from '../services/universityService';
import { feedService } from '../services/feedService';
import { usePosts } from '../shared/contexts/PostsContext';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

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
    universityId: string; // Changed to universityId
    universityName: string; // Keeping for display/storage
    country: string;
    tags: string;
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
}

const POST_TYPES: PostType[] = ['Article', 'Scholarship', 'Program', 'Announcement', 'Event', 'Guide', 'News', 'Webinar'];
const STATUSES: PostStatus[] = ['Draft', 'Under Review', 'Scheduled', 'Published'];
const VISIBILITIES: Visibility[] = ['Public', 'Members Only', 'University Partners', 'Internal'];
const CATEGORIES = ['Admissions', 'Scholarships', 'Visa', 'Career', 'Study Abroad', 'Test Prep', 'Housing', 'Finance', 'Research', 'Events'];
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

const DEFAULT_FORM: PostForm = {
    title: '', postType: 'Article', status: 'Draft', visibility: 'Public',
    summary: '', body: '', coverImageUrl: '',
    universityId: 'all', universityName: 'All Universities', country: '', tags: '', categories: [], language: 'English',
    scholarshipAmount: '', scholarshipDeadline: '', scholarshipEligibility: '',
    eventDate: '', eventTime: '', eventVenue: '', eventRegistrationLink: '',
    webinarLink: '', webinarHost: '',
    programName: '', programDuration: '', tuitionFee: '', academicLevel: 'Undergraduate', intakes: '',
    seoTitle: '', seoDescription: '', seoKeywords: '',
    scheduledDate: '', scheduledTime: '',
    featuredPost: false, allowComments: true, pinToTop: false, sendNotification: false,
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

const SuperAdminNewPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState<PostForm>(DEFAULT_FORM);
    const [activeSection, setActiveSection] = useState<'content' | 'seo' | 'settings'>('content');
    const [universities, setUniversities] = useState<UniversityData[]>([]);

    useEffect(() => {
        const fetchUnis = async () => {
            try {
                const data = await universityService.getAll();
                const fetchedUnis = data.universities || [];
                setUniversities(fetchedUnis);

                // Handle Pre-filling from URL params
                const params = new URLSearchParams(location.search);
                const preUniversityId = params.get('universityId');
                const preType = params.get('type') as PostType;

                if (preUniversityId || preType) {
                    setForm(prev => {
                        const next = { ...prev };
                        if (preType && POST_TYPES.includes(preType)) {
                            next.postType = preType;
                        }
                        if (preUniversityId) {
                            if (preUniversityId === 'all') {
                                next.universityId = 'all';
                                next.universityName = 'All Universities';
                            } else {
                                const matchedUni = fetchedUnis.find((u: any) => u._id === preUniversityId);
                                if (matchedUni) {
                                    next.universityId = matchedUni._id;
                                    next.universityName = matchedUni.name;
                                    next.country = matchedUni.country || '';
                                }
                            }
                        }
                        return next;
                    });
                }
            } catch (err) {
                console.error('Failed to fetch universities', err);
            }
        };
        fetchUnis();
    }, [location.search]);

    const set = (key: keyof PostForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [key]: e.target.value }));
    };

    const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val === 'all') {
            setForm(prev => ({ ...prev, universityId: 'all', universityName: 'All Universities' }));
        } else {
            const uni = universities.find(u => u._id === val);
            if (uni) {
                setForm(prev => ({ ...prev, universityId: uni._id, universityName: uni.name }));
            }
        }
    };
    const setBool = (key: keyof PostForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [key]: e.target.checked }));
    };
    const toggleCategory = (cat: string) => {
        setForm(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat],
        }));
    };

    const { addPost } = usePosts();

    const handleSubmit = async (submitStatus: PostStatus) => {
        const postData = {
            ...form, // Include everything
            title: form.title,
            content: form.body,
            category: form.postType,
            tags: form.tags.split(',').filter(Boolean).map(t => t.trim()),
            universityId: form.universityId === 'all' ? null : form.universityId,
            coverImageUrl: form.coverImageUrl,
            status: submitStatus.toLowerCase()
        };

        try {
            const savedPost = await feedService.create(postData);

            // Still sync with local context for immediate UI feedback in other parts
            const nextMock: any = {
                ...postData,
                id: savedPost.post?._id || `post-${Date.now()}`,
                label: form.postType,
                institution: form.universityName,
                grid: [
                    { label: 'Author', value: 'SuperAdmin' },
                    { label: 'Category', value: form.postType },
                ]
            };

            if (form.postType === 'Program') {
                nextMock.grid.push({ label: 'Tuition', value: form.tuitionFee || 'Contact Uni' });
                nextMock.grid.push({ label: 'Duration', value: form.programDuration || 'Varies' });
            }

            addPost(nextMock);
            navigate('/Superadmin/university-portal/posts-feed');
        } catch (err: any) {
            alert(`Failed to create post: ${err.message}`);
        }
    };

    const showScholarshipFields = form.postType === 'Scholarship';
    const showEventFields = form.postType === 'Event';
    const showWebinarFields = form.postType === 'Webinar';

    return (
        <SuperAdminLayout hideHeader={true}>
        <div className="flex-1 bg-slate-50 min-h-screen">
            <PageHeader
                title="Create New Post"
                breadcrumbs={[
                    { label: 'Posts & Feed', link: '/Superadmin/university-portal/posts-feed' },
                    { label: 'New Post' }
                ]}
                actions={
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleSubmit('Draft')} className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition">
                            Save Draft
                        </button>
                        <button onClick={() => handleSubmit('Under Review')} className="px-4 py-2 text-sm font-bold text-orange-600 border border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
                            Submit for Review
                        </button>
                        <button onClick={() => handleSubmit('Published')} className="px-4 py-2 text-sm font-bold text-white bg-[#2b6cee] rounded-lg hover:bg-blue-700 transition">
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

                        {/* Section tabs */}
                        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit">
                            {(['content', 'seo', 'settings'] as const).map(tab => (
                                <button key={tab} onClick={() => setActiveSection(tab)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${activeSection === tab ? 'bg-[#2b6cee] text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                >{tab === 'seo' ? 'SEO' : tab}</button>
                            ))}
                        </div>

                        {/* Content Tab */}
                        {activeSection === 'content' && (
                            <div className="space-y-5">
                                <Section title="Post Details" icon="edit">
                                    <Field label="Post Title" required hint="Use a clear, descriptive title (60–80 characters recommended)">
                                        <input type="text" value={form.title} onChange={set('title')} placeholder={`e.g. ${form.postType === 'Scholarship' ? '2025 Merit Scholarship for International Students' : form.postType === 'Event' ? 'University Open Day – Join Us Online' : 'Top 10 Universities for Computer Science 2025'}`} className={inputCls} />
                                        <div className="text-right text-[10px] text-slate-400 mt-1">{form.title.length}/100</div>
                                    </Field>
                                    <Field label="Summary / Excerpt" required hint="Shown in the feed cards and search results (max 200 chars)">
                                        <textarea value={form.summary} onChange={set('summary')} rows={2} maxLength={200} placeholder="Write a short compelling summary..." className={inputCls} />
                                    </Field>
                                    <Field label="Cover Image URL" hint="Paste a Unsplash, CDN, or uploaded image URL">
                                        <div className="flex gap-2">
                                            <input type="url" value={form.coverImageUrl} onChange={set('coverImageUrl')} placeholder="https://images.unsplash.com/..." className={`${inputCls} flex-1`} />
                                            <button className="px-3 py-2.5 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-500 hover:border-[#2b6cee] hover:text-[#2b6cee] transition flex items-center gap-1.5 whitespace-nowrap">
                                                <span className="material-symbols-outlined text-[16px]">upload</span>Upload
                                            </button>
                                        </div>
                                        {form.coverImageUrl && (
                                            <img src={form.coverImageUrl} alt="preview" className="mt-2 h-32 w-full object-cover rounded-xl border border-slate-200" />
                                        )}
                                    </Field>
                                    <Field label="Full Body Content" required>
                                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                                            <div className="flex gap-1 p-2 border-b border-slate-100 bg-slate-50 flex-wrap">
                                                {['format_bold', 'format_italic', 'format_underlined', 'format_list_bulleted', 'format_list_numbered', 'link', 'image', 'code'].map(icon => (
                                                    <button key={icon} className="p-1.5 rounded hover:bg-slate-200 transition text-slate-500">
                                                        <span className="material-symbols-outlined text-[18px]">{icon}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <textarea value={form.body} onChange={set('body')} rows={12} placeholder="Write your full post content here..." className="w-full px-4 py-3 text-sm focus:outline-none resize-none" />
                                        </div>
                                    </Field>
                                </Section>

                                {/* Scholarship-specific fields */}
                                {showScholarshipFields && (
                                    <Section title="Scholarship Details" icon="workspace_premium">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field label="Scholarship Amount">
                                                <input type="text" value={form.scholarshipAmount} onChange={set('scholarshipAmount')} placeholder="e.g. $10,000 / year" className={inputCls} />
                                            </Field>
                                            <Field label="Application Deadline">
                                                <input type="date" value={form.scholarshipDeadline} onChange={set('scholarshipDeadline')} className={inputCls} />
                                            </Field>
                                        </div>
                                        <Field label="Eligibility Criteria">
                                            <textarea value={form.scholarshipEligibility} onChange={set('scholarshipEligibility')} rows={3} placeholder="e.g. Open to international students with 3.5+ GPA enrolled in STEM programs..." className={inputCls} />
                                        </Field>
                                        <Field label="Associated Program">
                                            <input type="text" value={form.programName} onChange={set('programName')} placeholder="e.g. MSc Data Science" className={inputCls} />
                                        </Field>
                                    </Section>
                                )}

                                {/* Event-specific fields */}
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
                                        <Field label="Venue / Location" hint="Physical address or 'Online'">
                                            <input type="text" value={form.eventVenue} onChange={set('eventVenue')} placeholder="e.g. Online – Zoom / University Hall, London" className={inputCls} />
                                        </Field>
                                        <Field label="Registration Link">
                                            <input type="url" value={form.eventRegistrationLink} onChange={set('eventRegistrationLink')} placeholder="https://..." className={inputCls} />
                                        </Field>
                                    </Section>
                                )}

                                {/* Webinar-specific fields */}
                                {showWebinarFields && (
                                    <Section title="Webinar Details" icon="videocam">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field label="Webinar Date">
                                                <input type="date" value={form.eventDate} onChange={set('eventDate')} className={inputCls} />
                                            </Field>
                                            <Field label="Webinar Time">
                                                <input type="time" value={form.eventTime} onChange={set('eventTime')} className={inputCls} />
                                            </Field>
                                        </div>
                                        <Field label="Host / Speaker Name">
                                            <input type="text" value={form.webinarHost} onChange={set('webinarHost')} placeholder="e.g. Dr. Sarah Chen – Admissions Director" className={inputCls} />
                                        </Field>
                                        <Field label="Webinar Join Link">
                                            <input type="url" value={form.webinarLink} onChange={set('webinarLink')} placeholder="https://zoom.us/..." className={inputCls} />
                                        </Field>
                                    </Section>
                                )}

                                {/* Program-specific fields */}
                                {form.postType === 'Program' && (
                                    <Section title="Program Details" icon="school">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field label="Program / Major Name" required>
                                                <input type="text" value={form.programName} onChange={set('programName')} placeholder="e.g. B.Sc. Computer Science" className={inputCls} />
                                            </Field>
                                            <Field label="Academic Level">
                                                <select value={form.academicLevel} onChange={set('academicLevel')} className={selectCls}>
                                                    {['Undergraduate', 'Postgraduate', 'PhD', 'Diploma', 'Certificate'].map(l => <option key={l}>{l}</option>)}
                                                </select>
                                            </Field>
                                            <Field label="Tuition Fee (Annual)">
                                                <input type="text" value={form.tuitionFee} onChange={set('tuitionFee')} placeholder="e.g. $25,000" className={inputCls} />
                                            </Field>
                                            <Field label="Course Duration">
                                                <input type="text" value={form.programDuration} onChange={set('programDuration')} placeholder="e.g. 4 Years" className={inputCls} />
                                            </Field>
                                        </div>
                                        <Field label="Available Intakes" hint="Comma-separated semesters">
                                            <input type="text" value={form.intakes} onChange={set('intakes')} placeholder="e.g. Fall 2025, Spring 2026" className={inputCls} />
                                        </Field>
                                    </Section>
                                )}
                            </div>
                        )}

                        {/* SEO Tab */}
                        {activeSection === 'seo' && (
                            <Section title="SEO & Search Optimization" icon="search">
                                <p className="text-xs text-slate-500 bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg">Optimizing these fields improves discoverability on search engines.</p>
                                <Field label="SEO Title" hint="Recommended: 50–60 characters">
                                    <input type="text" value={form.seoTitle} onChange={set('seoTitle')} placeholder="Leave blank to use post title" className={inputCls} />
                                    <div className="text-right text-[10px] text-slate-400 mt-1">{form.seoTitle.length}/60</div>
                                </Field>
                                <Field label="Meta Description" hint="Recommended: 150–160 characters">
                                    <textarea value={form.seoDescription} onChange={set('seoDescription')} rows={3} maxLength={160} placeholder="A concise description for search snippets..." className={inputCls} />
                                    <div className="text-right text-[10px] text-slate-400 mt-1">{form.seoDescription.length}/160</div>
                                </Field>
                                <Field label="Focus Keywords" hint="Comma-separated keywords for indexing">
                                    <input type="text" value={form.seoKeywords} onChange={set('seoKeywords')} placeholder="e.g. study abroad, Canada universities, MBA scholarship" className={inputCls} />
                                </Field>
                                {/* Live Preview */}
                                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Google Preview</p>
                                    <p className="text-blue-700 font-semibold text-base hover:underline cursor-pointer truncate">{form.seoTitle || form.title || 'Your Post Title'}</p>
                                    <p className="text-emerald-700 text-xs">eaoverseas.com › university-portal › posts</p>
                                    <p className="text-slate-600 text-sm mt-1 line-clamp-2">{form.seoDescription || form.summary || 'Your meta description will appear here...'}</p>
                                </div>
                            </Section>
                        )}

                        {/* Settings Tab */}
                        {activeSection === 'settings' && (
                            <Section title="Publishing Settings" icon="settings">
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="Scheduled Publish Date">
                                        <input type="date" value={form.scheduledDate} onChange={set('scheduledDate')} className={inputCls} />
                                    </Field>
                                    <Field label="Scheduled Publish Time">
                                        <input type="time" value={form.scheduledTime} onChange={set('scheduledTime')} className={inputCls} />
                                    </Field>
                                </div>
                                <div className="space-y-3 pt-2">
                                    {[
                                        { key: 'featuredPost', label: 'Feature this post', desc: 'Displayed prominently on the homepage feed', icon: 'star' },
                                        { key: 'allowComments', label: 'Allow comments', desc: 'Let users comment on this post', icon: 'chat_bubble' },
                                        { key: 'pinToTop', label: 'Pin to top of feed', desc: 'Always show at the very top', icon: 'push_pin' },
                                        { key: 'sendNotification', label: 'Send push notification', desc: 'Notify subscribed users when published', icon: 'notifications' },
                                    ].map(opt => (
                                        <label key={opt.key} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition">
                                            <span className="material-symbols-outlined text-slate-400 text-[20px]">{opt.icon}</span>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-800">{opt.label}</p>
                                                <p className="text-xs text-slate-400">{opt.desc}</p>
                                            </div>
                                            <input type="checkbox" checked={form[opt.key as keyof PostForm] as boolean} onChange={setBool(opt.key as keyof PostForm)}
                                                className="size-5 rounded accent-[#2b6cee]" />
                                        </label>
                                    ))}
                                </div>
                            </Section>
                        )}
                    </div>

                    {/* ── Right Sidebar ── */}
                    <div className="space-y-5">
                        {/* Publish Controls */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><span className="material-symbols-outlined text-[#2b6cee] text-[18px]">send</span>Publish Controls</h3>
                            <Field label="Status">
                                <select value={form.status} onChange={set('status')} className={selectCls}>
                                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </Field>
                            <Field label="Visibility">
                                <select value={form.visibility} onChange={set('visibility')} className={selectCls}>
                                    {VISIBILITIES.map(v => <option key={v}>{v}</option>)}
                                </select>
                            </Field>
                            <Field label="Language">
                                <select value={form.language} onChange={set('language')} className={selectCls}>
                                    {['English', 'Hindi', 'French', 'German', 'Spanish', 'Arabic', 'Chinese'].map(l => <option key={l}>{l}</option>)}
                                </select>
                            </Field>
                            <div className="flex flex-col gap-2 pt-2">
                                <button onClick={() => handleSubmit('Published')} className="w-full py-2.5 text-sm font-bold text-white bg-[#2b6cee] rounded-xl hover:bg-blue-700 transition">
                                    Publish Now
                                </button>
                                <button onClick={() => handleSubmit('Draft')} className="w-full py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                                    Save as Draft
                                </button>
                            </div>
                        </div>

                        {/* Categorization */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><span className="material-symbols-outlined text-[#2b6cee] text-[18px]">label</span>Categorization</h3>
                            <Field label="University / Organization">
                                <div className="relative">
                                    <select
                                        value={form.universityId}
                                        onChange={handleUniversityChange}
                                        className={selectCls}
                                    >
                                        <option value="all">All Universities (Global Post)</option>
                                        {universities.map(u => (
                                            <option key={u._id} value={u._id}>{u.name}</option>
                                        ))}
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
                                </div>
                            </Field>
                            <Field label="Target Country">
                                <select value={form.country} onChange={set('country')} className={selectCls}>
                                    <option value="">— Select Country —</option>
                                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </Field>
                            <Field label="Tags" hint="Comma-separated, e.g. MBA, Canada, 2025">
                                <input type="text" value={form.tags} onChange={set('tags')} placeholder="MBA, Admissions, Scholarship" className={inputCls} />
                            </Field>
                            <Field label="Categories">
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {CATEGORIES.map(cat => (
                                        <button key={cat} onClick={() => toggleCategory(cat)}
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${form.categories.includes(cat) ? 'bg-[#2b6cee] text-white border-[#2b6cee]' : 'bg-white text-slate-500 border-slate-200 hover:border-[#2b6cee] hover:text-[#2b6cee]'}`}
                                        >{cat}</button>
                                    ))}
                                </div>
                            </Field>
                        </div>

                        {/* Completeness checklist */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-[#2b6cee] text-[18px]">checklist</span>Post Checklist</h3>
                            <div className="space-y-2">
                                {[
                                    { label: 'Title added', done: form.title.length > 5 },
                                    { label: 'Summary written', done: form.summary.length > 10 },
                                    { label: 'Body content present', done: form.body.length > 50 },
                                    { label: 'Cover image set', done: !!form.coverImageUrl },
                                    { label: 'Category selected', done: form.categories.length > 0 },
                                    { label: 'University tagged', done: form.universityId !== '' },
                                    { label: 'SEO title set', done: !!form.seoTitle || form.title.length > 5 },
                                ].map(item => (
                                    <div key={item.label} className="flex items-center gap-2 text-xs">
                                        <span className={`material-symbols-outlined text-[16px] ${item.done ? 'text-emerald-500' : 'text-slate-300'}`}>
                                            {item.done ? 'check_circle' : 'radio_button_unchecked'}
                                        </span>
                                        <span className={item.done ? 'text-emerald-700 font-medium' : 'text-slate-400'}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                {(() => {
                                    const done = [form.title.length > 5, form.summary.length > 10, form.body.length > 50, !!form.coverImageUrl, form.categories.length > 0, form.universityId !== '', !!form.seoTitle || form.title.length > 5].filter(Boolean).length;
                                    const pct = Math.round((done / 7) * 100);
                                    return (
                                        <>
                                            <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                                <span>Completeness</span><span>{pct}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? 'bg-emerald-500' : pct >= 60 ? 'bg-[#2b6cee]' : 'bg-orange-400'}`} style={{ width: `${pct}%` }} />
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminNewPost;
