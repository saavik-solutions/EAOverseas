import React from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

const Superadmin = () => {
    const navigate = useNavigate();

    return (
        <SuperAdminLayout title="Dashboard Overview">
            <div className="p-8 flex flex-col gap-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Universities */}
                    <div
                        onClick={() => navigate('/superadmin/universities')}
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div className="bg-[#2b6cee]/10 text-[#2b6cee] p-2 rounded-lg">
                                <span className="material-symbols-outlined">apartment</span>
                            </div>
                            <span className="text-[#059669] bg-[#059669]/10 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Total Universities</p>
                            <h3 className="text-xl font-bold text-slate-900">124</h3>
                        </div>
                    </div>

                    {/* Pending Verifications */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                                <span className="material-symbols-outlined">verified_user</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Pending Verifications</p>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-[#d97706]">3</h3>
                                <span className="px-2 py-0.5 rounded bg-[#d97706]/10 text-[#d97706] text-[9px] font-bold">ACTION REQUIRED</span>
                            </div>
                        </div>
                    </div>

                    {/* Active Consultants */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div className="bg-slate-100 text-slate-600 p-2 rounded-lg">
                                <span className="material-symbols-outlined">badge</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Active Consultants</p>
                            <h3 className="text-xl font-bold text-slate-900">48</h3>
                        </div>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Total Revenue</p>
                            <h3 className="text-xl font-bold text-slate-900">$124,000</h3>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column - Activity & Ratings */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2b6cee] text-[18px]">history</span>
                                    Recent Activity
                                </h3>
                                <a className="text-[#2b6cee] text-[11px] font-bold hover:underline" href="#">View All</a>
                            </div>
                            <div className="p-5 flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <div className="relative flex-shrink-0">
                                        <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <span className="material-symbols-outlined text-[16px]">description</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <p className="text-xs text-slate-900 leading-tight">
                                            <span className="font-bold">U of Toronto</span> documents submitted.
                                        </p>
                                        <span className="text-[10px] text-slate-400 font-medium mt-1 uppercase">30 mins ago</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <span className="material-symbols-outlined text-[16px]">person_add</span>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <p className="text-xs text-slate-900 leading-tight">
                                            <span className="font-bold">Liam Smith</span> joined London.
                                        </p>
                                        <span className="text-[10px] text-slate-400 font-medium mt-1 uppercase">2 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Consultant Ratings */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-sm text-slate-900">Consultant Ratings</h3>
                                <span className="text-emerald-500 text-xs font-bold">+0.4</span>
                            </div>
                            <div className="h-16 flex items-end gap-1 relative overflow-hidden px-1">
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
                                    <path d="M0 25 L10 22 L20 26 L30 15 L40 18 L50 10 L60 14 L70 8 L80 12 L90 5 L100 2" fill="none" stroke="#2b6cee" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                    <path d="M0 25 L10 22 L20 26 L30 15 L40 18 L50 10 L60 14 L70 8 L80 12 L90 5 L100 2 L100 30 L0 30 Z" fill="url(#lineGradient)" opacity="0.1" />
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#2b6cee" />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Current Avg</span>
                                    <span className="text-lg font-bold text-slate-900">4.8/5.0</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">Last 30 Days</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Charts & Analytics */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Top Row - Distribution & Revenue */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Global Distribution */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-5">
                                <h3 className="font-bold text-sm text-slate-900 mb-6">Global Distribution</h3>
                                <div className="flex items-center gap-6">
                                    <div className="size-32 rounded-full relative flex-shrink-0" style={{
                                        background: 'conic-gradient(#2b6cee 0% 35%, #60a5fa 35% 60%, #93c5fd 60% 80%, #bfdbfe 80% 92%, #dbeafe 92% 100%)'
                                    }}>
                                        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-slate-400">ENROLLS</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#2b6cee]"></div>
                                                <span className="text-xs text-slate-600">India</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">35%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-blue-400"></div>
                                                <span className="text-xs text-slate-600">Nigeria</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">25%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-blue-300"></div>
                                                <span className="text-xs text-slate-600">Vietnam</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">20%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-blue-200"></div>
                                                <span className="text-xs text-slate-600">Brazil</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">12%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Revenue Contribution */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-5">
                                <h3 className="font-bold text-sm text-slate-900 mb-4">Revenue Contribution</h3>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="bg-[#2b6cee]/5 p-3 rounded-lg border border-[#2b6cee]/10">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Admissions</p>
                                        <p className="text-base font-bold text-[#2b6cee]">$72.5k</p>
                                        <div className="w-full bg-slate-200 h-1 mt-2 rounded-full overflow-hidden">
                                            <div className="bg-[#2b6cee] h-full w-[58%]"></div>
                                        </div>
                                    </div>
                                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Loans</p>
                                        <p className="text-base font-bold text-emerald-600">$41.2k</p>
                                        <div className="w-full bg-slate-200 h-1 mt-2 rounded-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full w-[33%]"></div>
                                        </div>
                                    </div>
                                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 col-span-2">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Visa Services</p>
                                        <div className="flex items-baseline gap-3">
                                            <p className="text-base font-bold text-amber-600">$10.3k</p>
                                            <span className="text-[10px] text-amber-600 font-bold">+8% vs MoM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Application Pipeline Funnel */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-sm text-slate-900">Application Pipeline Funnel</h3>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-2 rounded-full bg-slate-400"></div>
                                        <span className="text-[10px] text-slate-500 font-bold">Analyzed</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-2 rounded-full bg-[#2b6cee]"></div>
                                        <span className="text-[10px] text-slate-500 font-bold">Applied</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-2 rounded-full bg-amber-500"></div>
                                        <span className="text-[10px] text-slate-500 font-bold">Offers</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-[10px] text-slate-500 font-bold">Visa</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="w-full h-8 flex rounded-lg overflow-hidden border border-slate-100">
                                    <div className="h-full bg-slate-300 w-[40%] flex items-center justify-center text-[10px] font-bold text-slate-600">1.2k</div>
                                    <div className="h-full bg-[#2b6cee] w-[30%] flex items-center justify-center text-[10px] font-bold text-white">840</div>
                                    <div className="h-full bg-amber-500 w-[20%] flex items-center justify-center text-[10px] font-bold text-white">420</div>
                                    <div className="h-full bg-emerald-500 w-[10%] flex items-center justify-center text-[10px] font-bold text-white">180</div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 pt-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">Profiles</span>
                                        <span className="text-sm font-bold text-slate-700">1,248</span>
                                    </div>
                                    <div className="flex flex-col border-l border-slate-100 pl-4">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">Applied</span>
                                        <span className="text-sm font-bold text-slate-700">842</span>
                                    </div>
                                    <div className="flex flex-col border-l border-slate-100 pl-4">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">Offers</span>
                                        <span className="text-sm font-bold text-slate-700">418</span>
                                    </div>
                                    <div className="flex flex-col border-l border-slate-100 pl-4">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">Visa Success</span>
                                        <span className="text-sm font-bold text-slate-700">176</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alert Banner */}
                <div className="bg-white p-5 mx-8 mb-8 rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#d97706]/10 text-[#d97706] size-10 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">warning</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-900">Verification Queue Alert</h4>
                            <p className="text-xs text-slate-500">3 pending university applications haven't been reviewed for over 48 hours.</p>
                        </div>
                    </div>
                    <button className="w-full md:w-auto px-5 py-2 bg-[#2b6cee]/10 text-[#2b6cee] text-xs font-bold rounded-lg hover:bg-[#2b6cee]/20 transition-all">
                        Review Queue
                    </button>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default Superadmin;
