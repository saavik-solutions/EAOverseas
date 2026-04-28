import React from 'react';
import { useParams } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityDashboard = () => {
    const { universityName } = useParams<{ universityName: string }>();
    
    // Format the name back from slug if needed, but for display we can just capitalize words
    const displayName = universityName 
        ? universityName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "University of Global Excellence";

    const demoUniversities = ['university-of-toronto', 'kings-college-london', 'university-of-melbourne'];
    const isDemo = demoUniversities.includes(universityName || '');

    const stats = [
        { label: 'Total active courses', value: isDemo ? '124' : '0', icon: 'library_books', trend: isDemo ? '+5% this month' : 'No data', trendType: isDemo ? 'up' : 'neutral' },
        { label: 'Active admissions', value: isDemo ? '12' : '0', icon: 'history_edu', trend: isDemo ? '+2% this month' : 'No data', trendType: isDemo ? 'up' : 'neutral' },
        { label: 'Scholarships published', value: isDemo ? '8' : '0', icon: 'award_star', trend: 'No change', trendType: 'neutral' },
        { label: 'Total student interest', value: isDemo ? '1,240' : '0', icon: 'person_search', trend: isDemo ? '+12% this month' : 'No data', trendType: isDemo ? 'up' : 'neutral' },
    ];

    const studentInterest = isDemo ? [
        { name: 'Sarah Jenkins', interest: 'MSc Computer Science', time: '12 mins ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbqN6J7D76Vj15ZyP1A_wEgf2B7o0yUxc1b1ohoeqWzwYxn-YHn2AyT9TgKGwKLAzuhpO_GQHZSvGbBzt6IPRK5zIeNBvhZOquVvBo68Ob9Ix9uzb-ZOoCsqA5qbxhh0HEMjyM3kxgM6N32u3qZmnuQpDiuKtPdIoEC23HGZCHztH_Bj0A_V1tHzSknHqBowgUiiMabctAEAAuSEQmxcNC9f6I8rPeZe27bbl-oRIj2IvBLImw2CFHEHciqpHP4PMZKA7BpkmFEBU' },
        { name: 'Arjun Mehta', interest: 'MBA Global Finance', time: '45 mins ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxTMqpXkbbskYOQ-NyifQOMYdXT-hbTd60Fc_AigSDsDZd7VVbXv2A7s2pur1WqaaEf-oZcJ4cQMaOf8XbowQXS9UbkeZnfMUeS6IFiJIceJ0e1_UlkT_rlTdP4CSRe2jDj1TOlesfK5hfl2Bzs7cyXricTvvZF9SLcxm7ARTZglAvBBhatIewm-GxQ-E_LARiYOigbSk516EOa33EKSnXNmscdzjkoVLw-RGZ2lHAMa07qrazzp044RIIMxQXTUhW3gn4LXsbTnQ' },
        { name: 'Elena Rodriguez', interest: 'BA Graphic Design', time: '2 hours ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBImfIZNIXADvqJcy9nN-v4zSeV5NCyHD19P02RYxN9H9A-M_lrS2d_hzXJE3oKebchLYxkAuj20VN7Of-AFa8gAp6T63l-JHZbcLLwvfqbIFFVBpIwirRPxhFDY7V-0EfVTjSmDmffQSUr2m8son2vsqwL8tGtpEi8hgh1g3BAqc71G8TYh5O5Xq-fTDzWIosjYD_EwAeU7nQmQh2elh_BFsPeYk9Ka5fodTFVBS0mOYi38sbar56Q3DCqClkQ-22vkDCqHDRBIfk' },
        { name: 'David Chen', interest: 'PhD Bio-Engineering', time: '3 hours ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0VQIZAcqRc7nsiVrB_w6-GqMYAEVwFbUqA295IEuiJIA1RZFkMV8x_D47qhjbrWBAJDAjaKAnspc6AmTgL8ukeNgQY3jPDilpeH0Mt2GgPgAa2vl4w_ErRKgUeXPiPUwVj-dx5LAh28C9MI7KuYlEceN7mA-UJhllximtvnxMAI1EzEg6-oNWQnTxtW3WyuYIV7bi9xLREzGgim18GZHB1Wi4EfXaHoKHs6ox9l4jkGcRnn-WxeANpdtTr6GLEMJydD9c50Md9cU' },
    ] : [];

    const deadlines = isDemo ? [
        { month: 'Oct', day: '15', title: 'Fall 2024 Early Bird', detail: 'Undergraduate Programs', status: 'Closing Soon', statusColor: 'bg-red-100 text-red-700' },
        { month: 'Nov', day: '02', title: 'Postgraduate Research Grant', detail: 'All PhD Candidates', status: '18 Days Left', statusColor: 'bg-gray-100 text-gray-600' },
        { month: 'Dec', day: '10', title: 'Spring Intake Final Call', detail: 'Business & Management Faculty', status: 'Active', statusColor: 'bg-gray-100 text-gray-600' },
    ] : [];

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
                        <div key={stat.label} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
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
                        </div>
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
                            {isDemo ? [
                                { label: 'COMPUTER SCIENCE', count: '3,420', percentage: 90 },
                                { label: 'BUSINESS & MBA', count: '2,890', percentage: 75 },
                                { label: 'ENGINEERING', count: '2,100', percentage: 55 },
                                { label: 'MEDICINE & LIFE SCIENCES', count: '1,650', percentage: 45 },
                                { label: 'ARTS & DESIGN', count: '940', percentage: 25 },
                            ].map((item) => (
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
                            {isDemo && <button className="text-[#2b6cee] text-[10px] font-bold hover:underline">Calendar View</button>}
                        </div>
                        <div className="p-1 space-y-0.5">
                            {isDemo ? deadlines.map((deadline) => (
                                <div key={deadline.title} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-all border-b border-slate-50/50 last:border-0">
                                    <div className={`flex flex-col items-center justify-center h-10 w-10 rounded-lg border border-slate-50 ${deadline.month === 'Oct' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                                        <span className="text-[8px] font-black uppercase tracking-widest">{deadline.month}</span>
                                        <span className="text-base font-black leading-none">{deadline.day}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[12px] font-black text-slate-900 leading-tight">{deadline.title}</h4>
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
                        {/* Horizontal Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.03]">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-full h-px bg-black"></div>
                            ))}
                        </div>

                        <div className="absolute inset-0 flex items-end justify-between px-2">
                            {(isDemo ? [
                                35, 45, 50, 40, 65, 45, 55, 75, 40, 60, 50, 70, 45, 55, 65, 
                                40, 75, 55, 65, 50, 45, 85, 40, 60, 55, 75, 45, 65, 50, 80
                            ] : Array(30).fill(5)).map((h, i) => (
                                <div key={i} className="flex flex-col items-center flex-1 group">
                                    <div className="w-[3px] bg-[#2b6cee]/10 h-32 rounded-t-full relative">
                                        <div 
                                            className="absolute bottom-0 left-0 w-full bg-[#2b6cee]/30 rounded-t-full transition-all duration-700"
                                            style={{ height: `${h}%` }}
                                        ></div>
                                        {i === 0 && isDemo && (
                                            <div className="absolute top-[20%] left-[-2px] w-[7px] h-[3px] bg-[#2b6cee] rounded-full"></div>
                                        )}
                                        {i % 7 === 0 && (
                                            <div 
                                                className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black text-slate-400 uppercase tracking-widest"
                                            >
                                                {isDemo ? `Oct ${String(i + 1).padStart(2, '0')}` : '-'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!isDemo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px] rounded-xl">
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Awaiting initial engagement data...</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="h-4"></div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityDashboard;
