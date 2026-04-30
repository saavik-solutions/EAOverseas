import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Documents = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Simulating file states (null = no file, object = file uploaded)
    const [files, setFiles] = useState({
        passport: null,
        photo: null,
        transcripts: null,
        sop: null,
        lor: null,
        visa: null
    });

    const handleFileChange = (type, e) => {
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({ ...prev, [type]: file }));
        }
    };

    const removeFile = (type) => {
        setFiles(prev => ({ ...prev, [type]: null }));
    };

    const isCourseApplication = !!searchParams.get('title');

    const handleNext = () => {
        if (isCourseApplication) {
            navigate(`/application/review?${searchParams.toString()}`);
        } else {
            navigate(`/application/payment?${searchParams.toString()}`);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const renderDropzone = (type, label, subtitle, icon) => {
        const file = files[type];

        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">{label} <span className="text-red-500">*</span></span>
                    <span className="text-xs text-slate-400">{subtitle}</span>
                </div>

                {!file ? (
                    <div
                        onClick={() => document.getElementById(`input-${type}`).click()}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl px-6 py-8 bg-slate-50 hover:bg-slate-100 hover:border-blue-300 transition-all cursor-pointer group"
                    >
                        <div className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[24px]">{icon}</span>
                        </div>
                        <div className="text-center">
                            <label className="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-700 focus-within:outline-none">
                                <span>Click to upload</span>
                            </label>
                            <span className="text-slate-500 pl-1">or drag and drop</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">PDF, JPG, PNG up to 10MB</p>
                    </div>
                ) : (
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-blue-600">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                        </div>
                        <button onClick={() => removeFile(type)} className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-red-600 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                    </div>
                )}
                <input
                    type="file"
                    id={`input-${type}`}
                    className="hidden"
                    accept={type === 'photo' ? 'image/*' : '.pdf,.jpg,.png'}
                    onChange={(e) => handleFileChange(type, e)}
                />
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Form Header */}
            <div className="border-b border-slate-100 p-4 md:p-8 pb-4 md:pb-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                            <span className="material-symbols-outlined">upload_file</span>
                        </span>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Upload Documents</h1>
                    </div>
                    <p className="text-slate-500 text-xs md:text-sm max-w-2xl pl-0 md:pl-12 mt-1 md:mt-0">
                        Please upload the following documents to support your application.
                    </p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="p-4 pt-4 md:p-8 md:pt-6 flex flex-col gap-6 md:gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {renderDropzone('passport', 'Passport Copy', 'First & Last Page', 'flight_takeoff')}
                    {renderDropzone('photo', 'Passport Photo', 'White background', 'account_box')}
                    {renderDropzone('transcripts', 'Academic Transcripts', 'Latest marksheets', 'school')}
                    {renderDropzone('sop', 'Statement of Purpose', 'Brief essay', 'edit_note')}
                    {renderDropzone('lor', 'Letter of Recommendation', 'From Professor/Employer', 'recommend')}
                    {!isCourseApplication && renderDropzone('visa', 'Visa Copy Photo', 'If applicable', 'badge')}
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
                        {isCourseApplication ? 'Continue to Review' : 'Continue to Payment'}
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Documents;
