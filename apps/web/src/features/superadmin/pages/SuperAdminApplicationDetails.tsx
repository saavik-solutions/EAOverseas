import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

const SuperAdminApplicationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [app, setApp] = useState<any>(null);

    useEffect(() => {
        const savedApps = JSON.parse(localStorage.getItem('student_applications') || '[]');
        const found = savedApps.find((a: any) => a.id === id);
        if (found) setApp(found);
    }, [id]);

    const updateStatus = (newStatus: string) => {
        const savedApps = JSON.parse(localStorage.getItem('student_applications') || '[]');
        const updated = savedApps.map((a: any) => a.id === id ? { ...a, status: newStatus } : a);
        localStorage.setItem('student_applications', JSON.stringify(updated));
        setApp((prev: any) => ({ ...prev, status: newStatus }));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-200';
            case 'Accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'Declined': return 'bg-rose-50 text-rose-600 border-rose-200';
            case 'Rejected': return 'bg-rose-50 text-rose-600 border-rose-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    if (!app) {
        return (
            <SuperAdminLayout title="Application Details">
                <div className="flex items-center justify-center h-64">
                    <span className="material-symbols-outlined text-5xl text-slate-300 animate-spin">progress_activity</span>
                </div>
            </SuperAdminLayout>
        );
    }

    const Field = ({ label, value }: { label: string; value: string }) => (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
            <span className="text-sm font-semibold text-slate-900">{value || 'Not provided'}</span>
        </div>
    );

    return (
        <SuperAdminLayout title="Application Details">
            <div className="p-6 md:p-8 max-w-5xl mx-auto flex flex-col gap-6">

                {/* Back + Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 font-semibold text-sm transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back
                    </button>
                    <div className="h-5 w-px bg-slate-200" />
                    <h1 className="text-lg font-bold text-slate-800">{app.studentName}'s Application</h1>
                    <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                        {app.status}
                    </span>
                </div>

                {/* Details Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Program + Personal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="p-6 flex flex-col gap-5">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">school</span>
                                Program Information
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                <Field label="Institution" value={app.universityName} />
                                <Field label="Course" value={app.courseName} />
                                <Field label="Application Type" value={app.type} />
                                <Field label="Submitted On" value={app.submissionDate} />
                            </div>
                        </div>
                        <div className="p-6 flex flex-col gap-5">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">person</span>
                                Personal Information
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Full Name" value={app.studentName} />
                                <Field label="Email" value={app.studentEmail} />
                                <Field label="Phone" value={app.details?.phone} />
                                <Field label="Nationality" value={app.details?.nationality} />
                                <Field label="Passport No." value={app.details?.passportNumber} />
                            </div>
                        </div>
                    </div>

                    {/* Academic */}
                    <div className="border-t border-slate-100 p-6 flex flex-col gap-5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">history_edu</span>
                            Academic Background
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Field label="Highest Qualification" value={app.academic?.highestQualification} />
                            <Field label="Institution Name" value={app.academic?.institutionName} />
                            <Field label="CGPA / Grade" value={app.academic?.cgpa} />
                            <Field label={`English Test (${app.academic?.englishTest || 'N/A'})`} value={`Score: ${app.academic?.testScore || 'N/A'}`} />
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="border-t border-slate-100 p-6 flex flex-col gap-5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">folder</span>
                            Submitted Documents
                        </p>
                        {app.documents && Array.isArray(app.documents) && app.documents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {app.documents.map((doc: any, idx: number) => {
                                    const isImage = doc.type?.startsWith('image/');
                                    const isPdf = doc.type === 'application/pdf';
                                    const icon = isPdf ? 'picture_as_pdf' : isImage ? 'image' : 'description';
                                    const iconColor = isPdf ? 'text-red-500' : isImage ? 'text-blue-500' : 'text-slate-500';
                                    const handleOpen = () => {
                                        if (doc.base64) {
                                            const win = window.open();
                                            if (win) {
                                                if (isPdf) {
                                                    win.document.write(`<iframe src="${doc.base64}" width="100%" height="100%" style="border:none;position:fixed;top:0;left:0;"></iframe>`);
                                                } else if (isImage) {
                                                    win.document.write(`<img src="${doc.base64}" style="max-width:100%;display:block;margin:auto;" />`);
                                                } else {
                                                    const a = win.document.createElement('a');
                                                    a.href = doc.base64;
                                                    a.download = doc.name;
                                                    a.click();
                                                }
                                            }
                                        }
                                    };
                                    return (
                                        <div key={idx} className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 hover:border-blue-300 hover:shadow-sm transition-all">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className={`size-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 ${iconColor}`}>
                                                    <span className="material-symbols-outlined text-[22px]">{icon}</span>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-slate-800 truncate">{doc.name}</p>
                                                    <p className="text-xs text-slate-400">{doc.size}</p>
                                                </div>
                                            </div>
                                            {doc.base64 ? (
                                                <button
                                                    onClick={handleOpen}
                                                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all border border-blue-100"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                                    Open
                                                </button>
                                            ) : (
                                                <span className="shrink-0 flex items-center gap-1 text-xs text-slate-400">
                                                    <span className="material-symbols-outlined text-[16px]">lock</span>
                                                    Unavailable
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 italic">No documents uploaded.</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="border-t border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        {(app.status === 'Accepted' || app.status === 'Declined') ? (
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm border ${
                                app.status === 'Accepted'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}>
                                <span className="material-symbols-outlined text-[18px]">
                                    {app.status === 'Accepted' ? 'check_circle' : 'cancel'}
                                </span>
                                Application {app.status}
                            </div>
                        ) : (
                            <span className="text-xs text-slate-400">Action cannot be undone once submitted.</span>
                        )}
                        <div className="flex gap-3">
                            <button
                                onClick={() => { if (window.confirm('Decline this application?')) updateStatus('Declined'); }}
                                disabled={app.status === 'Accepted' || app.status === 'Declined'}
                                className="px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-600 hover:text-white"
                            >
                                <span className="material-symbols-outlined text-[18px]">cancel</span>
                                Decline
                            </button>
                            <button
                                onClick={() => { if (window.confirm('Accept this application?')) updateStatus('Accepted'); }}
                                disabled={app.status === 'Accepted' || app.status === 'Declined'}
                                className="px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20"
                            >
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminApplicationDetails;
