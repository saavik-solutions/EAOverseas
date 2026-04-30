import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReadingTestResult = () => {
    const navigate = useNavigate();

    // Auto-advance logic
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/test-prep/writing-instructions');
        }, 15000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-300">
            {/* Header - Matching ReadingTest.jsx */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-10 py-3">
                <div className="flex items-center gap-4 text-primary">
                    <div className="size-6 text-blue-600">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">EAOverseas</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8 items-center">
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Candidate ID: IELTS-99283</span>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAx1NWfT_HPmmhm8MQfYhS24YTBWwr5yi_s9u7zASjlS6SZ0_3JdCjN5PWRVUOczUfuXIi6bHq3h7vg67o0WPy6X0Uox689EPyB44jhu1Rhi2HctOvOXAlXfNqUOI6TF2m9PB7NAEq-Acza55bIRa9F4egqwCp8_-uLH8aM4LH3jmmGtEpKewwXj5ed6eDvyq_K6LmwV5rmwRvXkiIeJeFwj7tXxOkP997ZIyxKX_jlCSXnJAaMdBtqtXYhyh4p9KzuV_iz6VPIuQ0")' }}></div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-[640px] w-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 md:p-12 text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-blue-600/10 dark:bg-blue-600/20 p-4 rounded-full">
                            <span className="material-symbols-outlined text-blue-600 text-6xl">
                                check_circle
                            </span>
                        </div>
                    </div>

                    {/* Section Header */}
                    <h4 className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-2">Section Complete</h4>

                    {/* Headline */}
                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight mb-4 px-4">
                        Reading Test Submitted Successfully
                    </h1>

                    {/* Body Text */}
                    <div className="space-y-2 mb-10">
                        <p className="text-slate-600 dark:text-slate-300 text-lg font-normal px-4">
                            Your responses have been securely saved. Your scores are currently being processed by our AI evaluators.
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
                            Take a moment to relax before we move to the next part.
                        </p>
                    </div>

                    {/* Progress & Status */}
                    <div className="max-w-md mx-auto mb-10">
                        <div className="flex flex-col gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div className="flex gap-6 justify-between items-center">
                                <p className="text-slate-900 dark:text-white text-base font-semibold">Preparing Writing Section</p>
                                <p className="text-blue-600 text-sm font-bold">85%</p>
                            </div>
                            <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2.5 overflow-hidden">
                                <div className="h-full rounded-full bg-blue-600 w-[85%]"></div>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-sm">sync</span>
                                Setting up your writing prompts...
                            </p>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={() => navigate('/test-prep/writing-instructions')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-600/20 w-full sm:w-auto"
                        >
                            Proceed to Writing Instructions
                        </button>
                        <p className="text-slate-400 dark:text-slate-500 text-sm italic">
                            The test will auto-advance in 15 seconds
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer Information */}
            <footer className="p-6 text-center border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-400 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">lock</span>
                        Secure Test Environment
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">support_agent</span>
                        Technical Support Available
                    </div>
                    <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex items-center gap-2">
                        © 2024 EAOverseas AI Platform
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ReadingTestResult;
