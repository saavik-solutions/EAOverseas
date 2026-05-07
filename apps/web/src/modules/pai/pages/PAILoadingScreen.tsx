import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PAILoadingScreen: React.FC = () => {
    const navigate = useNavigate();

    // Auto-navigate to report after 4 seconds to simulate "auditing"
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/pai/intelligence-report');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center animate-fade-in overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse delay-700 pointer-events-none"></div>

            {/* Core Scanner Element */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-48 h-48 mb-12">
                    {/* Outer Rotating Ring */}
                    <svg className="absolute inset-0 w-full h-full animate-[spin_4s_linear_infinite] opacity-50" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-400" strokeDasharray="10 5" />
                    </svg>

                    {/* Inner Rotating Ring (Reverse) */}
                    <svg className="absolute inset-4 w-40 h-40 animate-[spin_3s_linear_infinite_reverse]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" className="text-fuchsia-500" strokeDasharray="40 20" />
                    </svg>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-white animate-pulse">psychology</span>
                    </div>

                    {/* Scanning Line Overlay */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                        <div className="w-full h-1 bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                    </div>
                </div>

                <h2 className="font-['Manrope'] text-3xl font-extrabold text-white mb-4 tracking-tight">Auditing Your Profile</h2>

                {/* Simulated Logs */}
                <div className="h-12 flex flex-col items-center justify-center overflow-hidden">
                    <div className="animate-[slide-up_4s_ease-in-out]">
                        <p className="text-indigo-300 font-mono text-sm mb-2 text-center opacity-0 animate-[fade-in-out_1s_0s_forwards]">Synthesizing GitHub repository metrics...</p>
                        <p className="text-indigo-300 font-mono text-sm mb-2 text-center opacity-0 animate-[fade-in-out_1s_1s_forwards]">Cross-referencing LinkedIn endorsements...</p>
                        <p className="text-indigo-300 font-mono text-sm mb-2 text-center opacity-0 animate-[fade-in-out_1s_2s_forwards]">Evaluating academic standing vs. target universities...</p>
                        <p className="text-green-400 font-mono text-sm mb-2 text-center opacity-0 animate-[fade-in-out_1s_3s_forwards]">Generating smart actionable roadmap...</p>
                    </div>
                </div>

                <div className="mt-8 w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 animate-[progress_4s_linear_forwards]"></div>
                </div>
            </div>

            {/* Custom Animations required for this screen */}
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    50% { transform: translateY(200px); }
                    100% { transform: translateY(-100%); }
                }
                @keyframes slide-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-120px); }
                }
                @keyframes fade-in-out {
                    0% { opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { opacity: 0; }
                }
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default PAILoadingScreen;
