import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ApplicationStart = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-white">
            {/* Header */}
            <header className="h-16 border-b border-gray-200 bg-surface flex items-center justify-between px-6 shrink-0 z-10">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Link to="/" className="hover:text-primary transition-colors">
                        <span className="material-symbols-outlined !text-[18px]">home</span>
                    </Link>
                    <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                    <Link to="/feed" className="text-gray-500 hover:text-gray-900 cursor-pointer">Global Feed</Link>
                    <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                    <Link to="/feed-details/daad" className="text-gray-500 hover:text-gray-900 cursor-pointer">Scholarship Details</Link>
                    <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                    <span className="text-gray-900 font-medium">Start Application</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden lg:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-[20px]">search</span>
                        <input
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-64 placeholder-gray-400"
                            placeholder="Search..." type="text" />
                    </div>
                    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Content */}
                <div className="overflow-y-auto flex-1 bg-white">
                    <div className="p-6 pb-20 max-w-3xl mx-auto w-full">
                        <div className="mb-8 mt-2">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Start Application</h1>
                            <p className="text-gray-500">Review the details below to initiate your application for this scholarship.</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-20 h-20 shrink-0 rounded-lg border border-gray-200 bg-white flex items-center justify-center overflow-hidden p-1 shadow-sm">
                                <img alt="Institution Logo" className="w-full h-full object-contain"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_Rmzt3binRkT7Z5nyfJoMYpxPN7cjfZnI3TLgP9IEOI7GytkZN5_7PxkPtG8Ulri18LdtuglOl6jntqjo-rlYw5XdnQcrm6Atna9muAezaoNcrk29F1l2oWira77-SQk48EjeQuyiF_Z1VQqfjXbSNu06d-m2-U4zITnlOSeAYIrRkTn-FAmNA0oDQ9QxpPYevooTrqgK18TnGny5j0HyvHWN9ZLUyoO338wGttL2bARVFxLHsIIyWS29CNIs2Fejyz6Fo24WBrnK" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">Scholarship</span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">account_balance</span>
                                        DAAD
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2">Fully Funded Master’s Scholarship – All Fields 2025</h2>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px] text-gray-400">location_on</span>
                                        Berlin, Germany
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px] text-gray-400">calendar_month</span>
                                        Starts Sep 2025
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="p-5 bg-[#FFF8F6] border border-[#FFEDEA] rounded-xl flex flex-col gap-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-[#C03E22] uppercase tracking-wider">Application Deadline</span>
                                    <span className="material-symbols-outlined text-[#C03E22] text-[20px]">event_busy</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">Jan 02, 2026</div>
                                <p className="text-xs text-gray-500 mt-1">Late submissions are not accepted.</p>
                            </div>
                            <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col gap-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Est. Time to Complete</span>
                                    <span className="material-symbols-outlined text-blue-600 text-[20px]">schedule</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">~15 Minutes</div>
                                <p className="text-xs text-gray-500 mt-1">You can save your progress as drafts.</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-400 text-[20px]">checklist</span>
                                Before you proceed
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                <ul className="space-y-4">
                                    {[
                                        { title: "Eligibility Confirmed", desc: "Ensure you meet the GPA and work experience requirements outlined in the details page." },
                                        { title: "Documents Ready", desc: "Have your transcripts, CV, and motivation letter ready in PDF format." },
                                        { title: "Stable Internet", desc: "A stable connection is recommended for document uploads." }
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-green-600 text-[14px]">check</span>
                                            </div>
                                            <div>
                                                <span className="block text-sm font-medium text-gray-900">{item.title}</span>
                                                <span className="text-xs text-gray-500">{item.desc}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 border-t border-gray-100 pt-8">
                            <button
                                onClick={() => navigate('/application/initiate')}
                                className="w-full py-3.5 bg-blue-600 text-white text-base font-semibold rounded-lg flex items-center justify-center gap-2">
                                Start Application Form
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </button>
                            <button
                                onClick={() => navigate('/feed-details/daad')}
                                className="w-full py-3.5 bg-white text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                Cancel
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-2">By clicking Start, a draft application will be created in your dashboard.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR - Same as Feed Details but simplified or just trending */}
                <aside className="hidden xl:flex w-80 flex-col h-full border-l border-gray-200 bg-white overflow-y-auto shrink-0 z-10 p-5">
                    {/* Trending Widget */}
                    <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5 border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-blue-600 text-[20px]">trending_up</span>
                            <h3 className="text-sm font-bold text-gray-900">Trending Topics</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['#Fall2026', '#NoIELTS', '#GermanyScholarships', '#FullyFunded', '#MBA'].map(tag => (
                                <a key={tag} className="text-xs font-medium bg-white text-gray-700 px-3 py-1.5 rounded-md border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-colors" href="#">{tag}</a>
                            ))}
                        </div>
                    </div>

                    {/* Deadline Alerts */}
                    <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5 border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-orange-500 text-[20px]">warning</span>
                                <h3 className="text-sm font-bold text-gray-900">Deadline Alerts</h3>
                            </div>
                            <a href="#" className="text-xs text-primary font-medium hover:underline">View All</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <a className="flex flex-col gap-1 group" href="#">
                                <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1">Chevening Scholarship UK</span>
                                <span className="text-xs text-red-500 font-medium flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                    Closes in 2 days
                                </span>
                            </a>
                            <div className="h-px bg-gray-200 w-full"></div>
                            <a className="flex flex-col gap-1 group" href="#">
                                <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1">Fulbright Program USA</span>
                                <span className="text-xs text-orange-500 font-medium flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                    Closes in 5 days
                                </span>
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ApplicationStart;
