import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

// Mock Data — 24 entries: Approved(55%) > Pending(30%) > Rejected(15%)
const INITIAL_APPLICATIONS = [
    // Approved (13)
    { name: 'Elena Liset', id: '#8288', uni: 'University of Toronto', course: 'MBA Finance', status: 'Approved', color: 'emerald', initials: 'EL', country: 'Canada', date: '2025-12-10' },
    { name: 'Anita Patel', id: '#8292', uni: 'Melbourne University', course: 'MSc Computing', status: 'Approved', color: 'emerald', initials: 'AP', country: 'Australia', date: '2026-01-04' },
    { name: 'Priya Sharma', id: '#8294', uni: 'TUM Munich', course: 'PhD Physics', status: 'Approved', color: 'emerald', initials: 'PS', country: 'Germany', date: '2026-02-02' },
    { name: 'Hana Müller', id: '#8301', uni: 'Oxford University', course: 'MSc AI', status: 'Approved', color: 'emerald', initials: 'HM', country: 'United Kingdom', date: '2025-12-12' },
    { name: 'Ravi Singh', id: '#8302', uni: 'University of Toronto', course: 'MCS Software', status: 'Approved', color: 'emerald', initials: 'RS', country: 'Canada', date: '2025-12-20' },
    { name: 'Mei Lin', id: '#8303', uni: 'TUM Munich', course: 'MSc Data Eng.', status: 'Approved', color: 'emerald', initials: 'ML', country: 'Germany', date: '2026-01-10' },
    { name: 'Samuel Osei', id: '#8304', uni: 'Melbourne University', course: 'MBA Finance', status: 'Approved', color: 'emerald', initials: 'SO', country: 'Australia', date: '2026-01-22' },
    { name: 'Fatima Al-Amin', id: '#8305', uni: 'Oxford University', course: 'LLM Law', status: 'Approved', color: 'emerald', initials: 'FA', country: 'United Kingdom', date: '2026-01-28' },
    { name: 'David Park', id: '#8306', uni: 'University of Toronto', course: 'MEd Education', status: 'Approved', color: 'emerald', initials: 'DP', country: 'Canada', date: '2026-02-05' },
    { name: 'Nadia Benali', id: '#8307', uni: 'TUM Munich', course: 'MSc Mechanical', status: 'Approved', color: 'emerald', initials: 'NB', country: 'Germany', date: '2026-02-14' },
    { name: 'Tom Clarke', id: '#8308', uni: 'Melbourne University', course: 'MSc Nursing', status: 'Approved', color: 'emerald', initials: 'TC', country: 'Australia', date: '2026-02-18' },
    { name: 'Yuki Nakamura', id: '#8309', uni: 'Oxford University', course: 'MSc Economics', status: 'Approved', color: 'emerald', initials: 'YN', country: 'United Kingdom', date: '2026-02-25' },
    { name: 'Sara Perez', id: '#8310', uni: 'University of Toronto', course: 'MPA Public Admin', status: 'Approved', color: 'emerald', initials: 'SP', country: 'Canada', date: '2026-03-01' },
    // Pending / Reviewing (7)
    { name: 'Siddharth Kumar', id: '#8291', uni: 'Oxford University', course: 'MSc Data Sci.', status: 'Reviewing', color: 'amber', initials: 'SK', country: 'United Kingdom', date: '2025-12-05' },
    { name: 'Carlos Ray', id: '#8293', uni: 'Oxford University', course: 'BA History', status: 'Reviewing', color: 'amber', initials: 'CR', country: 'United Kingdom', date: '2026-01-15' },
    { name: 'Aiko Tanaka', id: '#8296', uni: 'University of Toronto', course: 'MSc Finance', status: 'Reviewing', color: 'amber', initials: 'AT', country: 'Canada', date: '2026-03-01' },
    { name: 'Leo Bernard', id: '#8311', uni: 'TUM Munich', course: 'MSc Robotics', status: 'Reviewing', color: 'amber', initials: 'LB', country: 'Germany', date: '2025-12-22' },
    { name: 'Chloe Martin', id: '#8312', uni: 'Melbourne University', course: 'BSc Psychology', status: 'Reviewing', color: 'amber', initials: 'CM', country: 'Australia', date: '2026-02-10' },
    { name: 'Omar Hassan', id: '#8313', uni: 'Oxford University', course: 'MA Philosophy', status: 'Reviewing', color: 'amber', initials: 'OH', country: 'United Kingdom', date: '2026-02-28' },
    { name: 'Iris Zhang', id: '#8314', uni: 'University of Toronto', course: 'MEng Civil', status: 'Reviewing', color: 'amber', initials: 'IZ', country: 'Canada', date: '2026-03-03' },
    // Rejected (4)
    { name: 'James Miller', id: '#8285', uni: 'TUM Munich', course: 'BE Robotics', status: 'Rejected', color: 'rose', initials: 'JM', country: 'Germany', date: '2025-12-18' },
    { name: 'Lucas Müller', id: '#8295', uni: 'Melbourne University', course: 'MBA Marketing', status: 'Rejected', color: 'rose', initials: 'LM', country: 'Australia', date: '2026-02-20' },
    { name: 'Ben Carter', id: '#8315', uni: 'Oxford University', course: 'BSc Math', status: 'Rejected', color: 'rose', initials: 'BC', country: 'United Kingdom', date: '2026-01-08' },
    { name: 'Kim Yeon', id: '#8316', uni: 'University of Toronto', course: 'MSc Biomed', status: 'Rejected', color: 'rose', initials: 'KY', country: 'Canada', date: '2026-02-02' },
];

