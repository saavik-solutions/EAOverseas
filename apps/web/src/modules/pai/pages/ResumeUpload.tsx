import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeUpload: React.FC = () => {
    const navigate = useNavigate();
    const [fileOptions] = useState(false);
    return (
        <div className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full h-full overflow-y-auto animate-fade-in relative z-10">
            <div className="mb-12 text-center">
                <h1 className="font-['Manrope'] text-4xl font-extrabold text-gray-900 mb-2">Resume Upload</h1>
                <p className="text-gray-600 text-lg">Step 2 of your Profile Intelligence Analysis</p>
            </div>

            <div className="space-y-12">
                {/* Drag and Drop Area */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                    <div className="relative bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-600 transition-all cursor-pointer">
                        <input accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" />
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                                <span className="material-symbols-outlined text-blue-600 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
                            </div>
                            <h3 className="font-['Manrope'] text-xl font-bold text-gray-900">Drag and drop resume or click to upload</h3>
                            <p className="text-gray-600 max-w-xs mx-auto">Upload your academic or professional CV in PDF format for real-time extraction.</p>
                            <div className="mt-4 flex gap-2">
                                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">PDF Accepted</span>
                                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">Max 10MB</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="space-y-6 opacity-50 pointer-events-none">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="font-['Manrope'] text-2xl font-bold text-gray-900">Resume Parsed Information Preview</h2>
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Automated Extraction Active</span>
                    </div>

                    {/* Collapsible Grid System (Bento Style) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Education Card */}
                        <div className="bg-gray-50 rounded-xl p-6 transition-all hover:bg-gray-100 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-600">school</span>
                                    <h4 className="font-bold text-gray-900">Education</h4>
                                </div>
                                <span className="material-symbols-outlined text-gray-500 cursor-pointer">expand_more</span>
                            </div>
                            <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg border border-gray-100">
                                    <p className="text-sm font-bold text-gray-900">BS in Computer Science</p>
                                    <p className="text-xs text-gray-600">Stanford University • 2020 - 2024</p>
                                </div>
                            </div>
                        </div>

                        {/* Experience Card */}
                        <div className="bg-gray-50 rounded-xl p-6 transition-all hover:bg-gray-100 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-600">work</span>
                                    <h4 className="font-bold text-gray-900">Experience</h4>
                                </div>
                                <span className="material-symbols-outlined text-gray-500 cursor-pointer">expand_more</span>
                            </div>
                            <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg border border-gray-100">
                                    <p className="text-sm font-bold text-gray-900">Software Engineering Intern</p>
                                    <p className="text-xs text-gray-600">Google • Summer 2023</p>
                                </div>
                            </div>
                        </div>

                        {/* Skills & Technologies (Combined Area) */}
                        <div className="md:col-span-2 bg-gray-50 rounded-xl p-6 transition-all hover:bg-gray-100 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-600">psychology</span>
                                    <h4 className="font-bold text-gray-900">Skills & Technologies</h4>
                                </div>
                                <span className="material-symbols-outlined text-gray-500 cursor-pointer">expand_more</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium">Full-Stack Development</span>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium">Cloud Architecture</span>
                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium">React.js</span>
                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium">Python</span>
                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium">AWS</span>
                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium">TypeScript</span>
                                <span className="bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium">+8 more</span>
                            </div>
                        </div>

                        {/* Certifications Card */}
                        <div className="md:col-span-2 bg-gray-50 rounded-xl p-6 transition-all hover:bg-gray-100 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-600">verified</span>
                                    <h4 className="font-bold text-gray-900">Certifications</h4>
                                </div>
                                <span className="material-symbols-outlined text-gray-500 cursor-pointer">expand_more</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                                    <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600">workspace_premium</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">AWS Certified Practitioner</p>
                                        <p className="text-xs text-gray-600">Issued Oct 2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                                    <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600">workspace_premium</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Google UX Design Professional</p>
                                        <p className="text-xs text-gray-600">Issued Jan 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                    <button onClick={() => navigate('/pai/profile-form')} className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Profile Form
                    </button>
                    <button onClick={() => navigate('/pai/linkedin-import')} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all group">
                        Continue to LinkedIn Import
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
            <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-sky-600/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>
        </div>
    );
};

export default ResumeUpload;
