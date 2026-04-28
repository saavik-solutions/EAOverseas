import React from 'react';
import { useParams, Link } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityImpressions = () => {
    const { universityName } = useParams<{ universityName: string }>();
    
    const displayName = universityName 
        ? universityName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "University of Toronto";

    const [filter, setFilter] = React.useState('Last 30 Days');

    const demoUniversities = ['university-of-toronto', 'kings-college-london', 'university-of-melbourne'];
    const isDemo = demoUniversities.includes(universityName || '');

    const graphData: Record<string, { val: number, color: string }[]> = {
        'Last 30 Days': isDemo ? [
            { val: 40, color: '#baff6d' }, { val: 50, color: '#9cd661' }, { val: 60, color: '#74c69d' },
            { val: 70, color: '#52b788' }, { val: 80, color: '#40916c' }, { val: 82, color: '#2d6a4f' }
        ] : Array(6).fill({ val: 5, color: '#e2e8f0' }),
        'Last 6 Months': isDemo ? [
            { val: 30, color: '#baff6d' }, { val: 45, color: '#9cd661' }, { val: 55, color: '#74c69d' },
            { val: 68, color: '#52b788' }, { val: 75, color: '#40916c' }, { val: 92, color: '#2d6a4f' }
        ] : Array(6).fill({ val: 5, color: '#e2e8f0' })
    };

    const currentGraphData = graphData[filter] || graphData['Last 30 Days'];

    const impressionStats = [
        { label: 'Today', value: isDemo ? '1,284' : '0', grow: isDemo ? '+12%' : '0%', icon: 'today' },
        { label: 'This Week', value: isDemo ? '8,421' : '0', grow: isDemo ? '+5.4%' : '0%', icon: 'calendar_view_week' },
        { label: 'This Month', value: isDemo ? '48,291' : '0', grow: isDemo ? '+18%' : '0%', icon: 'calendar_month' },
        { label: 'Avg. Daily', value: isDemo ? '1,610' : '0', grow: '0%', icon: 'speed' },
    ];

    const topPerformingCourses = isDemo ? [
        { name: 'MSc Artificial Intelligence', views: '12,482', engagement: '8.2%', trend: 'up' },
        { name: 'MBA Strategy & Leadership', views: '9,102', engagement: '6.4%', trend: 'up' },
        { name: 'BEng Mechanical Engineering', views: '7,421', engagement: '4.1%', trend: 'down' },
        { name: 'BA International Relations', views: '4,291', engagement: '3.8%', trend: 'up' },
    ] : [];

    return (
        <UniversityLayout universityName={displayName} pageTitle="Total Impressions">
            <div className="p-4 md:p-6 max-w-[1400px] mx-auto w-full flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Impression Analytics</h2>
                    <p className="text-slate-400 text-xs font-medium">Detailed breakdown of how students are discovering your programs.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {impressionStats.map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-50 text-[#2b6cee] rounded-2xl group-hover:bg-[#2b6cee] group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                </div>
                                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.grow.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {stat.grow}
                                </span>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
                        </div>
                    ))}
                </div>

                {/* Traffic Overview & Top Courses */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm min-h-[420px] flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Traffic Overview</h3>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> LIVE
                                </span>
                                <select 
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="bg-slate-50 border-none rounded-xl px-3 py-1.5 text-[10px] font-black text-slate-500 outline-none uppercase tracking-widest cursor-pointer hover:bg-slate-100 transition-all"
                                >
                                    <option>Last 30 Days</option>
                                    <option>Last 6 Months</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* 3D Staggered Bar Graph Visualization */}
                        <div className="flex-1 relative flex items-end justify-between px-12 pb-16 pt-12 rounded-[24px] bg-slate-50 border border-slate-100 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50/50"></div>
                            
                            {/* Grid Lines & Labels */}
                            <div className="absolute inset-x-8 inset-y-12 flex flex-col justify-between pointer-events-none">
                                {[900, 800, 700, 600, 500, 400, 300, 200, 100].map((label) => (
                                    <div key={label} className="flex items-center gap-4 w-full">
                                        <span className="text-[8px] font-black text-slate-300 w-6">{label}</span>
                                        <div className="flex-1 h-px bg-slate-100 relative">
                                            {/* Dot on line if needed elsewhere, but following the image's "line to bar" logic */}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 3D Bars */}
                            <div className="relative w-full h-full flex items-end justify-around z-10 gap-2">
                                {currentGraphData.map((bar, i) => (
                                    <div key={i} className="relative flex-1 max-w-[50px] transition-all duration-700 hover:translate-y-[-4px]" style={{ height: `${bar.val}%` }}>
                                        {/* Connecting horizontal line with dot (from axis) */}
                                        <div 
                                            className="absolute -left-[100%] top-0 h-px bg-slate-200 border-t border-dashed border-slate-300" 
                                            style={{ width: `${(i + 1) * 20}%`, left: `-${(i + 1) * 15}px`, zIndex: -1 }}
                                        >
                                            <div className="absolute -left-1 -top-1 size-2 rounded-full" style={{ backgroundColor: bar.color }}></div>
                                        </div>

                                        {/* Main Bar */}
                                        <div 
                                            className="w-full h-full relative z-20 shadow-[-15px_10px_25px_-5px_rgba(0,0,0,0.15)] rounded-t-sm"
                                            style={{ backgroundColor: bar.color }}
                                        >
                                            {/* Top Surface highlight */}
                                            <div className="absolute inset-x-0 top-0 h-0.5 bg-white/20"></div>
                                        </div>

                                        {/* Side Depth (3D effect) */}
                                        <div 
                                            className="absolute left-full top-0 w-[8px] h-full brightness-75 origin-left"
                                            style={{ backgroundColor: bar.color, transform: 'skewY(45deg)' }}
                                        ></div>
                                    </div>
                                ))}
                            </div>

                            {/* Axis Label */}
                            <div className="absolute bottom-6 inset-x-0 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Growth Distribution across programs</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col max-h-[420px]">
                        <h3 className="text-base font-black text-slate-900 mb-4 uppercase tracking-tight">Top Courses</h3>
                        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {isDemo ? [...topPerformingCourses, ...topPerformingCourses].map((course, idx) => (
                                <div key={idx} className="flex flex-col gap-2 p-3.5 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs font-black text-slate-800 line-clamp-1 group-hover:text-[#2b6cee] transition-colors">{course.name}</p>
                                        <span className={`material-symbols-outlined text-[16px] ${course.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {course.trend === 'up' ? 'trending_up' : 'trending_down'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-0.5">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{course.views} Views</span>
                                        <span className="text-[8px] font-black text-[#2b6cee] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/30">{course.engagement} Engagement</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-2">
                                    <span className="material-symbols-outlined text-slate-200 text-5xl">inventory_2</span>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-relaxed">No course performance data available yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {!isDemo && (
                   <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 py-16">
                       <div className="size-16 bg-blue-50 text-[#2b6cee] rounded-2xl flex items-center justify-center mb-2">
                           <span className="material-symbols-outlined text-3xl">analytics</span>
                       </div>
                       <h3 className="text-xl font-black text-slate-900 tracking-tight underline decoration-[#2b6cee]/30 underline-offset-8">Engagement Analytics Coming Soon</h3>
                       <p className="text-slate-400 text-sm max-w-md font-medium">As you list more programs and students start discovering your university profile, we'll start visualizing your impressions trend, geographical reach, and demographic insights right here.</p>
                       <Link to={`/university-panel/${universityName}/courses`} className="mt-4 px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-100">Add Your First Course</Link>
                   </div>
                )}
            </div>
        </UniversityLayout>
    );
};

export default UniversityImpressions;
