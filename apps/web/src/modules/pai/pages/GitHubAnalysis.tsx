import React from 'react';
import { useNavigate } from 'react-router-dom';

const GitHubAnalysis: React.FC = () => {
    const navigate = useNavigate();

    const configStr = localStorage.getItem('pai_config');
    const paiConfig = configStr ? JSON.parse(configStr) : { isEngineering: true, hasPortfolio: true };

    const handleNext = () => {
        if (paiConfig.hasPortfolio) {
            navigate('/pai/portfolio-analysis');
        } else {
            navigate('/pai/loading');
        }
    };

    return (
        <div className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full h-full overflow-y-auto animate-fade-in relative z-10 text-slate-300 min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#161b22] mb-6 border border-slate-700 shadow-lg shadow-black/50">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </div>
                <h1 className="font-['Manrope'] text-4xl font-extrabold text-white mb-2 tracking-tight">GitHub Code Intelligence</h1>
                <p className="text-slate-400 text-lg">Step 4 of your Profile Intelligence Analysis</p>
            </div>

            {/* Main Content Areas */}
            <div className="space-y-8">
                {/* Input Area */}
                <div className="bg-[#161b22]/80 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>

                    <div className="max-w-3xl mx-auto">
                        <label className="block text-sm font-bold text-slate-300 mb-2">GitHub Username</label>
                        <div className="relative flex items-center">
                            <div className="absolute left-4 text-slate-500">
                                <span className="material-symbols-outlined text-xl">terminal</span>
                            </div>
                            <input
                                type="text"
                                className="w-full pl-12 pr-40 py-4 bg-[#0d1117] border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
                                placeholder="Enter username (e.g., torvalds)"
                                defaultValue="alexchen-dev"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-lg font-bold transition-colors flex items-center gap-2 border border-blue-400/20">
                                <span className="material-symbols-outlined text-[18px]">data_object</span>
                                Analyze
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-slate-500 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">public</span>
                            We analyze public repositories, commit history, and language statistics.
                        </p>
                    </div>
                </div>

                {/* Analysis Preview Section */}
                <div className="bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="bg-[#0d1117] px-8 py-4 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <h2 className="font-bold text-white font-mono text-sm tracking-wide">ANALYSIS_COMPLETE</h2>
                        </div>
                        <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-slate-700"></span>
                            <span className="w-3 h-3 rounded-full bg-slate-700"></span>
                            <span className="w-3 h-3 rounded-full bg-slate-700"></span>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Column: Dev Identity */}
                            <div className="col-span-1 space-y-6">
                                {/* Profile Card */}
                                <div className="flex items-center gap-4">
                                    <img src="https://avatars.githubusercontent.com/u/1?v=4" alt="Avatar" className="w-16 h-16 rounded-full border-2 border-slate-700" />
                                    <div>
                                        <h3 className="font-bold text-xl text-white">alexchen-dev</h3>
                                        <p className="text-sm text-slate-400">Full Stack Engineer</p>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-[#0d1117] p-3 rounded-xl border border-slate-800">
                                        <div className="text-slate-500 text-xs mb-1 font-mono uppercase">Repositories</div>
                                        <div className="text-2xl font-bold text-white">42</div>
                                    </div>
                                    <div className="bg-[#0d1117] p-3 rounded-xl border border-slate-800">
                                        <div className="text-slate-500 text-xs mb-1 font-mono uppercase">Contributions</div>
                                        <div className="text-2xl font-bold text-green-400">1,204</div>
                                    </div>
                                    <div className="bg-[#0d1117] p-3 rounded-xl border border-slate-800">
                                        <div className="text-slate-500 text-xs mb-1 font-mono uppercase">Followers</div>
                                        <div className="text-2xl font-bold text-white">128</div>
                                    </div>
                                    <div className="bg-[#0d1117] p-3 rounded-xl border border-slate-800">
                                        <div className="text-slate-500 text-xs mb-1 font-mono uppercase">Stars Earned</div>
                                        <div className="text-2xl font-bold text-yellow-400">356</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Code Insights */}
                            <div className="col-span-1 lg:col-span-2 space-y-6">

                                {/* Top Languages */}
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 mb-3 font-mono uppercase tracking-wider flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px]">code</span>
                                        Language Distribution
                                    </h4>

                                    <div className="bg-[#0d1117] rounded-xl border border-slate-800 p-5">
                                        <div className="flex h-3 w-full rounded-full overflow-hidden mb-4">
                                            <div className="bg-yellow-400" style={{ width: '45%' }}></div>
                                            <div className="bg-blue-500" style={{ width: '30%' }}></div>
                                            <div className="bg-purple-500" style={{ width: '15%' }}></div>
                                            <div className="bg-orange-500" style={{ width: '10%' }}></div>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400"></span><span className="text-white font-medium">JavaScript</span></div>
                                                <span className="text-slate-500 font-mono text-xs mt-1">45.0%</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="text-white font-medium">TypeScript</span></div>
                                                <span className="text-slate-500 font-mono text-xs mt-1">30.0%</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span><span className="text-white font-medium">Python</span></div>
                                                <span className="text-slate-500 font-mono text-xs mt-1">15.0%</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span><span className="text-white font-medium">HTML/CSS</span></div>
                                                <span className="text-slate-500 font-mono text-xs mt-1">10.0%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Top Repositories Highlight */}
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 mb-3 font-mono uppercase tracking-wider flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px]">folder_open</span>
                                        Key Projects Identified
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="bg-[#0d1117] p-4 rounded-xl border border-slate-800 flex justify-between items-center group hover:border-slate-600 transition-colors">
                                            <div>
                                                <a href="#" className="text-blue-400 font-bold hover:underline mb-1 inline-block">react-dashboard-framework</a>
                                                <p className="text-xs text-slate-400">A scalable dashboard component library built with Tailwind and React Context.</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">star</span> 128</span>
                                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> TS</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#0d1117] p-4 rounded-xl border border-slate-800 flex justify-between items-center group hover:border-slate-600 transition-colors">
                                            <div>
                                                <a href="#" className="text-blue-400 font-bold hover:underline mb-1 inline-block">node-api-boiler</a>
                                                <p className="text-xs text-slate-400">Production-ready Express.js boilerplate with JWT, Mongo integration.</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">star</span> 85</span>
                                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> JS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-8 border-t border-slate-800">
                    <button onClick={() => navigate('/pai/linkedin-import')} className="flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to LinkedIn
                    </button>

                    <div className="flex gap-4">
                        <button onClick={handleNext} className="px-6 py-4 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition-colors flex items-center gap-2">
                            Skip this step
                        </button>
                        <button onClick={handleNext} className="bg-white hover:bg-slate-200 text-slate-900 px-10 py-4 rounded-xl font-bold shadow-lg shadow-white/10 flex items-center gap-2 transition-all group">
                            Continue
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* GitHub Style Background Grid */}
            <div className="fixed inset-0 -z-20 bg-[#0d1117] pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="fixed top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-0 right-1/4 -z-10 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
    );
};

export default GitHubAnalysis;
