import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/shared/components/layout/PageHeader';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';
import { scholarships } from '@/shared/data/scholarships';

const Scholarships = () => {
    const navigate = useNavigate();
    const { toggleScholarship, isScholarshipSaved } = useSavedItems();

    return (
        <div className="flex flex-col h-full overflow-hidden bg-[#faf8ff]">
            <PageHeader title="Explore Scholarships" />

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-8 max-w-[1400px] mx-auto pb-24 lg:pb-12">
                    
                    {/* Educational / Informational Big Card */}
                    <div className="mb-8 relative overflow-hidden rounded-[24px] bg-[#0053cd] text-white p-6 md:p-8 shadow-xl shadow-blue-100">
                        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-10 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0053cd] via-[#0053cd] to-transparent"></div>
                        
                        <div className="relative z-10 max-w-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="p-1.5 bg-white/20 rounded-md backdrop-blur-md">
                                    <span className="material-symbols-outlined text-white text-[18px]">school</span>
                                </span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-100">Global Education Funding</span>
                            </div>
                            
                            <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">Your Education, Expertly Funded.</h2>
                            <p className="text-sm text-blue-50/80 mb-6 max-w-2xl leading-relaxed">
                                A scholarship is more than just financial aid—it's global recognition. We bridge the gap between ambition and opportunity by curating merit and research funding that fits your unique profile.
                            </p>
                            
                            <div className="flex flex-wrap gap-8 items-center">
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black">1.2k+</span>
                                        <span className="text-[8px] uppercase font-bold tracking-widest text-blue-200">Active Grants</span>
                                    </div>
                                    <div className="h-6 w-px bg-white/20"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black">₹ 15Cr+</span>
                                        <span className="text-[8px] uppercase font-bold tracking-widest text-blue-200">Total Value</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mr-2">Quick Filter:</span>
                            {['All Types', 'Merit-based', 'Need-based', 'Research', 'Women in Tech'].map((cat, idx) => (
                                <button 
                                    key={cat}
                                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${idx === 0 ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-600 border border-slate-100 hover:border-blue-300'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#dbdfe6] rounded-xl bg-white text-slate-700 text-sm font-black uppercase tracking-widest hover:bg-[#f9fafb] transition-all">
                                <span className="material-symbols-outlined text-[20px]">tune</span>
                                Filters
                            </button>
                            <div className="flex items-center border border-[#dbdfe6] rounded-xl bg-white overflow-hidden shadow-sm">
                                <button className="px-4 py-2.5 bg-[#f0f2f4] text-[#0053cd]">
                                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                </button>
                                <button className="px-4 py-2.5 text-slate-400 hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scholarship Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {scholarships.map((scholarship) => (
                            <div key={scholarship.id} className={`group bg-white rounded-[32px] border border-transparent hover:border-slate-100 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col ${scholarship.status === 'Locked' ? 'opacity-80 grayscale-[0.2]' : ''}`}>
                                <div className="h-44 w-full relative overflow-hidden">
                                    <img alt={scholarship.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={scholarship.image} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow-lg backdrop-blur-md ${
                                            scholarship.status === 'Open' ? 'bg-[#10b981]/80' : 
                                            scholarship.status === 'Applied' ? 'bg-blue-500/80' :
                                            scholarship.status === 'Closing Soon' ? 'bg-orange-500/80' :
                                            'bg-slate-600/80'
                                        }`}>
                                            {scholarship.status}
                                        </span>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleScholarship(scholarship);
                                            }}
                                            className={`${
                                                isScholarshipSaved(scholarship) 
                                                ? 'bg-[#0053cd] text-white shadow-blue-200' 
                                                : 'bg-white/20 text-white hover:bg-white/40'
                                            } backdrop-blur-md p-2 rounded-xl transition-all shadow-lg border border-white/20 active:scale-90`}
                                        >
                                            <span className={`material-symbols-outlined text-[18px] ${isScholarshipSaved(scholarship) ? 'fill-1' : ''}`} style={{ fontVariationSettings: isScholarshipSaved(scholarship) ? "'FILL' 1" : "'FILL' 0" }}>
                                                bookmark
                                            </span>
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-5">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-md bg-white p-1">
                                                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${scholarship.provider}`} className="w-full h-full object-contain" alt="logo" />
                                            </div>
                                            <span className="text-white font-bold text-xs uppercase tracking-widest truncate max-w-[200px]">{scholarship.provider}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h4 className="text-lg font-black text-slate-900 mb-3 line-clamp-1 group-hover:text-[#0053cd] transition-colors">{scholarship.title}</h4>
                                    <p className="text-slate-500 text-xs line-clamp-2 mb-6 leading-relaxed font-medium">{scholarship.description}</p>
                                    
                                    <div className="bg-slate-50/50 rounded-2xl p-4 space-y-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Scholarship Amt</span>
                                            <span className="font-black text-[#0053cd] text-sm">{scholarship.amount}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Eligibility</span>
                                            <span className="font-bold text-slate-900 text-[10px] uppercase tracking-wider">{scholarship.eligibility}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Closing</span>
                                            <span className={`font-black text-[10px] uppercase tracking-widest ${scholarship.status === 'Closing Soon' ? 'text-rose-600' : 'text-slate-700'}`}>{scholarship.deadline}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-auto">
                                        <button 
                                            onClick={() => navigate(`/scholarship-details/${scholarship.id}`)}
                                            className="flex-1 bg-slate-900 text-white font-black py-3 rounded-2xl hover:bg-black transition-all text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Section */}
                    <div className="mt-16 flex flex-col items-center">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Showing 6 of 142 grants</p>
                        <button className="flex items-center gap-3 px-10 py-4 border-2 border-slate-900 text-slate-900 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-300 group text-[11px] uppercase tracking-widest">
                            Discover More
                            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scholarships;
