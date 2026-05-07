import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConsultantLayout from '../layouts/ConsultantLayout';

const CounsellorApplicationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedApp, setSelectedApp] = useState<any>(null);

    useEffect(() => {
        const loadApplication = () => {
            const savedApps = localStorage.getItem('student_applications');
            if (savedApps) {
                const apps = JSON.parse(savedApps);
                const app = apps.find((a: any) => a.id === id);
                if (app) {
                    setSelectedApp(app);
                }
            }
        };
        loadApplication();
    }, [id]);

    const updateStatus = (newStatus: string) => {
        const savedApps = JSON.parse(localStorage.getItem('student_applications') || '[]');
        const updated = savedApps.map((a: any) =>
            a.id === id ? { ...a, status: newStatus } : a
        );
        localStorage.setItem('student_applications', JSON.stringify(updated));
        setSelectedApp((prev: any) => ({ ...prev, status: newStatus }));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Reviewed': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Declined': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'Rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    if (!selectedApp) {
        return (
            <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50 items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-gray-300 animate-spin">progress_activity</span>
                <p className="mt-4 text-gray-500 font-medium">Loading application...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            <header className="h-16 border-b border-gray-100 bg-white flex items-center px-8 shrink-0">
                <button 
                    onClick={() => navigate('/counsellor/applications')}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold text-sm transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Applications
                </button>
            </header>

            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedApp.studentName}'s Application</h2>
                                <p className="text-sm text-gray-500 mt-1">Submitted on {selectedApp.submissionDate}</p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(selectedApp.status)}`}>
                                {selectedApp.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Program Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">school</span>
                                    Program Information
                                </h3>
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Institution</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedApp.universityName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Course</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedApp.courseName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Application Type</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedApp.type}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">person</span>
                                    Personal Information
                                </h3>
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Email</p>
                                        <p className="text-sm font-bold text-gray-900 break-all">{selectedApp.studentEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Phone</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedApp.details?.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Nationality</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedApp.details?.nationality || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Passport No.</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedApp.details?.passportNumber || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Details */}
                            <div className="space-y-4 md:col-span-2">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">history_edu</span>
                                    Academic Background
                                </h3>
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Highest Qualification</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedApp.academic?.highestQualification || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Institution Name</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedApp.academic?.institutionName || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">CGPA / Grade</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedApp.academic?.cgpa || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">English Test ({selectedApp.academic?.englishTest || 'N/A'})</p>
                                        <p className="text-sm font-bold text-gray-900">Score: {selectedApp.academic?.testScore || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="space-y-4 md:col-span-2">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">folder</span>
                                    Submitted Documents
                                </h3>
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                    {selectedApp.documents && Array.isArray(selectedApp.documents) && selectedApp.documents.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedApp.documents.map((doc: any, idx: number) => {
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
                                                    <div key={idx} className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-3 group hover:border-blue-300 hover:shadow-sm transition-all">
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <div className={`size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 ${iconColor}`}>
                                                                <span className="material-symbols-outlined text-[22px]">{icon}</span>
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-semibold text-gray-800 truncate">{doc.name}</p>
                                                                <p className="text-xs text-gray-400">{doc.size}</p>
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
                                                            <span className="shrink-0 flex items-center gap-1 text-xs text-gray-400">
                                                                <span className="material-symbols-outlined text-[16px]">lock</span>
                                                                Unavailable
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">No documents uploaded.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                            {/* Status indicator when decided */}
                            {(selectedApp.status === 'Accepted' || selectedApp.status === 'Declined') ? (
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm border ${
                                    selectedApp.status === 'Accepted'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}>
                                    <span className="material-symbols-outlined text-[18px]">
                                        {selectedApp.status === 'Accepted' ? 'check_circle' : 'cancel'}
                                    </span>
                                    Application {selectedApp.status}
                                </div>
                            ) : (
                                <span className="text-xs text-gray-400">Action cannot be undone once submitted.</span>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to decline this application?')) {
                                            updateStatus('Declined');
                                        }
                                    }}
                                    disabled={selectedApp.status === 'Accepted' || selectedApp.status === 'Declined'}
                                    className="px-6 py-2.5 rounded-lg font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed
                                        text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-600 hover:text-white hover:border-rose-600"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                                        Decline Application
                                    </span>
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to accept this application?')) {
                                            updateStatus('Accepted');
                                        }
                                    }}
                                    disabled={selectedApp.status === 'Accepted' || selectedApp.status === 'Declined'}
                                    className="px-6 py-2.5 rounded-lg font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed
                                        bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                        Accept Application
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CounsellorApplicationDetails;
