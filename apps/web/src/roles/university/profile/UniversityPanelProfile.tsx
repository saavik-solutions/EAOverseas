import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityPanelProfile = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const [isEditing, setIsEditing] = useState(false);
    const [isProgramsModalOpen, setIsProgramsModalOpen] = useState(false);
    
    const [profileData, setProfileData] = useState({
        name: '',
        location: 'Boston, MA',
        type: 'Private Research',
        banner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALtGUxKejx3IqeRXexR4iH2xlcAObafZIIjGuggv_EKGd43vilWyt104mrMm75sNwMBYe5qJnH2n3imSUhNMYAyYNRDlcoYOh7PAA5ve0S63o8FCBn9dwdRZmpg-K6tyHJje6Wl_VTlrM9KdiV7fFoyWQ7xdIRYHfC6suT_Jiga7kHg8bYVm0WfNdL32BXNM0TvJDXowbjzQwZUbeDlYPenZi4UBxIQIrkj8GhGDg1mvsm0_4SFLDE798_hQtgxnfUncoCjTocBGU',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjsnBLHrVl1yOR97C8IyGcZMjDb37sK0iIIDFejbRGlQVEeAy-EiiFvQQcNc5NOecaC1d3EZNm_6r7psoOuqwQdvUlBzHC4ovYBP7nIs9sbRlQgaOSYl6YXFg_vQkyDGqJqk_bp1kq3zROV06KxrHxkAEIc-dAsuDB36H_OIYrlXe14SsLwI1KSAEv8kEXrAEiyLksVYFYawoFR502q7qA2xC9_Bzt1D0dXUFRDa0Vp1uo2zERb26upfjSlbzJo_oYAjjJRIQltvk',
        description: 'The National Institute of Excellence stands at the forefront of global higher education, fostering innovation and academic rigor for over a century. Our campus serves as a hub for groundbreaking research and interdisciplinary collaboration, preparing students for the complex challenges of the 21st century.',
        stats: {
            courses: '120+',
            fees: '$14k',
            placement: '94.8%'
        },
        contact: {
            email: 'admissions@nie.edu.us',
            phone: '+1 (617) 555-0198'
        },
        brochure: null as string | null
    });

    const allPrograms = [
        { name: 'B.Tech Computer Science', duration: '4 Years', fee: '$18,000', stream: 'Engineering' },
        { name: 'MBA Finance', duration: '2 Years', fee: '$24,000', stream: 'Business' },
        { name: 'B.Sc Physics', duration: '3 Years', fee: '$12,000', stream: 'Science' },
        { name: 'M.Tech AI & Data Science', duration: '2 Years', fee: '$20,000', stream: 'Engineering' },
        { name: 'B.A Psychology', duration: '3 Years', fee: '$10,000', stream: 'Arts' },
        { name: 'Ph.D Quantum Computing', duration: '5 Years', fee: '$30,000', stream: 'Research' }
    ];

    useEffect(() => {
        if (universityName) {
            const formatted = universityName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            setProfileData(prev => ({ ...prev, name: formatted }));
        }
    }, [universityName]);

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleImageChange = (key: 'banner' | 'logo') => {
        const newUrl = prompt(`Enter new URL for ${key}:`, profileData[key] || '');
        if (newUrl) {
            setProfileData({ ...profileData, [key]: newUrl });
        }
    };

    const brochureInputRef = React.useRef<HTMLInputElement>(null);

    const handleBrochureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // In a real app, you'd upload this to a server
            const url = URL.createObjectURL(file);
            setProfileData({...profileData, brochure: file.name});
        }
    };

    const triggerBrochureUpload = () => {
        brochureInputRef.current?.click();
    };

    return (
        <UniversityLayout universityName={profileData.name} pageTitle="Institutional Profile">
            <div className="p-4 md:p-8 max-w-[1200px] mx-auto space-y-8 pb-32">
                {/* Header Section */}
                <section className="relative rounded-2xl overflow-hidden bg-white border border-[#dbdfe6] shadow-sm">
                    <div className="h-64 w-full relative group">
                        <img className="w-full h-full object-cover" alt="Banner" src={profileData.banner} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        {isEditing && (
                            <button onClick={() => handleImageChange('banner')} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/30 transition-all text-sm font-bold shadow-lg">
                                <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span> Change Banner
                            </button>
                        )}
                    </div>
                    <div className="px-8 pb-8 -mt-16 relative z-10">
                        <div className="flex flex-col md:flex-row items-end justify-between w-full">
                            <div className="flex flex-col md:flex-row items-end gap-6 min-w-0 flex-1">
                                <div className="w-32 h-32 rounded-2xl bg-white p-2 shadow-lg border border-[#dbdfe6] shrink-0 relative group overflow-hidden">
                                    <img className="w-full h-full object-contain" alt="Logo" src={profileData.logo} />
                                    {isEditing && (
                                        <button onClick={() => handleImageChange('logo')} className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-white text-[24px]">photo_camera</span>
                                            <span className="text-[10px] text-white font-bold uppercase mt-1">Change</span>
                                        </button>
                                    )}
                                </div>
                                <div className="mb-0 min-w-0 translate-y-2 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {isEditing ? (
                                            <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="text-3xl font-black text-slate-900 bg-slate-50 border-b-2 border-[#2b6cee] outline-none px-2 w-full max-w-lg" />
                                        ) : (
                                            <h2 className="text-3xl font-black text-slate-900 leading-tight">{profileData.name}</h2>
                                        )}
                                        <div className="flex gap-2">
                                            <span className="bg-[#2b6cee] text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">NAAC A++</span>
                                            <span className="bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">QS #42</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-slate-500 font-medium text-xs">
                                        {isEditing ? (
                                            <><input value={profileData.location} onChange={(e) => setProfileData({...profileData, location: e.target.value})} className="bg-slate-50 border-b border-slate-200 outline-none px-1" placeholder="Location" />
                                            <input value={profileData.type} onChange={(e) => setProfileData({...profileData, type: e.target.value})} className="bg-slate-50 border-b border-slate-200 outline-none px-1" placeholder="Focus Type" /></>
                                        ) : (
                                            <><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> {profileData.location}</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">apartment</span> {profileData.type}</span></>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mb-2 shrink-0">
                                {isEditing ? (
                                    <button onClick={handleSave} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/20">
                                        <span className="material-symbols-outlined text-[20px]">check_circle</span> Save Profile
                                    </button>
                                ) : (
                                    <button onClick={() => setIsEditing(true)} className="bg-[#2b6cee] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                                        <span className="material-symbols-outlined text-[20px]">edit</span> Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-slate-100 bg-slate-50/30">
                        <div className="p-6 border-r border-slate-100 flex flex-col gap-1 text-center md:text-left">
                            {isEditing ? <input value={profileData.stats.courses} onChange={(e) => setProfileData({...profileData, stats: {...profileData.stats, courses: e.target.value}})} className="text-xl font-black text-[#2b6cee] bg-transparent outline-none w-full" /> : <span className="text-3xl font-black text-[#2b6cee]">{profileData.stats.courses}</span>}
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Courses Offered</span>
                        </div>
                        <div className="p-6 border-r border-slate-100 flex flex-col gap-1 text-center md:text-left">
                            {isEditing ? <input value={profileData.stats.fees} onChange={(e) => setProfileData({...profileData, stats: {...profileData.stats, fees: e.target.value}})} className="text-xl font-black text-[#2b6cee] bg-transparent outline-none w-full" /> : <span className="text-3xl font-black text-[#2b6cee]">{profileData.stats.fees}</span>}
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Avg Annual Fees</span>
                        </div>
                        <div className="p-6 border-r border-slate-100 flex flex-col gap-1 text-center md:text-left">
                             {isEditing ? <input value={profileData.stats.placement} onChange={(e) => setProfileData({...profileData, stats: {...profileData.stats, placement: e.target.value}})} className="text-xl font-black text-[#2b6cee] bg-transparent outline-none w-full" /> : <span className="text-3xl font-black text-[#2b6cee]">{profileData.stats.placement}</span>}
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Placement Rate</span>
                        </div>
                        <div className="p-6 flex flex-col gap-3">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Recruiters</span>
                            <div className="flex gap-4 items-center opacity-70">
                                <span className="text-xs font-black italic tracking-tighter">Google</span>
                                <span className="text-xs font-black italic tracking-tighter">Microsoft</span>
                                <span className="text-xs font-black italic tracking-tighter">Amazon</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-6 min-w-0 w-full">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
                                <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#2b6cee] text-[20px]">info</span>
                                </div>
                                About {profileData.name}
                            </h3>
                            {isEditing ? (
                                <textarea value={profileData.description} onChange={(e) => setProfileData({...profileData, description: e.target.value})} rows={6} className="text-sm text-slate-600 leading-relaxed w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-1 focus:ring-blue-200" />
                            ) : (
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{profileData.description}</p>
                            )}
                        </div>

                        {/* Program Catalog */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <h3 className="text-lg font-black text-slate-900">Program Catalog</h3>
                                <button onClick={() => setIsProgramsModalOpen(true)} className="text-[10px] font-black uppercase tracking-widest text-[#2b6cee] bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">View All Programs</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-400">
                                        <tr>
                                            <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Course Name</th>
                                            <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-center">Duration</th>
                                            <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-right">Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {allPrograms.slice(0, 3).map((prog, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-900">{prog.name}</td>
                                                <td className="px-6 py-4 text-center text-slate-500 font-medium">{prog.duration}</td>
                                                <td className="px-6 py-4 text-right text-[#2b6cee] font-black">{prog.fee}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Brochure Card */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-black text-slate-900">Brochure</h3>
                                    <span className="material-symbols-outlined text-slate-300">description</span>
                                </div>
                                <div 
                                    onClick={triggerBrochureUpload}
                                    className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 transition-all cursor-pointer hover:bg-blue-50/50 hover:border-[#2b6cee]"
                                >
                                    <input 
                                        type="file"
                                        ref={brochureInputRef}
                                        onChange={handleBrochureUpload}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                    {profileData.brochure ? (
                                        <div className="text-center">
                                            <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                                                <span className="material-symbols-outlined text-[#2b6cee] text-[32px]">picture_as_pdf</span>
                                            </div>
                                            <p className="text-xs font-black text-slate-900 mb-1">Brochure Selected</p>
                                            <p className="text-[10px] text-slate-500 font-medium truncate max-w-[150px] mx-auto">{profileData.brochure}</p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <span className="material-symbols-outlined text-slate-300 text-[40px] mb-2">cloud_upload</span>
                                            <p className="text-xs text-slate-400 font-medium italic">No brochure available</p>
                                            <p className="text-[10px] text-[#2b6cee] font-bold mt-2">Click to Upload</p>
                                        </div>
                                    )}
                                </div>
                                <button 
                                    onClick={triggerBrochureUpload} 
                                    className="mt-4 w-full bg-[#2b6cee] text-white text-[10px] font-black uppercase px-4 py-3 rounded-lg hover:shadow-lg transition-all"
                                >
                                    {profileData.brochure ? 'Change Brochure' : 'Upload Brochure'}
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-black text-slate-900 mb-4">Placements</h3>
                                <div className="flex items-center gap-6">
                                    <div className="flex-1 text-center border-r border-slate-100">
                                        <p className="text-2xl font-black text-[#2b6cee]">$150k</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Highest Package</p>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <p className="text-2xl font-black text-[#2b6cee]">500+</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Placement Offers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="w-full lg:w-[350px] space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6 bg-slate-50 border-b border-slate-100"><h3 className="text-base font-black text-slate-900">Eligibility Criteria</h3></div>
                            <div className="p-6 space-y-6">
                                <div className="flex items-start gap-3">
                                    <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-[#2b6cee] text-[20px]">verified</span></div>
                                    <div><p className="text-sm font-black text-slate-900">Academic Record</p><p className="text-xs text-slate-400 font-medium">Minimum 75% aggregate in 10+2 examinations.</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-[#2b6cee] text-[20px]">assignment</span></div>
                                    <div><p className="text-sm font-black text-slate-900">Entrance Exams</p><p className="text-xs text-slate-400 font-medium">Valid SAT score or Institute CET merit rank.</p></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <h3 className="text-base font-black text-slate-900 mb-4 flex justify-between">Admissions Office</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group">
                                    <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#2b6cee] group-hover:text-white transition-all shrink-0"><span className="material-symbols-outlined">mail</span></div>
                                    <div className="flex-1"><p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Email Support</p>
                                    {isEditing ? <input value={profileData.contact.email} onChange={(e) => setProfileData({...profileData, contact: {...profileData.contact, email: e.target.value}})} className="text-sm font-bold text-slate-900 bg-transparent outline-none w-full" /> : <p className="text-sm font-bold text-slate-900">{profileData.contact.email}</p>}</div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#2b6cee] group-hover:text-white transition-all shrink-0"><span className="material-symbols-outlined">call</span></div>
                                    <div className="flex-1"><p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Call Center</p>
                                    {isEditing ? <input value={profileData.contact.phone} onChange={(e) => setProfileData({...profileData, contact: {...profileData.contact, phone: e.target.value}})} className="text-sm font-bold text-slate-900 bg-transparent outline-none w-full" /> : <p className="text-sm font-bold text-slate-900">{profileData.contact.phone}</p>}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="h-40 w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group grayscale">
                            <img className="w-full h-full object-cover" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu7RmfsIAfaeEr-n7kZQJ0F0Pi-0GCgc5j39gC99Qt1GhRb7QB1_IhBZ26r023adkYXvqudUlKyFbDuDGqJ3xkydCAtBkjI6-ijxIaC1YBCHrp4AfBun3U4lXUqKdA-fNH_46YHk0iS0lZ1uLh1Q53mVhgMQyzyV5-crlF_D_3qMHD8bShvKeImQ1PRD2gY1zOHc5HPyGkMEyWouBxNHHIB5kjrPqFa8hOSF4anOXO0vPT2wt8EZUz7IZOIZXgkBEmzVibHgyCmt8" />
                            <div className="absolute inset-0 bg-[#2b6cee]/10"></div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Programs Modal */}
            {isProgramsModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsProgramsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in slide-in-from-bottom-8 duration-300">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h2 className="text-xl font-black text-slate-900">Complete Program Catalog</h2>
                                <p className="text-xs text-slate-500 font-medium">All undergraduate and postgraduate courses</p>
                            </div>
                            <button onClick={() => setIsProgramsModalOpen(false)} className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-slate-400">close</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-0">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-100 text-slate-500 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Program Name</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Stream</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-center">Duration</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-right">Annu. Fee</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {allPrograms.map((prog, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900">{prog.name}</td>
                                            <td className="px-6 py-4"><span className="bg-blue-50 text-[#2b6cee] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">{prog.stream}</span></td>
                                            <td className="px-6 py-4 text-center text-slate-500 font-medium">{prog.duration}</td>
                                            <td className="px-6 py-4 text-right text-[#2b6cee] font-black">{prog.fee}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">End of Catalog</p>
                        </div>
                    </div>
                </div>
            )}
        </UniversityLayout>
    );
};

export default UniversityPanelProfile;
