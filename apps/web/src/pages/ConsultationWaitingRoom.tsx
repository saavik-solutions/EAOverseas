import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const ConsultationWaitingRoom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingDetails } = location.state || {};

    // Dynamic topic from booking details
    const topic = bookingDetails?.topic || "General Consultation";
    const startTimeTime = bookingDetails?.time || "3:00 PM";

    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [isSessionActive, setIsSessionActive] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            let targetDateStr = now.toDateString(); // Default to today

            // Handle specific date from booking details
            if (bookingDetails?.date && bookingDetails.date !== 'Today') {
                targetDateStr = bookingDetails.date;
                // Ensure the date string is parseable by Date constructor, typically "Jan 9, 2026" works
            }

            // Construct target Date object from "3:00 PM" string
            const [time, modifier] = startTimeTime.split(' ');
            let [hours, minutes] = time.split(':');

            if (hours === '12') {
                hours = '00';
            }
            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }

            // Combine date and time
            const targetTime = new Date(`${targetDateStr} ${hours}:${minutes}:00`);

            // If target time is invalid (NaN), fallback to safer default or handle error
            if (isNaN(targetTime.getTime())) {
                // Fallback: try assuming it was meant to be today if parsing failed
                const fallbackTime = new Date(`${now.toDateString()} ${hours}:${minutes}:00`);
                if (!isNaN(fallbackTime.getTime())) {
                    // use fallback
                }
            }

            let difference = targetTime - now;

            // Debug support: if difference is negative but date was "Today" and time is earlier, maybe it was meant for tomorrow? 
            // (Only if booking logic isn't robust, but let's stick to strict interpretation first)

            if (difference <= 0) {
                // Time reached
                setIsSessionActive(true);
                return { hours: 0, minutes: 0, seconds: 0 };
            }

            const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutesLeft = Math.floor((difference / 1000 / 60) % 60);
            const secondsLeft = Math.floor((difference / 1000) % 60);

            return { hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            const left = calculateTimeLeft();
            setTimeLeft(left);
        }, 1000);

        return () => clearInterval(timer);
    }, [startTimeTime, bookingDetails]);


    // Chat State
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    // Auto-scroll to bottom of chat
    const chatEndRef = React.useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user', // 'user' or 'counsellor'
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');

        // Simulate reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Thanks for your message. I'm reviewing your file now.",
                sender: 'counsellor',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-[#f8f9fc] overflow-hidden font-sans">
            {/* Header reused from layout, or just minimal header if full page */}

            <main className="flex-1 flex flex-col pt-4 pb-4 px-4 md:px-6 overflow-y-auto no-scrollbar">
                <div className="w-full max-w-[800px] mx-auto flex flex-col h-full">

                    {!isSessionActive ? (
                        /* Waiting Room View */
                        <div className="flex flex-col items-center gap-8 my-auto">
                            {/* Countdown Section */}
                            <div className="w-full flex flex-col items-center animate-fade-in">
                                <div className="flex items-center gap-2 mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                    <span className="relative flex h-2 w-2">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSessionActive ? 'bg-green-500' : 'bg-blue-600'} opacity-75`}></span>
                                        <span className={`relative inline-flex rounded-full h-2 w-2 ${isSessionActive ? 'bg-green-500' : 'bg-blue-600'}`}></span>
                                    </span>
                                    <span className={`text-xs font-semibold ${isSessionActive ? 'text-green-600' : 'text-blue-600'} uppercase tracking-wider`}>
                                        {isSessionActive ? 'Session Active' : 'Upcoming Session'}
                                    </span>
                                </div>
                                <h1 className="text-slate-900 text-3xl md:text-4xl font-bold leading-tight text-center mb-6">
                                    {isSessionActive ? "Session is Live" : "Session starts in"}
                                </h1>

                                {/* Timer Component */}
                                {!isSessionActive && (
                                    <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full max-w-lg">
                                        {/* Hours */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex h-16 w-16 md:h-20 md:w-20 flex-col items-center justify-center rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100">
                                                <p className="text-blue-600 text-2xl md:text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</p>
                                            </div>
                                            <p className="text-slate-500 text-xs uppercase font-medium tracking-wide">Hours</p>
                                        </div>
                                        <div className="text-slate-300 text-2xl font-light self-start mt-4 hidden sm:block">:</div>

                                        {/* Minutes */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex h-16 w-16 md:h-20 md:w-20 flex-col items-center justify-center rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100">
                                                <p className="text-blue-600 text-2xl md:text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</p>
                                            </div>
                                            <p className="text-slate-500 text-xs uppercase font-medium tracking-wide">Minutes</p>
                                        </div>
                                        <div className="text-slate-300 text-2xl font-light self-start mt-4 hidden sm:block">:</div>

                                        {/* Seconds */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex h-16 w-16 md:h-20 md:w-20 flex-col items-center justify-center rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100">
                                                <p className="text-blue-600 text-2xl md:text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</p>
                                            </div>
                                            <p className="text-slate-500 text-xs uppercase font-medium tracking-wide">Seconds</p>
                                        </div>
                                    </div>
                                )}

                                <p className="text-slate-600 text-base md:text-lg font-normal leading-normal mt-6 text-center">
                                    {isSessionActive ? "You can now chat with your consultant below." : "Your consultant is preparing your file and will join shortly."}
                                </p>
                            </div>

                            {/* Session Details Card */}
                            <div className="w-full max-w-2xl mt-4">
                                <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200">
                                    <div className="flex flex-col md:flex-row gap-6 p-5">
                                        {/* Image/Map Area */}
                                        <div className="w-full md:w-1/3 aspect-video md:aspect-auto bg-slate-100 rounded-lg overflow-hidden relative group">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGNNatk0bsGgOqw8J-liyMO_BqgGyKNPYN7QBLGtWtJiDQXrNZqsd4gAoCDfALPm9XV-LS3-Y7EtcXUfk1IhViP5GFMXk0-hd2yBivhkZDNPnAq7P9WqOwSJBbnWRIrrhCHaEXEowjgOKNVTjmvyOWiNLzxRml0VJ8YMVEkcJaXhRjL6J9EXx9BRYZl2g-bqCK37pZ2scQ_zcfahR377YhKphqRzUkkkn_ghd_bvUiE1vdkQh_Yb9S1XJEacSgGzGnbqlhv24c5a8")' }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-3 left-3 text-white">
                                                <p className="text-xs font-bold uppercase tracking-wider mb-0.5">Destination</p>
                                                <p className="text-sm font-medium">London, UK</p>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-center gap-3">
                                            <div>
                                                <h3 className="text-slate-900 text-lg font-bold leading-tight">{topic}</h3>
                                                <p className="text-slate-500 text-sm mt-1">Order #4429 • Standard Consultation</p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                <div
                                                    className="bg-cover bg-center rounded-full size-10 border border-slate-200"
                                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYO4VeAJVD8CUIfw7so7HSwxq8YKH-o7ZGV-3Wsue6mDos7N1ejr8FvvJPUoIe7DAS7hDgra95l_LszT4H_ln9o6oc-xp7X_Ng0LFkQ1iFyPDc9cYG7aIdUqxCFcPmm0cnvyMOdZ6TEmE30v9BMBF_d8uTjPBhrW2zQEZAuZwe1mLs3EAwbB9y2wwoPDq0tVBS0t-em32_TUlZfCxzHKVELDtShEIO8zSqnBSBX7UxnLEFRCYddC1HNxsIu5smPSIzKCATyGXJ3lY")' }}
                                                ></div>
                                                <div>
                                                    <p className="text-slate-900 text-sm font-semibold">Sarah Jenkins</p>
                                                    <p className="text-slate-500 text-xs">Senior Visa Counselor</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 mt-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-base">calendar_today</span>
                                                    <span>Today</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-base">schedule</span>
                                                    <span>{startTimeTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        /* Chat View */
                        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div
                                            className="bg-cover bg-center rounded-full size-10 border border-gray-100"
                                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYO4VeAJVD8CUIfw7so7HSwxq8YKH-o7ZGV-3Wsue6mDos7N1ejr8FvvJPUoIe7DAS7hDgra95l_LszT4H_ln9o6oc-xp7X_Ng0LFkQ1iFyPDc9cYG7aIdUqxCFcPmm0cnvyMOdZ6TEmE30v9BMBF_d8uTjPBhrW2zQEZAuZwe1mLs3EAwbB9y2wwoPDq0tVBS0t-em32_TUlZfCxzHKVELDtShEIO8zSqnBSBX7UxnLEFRCYddC1HNxsIu5smPSIzKCATyGXJ3lY")' }}
                                        ></div>
                                        <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm">Sarah Jenkins</h3>
                                        <p className="text-xs text-green-600 font-medium">Online</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                                {messages.length === 0 && (
                                    <div className="text-center text-gray-400 text-sm mt-10">
                                        <span className="material-symbols-outlined text-4xl mb-2 opacity-20 block">chat_bubble</span>
                                        Start the conversation...
                                    </div>
                                )}
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                            }`}>
                                            <p>{msg.text}</p>
                                            <span className={`text-[10px] mt-1 block ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* Bottom Input Section */}
            <footer className="w-full border-t border-slate-200 bg-white py-4 px-4 md:px-10 sticky bottom-0 z-40">
                <div className="max-w-[960px] mx-auto w-full">
                    <div className="relative w-full group">
                        {isSessionActive ? (
                            <div className="w-full h-12 md:h-14 bg-white rounded-lg md:rounded-xl border border-blue-200 flex items-center px-4 justify-between focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all shadow-sm">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 h-full"
                                />
                                <div className="flex gap-2">
                                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50">
                                        <span className="material-symbols-outlined">attach_file</span>
                                    </button>
                                    <button
                                        onClick={handleSendMessage}
                                        className="text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-blue-50"
                                    >
                                        <span className="material-symbols-outlined">send</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-full h-12 md:h-14 bg-slate-100 rounded-lg md:rounded-xl border border-slate-200 flex items-center px-4 justify-between cursor-not-allowed opacity-80 select-none">
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <span className="material-symbols-outlined">lock</span>
                                        <span className="text-sm font-medium">Chat will enable automatically at {startTimeTime}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="material-symbols-outlined text-slate-300">attach_file</span>
                                        <span className="material-symbols-outlined text-slate-300">send</span>
                                    </div>
                                </div>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
                                    Please wait for the session to start
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ConsultationWaitingRoom;
