import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

interface HolidayRequest {
    id: number;
    dayIndex: number;
    startTime: string;
    endTime: string;
    type: string;
    status: 'pending' | 'approved' | 'rejected';
    title: string;
    details: string;
    consultantName?: string;
    consultantEmail?: string;
    applyDate?: string;
}

const SuperAdminHolidayManagement: React.FC = () => {
    const navigate = useNavigate();
    const [originalRequests, setOriginalRequests] = useState<HolidayRequest[]>([]);
    
    useEffect(() => {
        try {
            const saved = localStorage.getItem('eao_consultant_schedule');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    const holidayRequests = parsed.filter((item: any) => item && item.type === 'blocked' && item.title !== 'Lunch Break');
                    
                    const enriched = holidayRequests.map((req: any) => ({
                        ...req,
                        consultantName: req.consultantName || 'Liam Smith',
                        consultantEmail: req.consultantEmail || 'liam.s@eaoverseas.com',
                        applyDate: req.applyDate || new Date().toLocaleDateString()
                    }));
                    setOriginalRequests(enriched);
                }
            }
        } catch (error) {
            console.error("Error loading holiday data:", error);
            setOriginalRequests([]);
        }
    }, []);

    // Statistics based on individual day entries
    const stats = {
        total: originalRequests.length,
        pending: originalRequests.filter(r => r.status === 'pending').length,
        approved: originalRequests.filter(r => r.status === 'approved').length,
        rejected: originalRequests.filter(r => r.status === 'rejected').length
    };

    // Aggregate requests for display: Group by Email and Status
    const aggregateRequests = () => {
        const grouped: Record<string, any> = {};
        
        originalRequests.forEach(req => {
            const key = `${req.consultantEmail}-${req.status}`;
            if (!grouped[key]) {
                grouped[key] = {
                    ...req,
                    totalDays: 1,
                    allIds: [req.id]
                };
            } else {
                grouped[key].totalDays += 1;
                grouped[key].allIds.push(req.id);
            }
        });
        
        return Object.values(grouped);
    };

    const groupedRequests = aggregateRequests();

    return (
        <SuperAdminLayout title="Consultant Holiday Requests">
            <div className="p-6 flex flex-col gap-6">
                {/* Page Header Description */}
                <div>
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Manage Applications</h2>
                    <p className="text-slate-500 text-xs font-medium">Review and manage consultant leave applications across all regions.</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Total Requested Days</p>
                            <h3 className="text-2xl font-black text-slate-900 leading-none">{stats.total}</h3>
                        </div>
                        <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                            <span className="material-symbols-outlined text-[20px] font-black">fact_check</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border-l-4 border-l-amber-400 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Pending (Days)</p>
                            <h3 className="text-2xl font-black text-slate-900 leading-none">{stats.pending}</h3>
                        </div>
                        <div className="size-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                            <span className="material-symbols-outlined text-[20px] font-black fill-amber-600">pending</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border-l-4 border-l-emerald-500 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Approved (Days)</p>
                            <h3 className="text-2xl font-black text-slate-900 leading-none">{stats.approved}</h3>
                        </div>
                        <div className="size-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                            <span className="material-symbols-outlined text-[20px] font-black fill-emerald-600">check_circle</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border-l-4 border-l-rose-500 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Rejected</p>
                            <h3 className="text-2xl font-black text-slate-900 leading-none">{stats.rejected}</h3>
                        </div>
                        <div className="size-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                            <span className="material-symbols-outlined text-[20px] font-black fill-rose-600">cancel</span>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Consultant</th>
                                    <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Holiday Type</th>
                                    <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Days</th>
                                    <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {groupedRequests.map((request: any) => (
                                    <tr key={request.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="size-8 rounded-full bg-blue-50 text-[#2b6cee] flex items-center justify-center font-black text-[10px] ring-2 ring-white">
                                                    {request.consultantName?.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-slate-900 leading-tight">{request.consultantName}</span>
                                                    <span className="text-[9px] text-slate-400 font-bold tracking-tight">{request.consultantEmail}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-[12px] font-black text-slate-800 leading-tight">{request.totalDays > 1 ? 'Continuous Leave Chain' : request.title}</span>
                                                <span className="text-[9px] text-[#2b6cee] bg-blue-50 px-1.5 py-0.5 rounded-md w-fit font-black tracking-widest uppercase">{request.startTime} - {request.endTime}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="px-2 py-0.5 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                                                    <span className="text-[11px] font-black text-slate-900">{request.totalDays.toString().padStart(2, '0')}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Days</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <div className="flex justify-center">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                    request.status === 'pending' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                                                    request.status === 'approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                                    'bg-rose-50 border-rose-100 text-rose-600'
                                                }`}>
                                                    <span className={`w-1 h-1 rounded-full ${
                                                        request.status === 'pending' ? 'bg-amber-500 animate-pulse' :
                                                        request.status === 'approved' ? 'bg-emerald-500' :
                                                        'bg-rose-500'
                                                    }`}></span>
                                                    {request.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button 
                                                onClick={() => navigate(`/superadmin/consultants/holidays/${request.id}`)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] text-slate-600 hover:text-[#2b6cee] hover:border-[#2b6cee]/20 hover:bg-blue-50/50 transition-all shadow-sm hover:shadow-md"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">visibility</span>
                                                View Request
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {groupedRequests.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-16 text-center">
                                            <div className="flex flex-col items-center gap-2 text-slate-300">
                                                <span className="material-symbols-outlined text-5xl opacity-20">event_busy</span>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em]">No holiday requests found</p>
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

export default SuperAdminHolidayManagement;
