import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import UniversityLayout from '../layouts/UniversityLayout';
import { universityService, UniversityData } from '../services/universityService';

const UniversityAdmissions = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const navigate = useNavigate();
    const [currentUni, setCurrentUni] = useState<UniversityData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedIntake, setSelectedIntake] = useState('Fall 2024');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const handleDownload = () => {
        const headers = ['Program', 'Level', 'Intake', 'Deadline', 'Status', 'Interests'];
        const csvContent = [
            headers.join(','),
            ...filteredAdmissions.map(adm => [
                `"${adm.program}"`,
                `"${adm.level}"`,
                `"${adm.intake}"`,
                `"${adm.deadline}"`,
                `"${adm.status}"`,
                adm.count
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `admissions_data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const fetchUni = async () => {
            try {
                const data = await universityService.getAll();
                const matchedUni = (data.universities || []).find((u: any) => 
                    u.name.toLowerCase().replace(/\s+/g, '-') === universityName
                );
                setCurrentUni(matchedUni || null);
            } catch (err) {
                console.error('Failed to resolve university', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUni();
    }, [universityName]);

    const stats = [
        { label: 'Active Cycles', value: '12', icon: 'event_available', color: 'bg-blue-50 text-blue-600', trend: '+2 this month', trendUp: true },
        { label: 'Total Interests', value: '2.4k', icon: 'group', color: 'bg-purple-50 text-purple-600', trend: '14% growth', trendUp: true },
        { label: 'Next Deadline', value: 'Oct 15, 2023', icon: 'timer', color: 'bg-rose-50 text-rose-600', trend: '4 days remaining', isError: true },
        { label: 'Avg. Conversion', value: '34%', icon: 'bolt', color: 'bg-amber-50 text-amber-600', trend: 'vs 31% institutional avg', trendUp: null },
    ];

    const admissions = [
        { program: 'B.Sc. Civil Engineering', level: 'Undergraduate • 4 Years', intake: 'Fall 2024', deadline: 'Oct 15, 2023', type: 'Priority Deadline', status: 'Accepting', count: 842, progress: 75, icon: 'engineering', iconColor: 'bg-blue-600/10 text-blue-600' },
        { program: 'M.A. Clinical Psychology', level: 'Postgraduate • 2 Years', intake: 'Fall 2024', deadline: 'Nov 30, 2023', type: 'Standard Deadline', status: 'Accepting', count: 312, progress: 50, icon: 'psychology', iconColor: 'bg-purple-600/10 text-purple-600' },
        { program: 'MBA Global Management', level: 'Professional • 18 Months', intake: 'Spring 2025', deadline: 'Jan 10, 2024', type: 'Early Bird', status: 'Pending', count: 1540, progress: 100, icon: 'business_center', iconColor: 'bg-amber-600/10 text-amber-600' },
        { program: 'B.S. Computer Science', level: 'Undergraduate • 4 Years', intake: 'Fall 2023', deadline: 'Aug 30, 2023', type: 'Passed', status: 'Closed', count: 2104, progress: 100, icon: 'code', iconColor: 'bg-slate-200 text-slate-400' },
        { program: 'B.Sc. Mechanical Engineering', level: 'Undergraduate • 4 Years', intake: 'Fall 2024', deadline: 'Oct 30, 2023', type: 'Priority Deadline', status: 'Accepting', count: 567, progress: 60, icon: 'precision_manufacturing', iconColor: 'bg-orange-600/10 text-orange-600' },
        { program: 'M.Sc. Data Science', level: 'Postgraduate • 2 Years', intake: 'Spring 2025', deadline: 'Dec 15, 2023', type: 'Standard Deadline', status: 'Pending', count: 1240, progress: 85, icon: 'analytics', iconColor: 'bg-indigo-600/10 text-indigo-600' },
        { program: 'B.A. International Relations', level: 'Undergraduate • 3 Years', intake: 'Fall 2024', deadline: 'Nov 15, 2023', type: 'Early Action', status: 'Accepting', count: 420, progress: 40, icon: 'public', iconColor: 'bg-teal-600/10 text-teal-600' },
        { program: 'M.S. Software Systems', level: 'Postgraduate • 2 Years', intake: 'Fall 2024', deadline: 'Dec 01, 2023', type: 'Standard Deadline', status: 'Accepting', count: 890, progress: 65, icon: 'terminal', iconColor: 'bg-emerald-600/10 text-emerald-600' },
    ];

    const filteredAdmissions = admissions.filter(adm => {
        const intakeMatch = selectedIntake === 'All Intakes' || adm.intake === selectedIntake;
        const statusMatch = selectedStatus === 'All Status' || adm.status === selectedStatus;
        return intakeMatch && statusMatch;
    });

    return (
        <UniversityLayout universityName={currentUni?.name || 'University'} pageTitle="Admissions Management">
            <div className="flex-1 bg-slate-50 min-h-screen">
                <div className="max-w-[1440px] mx-auto space-y-6 p-8 !pt-4">
                    {/* Main Table Container */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm relative z-0">
                        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-8">
                                <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">Active Admissions</h3>
                                <div className="flex gap-2">
                                    {['All Intakes', 'Fall 2024', 'Spring 2025'].map((intake) => (
                                        <button 
                                            key={intake}
                                            onClick={() => setSelectedIntake(intake)}
                                            className={`text-[9px] uppercase font-black tracking-widest px-3 py-1 rounded-full transition-all ${
                                                selectedIntake === intake 
                                                    ? 'bg-[#2b6cee] text-white shadow-md shadow-blue-500/20' 
                                                    : 'bg-white border border-slate-200 text-slate-500 hover:border-[#2b6cee]'
                                            }`}
                                        >
                                            {intake}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 relative">
                                <div className="relative">
                                    <button 
                                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                        className={`p-2 transition-colors rounded-lg ${showStatusDropdown || selectedStatus !== 'All Status' ? 'text-[#2b6cee] bg-blue-50' : 'text-slate-400 hover:text-slate-600'}`}
                                        title="Status Filter"
                                    >
                                        <span className="material-symbols-outlined text-[22px]">{selectedStatus !== 'All Status' ? 'filter_alt' : 'filter_list'}</span>
                                    </button>

                                    {showStatusDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-[60]" onClick={() => setShowStatusDropdown(false)}></div>
                                            <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[70] py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div className="px-5 py-2 border-b border-slate-50 mb-2">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter by Status</p>
                                                </div>
                                                <div className="px-2 space-y-1">
                                                    {['All Status', 'Accepting', 'Pending', 'Closed'].map((status) => (
                                                        <button
                                                            key={status}
                                                            onClick={() => {
                                                                setSelectedStatus(status);
                                                                setShowStatusDropdown(false);
                                                            }}
                                                            className={`w-full text-left px-4 py-3 text-[13px] font-black rounded-xl transition-all flex items-center justify-between ${
                                                                selectedStatus === status 
                                                                    ? 'bg-[#2b6cee] text-white shadow-lg shadow-blue-500/20' 
                                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                            }`}
                                                        >
                                                            {status}
                                                            {selectedStatus === status ? (
                                                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                            ) : (
                                                                <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-40 transition-opacity">radio_button_unchecked</span>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <button 
                                    onClick={handleDownload}
                                    className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
                                    title="Download CSV"
                                >
                                    <span className="material-symbols-outlined text-[22px]">download</span>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto whitespace-nowrap">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-slate-400 font-black uppercase tracking-[0.1em] text-[10px] border-b border-slate-100">
                                        <th className="px-8 py-4">Admission Cycle / Program</th>
                                        <th className="px-8 py-4 text-center">Intake Period</th>
                                        <th className="px-8 py-4">Deadline</th>
                                        <th className="px-8 py-4 text-center">Status</th>
                                        <th className="px-8 py-4 text-center">Interests</th>
                                        <th className="px-8 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredAdmissions.map((adm, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`size-12 rounded-2xl ${adm.iconColor} flex items-center justify-center shadow-sm`}>
                                                        <span className="material-symbols-outlined text-[24px]">{adm.icon}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-sm">{adm.program}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{adm.level}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="text-xs font-black text-slate-700">{adm.intake}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div>
                                                    <p className="text-xs font-black text-slate-700">{adm.deadline}</p>
                                                    <p className={`text-[9px] font-black uppercase tracking-tighter mt-1 ${adm.type === 'Passed' ? 'text-slate-400' : 'text-rose-500'}`}>{adm.type}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                    adm.status === 'Accepting' ? 'bg-emerald-100 text-emerald-700' :
                                                    adm.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-slate-100 text-slate-500'
                                                }`}>{adm.status}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-sm font-black text-slate-900">{adm.count.toLocaleString()}</span>
                                                    <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                                        <div 
                                                            className={`h-full transition-all duration-1000 ${
                                                                adm.iconColor.includes('blue') ? 'bg-[#2b6cee]' : adm.iconColor.includes('purple') ? 'bg-purple-500' : adm.iconColor.includes('amber') ? 'bg-amber-500' : adm.iconColor.includes('orange') ? 'bg-orange-500' : 'bg-slate-300'
                                                            }`} 
                                                            style={{ width: `${adm.progress}%` }} 
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="size-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:text-[#2b6cee] hover:border-[#2b6cee] shadow-sm">
                                                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-8 py-5 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-xs font-bold text-slate-500 italic">Showing <span className="text-slate-900 font-black">{filteredAdmissions.length}</span> of <span className="text-slate-900 font-black">{admissions.length}</span> cycles matching filters</p>
                            <div className="flex items-center gap-3">
                                <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50" disabled><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3].map(p => (
                                        <button key={p} className={`size-8 rounded-lg text-xs font-black transition-all ${p === 1 ? 'bg-[#2b6cee] text-white shadow-lg shadow-blue-500/20' : 'bg-white border border-slate-200 text-slate-500 hover:border-[#2b6cee]'}`}>{p}</button>
                                    ))}
                                    <span className="px-1 text-slate-400 font-black self-end text-xs">...</span>
                                    <button className="size-8 rounded-lg bg-white border border-slate-200 text-slate-500 font-black text-xs">12</button>
                                </div>
                                <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityAdmissions;
