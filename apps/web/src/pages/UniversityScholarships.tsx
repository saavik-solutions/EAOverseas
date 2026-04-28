import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityScholarships = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const [activeTab, setActiveTab] = useState('Active');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        provider: '',
        type: 'Merit Based',
        description: '',
        eligibility: [] as string[],
        amount: '',
        deadline: '',
        startDate: '',
        slots: ''
    });

    const [eligibilityInput, setEligibilityInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCriteria = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && eligibilityInput.trim()) {
            e.preventDefault();
            if (!formData.eligibility.includes(eligibilityInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    eligibility: [...prev.eligibility, eligibilityInput.trim()]
                }));
            }
            setEligibilityInput('');
        }
    };

    const removeCriteria = (index: number) => {
        setFormData(prev => ({
            ...prev,
            eligibility: prev.eligibility.filter((_, i) => i !== index)
        }));
    };

    const handlePublish = () => {
        const newScholarship = {
            id: Date.now(),
            title: formData.title || 'Untitled Scholarship',
            amount: formData.amount || 'N/A',
            level: 'UG',
            type: formData.type || 'Merit Based',
            applied: 0,
            total: parseInt(formData.slots) || 0,
            deadline: formData.deadline || 'TBD',
            status: 'Active',
            logo: `https://api.dicebear.com/7.x/initials/svg?seed=${(formData.provider || formData.title || 'SC').substring(0, 2).toUpperCase()}`
        };

        setScholarships([newScholarship, ...scholarships]);
        setIsModalOpen(false);
        setFormData({
            title: '',
            provider: '',
            type: 'Merit Based',
            description: '',
            eligibility: [] as string[],
            amount: '',
            deadline: '',
            startDate: '',
            slots: ''
        });
    };

    const displayName = (universityName || 'University')
        .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const uniSlug = (universityName || 'university').toLowerCase();

    const [scholarships, setScholarships] = useState([
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
    ]);

    const counts = {
        Active: scholarships.filter(s => s.status === 'Active').length,
        Expired: scholarships.filter(s => s.status === 'Expired').length
    };

    const filteredScholarships = scholarships.filter(s => 
        s.status.toLowerCase() === activeTab.toLowerCase() &&
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <UniversityLayout universityName={displayName} pageTitle="Scholarships">
            <div className="p-8 max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Scholarship Management</h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">Manage and track all institutional funding programs.</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                            {['Active', 'Expired'].map((tab) => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                                        activeTab.toLowerCase() === tab.toLowerCase() 
                                            ? 'bg-white text-[#2b6cee] shadow-sm' 
                                            : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {tab}
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] ${
                                        activeTab.toLowerCase() === tab.toLowerCase()
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'bg-slate-200 text-slate-500'
                                    }`}>
                                        {counts[tab as keyof typeof counts]}
                                    </span>
                                </button>
                            ))}
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#2b6cee] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-200/50"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Add Scholarship
                        </button>
                    </div>
                </div>

                {/* Modern Search Search Bar */}
                <div className="mb-10">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-[#2b6cee] blur-2xl opacity-0 group-focus-within:opacity-5 transition-opacity duration-500"></div>
                        <div className="relative flex items-center bg-white border border-slate-100 rounded-[28px] overflow-hidden shadow-sm focus-within:shadow-xl focus-within:shadow-blue-50 focus-within:border-blue-200 transition-all p-2 pr-6">
                            <div className="flex-1 relative">
                                <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2b6cee] transition-colors">search</span>
                                <input 
                                    type="text" 
                                    placeholder="Search by scholarship name or program details..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-16 pr-8 py-4 text-slate-600 font-medium bg-transparent focus:outline-none placeholder:text-slate-300 placeholder:font-bold placeholder:uppercase placeholder:tracking-widest placeholder:text-[11px]"
                                />
                            </div>
                            <div className="h-8 w-px bg-slate-100 mx-4"></div>
                            <div className="flex items-center gap-6 text-slate-400">
                                <span className="material-symbols-outlined cursor-pointer hover:text-slate-600">tune</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-6">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                {searchQuery ? `Search results for "${searchQuery}"` : `${activeTab} Programs`}
                            </h3>
                            <p className="text-slate-500 text-xs font-medium">
                                {searchQuery ? `Found ${filteredScholarships.length} matches` : `Quick glance at your ${activeTab.toLowerCase()} listings.`}
                            </p>
                        </div>
                        <Link to={`/university-panel/${uniSlug}/scholarships/list`} className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1">
                            View Full List
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredScholarships.map((item) => (
                            <Link 
                                to={`/university-panel/${uniSlug}/scholarships/${item.id}`}
                                key={item.id} 
                                className="bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(43,108,238,0.1)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full"
                            >
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
                    </div>
                    {filteredScholarships.length === 0 && (
                        <div className="bg-white rounded-[32px] p-20 text-center border border-slate-100 mt-8 w-full col-span-full">
                            <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">No scholarships found</h3>
                            <p className="text-slate-500 font-medium">We couldn't find any programs matching your search or filters.</p>
                            <button 
                                onClick={() => {setSearchQuery(''); setActiveTab('Active')}}
                                className="mt-6 px-8 py-3 bg-[#2b6cee] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ADD SCHOLARSHIP MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative w-full max-w-4xl h-fit max-h-[85vh] bg-white rounded-[24px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-50">
                            <div>
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">Add New Scholarship</h2>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Fill in details to publish listing</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all group"
                            >
                                <span className="material-symbols-outlined text-xl transition-transform group-hover:rotate-90">close</span>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar overscroll-contain bg-slate-50/20">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-7 space-y-8">
                                    <section className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="material-symbols-outlined text-[#2b6cee] text-lg">info</span>
                                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">Basic Info</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Scholarship Name</label>
                                                <input 
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#2b6cee] transition-all font-medium text-sm" 
                                                    placeholder="e.g. Merit-Based Excellence 2024" 
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Provider</label>
                                                <input 
                                                    name="provider"
                                                    value={formData.provider}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#2b6cee] transition-all font-medium text-sm" 
                                                    placeholder="Institution name" 
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Type</label>
                                                <select 
                                                    name="type"
                                                    value={formData.type}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#2b6cee] transition-all font-medium text-sm appearance-none cursor-pointer"
                                                >
                                                    <option>Merit Based</option>
                                                    <option>Need Based</option>
                                                    <option>International</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="material-symbols-outlined text-[#2b6cee] text-lg">description</span>
                                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">Details</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Description</label>
                                                <textarea 
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#2b6cee] transition-all font-medium text-sm min-h-[80px]" 
                                                    placeholder="Program summary..." 
                                                    rows={3}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Eligibility Criteria (Press Enter to add)</label>
                                                <div className="space-y-3">
                                                    <input 
                                                        value={eligibilityInput}
                                                        onChange={(e) => setEligibilityInput(e.target.value)}
                                                        onKeyDown={handleAddCriteria}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#2b6cee] transition-all font-medium text-sm" 
                                                        placeholder="e.g. Min 75% Score..." 
                                                        type="text"
                                                    />
                                                    <div className="flex flex-wrap gap-2">
                                                        {formData.eligibility.map((tag, idx) => (
                                                            <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#2b6cee] rounded-lg text-[10px] font-black uppercase tracking-wider border border-blue-100/50">
                                                                {tag}
                                                                <button onClick={() => removeCriteria(idx)} className="hover:text-rose-500 transition-colors">
                                                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="grid grid-cols-3 gap-6">
                                        <section className="space-y-4">
                                            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Funding</h3>
                                            <input 
                                                name="amount"
                                                value={formData.amount}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#2b6cee] transition-all font-medium text-sm" 
                                                placeholder="e.g. ₹ 50K" 
                                                type="text"
                                            />
                                        </section>
                                        <section className="space-y-4">
                                            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Slots</h3>
                                            <input 
                                                name="slots"
                                                value={formData.slots}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#2b6cee] transition-all font-medium text-sm" 
                                                placeholder="e.g. 50" 
                                                type="number"
                                            />
                                        </section>
                                        <section className="space-y-4">
                                            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Deadline</h3>
                                            <input 
                                                name="deadline"
                                                value={formData.deadline}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#2b6cee] transition-all font-medium text-sm" 
                                                type="date"
                                            />
                                        </section>
                                    </div>
                                </div>

                                <div className="lg:col-span-5">
                                    <div className="sticky top-0 bg-white p-6 rounded-[24px] border border-slate-100 shadow-xl shadow-blue-100/20 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center">
                                                <span className="material-symbols-outlined text-[14px] mr-2">visibility</span>
                                                Live Preview
                                            </span>
                                            <span className="px-2 py-0.5 bg-blue-50 text-[#2b6cee] rounded text-[7px] font-black uppercase tracking-wider">Syncing</span>
                                        </div>

                                        <div className="bg-white rounded-[32px] border border-slate-50 overflow-hidden shadow-sm">
                                            <div className="h-32 bg-[#2b6cee] relative">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
                                                <div className="absolute top-4 right-4">
                                                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white text-[8px] font-black uppercase tracking-widest border border-white/10">
                                                        Preview
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div className="space-y-1">
                                                    <p className="text-[8px] font-black text-[#2b6cee] uppercase tracking-widest">{formData.provider || 'Institution Name'}</p>
                                                    <h4 className="text-md font-black text-slate-900 leading-snug truncate">{formData.title || 'Program Title...'}</h4>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-50">
                                                    <div>
                                                        <p className="text-[6px] text-slate-400 font-black uppercase tracking-widest">Amount</p>
                                                        <p className="text-[9px] font-black text-slate-900 truncate">{formData.amount || '₹ 0.00'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[6px] text-slate-400 font-black uppercase tracking-widest">Slots</p>
                                                        <p className="text-[9px] font-black text-slate-900">{formData.slots || '0'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[6px] text-slate-400 font-black uppercase tracking-widest">Deadline</p>
                                                        <p className="text-[9px] font-black text-slate-900 truncate">{formData.deadline || 'N/A'}</p>
                                                    </div>
                                                </div>
                                                {formData.eligibility.length > 0 && (
                                                    <div className="pt-2">
                                                        <p className="text-[7px] text-slate-400 font-black uppercase tracking-widest mb-2">Requirements</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {formData.eligibility.slice(0, 3).map((tag, i) => (
                                                                <span key={i} className="px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded text-[7px] font-bold border border-slate-100">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            {formData.eligibility.length > 3 && (
                                                                <span className="text-[7px] text-slate-400 font-bold">+{formData.eligibility.length - 3} more</span>
                                                            )  }
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[9px] text-slate-400 font-medium italic text-center px-4">
                                            "Ensure all details are accurate before publishing to the main directory."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-5 border-t border-slate-50 flex items-center justify-between bg-white relative z-10 font-black text-[9px] uppercase tracking-widest">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-rose-500 transition-colors"
                            >
                                Discard Changes
                            </button>
                            <button 
                                onClick={handlePublish}
                                className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#2b6cee] to-blue-600 text-white shadow-lg shadow-blue-100 hover:shadow-blue-200 hover:-translate-y-0.5 transition-all"
                            >
                                Publish Program
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </UniversityLayout>
    );
};

export default UniversityScholarships;
