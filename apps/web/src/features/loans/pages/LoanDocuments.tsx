import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';

// Enhanced University Data for Autofilling
const UNIVERSITIES = [
    { name: "Arizona State University", country: "USA", cost: "55000", duration: "24", level: "master" },
    { name: "University of Manchester", country: "UK", cost: "40000", duration: "12", level: "master" },
    { name: "University of Waterloo", country: "Canada", cost: "35000", duration: "24", level: "master" },
    { name: "University of Bristol", country: "UK", cost: "38000", duration: "12", level: "master" },
    { name: "University of Melbourne", country: "Australia", cost: "45000", duration: "24", level: "master" },
    { name: "Technical University of Munich", country: "Germany", cost: "0", duration: "24", level: "master" },
    { name: "Oxford University", country: "UK", cost: "50000", duration: "12", level: "master" },
    { name: "Cambridge University", country: "UK", cost: "52000", duration: "12", level: "master" },
    { name: "Harvard University", country: "USA", cost: "80000", duration: "24", level: "master" },
    { name: "Stanford University", country: "USA", cost: "82000", duration: "24", level: "master" },
    { name: "MIT", country: "USA", cost: "78000", duration: "24", level: "master" },
    { name: "University of Toronto", country: "Canada", cost: "42000", duration: "24", level: "master" },
    { name: "NUS Singapore", country: "Singapore", cost: "30000", duration: "18", level: "master" }
];

