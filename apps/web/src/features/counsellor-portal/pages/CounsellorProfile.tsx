import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';

const CounsellorProfile = () => {
    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f5f7f8]">
            <PageHeader title="Counsellor Profile" />

            <main className="flex-1 overflow-y-auto p-4 lg:p-10 no-scrollbar">
                <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-6">

                    {/* Header Section */}
                    <div className="flex w-full flex-col gap-6 lg:flex-row lg:justify-between lg:items-center bg-white p-8 rounded-xl border border-[#dbdfe6] shadow-sm">
                        <div className="flex gap-6 items-center flex-wrap md:flex-nowrap">
                            <div className="relative">
                                {(() => {
                                    const imageURL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCe1eoVP2XU8R1oNFxPvHYd_r6uGxRWWb8wLeisttZzZJQUofnP-7PuPGu63Zci7XdsdrEUpn6llWt98jk1XN0ZB15dR2sZAgiGY53IYn6iJ4tgOYcGjcOENPWLfvSmXtrL6fLkeUKoPIBwZ6726N3cgsvyYi0o5AQpTKTn6mFzD0qhQ-IX0USYvTpcodXtbP7QkSIj4qz73A0krQ1EpSvxSiykWnHvXDJn2oQ8WuR1SxYaYTyyFJt4CQZAAJosEienTdYRG-uovgI";
                                    return (
                                        <div
                                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 border-4 border-white shadow-md flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-3xl"
                                            style={{ backgroundImage: `url("${imageURL}")` }}
                                        >
                                            {!imageURL && "ER"}
                                        </div>
                                    );
                                })()}
                                <div className="absolute bottom-1 right-1 size-5 bg-green-500 border-2 border-white rounded-full" title="Active"></div>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-[#111418] text-3xl font-bold leading-tight tracking-[-0.015em]">Elena Rodriguez</h1>
                                <p className="text-[#60728a] text-base font-medium leading-normal flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">badge</span> Senior Consultant - STEM Specialist
                                </p>

                                {/* 5-Star Rating UI */}
                                <Link to="/counsellor-performance" className="flex items-center gap-2 mt-1.5 mb-1 animate-fade-in hover:opacity-80 transition-opacity cursor-pointer">
                                    <div className="flex text-yellow-400">
                                        <span className="material-symbols-outlined icon-filled !text-[18px]">star</span>
                                        <span className="material-symbols-outlined icon-filled !text-[18px]">star</span>
                                        <span className="material-symbols-outlined icon-filled !text-[18px]">star</span>
                                        <span className="material-symbols-outlined icon-filled !text-[18px]">star</span>
                                        <span className="material-symbols-outlined icon-filled !text-[18px]">star_half</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">4.8</span>
                                    <span className="text-xs text-gray-500 font-medium">(250+ reviews)</span>
                                </Link>

                                <div className="flex gap-4 mt-1">
                                    <p className="text-[#60728a] text-sm font-normal leading-normal">Experience: 10+ Years</p>
                                    <span className="text-gray-300">|</span>
                                    <p className="text-green-600 text-sm font-bold leading-normal flex items-center gap-1">
                                        Active Status
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full lg:w-auto mt-2 lg:mt-0">
                            <Link to="/counsellor-performance" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-blue-600/20 active:scale-[0.98]">
                                <span className="material-symbols-outlined !text-[20px]">star</span>
                                <span>Check Rating</span>
                            </Link>
                        </div>
                    </div>


                    {/* Main Grid Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Personal Information */}
                        <div className="bg-white rounded-xl border border-[#dbdfe6] shadow-sm overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#dbdfe6] bg-gray-50/50">
                                <h3 className="text-[#111418] text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">person</span> Personal Information
                                </h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider">Full Name</p>
                                    <p className="text-[#111418] text-base font-semibold mt-1">Elena Rodriguez</p>
                                </div>
                                <div>
                                    <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider">Email Address</p>
                                    <p className="text-[#111418] text-base font-semibold mt-1">elena.rodriguez@eaoverseas.com</p>
                                </div>
                                <div>
                                    <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider">Phone</p>
                                    <p className="text-[#111418] text-base font-semibold mt-1">+1 (555) 123-4567</p>
                                </div>
                                <div>
                                    <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider">Office</p>
                                    <p className="text-[#111418] text-base font-semibold mt-1">London Hub</p>
                                </div>
                                <div>
                                    <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider">Employee ID</p>
                                    <p className="text-[#111418] text-base font-semibold mt-1">EAO-8829</p>
                                </div>
                                <div>
                                    <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider">Joining Date</p>
                                    <p className="text-[#111418] text-base font-semibold mt-1">Jan 12, 2020</p>
                                </div>
                            </div>
                        </div>

                        {/* Professional Details */}
                        <div className="bg-white rounded-xl border border-[#dbdfe6] shadow-sm overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#dbdfe6] bg-gray-50/50">
                                <h3 className="text-[#111418] text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">work</span> Professional Details
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider mb-2">Specialization</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-100">
                                            🇨🇦 Canada
                                        </span>
                                        <span className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-100">
                                            🇺🇸 USA
                                        </span>
                                        <span className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-100">
                                            🇬🇧 UK
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider mb-2">Exams Expertise</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black border border-blue-100 uppercase">IELTS</span>
                                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black border border-blue-100 uppercase">GRE</span>
                                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black border border-blue-100 uppercase">GMAT</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider mb-1">Languages</p>
                                        <p className="text-[#111418] text-sm font-semibold">English, German, French</p>
                                    </div>
                                    <div>
                                        <p className="text-[#60728a] text-[10px] font-bold uppercase tracking-wider mb-1">Education</p>
                                        <p className="text-[#111418] text-sm font-semibold">Ph.D. Educational Leadership</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Availability Settings */}
                        <div className="bg-white rounded-xl border border-[#dbdfe6] shadow-sm overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#dbdfe6] bg-gray-50/50">
                                <h3 className="text-[#111418] text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">event_available</span> Availability Settings
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-blue-600">calendar_today</span>
                                                <div>
                                                    <p className="text-[10px] text-[#60728a] font-bold uppercase">Working Days</p>
                                                    <p className="text-sm font-bold">Mon - Fri</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-blue-600">schedule</span>
                                                <div>
                                                    <p className="text-[10px] text-[#60728a] font-bold uppercase">Time Slots</p>
                                                    <p className="text-sm font-bold">09:00 AM - 05:00 PM</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-blue-600">public</span>
                                                <div>
                                                    <p className="text-[10px] text-[#60728a] font-bold uppercase">Timezone</p>
                                                    <p className="text-sm font-bold">GMT (London)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-bold text-[#111418]">New Student Intake</span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                            <p className="text-[11px] text-[#60728a] leading-relaxed">When active, new student profiles will be automatically matched based on your STEM expertise.</p>
                                            <div className="mt-4 flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase">
                                                <span className="size-2 bg-blue-600 rounded-full animate-pulse"></span> Currently Available
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activity & Overview */}
                        <div className="bg-white rounded-xl border border-[#dbdfe6] shadow-sm overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#dbdfe6] bg-gray-50/50">
                                <h3 className="text-[#111418] text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">analytics</span> Activity & Overview
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-[10px] text-[#60728a] font-bold uppercase mb-1">Active Cases</p>
                                        <div className="flex items-end gap-2">
                                            <span className="text-2xl font-bold text-[#111418]">45</span>
                                            <span className="text-xs text-green-600 font-bold pb-1 flex items-center">
                                                <span className="material-symbols-outlined text-xs">arrow_upward</span> 12%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-[10px] text-[#60728a] font-bold uppercase mb-1">Recent Adds</p>
                                        <div className="flex items-end gap-2">
                                            <span className="text-2xl font-bold text-[#111418]">8</span>
                                            <span className="text-xs text-gray-400 font-medium pb-1">This month</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] text-[#60728a] font-bold uppercase">Recent Activity</p>
                                    <div className="space-y-5">
                                        <div className="flex gap-4 items-start relative before:absolute before:left-4 before:top-8 before:h-8 before:w-px before:bg-gray-200">
                                            <div className="size-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 z-10">
                                                <span className="material-symbols-outlined text-sm text-blue-600">person_edit</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-sm font-medium">Student <span className="font-bold text-[#111418]">Liu Wei</span> updated profile information</p>
                                                <p className="text-xs text-[#60728a]">2 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start relative before:absolute before:left-4 before:top-8 before:h-8 before:w-px before:bg-gray-200">
                                            <div className="size-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 z-10">
                                                <span className="material-symbols-outlined text-sm text-green-600">task_alt</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-sm font-medium"><span className="font-bold text-[#111418]">Aman R.'s</span> visa was approved by IRCC</p>
                                                <p className="text-xs text-[#60728a]">Yesterday, 4:30 PM</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start relative">
                                            <div className="size-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 z-10">
                                                <span className="material-symbols-outlined text-sm text-orange-600">verified</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-sm font-medium"><span className="font-bold text-[#111418]">Sarah J.'s</span> transcripts verified by WES</p>
                                                <p className="text-xs text-[#60728a]">Oct 24, 10:15 AM</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full text-center py-2 text-blue-600 text-sm font-bold hover:bg-blue-50 rounded-lg transition-colors">View All Activity</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="pb-10"></div>
            </main>
        </div>
    );
};

export default CounsellorProfile;
