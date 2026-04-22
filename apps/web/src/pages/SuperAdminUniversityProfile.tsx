import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

const SuperAdminUniversityProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data based on the ID (matching the universities in the management page)
    const universities = [
        {
            id: 1,
            name: 'University of Toronto',
            country: 'Canada',
            location: 'Toronto, Canada',
            joined: 'Oct 2021',
            website: 'utoronto.ca',
            status: 'Active',
            stats: { posts: '1,284', opportunities: '156', reach: '24.5k', score: '98/100' },
            about: 'The University of Toronto is a public research university in Toronto, Ontario, Canada, situated on the grounds that surround Queens Park. It was founded by royal charter in 1827 as Kings College, the first institution of higher learning in Upper Canada.',
            type: 'Public Research',
            accreditation: 'UU Accredited'
        },
        {
            id: 6,
            name: 'Harvard University',
            country: 'USA',
            location: 'Cambridge, USA',
            joined: 'Jan 2020',
            website: 'harvard.edu',
            status: 'Active',
            stats: { posts: '3,450', opportunities: '420', reach: '85k', score: '99/100' },
            about: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636 and named for its first benefactor, clergyman John Harvard, it is the oldest institution of higher learning in the United States.',
            type: 'Private Ivy League',
            accreditation: 'NECHE Accredited'
        }
    ];

    const uni = universities.find(u => u.id === Number(id)) || universities[0];

    return (
        <SuperAdminLayout title="University Profile">
            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                {/* Merged Header & About Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <div className="p-6 border-b border-slate-50">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex items-start gap-5">
                                <div className="h-20 w-20 rounded-2xl bg-[#2b6cee]/10 p-3.5 border border-[#2b6cee]/20 flex items-center justify-center text-[#2b6cee] shrink-0">
                                    <span className="material-symbols-outlined text-3xl">{uni.name.charAt(0)}</span>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-2xl font-bold text-slate-900">{uni.name}</h1>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${uni.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            uni.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                            }`}>
                                            {uni.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-sm">
                                        <span className="flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-[20px]">location_on</span> {uni.location}</span>
                                        <span className="flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-[20px]">calendar_today</span> Joined {uni.joined}</span>
                                        <span className="flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-[20px]">link</span> {uni.website}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <button className="px-5 py-2.5 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold rounded-xl transition-all text-sm border border-slate-200">
                                    Edit Profile
                                </button>
                                <button className="px-5 py-2.5 bg-[#2b6cee] text-white hover:bg-[#2b6cee]/90 font-bold rounded-xl transition-all text-sm flex items-center gap-2 shadow-md shadow-[#2b6cee]/20">
                                    <span className="material-symbols-outlined text-[20px]">add_box</span>
                                    Create Post
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-50">
                            <div className="flex items-center justify-start mb-3">
                                <h3 className="font-bold text-slate-900">About University</h3>
                            </div>
                            <p className="text-slate-700 leading-relaxed max-w-4xl text-[15px] font-medium font-['Outfit']">
                                {uni.about}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4">
                                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">University Type</span>
                                    <span className="text-sm font-bold text-slate-700">{uni.type}</span>
                                </div>
                                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">Accreditation</span>
                                    <span className="text-sm font-bold text-slate-700">{uni.accreditation}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* ... (no changes to stats grid content) */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Total Posts</span>
                            <div className="p-1.5 bg-[#2b6cee]/10 rounded-lg text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[18px]">description</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.posts}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Active Opportunities</span>
                            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <span className="material-symbols-outlined text-[18px]">work_outline</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.opportunities}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 5%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Student Reach</span>
                            <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
                                <span className="material-symbols-outlined text-[18px]">groups</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.reach}</span>
                            <span className="text-slate-400 text-xs font-bold flex items-center mb-1">
                                Stable
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Verification Score</span>
                            <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.score}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                High
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Admin Notes */}
                    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-base">Administrative Notes</h3>
                            <span className="text-[10px] text-slate-400 italic">Visible only to Super Admins</span>
                        </div>
                        <div className="p-5">
                            <div className="space-y-3">
                                <div className="flex gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex-shrink-0">
                                        <div className="size-8 rounded-full bg-[#2b6cee] text-white flex items-center justify-center font-bold text-xs">JD</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-sm">John Doe (Senior Admin)</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">2 days ago</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">University is requesting a verification tier upgrade. Documentation looks solid. Pending final financial audit before approval.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <label className="block text-sm font-bold mb-3 text-slate-700 uppercase tracking-wide text-[10px]">Add Internal Note</label>
                                <div className="flex gap-2">
                                    <textarea className="flex-1 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#2b6cee] p-3 text-sm placeholder:text-slate-400 outline-none min-h-[100px]" placeholder="Type a note for other admins..." rows={3}></textarea>
                                    <button className="bg-[#2b6cee] text-white p-3 rounded-xl self-end hover:bg-[#2b6cee]/90 transition-all shadow-md shadow-[#2b6cee]/20">
                                        <span className="material-symbols-outlined">send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Recent Activity */}
                    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="px-5 py-3 border-b border-slate-100">
                            <h3 className="font-bold text-base text-slate-900">Recent Activity</h3>
                        </div>
                        <div className="p-5 space-y-6 flex-1">
                            {/* Timeline Items */}
                            <div className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold">add</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">New Post Published</p>
                                    <p className="text-xs text-slate-500">Summer Internship 2024 - AI Research</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Today, 10:45 AM</span>
                                </div>
                            </div>
                            <div className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-[#2b6cee] font-bold">edit</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">Profile Updated</p>
                                    <p className="text-xs text-slate-500">Modified primary contact details</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Yesterday, 4:20 PM</span>
                                </div>
                            </div>
                            <div className="relative pl-8 last:before:hidden before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-amber-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-amber-500 font-bold">login</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">Admin Login</p>
                                    <p className="text-xs text-slate-500">University admin logged in from SF</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Oct 14, 2023</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-slate-50">
                            <button className="w-full text-center text-sm font-bold text-slate-500 hover:text-[#2b6cee] transition-all py-2 rounded-lg hover:bg-slate-100">View All Activity</button>
                        </div>
                    </section>
                </div>
            </main>
        </SuperAdminLayout>
    );
};

export default SuperAdminUniversityProfile;
