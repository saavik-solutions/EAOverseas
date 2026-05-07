import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

const ActivePartnersPage = () => {
    const navigate = useNavigate();
    const [universities, setUniversities] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        try {
            const saved = localStorage.getItem('eaoverseas_universities');
            if (saved) {
                const parsed = JSON.parse(saved);
                setUniversities(Array.isArray(parsed) ? parsed : []);
            }
        } catch (e) {
            console.error("Failed to load universities in ActivePartnersPage", e);
            setUniversities([]);
        }
    }, []);

    const filteredUniversities = universities.filter(uni =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SuperAdminLayout title="Total Universities">
            <div className="p-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="size-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#2b6cee] hover:border-[#2b6cee] transition-all shadow-sm group"
                        >
                            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Total Universities</h1>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Directory of all institutional partners</p>
                        </div>
                    </div>

                    {/* Quick Search Bar */}
                    <div className="relative group/search w-full md:w-80">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none group-focus-within/search:text-[#2b6cee] transition-colors">
                            <span className="material-symbols-outlined text-[20px] text-slate-300 group-focus-within/search:text-[#2b6cee]">search</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Find university or country..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-[20px] py-3.5 pl-12 pr-4 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#2b6cee] transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUniversities.map((uni) => (
                        <div
                            key={uni.id}
                            onClick={() => navigate(`/Superadmin/university/${uni.id}`)}
                            className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm hover:shadow-[0_20px_50px_rgba(43,108,238,0.12)] hover:border-blue-200 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                        >
                            {/* Interactive Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-start justify-between mb-5 relative z-10">
                                <div className="size-12 bg-blue-50 text-[#2b6cee] rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner group-hover:scale-110 group-hover:bg-[#2b6cee] group-hover:text-white transition-all duration-300">
                                    {uni.name.charAt(0)}
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${uni.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' :
                                        uni.status === 'Suspended' ? 'bg-rose-50 text-rose-600 border-rose-100/50' :
                                            'bg-amber-50 text-amber-600 border-amber-100/50'
                                        }`}>
                                        {uni.status || 'Active'}
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-lg font-black text-slate-800 leading-[1.2] mb-1.5 group-hover:text-[#2b6cee] transition-colors line-clamp-2 min-h-[2.4em]">
                                    {uni.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="size-5 bg-slate-50 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[12px] text-slate-400">location_on</span>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{uni.country}</span>
                                </div>
                            </div>

                            <div className="pt-5 border-t border-slate-50 flex items-center justify-between relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Reference</span>
                                    <span className="text-[11px] font-bold text-slate-500 font-mono tracking-tighter">
                                        #UNI-{String(uni.id).padStart(4, '0')}
                                    </span>
                                </div>
                                <div className="size-9 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-[#2b6cee] group-hover:text-white transition-all transform group-hover:translate-x-1 duration-300">
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredUniversities.length === 0 && (
                        <div className="col-span-full py-24 bg-slate-50/50 rounded-[48px] border-2 border-dashed border-slate-200 flex flex-col items-center gap-5">
                            <div className="size-20 bg-white rounded-[28px] flex items-center justify-center text-slate-200 shadow-sm border border-slate-100">
                                <span className="material-symbols-outlined text-5xl">search_off</span>
                            </div>
                            <div className="text-center">
                                <h4 className="text-xl font-black text-slate-400">No match found</h4>
                                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.25em] mt-2 max-w-[200px] leading-relaxed">
                                    Try checking for typos or search by country
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default ActivePartnersPage;
