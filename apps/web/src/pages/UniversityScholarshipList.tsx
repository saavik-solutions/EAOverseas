import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityScholarshipList = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Active');

    const displayName = (universityName || 'University')
        .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const uniSlug = (universityName || 'university').toLowerCase();

    const scholarships = [
        {
            id: 1,
            title: 'Global Excellence STEM Award',
            amount: '$45,000/Yr',
            level: 'UG',
            type: 'International',
            applied: 45,
            total: 100,
            deadline: 'Oct 15',
            status: 'Active',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GE'
        },
        {
            id: 2,
            title: 'Future Leaders Fellowship',
            amount: '$12,000/Sem',
            level: 'PG',
            type: 'Domestic',
            applied: 82,
            total: 150,
            deadline: 'Nov 30',
            status: 'Active',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=FL'
        },
        {
            id: 3,
            title: 'Sustainability Impact Grant',
            amount: 'Full Tuition',
            level: 'Research',
            type: 'Any',
            applied: 12,
            total: 20,
            deadline: 'Oct 08',
            status: 'Active',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SI'
        },
        {
            id: 4,
            title: 'Women in Tech Bursary',
            amount: '$5,000 Flat',
            level: 'UG',
            type: 'Diversity',
            applied: 156,
            total: 200,
            deadline: 'Sep 30',
            status: 'Expired',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=WT'
        },
        {
            id: 5,
            title: 'Chancellor\'s Merit Scholarship',
            amount: '$25,000/Yr',
            level: 'UG',
            type: 'Domestic',
            applied: 30,
            total: 50,
            deadline: 'Dec 01',
            status: 'Active',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CM'
        },
        {
            id: 6,
            title: 'Post-Graduate Research Grant',
            amount: '$40,000/Yr',
            level: 'PG',
            type: 'Research',
            applied: 15,
            total: 15,
            deadline: 'Jan 15',
            status: 'Expired',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=PG'
        },
        {
            id: 7,
            title: 'Global Citizen Leadership Fund',
            amount: '$10,000',
            level: 'UG',
            type: 'Any',
            applied: 200,
            total: 200,
            deadline: 'Aug 20',
            status: 'Expired',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GC'
        },
        {
            id: 8,
            title: 'Innovators for Tomorrow Bursary',
            amount: '75% Tuition',
            level: 'PG',
            type: 'Diversity',
            applied: 10,
            total: 50,
            deadline: 'Mar 15',
            status: 'Active',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=IT'
        },
        {
            id: 9,
            title: 'Arts & Humanities Grant',
            amount: '$3,000 Flat',
            level: 'UG',
            type: 'Domestic',
            applied: 45,
            total: 45,
            deadline: 'Jul 10',
            status: 'Expired',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AH'
        },
        {
            id: 10,
            title: 'Early Career Scientists Award',
            amount: '$15,000/Yr',
            level: 'Research',
            type: 'International',
            applied: 5,
            total: 30,
            deadline: 'Jan 30',
            status: 'Active',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=EC'
        }
    ];

    const counts = {
        Active: scholarships.filter(s => s.status === 'Active').length,
        Expired: scholarships.filter(s => s.status === 'Expired').length
    };

    const filteredScholarships = scholarships.filter(s => 
        s.status.toLowerCase() === activeTab.toLowerCase() &&
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <UniversityLayout universityName={displayName} pageTitle="All Scholarships">
            <div className="p-8 max-w-[1400px] mx-auto font-['Public_Sans']">
                {/* Header with Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <Link to={`/university-panel/${uniSlug}/scholarships`} className="hover:text-primary transition-colors">Scholarship Management</Link>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span className="text-slate-900 font-bold">All Programs</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{activeTab} Programs</h2>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input 
                                type="text"
                                placeholder="Search scholarships by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-sm"
                            />
                        </div>
                        <button className="bg-[#2b6cee] text-white p-3 rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200/50">
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {['Active', 'Expired'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3 ${
                                activeTab.toLowerCase() === tab.toLowerCase() 
                                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
                                    : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'
                            }`}
                        >
                            {tab}
                            <span className={`px-2 py-0.5 rounded-md text-[10px] ${
                                activeTab.toLowerCase() === tab.toLowerCase()
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-100 text-slate-400'
                            }`}>
                                {counts[tab as keyof typeof counts]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Grid View */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredScholarships.map((item) => (
                        <Link 
                            to={`/university-panel/${uniSlug}/scholarships/${item.id}`}
                            key={item.id} 
                            className="bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(43,108,238,0.1)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative"
                        >
                            {/* Demand Tag */}
                            {(item.applied / item.total) > 0.6 && item.status === 'Active' && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                                    <span className="bg-amber-100/80 backdrop-blur-md text-amber-700 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-amber-200/50 flex items-center gap-1 shadow-sm">
                                        <span className="material-symbols-outlined text-[12px] font-black">bolt</span>
                                        High Demand
                                    </span>
                                </div>
                            )}

                            {/* Card Header / Accent */}
                            <div className="h-32 bg-slate-50 relative overflow-hidden group-hover:bg-blue-50 transition-colors bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 to-transparent">
                                <div className="absolute top-6 left-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#2b6cee] blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                        <img src={item.logo} alt="Logo" className="w-14 h-14 rounded-2xl object-contain bg-white border border-slate-100 p-2.5 relative z-10 shadow-sm transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                </div>
                                <div className="absolute top-6 right-6">
                                    <span className={`bg-white/80 backdrop-blur-md border px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${item.status === 'Expired' ? 'text-rose-500 border-rose-100' : 'text-[#2b6cee] border-blue-100'}`}>
                                        {item.amount}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="mb-6">
                                    <div className="flex gap-2 mb-3">
                                        <span className="text-[9px] font-black px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase tracking-widest border border-slate-200/50">{item.level}</span>
                                        <span className="text-[9px] font-black px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg uppercase tracking-widest border border-blue-100/50">{item.type}</span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 leading-[1.3] group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h4>
                                </div>

                                <div className="mt-auto space-y-5">
                                    {/* Progress Section */}
                                    <div className="space-y-2.5">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-slate-400">Applications</span>
                                            <span className="text-slate-900">{item.applied} / {item.total}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden p-0">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-1000 ${item.status === 'Expired' ? 'bg-rose-500' : 'bg-primary group-hover:bg-blue-400 shadow-[0_0_10px_rgba(43,108,238,0.3)]'}`}
                                                style={{ width: `${(item.applied / item.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-2">
                                            <div className={`size-8 rounded-lg flex items-center justify-center ${item.status === 'Expired' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400'}`}>
                                                <span className="material-symbols-outlined text-[18px]">{item.status === 'Expired' ? 'event_busy' : 'calendar_today'}</span>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.status === 'Expired' ? 'Closed' : 'Deadline'}</p>
                                                <p className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'Expired' ? 'text-rose-500' : 'text-slate-900'}`}>{item.deadline}</p>
                                            </div>
                                        </div>
                                        <div className={`size-10 rounded-xl flex items-center justify-center text-white shadow-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${item.status === 'Expired' ? 'bg-rose-500 shadow-rose-200' : 'bg-[#2b6cee] shadow-blue-200'}`}>
                                            <span className="material-symbols-outlined text-[20px] font-black">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Add New Card */}
                    {activeTab === 'Active' && (
                        <button className="bg-slate-50/30 rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 p-8 group hover:border-[#2b6cee] hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all min-h-[300px]">
                            <div className="size-16 rounded-[24px] bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-[#2b6cee] group-hover:scale-110 group-hover:border-blue-100 transition-all shadow-sm">
                                <span className="material-symbols-outlined text-3xl font-light">add</span>
                            </div>
                            <div className="text-center">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-slate-900 transition-colors">Create Program</p>
                                <p className="text-[9px] text-slate-300 font-bold uppercase mt-1">Listing New Scholarship</p>
                            </div>
                        </button>
                    )}
                </div>

                {filteredScholarships.length === 0 && (
                    <div className="bg-white rounded-[32px] p-20 text-center border border-slate-100 mt-8">
                        <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">No {activeTab.toLowerCase()} scholarships found</h3>
                        <p className="text-slate-500 font-medium">We couldn't find any programs matching your current filter.</p>
                        <button 
                            onClick={() => {setSearchQuery(''); setActiveTab('Active')}}
                            className="mt-6 px-8 py-3 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-container transition-all"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </UniversityLayout>
    );
};

export default UniversityScholarshipList;
