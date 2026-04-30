import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SpeakingTest = () => {
    const [step, setStep] = useState('mic-check'); // mic-check, instruction, intro, part1, part2, part3, completed
    const [isRecording, setIsRecording] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const questions = {
        part1: [
            "What is your full name?",
            "Can I see your ID?",
            "Do you work or are you a student?",
            "What do you like most about your hometown?"
        ],
        part2: {
            topic: "Describe a book you recently read.",
            points: [
                "What book it is",
                "Who wrote it",
                "What it is about",
                "Why you liked it"
            ]
        },
        part3: [
            "Do you think reading is important for children?",
            "How have reading habits changed with technology?"
        ]
    };

    useEffect(() => {
        let interval;
        if (isRecording && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRecording) {
            setIsRecording(false);
        }
        return () => clearInterval(interval);
    }, [isRecording, timeLeft]);

    const startRecording = (duration) => {
        setIsRecording(true);
        setTimeLeft(duration);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const renderMicCheck = () => (
        <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
            <div className="size-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <span className="material-symbols-outlined text-4xl text-blue-600">mic</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-3">Microphone Check</h2>
            <p className="text-slate-500 mb-8">Please speak into your microphone to verify input levels.</p>

            <div className="w-full h-12 bg-slate-100 rounded-full mb-8 overflow-hidden relative flex items-center px-4">
                <div className="flex-1 flex gap-1 items-end h-6 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                        <div key={i} className="w-1.5 bg-blue-500 rounded-full animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDuration: '0.5s' }}></div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setStep('part1')}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
            >
                Start Interview
            </button>
        </div>
    );

    const renderPart1 = () => (
        <div className="max-w-2xl mx-auto w-full">
            <div className="mb-8 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Part 1: Introduction</h2>
                <span className="text-sm font-bold text-slate-400">Question {currentQuestion + 1} / {questions.part1.length}</span>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8 min-h-[200px] flex items-center justify-center text-center">
                <h3 className="text-2xl font-serif text-slate-800 leading-relaxed">
                    "{questions.part1[currentQuestion]}"
                </h3>
            </div>

            <div className="flex flex-col items-center gap-6">
                {isRecording ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-3xl font-mono font-bold text-red-500 tabular-nums">
                            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                        </div>
                        <button
                            onClick={stopRecording}
                            className="size-20 rounded-full bg-red-50 border-4 border-red-500 flex items-center justify-center hover:scale-105 transition"
                        >
                            <div className="size-8 bg-red-500 rounded-md"></div>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-widest text-red-500 animate-pulse">Recording...</span>
                    </div>
                ) : (
                    <button
                        onClick={() => startRecording(30)}
                        className="size-20 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center hover:scale-105 transition"
                    >
                        <span className="material-symbols-outlined text-4xl">mic</span>
                    </button>
                )}

                {!isRecording && timeLeft === 0 && (
                    <button
                        onClick={() => {
                            if (currentQuestion < questions.part1.length - 1) {
                                setCurrentQuestion(prev => prev + 1);
                                setTimeLeft(0); // Reset for next
                            } else {
                                setStep('part2');
                            }
                        }}
                        className="text-blue-600 font-bold hover:underline mt-4"
                    >
                        Next Question &rarr;
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col flex-1 h-full relative font-display bg-[#f8f9fc] text-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/test-prep" className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition">
                            <span className="material-symbols-outlined text-slate-500">arrow_back</span>
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">IELTS Speaking</h1>
                            <p className="text-xs text-slate-500">Mock Exam #104</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                            {step === 'mic-check' ? 'Setup' : 'In Progress'}
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
                {step === 'mic-check' && renderMicCheck()}
                {step === 'part1' && renderPart1()}
                {/* Expand for Part 2 and 3 later */}
                {step === 'part2' && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Part 2 Coming Soon</h2>
                        <button onClick={() => setStep('part1')} className="text-blue-600 hover:underline">Restart Part 1</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SpeakingTest;
