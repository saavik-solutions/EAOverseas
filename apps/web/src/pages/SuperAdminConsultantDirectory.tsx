import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import { useSearchParams, useNavigate } from 'react-router-dom';

const DEFAULT_CONSULTANTS = [
    {
        name: 'Liam Smith', email: 'liam.s@eaoverseas.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrDaQadzcKETSmU43z89uAcQYHFHVNAcfznBm8hyGXDlXssaUO2y39YbS2KPSRGe-44yPdhq1UzRe9eCwRUAzKE_A7jnNS3Q00UfGk1ThrIT7WgcbWrQTdfkV4RxrS5I5IB-7bsJf3ujZWlPQZJ3_DQq7KT-Eihb95-GYvbbetwiWxgz9AApeUS9ASBEoUNgx4vmcIxwmwGsGFkfWKbgZ7grr-OfuU3cd79WHckxjEl0biL-VeJy0qur8kbyTN61ogFNHoQsnxgb4', specialty: 'Visa Guidance', assignedStudents: 24, rating: 4.8, status: 'Active'
    },
    {
        name: 'Sarah Jenkins', email: 'sarah.j@eaoverseas.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAItVYiS_ClPdBiemoyRXKwIOxxOTMd0McFmnbEHBcES0G0s-h63p--QHioW1lR6R8vqSrsEBSlTrp8S7ByDUAqHd31Cbr2V5JCEyv_lR8tIIrIg7XFkqSImcNG1RzwO0FXY2SxW-5ljc96clWW-eeBpdWBEO-F3nGYoixLfP6qhy4PvZQEmUT6kQPVmfwPuC-3mnsTycuNfEiezW7_kGioBvG6dizAsFfWB940rlcYGTddwJhR-Ml6yqyF9dm5PN2INoOsIlk4Mi4', specialty: 'Admissions', assignedStudents: 31, rating: 4.9, status: 'Active'
    },
    {
        name: 'Robert Chen', email: 'robert.c@eaoverseas.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZZjDbwo-gqrgF8KQs6b9SABxmFBB1tXrO6rC3W_uj26P9T1TC7Xv9ZU6x1VHPwpsPnkiMgZASLXH6YwI_dlxFK96AoCCmGdZx4CtHGNvZ54lifmofEjeC5HRqo4G7OINjPoyfqP9KhAejfxjXJehdk3lYdFFj23parXY5VumySwxC7Tnb4-E1zfZrJvH8VN8lZvUXHx8lCspOl2Z8ptQZZbTecbk5iKVCwxmBKUwtH0Blsb7KwMWhxUIkL6QAfsAFCOplJljbY9Y', specialty: 'Documentation', assignedStudents: 0, rating: 4.2, status: 'Inactive'
    },
    {
        name: 'Emily Davis', email: 'emily.d@eaoverseas.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQTJNrm76AQqXjRMpzoWm6BfFrV7MCg9HwDs0c5bwSIOjJ_XrjUsdXT-bSPyXh5V6h7762Z3HrglFPIc1LsXG8STrOu0N3tTtfHhsVlXIxu0rkTDgpgIMrdYGtf3ldJMk3ZphjApAhsZpGBmQC06Ai9R-iQdhmZwMDZpBSaa56dqwa4cDguG4n63pYX8Iq-y_CDSfxhmm1girIaRhPhJqrc8VRACPY2jfBrLB7O3V4iKKCEGRju4qy80jmng5k_lA9b9pQRuInWbA', specialty: 'Visa Guidance', assignedStudents: 18, rating: 4.7, status: 'Active'
    }
];

