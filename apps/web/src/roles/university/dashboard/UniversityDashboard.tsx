import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityDashboard = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const [stats, setStats] = useState<any[]>([]);
    const [deadlines, setDeadlines] = useState<any[]>([]);
    const [interestsByCategory, setInterestsByCategory] = useState<any[]>([]);

    const universityRegistry: Record<string, any> = {
        'university-of-toronto': {
            impressions: '48,291',
            leads: '3,102',
            conversion: '6.4%',
             courses: [
                { id: 1, name: 'MSc Artificial Intelligence & Data Science', level: 'Postgraduate', intakes: ['Sept 2024'], deadlines: ['Oct 15'], interest: '1,248', status: 'Active', category: 'COMPUTER SCIENCE' },
                { id: 2, name: 'BEng Mechanical Engineering', level: 'Undergraduate', intakes: ['Sept 2024'], deadlines: ['Aug 01'], interest: '856', status: 'Active', category: 'ENGINEERING' },
                { id: 3, name: 'BA International Relations', level: 'Undergraduate', intakes: ['Jan 2024'], deadlines: ['Dec 10'], interest: '231', status: 'Closed', category: 'ARTS & DESIGN' }
            ],
            scholarships: 8
        },
        'kings-college-london': {
            impressions: '35,102',
            leads: '1,421',
            conversion: '5.8%',
            courses: [
                { id: 1, name: 'Global Health MSc', level: 'Postgraduate', intakes: ['Sept 2024'], deadlines: ['Jun 30'], interest: '942', status: 'Active', category: 'MEDICINE & LIFE SCIENCES' },
                { id: 2, name: 'Law LLB', level: 'Undergraduate', intakes: ['Sept 2024'], deadlines: ['Jun 15'], interest: '2,104', status: 'Active', category: 'LAW' },
                { id: 3, name: 'Business Management BSc', level: 'Undergraduate', intakes: ['Jan 2025'], deadlines: ['Nov 30'], interest: '1,562', status: 'Active', category: 'BUSINESS & MBA' }
            ],
            scholarships: 5
        },
        'university-of-melbourne': {
            impressions: '22,481',
            leads: '642',
            conversion: '3.9%',
            courses: [
                { id: 1, name: 'Master of Data Science', level: 'Postgraduate', intakes: ['July 2024'], deadlines: ['May 15'], interest: '512', status: 'Active', category: 'COMPUTER SCIENCE' },
                { id: 2, name: 'Bachelor of Commerce', level: 'Undergraduate', intakes: ['Feb 2024'], deadlines: ['Jan 31'], interest: '842', status: 'Active', category: 'BUSINESS & MBA' }
            ],
            scholarships: 3
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('ea_universities');
        const allUnis = saved ? JSON.parse(saved) : [];
        const found = allUnis.find((u: any) => 
            u.id === Number(universityName) || 
            u.name.toLowerCase().replace(/\s+/g, '-') === universityName
        );

        let activeCourses = [];
        let scholarshipsCount = 0;

        if (found) {
            activeCourses = found.courses || [];
            scholarshipsCount = Array.isArray(found.scholarships) ? found.scholarships.length : (found.scholarships || 0);
        } else {
            const registryData = universityRegistry[universityName || ''] || { courses: [], impressions: '0', scholarships: 0 };
            activeCourses = registryData.courses;
            scholarshipsCount = registryData.scholarships;
        }

        // Compute Stats
        const totalInterest = activeCourses.reduce((acc: number, c: any) => acc + parseInt(String(c.interest || '0').replace(/,/g, '')), 0);
        const admissionCount = activeCourses.filter((c: any) => c.status === 'Active').reduce((acc: number, c: any) => acc + (c.intakes?.length || 0), 0);

        setStats([
            { label: 'Total active courses', value: activeCourses.length.toString(), icon: 'library_books', trend: '+5% this month', trendType: 'up', link: `/university-panel/${universityName}/total-courses` },
            { label: 'Active admissions', value: admissionCount.toString(), icon: 'history_edu', trend: '+2% this month', trendType: 'up', link: `/university-panel/${universityName}/admissions` },
            { label: 'Scholarships published', value: scholarshipsCount.toString(), icon: 'award_star', trend: 'No change', trendType: 'neutral', link: `/university-panel/${universityName}/scholarships` },
            { label: 'Total student interest', value: totalInterest.toLocaleString(), icon: 'person_search', trend: '+12% this month', trendType: 'up' },
        ]);

        // Compute Categories
        const cats: Record<string, number> = {};
        activeCourses.forEach((c: any) => {
            const cat = (c.category || 'GENERAL').toUpperCase();
            cats[cat] = (cats[cat] || 0) + parseInt(String(c.interest || '0').replace(/,/g, ''));
        });
        
        const sortedCats = Object.entries(cats)
            .map(([label, count]) => ({ 
                label, 
                count: count.toLocaleString(), 
                percentage: Math.min(100, Math.round((count / (totalInterest || 1)) * 100)) 
            }))
            .sort((a, b) => parseInt(b.count.replace(/,/g, '')) - parseInt(a.count.replace(/,/g, '')))
            .slice(0, 5);
        
        setInterestsByCategory(sortedCats);

        // Compute Deadlines
        const dls = activeCourses
            .filter((c: any) => c.status === 'Active' && c.deadlines?.length > 0)
            .map((c: any) => ({
                month: String(c.deadlines[0]).split(' ')[0],
                day: String(c.deadlines[0]).split(' ')[1] || '01',
                title: c.name,
                detail: c.level,
                status: 'Active',
                statusColor: 'bg-emerald-50 text-emerald-700'
            }))
            .slice(0, 3);
        
        setDeadlines(dls);

    }, [universityName]);

    const displayName = universityName 
        ? universityName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "University of Global Excellence";

    return (
        <UniversityLayout universityName={displayName}>
            <div className="p-3 md:p-5 max-w-[1400px] mx-auto w-full flex flex-col gap-5">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-lg md:text-xl font-black tracking-tight text-slate-900 leading-tight">University Overview</h1>
                        <p className="text-slate-400 text-[10px] md:text-xs font-medium mt-0.5">Manage your active listings and track student engagement.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {stats.slice(0, 3).map((stat) => (
                        <Link 
                            key={stat.label} 
                            to={stat.link || '#'} 
                            className={`bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all flex flex-col justify-between ${stat.link ? 'hover:shadow-md hover:border-blue-100 cursor-pointer' : ''}`}
                        >
                            <div className="flex justify-between items-start">
                                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{stat.label}</p>
                                <span className="material-symbols-outlined text-[#2b6cee] bg-[#2b6cee]/5 p-1.5 rounded-lg text-[18px]">{stat.icon}</span>
                            </div>
                            <div className="mt-2">
                                <p className="text-slate-900 text-2xl font-black leading-none">{stat.value}</p>
                                <div className={`flex items-center gap-1 mt-1 text-[10px] font-bold ${stat.trendType === 'up' ? 'text-[#07883b]' : 'text-slate-400'}`}>
                                    <span className="material-symbols-outlined text-[14px]">{stat.trendType === 'up' ? 'trending_up' : 'horizontal_rule'}</span>
                                    <span>{stat.trend}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Activity & Deadlines */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Interest by Course Category */}
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-sm font-black text-slate-900">Interest by Course Category</h3>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            {interestsByCategory.length > 0 ? interestsByCategory.map((item) => (
                                <div key={item.label} className="flex flex-col gap-1.5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                                        <span className="text-[10px] font-black text-slate-900">{item.count}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-[#2b6cee] rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                                    <span className="material-symbols-outlined text-slate-200 text-4xl mb-2">bar_chart_off</span>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No interest data yet</p>
                                    <p className="text-[10px] text-slate-300 mt-1">Data will appear once students start engaging with your courses.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-sm font-black text-slate-900">Upcoming admission deadlines</h3>
                            <button className="text-[#2b6cee] text-[10px] font-bold hover:underline">Calendar View</button>
                        </div>
                        <div className="p-1 space-y-0.5">
                            {deadlines.length > 0 ? deadlines.map((deadline, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-all border-b border-slate-50/50 last:border-0">
                                    <div className="flex flex-col items-center justify-center h-10 w-10 rounded-lg border border-slate-50 bg-blue-50 text-blue-600">
                                        <span className="text-[8px] font-black uppercase tracking-widest">{deadline.month}</span>
                                        <span className="text-base font-black leading-none">{deadline.day}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[12px] font-black text-slate-900 leading-tight truncate">{deadline.title}</h4>
                                        <p className="text-[10px] text-slate-400 font-medium">{deadline.detail}</p>
                                    </div>
                                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-md ${deadline.statusColor}`}>
                                        {deadline.status}
                                    </span>
                                </div>
                            )) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                                    <span className="material-symbols-outlined text-slate-200 text-4xl mb-2">event_busy</span>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No active deadlines</p>
                                    <p className="text-[10px] text-slate-300 mt-1">Configure intake dates in the Courses section to see them here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Trends Section */}
                <div className="bg-white p-5 md:p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-black text-slate-900">Student Engagement Trend</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="size-2 rounded-full bg-[#2b6cee]"></div>
                                <span className="text-[10px] font-bold text-slate-400">Profile Views</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="size-2 rounded-full bg-[#2b6cee]/30"></div>
                                <span className="text-[10px] font-bold text-slate-400">Inquiries</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative h-48 w-full mt-2">
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.03]">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-full h-px bg-black"></div>
                            ))}
                        </div>

                        <div className="absolute inset-0 flex items-end justify-between px-2">
                            {[35, 45, 50, 40, 65, 45, 55, 75, 40, 60, 50, 70, 45, 55, 65, 40, 75, 55, 65, 50, 45, 85, 40, 60, 55, 75, 45, 65, 50, 80].map((h, i) => (
                                <div key={i} className="flex flex-col items-center flex-1 group">
                                    <div className="w-[3px] bg-[#2b6cee]/10 h-32 rounded-t-full relative">
                                        <div 
                                            className="absolute bottom-0 left-0 w-full bg-[#2b6cee]/30 rounded-t-full transition-all duration-700"
                                            style={{ height: `${h}%` }}
                                        ></div>
                                        {i % 7 === 0 && (
                                            <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                                Oct {String(i + 1).padStart(2, '0')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-4"></div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityDashboard;
