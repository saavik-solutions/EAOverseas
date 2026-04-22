import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

const SuperAdminUniversityManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#2b6cee]/90 transition-all shadow-md shadow-[#2b6cee]/20 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">add</span>
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
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
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
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${uni.status === 'Active' ? 'bg-emerald-100 text-emerald-600' :
                                                uni.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-rose-100 text-rose-600'
                                                }`}>
                                                {uni.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end">
                                                <button
                                                    onClick={() => navigate(`/Superadmin/university/${uni.id}`)}
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
                                            <input type="text" placeholder="Enter official institutional name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Official Website <span className="text-rose-500">*</span></label>
                                            <input type="text" placeholder="https://university.edu" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5 pt-2">
                                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Institutional Overview</label>
                                        <textarea 
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
                                            <input type="text" defaultValue="Public" placeholder="e.g. Public" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Est. Year</label>
                                            <input type="text" defaultValue="1850" placeholder="YYYY" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Total Students</label>
                                            <input type="text" defaultValue="25000" placeholder="Number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Global Ranking</label>
                                            <input type="text" defaultValue="#42 QS" placeholder="e.g. #42 QS" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
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
                                            <input type="text" placeholder="e.g. United Kingdom" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">City</label>
                                            <input type="text" placeholder="e.g. London" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Campus Size</label>
                                            <input type="text" placeholder="e.g. 500 Acres" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all" />
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
        </SuperAdminLayout>
    );
};

export default SuperAdminUniversityManagement;
