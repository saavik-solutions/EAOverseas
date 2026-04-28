
const staticUniversities = [];

const getUniversitiesData = () => {
    const saved = localStorage.getItem('ea_universities');
    if (!saved) return staticUniversities;

    const adminUnis = JSON.parse(saved);
    const mappedAdminUnis = adminUnis.map((uni: any) => {
        // Only map if it's not already in static (by name)
        if (staticUniversities.find(s => s.name.toLowerCase() === uni.name.toLowerCase())) return null;

        const tuitionStr = uni.tuition || "$30k - $45k";
        const tuitionVal = parseInt(tuitionStr.replace(/[^0-9]/g, '')) * 1000 || 35000;
        
        return {
            id: `admin-${uni.id}`,
            name: uni.name,
            location: uni.location || `${uni.city || 'Campus'}, ${uni.country}`,
            country: uni.country,
            match: parseInt(uni.admissionChance) || 90,
            ranking: parseInt(uni.ranking?.replace(/[^0-9]/g, '')) || 100,
            tuitionVal: tuitionVal,
            image: uni.logo || null,
            tags: [
                { icon: "trophy", text: `${uni.ranking || 'Global Rank #100'}`, color: "text-blue-600" },
                { icon: "payments", text: `${tuitionStr} / year`, color: "text-gray-400" },
                { icon: "calendar_today", text: "Multiple Intakes", color: "text-gray-400" }
            ],
            stats: { 
                acceptance: uni.acceptanceRate || "85%", 
                salary: "N/A" 
            },
            budgetCategory: tuitionVal > 50000 ? "premium" : tuitionVal > 40000 ? "high" : tuitionVal > 20000 ? "medium" : "low"
        };
    }).filter(Boolean);

    return [...mappedAdminUnis, ...staticUniversities];
};

const universitiesData = getUniversitiesData();


import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useSavedItems } from '../context/SavedItemsContext';
import { useAuthAction } from '../hooks/useAuthAction';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';

