import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

const DEFAULT_CONSULTANTS = [
    {
        name: 'Liam Smith',
        email: 'liam.s@eaoverseas.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrDaQadzcKETSmU43z89uAcQYHFHVNAcfznBm8hyGXDlXssaUO2y39YbS2KPSRGe-44yPdhq1UzRe9eCwRUAzKE_A7jnNS3Q00UfGk1ThrIT7WgcbWrQTdfkV4RxrS5I5IB-7bsJf3ujZWlPQZJ3_DQq7KT-Eihb95-GYvbbetwiWxgz9AApeUS9ASBEoUNgx4vmcIxwmwGsGFkfWKbgZ7grr-OfuU3cd79WHckxjEl0biL-VeJy0qur8kbyTN61ogFNHoQsnxgb4',
        specialty: 'Visa Guidance',
        assignedStudents: 24,
        rating: 4.8,
        status: 'Active'
    },
    {
        name: 'Sarah Jenkins',
        email: 'sarah.j@eaoverseas.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAItVYiS_ClPdBiemoyRXKwIOxxOTMd0McFmnbEHBcES0G0s-h63p--QHioW1lR6R8vqSrsEBSlTrp8S7ByDUAqHd31Cbr2V5JCEyv_lR8tIIrIg7XFkqSImcNG1RzwO0FXY2SxW-5ljc96clWW-eeBpdWBEO-F3nGYoixLfP6qhy4PvZQEmUT6kQPVmfwPuC-3mnsTycuNfEiezW7_kGioBvG6dizAsFfWB940rlcYGTddwJhR-Ml6yqyF9dm5PN2INoOsIlk4Mi4',
        specialty: 'Admissions',
        assignedStudents: 31,
        rating: 4.9,
        status: 'Active'
    },
    {
        name: 'Robert Chen',
        email: 'robert.c@eaoverseas.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZZjDbwo-gqrgF8KQs6b9SABxmFBB1tXrO6rC3W_uj26P9T1TC7Xv9ZU6x1VHPwpsPnkiMgZASLXH6YwI_dlxFK96AoCCmGdZx4CtHGNvZ54lifmofEjeC5HRqo4G7OINjPoyfqP9KhAejfxjXJehdk3lYdFFj23parXY5VumySwxC7Tnb4-E1zfZrJvH8VN8lZvUXHx8lCspOl2Z8ptQZZbTecbk5iKVCwxmBKUwtH0Blsb7KwMWhxUIkL6QAfsAFCOplJljbY9Y',
        specialty: 'Documentation',
        assignedStudents: 0,
        rating: 4.2,
        status: 'Inactive'
    },
    {
        name: 'Emily Davis',
        email: 'emily.d@eaoverseas.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQTJNrm76AQqXjRMpzoWm6BfFrV7MCg9HwDs0c5bwSIOjJ_XrjUsdXT-bSPyXh5V6h7762Z3HrglFPIc1LsXG8STrOu0N3tTtfHhsVlXIxu0rkTDgpgIMrdYGtf3ldJMk3ZphjApAhsZpGBmQC06Ai9R-iQdhmZwMDZpBSaa56dqwa4cDguG4n63pYX8Iq-y_CDSfxhmm1girIaRhPhJqrc8VRACPY2jfBrLB7O3V4iKKCEGRju4qy80jmng5k_lA9b9pQRuInWbA',
        specialty: 'Visa Guidance',
        assignedStudents: 18,
        rating: 4.7,
        status: 'Active'
    }
];

