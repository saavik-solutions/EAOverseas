import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        personal: { name: '', location: '', nationality: '', languages: '' },
        paiConfig: { isEngineering: false, hasPortfolio: false },
        academic: { degree: '', major: '', university: '', gpa: '', graduationYear: '' },
        testScores: { ielts: '', toefl: '', gre: '', gmat: '' },
        experience: { role: '', company: '', duration: '' },
        skills: '',
        careerGoals: { targetCountry: '', targetIndustry: '', preferredRole: '' }
    });

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 6));
    const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));
    const isLastStep = step === 6;

    return (
        <div className="flex-1 h-full overflow-y-auto w-full animate-fade-in bg-gray-50 relative">
            <div className="p-8 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Form</h1>
                    <p className="text-gray-600">Complete your profile to generate a detailed intelligence report.</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8 relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                Step {step} of 6
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-blue-600">
                                {Math.round((step / 6) * 100)}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                        <div style={{ width: `${(step / 6) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"></div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="City, Country" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Indian" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="English, Hindi (comma separated)" />
                                </div>
                            </div>
                            <div className="border-t pt-6 mt-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Background Configuration</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            checked={formData.paiConfig.isEngineering}
                                            onChange={(e) => setFormData({ ...formData, paiConfig: { ...formData.paiConfig, isEngineering: e.target.checked } })}
                                        />
                                        <div>
                                            <span className="block font-medium text-gray-900">Engineering Background</span>
                                            <span className="block text-xs text-gray-500">Includes GitHub analysis</span>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            checked={formData.paiConfig.hasPortfolio}
                                            onChange={(e) => setFormData({ ...formData, paiConfig: { ...formData.paiConfig, hasPortfolio: e.target.checked } })}
                                        />
                                        <div>
                                            <span className="block font-medium text-gray-900">Have a Portfolio/Website</span>
                                            <span className="block text-xs text-gray-500">Includes Portfolio discovery</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Academic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="B.Tech" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Computer Science" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="University Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA / Percentage</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="8.5 or 85%" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="2024" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Test Scores</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">IELTS</label>
                                    <input type="number" step="0.5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Band Score (e.g. 7.5)" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">TOEFL</label>
                                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Total Score (e.g. 105)" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GRE</label>
                                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Total Score (e.g. 320)" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GMAT</label>
                                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Total Score (e.g. 700)" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Experience</h2>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Role / Job Title</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Software Engineering Intern" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tech Innovations Inc." />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jun 2023 - Aug 2023" />
                                    </div>
                                </div>
                            </div>
                            <button className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-700">
                                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                Add Another Experience
                            </button>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Skills</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Technical Skills & Tools</label>
                                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Python, React, Machine Learning, Docker, SQL (comma separated)"></textarea>
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Career Goals</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Country</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="USA, UK, Canada" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Industry</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Fintech, EdTech, AI" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Role</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Data Scientist, Product Manager" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
                        <button
                            onClick={handlePrev}
                            disabled={step === 1}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        >
                            Back
                        </button>

                        <button
                            onClick={isLastStep ? () => {
                                localStorage.setItem('pai_config', JSON.stringify(formData.paiConfig));
                                navigate('/pai/resume-upload');
                            } : handleNext}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            {isLastStep ? 'Continue to Resume Upload' : 'Next Step'}
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