const CollegeFinder = () => {
    // State
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('shortlisted');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('match_high');
    const [filters, setFilters] = useState({
        countries: ['USA', 'United Kingdom', 'Canada'],
        budgets: ['medium', 'high']
    });

    const toggleFilter = (category, value) => {
        executeAction(() => {
            setFilters(prev => {
                const current = prev[category];
                const updated = current.includes(value)
                    ? current.filter(item => item !== value)
                    : [...current, value];
                return { ...prev, [category]: updated };
            });
        });
    };

    const resetFilters = () => {
        executeAction(() => {
            setFilters({
                countries: ['USA', 'United Kingdom', 'Canada', 'Australia', 'Germany'],
                budgets: ['low', 'medium', 'high', 'premium']
            });
            setSearchQuery('');
        });
    };

    const universitiesDataDynamic = useMemo(() => {
        return getUniversitiesData();
    }, []);

    const filteredUniversities = useMemo(() => {
        let result = universitiesDataDynamic.filter(uni => {
            const matchesCountry = filters.countries.length === 0 || filters.countries.includes(uni.country);
            const matchesBudget = filters.budgets.length === 0 || filters.budgets.includes(uni.budgetCategory);
            const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                uni.location.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesView = true;
            if (currentView === 'shortlisted') {
                matchesView = uni.match >= 85;
            } else {
                matchesView = uni.match < 85;
            }

            return matchesCountry && matchesBudget && matchesSearch && matchesView;
        });

        // Sorting
        return result.sort((a, b) => {
            if (sortOption === 'ranking') return a.ranking - b.ranking;
            if (sortOption === 'tuition_low') return a.tuitionVal - b.tuitionVal;
            if (sortOption === 'match_high') return b.match - a.match;
            return 0;
        });
    }, [filters, searchQuery, sortOption, currentView]);

    const { toggleCollege, isCollegeSaved } = useSavedItems();
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { user } = useAuth();

    const handleToggleSave = (uni) => {
        executeAction(() => {
            toggleCollege(uni);
        });
    };

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const SidebarContent = () => (
        <div className="bg-white rounded-xl border border-gray-200 p-5 lg:p-6 shadow-sm sticky top-6 flex flex-col h-full md:h-auto overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl lg:text-2xl text-gray-900">Filters</h3>
                    <button onClick={resetFilters} className="text-sm lg:text-base text-blue-600 font-semibold hover:underline">Reset All</button>
                </div>

                {/* View Mode Toggle (Moved from Header) */}
                <div className="space-y-4 border-b border-gray-100 pb-6 mb-6 lg:hidden">
                    <h4 className="font-bold text-gray-900 text-base lg:text-lg">Recommendation Mode</h4>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => executeAction(() => setCurrentView('shortlisted'))}
                            className={`flex-1 py-2 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${currentView === 'shortlisted' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <span className={`material-symbols-outlined !text-[16px] ${currentView === 'shortlisted' ? 'fill-current' : ''}`}>auto_awesome</span>
                            AI Shortlisted
                        </button>
                        <button
                            onClick={() => executeAction(() => setCurrentView('explore'))}
                            className={`flex-1 py-2 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${currentView === 'explore' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <span className="material-symbols-outlined !text-[16px]">explore</span>
                            Explore All
                        </button>
                    </div>
                </div>

                {/* Mobile Sort Option */}
                <div className="lg:hidden space-y-4 border-b border-gray-100 pb-6 mb-6">
                    <h4 className="font-bold text-gray-900 text-base lg:text-lg">Sort by</h4>
                    <select
                        value={sortOption}
                        onChange={(e) => executeAction(() => setSortOption(e.target.value))}
                        className="w-full text-sm lg:text-base border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-600 focus:border-blue-600 p-2.5 bg-white shadow-sm cursor-pointer">
                        <option value="match_high">Match Score (High to Low)</option>
                        <option value="ranking">Ranking</option>
                        <option value="tuition_low">Tuition (Low to High)</option>
                    </select>
                </div>

                {/* Country Filter */}
                <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
                    <h4 className="font-bold text-gray-900 text-base lg:text-lg">Country</h4>
                    <div className="space-y-3">
                        {[...new Set(universitiesDataDynamic.map(u => u.country))].sort().map(country => (
                            <label key={country} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                                <div className={`size-5 lg:size-6 rounded border flex items-center justify-center transition-colors ${filters.countries.includes(country) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                                    {filters.countries.includes(country) && <span className="material-symbols-outlined text-white text-[16px] lg:text-[18px]">check</span>}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={filters.countries.includes(country)}
                                    onChange={() => toggleFilter('countries', country)}
                                    className="sr-only"
                                />
                                <span className="text-sm lg:text-base text-gray-700 font-medium group-hover:text-gray-900">{country}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Budget Filter */}
                <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 text-base lg:text-lg">Budget (Annual)</h4>
                    <div className="space-y-3">
                        {[
                            { label: 'Under $20k', value: 'low' },
                            { label: '$20k - $40k', value: 'medium' },
                            { label: '$40k - $60k', value: 'high' },
                            { label: 'Above $60k', value: 'premium' }
                        ].map(budget => (
                            <label key={budget.value} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                                <div className={`size-5 lg:size-6 rounded border flex items-center justify-center transition-colors ${filters.budgets.includes(budget.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                                    {filters.budgets.includes(budget.value) && <span className="material-symbols-outlined text-white text-[16px] lg:text-[18px]">check</span>}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={filters.budgets.includes(budget.value)}
                                    onChange={() => toggleFilter('budgets', budget.value)}
                                    className="sr-only"
                                />
                                <span className="text-sm lg:text-base text-gray-700 font-medium group-hover:text-gray-900">{budget.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Action Button for Mobile Drawer */}
            <div className="pt-4 mt-auto border-t border-gray-100 lg:hidden block">
                <button
                    onClick={() => executeAction(() => setIsFilterOpen(false))}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 transition-all"
                >
                    Show Results
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            {/* Header */}
            <div className="hidden lg:block">
                <PageHeader
                    title="Universities"
                    actions={
                        !user ? (
                            <button
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                                onClick={() => navigate('/landing')}
                            >
                                Enter Website
                            </button>
                        ) : null
                    }
                />
            </div>
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

            <main className="flex-1 overflow-y-auto bg-[#f8f9fc] p-6">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    {/* Search Bar */}
                    <div className="w-full flex justify-end">
                        <div className="relative w-full max-w-sm">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-[20px]">search</span>
                            <input
                                value={searchQuery}
                                onChange={(e) => executeAction(() => setSearchQuery(e.target.value))}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 placeholder-gray-400 shadow-sm"
                                placeholder="Search universities..." type="text" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="flex items-start justify-between w-full md:block md:w-auto">
                            <div className="pr-4 md:pr-0">
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Universities</h1>
                                <p className="text-gray-500 mt-1 lg:text-lg">Discover universities tailored to your academic profile.</p>
                            </div>
                            <button
                                onClick={() => executeAction(() => setIsFilterOpen(true))}
                                className="lg:hidden w-fit px-4 bg-white border border-gray-200 py-2 rounded-lg flex items-center justify-center gap-2 font-bold text-gray-900 shadow-sm text-sm shrink-0 md:mt-4"
                            >
                                <span className="material-symbols-outlined text-blue-600 !text-[20px]">filter_list</span>
                                Filter
                            </button>
                        </div>

                        {/* Desktop Recommendation Mode Toggle */}
                        <div className="hidden lg:flex bg-white border border-gray-200 p-1 rounded-lg">
                            <button
                                onClick={() => executeAction(() => setCurrentView('shortlisted'))}
                                className={`px-4 py-2 rounded-md text-xs lg:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${currentView === 'shortlisted' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                <span className={`material-symbols-outlined !text-[16px] lg:!text-[20px] ${currentView === 'shortlisted' ? 'fill-current' : ''}`}>auto_awesome</span>
                                AI Shortlisted
                            </button>
                            <button
                                onClick={() => executeAction(() => setCurrentView('explore'))}
                                className={`px-4 py-2 rounded-md text-xs lg:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${currentView === 'explore' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                <span className="material-symbols-outlined !text-[16px] lg:!text-[20px]">explore</span>
                                Explore All
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-10">
                        {/* Mobile Filter Toggle */}


                        {/* Sidebar - Desktop */}
                        <aside className="hidden lg:block lg:col-span-3 h-full">
                            <SidebarContent />
                        </aside>

                        {/* Mobile Sidebar Content (Drawer) */}
                        {isFilterOpen && (
                            <div className="fixed inset-0 z-[100] lg:hidden">
                                <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)}></div>
                                <div className="absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl p-4 animate-in slide-in-from-left duration-300 z-50">
                                    <SidebarContent />
                                </div>
                            </div>
                        )}

                        {/* List */}
                        <div className="lg:col-span-9 flex flex-col gap-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm lg:text-base text-gray-500 hidden lg:block">Showing <strong className="text-gray-900">{filteredUniversities.length}</strong> universities based on your profile</span>
                                <div className="hidden lg:flex items-center gap-2">
                                    <span className="text-xs lg:text-sm text-gray-400">Sort by:</span>
                                    <select
                                        value={sortOption}
                                        onChange={(e) => executeAction(() => setSortOption(e.target.value))}
                                        className="text-sm lg:text-base border-gray-200 rounded-lg text-gray-700 focus:ring-blue-600 focus:border-blue-600 py-1.5 pl-3 pr-8 bg-white shadow-sm cursor-pointer">
                                        <option value="match_high">Match Score (High to Low)</option>
                                        <option value="ranking">Ranking</option>
                                        <option value="tuition_low">Tuition (Low to High)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 lg:gap-4">
                                {filteredUniversities.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
                                        No universities match your filters.
                                    </div>
                                ) : (
                                    filteredUniversities.map((uni, index) => (
                                        <div
                                            key={index}
                                            onClick={() => executeAction(() => navigate(`/college-details?name=${encodeURIComponent(uni.name)}`))}
                                            className="bg-white rounded-xl border border-gray-200 p-3 lg:p-6 shadow-sm hover:border-blue-600/50 hover:shadow-md transition-all group flex flex-col sm:flex-row gap-3 lg:gap-6 cursor-pointer relative"
                                        >
                                            <div className="shrink-0 flex items-start">
                                                <div className="size-14 lg:size-28 rounded-lg border border-gray-100 bg-white p-1 flex items-center justify-center overflow-hidden">
                                                    {uni.image ? (
                                                        <div className="size-full bg-cover bg-center bg-no-repeat rounded-md" style={{ backgroundImage: `url('${uni.image}')` }}></div>
                                                    ) : (
                                                        <span className="material-symbols-outlined !text-[24px] lg:!text-[40px] text-gray-400">account_balance</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col min-w-0">
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-0.5 lg:mb-2">
                                                            <h3 className="text-base lg:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight truncate">{uni.name}</h3>
                                                            <span className="w-fit px-1.5 py-0.5 lg:px-2 lg:py-1 rounded text-[10px] lg:text-xs font-bold bg-green-100 text-green-700 border border-green-200 uppercase tracking-wide shrink-0">{uni.match}% Match</span>
                                                        </div>
                                                        <p className="text-xs lg:text-sm text-gray-500 flex items-center gap-1 truncate mb-2 lg:mb-4">
                                                            <span className="material-symbols-outlined !text-[14px] lg:!text-[18px]">location_on</span> {uni.location}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleToggleSave(uni);
                                                        }}
                                                        className={`shrink-0 transition-colors p-1.5 lg:p-2 rounded-lg hover:bg-blue-50 ${isCollegeSaved(uni) ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600'}`}
                                                        title={isCollegeSaved(uni) ? "Remove from saved" : "Save university"}
                                                    >
                                                        <span className={`material-symbols-outlined !text-[18px] lg:!text-[24px] ${isCollegeSaved(uni) ? 'filled' : ''}`}>
                                                            {isCollegeSaved(uni) ? 'bookmark' : 'bookmark_add'}
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3 lg:mb-4">
                                                    {uni.tags.map((tag, i) => (
                                                        <div key={i} className={`flex items-center gap-1 px-2 py-1 lg:px-3 lg:py-1.5 rounded bg-gray-50 border border-gray-100 ${tag.bg || ''} ${tag.border || ''}`}>
                                                            <span className={`material-symbols-outlined !text-[14px] lg:!text-[16px] ${tag.color}`}>{tag.icon}</span>
                                                            <span className="text-[10px] lg:text-xs font-medium text-gray-600 whitespace-nowrap">{tag.text}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="pt-2 lg:pt-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
                                                    <div className="flex items-center gap-3 text-[10px] lg:text-sm text-gray-500">
                                                        <span>Acceptance: <strong className="text-gray-900">{uni.stats.acceptance}</strong></span>
                                                        <span className="size-0.5 lg:size-1 bg-gray-300 rounded-full"></span>
                                                        <span>Salary: <strong className="text-gray-900">{uni.stats.salary}</strong></span>
                                                    </div>
                                                    <button
                                                        className="text-xs lg:text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-0.5 transition-colors"
                                                    >
                                                        Details <span className="material-symbols-outlined !text-[14px] lg:!text-[18px]">arrow_forward</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CollegeFinder;
