import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';

interface ScholarshipData {
    id: string;
    title: string;
    status: string;
    statusColor: string;
    coverage: string;
    requirement: string;
    deadline: string;
    applicants: number;
    avgGpa: string;
    maxAvailable: string;
    avatars: string[];
    extraApplicants: string;
    analyticsData: any[];
    institution?: string;
    logo?: string;
}

interface AddScholarshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (scholarship: ScholarshipData) => void;
}

const VALID_COUNTRIES = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'India', 'Japan', 'China', 'Brazil', 'Global', 'EU'
];

const COMMON_PROGRAMS = [
    'Engineering', 'Computer Science', 'Humanities', 'Business Administration',
    'Data Science', 'Fine Arts', 'Medical Sciences', 'Social Work'
];

const AddScholarshipModal: React.FC<AddScholarshipModalProps> = ({ isOpen, onClose, onAdd }) => {
    if (!isOpen) return null;

    // Form State
    const [name, setName] = useState('');
    const [type, setType] = useState('Merit-based');
    const [coverage, setCoverage] = useState('100');
    const [minGpa, setMinGpa] = useState('');
    const [deadline, setDeadline] = useState('');
    const [maxAvailable, setMaxAvailable] = useState('50');

    // Target Regions State
    const [selectedRegions, setSelectedRegions] = useState<string[]>(['Global', 'EU']);
    const [regionSearch, setRegionSearch] = useState('');
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
    const regionRef = useRef<HTMLDivElement>(null);

    // Eligible Programs State
    const [selectedPrograms, setSelectedPrograms] = useState<string[]>(['Engineering']);
    const [programInput, setProgramInput] = useState('');

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
                setIsRegionDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAddRegion = (region: string) => {
        if (!selectedRegions.includes(region)) {
            setSelectedRegions([...selectedRegions, region]);
        }
        setRegionSearch('');
        setIsRegionDropdownOpen(false);
    };

    const handleRemoveRegion = (region: string) => {
        setSelectedRegions(selectedRegions.filter(r => r !== region));
    };

    const handleToggleProgram = (program: string) => {
        if (selectedPrograms.includes(program)) {
            setSelectedPrograms(selectedPrograms.filter(p => p !== program));
        } else {
            setSelectedPrograms([...selectedPrograms, program]);
        }
    };

    const handleManualProgramAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const program = programInput.trim();
            if (program && !selectedPrograms.includes(program)) {
                setSelectedPrograms([...selectedPrograms, program]);
                setProgramInput('');
            }
        }
    };

    const handleRemoveProgram = (program: string) => {
        setSelectedPrograms(selectedPrograms.filter(p => p !== program));
    };

    const filteredCountries = VALID_COUNTRIES.filter(c =>
        c.toLowerCase().includes(regionSearch.toLowerCase()) && !selectedRegions.includes(c)
    );

    const { user } = useAuth();

    const handleSubmit = () => {
        if (!name) {
            alert('Please enter a scholarship name');
            return;
        }

        // Map type to something useful or just use it as is
        const newScholarship: ScholarshipData = {
            id: Math.random().toString(36).substr(2, 9),
            title: name,
            status: 'Active',
            statusColor: 'bg-emerald-100 text-emerald-700',
            coverage: `${coverage}% Tuition`,
            requirement: `GPA: ${minGpa || '3.5'}+ Min.`,
            deadline: deadline ? new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Not Set',
            applicants: 0,
            avgGpa: '0.0',
            maxAvailable: maxAvailable || '50',
            avatars: [],
            extraApplicants: '0 Applicants',
            analyticsData: [],
            institution: user?.university || 'University of Toronto',
            logo: (user as any)?.logo || 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png'
        };

        onAdd(newScholarship);
        onClose();

        // Reset form
        setName('');
        setCoverage('100');
        setMinGpa('');
        setDeadline('');
        setSelectedPrograms(['Engineering']);
        setSelectedRegions(['Global', 'EU']);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
            <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto font-['Public_Sans'] animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all z-10"
                >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                </button>

                <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="mb-8">
                        <nav className="flex text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                            <span className="hover:text-[#1E63F3] cursor-pointer">Scholarships</span>
                            <span className="mx-2 opacity-30">/</span>
                            <span className="text-slate-900">Add New Scholarship</span>
                        </nav>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none mb-3">Create New Scholarship</h2>
                        <p className="text-slate-500 font-medium">Configure your scholarship details and eligibility requirements.</p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-8">
                        {/* Main Form Content */}
                        <div className="space-y-8">
                            {/* Section 1: Basic Info */}
                            <section className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8 transition-all hover:shadow-lg hover:shadow-slate-100/50">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-blue-100/50 p-2.5 rounded-2xl text-[#1E63F3]">
                                        <span className="material-symbols-outlined text-[20px]">info</span>
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Section 1: Basic Info</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 px-1">Scholarship Name</label>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full rounded-2xl border-slate-200 bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#1E63F3] transition-all py-3.5 px-5 font-semibold text-slate-700 placeholder:text-slate-300"
                                            placeholder="e.g. Excellence in Engineering 2024"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 px-1">Scholarship Type</label>
                                        <select
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            className="w-full rounded-2xl border-slate-200 bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#1E63F3] transition-all py-3.5 px-5 font-semibold text-slate-700"
                                        >
                                            <option>Merit-based</option>
                                            <option>Need-based</option>
                                            <option>Research</option>
                                            <option>International</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 px-1">Coverage (%)</label>
                                        <div className="relative">
                                            <input
                                                value={coverage}
                                                onChange={(e) => setCoverage(e.target.value)}
                                                className="w-full rounded-2xl border-slate-200 bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#1E63F3] transition-all py-3.5 px-5 font-bold text-slate-700 pr-12"
                                                type="number"
                                            />
                                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm">%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 2: Eligibility */}
                            <section className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8 transition-all hover:shadow-lg hover:shadow-slate-100/50">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-blue-100/50 p-2.5 rounded-2xl text-[#1E63F3]">
                                        <span className="material-symbols-outlined text-[20px]">verified</span>
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Section 2: Eligibility</h3>
                                </div>
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 px-1">Minimum GPA</label>
                                            <input
                                                value={minGpa}
                                                onChange={(e) => setMinGpa(e.target.value)}
                                                className="w-full rounded-2xl border-slate-200 bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#1E63F3] transition-all py-3.5 px-5 font-semibold text-slate-700"
                                                placeholder="3.5 / 4.0"
                                                type="text"
                                            />
                                        </div>
                                        <div className="relative" ref={regionRef}>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 px-1">Target Regions</label>
                                            <div className="flex flex-wrap gap-2 p-2.5 border border-slate-200 rounded-2xl bg-white min-h-[54px] items-center">
                                                {selectedRegions.map(region => (
                                                    <span key={region} className="bg-[#1E63F3] text-white text-[9px] px-3 py-1.5 rounded-xl font-black tracking-widest uppercase flex items-center gap-2 shadow-sm shadow-blue-100">
                                                        {region}
                                                        <button
                                                            onClick={() => handleRemoveRegion(region)}
                                                            className="material-symbols-outlined text-[14px] hover:text-red-200 transition-colors"
                                                        >close</button>
                                                    </span>
                                                ))}
                                                <div className="relative flex-1 min-w-[100px]">
                                                    <input
                                                        type="text"
                                                        value={regionSearch}
                                                        onChange={(e) => {
                                                            setRegionSearch(e.target.value);
                                                            setIsRegionDropdownOpen(true);
                                                        }}
                                                        onFocus={() => setIsRegionDropdownOpen(true)}
                                                        placeholder="+ Add Region"
                                                        className="w-full border-none focus:ring-0 text-[10px] text-[#1E63F3] font-black uppercase tracking-widest placeholder:text-[#1E63F3]/50 bg-transparent p-0"
                                                    />

                                                    {isRegionDropdownOpen && (regionSearch || filteredCountries.length > 0) && (
                                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 max-h-48 overflow-y-auto py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                                            {filteredCountries.length > 0 ? (
                                                                filteredCountries.map(country => (
                                                                    <button
                                                                        key={country}
                                                                        onClick={() => handleAddRegion(country)}
                                                                        className="w-full text-left px-5 py-2.5 text-[10px] font-black text-slate-600 hover:bg-blue-50 hover:text-[#1E63F3] transition-colors uppercase tracking-widest"
                                                                    >
                                                                        {country}
                                                                    </button>
                                                                ))
                                                            ) : (
                                                                <div className="px-5 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                                                                    No matches found
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3.5 px-1">Eligible Programs</label>
                                        <div className="space-y-6">
                                            {/* Common Programs Checkboxes */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {COMMON_PROGRAMS.map((program) => (
                                                    <label
                                                        key={program}
                                                        className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer group ${selectedPrograms.includes(program) ? 'border-[#1E63F3] bg-blue-50/50 shadow-md shadow-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                                                    >
                                                        <div className="relative flex items-center justify-center">
                                                            <input
                                                                checked={selectedPrograms.includes(program)}
                                                                onChange={() => handleToggleProgram(program)}
                                                                className="peer h-5 w-5 rounded-lg border-slate-200 text-[#1E63F3] accent-[#1E63F3] focus:ring-[#1E63F3]/20 transition-all cursor-pointer"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className={`text-xs font-black uppercase tracking-tight ${selectedPrograms.includes(program) ? 'text-slate-900' : 'text-slate-500'}`}>{program}</span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>

                                            {/* Manual Entry */}
                                            <div className="pt-2 border-t border-slate-100">
                                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Other Program / Custom Entry</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={programInput}
                                                        onChange={(e) => setProgramInput(e.target.value)}
                                                        onKeyDown={handleManualProgramAdd}
                                                        placeholder="Type program name and press Enter (e.g. Artificial Intelligence)"
                                                        className="w-full rounded-2xl border-slate-200 bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#1E63F3] transition-all py-3.5 px-5 font-semibold text-slate-700 placeholder:text-slate-300"
                                                    />
                                                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                                        <span className="material-symbols-outlined text-slate-300 text-[18px]">keyboard_return</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Selected Programs List (Tags) */}
                                            {selectedPrograms.length > 0 && (
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {selectedPrograms.map(program => (
                                                        <div key={program} className="flex items-center gap-2 bg-slate-100 text-slate-700 text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border border-slate-200/50">
                                                            {program}
                                                            <button
                                                                onClick={() => handleRemoveProgram(program)}
                                                                className="material-symbols-outlined text-[14px] hover:text-red-500 transition-colors"
                                                            >close</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 3: Settings */}
                            <section className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8 transition-all hover:shadow-lg hover:shadow-slate-100/50">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-blue-100/50 p-2.5 rounded-2xl text-[#1E63F3]">
                                        <span className="material-symbols-outlined text-[20px]">settings</span>
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Section 3: Settings</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 px-1">Application Deadline</label>
                                        <div className="relative group/date">
                                            <input
                                                value={deadline}
                                                onChange={(e) => setDeadline(e.target.value)}
                                                className="w-full rounded-2xl border-slate-200 bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#1E63F3] transition-all py-3.5 px-5 font-bold text-slate-700 cursor-pointer"
                                                type="date"
                                            />
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                                                <div className="w-[1px] h-4 bg-slate-100 mr-3"></div>
                                                <div className="bg-blue-50/50 p-1.5 rounded-lg text-[#1E63F3] border border-blue-100/50 transition-transform group-hover/date:scale-110">
                                                    <span className="material-symbols-outlined text-[18px] block">calendar_month</span>
                                                </div>
                                            </div>
                                            <style>{`
                                                input[type="date"]::-webkit-calendar-picker-indicator {
                                                    position: absolute;
                                                    right: 12px;
                                                    top: 0;
                                                    width: 40px;
                                                    height: 100%;
                                                    margin: 0;
                                                    padding: 0;
                                                    cursor: pointer;
                                                    opacity: 0;
                                                }
                                            `}</style>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 px-1">Max Available</label>
                                        <input
                                            value={maxAvailable}
                                            onChange={(e) => setMaxAvailable(e.target.value)}
                                            className="w-full rounded-2xl border-slate-200 bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#1E63F3] transition-all py-3.5 px-5 font-bold text-slate-700"
                                            placeholder="50"
                                            type="number"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end pt-6">
                                <button
                                    onClick={handleSubmit}
                                    className="px-12 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] bg-[#1E63F3] text-white shadow-xl shadow-blue-200 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Create Scholarship
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddScholarshipModal;
