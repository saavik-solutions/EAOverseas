import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

interface HolidayRequest {
    id: number;
    dayIndex: number;
    date: string | null;
    startTime: string;
    endTime: string;
    type: string;
    status: string;
    title: string;
    details: string;
    attachment?: string;
    consultantName?: string;
    consultantEmail?: string;
    applyDate?: string;
}

const SuperAdminHolidayDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [request, setRequest] = useState<HolidayRequest | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('eao_consultant_schedule');
        if (saved) {
            const data: HolidayRequest[] = JSON.parse(saved);
            const found = data.find(item => Number(item.id) === Number(id || ''));
            if (found) {
                // Mock extra data if missing from the core object
                setRequest({
                    ...found,
                    consultantName: found.consultantName || 'Elena Richardson',
                    consultantEmail: found.consultantEmail || 'elena.r@eaoverseas.com',
                    applyDate: found.applyDate || new Date().toLocaleDateString()
                });
            }
        }
    }, [id]);

    const updateStatus = (newStatus: 'approved' | 'rejected') => {
        const saved = localStorage.getItem('eao_consultant_schedule');
        if (saved) {
            const data: HolidayRequest[] = JSON.parse(saved);
            const updated = data.map(item => 
                item.id === parseInt(id || '') ? { ...item, status: newStatus } : item
            );
            localStorage.setItem('eao_consultant_schedule', JSON.stringify(updated));
            navigate('/superadmin/consultants/holidays');
        }
    };

    if (!request) return <div className="p-10 text-center font-bold">Loading request details...</div>;

    return (
        <SuperAdminLayout title="Request Details">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[50] flex items-center justify-center p-6 lg:pl-[260px]">
                <div className="bg-white w-full max-w-4xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-white/20 transition-all">
                    {/* Modal Header */}
                    <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-600 text-2xl">description</span>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 leading-tight">Request Details</h3>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest leading-none mt-1">REF: #LR-2024-{request.id}</p>
                            </div>
                        </div>
                        <button onClick={() => navigate('/superadmin/consultants/holidays')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors group">
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-600">close</span>
                        </button>
                    </div>

                    {/* Modal Body (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#faf8ff]">
                        <div className="grid grid-cols-12 gap-8">
                            {/* Left Column: Profile & Reason */}
                            <div className="col-span-12 lg:col-span-7 space-y-8">
                                {/* Consultant Profile Section */}
                                <section>
                                    <h4 className="text-[11px] uppercase tracking-[0.15em] font-black text-slate-400 mb-4">Consultant Information</h4>
                                    <div className="flex items-start gap-5 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                                        <div className="size-16 rounded-full bg-blue-50 text-[#2b6cee] flex items-center justify-center font-black text-xl border-2 border-white shadow-sm ring-4 ring-blue-50/50">
                                            {request.consultantName?.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-black text-slate-900 leading-tight">{request.consultantName}</h2>
                                            <div className="flex flex-col gap-1 mt-1.5">
                                                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                                    <span className="material-symbols-outlined text-base">mail</span>
                                                    <span>{request.consultantEmail}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                                    <span className="material-symbols-outlined text-base">badge</span>
                                                    <span>Senior Academic Consultant</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest self-start border border-blue-100">
                                            Full-Time
                                        </div>
                                    </div>
                                </section>

                                {/* Leave Details Section */}
                                <section>
                                    <h4 className="text-[11px] uppercase tracking-[0.15em] font-black text-slate-400 mb-4">Request Description</h4>
                                    <div className="space-y-4">
                                        <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm">
                                            <p className="text-sm text-slate-700 leading-relaxed italic font-medium">
                                                "{request.details}"
                                            </p>
                                        </div>
                                        
                                        {/* Document Uploads */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {request.attachment ? (
                                                <div 
                                                    onClick={() => {
                                                        const link = document.createElement('a');
                                                        link.href = '#';
                                                        link.download = request.attachment || 'document.pdf';
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                        alert(`Opening/Downloading: ${request.attachment}`);
                                                    }}
                                                    className="flex items-center gap-3 p-3 border border-slate-100 bg-white rounded-xl hover:border-[#2b6cee] transition-all cursor-pointer group shadow-sm"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                                        <span className="material-symbols-outlined">picture_as_pdf</span>
                                                    </div>
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-xs font-black truncate text-slate-900">{request.attachment}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">1.2 MB • PDF</p>
                                                    </div>
                                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-[#2b6cee]" style={{ fontVariationSettings: "'wght' 700" }}>download</span>
                                                </div>
                                            ) : (
                                                <div className="col-span-2 p-6 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center gap-2 opacity-60">
                                                    <span className="material-symbols-outlined text-slate-300 text-3xl">cloud_off</span>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No attachments provided</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                
                            </div>

                            {/* Right Column: Calendar & History */}
                            <div className="col-span-12 lg:col-span-5 space-y-8">
                                {/* Duration & Calendar */}
                                <section>
                                    <h4 className="text-[11px] uppercase tracking-[0.15em] font-black text-slate-400 mb-4">Duration & Calendar</h4>
                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                        <div className="p-4 bg-slate-50/80 flex items-center justify-between border-b border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                                                    <span className="material-symbols-outlined text-[#2b6cee]">calendar_month</span>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none mb-1">Leave Period</p>
                                                    <p className="text-sm font-black text-slate-900">{request.date || 'Multiple Days'}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-black text-[#2b6cee] leading-none">1</p>
                                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Days</p>
                                            </div>
                                        </div>
                                        {/* Mini Calendar Highlighting */}
                                        <div className="p-5 bg-white">
                                            {/* Month Title */}
                                            <div className="text-center mb-4">
                                                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2b6cee]">
                                                    {(() => {
                                                        const d = request.date || request.applyDate;
                                                        if (!d) return 'Calendar View';
                                                        const dateObj = new Date(d);
                                                        return isNaN(dateObj.getTime()) ? 'Calendar View' : dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
                                                    })()}
                                                </h5>
                                            </div>
                                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                                {['S','M','T','W','T','F','S'].map((day, i) => (
                                                    <span key={i} className="text-[9px] font-black text-slate-300 uppercase">{day}</span>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-7 gap-1">
                                                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                                                    const d = request.date || request.applyDate;
                                                    const requestDate = d ? new Date(d) : null;
                                                    const isRequestedDay = requestDate && !isNaN(requestDate.getTime()) && requestDate.getDate() === day;
                                                    
                                                    return (
                                                        <span key={day} className={`h-8 flex items-center justify-center text-[11px] font-bold rounded-lg transition-all ${
                                                            isRequestedDay ? 'bg-[#2b6cee] text-white shadow-lg shadow-blue-200 scale-110' : 'text-slate-300 hover:bg-slate-50'
                                                        }`}>
                                                            {day}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Previous Leave History */}
                                <section>
                                    <h4 className="text-[11px] uppercase tracking-[0.15em] font-black text-slate-400 mb-4">Leave History (This Consultant)</h4>
                                    <div className="space-y-2.5">
                                        {/* Filtering other requests from same consultant excluding current one */}
                                        {(() => {
                                            const saved = localStorage.getItem('eao_consultant_schedule');
                                            const allData: HolidayRequest[] = saved ? JSON.parse(saved) : [];
                                            const history = allData
                                                .filter(item => item.consultantEmail === request.consultantEmail && item.id !== request.id)
                                                .slice(0, 3);
                                            
                                            if (history.length === 0) {
                                                return (
                                                    <div className="p-10 border border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center gap-2 opacity-60 bg-white">
                                                        <span className="material-symbols-outlined text-slate-300 text-3xl">history</span>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No previous history found</p>
                                                    </div>
                                                );
                                            }

                                            return history.map((h, i) => (
                                                <div key={i} className="p-3.5 border border-slate-100 rounded-xl bg-white shadow-sm flex items-center justify-between group hover:border-[#2b6cee]/30 transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-[#2b6cee] text-lg">event_repeat</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-slate-800 leading-tight">{h.title}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">{h.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[11px] font-black text-slate-900 leading-none">1 Day</p>
                                                        <span className={`text-[8px] uppercase tracking-tighter px-1.5 py-0.5 rounded font-black border mt-1 inline-block ${
                                                            h.status === 'approved' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
                                                            h.status === 'pending' ? 'text-amber-600 bg-amber-50 border-amber-100' :
                                                            'text-rose-600 bg-rose-50 border-rose-100'
                                                        }`}>
                                                            {h.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                    <button className="w-full mt-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#2b6cee] hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100 flex items-center justify-center gap-2">
                                        View Full History
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer (Actions) */}
                    <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <button 
                            onClick={() => navigate('/superadmin/consultants/holidays')}
                            className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-all bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md"
                        >
                            Close Details
                        </button>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => updateStatus('rejected')}
                                className="px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 border border-rose-100 bg-white hover:bg-rose-50 transition-all rounded-lg flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-base">cancel</span>
                                Reject Request
                            </button>
                            <button 
                                onClick={() => updateStatus('approved')}
                                className="px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-[#2b6cee] hover:bg-blue-700 transition-all rounded-lg flex items-center gap-2 shadow-lg shadow-blue-100"
                            >
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                Approve Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </SuperAdminLayout>
    );
};

export default SuperAdminHolidayDetails;
