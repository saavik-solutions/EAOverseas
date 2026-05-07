import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import CreateUniversityModal from '@/features/universities/components/CreateUniversityModal';
import AddManagerModal from '@/features/universities/components/AddManagerModal';
import ManageMembersModal from '@/features/universities/components/ManageMembersModal';
import { usePosts } from '@/shared/contexts/PostsContext';


const SuperAdminUniversityManagement = () => {
    const { clearAllPosts } = usePosts();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddManagerModal, setShowAddManagerModal] = useState(false);
    const [showManageMembersModal, setShowManageMembersModal] = useState(false);
    const [selectedUniForManager, setSelectedUniForManager] = useState<any>(null);
    const [activePopoverId, setActivePopoverId] = useState<number | null>(null);

    const [popoverSearch, setPopoverSearch] = useState('');
    const navigate = useNavigate();
    const itemsPerPage = 5;

    const creators: any[] = [];


    const [universities, setUniversities] = useState(() => {
        const saved = localStorage.getItem('eaoverseas_universities');
        if (saved) return JSON.parse(saved);
        return [
            // Page 1
            {
                id: 1, name: 'University of Toronto', country: 'Canada', courses: 142, status: 'Active', rating: 4.8, students: 1240, email: 'admissions@utoronto.ca', managers: [
                    { id: 'MGR-7721', name: 'Sarah Wilson', email: 'admissions@utoronto.ca', password: 'TORONTO_ADMIN_9921', isBlocked: false },
                    { id: 'MGR-6418', name: 'kalua', email: 'admissions@utoronto.ca', password: 'KALUA_UT_8821', isBlocked: false }
                ]
            },
            { id: 2, name: 'King\'s College London', country: 'UK', courses: 86, status: 'Active', rating: 4.7, students: 840, email: 'admissions@kcl.ac.uk', managers: [] },
            { id: 3, name: 'University of Melbourne', country: 'Australia', courses: 215, status: 'Pending', rating: 4.9, students: 0, email: 'admissions@unimelb.edu.au', managers: [] },
            { id: 4, name: 'Technical University of Munich', country: 'Germany', courses: 94, status: 'Active', rating: 4.6, students: 620, email: 'admissions@tum.de', managers: [{ id: 'MGR-1120', name: 'David Miller', email: 'admissions@tum.de', password: 'TUM_ACCESS_2290', isBlocked: false }] },
            { id: 5, name: 'Nanyang Technological University', country: 'Singapore', courses: 112, status: 'Suspended', rating: 4.8, students: 0, email: 'admissions@ntu.edu.sg', managers: [] },
            // Page 2
            { id: 6, name: 'Harvard University', country: 'USA', courses: 310, status: 'Active', rating: 4.9, students: 2100, email: 'admissions@harvard.edu', managers: [{ id: 'MGR-8891', name: 'Emma Rose', email: 'admissions@harvard.edu', password: 'HARVARD_SEC_1123', isBlocked: false }] },
            { id: 7, name: 'Oxford University', country: 'UK', courses: 280, status: 'Active', rating: 4.9, students: 1850, email: 'admissions@ox.ac.uk', managers: [{ id: 'MGR-2351', name: 'Michael Chen', email: 'admissions@ox.ac.uk', password: 'OXFORD_MGR_4451', isBlocked: false }] },
            { id: 8, name: 'ETH Zurich', country: 'Switzerland', courses: 120, status: 'Active', rating: 4.7, students: 950, email: 'admissions@ethz.ch', managers: [] },
            { id: 9, name: 'University of Tokyo', country: 'Japan', courses: 180, status: 'Pending', rating: 4.6, students: 0, email: 'admissions@u-tokyo.ac.jp', managers: [] },
            { id: 10, name: 'McGill University', country: 'Canada', courses: 155, status: 'Active', rating: 4.7, students: 1100, email: 'admissions@mcgill.ca', managers: [] },
        ];
    });

    const totalCount = universities.length;
    const applicationCount = 1284; // Mock value as per provided design

    const stats = [
        { label: 'Total Universities', value: totalCount.toString(), icon: 'school', color: 'bg-blue-50 text-blue-600', trend: 'Global Network', trending: false, urgent: false },
        { label: 'Top Performers', value: '20', icon: 'local_fire_department', color: 'bg-indigo-50 text-indigo-600', trend: 'Highest application volume', trending: true, urgent: false },
        { label: 'Applications', value: applicationCount.toString(), icon: 'description', color: 'bg-emerald-50 text-emerald-600', trend: '+12.5% this month', trending: true, urgent: false },
    ];

    // Sync universities to localStorage
    useEffect(() => {
        localStorage.setItem('eaoverseas_universities', JSON.stringify(universities));
    }, [universities]);

    // Seed initial managers into the authentication system
    useEffect(() => {
        try {
            const rawUsers = localStorage.getItem('eaoverseas_registered_users');
            const registeredUsers = Array.isArray(JSON.parse(rawUsers || '[]')) ? JSON.parse(rawUsers || '[]') : [];
            let updated = false;

            universities.forEach(uni => {
                uni.managers?.forEach((mgr: any) => {
                    const existingIdx = registeredUsers.findIndex((u: any) => u.email.toLowerCase().trim() === mgr.email.toLowerCase().trim());
                    if (existingIdx === -1) {
                        registeredUsers.push({
                            id: mgr.id,
                            name: mgr.name,
                            email: mgr.email,
                            password: mgr.password,
                            role: 'University',
                            university: uni.name,
                            country: uni.country, // Add country for localization
                            isDemo: true,
                            isBlocked: !!mgr.isBlocked
                        });
                        updated = true;
                    } else {
                        // Ensure university and country are always in sync for visibility
                        let changed = false;
                        if (registeredUsers[existingIdx].university !== uni.name) {
                            registeredUsers[existingIdx].university = uni.name;
                            changed = true;
                        }
                        if (registeredUsers[existingIdx].country !== uni.country) {
                            registeredUsers[existingIdx].country = uni.country;
                            changed = true;
                        }
                        if (changed) updated = true;
                    }
                });
            });

            if (updated) {
                localStorage.setItem('eaoverseas_registered_users', JSON.stringify(registeredUsers));
            }
        } catch (e) {
            console.error("Failed to sync registered users", e);
        }
    }, [universities]);


    const handleAddManager = (uniId: number, managerData: any) => {
        setUniversities(prev => prev.map(uni =>
            uni.id === uniId ? { ...uni, managers: [...(uni.managers || []), managerData].slice(0, 4) } : uni
        ));

        // Persist to authentication system
        const registeredUsers = JSON.parse(localStorage.getItem('eaoverseas_registered_users') || '[]');
        registeredUsers.push({
            id: managerData.id,
            name: managerData.name,
            email: managerData.email,
            password: managerData.password,
            role: 'University',
            university: universities.find(uni => uni.id === uniId)?.name || '',
            country: universities.find(uni => uni.id === uniId)?.country || '',
            isDemo: false,
            isBlocked: false
        });
        localStorage.setItem('eaoverseas_registered_users', JSON.stringify(registeredUsers));
    };

    const handleRemoveManager = (uniId: number, managerId: string) => {
        setUniversities(prev => prev.map(uni =>
            uni.id === uniId ? { ...uni, managers: (uni.managers || []).filter((m: any) => m.id !== managerId) } : uni
        ));
    };


    const filteredCreators = creators.filter(c =>
        c.name.toLowerCase().includes(popoverSearch.toLowerCase())
    );

    const filteredUniversities = universities.filter(uni => {
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
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            onClick={() => {
                                if (stat.label === 'Total Universities') navigate('/Superadmin/active-partners');
                                if (stat.label === 'Top Performers') navigate('/Superadmin/top-performers');
                                if (stat.label === 'Applications') navigate('/Superadmin/applications');
                            }}
                            className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 ${['Total Universities', 'Top Performers', 'Applications'].includes(stat.label) ? 'cursor-pointer hover:border-[#2b6cee] hover:shadow-md transition-all group/card' : ''}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className={`${stat.color} p-2 rounded-lg ${stat.label === 'Total Universities' ? 'group-hover/card:bg-blue-600 group-hover/card:text-white transition-colors' : ''}`}>
                                    <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
                                </div>
                                {stat.urgent && (
                                    <span className="bg-rose-100 text-rose-600 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Urgent</span>
                                )}
                                {stat.trending && (
                                    <span className="bg-indigo-100 text-indigo-600 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Trending</span>
                                )}
                            </div>
                            <div>
                                {stat.label !== 'Top Performers' && (
                                    <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
                                )}
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                            <div className="pt-2 border-t border-slate-50">
                                <span className={`text-[10px] font-bold ${stat.urgent ? 'text-rose-500' : stat.trending ? 'text-indigo-500' : 'text-slate-400'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col relative">
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
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowManageMembersModal(true)}
                                className="bg-slate-100 text-slate-600 px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">group</span>
                                Manage
                            </button>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#2b6cee]/90 transition-all shadow-md shadow-[#2b6cee]/20 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Add University
                            </button>
                        </div>
                    </div>

                    {/* Table Data */}
                    <div className="overflow-x-visible">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Detail</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Country</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Courses</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Active Students</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Managed By</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedUniversities.map((uni, index) => (
                                    <tr key={uni.id || (uni as any).tempId} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-[#2b6cee] font-bold text-lg">
                                                    {uni.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900">{uni.name}</span>
                                                    {uni.id && (
                                                        <span className="text-[10px] text-slate-400 font-medium">ID: UNI-{uni.id.toString().padStart(4, '0')}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-semibold text-slate-600">{uni.country}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-slate-900">
                                                {Array.isArray(uni.courses) ? uni.courses.length : uni.courses}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-slate-900">{uni.students.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="relative flex justify-center">
                                                {uni.managers && uni.managers.length > 0 ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="flex -space-x-2">
                                                            {uni.managers.map((m: any) => (
                                                                <div key={m.id} className="size-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[8px] font-bold ring-2 ring-white shadow-sm border border-indigo-200" title={m.name}>
                                                                    {m.name.charAt(0)}
                                                                </div>
                                                            ))}
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedUniForManager(uni);
                                                                    setActivePopoverId(activePopoverId === uni.id ? null : uni.id);
                                                                }}
                                                                className="size-6 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-[#2b6cee] hover:text-white transition-all ring-2 ring-white shadow-sm"
                                                            >
                                                                <span className="material-symbols-outlined text-[14px]">add</span>
                                                            </button>
                                                        </div>
                                                        <span className="text-[9px] text-[#2b6cee] font-bold uppercase tracking-wider">{uni.managers.length} Assigned</span>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUniForManager(uni);
                                                            setActivePopoverId(activePopoverId === uni.id ? null : uni.id);
                                                        }}
                                                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">person_add</span>
                                                        Manage
                                                    </button>
                                                )}


                                                {/* Assignment Popover */}
                                                {activePopoverId === uni.id && (
                                                    <>
                                                        <div className="fixed inset-0 z-40" onClick={() => setActivePopoverId(null)}></div>
                                                        <div className={`absolute ${index >= paginatedUniversities.length - 2 ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 -translate-x-1/2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
                                                            <div className="p-3 border-b border-slate-50 bg-slate-50/50">
                                                                <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Manage Personnel</h6>
                                                            </div>
                                                            <div className="max-h-64 overflow-y-auto p-1.5 space-y-1.5">
                                                                <button
                                                                    onClick={() => {
                                                                        setShowAddManagerModal(true);
                                                                        setActivePopoverId(null);
                                                                    }}
                                                                    className="w-full flex items-center gap-3 p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all group border border-dashed border-indigo-200"
                                                                >
                                                                    <div className="size-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                                                                    </div>
                                                                    <div className="flex flex-col items-start">
                                                                        <span className="text-xs font-bold uppercase tracking-wider">Add Manager</span>
                                                                        <span className="text-[9px] text-slate-400 font-medium">New Unique Credentials</span>
                                                                    </div>
                                                                </button>

                                                                {uni.managers && uni.managers.length > 0 && (
                                                                    <div className="pt-2 border-t border-slate-50">
                                                                        <p className="px-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Existing Managers</p>
                                                                        {uni.managers.map((m: any) => (
                                                                            <div key={m.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl group transition-all">
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className="size-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold uppercase">
                                                                                        {m.name.charAt(0)}
                                                                                    </div>
                                                                                    <div className="flex flex-col">
                                                                                        <span className="text-xs font-bold text-slate-700">{m.name}</span>
                                                                                        <span className="text-[8px] text-slate-400 font-mono font-bold tracking-tighter">{m.id}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {!uni.managers?.length && (
                                                                    <div className="p-6 text-center text-xs text-slate-400 italic">No managers assigned yet</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => navigate('/university/management', { state: { university: uni } })}
                                                        className="size-8 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-[#2b6cee] hover:text-white transition-all flex items-center justify-center shadow-sm"
                                                        title="View Scholarships"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">settings_suggest</span>
                                                    </button>
                                                    <button
                                                        onClick={() => navigate('/university/post-center', { state: { university: uni } })}
                                                        className="size-8 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-[#2b6cee] hover:text-white transition-all flex items-center justify-center shadow-sm"
                                                        title="View Post Center"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">post_add</span>
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/Superadmin/university/${uni.id || 'new'}`, { state: { university: uni } })}
                                                        className="px-4 py-1.5 bg-[#2b6cee]/10 text-[#2b6cee] text-xs font-bold rounded-lg hover:bg-[#2b6cee] hover:text-white transition-all whitespace-nowrap"
                                                    >
                                                        View Profile
                                                    </button>
                                                </div>
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
                    {/* System Maintenance */}
                    <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-orange-500">warning</span>
                                    System Maintenance
                                </h3>
                                <p className="text-xs text-slate-500">If your browser storage is full (Storage Full alert), use this to reset all university posts.</p>
                            </div>
                            <button
                                onClick={clearAllPosts}
                                className="px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-all text-xs shadow-sm"
                            >
                                Reset System Feed
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <CreateUniversityModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={(data) => {
                    const newUniversitySpec = {
                        ...data,
                        tempId: Date.now(),
                        name: data.displayName || data.legalName,
                        country: data.country,
                        courses: data.programName ? [{
                            name: data.programName,
                            duration: data.programDuration,
                            start: data.applicationDeadline,
                            price: 'See brochure'
                        }] : [],
                        rating: 0,
                        students: 0,
                        managers: []

                    };
                    setUniversities([newUniversitySpec as any, ...universities]);
                    setShowCreateModal(false);
                }}



            />
            <AddManagerModal
                isOpen={showAddManagerModal}
                onClose={() => setShowAddManagerModal(false)}
                universityName={selectedUniForManager?.name || ''}
                universityEmail={selectedUniForManager?.email || 'admissions@university.edu'}
                onAdd={(manager) => handleAddManager(selectedUniForManager.id, manager)}
            />
            <ManageMembersModal
                isOpen={showManageMembersModal}
                onClose={() => setShowManageMembersModal(false)}
                members={universities.flatMap(uni =>
                    (uni.managers || []).map((m: any) => ({
                        id: m.id,
                        name: m.name,
                        university: uni.name,
                        startDate: '2024-01-01', // Default or track in state
                        endDate: '2025-01-01',
                        progress: 100,
                        status: m.isBlocked ? 'Past' : 'Current',
                        loginEmail: m.email,
                        loginPassword: m.password,
                        isBlocked: !!m.isBlocked,
                        country: uni.country
                    }))
                )}
                onToggleBlock={(memberId) => {
                    setUniversities(prev => prev.map(uni => ({
                        ...uni,
                        managers: (uni.managers || []).map((m: any) =>
                            m.id === memberId ? { ...m, isBlocked: !m.isBlocked } : m
                        )
                    })));

                    // Sync to authentication system
                    const registeredUsers = JSON.parse(localStorage.getItem('eaoverseas_registered_users') || '[]');
                    const updatedUsers = registeredUsers.map((u: any) =>
                        u.id === memberId ? { ...u, isBlocked: !u.isBlocked } : u
                    );
                    localStorage.setItem('eaoverseas_registered_users', JSON.stringify(updatedUsers));
                }}
            />
        </SuperAdminLayout>
    );
};

export default SuperAdminUniversityManagement;

