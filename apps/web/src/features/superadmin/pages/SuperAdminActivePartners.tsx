import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

const SuperAdminActivePartners = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [partners, setPartners] = useState<any[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('ea_universities');
            if (saved) {
                const allUnis = JSON.parse(saved);
                if (Array.isArray(allUnis)) {
                    // Filter only active partners
                    setPartners(allUnis.filter((u: any) => u.status === 'Active'));
                }
            } else {
                // Fallback demo data if localStorage is empty
                const demoData = [
                    { id: 1, name: 'University of Toronto', country: 'Canada', courses: 142, status: 'Active', students: 1240 },
                    { id: 2, name: 'King\'s College London', country: 'UK', courses: 86, status: 'Active', students: 840 }
                ];
                setPartners(demoData);
            }
        } catch (error) {
            console.error("Error loading partners:", error);
        }
    }, []);

    const suspendUniversity = (id: number) => {
        if (window.confirm('Are you sure you want to suspend this university?')) {
            const saved = localStorage.getItem('ea_universities');
            if (saved) {
                const allUnis = JSON.parse(saved);
                const updated = allUnis.map((u: any) => u.id === id ? { ...u, status: 'Suspended' } : u);
                localStorage.setItem('ea_universities', JSON.stringify(updated));
                setPartners(updated.filter((u: any) => u.status === 'Active'));
            }
        }
    };

    const filteredPartners = (partners || []).filter(p => 
        (p.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (p.country?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    return (
        <SuperAdminLayout title="Active Partners">
            <div className="p-2 md:p-8 flex flex-col gap-3 md:gap-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm gap-4">
                    <div>
                        <h2 className="text-lg md:text-2xl font-bold text-slate-900">Active Institutional Partners</h2>
                        <p className="text-slate-500 text-[11px] md:text-sm mt-0.5 md:mt-1">Manage and monitor all your high-performing university partnerships</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all font-semibold text-[11px] md:text-sm border border-slate-200"
                    >
                        <span className="material-symbols-outlined text-[18px] md:text-[20px]">arrow_back</span>
                        Back to Overview
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-3 md:gap-4">
                    <div className="relative flex-1 md:max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] md:text-[20px]">search</span>
                        <input
                            type="text"
                            placeholder="Search partners..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 md:pl-10 md:pr-4 md:py-2.5 text-xs md:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-blue-50 text-blue-600 rounded-lg">
                            <span className="text-xs md:text-sm font-bold">{filteredPartners.length}</span>
                            <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider">Active</span>
                        </div>
                    </div>
                </div>

                {/* Table View */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-3 md:px-6 py-2 md:py-4 text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Detail</th>
                                    <th className="hidden md:table-cell px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Country</th>
                                    <th className="hidden md:table-cell px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Courses</th>
                                    <th className="hidden md:table-cell px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Students</th>
                                    <th className="px-3 md:px-6 py-2 md:py-4 text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredPartners.length > 0 ? (
                                    filteredPartners.map((uni) => (
                                        <tr key={uni.id || Math.random()} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-3 md:px-6 py-2 md:py-4">
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <div className="size-8 md:size-10 rounded-lg border border-slate-200 bg-slate-50 p-1 md:p-1.5 flex items-center justify-center shrink-0">
                                                        {uni.logo ? (
                                                            <img src={uni.logo} className="size-full object-contain" alt="" />
                                                        ) : (
                                                            <span className="material-symbols-outlined text-slate-400 text-[18px] md:text-[24px]">school</span>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="text-xs md:text-sm font-bold text-slate-900 truncate">{uni.name || "Unnamed University"}</h4>
                                                        <div className="flex items-center gap-1.5 md:gap-2">
                                                            <p className="text-[8px] md:text-[10px] text-slate-500 font-medium whitespace-nowrap">Partner ID: #UP-{String(uni.id || 0).padStart(4, '0')}</p>
                                                            <span className="md:hidden text-[8px] font-black text-[#2b6cee] bg-blue-50 px-1 py-0.5 rounded uppercase">{uni.country}</span>
                                                        </div>
                                                        <div className="md:hidden flex items-center gap-2 mt-0.5 md:mt-1">
                                                            <span className="text-[9px] font-bold text-slate-500">{Array.isArray(uni.courses) ? uni.courses.length : (uni.courses || 0)} Courses</span>
                                                            <div className="size-0.5 rounded-full bg-slate-300"></div>
                                                            <span className="text-[9px] font-bold text-slate-500">{uni.students || 0} Students</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4">
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                                                    <span className="material-symbols-outlined !text-[14px]">public</span>
                                                    {uni.country || "N/A"}
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 text-center">
                                                <span className="text-sm font-bold text-slate-900">{Array.isArray(uni.courses) ? uni.courses.length : (uni.courses || 0)}</span>
                                                <span className="text-[10px] text-slate-500 block">Offered</span>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 text-center">
                                                <span className="text-sm font-bold text-slate-900">{uni.students || 0}</span>
                                                <span className="text-[10px] text-green-600 block font-bold">Enrolled</span>
                                            </td>
                                            <td className="px-3 md:px-6 py-2 md:py-4">
                                                <div className="flex items-center justify-end">
                                                    <button 
                                                        onClick={() => navigate(`/superadmin/university/${uni.id}`)}
                                                        className="px-2 md:px-4 py-1.5 bg-[#2b6cee] text-white rounded-lg text-[9px] md:text-[11px] font-bold hover:bg-[#2b6cee]/90 transition-all shadow-md shadow-blue-100 whitespace-nowrap"
                                                    >
                                                        View Profile
                                                    </button>
                                                    <button
                                                        onClick={() => suspendUniversity(uni.id)}
                                                        className="size-7 md:size-8 flex items-center justify-center bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all shadow-sm border border-amber-100"
                                                        title="Suspend University"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] md:text-[18px]">block</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                                                <span className="material-symbols-outlined !text-[64px]">search_off</span>
                                                <p className="font-bold text-slate-500">No active partners found matching your search.</p>
                                                <p className="text-sm opacity-60">Try adjusting your filters or search query.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminActivePartners;
