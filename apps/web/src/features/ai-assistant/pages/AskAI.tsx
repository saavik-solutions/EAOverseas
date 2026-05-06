import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PageHeader from '@/components/layout/PageHeader';
import { generateAIResponse } from '@/features/ai-assistant/services/aiService';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';

const AskAI = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    // History State
    const [chatHistory, setChatHistory] = useState(() => {
        try {
            const saved = localStorage.getItem('aiChatHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    });
    const [showHistory, setShowHistory] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState(null);

    // Typing effect utility
    const typeText = (text, callback) => {
        let index = 0;
        let pText = "";
        setIsTyping(true);
        const intervalId = setInterval(() => {
            if (index < text.length) {
                pText += text.charAt(index);
                callback(pText);
                index++;
            } else {
                clearInterval(intervalId);
                setIsTyping(false);
            }
        }, 20); // Speed of typing
    };

    // Context
    const { userProfile } = useUserProfile();

    // History Utils defined before usage
    const saveCurrentSession = (msgs) => {
        if (!msgs || msgs.length === 0) return;

        const previewText = msgs[0].text.substring(0, 40) + '...';
        const timestamp = new Date().toLocaleDateString();

        let updatedHistory;

        if (currentSessionId) {
            // Update existing session
            updatedHistory = chatHistory.map(session =>
                session.id === currentSessionId
                    ? { ...session, messages: msgs, preview: previewText, date: timestamp }
                    : session
            );
            // If strictly updating, we don't change order? Or should we move to top?
            // For now, update in place is fine, or we could move to top.
            // Let's move to top to show recent activity.
            const currentSession = updatedHistory.find(s => s.id === currentSessionId);
            const others = updatedHistory.filter(s => s.id !== currentSessionId);
            updatedHistory = [currentSession, ...others];
        } else {
            // Create New Session
            const newId = Date.now();
            setCurrentSessionId(newId);
            const newEntry = {
                id: newId,
                date: timestamp,
                preview: previewText,
                messages: msgs
            };
            updatedHistory = [newEntry, ...chatHistory].slice(0, 10);
        }

        setChatHistory(updatedHistory);
        localStorage.setItem('aiChatHistory', JSON.stringify(updatedHistory));
    };

    const handleSend = async (text = inputValue) => {
        if (!text.trim()) return;

        const userMsg = { text: text, sender: 'user', timestamp: new Date() };
        const newMessages = [...messages, userMsg];

        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        // Save immediately
        saveCurrentSession(newMessages);

        try {
            // Construct system prompt with profile context
            const docsList = [
                ...userProfile.documents.academic.map(d => `- ${d.name} (Academic)`),
                ...userProfile.documents.financial.map(d => `- ${d.name} (Financial)`),
                ...userProfile.documents.identity.map(d => `- ${d.name} (Identity)`)
            ].join('\n');

            const systemContext = `
You are "Guide Buddy", the helpful AI assistant for the EAOverseas Platform.
Your goal is to help users navigate and use the features of THIS website.
You do NOT know about the outside world, general trivia, or features not listed below.

**PLATFORM CAPABILITIES (Your Knowledge Base):**
1.  **Dashboard** (/): Overview of their journey.
2.  **Course Finder** (/courses) & **College Finder** (/colleges): Search for universities and master's programs.
3.  **My Profile** (/profile): Users update their GPA, IELTS scores, and target countries here.
4.  **Documents** (/documents): Users MUST upload their Resume, SOP, LORs, and Transcripts here. You cannot "take" documents, only guide them to upload there.
5.  **Applications** (/applications): Track status of applied universities.
6.  **Accommodation** (/accommodation): Search for student housing.
7.  **Visa Prep** (/visas): Guides and checklists for visa applications.
8.  **Loans** (/loans): Check loan eligibility and requirements.
9.  **Consultant** (/consultant): Book 1:1 sessions with human experts.
10. **Community** (/community-feed): Discuss with other students.

**Current User Context:**
- Name: ${userProfile.identity.name}
- Academic Stats: ${userProfile.academics.degree}, GPA ${userProfile.academics.gpa}
- Goal: ${userProfile.preferences.countries.join(', ')}
- **Uploaded Documents**:
${docsList || "None"}

**STRICT RESPONSE RULES:**
- **Refuse** to answer questions unrelated to the platform or study abroad.
- **Don't Hallucinate**: If a feature doesn't exist, say so.
- **Check Documents**: If asked about documents, check the list above.
- **Provide Value THEN Guide**: If asked for recommendations (e.g. "Best MBBS colleges"), **First** list 3 specific top universities with their country and a quick "why". **Then**, tell them to use the **Course Finder** for the full list.
- **Use Markdown**: Bold page names and use lists.
- Keep it short and friendly.

**USER QUESTION:** "${text}"
            `.trim();

            // Pass the context + user question to the AI service
            const responseText = await generateAIResponse(systemContext);

            setIsLoading(false);

            const aiMsg = {
                text: '',
                sender: 'ai',
                timestamp: new Date()
            };

            // Don't save empty AI message immediately, wait for typeText
            setMessages(prev => [...prev, aiMsg]);

            // Start typing effect on the last message
            typeText(responseText, (currentText) => {
                setMessages(prev => {
                    const latestMessages = [...prev];
                    const lastMsg = latestMessages[latestMessages.length - 1];
                    if (lastMsg.sender === 'ai') {
                        lastMsg.text = currentText;
                    }

                    // We can choose to save periodically here or at the end
                    // But saving on every character is too expensive. 
                    // Let's just trust that the next user interaction or final will save.
                    // Or we can save once typing is done? 
                    // typeText manages state locally for rendering.
                    // Ideally we save when typing finishes.

                    return latestMessages;
                });
            });

            // Note: Saving the FINAL AI response to history is tricky with this typing effect 
            // because typeText is a closure. 
            // However, the useEffect below handles saving whenever messages change in state.
            // Since typing updates `messages` state 20 times a second, 
            // we should probably debounce the save or check if typing is false.
            // But for now, relying on the useEffect is acceptable if performance isn't terrible.

        } catch (error) {
            console.error("Error fetching AI response:", error);
            setIsLoading(false);
            const errorMsg = {
                text: "Sorry, something went wrong. Please check your connection.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => {
                const updated = [...prev, errorMsg];
                saveCurrentSession(updated); // Save error state too
                return updated;
            });
        }
    };

    // Auto-save useEffect
    // Warning: This runs on every character type-in because typeText updates messages.
    // To prevent performance kill, we should debounce or only save when not loading?
    // Actually, saveCurrentSession writes to localStorage. Doing this 50 times a second is bad.
    // Optimization: Only save if NOT typing? But isTyping state is updated properly?

    useEffect(() => {
        if (!isTyping && messages.length > 0) {
            const timeoutId = setTimeout(() => {
                saveCurrentSession(messages);
            }, 500); // Debounce saves by 500ms
            return () => clearTimeout(timeoutId);
        }
    }, [messages, isTyping, currentSessionId]);
    // Including currentSessionId to ensure we save to correct session if it switches.

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleNewChat = () => {
        // saveCurrentSession(messages); // Handled by useEffect logic mostly, but good to ensure.
        setCurrentSessionId(null);
        setMessages([]);
        setInputValue('');
        setIsLoading(false);
    };

    const loadSession = (session) => {
        setCurrentSessionId(session.id);
        setMessages(session.messages);
        setShowHistory(false);
    };

    const clearHistory = () => {
        setChatHistory([]);
        localStorage.removeItem('aiChatHistory');
        if (currentSessionId) setCurrentSessionId(null);
    };

    const deleteSession = (e, sessionId) => {
        e.stopPropagation();
        const updated = chatHistory.filter(session => session.id !== sessionId);
        setChatHistory(updated);
        localStorage.setItem('aiChatHistory', JSON.stringify(updated));
        if (currentSessionId === sessionId) {
            handleNewChat();
        }
    };

    const suggestions = [
        {
            icon: 'checklist',
            title: 'Am I eligible?',
            desc: 'Check eligibility for your shortlisted courses',
            color: 'blue'
        },
        {
            icon: 'map',
            title: 'Best Country?',
            desc: 'Which destination suits my profile best?',
            color: 'purple'
        },
        {
            icon: 'trending_up',
            title: 'Next Steps?',
            desc: 'What should I focus on right now?',
            color: 'emerald'
        },
        {
            icon: 'warning',
            title: 'Missing Docs?',
            desc: 'Scan my documents for missing files',
            color: 'amber'
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: { bg: 'bg-blue-50', text: 'text-blue-600', hoverBg: 'group-hover:bg-blue-600', border: 'hover:border-blue-200' },
            purple: { bg: 'bg-purple-50', text: 'text-purple-600', hoverBg: 'group-hover:bg-purple-600', border: 'hover:border-purple-200' },
            emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', hoverBg: 'group-hover:bg-emerald-600', border: 'hover:border-emerald-200' },
            amber: { bg: 'bg-amber-50', text: 'text-amber-600', hoverBg: 'group-hover:bg-amber-600', border: 'hover:border-amber-200' }
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden font-display relative">
            <div className="hidden lg:block">
                <PageHeader
                    title="AI Copilot"
                    actions={messages.length > 0 && (
                        <button
                            onClick={handleNewChat}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            New Chat
                        </button>
                    )}
                />
            </div>

            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none mix-blend-multiply"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none mix-blend-multiply"></div>

            <main className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-5xl mx-auto relative z-10 overflow-hidden">
                <div className={`w-full max-w-3xl flex flex-col gap-4 h-full transition-all duration-500 ${messages.length > 0 ? 'justify-between pb-2' : 'justify-center items-center'}`}>

                    {/* Hero Section - Only show when no messages and history NOT open */}
                    {messages.length === 0 && !showHistory && (
                        <div className="w-full flex flex-col items-center gap-6 animate-fade-in-up">
                            <div className="text-center flex flex-col items-center gap-3">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                    <span className="material-symbols-outlined text-sm">verified_user</span>
                                    <span>Analyzing Profile: John Doe</span>
                                </div>
                                <h1 className="text-slate-900 text-2xl md:text-5xl font-black tracking-tight leading-tight">
                                    Ask AI About Your <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Study Abroad Journey</span>
                                </h1>
                                <p className="text-slate-500 text-sm md:text-lg font-normal max-w-lg leading-relaxed px-4">
                                    uncover insights, check eligibility, and get personalized roadmaps leveraging
                                    <span className="font-semibold text-slate-700 mx-1">EAOverseas Intelligence</span>.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Chat Messages Area */}
                    {messages.length > 0 && (
                        <div className="flex-1 overflow-y-auto no-scrollbar w-full flex flex-col gap-4 py-2">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                                    <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : 'bg-white border border-slate-100 rounded-tl-none'
                                        }`}>
                                        <div className={`text-sm leading-relaxed ${msg.sender === 'user' ? 'text-white' : 'text-slate-700'}`}>
                                            <ReactMarkdown
                                                components={{
                                                    ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-1 space-y-0.5" {...props} />,
                                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-1 space-y-0.5" {...props} />,
                                                    li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                                                    p: ({ node, ...props }) => <p className="mb-1 last:mb-0" {...props} />,
                                                    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start animate-fade-in-up">
                                    <div className="bg-white border border-slate-100 rounded-xl rounded-tl-none p-3 shadow-sm flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Input Area (Fixed/Sticky behavior wrapper) */}
                    {/* Input Area (Fixed/Sticky behavior wrapper) */}
                    <div className="w-full relative group shrink-0 z-20">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative bg-white rounded-2xl shadow-lg border border-slate-100 p-1.5 flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-100"
                        >
                            <div className="flex items-start p-1 gap-2">
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent border-none focus:ring-0 text-slate-900 text-sm placeholder-slate-400 p-2 resize-none h-10 md:h-12 leading-relaxed scrollbar-hide"
                                    placeholder="Ask anything about courses..."
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl w-10 h-10 flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-lg shadow-blue-500/20 self-center"
                                >
                                    <span className="material-symbols-outlined text-xl">arrow_upward</span>
                                </button>
                            </div>

                            {/* Footer inside box */}
                            <div className="px-3 pb-1 pt-1 flex justify-between items-center bg-slate-50/50 mx-1 mb-0.5 rounded-lg border border-slate-100/50">
                                <div className="flex items-center gap-1.5">
                                    <span className="flex h-1.5 w-1.5 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                    </span>
                                    <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
                                        AI Agent Active
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    {messages.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleNewChat}
                                            className="text-[10px] text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-xs">add_comment</span>
                                            New Chat
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setShowHistory(true)}
                                        className="text-[10px] text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-xs">history</span>
                                        History
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Suggestion Chips */}
                    {messages.length === 0 && (
                        <div className="w-full flex flex-col gap-3 animate-fade-in-up">
                            <p className="text-slate-400 text-[10px] font-medium text-center uppercase tracking-widest text opacity-80">Or try asking...</p>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 w-full">
                                {suggestions.map((item, idx) => {
                                    const colors = getColorClasses(item.color);
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setInputValue(item.desc)}
                                            className={`flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 p-2.5 md:p-3 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all group relative overflow-hidden`}
                                        >
                                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-white to-transparent pointer-events-none`}></div>
                                            <div className={`${colors.bg} ${colors.text} rounded-lg p-1.5 ${colors.hoverBg} group-hover:text-white transition-all duration-300 shrink-0 shadow-sm group-hover:scale-110`}>
                                                <span className="material-symbols-outlined text-base md:text-lg">{item.icon}</span>
                                            </div>
                                            <div className="relative z-10 min-w-0">
                                                <h3 className={`text-slate-900 text-[11px] md:text-sm font-bold group-hover:text-blue-600 transition-colors leading-tight truncate`}>{item.title}</h3>
                                                <p className="text-slate-500 text-[9px] md:text-[10px] mt-0.5 leading-normal hidden md:block truncate">{item.desc}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className={`${messages.length > 0 ? 'hidden' : 'pt-2'} text-center`}>
                        <p className="text-slate-400 text-[9px] max-w-sm mx-auto leading-normal">
                            EAOverseas AI can make mistakes.
                        </p>
                    </div>

                </div>

                {/* History Modal */}
                {showHistory && (
                    <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col p-6 animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined">history</span>
                                Chat History
                            </h3>
                            <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            {chatHistory.length === 0 ? (
                                <div className="text-center text-slate-400 mt-10">
                                    <p>No previous chats found.</p>
                                </div>
                            ) : (
                                chatHistory.map((session) => (
                                    <div
                                        key={session.id}
                                        onClick={() => loadSession(session)}
                                        className="w-full p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-blue-400 transition-all shadow-sm group cursor-pointer relative"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{session.date}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => deleteSession(e, session.id)}
                                                    className="p-1 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-colors z-10"
                                                    title="Delete Chat"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                                <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-500 text-sm">arrow_forward</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-700 font-medium truncate pr-8">{session.preview}</p>
                                        <p className="text-slate-400 text-xs mt-1">{session.messages.length} messages</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {chatHistory.length > 0 && (
                            <button
                                onClick={clearHistory}
                                className="mt-4 w-full py-3 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors border border-transparent hover:border-red-100"
                            >
                                Clear History
                            </button>
                        )}
                    </div>
                )}
            </main >
        </div >
    );
};

export default AskAI;
