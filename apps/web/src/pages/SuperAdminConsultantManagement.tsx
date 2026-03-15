import React, { useState } from 'react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { Link } from 'react-router-dom';

const SuperAdminConsultantManagement: React.FC = () => {
    const [countryFilter, setCountryFilter] = useState('United Kingdom');
    const [period, setPeriod] = useState('Monthly');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Mock data for different periods and countries
    const chartData: Record<string, Record<string, { label: string, value: number, x: number, y: number }[]>> = {
        'Monthly': {
            'United Kingdom': [
                { label: 'Jan', value: 21500, x: 0, y: 180 },
                { label: 'Feb', value: 14200, x: 160, y: 220 },
                { label: 'Mar', value: 28400, x: 320, y: 130 },
                { label: 'Apr', value: 39100, x: 500, y: 80 },
                { label: 'May', value: 48200, x: 680, y: 30 },
                { label: 'Jun', value: 32600, x: 840, y: 110 },
                { label: 'Jul', value: 41000, x: 1000, y: 70 }
            ],
            'India': [
                { label: 'Jan', value: 35000, x: 0, y: 100 },
                { label: 'Feb', value: 42000, x: 160, y: 60 },
                { label: 'Mar', value: 38000, x: 320, y: 85 },
                { label: 'Apr', value: 52000, x: 500, y: 20 },
                { label: 'May', value: 45000, x: 680, y: 50 },
                { label: 'Jun', value: 58000, x: 840, y: 10 },
                { label: 'Jul', value: 65000, x: 1000, y: 5 }
            ],
            'Canada': [
                { label: 'Jan', value: 12000, x: 0, y: 230 },
                { label: 'Feb', value: 18000, x: 160, y: 200 },
                { label: 'Mar', value: 15000, x: 320, y: 215 },
                { label: 'Apr', value: 25000, x: 500, y: 150 },
                { label: 'May', value: 22000, x: 680, y: 170 },
                { label: 'Jun', value: 31000, x: 840, y: 120 },
                { label: 'Jul', value: 29000, x: 1000, y: 130 }
            ],
            'Australia': [
                { label: 'Jan', value: 18000, x: 0, y: 200 },
                { label: 'Feb', value: 15000, x: 160, y: 215 },
                { label: 'Mar', value: 22000, x: 320, y: 170 },
                { label: 'Apr', value: 20000, x: 500, y: 185 },
                { label: 'May', value: 28000, x: 680, y: 130 },
                { label: 'Jun', value: 25000, x: 840, y: 150 },
                { label: 'Jul', value: 32000, x: 1000, y: 110 }
            ],
            'All': [
                { label: 'Jan', value: 45000, x: 0, y: 50 },
                { label: 'Feb', value: 48000, x: 160, y: 40 },
                { label: 'Mar', value: 55000, x: 320, y: 15 },
                { label: 'Apr', value: 62000, x: 500, y: 5 },
                { label: 'May', value: 58000, x: 680, y: 10 },
                { label: 'Jun', value: 72000, x: 840, y: 0 },
                { label: 'Jul', value: 75000, x: 1000, y: 0 }
            ]
        },
        '2024': {
            'United Kingdom': [
                { label: 'Q1', value: 15000, x: 0, y: 200 },
                { label: 'Q2', value: 22000, x: 333, y: 160 },
                { label: 'Q3', value: 18000, x: 666, y: 180 },
                { label: 'Q4', value: 35000, x: 1000, y: 100 }
            ],
            'India': [
                { label: 'Q1', value: 30000, x: 0, y: 120 },
                { label: 'Q2', value: 45000, x: 333, y: 50 },
                { label: 'Q3', value: 40000, x: 666, y: 70 },
                { label: 'Q4', value: 55000, x: 1000, y: 10 }
            ]
        },
        '2025': {
            'United Kingdom': [
                { label: 'Q1', value: 38000, x: 0, y: 80 },
                { label: 'Q2', value: 42000, x: 333, y: 60 },
                { label: 'Q3', value: 35000, x: 666, y: 90 },
                { label: 'Q4', value: 49000, x: 1000, y: 30 }
            ],
            'India': [
                { label: 'Q1', value: 50000, x: 0, y: 20 },
                { label: 'Q2', value: 55000, x: 333, y: 10 },
                { label: 'Q3', value: 52000, x: 666, y: 15 },
                { label: 'Q4', value: 65000, x: 1000, y: 5 }
            ]
        }
    };

    const activePeriodData = chartData[period] || chartData['Monthly'];
    const activeData = activePeriodData[countryFilter] || activePeriodData['All'] || activePeriodData['United Kingdom'];

    return (
        <SuperAdminLayout title="Consultants Management">
            <div className="p-8 flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Consultants Management</h1>
                    <p className="text-xs text-slate-500">Monitor consultant activity, performance, and assigned students.</p>
                </div>

                {/* Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Link to="/Superadmin/counsellors">
                        <MetricCard
                            icon="groups_3"
                            label="Total Consultants"
                            value="1,284"
                            trend="+12% Overall"
                        />
                    </Link>
                    <Link to="/Superadmin/active-today">
                        <MetricCard
                            icon="event_available"
                            label="Active Today"
                            value="42"
                            trend="Real-time Activity"
                            isUrgent
                        />
                    </Link>
                    <MetricCard
                        icon="person_pin"
                        label="Students Assigned"
                        value="5,670"
                        trend="+18% Increase"
                    />
                    <MetricCard
                        icon="assignment_turned_in"
                        label="Applications Managed"
                        value="12,400"
                        trend="+22% Growth"
                    />
                </div>

                {/* Filters Section - Simplified */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex gap-2">
                        <FilterSelect
                            label="Country"
                            value={countryFilter}
                            onChange={setCountryFilter}
                            options={['All', 'India', 'United Kingdom', 'Canada', 'Australia']}
                        />
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Data filtered by {countryFilter}
                    </div>
                </div>

                {/* Activity & Performance Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 leading-none">Consultant Activity & Performance</h3>
                            <p className="text-xs text-slate-500 mt-1.5 font-medium">{period} trends for {countryFilter}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    className="appearance-none bg-slate-50 border border-slate-200 py-1.5 pl-3 pr-8 rounded-lg text-[10px] font-bold text-slate-600 outline-none cursor-pointer hover:bg-white transition-all shadow-sm"
                                >
                                    <option value="Monthly">Monthly</option>
                                    <option value="2024">Yearly 2024</option>
                                    <option value="2025">Yearly 2025</option>
                                    <option value="2026">Yearly 2026</option>
                                    <option value="2027">Yearly 2027</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 h-[300px]">
                        {/* Y-Axis Labels */}
                        <div className="flex flex-col justify-between text-[10px] font-bold text-slate-400 w-8 pb-8 pt-2">
                            <span>50K</span>
                            <span>40K</span>
                            <span>30K</span>
                            <span>20K</span>
                            <span>10K</span>
                            <span>0</span>
                        </div>

                        {/* Chart Area */}
                        <div className="flex-1 relative pb-8">
                            {/* Horizontal Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2 pr-2">
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-full border-t border-dashed border-slate-100"></div>
                                ))}
                            </div>

                            {/* SVG Line Graph */}
                            <div className="absolute inset-0 py-2 pr-2">
                                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 280">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.12"></stop>
                                            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>

                                    {/* Background Path */}
                                    <path
                                        d={`M${activeData[0].x},${activeData[0].y} ${activeData.slice(1).map((p, i) => {
                                            const prev = activeData[i];
                                            const cp1x = prev.x + (p.x - prev.x) / 2;
                                            const cp2x = prev.x + (p.x - prev.x) / 2;
                                            return `C${cp1x},${prev.y} ${cp2x},${p.y} ${p.x},${p.y}`;
                                        }).join(' ')} L1000,280 L0,280 Z`}
                                        fill="url(#chartGradient)"
                                        className="transition-all duration-700"
                                    ></path>

                                    {/* Main Line */}
                                    <path
                                        d={`M${activeData[0].x},${activeData[0].y} ${activeData.slice(1).map((p, i) => {
                                            const prev = activeData[i];
                                            const cp1x = prev.x + (p.x - prev.x) / 2;
                                            const cp2x = prev.x + (p.x - prev.x) / 2;
                                            return `C${cp1x},${prev.y} ${cp2x},${p.y} ${p.x},${p.y}`;
                                        }).join(' ')}`}
                                        fill="none"
                                        stroke="#4f46e5"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="drop-shadow-sm transition-all duration-700"
                                    ></path>

                                    {/* Data points with Hover Interactivity */}
                                    {activeData.map((p, i) => (
                                        <g key={i} className="cursor-pointer group">
                                            <circle
                                                cx={p.x}
                                                cy={p.y}
                                                r="6"
                                                fill="#4f46e5"
                                                className="opacity-0 group-hover:opacity-20 transition-opacity"
                                            ></circle>
                                            <circle
                                                cx={p.x}
                                                cy={p.y}
                                                r="4"
                                                fill="#fff"
                                                stroke="#4f46e5"
                                                strokeWidth="2.5"
                                                className="transition-all shadow-sm"
                                                onMouseEnter={() => setHoveredIndex(i)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            ></circle>

                                            {/* Tooltip on Hover */}
                                            {hoveredIndex === i && (
                                                <g>
                                                    <rect
                                                        x={p.x - 30}
                                                        y={p.y - 35}
                                                        width="60"
                                                        height="25"
                                                        rx="6"
                                                        fill="#1e293b"
                                                        className="animate-in fade-in zoom-in duration-200"
                                                    ></rect>
                                                    <text
                                                        x={p.x}
                                                        y={p.y - 18}
                                                        textAnchor="middle"
                                                        fill="#fff"
                                                        className="text-[10px] font-bold pointer-events-none"
                                                    >
                                                        {(p.value / 1000).toFixed(1)}K
                                                    </text>
                                                    <line
                                                        x1={p.x}
                                                        y1={p.y - 10}
                                                        x2={p.x}
                                                        y2={p.y - 4}
                                                        stroke="#1e293b"
                                                        strokeWidth="1.5"
                                                    ></line>
                                                </g>
                                            )}
                                        </g>
                                    ))}
                                </svg>
                            </div>

                            {/* X-Axis Labels */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                {activeData.map((p, i) => (
                                    <span key={i}>{p.label}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

// --- Sub-components ---

const MetricCard: React.FC<{ icon: string; label: string; value: string; trend: string; isUrgent?: boolean }> = ({ icon, label, value, trend, isUrgent }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 group hover:border-[#2b6cee] hover:shadow-md transition-all cursor-default">
        <div className="flex justify-between items-start">
            <div className={`p-2 rounded-lg transition-colors ${isUrgent ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600 group-hover:bg-[#2b6cee] group-hover:text-white'}`}>
                <span className="material-symbols-outlined text-[24px]">{icon}</span>
            </div>
            {isUrgent && (
                <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full border border-rose-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    <span className="text-[9px] font-bold uppercase tracking-wider">Live</span>
                </div>
            )}
        </div>
        <div className="mt-1">
            <h3 className="text-xl font-black text-slate-900 leading-tight">{value}</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">{label}</p>
        </div>
        <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">
                {trend}
            </span>
            {!isUrgent && (
                <span className="material-symbols-outlined text-sm text-slate-300">trending_up</span>
            )}
        </div>
    </div>
);

const FilterSelect: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: string[] }> = ({ label, value, onChange, options }) => (
    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-200 focus-within:ring-2 focus-within:ring-[#2b6cee]/20">
        <span className="text-[10px] font-bold text-slate-400 uppercase">{label}:</span>
        <select
            className="bg-transparent text-xs font-bold border-none focus:ring-0 cursor-pointer outline-none min-w-[120px] text-slate-700 py-1 pr-1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

export default SuperAdminConsultantManagement;
