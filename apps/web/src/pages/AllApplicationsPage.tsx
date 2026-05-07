import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

// --- Types ---
interface Application {
    name: string;
    id: string;
    uni: string;
    course: string;
    status: 'Approved' | 'Reviewing' | 'Rejected';
    color: 'amber' | 'emerald' | 'rose';
    initials: string;
    country: string;
    submittedDate: string; // ISO date string
    approvedDate: string | null; // null if not yet approved
}

// --- Mock Data (24 entries, identical to Analytics page) ---
const ALL_APPLICATIONS: Application[] = [
    // Approved (13)
    { name: 'Elena Liset', id: '#8288', uni: 'University of Toronto', course: 'MBA Finance', status: 'Approved', color: 'emerald', initials: 'EL', country: 'Canada', submittedDate: '2025-12-10', approvedDate: '2025-12-17' },
    { name: 'Anita Patel', id: '#8292', uni: 'Melbourne University', course: 'MSc Computing', status: 'Approved', color: 'emerald', initials: 'AP', country: 'Australia', submittedDate: '2026-01-04', approvedDate: '2026-01-08' },
    { name: 'Priya Sharma', id: '#8294', uni: 'TUM Munich', course: 'PhD Physics', status: 'Approved', color: 'emerald', initials: 'PS', country: 'Germany', submittedDate: '2026-02-02', approvedDate: '2026-02-12' },
    { name: 'Hana Müller', id: '#8301', uni: 'Oxford University', course: 'MSc AI', status: 'Approved', color: 'emerald', initials: 'HM', country: 'United Kingdom', submittedDate: '2025-12-12', approvedDate: '2025-12-19' },
    { name: 'Ravi Singh', id: '#8302', uni: 'University of Toronto', course: 'MCS Software', status: 'Approved', color: 'emerald', initials: 'RS', country: 'Canada', submittedDate: '2025-12-20', approvedDate: '2025-12-28' },
    { name: 'Mei Lin', id: '#8303', uni: 'TUM Munich', course: 'MSc Data Eng.', status: 'Approved', color: 'emerald', initials: 'ML', country: 'Germany', submittedDate: '2026-01-10', approvedDate: '2026-01-17' },
    { name: 'Samuel Osei', id: '#8304', uni: 'Melbourne University', course: 'MBA Finance', status: 'Approved', color: 'emerald', initials: 'SO', country: 'Australia', submittedDate: '2026-01-22', approvedDate: '2026-01-27' },
    { name: 'Fatima Al-Amin', id: '#8305', uni: 'Oxford University', course: 'LLM Law', status: 'Approved', color: 'emerald', initials: 'FA', country: 'United Kingdom', submittedDate: '2026-01-28', approvedDate: '2026-02-03' },
    { name: 'David Park', id: '#8306', uni: 'University of Toronto', course: 'MEd Education', status: 'Approved', color: 'emerald', initials: 'DP', country: 'Canada', submittedDate: '2026-02-05', approvedDate: '2026-02-10' },
    { name: 'Nadia Benali', id: '#8307', uni: 'TUM Munich', course: 'MSc Mechanical', status: 'Approved', color: 'emerald', initials: 'NB', country: 'Germany', submittedDate: '2026-02-14', approvedDate: '2026-02-20' },
    { name: 'Tom Clarke', id: '#8308', uni: 'Melbourne University', course: 'MSc Nursing', status: 'Approved', color: 'emerald', initials: 'TC', country: 'Australia', submittedDate: '2026-02-18', approvedDate: '2026-02-24' },
    { name: 'Yuki Nakamura', id: '#8309', uni: 'Oxford University', course: 'MSc Economics', status: 'Approved', color: 'emerald', initials: 'YN', country: 'United Kingdom', submittedDate: '2026-02-25', approvedDate: '2026-03-02' },
    { name: 'Sara Perez', id: '#8310', uni: 'University of Toronto', course: 'MPA Public Admin', status: 'Approved', color: 'emerald', initials: 'SP', country: 'Canada', submittedDate: '2026-03-01', approvedDate: null },
    // Reviewing / Pending (7)
    { name: 'Siddharth Kumar', id: '#8291', uni: 'Oxford University', course: 'MSc Data Sci.', status: 'Reviewing', color: 'amber', initials: 'SK', country: 'United Kingdom', submittedDate: '2025-12-05', approvedDate: null },
    { name: 'Carlos Ray', id: '#8293', uni: 'Oxford University', course: 'BA History', status: 'Reviewing', color: 'amber', initials: 'CR', country: 'United Kingdom', submittedDate: '2026-01-15', approvedDate: null },
    { name: 'Aiko Tanaka', id: '#8296', uni: 'University of Toronto', course: 'MSc Finance', status: 'Reviewing', color: 'amber', initials: 'AT', country: 'Canada', submittedDate: '2026-03-01', approvedDate: null },
    { name: 'Leo Bernard', id: '#8311', uni: 'TUM Munich', course: 'MSc Robotics', status: 'Reviewing', color: 'amber', initials: 'LB', country: 'Germany', submittedDate: '2025-12-22', approvedDate: null },
    { name: 'Chloe Martin', id: '#8312', uni: 'Melbourne University', course: 'BSc Psychology', status: 'Reviewing', color: 'amber', initials: 'CM', country: 'Australia', submittedDate: '2026-02-10', approvedDate: null },
    { name: 'Omar Hassan', id: '#8313', uni: 'Oxford University', course: 'MA Philosophy', status: 'Reviewing', color: 'amber', initials: 'OH', country: 'United Kingdom', submittedDate: '2026-02-28', approvedDate: null },
    { name: 'Iris Zhang', id: '#8314', uni: 'University of Toronto', course: 'MEng Civil', status: 'Reviewing', color: 'amber', initials: 'IZ', country: 'Canada', submittedDate: '2026-03-03', approvedDate: null },
    // Rejected (4)
    { name: 'James Miller', id: '#8285', uni: 'TUM Munich', course: 'BE Robotics', status: 'Rejected', color: 'rose', initials: 'JM', country: 'Germany', submittedDate: '2025-12-18', approvedDate: '2025-12-25' },
    { name: 'Lucas Müller', id: '#8295', uni: 'Melbourne University', course: 'MBA Marketing', status: 'Rejected', color: 'rose', initials: 'LM', country: 'Australia', submittedDate: '2026-02-20', approvedDate: '2026-03-02' },
    { name: 'Ben Carter', id: '#8315', uni: 'Oxford University', course: 'BSc Math', status: 'Rejected', color: 'rose', initials: 'BC', country: 'United Kingdom', submittedDate: '2026-01-08', approvedDate: '2026-01-15' },
    { name: 'Kim Yeon', id: '#8316', uni: 'University of Toronto', course: 'MSc Biomed', status: 'Rejected', color: 'rose', initials: 'KY', country: 'Canada', submittedDate: '2026-02-02', approvedDate: '2026-02-09' },
];

