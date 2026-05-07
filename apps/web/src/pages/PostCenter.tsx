import React, { useState, useEffect, useRef } from 'react';
import UniversityLayout from '@/layouts/UniversityLayout';
import { usePosts, Post } from '@/shared/contexts/PostsContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';

const PostCenter = () => {
    const location = useLocation();
    const { user, loading: authLoading } = useAuth();
    const { posts, addPost, updatePost, deletePost, clearAllPosts } = usePosts();
    const [activeTab, setActiveTab] = useState('All');

    // Context from navigation (for Superadmins viewing specific universities)
    const stateUni = location.state?.university?.name;
    const isSuperAdmin = user?.role === 'Chief Counsel' || user?.name === 'Chief Counsel' || user?.role === 'Superadmin';
    const effectiveUniversity = stateUni || user?.university || "";

    // Diagnostic log to track session state
    React.useEffect(() => {
        if (!authLoading && user) {
            console.log(`[PostCenter] User: ${user.name}, Role: ${user.role}, Effective University: ${effectiveUniversity}`);
        }
    }, [user, authLoading, effectiveUniversity]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Admissions');
    const [deadline, setDeadline] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [funding, setFunding] = useState('');
    const [openDate, setOpenDate] = useState('');
    const [requiredTest, setRequiredTest] = useState('');
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [admissionDocFile, setAdmissionDocFile] = useState<File | null>(null);
    const [policyCategory, setPolicyCategory] = useState('');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [policyDocFile, setPolicyDocFile] = useState<File | null>(null);
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventHour, setEventHour] = useState('12');
    const [eventMinute, setEventMinute] = useState('00');
    const [eventPeriod, setEventPeriod] = useState('pm');
    const [eventDatePart, setEventDatePart] = useState('');
    const [eventDuration, setEventDuration] = useState('');
    const [eventHost, setEventHost] = useState('');
    const [eventLink, setEventLink] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [editingId, setEditingId] = useState<string | number | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const docInputRef = React.useRef<HTMLInputElement>(null);
    const admissionDocInputRef = React.useRef<HTMLInputElement>(null);
    const policyDocInputRef = React.useRef<HTMLInputElement>(null);

    // Helpers to format dates for the display
    const formatDate = (dateString: string) => {
        if (!dateString) return 'TBD';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch { return dateString; }
    };

    const formatDateTime = (dateTimeString: string) => {
        if (!dateTimeString) return 'TBD';
        try {
            return new Date(dateTimeString).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(/\s?[AP]M$/, (match) => match.toLowerCase()); // Convert PM to pm as requested
        } catch { return dateTimeString; }
    };

    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle);
        // Basic auto-hashtag suggestion logic
        const words = newTitle.toLowerCase().split(/\s+/);
        const newSuggestions: string[] = [];
        if (words.some(w => w.includes('scholarship'))) newSuggestions.push('#Scholarship', '#Funding', '#Opportunity');
        if (words.some(w => w.includes('admission') || w.includes('apply'))) newSuggestions.push('#Admissions', '#StudyAbroad', '#Enrollment');
        if (words.some(w => w.includes('policy') || w.includes('visa') || w.includes('update'))) newSuggestions.push('#PolicyUpdate', '#VisaNews', '#UniversityNews');
        if (words.some(w => !w.includes('#') && w.length > 4)) {
            words.filter(w => w.length > 5).forEach(w => newSuggestions.push(`#${w.charAt(0).toUpperCase() + w.slice(1).replace(/[^a-zA-Z0-9]/g, '')}`));
        }

        setSuggestions([...new Set(newSuggestions)].slice(0, 4));
    };

    const addSuggestion = (tag: string) => {
        if (!hashtags.includes(tag)) {
            setHashtags(prev => prev ? `${prev} ${tag}` : tag);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const isFormComplete = title.trim() !== '' && hashtags.trim() !== '' && imagePreview !== null;

    const handlePostSubmit = (isDraft: boolean = false) => {
        // Combine time components for Event & Webinar
        let finalEventDate = eventDate;
        if (category === 'Event & Webinar' && eventDatePart) {
            finalEventDate = `${eventDatePart}T${eventPeriod === 'pm' && eventHour !== '12' ? parseInt(eventHour) + 12 : (eventPeriod === 'am' && eventHour === '12' ? '00' : eventHour.padStart(2, '0'))}:${eventMinute}:00`;
        }

        const postData: any = {
            id: editingId ? editingId.toString() : Date.now().toString(),
            title: title,
            category: category,
            label: category?.includes('Admissions') ? 'Admission Open' : (category || 'update'),
            labelColor: category?.toLowerCase().includes('scholarship') ? "text-blue-700 border-blue-400 bg-blue-50" : (category?.toLowerCase().includes('policy') ? "text-purple-700 border-purple-100 bg-purple-50" : "text-green-700 border-green-100 bg-green-50"),
            banner: imagePreview || "",
            image: imagePreview || "", // Keep for local PostCenter compat
            logo: effectiveUniversity ? `https://ui-avatars.com/api/?name=${encodeURIComponent(effectiveUniversity)}&background=2b6cee&color=fff&bold=true&format=svg` : "https://lh3.googleusercontent.com/aida-public/AB6AXuB_Rmzt3binRkT7Z5nyfJoMYpxPN7cjfZnI3TLgP9IEOI7GytkZN5_7PxkPtG8Ulri18LdtuglOl6jntqjo-rlYw5XdnQcrm6Atna9muAezaoNcrk29F1l2oWira77-SQk48EjeQuyiF_Z1VQqfjXbSNu06d-m2-U4zITnlOSeAYIrRkTn-FAmNA0oDQ9QxpPYevooTrqgK18TnGny5j0HyvHWN9ZLUyoO338wGttL2bARVFxLHsIIyWS29CNIs2Fejyz6Fo24WBrnK",
            institution: (effectiveUniversity || "Your Institution").trim(), // Dynamic institution based on login or context
            location: effectiveUniversity ? `${effectiveUniversity.trim()} Campus${user?.country ? ', ' + user.country : ''}` : "Global News Feed",
            verified: true,
            status: isDraft ? 'Draft' : 'Published',
            isPinned: false,
            hashtags: hashtags,
            tags: hashtags.split(/\s+/).filter(t => t.startsWith('#')),
            expiry: category?.includes('Event')
                ? `${formatDateTime(finalEventDate)}`
                : (deadline ? `Expires ${formatDate(deadline)}` : ''),
            grid: [
                category?.includes('Scholarship') ? { label: 'Deadline', value: formatDate(deadline), alert: true } :
                    category?.includes('Admissions') ? { label: 'Applications Open', value: formatDate(openDate) } :
                        category?.includes('Policy') ? { label: 'Effective Date', value: formatDate(effectiveDate) } :
                            { label: 'Event Date', value: formatDateTime(finalEventDate), alert: true },

                category === 'Scholarship' || category?.includes('Scholarship') ? { label: 'Duration', value: duration || '12-24 Months' } :
                    category === 'Admissions' || category?.includes('Admissions') ? { label: 'Deadline', value: formatDate(deadline) } :
                        category === 'Policy Update' || category?.includes('Policy') ? { label: 'Duration', value: '2 Years' } :
                            { label: 'Type', value: eventType || 'Webinar' },

                category === 'Scholarship' || category?.includes('Scholarship') ? { label: 'Start Date', value: formatDate(startDate) } :
                    category === 'Admissions' || category?.includes('Admissions') ? { label: 'Course Level', value: 'Postgraduate' } :
                        category === 'Policy Update' ? { label: 'Sponsorship', value: 'Not Required', color: 'text-green-600' } :
                            { label: 'Duration', value: eventDuration || '60 Mins' },

                category === 'Scholarship' ? { label: 'Funding', value: funding || 'Full + Stipend', color: 'text-green-600' } :
                    category === 'Admissions' ? { label: 'GRE', value: requiredTest || 'Optional', color: 'text-green-600' } :
                        category === 'Policy Update' ? { label: 'Status', value: 'Confirmed', color: 'text-green-600' } :
                            { label: 'Host', value: eventHost?.split(',')[0] || 'Expert Speaker' }
            ],
            about: `<p>${title}. Reach out for more details regarding ${(category || 'update').toLowerCase()} at our institution.</p>`,
            duration, startDate, funding, openDate, requiredTest, policyCategory, effectiveDate, eventType, eventDate: finalEventDate, eventDuration, eventHost, eventLink, eventVenue,
            applyLink: category === 'Scholarship' ? '/application' : (category === 'Admissions' ? '/colleges' : '#'),
            document: documentFile ? documentFile.name : null,
            admissionDoc: admissionDocFile ? admissionDocFile.name : null,
            policyDoc: policyDocFile ? policyDocFile.name : null
        };

        if (editingId) {
            updatePost(editingId, postData);
            setEditingId(null);
        } else {
            addPost(postData);
        }

        // Reset form
        setTitle('');
        setHashtags('');
        setImagePreview(null);
        setDeadline('');
        setSuggestions([]);
        setDuration('');
        setStartDate('');
        setFunding('');
        setOpenDate('');
        setRequiredTest('');
        setPolicyCategory('');
        setEffectiveDate('');
        setEventType('');
        setEventDate('');
        setEventDuration('');
        setEventHost('');
        setEventLink('');
        setEventVenue('');
        setDocumentFile(null);
        setAdmissionDocFile(null);
        setPolicyDocFile(null);
    };

    const handleEdit = (post: any) => {
        setEditingId(post.id);
        setTitle(post.title);
        setCategory(post.category);
        setImagePreview(post.image);
        setHashtags(post.hashtags || '');
        setDuration(post.duration || '');
        setStartDate(post.startDate || '');
        setFunding(post.funding || '');
        setOpenDate(post.openDate || '');
        setRequiredTest(post.requiredTest || '');
        setPolicyCategory(post.policyCategory || '');
        setEffectiveDate(post.effectiveDate || '');
        setEventType(post.eventType || '');
        setEventDate(post.eventDate || '');
        setEventDuration(post.eventDuration || '');
        setEventHost(post.eventHost || '');
        setEventLink(post.eventLink || '');
        setEventVenue(post.eventVenue || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const togglePin = (id: string | number) => {
        const post = posts.find(p => p.id.toString() === id.toString());
        if (post) {
            updatePost(id, { ...post, isPinned: !post.isPinned });
        }
    };

    const archivePost = (id: string | number) => {
        const post = posts.find(p => p.id.toString() === id.toString());
        if (post) {
            const newStatus = post.status === 'Archived' ? 'Published' : 'Archived';
            updatePost(id, { ...post, status: newStatus as any });
        }
    };

    const handleDelete = (id: string | number) => {
        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            deletePost(id);
        }
    };

    const filteredPosts = posts.filter(post => {
        let matchesTab = false;
        if (activeTab === 'All') {
            matchesTab = post.status === 'Published';
        } else if (activeTab === 'Drafts') {
            matchesTab = post.status === 'Draft';
        } else if (activeTab === 'Archived') {
            matchesTab = post.status === 'Archived';
        } else {
            // If activeTab is a category name
            matchesTab = post.category === activeTab && post.status === 'Published';
        }

        // University scoping
        const targetUni = effectiveUniversity.trim().toLowerCase();
        const postUni = (post.institution || "").trim().toLowerCase();

        // If Superadmin and NO specific university context is passed, show ALL Published posts
        // Otherwise, match the effective university (passed via state or from profile)
        const matchesUni = (isSuperAdmin && !stateUni)
            ? true
            : (targetUni && (postUni === targetUni || postUni.includes(targetUni) || targetUni.includes(postUni)));

        return matchesTab && matchesUni;
    }).sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

    if (authLoading) {
        return (
            <UniversityLayout title="Post Center">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </UniversityLayout>
        );
    }

    return (
        <UniversityLayout title="Post Center">
            <div className="p-8 max-w-7xl mx-auto w-full space-y-12 font-['Public_Sans']">
                {/* Hero Section */}
                <section>
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 leading-tight">Announcement & Post Manager</h3>
                    <p className="text-slate-500 mt-2 max-w-2xl text-lg font-medium">Create, schedule, and track university-wide updates. Reach students across mobile and web platforms instantly.</p>
                </section>

                {/* Create Post Form */}
                <section className="bg-white rounded-3xl border border-blue-400 shadow-sm shadow-blue-100/50 p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="size-10 rounded-xl bg-[#1E63F3]/10 text-[#1E63F3] flex items-center justify-center">
                            <span className="material-symbols-outlined font-bold">{editingId ? 'edit_note' : 'add_circle'}</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 tracking-tight">{editingId ? 'Edit Post' : 'Create New Post'}</h4>
                        {editingId && (
                            <button
                                onClick={() => {
                                    setEditingId(null);
                                    setTitle('');
                                    setHashtags('');
                                    setImagePreview(null);
                                    setDuration('');
                                    setStartDate('');
                                    setFunding('');
                                    setOpenDate('');
                                    setRequiredTest('');
                                    setPolicyCategory('');
                                    setEffectiveDate('');
                                    setEventLink('');
                                    setEventVenue('');
                                    setDocumentFile(null);
                                    setAdmissionDocFile(null);
                                    setPolicyDocFile(null);
                                }}
                                className="ml-auto text-xs font-bold text-red-500 hover:underline"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-3 gap-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="md:col-span-2 space-y-6">
                            <label className="block">
                                <span className="text-sm font-bold text-slate-700 ml-1">Post Title</span>
                                <input
                                    className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-900 outline-none"
                                    placeholder="e.g. Spring 2024 Scholarship Applications Now Open"
                                    type="text"
                                    value={title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                />
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="text-sm font-bold text-slate-700 ml-1">Category</span>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                    >
                                        <option>Admissions</option>
                                        <option>Policy Update</option>
                                        <option>Scholarship</option>
                                        <option>Event & Webinar</option>
                                    </select>
                                </label>
                                {category !== 'Policy Update' && category !== 'Event & Webinar' && (
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Deadline (Optional)</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                            type="date"
                                            value={deadline}
                                            onChange={(e) => setDeadline(e.target.value)}
                                        />
                                    </label>
                                )}
                            </div>

                            {category === 'Admissions' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Application Open Date</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                            type="date"
                                            value={openDate}
                                            onChange={(e) => setOpenDate(e.target.value)}
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Required Test</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                            placeholder="e.g. GRE/GMAT Optional"
                                            type="text"
                                            value={requiredTest}
                                            onChange={(e) => setRequiredTest(e.target.value)}
                                        />
                                    </label>
                                    <div className="sm:col-span-2">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Admission Details Document (PDF/Doc)</span>
                                        <input
                                            type="file"
                                            ref={admissionDocInputRef}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setAdmissionDocFile(e.target.files?.[0] || null)}
                                        />
                                        <div
                                            onClick={() => admissionDocInputRef.current?.click()}
                                            className="mt-2 border-2 border-dashed border-blue-400 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all font-medium text-slate-600 bg-slate-50/30 shadow-[0_0_15px_rgba(30,99,243,0.03)]"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-slate-400">description</span>
                                                <span className="text-sm">{admissionDocFile ? admissionDocFile.name : 'Upload admission details document'}</span>
                                            </div>
                                            {admissionDocFile && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setAdmissionDocFile(null); }}
                                                    className="text-red-500 hover:text-red-600 p-1"
                                                >
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {category === 'Scholarship' && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Duration</span>
                                        <select
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                        >
                                            <option value="">Select Duration</option>
                                            <option>12 Months</option>
                                            <option>24 Months</option>
                                            <option>3 Years</option>
                                            <option>4 Years</option>
                                            <option>Full Duration</option>
                                        </select>
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Start Date</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Funding Details</span>
                                        <select
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                            value={funding}
                                            onChange={(e) => setFunding(e.target.value)}
                                        >
                                            <option value="">Select Funding</option>
                                            <option>Full Funding</option>
                                            <option>Full + Stipend</option>
                                            <option>Partial Scholarship</option>
                                            <option>Tuition Waiver</option>
                                            <option>Grant</option>
                                        </select>
                                    </label>
                                    <div className="sm:col-span-3">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Scholarship Document (PDF/Doc)</span>
                                        <input
                                            type="file"
                                            ref={docInputRef}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                                        />
                                        <div
                                            onClick={() => docInputRef.current?.click()}
                                            className="mt-2 border-2 border-dashed border-blue-400 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all font-medium text-slate-600 bg-slate-50/30 shadow-[0_0_15px_rgba(30,99,243,0.03)]"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-slate-400">description</span>
                                                <span className="text-sm">{documentFile ? documentFile.name : 'Upload scholarship details document'}</span>
                                            </div>
                                            {documentFile && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setDocumentFile(null); }}
                                                    className="text-red-500 hover:text-red-600 p-1"
                                                >
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {category === 'Event & Webinar' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <label className="block sm:col-span-2">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Event Type</span>
                                        <select
                                            value={eventType}
                                            onChange={(e) => setEventType(e.target.value)}
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                        >
                                            <option value="">Select Event Type</option>
                                            <option>Live Webinar</option>
                                            <option>University Fair</option>
                                            <option>Campus Tour</option>
                                            <option>Q&A Session</option>
                                            <option>Workshop</option>
                                        </select>
                                    </label>
                                    <div className="block sm:col-span-2">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Event Date & Time</span>
                                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                            <input
                                                className="flex-[2] rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                                type="date"
                                                value={eventDatePart}
                                                onChange={(e) => setEventDatePart(e.target.value)}
                                            />
                                            <div className="flex gap-2 flex-1">
                                                <select
                                                    className="flex-1 rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-2 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 appearance-none text-center outline-none"
                                                    value={eventHour}
                                                    onChange={(e) => setEventHour(e.target.value)}
                                                >
                                                    {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(h => (
                                                        <option key={h} value={h}>{h}</option>
                                                    ))}
                                                </select>
                                                <span className="flex items-center text-slate-400 font-bold">:</span>
                                                <select
                                                    className="flex-1 rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-1 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 appearance-none text-center outline-none"
                                                    value={eventMinute}
                                                    onChange={(e) => setEventMinute(e.target.value)}
                                                >
                                                    {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map(m => (
                                                        <option key={m} value={m}>{m}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    className="flex-1 rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-2 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 appearance-none text-center uppercase outline-none"
                                                    value={eventPeriod}
                                                    onChange={(e) => setEventPeriod(e.target.value)}
                                                >
                                                    <option value="am">am</option>
                                                    <option value="pm">pm</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Duration</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 focus:border-[#1E63F3] focus:ring-[#1E63F3] transition-all font-medium text-slate-900"
                                            placeholder="e.g. 60 Minutes"
                                            type="text"
                                            value={eventDuration}
                                            onChange={(e) => setEventDuration(e.target.value)}
                                        />
                                    </label>
                                    <label className="block sm:col-span-2">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Host/Speaker Information</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-900 outline-none"
                                            placeholder="e.g. Dr. Sarah Johnson, Dean of Admissions"
                                            type="text"
                                            value={eventHost}
                                            onChange={(e) => setEventHost(e.target.value)}
                                        />
                                    </label>
                                    <label className="block sm:col-span-2">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Virtual Meeting Link (Optional)</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-900 outline-none"
                                            placeholder="e.g. https://zoom.us/j/123456789"
                                            type="text"
                                            value={eventLink}
                                            onChange={(e) => setEventLink(e.target.value)}
                                        />
                                    </label>
                                    <label className="block sm:col-span-2">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Venue (if not virtual)</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-900 outline-none"
                                            placeholder="e.g. Main Auditorium, Building A"
                                            type="text"
                                            value={eventVenue}
                                            onChange={(e) => setEventVenue(e.target.value)}
                                        />
                                    </label>
                                </div>
                            )}

                            {category === 'Policy Update' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Policy Category</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                            placeholder="e.g. Visa Route / Work Rights"
                                            type="text"
                                            value={policyCategory}
                                            onChange={(e) => setPolicyCategory(e.target.value)}
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Effective Date</span>
                                        <input
                                            className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all font-medium text-slate-900 outline-none"
                                            type="date"
                                            value={effectiveDate}
                                            onChange={(e) => setEffectiveDate(e.target.value)}
                                        />
                                    </label>
                                    <div className="sm:col-span-2">
                                        <span className="text-sm font-bold text-slate-700 ml-1">Policy Update Document (PDF/Doc)</span>
                                        <input
                                            type="file"
                                            ref={policyDocInputRef}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setPolicyDocFile(e.target.files?.[0] || null)}
                                        />
                                        <div
                                            onClick={() => policyDocInputRef.current?.click()}
                                            className="mt-2 border-2 border-dashed border-blue-400 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all font-medium text-slate-600 bg-slate-50/30"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-slate-400">policy</span>
                                                <span className="text-sm">{policyDocFile ? policyDocFile.name : 'Upload policy update document'}</span>
                                            </div>
                                            {policyDocFile && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setPolicyDocFile(null); }}
                                                    className="text-red-500 hover:text-red-600 p-1"
                                                >
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-3">
                                <label className="block">
                                    <span className="text-sm font-bold text-slate-700 ml-1">Hashtags</span>
                                    <input
                                        className="mt-2 block w-full rounded-2xl border-blue-400 bg-slate-50/50 py-3 px-4 shadow-[0_0_15px_rgba(30,99,243,0.1)] focus:border-[#1E63F3] focus:ring-0 focus:shadow-[0_0_20px_rgba(30,99,243,0.25)] focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-900 outline-none"
                                        placeholder="#Education #University #Update"
                                        type="text"
                                        value={hashtags}
                                        onChange={(e) => setHashtags(e.target.value)}
                                    />
                                </label>

                                {suggestions.length > 0 && (
                                    <div className="flex flex-wrap gap-2 px-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 self-center mr-1">
                                            <span className="material-symbols-outlined text-sm">magic_button</span>
                                            Suggestions:
                                        </span>
                                        {suggestions.map((tag) => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => addSuggestion(tag)}
                                                className="px-3 py-1 bg-blue-50 text-[#1E63F3] text-[10px] font-black rounded-lg border border-blue-400 hover:bg-blue-100 transition-all flex items-center gap-1 group"
                                            >
                                                {tag}
                                                <span className="material-symbols-outlined text-[10px] group-hover:rotate-90 transition-transform">add</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <span className="text-sm font-bold text-slate-700 ml-1">Header Image</span>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-2 border-2 border-dashed border-blue-400 rounded-3xl p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-[#1E63F3]/30 transition-all h-36 md:h-64 bg-slate-50/30 group relative overflow-hidden"
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-slate-400 text-4xl group-hover:text-[#1E63F3] transition-colors">upload_file</span>
                                            <p className="text-xs text-slate-500 mt-2 font-bold">
                                                Drag & drop or <span className="text-[#1E63F3] underline">browse</span>
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-1 font-medium">Recommended: 4:1 Panoramic (1024x256px)</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {isFormComplete && (
                                    <button
                                        onClick={() => handlePostSubmit(true)}
                                        className="flex-1 bg-white border-2 border-slate-100 hover:bg-slate-50 text-slate-900 font-black py-2.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] text-xs"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">drafts</span>
                                        DRAFT POST
                                    </button>
                                )}
                                <button
                                    onClick={() => handlePostSubmit(false)}
                                    className={`${isFormComplete ? 'flex-1' : 'w-full'} bg-[#1E63F3] hover:bg-blue-700 text-white font-black py-2.5 px-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-[0.98] ${!isFormComplete ? 'opacity-50 cursor-not-allowed' : ''} text-xs`}
                                    type="submit"
                                    disabled={!isFormComplete}
                                >
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                    {editingId ? 'UPDATE POST' : 'PUBLISH POST'}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>

                {/* Current Posts Grid */}
                <section className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                                <span className="material-symbols-outlined">grid_view</span>
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 tracking-tight">Current Posts</h4>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={clearAllPosts}
                                className="px-4 py-2 bg-red-50 text-red-600 text-[10px] font-black rounded-xl border border-red-200 hover:bg-red-100 transition-all flex items-center gap-1.5 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                                CLEAR ALL MY POSTS
                            </button>
                            <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner border border-slate-200/50">
                                {['All', 'Drafts', 'Archived'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        {filteredPosts.map((post) => {
                            const isAdmission = post.category === 'Admissions';
                            const isPolicy = post.category === 'Policy Update';
                            const isScholarship = post.category === 'Scholarship';

                            return (
                                <div key={post.id} className={`group bg-white rounded-3xl border ${post.isPinned ? 'border-[#1E63F3] shadow-blue-100/50' : 'border-blue-400'} overflow-hidden shadow-sm transition-all duration-300 relative max-w-5xl mx-auto w-full mb-8`}>

                                    {/* Top Institution Header (Matches Student View) */}
                                    <div className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full border border-slate-100 overflow-hidden bg-white flex items-center justify-center p-1 shadow-sm">
                                                <img src={post.logo} className="w-full h-full object-contain" alt={post.institution} />
                                            </div>
                                            <div className="flex flex-col text-[#6b7280]">
                                                <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">
                                                    {post.location}
                                                </span>
                                                <span className="text-[13px] font-bold text-slate-900 leading-none">
                                                    {post.institution}
                                                </span>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold border shadow-sm ${isAdmission ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            isPolicy ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                'bg-blue-50 text-blue-600 border-blue-400'
                                            }`}>
                                            {isAdmission ? 'Admission Open' : isPolicy ? 'Policy Update' : isScholarship ? 'Scholarship' : 'Event & Webinar'}
                                        </span>
                                    </div>

                                    {/* Banner Section */}
                                    <div className="px-5">
                                        <div className="relative h-36 md:h-64 overflow-hidden rounded-2xl bg-slate-100 border border-slate-50">
                                            <img
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                                src={post.image || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                                            />

                                            {/* Admin Actions (Overlay) */}
                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <button
                                                    onClick={() => togglePin(post.id)}
                                                    className={`size-9 ${post.isPinned ? 'bg-[#1E63F3] text-white' : 'bg-white text-slate-700'} rounded-xl flex items-center justify-center hover:text-[#1E63F3] shadow-lg transition-colors active:scale-90 border border-slate-100`}
                                                >
                                                    <span className={`material-symbols-outlined text-[20px] ${post.isPinned ? 'FILL-1' : ''}`} style={{ fontVariationSettings: post.isPinned ? "'FILL' 1" : "" }}>push_pin</span>
                                                </button>
                                                <button
                                                    onClick={() => archivePost(post.id)}
                                                    className={`size-9 ${post.status === 'Archived' ? 'bg-red-500 text-white' : 'bg-white text-slate-700'} rounded-xl flex items-center justify-center hover:text-red-600 shadow-lg transition-colors active:scale-90 border border-slate-100`}
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">archive</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 pt-6">
                                        {/* Dynamic Title Color */}
                                        <h5 className={`text-[22px] font-black leading-tight mb-6 ${isAdmission ? 'text-[#1E63F3]' : 'text-slate-900'}`}>
                                            {post.title}
                                        </h5>

                                        {/* Info Bar (Matches Student Layout) */}
                                        <div className="bg-[#fcfdfe] border border-slate-100/50 rounded-2xl p-4 flex flex-wrap items-center gap-x-10 gap-y-3 mb-6">
                                            <div className="flex items-center gap-2.5">
                                                {(isScholarship || isAdmission) && <span className="material-symbols-outlined text-orange-600 text-[20px]">schedule</span>}
                                                {(isPolicy || (post.category === 'Event & Webinar')) && <span className="material-symbols-outlined text-slate-400 text-[20px]">{post.category === 'Event & Webinar' ? 'event' : 'calendar_today'}</span>}
                                                <span className={`text-[13px] font-bold tracking-tight ${(isScholarship || isAdmission) ? 'text-orange-600' : 'text-slate-500'}`}>
                                                    {post.expiry || (isScholarship && (post as any).deadline ? `Deadline: ${formatDate((post as any).deadline)}` : isAdmission ? (formatDate((post as any).openDate) || 'Sep 01, 2024') : isPolicy ? (`Effective: ${formatDate((post as any).effectiveDate) || 'Immediate'}`) : (post.category === 'Event & Webinar' ? (formatDateTime((post as any).eventDate || (eventDatePart ? `${eventDatePart}T${eventPeriod === 'pm' && eventHour !== '12' ? parseInt(eventHour) + 12 : (eventPeriod === 'am' && eventHour === '12' ? '00' : eventHour.padStart(2, '0'))}:${eventMinute}:00` : '')) || 'Oct 25, 02:00 pm') : 'Immediate'))}
                                                </span>
                                            </div>
                                            <div className="text-[13px] text-slate-500 font-bold tracking-tight uppercase">
                                                {isScholarship ? ((post as any).duration || '12 - 24 Months') : isAdmission ? ((post as any).deadline ? new Date((post as any).deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Dec 03, 2024') : isPolicy ? ((post as any).policyCategory || 'Visa Update') : (post.category === 'Event & Webinar' ? ((post as any).eventType || 'Webinar') : '12 - 24 Months')}
                                            </div>
                                            <div className="text-[13px] text-slate-500 font-bold tracking-tight uppercase">
                                                {isScholarship ? ((post as any).startDate || 'Sep 2025') : isPolicy ? 'Confirmed' : (post.category === 'Event & Webinar' ? ((post as any).eventDuration || '60 Mins') : 'Sep 2025')}
                                            </div>
                                            <div className="text-[13px] text-slate-500 font-bold tracking-tight uppercase">
                                                {isScholarship ? ((post as any).funding || 'Full + Stipend') : isAdmission ? ((post as any).requiredTest || 'Optional') : isPolicy ? 'Home Office' : (post.category === 'Event & Webinar' ? ((post as any).eventHost?.split(',')[0] || 'Guest Speaker') : 'Full + Stipend')}
                                            </div>
                                        </div>
                                        {/* Post Content Snippet */}
                                        <p className="text-slate-500 leading-relaxed font-medium mb-8 text-[15px]">
                                            {isAdmission
                                                ? 'Stanford University School of Engineering is accepting applications for MS and PhD programs for the Fall 2025 intake. The school is known for its entrepreneurial spirit and cutting-edge research facilities.'
                                                : isPolicy
                                                    ? 'The UK government has recently completed its review of the Graduate Route visa and has confirmed that it will remain in place. This visa allows international students who have successfully completed an eligible course in the UK to stay and work for two years.'
                                                    : 'The DAAD scholarship offers full financial support including a monthly stipend of €934, health insurance, and travel allowance for international students pursuing postgraduate studies at state-recognized German universities.'
                                            }
                                        </p>

                                        {/* Hashtags */}
                                        <div className="flex flex-wrap gap-2 mb-10">
                                            {(post.hashtags || (isAdmission ? '#STEM #USA #Fall2025' : isPolicy ? '#VisaUpdate #WorkInUK #PSW' : '#FullyFunded #Masters #NoTuition')).split(/\s+/).map((h: string, i: number) => (
                                                <span key={i} className="text-slate-500 text-[12px] font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-widest">
                                                    {h}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                            {/* Social Icons (For Preview) */}
                                            <div className="flex items-center gap-5 text-slate-400">
                                                <span className="material-symbols-outlined cursor-pointer hover:text-slate-600 text-[22px]">bookmark_border</span>
                                                <span className="material-symbols-outlined cursor-pointer hover:text-slate-600 text-[22px]">share</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="bg-slate-50 text-slate-600 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 border border-slate-100"
                                                >
                                                    Edit
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-2 border border-red-100"
                                                >
                                                    Delete
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </section>
            </div>
        </UniversityLayout >
    );
};

export default PostCenter;
