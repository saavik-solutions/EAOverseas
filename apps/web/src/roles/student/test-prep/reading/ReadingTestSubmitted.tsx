import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReadingTestSubmitted = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(5); // Auto-advance in 5 seconds
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Timer for auto-navigation
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            navigate('/test-prep/writing-instructions');
        }
    }, [timeLeft, navigate]);

    useEffect(() => {
        // Simulated progress bar animation
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + 2, 100)); // Increment to 100% over ~2.5s
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center font-display p-4">
            <div className="bg-white dark:bg-[#1a212f] p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center max-w-lg w-full">

                {/* Success Icon */}
                <div className="mb-8 inline-block">
                    <div className="size-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                        <div className="size-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                            <span className="material-symbols-outlined text-3xl font-bold">check</span>
                        </div>
                    </div>
                </div>

                {/* Headers */}
                <h3 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs mb-3">
                    Section Complete
                </h3>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                    Reading Test Submitted<br />Successfully
                </h1>

                {/* Description */}
                <div className="text-slate-500 dark:text-slate-400 text-sm mb-10 leading-relaxed space-y-1">
                    <p>Your responses have been securely saved. Your scores</p>
                    <p>are currently being processed by our AI evaluators.</p>
                    <p className="pt-2 text-slate-400 dark:text-slate-500">Take a moment to relax before we move to the next part.</p>
                </div>

                {/* Progress Card */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 mb-8 text-left">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Preparing Writing Section</span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{Math.round(progress)}%</span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-75 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                        Setting up your writing prompts...
                    </p>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => navigate('/test-prep/writing-instructions')}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95 mb-4"
                >
                    Proceed to Writing Instructions
                </button>

                {/* Timer Text */}
                <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                    The test will auto-advance in {timeLeft} seconds
                </p>
            </div>
        </div>
    );
};

export default ReadingTestSubmitted;
