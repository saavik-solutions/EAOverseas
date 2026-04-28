import React from 'react';
import { useParams, Link } from 'react-router-dom';
import UniversityLayout from '../layouts/UniversityLayout';

const UniversityConversion = () => {
    const { universityName } = useParams<{ universityName: string }>();
    
    const displayName = universityName 
        ? universityName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "University of Toronto";

    const demoUniversities = ['university-of-toronto', 'kings-college-london', 'university-of-melbourne'];
    const isDemo = demoUniversities.includes(universityName || '');

    const conversionFunnel = [
        { label: 'Impressions', value: isDemo ? '48,291' : '0', color: 'bg-blue-600', width: isDemo ? '100%' : '10%' },
        { label: 'Interest Expressed', value: isDemo ? '3,102' : '0', color: 'bg-[#2b6cee]', width: isDemo ? '68%' : '5%' },
        { label: 'Applications Started', value: isDemo ? '428' : '0', color: 'bg-blue-400', width: isDemo ? '32%' : '2%' },
        { label: 'Enrolled', value: isDemo ? '84' : '0', color: 'bg-blue-300', width: isDemo ? '12%' : '1%' },
    ];

    const conversionStats = [
        { label: 'Funnel efficiency', value: isDemo ? '6.4%' : '0%', grow: isDemo ? '+0.8%' : '0%', icon: 'filter_alt' },
        { label: 'Drop-off rate', value: isDemo ? '93.6%' : '0%', grow: isDemo ? '-1.2%' : '0%', icon: 'trending_down' },
        { label: 'Enrollment ROI', value: isDemo ? '18.2x' : '0x', grow: isDemo ? '+2.1x' : '0x', icon: 'payments' },
    ];

    return (
        <UniversityLayout universityName={displayName} pageTitle="Conversion Rate">
            <div className="p-4 md:p-6 max-w-[1400px] mx-auto w-full flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Conversion Funnel</h2>
                    <p className="text-slate-400 text-xs font-medium">Analyze student lifecycle from first view to successful enrollment.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {conversionStats.map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2b6cee] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[28px]">{stat.icon}</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                                <div className="flex items-end gap-2">
                                    <h4 className="text-2xl font-black text-slate-900 tabular-nums">{stat.value}</h4>
                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md mb-1 ${stat.grow.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                        {stat.grow}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Funnel Visualization */}
                <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-12 text-center md:text-left">Enrollment Funnel Visualization</h3>
                    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
                        {conversionFunnel.map((step) => (
                            <div key={step.label} className="relative">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{step.label}</span>
                                    <span className="text-xs font-black text-slate-900">{step.value}</span>
                                </div>
                                <div className="h-4 bg-slate-50 rounded-full overflow-hidden">
                                    <div className={`h-full ${step.color} rounded-full transition-all duration-1000`} style={{ width: step.width }} />
                                </div>
                                {step.label !== 'Enrolled' && (
                                    <div className="absolute left-1/2 -bottom-6 -translate-x-1/2">
                                        <span className="material-symbols-outlined text-slate-200">expand_more</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {isDemo ? (
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-50">
                            <div>
                                <h4 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest">Efficiency Insights</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Your current interest-to-application conversion is <span className="font-bold text-slate-900">13.8%</span>, which is <span className="text-[#2b6cee] font-bold">2.4% above average</span> for {displayName}. We recommend focusing on the "Applications Started" phase to reduce drop-offs before enrollment.
                                </p>
                            </div>
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <h4 className="text-sm font-black text-blue-600 mb-4 uppercase tracking-widest">AI Recommendation</h4>
                                <p className="text-slate-600 text-xs leading-relaxed italic">
                                    "Students who view Program Comparisons are 3x more likely to enroll. Consider adding a 'Compare Courses' feature to your institution page."
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-16 pt-12 border-t border-slate-50 text-center">
                            <p className="text-slate-400 text-sm font-medium">Conversion insights and phase breakdown will be generated once your programs receive initial student engagement.</p>
                        </div>
                    )}
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityConversion;
