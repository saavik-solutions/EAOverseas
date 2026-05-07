import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useScholarships } from '@/shared/contexts/ScholarshipsContext';
import ApplyScholarshipModal from './ApplyScholarshipModal';

const ScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { scholarships } = useScholarships();
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    const scholarship = scholarships.find(s => String(s.id) === String(id));


    if (!scholarship) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500 font-display">
                <p className="text-xl font-bold mb-4">Scholarship not found.</p>
                <button
                    onClick={() => navigate('/scholarships')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                    Back to Scholarships
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50 font-display">
            <PageHeader title="Scholarship Details" />
            <main className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="max-w-[1300px] mx-auto space-y-6">

                    {/* Hero Section */}
                    <div className="relative rounded-[24px] overflow-hidden aspect-[21/7] sm:aspect-[4/1] shadow-xl shadow-blue-200/40 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 opacity-95"></div>
                        <div className="absolute inset-0 bg-slate-900/10"></div>

                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                        <div className="relative h-full flex flex-col justify-center px-8 sm:px-12 z-10">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 w-fit border border-white/10">
                                <span className="material-symbols-outlined !text-[14px]">verified</span>
                                OFFICIAL UNIVERSITY SCHOLARSHIP
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight max-w-2xl tracking-tight uppercase">
                                {scholarship.title}
                            </h1>
                            <p className="text-blue-50 text-sm md:text-base mt-2 max-w-xl opacity-90 font-medium">
                                Supporting the brightest international minds in {(scholarship.course || 'various fields').toLowerCase()} and related fields.
                            </p>

                        </div>
                        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block opacity-20 transform rotate-12">
                            <span className="material-symbols-outlined !text-[120px] text-white">school</span>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description Section */}
                            <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-3 uppercase tracking-widest">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600 !text-[20px]">description</span>
                                    </div>
                                    About the Scholarship
                                </h3>
                                <div className="space-y-4 text-gray-500 text-sm font-medium leading-relaxed">
                                    <p>{scholarship.description}</p>
                                    <p>Recipients will have access to exclusive mentorship programs, research opportunities, and leadership workshops throughout their academic tenure. This prestigous award is designed to foster a global community of innovators.</p>
                                </div>
                            </section>

                            {/* Eligibility Section */}
                            <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <h3 className="text-sm font-black text-gray-900 mb-8 flex items-center gap-3 uppercase tracking-widest">
                                    <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-purple-600 !text-[20px]">assignment_turned_in</span>
                                    </div>
                                    Eligibility Criteria
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-inner">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Minimum GPA</p>
                                        <div className="flex items-end gap-1">
                                            <span className="text-3xl font-black text-blue-600">3.75</span>
                                            <span className="text-xs text-gray-400 font-bold pb-1 uppercase tracking-tighter">/ 4.0 Scale</span>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-inner">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Applicable Programs</p>
                                        <p className="text-gray-900 font-black uppercase text-sm">{scholarship.course || 'All Majors'} & Associated majors</p>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h4 className="text-[10px] font-black text-gray-900 mb-4 uppercase tracking-widest">Required Documentation</h4>
                                    <ul className="space-y-3">
                                        {[
                                            'Official Academic Transcripts (translated if not in English)',
                                            'Personal Statement of Purpose (max 1000 words)',
                                            'Two Letters of Recommendation from academic faculty',
                                            'Updated Professional CV/Resume'
                                        ].map((doc, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-500 text-xs font-bold bg-slate-50/50 p-3 rounded-xl border border-transparent hover:border-blue-100 hover:bg-white transition-all">
                                                <span className="material-symbols-outlined text-blue-600 !text-[18px]">check_circle</span>
                                                {doc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Benefits Section */}
                            <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <h3 className="text-sm font-black text-gray-900 mb-8 flex items-center gap-3 uppercase tracking-widest">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-emerald-600 !text-[20px]">redeem</span>
                                    </div>
                                    Award Benefits
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { title: scholarship.coverage || 'Full Funding', sub: 'Tuition support', icon: 'payments', color: 'blue' },
                                        { title: '$1,500 Monthly', sub: 'Living and housing allowance', icon: 'home', color: 'emerald' },
                                        { title: 'Travel Grant', sub: 'One round-trip per year', icon: 'flight', color: 'amber' },
                                        { title: 'Research Fund', sub: 'Coverage for materials/labs', icon: 'biotech', color: 'purple' }
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 group hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all">
                                            <div className="bg-white text-blue-600 p-2.5 rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                <span className="material-symbols-outlined !text-[20px]">{benefit.icon}</span>
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-sm uppercase tracking-tight leading-none mb-1">{benefit.title}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{benefit.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Sidebar Action */}
                        <div className="space-y-4">
                            {/* Application Card */}
                            <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-xl shadow-blue-100/20 sticky top-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deadline</div>
                                    <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse border border-red-100">
                                        14 DAYS LEFT
                                    </div>
                                </div>
                                <div className="mb-8 p-6 rounded-xl bg-white border border-gray-100 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full blur-xl group-hover:bg-blue-100 transition-all"></div>
                                    <p className="text-3xl font-black tracking-tight text-gray-900">{scholarship.deadline}</p>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1 opacity-80">11:59 PM LOCAL TIME</p>
                                </div>
                                <div className="space-y-1 mb-8">
                                    {[
                                        { label: 'Fee', value: 'Waived' },
                                        { label: 'Level', value: scholarship.level === 'Undergrad' ? 'Undergraduate' : 'Postgraduate' },
                                        { label: 'Mode', value: 'Full-Time' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center text-[11px] py-4 border-b border-gray-50 last:border-0">
                                            <span className="text-gray-400 font-black uppercase tracking-widest">{item.label}</span>
                                            <span className="text-gray-900 font-black uppercase tracking-tighter">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setIsApplyModalOpen(true)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                                >
                                    Apply Now
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform !text-[18px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ApplyScholarshipModal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                scholarshipTitle={scholarship.title}
            />
        </div>
    );
};

export default ScholarshipDetails;
