import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';

const Education = () => {
    const navigate = useNavigate();
    const { updateAcademics, updateIdentity, userProfile } = useUserProfile();

    const [formData, setFormData] = useState({
        university: userProfile?.academics?.institution || '',
        degree: userProfile?.academics?.degree || '',
        field_of_study: userProfile?.academics?.major || '',
        grad_year: userProfile?.academics?.gradYear || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContinue = () => {
        // Validation check (optional, but good)
        if (!formData.university || !formData.degree || !formData.field_of_study) {
            // Check required fields (except year which might be confusing for some)
            // For now just proceed but normally show error
        }

        updateAcademics({
            institution: formData.university,
            degree: formData.degree,
            major: formData.field_of_study,
            gradYear: formData.grad_year
        });

        // Update strength
        updateIdentity({ profileStrength: 60 });

        navigate('/profile-setup/goals');
    };

    return (
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 md:p-8">
                <div className="flex items-start gap-2 mb-8 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="material-symbols-outlined text-[#0d6cf2] text-[20px] mt-0.5">info</span>
                    <p className="text-sm text-slate-600">Please include your most recent or current qualification details. Accurate data improves your acceptance chances.</p>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="university">University / Institution Name</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">account_balance</span>
                            <input autoFocus
                                className="w-full h-12 pl-11 pr-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                id="university"
                                name="university"
                                placeholder="e.g. University of Toronto"
                                type="text"
                                value={formData.university}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="degree">Degree / Qualification</label>
                        <div className="relative">
                            <select
                                className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer"
                                id="degree"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                            >
                                <option disabled value="">Select Degree</option>
                                <option value="hs_diploma">High School Diploma</option>
                                <option value="bachelors">Bachelor's Degree</option>
                                <option value="masters">Master's Degree</option>
                                <option value="phd">Doctorate / PhD</option>
                                <option value="diploma">Associate Diploma</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="field_of_study">Field of Study</label>
                        <div className="relative">
                            <input
                                className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                id="field_of_study"
                                name="field_of_study"
                                placeholder="e.g. Computer Science, Business"
                                type="text"
                                value={formData.field_of_study}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="grad_year">Graduation Year</label>
                        <div className="relative">
                            <select
                                className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer"
                                id="grad_year"
                                name="grad_year"
                                value={formData.grad_year}
                                onChange={handleChange}
                            >
                                <option disabled value="">Select Year</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="hidden md:block md:col-span-1"></div>

                </form>
            </div>
            <div className="px-6 md:px-8 py-6 border-t border-gray-200 bg-slate-50/50 flex items-center justify-between rounded-b-xl">
                <button onClick={() => navigate('/profile-setup/basic')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    type="button">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back
                </button>
                <button onClick={handleContinue}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0d6cf2] hover:bg-blue-700 text-white font-medium transition-colors"
                    type="button">
                    <span>Continue</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
            </div>
        </section>
    );
};

export default Education;
