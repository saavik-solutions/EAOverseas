import React from 'react';
import { Outlet, useLocation, useSearchParams, Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';

const ApplicationLayout = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const uniName = searchParams.get('university') || 'University';
    const courseName = searchParams.get('title');

    // Determine current step based on path
    const getCurrentStep = () => {
        const path = location.pathname;
        if (path.includes('details')) return 1;
        if (path.includes('academic')) return 2;
        if (path.includes('documents')) return 3;
        if (path.includes('payment')) return 4;
        if (path.includes('review')) return courseName ? 4 : 5;
        return 1;
    };

    const currentStep = getCurrentStep();

    const renderStepperItem = (stepNum, label) => {
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;

        let circleClass = "bg-gray-100 text-gray-400 ring-white";
        let labelClass = "text-gray-400 font-medium";
        let icon = <span className="text-xs md:text-sm font-bold">{stepNum}</span>;

        if (isActive) {
            circleClass = "bg-blue-600 text-white ring-blue-50";
            labelClass = "text-blue-600 font-bold";
        } else if (isCompleted) {
            circleClass = "bg-green-500 text-white ring-white";
            labelClass = "text-green-700 font-medium";
            icon = <span className="material-symbols-outlined !text-[18px]">check</span>;
        }

        return (
            <div className="flex flex-col items-center gap-1 md:gap-2 bg-surface px-1 md:px-2 z-10">
                <div className={`size-6 md:size-8 rounded-full flex items-center justify-center ring-2 md:ring-4 transition-all ${circleClass}`}>
                    {icon}
                </div>
                <span className={`text-[10px] md:text-xs text-center ${labelClass}`}>{stepNum}. {label}</span>
            </div>
        );
    };

    return (
        <div className="flex h-screen w-full bg-background-light overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1 h-full overflow-hidden">
                {/* Header */}
                <header className="h-14 md:h-16 border-b border-gray-200 bg-surface-light flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
                    <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                        <Link to="/" className="hover:text-blue-600 transition-colors">
                            <span className="material-symbols-outlined !text-[18px]">home</span>
                        </Link>
                        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>

                        {courseName ? (
                            <>
                                <Link to="/courses" className="hover:text-blue-600 cursor-pointer transition-colors">Courses</Link>
                                <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                                <Link
                                    to={`/course-details?title=${encodeURIComponent(courseName)}&university=${encodeURIComponent(uniName || '')}`}
                                    className="hover:text-blue-600 cursor-pointer transition-colors max-w-[150px] truncate"
                                    title={courseName}
                                >
                                    {courseName}
                                </Link>
                                <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                                <span className="text-gray-900 font-medium whitespace-nowrap">Course Application</span>
                            </>
                        ) : (
                            <>
                                <Link to="/colleges" className="hover:text-blue-600 cursor-pointer transition-colors">Universities</Link>
                                <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                                <Link
                                    to={`/college-details?name=${encodeURIComponent(uniName || '')}`}
                                    className="hover:text-blue-600 cursor-pointer transition-colors max-w-[150px] truncate"
                                    title={uniName}
                                >
                                    {uniName}
                                </Link>
                                <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                                <span className="text-gray-900 font-medium whitespace-nowrap">University Application</span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                            <span className="material-symbols-outlined !text-[16px]">school</span>
                            <span>Applying to {uniName}</span>
                            {courseName && <span className="font-bold border-l border-blue-200 pl-2 ml-1">{courseName}</span>}
                        </div>
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-background-light p-4 md:p-8">
                    <div className="max-w-4xl mx-auto flex flex-col gap-4 md:gap-8">
                        {/* Stepper */}
                        <div className="w-full bg-surface-light border border-gray-200 rounded-lg p-3 md:p-4 shadow-sm mb-4 md:mb-6">
                            <div className="flex items-center justify-between relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-100 -z-0"></div>
                                {renderStepperItem(1, 'Details')}
                                {renderStepperItem(2, 'Academic')}
                                {renderStepperItem(3, 'Documents')}
                                {!courseName && renderStepperItem(4, 'Payment')}
                                {renderStepperItem(courseName ? 4 : 5, 'Review')}
                            </div>
                        </div>

                        {/* Page Content */}
                        <Outlet context={{ uniName, courseName }} />

                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pb-4">
                            <span className="material-symbols-outlined !text-[14px]">lock</span>
                            Your information is securely encrypted and stored.
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ApplicationLayout;
