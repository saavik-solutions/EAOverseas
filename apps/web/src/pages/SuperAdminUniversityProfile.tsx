import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

const SuperAdminUniversityProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isAddCourseModalOpen, setIsAddCourseModalOpen] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [showAllCourses, setShowAllCourses] = React.useState(false);
    const [isProfileEditing, setIsProfileEditing] = React.useState(false);
    
    const [courseForm, setCourseForm] = React.useState({
        title: '', school: '', duration: '', tuition: '', location: '',
        matchRate: '98', matchAnalysis: '', 
        gpaReq: 'Competitive', academicReq: 'Match', englishReq: 'Missing',
        overview: '', outcomes: '', improvements: '',
        intakes: [{ term: 'Sep 2024', status: 'Open', deadline: 'July 31, 2024' }]
    });

    // Mock data based on the ID (matching the universities in the management page)
    const universities = [
        {
            id: 1,
            name: 'University of Toronto',
            country: 'Canada',
            location: 'Toronto, Canada',
            joined: 'Oct 2021',
            website: 'utoronto.ca',
            status: 'Active',
            stats: { posts: '1,284', opportunities: '156', reach: '24.5k', score: '98/100' },
            about: 'The University of Toronto is a public research university in Toronto, Ontario, Canada, situated on the grounds that surround Queens Park. It was founded by royal charter in 1827 as Kings College, the first institution of higher learning in Upper Canada.',
            type: 'Public Research',
            accreditation: 'UU Accredited'
        },
        {
            id: 6,
            name: 'Harvard University',
            country: 'USA',
            location: 'Cambridge, USA',
            joined: 'Jan 2020',
            website: 'harvard.edu',
            status: 'Active',
            stats: { posts: '3,450', opportunities: '420', reach: '85k', score: '99/100' },
            about: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636 and named for its first benefactor, clergyman John Harvard, it is the oldest institution of higher learning in the United States.',
            type: 'Private Ivy League',
            accreditation: 'NECHE Accredited'
        }
    ];

    const initialUni = universities.find(u => u.id === Number(id)) || universities[0];
    const [uni, setUni] = React.useState(initialUni);

    const updateCourseForm = (field: string, val: any) => setCourseForm(prev => ({ ...prev, [field]: val }));
    const updateUniData = (field: string, val: any) => setUni(prev => ({ ...prev, [field]: val }));

    const handleUploadNew = () => {
        setIsEditMode(false);
        setCourseForm({
            title: '', school: '', duration: '', tuition: '', location: '',
            matchRate: '98', matchAnalysis: '', 
            gpaReq: 'Competitive', academicReq: 'Match', englishReq: 'Missing',
            overview: '', outcomes: '', improvements: '',
            intakes: [{ term: 'Sep 2024', status: 'Open', deadline: 'July 31, 2024' }]
        });
        setIsAddCourseModalOpen(true);
    };

    const handleEditCourse = (course: any) => {
        setIsEditMode(true);
        setCourseForm({
            ...courseForm,
            ...course,
            overview: course.overview || 'Standard institutional course overview...',
            outcomes: course.outcomes || 'Software Engineer, Data Scientist, Researcher',
            improvements: course.improvements || 'Focus on relevant internships and academic projects.',
            intakes: course.intakes || [{ term: 'Sep 2024', status: 'Open', deadline: 'July 31, 2024' }]
        });
        setIsAddCourseModalOpen(true);
    };

    return (
        <SuperAdminLayout title="University Profile">
            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                {/* Merged Header & About Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <div className="p-6 border-b border-slate-50">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex items-start gap-5">
                                <div className="h-20 w-20 rounded-2xl bg-[#2b6cee]/10 p-3.5 border border-[#2b6cee]/20 flex items-center justify-center text-[#2b6cee] shrink-0">
                                    <span className="material-symbols-outlined text-3xl">{uni.name.charAt(0)}</span>
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        {isProfileEditing ? (
                                            <input 
                                                value={uni.name}
                                                onChange={e => updateUniData('name', e.target.value)}
                                                className="text-2xl font-bold text-slate-900 border-2 border-[#2b6cee]/30 rounded-lg px-2 -mx-2 bg-blue-50/30 outline-none focus:border-[#2b6cee] transition-all w-full max-w-md"
                                            />
                                        ) : (
                                            <h1 className="text-2xl font-bold text-slate-900">{uni.name}</h1>
                                        )}
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${uni.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            uni.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                            }`}>
                                            {uni.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-sm">
                                        <div className="flex items-center gap-1.5 font-medium min-w-[200px]">
                                            <span className="material-symbols-outlined text-[20px]">location_on</span>
                                            {isProfileEditing ? (
                                                <input value={uni.location} onChange={e => updateUniData('location', e.target.value)} className="border-2 border-[#2b6cee]/30 rounded-md px-1 bg-blue-50/30 outline-none" />
                                            ) : (
                                                <span>{uni.location}</span>
                                            )}
                                        </div>
                                        <span className="flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-[20px]">calendar_today</span> Joined {uni.joined}</span>
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <span className="material-symbols-outlined text-[20px]">link</span>
                                            {isProfileEditing ? (
                                                <input value={uni.website} onChange={e => updateUniData('website', e.target.value)} className="border-2 border-[#2b6cee]/30 rounded-md px-1 bg-blue-50/30 outline-none" />
                                            ) : (
                                                <span>{uni.website}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                {isProfileEditing ? (
                                    <>
                                        <button onClick={() => setIsProfileEditing(false)} className="px-5 py-2.5 bg-slate-100 text-slate-500 hover:text-slate-700 font-bold rounded-xl transition-all text-sm uppercase tracking-wider">
                                            Cancel
                                        </button>
                                        <button onClick={() => setIsProfileEditing(false)} className="px-5 py-2.5 bg-[#2b6cee] text-white hover:bg-blue-700 font-bold rounded-xl transition-all text-sm uppercase tracking-wider shadow-lg shadow-blue-100">
                                            Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => setIsProfileEditing(true)} className="px-5 py-2.5 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold rounded-xl transition-all text-sm border border-slate-200">
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-50">
                            <div className="flex items-center justify-start mb-3">
                                <h3 className="font-bold text-slate-900">About University</h3>
                            </div>
                            <div className="relative">
                                {isProfileEditing ? (
                                    <textarea 
                                        value={uni.about}
                                        onChange={e => updateUniData('about', e.target.value)}
                                        rows={4}
                                        className="w-full text-slate-700 leading-relaxed text-[15px] font-medium font-['Outfit'] border-2 border-[#2b6cee]/30 rounded-2xl p-4 bg-blue-50/30 outline-none focus:border-[#2b6cee] transition-all resize-none"
                                    />
                                ) : (
                                    <p className="text-slate-700 leading-relaxed max-w-4xl text-[15px] font-medium font-['Outfit']">
                                        {uni.about}
                                    </p>
                                )}
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4">
                                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">University Type</span>
                                    {isProfileEditing ? (
                                        <input value={uni.type} onChange={e => updateUniData('type', e.target.value)} className="text-sm font-bold text-slate-700 border-b border-[#2b6cee]/30 bg-transparent outline-none w-[150px]" />
                                    ) : (
                                        <span className="text-sm font-bold text-slate-700">{uni.type}</span>
                                    )}
                                </div>
                                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">Accreditation</span>
                                    {isProfileEditing ? (
                                        <input value={uni.accreditation} onChange={e => updateUniData('accreditation', e.target.value)} className="text-sm font-bold text-slate-700 border-b border-[#2b6cee]/30 bg-transparent outline-none w-[150px]" />
                                    ) : (
                                        <span className="text-sm font-bold text-slate-700">{uni.accreditation}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Posts Stat */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Total Posts</span>
                            <div className="p-1.5 bg-[#2b6cee]/10 rounded-lg text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[18px]">description</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.posts}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Active Opportunities</span>
                            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <span className="material-symbols-outlined text-[18px]">work_outline</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.opportunities}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 5%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Student Reach</span>
                            <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
                                <span className="material-symbols-outlined text-[18px]">groups</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.reach}</span>
                            <span className="text-slate-400 text-xs font-bold flex items-center mb-1">
                                Stable
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Verification Score</span>
                            <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.score}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                High
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {/* Courses Section (Shifted) */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-8 bg-[#2b6cee]/10 rounded-xl flex items-center justify-center text-[#2b6cee]">
                                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                                </div>
                                <h3 className="font-bold text-base text-slate-900">Eligible Courses for You</h3>
                            </div>
                            <button 
                                onClick={handleUploadNew}
                                className="px-4 py-1.5 bg-[#2b6cee] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
                            >
                                <span className="material-symbols-outlined text-[16px]">add</span>
                                Add Course
                            </button>
                        </div>

                        <div className="p-5 space-y-4 flex-1">
                            {[
                                { title: 'MS in Computer Science', school: 'Ira A. Fulton Schools of Engineering', duration: '2 Years', starts: 'Aug 2024', tuition: '$32k - $45k / year', match: 'HIGH MATCH' },
                                { title: 'Master of Data Science', school: 'School of Computing and AI', duration: '1.5 Years', starts: 'Aug 2024', tuition: '$35,500', match: 'HIGH MATCH' },
                                { title: 'MBA (Business Analytics)', school: 'W. P. Carey School of Business', duration: '2 Years', starts: 'Jan 2025', tuition: '$52,000', match: 'MED MATCH' },
                                ...(showAllCourses ? [
                                    { title: 'MA in International Relations', school: 'Munk School of Global Affairs', duration: '2 Years', starts: 'Sep 2024', tuition: '$38,000', match: 'MED MATCH' },
                                    { title: 'PhD in Theoretical Physics', school: 'Department of Physics', duration: '4 Years', starts: 'Sep 2024', tuition: 'Fully Funded', match: 'HIGH MATCH' }
                                ] : [])
                            ].map((c, i) => (
                                <div key={i} onClick={() => handleEditCourse(c)} className="group border border-slate-50 rounded-2xl p-4 hover:border-[#2b6cee]/30 hover:bg-slate-50/50 transition-all cursor-pointer flex items-center justify-between">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#2b6cee] transition-colors">{c.title}</h4>
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${c.match.includes('HIGH') ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>{c.match}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                                <span className="text-[10px] font-bold text-slate-500">{c.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <span className="material-symbols-outlined text-[16px]">payments</span>
                                                <span className="text-[10px] font-bold text-slate-500">{c.tuition}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="size-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-[#2b6cee] transition-all opacity-0 group-hover:opacity-100">
                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                        </button>
                                        <div className="size-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#2b6cee] group-hover:text-white transition-all">
                                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-slate-50">
                            <button 
                                onClick={() => setShowAllCourses(!showAllCourses)}
                                className="w-full text-center text-xs font-black text-slate-500 hover:text-[#2b6cee] transition-all py-1.5 uppercase tracking-widest"
                            >
                                {showAllCourses ? 'Show Less' : 'View all 12 courses'}
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="px-5 py-3 border-b border-slate-100">
                            <h3 className="font-bold text-base text-slate-900">Recent Activity</h3>
                        </div>
                        <div className="p-5 space-y-6 flex-1">
                            {/* Timeline Items */}
                            <div className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold">add</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">New Post Published</p>
                                    <p className="text-xs text-slate-500">Summer Internship 2024 - AI Research</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Today, 10:45 AM</span>
                                </div>
                            </div>
                            <div className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-[#2b6cee] font-bold">edit</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">Profile Updated</p>
                                    <p className="text-xs text-slate-500">Modified primary contact details</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Yesterday, 4:20 PM</span>
                                </div>
                            </div>
                            <div className="relative pl-8 last:before:hidden before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-amber-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-amber-500 font-bold">login</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">Admin Login</p>
                                    <p className="text-xs text-slate-500">University admin logged in from SF</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Oct 14, 2023</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-slate-50">
                            <button className="w-full text-center text-sm font-bold text-slate-500 hover:text-[#2b6cee] transition-all py-2 rounded-lg hover:bg-slate-100">View All Activity</button>
                        </div>
                    </section>
                </div>
            </main>

            {/* Upload Course Modal */}
            {isAddCourseModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#2b6cee] text-3xl">{isEditMode ? 'edit_square' : 'add_circle'}</span>
                                    {isEditMode ? 'Edit Course Specification' : 'Upload New Course Specification'}
                                </h2>
                                <p className="text-sm text-slate-500 italic font-medium mt-1">{isEditMode ? 'Update academic requirements and institutional metrics.' : 'Configure academic requirements and student eligibility metrics.'}</p>
                            </div>
                            <button onClick={() => setIsAddCourseModalOpen(false)} className="size-10 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500 transition-all">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200">
                            <div className="space-y-10">
                                {/* Basic Course Info */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#2b6cee]">Section 01 / Basic Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-black text-slate-700 uppercase">Course Title *</label>
                                            <input type="text" value={courseForm.title} onChange={e => updateCourseForm('title', e.target.value)} placeholder="e.g. MS in Computer Science" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-black text-slate-700 uppercase">School / Department *</label>
                                            <input type="text" value={courseForm.school} onChange={e => updateCourseForm('school', e.target.value)} placeholder="e.g. Ira A. Fulton Schools of Engineering" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-[#2b6cee] transition-all" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-black text-slate-700 uppercase">Duration</label>
                                            <input type="text" value={courseForm.duration} onChange={e => updateCourseForm('duration', e.target.value)} placeholder="e.g. 2 Years" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-black text-slate-700 uppercase">Tuition (Intl)</label>
                                            <input type="text" value={courseForm.tuition} onChange={e => updateCourseForm('tuition', e.target.value)} placeholder="e.g. $32,000 / year" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-black text-slate-700 uppercase">Campus Location</label>
                                            <input type="text" value={courseForm.location} onChange={e => updateCourseForm('location', e.target.value)} placeholder="e.g. Tempe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* AI Eligibility Analysis */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#2b6cee]">Section 02 / AI Eligibility Analysis</h4>
                                    
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-700 uppercase">GPA Requirement Status</label>
                                            <select value={courseForm.gpaReq} onChange={e => updateCourseForm('gpaReq', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700">
                                                <option value="Competitive">Competitive</option>
                                                <option value="Match">Match</option>
                                                <option value="Low">Low</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-700 uppercase">English Test Status</label>
                                            <select value={courseForm.englishReq} onChange={e => updateCourseForm('englishReq', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700">
                                                <option value="Match">Match</option>
                                                <option value="Missing">Missing</option>
                                                <option value="Low">Low Score</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-700 uppercase">Academic Background</label>
                                            <select value={courseForm.academicReq} onChange={e => updateCourseForm('academicReq', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700">
                                                <option value="Match">Perfect Match</option>
                                                <option value="Partial">Partial Match</option>
                                                <option value="No Match">Not Recommended</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Outcomes & Improvements */}
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#2b6cee]">Career Outcomes</h4>
                                        <textarea 
                                            value={courseForm.outcomes}
                                            onChange={e => updateCourseForm('outcomes', e.target.value)}
                                            placeholder="Tags (Software Engineer, AI Specialist...)" 
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm min-h-[120px] outline-none"
                                        ></textarea>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#2b6cee]">Chance Improvements</h4>
                                        <textarea 
                                            value={courseForm.improvements}
                                            onChange={e => updateCourseForm('improvements', e.target.value)}
                                            placeholder="Actionable steps for students..." 
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm min-h-[120px] outline-none"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Intake Timeline Management */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#2b6cee]">Section 03 / Intake Timeline</h4>
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                            <div className="md:col-span-1">
                                                <input type="text" placeholder="Term (e.g. Sep 2024)" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="md:col-span-1">
                                                <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold">
                                                    <option>Open - Apply Now</option>
                                                    <option>Not Open Yet</option>
                                                    <option>Closed</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2 flex gap-2">
                                                <input type="text" placeholder="Deadline (e.g. July 31, 2024)" className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold" />
                                                <button className="px-5 bg-slate-900 text-white rounded-xl text-xs font-bold">Add</button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {courseForm.intakes.map((intake, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                                                    <div className="flex items-center gap-4">
                                                        <div className="size-2 rounded-full bg-emerald-500"></div>
                                                        <span className="text-sm font-black text-slate-900">{intake.term}</span>
                                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase">{intake.status}</span>
                                                        <span className="text-xs text-slate-400 font-bold italic">Deadline: {intake.deadline}</span>
                                                    </div>
                                                    <button className="text-slate-300 hover:text-rose-500 transition-colors">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4">
                            <button onClick={() => setIsAddCourseModalOpen(false)} className="px-8 py-3 text-sm font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors">Cancel</button>
                            <button onClick={() => setIsAddCourseModalOpen(false)} className="px-10 py-3 bg-[#111318] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                                {isEditMode ? 'Save Changes' : 'Complete Upload'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </SuperAdminLayout>
    );
};

export default SuperAdminUniversityProfile;
