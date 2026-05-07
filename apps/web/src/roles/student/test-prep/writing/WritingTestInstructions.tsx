import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WritingTestInstructions = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds to read instructions

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            // Auto-start test when time is up
            navigate('/test-prep/writing');
        }
    }, [timeLeft, navigate]);

    return (
        <div className="flex-1 w-full min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col font-display selection:bg-blue-100 dark:selection:bg-blue-900/30">
            {/* Header */}
            <header className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600/10 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">edit_note</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Writing Test</h1>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">IELTS Academic • 2 Tasks</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800 px-4 py-2 rounded-full">
                        <span className="material-symbols-outlined text-slate-500 text-lg">timer</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-mono">
                            Starts in: 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full p-8 flex flex-col items-center justify-center">
                <div className="max-w-5xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>
                    <div className="p-10 md:p-14">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Instructions for Candidates</h2>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                    The writing test consists of two tasks. You must answer both tasks.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        { icon: 'schedule', title: 'Time Allocation', desc: 'You have 60 minutes. Spend ~20 mins on Task 1 and ~40 mins on Task 2.' },
                                        { icon: 'description', title: 'Task 1', desc: 'Write at least 150 words describing a graph, table, or diagram.' },
                                        { icon: 'article', title: 'Task 2', desc: 'Write at least 250 words responding to a point of view, argument, or problem.' },
                                        { icon: 'fact_check', title: 'Marking', desc: 'Task 2 contributes twice as much as Task 1 to your writing score.' }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                                            <span className="material-symbols-outlined text-blue-600 mt-0.5">{item.icon}</span>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col justify-between bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30">
                                <div>
                                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined">info</span>
                                        Important Validation
                                    </h3>
                                    <p className="text-blue-800/80 dark:text-blue-200/70 text-sm leading-relaxed mb-6">
                                        Answers must be written in full sentences. Notes or bullet points are not accepted as valid answers. Validating your word count is essential.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/test-prep/writing')}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                                >
                                    Start Writing Test
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WritingTestInstructions;
