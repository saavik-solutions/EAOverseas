import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import PerformanceRatingOverview from './PerformanceRatingOverview';

const SuperAdminAvailableCounsellors: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [specialization, setSpecialization] = useState('All');
    const [experience, setExperience] = useState('All');
    const [rating, setRating] = useState('All');
    const [isSpecOpen, setIsSpecOpen] = useState(false);
    const [isExpOpen, setIsExpOpen] = useState(false);
    const [isRateOpen, setIsRateOpen] = useState(false);
    const [viewingCounsellor, setViewingCounsellor] = useState<any | null>(null);

    const initialCounsellors = [
        {
            id: 1,
            name: 'John Anderson',
            role: 'Senior Advisor',
            specialization: 'UK & Canada Specialist',
            experience: '8 Years',
            studentsAssisted: 520,
            rating: 4.7,
            languages: 'English, Hindi',
            status: 'Available',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChfGC06tvuZYRVe6R1wRbYiCAHK8uK7grL_oTUuPFY_gpKxAgzThBeZc9QZrYvE4MQZpS_DDEk4HnvQ6I7RDQTALBhbjk3jLkyOunFdpmKAKvhc1ArOpPzYvQD4C3YuU1hfy1-PSStW7BUF78FP8yv8f66zaHXB0O9xllv9SkxE55IpeH3ULrltN1MS4byHq0TC24rR3FL-69kVn9ygeAjxFFactzjetDs6mUpum8gV2qGw-w1QGl2MkD57549zkbn8tAYkWhtwi8'
        },
        {
            id: 2,
            name: 'Sarah Jenkins',
            role: 'STEM Admissions',
            specialization: 'US Engineering & Tech',
            experience: '12 Years',
            studentsAssisted: 840,
            rating: 4.9,
            languages: 'English, Spanish',
            status: 'Busy',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJBOnba6G_tJ2xxPqHNhgH0L_X7kv6TjC6fOZNtW-BL8gsK4wuTNrTLTBcVbS2M8I7r-X-ylCT53FaGqRuW0IrIi2onFlYo1cQeddF5Mmd4xCy_KrtdvCFHqMMGigcJ0hqlTWT4CPdUw2gwHn7hQzwNyUFm_m9-fFTaCgvDQR_VgtkA9hq71FKSNTHDNIsM0WdIKm0Nm9uFtbQFiDjwbnfQa7Tr6mdyEFaSGocaaytHXG92P7unpFlyqARVMpwrXxH0PabtyIMw1w'
        },
        {
            id: 3,
            name: 'Elena Rodriguez',
            role: 'European Arts',
            specialization: 'EU Scholarship Expert',
            experience: '5 Years',
            studentsAssisted: 315,
            rating: 4.6,
            languages: 'Spanish, French',
            status: 'Available',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaP-yR8qXV9z2yzy2PE8LgP3l4TA4wRZ__llZiLpkICeEZuyId2i-WF8hk3In44BiDX--RWR4duulhwKOFzaWNqjQw2BOSjFHYsklu-zX-N6GqCw9FEqAzISt4C2a4X23p-A9OYSvwhYhV1y0ZOSRf-WA-8t1038KxaqgzXh2N__qDPg6RxV85GP4Oq9OXd9FsiCPhiljpU0E7Hbta1soPsWv4NYztGUXnFAwyCRa6m53OsFEyz0jtsqz9CXSiDnZxNp_tAEK0PTE'
        },
        {
            id: 4,
            name: 'David Wilson',
            role: 'Senior Counsellor',
            specialization: 'Australia Specialist',
            experience: '10 Years',
            studentsAssisted: 450,
            rating: 4.8,
            languages: 'English',
            status: 'Available',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtPhFfE7m3T_X8Y9X5J9j8_h7WvVf3y4Z7l_uXg'
        },
        {
            id: 5,
            name: 'Maria Garcia',
            role: 'Admissions Expert',
            specialization: 'UK Business Schools',
            experience: '7 Years',
            studentsAssisted: 280,
            rating: 4.5,
            languages: 'English, Spanish',
            status: 'Available',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtPhFfE7m3T_X8Y9X5J9j8_h7WvVf3y4Z7l_uXg'
        },
        {
            id: 6,
            name: 'Michael Chen',
            role: 'IT Specialist',
            specialization: 'Canada Tech Programs',
            experience: '15 Years',
            studentsAssisted: 920,
            rating: 4.9,
            languages: 'English, Mandarin',
            status: 'Busy',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtPhFfE7m3T_X8Y9X5J9j8_h7WvVf3y4Z7l_uXg'
        },
        {
            id: 7,
            name: 'Sophie Martin',
            role: 'Arts & Design',
            specialization: 'Italy Art Schools',
            experience: '6 Years',
            studentsAssisted: 150,
            rating: 4.4,
            languages: 'English, French, Italian',
            status: 'Available',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtPhFfE7m3T_X8Y9X5J9j8_h7WvVf3y4Z7l_uXg'
        },
        {
            id: 8,
            name: 'Raj Patel',
            role: 'Medical Advisor',
            specialization: 'EU Medical Programs',
            experience: '9 Years',
            studentsAssisted: 340,
            rating: 4.7,
            languages: 'English, Gujarati, Hindi',
            status: 'Available',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtPhFfE7m3T_X8Y9X5J9j8_h7WvVf3y4Z7l_uXg'
        },
        {
            id: 9,
            name: 'Emily Davis',
            role: 'Scholarship Head',
            specialization: 'Global Scholarships',
            experience: '11 Years',
            studentsAssisted: 610,
            rating: 4.9,
            languages: 'English',
            status: 'Available',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtPhFfE7m3T_X8Y9X5J9j8_h7WvVf3y4Z7l_uXg'
        },
        {
            id: 10,
            name: 'Liam Thompson',
            role: 'Sports Advisor',
            specialization: 'USA Sports Scholarships',
            experience: '4 Years',
            studentsAssisted: 120,
            rating: 4.3,
            languages: 'English',
            status: 'Available',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtPhFfE7m3T_X8Y9X5J9j8_h7WvVf3y4Z7l_uXg'
        }
    ];

    const [filteredCounsellors, setFilteredCounsellors] = useState(initialCounsellors);

    useEffect(() => {
        let results = initialCounsellors.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.specialization.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (specialization !== 'All') {
            results = results.filter(c => c.specialization.includes(specialization));
        }

        if (experience !== 'All') {
            const expNum = parseInt(experience.split('+')[0]);
            results = results.filter(c => parseInt(c.experience.split(' ')[0]) >= expNum);
        }

        if (rating !== 'All') {
            const rateNum = parseFloat(rating.split('+')[0]);
            results = results.filter(c => c.rating >= rateNum);
        }

        setFilteredCounsellors(results);
    }, [searchQuery, specialization, experience, rating]);

    if (viewingCounsellor) {
        return (
            <SuperAdminLayout title={`${viewingCounsellor.name}'s Profile`}>
                <PerformanceRatingOverview
                    selectedCounsellor={viewingCounsellor}
                    onBack={() => setViewingCounsellor(null)}
                />
            </SuperAdminLayout>
        );
    }

    return (
        <SuperAdminLayout title="Available Counsellors">
            <main className="flex-grow px-6 py-8 w-full bg-[#f8f6f6]">
                {/* Header Section */}
                <header className="mb-8">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Available Counsellors</h1>
                    <p className="text-xs text-slate-500 font-medium max-w-2xl">
                        Browse experienced counsellors and connect with the right expert for your university journey.
                    </p>
                </header>

                {/* Filters Bento */}
                <div className="grid grid-cols-1 md:grid-cols-10 gap-3 mb-6 relative">
                    <div className="md:col-span-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#2b6cee] text-[20px]">person_search</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 w-full text-xs text-slate-900 font-bold placeholder:text-slate-400"
                            placeholder="Search by name or specialization..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Specialization Filter */}
                    <div className="relative md:col-span-2">
                        <div
                            onClick={() => { setIsSpecOpen(!isSpecOpen); setIsExpOpen(false); setIsRateOpen(false); }}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors h-full"
                        >
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Specialization</span>
                                <span className="text-[10px] font-bold text-slate-900">{specialization}</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-[18px]">expand_more</span>
                        </div>
                        {isSpecOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {['All', 'UK & Canada', 'US Engineering', 'EU Scholarship', 'Australia', 'Italy Art'].map((spec) => (
                                    <div
                                        key={spec}
                                        onClick={() => { setSpecialization(spec); setIsSpecOpen(false); }}
                                        className="px-4 py-2.5 text-[11px] font-bold text-slate-700 hover:bg-blue-50 hover:text-[#2b6cee] cursor-pointer transition-colors"
                                    >
                                        {spec}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Experience Filter */}
                    <div className="relative md:col-span-2">
                        <div
                            onClick={() => { setIsExpOpen(!isExpOpen); setIsSpecOpen(false); setIsRateOpen(false); }}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors h-full"
                        >
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Experience</span>
                                <span className="text-[10px] font-bold text-slate-900">{experience}</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-[18px]">expand_more</span>
                        </div>
                        {isExpOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {['All', '5+ Years', '10+ Years', '15+ Years'].map((exp) => (
                                    <div
                                        key={exp}
                                        onClick={() => { setExperience(exp); setIsExpOpen(false); }}
                                        className="px-4 py-2.5 text-[11px] font-bold text-slate-700 hover:bg-blue-50 hover:text-[#2b6cee] cursor-pointer transition-colors"
                                    >
                                        {exp}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Rating Filter */}
                    <div className="relative md:col-span-2">
                        <div
                            onClick={() => { setIsRateOpen(!isRateOpen); setIsSpecOpen(false); setIsExpOpen(false); }}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors h-full"
                        >
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Rating</span>
                                <span className="text-[10px] font-bold text-slate-900">{rating}</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-[18px]">expand_more</span>
                        </div>
                        {isRateOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {['All', '4.0+', '4.5+', '4.8+'].map((rate) => (
                                    <div
                                        key={rate}
                                        onClick={() => { setRating(rate); setIsRateOpen(false); }}
                                        className="px-4 py-2.5 text-[11px] font-bold text-slate-700 hover:bg-blue-50 hover:text-[#2b6cee] cursor-pointer transition-colors"
                                    >
                                        {rate}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Counsellors Table Container */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Counsellor Name</th>
                                    <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Specialization</th>
                                    <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Experience</th>
                                    <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Assisted</th>
                                    <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Rating</th>
                                    <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Languages</th>
                                    <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCounsellors.map((counsellor) => (
                                    <tr key={counsellor.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative shrink-0">
                                                    <img
                                                        alt={counsellor.name}
                                                        className="w-10 h-10 rounded-lg object-cover ring-2 ring-white shadow-sm"
                                                        src={counsellor.image}
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-slate-900 truncate">{counsellor.name}</p>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{counsellor.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="bg-blue-50 text-[#2b6cee] px-2.5 py-1 rounded-md text-[9px] font-black whitespace-nowrap uppercase tracking-widest border border-blue-100">
                                                {counsellor.specialization}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <p className="text-xs font-bold text-slate-700">{counsellor.experience}</p>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-black text-[#2b6cee]">{counsellor.studentsAssisted}</span>
                                                <span className="text-[7px] uppercase font-black text-slate-400 tracking-tighter">Students</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[#2b6cee] text-base fill-1">star</span>
                                                <span className="text-xs font-black text-slate-900">{counsellor.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="text-[11px] text-slate-500 font-bold">{counsellor.languages}</p>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button
                                                onClick={() => setViewingCounsellor(counsellor)}
                                                className="px-3 py-1.5 text-[#2b6cee] text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                            >
                                                View Progress
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCounsellors.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-20 text-center">
                                            <span className="material-symbols-outlined text-slate-300 text-6xl mb-4 block">search_off</span>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No counsellors found matching your criteria</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-50/50 px-5 py-3 flex items-center justify-between border-t border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            Showing <span className="text-slate-900 font-black">1-{filteredCounsellors.length}</span> of {filteredCounsellors.length} counsellors
                        </p>
                        <div className="flex gap-2">
                            <button className="p-1 bg-white rounded-md text-slate-400 hover:text-[#2b6cee] transition-colors border border-slate-200 shadow-xs disabled:opacity-50" disabled>
                                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                            </button>
                            <button className="p-1 bg-[#2b6cee] text-white rounded-md shadow-sm shadow-[#2b6cee]/20 hover:bg-[#1e5adb] transition-colors">
                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </SuperAdminLayout>
    );
};

export default SuperAdminAvailableCounsellors;
