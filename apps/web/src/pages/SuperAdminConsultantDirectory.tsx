import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import { useSearchParams, useNavigate } from 'react-router-dom';

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

const SuperAdminConsultantDirectory: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [consultants, setConsultants] = useState<any[]>([]);
    const statusFilter = searchParams.get('status') || 'All';

    // Load data from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('eao_consultants');
        if (saved) {
            setConsultants(JSON.parse(saved));
        } else {
            setConsultants(DEFAULT_CONSULTANTS);
            localStorage.setItem('eao_consultants', JSON.stringify(DEFAULT_CONSULTANTS));
        }
    }, [searchParams]);

    const filteredConsultants = consultants.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <SuperAdminLayout title="Consultant Directory">
            <div className="p-8 flex flex-col gap-8">
                {/* Search Bar Row */}
                <div className="flex items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[22px]">search</span>
                        <input 
                            type="text" 
                            placeholder="Search consultants by name..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all shadow-sm outline-none font-medium"
                        />
                    </div>
                </div>

                {/* Directory Grid */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div>
                            <h3 className="font-bold text-slate-900 leading-none text-lg">Consultant List</h3>
                            <p className="text-xs text-slate-500 mt-2 font-medium">
                                {searchQuery ? `Found ${filteredConsultants.length} matches` : `Showing ${statusFilter === 'All' ? 'all' : statusFilter} consultants (${filteredConsultants.length})`}
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-slate-50/30">
                        {filteredConsultants.length > 0 ? (
                            filteredConsultants.map((consultant, index) => (
                                <div key={index} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-5">
                                    <div className="flex items-center gap-4">
                                        <div className="size-16 rounded-full bg-cover bg-center border-4 border-white shadow-md group-hover:scale-105 transition-transform" style={{ backgroundImage: `url(${consultant.avatar})`, filter: consultant.status === 'Inactive' ? 'grayscale(1)' : 'none' }}></div>
                                        <div className="flex flex-col min-w-0">
                                            <h4 className="font-black text-slate-900 truncate leading-tight">{consultant.name}</h4>
                                            <p className="text-[11px] text-slate-500 font-medium truncate">{consultant.email}</p>
                                        </div>
                                        <div className={`ml-auto size-3 rounded-full border-2 border-white shadow-sm ${consultant.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2b6cee] text-[10px] font-black uppercase tracking-tight">
                                            {consultant.specialty}
                                        </span>
                                    </div>

                                    <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1.5">Students</span>
                                            <span className="text-base font-black text-slate-900">{consultant.assignedStudents}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1.5">User Rating</span>
                                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border ${consultant.rating > 0 ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'}`}>
                                                <span className={`material-symbols-outlined text-[18px] font-black ${consultant.rating > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`}>star</span>
                                                <span className={`text-sm font-black ${consultant.rating > 0 ? 'text-amber-600' : 'text-slate-400'}`}>{consultant.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => navigate(`/superadmin/consultant/profile/${consultant.id || consultant.name.replace(/\s+/g, '-').toLowerCase()}`)}
                                        className="w-full py-3 rounded-2xl bg-slate-50 text-slate-700 text-xs font-black hover:bg-[#2b6cee] hover:text-white transition-all shadow-sm border border-slate-100"
                                    >
                                        View Full Profile
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
                                <span className="material-symbols-outlined text-6xl">search_off</span>
                                <p className="font-bold text-lg">No consultants found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminConsultantDirectory;
