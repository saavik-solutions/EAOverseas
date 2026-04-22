import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useNotification } from '../context/NotificationContext';

// Custom Popup Component
const EligibilityPopup = ({ isOpen, type, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] w-[90%] max-w-lg px-6 py-4 rounded-xl shadow-2xl border animate-in slide-in-from-top-10 fade-in duration-300 ${type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-red-50 border-red-200 text-red-800'
            }`}>
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full shrink-0 ${type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                    <span className="material-symbols-outlined text-xl">
                        {type === 'success' ? 'check_circle' : 'error'}
                    </span>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">
                        {type === 'success' ? 'Eligibility Confirmed!' : 'Not Eligible'}
                    </h4>
                    <p className="text-sm font-medium whitespace-pre-line leading-relaxed opacity-90">
                        {message}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className={`p-1 rounded-lg hover:bg-black/5 transition-colors ${type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            </div>
        </div>
    );
};

const LoanEligibility = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [loanType, setLoanType] = useState('collateral');
    const [academicGap, setAcademicGap] = useState('no');

    // New State Variables for Logic Rules
    const [loanAmount, setLoanAmount] = useState('');
    const [academicScore, setAcademicScore] = useState('');

    // Co-Applicant New State
    const [coApplicantRelation, setCoApplicantRelation] = useState('parent');
    const [employmentType, setEmploymentType] = useState('salaried');
    const [coApplicantIncome, setCoApplicantIncome] = useState(''); // Stores range key
    const [creditScore, setCreditScore] = useState(''); // Stores range key

    // Popup State
    const [popupState, setPopupState] = useState({
        isOpen: false,
        type: 'success', // 'success' | 'error'
        message: ''
    });

    const closePopup = () => {
        setPopupState(prev => ({ ...prev, isOpen: false }));
    };

    const checkEligibility = () => {
        // parsing inputs
        const score = parseFloat(academicScore) || 0;
        const requestAmount = parseFloat(loanAmount) || 0;

        let isEligible = true;
        let reasons = [];
        let status = 'Eligible';

        // --- VALIDATION & LOGIC START ---

        // 1. Basic Field Validation
        if (!academicScore) reasons.push("Please enter your Academic Score.");
        if (!coApplicantIncome) reasons.push("Please select Co-Applicant Income Range.");
        if (!creditScore) reasons.push("Please select Credit Score Range.");
        if (!loanAmount) reasons.push("Please enter Loan Amount.");

        // If basic fields missing, show error immediately
        if (reasons.length > 0) {
            setPopupState({
                isOpen: true,
                type: 'error',
                message: "Please fill in all required fields:\n" + reasons.join("\n")
            });
            return;
        }

        // 2. Academic Criteria
        if (score < 50) {
            isEligible = false;
            reasons.push("Academic score is below 50%.");
        } else if (score < 60) {
            status = 'Conditionally Eligible';
        }

        // 4. Co-Applicant Income Logic (Range Based)
        if (coApplicantIncome === 'below_3') {
            isEligible = false;
            reasons.push("Co-applicant annual income is below ₹3 Lakhs.");
        } else if (coApplicantIncome === '3_5') {
            if (status !== 'Not Eligible') status = 'Conditionally Eligible';
        }

        // 5. Credit Score Logic (Range Based)
        if (creditScore === 'below_600') {
            isEligible = false;
            reasons.push("Credit score is below 600.");
        } else if (creditScore === '600_650') {
            if (status !== 'Not Eligible') status = 'Conditionally Eligible';
        }

        // 6. Loan Amount Rules
        const isLowIncome = (coApplicantIncome === 'below_3' || coApplicantIncome === '3_5');
        if (requestAmount > 4000000 && loanType !== 'collateral' && isLowIncome) {
            isEligible = false;
            reasons.push("Loans > ₹40L without collateral require income >= ₹5 Lakhs.");
        }

        // 7. Hard Rejections
        if (score < 50 && isLowIncome) {
            // Redundant but safe logic
            isEligible = false;
            if (!reasons.includes("Academic score is below 50%.")) reasons.push("Low academic score and income combination.");
        }

        // --- RESULT HANDLING ---

        if (!isEligible) {
            // Not Eligible: Show Error Popup
            setPopupState({
                isOpen: true,
                type: 'error',
                message: reasons.join("\n")
            });
        } else {
            // Eligible: Show Success Popup + Redirect
            const msg = status === 'Conditionally Eligible'
                ? "You are Conditionally Eligible!\nWe found some lenders who may accept your profile."
                : "You are Eligible!\nBased on your profile, we found great loan options for you.";

            setPopupState({
                isOpen: true,
                type: 'success',
                message: msg
            });

            addNotification({
                title: 'Loan Eligibility Confirmed',
                message: 'Great news! You are eligible for an education loan.',
                type: 'success',
                icon: 'verified',
                actionUrl: '/loan-documents'
            });

            // Automatically proceed after 2 seconds
            setTimeout(() => {
                navigate('/loan-documents');
            }, 2000);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 relative">
            {/* Custom Popup "From Header" */}
            <EligibilityPopup
                isOpen={popupState.isOpen}
                type={popupState.type}
                message={popupState.message}
                onClose={closePopup}
            />

            {/* Top Navigation Bar */}
            <PageHeader
                title={
                    <span className="flex items-center gap-2">
                        <Link to="/loans" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Loans</Link>
                        <span className="material-symbols-outlined !text-[16px] text-gray-400">chevron_right</span>
                        <span className="text-sm font-bold tracking-tight text-gray-900">Check Loan Eligibility</span>
                    </span>
                }
            />

            {/* Page Content Area */}
            <div className="max-w-[800px] mx-auto py-10 px-6">
                {/* Headline Section */}
                <div className="mb-8 text-center md:text-left animate-fade-in-up">
                    <h1 className="text-3xl font-extrabold mb-3 text-slate-900 tracking-tight">Education Loan Eligibility Check</h1>
                    <p className="text-[#60728a] text-lg leading-relaxed">Complete the form below to see your potential loan options. This will not impact your credit score.</p>
                </div>

                {/* Form Sections */}
                <div className="space-y-6">

                    {/* SECTION 1: Loan Type (Renumbered conceptually) */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-blue-200">
                        <div className="flex items-center gap-4 mb-6 md:mb-8">
                            <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <span className="material-symbols-outlined text-2xl">payments</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Loan Type</h3>
                                <p className="text-sm text-slate-500">Choose your preferred loan structure</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Collateral Option */}
                            <label
                                className={`relative flex flex-col p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${loanType === 'collateral'
                                    ? 'border-blue-600 bg-blue-50/50 shadow-md'
                                    : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/30'
                                    }`}
                            >
                                <input
                                    checked={loanType === 'collateral'}
                                    onChange={() => setLoanType('collateral')}
                                    className="absolute right-5 top-5 text-blue-600 focus:ring-blue-600 accent-blue-600 h-5 w-5"
                                    name="loan_type"
                                    type="radio"
                                    value="collateral"
                                />
                                <span className="text-lg font-bold text-slate-900 mb-1">With Collateral</span>
                                <span className="text-sm text-slate-500 font-medium">Property, Fixed Deposits, Gold</span>
                                <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-1 rounded-md w-fit">
                                    <span className="material-symbols-outlined text-[14px]">trending_down</span>
                                    Lowest Interest
                                </div>
                            </label>

                            {/* Without Collateral Option */}
                            <label
                                className={`relative flex flex-col p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${loanType === 'non-collateral'
                                    ? 'border-blue-600 bg-blue-50/50 shadow-md'
                                    : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/30'
                                    }`}
                            >
                                <input
                                    checked={loanType === 'non-collateral'}
                                    onChange={() => setLoanType('non-collateral')}
                                    className="absolute right-5 top-5 text-blue-600 focus:ring-blue-600 accent-blue-600 h-5 w-5"
                                    name="loan_type"
                                    type="radio"
                                    value="non-collateral"
                                />
                                <span className="text-lg font-bold text-slate-900 mb-1">Without Collateral</span>
                                <span className="text-sm text-slate-500 font-medium">Based on future potential</span>
                            </label>
                        </div>
                        <div className="mt-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 flex gap-3">
                            <span className="material-symbols-outlined text-blue-600">verified_user</span>
                            <p className="text-sm text-blue-800/80 font-medium leading-relaxed">
                                Collateral loans significantly increase approval chances and can tackle <strong>interest rates lower by 1-2%</strong>.
                            </p>
                        </div>
                    </div>

                    {/* SECTION 2: Academic Background */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-blue-200">
                        <div className="flex items-center gap-4 mb-6 md:mb-8">
                            <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <span className="material-symbols-outlined text-2xl">school</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Academic Background</h3>
                                <p className="text-sm text-slate-500">Your past educational performance</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Highest Qualification</label>
                                <select className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer">
                                    <option>Select</option>
                                    <option>12th Grade</option>
                                    <option>Bachelor's Degree</option>
                                    <option>Master's Degree</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Academic Score (%)</label>
                                <div className="relative group/input">
                                    <input
                                        value={academicScore}
                                        onChange={(e) => setAcademicScore(e.target.value)}
                                        className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium pl-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        placeholder="e.g. 75"
                                        type="number"
                                        max="100"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Academic Gap?</label>
                                <div className="flex gap-3 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
                                    <button
                                        onClick={() => setAcademicGap('yes')}
                                        className={`h-10 flex-1 px-3 rounded-lg text-sm font-medium transition-all ${academicGap === 'yes' ? 'bg-white text-blue-700 shadow-sm border border-gray-100 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setAcademicGap('no')}
                                        className={`h-10 flex-1 px-3 rounded-lg text-sm font-medium transition-all ${academicGap === 'no' ? 'bg-white text-blue-700 shadow-sm border border-gray-100 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Co-Applicant Details */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-blue-200">
                        <div className="flex items-center gap-4 mb-6 md:mb-8">
                            <div className="size-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300">
                                <span className="material-symbols-outlined text-2xl">supervisor_account</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Co-Applicant Information</h3>
                                <p className="text-sm text-slate-500">Financial strength of your guarantor</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Relation */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Relation</label>
                                <select
                                    value={coApplicantRelation}
                                    onChange={(e) => setCoApplicantRelation(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                                >
                                    <option value="parent">Parent</option>
                                    <option value="guardian">Guardian</option>
                                    <option value="sibling">Sibling</option>
                                    <option value="spouse">Spouse</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Employment Type */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Employment Type</label>
                                <select
                                    value={employmentType}
                                    onChange={(e) => setEmploymentType(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                                >
                                    <option value="salaried">Salaried</option>
                                    <option value="self_employed_professional">Self Employed Professional</option>
                                    <option value="self_employed_business">Self Employed Business</option>
                                    <option value="retired">Retired</option>
                                    <option value="farmer">Farmer</option>
                                </select>
                            </div>

                            {/* Annual Income Range */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Annual Income Range</label>
                                <select
                                    value={coApplicantIncome}
                                    onChange={(e) => setCoApplicantIncome(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                                >
                                    <option value="">Select Range</option>
                                    <option value="below_3">Below ₹3 Lakhs</option>
                                    <option value="3_5">₹3 - ₹5 Lakhs</option>
                                    <option value="5_10">₹5 - ₹10 Lakhs</option>
                                    <option value="10_plus">₹10 Lakhs +</option>
                                </select>
                            </div>

                            {/* Credit Score Range */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Credit Score Range</label>
                                <select
                                    value={creditScore}
                                    onChange={(e) => setCreditScore(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                                >
                                    <option value="">Select Range</option>
                                    <option value="750_plus">750+ (Excellent)</option>
                                    <option value="700_750">700 - 749 (Good)</option>
                                    <option value="650_700">650 - 699 (Average)</option>
                                    <option value="600_650">600 - 649 (Below Average)</option>
                                    <option value="below_600">Below 600</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 text-sm text-slate-500">
                            Lenders evaluate the co-applicant's financial strength for loan security.
                        </div>
                    </div>

                    {/* SECTION 4: Loan Requirement */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-blue-200">
                        <div className="flex items-center gap-4 mb-6 md:mb-8">
                            <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <span className="material-symbols-outlined text-2xl">savings</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Loan Requirement</h3>
                                <p className="text-sm text-slate-500">How much funding do you need?</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Loan Amount Required</label>
                                <div className="relative group/input">
                                    <input
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value)}
                                        className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium pl-11 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        type="number"
                                        placeholder="350000"
                                    />
                                    <span className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-gray-500 font-bold border-r border-gray-300 bg-gray-100 rounded-l-xl text-sm">$</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="flex flex-col items-center gap-6 py-6 mt-8">
                        <button
                            onClick={checkEligibility}
                            className="w-full max-w-[400px] h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Check Loan Eligibility
                        </button>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                            <span className="material-symbols-outlined text-emerald-500 pb-0.5 text-base">lock</span>
                            Bank-grade 256-bit encryption. Your data is secure.
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer area */}
            <footer className="mt-10 py-8 px-10 border-t border-gray-100 text-center">
                <p className="text-sm text-[#60728a]">© 2024 EAOverseas AI - Helping students bridge the gap to global education.</p>
            </footer>
        </div>
    );
};

export default LoanEligibility;
