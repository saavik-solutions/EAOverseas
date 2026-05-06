import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Link, useNavigate } from 'react-router-dom';
import ApplicationSubmittedModal from '@/features/loans/components/ApplicationSubmittedModal';

const LenderSelection = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('hdfc');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const lenders = [
        {
            id: 'hdfc',
            name: 'HDFC Credila',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAdmYTUyihvdluhMfUQqfaLBnLeyNEdefpQtIwHIQG1C3XsN_X38uFE8IlRuJmBADxrZzsBlOP1QnalVovOZfpJ-ZAvwGBHwy2snSH5j9t0HnIfgt1_Lrjm90Y-0vl95mwFHShhaOSSjRlf_rmuY04YZSozGifH9RawYshfuj2pg0lc8gWlfQLTxWD8PkFkGXQngrEtxZ1WC2p1ko_8s-qaZvGtNpzB_u1qZt_eNxD6fLv732dQbhQjla8yop2uaG1LsXAEG-28M',
            type: 'NBFC',
            maxLoan: '₹40L',
            interest: '11.5%',
            match: 98,
            processingTime: '5-7 Days'
        },
        {
            id: 'icici',
            name: 'ICICI Bank',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBik9DdMZGLksETIDuiNq8uBWJZVIwD7cP0AGZtMiK0Yeezx_dScATbDp_jLI6Ig3kfes7JhIgTd9O2aoR580yHz385D624OmFwreJad6kGAt-Fy0IARDLTX-9R8SrwmMgGNg1Lv0UR1KZaD1niCNmd-AKyh96yy44UnWy466PVlBCyYZH1pux3--p_B1CV_MPMheTCZIUjildM7FO4Zv-hBoYDkyihxmjgZV1Ef3LAzfa0P_UJDyqnuk2FvZeWP8VZufYlvOs72Qo',
            type: 'Private',
            maxLoan: '₹50L',
            interest: '10.7%',
            match: 85,
            processingTime: '8-10 Days'
        },
        {
            id: 'prodigy',
            name: 'Prodigy Finance',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1lYJnS-Ff9DMl8mBEI_RUwlbRA1nWHbZbdVr-VyTaW09Ned683U_Sa7IDRwiLfzoGR60cZlRkLCSMvGl_L0-wLX_TJq1NJCS-5L-W5GXPgu9pbSiTjO2pe9RznSN0IgZnou8RmgSf37c1hy7LAk-KFeWnAgMdWMbr89a_n-B0ZHeJ72pJkiuguQhNNTRoXLyXdiY1jIUzbrse8r2FAcZB-keq8VCYBxJfAhwLnqcjvqjr0Pso8XUvNxuLEjOFWWqDou60TJ4Vmrk',
            type: 'INTL',
            maxLoan: '$100k',
            interest: '12.9%',
            match: 72,
            processingTime: '3-5 Days'
        },
        {
            id: 'axis',
            name: 'Axis Bank',
            logo: 'https://ui-avatars.com/api/?name=Axis+Bank&background=971b32&color=fff&size=128',
            type: 'Private',
            maxLoan: '₹60L',
            interest: '10.5%',
            match: 82,
            processingTime: '7-9 Days'
        },
        {
            id: 'avanse',
            name: 'Avanse',
            logo: 'https://ui-avatars.com/api/?name=Avanse&background=f7941d&color=fff&size=128',
            type: 'NBFC',
            maxLoan: '₹45L',
            interest: '11.2%',
            match: 78,
            processingTime: '4-6 Days'
        }
    ];

    const selectedLender = lenders.find(l => l.id === selectedId) || lenders[0];

    const handleProceed = () => {
        setShowSuccessModal(true);
        setTimeout(() => {
            setShowSuccessModal(false);
            localStorage.setItem('loanApplicationSubmitted', 'true');
            navigate('/loans');
        }, 3000);
    };

    return (
        <div className="flex-1 overflow-y-auto bg-[#F0F4F8] relative pb-32 font-sans bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent">
            <PageHeader
                title={
                    <span className="flex items-center gap-2">
                        <Link to="/loans" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Loans</Link>
                        <span className="material-symbols-outlined !text-[16px] text-slate-400">chevron_right</span>
                        <Link to="/loan-eligibility" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Eligibility</Link>
                        <span className="material-symbols-outlined !text-[16px] text-slate-400">chevron_right</span>
                        <Link to="/loan-documents" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Documents</Link>
                        <span className="material-symbols-outlined !text-[16px] text-slate-400">chevron_right</span>
                        <span className="text-sm font-bold tracking-tight text-slate-900">Select Lender</span>
                    </span>
                }
            />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Heading */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Available Loan Options</h2>
                    <p className="text-slate-500 font-medium">Based on your profile and documents, the following Lenders matched your criteria.</p>
                </div>

                {/* Loan Cards Grid - 3 Columns for compact width */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {lenders.map((lender) => {
                        const isSelected = selectedId === lender.id;
                        return (
                            <div
                                key={lender.id}
                                onClick={() => setSelectedId(lender.id)}
                                className={`relative rounded-[1.25rem] p-4 cursor-pointer group transition-all duration-300 overflow-hidden
                                    ${isSelected
                                        ? 'bg-gradient-to-br from-blue-50/80 via-white to-blue-50/50 border-2 border-blue-400 shadow-[0_8px_30px_-6px_rgba(59,130,246,0.2)]'
                                        : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200'
                                    }`}
                            >
                                <div className="flex flex-col h-full relative z-0">
                                    {/* Top Section: Logo & Name */}
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            {/* Logo */}
                                            <div className="w-14 h-14 bg-white rounded-xl border border-slate-100 p-1.5 flex items-center justify-center shadow-sm shrink-0">
                                                {lender.id === 'icici' || lender.id === 'prodigy' || lender.id === 'axis' || lender.id === 'avanse' ? (
                                                    <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${lender.logo}')` }}></div>
                                                ) : (
                                                    <img src={lender.logo} alt={lender.name} className="w-full h-full object-contain" />
                                                )}
                                            </div>

                                            <div className="pt-1">
                                                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-0.5">Lender</p>
                                                <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{lender.name}</h3>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide border ${lender.type === 'NBFC' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                                    {lender.type}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Match Score */}
                                        <div className="relative size-14 shrink-0 mr-2">
                                            {/* Outer Glow for selected */}
                                            {isSelected && <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full"></div>}

                                            <svg className="size-full -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                                                <path className="text-white" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                                <path className={isSelected ? 'text-blue-100' : 'text-slate-100'} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                                                <path className={isSelected ? 'text-blue-500' : 'text-slate-400'} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${lender.match}, 100`} strokeWidth="2.5" strokeLinecap="round" />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className={`text-sm font-black ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>{lender.match}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Section: Stats with Divider */}
                                    <div className="flex items-center mt-auto pt-1">
                                        <div className="flex-1">
                                            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-0.5">Max Loan</p>
                                            <p className="text-xl font-black text-slate-900 tracking-tight">{lender.maxLoan}</p>
                                        </div>

                                        {/* Vertical Divider */}
                                        <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent mx-4"></div>

                                        <div className="flex-1">
                                            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-0.5">Interest</p>
                                            <div className="flex items-baseline gap-1">
                                                <p className="text-xl font-black text-slate-900 tracking-tight">{lender.interest}</p>
                                                <span className="text-slate-400 text-[10px] font-bold">p.a.</span>
                                                <span className="material-symbols-outlined !text-[14px] text-slate-300 cursor-help" title="Interest rates may vary">info</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorational light flare for selected card */}
                                    {isSelected && (
                                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
                                    )}

                                    {/* Checkmark Bottom Right */}
                                    <div className={`absolute bottom-0 right-0 z-20 size-8 rounded-tl-xl rounded-br-[1.2rem] bg-blue-600 flex items-center justify-center shadow-none transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}`}>
                                        <span className="material-symbols-outlined text-white !text-[18px] font-bold">check</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-8 left-0 md:left-64 right-0 px-4 md:px-8 z-30 flex justify-center pointer-events-none">
                <div className="w-full max-w-5xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl rounded-[1.5rem] p-2 flex items-center justify-between pointer-events-auto ring-1 ring-black/5 pl-4 pr-2">
                    <div className="flex items-center gap-4">
                        {/* Selected Lender Info */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 p-1 flex items-center justify-center shadow-sm relative">
                                {selectedLender.id === 'icici' || selectedLender.id === 'prodigy' || selectedLender.id === 'axis' || selectedLender.id === 'avanse' ? (
                                    <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${selectedLender.logo}')` }}></div>
                                ) : (
                                    <img src={selectedLender.logo} alt={selectedLender.name} className="w-full h-full object-contain" />
                                )}
                                <div className="absolute -bottom-1 -right-1 size-3.5 bg-blue-600 rounded-full border border-white flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white !text-[10px]">check</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold text-sm leading-tight">{selectedLender.name}</p>
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Selected</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleProceed}
                            className="bg-blue-600 text-white font-bold text-sm tracking-wide px-8 py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all active:scale-95 flex items-center gap-2"
                        >
                            Proceed with Application
                            <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>


            <ApplicationSubmittedModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                data={selectedLender}
            />
        </div >
    );
};

export default LenderSelection;
