import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useScholarships } from '@/shared/contexts/ScholarshipsContext';

const Scholarships = () => {
    const navigate = useNavigate();
    const { scholarships } = useScholarships();
    const [searchQuery, setSearchQuery] = useState('');
    const [courseFilter, setCourseFilter] = useState('All Courses');
    const [levelFilter, setLevelFilter] = useState('All Levels');

    const filteredScholarships = scholarships.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesCourse = courseFilter === 'All Courses' || s.course === courseFilter;
        const matchesLevel = levelFilter === 'All Levels' || s.level === levelFilter;

        return matchesSearch && matchesCourse && matchesLevel;
    });


    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50 font-display">
            <PageHeader title="Scholarships" />

            <main className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="max-w-[1400px] mx-auto space-y-6">

                    {/* Hero Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-[24px] p-6 md:p-10 text-white shadow-xl shadow-blue-200/40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>

                        <div className="flex flex-col gap-4 max-w-2xl text-center md:text-left relative z-10">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-[9px] font-black uppercase tracking-[0.2em] w-fit mx-auto md:mx-0 backdrop-blur-md border border-white/10">Academic Funding</span>
                            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">Available Scholarships</h1>
                            <p className="text-blue-100 text-base md:text-lg font-medium leading-relaxed opacity-90">Empowering your future. Discover and apply for merit-based, need-based, and department-specific funding opportunities.</p>

                            <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
                                <button
                                    onClick={() => navigate('/scholarship-applications')}
                                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined !text-[18px]">description</span> My Applications
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block w-56 h-56 opacity-90 relative">
                            <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative overflow-hidden shadow-inner">
                                <span className="material-symbols-outlined text-[100px] text-white/40 drop-shadow-xl">school</span>
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Search Section */}
                    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                            <div className="md:col-span-4 flex flex-col gap-2">
                                <label className="text-[9px] font-black text-gray-400 ml-1 uppercase tracking-widest">Search Scholarships</label>
                                <div className="flex w-full items-center rounded-xl border border-gray-100 bg-gray-50 h-11 focus-within:border-blue-500 transition-all">
                                    <span className="material-symbols-outlined text-gray-400 ml-4 !text-[18px]">search</span>
                                    <input
                                        className="flex-1 border-none bg-transparent focus:ring-0 text-gray-900 px-3 text-sm font-semibold placeholder:text-gray-300"
                                        placeholder="Keywords, department, or donor..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-3 flex flex-col gap-2">
                                <label className="text-[9px] font-black text-gray-400 ml-1 uppercase tracking-widest">Course</label>
                                <select
                                    className="flex h-11 items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 group hover:border-blue-500 transition-all font-semibold text-gray-700 text-xs focus:ring-0 outline-none w-full"
                                    value={courseFilter}
                                    onChange={(e) => setCourseFilter(e.target.value)}
                                >
                                    <option>All Courses</option>
                                    <option>Engineering</option>
                                    <option>Social Sciences</option>
                                    <option>Arts & Humanities</option>
                                    <option>Sports</option>
                                </select>
                            </div>
                            <div className="md:col-span-3 flex flex-col gap-2">
                                <label className="text-[9px] font-black text-gray-400 ml-1 uppercase tracking-widest">Level</label>
                                <select
                                    className="flex h-11 items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 group hover:border-blue-500 transition-all font-semibold text-gray-700 text-xs focus:ring-0 outline-none w-full"
                                    value={levelFilter}
                                    onChange={(e) => setLevelFilter(e.target.value)}
                                >
                                    <option>All Levels</option>
                                    <option>Undergrad</option>
                                    <option>Postgrad</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 flex items-center justify-end">
                                <button className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                                    <span className="material-symbols-outlined !text-[18px]">filter_list</span> Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scholarship Listing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                        {filteredScholarships.map((scholarship) => (
                            <div key={scholarship.id} className="group relative bg-white rounded-[24px] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-slate-100 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(30,99,243,0.1)]">
                                {/* Premium Background Effects */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />

                                <div className="relative p-5 flex flex-col h-full z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="relative shrink-0">
                                                <div className="absolute inset-0 bg-blue-100 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                                                <div className="relative size-12 rounded-2xl bg-white border border-slate-100 shadow-sm p-1.5 flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={scholarship.logo || 'https://ui-avatars.com/api/?name=' + (scholarship.institution || 'UNI') + '&background=random'}
                                                        className="w-full h-full object-contain"
                                                        alt={scholarship.institution}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <h5 className="text-[10px] font-black text-slate-900 group-hover:text-[#1E63F3] transition-colors leading-tight truncate uppercase tracking-tight">
                                                    {scholarship.institution || 'EA Overseas Partner'}
                                                </h5>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none">Verified Inst.</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative shrink-0">
                                            <div className="absolute inset-0 blur-md opacity-20 bg-emerald-100" />
                                            <span className="relative px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[8px] font-black rounded-lg uppercase tracking-widest shadow-sm border border-black/5">
                                                {scholarship.type || 'Academic'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-[15px] font-black text-slate-900 group-hover:text-[#1E63F3] transition-colors duration-300 tracking-tight leading-snug uppercase mb-2">
                                            {scholarship.title}
                                        </h4>
                                        <div className="h-1 w-10 bg-blue-100 rounded-full group-hover:w-16 group-hover:bg-[#1E63F3] transition-all duration-500" />
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 mb-6">
                                        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50/50 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 border border-transparent group-hover:border-slate-100">
                                            <div className="w-7 h-7 rounded-lg bg-blue-100/50 flex items-center justify-center text-[#1E63F3]">
                                                <span className="material-symbols-outlined text-[16px]">payments</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Coverage</span>
                                                <span className="text-[11px] font-black text-slate-700">{scholarship.coverage}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50/50 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 border border-transparent group-hover:border-slate-100">
                                            <div className="w-7 h-7 rounded-lg bg-purple-100/50 flex items-center justify-center text-purple-600">
                                                <span className="material-symbols-outlined text-[16px]">school</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Criteria</span>
                                                <span className="text-[11px] font-black text-slate-700">{scholarship.requirement || 'GPA: 3.5+ Min.'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50/50 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 border border-transparent group-hover:border-slate-100">
                                            <div className="w-7 h-7 rounded-lg bg-amber-100/50 flex items-center justify-center text-amber-600">
                                                <span className="material-symbols-outlined text-[16px]">alarm</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Deadline</span>
                                                <span className="text-[11px] font-black text-slate-700">{scholarship.deadline}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2.5">
                                                {(scholarship.avatars || []).map((url: string, i: number) => (
                                                    <div key={i} className="relative group/avatar">
                                                        <img
                                                            src={url}
                                                            alt="Applicant"
                                                            className="w-8 h-8 rounded-full border-[3px] border-white object-cover shadow-md"
                                                        />
                                                    </div>
                                                ))}
                                                {scholarship.avatars?.length > 0 && scholarship.extraApplicants && scholarship.extraApplicants !== '0 Applicants' && scholarship.extraApplicants !== 'N/A' && (
                                                    <div className="w-8 h-8 rounded-full bg-[#1E63F3] flex items-center justify-center text-[9px] font-black text-white border-[3px] border-white shadow-md">
                                                        {scholarship.extraApplicants}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-[#1E63F3] tracking-tighter leading-none">{scholarship.applicants || 0}</p>
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Applied</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/scholarship-details/${scholarship.id}`)}
                                        className="mt-5 w-full py-3 bg-[#1E63F3] hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-100 hover:shadow-blue-200"
                                    >
                                        View Details
                                        <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>

        </div>
    );
};

export default Scholarships;
