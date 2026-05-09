import React from 'react';

interface CoursePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: any;
    universityName?: string;
    onEdit?: (course: any) => void;
}

const CoursePreviewModal: React.FC<CoursePreviewModalProps> = ({ isOpen, onClose, course, universityName, onEdit }) => {
    if (!isOpen || !course) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col border border-slate-100">
                {/* Header Section */}
                <div className="relative h-48 bg-gradient-to-br from-[#2b6cee] to-[#1e4eb8] p-8 flex flex-col justify-end">
                    <button 
                        onClick={onClose} 
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white backdrop-blur-md z-10"
                    >
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                    
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/30">
                            {course.level || 'Postgraduate'}
                        </span>
                        <span className="px-3 py-1 bg-emerald-400 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                            {course.status || 'Active'}
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight leading-tight max-w-2xl">
                        {course.name || course.title || 'Untitled Course'}
                    </h2>
                    {universityName && (
                        <p className="text-white/80 font-medium mt-1 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">account_balance</span>
                            {universityName}
                        </p>
                    )}
                    
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-symbols-outlined text-[120px] text-white select-none">school</span>
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column: Quick Stats & Intakes */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Details</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2b6cee] shadow-sm">
                                            <span className="material-symbols-outlined text-[20px]">schedule</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p>
                                            <p className="text-sm font-bold text-slate-900">{course.duration || '2 Years'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-500 shadow-sm">
                                            <span className="material-symbols-outlined text-[20px]">payments</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Annual Fee</p>
                                            <p className="text-sm font-bold text-slate-900">${course.fee || '25,000'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-500 shadow-sm">
                                            <span className="material-symbols-outlined text-[20px]">group</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Interest</p>
                                            <p className="text-sm font-bold text-slate-900">{course.interest || '0'} Applications</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Intakes & Deadlines</h4>
                                <div className="space-y-3">
                                    {Array.isArray(course.intakes) && course.intakes.length > 0 ? course.intakes.map((intake: string, idx: number) => (
                                        <div key={idx} className="flex flex-col gap-1.5 p-3 bg-white rounded-xl border border-slate-100 hover:border-blue-200 transition-all">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-slate-900">{intake}</span>
                                                <span className="text-[9px] font-black text-[#2b6cee] uppercase bg-blue-50 px-2 py-0.5 rounded-md">Intake</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                                <span className="material-symbols-outlined text-[14px] text-slate-300">event_available</span>
                                                <span>Deadline: </span>
                                                <span className="font-bold text-slate-700">{course.deadlines && course.deadlines[idx] ? course.deadlines[idx] : 'Not specified'}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-4 bg-white rounded-xl border border-dashed border-slate-200">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">No intakes listed</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Requirements & Outcomes */}
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2b6cee]">
                                        <span className="material-symbols-outlined text-[20px]">fact_check</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">Academic Requirements</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(course.academicRequirements) && course.academicRequirements.length > 0 ? (
                                        course.academicRequirements.map((req: string, idx: number) => (
                                            <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                                                <span className="size-1.5 rounded-full bg-[#2b6cee]"></span>
                                                {req}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200 w-full">Standard academic requirements apply for this level of study.</p>
                                    )}
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="size-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">Learning Outcomes</h3>
                                </div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {Array.isArray(course.outcomes) && course.outcomes.length > 0 ? (
                                        course.outcomes.map((outcome: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 p-3 bg-purple-50/30 rounded-xl border border-purple-100/50">
                                                <span className="material-symbols-outlined text-[18px] text-purple-500 mt-0.5">check_circle</span>
                                                <span className="text-sm font-medium text-slate-700">{outcome}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="col-span-2 flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                            <span className="material-symbols-outlined text-[18px] text-slate-300 mt-0.5">info</span>
                                            <span className="text-sm text-slate-500 font-medium">Prepare for global industry standards and advanced research in this field of study.</span>
                                        </li>
                                    )}
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="size-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                                        <span className="material-symbols-outlined text-[20px]">description</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">Program Overview</h3>
                                </div>
                                <div className="bg-amber-50/20 p-5 rounded-2xl border border-amber-100/50">
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                        {course.overview || "This comprehensive program is designed to provide students with a deep understanding of the field, combining theoretical knowledge with practical applications. Students will engage with world-class faculty and state-of-the-art facilities to develop the skills necessary for a successful career."}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div className="hidden sm:flex items-center gap-4 text-slate-400">
                        <span className="text-[10px] font-black uppercase tracking-widest">Course ID: {course.id || 'N/A'}</span>
                        <div className="size-1 bg-slate-200 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">history</span>
                            Last Updated: {new Date().toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <button 
                            onClick={onClose}
                            className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
                        >
                            Close
                        </button>
                        <button 
                            onClick={() => onEdit && onEdit(course)}
                            className="flex-1 sm:flex-none px-6 py-2.5 bg-[#2b6cee] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                            Edit Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePreviewModal;
