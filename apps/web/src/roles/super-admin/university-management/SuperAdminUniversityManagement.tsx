import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import CreateUniversityModal from '@/features/universities/components/CreateUniversityModal';
import AddManagerModal from '@/features/universities/components/AddManagerModal';
import ManageMembersModal from '@/features/universities/components/ManageMembersModal';
import { usePosts } from '@/shared/contexts/PostsContext';

=======
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import { universityService } from '../services/universityService';
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx

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

<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
    const [popoverSearch, setPopoverSearch] = useState('');
    const navigate = useNavigate();
    const itemsPerPage = 5;

    const creators: any[] = [];
=======
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

    const toggleBlockCreator = async (name: string, uniName?: string) => {
        const isBlocking = !blockedCreators.includes(name);
        
        // Update local state immediately for UI responsiveness
        setBlockedCreators(prev => 
            isBlocking ? [...prev, name] : prev.filter(c => c !== name)
        );
        localStorage.setItem('ea_blocked_creators', JSON.stringify(
            isBlocking ? [...blockedCreators, name] : blockedCreators.filter(c => c !== name)
        ));

        // Persist Blocked Credentials for Login Page Check
        if (uniName) {
            const blockedCredsJSON = localStorage.getItem('ea_blocked_credentials');
            let blockedCreds: any[] = blockedCredsJSON ? JSON.parse(blockedCredsJSON) : [];
            const currentCreds = getCredentials(uniName, name);

            if (isBlocking) {
                // Add to blocked credentials
                if (!blockedCreds.some(c => c.email === currentCreds.email && c.password === currentCreds.password)) {
                    blockedCreds.push({ ...currentCreds, name });
                }
            } else {
                // Remove from blocked credentials
                blockedCreds = blockedCreds.filter(c => !(c.email === currentCreds.email && c.password === currentCreds.password));
            }
            localStorage.setItem('ea_blocked_credentials', JSON.stringify(blockedCreds));
        }

        // Sync with Backend if it's a real user
        try {
            const token = localStorage.getItem('ea_token') || localStorage.getItem('eaoverseas_token');
            // First fetch users to find the ID of this creator
            const res = await fetch('http://localhost:4000/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const usersData = await res.json();
            const users = usersData.data || [];
            
            // Look for user with same full name OR same email
            let userMatch = users.find((u: any) => u.fullName.toLowerCase() === name.toLowerCase());
            
            if (!userMatch && uniName) {
                const credentials = getCredentials(uniName, name);
                userMatch = users.find((u: any) => u.email.toLowerCase() === credentials.email.toLowerCase());
            }

            if (userMatch) {
                await fetch(`http://localhost:4000/api/admin/users/${userMatch.id}/status`, {
                    method: 'PATCH',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({ isActive: !isBlocking })
                });
                console.log(`Backend status updated for ${name}: ${!isBlocking ? 'Active' : 'Suspended'}`);
            }
        } catch (error) {
            console.error("Failed to sync block status with backend", error);
        }
    };

    const handleRegisterAndAssign = async (uniId: number) => {
        if (!regForm.name || !regForm.email || !regForm.pass) return;
        
        try {
            // 1. Attempt Backend Registration
            const res = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: regForm.email,
                    password: regForm.pass,
                    fullName: regForm.name,
                    role: 'counsellor' // Register authors as counsellors
                })
            });

            // Note: If user already exists, we might want to just proceed with assignment
            // but for now we follow the flow.
            
            const newName = regForm.name;
            setCreatorsList(prev => [...new Set([...prev, newName])]);
            setManualCredentials(prev => ({
                ...prev,
                [newName]: { email: regForm.email, pass: regForm.pass }
            }));
            
            toggleAssignment(uniId, newName);
            setRegForm({ name: '', email: '', pass: '' });
            setIsRegistering(false);
            console.log(`Creator ${newName} registered in backend.`);
        } catch (error) {
            console.error("Registration failed, proceeding locally", error);
            // Fallback to local state if backend fails
            const newName = regForm.name;
            setCreatorsList(prev => [...new Set([...prev, newName])]);
            setManualCredentials(prev => ({
                ...prev,
                [newName]: { email: regForm.email, pass: regForm.pass }
            }));
            toggleAssignment(uniId, newName);
            setRegForm({ name: '', email: '', pass: '' });
            setIsRegistering(false);
        }
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

    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    
    const toggleFacility = (facility: string) => {
        setSelectedFacilities(prev => 
            prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
        );
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'banner') => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            updateForm(field, url);
        }
    };
    const navigate = useNavigate();
    const itemsPerPage = 5;

