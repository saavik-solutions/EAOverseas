import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UniversityLayout from '@/layouts/UniversityLayout';
import { useApplications } from '@/shared/contexts/ApplicationsContext';

const ScholarshipAnalytics = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { applications } = useApplications();
    const scholarshipFromState = location.state?.scholarship;

    // Filter applications for THIS specific scholarship
    const scholarshipApplicants = applications.filter(app =>
        app.type === 'Scholarship' && app.targetName === (scholarshipFromState?.title || 'STEM Excellence Grant 2024')
    );

    const [status, setStatus] = useState<'Active' | 'Closed'>(
        scholarshipFromState?.status === 'Closed' ? 'Closed' : 'Active'
    );
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(scholarshipFromState?.title || 'STEM Excellence Grant 2024');
    const [details, setDetails] = useState(scholarshipFromState?.coverage || '100% Tuition Coverage + $5,000 allowance');
    const [minGpa, setMinGpa] = useState(scholarshipFromState?.requirement || '3.8+');
    const [expiry, setExpiry] = useState(scholarshipFromState?.deadline || 'Oct 15, 2024');

    const updateLocalStorage = (updatedScholarship: any) => {
        const saved = localStorage.getItem('university_scholarships');
        if (saved) {
            const scholarships = JSON.parse(saved);
            // Use ID for matching if available, fallback to title
            const index = scholarships.findIndex((s: any) =>
                (scholarshipFromState?.id && s.id === scholarshipFromState.id) ||
                (!scholarshipFromState?.id && s.title === scholarshipFromState?.title)
            );
            if (index !== -1) {
                scholarships[index] = { ...scholarships[index], ...updatedScholarship };
                localStorage.setItem('university_scholarships', JSON.stringify(scholarships));
            }
        }
    };

    const handleEdit = () => {
        if (isEditing) {
            // Saving changes
            const updated = {
                title,
                coverage: details,
                requirement: minGpa,
                deadline: expiry
            };
            updateLocalStorage(updated);
        }
        setIsEditing(!isEditing);
    };

    const handleClose = () => {
        const newStatus = status === 'Active' ? 'Closed' : 'Active';
        const newColor = newStatus === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';

        setStatus(newStatus as any);
        updateLocalStorage({ status: newStatus, statusColor: newColor });
    };

    const handleDelete = () => {
        const saved = localStorage.getItem('university_scholarships');
        if (saved) {
            const scholarships = JSON.parse(saved);
            const filtered = scholarships.filter((s: any) =>
                (scholarshipFromState?.id && s.id !== scholarshipFromState.id) ||
                (!scholarshipFromState?.id && s.title !== scholarshipFromState?.title)
            );
            localStorage.setItem('university_scholarships', JSON.stringify(filtered));
        }
        // Correct route from App.tsx is /university/management
        navigate('/university/management');
    };

    return (
        <UniversityLayout title="Scholarship Analytics & Applicant Tracking">
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 font-['Public_Sans'] bg-slate-50/30">
                {/* Scholarship Banner Section */}
                <section className="bg-white rounded-[24px] border border-blue-100 p-8 shadow-sm mb-8 relative overflow-hidden group">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full -mr-40 -mt-40 blur-3xl opacity-60 group-hover:bg-blue-100 transition-colors duration-500" />

                    <div className="relative flex flex-col md:flex-row gap-8 items-start justify-between">
                        <div className="flex gap-8 flex-col md:flex-row items-start font-['Public_Sans']">
                            <div className="h-32 w-32 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100 overflow-hidden shadow-sm ring-4 ring-white">
                                <img
                                    className="object-cover h-full w-full opacity-90 group-hover:opacity-100 transition-opacity"
                                    alt="Scholarship"
                                    src="https://images.unsplash.com/photo-1523050853063-bd80e20001df?w=400&auto=format&fit=crop&q=60"
                                />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col md:flex-row items-center md:items-end gap-3">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="text-3xl font-bold text-slate-900 tracking-tight leading-none bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#1E63F3]/20"
                                        />
                                    ) : (
                                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-none">{title}</h1>
                                    )}
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm transition-colors duration-300 ${status === 'Active' ? 'bg-blue-50 text-[#1E63F3] border-blue-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                        {status}
                                    </span>
                                </div>
                                {isEditing ? (
                                    <div className="flex flex-col space-y-2 mt-2">
                                        <div className="flex flex-col">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Details</label>
                                            <input
                                                type="text"
                                                value={details}
                                                onChange={(e) => setDetails(e.target.value)}
                                                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E63F3]/20 focus:border-[#1E63F3]"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex flex-col flex-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Min. GPA</label>
                                                <input
                                                    type="text"
                                                    value={minGpa}
                                                    onChange={(e) => setMinGpa(e.target.value)}
                                                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E63F3]/20 focus:border-[#1E63F3]"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expiry</label>
                                                <input
                                                    type="text"
                                                    value={expiry}
                                                    onChange={(e) => setExpiry(e.target.value)}
                                                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E63F3]/20 focus:border-[#1E63F3]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-slate-500 text-sm leading-relaxed max-w-2xl font-medium">
                                        <span className="text-slate-400 uppercase text-[10px] tracking-wider font-bold">Details:</span> {details} |
                                        <span className="text-slate-400 uppercase text-[10px] tracking-wider font-bold ml-4">Min. GPA:</span> {minGpa} |
                                        <span className="text-slate-400 uppercase text-[10px] tracking-wider font-bold ml-4">Expiry:</span> {expiry}
                                    </p>
                                )}
                                <div className="flex items-center justify-center md:justify-start gap-12 pt-1">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5">Applications</span>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-3xl font-bold text-slate-900 tracking-tight leading-none">{scholarshipApplicants.length}</span>
                                            {scholarshipApplicants.length > 0 && (
                                                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-lg">+12%</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="h-10 w-px bg-slate-100"></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5">Max Available</span>
                                        <span className="text-3xl font-bold text-slate-900 tracking-tight leading-none">{scholarshipFromState?.maxAvailable || '50'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center mt-6 md:mt-0 font-['Public_Sans']">
                            <button
                                onClick={handleEdit}
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${isEditing ? 'bg-[#1E63F3] text-white border-[#1E63F3] hover:bg-blue-700' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">{isEditing ? 'check_circle' : 'edit'}</span> {isEditing ? 'Save Changes' : 'Edit Details'}
                            </button>
                            <button
                                onClick={handleClose}
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${status === 'Active' ? 'bg-white hover:bg-orange-50 text-orange-600 border-orange-100' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">{status === 'Active' ? 'block' : 'check_circle'}</span> {status === 'Active' ? 'Close' : 'Re-open'}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#1E63F3] hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-100/50"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span> Delete
                            </button>
                        </div>
                    </div>
                </section>

                {/* Table Section */}
                <section className="bg-white rounded-[32px] border border-blue-50 shadow-sm overflow-hidden font-['Public_Sans']">
                    <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-6 bg-[#1E63F3] rounded-full"></div>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Applications</h2>
                            </div>
                            <p className="text-[11px] font-medium text-slate-400 tracking-wide ml-4">Monitor and manage student scholarship requests in real-time</p>
                        </div>
                        <div className="flex items-center gap-4 font-['Public_Sans']">
                            <button className="px-6 py-3 rounded-2xl border border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-50 flex items-center gap-2.5 transition-all">
                                <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto px-4 pb-4">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-slate-400">
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Student Profile</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Nationality</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Selected Program</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Applied On</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="font-['Public_Sans']">
                                {scholarshipApplicants.length > 0 ? (
                                    scholarshipApplicants.map((app, idx) => (
                                        <tr key={app.id} className="group transition-all duration-300">
                                            <td className="px-6 py-5 bg-slate-50/10 group-hover:bg-blue-50/50 rounded-l-2xl border-y border-l border-slate-100/50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`h-12 w-12 rounded-xl border-4 border-white shadow-sm flex items-center justify-center bg-${app.studentColor}-50 text-${app.studentColor}-600 font-bold overflow-hidden ring-1 ring-slate-100 group-hover:ring-blue-100 transition-all`}>
                                                        {app.studentInitials}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 leading-none mb-1.5">{app.studentName}</p>
                                                        <p className="text-[11px] font-medium text-slate-400">{app.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/10 group-hover:bg-blue-50/50 border-y border-slate-100/50 transition-colors">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[16px] text-blue-400">location_on</span> India
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/10 group-hover:bg-blue-50/50 border-y border-slate-100/50 transition-colors">
                                                <span className="text-[11px] font-bold bg-blue-50/80 text-[#1E63F3] border border-blue-100 px-3 py-1.5 rounded-lg">{app.courseMajor}</span>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/10 group-hover:bg-blue-50/50 border-y border-slate-100/50 transition-colors text-xs font-semibold text-slate-500">{new Date(app.dateApplied).toLocaleDateString()}</td>
                                            <td className="px-6 py-5 bg-slate-50/10 group-hover:bg-blue-50/50 rounded-r-2xl border-y border-r border-slate-100/50 transition-colors text-right">
                                                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                                        'bg-amber-50 text-amber-700 border-amber-100'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                                    <span className="material-symbols-outlined text-[32px]">folder_off</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">No applications yet</p>
                                                    <p className="text-[11px] text-slate-400 font-medium">Newly created scholarships will show applicants here as they apply.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </UniversityLayout>
    );
};

export default ScholarshipAnalytics;
