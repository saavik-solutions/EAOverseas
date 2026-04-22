import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ListeningTest = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<Record<number | string, string>>({});
    const [score, setScore] = useState<number | null>(null);
    const [currentPart, setCurrentPart] = useState(1);

    // Strict Exam Mode State
    const [testStatus, setTestStatus] = useState('prep'); // 'prep', 'playing', 'finished', 'review'
    const [prepTimer, setPrepTimer] = useState(10);
    const [reviewTimer, setReviewTimer] = useState(120); // 2 minutes

    // Audio Player State
    const audioRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Audio Sources Mapping
    const audioSources = {
        1: '/listening-test.mp3',
        2: '/listening-part2.mp3',
        3: '/listening-part3.mp3',
        4: '/listening-part4.mp3'
    };

    const currentAudioSrc = audioSources[currentPart];

    // Prep Timer Effect
    useEffect(() => {
        let interval;
        if (testStatus === 'prep' && prepTimer > 0) {
            interval = setInterval(() => {
                setPrepTimer(prev => prev - 1);
            }, 1000);
        } else if (testStatus === 'prep' && prepTimer === 0) {
            startAudio();
        }
        return () => clearInterval(interval);
    }, [testStatus, prepTimer]);

    // Review Timer Effect
    useEffect(() => {
        let interval;
        if (testStatus === 'review' && reviewTimer > 0) {
            interval = setInterval(() => {
                setReviewTimer(prev => prev - 1);
            }, 1000);
        } else if (testStatus === 'review' && reviewTimer === 0) {
            alert("Review time over! Proceeding to Reading Test Instructions.");
            setTestStatus('finished');
            navigate('/test-prep/reading-instructions');
        }
        return () => clearInterval(interval);
    }, [testStatus, reviewTimer]);

    // Reset for new part
    useEffect(() => {
        if (testStatus === 'review') return; // Don't reset state if just switching parts in review mode

        setTestStatus('prep');
        setPrepTimer(10);
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            // Force reload to update src
            audioRef.current.load();
        }
    }, [currentPart]);

    // Start Audio Logic
    const startAudio = () => {
        if (audioRef.current) {
            setTestStatus('playing');
            setIsPlaying(true);
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Auto-play prevented:", error);
                    setIsPlaying(false); // Revert to paused state so user can click play
                    // Optionally show a UI hint that interaction is needed
                });
            }
        }
    };

    // Handle Play/Pause Toggle
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                        setTestStatus('playing');
                    }).catch(error => {
                        console.error("Play failed:", error);
                        setIsPlaying(false);
                    });
                }
            }
        }
    };

    // Effect to handle source changes and autoplay
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load(); // Force reload on source change
            if (testStatus === 'playing') {
                startAudio();
            }
        }
    }, [currentAudioSrc]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Allow seeking
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current && duration) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            const newTime = percentage * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        if (currentPart < 4) {
            setCurrentPart(prev => prev + 1);
        } else {
            // End of Part 4 - Start Review
            setTestStatus('review');
        }
    };

    const formatTime = (time: number) => {
        if (!time) return "00:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Placeholder data generator
    const generatePlaceholderQuestions = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => ({
            id: start + i,
            text: `Placeholder Question ${start + i}`,
            answer: "Answer"
        }));
    };

    const questions = [
        // Part 1
        { id: 1, text: "When will the student arrive at the university?", answer: "September" },
        { id: 2, text: "Which residence is most popular with first-year students?", answer: "Maple Residency" },
        { id: 3, text: "How much is the monthly rent?", answer: "480 pounds" },
        { id: 4, text: "Which utility is NOT included in the rent?", answer: "Internet" },
        { id: 5, text: "How much is the deposit?", answer: "300 pounds" },
        { id: 6, text: "Is the deposit refundable?", answer: "Yes", type: 'radio', options: ['Yes', 'No'] },
        { id: 7, text: "Where is the residence located?", answer: "Near the library and student centre" },
        { id: 8, text: "What is the application deadline?", answer: "15th of July" },
        { id: 9, text: "How should the student apply?", answer: "Online" },
        { id: 10, text: "Which document must be uploaded?", answer: "Passport" },

        // Part 2
        { id: 11, text: "What time does the library open on weekdays?", answer: "B", type: 'mcq', options: ['A. 8:00 a.m.', 'B. 8:30 a.m.', 'C. 9:00 a.m.'] },
        { id: 12, text: "When does the library close on weekends?", answer: "A", type: 'mcq', options: ['A. 6:00 p.m.', 'B. 8:00 p.m.', 'C. 10:00 p.m.'] },
        { id: 13, text: "What should students do to use group study rooms?", answer: "B", type: 'mcq', options: ['A. Visit the library desk', 'B. Book online', 'C. Arrive early'] },
        { id: 14, text: "When is lunch served in the cafeteria?", answer: "B", type: 'mcq', options: ['A. 11–1', 'B. 12–2', 'C. 1–3'] },
        { id: 15, text: "Which facility is free for registered students?", answer: "C", type: 'mcq', options: ['A. Library printing', 'B. Cafeteria', 'C. Sports centre'] },
        { id: 16, text: "Which facilities can be booked in advance?", answer: "group rooms" },
        { id: 17, text: "During which time is the sports centre busiest?", answer: "evenings" },
        { id: 18, text: "What type of food do coffee shops offer?", answer: "snacks" },
        { id: 19, text: "Where should students check for campus updates?", answer: "university website" },
        { id: 20, text: "What type of events are mentioned besides workshops?", answer: "campus events" },

        // Part 3
        { id: 21, text: "What is the main subject of the assignment?", answer: "A", type: 'mcq', options: ['A. Environmental economics', 'B. Climate change policies', 'C. Sustainable agriculture'] },
        { id: 22, text: "Which regions do previous studies mainly focus on?", answer: "B", type: 'mcq', options: ['A. Asia and Africa', 'B. Europe and North America', 'C. South America'] },
        { id: 23, text: "Why do the students choose developing countries?", answer: "C", type: 'mcq', options: ['A. They are easier to research', 'B. They have fewer policies', 'C. They face major environmental challenges'] },
        { id: 24, text: "Who will be responsible for data analysis?", answer: "B", type: 'mcq', options: ['A. The first speaker', 'B. The second speaker', 'C. Both students'] },
        { id: 25, text: "What will the other student mainly work on?", answer: "C", type: 'mcq', options: ['A. Writing the conclusion', 'B. Collecting survey data', 'C. Preparing presentation slides'] },
        { id: 26, text: "Name one developing country mentioned in the discussion.", answer: "India / Brazil" },
        { id: 27, text: "How will the work be divided between the students?", answer: "equally" },
        { id: 28, text: "On which day will they meet again?", answer: "Thursday" },
        { id: 29, text: "What time do they plan to meet?", answer: "three o’clock" },
        { id: 30, text: "Where will the meeting take place?", answer: "library" },

        // Part 4
        { id: 31, text: "Psychologists divide memory into __________ main systems.", answer: "two" },
        { id: 32, text: "Short-term memory can store information for only a few __________.", answer: "seconds" },
        { id: 33, text: "Long-term memory can store information for __________ periods.", answer: "extended" },
        { id: 34, text: "Repetition helps move information from short-term memory to __________ memory.", answer: "long-term" },
        { id: 35, text: "Learning that occurs over time is known as __________ learning.", answer: "spaced" },
        { id: 36, text: "Memory performance improves when information is revised over __________ days.", answer: "several" },
        { id: 37, text: "...rather than through __________ preparation.", answer: "last-minute" },
        { id: 38, text: "This method helps the brain __________ information more effectively.", answer: "consolidate" },
        { id: 39, text: "Memory is also influenced by factors such as attention, __________, and emotional engagement.", answer: "motivation" },
        { id: 40, text: "Information related to __________ experiences is remembered more clearly.", answer: "personal" }
    ];

    const getQuestionsForPart = (part) => {
        const start = (part - 1) * 10;
        return questions.slice(start, start + 10);
    };

    const currentQuestions = getQuestionsForPart(currentPart);

    const handleNextPart = () => {
        if (currentPart < 4) setCurrentPart(prev => prev + 1);
    };

    const handlePrevPart = () => {
        if (currentPart > 1) setCurrentPart(prev => prev - 1);
    };

    const handleAnswerChange = (id: number | string, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach(q => {
            if (answers[q.id]?.trim().toLowerCase() === q.answer.toLowerCase()) {
                newScore += 1;
            }
        });
        setScore(newScore);
        alert(`You scored ${newScore} out of ${questions.length}`);
    };





    return (
        <div className="flex flex-col flex-1 h-full font-display bg-slate-50 text-slate-900 overflow-hidden">
            <style>{`
                .glass-player {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
            `}</style>

            {/* Top Navigation Bar / Test Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-3 shrink-0">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-8 text-blue-600">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">EAOverseas Listening Test</h1>
                            <p className="text-xs text-slate-500">Mock Exam #104 • Section 1</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-6">


                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-6 p-6">
                    {/* Left Workspace: Questions */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                        {/* Audio Player Section */}
                        <div className="glass-player rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
                            {testStatus === 'prep' && (
                                <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex items-center justify-center flex-col">
                                    <p className="text-xl font-bold text-indigo-900 mb-2">Review Questions</p>
                                    <div className="text-4xl font-black text-blue-600 animate-pulse">{prepTimer}s</div>
                                    <p className="text-sm text-slate-500 mt-2">Audio starts automatically</p>
                                </div>
                            )}

                            {testStatus === 'review' && (
                                <div className="absolute inset-0 z-20 bg-slate-50 flex items-center justify-around px-4">
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Time Left to Review</p>
                                        <div className="text-5xl font-black text-amber-500 font-mono">
                                            {formatTime(reviewTimer)}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="text-xs font-semibold text-center mb-1 text-slate-400">JUMP TO PART</div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[1, 2, 3, 4].map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => setCurrentPart(p)}
                                                    className={`px-3 py-2 rounded text-sm font-bold transition ${currentPart === p ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-100'}`}
                                                >
                                                    Part {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <audio
                                ref={audioRef}
                                src={currentAudioSrc}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={handleAudioEnded}
                                onError={(e) => console.error("Audio Load Error:", e)}
                                className="hidden"
                            />
                            <div className={`flex items-center gap-6 ${testStatus === 'review' ? 'opacity-20 pointer-events-none' : ''}`}>
                                <button
                                    onClick={togglePlay}
                                    className={`flex shrink-0 items-center justify-center rounded-full size-14 ${isPlaying ? 'bg-blue-600 shadow-blue-600/20' : 'bg-blue-500 text-white animate-pulse'} text-white shadow-lg transition hover:scale-105 active:scale-95`}
                                    title={isPlaying ? "Pause" : "Play"}
                                >
                                    <span className="material-symbols-outlined text-3xl">
                                        {isPlaying ? 'graphic_eq' : 'play_arrow'}
                                    </span>
                                </button>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                            {testStatus === 'prep' ? 'Preparing...' : `Part ${currentPart} - Recording`}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>
                                    <div
                                        className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                                        onClick={handleProgressClick}
                                    >
                                        <div
                                            className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-100 ease-linear"
                                            style={{ width: `${(currentTime / duration) * 100}%` }}
                                        ></div>
                                    </div>
                                    {/* Waveform Removed */}
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                            <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
                                <h2 className="text-2xl font-bold tracking-tight">Part {currentPart} of 4: Questions {(currentPart - 1) * 10 + 1}–{currentPart * 10}</h2>
                                <div className="flex items-center gap-2 text-sm text-slate-500 italic">
                                    <span className="material-symbols-outlined text-sm">info</span>
                                    Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.
                                </div>
                            </div>

                            {/* Question Form */}
                            <div className="space-y-8">
                                <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-blue-600">description</span>
                                        Accommodation Request Form
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        {currentQuestions.map((q) => (
                                            <div key={q.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                                <div className="md:col-span-7">
                                                    <label className="text-base font-medium flex items-start gap-3">
                                                        <span className="font-bold text-slate-400 mt-0.5">{q.id}.</span>
                                                        <span className="text-slate-900">{q.text}</span>
                                                    </label>
                                                </div>
                                                <div className="md:col-span-5">
                                                    {q.type === 'mcq' ? (
                                                        <div className="space-y-2">
                                                            {q.options.map((opt) => {
                                                                const val = opt.charAt(0); // A, B, C
                                                                return (
                                                                    <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${answers[q.id] === val ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                                                                        <input
                                                                            type="radio"
                                                                            name={`q${q.id}`}
                                                                            value={val}
                                                                            checked={answers[q.id] === val}
                                                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                                            className="size-4 text-blue-600 focus:ring-blue-600 accent-blue-600"
                                                                        />
                                                                        <span className="text-sm font-medium text-slate-700">{opt}</span>
                                                                    </label>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : q.type === 'radio' ? (
                                                        <div className="flex items-center gap-6">
                                                            {q.options.map((opt) => (
                                                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name={`q${q.id}`}
                                                                        value={opt}
                                                                        checked={answers[q.id] === opt}
                                                                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                                        className="size-5 text-blue-600 focus:ring-blue-600 accent-blue-600"
                                                                    />
                                                                    <span className="text-sm font-medium">{opt}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                className="form-input flex-1 w-full rounded-lg border border-slate-300 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 h-10 px-3 text-sm"
                                                                value={answers[q.id] || ''}
                                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                                placeholder="Type your answer..."
                                                            />
                                                            {(q.id === 3 || q.id === 5) && (
                                                                <span className="text-sm font-semibold text-slate-500 shrink-0">pounds</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar: Navigator */}
                    <aside className="col-span-12 lg:col-span-4 max-w-sm ml-auto">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-lg">Question Palette</h3>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-600/10 px-2 py-1 rounded">
                                        {Object.keys(answers).filter(id => {
                                            const qId = parseInt(id);
                                            const inRange = qId >= (currentPart - 1) * 10 + 1 && qId <= currentPart * 10;
                                            const hasValue = answers[id] && answers[id].trim() !== '';
                                            return inRange && hasValue;
                                        }).length} / 10 Answered
                                    </span>
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-5 gap-3 mb-8">
                                    {currentQuestions.map((q) => (
                                        <button
                                            key={q.id}
                                            className={`size-10 rounded-lg flex items-center justify-center text-sm font-bold transition
                                                ${answers[q.id] && answers[q.id].trim() !== ''
                                                    ? 'bg-blue-600 text-white shadow-blue-600/20 shadow-lg'
                                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                }
                                            `}
                                        >
                                            {q.id}
                                        </button>
                                    ))}

                                </div>

                                {/* Legend */}
                                <div className="border-t border-slate-200 pt-6 grid grid-cols-2 gap-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="size-4 rounded bg-blue-600"></div>
                                        <span className="text-xs font-medium">Answered</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-4 rounded bg-slate-100"></div>
                                        <span className="text-xs font-medium">Not Visited</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="size-4 rounded border-2 border-primary bg-white"></div>
                                        <span className="text-xs font-medium">Current</span>
                                    </div>
                                </div>
                            </div>

                            {/* Help Card */}
                            <div className="bg-blue-600/5 rounded-xl p-5 border border-blue-600/20">
                                <h4 className="font-bold text-sm mb-2 text-blue-600 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">lightbulb</span>
                                    Exam Tips
                                </h4>
                                <p className="text-xs leading-relaxed text-slate-900">
                                    You can answer the questions while the audio is playing. At the end of the audio, it will automatically proceed to Part 2.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>


        </div >
    );
};

export default ListeningTest;
