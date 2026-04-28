import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

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

    const filteredPartners = (partners || []).filter(p => 
        (p.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (p.country?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    return (
        <SuperAdminLayout title="Active Partners">
            <div className="p-8 flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Active Institutional Partners</h2>
                        <p className="text-slate-500 text-sm mt-1">Manage and monitor all your high-performing university partnerships</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all font-semibold text-sm border border-slate-200"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        Back to Overview
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                        <input
                            type="text"
                            placeholder="Search active partners by name or country..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg">
                            <span className="text-sm font-bold">{filteredPartners.length}</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider">Active</span>
                        </div>
                    </div>
                </div>

                {/* Table View */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Detail</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Country</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Courses</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Students</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredPartners.length > 0 ? (
                                    filteredPartners.map((uni) => (
                                        <tr key={uni.id || Math.random()} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-lg border border-slate-200 bg-slate-50 p-1.5 flex items-center justify-center shrink-0">
                                                        {uni.logo ? (
                                                            <img src={uni.logo} className="size-full object-contain" alt="" />
                                                        ) : (
                                                            <span className="material-symbols-outlined text-slate-400">school</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-900">{uni.name || "Unnamed University"}</h4>
                                                        <p className="text-[10px] text-slate-500 font-medium">Partner ID: #UP-{String(uni.id || 0).padStart(4, '0')}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                                                    <span className="material-symbols-outlined !text-[14px]">public</span>
                                                    {uni.country || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-bold text-slate-900">{Array.isArray(uni.courses) ? uni.courses.length : (uni.courses || 0)}</span>
                                                <span className="text-[10px] text-slate-500 block">Offered</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-bold text-slate-900">{uni.students || 0}</span>
                                                <span className="text-[10px] text-green-600 block font-bold">Enrolled</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end">
                                                    <button 
                                                        onClick={() => navigate(`/superadmin/university/${uni.id}`)}
                                                        className="px-4 py-1.5 bg-[#2b6cee] text-white rounded-lg text-[11px] font-bold hover:bg-[#2b6cee]/90 transition-all shadow-md shadow-blue-100 whitespace-nowrap"
                                                    >
                                                        View Profile
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
