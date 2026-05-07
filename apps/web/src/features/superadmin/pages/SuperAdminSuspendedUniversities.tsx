import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

const SuperAdminSuspendedUniversities = () => {
    const navigate = useNavigate();
    const [universities, setUniversities] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('ea_universities');
        if (saved) {
            const all = JSON.parse(saved);
            setUniversities(all.filter((u: any) => u.status === 'Suspended'));
        }
    }, []);

    const reactivate = (id: number) => {
        if (window.confirm('Reactivate this university?')) {
            const saved = JSON.parse(localStorage.getItem('ea_universities') || '[]');
            const updated = saved.map((u: any) => u.id === id ? { ...u, status: 'Active' } : u);
            localStorage.setItem('ea_universities', JSON.stringify(updated));
            setUniversities(updated.filter((u: any) => u.status === 'Suspended'));
        }
    };

    return (
        <SuperAdminLayout title="Suspended Universities">
            <div className="p-3 md:p-8 flex flex-col gap-4 md:gap-6">

                {/* Back + Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/superadmin/universities')}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 font-bold text-[11px] md:text-sm transition-colors"
                    >
                        <span className="material-symbols-outlined text-[16px] md:text-[18px]">arrow_back</span>
                        Back to Management
                    </button>
                </div>

                {/* Summary */}
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-rose-50 p-2 md:p-3 rounded-xl border border-rose-100">
                        <span className="material-symbols-outlined text-rose-500 text-[20px] md:text-[28px]">block</span>
                    </div>
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-slate-900">{universities.length} Suspended Universities</h2>
                        <p className="text-[10px] md:text-xs text-slate-500 mt-0.5">Institutions currently restricted from platform access.</p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-3 md:px-6 py-2.5 md:py-4 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">University</th>
                                <th className="hidden md:table-cell px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Country</th>
                                <th className="hidden md:table-cell px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Courses</th>
                                <th className="hidden md:table-cell px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rating</th>
                                <th className="hidden md:table-cell px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-3 md:px-6 py-2.5 md:py-4 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {universities.length > 0 ? (
                                universities.map((uni: any) => (
                                    <tr key={uni.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-2 md:px-6 py-2.5 md:py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 md:size-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 font-bold text-xs md:text-sm shrink-0">
                                                    {uni.name?.charAt(0)?.toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <span className="text-xs md:text-sm font-bold text-slate-900 truncate block">{uni.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[8px] md:text-[10px] text-slate-400 whitespace-nowrap">ID: UNI-{String(uni.id).padStart(4, '0')}</span>
                                                        <span className="md:hidden text-[8px] font-black text-rose-600 bg-rose-50 px-1 py-0.5 rounded uppercase">{uni.country}</span>
                                                    </div>
                                                    <div className="md:hidden flex items-center gap-2 mt-1">
                                                        <span className="text-[9px] font-bold text-slate-500">{uni.courses || 0} Courses</span>
                                                        <div className="size-0.5 rounded-full bg-slate-300"></div>
                                                        <div className="flex items-center gap-0.5">
                                                            <span className="material-symbols-outlined text-amber-400 text-[10px]">star</span>
                                                            <span className="text-[9px] font-bold text-slate-500">{uni.rating || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600">{uni.country}</span>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4">
                                            <span className="text-sm font-bold text-slate-700">{uni.courses || 0}</span>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-amber-400 text-[16px]">star</span>
                                                <span className="text-sm font-bold text-slate-700">{uni.rating || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold border bg-rose-50 text-rose-600 border-rose-200">
                                                Suspended
                                            </span>
                                        </td>
                                        <td className="px-2 md:px-6 py-2.5 md:py-4 text-right">
                                            <button
                                                onClick={() => reactivate(uni.id)}
                                                className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-4 py-1.5 md:py-2 rounded-lg bg-emerald-50 text-emerald-600 text-[9px] md:text-xs font-black border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all whitespace-nowrap"
                                            >
                                                <span className="material-symbols-outlined text-[13px] md:text-[16px]">check_circle</span>
                                                Reactivate
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <span className="material-symbols-outlined text-4xl text-slate-300">check_circle</span>
                                            <p className="text-sm text-slate-400 font-medium">No suspended universities found.</p>
                                            <p className="text-xs text-slate-400">All universities are currently active or pending.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminSuspendedUniversities;
