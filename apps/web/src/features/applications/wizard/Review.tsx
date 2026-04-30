import React, { useState } from 'react';
import { useNavigate, useSearchParams, useOutletContext, Link } from 'react-router-dom';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';

const Review = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { uniName, courseName } = useOutletContext();
    const { submitApplication } = useSavedItems();
    const isCourseApplication = !!searchParams.get('title');
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = () => {
        if (!agreed) {
            alert("Please agree to the Terms & Conditions and Privacy Policy to submit your application.");
            return;
        }
        submitApplication({
            universityName: uniName,
            courseName: courseName,
            // You might want to pass more details here if available from context or params
        });
        navigate(`/application/submitted?${searchParams.toString()}`);
    };

    const handleBack = () => {
        // Go back to documents
        navigate(-1);
    };

    const { userProfile, profileDocuments } = useSavedItems();

    // Merge context docs with any local docs functionality if needed, for now just use context
    const displayDocs = profileDocuments || [];

    const ReviewSection = ({ title, icon, onEdit, children, autofilled }) => (
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 relative group">
            <div className="bg-slate-50 px-4 py-3 md:px-6 md:py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm md:text-base">
                    <span className="material-symbols-outlined text-slate-400 !text-[20px] md:!text-[24px]">{icon}</span>
                    {title}
                </h3>
                <div className="flex items-center gap-2 md:gap-3">
                    {autofilled && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-blue-100 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px] md:text-[12px]">magic_button</span>
                            <span className="hidden sm:inline">Autofilled</span>
                        </span>
                    )}
                    <button onClick={onEdit} className="text-xs md:text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[14px] md:text-[16px]">edit</span> Edit
                    </button>
                </div>
            </div>
            <div className="p-4 md:p-6 bg-white">
                {children}
            </div>
        </div>
    );

    const DetailItem = ({ label, value }) => (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
            <span className="text-sm font-semibold text-slate-900">{value}</span>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Form Header */}
            <div className="border-b border-slate-100 p-4 md:p-8 pb-4 md:pb-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-start md:items-center gap-2">
                        <span className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0">
                            <span className="material-symbols-outlined">reviews</span>
                        </span>
                        <h1 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                            {isCourseApplication ? 'Review Course Application' : 'Review University Application'}
                        </h1>
                    </div>
                    <p className="text-slate-500 text-xs md:text-sm max-w-2xl pl-10 md:pl-12">
                        Please review your details carefully before submitting your application to <span className="font-semibold text-slate-900">{uniName}</span>.
                    </p>
                </div>

                {/* Application Summary Card */}
                <div className="mt-4 md:mt-6 ml-0 md:ml-12 p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 md:mb-3">Application For</h3>
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="size-10 md:size-12 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-blue-600 text-[20px] md:text-[24px]">school</span>
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 text-base md:text-lg leading-tight">{uniName}</div>
                            {isCourseApplication ? (
                                <div className="text-xs md:text-sm text-blue-600 font-medium flex items-center gap-1 mt-0.5">
                                    <span className="material-symbols-outlined text-[14px] md:text-[16px]">menu_book</span>
                                    {courseName}
                                </div>
                            ) : (
                                <div className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">General University Admission</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 pt-4 md:p-8 md:pt-6">
                {/* Personal Details */}
                <ReviewSection
                    title="Personal Details"
                    icon="person"
                    autofilled={true}
                    onEdit={() => navigate(`/application/details?${searchParams.toString()}`)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <DetailItem label="Full Name" value={userProfile?.fullName || "Alex Morgan"} />
                        <DetailItem label="Date of Birth" value={userProfile?.dob || "1999-08-12"} />
                        <DetailItem label="Email Address" value={userProfile?.email || "alex.morgan@example.com"} />
                        <DetailItem label="Mobile Number" value={userProfile?.phone || "+1 (555) 123-4567"} />
                        <DetailItem label="Nationality" value={userProfile?.nationality || "American"} />
                        <DetailItem label="Country of Residence" value={userProfile?.residence || "United States"} />
                    </div>
                </ReviewSection>

                {/* Academic History */}
                <ReviewSection
                    title="Academic History"
                    icon="school"
                    autofilled={true}
                    onEdit={() => navigate(`/application/academic?${searchParams.toString()}`)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <DetailItem label="Highest Qualification" value={userProfile?.education?.level || "Bachelor's Degree"} />
                        <DetailItem label="Institution" value={userProfile?.education?.institution || "University of California, Berkeley"} />
                        <DetailItem label="Major" value={userProfile?.education?.major || "Computer Science"} />
                        <DetailItem label="Graduation Date" value={userProfile?.education?.gradDate || "2021-05-30"} />
                        <DetailItem label="GPA" value={userProfile?.education?.gpa ? `${userProfile.education.gpa} / 4.0` : "3.8 / 4.0"} />
                    </div>
                </ReviewSection>

                {/* Documents */}
                <ReviewSection
                    title="Uploaded Documents"
                    icon="folder"
                    autofilled={true}
                    onEdit={() => navigate(`/application/documents?${searchParams.toString()}`)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayDocs.map((doc, idx) => (
                            <div key={idx} className="flex items-center p-3 border border-slate-200 rounded-lg bg-slate-50">
                                <div className="size-10 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 text-red-500">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </div>
                                <div className="ml-3 flex-1 overflow-hidden">
                                    <div className="text-sm font-medium text-slate-900 truncate">{doc.name}</div>
                                    <div className="text-xs text-slate-500">{doc.size} • Ready to submit</div>
                                </div>
                                <span className="material-symbols-outlined text-green-600 text-[20px] ml-2">check_circle</span>
                            </div>
                        ))}
                    </div>
                </ReviewSection>

                {/* Declaration */}
                <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 mt-8">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative flex items-center mt-1">
                            <input
                                type="checkbox"
                                className="peer size-5 appearance-none border-2 border-slate-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-[16px]">check</span>
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold text-slate-900 block mb-1">Declaration</span>
                            <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                                I hereby declare that the information provided is true and correct. I understand that any willful consideration of facts will result in the disqualification of my candidacy. I agree to the <Link to="/terms" target="_blank" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy-security" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                            </span>
                        </div>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8 mt-4 border-t border-slate-100">
                    <button
                        onClick={handleBack}
                        className="w-full sm:w-auto text-slate-500 hover:text-slate-800 font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={`w-full sm:w-auto text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg transition-all transform flex items-center justify-center gap-2 group ${agreed
                            ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 active:scale-95 cursor-pointer'
                            : 'bg-slate-300 cursor-not-allowed shadow-none'
                            }`}
                        disabled={!agreed}
                    >
                        Submit Application
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
