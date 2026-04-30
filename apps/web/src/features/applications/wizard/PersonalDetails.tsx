import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PersonalDetails = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleNext = () => {
        navigate(`/application/academic?${searchParams.toString()}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Form Header */}
            <div className="border-b border-slate-100 p-4 md:p-8 pb-4 md:pb-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                                <span className="material-symbols-outlined !text-[18px]">verified_user</span>
                        </span>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Let's get to know you</h1>
                    </div>
                    <p className="text-slate-500 text-sm max-w-2xl pl-12 hidden md:block">
                        Please fill in your details exactly as they appear on your official documents. This helps our AI match you with the right universities.
                    </p>
                    <p className="text-slate-500 text-xs md:hidden pl-0 mt-1">
                        Please fill in your details exactly as they appear on your official documents.
                    </p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="p-4 pt-4 md:p-8 md:pt-6 flex flex-col gap-6 md:gap-8">
                {/* Full Name Section */}
                <div className="grid gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">badge</span>
                            <input
                                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400 outline-none transition-all"
                                placeholder="Enter your full name as per passport"
                                type="text"
                            />
                        </div>
                        <span className="text-xs text-slate-500">Must match your passport exactly to avoid visa issues later.</span>
                    </label>
                </div>

                {/* Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">mail</span>
                            <input
                                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400 outline-none transition-all"
                                placeholder="student@example.com"
                                type="email"
                            />
                        </div>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Mobile Number <span className="text-red-500">*</span></span>
                        <div className="flex gap-3">
                            <select className="w-24 pl-3 pr-8 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none appearance-none cursor-pointer">
                                <option>+91</option>
                                <option>+1</option>
                                <option>+44</option>
                                <option>+971</option>
                            </select>
                            <input
                                className="flex-1 px-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400 outline-none transition-all"
                                placeholder="98765 43210"
                                type="tel"
                            />
                        </div>
                    </label>
                </div>

                {/* Demographics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Date of Birth <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">calendar_today</span>
                            <input
                                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400 outline-none transition-all appearance-none"
                                type="date"
                            />
                        </div>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Nationality <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">public</span>
                            <select className="w-full pl-12 pr-10 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none appearance-none cursor-pointer">
                                <option disabled selected value="">Select your nationality</option>
                                <option value="in">Indian</option>
                                <option value="us">American</option>
                                <option value="uk">British</option>
                                <option value="ca">Canadian</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined pointer-events-none">expand_more</span>
                        </div>
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Current Country of Residence <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">home_pin</span>
                            <select className="w-full pl-12 pr-10 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none appearance-none cursor-pointer">
                                <option disabled selected value="">Select country of residence</option>
                                <option value="in">India</option>
                                <option value="us">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="ca">Canada</option>
                                <option value="ae">UAE</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined pointer-events-none">expand_more</span>
                        </div>
                    </label>
                </div>



                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 mt-2 border-t border-slate-100">
                    <button className="w-full sm:w-auto text-slate-500 hover:text-slate-800 font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                        Save & Exit
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        Continue to Academic History
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;
