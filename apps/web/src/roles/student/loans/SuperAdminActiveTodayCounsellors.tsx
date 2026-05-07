import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

// ── Types ────────────────────────────────────────────────────────────────────
interface Counsellor {
    id: number;
    name: string;
    avatar: string;
    specialization: string;
    country: string;
    studentsToday: number;
    status: 'active' | 'break' | 'offline';
    nextAvailable?: string;
    activeHours: string;
    email: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const ALL_COUNSELLORS: Counsellor[] = [
    { id: 1, name: 'Dr. Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=201', specialization: 'UK Universities', country: 'United Kingdom', studentsToday: 8, status: 'active', activeHours: '9:00 AM – 5:00 PM', email: 'sarah.j@eaoverseas.com' },
    { id: 2, name: 'Raj Mehta', avatar: 'https://i.pravatar.cc/150?u=202', specialization: 'Canada, Australia', country: 'Canada', studentsToday: 5, status: 'break', nextAvailable: '2:30 PM', activeHours: '10:00 AM – 6:00 PM', email: 'raj.m@eaoverseas.com' },
    { id: 3, name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=203', specialization: 'USA Graduate Programs', country: 'United States', studentsToday: 12, status: 'active', activeHours: '8:00 AM – 4:00 PM', email: 'emily.c@eaoverseas.com' },
    { id: 4, name: 'James Okonkwo', avatar: 'https://i.pravatar.cc/150?u=204', specialization: 'Germany, Netherlands', country: 'Germany', studentsToday: 3, status: 'active', activeHours: '9:30 AM – 5:30 PM', email: 'james.o@eaoverseas.com' },
    { id: 5, name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=205', specialization: 'Engineering & STEM', country: 'India', studentsToday: 9, status: 'active', activeHours: '8:30 AM – 4:30 PM', email: 'priya.s@eaoverseas.com' },
    { id: 6, name: 'Lucas Fernandez', avatar: 'https://i.pravatar.cc/150?u=206', specialization: 'Spain, Portugal, Europe', country: 'Spain', studentsToday: 6, status: 'break', nextAvailable: '3:00 PM', activeHours: '10:00 AM – 7:00 PM', email: 'lucas.f@eaoverseas.com' },
    { id: 7, name: 'Amira Hassan', avatar: 'https://i.pravatar.cc/150?u=207', specialization: 'MBA & Business', country: 'UAE', studentsToday: 4, status: 'active', activeHours: '9:00 AM – 6:00 PM', email: 'amira.h@eaoverseas.com' },
    { id: 8, name: 'David Park', avatar: 'https://i.pravatar.cc/150?u=208', specialization: 'South Korea, Japan', country: 'South Korea', studentsToday: 7, status: 'active', activeHours: '8:00 AM – 5:00 PM', email: 'david.p@eaoverseas.com' },
    // Not working today
    { id: 9, name: 'Nina Patel', avatar: 'https://i.pravatar.cc/150?u=209', specialization: 'Scholarships & Funding', country: 'India', studentsToday: 0, status: 'offline', activeHours: '—', email: 'nina.p@eaoverseas.com' },
    { id: 10, name: 'Carlos Rivera', avatar: 'https://i.pravatar.cc/150?u=210', specialization: 'Latin America', country: 'Mexico', studentsToday: 0, status: 'offline', activeHours: '—', email: 'carlos.r@eaoverseas.com' },
    { id: 11, name: 'Sophie Laurent', avatar: 'https://i.pravatar.cc/150?u=211', specialization: 'France, Belgium', country: 'France', studentsToday: 0, status: 'offline', activeHours: '—', email: 'sophie.l@eaoverseas.com' },
    { id: 12, name: 'Yuki Tanaka', avatar: 'https://i.pravatar.cc/150?u=212', specialization: 'Japan, South-East Asia', country: 'Japan', studentsToday: 0, status: 'offline', activeHours: '—', email: 'yuki.t@eaoverseas.com' },
];

const STATUS_COLORS: Record<string, { bg: string; dot: string; label: string }> = {
    active: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', dot: 'bg-emerald-500 animate-pulse', label: 'Active' },
    break: { bg: 'bg-amber-50 text-amber-700 border-amber-100', dot: 'bg-amber-400', label: 'On Break' },
    offline: { bg: 'bg-slate-100 text-slate-500 border-slate-200', dot: 'bg-slate-400', label: 'Offline' },
};

// ── Component ─────────────────────────────────────────────────────────────────
const SuperAdminActiveTodayCounsellors: React.FC = () => {
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'break' | 'offline'>('all');
    const [countryFilter, setCountryFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const countries = ['All', ...Array.from(new Set(ALL_COUNSELLORS.map(c => c.country))).sort()];

    const filtered = ALL_COUNSELLORS.filter(c => {
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        const matchCountry = countryFilter === 'All' || c.country === countryFilter;
        const matchSearch = !searchQuery
            || c.name.toLowerCase().includes(searchQuery.toLowerCase())
            || c.specialization.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchCountry && matchSearch;
    });

    const activeCount = ALL_COUNSELLORS.filter(c => c.status === 'active').length;
    const onBreakCount = ALL_COUNSELLORS.filter(c => c.status === 'break').length;
    const offlineCount = ALL_COUNSELLORS.filter(c => c.status === 'offline').length;

    return (
        <SuperAdminLayout title="Active Today – Counsellors">
            <div className="p-8 flex flex-col gap-6">

                {/* Page Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/Superadmin/consultants')}
                        className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-800"
                    >
                        <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Counsellor Availability</h1>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100">
                                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Live</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Real-time view of all counsellors working today — filter active or offline.</p>
                    </div>
                </div>

                {/* Summary Stat Chips */}
                <div className="flex flex-wrap gap-3">
                    {[
                        { key: 'all', label: 'All Counsellors', count: ALL_COUNSELLORS.length, icon: 'groups_3', color: 'bg-slate-800 text-white' },
                        { key: 'active', label: 'Working Now', count: activeCount, icon: 'wifi_tethering', color: 'bg-emerald-600 text-white' },
                        { key: 'break', label: 'On Break', count: onBreakCount, icon: 'coffee', color: 'bg-amber-500 text-white' },
                        { key: 'offline', label: 'Not Working Today', count: offlineCount, icon: 'wifi_off', color: 'bg-slate-200 text-slate-700' },
                    ].map(chip => (
                        <button
                            key={chip.key}
                            onClick={() => setStatusFilter(chip.key as any)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm border transition-all
                                ${statusFilter === chip.key
                                    ? `${chip.color} border-transparent scale-105 shadow-md`
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{chip.icon}</span>
                            {chip.label}
                            <span className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold
                                ${statusFilter === chip.key ? 'bg-white/20 text-current' : 'bg-slate-100 text-slate-600'}`}>
                                {chip.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search + Country Filter */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-wrap gap-3 items-center">
                    <div className="relative flex-1 min-w-[200px]">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                        <input
                            type="text"
                            placeholder="Search by name or specialization..."
                            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 transition-all"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Country:</span>
                        <select
                            className="text-sm font-semibold border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 cursor-pointer bg-slate-50"
                            value={countryFilter}
                            onChange={e => setCountryFilter(e.target.value)}
                        >
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium ml-auto">
                        Showing <strong className="text-slate-700">{filtered.length}</strong> of {ALL_COUNSELLORS.length} counsellors
                    </span>
                </div>

                {/* Counsellors Grid */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-slate-200">
                        <span className="material-symbols-outlined text-slate-300 text-[64px] mb-3">person_off</span>
                        <p className="text-slate-500 font-semibold text-base">No counsellors match your filters</p>
                        <p className="text-slate-400 text-sm mt-1">Try adjusting the search or status filter</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map(c => {
                            const st = STATUS_COLORS[c.status];
                            return (
                                <div key={c.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md hover:border-indigo-200 transition-all group">
                                    {/* Top: avatar + name + status */}
                                    <div className="flex items-start gap-3">
                                        <div className="relative shrink-0">
                                            <div
                                                className="size-12 rounded-full bg-slate-200 bg-cover bg-center border-2 border-white shadow"
                                                style={{ backgroundImage: `url("${c.avatar}")` }}
                                            />
                                            {/* Online dot */}
                                            <span className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white ${STATUS_COLORS[c.status].dot}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-slate-900 text-sm truncate">{c.name}</h3>
                                            <p className="text-xs text-slate-500 truncate">{c.specialization}</p>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${st.bg} shrink-0`}>
                                            {st.label}
                                        </span>
                                    </div>

                                    {/* Stats row */}
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="bg-slate-50 rounded-lg p-2.5">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1">Country</p>
                                            <p className="font-bold text-slate-800">{c.country}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-2.5">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1">Students Today</p>
                                            <p className={`font-bold text-lg leading-tight ${c.studentsToday > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                                                {c.studentsToday}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hours / break info */}
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span className="material-symbols-outlined text-[15px] text-slate-400">schedule</span>
                                        {c.status === 'break' && c.nextAvailable
                                            ? <span>Back at <strong className="text-amber-600">{c.nextAvailable}</strong></span>
                                            : <span>{c.activeHours}</span>
                                        }
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                                        <a
                                            href={`mailto:${c.email}`}
                                            className="flex-1 text-center text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                                        >
                                            Message
                                        </a>
                                        <button className="flex-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminActiveTodayCounsellors;
