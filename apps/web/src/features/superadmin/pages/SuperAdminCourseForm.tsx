import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

const SuperAdminCourseForm = () => {
    const { id, courseId } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(courseId);

    const [uni, setUni] = React.useState<any>(null);

    const [courseName, setCourseName] = React.useState('');
    const [courseLevel, setCourseLevel] = React.useState('Postgraduate');
    const [courseDuration, setCourseDuration] = React.useState('2 Years');
    const [courseFee, setCourseFee] = React.useState('25,000');
    const [academicReqs, setAcademicReqs] = React.useState<string[]>(['Bachelors Degree', '6.5 IELTS']);
    const [outcomes, setOutcomes] = React.useState<string[]>([]);
    const [tempAcademic, setTempAcademic] = React.useState('');
    const [tempOutcome, setTempOutcome] = React.useState('');
    const [intakePairs, setIntakePairs] = React.useState<{intake: string, deadline: string | null}[]>([]);
    const [configuringIntakeIdx, setConfiguringIntakeIdx] = React.useState<number | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('ea_universities');
        const allUnis = saved ? JSON.parse(saved) : [];
        let foundUni = allUnis.find((u: any) => u.id === Number(id));

        if (!foundUni) {
            // Fallback to static if needed
            const staticUnis = [
                {
                    id: 1,
                    name: 'University of Toronto',
                    // ... keeping it simple, since if it's not in localStorage we'll just initialize an empty one or look it up
                },
                {
                    id: 6,
                    name: 'Harvard University',
                }
            ];
            foundUni = staticUnis.find(u => u.id === Number(id)) || { id: Number(id), name: 'Unknown University', courses: [] };
        }
        
        setUni(foundUni);

        if (isEditMode && foundUni.courses) {
            const course = foundUni.courses.find((c: any) => String(c.id) === String(courseId));
            if (course) {
                setCourseName(course.name || course.title || '');
                setCourseLevel(course.level || 'Postgraduate');
                setCourseDuration(course.duration || '2 Years');
                setCourseFee(course.fee || '25,000');
                setAcademicReqs(Array.isArray(course.academicRequirements) ? course.academicRequirements : []);
                setOutcomes(Array.isArray(course.outcomes) ? course.outcomes : []);
                
                if (Array.isArray(course.intakes)) {
                    const pairs = course.intakes.map((it: string, i: number) => ({
                        intake: it,
                        deadline: Array.isArray(course.deadlines) ? course.deadlines[i] || null : null
                    }));
                    setIntakePairs(pairs);
                }
            }
        }
    }, [id, courseId, isEditMode]);

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
        if (!courseName.trim() || !uni) return;

        const newCourse = {
            id: isEditMode ? Number(courseId) : Date.now(),
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
        if (isEditMode) {
            updatedCourses = (uni.courses || []).map((c: any) => String(c.id) === String(courseId) ? newCourse : c);
        } else {
            updatedCourses = [...(uni.courses || []), newCourse];
        }

        const updatedUni = { ...uni, courses: updatedCourses };

        // PERSIST TO LOCALSTORAGE
        const saved = localStorage.getItem('ea_universities');
        let allUnis = saved ? JSON.parse(saved) : [];
        const exists = allUnis.find((u: any) => u.id === uni.id);
        if (exists) {
            allUnis = allUnis.map((u: any) => u.id === uni.id ? updatedUni : u);
        } else {
            allUnis.push(updatedUni);
        }
        localStorage.setItem('ea_universities', JSON.stringify(allUnis));

        navigate(`/superadmin/university/${id}`);
    };

    return (
        <SuperAdminLayout title={isEditMode ? "Edit Course" : "Add New Course"}>
            <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                
                <div className="flex items-center gap-4 mb-6">
                    <button 
                        onClick={() => navigate(`/superadmin/university/${id}`)}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#2b6cee] hover:border-[#2b6cee]/30 hover:bg-blue-50/50 transition-all flex items-center justify-center shadow-sm"
                    >
                        <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {isEditMode ? 'Edit Course' : 'Add New Course'}
                        </h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            {uni?.name ? `For ${uni.name}` : 'Loading...'}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 space-y-10">
                        {/* Section: Core Course Details */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-[#2b6cee] border-b border-slate-100 pb-3">
                                <span className="material-symbols-outlined font-black">info</span>
                                <h4 className="font-black text-sm uppercase tracking-[0.2em]">Core Course Details</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Course Name</label>
                                    <input 
                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900" 
                                        placeholder="e.g. M.Sc. in Data Science & Artificial Intelligence" 
                                        type="text" 
                                        value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Level of Study</label>
                                    <select 
                                        value={courseLevel}
                                        onChange={(e) => setCourseLevel(e.target.value)}
                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900 appearance-none"
                                    >
                                        <option>Select level...</option>
                                        <option>Undergraduate</option>
                                        <option>Postgraduate</option>
                                        <option>Doctorate</option>
                                        <option>Diploma</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Duration</label>
                                    <select 
                                        value={courseDuration}
                                        onChange={(e) => setCourseDuration(e.target.value)}
                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#2b6cee] transition-all outline-none text-sm font-bold text-slate-900 appearance-none"
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
                            <div className="flex items-center gap-3 text-emerald-500 border-b border-slate-100 pb-3">
                                <span className="material-symbols-outlined font-black">payments</span>
                                <h4 className="font-black text-sm uppercase tracking-[0.2em]">Financials & Intakes</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Annual Tuition Fee</label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-lg">$</span>
                                        <input 
                                            className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 bg-white focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none text-base font-bold text-slate-900" 
                                            placeholder="25,000" 
                                            type="text" 
                                            value={courseFee}
                                            onChange={(e) => setCourseFee(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">
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
                                                    className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                                        isCurrentConfig
                                                            ? 'bg-amber-400 text-white border-amber-400 animate-pulse'
                                                            : isIntake
                                                                ? 'bg-[#2b6cee] text-white border-[#2b6cee] shadow-lg shadow-blue-100'
                                                                : isDeadline
                                                                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-100'
                                                                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                                                    }`}
                                                >
                                                    {month.substring(0, 3)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    
                                    {intakePairs.length > 0 && (
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            {intakePairs.map((pair, idx) => (
                                                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-2 shadow-sm animate-in fade-in slide-in-from-top-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-black text-[#2b6cee] uppercase tracking-widest">{pair.intake} Intake</span>
                                                        <button onClick={() => setIntakePairs(prev => prev.filter((_, i) => i !== idx))} className="text-slate-300 hover:text-rose-500 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-col gap-1.5 mt-1">
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Deadline</span>
                                                        <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900">
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
                            <div className="flex items-center gap-3 text-purple-500 border-b border-slate-100 pb-3">
                                <span className="material-symbols-outlined font-black">verified</span>
                                <h4 className="font-black text-sm uppercase tracking-[0.2em]">Eligibility & Requirements</h4>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Academic Requirements</label>
                                    <div className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white focus-within:ring-4 focus-within:ring-purple-500/10 focus-within:border-purple-500 transition-all flex flex-wrap gap-2 min-h-[56px]">
                                        {academicReqs.map(tag => (
                                            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-xl text-xs font-bold">
                                                {tag}
                                                <button onClick={() => removeAcademicTag(tag)} className="hover:text-rose-500 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                                </button>
                                            </span>
                                        ))}
                                        <input 
                                            value={tempAcademic}
                                            onChange={(e) => setTempAcademic(e.target.value)}
                                            onKeyDown={addAcademicTag}
                                            className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 flex-1 min-w-[200px]" 
                                            placeholder={academicReqs.length === 0 ? "Type a requirement and press Enter..." : "Add another requirement..."} 
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Min. IELTS Score</label>
                                        <input className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none text-sm font-bold text-slate-900" placeholder="e.g. 6.5 Overall" type="text" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Min. TOEFL Score</label>
                                        <input className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none text-sm font-bold text-slate-900" placeholder="e.g. 90 (iBT)" type="text" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Course Content */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-amber-500 border-b border-slate-100 pb-3">
                                <span className="material-symbols-outlined font-black">trending_up</span>
                                <h4 className="font-black text-sm uppercase tracking-[0.2em]">Course Content</h4>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Learning Outcomes</label>
                                    <div className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white focus-within:ring-4 focus-within:ring-amber-500/10 focus-within:border-amber-500 transition-all flex flex-wrap gap-2 min-h-[56px]">
                                        {outcomes.map(tag => (
                                            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-xl text-xs font-bold">
                                                {tag}
                                                <button onClick={() => removeOutcomeTag(tag)} className="hover:text-rose-500 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                                </button>
                                            </span>
                                        ))}
                                        <input 
                                            value={tempOutcome}
                                            onChange={(e) => setTempOutcome(e.target.value)}
                                            onKeyDown={addOutcomeTag}
                                            className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 flex-1 min-w-[200px]" 
                                            placeholder={outcomes.length === 0 ? "Type an outcome and press Enter..." : "Add another outcome..."} 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Course Overview</label>
                                    <textarea className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none text-sm font-medium text-slate-900 min-h-[120px] resize-y" placeholder="Provide a brief summary of the course, its unique value, and what students can expect..." />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-slate-50 border-t border-slate-200 px-8 py-6 flex items-center justify-between">
                        <button 
                            onClick={() => navigate(`/superadmin/university/${id}`)}
                            className="px-6 py-3 text-sm font-black text-slate-500 uppercase tracking-widest hover:text-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <div className="flex gap-4">
                            <button 
                                onClick={handleSaveCourse}
                                className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-slate-100 hover:text-slate-900 shadow-sm transition-all active:scale-95"
                            >
                                Save as Draft
                            </button>
                            <button 
                                onClick={handleSaveCourse}
                                className="bg-[#2b6cee] text-white px-10 py-3.5 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0"
                            >
                                {isEditMode ? 'Update Course' : 'Publish Course'}
                                <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </SuperAdminLayout>
    );
};

export default SuperAdminCourseForm;
