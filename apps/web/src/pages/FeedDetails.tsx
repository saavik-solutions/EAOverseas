import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ShareModal from '@/features/shared-modals/ShareModal';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useSavedItems } from '@/shared/contexts/SavedItemsContext';
import { usePosts, Post } from '@/shared/contexts/PostsContext';

const FeedDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { requireAuth } = useAuth();
    const { togglePost, isPostSaved } = useSavedItems();
    const { posts } = usePosts();

    const data = useMemo(() => {
        const post = posts.find(p => p.id.toString() === id?.toString());
        return post || null;
    }, [id, posts]);

    // Share Modal State
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    if (!data) {
        return (
            <div className="flex flex-col flex-1 h-screen items-center justify-center bg-gray-50 p-6 text-center">
                <span className="material-symbols-outlined text-gray-300 text-[64px] mb-4">find_in_page</span>
                <h1 className="text-xl font-bold text-gray-900 mb-2">Post Not Found</h1>
                <p className="text-gray-500 mb-6 max-w-xs">The post you are looking for might have been deleted or is no longer available.</p>
                <Link to="/feed" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all">
                    Back to Global Feed
                </Link>
            </div>
        );
    }

    // Dynamic Label Class
    const getLabelClass = () => {
        if (data.id === 'stanford' || data.labelColor?.includes('blue')) return 'bg-blue-50 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100 shadow-sm';
        if (data.id === 'uk_psw' || data.labelColor?.includes('purple')) return 'bg-purple-50 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold text-purple-700 border border-purple-100 shadow-sm';
        return 'bg-green-50 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold text-green-700 border border-green-100 shadow-sm';
    };

    const handleApply = () => {
        if (data.applyLink && data.applyLink !== '#') {
            navigate(data.applyLink);
        }
    };

    const handleSave = () => {
        requireAuth(() => {
            togglePost(data);
        });
    };

    const downloadGuide = () => {
        const guideContent = `
EAOverseas Scholarship Guide
============================

Program: ${data.title}
Institution: ${data.institution}
Location: ${data.location}

---

Step-by-Step Application Process:
1. Review the Eligibility Criteria carefully.
2. Prepare all Required Documents (CV, Transcripts, Statement of Purpose).
3. Complete the Online Application Form via the "Apply Now" button.
4. Ensure submission before the deadline.

For further assistance, please reach out to our support team at info@eaoverseas.com.

Good luck!
        `;
        const blob = new Blob([guideContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.id}_scholarship_guide.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="flex flex-1 h-full overflow-hidden">
            {/* Center Content */}
            <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
                {/* Header */}
                <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Link to="/" className="hover:text-primary transition-colors">
                            <span className="material-symbols-outlined !text-[18px]">home</span>
                        </Link>
                        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                        <Link to="/feed" className="text-gray-500 hover:text-gray-900 cursor-pointer">Global Feed</Link>
                        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                        <span className="text-gray-900 font-medium">Post Details</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden lg:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-[20px]">search</span>
                            <input
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-64 placeholder-gray-400"
                                placeholder="Search..." type="text" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-3 md:p-6 scroll-smooth">
                    <div className="max-w-5xl mx-auto pb-20">
                        <article className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="h-36 md:h-64 w-full relative group bg-gray-100">
                                <img src={data.banner || data.image} alt="Banner" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                    <span className={getLabelClass()}>{data.label}</span>
                                </div>
                            </div>

                            <div className="px-3 py-4 md:px-6 md:pt-6 md:pb-6">
                                <div className="flex flex-col gap-4 md:gap-6">
                                    <div className="flex gap-3 md:gap-4 items-start">
                                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg border border-gray-200 bg-white flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-sm">
                                            <img src={data.logo} alt="Institution Logo" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h1 className="text-lg md:text-2xl font-bold text-gray-900 leading-tight mb-2">
                                                {data.title}
                                            </h1>
                                            <div className="flex items-center flex-wrap gap-y-1 gap-x-2 md:gap-x-3 text-xs md:text-sm text-gray-500">
                                                <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                                                    {data.institution}
                                                </span>
                                                <span className="text-gray-300">•</span>
                                                <span className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                                    {data.location}
                                                </span>
                                                <span className="text-gray-300">•</span>
                                                {data.verified && (
                                                    <span className="text-green-600 font-medium flex items-center gap-1.5 bg-green-50 px-1.5 py-0.5 md:px-2 rounded-full text-[10px] md:text-xs">
                                                        <span className="material-symbols-outlined text-[14px] md:text-[16px]">verified</span>
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                                        <div></div>
                                        <div className="flex gap-2 module:gap-3 justify-between w-full md:w-auto md:justify-start">
                                            <button onClick={() => setIsShareModalOpen(true)} className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-1.5 md:gap-2 text-xs md:text-sm shadow-sm flex-1 md:flex-none justify-center">
                                                <span className="material-symbols-outlined text-[18px] md:text-[20px]">share</span>
                                                Share
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className={`px-3 py-1.5 md:px-4 md:py-2 bg-white border font-medium rounded-lg transition-colors flex items-center gap-1.5 md:gap-2 text-xs md:text-sm shadow-sm flex-1 md:flex-none justify-center ${isPostSaved(data) ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-gray-900 border-gray-200 hover:bg-gray-50 hover:text-primary'}`}
                                            >
                                                <span className={`material-symbols-outlined text-[18px] md:text-[20px] ${isPostSaved(data) ? '!fill-current' : ''}`}>
                                                    {isPostSaved(data) ? 'bookmark' : 'bookmark_border'}
                                                </span>
                                                {isPostSaved(data) ? 'Saved' : 'Save'}
                                            </button>
                                            {(data.applyLink && data.applyLink !== '#') && (
                                                <button onClick={handleApply} className="px-4 py-1.5 md:px-6 md:py-2.5 bg-blue-600 text-white font-medium rounded-lg flex items-center gap-1.5 md:gap-2 text-xs md:text-sm flex-1 md:flex-none justify-center">
                                                    {(data.id === 'stanford' || data.category === 'Admissions') ? 'View Programs' : 'Apply Now'}
                                                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">open_in_new</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {data.grid && data.grid.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-200 bg-gray-50/50 divide-x divide-y md:divide-y-0 divide-gray-200">
                                    {data.grid.map((item, index) => (
                                        <div key={index} className="p-3 md:p-4 flex flex-col items-center justify-center text-center gap-1">
                                            <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</span>
                                            <span className={`text-xs md:text-sm font-bold flex items-center gap-1 ${item.color || 'text-gray-900'} ${item.alert ? 'text-red-600' : ''}`}>
                                                {item.value}
                                                {item.alert && <span className="material-symbols-outlined text-[14px] md:text-[16px]">warning</span>}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="px-4 py-6 md:px-6 md:py-8 flex flex-col gap-6 md:gap-8">
                                <section dangerouslySetInnerHTML={{ __html: data.about || `<p>${data.title}</p>` }} />

                                {data.eligibility && data.eligibility.length > 0 && (
                                    <section className="bg-blue-50/40 border border-blue-100 rounded-xl p-6">
                                        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-[22px]">fact_check</span>
                                            Eligibility Criteria
                                        </h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                            {data.eligibility.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                                                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {data.benefits && data.benefits.length > 0 && (
                                        <section>
                                            <h3 className="text-base font-bold text-gray-900 mb-4">Scholarship Benefits</h3>
                                            <ul className="space-y-3">
                                                {data.benefits.map((ben, i) => (
                                                    <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 group hover:border-blue-200 transition-colors">
                                                        <div className={`w-8 h-8 rounded ${ben.bg} ${ben.text} flex items-center justify-center`}>
                                                            <span className="material-symbols-outlined text-[18px]">{ben.icon}</span>
                                                        </div>
                                                        <div className="text-sm">
                                                            <span className="block font-semibold text-gray-900">{ben.title}</span>
                                                            <span className="text-gray-500">{ben.desc}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {/* Document Section - Conditional for Events */}
                                    <section>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {data.category === 'Event & Webinar' ? 'Event Details' : 'Required Documents'}
                                            </h3>
                                        </div>
                                        {data.category === 'Event & Webinar' ? (
                                            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 shadow-sm">
                                                <div className="space-y-5">
                                                    <div className="flex items-start gap-4">
                                                        <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0 border border-blue-50">
                                                            <span className="material-symbols-outlined">schedule</span>
                                                        </div>
                                                        <div>
                                                            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Start Timing</span>
                                                            <span className="text-[15px] font-bold text-gray-900 leading-tight">
                                                                {data.eventDate ? new Date(data.eventDate).toLocaleString('en-US', {
                                                                    weekday: 'long',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    hour12: true
                                                                }).replace(/\s?[AP]M$/, (match) => match.toLowerCase()) : 'Not Scheduled'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {(data.eventLink || data.eventVenue) && (
                                                        <div className="flex items-start gap-4">
                                                            <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0 border border-blue-50">
                                                                <span className="material-symbols-outlined">
                                                                    {data.eventLink ? 'video_camera_front' : 'location_on'}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                                                                    {data.eventLink ? 'Virtual Meeting' : 'Physical Venue'}
                                                                </span>
                                                                {data.eventLink ? (
                                                                    <a
                                                                        href={data.eventLink.startsWith('http') ? data.eventLink : `https://${data.eventLink}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-[15px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1.5 transition-colors"
                                                                    >
                                                                        Join Virtual Meeting
                                                                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                                                    </a>
                                                                ) : (
                                                                    <span className="text-[15px] font-bold text-gray-900 leading-tight">{data.eventVenue}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                                <ul className="space-y-3 text-sm text-gray-700">
                                                    <li className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-gray-400 text-[18px]">description</span>
                                                        Completed application form
                                                    </li>
                                                    <li className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-gray-400 text-[18px]">description</span>
                                                        CV / Resume
                                                    </li>
                                                    <li className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-gray-400 text-[18px]">description</span>
                                                        Transcripts
                                                    </li>
                                                </ul>
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <button onClick={downloadGuide} className="w-full py-2 text-primary text-sm font-medium hover:bg-white rounded-lg border border-transparent hover:border-blue-100 transition-all flex items-center justify-center gap-2">
                                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                                        Download Guide
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                </div>

                                <section>
                                    <div className="flex justify-start pt-4 border-t border-gray-100">
                                        <Link to="/feed" className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-primary transition-all flex items-center gap-2 text-sm">
                                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                            Back to Feed
                                        </Link>
                                    </div>
                                </section>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDEBAR: Widgets */}
            <aside className="hidden xl:flex w-80 flex-col h-full border-l border-border-subtle bg-white overflow-y-auto shrink-0 z-10 p-5">
                {/* Trending Widget */}
                <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
                        <h3 className="text-sm font-bold text-text-main">Trending Topics</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['#Fall2026', '#NoIELTS', '#GermanyScholarships', '#FullyFunded', '#MBA'].map(tag => (
                            <a key={tag} className="text-xs font-medium bg-white text-gray-700 px-3 py-1.5 rounded-md border border-gray-200 hover:border-primary hover:text-primary transition-colors" href="#">{tag}</a>
                        ))}
                    </div>
                </div>
                {/* Deadline Alerts Widget */}
                <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-orange-500 text-[20px]">warning</span>
                            <h3 className="text-sm font-bold text-text-main">Deadline Alerts</h3>
                        </div>
                        <a href="#" className="text-xs font-bold text-primary hover:underline">View All</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="pb-3 border-b border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Chevening Scholarship UK</h4>
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-red-500"></div>
                                <span className="text-xs font-medium text-red-500">Closes in 2 days</span>
                            </div>
                        </div>
                        <div className="pb-3 border-b border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Fulbright Program USA</h4>
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-orange-500"></div>
                                <span className="text-xs font-medium text-orange-500">Closes in 5 days</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">University of Melbourne - Round 1</h4>
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-orange-400"></div>
                                <span className="text-xs font-medium text-orange-400">Closes next week</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Top Countries Widget */}
                <div className="bg-[#F9FAFB] rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-primary text-[20px]">leaderboard</span>
                        <h3 className="text-sm font-bold text-text-main">Top Countries This Week</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-gray-400 w-2">1</span>
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 relative">
                                    <img className="w-full h-full object-cover" alt="USA Flag" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnO8lRZ5YoI0-YSOqy2UNL4syeuMqyPVf7f3gjyRAx2hebQy4qlZP15AnBQ1SwkpikMN5XIldgAlxK02Z9CXi8o_EaKthM0rcHTKDXmUf2Sd0zJOEKzBZzKObbpl-PkguwGPwHI1VBBWK_CoWvQFO49rXmvseOwrwoW5bywZ6g2ZdzRpo4RmwtHMY-WWuFqA23Dn5HZvW78i_troyV5vb-0DKq2CvbEmnhHR9RLKUywIVT6H5KV5xV3qAUaWIAJ5z_2zX2_RyHdxxv" />
                                </div>
                                <span className="text-sm font-medium text-text-main">USA</span>
                            </div>
                            <span className="text-xs text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-200">+12%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-gray-400 w-2">2</span>
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 relative">
                                    <img className="w-full h-full object-cover" alt="Germany Flag" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgahv8HE26S4cCNGjL8f3Bv13gsNJ3izEGAOXH93JKuPHP9n831d_Dm_ES_jF0wTXpVoCyEQP1eRcP_AYVWPxN03ZT18DX-C6pBz6KI5zRizzfv8szgWxEKEvip9w0DZBC9DOUlBAD4CESoXLN7MLgu2g_H68y1caUkCGXNsHC7klv8grkdNDKgHed-aXc-0pqleKbn5MEkV0x-rfyOvj-mr4coWW1Sc9e9NsvO7oKwfBt4gaDl24LYbdeQtUMhBrzVRM6zeZTq9aB" />
                                </div>
                                <span className="text-sm font-medium text-text-main">Germany</span>
                            </div>
                            <span className="text-xs text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-200">+8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-gray-400 w-2">3</span>
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 relative">
                                    <img className="w-full h-full object-cover" alt="UK Flag" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmKADPSs6FCqzfKOmPANLv0mvrYy4-WaYlA_WLHTttBPRyXLG7AgIUgG5Zw3Npf73ztbdYrlTnCO-Yy5FRc62qvMvk7WPcW8orPcR77JucQdH8nqp8MXh6gl59BMEcP23pdw8BKCgO3lGWgsKYT1nfg-1uAJdHsHo6W-9gSC6yq9-p0gvaSl4ov_LIkt4XFIMfIEVkz7NqBcPS_kvZ0vm9imLwcnV0nKQlhdVIc3rjb1mYTGUO82MB3WGGCrexr06pD-4TmisGEb1J" />
                                </div>
                                <span className="text-sm font-medium text-text-main">UK</span>
                            </div>
                            <span className="text-xs text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-200">+5%</span>
                        </div>
                    </div>
                </div>
                {/* Quick Tip */}
                <div className="mt-5 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex gap-2 items-start">
                        <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
                        <div>
                            <h4 className="text-sm font-bold text-primary mb-1">Quick Tip</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">Early applicants have a 40% higher chance of securing scholarships. Don't wait for the deadline!</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Share Modal */}
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                title="Share Post"
                shareUrl={`https://eaoverseas.com/feed-details/${data.id}`}
                preview={{
                    title: data.title,
                    subtitle: data.institution,
                    image: data.banner || data.image
                }}
            />
        </div>
    );
};

export default FeedDetails;