const SuperAdminConsultantDirectory: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [consultants, setConsultants] = useState<any[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Default filter from URL if present
    const [filters, setFilters] = useState({
        status: searchParams.get('status') || 'All',
        sortBy: 'newest'
    });

    useEffect(() => {
        const saved = localStorage.getItem('eao_consultants');
        if (saved) setConsultants(JSON.parse(saved));
        else setConsultants(DEFAULT_CONSULTANTS);
    }, []);

    const filteredConsultants = consultants
        .filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filters.status === 'All' || c.status === filters.status;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (filters.sortBy === 'highest-rating') return b.rating - a.rating;
            if (filters.sortBy === 'lowest-rating') return a.rating - b.rating;
            return 0;
        });

    return (
        <SuperAdminLayout title="Consultant Directory">
            <div className="p-8 flex flex-col gap-8">
                <div className="flex items-center justify-between gap-4">
                    <div className="relative w-full max-w-md">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input 
                            type="text" placeholder="Search consultants..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:border-[#2b6cee] outline-none font-bold"
                        />
                    </div>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border text-xs font-black transition-all ${isFilterOpen ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600'}`}
                        >
                            <span className="material-symbols-outlined text-[18px]">tune</span>
                            Filters
                            {(filters.status !== 'All' || filters.sortBy !== 'newest') && <div className="size-2 rounded-full bg-blue-500"></div>}
                        </button>

                        {isFilterOpen && (
                            <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-slate-200 rounded-[32px] shadow-2xl z-50 p-6 animate-in slide-in-from-top-4">
                                <div className="flex flex-col gap-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-slate-400">Availability</label>
                                        <div className="flex gap-2">
                                            {['All', 'Active', 'Inactive'].map(s => (
                                                <button key={s} onClick={() => setFilters({...filters, status: s})} className={`flex-1 py-2 rounded-xl border ${filters.status === s ? 'bg-[#2b6cee] border-[#2b6cee] text-white' : 'bg-white text-slate-500'}`}>{s}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-slate-400">Ordering</label>
                                        <button onClick={() => setFilters({...filters, sortBy: 'highest-rating'})} className={`p-3 rounded-xl border text-left flex justify-between ${filters.sortBy === 'highest-rating' ? 'bg-blue-50 border-[#2b6cee] text-[#2b6cee]' : 'bg-white'}`}>Rating: High to Low {filters.sortBy === 'highest-rating' && <span className="material-symbols-outlined text-[16px]">check</span>}</button>
                                        <button onClick={() => setFilters({...filters, sortBy: 'lowest-rating'})} className={`p-3 rounded-xl border text-left flex justify-between ${filters.sortBy === 'lowest-rating' ? 'bg-blue-50 border-[#2b6cee] text-[#2b6cee]' : 'bg-white'}`}>Rating: Low to High {filters.sortBy === 'lowest-rating' && <span className="material-symbols-outlined text-[16px]">check</span>}</button>
                                    </div>
                                    <button onClick={() => setFilters({status: 'All', sortBy: 'newest'})} className="w-full py-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all">Clear All</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Consultant</th>
                                    <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Specialization</th>
                                    <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Students</th>
                                    <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Rating</th>
                                    <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredConsultants.map((consultant, index) => (
                                    <tr key={index} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="size-12 rounded-2xl bg-cover bg-center border-2 border-white shadow-md flex-shrink-0" style={{ backgroundImage: `url(${consultant.avatar})` }}></div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-black text-slate-900 truncate">{consultant.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium truncate">{consultant.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${consultant.status === 'Active' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : consultant.status === 'Blocked' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                                                {consultant.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="text-[11px] font-black text-[#2b6cee] bg-blue-50 px-3 py-1.5 rounded-xl">
                                                {consultant.specialty}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[18px] text-slate-400">group</span>
                                                <span className="text-sm font-black text-slate-900">{consultant.assignedStudents || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`material-symbols-outlined text-[18px] ${consultant.rating > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`}>star</span>
                                                <span className="text-sm font-black text-slate-900">{consultant.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center justify-end gap-3">
                                                <button 
                                                    onClick={() => {
                                                        const newConsultants = [...consultants];
                                                        const targetIndex = consultants.findIndex(c => c.email === consultant.email);
                                                        const isBlocking = consultant.status !== 'Blocked';
                                                        
                                                        if (isBlocking) {
                                                            const studentsToRedistribute = consultant.assignedStudents || 0;
                                                            const activeOthers = newConsultants.filter(c => c.status === 'Active' && c.email !== consultant.email);
                                                            
                                                            if (studentsToRedistribute > 0 && activeOthers.length > 0) {
                                                                const baseShare = Math.floor(studentsToRedistribute / activeOthers.length);
                                                                let remainder = studentsToRedistribute % activeOthers.length;
                                                                
                                                                activeOthers.forEach(ac => {
                                                                    const acIndex = newConsultants.findIndex(c => c.email === ac.email);
                                                                    newConsultants[acIndex].assignedStudents = (newConsultants[acIndex].assignedStudents || 0) + baseShare + (remainder > 0 ? 1 : 0);
                                                                    remainder--;
                                                                });
                                                                
                                                                newConsultants[targetIndex].prevAssignedCount = studentsToRedistribute;
                                                                newConsultants[targetIndex].assignedStudents = 0;
                                                            }
                                                            newConsultants[targetIndex].status = 'Blocked';
                                                        } else {
                                                            const studentsToRecover = consultant.prevAssignedCount || 0;
                                                            const activeOthers = newConsultants.filter(c => c.status === 'Active' && c.email !== consultant.email);

                                                            if (studentsToRecover > 0 && activeOthers.length > 0) {
                                                                const baseShare = Math.floor(studentsToRecover / activeOthers.length);
                                                                let remainder = studentsToRecover % activeOthers.length;

                                                                activeOthers.forEach(ac => {
                                                                    const acIndex = newConsultants.findIndex(c => c.email === ac.email);
                                                                    const currentCount = newConsultants[acIndex].assignedStudents || 0;
                                                                    const shareToSubtract = baseShare + (remainder > 0 ? 1 : 0);
                                                                    newConsultants[acIndex].assignedStudents = Math.max(0, currentCount - shareToSubtract);
                                                                    remainder--;
                                                                });
                                                                
                                                                newConsultants[targetIndex].assignedStudents = studentsToRecover;
                                                                newConsultants[targetIndex].prevAssignedCount = 0;
                                                            }
                                                            newConsultants[targetIndex].status = 'Active';
                                                        }
                                                        
                                                        setConsultants(newConsultants);
                                                        localStorage.setItem('eao_consultants', JSON.stringify(newConsultants));
                                                    }}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${consultant.status === 'Blocked' ? 'bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-50' : 'bg-white border-rose-200 text-rose-600 hover:bg-rose-50'}`}
                                                >
                                                    {consultant.status === 'Blocked' ? 'Unblock' : 'Block'}
                                                </button>
                                                <button 
                                                    onClick={() => navigate(`/superadmin/consultant/profile/${consultant.id || consultant.name.replace(/\s+/g, '-').toLowerCase()}`)}
                                                    className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2b6cee] transition-all"
                                                >
                                                    Details
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredConsultants.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-300 gap-4">
                            <span className="material-symbols-outlined text-7xl opacity-20">person_search</span>
                            <p className="font-black text-xl tracking-tight">No consultants match your filters</p>
                        </div>
                    )}
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminConsultantDirectory;
