import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const PrivacySecurity = () => {
    // State for toggles
    const [aiAnalysis, setAiAnalysis] = useState(true);
    const [partnerComms, setPartnerComms] = useState(false);
    const [uniSharing, setUniSharing] = useState(true);

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc] relative">


            <div className="flex-1 overflow-y-auto p-3 md:p-8 flex justify-center">
                <div className="w-full max-w-[1000px] flex flex-col gap-6 md:gap-8 pb-20">

                    {/* Header Details */}
                    <div className="flex justify-between items-end border-b border-gray-200 pb-4 md:pb-6">
                        <div>
                            <h1 className="text-[#111418] text-xl md:text-3xl font-bold tracking-tight mb-2">Privacy & Security</h1>
                            <p className="text-slate-500 text-xs md:text-base max-w-2xl">Manage how your data is used, document permissions, and account security settings. Your privacy is paramount to EAOverseas.</p>
                        </div>
                        <div className="hidden sm:block">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                Account Secure
                            </span>
                        </div>
                    </div>

                    {/* Section 1: AI & Data Usage */}
                    <section className="flex flex-col gap-3 md:gap-4">
                        <h2 className="text-[#111418] text-base md:text-lg font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-600">smart_toy</span>
                            AI & Data Usage
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-100">
                            {/* AI Analysis */}
                            <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex flex-col gap-1 pr-4">
                                    <p className="text-[#111418] text-sm md:text-base font-semibold">AI Transcript Analysis</p>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xl">
                                        Allow our AI to analyze your academic transcripts to provide better university matching recommendations. Disabling this may reduce the accuracy of suggestions.
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                    <input
                                        type="checkbox"
                                        checked={aiAnalysis}
                                        onChange={(e) => setAiAnalysis(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            {/* Marketing */}
                            <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex flex-col gap-1 pr-4">
                                    <p className="text-[#111418] text-sm md:text-base font-semibold">Partner Communications</p>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xl">
                                        Receive optional offers and updates from our third-party education partners. Your email is never shared directly without your consent.
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                    <input
                                        type="checkbox"
                                        checked={partnerComms}
                                        onChange={(e) => setPartnerComms(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Document Visibility */}
                    <section className="flex flex-col gap-3 md:gap-4">
                        <h2 className="text-[#111418] text-base md:text-lg font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-600">folder_shared</span>
                            Document Visibility
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {/* Counselor Access */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                            <span className="material-symbols-outlined text-[20px]">group</span>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[#111418] text-sm font-semibold mb-1">Counselor Access</p>
                                            <p className="text-slate-500 text-xs mb-3">Who can view your uploaded financial documents?</p>
                                            <select className="block w-full rounded border-gray-300 text-sm text-[#111418] focus:border-blue-600 focus:ring-blue-600 shadow-sm bg-gray-50/50">
                                                <option>Only Me</option>
                                                <option selected>Assigned Counselor Only</option>
                                                <option>All Admins</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* University Sharing */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-purple-50 text-purple-600 rounded">
                                            <span className="material-symbols-outlined text-[20px]">school</span>
                                        </div>
                                        <div>
                                            <p className="text-[#111418] text-sm font-semibold mb-1">University Sharing</p>
                                            <p className="text-slate-500 text-xs mb-3">Auto-share validated materials with shortlisted universities.</p>
                                            <div className="flex items-center gap-2">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={uniSharing}
                                                        onChange={(e) => setUniSharing(e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    <span className="ml-3 text-sm font-medium text-[#111418]">Enabled</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Account Security */}
                    <section className="flex flex-col gap-3 md:gap-4">
                        <h2 className="text-[#111418] text-base md:text-lg font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-600">lock</span>
                            Account Security
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-100">
                            {/* Password */}
                            <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[#111418] text-sm md:text-base font-semibold">Password</p>
                                    <p className="text-slate-500 text-xs md:text-sm">Last changed 3 months ago</p>
                                </div>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm font-medium text-[#111418] hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-1 focus:ring-blue-600/20">
                                    Update Password
                                </button>
                            </div>
                            {/* 2FA */}
                            <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex flex-col gap-1 pr-4">
                                    <div className="flex items-center gap-2">
                                        <p className="text-[#111418] text-sm md:text-base font-semibold">Two-Factor Authentication</p>
                                        <span className="px-2 py-0.5 rounded bg-yellow-50 text-yellow-700 text-[10px] font-bold uppercase tracking-wider border border-yellow-100">Recommended</span>
                                    </div>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                                        Add an extra layer of security to your account by requiring a code when logging in from a new device.
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white border border-transparent rounded text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-1 focus:ring-blue-600">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Active Sessions */}
                    <section className="flex flex-col gap-3 md:gap-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-[#111418] text-base md:text-lg font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600">devices</span>
                                Active Sessions
                            </h2>
                            <button className="text-xs md:text-sm text-red-600 hover:text-red-700 font-medium hover:underline decoration-1 underline-offset-2">
                                Log out of all other devices
                            </button>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="py-2 px-3 md:py-3 md:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Device</th>
                                            <th className="py-2 px-3 md:py-3 md:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                            <th className="py-2 px-3 md:py-3 md:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Active</th>
                                            <th className="py-2 px-3 md:py-3 md:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {/* Current Session */}
                                        <tr className="group hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-3 md:py-4 md:px-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-slate-400">laptop_mac</span>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-[#111418]">Macbook Pro 14"</span>
                                                        <span className="text-xs text-green-600 font-medium">Current Session</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 md:py-4 md:px-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-3 rounded-sm bg-gradient-to-br from-blue-400 to-red-400"></div>
                                                    <span className="text-sm text-slate-500">London, UK</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 md:py-4 md:px-6 text-sm text-slate-500">
                                                Just now
                                            </td>
                                            <td className="py-3 px-3 md:py-4 md:px-6 text-right">
                                                {/* No action for current session */}
                                            </td>
                                        </tr>
                                        {/* Other Session */}
                                        <tr className="group hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-3 md:py-4 md:px-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-slate-400">smartphone</span>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-[#111418]">iPhone 13</span>
                                                        <span className="text-xs text-slate-500">Safari Mobile</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 md:py-4 md:px-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-3 rounded-sm bg-gradient-to-br from-blue-400 to-red-400"></div>
                                                    <span className="text-sm text-slate-500">London, UK</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 md:py-4 md:px-6 text-sm text-slate-500">
                                                2 days ago
                                            </td>
                                            <td className="py-3 px-3 md:py-4 md:px-6 text-right">
                                                <button className="text-sm text-slate-500 hover:text-red-600 font-medium transition-colors">Revoke</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Danger Zone */}
                    <section className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded border border-red-200 bg-red-50/50">
                            <div>
                                <h3 className="text-red-700 text-sm font-bold mb-1">Delete Account</h3>
                                <p className="text-red-600/80 text-xs">Permanently delete your account and all associated data. This action cannot be undone.</p>
                            </div>
                            <button className="whitespace-nowrap px-4 py-2 bg-white border border-red-200 text-red-600 rounded text-sm font-medium hover:bg-red-50 transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </section>

                    <footer className="mt-8 text-center">
                        <p className="text-xs text-slate-400">© 2026 EAOverseas. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default PrivacySecurity;
