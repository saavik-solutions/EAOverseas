import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccommodationApplicationForm = ({ onClose, accommodation }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);
    const [formData, setFormData] = useState({
        // Basic Details
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        // Personal Details
        gender: 'Other',
        address: 'jgjhgjhbkbjbjv', // Default as per image, will be editable
        state: 'Misiones',
        city: 'Capioví',
        zipCode: '562654',
        // University & Visa
        universityName: '',
        courseName: '',
        levelOfStudy: 'Undergraduate',
        visaStatus: 'Pending'
    });

    // Countdown and Redirect Logic
    useEffect(() => {
        let timer;
        if (isSubmitted && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (isSubmitted && timeLeft === 0) {
            // Redirect to accommodation listing page
            onClose();
            navigate('/accommodation');
        }
        return () => clearTimeout(timer);
    }, [isSubmitted, timeLeft, navigate, onClose]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111418] mb-2">Application Submitted!</h2>
                <p className="text-gray-500 max-w-sm mb-8">
                    Your application for <span className="font-semibold text-[#111418]">{accommodation?.title || 'this accommodation'}</span> has been successfully submitted.
                </p>

                <div className="bg-blue-50 text-[#0d6cf2] px-6 py-3 rounded-xl font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Redirecting to accommodations in {timeLeft}s
                </div>
            </div>
        );
    }

    const renderStepper = () => (
        <div className="flex items-center justify-center mb-8 px-4">
            <div className="flex items-center w-full max-w-lg relative">
                {/* Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-[#0d6cf2] -z-10 transition-all duration-300"
                    style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                ></div>

                {/* Step 1 */}
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 1
                        ? 'bg-[#0d6cf2] border-[#0d6cf2] text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                        }`}>
                        {step > 1 ? <span className="material-symbols-outlined text-sm">check</span> : '1'}
                    </div>
                    <span className={`text-xs font-medium ${step >= 1 ? 'text-[#111418]' : 'text-gray-400'}`}>Basic Details</span>
                </div>

                {/* Step 2 */}
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 2
                        ? 'bg-[#0d6cf2] border-[#0d6cf2] text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                        }`}>
                        {step > 2 ? <span className="material-symbols-outlined text-sm">check</span> : '2'}
                    </div>
                    <span className={`text-xs font-medium ${step >= 2 ? 'text-[#111418]' : 'text-gray-400'}`}>Personal Details</span>
                </div>

                {/* Step 3 */}
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 3
                        ? 'bg-[#0d6cf2] border-[#0d6cf2] text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                        }`}>
                        3
                    </div>
                    <span className={`text-xs font-medium ${step >= 3 ? 'text-[#111418]' : 'text-gray-400'}`}>University & Visa</span>
                </div>
            </div>
        </div>
    );

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-[#111418] mb-4">Basic Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none"
                                    placeholder="Enter your last name"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                // Matching the reference image style
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-[#111418]">Personal Details</h2>

                        {/* Gender Radio */}
                        <div className="flex gap-6 items-center">
                            {['Male', 'Female', 'Other'].map((option) => (
                                <label key={option} className="flex items-center gap-2 cursor-pointer">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.gender === option
                                        ? 'border-[#0d6cf2]'
                                        : 'border-gray-300'
                                        }`}>
                                        {formData.gender === option && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#0d6cf2]"></div>
                                        )}
                                    </div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option}
                                        checked={formData.gender === option}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span className="text-sm text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>

                        {/* Address */}
                        <div className="space-y-1.5 relative">
                            <label className="text-xs text-[#0d6cf2] font-medium ml-1">Address*</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={2}
                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none resize-none"
                            />
                        </div>

                        {/* State & City */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs text-[#0d6cf2] font-medium ml-1">State/Province*</label>
                                <div className="relative">
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none appearance-none"
                                    >
                                        <option value="Misiones">Misiones</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <span className="absolute right-3 top-3 pointer-events-none material-symbols-outlined text-gray-400 text-lg">expand_more</span>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs text-[#0d6cf2] font-medium ml-1">City*</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none"
                                />
                            </div>
                        </div>

                        {/* Zip Code */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-[#0d6cf2] font-medium ml-1">Postal Code*</label>
                            <input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-[#111418] mb-4">University & Visa</h2>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">University Name</label>
                                <input
                                    type="text"
                                    name="universityName"
                                    value={formData.universityName}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none"
                                    placeholder="Enter your university"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Course Name</label>
                                <input
                                    type="text"
                                    name="courseName"
                                    value={formData.courseName}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none"
                                    placeholder="Enter your course"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">Level of Study</label>
                                    <div className="relative">
                                        <select
                                            name="levelOfStudy"
                                            value={formData.levelOfStudy}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none appearance-none"
                                        >
                                            <option value="Undergraduate">Undergraduate</option>
                                            <option value="Postgraduate">Postgraduate</option>
                                            <option value="PhD">PhD</option>
                                        </select>
                                        <span className="absolute right-3 top-3 pointer-events-none material-symbols-outlined text-gray-400 text-lg">expand_more</span>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">Visa Status</label>
                                    <div className="relative">
                                        <select
                                            name="visaStatus"
                                            value={formData.visaStatus}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm foocus:ring-2 focus:ring-[#0d6cf2] outline-none appearance-none"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Not Applied">Not Applied</option>
                                        </select>
                                        <span className="absolute right-3 top-3 pointer-events-none material-symbols-outlined text-gray-400 text-lg">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex gap-3">
                    <div className="bg-blue-50 p-2.5 rounded-xl shrink-0">
                        <span className="material-symbols-outlined text-[#0d6cf2] text-[24px]">description</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[#111418]">Application Form</h2>
                        <p className="text-xs text-[#60728a] mt-0.5">Please fill details to reserve your room.</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {renderStepper()}
                {renderStepContent()}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 mt-auto bg-white/50 backdrop-blur-sm">
                {step > 1 && (
                    <button
                        onClick={handleBack}
                        className="px-5 py-2.5 rounded-lg text-sm font-bold text-[#60728a] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Back
                    </button>
                )}
                {step < 3 ? (
                    <button
                        onClick={handleNext}
                        className="w-full md:w-auto px-8 py-2.5 rounded-lg text-sm font-bold bg-[#382da6] text-white hover:bg-[#2f258a] transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="w-full md:w-auto px-8 py-2.5 rounded-lg text-sm font-bold bg-[#0d6cf2] text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        Submit Application
                        <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default AccommodationApplicationForm;
