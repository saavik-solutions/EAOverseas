import React from 'react';
import { useParams, Link } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityLeads = () => {
    const { universityName } = useParams<{ universityName: string }>();
    
    const displayName = universityName 
        ? universityName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "University of Toronto";

    const demoUniversities = ['university-of-toronto', 'kings-college-london', 'university-of-melbourne'];
    const isDemo = demoUniversities.includes(universityName || '');

    const leads = isDemo ? [
        { id: 1, name: 'Rahul Sharma', course: 'MSc Artificial Intelligence', date: '2 hours ago', status: 'In Review', email: 'rahul.s@example.com' },
        { id: 2, name: 'Priya Patel', course: 'MBA Strategy & Leadership', date: '5 hours ago', status: 'New', email: 'priya.p@example.com' },
        { id: 3, name: 'James Wilson', course: 'BEng Mechanical Engineering', date: 'Yesterday', status: 'Assigned', email: 'james.w@example.com' },
        { id: 4, name: 'Ananya Iyer', course: 'MSc Artificial Intelligence', date: '2 days ago', status: 'In Review', email: 'ananya.i@example.com' },
        { id: 5, name: 'David Chen', course: 'BA International Relations', date: '3 days ago', status: 'Completed', email: 'david.c@example.com' },
    ] : [];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-50 text-blue-600';
            case 'In Review': return 'bg-amber-50 text-amber-600';
            case 'Assigned': return 'bg-purple-50 text-purple-600';
            case 'Completed': return 'bg-emerald-50 text-emerald-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    return (
        <UniversityLayout universityName={displayName} pageTitle="Active Leads">
            <div className="p-4 md:p-6 max-w-[1400px] mx-auto w-full flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Leads</h2>
                        <p className="text-slate-400 text-xs font-medium mt-1">Manage students who have expressed direct interest in your programs.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-white border border-slate-100 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all">
                            <span className="material-symbols-outlined text-[18px]">download</span> Export CSV
                        </button>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Interested Program</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Interest Date</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {leads.length > 0 ? leads.map((lead) => (
                                     <tr key={lead.id} className="hover:bg-slate-50/30 transition-all group">
                                         <td className="px-8 py-6">
                                             <div className="flex items-center gap-4">
                                                 <div className="size-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold">
                                                     {lead.name.charAt(0)}
                                                 </div>
                                                 <div className="flex flex-col">
                                                     <span className="text-sm font-black text-slate-900">{lead.name}</span>
                                                     <span className="text-[10px] font-bold text-slate-400 underline decoration-slate-200">{lead.email}</span>
                                                 </div>
                                             </div>
                                         </td>
                                         <td className="px-8 py-6">
                                             <span className="text-xs font-bold text-slate-600">{lead.course}</span>
                                         </td>
                                         <td className="px-8 py-6">
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lead.date}</span>
                                         </td>
                                         <td className="px-8 py-6">
                                             <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${getStatusStyle(lead.status)}`}>
                                                 {lead.status}
                                             </span>
                                         </td>
                                         <td className="px-8 py-6">
                                             <div className="flex items-center justify-end gap-2">
                                                 <button className="p-2 text-slate-400 hover:text-[#2b6cee] hover:bg-blue-50 rounded-xl transition-all" title="View Profile">
                                                     <span className="material-symbols-outlined text-[20px]">person</span>
                                                 </button>
                                             </div>
                                         </td>
                                     </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-32 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="size-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-2">
                                                    <span className="material-symbols-outlined text-4xl">group_off</span>
                                                </div>
                                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">No active leads yet</h3>
                                                <p className="text-[10px] text-slate-300 max-w-xs font-medium">When students express interest in your university or specific courses, they will appear here for you to manage.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityLeads;
