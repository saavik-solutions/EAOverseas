import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import { useParams, useNavigate } from 'react-router-dom';

const SuperAdminConsultantRatings: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState<'30days' | '3months' | '1year'>('30days');
    const [consultant, setConsultant] = useState<any>(null);

    // Mock data mapping for default consultants
    const ratingsData: Record<string, any> = {
        'liam-smith': {
            name: 'Liam Smith',
            overallRating: 4.8,
            totalReviews: 186,
            distribution: [74, 18, 5, 2, 1],
            performanceTrend: [40, 55, 45, 65, 75, 85],
            skills: { communication: 4.9, clarity: 4.7, visa: 4.8, application: 4.6, professionalism: 5.0 },
            feedbacks: [
                { name: 'Arjun Nair', uni: 'University of Manchester', rating: 5, text: 'Exceptional guidance throughout my visa process. My counsellor was always available to answer my tiny doubts.', date: '2 days ago' },
                { name: 'Sarah Peters', uni: 'University of Melbourne', rating: 5, text: 'The application support was incredibly detailed. They helped me refine my SOP which I believe was key.', date: '1 week ago' },
                { name: 'Rohan Kapoor', uni: 'Arizona State University', rating: 5, text: 'Very professional and clear guidance. The response time was a bit slow on weekends but seamless overall.', date: '10 days ago' }
            ]
        },
        'sarah-jenkins': {
            name: 'Sarah Jenkins',
            overallRating: 4.9,
            totalReviews: 310,
            distribution: [82, 12, 4, 1, 1],
            performanceTrend: [60, 70, 75, 80, 85, 90],
            skills: { communication: 5.0, clarity: 4.9, visa: 4.7, application: 5.0, professionalism: 4.9 },
            feedbacks: [
                { name: 'Meera Shah', uni: 'LSE', rating: 5, text: 'Sarah knows exactly which universities fit your profile. Highly recommended for elite schools.', date: '3 days ago' },
                { name: 'Kevin Brown', uni: 'UBC', rating: 5, text: 'Flawless admission process. Every document was triple checked.', date: '1 week ago' }
            ]
        }
    };

    useEffect(() => {
        // 1. Get from LocalStorage
        const saved = localStorage.getItem('eao_consultants');
        const list = saved ? JSON.parse(saved) : [];
        const found = list.find((c: any) => (c.id || c.name.replace(/\s+/g, '-').toLowerCase()) === id);

        if (found) {
            // FORCE 0 rating if no reviews exist for this member
            if (found.totalReviews === 0 || found.reviews === 0 || found.rating === 0 || found.rating === '5' || !found.rating) {
                // If the user sees 5, it's a dirty record. We force it to 0.
                setConsultant({
                    name: found.name,
                    overallRating: 0,
                    totalReviews: 0,
                    distribution: [0, 0, 0, 0, 0],
                    performanceTrend: [0, 0, 0, 0, 0, 0],
                    skills: { communication: 0, clarity: 0, visa: 0, application: 0, professionalism: 0 },
                    feedbacks: []
                });
            } else {
                const mock = ratingsData[id || ''] || ratingsData['liam-smith'];
                setConsultant({
                    ...mock,
                    name: found.name,
                    overallRating: found.rating
                });
            }
        } else {
            setConsultant(ratingsData[id || ''] || ratingsData['liam-smith']);
        }
    }, [id]);

    if (!consultant) return null;

    const isNew = consultant.overallRating === 0;

    const getAdjustedData = () => {
        if (timeRange === '30days') return consultant;
        if (timeRange === '3months') {
            return {
                ...consultant,
                totalReviews: Math.floor(consultant.totalReviews * 2.5),
                performanceTrend: consultant.performanceTrend.map((h: number) => h > 0 ? Math.min(100, Math.floor(h * 1.2)) : 0)
            };
        }
        return {
            ...consultant,
            totalReviews: Math.floor(consultant.totalReviews * 8.2),
            performanceTrend: consultant.performanceTrend.map((h: number) => h > 0 ? Math.min(100, Math.floor(h * 1.5)) : 0)
        };
    };

    const currentData = getAdjustedData();

    return (
        <SuperAdminLayout title="Performance & Rating Overview">
            <div className="p-8 flex flex-col gap-8 max-w-[1400px] mx-auto w-full">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Performance & Rating Overview</h2>
                        <p className="text-sm text-slate-500 font-medium mt-2">Track {currentData.name}'s performance based on verified student feedback.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 shadow-inner border border-slate-200/50">
                            <button onClick={() => setTimeRange('30days')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${timeRange === '30days' ? 'bg-white shadow-md text-[#2b6cee]' : 'text-slate-500 hover:text-slate-700'}`}>Last 30 days</button>
                            <button onClick={() => setTimeRange('3months')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${timeRange === '3months' ? 'bg-white shadow-md text-[#2b6cee]' : 'text-slate-500 hover:text-slate-700'}`}>3 Months</button>
                            <button onClick={() => setTimeRange('1year')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${timeRange === '1year' ? 'bg-white shadow-md text-[#2b6cee]' : 'text-slate-500 hover:text-slate-700'}`}>1 Year</button>
                        </div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg hover:bg-slate-800 transition-all font-inter"
                        >
                            Back to Profile
                        </button>
                    </div>
                </div>

                {/* Top Grid: Circular Rating & Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Overall Rating Card */}
                    <div className="bg-white rounded-[40px] border border-slate-100 p-12 shadow-sm flex flex-col items-center">
                        <div className="relative size-64 flex items-center justify-center">
                            <svg className="size-full -rotate-90">
                                <circle cx="128" cy="128" r="110" fill="transparent" stroke="#f1f5f9" strokeWidth="24" />
                                {/* Blue line is ONLY drawn if overallRating > 0 */}
                                {!isNew && (
                                    <circle 
                                        cx="128" cy="128" r="110" fill="transparent" stroke="#2b6cee" strokeWidth="24" strokeLinecap="round" 
                                        strokeDasharray="691" strokeDashoffset={691 - (691 * (currentData.overallRating || 0) / 5)} 
                                        className="transition-all duration-1000 ease-out" 
                                    />
                                )}
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className={`text-6xl font-black leading-none tracking-tight ${!isNew ? 'text-slate-900' : 'text-slate-300'}`}>{currentData.overallRating}</span>
                                <span className="text-xs text-slate-400 font-black mt-3 uppercase tracking-[0.2em]">out of 5</span>
                            </div>
                        </div>
                        <div className="mt-10 flex flex-col items-center gap-5">
                            <div className="flex items-center gap-1.5">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <span key={s} className={`material-symbols-outlined text-3xl ${s <= Math.floor(currentData.overallRating) && !isNew ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`}>star</span>
                                ))}
                            </div>
                            <p className="text-sm font-black text-slate-600">Based on {currentData.totalReviews} Verified Student Reviews</p>
                        </div>
                    </div>

                    {/* Distribution Card */}
                    <div className="bg-white rounded-[40px] border border-slate-100 p-12 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">Rating Distribution</h3>
                        <div className="flex flex-col gap-7">
                            {currentData.distribution.map((perc: number, i: number) => (
                                <div key={i} className="flex items-center gap-5">
                                    <span className="text-xs font-black text-slate-500 w-12 whitespace-nowrap">{5 - i} star</span>
                                    <div className="flex-1 h-3.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${!isNew ? 'bg-[#2b6cee]' : 'bg-slate-100'}`} style={{ width: `${perc}%` }}></div>
                                    </div>
                                    <span className="text-xs font-black text-slate-400 w-10 text-right">{perc}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Performance Trend and Skill Based Section (identical to previous but with !isNew checks) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3 bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Performance Trend</h3>
                            {!isNew ? (
                                <div className="flex items-center gap-2.5 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                                    <span className="material-symbols-outlined text-[20px] text-emerald-500 font-black">trending_up</span>
                                    <span className="text-xs font-black text-emerald-600">+0.3 Growth</span>
                                </div>
                            ) : (
                                <div className="bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 uppercase text-[9px] font-black tracking-widest text-slate-400">New Member</div>
                            )}
                        </div>
                        <div className="flex items-end justify-between h-56 gap-5 px-6">
                            {currentData.performanceTrend.map((h: number, i: number) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-5 group/bar">
                                    <div className={`w-full rounded-2xl relative overflow-hidden transition-all border border-slate-100 ${!isNew ? 'bg-slate-50' : 'bg-slate-25'}`} style={{ height: `${Math.max(h, 4)}%` }}>
                                        {!isNew && h > 0 && <div className="absolute bottom-0 w-full bg-[#2b6cee] h-2 opacity-80"></div>}
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">W{i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                        <h3 className="text-xl font-black text-slate-900 mb-12 tracking-tight">Skill-Based Rating</h3>
                        <div className="flex flex-col gap-9">
                            {Object.entries(currentData.skills).map(([skill, value]: [string, any]) => (
                                <div key={skill} className="flex flex-col gap-3.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-black text-slate-800 capitalize tracking-tight">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <div className="flex items-center gap-1">
                                            <span className={`text-sm font-black leading-none ${!isNew ? 'text-[#2b6cee]' : 'text-slate-300'}`}>{value}</span>
                                            <span className="text-[10px] text-slate-300 font-black">/5</span>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${!isNew ? 'bg-[#2b6cee]' : 'bg-slate-100'}`} style={{ width: `${(value / 5) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feedback section ... empty state ... */}
                <div className="mt-4">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-10">Recent Student Feedback</h3>
                    {!isNew && currentData.feedbacks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feedbacks ... */}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[40px] border-2 border-dashed border-slate-100 p-20 flex flex-col items-center justify-center gap-4 opacity-60 text-center">
                            <span className="material-symbols-outlined text-6xl text-slate-200">rate_review</span>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No feedbacks assigned to this new member</p>
                        </div>
                    )}
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminConsultantRatings;