// --- Style Maps ---
const STATUS_COLOR: Record<string, { bg: string; text: string; border: string }> = {
    Approved: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    Reviewing: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    Rejected: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
};

const AVATAR_COLOR: Record<string, string> = {
    amber: 'bg-amber-500/10 text-amber-600',
    emerald: 'bg-emerald-500/10 text-emerald-600',
    rose: 'bg-rose-500/10 text-rose-600',
};

const COUNTRIES = ['All Countries', ...Array.from(new Set(ALL_APPLICATIONS.map(a => a.country))).sort()];

// --- Helpers ---
const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getDaysDiff = (from: string, to: string) => {
    const a = new Date(from).getTime();
    const b = new Date(to).getTime();
    return Math.round((b - a) / (1000 * 60 * 60 * 24));
};

const getProcessingTime = (app: Application): string => {
    if (app.status === 'Reviewing') return '⏳ Pending';
    if (app.approvedDate) {
        const days = getDaysDiff(app.submittedDate, app.approvedDate);
        return `${days} day${days !== 1 ? 's' : ''}`;
    }
    return '—';
};

const getProcessingColor = (app: Application): string => {
    if (app.status === 'Reviewing') return 'text-amber-500';
    if (!app.approvedDate) return 'text-slate-400';
    const days = getDaysDiff(app.submittedDate, app.approvedDate);
    if (days <= 5) return 'text-emerald-600';
    if (days <= 10) return 'text-amber-600';
    return 'text-rose-600';
};

