import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileIntelligenceReport: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full h-full overflow-y-auto animate-fade-in bg-gray-50 relative z-10">
            {/* Top Navigation / Breadcrumb Area */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => navigate('/pai/portfolio-analysis')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    <span className="font-medium text-sm">Back to Portfolio Setup</span>
                </button>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 font-medium">Report Generated: <span className="text-gray-900">Today, 2:45 PM</span></span>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export PDF
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                        Continue to Dashboard
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </div>

            {/* AI Header Area */}
            <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl p-8 sm:p-10 mb-8 border border-indigo-950 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-[100px] -mr-[200px] -mt-[300px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-500 opacity-10 rounded-full blur-[80px] -ml-[100px] -mb-[200px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[14px] text-amber-300">workspace_premium</span>
                            Comprehensive AI Audit Complete
                        </div>
                        <h1 className="font-['Manrope'] text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Your Profile Intelligence Report</h1>
                        <p className="text-indigo-100/80 text-lg max-w-2xl leading-relaxed">
                            We've analyzed your academic history, Resume, LinkedIn, GitHub, and Portfolio. Here is your personalized roadmap to maximize university admission success.
                        </p>
                    </div>

                    {/* Overall Score Circle */}
                    <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner min-w-[200px]">
                        <div className="text-center mb-2">
                            <span className="block text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Global Admission</span>
                            <span className="block text-white text-sm font-medium">Competitiveness Score</span>
                        </div>
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#a78bfa" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="282.7" className="animate-[dash_1.5s_ease-out_forwards]" style={{ strokeDashoffset: '42.4' }} /> {/* 85% */}
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="font-['Manrope'] text-4xl font-extrabold text-white">85</span>
                                <span className="text-indigo-200 text-xs font-bold">/ 100</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Masonry-style Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left Column: Strengths, Weaknesses, Skills */}
                <div className="xl:col-span-1 space-y-8">

                    {/* Strengths & Weaknesses */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">balance</span>
                            </div>
                            <h2 className="font-bold text-gray-900 text-lg">Profile Audit Analysis</h2>
                        </div>

                        <div className="p-6 space-y-6 flex-1">
                            {/* Strengths */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    Key Strengths
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100">
                                        <span className="material-symbols-outlined text-green-600 shrink-0 mt-0.5 text-[20px]">check_circle</span>
                                        <div>
                                            <span className="font-bold text-gray-900 text-sm block">Strong Technical Portfolio</span>
                                            <span className="text-xs text-gray-600">Your GitHub demonstrates consistent contributions and production-level projects.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100">
                                        <span className="material-symbols-outlined text-green-600 shrink-0 mt-0.5 text-[20px]">check_circle</span>
                                        <div>
                                            <span className="font-bold text-gray-900 text-sm block">High Academic Baseline</span>
                                            <span className="text-xs text-gray-600">3.8 GPA in Core CS subjects aligns well with Top 50 University requirements.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Weaknesses / Gaps */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                    Areas for Improvement
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                                        <span className="material-symbols-outlined text-amber-600 shrink-0 mt-0.5 text-[20px]">warning</span>
                                        <div>
                                            <span className="font-bold text-gray-900 text-sm block">Lack of Leadership Roles</span>
                                            <span className="text-xs text-gray-600">Resume and LinkedIn show limited formal leadership or mentoring experience.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                                        <span className="material-symbols-outlined text-amber-600 shrink-0 mt-0.5 text-[20px]">warning</span>
                                        <div>
                                            <span className="font-bold text-gray-900 text-sm block">Missing Standardized Tests</span>
                                            <span className="text-xs text-gray-600">GRE/GMAT scores missing. Highly recommended for target tier.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Skill Gap Analysis Radar Chart Alternative */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-indigo-500">radar</span>
                            <h2 className="font-bold text-gray-900">Skill Competency Map</h2>
                        </div>
                        {/* We use progress bars to represent skill mapping cleanly */}
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-gray-700">Algorithmic Problem Solving</span>
                                    <span className="text-indigo-600">80%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-gray-700">System Architecture</span>
                                    <span className="text-indigo-600">65%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-gray-700">Data Engineering</span>
                                    <span className="text-indigo-600">40%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-gray-700">Cloud & DevOps</span>
                                    <span className="text-indigo-600">75%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-gray-700">Research & Publications</span>
                                    <span className="text-amber-500">15%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1 mt-1 font-medium">Critical gap for MS/PhD programs.</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Middle Column: Recommended Universities */}
                <div className="xl:col-span-1 space-y-8">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                                </div>
                                <h2 className="font-bold text-gray-900 text-lg">AI Smart Matches</h2>
                            </div>
                            <span className="text-xs font-bold px-3 py-1 bg-gray-200 text-gray-700 rounded-full">Top 3</span>
                        </div>

                        <div className="p-6 space-y-4 flex-1 overflow-y-auto">

                            {/* University Item 1 */}
                            <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all group bg-white relative cursor-pointer">
                                <span className="absolute top-4 right-4 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Safe</span>
                                <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 mb-3 flex items-center justify-center overflow-hidden">
                                    <img src="https://logo.clearbit.com/uci.edu" alt="UCI" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=UC&background=f3f4f6&color=4b5563'; }} />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">UC Irvine</h3>
                                <p className="text-sm text-gray-600 mb-3">MS Software Engineering</p>

                                <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <span className="material-symbols-outlined text-[14px]">psychology</span>
                                        Match Score
                                    </div>
                                    <div className="font-bold text-gray-900">92%</div>
                                </div>
                            </div>

                            {/* University Item 2 */}
                            <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all group bg-white relative cursor-pointer">
                                <span className="absolute top-4 right-4 text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">Target</span>
                                <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 mb-3 flex items-center justify-center overflow-hidden">
                                    <img src="https://logo.clearbit.com/gatech.edu" alt="Georgia Tech" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=GT&background=f3f4f6&color=4b5563'; }} />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">Georgia Tech</h3>
                                <p className="text-sm text-gray-600 mb-3">MS Computer Science</p>

                                <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <span className="material-symbols-outlined text-[14px]">psychology</span>
                                        Match Score
                                    </div>
                                    <div className="font-bold text-gray-900">81%</div>
                                </div>
                            </div>

                            {/* University Item 3 */}
                            <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all group bg-white relative cursor-pointer opacity-75 hover:opacity-100">
                                <span className="absolute top-4 right-4 text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded">Reach</span>
                                <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 mb-3 flex items-center justify-center overflow-hidden">
                                    <img src="https://logo.clearbit.com/cmu.edu" alt="CMU" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=CM&background=f3f4f6&color=4b5563'; }} />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">Carnegie Mellon</h3>
                                <p className="text-sm text-gray-600 mb-3">MS INI</p>

                                <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <span className="material-symbols-outlined text-[14px]">psychology</span>
                                        Match Score
                                    </div>
                                    <div className="font-bold text-gray-900">45%</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right Column: Actionable Roadmap */}
                <div className="xl:col-span-1 border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col h-full xl:max-h-[800px]">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                        <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">add_task</span>
                        </div>
                        <h2 className="font-bold text-gray-900 text-lg">Actionable Roadmap</h2>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto relative">
                        {/* Timeline Track */}
                        <div className="absolute left-10 top-6 bottom-6 w-0.5 bg-gray-200"></div>

                        <div className="space-y-8 relative">

                            {/* Step 1 */}
                            <div className="flex gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center z-10 shrink-0 shadow-md ring-4 ring-white">
                                    <span className="font-bold text-sm">1</span>
                                </div>
                                <div className="pb-2">
                                    <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Immediate (Month 1)</span>
                                    <h4 className="font-bold text-gray-900 text-base mb-2 group-hover:text-teal-600 transition-colors">Prepare for GRE</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                        Target a Quant score of 165+ to offset any GPA concerns for Tier 1 universities. Enroll in a prep course.
                                    </p>
                                    <button className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded transition-colors">
                                        View Test Prep Partners
                                    </button>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 text-gray-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">
                                    <span className="font-bold text-sm">2</span>
                                </div>
                                <div className="pb-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Short Term (Month 2-3)</span>
                                    <h4 className="font-bold text-gray-900 text-base mb-2 group-hover:text-indigo-600 transition-colors">Secure Open Source Contribution</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Your GitHub is strong. Merging 2-3 PRs into popular repositories like React or Next.js will highly impact your CMU application.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 text-gray-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">
                                    <span className="font-bold text-sm">3</span>
                                </div>
                                <div className="pb-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Medium Term (Month 4-5)</span>
                                    <h4 className="font-bold text-gray-900 text-base mb-2 group-hover:text-indigo-600 transition-colors">SOP & LOR Strategy</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Draft your Statement of Purpose focusing on the intersection of Systems Architecture and ML. Identify 3 recommenders.
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex gap-4 group opacity-50">
                                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 text-gray-400 flex items-center justify-center z-10 shrink-0 ring-4 ring-white">
                                    <span className="font-bold text-sm">4</span>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Long Term (Month 6+)</span>
                                    <h4 className="font-bold text-gray-500 text-base">Submit Applications</h4>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileIntelligenceReport;