>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx


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

<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
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
=======
    const handleOnboard = async () => {
        if (!uniForm.name || !uniForm.country) return;

        try {
            await universityService.create({
                name: uniForm.name,
                slug: uniForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                websiteUrl: uniForm.website,
                country: uniForm.country,
                city: uniForm.city || null,
                logoUrl: uniForm.logo || null,
                bannerUrl: uniForm.banner || null,
                qsRanking: parseInt(uniForm.ranking.replace(/[^0-9]/g, '')) || null,
                description: uniForm.overview || null,
                type: uniForm.type.toLowerCase() === 'research' ? 'public' : uniForm.type.toLowerCase(),
                establishedYear: parseInt(uniForm.estYear) || null,
                totalStudents: parseInt(uniForm.totalStudents.replace(/[^0-9]/g, '')) || null,
                campusSizeAcres: parseInt(uniForm.campusSize.replace(/[^0-9]/g, '')) || null,
                acceptanceRate: parseFloat(uniForm.acceptanceRate) || null,
                intlStudentsPct: parseFloat(uniForm.intlStudents) || null,
            });
        } catch (error) {
            console.error("Failed to store university in backend:", error);
        }

        const newUni = {
            ...uniForm, // Keep full data for profile page
            id: universities.length + 1,
            courses: 0,
            status: 'Active',
            rating: 0,
            students: 0,
            location: `${uniForm.city || 'Campus'}, ${uniForm.country}`,
            joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            stats: { posts: '0', opportunities: '0', reach: '0', score: 'N/A' },
            about: uniForm.overview || 'Institutional overview pending...',
            accreditation: 'Pending Verification'
        };

        setUniversities([newUni, ...universities]);
        setIsAddModalOpen(false);
        // Reset form
        setUniForm({
            name: '', website: '', overview: '',
            type: 'Public', estYear: '', totalStudents: '', ranking: '', 
            country: '', city: '', campusSize: '',
            intlStudents: '', acceptanceRate: '', employability: '',
            admissionChance: '98', matchDesc: 'Match based on profile.',
            tuition: '$30k - $45k', living: '$15,000', misc: '$2,500',
            logo: '', banner: '',
            intakes: []
        });
        setSelectedFacilities([]);
    };

    const deleteUniversity = (id: number) => {
        if (window.confirm('Are you sure you want to suspend this university?')) {
            setUniversities(prev => prev.map((u: any) => 
                u.id === id ? { ...u, status: 'Suspended' } : u
            ));
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx
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

<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
    const handleRemoveManager = (uniId: number, managerId: string) => {
        setUniversities(prev => prev.map(uni =>
            uni.id === uniId ? { ...uni, managers: (uni.managers || []).filter((m: any) => m.id !== managerId) } : uni
        ));
    };


    const filteredCreators = creators.filter(c =>
        c.name.toLowerCase().includes(popoverSearch.toLowerCase())
    );

    const filteredUniversities = universities.filter(uni => {
=======
    const activeCount = universities.filter((u: any) => u.status === 'Active').length;
    const pendingCount = universities.filter((u: any) => u.status === 'Pending').length;
    const suspendedCount = universities.filter((u: any) => u.status === 'Suspended').length;

    const stats = [
        { label: 'Active Partners', value: activeCount.toString(), icon: 'handshake', color: 'bg-blue-50 text-blue-600', trend: `${activeCount > 0 ? Math.round((activeCount/universities.length)*100) : 0}% of total` },
        { label: 'Suspended', value: suspendedCount.toString(), icon: 'block', color: 'bg-rose-50 text-rose-600', trend: 'Suspended from platform' },
    ];

    const filteredUniversities = universities.filter((uni: { name: string; country: string; status: string }) => {
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx
        const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            uni.country.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All Status' || uni.status === selectedStatus;
        // Hide suspended universities from main table — they have their own dedicated page
        const isNotSuspended = selectedStatus === 'Suspended' || uni.status !== 'Suspended';
        return matchesSearch && matchesStatus && isNotSuspended;
    });

    const paginatedUniversities = filteredUniversities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <SuperAdminLayout title="University Management">
            <div className="p-2 md:p-8 flex flex-col gap-3 md:gap-6">
                {/* KPI Cards */}
<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
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
=======
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {stats.map((stat: { label: string; icon: string; color: string; urgent?: boolean; value: string; trend: string }) => {
                        const isClickable = stat.label === 'Active Partners' || stat.label === 'Suspended';
                        const handleClick = () => {
                            if (stat.label === 'Active Partners') navigate('/superadmin/universities/active');
                            if (stat.label === 'Suspended') navigate('/superadmin/universities/suspended');
                        };
                        return (
                            <div 
                                key={stat.label} 
                                onClick={handleClick}
                                className={`bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1 md:gap-2 ${isClickable ? 'cursor-pointer hover:border-blue-300 hover:shadow-md transition-all' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className={`${stat.color} p-1.5 md:p-2 rounded-lg`}>
                                        <span className="material-symbols-outlined text-[20px] md:text-[24px]">{stat.icon}</span>
                                    </div>
                                    {stat.urgent && (
                                        <span className="bg-rose-100 text-rose-600 text-[8px] md:text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Urgent</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900">{stat.value}</h3>
                                    <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wider mt-0.5 md:mt-1">{stat.label}</p>
                                </div>
                                <div className="pt-1.5 md:pt-2 border-t border-slate-50">
                                    <span className={`text-[9px] md:text-[10px] font-bold ${stat.urgent ? 'text-rose-500' : 'text-slate-400'}`}>
                                        {stat.trend}
                                    </span>
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx
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
                    <div className="p-3 md:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="relative flex-1 md:w-80">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] md:text-[20px]">search</span>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 md:pl-10 md:pr-4 md:py-2 text-xs md:text-sm focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
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
=======
                            <select
                                className="px-2 md:px-4 py-1.5 md:py-2 border border-slate-200 rounded-lg text-xs md:text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-all outline-none cursor-pointer"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="All Status">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                            <button 
                                onClick={() => setIsAssignPopupOpen(true)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 md:px-6 py-2 md:py-2.5 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all text-[11px] md:text-sm shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[18px] md:text-[20px]">group_add</span>
                                Assign
                            </button>
                            <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex-1 md:flex-none bg-[#2b6cee] text-white px-3 md:px-6 py-2 md:py-2.5 rounded-xl text-[11px] md:text-sm font-bold hover:bg-[#2b6cee]/90 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px] md:text-[20px]">add</span>
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx
                                Add University
                            </button>
                        </div>
                    </div>

                    {/* Table Data */}
                    <div className="overflow-x-visible">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
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
=======
                                    <th className="px-2 md:px-6 py-2 md:py-4 text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Detail</th>
                                    <th className="hidden md:table-cell px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Country</th>
                                    <th className="hidden md:table-cell px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Courses</th>
                                    <th className="hidden md:table-cell px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Active Students</th>
                                    <th className="px-2 md:px-6 py-2 md:py-4 text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Assign</th>
                                    <th className="px-2 md:px-6 py-2 md:py-4 text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedUniversities.map((uni: { id: number; name: string; country: string; courses: number; students: number; rating: number; status: string }) => (
                                    <tr key={uni.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-2 md:px-6 py-2 md:py-4">
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 md:size-10 rounded-lg bg-blue-100 flex items-center justify-center text-[#2b6cee] font-bold text-base md:text-lg shrink-0">
                                                    {uni.name.charAt(0)}
                                                </div>
<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
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
=======
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-xs md:text-sm font-bold text-slate-900 truncate">{uni.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] md:text-[10px] text-slate-400 font-medium whitespace-nowrap">ID: UNI-{uni.id.toString().padStart(4, '0')}</span>
                                                        <span className="md:hidden text-[9px] font-bold text-[#2b6cee] bg-blue-50 px-1.5 py-0.5 rounded uppercase">{uni.country}</span>
                                                    </div>
                                                    <div className="md:hidden flex items-center gap-2 mt-1">
                                                        <span className="text-[9px] font-bold text-slate-500">{Array.isArray(uni.courses) ? uni.courses.length : (uni.courses || 0)} Courses</span>
                                                        <div className="size-0.5 rounded-full bg-slate-300"></div>
                                                        <span className="text-[9px] font-bold text-slate-500">{uni.students.toLocaleString()} Students</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 text-center">
                                            <span className="text-xs font-semibold text-slate-600">{uni.country}</span>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-slate-900">{Array.isArray(uni.courses) ? uni.courses.length : (uni.courses || 0)}</span>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-slate-900">{uni.students.toLocaleString()}</span>
                                        </td>
                                        <td className="px-2 md:px-6 py-2 md:py-4 text-center relative">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="flex -space-x-1.5 overflow-hidden">
                                                    {(assignments[uni.id] || []).map((name, idx) => (
                                                        <div key={idx} className={`size-6 md:size-7 rounded-full border-2 border-white ${blockedCreators.includes(name) ? 'bg-rose-500' : 'bg-[#2b6cee]'} flex items-center justify-center text-[7px] md:text-[8px] font-black text-white uppercase ring-1 ring-slate-100 shadow-sm`} title={blockedCreators.includes(name) ? `${name} (BLOCKED)` : name}>
                                                            {name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                    ))}
                                                </div>
                                                <button 
                                                    onClick={() => setAssigningUniId(assigningUniId === uni.id ? null : uni.id)}
                                                    className="size-6 md:size-7 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-[#2b6cee] hover:text-[#2b6cee] transition-all bg-white shadow-sm"
                                                >
                                                    <span className="material-symbols-outlined text-[14px] md:text-[16px]">add</span>
                                                </button>
                                                
                                                {/* Inline Creator Dropdown */}
                                                {assigningUniId === uni.id && (
                                                    <>
                                                        <div className="fixed inset-0 z-[140]" onClick={() => setAssigningUniId(null)}></div>
                                                        <div className={`absolute ${paginatedUniversities.indexOf(uni) > 2 ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 md:left-1/2 md:-translate-x-1/2 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[150] p-2 animate-in fade-in zoom-in-95 duration-200 ring-4 ring-black/5`}>
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
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx
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
<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
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
=======
                                        <td className="px-2 md:px-6 py-2 md:py-4">
                                            <div className="flex items-center justify-end gap-1.5 md:gap-2 text-right">
                                                <button
                                                    onClick={() => navigate(`/superadmin/university/${uni.id}`)}
                                                    className="px-2 md:px-4 py-1.5 bg-[#2b6cee]/10 text-[#2b6cee] text-[10px] md:text-xs font-bold rounded-lg hover:bg-[#2b6cee] hover:text-white transition-all whitespace-nowrap"
                                                >
                                                    <span className="md:hidden">View</span>
                                                    <span className="hidden md:inline">View Profile</span>
                                                </button>
                                                    <button
                                                        onClick={() => deleteUniversity(uni.id)}
                                                        className="size-7 md:size-8 flex items-center justify-center bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-rose-100 shrink-0"
                                                        title="Suspend University"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] md:text-[18px]">block</span>
                                                    </button>
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx
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

<<<<<<< HEAD:apps/web/src/pages/SuperAdminUniversityManagement.tsx
                    // Sync to authentication system
                    const registeredUsers = JSON.parse(localStorage.getItem('eaoverseas_registered_users') || '[]');
                    const updatedUsers = registeredUsers.map((u: any) =>
                        u.id === memberId ? { ...u, isBlocked: !u.isBlocked } : u
                    );
                    localStorage.setItem('eaoverseas_registered_users', JSON.stringify(updatedUsers));
                }}
            />
=======
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
                                        <div className="flex items-center gap-6">
                                            <div className="size-24 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                                                {uniForm.logo ? (
                                                    <img src={uniForm.logo} alt="Logo" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-slate-300 text-[32px]">image</span>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2 w-full min-w-[200px]">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Logo Image</label>
                                                    <input 
                                                        type="text" 
                                                        value={uniForm.logo}
                                                        onChange={e => updateForm('logo', e.target.value)}
                                                        placeholder="Paste logo link" 
                                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" 
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 uppercase">
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                    OR UPLOAD
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                </div>
                                                <label className="w-full py-2 bg-white border border-dashed border-slate-300 rounded-lg text-slate-500 font-bold text-[11px] hover:border-[#2b6cee] hover:text-[#2b6cee] hover:bg-[#2b6cee]/5 transition-all flex items-center justify-center gap-2 cursor-pointer">
                                                    <span className="material-symbols-outlined text-[16px]">upload_file</span>
                                                    Choose File from Device
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="hidden md:block w-px bg-slate-200 self-stretch"></div>

                                        {/* Banner Section */}
                                        <div className="flex-1 flex flex-col gap-3">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Banner Image (Hero)</label>
                                            <div className="w-full h-24 bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 overflow-hidden">
                                                {uniForm.banner ? (
                                                    <img src={uniForm.banner} alt="Banner" className="w-full h-full object-cover" />
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined text-slate-300 text-[24px]">landscape</span>
                                                        <span className="text-[10px] font-semibold text-slate-400 italic">Banner Image Preview</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <input 
                                                    type="text" 
                                                    value={uniForm.banner}
                                                    onChange={e => updateForm('banner', e.target.value)}
                                                    placeholder="Paste banner image URL" 
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" 
                                                />
                                                <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 uppercase">
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                    OR UPLOAD
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="w-full py-2 bg-white border border-dashed border-slate-300 rounded-lg text-slate-500 font-bold text-[11px] hover:border-[#2b6cee] hover:text-[#2b6cee] hover:bg-[#2b6cee]/5 transition-all flex items-center justify-center gap-2 cursor-pointer">
                                                        <span className="material-symbols-outlined text-[16px]">upload_file</span>
                                                        Choose Banner from Device
                                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'banner')} />
                                                    </label>
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
                                            <button 
                                                key={f} 
                                                onClick={() => toggleFacility(f)}
                                                className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all ${
                                                    selectedFacilities.includes(f)
                                                        ? 'bg-[#2b6cee] text-white border-[#2b6cee] shadow-lg shadow-blue-100'
                                                        : 'bg-white border-slate-200 text-slate-600 hover:border-[#2b6cee] hover:text-[#2b6cee] hover:bg-[#2b6cee]/5'
                                                }`}
                                            >
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
                            <button onClick={handleOnboard} className="px-6 py-2.5 bg-[#111318] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-colors shadow-lg">
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
                            {universities.map(uni => (
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
                                                        onClick={() => toggleBlockCreator(expandedCreator.name, uni.name)}
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
                                                                onClick={() => toggleBlockCreator(expandedCreator.name, uni.name)}
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
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/roles/super-admin/university-management/SuperAdminUniversityManagement.tsx
        </SuperAdminLayout>
    );
};

export default SuperAdminUniversityManagement;

