import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

const SuperAdminUniversityProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showAllCourses, setShowAllCourses] = React.useState(false);
    const [isProfileEditing, setIsProfileEditing] = React.useState(false);

    // Dynamic data loading from localStorage to ensure newly added universities are visible
    const [uni, setUni] = React.useState(() => {
        const saved = localStorage.getItem('ea_universities');
        const allUnis = saved ? JSON.parse(saved) : [];
        
        // Find university in saved state or fallback to hardcoded list
        const found = allUnis.find((u: any) => u.id === Number(id));
        if (found) return found;

        // Fallback or static list for demo
        const staticUnis = [
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
                accreditation: 'UU Accredited'
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
                accreditation: 'NECHE Accredited'
            }
        ];
        
        return staticUnis.find(u => u.id === Number(id)) || staticUnis[0];
    });

    const updateUniData = (field: string, val: any) => setUni(prev => ({ ...prev, [field]: val }));

    const handleUploadNew = () => {
        navigate(`/superadmin/university/${id}/course/new`);
    };

    const handleEditCourse = (course: any) => {
        navigate(`/superadmin/university/${id}/course/${course.id}/edit`);
    };

    return (
        <SuperAdminLayout title="University Profile">
            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                {/* Merged Header & About Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <div className="p-6 border-b border-slate-50">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex items-start gap-5">
                                <div className="h-20 w-20 rounded-2xl bg-[#2b6cee]/10 border border-[#2b6cee]/20 flex items-center justify-center text-[#2b6cee] shrink-0 overflow-hidden">
                                    {uni.logo ? (
                                        <img src={uni.logo} alt={uni.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="material-symbols-outlined text-3xl">{uni.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        {isProfileEditing ? (
                                            <input 
                                                value={uni.name}
                                                onChange={e => updateUniData('name', e.target.value)}
                                                className="text-2xl font-bold text-slate-900 border-2 border-[#2b6cee]/30 rounded-lg px-2 -mx-2 bg-blue-50/30 outline-none focus:border-[#2b6cee] transition-all w-full max-w-md"
                                            />
                                        ) : (
                                            <h1 className="text-2xl font-bold text-slate-900">{uni.name}</h1>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-sm">
                                        <div className="flex items-center gap-1.5 font-medium min-w-[200px]">
                                            <span className="material-symbols-outlined text-[20px]">location_on</span>
                                            {isProfileEditing ? (
                                                <input value={uni.location} onChange={e => updateUniData('location', e.target.value)} className="border-2 border-[#2b6cee]/30 rounded-md px-1 bg-blue-50/30 outline-none" />
                                            ) : (
                                                <span>{uni.location}</span>
                                            )}
                                        </div>
                                        <span className="flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-[20px]">calendar_today</span> Joined {uni.joined}</span>
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <span className="material-symbols-outlined text-[20px]">link</span>
                                            {isProfileEditing ? (
                                                <input value={uni.website} onChange={e => updateUniData('website', e.target.value)} className="border-2 border-[#2b6cee]/30 rounded-md px-1 bg-blue-50/30 outline-none" />
                                            ) : (
                                                <span>{uni.website}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                {isProfileEditing ? (
                                    <>
                                        <button onClick={() => setIsProfileEditing(false)} className="px-5 py-2.5 bg-slate-100 text-slate-500 hover:text-slate-700 font-bold rounded-xl transition-all text-sm uppercase tracking-wider">
                                            Cancel
                                        </button>
                                        <button onClick={() => setIsProfileEditing(false)} className="px-5 py-2.5 bg-[#2b6cee] text-white hover:bg-blue-700 font-bold rounded-xl transition-all text-sm uppercase tracking-wider shadow-lg shadow-blue-100">
                                            Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => setIsProfileEditing(true)} className="px-5 py-2.5 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold rounded-xl transition-all text-sm border border-slate-200">
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-50">
                            <div className="flex items-center justify-start mb-3">
                                <h3 className="font-bold text-slate-900">About University</h3>
                            </div>
                            <div className="relative">
                                {isProfileEditing ? (
                                    <textarea 
                                        value={uni.about}
                                        onChange={e => updateUniData('about', e.target.value)}
                                        rows={4}
                                        className="w-full text-slate-700 leading-relaxed text-[15px] font-medium font-['Outfit'] border-2 border-[#2b6cee]/30 rounded-2xl p-4 bg-blue-50/30 outline-none focus:border-[#2b6cee] transition-all resize-none"
                                    />
                                ) : (
                                    <p className="text-slate-700 leading-relaxed max-w-4xl text-[15px] font-medium font-['Outfit']">
                                        {uni.about}
                                    </p>
                                )}
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4">
                                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">University Type</span>
                                    {isProfileEditing ? (
                                        <input value={uni.type} onChange={e => updateUniData('type', e.target.value)} className="text-sm font-bold text-slate-700 border-b border-[#2b6cee]/30 bg-transparent outline-none w-[150px]" />
                                    ) : (
                                        <span className="text-sm font-bold text-slate-700">{uni.type}</span>
                                    )}
                                </div>
                                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">Accreditation</span>
                                    {isProfileEditing ? (
                                        <input value={uni.accreditation} onChange={e => updateUniData('accreditation', e.target.value)} className="text-sm font-bold text-slate-700 border-b border-[#2b6cee]/30 bg-transparent outline-none w-[150px]" />
                                    ) : (
                                        <span className="text-sm font-bold text-slate-700">{uni.accreditation}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Posts Stat */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-medium">Total Posts</span>
                            <div className="p-1.5 bg-[#2b6cee]/10 rounded-lg text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[18px]">description</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold">{uni.stats?.posts || 0}</span>
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
                            <span className="text-2xl font-bold">{uni.stats?.opportunities || 0}</span>
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
                            <span className="text-2xl font-bold">{uni.stats?.reach || '0'}</span>
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
                            <span className="text-2xl font-bold">{uni.stats?.score || 'N/A'}</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                                High
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {/* Courses Section (Shifted) */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-8 bg-[#2b6cee]/10 rounded-xl flex items-center justify-center text-[#2b6cee]">
                                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                                </div>
                                <h3 className="font-bold text-base text-slate-900">Eligible Courses for You</h3>
                            </div>
                            <button 
                                onClick={handleUploadNew}
                                className="px-4 py-1.5 bg-[#2b6cee] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
                            >
                                <span className="material-symbols-outlined text-[16px]">add</span>
                                Add Course
                            </button>
                        </div>

                        <div className="p-5 space-y-4 flex-1">
                            {uni && Array.isArray(uni.courses) && uni.courses.length > 0 ? (
                                (showAllCourses ? uni.courses : uni.courses.slice(0, 3)).map((course: any, idx: number) => (
                                    <div key={course.id || idx} className="group relative flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-[#2b6cee]/30 hover:bg-blue-50/20 transition-all">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-bold text-slate-900">{typeof course.name === 'string' ? course.name : (typeof course.title === 'string' ? course.title : 'Untitled Course')}</h4>
                                                <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-md border border-emerald-100">Active</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">school</span> {typeof course.level === 'string' ? course.level : 'Postgraduate'}</span>
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> {Array.isArray(course.intakes) ? course.intakes.join(', ') : 'Various'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => handleEditCourse(course)}
                                                className="size-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-[#2b6cee] transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <div className="size-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#2b6cee] group-hover:text-white transition-all">
                                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                                    <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                                        <span className="material-symbols-outlined text-4xl">inventory_2</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900">No courses listed yet</h4>
                                    <p className="text-xs text-slate-500 mt-1 max-w-[240px]">This institution has just joined. Start by uploading their course specifications.</p>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-slate-50">
                            <button 
                                onClick={() => setShowAllCourses(!showAllCourses)}
                                className="w-full text-center text-xs font-black text-slate-500 hover:text-[#2b6cee] transition-all py-1.5 uppercase tracking-widest"
                            >
                                {showAllCourses ? 'Show Less' : 'View all 12 courses'}
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="px-5 py-3 border-b border-slate-100">
                            <h3 className="font-bold text-base text-slate-900">Recent Activity</h3>
                        </div>
                        <div className="p-5 space-y-6 flex-1">
                            {/* Timeline Items */}
                            <div className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold">add</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">New Post Published</p>
                                    <p className="text-xs text-slate-500">Summer Internship 2024 - AI Research</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Today, 10:45 AM</span>
                                </div>
                            </div>
                            <div className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-[#2b6cee] font-bold">edit</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">Profile Updated</p>
                                    <p className="text-xs text-slate-500">Modified primary contact details</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Yesterday, 4:20 PM</span>
                                </div>
                            </div>
                            <div className="relative pl-8 last:before:hidden before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-slate-100">
                                <div className="absolute left-0 top-1 size-6 rounded-full bg-amber-100 flex items-center justify-center border-4 border-white z-10">
                                    <span className="material-symbols-outlined text-[12px] text-amber-500 font-bold">login</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-slate-900">Admin Login</p>
                                    <p className="text-xs text-slate-500">University admin logged in from SF</p>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Oct 14, 2023</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-slate-50">
                            <button className="w-full text-center text-sm font-bold text-slate-500 hover:text-[#2b6cee] transition-all py-2 rounded-lg hover:bg-slate-100">View All Activity</button>
                        </div>
                    </section>
                </div>
            </main>
        </SuperAdminLayout>
    );
};

export default SuperAdminUniversityProfile;
