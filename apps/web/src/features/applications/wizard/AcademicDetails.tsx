import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AcademicDetails = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleNext = () => {
        navigate(`/application/documents?${searchParams.toString()}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleDropzoneClick = (e) => {
        if (e.target.tagName !== 'LABEL' && e.target.tagName !== 'SPAN') {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Form Header */}
            <div className="border-b border-slate-100 p-4 md:p-8 pb-4 md:pb-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                            <span className="material-symbols-outlined">school</span>
                        </span>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Academic History</h1>
                    </div>
                    <p className="text-slate-500 text-xs md:text-sm max-w-2xl pl-0 md:pl-12 mt-1 md:mt-0">
                        Please provide details of your most recent educational qualification.
                    </p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="p-4 pt-4 md:p-8 md:pt-6 flex flex-col gap-6 md:gap-8">
                {/* Education Level */}
                <div className="grid gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Highest Education Level <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">school</span>
                            <select className="w-full pl-12 pr-10 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none appearance-none cursor-pointer">
                                <option disabled selected value="">Select your qualification</option>
                                <option>Bachelor's Degree</option>
                                <option>Master's Degree</option>
                                <option>High School Diploma</option>
                                <option>PhD / Doctorate</option>
                                <option>Associate Degree</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined pointer-events-none">expand_more</span>
                        </div>
                    </label>
                </div>

                {/* Institution & Major */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Institution Attended <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">apartment</span>
                            <input
                                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400 outline-none transition-all"
                                placeholder="e.g. University of Mumbai"
                                type="text"
                            />
                        </div>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Major / Field of Study <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">menu_book</span>
                            <input
                                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400 outline-none transition-all"
                                placeholder="e.g. Computer Science"
                                type="text"
                            />
                        </div>
                    </label>
                </div>

                {/* Date & GPA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">Graduation Date <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">event</span>
                            <input
                                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400 outline-none transition-all appearance-none"
                                type="date"
                            />
                        </div>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">GPA / Percentage <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">grade</span>
                            <input
                                className="w-full pl-12 pr-20 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400 outline-none transition-all"
                                placeholder="3.8"
                                type="text"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <select className="h-9 rounded-md border-none bg-slate-50 text-slate-600 text-sm focus:ring-0 cursor-pointer outline-none">
                                    <option>/ 4.0</option>
                                    <option>/ 5.0</option>
                                    <option>/ 10.0</option>
                                    <option>%</option>
                                </select>
                            </div>
                        </div>
                    </label>
                </div>

                {/* File Upload Section */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-700">Academic Transcripts</span>
                    <div
                        onClick={handleDropzoneClick}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl px-6 py-10 bg-slate-50 hover:bg-slate-100 hover:border-blue-300 transition-all cursor-pointer group"
                    >
                        <div className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[24px]">upload_file</span>
                        </div>
                        <div className="text-center">
                            <label className="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-700 focus-within:outline-none" htmlFor="file-upload">
                                <span>Click to upload</span>
                                <input
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="sr-only"
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                />
                            </label>
                            <span className="text-slate-500 pl-1">or drag and drop</span>
                        </div>
                        {!fileName ? (
                            <p className="text-xs text-slate-400 mt-2">PDF, JPG, PNG up to 10MB</p>
                        ) : (
                            <p className="text-sm font-medium text-blue-600 mt-2 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                {fileName}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 mt-2 border-t border-slate-100">
                    <button
                        onClick={handleBack}
                        className="w-full sm:w-auto text-slate-500 hover:text-slate-800 font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        Continue to Documents
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcademicDetails;
