import React, { useState } from 'react';
import UniversityLayout from '@/layouts/UniversityLayout';
import { useApplications, Application } from '@/shared/contexts/ApplicationsContext';
import { useAuth } from '@/shared/contexts/AuthContext';

const UniversityApplications = () => {
    const { applications, updateApplicationStatus } = useApplications();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'All' | 'Program' | 'Scholarship' | 'University'>('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    const handleUpdateStatus = (id: string, newStatus: 'Accepted' | 'Rejected' | 'Pending') => {
        updateApplicationStatus(id, newStatus);
        setSelectedApplication(null);
    };

    const filteredApplications = applications.filter(app => {
        // Filter by current university
        const matchesUniversity = app.institution?.trim().toLowerCase() === user?.university?.trim().toLowerCase();
        if (!matchesUniversity) return false;

        const matchesTab = activeTab === 'All' || app.type === activeTab;
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
        const matchesSearch =
            app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.id.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesStatus && matchesSearch;
    });

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Accepted': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
            case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <UniversityLayout title="Applications Management">
            <div className="p-8 max-w-[1400px] mx-auto space-y-8 pb-10 font-['Public_Sans']">

                {/* Page Heading */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">Recent Applications</h2>
                    <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest">Monitor and process student submissions across all categories.</p>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Control Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            {['All', 'Program', 'Scholarship', 'University'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                                        ? 'bg-white text-[#1E63F3] shadow-sm'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {tab}{tab === 'All' ? '' : 's'}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="appearance-none bg-white border border-slate-200 rounded-2xl px-5 py-2.5 pr-10 text-[10px] font-black uppercase tracking-widest text-slate-600 focus:ring-2 focus:ring-blue-500/10 focus:border-[#1E63F3] outline-none cursor-pointer"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">expand_more</span>
                            </div>

                            <div className="relative group w-full md:w-64">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-[#1E63F3] transition-colors">search</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search applications..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-2.5 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 focus:border-[#1E63F3] transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* List View */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-left">Application Info</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-left">Student</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-left">Institution</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-left">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredApplications.length > 0 ? (
                                        filteredApplications.map((app) => (
                                            <tr key={app.id} className="hover:bg-blue-50/20 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-widest shadow-sm ${app.type === 'Program' ? 'bg-indigo-50 text-indigo-600' :
                                                                app.type === 'Scholarship' ? 'bg-emerald-50 text-emerald-600' :
                                                                    'bg-amber-50 text-amber-600'
                                                                }`}>
                                                                {app.type}
                                                            </span>
                                                            <span className="text-[10px] font-black text-slate-400">#{app.id}</span>
                                                        </div>
                                                        <h4 className="text-[13px] font-black text-slate-900 group-hover:text-[#1E63F3] transition-colors uppercase tracking-tight line-clamp-1">{app.targetName}</h4>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Applied: {new Date(app.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`size-10 rounded-2xl bg-${app.studentColor}-100 flex items-center justify-center text-${app.studentColor}-600 font-black text-xs shadow-sm`}>
                                                            {app.studentInitials}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[13px] font-black text-slate-900 line-clamp-1">{app.studentName}</span>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                <span className={`size-1.5 rounded-full ${app.priority === 'Urgent' ? 'bg-rose-500 animate-pulse' :
                                                                    app.priority === 'High' ? 'bg-amber-500' : 'bg-blue-500'
                                                                    }`} />
                                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{app.priority} Priority</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded-xl bg-slate-100 flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-slate-400 text-lg">school</span>
                                                        </div>
                                                        <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight">{app.institution}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyles(app.status)}`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button
                                                        onClick={() => setSelectedApplication(app)}
                                                        className="px-5 py-2.5 bg-[#1E63F3] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98]"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                                        <span className="material-symbols-outlined text-4xl">folder_off</span>
                                                    </div>
                                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No applications found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Placeholder */}
                        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Showing <span className="text-slate-900">{filteredApplications.length}</span> of <span className="text-slate-900">{applications.filter(app => app.institution?.trim().toLowerCase() === user?.university?.trim().toLowerCase()).length}</span> Applications
                            </p>
                            <div className="flex gap-2">
                                <button className="size-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-slate-400 text-xl">chevron_left</span>
                                </button>
                                <button className="size-10 rounded-2xl bg-[#1E63F3] text-white flex items-center justify-center font-black text-xs shadow-md shadow-blue-200">
                                    1
                                </button>
                                <button className="size-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-slate-400 text-xl">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Details Modal adapted from ConsultantApplications */}
            {selectedApplication && (
                <ViewApplicationDetailsModal
                    application={selectedApplication}
                    onClose={() => setSelectedApplication(null)}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </UniversityLayout>
    );
};

interface ViewApplicationDetailsModalProps {
    application: Application;
    onClose: () => void;
    onUpdateStatus: (id: string, newStatus: 'Accepted' | 'Rejected' | 'Pending') => void;
}

const ViewApplicationDetailsModal: React.FC<ViewApplicationDetailsModalProps> = ({ application, onClose, onUpdateStatus }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
            <div
                className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl border border-slate-100 p-8 md:p-10 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`size-14 rounded-2xl bg-${application.studentColor}-100 flex items-center justify-center text-${application.studentColor}-600 font-black text-xl shadow-sm`}>
                            {application.studentInitials}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{application.studentName}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${application.type === 'Program' ? 'bg-indigo-50 text-indigo-600' :
                                    application.type === 'Scholarship' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-amber-50 text-amber-600'
                                    }`}>
                                    {application.type}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 capitalize">Applied: {new Date(application.dateApplied).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Basic Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Number</p>
                            <p className="text-sm font-bold text-slate-700">{application.mobileNumber}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                            <p className="text-sm font-bold text-slate-700">{application.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Institution</p>
                            <p className="text-sm font-bold text-slate-700">{application.institution}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Major</p>
                            <p className="text-sm font-bold text-slate-700">{application.courseMajor}</p>
                        </div>
                    </div>

                    {/* Academic Profile */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="material-symbols-outlined text-purple-600 text-lg">school</span>
                            Academic Profile
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-50 px-4 py-3 rounded-2xl border border-purple-100 min-w-[100px]">
                                <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1 text-center">GPA</p>
                                <p className="text-xl font-black text-purple-600 text-center leading-none">{application.gpa}</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Key Achievements</p>
                                <p className="text-xs font-bold text-slate-600 leading-relaxed">{application.achievements}</p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Statement */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-600 text-lg">history_edu</span>
                            Personal Statement
                        </h3>
                        <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 italic">
                            <p className="text-sm font-bold text-slate-700 leading-relaxed">
                                "{application.statement}"
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            onClick={() => onUpdateStatus(application.id, 'Rejected')}
                            className="px-6 py-3 rounded-xl bg-rose-50 text-rose-600 text-[11px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all font-['Public_Sans']"
                        >
                            Reject Application
                        </button>
                        <button
                            onClick={() => onUpdateStatus(application.id, 'Pending')}
                            className="px-6 py-3 rounded-xl bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all text-center font-['Public_Sans']"
                        >
                            Request Modification
                        </button>
                        <button
                            onClick={() => onUpdateStatus(application.id, 'Accepted')}
                            className="px-6 py-3 rounded-xl bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all font-['Public_Sans']"
                        >
                            Approve & Process
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityApplications;
