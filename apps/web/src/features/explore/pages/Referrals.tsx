import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';

const Referrals = () => {
    const [referralCode] = useState('ALEX2024');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform) => {
        // Mock share functionality
        console.log(`Sharing via ${platform}`);
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            <PageHeader title={
                <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Link to="/profile" className="md:hidden text-slate-500 hover:text-blue-600 mr-1 flex items-center">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </Link>
                    <Link to="/profile" className="hidden md:flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px] md:text-[20px]">home</span>
                    </Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <Link to="/profile" className="hidden md:block text-gray-500 hover:text-blue-600 transition-colors">
                        Profile
                    </Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <span className="text-[#111418] font-semibold">Referrals</span>
                </div>
            } />

            <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">

                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-12 text-white relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                        <div className="relative z-10 max-w-lg">
                            <h1 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">Invite Friends & <br />Earn Rewards</h1>
                            <p className="text-blue-100 text-lg mb-8 leading-relaxed">Share your unique code with friends. They get a discount on their first application, and you earn credit towards yours!</p>

                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 flex flex-col sm:flex-row items-center gap-2">
                                <div className="flex-1 w-full sm:w-auto text-center sm:text-left px-4">
                                    <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold block mb-0.5">Your Referral Code</span>
                                    <span className="text-xl font-mono font-bold tracking-wide">{referralCode}</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="w-full sm:w-auto bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-[20px]">{copied ? 'check' : 'content_copy'}</span>
                                    {copied ? 'Copied!' : 'Copy Code'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                                <span className="material-symbols-outlined text-[24px]">group_add</span>
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Invites</p>
                                <p className="text-[#111418] text-2xl font-bold">0</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-full">
                                <span className="material-symbols-outlined text-[24px]">person_check</span>
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Successful</p>
                                <p className="text-[#111418] text-2xl font-bold">0</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
                                <span className="material-symbols-outlined text-[24px]">savings</span>
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Earnings</p>
                                <p className="text-[#111418] text-2xl font-bold">$0</p>
                            </div>
                        </div>
                    </div>

                    {/* How It Works & History Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                        {/* How It Works */}
                        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit">
                            <h3 className="font-bold text-[#111418] mb-6 text-lg">How it works</h3>
                            <div className="flex flex-col gap-6 relative">
                                {/* Connecting Line */}
                                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

                                <div className="flex gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold text-[#111418] text-sm mb-1">Invite Friends</h4>
                                        <p className="text-slate-500 text-xs leading-relaxed">Share your unique link via WhatsApp, Email, or Social Media.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold text-[#111418] text-sm mb-1">They Sign Up</h4>
                                        <p className="text-slate-500 text-xs leading-relaxed">Your friend creates an account using your referral code.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm shrink-0">3</div>
                                    <div>
                                        <h4 className="font-bold text-[#111418] text-sm mb-1">You Both Earn</h4>
                                        <p className="text-slate-500 text-xs leading-relaxed">Get $50 credit each when they complete their first application.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Share via</p>
                                <div className="flex gap-2">
                                    <button onClick={() => handleShare('whatsapp')} className="flex-1 py-2 bg-[#25D366]/10 text-[#25D366] rounded-lg hover:bg-[#25D366]/20 transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                                        WhatsApp
                                    </button>
                                    <button onClick={() => handleShare('email')} className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                                        Email
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Referral History */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-[#111418] text-lg">Referral History</h3>
                                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">User</th>
                                            <th className="px-6 py-4 font-semibold">Date</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold text-right">Reward</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {/* No referrals yet for new user */}
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-500 italic">
                                                No referrals yet. Invite your friends to start earning!
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Referrals;
