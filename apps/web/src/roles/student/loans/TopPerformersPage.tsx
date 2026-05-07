import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

const TopPerformersPage = () => {
    const navigate = useNavigate();
    const [timeFilter, setTimeFilter] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');
    const [selectedCountry, setSelectedCountry] = useState('All Countries');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    const countries = ['All Countries', 'Australia', 'Canada', 'Switzerland', 'United Kingdom', 'United States', 'Singapore'];

    const getStats = () => {
        const baseStats = [
            { label: 'Total Universities', value: '1,240', icon: 'school' },
            { label: 'Avg Performance', value: '76.5', unit: '/100', icon: 'query_stats' },
            { label: 'Highest Score', value: '98', unit: '/100', icon: 'emoji_events' },
        ];

        if (timeFilter === 'Quarterly') {
            return baseStats.map(s => s.label === 'Avg Performance' ? { ...s, value: '78.2' } : s);
        }
        if (timeFilter === 'Yearly') {
            return baseStats.map(s => s.label === 'Avg Performance' ? { ...s, value: '74.9' } : s);
        }
        return baseStats;
    };

    const getTopThree = () => {
        if (timeFilter === 'Monthly') {
            return [
                { rank: 1, name: 'Oxford University', country: 'United Kingdom', score: '98.5', badges: ['Best in all Categories'] },
                { rank: 2, name: 'Stanford University', country: 'United States', score: '94.2', badges: ['Active partner', 'Visa leader'] },
                { rank: 3, name: 'National Uni. of Singapore', country: 'Singapore', score: '91.8', badges: ['Fast growing', 'Active partner'] }
            ];
        }
        if (timeFilter === 'Quarterly') {
            return [
                { rank: 1, name: 'Harvard University', country: 'United States', score: '99.1', badges: ['Best in all Categories'] },
                { rank: 2, name: 'Oxford University', country: 'United Kingdom', score: '96.4', badges: ['High Engagement', 'Visa Leader'] },
                { rank: 3, name: 'ETH Zurich', country: 'Switzerland', score: '93.1', badges: ['Student Favorite', 'Active Partner'] }
            ];
        }
        // Yearly
        return [
            { rank: 1, name: 'MIT', country: 'United States', score: '97.2', badges: ['Best in all Categories'] },
            { rank: 2, name: 'Cambridge University', country: 'United Kingdom', score: '95.8', badges: ['Academic Excellence', 'Visa Leader'] },
            { rank: 3, name: 'Stanford University', country: 'United States', score: '92.4', badges: ['Research Pioneer', 'Active Partner'] }
        ];
    };

    const getLeaderboard = () => {
        const baseLeaderboard = [
            { rank: '04', name: 'University of Melbourne', location: 'Melbourne, Australia', country: 'Australia', score: 87, growth: '↑ 4.3% Growth', status: 'Highest Success Rate', color: 'bg-primary' },
            { rank: '05', name: 'University of Toronto', location: 'Toronto, Canada', country: 'Canada', score: 82, growth: 'Stable performance', status: 'Research Excellence', color: 'bg-green-500' },
            { rank: '06', name: 'ETH Zurich', location: 'Zurich, Switzerland', country: 'Switzerland', score: 68, growth: '↓ 1.5% decrease', status: 'Engineering Leader', color: 'bg-yellow-500' },
            { rank: '07', name: 'Imperial College London', location: 'London, United Kingdom', country: 'United Kingdom', score: 85, growth: '↑ 2.1% Growth', status: 'Medical Innovation', color: 'bg-primary' },
            { rank: '08', name: 'Harvard University', location: 'Cambridge, United States', country: 'United States', score: 91, growth: '↑ 1.8% Growth', status: 'Academic Excellence', color: 'bg-blue-600' },
            { rank: '09', name: 'UCL', location: 'London, United Kingdom', country: 'United Kingdom', score: 79, growth: '↑ 3.5% Growth', status: 'Global Engagement', color: 'bg-green-500' },
            { rank: '10', name: 'MIT', location: 'Cambridge, United States', country: 'United States', score: 89, growth: 'Stable performance', status: 'Technical Innovation', color: 'bg-blue-600' },
        ];

        let filtered = baseLeaderboard;
        if (selectedCountry !== 'All Countries') {
            filtered = baseLeaderboard.filter(u => u.country === selectedCountry);
        }

        if (timeFilter === 'Quarterly') {
            return filtered.map((u, i) => ({ ...u, score: u.score + (i % 2 === 0 ? 1 : -1) }));
        }
        if (timeFilter === 'Yearly') {
            return filtered.map((u, i) => ({ ...u, score: u.score + (i % 2 === 0 ? -2 : 2) }));
        }
        return filtered;
    };

    const stats = getStats();
    const leaderboard = getLeaderboard();
    const topThree = getTopThree();

    const rank1 = topThree.find(u => u.rank === 1)!;
    const rank2 = topThree.find(u => u.rank === 2)!;
    const rank3 = topThree.find(u => u.rank === 3)!;

    return (
        <SuperAdminLayout title="Top Performers">
            <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
                {/* Hero Title Section */}
                <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#1E63F3]/10 via-[#1E63F3]/5 to-white p-5 md:p-6 border border-[#1E63F3]/10">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="max-w-lg">
                            <h2 className="text-2xl md:text-2xl font-black text-slate-900 mb-1 tracking-tight">Top Performer Universities</h2>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">Universities ranked based on engagement, applications, and performance metrics ({timeFilter} view).</p>
                        </div>
                        <div className="flex bg-white p-0.5 rounded-lg shadow-sm border border-slate-100 h-fit">
                            {(['Monthly', 'Quarterly', 'Yearly'] as const).map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setTimeFilter(filter)}
                                    className={`px-4 py-1 rounded-md text-[10px] transition-all ${timeFilter === filter
                                        ? 'font-black bg-[#1E63F3] text-white shadow-md shadow-blue-200'
                                        : 'font-bold text-slate-400 hover:text-[#1E63F3]'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Performance Summary Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-3.5 rounded-[20px] shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition-shadow">
                            <div className="bg-blue-50 p-2.5 rounded-lg text-[#1E63F3]">
                                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-lg font-black text-slate-900 mt-0.5">
                                    {stat.value}
                                    {stat.unit && <span className="text-[10px] font-bold text-slate-300 ml-0.5">{stat.unit}</span>}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Top 3 Highlights - Podium */}
                <section className="relative pt-10 pb-4">
                    <div className="flex flex-col lg:flex-row items-end justify-center gap-4 px-2">
                        {/* Rank 2 */}
                        <div className="order-2 lg:order-1 w-full lg:w-[26%] bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 text-center relative mt-8 group hover:shadow-lg transition-all duration-500">
                            <div className="mt-4 mb-3">
                                <div className="inline-flex items-center justify-center bg-slate-50 text-slate-500 rounded-full w-6 h-6 font-black text-sm mb-1.5">2</div>
                                <h3 className="font-black text-base text-slate-800 leading-tight">{rank2.name}</h3>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{rank2.country}</p>
                            </div>
                            <div className="text-2xl font-black text-[#1E63F3] mb-3 tracking-tighter">
                                {rank2.score}
                            </div>
                            <div className="flex flex-wrap justify-center gap-1">
                                {rank2.badges.map(badge => (
                                    <span key={badge} className="px-1.5 py-0.5 bg-blue-50 text-[#1E63F3] text-[8px] font-black rounded uppercase tracking-wider">{badge}</span>
                                ))}
                            </div>
                        </div>

                        {/* Rank 1 - Champion */}
                        <div className="order-1 lg:order-2 w-full lg:w-[32%] bg-white p-6 rounded-[32px] shadow-2xl border-2 border-[#1E63F3] text-center relative scale-105 z-10 group hover:shadow-blue-200/50 transition-all duration-500">
                            <div className="mt-6 mb-5 flex flex-col items-center">
                                <div className="inline-flex items-center justify-center bg-blue-50 text-[#1E63F3] rounded-full w-6 h-6 font-black text-sm mb-1.5 shadow-sm">1</div>
                                <div className="inline-flex items-center gap-1 bg-[#1E63F3] text-white px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-2 shadow-lg shadow-blue-200">
                                    TOP PERFORMER
                                </div>
                                <h3 className="font-black text-xl text-slate-900 leading-tight">{rank1.name}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{rank1.country}</p>
                            </div>
                            <div className="text-4xl font-black text-[#1E63F3] mb-5 tracking-tighter">
                                {rank1.score}
                            </div>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {rank1.badges.map(badge => (
                                    <span key={badge} className="px-2.5 py-1 bg-blue-50 text-[#1E63F3] text-[9px] font-black rounded-lg uppercase tracking-widest">{badge}</span>
                                ))}
                            </div>
                        </div>

                        {/* Rank 3 */}
                        <div className="order-3 w-full lg:order-3 lg:w-[26%] bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 text-center relative mt-8 group hover:shadow-lg transition-all duration-500">
                            <div className="mt-4 mb-3">
                                <div className="inline-flex items-center justify-center bg-slate-50 text-slate-500 rounded-full w-6 h-6 font-black text-sm mb-1.5">3</div>
                                <h3 className="font-black text-base text-slate-800 leading-tight">{rank3.name}</h3>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{rank3.country}</p>
                            </div>
                            <div className="text-2xl font-black text-[#1E63F3] mb-3 tracking-tighter">
                                {rank3.score}
                            </div>
                            <div className="flex flex-wrap justify-center gap-1">
                                {rank3.badges.map(badge => (
                                    <span key={badge} className="px-1.5 py-0.5 bg-blue-50 text-[#1E63F3] text-[8px] font-black rounded uppercase tracking-wider">{badge}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Full Ranking Leaderboard */}
                <section className="bg-white rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden min-h-[400px]">
                    <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/10">
                        <h4 className="font-black text-base text-slate-800 uppercase tracking-tight">Leaderboard <span className="text-slate-300 font-bold ml-2 text-xs">#04 - #10</span></h4>
                        <div className="flex gap-1.5 items-center">
                            <div className="relative">
                                <button
                                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                    className="bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-widest px-3 py-1.5 focus:ring-2 focus:ring-[#1E63F3]/20 hover:border-[#1E63F3] flex items-center gap-2 transition-all min-w-[120px] justify-between"
                                >
                                    {selectedCountry}
                                    <span className="material-symbols-outlined text-xs leading-none">
                                        {showCountryDropdown ? 'expand_less' : 'expand_more'}
                                    </span>
                                </button>

                                {showCountryDropdown && (
                                    <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {countries.map((country) => (
                                            <button
                                                key={country}
                                                onClick={() => {
                                                    setSelectedCountry(country);
                                                    setShowCountryDropdown(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-colors hover:bg-blue-50 ${selectedCountry === country ? 'text-[#1E63F3] bg-blue-50/50' : 'text-slate-500'}`}
                                            >
                                                {country}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/20">
                                    <th className="px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Rank</th>
                                    <th className="px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">University Details</th>
                                    <th className="px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Score & Performance</th>
                                    <th className="px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {leaderboard.map((uni) => (
                                    <tr key={uni.rank} className="hover:bg-blue-50/10 transition-colors group">
                                        <td className="px-5 py-3.5 font-black text-xl text-slate-200 group-hover:text-blue-100 transition-colors">#{uni.rank}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300 font-black text-sm shadow-inner group-hover:bg-white group-hover:shadow-md transition-all">
                                                    {uni.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm leading-tight mb-0.5">{uni.name}</p>
                                                    <p className="text-[8px] font-bold text-slate-400 tracking-wider uppercase">{uni.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 min-w-[200px]">
                                            <div className="flex items-center gap-2.5 mb-1">
                                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${uni.color} rounded-full transition-all duration-1000 group-hover:scale-[1.02]`} style={{ width: `${uni.score}%` }}></div>
                                                </div>
                                                <span className="font-black text-slate-900 tabular-nums text-xs">{uni.score}<span className="text-[8px] text-slate-300 ml-0.5">/100</span></span>
                                            </div>
                                            <p className="text-[8px] font-black text-[#1E63F3] uppercase tracking-widest">{uni.growth}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 group-hover:bg-white group-hover:shadow-sm">
                                                {uni.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>

            <footer className="max-w-6xl mx-auto px-10 py-6 border-t border-slate-50 text-center mt-4">
                <p className="text-slate-300 text-[8px] font-black uppercase tracking-[0.3em]">© 2024 EAOverseas Global Network</p>
            </footer>
        </SuperAdminLayout>
    );
};

export default TopPerformersPage;