// --- Component ---
const AllApplicationsPage: React.FC = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [countryFilter, setCountryFilter] = useState('All Countries');
    const [dateFrom, setDateFrom] = useState('');

    const filtered = useMemo(() =>
        ALL_APPLICATIONS.filter(app => {
            const matchSearch = app.name.toLowerCase().includes(search.toLowerCase()) || app.uni.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFilter === 'All' || app.status === statusFilter;
            const matchCountry = countryFilter === 'All Countries' || app.country === countryFilter;
            const submittedAt = new Date(app.submittedDate).getTime();
            const matchFrom = !dateFrom || submittedAt >= new Date(dateFrom).getTime();
            return matchSearch && matchStatus && matchCountry && matchFrom;
        }),
        [search, statusFilter, countryFilter, dateFrom]);

    return (
        <SuperAdminLayout title="All Applications">
            <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-4">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-slate-500 text-xl">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">All Applications</h1>
                        <p className="text-xs text-slate-500 mt-0.5">Complete list of all student applications</p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-wrap items-center gap-3">

                    {/* Search */}
                    <div className="flex items-center gap-2 flex-1 min-w-[180px] px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
                        <input
                            type="text"
                            placeholder="Search by name or university..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent text-xs outline-none w-full text-slate-700 placeholder-slate-400"
                        />
                    </div>

                    {/* Country Filter */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-[#2b6cee]/20">
                        <span className="material-symbols-outlined text-slate-400 text-sm">public</span>
                        <select
                            value={countryFilter}
                            onChange={(e) => setCountryFilter(e.target.value)}
                            className="bg-transparent text-xs font-medium border-none focus:ring-0 cursor-pointer outline-none text-slate-700"
                        >
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Date From */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-[#2b6cee]/20">
                        <span className="material-symbols-outlined text-slate-400 text-sm">calendar_today</span>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            title="From date"
                            className="bg-transparent text-xs font-medium border-none focus:ring-0 cursor-pointer outline-none text-slate-700"
                        />
                    </div>

                    {/* Clear Date */}
                    {dateFrom && (
                        <button
                            onClick={() => setDateFrom('')}
                            className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                            Clear
                        </button>
                    )}

                    {/* Status Buttons */}
                    <div className="flex gap-1.5 ml-auto flex-wrap">
                        {['All', 'Approved', 'Reviewing', 'Rejected'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s
                                    ? 'bg-[#2b6cee] text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                        <span className="px-3 py-1.5 text-xs text-slate-500 font-medium">
                            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[780px]">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">University</th>
                                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Country</th>
                                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted On</th>
                                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing Time</th>
                                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.length > 0 ? filtered.map((app, i) => {
                                    const sc = STATUS_COLOR[app.status] ?? STATUS_COLOR['Reviewing'];
                                    const ac = AVATAR_COLOR[app.color] ?? AVATAR_COLOR['amber'];
                                    return (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            {/* Student */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full ${ac} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                                                        {app.initials}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 leading-none">{app.name}</p>
                                                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide">ID: {app.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* University */}
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-semibold text-slate-800">{app.uni}</p>
                                                <p className="text-[11px] text-slate-500 mt-0.5">{app.course}</p>
                                            </td>
                                            {/* Country */}
                                            <td className="px-5 py-4 text-sm text-slate-600">{app.country}</td>
                                            {/* Submitted On */}
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-medium text-slate-700">{formatDate(app.submittedDate)}</p>
                                            </td>
                                            {/* Processing Time */}
                                            <td className="px-5 py-4">
                                                <span className={`text-sm font-semibold ${getProcessingColor(app)}`}>
                                                    {getProcessingTime(app)}
                                                </span>
                                            </td>
                                            {/* Status */}
                                            <td className="px-5 py-4 text-right">
                                                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${sc.bg} ${sc.text} ${sc.border}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-500">
                                            No applications match your filters.
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

export default AllApplicationsPage;
