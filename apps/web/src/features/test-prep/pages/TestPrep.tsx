import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useAuthAction } from '@/hooks/useAuthAction';
import { useAuth } from '@/features/auth/context/AuthContext';
import LoginModal from '@/features/auth/components/LoginModal';

import { useNavigate } from 'react-router-dom';

const TestPrep = () => {
    const navigate = useNavigate();
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { user } = useAuth();

    const handleAction = (moduleName) => {
        if (moduleName === 'IELTS') {
            executeAction(() => {
                navigate('/test-prep/overview');
            });
            return;
        }

        executeAction(() => {
            console.log(`Starting ${moduleName}`);
            // Future navigation logic here
        });
    };

    return (
        <div className="flex flex-col flex-1 h-full relative overflow-hidden font-display bg-[#f8f9fc]">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-100px] left-[-100px] bg-blue-400 w-[500px] h-[500px] rounded-full blur-[80px] opacity-15"></div>
                <div className="absolute bottom-[-200px] right-[-100px] bg-indigo-200 w-[600px] h-[600px] rounded-full blur-[80px] opacity-15"></div>
                <div className="absolute top-[20%] right-[10%] bg-blue-300 w-[300px] h-[300px] rounded-full blur-[80px] opacity-15"></div>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[100px] -z-10"></div>
            </div>

            <div className="hidden lg:block">
                <PageHeader
                    title="Test Prep Hub"
                    actions={
                        !user ? (
                            <button
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                                onClick={() => navigate('/landing')}
                            >
                                Enter Website
                            </button>
                        ) : null
                    }
                />
            </div>

            <main className="flex-1 overflow-y-auto no-scrollbar relative z-10 p-4">
                <div className="max-w-[1400px] mx-auto w-full pb-20">

                    {/* Hero Section */}
                    <div className="mb-5 animate-fade-in-up">
                        <h1 className="text-xl md:text-3xl font-black font-display tracking-tighter mb-2 text-slate-800">
                            Test Preparation Hub
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm max-w-2xl leading-relaxed font-light">
                            Master your international exams with a <span className="text-blue-600 font-semibold">precision-engineered</span> curriculum.
                        </p>
                    </div>

                    {/* Pathways Indicator */}
                    <div className="flex items-end justify-between mb-4 animate-fade-in-up delay-100">
                        <div>
                            <h3 className="text-base font-bold font-display text-slate-800">Active Pathways</h3>
                            <p className="text-blue-600/70 text-[9px] font-bold uppercase tracking-widest mt-0.5">8 Specialty Modules</p>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="size-1 rounded-full bg-blue-600"></div>
                            <div className="size-1 rounded-full bg-slate-200"></div>
                            <div className="size-1 rounded-full bg-slate-200"></div>
                        </div>
                    </div>

                    {/* Cards Grid - Compact Design */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">

                        {/* IELTS Card */}
                        <div className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[1.2rem] p-4 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-150">
                            <div className="flex justify-between items-start mb-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full"></div>
                                    <div className="relative size-10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-indigo-700">public</span>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest border border-blue-100">In Progress</span>
                            </div>
                            <h4 className="text-base font-black mb-0.5 font-display text-slate-800">IELTS</h4>
                            <p className="text-[10px] text-slate-500 mb-3 font-medium">English Proficiency Pathway</p>
                            <div className="relative h-1 w-full bg-slate-100 rounded-full mb-3 overflow-hidden">
                                <div className="absolute inset-y-0 left-0 bg-blue-600 w-[45%] rounded-full"></div>
                            </div>
                            <button
                                onClick={() => handleAction('IELTS')}
                                className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs"
                            >
                                <span>Continue</span>
                                <span className="material-symbols-outlined text-[16px]">play_circle</span>
                            </button>
                        </div>

                        {/* TOEFL Card */}
                        <div className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[1.2rem] p-4 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-200">
                            <div className="flex justify-between items-start mb-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full"></div>
                                    <div className="relative size-10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-br from-amber-500 to-orange-600">history_edu</span>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-widest border border-slate-200">Not Started</span>
                            </div>
                            <h4 className="text-base font-black mb-0.5 font-display text-slate-800">TOEFL</h4>
                            <p className="text-[10px] text-slate-500 mb-3 font-medium">Academic English Track</p>
                            <div className="relative h-1 w-full bg-slate-100 rounded-full mb-3"></div>
                            <button
                                onClick={() => handleAction('TOEFL')}
                                className="w-full bg-white text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs"
                            >
                                <span>Unlock Module</span>
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                            </button>
                        </div>

                        {/* PTE Card */}
                        <div className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[1.2rem] p-4 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-250">
                            <div className="flex justify-between items-start mb-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full"></div>
                                    <div className="relative size-10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-br from-red-500 to-rose-600">record_voice_over</span>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-widest border border-slate-200">Not Started</span>
                            </div>
                            <h4 className="text-base font-black mb-0.5 font-display text-slate-800">PTE</h4>
                            <p className="text-[10px] text-slate-500 mb-3 font-medium">Pearson Test of English</p>
                            <div className="relative h-1 w-full bg-slate-100 rounded-full mb-3"></div>
                            <button
                                onClick={() => handleAction('PTE')}
                                className="w-full bg-white text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs"
                            >
                                <span>Unlock Module</span>
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                            </button>
                        </div>

                        {/* Duolingo Card */}
                        <div className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[1.2rem] p-4 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-300">
                            <div className="flex justify-between items-start mb-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-lime-500/10 blur-xl rounded-full"></div>
                                    <div className="relative size-10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-br from-lime-500 to-green-700">keyboard_voice</span>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-widest border border-slate-200">Not Started</span>
                            </div>
                            <h4 className="text-base font-black mb-0.5 font-display text-slate-800">Duolingo</h4>
                            <p className="text-[10px] text-slate-500 mb-3 font-medium">Modern Language Test</p>
                            <div className="relative h-1 w-full bg-slate-100 rounded-full mb-3"></div>
                            <button
                                onClick={() => handleAction('Duolingo')}
                                className="w-full bg-white text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs"
                            >
                                <span>Unlock Module</span>
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                            </button>
                        </div>

                        {/* GRE Card */}
                        <div className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[1.2rem] p-4 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-350">
                            <div className="flex justify-between items-start mb-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full"></div>
                                    <div className="relative size-10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-indigo-800">architecture</span>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest border border-blue-100">In Progress</span>
                            </div>
                            <h4 className="text-base font-black mb-0.5 font-display text-slate-800">GRE</h4>
                            <p className="text-[10px] text-slate-500 mb-3 font-medium">Graduate Admissions Module</p>
                            <div className="relative h-1 w-full bg-slate-100 rounded-full mb-3"></div>
                            <button
                                onClick={() => handleAction('GRE')}
                                className="w-full bg-white text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-xs"
                            >
                                <span>Unlock Module</span>
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                            </button>
                        </div>

                        {/* GMAT Card */}
                        <div className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[1.2rem] p-4 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-400">
                            <div className="flex justify-between items-start mb-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full"></div>
                                    <div className="relative size-10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-teal-700">monitoring</span>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-widest border border-slate-200">Not Started</span>
                            </div>
                            <h4 className="text-base font-black mb-0.5 font-display text-slate-800">GMAT</h4>
                            <p className="text-[10px] text-slate-500 mb-3 font-medium">Business School Core</p>
                            <div className="relative h-1 w-full bg-slate-100 rounded-full mb-3"></div>
                            <button
                                onClick={() => handleAction('GMAT')}
                                className="w-full bg-white text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs"
                            >
                                <span>Unlock Module</span>
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                            </button>
                        </div>

                        {/* SAT Card */}
                        <div className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[1.2rem] p-4 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-450">
                            <div className="flex justify-between items-start mb-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-400/10 blur-xl rounded-full"></div>
                                    <div className="relative size-10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-blue-600">auto_stories</span>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-widest border border-slate-200">Not Started</span>
                            </div>
                            <h4 className="text-base font-black mb-0.5 font-display text-slate-800">SAT</h4>
                            <p className="text-[10px] text-slate-500 mb-3 font-medium">Undergraduate Launchpad</p>
                            <div className="relative h-1 w-full bg-slate-100 rounded-full mb-3"></div>
                            <button
                                onClick={() => handleAction('SAT')}
                                className="w-full bg-white text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs"
                            >
                                <span>Unlock Module</span>
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                            </button>
                        </div>

                        {/* ACT Card */}
                        <div className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[1.2rem] p-4 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-500">
                            <div className="flex justify-between items-start mb-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-teal-400/10 blur-xl rounded-full"></div>
                                    <div className="relative size-10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-br from-teal-400 to-cyan-600">edit_square</span>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-widest border border-slate-200">Not Started</span>
                            </div>
                            <h4 className="text-base font-black mb-0.5 font-display text-slate-800">ACT</h4>
                            <p className="text-[10px] text-slate-500 mb-3 font-medium">College Readiness Assessment</p>
                            <div className="relative h-1 w-full bg-slate-100 rounded-full mb-3"></div>
                            <button
                                onClick={() => handleAction('ACT')}
                                className="w-full bg-white text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs"
                            >
                                <span>Unlock Module</span>
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                            </button>
                        </div>

                    </div>

                    {/* Banner Section */}
                    <div className="mt-8 p-4 md:p-6 rounded-[1.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden animate-fade-in-up delay-700">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="max-w-xl relative z-10 w-full text-center md:text-left">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-50 text-blue-600 text-[8px] font-bold uppercase tracking-widest mb-2">
                                <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                                <span>Insight of the Day</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-black mb-2 font-display leading-tight text-slate-800">Consistency breeds <span className="text-blue-600">Mastery</span>.</h3>
                            <p className="text-slate-500 text-xs leading-relaxed font-light">
                                Students who practice at least <span className="text-slate-800 font-bold">15 minutes</span> daily are 3x more likely to reach their target scores. Start your daily precision session now.
                            </p>
                        </div>
                        <button
                            onClick={() => handleAction('Daily Task')}
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 shrink-0 relative z-10 w-full md:w-auto"
                        >
                            Launch Daily Task
                        </button>
                    </div>

                </div>
            </main>
        </div >
    );
};

export default TestPrep;
