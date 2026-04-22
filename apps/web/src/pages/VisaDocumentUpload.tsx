import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const DOCUMENT_SECTIONS = [
    {
        title: "Section 1: Identity Documents",
        icon: "badge",
        items: [
            { id: 'passport', title: 'Current Passport', subtitle: 'Scan of the bio page and signature page', icon: 'travel' },
            { id: 'photo', title: 'Digital Photographs', subtitle: 'White background, 35mm x 45mm, JPEG format', icon: 'photo_camera' }
        ]
    },
    {
        title: "Section 2: Admission Documents",
        icon: "school",
        items: [
            { id: 'offer_letter', title: 'University Offer Letter', subtitle: 'Unconditional offer from host institution', icon: 'history_edu' },
            { id: 'cas', title: 'I-20 / CAS / LOA / CoE', subtitle: 'Official document issued by university for visa', icon: 'assignment' }
        ]
    },
    {
        title: "Section 3: Financial Documents",
        icon: "account_balance_wallet",
        items: [
            { id: 'bank_statements', title: 'Bank Statements', subtitle: 'Last 6 months showing sufficient funds', icon: 'account_balance' },
            { id: 'loan_letter', title: 'Loan Sanction Letter', subtitle: 'Signed letter from approved financial institution', icon: 'handshake' },
            { id: 'scholarship', title: 'Scholarship Proof', subtitle: 'Grant letter or financial award notification', icon: 'workspace_premium' }
        ]
    },
    {
        title: "Section 4: Additional Documents",
        icon: "add_circle",
        items: [
            { id: 'sop', title: 'Statement of Purpose (SOP)', subtitle: 'Visa-specific intent and motivation letter', icon: 'edit_note' },
            { id: 'medical', title: 'Medical Report', subtitle: 'Health clearance certificate from authorized panel', icon: 'medical_services' },
            { id: 'pcc', title: 'Police Clearance Certificate', subtitle: 'Valid PCC from your local regional office', icon: 'policy' }
        ]
    }
];

