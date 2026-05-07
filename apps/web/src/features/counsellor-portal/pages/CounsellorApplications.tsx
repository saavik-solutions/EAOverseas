import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsultantLayout from '@/layouts/ConsultantLayout';
const CounsellorApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const loadApplications = () => {
            const savedApps = localStorage.getItem('student_applications');
            if (savedApps) {
                setApplications(JSON.parse(savedApps).reverse()); // Newest first
            }
        };
        loadApplications();
        // Listen for storage changes in other tabs
        window.addEventListener('storage', loadApplications);
        return () => window.removeEventListener('storage', loadApplications);
    }, []);

    const filteredApps = applications.filter(app => 
        filter === 'All' ? true : app.status === filter
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Declined': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-8 shrink-0">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-gray-900">Student Applications</h1>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Universities & Courses Queue</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                        <input 
                            type="text" 
                            placeholder="Search applications..." 
                            className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none w-64 transition-all"
                        />
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Filters */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {['All', 'Pending', 'Accepted', 'Declined'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                        filter === f 
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Showing {filteredApps.length} applications</p>
                    </div>

                    {/* Applications Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Application Type</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Institution / Course</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredApps.length > 0 ? (
                                        filteredApps.map((app) => (
                                            <tr key={app.id} className="hover:bg-blue-50/10 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                                            {app.studentName.charAt(0)}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-gray-900 leading-none">{app.studentName}</span>
                                                            <span className="text-xs text-gray-500 mt-1">{app.studentEmail}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                                                        app.type === 'Course' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                                    }`}>
                                                        {app.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col max-w-[200px]">
                                                        <span className="text-sm font-bold text-gray-900 truncate">{app.universityName}</span>
                                                        <span className="text-xs text-gray-500 truncate mt-0.5">{app.courseName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-600 font-medium">{app.submissionDate}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button 
                                                        onClick={() => navigate(`/counsellor/applications/${app.id}`)}
                                                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center gap-3 opacity-30">
                                                    <span className="material-symbols-outlined text-6xl">inbox</span>
                                                    <p className="text-lg font-bold">No applications received yet</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </main>
        </div>
    );
};

export default CounsellorApplications;
