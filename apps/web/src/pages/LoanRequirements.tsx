import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const LoanRequirements = () => {
    const navigate = useNavigate();
    const [hasApplication, setHasApplication] = React.useState(false);

    React.useEffect(() => {
        const submitted = localStorage.getItem('loanApplicationSubmitted');
        if (submitted === 'true') {
            setHasApplication(true);
        }
    }, []);

    return (
        <div className="flex-1 flex flex-col h-full min-w-0 bg-[#f8f9fc] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-100/50 to-transparent pointer-events-none rounded-bl-full z-0"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-50 to-transparent pointer-events-none rounded-tr-full z-0"></div>
            <svg className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] opacity-20 pointer-events-none z-0" fill="none" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50 C 200 50, 200 200, 400 200 C 600 200, 600 350, 700 350" stroke="url(#paint0_linear)" strokeDasharray="8 8" strokeWidth="2"></path>
                <path d="M50 150 C 150 150, 250 300, 450 300 C 650 300, 650 450, 750 450" stroke="url(#paint1_linear)" strokeDasharray="10 10" strokeWidth="2"></path>
                <circle cx="400" cy="200" fill="url(#paint2_radial)" fillOpacity="0.3" r="150"></circle>
                <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="100" x2="700" y1="50" y2="350">
                        <stop stopColor="#3b82f6" stopOpacity="0.1"></stop>
                        <stop offset="1" stopColor="#3b82f6" stopOpacity="0.6"></stop>
                    </linearGradient>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear" x1="50" x2="750" y1="150" y2="450">
                        <stop stopColor="#0d6cf2" stopOpacity="0.1"></stop>
                        <stop offset="1" stopColor="#0d6cf2" stopOpacity="0.4"></stop>
                    </linearGradient>
                    <radialGradient cx="0" cy="0" gradientTransform="translate(400 200) rotate(90) scale(150)" gradientUnits="userSpaceOnUse" id="paint2_radial" r="1">
                        <stop stopColor="#dbeafe"></stop>
                        <stop offset="1" stopColor="#eff6ff" stopOpacity="0"></stop>
                    </radialGradient>
                </defs>
            </svg>

            <div className="hidden lg:block">
                <PageHeader title="Loans" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 z-10 scroll-smooth">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    <div className="text-center mb-10 max-w-2xl animate-fade-in-up">
                        <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4">
                            <span className="material-symbols-outlined text-primary text-xl">school</span>
                        </div>
                        <h1 className="text-[#111418] text-2xl md:text-4xl font-extrabold leading-tight tracking-tight mb-3">
                            Understanding Your Loan Journey
                        </h1>
                        <p className="text-[#60728a] text-sm lg:text-lg font-medium leading-relaxed">
                            Get clarity on eligibility, documents, and key steps for your education loan.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="flex flex-row overflow-x-auto lg:grid lg:grid-cols-3 snap-x snap-mandatory pb-4 gap-4 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
                                {/* Card 1: What You'll Do */}
                                <div className="min-w-[85%] snap-center bg-white rounded-2xl border border-gray-100 border-l-4 border-l-blue-500 p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="size-8 lg:size-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">edit_note</span>
                                    </div>
                                    <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4">What You'll Do</h3>
                                    <ul className="space-y-2 lg:space-y-3">
                                        {[
                                            "Share basic course & country details",
                                            "Upload required documents",
                                            "Choose the best loan option"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span className="size-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                                                <span className="text-xs lg:text-sm text-gray-600 leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 2: What You'll Get */}
                                <div className="min-w-[85%] snap-center bg-white rounded-2xl border border-gray-100 border-l-4 border-l-green-500 p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="size-8 lg:size-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">verified</span>
                                    </div>
                                    <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4">What You'll Get</h3>
                                    <ul className="space-y-2 lg:space-y-3">
                                        {[
                                            "Loan eligibility check",
                                            "Sanction letter for visa",
                                            "Bank / NBFC support"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span className="size-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                                                <span className="text-xs lg:text-sm text-gray-600 leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 3: Time Estimate */}
                                <div className="min-w-[85%] snap-center bg-white rounded-2xl border border-gray-100 border-l-4 border-l-orange-500 p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="size-8 lg:size-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">schedule</span>
                                    </div>
                                    <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4">Time Estimate</h3>
                                    <ul className="space-y-2 lg:space-y-3">
                                        {[
                                            "Eligibility check: 1–2 days",
                                            "Approval: 5–15 days (depends on lender)"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span className="size-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                                                <span className="size-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                                                <span className="text-xs lg:text-sm text-gray-600 leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Additional Info / Pro Tip to fill space */}
                            <div className="bg-white rounded-2xl border border-orange-100 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 mx-1 relative overflow-hidden group">
                                <div className="relative z-10 flex items-center gap-4">
                                    <div className="size-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-2xl">support_agent</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-0.5">Confused about documents?</h3>
                                        <p className="text-gray-500 text-sm">Get a free consultation with our loan specialists.</p>
                                    </div>
                                </div>
                                <button onClick={() => navigate('/consultant')} className="relative z-10 bg-gray-900 text-white px-6 py-3 rounded-xl text-xs lg:text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 shrink-0 flex items-center gap-2 group-hover:gap-3">
                                    <span>Book a Call</span>
                                    <span className="material-symbols-outlined text-base lg:text-lg">arrow_forward</span>
                                </button>
                                <div className="absolute right-0 top-0 w-32 h-32 bg-orange-50/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-4 lg:p-6 h-full flex flex-col relative overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                                    </div>
                                    <h3 className="text-lg lg:text-xl font-bold text-gray-900">Ready to Begin?</h3>
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    Having these details ready will streamline your application process.
                                </p>

                                {/* Checklist */}
                                <div className="space-y-3 flex-1">
                                    {[
                                        "University offer letter ready",
                                        "Passport available",
                                        "Co-applicant income details",
                                        "Approximate course cost"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                            <div className="size-6 rounded-full bg-white text-green-500 flex items-center justify-center shrink-0 shadow-sm">
                                                <span className="material-symbols-outlined text-sm font-bold">check</span>
                                            </div>
                                            <span className="text-xs lg:text-sm font-medium text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
                                    <span className="material-symbols-outlined text-gray-400 text-xl shrink-0 mt-0.5">help</span>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        Need help gathering these? Check our <a href="#" className="text-blue-600 font-semibold hover:underline">document guide</a> or skip for now.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        {hasApplication && (
                            <button
                                onClick={() => navigate('/loan-application-timeline', { state: { fromDashboard: true } })}
                                className="group relative flex items-center justify-center overflow-hidden rounded-xl h-12 lg:h-14 px-6 lg:px-10 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 transition-all duration-300 text-sm lg:text-lg font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5"
                            >
                                <span className="mr-2">View Application Status</span>
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">article</span>
                            </button>
                        )}
                        <button
                            onClick={() => navigate('/loan-eligibility')}
                            className="group relative flex items-center justify-center overflow-hidden rounded-xl h-12 lg:h-14 px-6 lg:px-10 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white text-sm lg:text-lg font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5">
                            <span className="mr-2">View Eligibility Criteria</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanRequirements;
