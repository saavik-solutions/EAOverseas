import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WritingTest = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
    const [activeTask, setActiveTask] = useState(1);
    const [answer, setAnswer] = useState('');
    const [wordCount, setWordCount] = useState(0);

    // Timer Logic
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    // Format Time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Handle answer change and word count
    const handleAnswerChange = (e) => {
        const text = e.target.value;
        setAnswer(text);
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        setWordCount(words);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen w-full bg-slate-50 font-display text-[#111318] transition-colors duration-200 overflow-hidden">

            {/* Header Section (Sticky) */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-[#dbdfe6] px-6 lg:px-10 py-3 shrink-0">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    {/* Left: Branding */}
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl">edit_note</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight tracking-tight">IELTS Writing</h1>
                            <p className="text-xs text-[#616f89] font-medium uppercase tracking-wider">EAOverseas Platform</p>
                        </div>
                    </div>

                    {/* Right: Task Switcher & Timer */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-[#f0f2f4] p-1 rounded-xl">
                            <button
                                className={`px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-all ${activeTask === 1 ? 'bg-white text-blue-600' : 'text-[#616f89] hover:bg-white/50'}`}
                                onClick={() => setActiveTask(1)}
                            >
                                Task 1
                            </button>
                            <button
                                className={`px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-all ${activeTask === 2 ? 'bg-white text-blue-600' : 'text-[#616f89] hover:bg-white/50'}`}
                                onClick={() => setActiveTask(2)}
                            >
                                Task 2
                            </button>
                        </div>

                        <div className="h-8 w-px bg-[#dbdfe6] mx-2"></div>

                        <div className="flex items-center gap-2 bg-[#f0f2f4] px-4 py-2 rounded-xl border border-[#dbdfe6]">
                            <span className="material-symbols-outlined text-blue-600 text-xl">timer</span>
                            <span className="text-xl font-bold font-mono tracking-tighter text-[#111318]">{formatTime(timeLeft)}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 w-full overflow-hidden">
                {/* Split View Layout */}
                <div className="flex w-full mx-auto h-full">
                    {/* Left Panel: Prompt Area */}
                    <section className="w-1/2 border-r border-[#dbdfe6] bg-white flex flex-col h-full overflow-y-auto custom-scrollbar">
                        <div className="p-8">
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 bg-blue-600/10 text-blue-600 text-xs font-bold rounded-full mb-3 uppercase tracking-wide">Academic Writing Task {activeTask}</span>
                                <div className="space-y-4 mb-6">
                                    <div className="bg-blue-50 px-6 py-4 rounded-xl border border-blue-100 shadow-sm inline-block">
                                        <h2 className="text-lg font-bold text-[#111318]">
                                            {activeTask === 1
                                                ? "Summarize the information in 150 words:"
                                                : "Write about the following topic in 250 words:"}
                                        </h2>
                                    </div>
                                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                                        <h3 className="text-base font-medium text-[#4b5563] leading-relaxed">
                                            {activeTask === 1
                                                ? "The chart below shows the number of international visitors to three different museums from 2000 to 2020."
                                                : "Some people believe that studying abroad offers better career opportunities, while others think that higher education in one’s home country is more beneficial. Discuss both views and give your own opinion."}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Component (Only for Task 1) */}
                            {activeTask === 1 && (
                                <div className="rounded-xl border border-[#dbdfe6] bg-background-light/50 p-6 mb-8">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[#111318] text-base font-semibold">Visitors to three different museums (2000-2020)</p>
                                        <div className="flex min-h-[220px] flex-col gap-6 py-4 select-none">
                                            <svg fill="none" height="180" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear)"></path>
                                                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#2b6cee" strokeLinecap="round" strokeWidth="3"></path>
                                                <defs>
                                                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="236" x2="236" y1="1" y2="149">
                                                        <stop stopColor="#2b6cee" stopOpacity="0.2"></stop>
                                                        <stop offset="1" stopColor="#2b6cee" stopOpacity="0"></stop>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="flex justify-around border-t border-[#dbdfe6] dark:border-[#2d3648] pt-4">
                                                <p className="text-[#616f89] dark:text-[#a1abbd] text-[13px] font-bold">2000</p>
                                                <p className="text-[#616f89] dark:text-[#a1abbd] text-[13px] font-bold">2005</p>
                                                <p className="text-[#616f89] dark:text-[#a1abbd] text-[13px] font-bold">2010</p>
                                                <p className="text-[#616f89] dark:text-[#a1abbd] text-[13px] font-bold">2015</p>
                                                <p className="text-[#616f89] dark:text-[#a1abbd] text-[13px] font-bold">2020</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Redundant bottom text removed */}
                        </div>
                    </section>

                    {/* Right Panel: Writing Area */}
                    <section className="w-1/2 flex flex-col bg-[#fcfcfd]">
                        <div className="flex-1 p-8 flex flex-col h-full overflow-hidden">
                            <div className="flex items-center justify-between mb-4 px-2 shrink-0">
                                <label className="text-[#111318] text-sm font-bold uppercase tracking-wider">Answer Area</label>
                                <div className="flex items-center gap-2 text-[#616f89]">
                                    <span className="material-symbols-outlined text-sm">cloud_done</span>
                                    <span className="text-xs font-medium">Auto-saved</span>
                                </div>
                            </div>

                            {/* Editor Container with Border */}
                            <div className="flex-1 flex flex-col rounded-xl border border-[#dbdfe6] bg-white shadow-sm overflow-hidden">
                                <textarea
                                    className="flex-1 w-full p-6 text-[#111318] text-lg leading-loose resize-none custom-scrollbar focus:outline-none bg-transparent"
                                    placeholder="Type your response here... Start your summary by describing the data trends."
                                    value={answer}
                                    onChange={handleAnswerChange}
                                ></textarea>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer Section (Sticky) - Always visible for Word Count, Button conditional */}
            <footer className="fixed bottom-0 right-0 w-full lg:w-[calc(100%-16rem)] ml-auto bg-white border-t border-[#dbdfe6] px-6 lg:px-10 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 h-[80px] flex items-center">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between w-full h-full">
                    {/* Left: Word Counter (Moved from body) */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#f0f2f4] rounded-lg border border-[#dbdfe6]">
                            <span className="text-xs font-bold text-[#616f89] uppercase tracking-wider">Words:</span>
                            <span className={`text-sm font-bold ${wordCount >= (activeTask === 1 ? 150 : 250) ? 'text-green-600' : 'text-[#111318]'}`}>
                                {wordCount}
                            </span>
                            <span className="text-sm text-[#616f89] font-medium">/ {activeTask === 1 ? '150' : '250'} words</span>
                            {wordCount >= (activeTask === 1 ? 150 : 250) && (
                                <span className="material-symbols-outlined text-green-500 text-lg ml-1">check_circle</span>
                            )}
                        </div>
                    </div>

                    {/* Right: Submit Button - Only for Task 2 */}
                    <div className="flex items-center gap-6 h-full">
                        {activeTask === 2 && (
                            <>
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest leading-none mb-1">Warning</span>
                                    <span className="text-xs text-[#616f89] dark:text-[#a1abbd]">Once submitted, you cannot return to this test.</span>
                                </div>
                                <button className="flex min-w-[200px] items-center justify-center gap-2 rounded-xl h-12 px-8 bg-blue-600 text-white text-sm font-bold transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95 shadow-md">
                                    <span>Submit Writing Test</span>
                                    <span className="material-symbols-outlined text-base">send</span>
                                </button>
                            </>
                        )}
                        {/* Placeholder for Task 1 to keep layout stable */}
                        {activeTask === 1 && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg text-xs font-bold text-yellow-700 dark:text-yellow-500 animate-pulse">
                                <span className="material-symbols-outlined text-sm">warning</span>
                                Switch to Task 2 to submit the test.
                            </div>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WritingTest;
