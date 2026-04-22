import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

import { useUserProfile } from '../context/UserProfileContext';

const AcademicSnapshotDetails = () => {
    const { userProfile } = useUserProfile();
    const { academics = {} } = userProfile;

    // State to track uploaded files
    const [uploadedFiles, setUploadedFiles] = useState({});

    // ... (rest of uploadedFiles handlers) ...
    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFiles(prev => ({
                ...prev,
                [index]: {
                    name: file.name,
                    size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                    type: file.type
                }
            }));
        }
    };

    const handleRemoveFile = (e, index) => {
        e.stopPropagation(); // Prevent triggering the upload click
        setUploadedFiles(prev => {
            const newState = { ...prev };
            delete newState[index];
            return newState;
        });
        // Reset the input value so the same file can be selected again if needed
        const input = document.getElementById(`file-upload-${index}`);
        if (input) input.value = '';
    };

    const triggerFileInput = (index) => {
        document.getElementById(`file-upload-${index}`).click();
    };

    const documents = [
        { label: "10th Marksheet / Certificate", icon: "school", subtext: "Mark sheet", required: true },
        { label: "12th Marksheet / Certificate", icon: "school", subtext: "Mark sheet", required: true },
        { label: "Bachelor’s Degree Certificate", icon: "school", subtext: "Certificate", required: true },
        { label: "Bachelor’s Transcripts (All Semesters)", icon: "description", subtext: "Mark Sheets", required: true },
        { label: "Master’s Degree Certificate", icon: "school", subtext: "If applicable", required: false },
        { label: "Passport (Front & Back)", icon: "flight_takeoff", subtext: "First & Last Page", required: true },
        { label: "Passport Size Photograph", icon: "account_circle", subtext: "White background", required: true },
        { label: "Government ID", icon: "badge", subtext: "Aadhaar / National ID", required: false },
        { label: "Statement of Purpose (SOP)", icon: "edit_note", subtext: "Brief essay", required: true },
        { label: "Letter of Recommendation (LOR)", icon: "thumb_up", subtext: "From Professor/Employer", required: true },
        { label: "Bank Statements", icon: "account_balance", subtext: "Financial Proof", required: true },
        { label: "Income Proof", icon: "attach_money", subtext: "Parent / Sponsor", required: true },
        { label: "ITR / Form 16", icon: "receipt_long", subtext: "If applicable", required: false },
        { label: "Loan Sanction Letter", icon: "request_quote", subtext: "If loan approved", required: false },
        { label: "Offer Letter from University", icon: "mail", subtext: "Admission Offer", required: true },
        { label: "CAS Letter / COE / I-20", icon: "assignment", subtext: "Country specific", required: true },
        { label: "Visa Application Form", icon: "airplane_ticket", subtext: "Filled Copy", required: true },
        { label: "Medical / Health Certificate", icon: "medical_services", subtext: "If required", required: false }
    ];

    // State for Edit Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditField, setCurrentEditField] = useState(null); // { key, label, value }
    const [editValue, setEditValue] = useState('');

    const { updateAcademics } = useUserProfile();

    const openEditModal = (key, label, value) => {
        setCurrentEditField({ key, label });
        setEditValue(value || '');
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        if (currentEditField) {
            updateAcademics({ [currentEditField.key]: editValue });
            setIsEditModalOpen(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc] relative">
            <PageHeader title={
                <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Link to="/profile" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px] md:text-[20px]">home</span>
                    </Link>
                    <span className="material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <Link to="/profile" className="text-gray-500 hover:text-blue-600 transition-colors">
                        Profile
                    </Link>
                    <span className="material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <span className="text-[#111418] font-semibold">Academic Snapshot</span>
                </div>
            } />

            <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-40 flex justify-center">
                <div className="w-full max-w-[1000px] flex flex-col gap-6">

                    {/* Header Details */}
                    <div className="flex flex-col gap-1 pb-4">
                        <h1 className="text-[#111418] text-2xl md:text-3xl font-bold tracking-tight">Academic Snapshot</h1>
                        <p className="text-slate-500 text-sm">These details and documents will be used to automatically fill your applications.</p>
                    </div>

                    {/* Data Accuracy Info */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-full shrink-0">
                                <span className="material-symbols-outlined text-[20px]">info</span>
                            </div>
                            <div>
                                <h3 className="text-[#111418] font-semibold text-sm">Data Accuracy</h3>
                                <p className="text-slate-500 text-xs">Keep this information accurate to avoid errors during application submission.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded border border-green-100">
                            <span className="material-symbols-outlined text-green-600 text-[16px]">sync</span>
                            <span className="text-xs font-medium text-green-700">Auto-sync enabled</span>
                        </div>
                    </div>

                    {/* Missing Information Warning */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-full shrink-0">
                                <span className="material-symbols-outlined text-[20px]">warning</span>
                            </div>
                            <div>
                                <h3 className="text-[#111418] font-semibold text-sm">Missing Information Detected</h3>
                                <p className="text-slate-600 text-xs">Some academic details may be missing. Please verify.</p>
                            </div>
                        </div>
                        <button className="whitespace-nowrap px-4 py-2 bg-white text-[#111418] text-sm font-semibold border border-gray-200 rounded hover:bg-gray-50 transition-colors shadow-sm">
                            Update Information
                        </button>
                    </div>

                    {/* Academic Information Section */}
                    <div className="mt-4">
                        <div className="flex items-center gap-4 mb-4">
                            <h2 className="text-[#111418] text-lg font-bold">Academic Information</h2>
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">check_circle</span>
                                {academics.degree ? 'VERIFIED' : 'PENDING'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Academic Cards */}
                            <AcademicInfoCard
                                label="HIGHEST QUALIFICATION"
                                value={academics.degree || '--'}
                                onEdit={() => openEditModal('degree', 'Highest Qualification', academics.degree)}
                            />
                            <AcademicInfoCard
                                label="INSTITUTION NAME"
                                value={academics.institution || '--'}
                                onEdit={() => openEditModal('institution', 'Institution Name', academics.institution)}
                            />
                            <AcademicInfoCard
                                label="UNIVERSITY / BOARD"
                                value={academics.universityBoard || '--'}
                                onEdit={() => openEditModal('universityBoard', 'University / Board', academics.universityBoard)}
                            />
                            <AcademicInfoCard
                                label="FIELD OF STUDY"
                                value={academics.major || '--'}
                                onEdit={() => openEditModal('major', 'Field of Study', academics.major)}
                            />
                            <AcademicInfoCard
                                label="GRADUATION YEAR"
                                value={academics.gradYear || '--'}
                                onEdit={() => openEditModal('gradYear', 'Graduation Year', academics.gradYear)}
                            />
                            <AcademicInfoCard
                                label="CGPA"
                                value={academics.gpa || '--'}
                                onEdit={() => openEditModal('gpa', 'CGPA', academics.gpa)}
                            />
                        </div>
                    </div>

                    {/* Document Uploads Section */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[#111418] text-lg font-bold">Documents ({documents.length})</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {documents.map((doc, index) => (
                                <div
                                    key={index}
                                    onClick={() => triggerFileInput(index)}
                                    className={`
                                        border border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[180px] cursor-pointer transition-all group relative
                                        ${uploadedFiles[index]
                                            ? 'border-green-300 bg-green-50/30'
                                            : 'border-blue-200 bg-blue-50/30 hover:bg-blue-50/50'
                                        }
                                    `}
                                >
                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        id={`file-upload-${index}`}
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, index)}
                                    />

                                    <div className="w-full flex justify-between items-start -mt-2 mb-3">
                                        <div className="flex-1 pr-2">
                                            <span className={`text-sm font-medium block leading-tight ${uploadedFiles[index] ? 'text-green-700' : 'text-[#111418]'}`}>
                                                {doc.label} {doc.required && !uploadedFiles[index] && <span className="text-red-500">*</span>}
                                            </span>
                                        </div>
                                        {doc.subtext && <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap bg-white px-1.5 py-0.5 rounded border border-slate-100">{doc.subtext}</span>}
                                    </div>

                                    {uploadedFiles[index] ? (
                                        // Uploaded State
                                        <div className="flex flex-col items-center w-full">
                                            <div className="p-3 bg-green-50 text-green-600 rounded-full mb-3">
                                                <span className="material-symbols-outlined text-[28px]">description</span>
                                            </div>
                                            <p className="text-green-700 font-medium text-sm mb-1 text-center truncate w-full px-2">{uploadedFiles[index].name}</p>
                                            <p className="text-[10px] text-green-600/70 text-center">{uploadedFiles[index].size}</p>

                                            <button
                                                onClick={(e) => handleRemoveFile(e, index)}
                                                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-100 transition-colors"
                                                title="Remove file"
                                            >
                                                <span className="material-symbols-outlined text-[16px] block">close</span>
                                            </button>
                                        </div>
                                    ) : (
                                        // Default State
                                        <div className="flex flex-col items-center">
                                            <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                                                <span className="material-symbols-outlined text-[28px]">{doc.icon}</span>
                                            </div>
                                            <p className="text-blue-600 font-medium text-sm mb-1 text-center">Click to upload</p>
                                            <p className="text-[10px] text-slate-400 text-center">PDF, JPG, PNG up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">Edit {currentEditField?.label}</h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        <div className="p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {currentEditField?.label}
                            </label>
                            <input
                                type="text"
                                className="w-full h-12 rounded-lg border border-gray-300 px-4 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                placeholder={`Enter ${currentEditField?.label}`}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveEdit();
                                }}
                            />
                        </div>
                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Component for Academic Information Cards
const AcademicInfoCard = ({ label, value, onEdit }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:border-blue-400 transition-colors group relative">
        <div
            onClick={onEdit}
            className="absolute top-4 right-4 text-gray-400 group-hover:text-blue-600 cursor-pointer transition-colors p-1 hover:bg-blue-50 rounded-full"
        >
            <span className="material-symbols-outlined text-[18px]">edit</span>
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">{label}</span>
        <p className="text-[#111418] text-xl font-bold truncate" title={value}>{value}</p>
    </div>
);

export default AcademicSnapshotDetails;