const SuperAdminConsultantManagement: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [consultants, setConsultants] = useState<any[]>([]);

    // Initial Defaults Helpers
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    const generateEmpId = () => `EAO-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Load data from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('eao_consultants');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Migrating existing test members (like 'laila') to 0 rating if they have 0 students
            const migrated = parsed.map((c: any) => {
                if (c.assignedStudents === 0 && (c.rating === 5 || c.rating === '5')) {
                    return { ...c, rating: 0 };
                }
                return c;
            });
            setConsultants(migrated);
            localStorage.setItem('eao_consultants', JSON.stringify(migrated));
        } else {
            setConsultants(DEFAULT_CONSULTANTS);
            localStorage.setItem('eao_consultants', JSON.stringify(DEFAULT_CONSULTANTS));
        }
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        office: 'Hyderabad',
        empId: generateEmpId(),
        joinDate: getTodayDate(),
        languages: '',
        education: '',
        experience: '',
        profileImage: '' as string | null,
        selectedCountries: [] as string[],
        selectedExams: [] as string[]
    });

    // Reset/Re-generate defaults when opening modal
    useEffect(() => {
        if (isAddModalOpen) {
            setFormData(prev => ({
                ...prev,
                office: 'Hyderabad',
                empId: generateEmpId(),
                joinDate: getTodayDate()
            }));
        }
    }, [isAddModalOpen]);

    // Step Validation Logic
    const isStepValid = () => {
        if (currentStep === 1) {
            return (
                formData.name.trim() !== '' &&
                formData.email.trim() !== '' &&
                formData.phone.trim() !== '' &&
                formData.office.trim() !== '' &&
                formData.empId.trim() !== '' &&
                formData.joinDate !== ''
            );
        }
        if (currentStep === 2) {
            return (
                formData.languages.trim() !== '' &&
                formData.education.trim() !== '' &&
                formData.experience.trim() !== '' &&
                formData.selectedCountries.length > 0
            );
        }
        return true;
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleTag = (field: 'selectedCountries' | 'selectedExams', tag: string) => {
        setFormData(prev => {
            const current = (prev[field] as string[]);
            const exists = current.includes(tag);
            return {
                ...prev,
                [field]: exists ? current.filter(t => t !== tag) : [...current, tag]
            };
        });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            handleInputChange('profileImage', imageUrl);
        }
    };

    const handleComplete = () => {
        const newConsultant = {
            id: formData.name.replace(/\s+/g, '-').toLowerCase(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            avatar: formData.profileImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256',
            specialty: formData.selectedCountries[0] + ' Specialist',
            role: 'Consultant',
            assignedStudents: 0,
            rating: 0,
            reviews: 0,
            status: 'Active',
            personalInfo: {
                fullName: formData.name,
                email: formData.email,
                phone: formData.phone,
                office: formData.office,
                employeeId: formData.empId,
                joiningDate: formData.joinDate
            },
            professionalDetails: {
                specialization: formData.selectedCountries,
                examsExpertise: formData.selectedExams,
                languages: formData.languages,
                education: formData.education,
                experience: formData.experience + ' Years'
            }
        };

        const updatedList = [newConsultant, ...consultants];
        setConsultants(updatedList);
        localStorage.setItem('eao_consultants', JSON.stringify(updatedList));
        setIsAddModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            office: 'Hyderabad',
            empId: generateEmpId(),
            joinDate: getTodayDate(),
            languages: '',
            education: '',
            experience: '',
            profileImage: null,
            selectedCountries: [],
            selectedExams: []
        });
        setCurrentStep(1);
    };

    return (
        <SuperAdminLayout title="Consultant Management">
            {/* ... (rest of the component identical to previous fixed version) ... */}
            <div className="p-8 flex flex-col gap-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div 
                        onClick={() => navigate('/superadmin/consultants/directory?status=All')}
                        className="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-[#2b6cee] hover:shadow-md transition-all group"
                    >
                        <div className="bg-slate-100 text-slate-600 p-3 rounded-lg group-hover:bg-blue-50 group-hover:text-[#2b6cee] transition-colors">
                            <span className="material-symbols-outlined">groups</span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Consultants</p>
                            <h3 className="text-2xl font-bold text-slate-900">{consultants.length}</h3>
                        </div>
                    </div>
                    <div 
                        onClick={() => navigate('/superadmin/consultants/directory?status=Active')}
                        className="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm flex items-center gap-4 border-l-4 border-l-emerald-600 cursor-pointer hover:shadow-md transition-all group"
                    >
                        <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg group-hover:bg-emerald-100 transition-colors">
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Active</p>
                            <h3 className="text-2xl font-bold text-emerald-600">{consultants.filter(c => c.status === 'Active').length}</h3>
                        </div>
                    </div>
                    <div 
                        onClick={() => navigate('/superadmin/consultants/directory?status=Inactive')}
                        className="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm flex items-center gap-4 border-l-4 border-l-rose-500 cursor-pointer hover:shadow-md transition-all group"
                    >
                        <div className="bg-rose-50 text-rose-500 p-3 rounded-lg group-hover:bg-rose-100 transition-colors">
                            <span className="material-symbols-outlined">cancel</span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Inactive</p>
                            <h3 className="text-2xl font-bold text-rose-500">{consultants.filter(c => c.status === 'Inactive').length}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h3 className="font-bold text-slate-900">Consultant Directory</h3>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => { setIsAddModalOpen(true); setCurrentStep(1); }}
                                className="bg-[#2b6cee] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm mr-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">person_add</span>
                                Add New Counsellor
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Specialty</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Assigned Students</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {consultants.map((consultant, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-cover bg-center border border-slate-200" style={{ backgroundImage: `url(${consultant.avatar})` }}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900">{consultant.name}</span>
                                                    <span className="text-[11px] text-slate-500">{consultant.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500">
                                                {consultant.specialty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-semibold text-slate-700">{consultant.assignedStudents}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <span className={`material-symbols-outlined text-[18px] ${consultant.rating > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}>star</span>
                                                <span className={`text-sm font-bold ${consultant.rating > 0 ? 'text-slate-700' : 'text-slate-400'}`}>{consultant.rating}</span>
                                                <span className="text-[10px] text-slate-400">/5</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`size-2 rounded-full ${consultant.status === 'Active' ? 'bg-emerald-500 shadow-sm shadow-emerald-200' : 'bg-slate-300'}`}></div>
                                                <span className={`text-[11px] font-bold uppercase tracking-widest ${consultant.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                    {consultant.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => navigate(`/superadmin/consultant/profile/${consultant.id || consultant.name.replace(/\s+/g, '-').toLowerCase()}`)}
                                                className="text-[#2b6cee] bg-blue-50 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#2b6cee] hover:text-white transition-all shadow-sm flex items-center gap-2 ml-auto"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                                View Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Modal ... same as previous ... */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-[540px] rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">Add New Consultant</h2>
                                <button 
                                    onClick={() => { setIsAddModalOpen(false); resetForm(); }}
                                    className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 hover:bg-slate-50 rounded-full"
                                >
                                    <span className="material-symbols-outlined font-black text-[20px]">close</span>
                                </button>
                            </div>
                            
                            {/* Stepper */}
                            <div className="relative flex items-center justify-between px-6">
                                <div className="absolute top-4 left-6 right-6 h-1 bg-slate-100 -z-10"></div>
                                <div className="absolute top-4 left-6 h-1 bg-[#2b6cee] -z-10 transition-all duration-500 ease-in-out" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}></div>
                                
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-black ring-4 ring-white shadow-sm transition-all ${currentStep >= 1 ? 'bg-[#2b6cee] text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${currentStep >= 1 ? 'text-[#2b6cee]' : 'text-slate-400'}`}>Personal</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-black ring-4 ring-white shadow-sm transition-all ${currentStep >= 2 ? 'bg-[#2b6cee] text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${currentStep >= 2 ? 'text-[#2b6cee]' : 'text-slate-400'}`}>Professional</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-black ring-4 ring-white shadow-sm transition-all ${currentStep >= 3 ? 'bg-[#2b6cee] text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${currentStep >= 3 ? 'text-[#2b6cee]' : 'text-slate-400'}`}>Confirm</span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto max-h-[calc(100vh-320px)] bg-slate-50/10">
                            {currentStep === 1 && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile Picture</label>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <div 
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`w-full h-32 border-2 border-dashed rounded-[20px] flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group bg-white overflow-hidden relative ${formData.profileImage ? 'border-[#2b6cee]' : 'border-slate-200 hover:bg-blue-50/50 hover:border-[#2b6cee]'}`}
                                        >
                                            {formData.profileImage ? (
                                                <>
                                                    <img src={formData.profileImage} alt="Profile Preview" className="size-full object-cover" />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-[#2b6cee] group-hover:text-white transition-all shadow-sm">
                                                        <span className="material-symbols-outlined font-black text-[20px]">upload</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-xs font-black text-slate-700">Click or drag profile photo</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Name *</label>
                                            <input value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-xl py-3 px-4 text-xs font-bold focus:border-[#2b6cee] outline-none" type="text" />
                                        </div>
                                        <div className="flex flex-col gap-2.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Address *</label>
                                            <input value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-xl py-3 px-4 text-xs font-bold focus:border-[#2b6cee] outline-none" type="email" />
                                        </div>
                                        <div className="flex flex-col gap-2.5 md:col-span-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Phone Number *</label>
                                            <input value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-xl py-3 px-4 text-xs font-bold focus:border-[#2b6cee] outline-none" type="tel" />
                                        </div>
                                        <div className="flex flex-col gap-2.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Office *</label>
                                            <input value={formData.office} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none text-slate-400" type="text" readOnly />
                                        </div>
                                        <div className="flex flex-col gap-2.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Employee ID *</label>
                                            <input value={formData.empId} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none text-slate-400" type="text" readOnly />
                                        </div>
                                        <div className="flex flex-col gap-2.5 md:col-span-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Joining Date *</label>
                                            <input value={formData.joinDate} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none text-slate-400" type="date" readOnly />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Specialization *</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['Ireland', 'UK', 'USA', 'Canada', 'Australia', 'Germany'].map(spec => (
                                                <button key={spec} onClick={() => toggleTag('selectedCountries', spec)} className={`px-3 py-3 border-2 rounded-xl text-[10px] font-black transition-all ${formData.selectedCountries.includes(spec) ? 'border-[#2b6cee] bg-blue-50 text-[#2b6cee]' : 'border-slate-100 bg-white text-slate-600'}`}>{spec}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Languages *</label>
                                            <input value={formData.languages} onChange={(e) => handleInputChange('languages', e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-xl py-3 px-4 text-xs font-bold focus:border-[#2b6cee] outline-none" type="text" />
                                        </div>
                                        <div className="flex flex-col gap-2.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Education *</label>
                                            <input value={formData.education} onChange={(e) => handleInputChange('education', e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-xl py-3 px-4 text-xs font-bold focus:border-[#2b6cee] outline-none" type="text" />
                                        </div>
                                        <div className="flex flex-col gap-2.5 md:col-span-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Experience (Years) *</label>
                                            <input value={formData.experience} onChange={(e) => handleInputChange('experience', e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-xl py-3 px-4 text-xs font-bold focus:border-[#2b6cee] outline-none" type="number" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="flex flex-col items-center justify-center p-6 gap-5 animate-in zoom-in-95 duration-500 text-center">
                                    <div className="size-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100"><span className="material-symbols-outlined text-[40px] font-black">verified</span></div>
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Ready to add!</h3>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
                            <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 text-xs font-black text-slate-400">Cancel</button>
                            {currentStep > 1 && <button onClick={() => setCurrentStep(prev => prev - 1)} className="px-6 py-2.5 border-2 border-slate-100 rounded-xl text-xs font-black text-slate-600 bg-white shadow-sm">Back</button>}
                            <button onClick={() => { if (currentStep < 3) setCurrentStep(prev => prev + 1); else handleComplete(); }} disabled={!isStepValid()} className={`px-8 py-2.5 text-[13px] font-black rounded-xl transition-all ${isStepValid() ? 'bg-[#2b6cee] text-white hover:bg-blue-600 shadow-xl border-blue-700' : 'bg-slate-100 text-slate-300 border-slate-200'}`}>{currentStep === 3 ? 'Complete' : 'Next Step'}</button>
                        </div>
                    </div>
                </div>
            )}
        </SuperAdminLayout>
    );
};

export default SuperAdminConsultantManagement;
