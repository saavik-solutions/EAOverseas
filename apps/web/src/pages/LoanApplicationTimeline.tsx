import React from 'react';
import PageHeader from '../components/PageHeader';
import { useLocation, Link } from 'react-router-dom';

const LoanApplicationTimeline = () => {
    const location = useLocation();
    const lender = location.state?.lender || {
        name: 'HDFC Credila',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAdmYTUyihvdluhMfUQqfaLBnLeyNEdefpQtIwHIQG1C3XsN_X38uFE8IlRuJmBADxrZzsBlOP1QnalVovOZfpJ-ZAvwGBHwy2snSH5j9t0HnIfgt1_Lrjm90Y-0vl95mwFHShhaOSSjRlf_rmuY04YZSozGifH9RawYshfuj2pg0lc8gWlfQLTxWD8PkFkGXQngrEtxZ1WC2p1ko_8s-qaZvGtNpzB_u1qZt_eNxD6fLv732dQbhQjla8yop2uaG1LsXAEG-28M',
        type: 'NBFC',
        maxLoan: '₹40L',
        interest: '11.5%'
    };

    const timelineSteps = [
        {
            title: 'Application Submitted',
            status: 'completed',
            icon: 'check',
        },
        {
            title: 'Lender Review',
            status: 'current',
            icon: 'hourglass_empty',
            subtext: 'IN PROGRESS'
        },
        {
            title: 'Additional Documents',
            status: 'upcoming',
            icon: 'description',
            subtext: 'If Required'
        },
        {
            title: 'Sanction Letter Issued',
            status: 'upcoming',
            icon: 'mail',
        },
        {
            title: 'Loan Approved / Rejected',
            status: 'upcoming',
            icon: 'check_circle',
        }
    ];

    const isFromDashboard = location.state?.fromDashboard;

    return (
        <div className="flex-1 overflow-y-auto bg-[#F0F4F8] relative pb-32 font-sans bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent">
            <PageHeader
                title={
                    <span className="flex items-center gap-2">
                        <Link to="/loans" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Loans</Link>
                        <span className="material-symbols-outlined !text-[16px] text-slate-400">chevron_right</span>

                        {!isFromDashboard && (
                            <>
                                <Link to="/lender-selection" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Lenders</Link>
                                <span className="material-symbols-outlined !text-[16px] text-slate-400">chevron_right</span>
                            </>
                        )}

                        <span className="text-sm font-bold tracking-tight text-slate-900">Application Status</span>
                    </span>
                }
            />

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* Main Wide Card */}
                <div className="bg-white rounded-[20px] shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[400px]">

                    {/* Top/Left Sidebar: Lender Info */}
                    <div className="w-full lg:w-64 bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-100 p-6 lg:p-8 flex lg:flex-col items-center justify-between lg:justify-center text-center lg:text-center gap-4">
                        <div className="flex items-center gap-4 lg:flex-col">
                            <div className="w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-2xl border border-slate-200 p-2 lg:p-3 flex items-center justify-center shadow-sm">
                                {lender.id === 'icici' || lender.id === 'prodigy' || lender.id === 'axis' || lender.id === 'avanse' || lender.id === 'hdfc' ? (
                                    <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${lender.logo}')` }}></div>
                                ) : (
                                    <img src={lender.logo} alt={lender.name} className="w-full h-full object-contain" />
                                )}
                            </div>
                            <div className="text-left lg:text-center">
                                <h2 className="text-lg font-black text-slate-900 leading-tight mb-1 lg:mb-2">{lender.name}</h2>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700">
                                    {lender.type || 'NBFC'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content: Timeline & Details */}
                    <div className="flex-1 p-8 flex flex-col relative bg-gradient-to-b from-blue-50/30 to-white">

                        {/* Status Heading */}
                        <div className="flex justify-between items-start mb-12">
                            <h3 className="text-xl font-bold text-slate-800">Application Progress</h3>

                            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                                <span className="text-sm font-bold text-slate-900">Lender Review</span>
                                <span className="text-[10px] font-bold text-blue-600 uppercase">- IN PROGRESS</span>
                            </div>
                        </div>

                        {/* Responsive Timeline Container */}
                        <div className="relative mb-12">

                            {/* Desktop Horizontal Timeline (Hidden on Mobile) */}
                            <div className="hidden lg:flex justify-between items-start relative">
                                {/* Connecting Line Background */}
                                <div className="absolute top-[22px] left-0 right-0 h-0.5 bg-slate-200 -z-0 mx-10"></div>
                                {/* Connecting Line Progress */}
                                <div className="absolute top-[22px] left-0 h-0.5 bg-green-500 -z-0 mx-10 w-[25%]"></div>

                                {timelineSteps.map((step, index) => (
                                    <div key={index} className="flex flex-col items-center relative z-10 w-full">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 mb-4 bg-white
                                            ${step.status === 'completed' ? 'border-green-500 text-green-500 bg-green-50' :
                                                step.status === 'current' ? 'border-blue-500 text-blue-500 bg-blue-50' :
                                                    'border-slate-200 text-slate-300'}`}>
                                            <span className="material-symbols-outlined text-[24px]">
                                                {step.status === 'completed' ? 'check' : step.icon}
                                            </span>
                                        </div>
                                        <div className="text-center max-w-[140px]">
                                            <p className={`text-sm font-bold leading-tight mb-1 ${step.status === 'completed' ? 'text-green-600' :
                                                step.status === 'current' ? 'text-slate-900' : 'text-slate-400'
                                                }`}>
                                                {step.title}
                                            </p>
                                            {step.status === 'current' && step.subtext && (
                                                <span className="inline-block px-2 py-0.5 text-[9px] font-bold text-blue-600 bg-blue-100 rounded-full">
                                                    {step.subtext}
                                                </span>
                                            )}
                                            {step.status !== 'current' && step.subtext && (
                                                <p className="text-xs text-slate-400">{step.subtext}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Vertical Timeline (Hidden on Desktop) */}
                            <div className="lg:hidden flex flex-col space-y-0 pl-2">
                                {timelineSteps.map((step, index) => (
                                    <div key={index} className="flex gap-4 relative pb-8 last:pb-0">
                                        {/* Vertical Connector Line */}
                                        {index !== timelineSteps.length - 1 && (
                                            <div className="absolute left-[18px] top-10 bottom-0 w-0.5 bg-slate-200">
                                                {/* Active Line Segment (hardcoded for demo based on 'completed') */}
                                                {(step.status === 'completed') && (
                                                    <div className="absolute inset-0 bg-green-500 h-full"></div>
                                                )}
                                            </div>
                                        )}

                                        {/* Icon */}
                                        <div className={`relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white
                                            ${step.status === 'completed' ? 'border-green-500 text-green-500 bg-green-50' :
                                                step.status === 'current' ? 'border-blue-500 text-blue-500 bg-blue-50 shadow-md shadow-blue-500/20' :
                                                    'border-slate-200 text-slate-300'}`}>
                                            <span className="material-symbols-outlined text-[20px]">
                                                {step.status === 'completed' ? 'check' : step.icon}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="pt-0.5">
                                            <h4 className={`text-sm font-bold leading-tight mb-1 ${step.status === 'completed' ? 'text-green-700' :
                                                step.status === 'current' ? 'text-slate-900' : 'text-slate-400'
                                                }`}>
                                                {step.title}
                                            </h4>

                                            {step.status === 'current' && step.subtext && (
                                                <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-md mt-1">
                                                    {step.subtext}
                                                </span>
                                            )}
                                            {step.status !== 'current' && step.subtext && (
                                                <p className="text-xs text-slate-400">{step.subtext}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Bottom Info Section (Gray/Blue background) */}
                        <div className="mt-auto bg-slate-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border border-slate-100">
                            <div className="space-y-1 mb-4 md:mb-0 text-center md:text-left">
                                <p className="text-slate-500 text-sm">
                                    Loan Type: <span className="font-bold text-slate-900">Without Collateral</span>
                                </p>
                                <p className="text-slate-500 text-sm">
                                    Application Ref ID: <span className="font-bold text-slate-900">LAP12345678</span>
                                </p>
                                <p className="text-slate-500 text-sm">
                                    Submitted: <span className="font-bold text-slate-900">28 Apr, 2024 at 10:15 AM</span>
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-end">
                                <div className="bg-blue-50 px-6 py-3 rounded-full mb-2">
                                    <span className="text-lg font-bold text-slate-900">Lender Review</span>
                                    <span className="text-lg font-bold text-blue-600"> - IN PROGRESS</span>
                                </div>
                                <p className="text-slate-500 text-sm">No action required at this stage.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoanApplicationTimeline;
