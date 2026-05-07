import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';



const SuperAdminUniversityProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Mock data based on the ID (matching the universities in the management page)
    const universities = [
        {
            id: 1,
            name: 'University of Toronto',
            country: 'Canada',
            location: 'Toronto, Canada',
            joined: 'Oct 2021',
            website: 'utoronto.ca',
            status: 'Active',
            stats: { posts: '1,284', opportunities: '156', reach: '24.5k', score: '98/100' },
            about: 'The University of Toronto is a public research university in Toronto, Ontario, Canada, situated on the grounds that surround Queens Park. It was founded by royal charter in 1827 as Kings College, the first institution of higher learning in Upper Canada.',
            type: 'Public Research',
            accreditation: 'UU Accredited',
            courses: [
                { name: 'MS in Computer Science', duration: '2 Years', start: 'Aug 2024', price: '$32k - $45k / year' },
                { name: 'MBA - Global Management', duration: '18 Months', start: 'Sep 2024', price: '$55k - $68k / year' },
                { name: 'BSc Software Engineering', duration: '4 Years', start: 'Aug 2024', price: '$28k - $35k / year' }
            ]
        },
        {
            id: 2,
            name: 'King\'s College London',
            country: 'UK',
            location: 'London, UK',
            joined: 'Mar 2020',
            website: 'kcl.ac.uk',
            status: 'Active',
            stats: { posts: '942', opportunities: '84', reach: '18.2k', score: '95/100' },
            about: 'Kings College London is a public research university located in London, United Kingdom. It was established by royal charter in 1829 under the patronage of King George IV and the Duke of Wellington.',
            type: 'Public Research',
            accreditation: 'RC Accredited',
            courses: [
                { name: 'MSc Data Science', duration: '1 year', start: 'Sep 2024', price: '£29,000 / year' },
                { name: 'LLB Law', duration: '3 years', start: 'Sep 2024', price: '£24,500 / year' }
            ]
        },
        {
            id: 3,
            name: 'University of Melbourne',
            country: 'Australia',
            location: 'Melbourne, Australia',
            joined: 'Jun 2022',
            website: 'unimelb.edu.au',
            status: 'Pending',
            stats: { posts: '0', opportunities: '12', reach: '5k', score: '82/100' },
            about: 'Founded in 1853, the University of Melbourne is a public research university located in Melbourne, Australia. It is Australias second oldest university and the oldest in Victoria.',
            type: 'Public Research',
            accreditation: 'TEQSA Accredited',
            courses: [
                { name: 'Master of Information Systems', duration: '2 years', start: 'Feb 2025', price: 'AUD $48,000 / year' }
            ]
        },
        {
            id: 4,
            name: 'Technical University of Munich',
            country: 'Germany',
            location: 'Munich, Germany',
            joined: 'Feb 2021',
            website: 'tum.de',
            status: 'Active',
            stats: { posts: '560', opportunities: '45', reach: '12k', score: '92/100' },
            about: 'The Technical University of Munich is a research university with campuses in Munich, Garching and Freising-Weihenstephan. It is a member of TU9, an incorporated society of the largest and most notable German institutes of technology.',
            type: 'Technical Research',
            accreditation: 'EQAR Accredited',
            courses: [
                { name: 'MSc Informatics', duration: '2 years', start: 'Oct 2024', price: '€0 (Public)' }
            ]
        },
        {
            id: 5,
            name: 'Nanyang Technological University',
            country: 'Singapore',
            location: 'Jurong West, Singapore',
            joined: 'Nov 2020',
            website: 'ntu.edu.sg',
            status: 'Suspended',
            stats: { posts: '310', opportunities: '0', reach: '8.4k', score: '88/100' },
            about: 'Nanyang Technological University is a national research university in Singapore. It is the second oldest autonomous university in the country and is consistently ranked among the worlds best universities.',
            type: 'Autonomous Research',
            accreditation: 'AACSB Accredited',
            courses: []
        },
        {
            id: 6,
            name: 'Harvard University',
            country: 'USA',
            location: 'Cambridge, USA',
            joined: 'Jan 2020',
            website: 'harvard.edu',
            status: 'Active',
            stats: { posts: '3,450', opportunities: '420', reach: '85k', score: '99/100' },
            about: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636 and named for its first benefactor, clergyman John Harvard, it is the oldest institution of higher learning in the United States.',
            type: 'Private Ivy League',
            accreditation: 'NECHE Accredited',
            courses: [
                { name: 'Master in Public Policy', duration: '2 years', start: 'Aug 2024', price: '$58,000 / year' }
            ]
        },
        {
            id: 7,
            name: 'Oxford University',
            country: 'UK',
            location: 'Oxford, UK',
            joined: 'Sep 2019',
            website: 'ox.ac.uk',
            status: 'Active',
            stats: { posts: '4,100', opportunities: '380', reach: '92k', score: '99/100' },
            about: 'The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world.',
            type: 'Collegiate Research',
            accreditation: 'OIA Accredited',
            courses: []
        },
        {
            id: 8,
            name: 'ETH Zurich',
            country: 'Switzerland',
            location: 'Zurich, Switzerland',
            joined: 'Dec 2021',
            website: 'ethz.ch',
            status: 'Active',
            stats: { posts: '890', opportunities: '65', reach: '15k', score: '96/100' },
            about: 'ETH Zurich is a public research university in the city of Zurich, Switzerland. Founded by the Swiss Federal Government in 1854 with the stated mission to educate engineers and scientists.',
            type: 'Federal Institute',
            accreditation: 'AAQ Accredited',
            courses: []
        },
        {
            id: 9,
            name: 'University of Tokyo',
            country: 'Japan',
            location: 'Tokyo, Japan',
            joined: 'May 2022',
            website: 'u-tokyo.ac.jp',
            status: 'Pending',
            stats: { posts: '120', opportunities: '5', reach: '3k', score: '78/100' },
            about: 'The University of Tokyo is a public research university located in Bunkyo, Tokyo, Japan. Established in 1877, it was the first imperial university and is one of Japans most prestigious institutions.',
            type: 'National Research',
            accreditation: 'NIAD-QE Accredited',
            courses: []
        },
        {
            id: 10,
            name: 'McGill University',
            country: 'Canada',
            location: 'Montreal, Canada',
            joined: 'Aug 2021',
            website: 'mcgill.ca',
            status: 'Active',
            stats: { posts: '1,150', opportunities: '92', reach: '21k', score: '94/100' },
            about: 'McGill University is a public research university in Montreal, Quebec, Canada. Founded in 1821 by royal charter granted by King George IV, the university bears the name of James McGill.',
            type: 'Public Research',
            accreditation: 'CA Accredited',
            courses: []
        }
    ];

    // Priority: 1. State from navigation, 2. Mock list by ID
    const stateUni = location.state?.university;
    const mockUni = universities.find(u => u.id === Number(id));

    const initialUni = stateUni ? {
        ...stateUni,
        location: `${stateUni.city || ''}, ${stateUni.country || ''}`,
        joined: 'Just Now',
        website: stateUni.website || 'n/a',
        status: stateUni.status || 'Verified',
        stats: stateUni.stats || { posts: '0', opportunities: '0', reach: '0', score: '0/100' },
        about: stateUni.overview || 'No overview provided.',
        type: stateUni.type || 'Partner University',
        accreditation: stateUni.accreditation || 'Pending Review',
        courses: stateUni.courses || [],
        contactName: stateUni.contactName || 'Dr. Sarah Mitchell',
        contactEmail: stateUni.contactEmail || 'admissions@university.edu',
        contactPhone: stateUni.contactPhone || '+1 (555) 000-0000'
    } : {
        ...(mockUni || universities[0]),
        contactName: (mockUni as any)?.contactName || 'Dr. Sarah Mitchell',
        contactEmail: (mockUni as any)?.contactEmail || `admissions@${(mockUni as any)?.website || 'university.edu'}`,
        contactPhone: (mockUni as any)?.contactPhone || '+1 (555) 012-3456',
        logo: (mockUni as any)?.logo || `https://logo.clearbit.com/${(mockUni || universities[0]).name.toLowerCase().replace(/\s+/g, '')}.edu`
    };


    const [currentUni, setCurrentUni] = React.useState(initialUni);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedData, setEditedData] = React.useState(initialUni);

    const uni = currentUni;

    const handleSave = () => {
        setCurrentUni(editedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedData(currentUni);
        setIsEditing(false);
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedData(prev => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };





    return (
        <SuperAdminLayout title="University Profile">
            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                {/* Merged Header & About Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <div className="p-6 border-b border-slate-50">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex items-start gap-5">
                                <div className={`h-22 w-22 rounded-2xl bg-[#2b6cee]/5 p-2 border border-[#2b6cee]/10 flex items-center justify-center overflow-hidden shrink-0 shadow-sm transition-all relative group ${isEditing ? 'cursor-pointer hover:border-[#2b6cee] hover:scale-105' : ''}`}>
                                    <input
                                        type="file"
                                        id="profile-logo-upload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleLogoUpload}
                                        disabled={!isEditing}
                                    />
                                    {isEditing && (
                                        <label htmlFor="profile-logo-upload" className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
                                        </label>
                                    )}
                                    {isEditing ? (
                                        editedData.logo ? (
                                            <img src={editedData.logo} alt="Logo Preview" className="h-full w-full object-contain" />
                                        ) : (
                                            <div className="bg-[#2b6cee]/10 h-full w-full flex items-center justify-center text-[#2b6cee]">
                                                <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                                            </div>
                                        )
                                    ) : (
                                        uni.logo ? (
                                            <img src={uni.logo} alt={uni.name} className="h-full w-full object-contain" />
                                        ) : (
                                            <div className="bg-[#2b6cee]/10 h-full w-full flex items-center justify-center text-[#2b6cee]">
                                                <span className="material-symbols-outlined text-3xl">{uni.name.charAt(0)}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1 pt-1">
                                    <div className="flex items-center gap-3">
                                        {isEditing ? (
                                            <div className="flex flex-col gap-1 w-full">
                                                <input
                                                    type="text"
                                                    value={editedData.name}
                                                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                    className="text-2xl font-bold text-slate-900 border-b-2 border-[#2b6cee] focus:outline-none bg-blue-50/30 px-2 py-1 rounded-t-lg"
                                                    placeholder="University Name"
                                                />
                                                <p className="text-[10px] text-[#2b6cee] font-bold px-2 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[12px]">info</span>
                                                    Click the logo box to upload official image
                                                </p>
                                            </div>
                                        ) : (
                                            <h1 className="text-2xl font-bold text-slate-900">{uni.name}</h1>
                                        )}


                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${uni.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            uni.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                            }`}>
                                            {uni.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-sm">
                                        {isEditing ? (
                                            <>
                                                <div className="flex items-center gap-1.5 font-medium">
                                                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                                                    <input
                                                        type="text"
                                                        value={editedData.location}
                                                        onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                                                        className="border-b border-slate-300 focus:border-[#2b6cee] focus:outline-none bg-blue-50/30 px-2 py-0.5 rounded text-sm w-48"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-1.5 font-medium">
                                                    <span className="material-symbols-outlined text-[20px]">link</span>
                                                    <input
                                                        type="text"
                                                        value={editedData.website}
                                                        onChange={(e) => setEditedData({ ...editedData, website: e.target.value })}
                                                        className="border-b border-slate-300 focus:border-[#2b6cee] focus:outline-none bg-blue-50/30 px-2 py-0.5 rounded text-sm w-48"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-[20px]">location_on</span> {uni.location}</span>
                                                <span className="flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-[20px]">calendar_today</span> Joined {uni.joined}</span>
                                                <span className="flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-[20px]">link</span> {uni.website}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                {!isEditing && (
                                    <>
                                        <button
                                            onClick={() => navigate('/university/management', { state: { university: uni } })}
                                            className="px-5 py-2.5 bg-blue-50 text-[#1E63F3] hover:bg-blue-100 font-bold rounded-xl transition-all text-sm border border-blue-200 flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">settings_suggest</span>
                                            View Scholarships
                                        </button>
                                        <button
                                            onClick={() => navigate('/university/post-center', { state: { university: uni } })}
                                            className="px-5 py-2.5 bg-blue-50 text-[#1E63F3] hover:bg-blue-100 font-bold rounded-xl transition-all text-sm border border-blue-200 flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">post_add</span>
                                            View Post Center
                                        </button>
                                    </>
                                )}
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleCancel}
                                            className="px-5 py-2.5 bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold rounded-xl transition-all text-sm border border-slate-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-5 py-2.5 bg-[#2b6cee] text-white hover:bg-[#2b6cee]/90 font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-200"
                                        >
                                            Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-5 py-2.5 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold rounded-xl transition-all text-sm border border-slate-200"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-50">
                            <div className="flex items-center justify-start mb-3">
                                <h3 className="font-bold text-slate-900">About University</h3>
                            </div>
                            {isEditing ? (
                                <textarea
                                    value={editedData.about}
                                    onChange={(e) => setEditedData({ ...editedData, about: e.target.value })}
                                    className="w-full h-32 p-4 text-slate-700 leading-relaxed text-[15px] font-medium font-['Outfit'] bg-blue-50/20 border border-[#2b6cee]/30 rounded-2xl focus:outline-none focus:border-[#2b6cee] transition-all resize-none"
                                />
                            ) : (
                                <p className="text-slate-700 leading-relaxed max-w-4xl text-[15px] font-medium font-['Outfit']">
                                    {uni.about}
                                </p>
                            )}
                            <div className="mt-6 flex flex-wrap gap-4">
                                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">University Type</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedData.type}
                                            onChange={(e) => setEditedData({ ...editedData, type: e.target.value })}
                                            className="text-sm font-bold text-slate-700 bg-transparent border-b border-slate-300 focus:outline-none focus:border-[#2b6cee]"
                                        />
                                    ) : (
                                        <span className="text-sm font-bold text-slate-700">{uni.type}</span>
                                    )}
                                </div>
                                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">Accreditation</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedData.accreditation}
                                            onChange={(e) => setEditedData({ ...editedData, accreditation: e.target.value })}
                                            className="text-sm font-bold text-slate-700 bg-transparent border-b border-slate-300 focus:outline-none focus:border-[#2b6cee]"
                                        />
                                    ) : (
                                        <span className="text-sm font-bold text-slate-700">{uni.accreditation}</span>
                                    )}
                                </div>
                            </div>


                            {/* Primary Contact Section */}
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-[#2b6cee] text-[22px]">contact_page</span>
                                    <h3 className="font-bold text-slate-900">Primary Contact</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Contact Person</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedData.contactName}
                                                onChange={(e) => setEditedData({ ...editedData, contactName: e.target.value })}
                                                className="text-sm font-bold text-slate-700 bg-blue-50/30 border-b border-slate-300 focus:outline-none focus:border-[#2b6cee] px-2 py-0.5 rounded"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-slate-700">{(uni as any).contactName}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Email Address</span>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={editedData.contactEmail}
                                                onChange={(e) => setEditedData({ ...editedData, contactEmail: e.target.value })}
                                                className="text-sm font-bold text-[#2b6cee] bg-blue-50/30 border-b border-slate-300 focus:outline-none focus:border-[#2b6cee] px-2 py-0.5 rounded"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-[#2b6cee]">{(uni as any).contactEmail}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Phone Number</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedData.contactPhone}
                                                onChange={(e) => setEditedData({ ...editedData, contactPhone: e.target.value })}
                                                className="text-sm font-bold text-slate-700 bg-blue-50/30 border-b border-slate-300 focus:outline-none focus:border-[#2b6cee] px-2 py-0.5 rounded"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-slate-700">{(uni as any).contactPhone}</span>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Total Posts</span>
                            <div className="p-1.5 bg-[#2b6cee]/10 rounded-lg text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[18px]">description</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.posts}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Active Opportunities</span>
                            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <span className="material-symbols-outlined text-[18px]">work_outline</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.opportunities}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 5%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Student Reach</span>
                            <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
                                <span className="material-symbols-outlined text-[18px]">groups</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.reach}</span>
                            <span className="text-slate-400 text-xs font-bold flex items-center mb-1">
                                Stable
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Verification Score</span>
                            <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats.score}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                High
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-base text-slate-900">Recent Activity</h3>
                            <button className="text-[10px] font-bold text-[#2b6cee] uppercase tracking-wider">View All</button>
                        </div>
                        <div className="p-6 space-y-8 flex-1">
                            {/* Timeline Items */}
                            <div className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold">add</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">New Post Published</p>
                                    <p className="text-xs text-slate-500 font-medium">Summer Internship 2024 - AI Research</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Today, 10:45 AM</span>
                                </div>
                            </div>
                            <div className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-[#2b6cee] font-bold">edit</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">Profile Updated</p>
                                    <p className="text-xs text-slate-500 font-medium">Modified primary contact details</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Yesterday, 4:20 PM</span>
                                </div>
                            </div>
                            <div className="relative pl-8 last:before:hidden before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-amber-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-amber-500 font-bold">login</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">Admin Login</p>
                                    <p className="text-xs text-slate-500 font-medium">University admin logged in from SF</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Oct 14, 2023</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* University Courses */}
                    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-base text-slate-900">University Courses</h3>
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors">
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
                                </button>
                                <button className="text-[10px] font-bold text-[#2b6cee] uppercase tracking-wider">Expand Details</button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4 flex-1 overflow-y-auto max-h-[480px]">
                            {uni.courses.length > 0 ? (
                                uni.courses.map((course, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all group cursor-pointer bg-slate-50/30">
                                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#2b6cee] transition-colors">{course.name}</h4>
                                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <span className="material-symbols-outlined text-[18px] opacity-60">schedule</span>
                                                <span className="text-xs font-bold">{course.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <span className="material-symbols-outlined text-[18px] opacity-60">calendar_month</span>
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] uppercase font-bold text-slate-400 leading-none">Starts</span>
                                                    <span className="text-xs font-bold text-slate-700">{course.start}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <span className="material-symbols-outlined text-[18px] opacity-60">payments</span>
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] uppercase font-bold text-slate-400 leading-none">Tuition Fee</span>
                                                    <span className="text-xs font-bold text-slate-700">{course.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center py-12 text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-2">school</span>
                                    <p className="text-sm font-bold">No courses listed yet</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </SuperAdminLayout>


    );
};

export default SuperAdminUniversityProfile;
