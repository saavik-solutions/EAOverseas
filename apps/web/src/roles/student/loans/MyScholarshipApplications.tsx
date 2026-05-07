import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useApplications } from '@/shared/contexts/ApplicationsContext';
import { useUserProfile } from '@/shared/contexts/UserProfileContext';
import { useAuth } from '@/shared/contexts/AuthContext';

const MyScholarshipApplications: React.FC = () => {
    const navigate = useNavigate();
    const { applications } = useApplications();
    const { userProfile } = useUserProfile();
    const { user } = useAuth();

    // Determine current user identity for filtering
    const currentUserName = userProfile.identity.name || user?.name || 'Alex Johnson';
    const currentUserEmail = userProfile.identity.email || user?.email;
    const currentUserInitials = currentUserName.split(' ').map(n => n[0]).join('').toUpperCase();

    const myApplications = applications
        .filter(app => {
            if (app.type !== 'Scholarship') return false;

            // Priority 1: Exact Email Match (Most reliable)
            if (currentUserEmail && app.email === currentUserEmail) return true;

            // Priority 2: Exact Name Match
            if (app.studentName === currentUserName) return true;

            // Priority 3: Initials Match (Fallback for demo states)
            if (app.studentName === currentUserInitials) return true;

            return false;
        })
        .map(app => ({
            id: app.id,
            scholarshipName: app.targetName,
            applicationId: `#${app.id}`,
            dateSubmitted: new Date(app.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: app.status === 'Pending' ? 'Submitted' : app.status === 'Accepted' ? 'Shortlisted' : 'Rejected' as any,
            counsellorReview: app.status === 'Pending' ? 'Pending assignment' : app.status === 'Accepted' ? 'Recommended for Award' : 'Application review completed'
        }));

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Submitted':
                return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Under Review':
                return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Shortlisted':
                return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Rejected':
                return 'bg-rose-50 text-rose-600 border-rose-100';
            default:
                return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const getStatusDot = (status: string) => {
        switch (status) {
            case 'Submitted': return 'bg-blue-500';
            case 'Under Review': return 'bg-amber-500';
            case 'Shortlisted': return 'bg-emerald-500';
            case 'Rejected': return 'bg-rose-500';
            default: return 'bg-slate-500';
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50 font-display">
            <PageHeader title="Scholarship Applications" />

            <main className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="max-w-[1400px] mx-auto space-y-8">

                    {/* Attractive Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                    <span className="material-symbols-outlined !text-[22px]">assignment_turned_in</span>
                                </div>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">Tracking Center</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                                My Scholarship <span className="text-blue-600">Applications</span>
                            </h1>
                            <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                                Monitor the status of your submitted applications and read feedback from our academic counsellors.
                            </p>
                        </div>
                    </div>

                    {/* Applications Table Card */}
                    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.03)] border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Scholarship Name</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date Submitted</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Counsellor Review</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {myApplications.map((app) => (
                                        <tr key={app.id} className="hover:bg-blue-50/30 transition-all group">
                                            <td className="px-8 py-7">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[15px] font-black text-slate-900 group-hover:text-blue-600 transition-colors">{app.scholarshipName}</span>
                                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{app.applicationId}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-7">
                                                <span className="text-sm font-bold text-slate-600">{app.dateSubmitted}</span>
                                            </td>
                                            <td className="px-8 py-7">
                                                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(app.status)}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(app.status)} animate-pulse`}></span>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-7">
                                                <span className="text-sm font-medium italic text-slate-500">{app.counsellorReview}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Info */}
                        <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                                Review times vary by institution. Please check back regularly for updates.
                            </p>
                            <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">
                                Total: {myApplications.length} Applications
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyScholarshipApplications;
