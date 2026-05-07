import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplications, Application } from '@/shared/contexts/ApplicationsContext';
import { useUserProfile } from '@/shared/contexts/UserProfileContext';
import { useAuth } from '@/shared/contexts/AuthContext';

interface ApplyScholarshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    scholarshipTitle: string;
}

const ApplyScholarshipModal: React.FC<ApplyScholarshipModalProps> = ({ isOpen, onClose, scholarshipTitle }) => {
    const navigate = useNavigate();
    const { submitApplication } = useApplications();
    const { userProfile } = useUserProfile();
    const { user } = useAuth();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');
    const [formData, setFormData] = useState({
        fullName: userProfile.identity.name || user?.name || '',
        mobileNumber: userProfile.identity.phone || '',
        course: 'Computer Science',
        gpa: userProfile.academics.gpa || '',
        achievements: '',
        statement: ''
    });

    const [files, setFiles] = useState<{ transcript: File | null, idCopy: File | null }>({
        transcript: null,
        idCopy: null
    });

    // Handle 5-second auto-redirect after submission
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isSubmitted && isOpen) {
            timer = setTimeout(() => {
                handleBackToScholarships();
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [isSubmitted, isOpen]);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'transcript' | 'idCopy') => {
        const file = e.target.files?.[0] || null;
        setFiles(prev => ({ ...prev, [type]: file }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newId = `SCH-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 900) + 100}`;
        setApplicationId(newId);

        const newApplication: Application = {
            id: newId,
            studentName: formData.fullName || userProfile.identity.name || user?.name || 'Alex Johnson',
            studentInitials: (formData.fullName || userProfile.identity.name || user?.name || 'Alex Johnson').split(' ').map(n => n[0]).join('').toUpperCase(),
            studentColor: 'blue',
            type: 'Scholarship',
            targetName: scholarshipTitle,
            institution: 'University of Toronto', // Default for now
            status: 'Pending',
            dateApplied: new Date().toISOString().split('T')[0],
            priority: 'Medium',
            mobileNumber: formData.mobileNumber,
            email: userProfile.identity.email || user?.email || 'student@example.com',
            courseMajor: formData.course,
            gpa: formData.gpa,
            achievements: formData.achievements,
            statement: formData.statement,
            documents: {
                transcript: files.transcript?.name || 'Academic_Transcript.pdf',
                idCopy: files.idCopy?.name || 'ID_Card.jpg'
            }
        };

        submitApplication(newApplication);
        setIsSubmitted(true);
    };

    const handleBackToScholarships = () => {
        onClose();
        navigate('/scholarships');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-500/10 backdrop-blur-[2px] animate-in fade-in duration-300">
            <div
                className="bg-white w-full max-w-[850px] max-h-[90vh] overflow-y-auto rounded-[32px] shadow-[0_30px_100px_rgba(30,99,243,0.15)] border border-blue-100 animate-in slide-in-from-bottom-8 duration-500 font-display relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                {!isSubmitted && (
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all z-20 group"
                    >
                        <span className="material-symbols-outlined text-[24px] group-hover:rotate-90 transition-transform duration-300">close</span>
                    </button>
                )}

                <div className="p-8 md:p-12">
                    {isSubmitted ? (
                        /* Success View */
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-500">
                            <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-8 border border-emerald-100">
                                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                    <span className="material-symbols-outlined text-[40px] font-bold">check</span>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                                Application submitted successfully
                            </h2>

                            <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl mb-6">
                                Your application for the <span className="text-blue-600 font-bold">{scholarshipTitle}</span> has been received and will be reviewed by a Counsellor.
                            </p>

                            <div className="flex items-center gap-2 mb-12">
                                <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Your application ID is</span>
                                <span className="bg-slate-100 px-4 py-2 rounded-xl text-slate-600 text-sm font-black border border-slate-200 shadow-sm">
                                    #{applicationId}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <button
                                    onClick={() => navigate('/scholarship-applications')}
                                    className="px-10 py-5 rounded-2xl bg-blue-600 text-white text-[13px] font-black uppercase tracking-widest hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-200"
                                >
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    View My Applications
                                </button>
                                <button
                                    onClick={handleBackToScholarships}
                                    className="px-10 py-5 rounded-2xl bg-white text-slate-600 text-[13px] font-black uppercase tracking-widest border-2 border-slate-100 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                                    Back to Scholarships
                                </button>
                            </div>

                            <p className="mt-12 text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
                                Redirecting to scholarships in 5 seconds...
                            </p>
                        </div>
                    ) : (
                        /* Form View */
                        <>
                            {/* Header Section */}
                            <div className="flex flex-col gap-3 mb-10 text-center md:text-left">
                                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200/50">
                                        <span className="material-symbols-outlined text-[28px]">school</span>
                                    </div>
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">Scholarship Application</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                                    {scholarshipTitle || 'Scholarship Application'}
                                </h2>
                                <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto md:mx-0">
                                    Please complete all fields to submit your application for the current academic cycle. Ensure all documents are clear and legible.
                                </p>
                            </div>

                            {/* Form Section */}
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Personal Info */}
                                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                                    <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-widest">
                                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100/50">
                                            <span className="material-symbols-outlined text-blue-600 !text-[18px]">person</span>
                                        </div>
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                                placeholder="Enter your full name"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                required
                                                type="text"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Mobile Number</label>
                                            <input
                                                className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                                placeholder="+91 XXXXX XXXXX"
                                                value={formData.mobileNumber}
                                                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                                required
                                                type="tel"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Info */}
                                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                                    <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-widest">
                                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100/50">
                                            <span className="material-symbols-outlined text-purple-600 !text-[18px]">menu_book</span>
                                        </div>
                                        Academic Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Course/Major</label>
                                            <select
                                                className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                                value={formData.course}
                                                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                            >
                                                <option>Computer Science</option>
                                                <option>Business Administration</option>
                                                <option>Mechanical Engineering</option>
                                                <option>Psychology</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current GPA</label>
                                            <input
                                                className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                                max="4.0"
                                                min="0"
                                                placeholder="3.85"
                                                step="0.01"
                                                value={formData.gpa}
                                                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                                required
                                                type="number"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements & Personal Statement */}
                                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                                    <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-widest">
                                        <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100/50">
                                            <span className="material-symbols-outlined text-amber-600 !text-[18px]">emoji_events</span>
                                        </div>
                                        Achievements & Statement
                                    </h3>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Key Achievements</label>
                                            <textarea
                                                className="rounded-xl border-slate-100 bg-slate-50/50 p-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none min-h-[100px] border hover:border-blue-200"
                                                placeholder="List honors, awards, or extracurricular impact..."
                                                value={formData.achievements}
                                                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Why do you deserve this scholarship?</label>
                                            <textarea
                                                className="rounded-xl border-slate-100 bg-slate-50/50 p-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none min-h-[150px] border hover:border-blue-200"
                                                placeholder="Describe your financial need, aspirations, and how this scholarship will help you..."
                                                value={formData.statement}
                                                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* Document Upload */}
                                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                                    <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-widest">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100/50">
                                            <span className="material-symbols-outlined text-emerald-600 !text-[18px]">upload_file</span>
                                        </div>
                                        Supporting Documents
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Transcripts (PDF)</span>
                                            <div className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer group bg-slate-50/50 overflow-hidden">
                                                <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-500 mb-2 transition-colors">cloud_upload</span>
                                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider group-hover:text-blue-600 transition-colors text-center px-4 truncate max-w-full">
                                                    {files.transcript ? files.transcript.name : 'Click to upload transcript'}
                                                </span>
                                                <input
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(e) => handleFileChange(e, 'transcript')}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student ID Copy (JPG/PNG)</span>
                                            <div className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer group bg-slate-50/50 overflow-hidden">
                                                <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-500 mb-2 transition-colors">badge</span>
                                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider group-hover:text-blue-600 transition-colors text-center px-4 truncate max-w-full">
                                                    {files.idCopy ? files.idCopy.name : 'Click to upload ID'}
                                                </span>
                                                <input
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'idCopy')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Footer */}
                                <div className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-[32px] shadow-xl shadow-blue-200 flex flex-col xl:flex-row justify-between items-center gap-6">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-blue-100 mt-0.5">info</span>
                                        <p className="text-[10px] text-blue-50 font-medium max-w-xs md:max-w-sm text-center md:text-left leading-relaxed uppercase tracking-wider">
                                            Certified submission. Review takes 14-21 business days. All information is handled securely.
                                        </p>
                                    </div>
                                    <div className="flex gap-4 w-full xl:w-auto">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 xl:flex-none px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-black uppercase tracking-widest transition-colors border border-white/20 whitespace-nowrap"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 xl:flex-none px-10 py-4 rounded-xl bg-white text-blue-600 text-[11px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10 whitespace-nowrap"
                                        >
                                            Submit Application
                                            <span className="material-symbols-outlined text-[18px]">send</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplyScholarshipModal;
