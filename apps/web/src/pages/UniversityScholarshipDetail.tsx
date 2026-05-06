import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityScholarshipDetail = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const navigate = useNavigate();

    const displayName = (universityName || 'University')
        .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <UniversityLayout universityName={displayName} pageTitle="Scholarship Details">
            <div className="p-8 max-w-[1280px] mx-auto font-['Public_Sans']">
                {/* Hero Header Section */}
                <div className="bg-white rounded-[24px] border border-[#c3c6d7] p-6 shadow-sm mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,76.5,-43.8C83.5,-30.2,86.2,-15.1,84.7,-0.9C83.1,13.4,77.4,26.7,69.1,38.3C60.8,49.9,49.9,59.8,37.3,66.8C24.7,73.8,10.4,77.9,-4.3,85.3C-19,92.7,-34.1,103.5,-47.1,100.8C-60.1,98.1,-71.1,81.9,-78,65.8C-84.9,49.7,-87.7,33.7,-88.9,18.1C-90.1,2.5,-89.7,-12.7,-85.4,-27.1C-81.1,-41.5,-72.9,-55.1,-61.2,-64C-49.5,-72.9,-34.3,-77.1,-19.6,-81.1C-4.9,-85.1,9.4,-88.9,44.7,-76.4Z" fill="#0053cd" transform="translate(100 100)"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-md uppercase tracking-wider">Active</span>
                                <span className="text-[12px] text-[#424654] flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">event</span>
                                    Expires Dec 31, 2024
                                </span>
                            </div>
                            <h2 className="text-3xl text-[#191b23] font-bold mb-2">Global Excellence STEM Award</h2>
                            <p className="text-sm text-[#424654] max-w-2xl mb-6">Recognizing outstanding international students pursuing advanced degrees in Science, Technology, Engineering, and Mathematics at top-tier partner institutions.</p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-[#f2f3fe] px-4 py-3 rounded-xl border border-[#c3c6d7] min-w-[160px]">
                                    <p className="text-[10px] text-[#424654] mb-1 uppercase font-bold tracking-widest">Annual Award</p>
                                    <p className="text-2xl text-[#0053cd] font-bold">$45,000<span className="text-sm text-[#424654]">/Yr</span></p>
                                </div>
                                <div className="bg-[#f2f3fe] px-4 py-3 rounded-xl border border-[#c3c6d7] min-w-[160px]">
                                    <p className="text-[10px] text-[#424654] mb-1 uppercase font-bold tracking-widest">Total Slots</p>
                                    <p className="text-2xl text-[#191b23] font-bold">100</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <button className="bg-[#0053cd] text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#2b6cee] transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                Edit Details
                            </button>
                            <button className="bg-white border border-[#737686] text-[#191b23] font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#f2f3fe] transition-all">
                                <span className="material-symbols-outlined text-[20px]">lock</span>
                                Close Applications
                            </button>
                            <button className="bg-white border border-[#737686] text-[#191b23] font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#f2f3fe] transition-all">
                                <span className="material-symbols-outlined text-[20px]">file_download</span>
                                Export List
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bento Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Eligibility Criteria */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <div className="bg-white rounded-xl border border-[#c3c6d7] p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-[#191b23]">Eligibility Criteria</h3>
                                <span className="material-symbols-outlined text-[#0053cd]">verified</span>
                            </div>
                            <div className="h-px bg-[#ededf8] mb-6"></div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 text-[#0053cd] rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">grade</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#191b23]">Minimum GPA</p>
                                        <p className="text-xs text-[#424654]">3.8 / 4.0 or equivalent</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 text-[#0053cd] rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">school</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#191b23]">Degree Level</p>
                                        <p className="text-xs text-[#424654]">Master's or Ph.D. Applicants</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 text-[#0053cd] rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">public</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#191b23]">Regional Eligibility</p>
                                        <p className="text-xs text-[#424654]">Open to International Students</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 text-[#0053cd] rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">biotech</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#191b23]">Disciplines</p>
                                        <p className="text-xs text-[#424654]">Physics, Engineering, Computer Science, Biology</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Small Stat Widget */}
                        <div className="bg-[#2b6cee] text-white rounded-xl p-6 shadow-md">
                            <p className="text-[10px] uppercase tracking-widest opacity-80 mb-2 font-bold">Application Conversion</p>
                            <div className="flex items-end gap-2 mb-4">
                                <p className="text-[32px] font-bold leading-none">45.0%</p>
                                <span className="flex items-center text-green-300 text-[12px] mb-1">
                                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                                    +12%
                                </span>
                            </div>
                            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                <div className="bg-white h-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Applications Data Visualization & List */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Applicant Statistics */}
                        <div className="bg-white rounded-xl border border-[#c3c6d7] p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-base font-bold text-[#191b23]">Application Trends</h3>
                                <div className="flex gap-2">
                                    <span className="flex items-center gap-1 text-[12px] text-[#424654]">
                                        <div className="w-3 h-3 bg-[#0053cd] rounded-full"></div> Applications
                                    </span>
                                    <span className="flex items-center gap-1 text-[12px] text-[#424654] ml-4">
                                        <div className="w-3 h-3 bg-[#0053cd] opacity-20 rounded-full"></div> Goal
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-end gap-2 h-32 mb-4 px-2">
                                {/* Simple Bar Chart Visualization */}
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-[#0053cd] opacity-20 rounded-t-sm h-[30%]"></div>
                                    <span className="text-[10px] text-[#424654]">MON</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-[#0053cd] opacity-40 rounded-t-sm h-[45%]"></div>
                                    <span className="text-[10px] text-[#424654]">TUE</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-[#0053cd] opacity-60 rounded-t-sm h-[70%]"></div>
                                    <span className="text-[10px] text-[#424654]">WED</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-[#0053cd] rounded-t-sm h-[90%]"></div>
                                    <span className="text-[10px] text-[#424654]">THU</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-[#0053cd] opacity-80 rounded-t-sm h-[65%]"></div>
                                    <span className="text-[10px] text-[#424654]">FRI</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-[#0053cd] opacity-30 rounded-t-sm h-[20%]"></div>
                                    <span className="text-[10px] text-[#424654]">SAT</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-[#0053cd] opacity-20 rounded-t-sm h-[15%]"></div>
                                    <span className="text-[10px] text-[#424654]">SUN</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Applicants Table */}
                        <div className="bg-white rounded-xl border border-[#c3c6d7] overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-[#ededf8] flex items-center justify-between">
                                <h3 className="text-base font-bold text-[#191b23]">Recent Applicants</h3>
                                <button className="text-[#0053cd] font-bold text-[14px] flex items-center gap-1 hover:underline">
                                    View All 45 Applications
                                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                </button>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f2f3fe]">
                                        <th className="px-6 py-3 text-[10px] text-[#424654] uppercase tracking-wider font-bold">Applicant</th>
                                        <th className="px-6 py-3 text-[10px] text-[#424654] uppercase tracking-wider font-bold">University</th>
                                        <th className="px-6 py-3 text-[10px] text-[#424654] uppercase tracking-wider font-bold text-center">Score</th>
                                        <th className="px-6 py-3 text-[10px] text-[#424654] uppercase tracking-wider font-bold">Status</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#ededf8]">
                                    <tr className="hover:bg-[#f2f3fe] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img alt="Student" className="w-10 h-10 rounded-full border border-[#c3c6d7]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjSXEK2xOBW5_TVpZTQ-nLcp81pzN1Q3PeS_vWJreVoS8PCTlcdhQlOBCYKRn8EoNXHjalfjXkjPXikpuuwVVFer8ZFMrhpKJ6TEqN39xMYqi9MrZ1lPNASsmAJOrhav2nmEb50o_xqHHgC0VfEiEGxTYuvBauHI0lFqqR1I-rpiy2Pg4S-4FocViAWFEZtt15F4PQaB39HN_JPEFgMxSupZX71woME6JZSTSQlQjhNl5lWMqWLuJGETIZ0kQgxspt2BAHZeS0yDI" />
                                                <div>
                                                    <p className="text-sm font-bold text-[#191b23]">Elena Rodriguez</p>
                                                    <p className="text-xs text-[#424654]">M.S. Robotics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#191b23]">Stanford University</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold bg-green-50 text-green-700 px-2 py-1 rounded">98</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Reviewing</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-[#424654] hover:bg-white rounded-full group-hover:text-[#0053cd]">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#f2f3fe] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#ffdbcc] flex items-center justify-center text-[#351000] font-bold">JD</div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#191b23]">Jameson Doe</p>
                                                    <p className="text-xs text-[#424654]">Ph.D. Quantum Physics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#191b23]">MIT</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded">92</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Pending Docs</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-[#424654] hover:bg-white rounded-full group-hover:text-[#0053cd]">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#f2f3fe] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img alt="Student" className="w-10 h-10 rounded-full border border-[#c3c6d7]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCALR0CHHYnLlU4JU839enlaGjc_-ON-c1laTIll-9imrBa0vPrpFfYkto485i3Pr0aVnlLAySKmc6_CSk_liSsCesO4H4XL89MfcTND5ekOm2BWU_m9bDgJFVEpAJF83hCgZw6oWW9ybGltyQ2FOQ2Svkh-Dv-RUlhQ5pFaoHCYgKVhNmLHGdwHvzfU0_KWSv7G9f_38zcDJ2aETiq89i0yB1m_14IJ0fOv-NHVX9a0uZ8szUEZ1Gqooh2zVY4CW27AK2VaN2sQfs" />
                                                <div>
                                                    <p className="text-sm font-bold text-[#191b23]">Akiko Tanaka</p>
                                                    <p className="text-xs text-[#424654]">M.S. Bioinformatics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#191b23]">ETH Zurich</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold bg-green-50 text-green-700 px-2 py-1 rounded">95</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Shortlisted</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-[#424654] hover:bg-white rounded-full group-hover:text-[#0053cd]">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* FAB for Quick Actions */}
            <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#351000] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform z-50">
                <span className="material-symbols-outlined text-[28px]">help</span>
            </button>
        </UniversityLayout>
    );
};

export default UniversityScholarshipDetail;
