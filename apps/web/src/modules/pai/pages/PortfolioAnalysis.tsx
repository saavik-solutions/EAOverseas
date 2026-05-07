import React from 'react';
import { useNavigate } from 'react-router-dom';

const PortfolioAnalysis: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full h-full overflow-y-auto animate-fade-in relative z-10 text-gray-900">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-6 border border-indigo-100 shadow-sm relative">
                    <div className="absolute inset-0 rounded-full border border-indigo-200 animate-[ping_3s_ease-in-out_infinite]"></div>
                    <span className="material-symbols-outlined text-3xl text-indigo-600">travel_explore</span>
                </div>
                <h1 className="font-['Manrope'] text-4xl font-extrabold text-gray-900 mb-2">Portfolio & Website Discovery</h1>
                <p className="text-gray-600 text-lg">Step 5 of your Profile Intelligence Analysis</p>
            </div>

            {/* Main Content Areas */}
            <div className="space-y-8">
                {/* Input Area */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">

                    <div className="max-w-3xl mx-auto relative group">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Personal Website or Portfolio URL</label>
                        <div className="relative flex flex-col sm:flex-row shadow-sm rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all border border-gray-300">
                            <div className="absolute left-4 top-4 text-gray-400 z-10">
                                <span className="material-symbols-outlined">language</span>
                            </div>
                            <input
                                type="url"
                                className="w-full pl-12 pr-4 py-4 sm:pr-40 bg-gray-50 text-gray-900 focus:outline-none focus:bg-white transition-colors border-none"
                                placeholder="https://your-portfolio.com"
                                defaultValue="https://alexchen.dev"
                            />
                            <button className="sm:absolute right-1 top-1 bottom-1 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 sm:py-0 w-full sm:w-auto font-bold transition-colors flex items-center justify-center gap-2 m-1 rounded-lg">
                                <span className="material-symbols-outlined text-[18px]">radar</span>
                                Scan Site
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">page_info</span>
                            We'll extract projects, case studies, and demonstrated skills.
                        </p>
                    </div>
                </div>

                {/* Analysis Preview Section */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

                    {/* Status Header */}
                    <div className="bg-indigo-50/50 px-8 py-5 border-b border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-indigo-50 text-indigo-600">
                                <span className="material-symbols-outlined text-xl">check</span>
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 tracking-tight">Portfolio Extracted Successfully</h2>
                                <p className="text-xs text-indigo-600 font-medium flex items-center gap-1 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Live site • Analyzed today
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 flex items-center gap-1 shadow-sm">
                                <span className="material-symbols-outlined text-[14px]">view_carousel</span>
                                4 Projects Found
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">

                            {/* Left Column: Site Info & Technologies */}
                            <div className="space-y-6">
                                {/* Domain Info */}
                                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 relative overflow-hidden group hover:border-indigo-200 transition-colors">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-indigo-200 transition-colors"></div>
                                    <div className="relative z-10">
                                        <div className="w-full aspect-[16/9] bg-gray-200 rounded-lg mb-4 overflow-hidden border border-gray-300 relative group-hover:shadow-md transition-shadow">
                                            {/* Mocking a site screenshot */}
                                            <div className="w-full h-8 bg-gray-800 flex items-center px-3 gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 top-8 bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center text-gray-400">
                                                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">web</span>
                                                <span className="text-xs font-mono font-bold tracking-widest text-indigo-900/40">ALEXCHEN.DEV</span>
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-lg text-gray-900">Alex Chen - Portfolio</h3>
                                        <p className="text-sm text-gray-500 mb-3 truncate">Software Engineer specializing in modern web</p>
                                        <div className="flex items-center gap-2 text-xs font-mono bg-white px-2 py-1 rounded border border-gray-200 w-fit text-gray-600">
                                            <span className="material-symbols-outlined text-[14px]">link</span>
                                            alexchen.dev
                                        </div>
                                    </div>
                                </div>

                                {/* Extracted Tech Stack */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detected Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100 flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>React
                                        </span>
                                        <span className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-semibold border border-teal-100 flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>Tailwind CSS
                                        </span>
                                        <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold border border-purple-100 flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>Gatsby
                                        </span>
                                        <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-semibold border border-gray-200 flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[14px]">api</span>Vercel Analytics
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Extracted Projects */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-gray-900 text-lg">Extracted Projects</h4>
                                    <button className="text-sm text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1 transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                        Review All
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Project Card 1 */}
                                    <div className="group border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all relative overflow-hidden bg-white">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-50 to-transparent -z-10 group-hover:from-indigo-100 transition-colors"></div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">E-Commerce Dashboard</h5>
                                            <span className="material-symbols-outlined text-gray-400 group-hover:text-indigo-500 transition-colors">arrow_outward</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            A full-stack merchant dashboard analyzing real-time sales data. Built to handle 10k+ concurrent websocket connections for live updates.
                                        </p>
                                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">dns</span> Node.js, Next.js</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_month</span> 2023</span>
                                        </div>
                                    </div>

                                    {/* Project Card 2 */}
                                    <div className="group border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all relative overflow-hidden bg-white">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-50 to-transparent -z-10 group-hover:from-amber-100 transition-colors"></div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">DevFlow App</h5>
                                            <span className="material-symbols-outlined text-gray-400 group-hover:text-indigo-500 transition-colors">arrow_outward</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            A productivity tool for developers integrating GitHub PR reviews into a customized Kanban board. Ranked #1 Product of the Day.
                                        </p>
                                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">dns</span> React, Supabase</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_month</span> 2022</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                    <button onClick={() => navigate('/pai/github-analysis')} className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-900 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to GitHub
                    </button>

                    <div className="flex gap-4">
                        <button onClick={() => navigate('/pai/loading')} className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors flex items-center gap-2">
                            Skip this step
                        </button>
                        <button onClick={() => navigate('/pai/loading')} className="bg-gradient-to-r from-gray-900 to-indigo-900 hover:from-black hover:to-indigo-950 text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-indigo-900/20 flex items-center gap-2 transition-all group border border-gray-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/10 w-0 group-hover:w-full transition-all duration-300 ease-out"></div>
                            <span className="relative z-10 flex items-center gap-2">
                                Generate Ultimate Profile Report
                                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">auto_awesome</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed top-0 left-0 -z-20 w-full h-full bg-slate-50 overflow-hidden pointer-events-none">
                <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-indigo-400/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-fuchsia-400/5 rounded-full blur-[120px]"></div>
            </div>

        </div>
    );
};

export default PortfolioAnalysis;
