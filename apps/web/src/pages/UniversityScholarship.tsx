import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UniversityLayout from '@/layouts/UniversityLayout';
import AddScholarshipModal from './AddScholarshipModal';
import { useScholarships } from '@/shared/contexts/ScholarshipsContext';
import { useAuth } from '@/shared/contexts/AuthContext';

const UniversityScholarship = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { scholarships, addScholarship } = useScholarships();

    const stateUni = location.state?.university?.name;
    const isSuperAdmin = user?.role === 'Chief Counsel';

    // Effective university name for creating/filtering
    const effectiveUniversity = stateUni || user?.university || "";

    const handleAddScholarship = (newScholarship: any) => {
        // Ensure the institution is correctly set if Superadmin is creating for a specific uni
        const scholarshipWithContext = {
            ...newScholarship,
            institution: effectiveUniversity || newScholarship.institution,
            // You might want to map the logo here too if it's missing
        };
        addScholarship(scholarshipWithContext);
    };

    const filteredScholarships = scholarships.filter(opp => {
        if (isSuperAdmin && !stateUni) return true;

        const targetUni = (stateUni || user?.university || "").toLowerCase().trim();
        const oppUni = (opp.institution || "").toLowerCase().trim();

        return oppUni === targetUni;
    });

    return (
        <UniversityLayout title="Scholarship Management">
            <div className="p-8 max-w-7xl mx-auto w-full space-y-8 font-['Public_Sans']">

                {/* Opportunities Grid Section */}
                <div className="space-y-6 mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-[#1E63F3] animate-pulse" />
                                <span className="text-[10px] font-black text-[#1E63F3] uppercase tracking-widest">Active Institution</span>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
                                {effectiveUniversity || "Scholarships"}
                                <span className="text-slate-200">/</span>
                                <span className="text-slate-400 font-bold">Opportunities</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-[#1E63F3] text-white text-[10px] font-black rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-blue-200 uppercase tracking-widest group"
                            >
                                <span className="material-symbols-outlined text-[18px] font-black group-hover:rotate-90 transition-transform">add_circle</span>
                                Add Scholarship
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredScholarships.map((opp: any, index: number) => (
                            <div
                                key={`${opp.id}-${index}`}
                                className="group relative bg-white rounded-[24px] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                                onClick={() => navigate('/university/scholarship-analytics', { state: { scholarship: opp } })}
                            >
                                {/* Premium Background Effects */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />

                                <div className="relative p-5 flex flex-col h-full border border-slate-100 group-hover:border-[#1E63F3]/20 group-hover:shadow-[0_20px_50px_rgba(30,99,243,0.12)] transition-all duration-500 rounded-[24px] z-10">
                                    <div className="flex justify-between items-start mb-6 pt-1">
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div className="relative shrink-0">
                                                <div className="absolute inset-0 bg-[#1E63F3] blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                                                <div className="relative size-12 rounded-2xl bg-white border border-slate-100 shadow-sm p-1.5 flex items-center justify-center overflow-hidden group-hover:border-[#1E63F3]/30 transition-colors">
                                                    <img
                                                        src={opp.logo || 'https://ui-avatars.com/api/?name=' + (opp.institution || 'UNI') + '&background=random'}
                                                        className="w-full h-full object-contain"
                                                        alt={opp.institution}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <h5 className="text-[12px] font-black text-slate-900 group-hover:text-[#1E63F3] transition-colors leading-tight truncate uppercase tracking-tighter">
                                                        {opp.institution || 'EA Overseas Partner'}
                                                    </h5>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 rounded-md border border-emerald-100">
                                                        <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                                                        <span className="text-[7px] font-black text-emerald-600 uppercase tracking-widest leading-none">Verified Inst.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative shrink-0">
                                            <div className={`absolute inset-0 blur-md opacity-20 ${opp.statusColor}`} />
                                            <span className={`relative px-2.5 py-1 ${opp.statusColor} text-[8px] font-black rounded-lg uppercase tracking-widest shadow-sm border border-black/5`}>
                                                {opp.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Scholarship</span>
                                        </div>
                                        <h4 className="text-[16px] font-black text-slate-900 group-hover:text-[#1E63F3] transition-colors duration-300 tracking-tight leading-snug uppercase mb-2">
                                            {opp.title}
                                        </h4>
                                        <div className="h-1 w-10 bg-blue-100 rounded-full group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#1E63F3] group-hover:to-[#1E63F3]/30 transition-all duration-700" />
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 mb-6">
                                        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50/50 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 border border-transparent group-hover:border-slate-100">
                                            <div className="w-7 h-7 rounded-lg bg-blue-100/50 flex items-center justify-center text-[#1E63F3]">
                                                <span className="material-symbols-outlined text-[16px]">payments</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Coverage</span>
                                                <span className="text-[11px] font-black text-slate-700">{opp.coverage}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50/50 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 border border-transparent group-hover:border-slate-100">
                                            <div className="w-7 h-7 rounded-lg bg-purple-100/50 flex items-center justify-center text-purple-600">
                                                <span className="material-symbols-outlined text-[16px]">school</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Criteria</span>
                                                <span className="text-[11px] font-black text-slate-700">{opp.requirement}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50/50 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 border border-transparent group-hover:border-slate-100">
                                            <div className="w-7 h-7 rounded-lg bg-amber-100/50 flex items-center justify-center text-amber-600">
                                                <span className="material-symbols-outlined text-[16px]">alarm</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Deadline</span>
                                                <span className="text-[11px] font-black text-slate-700">{opp.deadline}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2.5">
                                                {opp.avatars.map((url: string, i: number) => (
                                                    <div key={i} className="relative group/avatar">
                                                        <img
                                                            src={url}
                                                            alt="Applicant"
                                                            className="w-8 h-8 rounded-full border-[3px] border-white object-cover shadow-md group-hover:scale-110 transition-transform"
                                                        />
                                                    </div>
                                                ))}
                                                {opp.avatars.length > 0 && (
                                                    <div className="w-8 h-8 rounded-full bg-[#1E63F3] flex items-center justify-center text-[9px] font-black text-white border-[3px] border-white shadow-md">
                                                        {opp.extraApplicants}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-[#1E63F3] tracking-tighter leading-none">{opp.applicants}</p>
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Applied</p>
                                        </div>
                                    </div>

                                    <button className="mt-5 w-full py-3 bg-[#1E63F3] hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-100 hover:shadow-blue-200">
                                        Manage
                                        <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <AddScholarshipModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddScholarship}
            />
        </UniversityLayout>
    );
};

export default UniversityScholarship;
