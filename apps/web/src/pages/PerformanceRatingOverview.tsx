import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

const PerformanceRatingOverview = () => {
    const [activeFilter, setActiveFilter] = useState('30d');

    const dataByFilter = {
        '30d': {
            avgRating: 4.8,
            reviewCount: 186,
            distribution: [
                { label: '5 star', percent: 74, color: 'bg-blue-600' },
                { label: '4 star', percent: 18, color: 'bg-blue-500' },
                { label: '3 star', percent: 5, color: 'bg-blue-400' },
                { label: '2 star', percent: 2, color: 'bg-blue-300' },
                { label: '1 star', percent: 1, color: 'bg-blue-200' }
            ],
            trend: [
                { label: 'W1', height: '60%' },
                { label: 'W2', height: '72%' },
                { label: 'W3', height: '68%' },
                { label: 'W4', height: '85%' },
                { label: 'W5', height: '90%' },
                { label: 'W6', height: '96%' }
            ],
            growth: '+0.3 Growth'
        },
        '3m': {
            avgRating: 4.7,
            reviewCount: 542,
            distribution: [
                { label: '5 star', percent: 68, color: 'bg-blue-600' },
                { label: '4 star', percent: 22, color: 'bg-blue-500' },
                { label: '3 star', percent: 6, color: 'bg-blue-400' },
                { label: '2 star', percent: 3, color: 'bg-blue-300' },
                { label: '1 star', percent: 1, color: 'bg-blue-200' }
            ],
            trend: [
                { label: 'DEC', height: '55%' },
                { label: 'JAN', height: '65%' },
                { label: 'FEB', height: '78%' },
                { label: 'MAR', height: '82%' },
                { label: 'APR', height: '88%' },
                { label: 'MAY', height: '92%' }
            ],
            growth: '+1.2 Growth'
        },
        '1y': {
            avgRating: 4.9,
            reviewCount: 1240,
            distribution: [
                { label: '5 star', percent: 82, color: 'bg-blue-600' },
                { label: '4 star', percent: 12, color: 'bg-blue-500' },
                { label: '3 star', percent: 4, color: 'bg-blue-400' },
                { label: '2 star', percent: 1, color: 'bg-blue-300' },
                { label: '1 star', percent: 1, color: 'bg-blue-200' }
            ],
            trend: [
                { label: '2023 Q1', height: '40%' },
                { label: '2023 Q2', height: '55%' },
                { label: '2023 Q3', height: '70%' },
                { label: '2023 Q4', height: '85%' },
                { label: '2024 Q1', height: '92%' },
                { label: '2024 Q2', height: '98%' }
            ],
            growth: '+2.5 Growth'
        }
    };

    const currentData = dataByFilter[activeFilter as keyof typeof dataByFilter];

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f5f7f8]">
            <PageHeader title="Performance & Rating Overview" />

            <main className="flex-1 overflow-y-auto p-4 lg:p-10 no-scrollbar">
                <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-8">

                    {/* Page Header & Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-slate-900 text-3xl font-extrabold tracking-tight">Performance & Rating Overview</h1>
                            <p className="text-slate-500 text-base">Track your performance based on verified student feedback and case outcomes.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                                <button
                                    onClick={() => setActiveFilter('30d')}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeFilter === '30d' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    Last 30 days
                                </button>
                                <button
                                    onClick={() => setActiveFilter('3m')}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeFilter === '3m' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}
                                >
                                    3 Months
                                </button>
                                <button
                                    onClick={() => setActiveFilter('1y')}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeFilter === '1y' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}
                                >
                                    1 Year
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                <span>Export Report</span>
                            </button>
                        </div>
                    </div>

                    {/* Overall Rating Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-slide-up">
                        <div className="lg:col-span-12 xl:col-span-5 bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                            <div className="relative size-48 flex items-center justify-center rounded-full mb-6"
                                style={{ background: `conic-gradient(#0d6cf2 ${currentData.avgRating * 20}%, #e5e7eb 0)` }}>
                                <div className="size-40 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                                    <span className="text-4xl font-black text-slate-900">{currentData.avgRating}</span>
                                    <span className="text-slate-400 text-sm font-medium">out of 5</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-center text-yellow-500">
                                    <span className="material-symbols-outlined icon-filled">star</span>
                                    <span className="material-symbols-outlined icon-filled">star</span>
                                    <span className="material-symbols-outlined icon-filled">star</span>
                                    <span className="material-symbols-outlined icon-filled">star</span>
                                    <span className="material-symbols-outlined icon-filled">star_half</span>
                                </div>
                                <p className="text-slate-600 font-medium">Based on {currentData.reviewCount} Verified Student Reviews</p>
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
                                        <span className="material-symbols-outlined text-[16px]">military_tech</span> Top Rated Counsellor
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                                        <span className="material-symbols-outlined text-[16px]">verified_user</span> Visa Success Specialist
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Rating Distribution */}
                        <div className="lg:col-span-12 xl:col-span-7 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-slate-900 text-lg font-bold mb-6">Rating Distribution</h3>
                            <div className="flex flex-col gap-5">
                                {currentData.distribution.map((item) => (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <span className="w-12 text-sm font-bold text-slate-600">{item.label}</span>
                                        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.percent}%` }}></div>
                                        </div>
                                        <span className="w-10 text-sm text-slate-400 text-right">{item.percent}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Trend and Skill-Based Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        {/* Performance Trend */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-slate-900 text-lg font-bold">Performance Trend</h3>
                                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                                    <span className="material-symbols-outlined text-[18px]">trending_up</span>
                                    <span>{currentData.growth}</span>
                                </div>
                            </div>
                            <div className="h-[220px] w-full flex items-end justify-between gap-2 px-2 border-b border-slate-100">
                                {currentData.trend.map((bar, idx) => (
                                    <div key={idx} className="flex-1 bg-blue-50 rounded-t-md relative group transition-all duration-700" style={{ height: bar.height }}>
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-600 group-hover:h-full transition-all duration-300 rounded-t-md opacity-20"></div>
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-600 z-10 transition-all duration-700"></div>
                                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase">{bar.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 text-center">
                                <p className="text-xs text-slate-400 font-medium italic">Monthly overall performance rating aggregated across all categories</p>
                            </div>
                        </div>

                        {/* Skill-Based Rating */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-slate-900 text-lg font-bold mb-8">Skill-Based Rating</h3>
                            <div className="flex flex-col gap-6">
                                {[
                                    { label: 'Communication', score: '4.9/5', width: '98%' },
                                    { label: 'Clarity of Guidance', score: '4.7/5', width: '94%' },
                                    { label: 'Visa Support', score: '4.8/5', width: '96%' },
                                    { label: 'Application Support', score: '4.6/5', width: '92%' },
                                    { label: 'Professionalism', score: '5.0/5', width: '100%' }
                                ].map((skill) => (
                                    <div key={skill.label} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-bold text-slate-700">{skill.label}</span>
                                            <span className="text-blue-600 font-black">{skill.score}</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-600 rounded-full" style={{ width: skill.width }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Feedback Section */}
                    <div className="flex flex-col gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="flex justify-between items-center">
                            <h3 className="text-slate-900 text-lg font-bold">Recent Student Feedback</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-500">Sort by:</span>
                                <select className="bg-transparent text-sm font-bold text-blue-600 focus:outline-none cursor-pointer">
                                    <option>Most Recent</option>
                                    <option>Highest Rating</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { name: 'Arjun Nair', uni: 'University of Manchester', initials: 'AN', text: 'Exceptional guidance throughout my visa process. My counsellor was always available to answer my tiny doubts.', time: '2 days ago' },
                                { name: 'Sarah Peters', uni: 'University of Melbourne', initials: 'SP', text: 'The application support was incredibly detailed. They helped me refine my SOP which I believe was key.', time: '1 week ago' },
                                { name: 'Rohan Kapoor', uni: 'Arizona State University', initials: 'RK', text: 'Very professional and clear guidance. The response time was a bit slow on weekends but seamless overall.', time: '10 days ago' }
                            ].map((review, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 hover:border-blue-200 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">{review.initials}</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{review.name}</p>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{review.uni}</p>
                                            </div>
                                        </div>
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="material-symbols-outlined text-[16px] icon-filled">star</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed italic line-clamp-3">"{review.text}"</p>
                                    <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                                        <span className="text-[10px] text-slate-400 font-medium italic">{review.time}</span>
                                        <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded font-bold uppercase border border-green-100">Verified Review</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PerformanceRatingOverview;
