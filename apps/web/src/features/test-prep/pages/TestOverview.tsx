import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useNavigate } from 'react-router-dom';

const TestOverview = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState('listening');
    const [rulesAccepted, setRulesAccepted] = useState(false);

    const sections = [
        { id: 'listening', icon: 'headset', title: 'Listening', sub: '40 Qs • Audio Response', time: '30m', path: '/test-prep/listening' },
        { id: 'reading', icon: 'menu_book', title: 'Reading', sub: '40 Qs • 3 Passages', time: '60m', path: '#' },
        { id: 'writing', icon: 'edit_note', title: 'Writing', sub: '2 Tasks • Essay', time: '60m', path: '#' },
        { id: 'speaking', icon: 'mic', title: 'Speaking', sub: 'Interview based • Interaction', time: '30m', path: '/test-prep/speaking' }
    ];

    const handleStart = () => {
        if (!rulesAccepted) return;
        const section = sections.find(s => s.id === selectedSection);
        if (section && section.path !== '#') {
            navigate(section.path);
        } else {
            alert("This section is effectively coming soon!");
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full relative overflow-hidden font-display mesh-gradient text-slate-900">
            {/* ... styles ... */}
            <style>{`
                /* ... existing styles ... */
                @keyframes pulse-scan {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.05); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                .animate-scan {
                    animation: pulse-scan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .animate-float {
                    animation: float 10s ease-in-out infinite;
                }
                .mesh-gradient {
                    background-color: #ffffff;
                    background-image: 
                        radial-gradient(at 0% 0%, hsla(225, 100%, 40%, 0.15) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, hsla(210, 20%, 50%, 0.1) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, hsla(225, 100%, 30%, 0.1) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, hsla(210, 15%, 45%, 0.15) 0px, transparent 50%);
                }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.65);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
                }
                .glow-bullet {
                    box-shadow: 0 0 10px rgba(43, 108, 238, 0.6);
                }
                .status-card {
                    background: rgba(255, 255, 255, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    backdrop-filter: blur(10px);
                }
            `}</style>

            {/* ... Background Elements ... */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-40 right-20 w-48 h-48 bg-indigo-900/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-slate-500/20 rounded-lg blur-xl animate-float" style={{ animationDelay: '-5s' }}></div>
                <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-white/20 rounded-full animate-float" style={{ animationDelay: '-7s' }}></div>
            </div>

            <PageHeader title={null} breadcrumbs={[{ label: 'Test Prep', link: '/test-prep' }, { label: 'Test Overview' }]} />

            <main className="flex-1 overflow-y-auto relative z-10 p-6 scrollbar-hide flex flex-col justify-center min-h-[calc(100vh-64px)]">
                <div className="max-w-[1400px] mx-auto w-full pb-12">

                    <div className="glass-panel rounded-[2rem] overflow-hidden relative border-white/50 mb-6 w-full shadow-xl">

                        {/* Header Section: Horizontal Layout */}
                        <div className="p-8 bg-gradient-to-b from-white/30 to-transparent border-b border-white/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                            <div className="max-w-3xl">
                                <h1 className="font-serif text-slate-900 text-3xl font-bold leading-tight mb-2">IELTS Academic - Full Mock Exam</h1>
                                <p className="text-slate-500 text-sm font-light">Prepare for your global future. Review structure and regulations.</p>
                            </div>
                            {/* Horizontal Stats - Kept Same */}
                            <div className="flex items-center gap-6 md:gap-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-600/10 rounded-xl text-blue-600">
                                        <span className="material-symbols-outlined text-2xl">timer</span>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-indigo-900 leading-none">165 <span className="text-xs font-medium text-slate-400">mins</span></p>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Duration</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-slate-300 hidden md:block"></div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600">
                                        <span className="material-symbols-outlined text-2xl">layers</span>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-indigo-900 leading-none">4 <span className="text-xs font-medium text-slate-400">Parts</span></p>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Sections</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-slate-300 hidden md:block"></div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600">
                                        <span className="material-symbols-outlined text-2xl">quiz</span>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-indigo-900 leading-none">80 <span className="text-xs font-medium text-slate-400">Q's</span></p>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 grid lg:grid-cols-12 gap-8 lg:gap-12">
                            {/* Exam Structure - Wider / Grid */}
                            <div className="lg:col-span-7">
                                <h2 className="text-indigo-900 text-lg font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600 text-lg">account_tree</span>
                                    </span>
                                    Exam Modules
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {sections.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group flex justify-between items-center p-4 glass-panel rounded-xl shadow-sm border border-white/60"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 transition-colors">
                                                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-slate-800">{item.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-sm px-2 py-1 rounded-md bg-blue-50 text-blue-600">{item.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Test Rules - Compact List */}
                            <div className="lg:col-span-5 bg-blue-600/5 rounded-2xl p-6 border border-blue-600/10">
                                <h2 className="text-indigo-900 text-lg font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600 text-lg">verified_user</span>
                                    </span>
                                    Rules & Navigation
                                </h2>
                                <ul className="space-y-4">
                                    {[
                                        { title: 'Strict Time Discipline', desc: 'No pauses once timer commences.' },
                                        { title: 'Instant Data Lock', desc: 'Auto-sync active. Expiry = Submission.' },
                                        { title: 'Focus Protection', desc: 'No tab switching allowed.' },
                                        { title: 'Linear Navigation', desc: 'Review answers before next section.' },
                                    ].map((rule, idx) => (
                                        <li key={idx} className="flex gap-3 group items-start">
                                            <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 glow-bullet"></div>
                                            <p className="text-xs leading-relaxed text-slate-600">
                                                <span className="font-bold text-slate-900 mr-1">{rule.title}:</span>
                                                {rule.desc}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Footer / Action */}
                        <div className="p-6 border-t border-white/40 bg-white/30 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3 px-4 py-2 glass-panel rounded-full border-blue-600/20">
                                <input
                                    className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 accent-blue-600 cursor-pointer"
                                    id="agree-rules"
                                    type="checkbox"
                                    checked={rulesAccepted}
                                    onChange={(e) => setRulesAccepted(e.target.checked)}
                                />
                                <label className="text-xs font-semibold text-indigo-900 cursor-pointer select-none" htmlFor="agree-rules">I acknowledge the exam rules</label>
                            </div>

                            <div className="flex items-center gap-4">
                                <button onClick={() => navigate(-1)} className="px-6 py-2.5 glass-panel border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-white transition-all hover:scale-105 active:scale-95">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleStart}
                                    disabled={!rulesAccepted}
                                    className={`px-8 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 ${rulesAccepted ? 'cursor-pointer hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed grayscale'}`}
                                >
                                    Start Full Exam
                                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Status Cards - Compact Horizontal */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        {[
                            { title: 'Network Check', val: 'Latency: 24ms', icon: 'network_check', color: 'emerald', delay: '0s' },
                            { title: 'Audio Check', val: 'Input/Output Active', icon: 'graphic_eq', color: 'blue', delay: '0.5s' },
                        ].map((stat, idx) => (
                            <div key={idx} className="glass-panel flex-1 min-w-[200px] max-w-[300px] p-3 rounded-xl flex items-center gap-3 hover:bg-white/50 transition-colors">
                                <div className={`p-2 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                                    <span className="material-symbols-outlined text-lg">{stat.icon}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs text-indigo-900">{stat.title}</h4>
                                    <p className="text-[10px] text-slate-500 font-medium">{stat.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TestOverview;
