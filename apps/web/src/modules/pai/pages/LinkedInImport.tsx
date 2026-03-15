import React from 'react';
import { useNavigate } from 'react-router-dom';

const LinkedInImport: React.FC = () => {
    const navigate = useNavigate();

    const configStr = localStorage.getItem('pai_config');
    const paiConfig = configStr ? JSON.parse(configStr) : { isEngineering: true, hasPortfolio: true };

    const handleNext = () => {
        if (paiConfig.isEngineering) {
            navigate('/pai/github-analysis');
        } else if (paiConfig.hasPortfolio) {
            navigate('/pai/portfolio-analysis');
        } else {
            navigate('/pai/loading');
        }
    };

    return (
        <div className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full h-full overflow-y-auto animate-fade-in relative z-10">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6 border border-blue-100 shadow-sm">
                    <svg className="w-8 h-8 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </div>
                <h1 className="font-['Manrope'] text-4xl font-extrabold text-gray-900 mb-2">LinkedIn Profile Integration</h1>
                <p className="text-gray-600 text-lg">Step 3 of your Profile Intelligence Analysis</p>
            </div>

            {/* Main Content Areas */}
            <div className="space-y-8">
                {/* Input Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#0A66C2] rounded-l-2xl"></div>

                    <div className="max-w-3xl mx-auto">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Public LinkedIn URL</label>
                        <div className="relative flex items-center">
                            <div className="absolute left-4 text-gray-400">
                                <span className="material-symbols-outlined text-xl">link</span>
                            </div>
                            <input
                                type="url"
                                className="w-full pl-12 pr-40 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all shadow-inner"
                                placeholder="https://linkedin.com/in/username"
                                defaultValue="https://linkedin.com/in/alex-chen"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-[#0A66C2] hover:bg-blue-800 text-white px-6 rounded-lg font-bold transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">sync</span>
                                Sync Profile
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">lock</span>
                            We only extract publicly visible information. Your data is secure.
                        </p>
                    </div>
                </div>

                {/* Loading / Scanning State (Hidden by default, shown to illustrate UI flow) */}
                {/* 
                <div className="bg-white rounded-2xl shadow-sm border border-[#0A66C2] p-8 text-center bg-blue-50/30">
                    <div className="mb-6 relative">
                        <div className="w-20 h-20 border-4 border-[#0A66C2] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#0A66C2]">person_search</span>
                        </div>
                    </div>
                    <h3 className="font-['Manrope'] text-xl font-bold text-gray-900 mb-2">Scanning Profile Data</h3>
                    <p className="text-gray-600">Extracting endorsements, recommendations, and activity history...</p>
                </div> 
                */}

                {/* Extracted Data Preview (Simulating a successful sync) */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Preview Header */}
                    <div className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-600">check_circle</span>
                            <h2 className="font-bold text-gray-900">Extracted Insights Preview</h2>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full">Sync Complete</span>
                    </div>

                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">

                            {/* Profile Basics */}
                            <div className="flex items-start gap-6 border-r border-gray-100 pr-8 md:w-1/3 shrink-0">
                                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=Alex+Chen&background=0A66C2&color=fff" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-['Manrope'] font-bold text-xl text-gray-900">Alex Chen</h3>
                                    <p className="text-gray-600 text-sm mb-2">Senior Full Stack Developer at TechFlow | Technical Writer</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                                        San Francisco Bay Area
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-sm text-[#0A66C2] font-semibold">
                                        <span className="material-symbols-outlined text-[16px]">group</span>
                                        500+ Connections
                                    </div>
                                </div>
                            </div>

                            {/* Deep Insights */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">

                                {/* Top Skills */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Top Endorsed Skills</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between bg-blue-50/50 px-3 py-2 rounded-lg border border-blue-100">
                                            <span className="text-sm font-semibold text-gray-800">React.js</span>
                                            <div className="flex items-center gap-1 text-xs text-[#0A66C2] font-bold">
                                                <span className="material-symbols-outlined text-[14px]">thumb_up</span> 42
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-blue-50/50 px-3 py-2 rounded-lg border border-blue-100">
                                            <span className="text-sm font-semibold text-gray-800">Node.js</span>
                                            <div className="flex items-center gap-1 text-xs text-[#0A66C2] font-bold">
                                                <span className="material-symbols-outlined text-[14px]">thumb_up</span> 38
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                            <span className="text-sm font-semibold text-gray-600">TypeScript</span>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 font-bold">
                                                <span className="material-symbols-outlined text-[14px]">thumb_up</span> 25
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Network Auth & History */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Network Authority</h4>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                                        <div>
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-sm font-medium text-gray-600">Recommendations</span>
                                                <span className="font-bold text-gray-900">4</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                <div className="bg-[#0A66C2] h-1.5 rounded-full" style={{ width: '40%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-sm font-medium text-gray-600">Career Progression</span>
                                                <span className="font-bold text-green-600 text-xs">Strong</span>
                                            </div>
                                            <p className="text-xs text-gray-500 max-w-[200px]">Shows consistent promotions within 1.5 - 2 year intervals.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-8">
                    <button onClick={() => navigate('/pai/resume-upload')} className="flex items-center gap-2 text-gray-600 font-bold hover:text-gray-900 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Resume
                    </button>

                    <div className="flex gap-4">
                        <button onClick={handleNext} className="px-6 py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
                            Skip this step
                        </button>
                        <button onClick={handleNext} className="bg-[#0A66C2] hover:bg-blue-800 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all group">
                            Continue
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed top-[20%] right-0 -z-10 w-[600px] h-[600px] bg-[#0A66C2]/5 rounded-full blur-[120px] -mr-64 pointer-events-none"></div>
            <div className="fixed bottom-0 left-[-10%] -z-10 w-[500px] h-[500px] bg-slate-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
    );
};

export default LinkedInImport;
