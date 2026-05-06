import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '@/components/layout/PageHeader';

const CounsellingChat = () => {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timer: any;
        if (selectedStudent && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setSelectedStudent(null); // Automatically exit when time is up
            setTimeLeft(300); // Reset for next session
        }
        return () => clearInterval(timer);
    }, [selectedStudent, timeLeft]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now(),
                text: message,
                sender: 'counselor',
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const students = [
        {
            id: 1,
            name: 'Sarah Jenkins',
            topic: 'Visa Application Strategy',
            status: 'Active',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2pKvrCvFJPmJ9Tjd-zaPcMc_ieTvW3AYxe33S0s3pdSavLrdAjx3ghll6xjir5C9h55NVNe_NpQ9A-Ea6v7qtMXdmp169NHSVESP0ta9xnZJ8jmXFwf9o-ET3twePvcgL6gxN_VpCqBMyrxUrovSNwr4nN92ME-otWciYc3v97AIR4k5WODCGb0EY72fknLC1whc4h4DFbvJiL1pq7YPhSYaqfeonEqt21ys-23PiQ4AHYEgjYqxB_tSIv6c_xA5h9dWUQ55veh8',
            lastMessage: "I'm a bit concerned about the financial proof documents.",
            time: '10:01 AM',
            unread: 3,
            intake: 'Fall 2024'
        },
        {
            id: 2,
            name: 'Alex Johnson',
            topic: 'End-to-End Guidance',
            status: 'Active',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC2_Wp8Y4Hvh9lXF6w5K6Z_m7W4Y5f8j4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M4L8M',
            lastMessage: "I'm ready to start my counseling session.",
            time: 'Just now',
            unread: 0,
            intake: 'Fall 2025'
        }
    ];

    if (!selectedStudent) {
        return (
            <div className="flex-1 flex flex-col h-full bg-[#f5f7f8]">
                <PageHeader title="Counselling Chat" />
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-6xl">
                        <div className="mb-6 flex items-center gap-4">
                            <h2 className="text-xl font-bold text-gray-900">Interested Students</h2>
                            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-500 font-medium">{students.length} students waiting</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {students.map((student) => (
                                <div
                                    key={student.id}
                                    onClick={() => {
                                        setSelectedStudent(student);
                                        setTimeLeft(300); // Reset to 5 mins on start
                                    }}
                                    className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col h-full"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="relative">
                                            <div
                                                className="size-16 rounded-2xl bg-cover bg-center border border-gray-100 shadow-sm"
                                                style={{ backgroundImage: `url('${student.image}')` }}
                                            ></div>
                                            {student.status === 'Active' && (
                                                <div className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{student.name}</h3>
                                            </div>
                                            <p className="text-xs text-blue-600 font-bold mb-3 flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-[16px] icon-filled">topic</span>
                                                {student.topic}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {student.status}
                                                </span>
                                                <div className="size-1 bg-gray-300 rounded-full"></div>
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{student.intake}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <button className="w-full py-3 bg-gray-50 group-hover:bg-blue-600 text-gray-600 group-hover:text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border border-gray-100 group-hover:border-blue-600 shadow-sm">
                                            Chat Now
                                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f5f7f8]">
            <PageHeader
                title={selectedStudent.name}
                actions={
                    <button
                        onClick={() => setSelectedStudent(null)}
                        className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                    >
                        <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
                        Back
                    </button>
                }
            />

            {/* Content Body */}
            <div className="flex flex-col flex-1 h-full overflow-hidden">
                {/* Active Session Bar */}
                <div className="bg-white border-b border-gray-200 flex items-center justify-between p-3 md:p-6 shrink-0 z-10 shadow-sm gap-2">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                        <div className="relative shrink-0">
                            <div
                                className="size-8 md:size-10 rounded-full bg-cover bg-center border border-gray-200"
                                style={{ backgroundImage: `url('${selectedStudent.image}')` }}
                            ></div>
                            <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <h2 className="text-[11px] md:text-sm font-black text-gray-900 truncate uppercase tracking-tight">
                                {selectedStudent.topic}
                            </h2>
                            <p className="text-[9px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">{selectedStudent.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        <div className="flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-blue-50 rounded-lg text-blue-600 border border-blue-100">
                            <span className="material-symbols-outlined text-sm md:text-lg icon-filled animate-pulse">timer</span>
                            <span className="text-[10px] md:text-sm font-black font-mono">{formatTime(timeLeft)}</span>
                        </div>
                        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
                        <button
                            onClick={() => setSelectedStudent(null)}
                            className="px-2.5 py-1.5 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] md:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[16px] md:text-[18px]">logout</span>
                            <span className="hidden sm:inline">End Session</span>
                            <span className="sm:hidden">End</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col bg-[#f5f7f8] relative min-w-0">
                        <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col gap-4 md:gap-6 scroll-smooth">
                            <div className="flex justify-center my-1 md:my-2">
                                <span className="text-[9px] md:text-[10px] font-bold text-gray-400 bg-white border border-gray-100 px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Today</span>
                            </div>
                            <div className="flex justify-center">
                                <span className="text-[10px] md:text-xs text-gray-400 font-medium italic">Session started at 10:00 AM</span>
                            </div>

                            {/* Student Message (Left) */}
                            <div className="flex gap-2 md:gap-3 max-w-[90%] md:max-w-2xl self-start group">
                                <div
                                    className="size-7 md:size-8 rounded-full bg-cover bg-center shrink-0 mt-1 border border-gray-200"
                                    style={{ backgroundImage: `url('${selectedStudent.image}')` }}
                                ></div>
                                <div className="flex flex-col gap-0.5 md:gap-1 max-w-[90%]">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[10px] md:text-xs font-bold text-gray-900">{selectedStudent.name}</span>
                                        <span className="text-[8px] md:text-[10px] text-gray-400">10:01 AM</span>
                                    </div>
                                    <div className="bg-white border border-gray-100 p-2.5 md:p-3.5 rounded-2xl rounded-tl-none text-[13px] md:text-sm text-gray-800 shadow-sm leading-snug">
                                        <p>Hi Dr. Elena! I've been reviewing the checklist for the Tier 4 visa. I'm a bit concerned about the financial proof documents.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Counselor Message (Right - Authenticated User) */}
                            <div className="flex gap-2 md:gap-3 max-w-[90%] md:max-w-2xl self-end flex-row-reverse group">
                                <div
                                    className="size-7 md:size-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-sm text-white text-[9px] md:text-[10px] font-black"
                                >
                                    YO
                                </div>
                                <div className="flex flex-col gap-0.5 md:gap-1 items-end max-w-[90%]">
                                    <div className="flex items-baseline gap-2 flex-row-reverse">
                                        <span className="text-[10px] md:text-xs font-bold text-gray-900">You (Counselor)</span>
                                        <span className="text-[8px] md:text-[10px] text-gray-400">10:03 AM</span>
                                    </div>
                                    <div className="bg-blue-600 text-white p-2.5 md:p-3.5 rounded-2xl rounded-tr-none text-[13px] md:text-sm shadow-md leading-snug">
                                        <p>Hello {selectedStudent.name.split(' ')[0]}. No need to worry, that's what we are here for. Could you clarify which part specifically is causing confusion?</p>
                                    </div>
                                </div>
                            </div>

                            {/* Student Message 2 (Left) */}
                            <div className="flex gap-2 md:gap-3 max-w-[90%] md:max-w-2xl self-start group">
                                <div
                                    className="size-7 md:size-8 rounded-full bg-cover bg-center shrink-0 mt-1 border border-gray-200"
                                    style={{ backgroundImage: `url('${selectedStudent.image}')` }}
                                ></div>
                                <div className="flex flex-col gap-0.5 md:gap-1 max-w-[90%]">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[10px] md:text-xs font-bold text-gray-900">{selectedStudent.name}</span>
                                        <span className="text-[8px] md:text-[10px] text-gray-400">10:04 AM</span>
                                    </div>
                                    <div className="bg-white border border-gray-100 p-2.5 md:p-3.5 rounded-2xl rounded-tl-none text-[13px] md:text-sm text-gray-800 shadow-sm leading-snug">
                                        <p>It's about the "28-day rule" for bank statements. My parents transferred the funds last week. Does the 28 days start from when the money enters the account or from when I print the statement?</p>
                                    </div>
                                </div>
                            </div>

                            {/* Typing Indicator (Left) */}
                            <div className="flex gap-3 max-w-2xl self-start">
                                <div
                                    className="size-8 rounded-full bg-cover bg-center shrink-0 mt-1 border border-gray-200 opacity-50"
                                    style={{ backgroundImage: `url('${selectedStudent.image}')` }}
                                ></div>
                                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                                    <div className="size-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="size-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="size-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>

                            {/* Dynamic Messages from Counselor */}
                            {messages.map((msg) => (
                                <div key={msg.id} className="flex gap-3 max-w-2xl self-end flex-row-reverse group">
                                    <div
                                        className="size-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-sm text-white text-[10px] font-bold"
                                    >
                                        YO
                                    </div>
                                    <div className="flex flex-col gap-1 items-end max-w-[85%]">
                                        <div className="flex items-baseline gap-2 flex-row-reverse">
                                            <span className="text-xs font-semibold text-gray-900">You (Counselor)</span>
                                            <span className="text-[10px] text-gray-500">{msg.time}</span>
                                        </div>
                                        <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-none text-sm shadow-md">
                                            <p className="leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Scroll anchor */}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-2 md:p-4 bg-white border-t border-gray-100 pb-safe">
                            <div className="bg-white p-1.5 rounded-2xl border border-gray-200 focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all flex items-end gap-1.5 shadow-sm">
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Attach Document">
                                    <span className="material-symbols-outlined text-[18px] md:text-[22px]">attach_file</span>
                                </button>
                                <textarea
                                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-24 py-2.5 text-[13px] md:text-sm text-gray-900 placeholder:text-gray-400 leading-tight"
                                    placeholder="Message..."
                                    rows={1}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                ></textarea>
                                <button
                                    onClick={sendMessage}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-md shadow-blue-500/30 flex items-center justify-center group active:scale-90"
                                    title="Send Message"
                                >
                                    <span className="material-symbols-outlined text-[18px] md:text-[22px] group-hover:translate-x-0.5 transition-transform">send</span>
                                </button>
                            </div>
                            <div className="mt-1.5 text-center text-[9px] text-gray-400 font-bold uppercase tracking-wider hidden sm:block">
                                Enter to send • Shift + Enter for new line
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Info */}
                    <div className="w-80 lg:w-96 bg-white border-l border-gray-200 overflow-y-auto hidden xl:flex flex-col shrink-0">
                        <div className="p-6 flex flex-col gap-6">
                            {/* Student Info */}
                            <div className="bg-gray-50/50 rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-12 rounded-full bg-gray-300 bg-cover bg-center border border-white shadow-sm"
                                        style={{ backgroundImage: `url('${selectedStudent.image || ''}')` }}
                                    ></div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{selectedStudent.name}</h3>
                                        <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1 mt-0.5">
                                            View Full Profile <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs border-t border-gray-200 pt-3">
                                    <div>
                                        <p className="text-gray-500 mb-0.5">Current Status</p>
                                        <span className={`px-2 py-0.5 rounded-full font-medium inline-block ${selectedStudent.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{selectedStudent.status}</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-0.5">Target Intake</p>
                                        <p className="font-medium text-gray-900">{selectedStudent.intake}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-500 mb-0.5">Consultation Topic</p>
                                        <p className="font-medium text-gray-900 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px] text-blue-600">topic</span> {selectedStudent.topic}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Information footer or space could go here if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounsellingChat;