const ApplicationsAnalyticsPage = () => {
    const navigate = useNavigate();
    const [filterCountry, setFilterCountry] = useState('All Regions');
    const [filterUniversity, setFilterUniversity] = useState('All Universities');
    const [filterStatus, setFilterStatus] = useState('Any Status');
    const [filterDate, setFilterDate] = useState('Last 30 Days');

    // --- Date cutoff — today is 2026-03-05 ---
    const DATE_CUTOFF = useMemo(() => {
        const today = new Date('2026-03-05');
        if (filterDate === 'Last 30 Days') { const d = new Date(today); d.setDate(d.getDate() - 30); return d; }
        // This Quarter = Q1 2026 (Jan–Mar) | This Year = Jan 1 2026
        return new Date('2026-01-01');
    }, [filterDate]);

    // Base dataset scoped by date — drives ALL KPI totals and donut
    const dateScopedApps = useMemo(() =>
        INITIAL_APPLICATIONS.filter(app => new Date(app.date) >= DATE_CUTOFF),
        [DATE_CUTOFF]
    );

    // Full filter: date + country + university + status
    const filteredApplications = useMemo(() =>
        dateScopedApps.filter(app => {
            const matchCountry = filterCountry === 'All Regions' || app.country === filterCountry;
            const matchUni = filterUniversity === 'All Universities' || app.uni === filterUniversity;
            const matchStatus = filterStatus === 'Any Status' || app.status === filterStatus;
            return matchCountry && matchUni && matchStatus;
        }),
        [dateScopedApps, filterCountry, filterUniversity, filterStatus]
    );

    // KPI Calculations — scoped to date filter (drives total, donut, and rates)
    const totalApps = dateScopedApps.length;
    const allApproved = dateScopedApps.filter(a => a.status === 'Approved').length;
    const allPending = dateScopedApps.filter(a => a.status === 'Reviewing').length;
    const allRejected = dateScopedApps.filter(a => a.status === 'Rejected').length;
    const donutCircumference = 301;
    const pendingApps = filteredApplications.filter(a => a.status === 'Reviewing').length;
    const approvalRate = totalApps > 0 ? Math.round((allApproved / totalApps) * 100) : 0;
    const pendingRate = totalApps > 0 ? Math.round((allPending / totalApps) * 100) : 0;
    const rejectedRate = totalApps > 0 ? Math.round((allRejected / totalApps) * 100) : 0;


    // Middle KPI card — changes dynamically with status filter
    const midKpi = (() => {
        if (filterStatus === 'Reviewing') return { label: 'Pending Rate', value: `${pendingRate}%`, icon: 'schedule', iconBg: 'bg-amber-50', iconColor: 'text-amber-500' };
        if (filterStatus === 'Rejected') return { label: 'Rejection Rate', value: `${rejectedRate}%`, icon: 'cancel', iconBg: 'bg-rose-50', iconColor: 'text-rose-500' };
        return { label: 'Approval Rate', value: `${approvalRate}%`, icon: 'check_circle', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' };
    })();

    // Chart path changes per date period to show different growth trends
    const chartPath = filterDate === 'Last 30 Days'
        ? 'M0,150 Q100,80 200,120 T400,60 T600,100 T800,40'
        : filterDate === 'This Quarter'
            ? 'M0,170 Q80,130 200,90 T400,70 T600,45 T800,25'
            : 'M0,180 Q120,150 240,120 T440,80 T660,45 T800,20';
    const chartFill = `${chartPath} L800,200 L0,200 Z`;
    // Derived top universities
    const uniCounts = filteredApplications.reduce((acc, app) => {
        acc[app.uni] = (acc[app.uni] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Sort and format for UI
    const topUniversities = Object.entries(uniCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 4)
        .map(([name, count], index) => {
            const sampleApp = INITIAL_APPLICATIONS.find(a => a.uni === name);
            return {
                rank: String(index + 1).padStart(2, '0'),
                name,
                country: sampleApp?.country || 'Unknown',
                apps: count
            }
        });

    return (
        <SuperAdminLayout title="Applications Analytics">
            <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-4">
                {/* Header & Filters */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Applications This Month</h1>
                            <p className="text-xs text-slate-500 mt-1">Real-time overview of global application trends and processing metrics.</p>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-200 focus-within:ring-2 focus-within:ring-[#2b6cee]/20">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Country:</span>
                            <select
                                value={filterCountry}
                                onChange={(e) => setFilterCountry(e.target.value)}
                                className="bg-transparent text-xs font-medium border-none focus:ring-0 cursor-pointer outline-none min-w-[100px] text-slate-700 py-1"
                            >
                                <option value="All Regions">All Regions</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Canada">Canada</option>
                                <option value="Germany">Germany</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-200 focus-within:ring-2 focus-within:ring-[#2b6cee]/20">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">University:</span>
                            <select
                                value={filterUniversity}
                                onChange={(e) => setFilterUniversity(e.target.value)}
                                className="bg-transparent text-xs font-medium border-none focus:ring-0 cursor-pointer outline-none min-w-[120px] text-slate-700 py-1"
                            >
                                <option value="All Universities">All Universities</option>
                                <option value="Oxford University">Oxford University</option>
                                <option value="University of Toronto">University of Toronto</option>
                                <option value="TUM Munich">TUM Munich</option>
                                <option value="Melbourne University">Melbourne University</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-200 focus-within:ring-2 focus-within:ring-[#2b6cee]/20">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Status:</span>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="bg-transparent text-xs font-medium border-none focus:ring-0 cursor-pointer outline-none min-w-[90px] text-slate-700 py-1"
                            >
                                <option value="Any Status">Any Status</option>
                                <option value="Approved">Approved</option>
                                <option value="Reviewing">Reviewing</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-200 focus-within:ring-2 focus-within:ring-[#2b6cee]/20 ml-auto">
                            <span className="material-symbols-outlined text-slate-400 text-sm">calendar_today</span>
                            <select
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="bg-transparent text-xs font-medium border-none focus:ring-0 cursor-pointer outline-none min-w-[100px] text-slate-700 py-1"
                            >
                                <option value="Last 30 Days">Last 30 Days</option>
                                <option value="This Quarter">This Quarter</option>
                                <option value="This Year">This Year</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        onClick={() => navigate('/Superadmin/applications/all')}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-1.5 bg-blue-50 rounded-md text-[#2b6cee]">
                                <span className="material-symbols-outlined text-sm">folder_open</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-sm group-hover:text-[#2b6cee] transition-colors">chevron_right</span>
                        </div>
                        <p className="text-slate-500 text-xs font-medium">Total Applications</p>
                        <h3 className="text-2xl font-black mt-0.5">{totalApps}</h3>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div className={`p-1.5 ${midKpi.iconBg} rounded-md ${midKpi.iconColor}`}>
                                <span className="material-symbols-outlined text-sm">{midKpi.icon}</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-xs font-medium">{midKpi.label}</p>
                        <h3 className="text-2xl font-black mt-0.5">{midKpi.value}</h3>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-1.5 bg-amber-50 rounded-md text-amber-500">
                                <span className="material-symbols-outlined text-sm">pending_actions</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-xs font-medium">Pending Review</p>
                        <h3 className="text-2xl font-black mt-0.5">{pendingApps}</h3>
                    </div>
                </div>

                {/* Middle Section: Main Chart & Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Daily Trends Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold">
                                    {filterDate === 'Last 30 Days' ? 'Monthly' : filterDate === 'This Quarter' ? 'Quarterly' : 'Yearly'} Application Breakdown
                                </h3>
                                <p className="text-[10px] text-slate-500">Daily submission volume</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#2b6cee]"></span>
                                    <span className="text-[10px] font-semibold text-slate-500">Current</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-48 w-full">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                                <defs>
                                    <linearGradient id="chartGradient2" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#2b6cee" stopOpacity="0.2"></stop>
                                        <stop offset="100%" stopColor="#2b6cee" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d={chartFill} fill="url(#chartGradient2)"></path>
                                <path d={chartPath} fill="none" stroke="#2b6cee" strokeLinecap="round" strokeWidth="2"></path>
                            </svg>
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] font-bold text-slate-400 px-2 mt-2 uppercase">
                                <span>Day 1</span><span>Day 7</span><span>Day 14</span><span>Day 21</span><span>Day 30</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Distribution */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col items-center">
                        <div className="w-full text-left mb-4">
                            <h3 className="text-sm font-bold">Status Distribution</h3>
                        </div>
                        <div className="relative h-36 flex items-center justify-center">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                                {/* Background track */}
                                <circle cx="60" cy="60" r="48" fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                                {/* Approved arc (blue) — largest */}
                                <circle cx="60" cy="60" r="48" fill="transparent" stroke="#2b6cee"
                                    strokeWidth="10"
                                    strokeDasharray={`${donutCircumference * allApproved / totalApps} ${donutCircumference}`}
                                    strokeDashoffset="0"
                                />
                                {/* Pending arc (amber) — middle, offset after approved */}
                                <circle cx="60" cy="60" r="48" fill="transparent" stroke="#f59e0b"
                                    strokeWidth="10"
                                    strokeDasharray={`${donutCircumference * allPending / totalApps} ${donutCircumference}`}
                                    strokeDashoffset={`-${donutCircumference * allApproved / totalApps}`}
                                />
                                {/* Rejected arc (rose) — smallest */}
                                <circle cx="60" cy="60" r="48" fill="transparent" stroke="#f43f5e"
                                    strokeWidth="10"
                                    strokeDasharray={`${donutCircumference * allRejected / totalApps} ${donutCircumference}`}
                                    strokeDashoffset={`-${donutCircumference * (allApproved + allPending) / totalApps}`}
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-xl font-black">{totalApps}</span>
                                <span className="text-[8px] uppercase font-bold text-slate-400">Total</span>
                            </div>
                        </div>
                        <div className="mt-4 w-full space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#2b6cee]"></span>
                                    <span className="text-xs font-medium">Approved</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-400">{Math.round(allApproved / totalApps * 100)}%</span>
                                    <span className="text-xs font-bold w-6 text-right">{allApproved}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                                    <span className="text-xs font-medium">Pending</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-400">{Math.round(allPending / totalApps * 100)}%</span>
                                    <span className="text-xs font-bold w-6 text-right">{allPending}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                                    <span className="text-xs font-medium">Rejected</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-400">{Math.round(allRejected / totalApps * 100)}%</span>
                                    <span className="text-xs font-bold w-6 text-right">{allRejected}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default ApplicationsAnalyticsPage;

