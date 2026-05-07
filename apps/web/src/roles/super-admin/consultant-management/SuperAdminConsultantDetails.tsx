import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import { useParams, useNavigate } from 'react-router-dom';

const SuperAdminConsultantDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [consultant, setConsultant] = useState<any>(null);

    useEffect(() => {
        // 1. Load the shared list from LocalStorage
        const saved = localStorage.getItem('eao_consultants');
        const consultantsList = saved ? JSON.parse(saved) : [];

        // 2. Find the specific consultant by slug ID
        const found = consultantsList.find((c: any) => {
            const currentSlug = c.id || c.name.replace(/\s+/g, '-').toLowerCase();
            return currentSlug === id;
        });

        if (found) {
            const fullData = found.personalInfo ? { ...found } : {
                name: found.name,
                role: found.specialty?.includes('Visa') ? 'Lead Visa Specialist' : 'Senior Advisor',
                rating: found.rating ?? 0,
                reviews: found.reviews || 0,
                experience: found.experience || 'New Member',
                status: found.status || 'Active',
                avatar: found.avatar,
                personalInfo: { 
                    fullName: found.name, 
                    email: found.email, 
                    phone: found.phone || 'Not Provided', 
                    office: found.office || 'Global Office', 
                    employeeId: found.empId || found.employeeId || 'EAO-NEW', 
                    joiningDate: found.joinDate || found.joiningDate || 'Joined Today'
                },
                professionalDetails: { 
                    specialization: found.selectedCountries || [found.specialty || 'General'], 
                    examsExpertise: found.selectedExams || ['IELTS'], 
                    languages: found.languages || 'English', 
                    education: found.education || 'High Education'
                }
            };
            setConsultant(fullData);
        } else {
            setConsultant({
                name: 'Elena Rodriguez',
                role: 'Senior Consultant - STEM Specialist',
                rating: 4.8,
                reviews: 250,
                experience: '10+ Years',
                status: 'Active',
                avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256',
                personalInfo: { fullName: 'Elena Rodriguez', email: 'elena.rodriguez@eaoverseas.com', phone: '+1 (555) 123-4567', office: 'London Hub', employeeId: 'EAO-8829', joiningDate: 'Jan 12, 2020' },
                professionalDetails: { specialization: ['Canada', 'USA', 'UK'], examsExpertise: ['IELTS', 'GRE', 'GMAT'], languages: 'English, German, French', education: 'Ph.D. Educational Leadership' }
            });
        }
    }, [id]);

    if (!consultant) return null;

    return (
        <SuperAdminLayout title="Consultant Profile">
            <div className="p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
                {/* Header Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="relative">
                            <img src={consultant.avatar} alt={consultant.name} className="size-24 rounded-full object-cover border-4 border-white shadow-lg" />
                            <div className={`absolute bottom-1 right-1 size-5 rounded-full border-4 border-white ${consultant.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{consultant.name}</h2>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                                    <span className="material-symbols-outlined text-[18px] text-slate-500">badge</span>
                                    <span className="text-xs font-bold text-slate-600">{consultant.role || 'Consultant'}</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${consultant.rating > 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <span key={s} className={`material-symbols-outlined text-[18px] ${s <= Math.floor(consultant.rating) && consultant.rating > 0 ? 'fill-amber-500' : ''}`}>star</span>
                                        ))}
                                    </div>
                                    <span className={`text-sm font-black ${consultant.rating > 0 ? 'text-slate-900' : 'text-slate-400'}`}>{consultant.rating}</span>
                                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">({consultant.reviews} reviews)</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 mt-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Experience:</span>
                                    <span className="text-xs font-black text-slate-700">{consultant.experience || consultant.professionalDetails?.experience || 'New'}</span>
                                </div>
                                <div className="h-4 w-px bg-slate-200"></div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[11px] font-black uppercase tracking-widest ${consultant.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>{consultant.status || 'Active'} Status</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => navigate('/superadmin/consultants')}
                            className="bg-slate-50 text-slate-500 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-slate-100 transition-all border border-slate-200"
                        >
                            <span className="material-symbols-outlined font-black">arrow_back</span>
                            Back to List
                        </button>
                        <button 
                            onClick={() => navigate(`/superadmin/consultant/ratings/${id}`)}
                            className="bg-[#2b6cee] text-white px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-opacity-90 transition-all shadow-xl shadow-blue-100 border-b-4 border-blue-700"
                        >
                            <span className="material-symbols-outlined font-black">verified</span>
                            Check Rating
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#2b6cee] font-black">person</span>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Personal Information</h3>
                        </div>
                        <div className="p-8 grid grid-cols-2 gap-y-10 gap-x-12">
                            <div>
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Full Name</label>
                                <p className="text-base font-black text-slate-800 leading-none">{consultant.personalInfo?.fullName || consultant.name}</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Email Address</label>
                                <p className="text-base font-black text-slate-800 leading-none truncate">{consultant.personalInfo?.email || consultant.email}</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Phone</label>
                                <p className="text-base font-black text-slate-800 leading-none">{consultant.personalInfo?.phone || 'Not Available'}</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Office</label>
                                <p className="text-base font-black text-slate-800 leading-none">{consultant.personalInfo?.office || 'General'}</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Employee ID</label>
                                <p className="text-base font-black text-slate-800 leading-none">{consultant.personalInfo?.employeeId || 'EAO-UNK'}</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Joining Date</label>
                                <p className="text-base font-black text-slate-800 leading-none">{consultant.personalInfo?.joiningDate || 'Today'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Details */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#2b6cee] font-black">work_history</span>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Professional Details</h3>
                        </div>
                        <div className="p-8 flex flex-col gap-10">
                            <div>
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-3">Specialization</label>
                                <div className="flex flex-wrap gap-2">
                                    {(consultant.professionalDetails?.specialization || []).map((s: string) => (
                                        <div key={s} className="bg-slate-50 border border-slate-100 flex items-center gap-2 px-4 py-2 rounded-xl">
                                            <span className="text-[10px] font-black text-slate-400 tracking-tight">{s.substring(0, 2).toUpperCase()}</span>
                                            <span className="text-xs font-black text-slate-700">{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-3">Exams Expertise</label>
                                <div className="flex flex-wrap gap-2">
                                    {(consultant.professionalDetails?.examsExpertise || []).map((e: string) => (
                                        <div key={e} className="bg-blue-50 text-[#2b6cee] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                                            {e}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Languages</label>
                                    <p className="text-sm font-black text-slate-800">{consultant.professionalDetails?.languages || 'English'}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Education</label>
                                    <p className="text-sm font-black text-slate-800">{consultant.professionalDetails?.education || 'Degree'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminConsultantDetails;
