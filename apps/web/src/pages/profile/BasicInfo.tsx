import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUserProfile } from '../../context/UserProfileContext';

const BasicInfo = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { updateIdentity, updateAcademics, updatePreferences, userProfile } = useUserProfile();

    // Initialize form data with existing context data if available (optional but good UX)
    const [formData, setFormData] = useState({
        country: userProfile?.identity?.country || '',
        educationLevel: userProfile?.academics?.degree || '',
        destination: userProfile?.preferences?.countries?.[0] || ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleContinue = () => {
        if (!formData.country || !formData.educationLevel || !formData.destination) {
            setError('Please fill out all fields to continue.');
            return;
        }

        // Save data to context
        updateIdentity({
            country: formData.country,
            profileStrength: 30 // Milestone 1
        });
        updateAcademics({ degree: formData.educationLevel });
        updatePreferences({ countries: [formData.destination] });

        navigate('/profile-setup/education');
    };

    return (
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="bg-blue-50 text-[#0d6cf2] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 w-full">
                        <span className="material-symbols-outlined text-[20px]">verified_user</span>
                        Your data is secure and used solely to improve consultation accuracy. We do not share your profile without permission.
                    </div>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 animate-pulse">
                        <span className="material-symbols-outlined text-[20px]">error</span>
                        {error}
                    </div>
                )}

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Full Name */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="fullName">Full Name</label>
                        <div className="relative">
                            <input
                                className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 placeholder:text-slate-400 focus:ring-0 focus:border-slate-200 transition-all outline-none cursor-not-allowed"
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={user?.name || ''}
                                readOnly
                            />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                        </div>
                    </div>
                    {/* Email Address */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="email">Email Address</label>
                        <div className="relative">
                            <input
                                className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 placeholder:text-slate-400 focus:ring-0 focus:border-slate-200 transition-all outline-none cursor-not-allowed"
                                id="email"
                                name="email"
                                type="email"
                                value={user?.email || ''}
                                readOnly
                            />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Contact support to change your email.</p>
                    </div>

                    {/* Country of Residence */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="country">Country of Residence</label>
                        <div className="relative">
                            <select
                                className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 appearance-none focus:ring-2 focus:ring-[#0d6cf2]/20 focus:border-[#0d6cf2] transition-all outline-none cursor-pointer"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            >
                                <option disabled value="">Select your country</option>
                                <option value="India">India</option>
                                <option value="USA">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Used to determine visa requirements.</p>
                    </div>

                    {/* Highest Education Level */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="educationLevel">Highest Education Level</label>
                        <div className="relative">
                            <select
                                className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 appearance-none focus:ring-2 focus:ring-[#0d6cf2]/20 focus:border-[#0d6cf2] transition-all outline-none cursor-pointer"
                                id="educationLevel"
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleChange}
                            >
                                <option disabled value="">Select qualification</option>
                                <option value="highschool">High School</option>
                                <option value="bachelors">Bachelor's Degree</option>
                                <option value="masters">Master's Degree</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    {/* Desired Study Destination */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="destination">Desired Study Destination</label>
                        <div className="relative">
                            <select
                                className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 appearance-none focus:ring-2 focus:ring-[#0d6cf2]/20 focus:border-[#0d6cf2] transition-all outline-none cursor-pointer"
                                id="destination"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                            >
                                <option disabled value="">Where do you want to study?</option>
                                <option value="USA">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="India">India</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Our AI will prioritize universities in this region.</p>
                    </div>
                </form>
            </div>
            <div className="px-6 md:px-8 py-6 border-t border-gray-200 bg-white flex items-center justify-between rounded-b-xl">
                <button onClick={() => navigate('/verification')}
                    className="text-slate-500 font-bold hover:text-slate-700 transition-colors"
                    type="button">
                    Cancel
                </button>
                <button onClick={handleContinue}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/20 text-white font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    type="button">
                    <span>Analyze & Continue</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
            </div>
        </section>
    );
};

export default BasicInfo;
