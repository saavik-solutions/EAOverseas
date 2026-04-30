import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.jpg';

const UniversityVerification = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        designation: '',
        officialEmail: '',
        phoneNumber: ''
    });

    const [files, setFiles] = useState({
        proofOfRecognition: null,
        authorizationLetter: null
    });

    const [agreements, setAgreements] = useState({
        authorized: false,
        terms: false,
        accurate: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs for hidden file inputs
    const proofInputRef = React.useRef(null);
    const authLetterInputRef = React.useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileClick = (ref) => {
        ref.current.click();
    };

    const handleFileChange = (e, fileName) => {
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({
                ...prev,
                [fileName]: file
            }));
            if (errors[fileName]) {
                setErrors(prev => ({ ...prev, [fileName]: null }));
            }
        }
    };

    const handleCheckboxChange = (e, key) => {
        setAgreements(prev => ({
            ...prev,
            [key]: e.target.checked
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!files.proofOfRecognition) newErrors.proofOfRecognition = "Proof of Recognition is required";
        if (!files.authorizationLetter) newErrors.authorizationLetter = "Authorization Letter is required";

        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.designation.trim()) newErrors.designation = "Designation is required";
        if (!formData.officialEmail.trim()) newErrors.officialEmail = "Official Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.officialEmail)) newErrors.officialEmail = "Invalid email format";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";

        if (!agreements.authorized || !agreements.terms || !agreements.accurate) {
            newErrors.agreements = "Please accept all agreements to proceed";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default if wrapped in form, though it's a div currently
        if (validateForm()) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                // alert("Verification submitted successfully!");
                setIsSubmitting(false);
                navigate('/university-pending-verification');
            }, 1500);
        } else {
            // Scroll to first error?
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const isFormValid = () => {
        return files.proofOfRecognition &&
            files.authorizationLetter &&
            formData.fullName &&
            formData.designation &&
            formData.officialEmail &&
            formData.phoneNumber &&
            agreements.authorized &&
            agreements.terms &&
            agreements.accurate;
    };

    return (
        <div className="min-h-screen bg-slate-50 font-['Inter']">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="w-full px-6 h-20 flex items-center">
                    <img src={logo} alt="EAOverseas Logo" className="h-12 mix-blend-multiply" />
                </div>
            </header>

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-6">

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-black text-slate-900 mb-2 font-['Outfit']">University Verification</h1>
                        <p className="text-slate-600">Please provide the required documentation to verify your university account.</p>
                        {Object.keys(errors).length > 0 && (
                            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                                Please fill in all required fields and upload documents.
                            </div>
                        )}
                    </div>

                    {/* 1. Authorization & Proof */}
                    <div className={`bg-white p-8 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border ${errors.proofOfRecognition || errors.authorizationLetter ? 'border-red-300' : 'border-slate-100'}`}>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 font-['Outfit'] flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0d6cf2]/10 text-[#0d6cf2] text-sm">1</span>
                            Authorization & Proof
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Proof of Institutional Recognition <span className="text-red-500">*</span></label>
                                <input
                                    type="file"
                                    ref={proofInputRef}
                                    className="hidden"
                                    accept=".pdf,.jpg,.png"
                                    onChange={(e) => handleFileChange(e, 'proofOfRecognition')}
                                />
                                <div
                                    onClick={() => handleFileClick(proofInputRef)}
                                    className={`border-2 border-dashed ${files.proofOfRecognition ? 'border-[#0d6cf2] bg-blue-50' : 'border-slate-200 hover:bg-slate-50'} rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group`}
                                >
                                    <div className="w-10 h-10 bg-[#0d6cf2]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[#0d6cf2]">
                                            {files.proofOfRecognition ? 'check_circle' : 'upload_file'}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900 truncate w-full px-2">
                                        {files.proofOfRecognition ? files.proofOfRecognition.name : 'Click to upload or drag & drop'}
                                    </p>
                                    {!files.proofOfRecognition && <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">PDF, JPG or PNG (MAX 5MB)</p>}
                                </div>
                                {errors.proofOfRecognition && <p className="text-xs text-red-500">{errors.proofOfRecognition}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Official Authorization Letter <span className="text-red-500">*</span></label>
                                <input
                                    type="file"
                                    ref={authLetterInputRef}
                                    className="hidden"
                                    accept=".pdf,.jpg,.png"
                                    onChange={(e) => handleFileChange(e, 'authorizationLetter')}
                                />
                                <div
                                    onClick={() => handleFileClick(authLetterInputRef)}
                                    className={`border-2 border-dashed ${files.authorizationLetter ? 'border-[#0d6cf2] bg-blue-50' : 'border-slate-200 hover:bg-slate-50'} rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group`}
                                >
                                    <div className="w-10 h-10 bg-[#0d6cf2]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[#0d6cf2]">
                                            {files.authorizationLetter ? 'check_circle' : 'assignment_turned_in'}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900 truncate w-full px-2">
                                        {files.authorizationLetter ? files.authorizationLetter.name : 'Click to upload or drag & drop'}
                                    </p>
                                    {!files.authorizationLetter && <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">SIGNED & STAMPED (MAX 5MB)</p>}
                                </div>
                                {errors.authorizationLetter && <p className="text-xs text-red-500">{errors.authorizationLetter}</p>}
                            </div>
                        </div>
                    </div>

                    {/* 2. Primary Contact Person */}
                    <div className="bg-white p-8 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 font-['Outfit'] flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0d6cf2]/10 text-[#0d6cf2] text-sm">2</span>
                            Primary Contact Person
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="First & Last Name"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-[#0d6cf2]/20'} focus:outline-none focus:ring-2 focus:border-[#0d6cf2] transition-all placeholder:text-slate-400 bg-white`}
                                />
                                {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Designation / Role <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Director of Admissions"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.designation ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-[#0d6cf2]/20'} focus:outline-none focus:ring-2 focus:border-[#0d6cf2] transition-all placeholder:text-slate-400 bg-white`}
                                />
                                {errors.designation && <p className="text-xs text-red-500">{errors.designation}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Official Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="officialEmail"
                                    value={formData.officialEmail}
                                    onChange={handleInputChange}
                                    placeholder="personal.name@university.edu"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.officialEmail ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-[#0d6cf2]/20'} focus:outline-none focus:ring-2 focus:border-[#0d6cf2] transition-all placeholder:text-slate-400 bg-white`}
                                />
                                {errors.officialEmail && <p className="text-xs text-red-500">{errors.officialEmail}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 000-0000"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.phoneNumber ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-[#0d6cf2]/20'} focus:outline-none focus:ring-2 focus:border-[#0d6cf2] transition-all placeholder:text-slate-400 bg-white`}
                                />
                                {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
                            </div>
                        </div>
                    </div>

                    {/* 3. Agreement */}
                    <div className={`bg-white p-8 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border ${errors.agreements ? 'border-red-300' : 'border-slate-100'}`}>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 font-['Outfit'] flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0d6cf2]/10 text-[#0d6cf2] text-sm">3</span>
                            Agreement
                        </h2>

                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={agreements.authorized}
                                    onChange={(e) => handleCheckboxChange(e, 'authorized')}
                                    className="mt-1 w-5 h-5 rounded border-slate-300 text-[#0d6cf2] focus:ring-[#0d6cf2] accent-[#0d6cf2]"
                                />
                                <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                                    I confirm that I am authorized to represent this institution for the purpose of this registration.
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={agreements.terms}
                                    onChange={(e) => handleCheckboxChange(e, 'terms')}
                                    className="mt-1 w-5 h-5 rounded border-slate-300 text-[#0d6cf2] focus:ring-[#0d6cf2] accent-[#0d6cf2]"
                                />
                                <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                                    I agree to the EAOverseas <Link to="/terms" target="_blank" className="text-[#0d6cf2] hover:underline">Terms of Service</Link> and <Link to="/privacy-security" target="_blank" className="text-[#0d6cf2] hover:underline">Privacy Policy</Link>.
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={agreements.accurate}
                                    onChange={(e) => handleCheckboxChange(e, 'accurate')}
                                    className="mt-1 w-5 h-5 rounded border-slate-300 text-[#0d6cf2] focus:ring-[#0d6cf2] accent-[#0d6cf2]"
                                />
                                <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                                    I certify that all the information provided is accurate and verifiable.
                                </span>
                            </label>
                        </div>
                        {errors.agreements && <p className="text-sm text-red-500 mt-4 text-center">{errors.agreements}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-4 pt-4 pb-12">
                        <Link to="/signup" className="h-14 px-8 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-lg transition-colors flex items-center justify-center">
                            Back
                        </Link>
                        <button
                            onClick={handleSubmit}
                            disabled={!isFormValid() || isSubmitting}
                            className={`flex-1 h-14 ${!isFormValid() || isSubmitting ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-[#0d6cf2] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 hover:scale-[1.01]'} font-bold text-lg rounded-xl transition-all transform flex items-center justify-center gap-2`}
                        >
                            {isSubmitting ? (
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                            ) : (
                                <span className="material-symbols-outlined filled">verified_user</span>
                            )}
                            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityVerification;
