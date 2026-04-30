import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readingTestData } from '@/features/test-prep/data/readingTestContent';
import ReadingSubmitModal from '@/features/test-prep/components/ReadingSubmitModal';

const ReadingTest = () => {
    const navigate = useNavigate();
    const [currentPassage, setCurrentPassage] = useState(1);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
    const [answers, setAnswers] = useState<Record<number | string, string>>({});
    const [markedForReview, setMarkedForReview] = useState<(number | string)[]>([]); // Changed to array
    const [showSubmitModal, setShowSubmitModal] = useState(false); // New state

    // Debugging logs
    useEffect(() => {
        console.log("ReadingTest Mounted");
        console.log("ReadingTestData:", readingTestData);
        console.log("CurrentPassage:", currentPassage);
    }, [currentPassage]);

    // Confirm and Submit Test
    const confirmSubmit = () => {
        // Calculate score
        let score = 0;
        let totalQuestions = 0; // Added to calculate total questions
        readingTestData.forEach(passage => { // Changed from 'passages' to 'readingTestData'
            passage.questions.forEach(q => {
                totalQuestions++; // Increment total questions
                if (answers[q.id] === q.correctAnswer) {
                    score += 1;
                }
            });
        });

        // Save score (mock) if needed
        console.log(`Final Reading Score: ${score}/${totalQuestions}`); // Updated log

        // Navigate to intermediate Submitted Page
        navigate('/test-prep/reading/submitted');
    };

    // Timer Logic - Auto Submit
    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            // Auto submit when time is up
            confirmSubmit();
        }
    }, [timeLeft]); // Dependency on timeLeft

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswerChange = (questionId: number | string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const toggleMarkForReview = (questionId: number | string) => {
        setMarkedForReview(prev => {
            if (prev.includes(questionId)) { // Changed from .has() to .includes()
                return prev.filter(id => id !== questionId);
            } else {
                return [...prev, questionId];
            }
        });
    };

    const handleSubmit = () => {
        setShowSubmitModal(true);
    };

    // Calculate progress for palette
    const answeredCount = Object.keys(answers).length;

    // Safety Check
    if (!readingTestData || readingTestData.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-500">Loading Reading Test...</p>
                </div>
            </div>
        );
    }

    const currentData = readingTestData.find(p => p.id === currentPassage);

    return (
        <div className="flex flex-col flex-1 h-full font-display bg-slate-50 text-slate-900 overflow-hidden">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>

            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-3 shrink-0">
                <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-8 text-blue-600">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">EAOverseas Reading Test</h1>
                            <p className="text-xs text-slate-500">Mock Exam #104 • Reading Section</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Passage Tabs in Header */}
                        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                            {readingTestData.map(passage => (
                                <button
                                    key={passage.id}
                                    onClick={() => setCurrentPassage(passage.id)}
                                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${currentPassage === passage.id ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                                >
                                    Passage {passage.id}
                                </button>
                            ))}
                        </div>

                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors ${timeLeft < 300 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                            <span className="material-symbols-outlined text-xl">timer</span>
                            <span className="tabular-nums">{formatTime(timeLeft)}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-6 p-6">

                    {/* Left Column: Passage & Questions (Span 9) */}
                    <div className="col-span-12 lg:col-span-9 flex flex-col h-[calc(100vh-140px)]">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-1 overflow-hidden">
                            {/* Inner Split View */}

                            {/* Left Pane: Passage Text */}
                            <div className="flex-1 border-r border-slate-200 overflow-y-auto custom-scrollbar p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                                        Reading Passage {currentPassage}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                    {currentData?.title}
                                </h2>
                                <div
                                    className="prose max-w-none text-slate-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: currentData?.content }}
                                />
                            </div>

                            {/* Right Pane: Questions */}
                            <div className="w-[45%] bg-slate-50 overflow-y-auto custom-scrollbar p-8">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">Questions</h3>
                                    <p className="text-sm text-slate-500 mt-1">Answer the questions below based on the passage.</p>
                                </div>

                                <div className="space-y-4">
                                    {currentData?.questions.map((q) => (
                                        <div key={q.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                                            <div className="flex gap-3 mb-3">
                                                <span className="flex items-center justify-center size-6 shrink-0 bg-blue-600 text-white font-bold rounded text-xs">{q.number}</span>
                                                <p className="font-medium text-slate-800 text-sm leading-snug">{q.text}</p>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2 pl-9">
                                                {q.type === 'text-input' ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Type your answer here..."
                                                        className="w-full p-2.5 rounded border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                                                        value={answers[q.id] || ''}
                                                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                    />
                                                ) : (
                                                    q.options?.map((opt, idx) => (
                                                        <label key={idx} className={`flex items-center gap-3 p-2.5 rounded border cursor-pointer transition-all ${answers[q.id] === opt ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}>
                                                            <input
                                                                type="radio"
                                                                name={q.id}
                                                                className="size-4 text-blue-600 focus:ring-blue-600 accent-blue-600"
                                                                checked={answers[q.id] === opt}
                                                                onChange={() => handleAnswerChange(q.id, opt)}
                                                            />
                                                            <span className="text-xs font-bold text-slate-600">{opt}</span>
                                                        </label>
                                                    ))
                                                )}
                                            </div>
                                            <div className="pl-9 mt-3">
                                                <button
                                                    onClick={() => toggleMarkForReview(q.id)}
                                                    className={`text-xs font-medium flex items-center gap-1.5 ${markedForReview.includes(q.id) ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'}`}
                                                >
                                                    <span className="material-symbols-outlined text-sm">{markedForReview.includes(q.id) ? 'flag' : 'outlined_flag'}</span>
                                                    {markedForReview.includes(q.id) ? 'Marked for Review' : 'Mark for Review'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Question Palette (Span 3) */}
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col flex-1">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600">grid_view</span>
                                Question Palette
                            </h3>

                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                <div className="grid grid-cols-5 gap-2 content-start">
                                    {currentData?.questions.map((q) => {
                                        const isAnswered = answers[q.id];
                                        const isMarked = markedForReview.includes(q.id);
                                        return (
                                            <button
                                                key={q.id}
                                                className={`
                                                    aspect-square rounded flex items-center justify-center text-sm font-bold transition-all border cursor-default
                                                    ${isMarked ? 'bg-orange-100 text-orange-700 border-orange-300' :
                                                        isAnswered ? 'bg-blue-600 text-white border-blue-600 shadow-sm' :
                                                            'bg-slate-50 text-slate-500 border-slate-200'}
                                                `}
                                            >
                                                {q.number}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-slate-500 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 rounded bg-blue-600"></div>
                                        <span>Answered</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 rounded bg-orange-100 border border-orange-300"></div>
                                        <span>Review</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 rounded bg-slate-50 border border-slate-200"></div>
                                        <span>Not Visited</span>
                                    </div>
                                </div>
                                {currentPassage === 3 && (
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                                    >
                                        <span>Submit Section</span>
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Exam Tips */}
                        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined">lightbulb</span>
                                Exam Tip
                            </h4>
                            <p className="text-sm text-blue-900/70 leading-relaxed">
                                Don't spend too long on one question. If you're stuck, mark it for review and move on. You can always come back later!
                            </p>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer Progress Bar */}
            <footer className="bg-white border-t border-slate-200 p-4 shrink-0 z-30">
                <div className="max-w-[1600px] mx-auto w-full">
                    <div className="w-64">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Progress</span>
                            <span className="text-sm font-bold text-slate-900">{answeredCount} / 40</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(answeredCount / 40) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Submit Modal */}
            <ReadingSubmitModal
                isOpen={showSubmitModal}
                onClose={() => setShowSubmitModal(false)}
                onConfirm={confirmSubmit}
                summary={{
                    total: 40,
                    answered: answeredCount,
                    unanswered: 40 - answeredCount,
                    marked: markedForReview.length
                }}
            />
        </div>
    );
};

export default ReadingTest;
