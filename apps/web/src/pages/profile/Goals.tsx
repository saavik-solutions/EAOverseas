import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../context/UserProfileContext';

const Goals = () => {
    const navigate = useNavigate();
    const { updatePreferences, updateIdentity, userProfile } = useUserProfile();

    const [formData, setFormData] = useState({
        program_type: userProfile?.preferences?.programType || '',
        budget: userProfile?.preferences?.budget || '',
        intake: userProfile?.preferences?.intakes?.[0] || '',
        timeline: userProfile?.preferences?.timeline || 'immediately',
        factors: userProfile?.preferences?.factors || []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => {
                const newFactors = checked
                    ? [...prev.factors, value]
                    : prev.factors.filter(f => f !== value);
                return { ...prev, factors: newFactors };
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFinish = () => {
        updatePreferences({
            programType: formData.program_type,
            budget: formData.budget,
            intakes: [formData.intake], // Keeping structure array-like for consistency
            timeline: formData.timeline,
            factors: formData.factors
        });

        // Final Milestone: Complete Profile
        updateIdentity({ profileStrength: 100 });

        navigate('/profile-setup/completed');
    };

    return (
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 md:p-8">
                <div className="flex items-start gap-2 mb-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="material-symbols-outlined text-slate-500 text-[20px] mt-0.5">lightbulb</span>
                    <p className="text-sm text-slate-600">The more specific you are here, the better your AI match score will be for potential universities.</p>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="program-type">Preferred Program Type</label>
                        <div className="relative">
                            <select
                                className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 appearance-none focus:ring-2 focus:ring-[#0d6cf2]/20 focus:border-[#0d6cf2] transition-all outline-none cursor-pointer"
                                id="program-type"
                                name="program_type"
                                value={formData.program_type}
                                onChange={handleChange}
                            >
                                <option disabled value="">Select program level</option>
                                <option value="masters">Master's Degree (MS/MA)</option>
                                <option value="mba">MBA</option>
                                <option value="phd">PhD / Doctorate</option>
                                <option value="bachelors">Bachelor's Degree</option>
                                <option value="diploma">PG Diploma / Certificate</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="budget">Annual Budget Range (Tuition)</label>
                        <div className="relative">
                            <select
                                className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 appearance-none focus:ring-2 focus:ring-[#0d6cf2]/20 focus:border-[#0d6cf2] transition-all outline-none cursor-pointer"
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                            >
                                <option disabled value="">Select your budget</option>
                                <option value="under_15k">Less than $15,000</option>
                                <option value="15k_30k">$15,000 - $30,000</option>
                                <option value="30k_50k">$30,000 - $50,000</option>
                                <option value="50k_plus">$50,000+</option>
                                <option value="flexible">Flexible / Don't Know</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="intake">Intake Preference</label>
                        <div className="relative">
                            <select
                                className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 appearance-none focus:ring-2 focus:ring-[#0d6cf2]/20 focus:border-[#0d6cf2] transition-all outline-none cursor-pointer"
                                id="intake"
                                name="intake"
                                value={formData.intake}
                                onChange={handleChange}
                            >
                                <option disabled value="">When do you want to start?</option>
                                <option value="fall_2024">Fall 2024 (Aug/Sep)</option>
                                <option value="spring_2025">Spring 2025 (Jan/Feb)</option>
                                <option value="summer_2025">Summer 2025 (May/Jun)</option>
                                <option value="fall_2025">Fall 2025</option>
                                <option value="flexible">Flexible</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="timeline">When do you plan to apply?</label>
                        <div className="relative">
                            <select
                                className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 appearance-none focus:ring-2 focus:ring-[#0d6cf2]/20 focus:border-[#0d6cf2] transition-all outline-none cursor-pointer"
                                id="timeline"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                            >
                                <option value="immediately">Immediately (This month)</option>
                                <option value="1_3_months">Within 1-3 months</option>
                                <option value="3_6_months">Within 3-6 months</option>
                                <option value="exploring">Just exploring options</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-900 mb-3">Key Decision Factors <span className="text-xs font-normal text-slate-500 ml-1">(Select all that apply)</span></label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                                { val: 'scholarships', label: 'Scholarships & Aid' },
                                { val: 'ranking', label: 'University Ranking' },
                                { val: 'career', label: 'Career Opportunities' },
                                { val: 'visa', label: 'Post-Study Visa' },
                                { val: 'research', label: 'Research Focus' },
                                { val: 'location', label: 'Location & Lifestyle' }
                            ].map((factor) => (
                                <label key={factor.val} className="cursor-pointer relative group">
                                    <input
                                        className="peer sr-only"
                                        name="factors"
                                        type="checkbox"
                                        value={factor.val}
                                        checked={formData.factors.includes(factor.val)}
                                        onChange={handleChange}
                                    />
                                    <div className="p-3.5 rounded-lg border border-slate-200 bg-white transition-all flex items-center gap-3 hover:border-slate-300 peer-checked:[&>div:first-child]:bg-[#0d6cf2] peer-checked:[&>div:first-child]:border-[#0d6cf2] peer-checked:[&>div:first-child_span]:opacity-100">
                                        <div className="size-5 rounded border border-slate-300 flex items-center justify-center text-white transition-colors">
                                            <span className="material-symbols-outlined text-[14px] opacity-0 transition-opacity">check</span>
                                        </div>
                                        <span className="text-sm font-medium">{factor.label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
            <div className="px-6 md:px-8 py-6 border-t border-gray-200 bg-slate-50/50 flex items-center justify-between rounded-b-xl">
                <button onClick={() => navigate('/profile-setup/education')}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-2"
                    type="button">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back
                </button>
                <button onClick={handleFinish}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0d6cf2] hover:bg-blue-700 text-white font-medium transition-colors"
                    type="button">
                    <span>Finish Profile</span>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </button>
            </div>
        </section>
    );
};

export default Goals;
