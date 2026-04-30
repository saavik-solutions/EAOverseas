import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useAuth } from '@/features/auth/context/AuthContext';

// Mock Data for Offer Letters
const MOCK_OFFERS = [
    {
        id: 'uoft',
        name: 'University of Toronto',
        fileName: 'uoft_offer_letter_2024.pdf',
        data: {
            university: 'University of Toronto',
            country: 'Canada',
            course: 'B.Sc. in Data Science',
            startDate: '2024-09-01'
        }
    },
    {
        id: 'harvard',
        name: 'Harvard University',
        fileName: 'harvard_acceptance_2024.pdf',
        data: {
            university: 'Harvard University',
            country: 'USA',
            course: 'Masters in Computer Science',
            startDate: '2024-08-25'
        }
    },
    {
        id: 'imperial',
        name: 'Imperial College London',
        fileName: 'imperial_offer_letter.pdf',
        data: {
            university: 'Imperial College London',
            country: 'United Kingdom',
            course: 'M.Sc. Artificial Intelligence',
            startDate: '2024-09-20'
        }
    }
];

const ConfirmAdmission = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedOfferId, setSelectedOfferId] = useState('');
    const [formData, setFormData] = useState({
        university: '',
        country: '',
        course: '',
        startDate: ''
    });

    const isManual = selectedOfferId === 'manual';

    const handleOfferSelection = (e) => {
        const offerId = e.target.value;
        setSelectedOfferId(offerId);

        if (offerId === 'manual') {
            setFormData({
                university: '',
                country: '',
                course: '',
                startDate: ''
            });
        } else {
            const offer = MOCK_OFFERS.find(o => o.id === offerId);
            if (offer) {
                setFormData(offer.data);
            } else {
                setFormData({
                    university: '',
                    country: '',
                    course: '',
                    startDate: ''
                });
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const selectedOffer = MOCK_OFFERS.find(o => o.id === selectedOfferId);

    const isFormValid = formData.university && formData.country && formData.course && formData.startDate;

    return (
        <div className="flex-1 h-screen overflow-y-auto">
            <PageHeader
                title={
                    <div className="flex items-center gap-1 text-base">
                        <button onClick={() => window.history.back()} className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Visa</button>
                        <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
                        <span className="text-[#111318]">Admission Details</span>
                    </div>
                }
                actions={<div className="w-10"></div>} // Spacer if no actions needed
            />

            <div className="max-w-[1000px] mx-auto p-8">
                {/* PageHeading */}
                <div className="flex flex-wrap justify-between gap-3 mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#111318] text-3xl font-black leading-tight tracking-[-0.033em]">Admission Details</h1>
                        <p className="text-[#616f89] text-base font-normal leading-normal max-w-2xl">To begin your student visa application, please confirm your offer from a recognized institution.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Offer Letter Selection Section */}
                    <div className="bg-white rounded-xl border border-[#f0f2f4] overflow-hidden shadow-sm">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-[#111318] text-lg font-bold leading-tight">Upload Offer / Admission Letter</h2>
                                    <p className="text-[#616f89] text-sm">Select your offer letter from the list to proceed.</p>
                                </div>
                                {/* Dropdown for Offer Selection */}
                                <div className="relative min-w-[250px]">
                                    <select
                                        value={selectedOfferId}
                                        onChange={handleOfferSelection}
                                        className="w-full pl-4 pr-10 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                                    >
                                        <option value="">Select Offer Letter</option>
                                        <option value="manual">Enter Details Manually</option>
                                        {user?.isDemo && MOCK_OFFERS.map(offer => (
                                            <option key={offer.id} value={offer.id}>{offer.name}</option>
                                        ))}
                                        {!user?.isDemo && (
                                            <option value="" disabled>No offer letters found</option>
                                        )}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area - Shows PDF Preview or Placeholder */}
                            <div className="border-2 border-dashed border-zinc-200 rounded-xl p-0 flex flex-col items-center justify-center bg-zinc-50 min-h-[250px] transition-colors overflow-hidden">
                                {selectedOffer ? (
                                    // PDF Preview State
                                    <div className="w-full h-full flex flex-col items-center justify-center py-10 animation-fade-in bg-slate-50">
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 flex flex-col items-center gap-4 max-w-sm w-full mx-auto">
                                            <div className="size-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-2">
                                                <span className="material-symbols-outlined text-4xl">picture_as_pdf</span>
                                            </div>
                                            <div className="text-center">
                                                <h3 className="text-[#111318] font-bold text-lg mb-1 truncate max-w-[250px]">{selectedOffer.fileName}</h3>
                                                <p className="text-emerald-600 text-sm font-bold flex items-center justify-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                                    Uploaded & Verified
                                                </p>
                                            </div>
                                            <button className="text-blue-600 text-sm font-bold hover:underline">Preview Document</button>
                                        </div>
                                    </div>
                                ) : isManual ? (
                                    // Manual Entry State
                                    <div className="flex flex-col items-center justify-center p-10 text-center animate-fade-in">
                                        <div className="size-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                            <span className="material-symbols-outlined text-3xl">edit_note</span>
                                        </div>
                                        <p className="text-[#111318] text-lg font-bold mb-1">Manual Entry Mode</p>
                                        <p className="text-[#616f89] text-sm max-w-xs">Please fill in the institution details manually in the form below.</p>
                                    </div>
                                ) : (
                                    // Empty State
                                    <div className="flex flex-col items-center justify-center p-10 text-center">
                                        <div className="size-14 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mb-4">
                                            <span className="material-symbols-outlined text-3xl">upload_file</span>
                                        </div>
                                        <p className="text-[#111318] text-lg font-bold mb-1">No Offer Selected</p>
                                        <p className="text-[#616f89] text-sm max-w-xs">Please select an offer letter from the dropdown or choose "Enter Details Manually".</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Institution Details Section (Card) */}
                    <div className="bg-white rounded-xl border border-[#f0f2f4] overflow-hidden shadow-sm">
                        <div className="p-6">
                            <div className="flex justify-between items-center border-b border-[#f0f2f4] pb-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">account_balance</span>
                                    <h2 className="text-[#111318] text-lg font-bold">Institution details</h2>
                                </div>
                                {/* Validation Badge - Only show if data is populated */}
                                {formData.university && !isManual && (
                                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full animate-fade-in">
                                        <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
                                        <span className="text-xs font-bold">Recognized Institution</span>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#111318] text-sm font-bold">University / Institution Name</label>
                                    <input
                                        className={`w-full bg-zinc-50 border-zinc-200 rounded-lg text-sm px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all ${isManual ? 'bg-white' : 'disabled:opacity-60 disabled:cursor-not-allowed'}`}
                                        placeholder="Select an offer letter to fill details"
                                        type="text"
                                        name="university"
                                        value={formData.university}
                                        onChange={handleInputChange}
                                        readOnly={!isManual}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#111318] text-sm font-bold">Destination Country</label>
                                    <div className="relative">
                                        <input
                                            className={`w-full bg-zinc-50 border-zinc-200 rounded-lg text-sm px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all ${isManual ? 'bg-white' : 'disabled:opacity-60 disabled:cursor-not-allowed'}`}
                                            type="text"
                                            name="country"
                                            placeholder="Auto-filled"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            readOnly={!isManual}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#111318] text-sm font-bold">Course Name</label>
                                    <input
                                        className={`w-full bg-zinc-50 border-zinc-200 rounded-lg text-sm px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all ${isManual ? 'bg-white' : 'disabled:opacity-60 disabled:cursor-not-allowed'}`}
                                        placeholder="Auto-filled"
                                        type="text"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleInputChange}
                                        readOnly={!isManual}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#111318] text-sm font-bold">Course Start Date</label>
                                    <div className="relative">
                                        <input
                                            className={`w-full bg-zinc-50 border-zinc-200 rounded-lg text-sm px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all ${isManual ? 'bg-white' : 'disabled:opacity-60 disabled:cursor-not-allowed'}`}
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            readOnly={!isManual}
                                        />
                                    </div>
                                </div>
                            </div>
                            {formData.university ? (
                                <div className="mt-6 flex items-start gap-3 bg-blue-50 p-4 rounded-lg animation-fade-in">
                                    <span className="material-symbols-outlined text-blue-600 text-xl">info</span>
                                    <p className="text-blue-600 text-sm font-medium leading-snug">
                                        {isManual ? 'Please verify that all details match your offer letter exactly.' : 'Information verified from your uploaded offer letter.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-6 flex items-start gap-3 bg-zinc-50 p-4 rounded-lg">
                                    <span className="material-symbols-outlined text-zinc-400 text-xl">info</span>
                                    <p className="text-zinc-500 text-sm font-medium leading-snug">
                                        Please select an offer letter above or choose "Enter Details Manually".
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="flex flex-col gap-4 items-center justify-center mt-4">
                        <button
                            disabled={!isFormValid}
                            onClick={() => navigate('/visa-application/documents', { state: { admissionDetails: formData } })}
                            className="flex min-w-[280px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-blue-600 text-white text-lg font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            Continue Application
                        </button>
                        <p className="text-[#616f89] text-sm">
                            Need help? <a className="text-blue-600 font-bold hover:underline" href="#">Contact Support</a>
                        </p>
                    </div>
                </div>

                {/* Footer (Simple) */}
                <footer className="mt-12 p-8 border-t border-[#f0f2f4] text-center">
                    <p className="text-[#616f89] text-xs font-normal">© 2024 EAOverseas Platform. All rights reserved. Secure government-standard encryption enabled.</p>
                </footer>
            </div>
        </div>
    );
};

export default ConfirmAdmission;
