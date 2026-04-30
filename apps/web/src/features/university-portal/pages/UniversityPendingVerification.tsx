import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.jpg';

const UniversityPendingVerification = () => {
    const navigate = useNavigate();
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'submitting', 'success'

    useEffect(() => {
        if (submitStatus === 'success') {
            const timer = setTimeout(() => {
                setShowSupportModal(false);
                setSubmitStatus('idle');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);

    const handleSupportSubmit = (e) => {
        e.preventDefault();
        setSubmitStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setSubmitStatus('success');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white font-['Public Sans'] transition-colors duration-200 relative">
            {/* Header - Same as UniversityVerification */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="w-full px-6 h-20 flex items-center">
                    <img src={logo} alt="EAOverseas Logo" className="h-12 mix-blend-multiply" />
                </div>
            </header>

            <main className={`flex flex-1 justify-center py-12 px-4 ${showSupportModal ? 'blur-sm pointer-events-none' : ''} transition-all duration-200`}>
                <div className="max-w-[840px] w-full flex flex-col gap-8">
                    {/* Page Heading */}
                    <div className="flex flex-col gap-2 text-center items-center">
                        <span className="px-3 py-1 bg-[#2b6cee]/10 text-[#2b6cee] text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-[#2b6cee] animate-pulse"></span>
                            Verification in Progress
                        </span>
                        <h1 className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mt-2">
                            Your university account is under review
                        </h1>
                        <p className="text-[#616f89] dark:text-gray-400 text-lg max-w-xl">
                            Welcome to EAOverseas. Our team is currently verifying your institution's credentials to ensure the highest quality of partners on our platform.
                        </p>
                    </div>

                    {/* Main Status Card */}
                    <div className="bg-white dark:bg-[#1a212e] rounded-xl shadow-xl overflow-hidden border border-[#dbdfe6] dark:border-[#2d323c]">
                        {/* Hero Banner inside Card */}
                        <div className="h-32 w-full bg-[#2b6cee]/10 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2b6cee 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                            <div className="relative flex flex-col items-center">
                                <span className="material-symbols-outlined text-6xl text-[#2b6cee] mb-2">fact_check</span>
                                <div className="text-[#2b6cee] font-bold">Estimated Time: 24-48 Hours</div>
                            </div>
                        </div>
                        <div className="p-8">
                            {/* Verification Checklist */}
                            <div className="mb-10">
                                <h3 className="text-[#111318] dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2b6cee]">rule</span>
                                    What We Are Reviewing
                                </h3>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between py-4 border-b border-[#f0f2f4] dark:border-[#2d323c]">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[#616f89]">language</span>
                                            <p className="text-[#111318] dark:text-white font-medium">Official University Website</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#2b6cee] font-semibold text-sm">
                                            <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                                            Pending
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b border-[#f0f2f4] dark:border-[#2d323c]">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[#616f89]">verified_user</span>
                                            <p className="text-[#111318] dark:text-white font-medium">Accreditation Documents Validation</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#2b6cee] font-semibold text-sm">
                                            <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                                            Pending
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[#616f89]">alternate_email</span>
                                            <p className="text-[#111318] dark:text-white font-medium">Official Domain Email Verification</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#2b6cee] font-semibold text-sm">
                                            <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                                            Pending
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comparison Sections */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#f0f2f4] dark:border-[#2d323c]">
                                {/* Allowed Actions */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#616f89] mb-4">What You Can Do Now</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-green-500 text-xl">check_circle</span>
                                            <div>
                                                <p className="text-[#111318] dark:text-white font-semibold text-sm">Complete University Bio</p>
                                                <p className="text-xs text-[#616f89]">Draft your institution's description and history.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-green-500 text-xl">check_circle</span>
                                            <div>
                                                <p className="text-[#111318] dark:text-white font-semibold text-sm">Upload Campus Media</p>
                                                <p className="text-xs text-[#616f89]">Add high-quality photos and video tours.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <button className="text-[#2b6cee] text-sm font-bold flex items-center gap-1 hover:underline">
                                                Go to Profile Setup <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                {/* Restricted Actions */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#616f89] mb-4">What You Cannot Do Yet</h4>
                                    <ul className="space-y-4 opacity-50">
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-gray-400 text-xl">lock</span>
                                            <div>
                                                <p className="text-[#111318] dark:text-white font-semibold text-sm">Publish Course Catalog</p>
                                                <p className="text-xs text-[#616f89]">Visibility is restricted until verification.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-gray-400 text-xl">lock</span>
                                            <div>
                                                <p className="text-[#111318] dark:text-white font-semibold text-sm">Accept Applications</p>
                                                <p className="text-xs text-[#616f89]">Admissions portal will be activated later.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-gray-400 text-xl">lock</span>
                                            <div>
                                                <p className="text-[#111318] dark:text-white font-semibold text-sm">Contact Prospective Students</p>
                                                <p className="text-xs text-[#616f89]">Direct messaging requires an approved status.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="bg-[#f6f6f8] dark:bg-[#151b27] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#616f89]">notifications_active</span>
                                <p className="text-sm text-[#616f89] dark:text-gray-400 font-medium">
                                    Click on <Link to="/profile-setup/basic" className="text-[#2b6cee] font-bold hover:underline">Profile Setup</Link> to build your profile while we are reviewing your data. We'll send an email to <span className="text-[#111318] dark:text-white font-bold">registrar@university.edu</span> when ready.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowSupportModal(true)}
                                className="bg-white dark:bg-[#1a212e] border border-[#dbdfe6] dark:border-[#2d323c] px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>

                    <footer className="text-center py-6">
                        <p className="text-sm text-[#616f89]">© 2024 EAOverseas Global Education Network. All rights reserved.</p>
                    </footer>
                </div>
            </main>

            {/* Support Modal */}
            {showSupportModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-[#101622]/70 backdrop-blur-[4px]" onClick={() => setShowSupportModal(false)}></div>
                    <div className="relative w-full max-w-[520px] bg-white dark:bg-[#1a212e] rounded-[24px] shadow-2xl overflow-hidden border border-transparent dark:border-[#2d323c] animate-in fade-in zoom-in duration-300">

                        {submitStatus === 'success' ? (
                            // Success View
                            <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="px-8 py-12 w-full flex flex-col items-center">
                                    <div className="size-20 bg-[#2b6cee]/10 rounded-full flex items-center justify-center mb-6">
                                        <div className="size-12 bg-[#2b6cee] rounded-full flex items-center justify-center shadow-lg shadow-[#2b6cee]/30">
                                            <span className="material-symbols-outlined text-white text-3xl font-bold">check</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#111318] dark:text-white mb-2">Request Sent Successfully</h3>

                                    <p className="text-[#616f89] dark:text-gray-400 mb-8 max-w-[80%] leading-relaxed">
                                        Your ticket <span className="text-[#111318] dark:text-white font-bold">#EAO-8892</span> has been created.<br />
                                        A confirmation email has been sent to <span className="text-[#2b6cee] font-semibold">registrar@university.edu</span>.
                                    </p>

                                    <button
                                        onClick={() => {
                                            setShowSupportModal(false);
                                            setSubmitStatus('idle'); // Reset for next time
                                        }}
                                        className="w-full bg-[#2b6cee] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#2b6cee]/20 transition-all transform active:scale-[0.98]"
                                    >
                                        Back to Dashboard
                                    </button>

                                    <p className="text-xs text-[#616f89] mt-6">Typically responds within 24 hours.</p>
                                </div>

                                <div className="w-full bg-[#f6f6f8] dark:bg-[#151b27] py-4 border-t border-[#f0f2f4] dark:border-[#2d323c] flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[#616f89] text-lg">receipt_long</span>
                                    <span className="text-[10px] font-bold tracking-widest text-[#616f89] uppercase">Reference ID: 8892-XP-2024</span>
                                </div>
                            </div>
                        ) : (
                            // Form View
                            <>
                                <div className="flex items-center justify-between px-8 py-6 border-b border-[#f0f2f4] dark:border-[#2d323c]">
                                    <h3 className="text-xl font-bold text-[#111318] dark:text-white tracking-tight">Contact Partner Support</h3>
                                    <button
                                        onClick={() => setShowSupportModal(false)}
                                        className="text-[#616f89] hover:text-[#111318] dark:hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-2xl">close</span>
                                    </button>
                                </div>
                                <div className="px-8 py-8">
                                    <form className="space-y-6" onSubmit={handleSupportSubmit}>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-[#111318] dark:text-gray-200">Inquiry Category</label>
                                            <div className="relative">
                                                <select className="w-full bg-[#f6f6f8] dark:bg-[#2d323c] border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2b6cee] appearance-none cursor-pointer">
                                                    <option>Verification Status</option>
                                                    <option>Document Help</option>
                                                    <option>Technical Issue</option>
                                                    <option>General Inquiry</option>
                                                </select>
                                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#616f89]">expand_more</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-[#111318] dark:text-gray-200">Message</label>
                                            <textarea className="w-full bg-[#f6f6f8] dark:bg-[#2d323c] border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2b6cee] placeholder:text-[#616f89]/60 resize-none" placeholder="Describe your query in detail..." rows="5" required></textarea>
                                        </div>
                                        <div>
                                            <button className="flex items-center gap-2 text-[#2b6cee] font-bold text-sm hover:text-blue-700 transition-colors" type="button">
                                                <span className="material-symbols-outlined text-xl">attach_file</span>
                                                Attach Documents
                                            </button>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-[#2b6cee]/5 rounded-xl border border-[#2b6cee]/10">
                                            <span className="material-symbols-outlined text-[#2b6cee] text-xl mt-0.5">info</span>
                                            <p className="text-xs text-[#616f89] dark:text-gray-400 leading-relaxed">
                                                Our team usually responds within <span className="text-[#2b6cee] font-bold">24 hours</span> to your official email. Please ensure your registered inbox is accessible.
                                            </p>
                                        </div>
                                        <button
                                            className="w-full bg-[#2b6cee] hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#2b6cee]/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                                            type="submit"
                                            disabled={submitStatus === 'submitting'}
                                        >
                                            {submitStatus === 'submitting' ? (
                                                <>
                                                    <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                                                    Sending Request...
                                                </>
                                            ) : (
                                                'Submit Request'
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UniversityPendingVerification;
