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
    
    // New Modal States & Logic
    const [courseName, setCourseName] = React.useState('');
    const [courseLevel, setCourseLevel] = React.useState('Postgraduate');
    const [courseDuration, setCourseDuration] = React.useState('2 Years');
    const [courseFee, setCourseFee] = React.useState('25,000');
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [academicReqs, setAcademicReqs] = React.useState<string[]>(['Bachelors Degree', '6.5 IELTS']);
    const [outcomes, setOutcomes] = React.useState<string[]>([]);
    const [tempAcademic, setTempAcademic] = React.useState('');
    const [tempOutcome, setTempOutcome] = React.useState('');
    const [intakePairs, setIntakePairs] = React.useState<{intake: string, deadline: string | null}[]>([]);
    const [configuringIntakeIdx, setConfiguringIntakeIdx] = React.useState<number | null>(null);

    const handleMonthClick = (month: string) => {
        if (configuringIntakeIdx !== null) {
            const newPairs = [...intakePairs];
            newPairs[configuringIntakeIdx].deadline = month;
            setIntakePairs(newPairs);
            setConfiguringIntakeIdx(null);
        } else {
            const existingIdx = intakePairs.findIndex(p => p.intake === month);
            if (existingIdx !== -1) {
                setIntakePairs(prev => prev.filter((_, i) => i !== existingIdx));
            } else {
                const newIdx = intakePairs.length;
                setIntakePairs([...intakePairs, { intake: month, deadline: null }]);
                setConfiguringIntakeIdx(newIdx);
            }
        }
    };

    const addAcademicTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tempAcademic.trim()) {
            e.preventDefault();
            if (!academicReqs.includes(tempAcademic.trim())) {
                setAcademicReqs([...academicReqs, tempAcademic.trim()]);
            }
            setTempAcademic('');
        }
    };

    const addOutcomeTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tempOutcome.trim()) {
            e.preventDefault();
            if (!outcomes.includes(tempOutcome.trim())) {
                setOutcomes([...outcomes, tempOutcome.trim()]);
            }
            setTempOutcome('');
        }
    };

    const removeAcademicTag = (tag: string) => setAcademicReqs(academicReqs.filter(t => t !== tag));
    const removeOutcomeTag = (tag: string) => setOutcomes(outcomes.filter(t => t !== tag));

    const handleSaveCourse = () => {
        if (!courseName.trim()) return;

        const newCourse = {
            id: editingId || Date.now(),
            name: courseName,
            level: courseLevel,
            duration: courseDuration,
            fee: courseFee,
            intakes: intakePairs.map(p => p.intake).length > 0 ? intakePairs.map(p => p.intake) : ['TBD'],
            deadlines: intakePairs.map(p => p.deadline || 'TBD').length > 0 ? intakePairs.map(p => p.deadline || 'TBD') : ['TBD'],
            interest: '0',
            status: 'Active',
            academicRequirements: academicReqs,
            outcomes: outcomes
        };

        let updatedCourses = [];
        if (editingId) {
            updatedCourses = (uni.courses || []).map((c: any) => c.id === editingId ? newCourse : c);
        } else {
            updatedCourses = [...(uni.courses || []), newCourse];
        }

        const updatedUni = { ...uni, courses: updatedCourses };
        setUni(updatedUni);

        // PERSIST TO LOCALSTORAGE
        const saved = localStorage.getItem('ea_universities');
        if (saved) {
            const allUnis = JSON.parse(saved);
            const newAllUnis = allUnis.map((u: any) => u.id === uni.id ? updatedUni : u);
            localStorage.setItem('ea_universities', JSON.stringify(newAllUnis));
        }

        setIsAddCourseModalOpen(false);
        // Reset states
        setCourseName('');
        setEditingId(null);
        setAcademicReqs(['Bachelors Degree', '6.5 IELTS']);
        setOutcomes([]);
        setIntakePairs([]);
        setConfiguringIntakeIdx(null);
    };

    // Dynamic data loading from localStorage to ensure newly added universities are visible
    const [uni, setUni] = React.useState(() => {
        const saved = localStorage.getItem('ea_universities');
        const allUnis = saved ? JSON.parse(saved) : [];
        
        // Find university in saved state or fallback to hardcoded list
        const found = allUnis.find((u: any) => u.id === Number(id));
        if (found) return found;

        // Fallback or static list for demo
        const staticUnis = [
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
        
        return staticUnis.find(u => u.id === Number(id)) || staticUnis[0];
    });

    const updateUniData = (field: string, val: any) => setUni(prev => ({ ...prev, [field]: val }));

    const handleUploadNew = () => {
        setIsEditMode(false);
        setEditingId(null);
        setCourseName('');
        setIsAddCourseModalOpen(true);
    };

    const handleEditCourse = (course: any) => {
        setIsEditMode(true);
        setEditingId(course.id);
        setCourseName(course.name || course.title || '');
        setCourseLevel(course.level || 'Postgraduate');
        setCourseDuration(course.duration || '2 Years');
        setCourseFee(course.fee || '25,000');
        setAcademicReqs(Array.isArray(course.academicRequirements) ? course.academicRequirements : []);
        setOutcomes(Array.isArray(course.outcomes) ? course.outcomes : []);
        
        // Reconstruct intake pairs
        if (Array.isArray(course.intakes)) {
            const pairs = course.intakes.map((it: string, i: number) => ({
                intake: it,
                deadline: Array.isArray(course.deadlines) ? course.deadlines[i] || null : null
            }));
            setIntakePairs(pairs);
        } else {
            setIntakePairs([]);
        }
        
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
                                <div className="h-20 w-20 rounded-2xl bg-[#2b6cee]/10 border border-[#2b6cee]/20 flex items-center justify-center text-[#2b6cee] shrink-0 overflow-hidden">
                                    {uni.logo ? (
                                        <img src={uni.logo} alt={uni.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="material-symbols-outlined text-3xl">{uni.name.charAt(0)}</span>
                                    )}
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
                            <span className="text-2xl font-bold">{uni.stats?.posts || 0}</span>
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
                            <span className="text-2xl font-bold">{uni.stats?.opportunities || 0}</span>
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
                            <span className="text-2xl font-bold">{uni.stats?.reach || '0'}</span>
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
                            <span className="text-2xl font-bold">{uni.stats?.score || 'N/A'}</span>
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
                            {uni && Array.isArray(uni.courses) && uni.courses.length > 0 ? (
                                (showAllCourses ? uni.courses : uni.courses.slice(0, 3)).map((course: any, idx: number) => (
                                    <div key={course.id || idx} className="group relative flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-[#2b6cee]/30 hover:bg-blue-50/20 transition-all">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-bold text-slate-900">{typeof course.name === 'string' ? course.name : (typeof course.title === 'string' ? course.title : 'Untitled Course')}</h4>
                                                <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-md border border-emerald-100">Active</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">school</span> {typeof course.level === 'string' ? course.level : 'Postgraduate'}</span>
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> {Array.isArray(course.intakes) ? course.intakes.join(', ') : 'Various'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => handleEditCourse(course)}
                                                className="size-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-[#2b6cee] transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <div className="size-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#2b6cee] group-hover:text-white transition-all">
                                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                                    <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                                        <span className="material-symbols-outlined text-4xl">inventory_2</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900">No courses listed yet</h4>
                                    <p className="text-xs text-slate-500 mt-1 max-w-[240px]">This institution has just joined. Start by uploading their course specifications.</p>
                                </div>
                            )}
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

            {/* Add New Course Modal */}
            {isAddCourseModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div 
                        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between z-10">
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2b6cee]">
                                    <span className="material-symbols-outlined font-bold">add_task</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{isEditMode ? 'Edit Course' : 'Add New Course'}</h3>
                                    <p className="text-xs text-slate-400 font-medium tracking-wide">{isEditMode ? 'Update program details' : 'Fill in details to list a new program'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsAddCourseModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-8">
                            {/* Section: Core Course Details */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 text-[#2b6cee]">
                                    <span className="material-symbols-outlined font-black">info</span>
                                    <h4 className="font-black text-xs uppercase tracking-[0.2em]">Core Course Details</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Course Name</label>
                                        <input 
                                            className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900" 
                                            placeholder="e.g. M.Sc. in Data Science & Artificial Intelligence" 
                                            type="text" 
                                            value={courseName}
                                            onChange={(e) => setCourseName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Field of Study</label>
                                        <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900 appearance-none">
                                            <option>Select field...</option>
                                            <option>Computer Science & IT</option>
                                            <option>Business & Management</option>
                                            <option>Engineering</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Duration</label>
                                        <select 
                                            value={courseDuration}
                                            onChange={(e) => setCourseDuration(e.target.value)}
                                            className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900 appearance-none"
                                        >
                                            <option>Select duration...</option>
                                            <option>1 Year</option>
                                            <option>2 Years</option>
                                            <option>3 Years</option>
                                            <option>4 Years</option>
                                            <option>5 Years</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Financials & Intakes */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 text-emerald-500">
                                    <span className="material-symbols-outlined font-black">payments</span>
                                    <h4 className="font-black text-xs uppercase tracking-[0.2em]">Financials & Intakes</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Annual Tuition Fee</label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">$</span>
                                            <input 
                                                className="w-full pl-10 pr-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900" 
                                                placeholder="25,000" 
                                                type="number" 
                                                value={courseFee}
                                                onChange={(e) => setCourseFee(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                         <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">
                                             {configuringIntakeIdx !== null 
                                                 ? `Select Deadline Month for ${intakePairs[configuringIntakeIdx].intake}...` 
                                                 : 'Select Intake Month'}
                                         </label>
                                         <div className="flex flex-wrap gap-2">
                                             {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => {
                                                 const isIntake = intakePairs.some(p => p.intake === month);
                                                 const isDeadline = intakePairs.some(p => p.deadline === month);
                                                 const isCurrentConfig = configuringIntakeIdx !== null && intakePairs[configuringIntakeIdx].intake === month;
                                                 
                                                 return (
                                                     <button 
                                                         key={month} 
                                                         onClick={() => handleMonthClick(month)}
                                                         className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                                                             isCurrentConfig
                                                                 ? 'bg-amber-400 text-white border-amber-400 animate-pulse'
                                                                 : isIntake
                                                                     ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                                                                     : isDeadline
                                                                         ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-50'
                                                                         : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-blue-50'
                                                         }`}
                                                     >
                                                         {month.substring(0, 3)}
                                                     </button>
                                                 );
                                             })}
                                         </div>
                                         
                                         {intakePairs.length > 0 && (
                                             <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                                                 {intakePairs.map((pair, idx) => (
                                                     <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col gap-2 shadow-sm animate-in fade-in slide-in-from-top-2">
                                                         <div className="flex items-center justify-between">
                                                             <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{pair.intake} Intake</span>
                                                             <button onClick={() => setIntakePairs(prev => prev.filter((_, i) => i !== idx))} className="text-slate-300 hover:text-rose-500">
                                                                 <span className="material-symbols-outlined text-[16px]">close</span>
                                                             </button>
                                                         </div>
                                                         <div className="flex flex-col gap-1">
                                                             <span className="text-[8px] font-bold text-slate-400 uppercase">Deadline:</span>
                                                             <div className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-900">
                                                                 {pair.deadline ? `${pair.deadline} (Month)` : <span className="text-amber-500 italic">Waiting selection...</span>}
                                                             </div>
                                                         </div>
                                                     </div>
                                                 ))}
                                             </div>
                                         )}
                                     </div>
                                </div>
                            </section>

                            {/* Section: Eligibility & Requirements */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 text-purple-500">
                                    <span className="material-symbols-outlined font-black">verified</span>
                                    <h4 className="font-black text-xs uppercase tracking-[0.2em]">Eligibility & Requirements</h4>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Academic Requirements</label>
                                        <div className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-[#2b6cee] transition-all flex flex-wrap gap-2">
                                            {academicReqs.map(tag => (
                                                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                    {tag}
                                                    <button onClick={() => removeAcademicTag(tag)} className="hover:text-rose-500">
                                                        <span className="material-symbols-outlined text-[14px]">close</span>
                                                    </button>
                                                </span>
                                            ))}
                                            <input 
                                                value={tempAcademic}
                                                onChange={(e) => setTempAcademic(e.target.value)}
                                                onKeyDown={addAcademicTag}
                                                className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 flex-1 min-w-[200px]" 
                                                placeholder={academicReqs.length === 0 ? "Type a requirement and press Enter..." : "Add another..."} 
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Min. IELTS Score</label>
                                            <input className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900" placeholder="e.g. 6.5 Overall" type="text" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Min. TOEFL Score</label>
                                            <input className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900" placeholder="e.g. 90 (iBT)" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Course Content */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 text-amber-500">
                                    <span className="material-symbols-outlined font-black">menu_book</span>
                                    <h4 className="font-black text-xs uppercase tracking-[0.2em]">Course Content</h4>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Course Overview</label>
                                        <textarea className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-medium text-slate-900 min-h-[120px]" placeholder="Provide a brief summary of the course, its unique value, and what students can expect..." />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Learning Outcomes</label>
                                        <div className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-[#2b6cee] transition-all flex flex-wrap gap-2">
                                            {outcomes.map(tag => (
                                                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                    {tag}
                                                    <button onClick={() => removeOutcomeTag(tag)} className="hover:text-rose-500">
                                                        <span className="material-symbols-outlined text-[14px]">close</span>
                                                    </button>
                                                </span>
                                            ))}
                                            <input 
                                                value={tempOutcome}
                                                onChange={(e) => setTempOutcome(e.target.value)}
                                                onKeyDown={addOutcomeTag}
                                                className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 flex-1 min-w-[200px]" 
                                                placeholder={outcomes.length === 0 ? "Type an outcome and press Enter..." : "Add another..."} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-8 py-6 flex items-center justify-end gap-3 z-10">
                            <button 
                                onClick={() => setIsAddCourseModalOpen(false)}
                                className="px-6 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleSaveCourse()}
                                className="px-6 py-3 bg-white border border-slate-100 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all active:scale-95"
                            >
                                Save as Draft
                            </button>
                            <button 
                                onClick={() => handleSaveCourse()}
                                className="bg-[#2b6cee] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                            >
                                {isEditMode ? 'Update Course' : 'Publish Course'}
                                <span className="material-symbols-outlined text-[18px]">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </SuperAdminLayout>
    );
};

export default SuperAdminUniversityProfile;
