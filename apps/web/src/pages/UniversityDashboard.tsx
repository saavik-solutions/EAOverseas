import React from 'react';
import { useParams } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityDashboard = () => {
    const { universityName } = useParams<{ universityName: string }>();
    
    // Format the name back from slug if needed, but for display we can just capitalize words
    const displayName = universityName 
        ? universityName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "University of Global Excellence";

    const stats = [
        { label: 'Total active courses', value: '124', icon: 'library_books', trend: '+5% this month', trendType: 'up' },
        { label: 'Active admissions', value: '12', icon: 'history_edu', trend: '+2% this month', trendType: 'up' },
        { label: 'Scholarships published', value: '8', icon: 'award_star', trend: 'No change', trendType: 'neutral' },
        { label: 'Total student interest', value: '1,240', icon: 'person_search', trend: '+12% this month', trendType: 'up' },
    ];

    const studentInterest = [
        { name: 'Sarah Jenkins', interest: 'MSc Computer Science', time: '12 mins ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbqN6J7D76Vj15ZyP1A_wEgf2B7o0yUxc1b1ohoeqWzwYxn-YHn2AyT9TgKGwKLAzuhpO_GQHZSvGbBzt6IPRK5zIeNBvhZOquVvBo68Ob9Ix9uzb-ZOoCsqA5qbxhh0HEMjyM3kxgM6N32u3qZmnuQpDiuKtPdIoEC23HGZCHztH_Bj0A_V1tHzSknHqBowgUiiMabctAEAAuSEQmxcNC9f6I8rPeZe27bbl-oRIj2IvBLImw2CFHEHciqpHP4PMZKA7BpkmFEBU' },
        { name: 'Arjun Mehta', interest: 'MBA Global Finance', time: '45 mins ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxTMqpXkbbskYOQ-NyifQOMYdXT-hbTd60Fc_AigSDsDZd7VVbXv2A7s2pur1WqaaEf-oZcJ4cQMaOf8XbowQXS9UbkeZnfMUeS6IFiJIceJ0e1_UlkT_rlTdP4CSRe2jDj1TOlesfK5hfl2Bzs7cyXricTvvZF9SLcxm7ARTZglAvBBhatIewm-GxQ-E_LARiYOigbSk516EOa33EKSnXNmscdzjkoVLw-RGZ2lHAMa07qrazzp044RIIMxQXTUhW3gn4LXsbTnQ' },
        { name: 'Elena Rodriguez', interest: 'BA Graphic Design', time: '2 hours ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBImfIZNIXADvqJcy9nN-v4zSeV5NCyHD19P02RYxN9H9A-M_lrS2d_hzXJE3oKebchLYxkAuj20VN7Of-AFa8gAp6T63l-JHZbcLLwvfqbIFFVBpIwirRPxhFDY7V-0EfVTjSmDmffQSUr2m8son2vsqwL8tGtpEi8hgh1g3BAqc71G8TYh5O5Xq-fTDzWIosjYD_EwAeU7nQmQh2elh_BFsPeYk9Ka5fodTFVBS0mOYi38sbar56Q3DCqClkQ-22vkDCqHDRBIfk' },
        { name: 'David Chen', interest: 'PhD Bio-Engineering', time: '3 hours ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0VQIZAcqRc7nsiVrB_w6-GqMYAEVwFbUqA295IEuiJIA1RZFkMV8x_D47qhjbrWBAJDAjaKAnspc6AmTgL8ukeNgQY3jPDilpeH0Mt2GgPgAa2vl4w_ErRKgUeXPiPUwVj-dx5LAh28C9MI7KuYlEceN7mA-UJhllximtvnxMAI1EzEg6-oNWQnTxtW3WyuYIV7bi9xLREzGgim18GZHB1Wi4EfXaHoKHs6ox9l4jkGcRnn-WxeANpdtTr6GLEMJydD9c50Md9cU' },
    ];

    const deadlines = [
        { month: 'Oct', day: '15', title: 'Fall 2024 Early Bird', detail: 'Undergraduate Programs', status: 'Closing Soon', statusColor: 'bg-red-100 text-red-700' },
        { month: 'Nov', day: '02', title: 'Postgraduate Research Grant', detail: 'All PhD Candidates', status: '18 Days Left', statusColor: 'bg-gray-100 text-gray-600' },
        { month: 'Dec', day: '10', title: 'Spring Intake Final Call', detail: 'Business & Management Faculty', status: 'Active', statusColor: 'bg-gray-100 text-gray-600' },
    ];

    return (
        <UniversityLayout universityName={displayName}>
            <div className="p-4 md:p-8 max-w-[1280px] mx-auto w-full flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">University Overview</h1>
                        <p className="text-slate-500 text-xs md:text-sm font-medium mt-1">Manage your active listings and track student engagement.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#2b6cee] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-blue-700 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            Post New Course
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#2b6cee] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-blue-700 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-[18px]">assignment</span>
                            Post Admission
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#2b6cee] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-blue-700 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-[18px]">card_membership</span>
                            Post Scholarship
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{stat.label}</p>
                                <span className="material-symbols-outlined text-[#2b6cee] bg-[#2b6cee]/10 p-2 rounded-xl text-[20px]">{stat.icon}</span>
                            </div>
                            <p className="text-slate-900 text-3xl font-black leading-none">{stat.value}</p>
                            <div className={`flex items-center gap-1 mt-3 text-sm font-bold ${stat.trendType === 'up' ? 'text-[#07883b]' : 'text-slate-500'}`}>
                                <span className="material-symbols-outlined text-[16px]">{stat.trendType === 'up' ? 'trending_up' : 'horizontal_rule'}</span>
                                <span>{stat.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Activity & Deadlines */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Student Interest */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-base font-black text-slate-900">New student interest today</h3>
                            <button className="text-[#2b6cee] text-xs font-bold hover:underline">View All</button>
                        </div>
                        <div className="p-2 space-y-1">
                            {studentInterest.map((student) => (
                                <div key={student.name} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all group">
                                    <div className="h-10 w-10 rounded-full bg-cover bg-center border border-slate-100" style={{ backgroundImage: `url(${student.image})` }}></div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black text-slate-900">{student.name}</h4>
                                        <p className="text-[11px] text-slate-500 font-medium tracking-tight">Interested in: <span className="text-slate-700 font-bold">{student.interest}</span></p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap uppercase tracking-wider">{student.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-base font-black text-slate-900">Upcoming admission deadlines</h3>
                            <button className="text-[#2b6cee] text-xs font-bold hover:underline">Calendar View</button>
                        </div>
                        <div className="p-2 space-y-1">
                            {deadlines.map((deadline) => (
                                <div key={deadline.title} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-all border-b border-slate-50 last:border-0">
                                    <div className={`flex flex-col items-center justify-center h-12 w-12 rounded-xl border border-slate-100 ${deadline.month === 'Oct' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                                        <span className="text-[10px] font-black uppercase tracking-widest">{deadline.month}</span>
                                        <span className="text-lg font-black leading-none">{deadline.day}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black text-slate-900">{deadline.title}</h4>
                                        <p className="text-[11px] text-slate-500 font-medium">{deadline.detail}</p>
                                    </div>
                                    <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] rounded-lg ${deadline.statusColor}`}>
                                        {deadline.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trends Section */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col gap-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-lg font-black text-slate-900">Student Interest Trends</h3>
                            <p className="text-xs text-slate-400 font-medium">Daily profile views and application inquiries</p>
                        </div>
                        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                            <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider bg-white shadow-sm rounded-lg text-slate-900">Last 7 Days</button>
                            <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-600">Last 30 Days</button>
                        </div>
                    </div>
                    
                    <div className="h-48 w-full flex items-end gap-1.5 md:gap-3 px-2">
                        {[40, 60, 35, 85, 55, 70, 45, 65, 50, 95, 75, 60].map((h, i) => (
                            <div 
                                key={i} 
                                className={`flex-1 rounded-t-xl transition-all duration-500 hover:scale-x-105 cursor-pointer ${i === 3 || i === 9 ? 'bg-[#2b6cee] shadow-lg shadow-[#2b6cee]/20' : 'bg-[#2b6cee]/20 hover:bg-[#2b6cee]/40'}`} 
                                style={{ height: `${h}%` }}
                            ></div>
                        ))}
                    </div>
                    
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-6">
                        <span>Oct 01</span>
                        <span className="hidden md:inline">Oct 04</span>
                        <span>Oct 07</span>
                        <span className="hidden md:inline">Oct 10</span>
                        <span>Oct 13</span>
                    </div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityDashboard;
