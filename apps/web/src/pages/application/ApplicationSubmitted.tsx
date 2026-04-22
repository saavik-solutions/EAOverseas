import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const ApplicationSubmitted = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const uniName = searchParams.get('university') || 'University';
    const courseName = searchParams.get('title');
    const [timeLeft, setTimeLeft] = useState(5);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate(courseName ? '/courses' : '/colleges');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, courseName]);

    return (
        <div className="flex h-screen w-full bg-background-light overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex flex-col flex-1 h-full overflow-hidden">
                <header className="h-16 border-b border-gray-200 bg-surface-light flex items-center justify-between px-6 shrink-0 z-10">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Link to="/" className="hover:text-blue-600 transition-colors">
                            <span className="material-symbols-outlined !text-[18px]">home</span>
                        </Link>
                        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                        <span className="text-gray-900 font-medium">Submission Success</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-background-light p-6 md:p-8 flex flex-col items-center justify-center">
                    <div className="w-full max-w-xl text-center">
                        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-green-50 mb-8 shadow-sm">
                            <div className="size-16 rounded-full bg-green-400 text-white flex items-center justify-center shadow-md">
                                <span className="material-symbols-outlined !text-[40px] font-bold">check</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Application submitted successfully!</h1>

                        <p className="text-slate-500 text-lg leading-relaxed mb-4">
                            Your application for <span className="font-bold text-slate-800">{courseName || 'Admission'}</span> at <span className="font-bold text-slate-800">{uniName}</span> has been sent to our review team.
                        </p>

                        <p className="text-sm text-slate-400 mb-8">
                            Redirecting to {courseName ? 'Courses' : 'Universities'} in <span className="font-semibold text-blue-600">{timeLeft}</span> seconds...
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto w-full">
                            <Link
                                to="/dashboard"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all font-semibold text-base"
                            >
                                Go to Dashboard
                            </Link>
                            <Link
                                to={courseName ? "/courses" : "/colleges"}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-base"
                            >
                                Browse More {courseName ? 'Courses' : 'Universities'}
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ApplicationSubmitted;
