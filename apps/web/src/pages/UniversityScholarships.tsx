import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const DEFAULT_SCHOLARSHIPS = [
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GE',
        description: 'Recognizing outstanding international students pursuing advanced degrees in Science, Technology, Engineering, and Mathematics.',
        eligibility: ['Min 3.8 GPA', 'Master\'s or Ph.D.', 'International Student'],
        slots: '100'
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=FL',
        description: 'Supporting the next generation of social innovators and community leaders.',
        eligibility: ['Social Work Background', 'Domestic Student'],
        slots: '150'
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SI',
        description: 'Funding for research projects focused on climate change and renewable energy.',
        eligibility: ['Research proposal required', 'Open to all'],
        slots: '20'
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=WT',
        description: 'Encouraging female representation in computer science and engineering fields.',
        eligibility: ['Female identifying', 'UG Level'],
        slots: '200'
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CM',
        description: 'Awarded to top academic performers within the domestic applicant pool.',
        eligibility: ['Top 5% of class', 'Domestic Student'],
        slots: '50'
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=PG',
        description: 'Specialized funding for doctoral candidates in the humanities.',
        eligibility: ['PhD Candidate', 'Humanities Major'],
        slots: '15'
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GC',
        description: 'Empowering students with a proven record of community service and leadership.',
        eligibility: ['Leadership experience', 'Volunteer history'],
        slots: '200'
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=IT',
        description: 'Supporting students from underrepresented backgrounds in technology.',
        eligibility: ['Minority background', 'Tech major'],
        slots: '50'
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AH',
        description: 'Supporting excellence in the creative arts and literature.',
        eligibility: ['Portfolio submission', 'Arts major'],
        slots: '45'
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
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=EC',
        description: 'Targeted support for international researchers in biochemistry.',
        eligibility: ['Biochem background', 'International'],
        slots: '30'
    }
];

const UniversityScholarships = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const [activeTab, setActiveTab] = useState('Active');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eligibilityInput, setEligibilityInput] = useState('');
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

    const [scholarships, setScholarships] = useState(() => {
        const saved = localStorage.getItem('university_scholarships');
        return saved ? JSON.parse(saved) : DEFAULT_SCHOLARSHIPS;
    });

    useEffect(() => {
        localStorage.setItem('university_scholarships', JSON.stringify(scholarships));
    }, [scholarships]);

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
            logo: `https://api.dicebear.com/7.x/initials/svg?seed=${(formData.provider || formData.title || 'SC').substring(0, 2).toUpperCase()}`,
            description: formData.description || 'No description provided.',
            eligibility: formData.eligibility.length > 0 ? formData.eligibility : ['Contact provider for details.'],
            slots: formData.slots || '0'
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

    const counts = {
        Active: scholarships.filter((s: any) => s.status === 'Active').length,
        Expired: scholarships.filter((s: any) => s.status === 'Expired').length
    };

    const filteredScholarships = scholarships.filter((s: any) => 
        s.status.toLowerCase() === activeTab.toLowerCase() &&
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <UniversityLayout universityName={displayName} pageTitle="Scholarships">
            <div className="p-6 max-w-[1400px] mx-auto">
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
                        {filteredScholarships.map((item: any) => (
                            <Link 
                                to={`/university-panel/${uniSlug}/scholarships/${item.id}`}
                                key={item.id} 
                                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="h-32 w-full relative">
                                    <img alt={item.title} className="w-full h-full object-cover" src={item.status === 'Active' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfPhw5mBbq5aoqtOcsm6LDP7j3J7Aq7v_H3Z63PoGu2WIluabWsXB0wRLRzjFB8jlo3Xo_tIhtNYhZD5qwtpMGst_JU7cIoVEHDrDLpodN4YJ5ubbB6fpUgUmSLfjqvyvxm_E3gzokqSldwfjjglx0LvSAliSfrzfU99PxEjZ9q5Dj8PRARGOlrIxQ2Aq4-nZWbvoVatUbI0GsQh0m663Av4RQvAzgLOzIx-OUNjfBuDprfDxdQfmi-p32tQ7EC-g7i4JpwEIgNas' : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMtrbnIM8SgVokS9oMj31J-1qGRf6679P98XLmjpHHbnsUPeFu_g6ScctJPUOPCBb9t8rszWoYdEIxAr0NZJB2Gs2_UUH4LYnQzXTdHvGGCXEGyNL1QbKRuRewT2UsJH3LxtErKp5YonvjHhaVoW2ZIgSO-HypKnusb8JJeoDSIZvBHMmWZy28PmaYTDpet2ONkjgMQlkGDBofErLI4SGdC9wWu_NxFlLROvcs33NqheanOdqUj6rGWvAeOTw6pTLB6ff07ZhjK44'} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase text-white ${
                                            item.status === 'Active' ? 'bg-[#10b981]' : 'bg-rose-500'
                                        }`}>
                                            {item.status === 'Active' ? 'Open' : 'Expired'}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-3 left-4 text-white font-black text-sm uppercase tracking-widest">{displayName}</div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h4 className="text-base font-black text-slate-900 mb-2 line-clamp-1">{item.title}</h4>
                                    <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed font-medium">{item.description || 'Global funding opportunity for outstanding international candidates.'}</p>
                                    
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Amount</span>
                                            <span className="font-bold text-slate-900">{item.amount}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Eligibility</span>
                                            <span className="font-bold text-slate-900 truncate ml-4 text-right">
                                                {item.eligibility?.[0] || 'Min 80% Score'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Applications</span>
                                            <span className="font-bold text-slate-900">{item.applied || 0} / {item.total}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-auto">
                                        <button className="flex-1 bg-[#2b6cee] text-white font-black py-2.5 rounded-xl hover:bg-blue-600 transition-all text-[10px] uppercase tracking-widest shadow-md shadow-blue-100">
                                            Manage Candidates
                                        </button>
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
