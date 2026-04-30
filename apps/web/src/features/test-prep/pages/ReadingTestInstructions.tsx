import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReadingTestInstructions = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            console.log("Starting Reading Test...");
            navigate('/test-prep/reading');
        }
    }, [timer, navigate]);

    return (
        <div className="flex flex-col flex-1 h-full font-display bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-gray-100 overflow-hidden">
            {/* Top Navigation Bar / Header - Matches Listening Test */}
            <header className="sticky top-0 z-40 bg-white dark:bg-[#1a212f] border-b border-slate-200 dark:border-gray-800 px-6 py-3 shrink-0">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-8 text-blue-600">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">EAOverseas</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Removed Help button and Step text as requested */}
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-hidden flex items-center justify-center p-4">
                <div className="flex flex-col max-w-[900px] w-full bg-white dark:bg-[#1a212f] rounded-xl p-6 shadow-sm border border-slate-200 dark:border-gray-800 scale-95 origin-center">

                    {/* Headline */}
                    <div className="text-center mb-6">
                        <h1 className="text-slate-900 dark:text-white tracking-tight text-2xl md:text-3xl font-bold leading-tight pb-2">Reading Test Instructions</h1>
                        <p className="text-slate-500 dark:text-gray-400 text-sm max-w-[500px] mx-auto">Please review the instructions below carefully before starting your IELTS Computer-Based Reading Practice Test.</p>
                    </div>

                    {/* Checklists - Compact View */}
                    <div className="grid grid-cols-2 gap-4 mb-8 w-full">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-gray-800/50 border border-transparent">
                            <div className="mt-0.5 flex-shrink-0">
                                <span className="material-symbols-outlined text-blue-600 text-xl">timer</span>
                            </div>
                            <div>
                                <p className="text-slate-900 dark:text-white text-base font-semibold leading-tight">Total time: 60 minutes</p>
                                <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">The timer will start automatically.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-gray-800/50 border border-transparent">
                            <div className="mt-0.5 flex-shrink-0">
                                <span className="material-symbols-outlined text-blue-600 text-xl">quiz</span>
                            </div>
                            <div>
                                <p className="text-slate-900 dark:text-white text-base font-semibold leading-tight">Total questions: 40</p>
                                <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">Multiple choice and fill in the blanks.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-gray-800/50 border border-transparent">
                            <div className="mt-0.5 flex-shrink-0">
                                <span className="material-symbols-outlined text-blue-600 text-xl">auto_stories</span>
                            </div>
                            <div>
                                <p className="text-slate-900 dark:text-white text-base font-semibold leading-tight">Total passages: 3</p>
                                <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">Different set of related questions.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-gray-800/50 border border-transparent">
                            <div className="mt-0.5 flex-shrink-0">
                                <span className="material-symbols-outlined text-blue-600 text-xl">swap_horiz</span>
                            </div>
                            <div>
                                <p className="text-slate-900 dark:text-white text-base font-semibold leading-tight">Free movement allowed</p>
                                <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">Navigate anywhere anytime.</p>
                            </div>
                        </div>
                    </div>

                    {/* Warning - Full Width */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 mb-6">
                        <div className="mt-0.5 flex-shrink-0">
                            <span className="material-symbols-outlined text-red-500 text-xl">warning</span>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-base font-semibold leading-tight">No extra time at the end</p>
                            <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">Ensure all answers are entered within the 60-minute time limit.</p>
                        </div>
                    </div>

                    {/* Timer Section */}
                    <div className="flex flex-col items-center justify-center py-4 bg-slate-50 dark:bg-gray-800/30 rounded-xl border border-slate-100 dark:border-gray-800">
                        <p className="text-sm font-medium text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Test Starting In</p>
                        <div className="text-5xl font-black text-blue-600 font-mono animate-pulse">
                            00:{timer < 10 ? `0${timer}` : timer}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-3">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            Secure Browser Environment
                        </div>
                    </div>

                </div>
            </main>
            {/* Footer Removed */}

        </div>
    );
};

export default ReadingTestInstructions;
