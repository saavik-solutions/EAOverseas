import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityCourses = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const [searchQuery, setSearchQuery] = useState('');

    // University-Specific Data Mapping
    const universityRegistry: Record<string, any> = {
        'university-of-toronto': {
            impressions: '48,291',
            leads: '3,102',
            conversion: '6.4%',
             courses: [
                { id: 1, name: 'MSc Artificial Intelligence & Data Science', level: 'Postgraduate', intakes: ['Sept 2024'], deadlines: ['Jul 15'], interest: '1,248', status: 'Active', isRecommended: true },
                { id: 2, name: 'BEng Mechanical Engineering', level: 'Undergraduate', intakes: ['Sept 2024'], deadlines: ['Aug 01'], interest: '856', status: 'Active', isRecommended: false },
                { id: 3, name: 'BA International Relations', level: 'Undergraduate', intakes: ['Jan 2024'], deadlines: ['Dec 10'], interest: '231', status: 'Closed', isRecommended: false }
            ]
        },
        'kings-college-london': {
            impressions: '35,102',
            leads: '1,421',
            conversion: '5.8%',
            courses: [
                { id: 1, name: 'Global Health MSc', level: 'Postgraduate', intakes: ['Sept 2024'], deadlines: ['Jun 30'], interest: '942', status: 'Active', isRecommended: true },
                { id: 2, name: 'Law LLB', level: 'Undergraduate', intakes: ['Sept 2024'], deadlines: ['Jun 15'], interest: '2,104', status: 'Active', isRecommended: true },
                { id: 3, name: 'Business Management BSc', level: 'Undergraduate', intakes: ['Jan 2025'], deadlines: ['Nov 30'], interest: '1,562', status: 'Active', isRecommended: false }
            ]
        },
        'university-of-melbourne': {
            impressions: '22,481',
            leads: '642',
            conversion: '3.9%',
            courses: [
                { id: 1, name: 'Master of Data Science', level: 'Postgraduate', intakes: ['July 2024'], deadlines: ['May 15'], interest: '512', status: 'Active', isRecommended: true },
                { id: 2, name: 'Bachelor of Commerce', level: 'Undergraduate', intakes: ['Feb 2024'], deadlines: ['Jan 31'], interest: '842', status: 'Active', isRecommended: false }
            ]
        }
    };

    const currentUnivData = universityRegistry[universityName || ''] || {
        isNew: true,
        impressions: '0',
        leads: '0',
        conversion: '0%',
        courses: []
    };

    const displayName = (universityName || 'University of Global Excellence')
        .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const [activeTab, setActiveTab] = useState('All Courses');
    // Active data source
    const [courses, setCourses] = useState<any[]>(currentUnivData.courses);

    // Update courses when university changes
    React.useEffect(() => {
        const saved = localStorage.getItem('ea_universities');
        const allUnis = saved ? JSON.parse(saved) : [];
        const found = allUnis.find((u: any) => 
            u.id === Number(universityName) || 
            u.name.toLowerCase().replace(/\s+/g, '-') === universityName
        );

        if (found) {
            setCourses(Array.isArray(found.courses) ? found.courses : []);
        } else {
            const freshData = universityRegistry[universityName || ''] || {
                isNew: true,
                impressions: '0',
                leads: '0',
                conversion: '0%',
                courses: []
            };
            setCourses(freshData.courses);
        }
        setActiveTab('All Courses');
    }, [universityName]);

    const filteredCourses = (Array.isArray(courses) ? courses : []).filter((course: any) => {
        if (activeTab === 'All Courses') return true;
        if (activeTab === 'Drafts') return course.status === 'Draft';
        return course.status === activeTab;
    });

    const toggleStatus = (id: number) => {
        setCourses((prev: any[]) => (Array.isArray(prev) ? prev : []).map(course => {
            if (course.id === id) {
                return {
                    ...course,
                    status: course.status === 'Active' ? 'Closed' : 'Active'
                };
            }
            return course;
        }));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleEdit = (course: any) => {
        setCourseName(course.name);
        setEditingId(course.id);
        setIsModalOpen(true);
    };

    const handleSaveCourse = (status: string) => {
        if (!courseName.trim()) return;

        const intakes = intakePairs.map(p => p.intake);
        const deadlines = intakePairs.map(p => p.deadline || 'TBD');

        let updatedCourses = [];
        if (editingId) {
            updatedCourses = (Array.isArray(courses) ? courses : []).map(course => 
                course.id === editingId 
                    ? { ...course, name: courseName, status: status === 'Draft' ? 'Draft' : 'Active', intakes, deadlines }
                    : course
            );
        } else {
            const newCourse = {
                id: (Array.isArray(courses) ? courses : []).length + 1,
                name: courseName,
                level: 'Postgraduate',
                intakes: intakes.length > 0 ? intakes : ['TBD'],
                deadlines: deadlines.length > 0 ? deadlines : ['TBD'],
                interest: '0',
                status: status === 'Draft' ? 'Draft' : 'Active',
                isRecommended: false
            };
            updatedCourses = [newCourse, ...courses];
        }

        setCourses(updatedCourses);

        // PERSIST TO LOCALSTORAGE
        const saved = localStorage.getItem('ea_universities');
        if (saved) {
            const allUnis = JSON.parse(saved);
            const uniId = Number(universityName) || allUnis.find((u: any) => u.name.toLowerCase().replace(/\s+/g, '-') === universityName)?.id;
            
            if (uniId) {
                const newAllUnis = allUnis.map((u: any) => 
                    u.id === uniId ? { ...u, courses: updatedCourses } : u
                );
                localStorage.setItem('ea_universities', JSON.stringify(newAllUnis));
            }
        }
        
        // Reset and close
        setIsModalOpen(false);
        setCourseName('');
        setEditingId(null);
        setAcademicReqs([]);
        setOutcomes([]);
        setIntakePairs([]);
        setConfiguringIntakeIdx(null);
    };

    const [intakePairs, setIntakePairs] = useState<{intake: string, deadline: string | null}[]>([]);
    const [configuringIntakeIdx, setConfiguringIntakeIdx] = useState<number | null>(null);

    const handleMonthClick = (month: string) => {
        // If we are currently waiting for a deadline for an intake
        if (configuringIntakeIdx !== null) {
            const newPairs = [...intakePairs];
            newPairs[configuringIntakeIdx].deadline = month;
            setIntakePairs(newPairs);
            setConfiguringIntakeIdx(null);
        } else {
            // Check if this month is already an intake
            const existingIdx = intakePairs.findIndex(p => p.intake === month);
            if (existingIdx !== -1) {
                // If already exists, remove it
                setIntakePairs(prev => prev.filter((_, i) => i !== existingIdx));
            } else {
                // Add new intake and wait for deadline click
                const newIdx = intakePairs.length;
                setIntakePairs([...intakePairs, { intake: month, deadline: null }]);
                setConfiguringIntakeIdx(newIdx);
            }
        }
    };

    const [academicReqs, setAcademicReqs] = useState<string[]>(['Bachelors Degree', '6.5 IELTS', '2+ Years Experience']);
    const [outcomes, setOutcomes] = useState<string[]>([]);
    const [tempAcademic, setTempAcademic] = useState('');
    const [tempOutcome, setTempOutcome] = useState('');

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

    const removeAcademicTag = (tag: string) => {
        setAcademicReqs(academicReqs.filter(t => t !== tag));
    };

    const removeOutcomeTag = (tag: string) => {
        setOutcomes(outcomes.filter(t => t !== tag));
    };

    return (
        <UniversityLayout universityName={displayName} pageTitle="Course Management">
            <div className="p-4 md:p-6 max-w-[1400px] mx-auto w-full flex flex-col gap-6">
                {/* Page Heading */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Courses Management</h2>
                        <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">Control your university's digital prospectus and track student engagement.</p>
                    </div>
                    <button 
                        onClick={() => {
                            setEditingId(null);
                            setCourseName('');
                            setIsModalOpen(true);
                        }}
                        className="bg-[#2b6cee] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Add New Course
                    </button>
                </div>

                {/* Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to={`/university-panel/${universityName}/analytics`} className="bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <span className="material-symbols-outlined text-[24px]">trending_up</span>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] mb-0.5">Impressions</p>
                            <h4 className="text-xl font-black text-slate-900 tabular-nums">{currentUnivData.impressions}</h4>
                        </div>
                    </Link>

                    <Link to={`/university-panel/${universityName}/leads`} className="bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <span className="material-symbols-outlined text-[24px]">person_add</span>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] mb-0.5">Active Leads</p>
                            <h4 className="text-xl font-black text-slate-900 tabular-nums">{currentUnivData.leads}</h4>
                        </div>
                    </Link>

                    <Link to={`/university-panel/${universityName}/conversion`} className="bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
                        <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                            <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] mb-0.5">Conversion</p>
                            <h4 className="text-xl font-black text-slate-900 tabular-nums">{currentUnivData.conversion}</h4>
                        </div>
                    </Link>
                </div>

                {/* Modal Overlay */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
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
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{editingId ? 'Edit Course' : 'Add New Course'}</h3>
                                        <p className="text-xs text-slate-400 font-medium tracking-wide">{editingId ? 'Update program details' : 'Fill in details to list a new program'}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setAcademicReqs([]);
                                        setOutcomes([]);
                                    }}
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
                                            <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900 appearance-none">
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
                                                <input className="w-full pl-10 pr-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900" placeholder="25,000" type="number" />
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
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingId(null);
                                        setCourseName('');
                                        setAcademicReqs([]);
                                        setOutcomes([]);
                                    }}
                                    className="px-6 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => handleSaveCourse('Draft')}
                                    className="px-6 py-3 bg-white border border-slate-100 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all active:scale-95"
                                >
                                    Save as Draft
                                </button>
                                <button 
                                    onClick={() => handleSaveCourse('Active')}
                                    className="bg-[#2b6cee] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                                >
                                    {editingId ? 'Update Course' : 'Publish Course'}
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="border-b border-slate-100 flex gap-8">
                    {['All Courses', 'Active', 'Closed', 'Drafts'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 border-b-2 text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                activeTab === tab ? 'border-[#2b6cee] text-[#2b6cee]' : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {tab} 
                            {tab === 'All Courses' && <span className="bg-blue-50 px-2 py-0.5 rounded text-[9px]">{courses.length}</span>}
                        </button>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden bg-slate-50/20">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Name</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Degree Level</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Intake(s)</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Deadline</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Student Interest</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredCourses.map((course) => (
                                    <tr key={course.id} className="hover:bg-white transition-all group">
                                        <td className="px-6 py-4">
                                             <div className="flex flex-col gap-1">
                                                 <span className={`text-xs font-black tracking-tight ${course.status === 'Closed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                                     {course.name}
                                                     {course.status === 'Closed' && <span className="ml-2 no-underline text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full uppercase tracking-widest font-black">Closed</span>}
                                                 </span>
                                                 {course.isRecommended && (
                                                     <div className="flex">
                                                         <span className="px-1.5 py-0.5 bg-blue-50 text-[#2b6cee] text-[8px] font-black uppercase tracking-widest rounded-full border border-blue-100/50">AI Recommendation</span>
                                                     </div>
                                                 )}
                                             </div>
                                         </td>
                                         <td className="px-6 py-4">
                                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{course.level}</span>
                                         </td>
                                         <td className="px-6 py-4">
                                              <div className="flex flex-wrap gap-1">
                                                  {course.intakes.map(intake => (
                                                      <span key={intake} className="px-2 py-0.5 bg-white border border-slate-100 rounded-md text-[9px] font-black text-slate-600 uppercase tracking-widest">{intake}</span>
                                                  ))}
                                              </div>
                                          </td>
                                          <td className="px-6 py-4">
                                              <div className="flex flex-wrap gap-1">
                                                  {(course.deadlines || ['TBD']).map(deadline => (
                                                      <span key={deadline} className="px-2 py-0.5 bg-rose-50 border border-rose-100 rounded-md text-[9px] font-black text-rose-600 uppercase tracking-widest">{deadline}</span>
                                                  ))}
                                              </div>
                                          </td>
                                         <td className="px-6 py-4 text-center">
                                             <div className="inline-flex items-center justify-center bg-blue-50 text-[#2b6cee] rounded-full px-3 py-1 font-black text-[10px]">
                                                 {course.interest}
                                             </div>
                                         </td>
                                         <td className="px-6 py-4 text-center">
                                             <div className="flex justify-center">
                                                 <button 
                                                     onClick={() => toggleStatus(course.id)}
                                                     className={`w-8 h-4 rounded-full relative transition-all duration-300 ${course.status === 'Active' ? 'bg-[#2b6cee]' : 'bg-slate-200'}`}
                                                 >
                                                     <div className={`absolute top-0.5 size-3 bg-white rounded-full transition-all duration-300 ${course.status === 'Active' ? 'left-4.5' : 'left-0.5'}`}></div>
                                                 </button>
                                             </div>
                                         </td>
                                         <td className="px-6 py-4">
                                             <div className="flex items-center justify-end gap-1">
                                                 <button 
                                                     onClick={() => handleEdit(course)}
                                                     className="p-1.5 text-slate-400 hover:text-[#2b6cee] hover:bg-blue-50 rounded-lg transition-all" 
                                                     title="Edit Course"
                                                 >
                                                     <span className="material-symbols-outlined text-[18px]">edit</span>
                                                 </button>
                                             </div>
                                         </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-8 py-5 flex items-center justify-between border-t border-slate-50 bg-white">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                            {courses.length > 0 
                                ? `Showing 1 to ${Math.min(filteredCourses.length, 10)} of ${courses.length} courses`
                                : 'No courses listed yet'}
                        </p>
                        {courses.length > 0 && (
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all">
                                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                </button>
                                <button className="px-4 py-1.5 text-xs font-black bg-[#2b6cee] text-white rounded-xl shadow-lg shadow-blue-100">1</button>
                                {courses.length > 10 && (
                                    <>
                                        <button className="px-4 py-1.5 text-xs font-black text-slate-400 hover:bg-slate-50 rounded-xl transition-all">2</button>
                                        <span className="text-slate-200">...</span>
                                    </>
                                )}
                                <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityCourses;
