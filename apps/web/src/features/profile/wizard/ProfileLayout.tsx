import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const ProfileLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();

    const steps = [
        { id: 'basic', label: 'Basic Info', path: '/profile-setup/basic', number: 1 },
        { id: 'education', label: 'Education', path: '/profile-setup/education', number: 2 },
        { id: 'goals', label: 'Goals', path: '/profile-setup/goals', number: 3 },
    ];

    const getCurrentStepIndex = () => {
        if (currentPath === 'completed') return 4;
        const index = steps.findIndex(step => location.pathname.includes(step.id));
        return index !== -1 ? index + 1 : 1;
    };

    const currentStep = getCurrentStepIndex();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gray-50 font-display">
            <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 md:hidden">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0d6cf2]">school</span>
                        <span className="font-bold text-slate-900">EAOverseas</span>
                    </div>
                    <button className="p-2 text-slate-600">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>

                {/* Desktop Header */}
                <div className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#0d6cf2]/10 rounded-lg flex items-center justify-center size-8 text-[#0d6cf2]">
                            <span className="material-symbols-outlined text-[20px]">school</span>
                        </div>
                        <span className="font-bold text-slate-900">EAOverseas</span>
                    </div>
                </div>

                <div className="w-full max-w-5xl mx-auto p-6 md:p-10 lg:p-14 flex flex-col gap-8">
                    {/* Dynamic Header Text based on Step */}
                    {currentPath !== 'completed' && (
                        <header className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                {currentPath === 'basic' && (
                                    <>
                                        <h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-tight">Let's build your AI Profile.</h1>
                                        <p className="text-slate-500 text-base md:text-lg max-w-2xl">Please provide accurate details so our AI can match you with the best universities tailored to your background.</p>
                                    </>
                                )}
                                {currentPath === 'education' && (
                                    <>
                                        <h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-tight">Education Details</h1>
                                        <p className="text-slate-500 text-base md:text-lg max-w-2xl">Enter your educational background to help us find programs that match your qualifications.</p>
                                    </>
                                )}
                                {currentPath === 'goals' && (
                                    <>
                                        <h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-tight">Set your Goals &amp; Preferences.</h1>
                                        <p className="text-slate-500 text-base md:text-lg max-w-2xl">Tell us what matters most to you. This helps our AI refine university and program recommendations specifically for your needs.</p>
                                    </>
                                )}
                            </div>

                            {/* Progress Bar */}
                            <div className="flex items-center gap-3 py-2 flex-wrap">
                                {steps.map((step, index) => {
                                    const isActive = currentStep === step.number;
                                    const isCompleted = currentStep > step.number;

                                    return (
                                        <React.Fragment key={step.id}>
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors
                                                ${isActive ? 'bg-[#0d6cf2] text-white ring-1 ring-[#0d6cf2] border-transparent' :
                                                    isCompleted ? 'bg-green-50 text-green-700 border-green-200' :
                                                        'bg-white text-slate-500 border-slate-200'}
                                            `}>
                                                {isCompleted ? (
                                                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                                                ) : (
                                                    <span className={`text-xs font-bold size-5 flex items-center justify-center rounded-full ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
                                                        {step.number}
                                                    </span>
                                                )}
                                                <span className="text-sm font-medium">{step.label}</span>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`w-8 h-px ${isCompleted ? 'bg-green-500/30' : 'bg-slate-300'}`}></div>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </header>
                    )}

                    {/* Content Section */}
                    <Outlet />

                    {currentPath !== 'completed' && (
                        <div className="text-center text-xs text-slate-400 pb-8">
                            © 2024 EAOverseas Inc. • <a className="hover:underline" href="#">Privacy Policy</a> • <a className="hover:underline" href="#">Terms of Service</a>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProfileLayout;
