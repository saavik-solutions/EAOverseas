import React from 'react';
import { useNavigate } from 'react-router-dom';

const PAILanding: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 h-full overflow-y-auto w-full bg-white font-['Inter'] relative text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] bg-indigo-50/50 rounded-full blur-[120px]"></div>
                <div className="absolute top-[10%] right-[-10%] w-[40%] h-[60%] bg-purple-50/40 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 py-16 sm:py-24 space-y-32">

                {/* 1. HERO SECTION & VISUAL ELEMENT */}
                <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 xl:gap-32 animate-fade-in-up">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide uppercase">
                            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                            Profile Audit Intelligence
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
                            Know Your Admission Potential <br className="hidden lg:block xl:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Before You Apply.</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            PAI analyzes your <strong className="text-slate-900">Resume, LinkedIn, GitHub, and Portfolio</strong> to calculate your <strong className="text-slate-900">real admission competitiveness score</strong> and generate a <strong className="text-slate-900">personalized roadmap to top universities and careers.</strong>
                        </p>

                        <div>
                            <button
                                onClick={() => navigate('/pai/profile-form')}
                                className="relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-slate-900 rounded-xl hover:bg-slate-800 hover:scale-[1.02] shadow-xl shadow-slate-900/20 group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative z-10">Analyze My Profile Now</span>
                                <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <p className="mt-4 text-sm font-medium text-slate-500">Stop guessing your chances. Let AI analyze your profile in seconds.</p>
                        </div>
                    </div>

                    {/* Visiual Element: AI Report Mockup */}
                    <div className="flex-1 w-full max-w-md lg:max-w-none perspective-[1000px]">
                        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-2xl p-8 transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-0 hover:shadow-indigo-500/10">
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Assessment</div>
                                    <div className="text-sm font-medium text-slate-800">Profile Strength Score</div>
                                </div>
                                <div className="text-3xl font-extrabold text-indigo-600">76 <span className="text-lg text-slate-400 font-medium">/ 100</span></div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                                        <h4 className="text-sm font-bold text-slate-900">Strengths</h4>
                                    </div>
                                    <ul className="text-sm text-slate-600 space-y-2">
                                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0"></span>Strong Python skills</li>
                                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0"></span>Internship experience</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-amber-500 text-[18px]">warning</span>
                                        <h4 className="text-sm font-bold text-slate-900">Weaknesses</h4>
                                    </div>
                                    <ul className="text-sm text-slate-600 space-y-2">
                                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0"></span>No research projects</li>
                                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0"></span>Limited ML experience</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recommended Universities</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                                        <span className="text-sm font-medium text-slate-800">Univ. of Manchester</span>
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">82% match</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                                        <span className="text-sm font-medium text-slate-800">University of Toronto</span>
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">71% match</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Career Path Suggestions</h4>
                                <div className="flex gap-2">
                                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">Data Engineering</span>
                                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">AI Engineering</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. TRUST SECTION */}
                <section className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Powered by AI profile analysis trained on thousands of successful admission profiles.</p>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">description</span>
                            <span className="text-sm font-medium">Resume Analysis</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">work</span>
                            <span className="text-sm font-medium">LinkedIn Intelligence</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">code</span>
                            <span className="text-sm font-medium">GitHub Code Review</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">travel_explore</span>
                            <span className="text-sm font-medium">Portfolio Evaluation</span>
                        </div>
                    </div>
                </section>

                {/* 3. HOW IT WORKS */}
                <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">How It Works</h2>
                        <p className="text-slate-600">Three simple steps to uncover your admission potential.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[28px] left-[16%] right-[16%] h-[2px] bg-indigo-50 -z-10"></div>
                        <div className="hidden md:block absolute top-[28px] left-[16%] w-[33%] h-[2px] bg-gradient-to-r from-indigo-200 to-purple-200 -z-10" style={{ animation: 'shimmer 3s infinite linear' }}></div>

                        <div className="relative text-center xl:px-12">
                            <div className="w-14 h-14 mx-auto bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-slate-200/50">
                                <span className="material-symbols-outlined text-indigo-600">upload_file</span>
                            </div>
                            <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Step 1</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Upload Your Profile</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Add your Resume, LinkedIn, GitHub, and Portfolio.</p>
                        </div>

                        <div className="relative text-center xl:px-12">
                            <div className="w-14 h-14 mx-auto bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-slate-200/50">
                                <span className="material-symbols-outlined text-purple-600">psychology</span>
                            </div>
                            <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Step 2</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Profile Analysis</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Our AI evaluates your academic, technical, and career readiness.</p>
                        </div>

                        <div className="relative text-center xl:px-12">
                            <div className="w-14 h-14 mx-auto bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-slate-200/50">
                                <span className="material-symbols-outlined text-emerald-600">trending_up</span>
                            </div>
                            <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Step 3</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Get Your Competitive Edge</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Receive a personalized roadmap to strengthen your profile and target the right universities.</p>
                        </div>
                    </div>
                </section>

                {/* 4. VALUE CARDS */}
                <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                        <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-blue-100/50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">data_object</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Data Extraction</h3>
                            <p className="text-slate-600 leading-relaxed">Automatically extracts data from your Resume, LinkedIn, GitHub, and Portfolio without tedious manual input.</p>
                        </div>
                        <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-purple-100/50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">analytics</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Holistic Profile Analysis</h3>
                            <p className="text-slate-600 leading-relaxed">Evaluates your entire footprint: academic strength, coding ability, side projects, and professional potential.</p>
                        </div>
                        <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-amber-100/50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">score</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Admission Competitiveness Score</h3>
                            <p className="text-slate-600 leading-relaxed">Get a realistic, data-backed score that accurately tells how competitive your profile is for global top-tier universities.</p>
                        </div>
                        <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100/50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">route</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized Improvement Roadmap</h3>
                            <p className="text-slate-600 leading-relaxed">Actionable, clear steps you should take specific to your profile in the next 6 months to maximize your admission chances.</p>
                        </div>
                    </div>
                </section>

                {/* 5. MOTIVATIONAL SECTION */}
                <section className="bg-slate-900 rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center justify-between">
                        <div className="flex-1 space-y-6 max-w-3xl">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">Your Dream University Starts With a Strong Profile</h2>
                            <div className="space-y-4 text-slate-300 text-lg leading-relaxed shadow-sm">
                                <p>Thousands of students apply blindly to universities without knowing if their profile is competitive.</p>
                                <p>PAI gives you a <strong className="text-white">clear, data-driven understanding of where you stand and what to improve.</strong></p>
                                <p>Instead of guessing your chances, you get:</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400 text-[20px]">check_circle</span> Real admission probability</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400 text-[20px]">check_circle</span> Skill gap analysis</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400 text-[20px]">check_circle</span> Career direction insights</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400 text-[20px]">check_circle</span> University match recommendations</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. PSYCHOLOGICAL CTA SECTION */}
                <section className="text-center pb-24 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="mb-6">
                        <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">Limited Time Access</span>
                        <h2 className="text-sm font-semibold text-slate-600">Students who analyze their profile early improve their admission chances by up to 3×.</h2>
                    </div>

                    <button
                        onClick={() => navigate('/pai/profile-form')}
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-xl font-extrabold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-indigo-600 hover:from-indigo-500 to-purple-600 hover:to-purple-500 hover:scale-[1.02] shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_rgba(79,70,229,0.5)] overflow-hidden"
                    >
                        <div className="absolute inset-0 w-full h-full bg-white/20 skew-x-[-20deg] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <span className="relative z-10 text-shadow-sm">Analyze My Profile Now</span>
                        <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>

                    <p className="mt-6 text-sm font-medium text-slate-500 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">timer</span>
                        Takes less than 3 minutes. Free AI analysis.
                    </p>
                </section>

            </div>

            {/* Custom Animations for this page */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
};

export default PAILanding;
