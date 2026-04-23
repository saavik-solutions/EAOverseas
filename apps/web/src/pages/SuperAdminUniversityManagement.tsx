import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

const SuperAdminUniversityManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAssignPopupOpen, setIsAssignPopupOpen] = useState(false);
    const [assigningUniId, setAssigningUniId] = useState<number | null>(null);
    const [expandedCreator, setExpandedCreator] = useState<{ uniId: number, name: string } | null>(null);
    const [blockedCreators, setBlockedCreators] = useState<string[]>([]);
    const [popupAssigningUniId, setPopupAssigningUniId] = useState<number | null>(null);
    const [creatorsList, setCreatorsList] = useState(['Alex Rivera', 'Sarah Chen', 'Michael Scott', 'Emma Wilson', 'James Bond', 'Tony Stark']);
    const [manualCredentials, setManualCredentials] = useState<Record<string, { email: string, pass: string }>>({});
    const [regForm, setRegForm] = useState({ name: '', email: '', pass: '' });
    const [isRegistering, setIsRegistering] = useState(false);

    const [assignments, setAssignments] = useState<Record<number, string[]>>({
        1: ['Alex Rivera'],
        2: ['Sarah Chen', 'Emma Wilson']
    });

    const creators = ['Alex Rivera', 'Sarah Chen', 'Michael Scott', 'Emma Wilson', 'James Bond', 'Tony Stark'];

    const toggleAssignment = (uniId: number, creator: string) => {
        if (blockedCreators.includes(creator)) return;
        setAssignments(prev => {
            const current = prev[uniId] || [];
            if (current.includes(creator)) {
                return { ...prev, [uniId]: current.filter(c => c !== creator) };
            }
            return { ...prev, [uniId]: [...current, creator] };
        });
    };

    const toggleBlockCreator = (name: string) => {
        setBlockedCreators(prev => 
            prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
        );
    };

    const handleRegisterAndAssign = (uniId: number) => {
        if (!regForm.name || !regForm.email || !regForm.pass) return;
        
        const newName = regForm.name;
        setCreatorsList(prev => [...new Set([...prev, newName])]);
        setManualCredentials(prev => ({
            ...prev,
            [newName]: { email: regForm.email, pass: regForm.pass }
        }));
        
        toggleAssignment(uniId, newName);
        setRegForm({ name: '', email: '', pass: '' });
        setIsRegistering(false);
    };

    const getCredentials = (uniName: string, creatorName: string) => {
        if (manualCredentials[creatorName]) {
            return {
                email: manualCredentials[creatorName].email,
                password: manualCredentials[creatorName].pass
            };
        }
        
        const parts = uniName.toLowerCase().split(' ').filter(p => !['university', 'of', 'the'].includes(p));
        const uniSlug = parts[0]?.replace(/[^a-z]/g, '') || 'uni';
        const creatorSeed = creatorName.split('')[0].charCodeAt(0) + creatorName.length;
        const uniSeed = uniName.length + uniName.charCodeAt(0);
        
        return {
            email: `${uniSlug}@eaoverseas.com`,
            password: `eaS-${uniSeed}${creatorSeed}`
        };
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const [uniForm, setUniForm] = useState<{
        name: string; website: string; overview: string;
        type: string; estYear: string; totalStudents: string; ranking: string;
        country: string; city: string; campusSize: string;
        intlStudents: string; acceptanceRate: string; employability: string;
        admissionChance: string; matchDesc: string;
        tuition: string; living: string; misc: string;
        logo: string; banner: string;
        intakes: { term: string; deadline: string; start: string }[];
    }>({
        name: '', website: '', overview: '',
        type: 'Public', estYear: '', totalStudents: '', ranking: '', 
        country: '', city: '', campusSize: '',
        intlStudents: '', acceptanceRate: '', employability: '',
        admissionChance: '98', matchDesc: 'Match based on profile.',
        tuition: '$30k - $45k', living: '$15,000', misc: '$2,500',
        logo: '', banner: '',
        intakes: []
    });
    const [itTerm, setItTerm] = useState('');
    const [itDeadline, setItDeadline] = useState('');
    const [itStart, setItStart] = useState('');
    
    const updateForm = (field: string, val: any) => setUniForm(prev => ({ ...prev, [field]: val }));

    const addIntake = () => {
        if (itTerm && itDeadline && itStart && uniForm.intakes.length < 4) {
            setUniForm(prev => ({
                ...prev,
                intakes: [...prev.intakes, { term: itTerm, deadline: itDeadline, start: itStart }]
            }));
            setItTerm('');
            setItDeadline('');
            setItStart('');
        }
    };

    const removeIntake = (index: number) => {
        setUniForm(prev => ({
            ...prev,
            intakes: prev.intakes.filter((_, i) => i !== index)
        }));
    };
    const navigate = useNavigate();
    const itemsPerPage = 5;

    const stats = [
        { label: 'Active Partners', value: '98', icon: 'handshake', color: 'bg-blue-50 text-blue-600', trend: '82% of total' },
        { label: 'Pending Requests', value: '12', icon: 'clock_loader_40', color: 'bg-amber-50 text-amber-600', trend: 'Requires attention', urgent: true },
        { label: 'Suspended', value: '14', icon: 'block', color: 'bg-rose-50 text-rose-600', trend: '-2 since 2023' },
    ];

    const allUniversities = [
        // Page 1
        { id: 1, name: 'University of Toronto', country: 'Canada', courses: 142, status: 'Active', rating: 4.8, students: 1240 },
        { id: 2, name: 'King\'s College London', country: 'UK', courses: 86, status: 'Active', rating: 4.7, students: 840 },
        { id: 3, name: 'University of Melbourne', country: 'Australia', courses: 215, status: 'Pending', rating: 4.9, students: 0 },
        { id: 4, name: 'Technical University of Munich', country: 'Germany', courses: 94, status: 'Active', rating: 4.6, students: 620 },
        { id: 5, name: 'Nanyang Technological University', country: 'Singapore', courses: 112, status: 'Suspended', rating: 4.8, students: 0 },
        // Page 2
        { id: 6, name: 'Harvard University', country: 'USA', courses: 310, status: 'Active', rating: 4.9, students: 2100 },
        { id: 7, name: 'Oxford University', country: 'UK', courses: 280, status: 'Active', rating: 4.9, students: 1850 },
        { id: 8, name: 'ETH Zurich', country: 'Switzerland', courses: 120, status: 'Active', rating: 4.7, students: 950 },
        { id: 9, name: 'University of Tokyo', country: 'Japan', courses: 180, status: 'Pending', rating: 4.6, students: 0 },
        { id: 10, name: 'McGill University', country: 'Canada', courses: 155, status: 'Active', rating: 4.7, students: 1100 },
    ];

    const filteredUniversities = allUniversities.filter((uni: { name: string; country: string; status: string }) => {
        const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            uni.country.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All Status' || uni.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const paginatedUniversities = filteredUniversities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <SuperAdminLayout title="University Management">
            <div className="p-8 flex flex-col gap-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat: { label: string; icon: string; color: string; urgent?: boolean; value: string; trend: string }) => (
                        <div key={stat.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <div className={`${stat.color} p-2 rounded-lg`}>
                                    <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
                                </div>
                                {stat.urgent && (
                                    <span className="bg-rose-100 text-rose-600 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Urgent</span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                            <div className="pt-2 border-t border-slate-50">
                                <span className={`text-[10px] font-bold ${stat.urgent ? 'text-rose-500' : 'text-slate-400'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Table Toolbar */}
                    <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-full md:w-80">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                                <input
                                    type="text"
                                    placeholder="Search by university name or country..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-all outline-none cursor-pointer"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="All Status">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsAssignPopupOpen(true)}
                                className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all text-sm shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">group_add</span>
                                Assign
                            </button>
                            <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-[#2b6cee] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#2b6cee]/90 transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Add University
                            </button>
                        </div>
                    </div>

                    {/* Table Data */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Detail</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Country</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Courses</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Active Students</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Rating</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Assign</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedUniversities.map((uni: { id: number; name: string; country: string; courses: number; students: number; rating: number; status: string }) => (
                                    <tr key={uni.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-[#2b6cee] font-bold text-lg">
                                                    {uni.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900">{uni.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">ID: UNI-{uni.id.toString().padStart(4, '0')}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-semibold text-slate-600">{uni.country}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-slate-900">{uni.courses}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-slate-900">{uni.students.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5 font-bold text-[#2b6cee] text-xs">
                                                <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                                {uni.rating}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center relative">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="flex -space-x-1.5 overflow-hidden">
                                                    {(assignments[uni.id] || []).map((name, idx) => (
                                                        <div key={idx} className={`size-7 rounded-full border-2 border-white ${blockedCreators.includes(name) ? 'bg-rose-500' : 'bg-[#2b6cee]'} flex items-center justify-center text-[8px] font-black text-white uppercase ring-1 ring-slate-100 shadow-sm`} title={blockedCreators.includes(name) ? `${name} (BLOCKED)` : name}>
                                                            {name.split(' ').map(n => n[0]).join('')}
                                                            {blockedCreators.includes(name) && <div className="absolute inset-0 bg-white/20 rounded-full"></div>}
                                                        </div>
                                                    ))}
                                                </div>
                                                <button 
                                                    onClick={() => setAssigningUniId(assigningUniId === uni.id ? null : uni.id)}
                                                    className="size-7 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-[#2b6cee] hover:text-[#2b6cee] transition-all bg-white shadow-sm"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                                </button>
                                                
                                                {/* Inline Creator Dropdown */}
                                                {assigningUniId === uni.id && (
                                                    <>
                                                        <div className="fixed inset-0 z-[140]" onClick={() => setAssigningUniId(null)}></div>
                                                        <div className={`absolute ${paginatedUniversities.indexOf(uni) > 2 ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 -translate-x-1/2 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[150] p-2 animate-in fade-in zoom-in-95 duration-200 ring-4 ring-black/5`}>
                                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-3 py-2 border-b border-slate-50 mb-1">Select Creators</p>
                                                            {creators.map(creator => (
                                                                <button 
                                                                    key={creator}
                                                                    onClick={() => !blockedCreators.includes(creator) && toggleAssignment(uni.id, creator)}
                                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold transition-all ${
                                                                        (assignments[uni.id] || []).includes(creator) 
                                                                        ? 'bg-blue-50 text-[#2b6cee]' 
                                                                        : 'text-slate-600 hover:bg-slate-50'
                                                                    } ${blockedCreators.includes(creator) ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
                                                                >
                                                                    <div className="flex flex-col items-start">
                                                                        <span className={blockedCreators.includes(creator) ? 'line-through decoration-rose-500 decoration-1' : ''}>{creator}</span>
                                                                        {blockedCreators.includes(creator) && <span className="text-[7px] font-black text-rose-500 bg-rose-50 px-1 rounded mt-0.5 uppercase tracking-widest">Suspended</span>}
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5">
                                                                        {(assignments[uni.id] || []).includes(creator) && (
                                                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                                        )}
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end">
                                                <button
                                                    onClick={() => navigate(`/superadmin/university/${uni.id}`)}
                                                    className="px-4 py-1.5 bg-[#2b6cee]/10 text-[#2b6cee] text-xs font-bold rounded-lg hover:bg-[#2b6cee] hover:text-white transition-all whitespace-nowrap"
                                                >
                                                    View Profile
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="p-5 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Page {currentPage} of 2</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-all disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                            </button>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    className={`size-8 rounded-lg text-xs font-bold transition-all ${currentPage === 1 ? 'bg-[#2b6cee] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                                >
                                    1
                                </button>
                                <button
                                    onClick={() => setCurrentPage(2)}
                                    className={`size-8 rounded-lg text-xs font-bold transition-all ${currentPage === 2 ? 'bg-[#2b6cee] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                                >
                                    2
                                </button>
                            </div>
                            <button
                                onClick={() => setCurrentPage(2)}
                                className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
                                disabled={currentPage === 2}
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 border-b border-slate-100">
                            <div>
                                <h2 className="text-xl font-black text-[#111318] flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2b6cee]">school</span>
                                    Onboard New University
                                </h2>
                                <p className="text-[13px] text-slate-500 italic mt-1 font-medium">Configure institutional details and strategic positioning.</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Scrolling Form Body */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            <div className="flex flex-col gap-8">
                                
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-[#2b6cee] uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">info</span>
                                        Basic Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">University Name <span className="text-rose-500">*</span></label>
                                            <input type="text" value={uniForm.name} onChange={e => updateForm('name', e.target.value)} placeholder="Enter official institutional name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Official Website <span className="text-rose-500">*</span></label>
                                            <input type="text" value={uniForm.website} onChange={e => updateForm('website', e.target.value)} placeholder="https://university.edu" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5 pt-2">
                                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Institutional Overview</label>
                                        <textarea 
                                            value={uniForm.overview} 
                                            onChange={e => updateForm('overview', e.target.value)}
                                            placeholder="Write a brief overview about the university..." 
                                            rows={4} 
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Institutional Profile */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-[#2b6cee] uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">account_balance</span>
                                        Institutional Profile
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Type</label>
                                            <select value={uniForm.type} onChange={e => updateForm('type', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all">
                                                <option value="Public">Public</option>
                                                <option value="Private">Private</option>
                                                <option value="Research">Research</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Est. Year</label>
                                            <input type="text" value={uniForm.estYear} onChange={e => updateForm('estYear', e.target.value)} placeholder="YYYY" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Total Students</label>
                                            <input type="text" value={uniForm.totalStudents} onChange={e => updateForm('totalStudents', e.target.value)} placeholder="Number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Global Ranking</label>
                                            <input type="text" value={uniForm.ranking} onChange={e => updateForm('ranking', e.target.value)} placeholder="e.g. #42 QS" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                    </div>

                                    {/* Success Metrics */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Int'l Students</label>
                                            <input type="text" value={uniForm.intlStudents} onChange={e => updateForm('intlStudents', e.target.value)} placeholder="e.g. 13,000+" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Acceptance Rate</label>
                                            <input type="text" value={uniForm.acceptanceRate} onChange={e => updateForm('acceptanceRate', e.target.value)} placeholder="e.g. 88%" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Employability</label>
                                            <input type="text" value={uniForm.employability} onChange={e => updateForm('employability', e.target.value)} placeholder="e.g. 92%" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                    </div>
                                    
                                </div>

                                {/* Geography & Campus */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-[#2b6cee] uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                                        Geography & Campus
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Country <span className="text-rose-500">*</span></label>
                                            <input type="text" value={uniForm.country} onChange={e => updateForm('country', e.target.value)} placeholder="e.g. United Kingdom" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">City</label>
                                            <input type="text" value={uniForm.city} onChange={e => updateForm('city', e.target.value)} placeholder="e.g. London" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Campus Size</label>
                                            <input type="text" value={uniForm.campusSize} onChange={e => updateForm('campusSize', e.target.value)} placeholder="e.g. 500 Acres" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                    </div>
                                </div>

                                {/* Financial Estimates */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-[#2b6cee] uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">payments</span>
                                        Est. Annual Expense
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Tuition Fees (Range)</label>
                                            <input type="text" value={uniForm.tuition} onChange={e => updateForm('tuition', e.target.value)} placeholder="e.g. $32k - $45k" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Living Expenses</label>
                                            <input type="text" value={uniForm.living} onChange={e => updateForm('living', e.target.value)} placeholder="e.g. $15,500" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Misc & Insurance</label>
                                            <input type="text" value={uniForm.misc} onChange={e => updateForm('misc', e.target.value)} placeholder="e.g. $2,500" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                    </div>
                                </div>

                                {/* Upcoming Intakes */}
                                <div className="space-y-6">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-[#2b6cee] uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                                        Upcoming Institutional Intakes
                                    </h3>
                                    
                                    <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-200 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                            <div className="md:col-span-3 flex flex-col gap-1.5">
                                                <label className="text-[10px] font-black text-slate-700 uppercase">Intake Term *</label>
                                                <input type="text" value={itTerm} onChange={e => setItTerm(e.target.value)} placeholder="e.g. Fall 2024" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-[#2b6cee]" />
                                            </div>
                                            <div className="md:col-span-3 flex flex-col gap-1.5">
                                                <label className="text-[10px] font-black text-slate-700 uppercase">Deadline *</label>
                                                <input type="text" value={itDeadline} onChange={e => setItDeadline(e.target.value)} placeholder="e.g. Dec 15" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-[#2b6cee]" />
                                            </div>
                                            <div className="md:col-span-3 flex flex-col gap-1.5">
                                                <label className="text-[10px] font-black text-slate-700 uppercase">Classes Start *</label>
                                                <input type="text" value={itStart} onChange={e => setItStart(e.target.value)} placeholder="e.g. Aug 20" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-[#2b6cee]" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <button 
                                                    type="button" 
                                                    onClick={addIntake}
                                                    disabled={uniForm.intakes.length >= 4}
                                                    className="w-full h-[40px] bg-[#2b6cee] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                                    Add Slot
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {[0, 1, 2, 3].map((slotIdx) => {
                                                const intake = uniForm.intakes[slotIdx];
                                                return (
                                                    <div key={slotIdx} className={`h-20 rounded-2xl border-2 border-dashed flex items-center px-5 transition-all group ${intake ? 'bg-white border-[#2b6cee]/20 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-50'}`}>
                                                        {intake ? (
                                                            <div className="flex-1 flex flex-col">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-[11px] font-black text-[#2b6cee] uppercase tracking-wider">{intake.term}</span>
                                                                    <button onClick={() => removeIntake(slotIdx)} className="size-6 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                                                        <span className="material-symbols-outlined text-[14px]">delete</span>
                                                                    </button>
                                                                </div>
                                                                <div className="flex items-center gap-3 mt-1">
                                                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Deadline: <span className="text-rose-500">{intake.deadline}</span></span>
                                                                    <div className="size-1 rounded-full bg-slate-200"></div>
                                                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Start: {intake.start}</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex-1 text-center">
                                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Slot {slotIdx + 1}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Institutional Branding */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-[#2b6cee] uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">branding_watermark</span>
                                        Institutional Branding
                                    </h3>
                                    
                                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-8">
                                        {/* Logo Section */}
                                        <div className="flex items-center gap-6">
                                            <div className="size-24 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-slate-300 text-[32px]">image</span>
                                            </div>
                                            <div className="flex flex-col gap-2 w-full min-w-[200px]">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Logo Image</label>
                                                    <input type="text" placeholder="Paste logo link" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 uppercase">
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                    OR UPLOAD
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                </div>
                                                <button className="w-full py-2 bg-white border border-dashed border-slate-300 rounded-lg text-slate-500 font-bold text-[11px] hover:border-[#2b6cee] hover:text-[#2b6cee] hover:bg-[#2b6cee]/5 transition-all flex items-center justify-center gap-2">
                                                    <span className="material-symbols-outlined text-[16px]">upload_file</span>
                                                    Choose File from Device
                                                </button>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="hidden md:block w-px bg-slate-200 self-stretch"></div>

                                        {/* Banner Section */}
                                        <div className="flex-1 flex flex-col gap-3">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Banner Image (Hero)</label>
                                            <div className="w-full h-24 bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1">
                                                <span className="material-symbols-outlined text-slate-300 text-[24px]">landscape</span>
                                                <span className="text-[10px] font-semibold text-slate-400 italic">Banner Image Preview</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <input type="text" placeholder="Paste banner image URL" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                                <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 uppercase">
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                    OR UPLOAD
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <button className="w-full py-2 bg-white border border-dashed border-slate-300 rounded-lg text-slate-500 font-bold text-[11px] hover:border-[#2b6cee] hover:text-[#2b6cee] hover:bg-[#2b6cee]/5 transition-all flex items-center justify-center gap-2">
                                                        <span className="material-symbols-outlined text-[16px]">upload_file</span>
                                                        Choose Banner from Device
                                                    </button>
                                                    <span className="text-[9px] text-slate-400 italic">Recommended 1200x400 or higher.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Campus Facilities */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-[#2b6cee] uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">done_all</span>
                                        Campus Facilities
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Library', 'Hostel', 'Sports Complex', 'Gym', 'Cafeteria', 'Wi-Fi', 'Medical Center', 'Career Counseling'].map(f => (
                                            <button key={f} className="px-4 py-2 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-600 hover:border-[#2b6cee] hover:text-[#2b6cee] hover:bg-[#2b6cee]/5 transition-colors">
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-4 shrink-0">
                            <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 text-xs font-black text-slate-500 uppercase tracking-widest hover:text-slate-800 transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 bg-[#111318] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-colors shadow-lg">
                                Confirm Onboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Assign Popup Modal */}
            {isAssignPopupOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl animate-in zoom-in-95 duration-200 overflow-hidden border border-white">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-xl bg-white border-2 border-[#2b6cee] text-[#2b6cee] flex items-center justify-center shadow-lg shadow-blue-50">
                                    <span className="material-symbols-outlined font-black text-[18px]">diversity_3</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-900 tracking-tight">Institutional Assignments</h3>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">Control Content Creator Access Permissions</p>
                                </div>
                            </div>
                            <button onClick={() => setIsAssignPopupOpen(false)} className="size-8 flex items-center justify-center border border-slate-200 rounded-xl text-slate-400 hover:bg-white hover:text-rose-500 transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3 bg-slate-50/10">
                            {allUniversities.map(uni => (
                                <div key={uni.id} className="p-4 rounded-xl border border-slate-100 bg-white flex flex-col gap-4 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center justify-between">
                                        <button 
                                            onClick={() => setExpandedCreator(expandedCreator?.name === 'Official' && expandedCreator?.uniId === uni.id ? null : { uniId: uni.id, name: 'Official' })}
                                            className={`flex items-center gap-3 p-1 rounded-xl transition-all ${expandedCreator?.name === 'Official' && expandedCreator?.uniId === uni.id ? 'bg-slate-50 ring-1 ring-slate-200 shadow-sm' : 'hover:bg-slate-50'}`}
                                        >
                                            <div className="size-9 rounded-lg bg-slate-50 flex items-center justify-center text-[#2b6cee] font-black border border-slate-100 text-xs">
                                                {uni.name.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-xs text-slate-900">{uni.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{uni.country}</p>
                                            </div>
                                        </button>
                                        
                                        <div className="flex flex-wrap items-center justify-end gap-2 max-w-[60%]">
                                            {(assignments[uni.id] || []).length > 0 ? (
                                                assignments[uni.id].map((c, idx) => (
                                                    <button 
                                                        key={idx} 
                                                        onClick={() => {
                                                            setPopupAssigningUniId(null);
                                                            setExpandedCreator(expandedCreator?.name === c && expandedCreator?.uniId === uni.id ? null : { uniId: uni.id, name: c });
                                                        }}
                                                        className={`px-3 py-1 border rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                                                            expandedCreator?.name === c && expandedCreator?.uniId === uni.id 
                                                            ? (blockedCreators.includes(c) ? 'bg-rose-600 text-white border-rose-600' : 'bg-[#2b6cee] text-white border-[#2b6cee] shadow-lg shadow-blue-100')
                                                            : (blockedCreators.includes(c) ? 'bg-rose-50 border-rose-200 text-rose-500 line-through' : 'bg-white border-slate-200 text-[#2b6cee] hover:border-[#2b6cee]')
                                                        }`}
                                                    >
                                                        {c}
                                                    </button>
                                                ))
                                            ) : (
                                                <span className="text-[9px] font-black text-slate-300 italic uppercase tracking-widest mr-2">Unassigned</span>
                                            )}

                                            <div className="relative">
                                                <button 
                                                    onClick={() => {
                                                        setExpandedCreator(null);
                                                        setPopupAssigningUniId(popupAssigningUniId === uni.id ? null : uni.id);
                                                    }}
                                                    className="size-7 rounded-lg border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-400 hover:border-[#2b6cee] hover:text-[#2b6cee] transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                                </button>

                                                {popupAssigningUniId === uni.id && (
                                                    <>
                                                        <div className="fixed inset-0 z-[210]" onClick={() => {
                                                            setPopupAssigningUniId(null);
                                                            setIsRegistering(false);
                                                        }}></div>
                                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-[220] animate-in slide-in-from-top-2 duration-200">
                                                            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-50 mb-1">
                                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-[#2b6cee]">Quick Assign</p>
                                                                <button onClick={() => setIsRegistering(!isRegistering)} className="text-[8px] font-black text-[#2b6cee] hover:underline uppercase transition-all">
                                                                    {isRegistering ? 'Back to List' : 'Register New'}
                                                                </button>
                                                            </div>
                                                            <div className="max-h-64 overflow-y-auto">
                                                                {isRegistering ? (
                                                                    <div className="p-2 space-y-2 animate-in fade-in zoom-in-95 duration-200">
                                                                        <input 
                                                                            type="text" placeholder="Full Name" 
                                                                            value={regForm.name} onChange={e => setRegForm({...regForm, name: e.target.value})}
                                                                            className="w-full text-[10px] p-2 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                                                                        />
                                                                        <input 
                                                                            type="email" placeholder="Work Email" 
                                                                            value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})}
                                                                            className="w-full text-[10px] p-2 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                                                                        />
                                                                        <input 
                                                                            type="text" placeholder="Password" 
                                                                            value={regForm.pass} onChange={e => setRegForm({...regForm, pass: e.target.value})}
                                                                            className="w-full text-[10px] p-2 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                                                                        />
                                                                        <button 
                                                                            onClick={() => handleRegisterAndAssign(uni.id)}
                                                                            className="w-full py-2 bg-[#2b6cee] text-white text-[9px] font-black uppercase rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
                                                                        >
                                                                            Register & Add
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="space-y-1">
                                                                        {creatorsList.map(creator => (
                                                                            <button 
                                                                                key={creator}
                                                                                onClick={() => !blockedCreators.includes(creator) && toggleAssignment(uni.id, creator)}
                                                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold transition-all ${
                                                                                    (assignments[uni.id] || []).includes(creator) 
                                                                                    ? 'bg-blue-50 text-[#2b6cee]' 
                                                                                    : 'text-slate-600 hover:bg-slate-50'
                                                                                } ${blockedCreators.includes(creator) ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
                                                                            >
                                                                                <div className="flex flex-col items-start text-left">
                                                                                    <span className={blockedCreators.includes(creator) ? 'line-through decoration-rose-500 decoration-1' : ''}>{creator}</span>
                                                                                    {blockedCreators.includes(creator) && <span className="text-[6px] font-black text-rose-500 bg-rose-50 px-1 rounded uppercase tracking-tighter">Suspended</span>}
                                                                                </div>
                                                                                {(assignments[uni.id] || []).includes(creator) && (
                                                                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                                                                )}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Credential Card */}
                                    {expandedCreator?.uniId === uni.id && (
                                        <div className={`rounded-xl p-3 animate-in fade-in zoom-in-95 duration-200 shadow-xl border flex flex-col gap-3 ${blockedCreators.includes(expandedCreator.name) ? 'bg-rose-950 border-rose-800' : 'bg-slate-900 border-slate-700'}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-1.5 py-0.5 ${expandedCreator.name === 'Official' ? 'bg-emerald-500' : (blockedCreators.includes(expandedCreator.name) ? 'bg-rose-500' : 'bg-[#2b6cee]')} text-white text-[7px] font-black rounded uppercase`}>
                                                        {expandedCreator.name === 'Official' ? 'University Official' : expandedCreator.name}
                                                    </span>
                                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                                                        {blockedCreators.includes(expandedCreator.name) ? 'ACCOUNT SUSPENDED' : 'Access Credentials'}
                                                    </span>
                                                </div>
                                                <button onClick={() => setExpandedCreator(null)} className="text-slate-500 hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                                </button>
                                            </div>
                                            
                                            {blockedCreators.includes(expandedCreator.name) ? (
                                                <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500">
                                                            <span className="material-symbols-outlined text-[20px]">block</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-white uppercase">Access Revoked</p>
                                                            <p className="text-[8px] font-medium text-rose-300 uppercase tracking-widest">Creator has been blocked from all accounts.</p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => toggleBlockCreator(expandedCreator.name)}
                                                        className="px-4 py-1.5 bg-rose-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-400 transition-all shadow-lg shadow-rose-900/40"
                                                    >
                                                        Unblock Creator
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="bg-white/5 p-2 rounded-lg border border-white/10 group flex items-center justify-between">
                                                            <div className="flex flex-col">
                                                                <span className="text-[7px] font-bold text-slate-500 uppercase">Shared Institutional Email</span>
                                                                <span className="text-[10px] font-bold text-white lowercase truncate max-w-[120px]">{getCredentials(uni.name, expandedCreator.name).email}</span>
                                                            </div>
                                                            <button onClick={() => copyToClipboard(getCredentials(uni.name, expandedCreator.name).email)} className="size-6 rounded-md bg-white/10 text-white flex items-center justify-center hover:bg-[#2b6cee] transition-all">
                                                                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                                                            </button>
                                                        </div>
                                                        <div className="bg-white/5 p-2 rounded-lg border border-white/10 group flex items-center justify-between">
                                                            <div className="flex flex-col">
                                                                <span className="text-[7px] font-bold text-slate-500 uppercase">{expandedCreator.name === 'Official' ? 'Official Master Password' : 'Creator Unique Password'}</span>
                                                                <span className="text-[10px] font-bold text-emerald-400 font-mono tracking-wider">{getCredentials(uni.name, expandedCreator.name).password}</span>
                                                            </div>
                                                            <button onClick={() => copyToClipboard(getCredentials(uni.name, expandedCreator.name).password)} className="size-6 rounded-md bg-white/10 text-white flex items-center justify-center hover:bg-emerald-500 transition-all">
                                                                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {expandedCreator.name !== 'Official' && (
                                                        <div className="pt-2 border-t border-white/5 flex justify-end">
                                                            <button 
                                                                onClick={() => toggleBlockCreator(expandedCreator.name)}
                                                                className="flex items-center gap-1.5 text-rose-500 hover:text-rose-400 text-[9px] font-black uppercase tracking-widest transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined text-[14px]">person_remove</span>
                                                                Terminate & Block Creator
                                                            </button>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                            <p className="text-[9px] text-slate-400 italic font-medium">Click university name for <span className="text-emerald-600 font-bold">Official Access</span> or creator tags for <span className="text-blue-600 font-bold">Creator Access</span>.</p>
                            <button 
                                onClick={() => {
                                    setIsAssignPopupOpen(false);
                                    setPopupAssigningUniId(null);
                                    setExpandedCreator(null);
                                }} 
                                className="px-8 py-2.5 bg-[#111318] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </SuperAdminLayout>
    );
};

export default SuperAdminUniversityManagement;