const LoanDocuments = () => {
    const navigate = useNavigate();
    // State to track uploaded files
    const [files, setFiles] = useState({});

    // Study Details State
    const [destinationCountry, setDestinationCountry] = useState('');
    const [universityName, setUniversityName] = useState('');
    const [courseLevel, setCourseLevel] = useState('bachelor');
    const [totalCourseCost, setTotalCourseCost] = useState('');
    const [courseAlignment, setCourseAlignment] = useState('aligned');
    const [courseDuration, setCourseDuration] = useState('');

    // Autocomplete State
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleUniversityChange = (e) => {
        const value = e.target.value;
        setUniversityName(value);
        if (value.length > 0) {
            const filtered = UNIVERSITIES.filter(u => u.name.toLowerCase().includes(value.toLowerCase()));
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
            setSuggestions([]);
        }
    };

    const selectUniversity = (uni) => {
        setUniversityName(uni.name);
        setDestinationCountry(uni.country);
        setTotalCourseCost(uni.cost);
        setCourseDuration(uni.duration);
        setCourseLevel(uni.level);
        setCourseAlignment('aligned');
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleFileChange = (key, e) => {
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({ ...prev, [key]: file }));
        }
    };

    // Sub-component for a single document row
    const DocumentRow = ({ id, label, subtitle, icon }) => {
        const file = files[id];
        const isUploaded = !!file;

        return (
            <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="bg-slate-100 size-12 rounded-lg flex items-center justify-center text-[#60728a]">
                        <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900">{label}</p>
                        <p className="text-xs text-[#60728a]">{subtitle}</p>
                        {isUploaded && (
                            <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                {file.name}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase whitespace-nowrap ${isUploaded ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {isUploaded ? 'Uploaded' : 'Pending'}
                    </span>

                    <input
                        type="file"
                        id={`file-${id}`}
                        className="hidden"
                        onChange={(e) => handleFileChange(id, e)}
                    />

                    <button
                        onClick={() => document.getElementById(`file-${id}`).click()}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0 shadow-sm ${isUploaded
                            ? 'bg-slate-100 text-[#111418] border border-[#dbdfe6] hover:bg-slate-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {isUploaded ? 'Edit' : 'Upload'}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 overflow-y-auto bg-background-light relative">
            {/* Top Navigation Bar */}
            <PageHeader
                title={
                    <span className="flex items-center gap-2">
                        <Link to="/loans" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Loans</Link>
                        <span className="material-symbols-outlined !text-[16px] text-gray-400">chevron_right</span>
                        <Link to="/loan-eligibility" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Check Loan Eligibility</Link>
                        <span className="material-symbols-outlined !text-[16px] text-gray-400">chevron_right</span>
                        <h2 className="text-sm font-semibold text-slate-900">Upload Loan Documents</h2>
                    </span>
                }
            />

            {/* Scrollable Content */}
            <div className="max-w-[1000px] mx-auto p-8 pb-32">
                {/* Eligibility Banner */}
                <div className="mb-8 p-4 rounded-xl border border-emerald-100 bg-emerald-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-500 text-white size-10 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">Eligible</span>
                                <h3 className="text-emerald-800 font-bold">Education Loan Pre-Approved</h3>
                            </div>
                            <p className="text-emerald-800/80 text-sm mt-0.5">Great news! You are eligible for a loan. Upload the documents below to finalize your application.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Document List */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Section: Study Details Form */}
                        <section>
                            <h3 className="text-lg font-bold mb-4 px-1 flex items-center gap-2 text-slate-900">
                                <span className="material-symbols-outlined text-primary">public</span>
                                Study Details
                            </h3>
                            <div className="bg-white rounded-xl border border-[#dbdfe6] p-6 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-700">Destination Country</label>
                                        <select
                                            value={destinationCountry}
                                            onChange={(e) => setDestinationCountry(e.target.value)}
                                            className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                                        >
                                            <option value="">Select Country</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Germany">Germany</option>
                                            <option value="Singapore">Singapore</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2 relative">
                                        <label className="text-sm font-bold text-slate-700">University Name</label>
                                        <div className="relative group/input">
                                            <input
                                                value={universityName}
                                                onChange={handleUniversityChange}
                                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium pl-11 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                                placeholder="Search University"
                                                type="text"
                                            />
                                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-blue-500 transition-colors">search</span>
                                        </div>
                                        {showSuggestions && suggestions.length > 0 && (
                                            <ul className="absolute z-50 top-[80px] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                                {suggestions.map((uni, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => selectUniversity(uni)}
                                                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm font-medium text-slate-700 border-b border-gray-100 last:border-0"
                                                    >
                                                        {uni.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-700">Course Level</label>
                                        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-200 overflow-x-auto">
                                            <button
                                                onClick={() => setCourseLevel('bachelor')}
                                                className={`h-10 flex-1 px-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${courseLevel === 'bachelor' ? 'bg-white text-blue-700 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}
                                            >
                                                Bachelor's
                                            </button>
                                            <button
                                                onClick={() => setCourseLevel('master')}
                                                className={`h-10 flex-1 px-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${courseLevel === 'master' ? 'bg-white text-blue-700 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}
                                            >
                                                Master's
                                            </button>
                                            <button
                                                onClick={() => setCourseLevel('diploma')}
                                                className={`h-10 flex-1 px-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${courseLevel === 'diploma' ? 'bg-white text-blue-700 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}
                                            >
                                                Diploma
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-700">Total Course Cost (Est.)</label>
                                        <div className="relative group/input">
                                            <input
                                                value={totalCourseCost}
                                                onChange={(e) => setTotalCourseCost(e.target.value)}
                                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium pl-11 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                                placeholder="0.00"
                                                type="number"
                                            />
                                            <span className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-gray-500 font-bold border-r border-gray-300 bg-gray-100 rounded-l-xl text-sm">$</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-700">Course Alignment</label>
                                        <select
                                            value={courseAlignment}
                                            onChange={(e) => setCourseAlignment(e.target.value)}
                                            className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                                        >
                                            <option value="aligned">Aligned with past education</option>
                                            <option value="not_aligned">Not Aligned (Career Switch)</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-700">Course Duration (Months)</label>
                                        <div className="relative group/input">
                                            <input
                                                value={courseDuration}
                                                onChange={(e) => setCourseDuration(e.target.value)}
                                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white text-sm font-medium pl-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                                placeholder="e.g. 24"
                                                type="number"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Student Documents */}
                        <section>
                            <h3 className="text-lg font-bold mb-4 px-1 flex items-center gap-2 text-slate-900">
                                <span className="material-symbols-outlined text-primary">person</span>
                                Student Documents
                            </h3>
                            <div className="bg-white rounded-xl border border-[#dbdfe6] divide-y divide-[#dbdfe6] overflow-hidden shadow-sm">
                                <DocumentRow
                                    id="passport"
                                    label="Passport"
                                    subtitle="Copy of first and last page (Max 5MB)"
                                    icon="badge"
                                />
                                <DocumentRow
                                    id="offerLetter"
                                    label="University Offer Letter"
                                    subtitle="Conditional or Unconditional letter"
                                    icon="mail"
                                />
                                <DocumentRow
                                    id="transcripts"
                                    label="Academic Transcripts"
                                    subtitle="Semester-wise consolidated marksheet"
                                    icon="history_edu"
                                />
                                <DocumentRow
                                    id="degree"
                                    label="Degree Certificate"
                                    subtitle="Provisional or Final degree"
                                    icon="school"
                                />
                            </div>
                        </section>

                        {/* Section: Co-Applicant Documents */}
                        <section>
                            <div className="flex items-center justify-between mb-4 px-1">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                                    <span className="material-symbols-outlined text-primary">group</span>
                                    Co-Applicant Documents
                                </h3>
                                <p className="text-xs text-[#60728a]">Required for financial eligibility check</p>
                            </div>
                            <div className="bg-white rounded-xl border border-[#dbdfe6] divide-y divide-[#dbdfe6] overflow-hidden shadow-sm">
                                <DocumentRow
                                    id="coApplicantId"
                                    label="ID Proof"
                                    subtitle="Aadhaar card or Pan card"
                                    icon="verified_user"
                                />
                                <DocumentRow
                                    id="coApplicantIncome"
                                    label="Income Proof"
                                    subtitle="Last 3 months salary slips or ITR"
                                    icon="payments"
                                />
                                <DocumentRow
                                    id="coApplicantBank"
                                    label="Bank Statements"
                                    subtitle="Consolidated last 6 months records"
                                    icon="account_balance_wallet"
                                />
                            </div>
                        </section>

                        {/* Section: Collateral Documents */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 px-1">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                                    <span className="material-symbols-outlined text-primary">domain</span>
                                    Collateral Documents
                                </h3>
                                <span className="text-[10px] font-bold py-0.5 px-2 bg-slate-100 text-slate-500 rounded-full border border-slate-200">REQUIRED</span>
                            </div>
                            <div className="bg-white rounded-xl border border-[#dbdfe6] divide-y divide-[#dbdfe6] overflow-hidden shadow-sm">
                                <DocumentRow
                                    id="collateral"
                                    label="Property Documents"
                                    subtitle="Ownership proof or Valuation report"
                                    icon="lock"
                                />
                            </div>
                        </section>
                    </div>

                    {/* Side Guidance/Info */}
                    <div className="space-y-6">
                        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                            <h4 className="flex items-center gap-2 font-bold text-sm mb-4 text-slate-900">
                                <span className="material-symbols-outlined text-primary text-lg">lightbulb</span>
                                Upload Guidance
                            </h4>
                            <ul className="space-y-4 text-xs leading-relaxed text-[#60728a]">
                                <li className="flex gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Ensure documents are not password protected.
                                </li>
                                <li className="flex gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Scan quality should be 300 DPI or higher for better legibility.
                                </li>
                                <li className="flex gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Accepted formats: PDF, JPEG, PNG (Max 10MB per file).
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Footer Action Bar */}
            <footer className="h-20 bg-white border-t border-[#dbdfe6] px-4 md:px-8 flex items-center justify-between shrink-0 fixed bottom-0 left-0 w-full md:left-64 md:w-[calc(100%-16rem)] shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-20 transition-all">
                <div className="flex items-center gap-6">
                    <div className="hidden md:block">
                        <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700">
                            <span>Upload Progress</span>
                            <span className="text-primary">{Object.keys(files).length} of 8 uploaded</span>
                        </div>
                        <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${(Object.keys(files).length / 8) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-xs text-[#60728a] italic hidden sm:block">Required documents must be uploaded to continue</p>
                    <button
                        disabled={Object.keys(files).length < 8}
                        onClick={() => navigate('/lender-selection')}
                        className={`text-white text-sm font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-all ${Object.keys(files).length < 8 ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        Continue Application
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default LoanDocuments;