const VisaDocumentUpload = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const admissionDetails = location.state?.admissionDetails || {};
    const country = admissionDetails.country || 'United Kingdom';

    // Determine Visa Type based on Country
    const getVisaTitle = (c) => {
        if (!c) return 'Student Visa Application';
        if (c === 'United Kingdom' || c === 'UK') return 'Tier 4 Student Visa - United Kingdom';
        if (c === 'USA' || c === 'United States') return 'F-1 Student Visa - USA';
        if (c === 'Canada') return 'Study Permit - Canada';
        if (c === 'Australia') return 'Student Visa (Subclass 500) - Australia';
        return `Student Visa - ${c}`;
    };

    const fileInputRef = React.useRef(null);
    const [activeDocId, setActiveDocId] = useState(null);

    // Track upload status for each document ID
    const [uploadStatus, setUploadStatus] = useState({
        offer_letter: true
    });

    const handleUpload = (id) => {
        setActiveDocId(id);
        fileInputRef.current?.click();
    };

    const handleReupload = (id) => {
        setActiveDocId(id);
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && activeDocId) {
            // Simulate upload delay
            setTimeout(() => {
                setUploadStatus(prev => ({ ...prev, [activeDocId]: true }));
                setActiveDocId(null);
                // Reset value so same file can be selected again if needed
                if (fileInputRef.current) fileInputRef.current.value = '';
            }, 500);
        }
    };

    const totalDocs = DOCUMENT_SECTIONS.reduce((acc, section) => acc + section.items.length, 0);
    const uploadedDocs = Object.values(uploadStatus).filter(Boolean).length;
    const progressPercentage = Math.round((uploadedDocs / totalDocs) * 100);

    return (
        <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
            />
            <PageHeader
                title={
                    <div className="flex items-center gap-1 text-base">
                        <button onClick={() => navigate('/visas')} className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Visa</button>
                        <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
                        <button onClick={() => navigate('/visa-application/confirm')} className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Admission Details</button>
                        <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
                        <span className="text-[#111318]">Visa Documents</span>
                    </div>
                }
            />

            <div className="max-w-[1000px] mx-auto p-8 pb-32">
                {/* PageHeading */}
                <div className="flex flex-wrap justify-between gap-3 mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#111318] text-3xl font-black leading-tight tracking-[-0.033em]">Upload Visa Documents</h1>
                        <p className="text-[#616f89] text-base font-normal leading-normal max-w-2xl">{getVisaTitle(country)}</p>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="mb-8 p-4 rounded-xl border border-blue-600/20 bg-blue-600/5 flex items-start gap-4">
                    <div className="text-blue-600 mt-1">
                        <span className="material-symbols-outlined">info</span>
                    </div>
                    <div>
                        <p className="text-[#111318] text-base font-bold leading-tight">Information</p>
                        <p className="text-[#616f89] text-sm mt-1">Documents can be uploaded one by one. Your progress is saved automatically. Please ensure all scans are clear and in color where applicable.</p>
                    </div>
                </div>

                {/* Document Sections */}
                {DOCUMENT_SECTIONS.map((section, idx) => (
                    <div key={idx} className="mb-10">
                        <h3 className="text-[#111318] text-[20px] font-bold leading-tight mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-600">{section.icon}</span>
                            {section.title}
                        </h3>
                        <div className="bg-white border border-[#dbdfe6] rounded-xl overflow-hidden shadow-sm">
                            {section.items.map((item, itemIdx) => {
                                const isuploaded = uploadStatus[item.id];
                                return (
                                    <div key={item.id} className={`flex items-center gap-4 px-6 py-4 ${itemIdx !== section.items.length - 1 ? 'border-b border-[#dbdfe6]' : ''}`}>
                                        <div className={`flex items-center justify-center rounded-lg shrink-0 size-12 ${isuploaded ? 'bg-blue-600/10 text-blue-600' : 'bg-[#f0f2f4] text-[#111318]'}`}>
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <p className="text-[#111318] text-base font-medium">{item.title}</p>
                                            <p className="text-[#616f89] text-xs">{item.subtitle}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {isuploaded ? (
                                                <>
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1 animate-fade-in">
                                                        <span className="material-symbols-outlined text-sm">check_circle</span> Uploaded
                                                    </span>
                                                    {item.id !== 'offer_letter' && (
                                                        <button
                                                            onClick={() => handleReupload(item.id)}
                                                            className="size-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                                                            title="Re-upload Document"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">sync</span>
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleUpload(item.id)}
                                                    className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm active:scale-95"
                                                >
                                                    Upload
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Guidance Block */}
                <div className="bg-gray-50 p-5 rounded-xl border border-dashed border-[#dbdfe6] mb-20">
                    <h4 className="text-sm font-bold flex items-center gap-2 mb-2 text-[#111318]">
                        <span className="material-symbols-outlined text-base">verified</span>
                        Upload Guidance
                    </h4>
                    <ul className="text-xs text-[#616f89] space-y-1 ml-6 list-disc">
                        <li>Supported formats: <strong>PDF, JPG, PNG</strong> only.</li>
                        <li>Maximum file size: <strong>5MB</strong> per document.</li>
                        <li>Scan quality: Minimum 300 DPI, no cut-off corners, no glare.</li>
                        <li>Ensure all text is legible and signatures are clearly visible.</li>
                    </ul>
                </div>
            </div>

            {/* Sticky Footer Actions */}
            <footer className="sticky bottom-0 w-full bg-white border-t border-[#dbdfe6] py-4 px-10 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#616f89] hidden md:block">Progress: {uploadedDocs} of {totalDocs} documents uploaded</span>
                    <div className="w-48 h-2 bg-gray-200 rounded-full hidden md:block">
                        <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
                <div className="flex items-center gap-6">

                    <button
                        className={`flex items-center gap-2 text-white text-sm font-bold px-8 py-3 rounded-xl transition-all ${uploadedDocs === totalDocs ? 'bg-blue-600 hover:bg-blue-700 shadow-md' : 'bg-blue-600/50 cursor-not-allowed'}`}
                        disabled={uploadedDocs !== totalDocs}
                    >
                        <span>Continue</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default VisaDocumentUpload;
