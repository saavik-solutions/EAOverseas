import React, { useState, useMemo } from 'react';
import { universitiesData, University } from '@/data/universities';

interface CreateUniversityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

const CreateUniversityModal: React.FC<CreateUniversityModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedUni, setSelectedUni] = React.useState<University | null>(null);
    const [isManualMode, setIsManualMode] = React.useState(!!initialData);

    const [formData, setFormData] = React.useState({
        displayName: '',
        legalName: '',
        country: '',
        city: '',
        website: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        overview: '',
        logo: '', // Official University Logo


        // Program Details
        programName: '',
        degreeLevel: '',
        programDuration: '',

        // Intake Details
        intakeMonths: [] as string[],
        applicationDeadline: '',
        seatsAvailable: '0',
    });

    React.useEffect(() => {
        if (initialData && isOpen) {
            setFormData({
                displayName: initialData.name || '',
                legalName: initialData.legalName || initialData.name || '',
                country: initialData.country || '',
                city: initialData.city || '',
                website: initialData.website || '',
                contactName: initialData.contactName || '',
                contactEmail: initialData.contactEmail || '',
                contactPhone: initialData.contactPhone || '',
                overview: initialData.about || initialData.overview || '',
                logo: initialData.logo || '',

                programName: initialData.courses?.[0]?.name || initialData.programName || '',
                degreeLevel: initialData.degreeLevel || 'Bachelor',
                programDuration: initialData.courses?.[0]?.duration || initialData.programDuration || '',
                intakeMonths: initialData.intakeMonths || [],
                applicationDeadline: initialData.courses?.[0]?.start || initialData.applicationDeadline || '',
                seatsAvailable: initialData.seatsAvailable || '0',
            });
            setSearchTerm(initialData.name || '');
            setIsManualMode(true);
        } else if (!isOpen) {
            // Reset on close if needed or handle in handleReset
        }
    }, [initialData, isOpen]);


    const handleIntakeToggle = (month: string) => {
        if (isFieldReadOnly) return;
        setFormData(prev => ({
            ...prev,
            intakeMonths: prev.intakeMonths.includes(month)
                ? prev.intakeMonths.filter(m => m !== month)
                : [...prev.intakeMonths, month]
        }));
    };

    const suggestions = useMemo(() => {
        if (!searchTerm || selectedUni || isManualMode) return [];
        return universitiesData.filter(uni =>
            uni.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);
    }, [searchTerm, selectedUni, isManualMode]);

    if (!isOpen) return null;

    const handleSelectUniversity = (uni: University) => {
        setSelectedUni(uni);
        setIsManualMode(false);
        setSearchTerm(uni.name);
        setFormData({
            ...formData,
            displayName: uni.name,
            legalName: `${uni.name} Board of Governors`,
            country: uni.country,
            city: uni.city,
            website: `https://www.${uni.name.toLowerCase().replace(/\s+/g, '')}.edu`,
            contactName: 'Dr. Sarah Mitchell',
            contactEmail: `admissions@${uni.name.toLowerCase().replace(/\s+/g, '')}.edu`,
            contactPhone: '+1 (555) 012-3456',
            overview: uni.overview,
            logo: `https://logo.clearbit.com/${uni.name.toLowerCase().replace(/\s+/g, '')}.edu`,




            // Populate with some defaults from data if possible
            programName: uni.course || '',
            degreeLevel: 'Bachelor',
            programDuration: '4 Years',
            intakeMonths: [uni.intakeType],
            applicationDeadline: '2025-01-15',
            seatsAvailable: '120',
        });
    };

    const handleManualEntry = () => {
        setIsManualMode(true);
        setSelectedUni(null);
        setSearchTerm('Add Manually');
        setFormData({
            displayName: '',
            legalName: '',
            country: '',
            city: '',
            website: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            overview: '',
            logo: '',

            programName: '',
            degreeLevel: '',
            programDuration: '',
            intakeMonths: [],
            applicationDeadline: '',
            seatsAvailable: '0',
        });
    };

    const handleReset = () => {
        setSelectedUni(null);
        setIsManualMode(false);
        setSearchTerm('');
        setFormData({
            displayName: '',
            legalName: '',
            country: '',
            city: '',
            website: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            overview: '',
            logo: '',

            programName: '',
            degreeLevel: '',
            programDuration: '',
            intakeMonths: [],
            applicationDeadline: '',
            seatsAvailable: '0',
        });
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        onSubmit({ ...formData, source: selectedUni ? 'Verified' : 'Manual' });
        onClose();
    };

    const isFieldReadOnly = !!selectedUni;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/10 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-5xl max-h-[95vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-blue-50">
                {/* Header */}
                <div className="px-8 py-6 bg-white border-b border-blue-50 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-black tracking-tight">Create University Account</h3>
                        <p className="text-black/60 text-sm mt-1">Register a new partner university with comprehensive academic details.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-300 hover:text-blue-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-white space-y-8">
                    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8 pb-4">

                        {/* 1. Select Partner University */}
                        <div className="col-span-12 bg-white rounded-3xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">1</div>
                                <h4 className="font-bold text-black">Select Partner University</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative">
                                <div className="space-y-2 relative">
                                    <label className="text-xs font-bold text-black/50 uppercase tracking-widest pl-1">Partner Database Lookup</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">search</span>
                                        <input
                                            type="text"
                                            placeholder="Search university name..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                if (selectedUni || isManualMode) {
                                                    handleReset();
                                                }
                                            }}
                                            className="w-full pl-10 pr-10 py-3 rounded-2xl border border-blue-100 bg-blue-50/10 text-sm font-medium text-black focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300"
                                        />
                                        {(selectedUni || isManualMode) && (
                                            <button type="button" onClick={handleReset} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-600">
                                                <span className="material-symbols-outlined text-sm">cancel</span>
                                            </button>
                                        )}
                                        {suggestions.length > 0 && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-blue-100 rounded-2xl shadow-2xl z-50 py-1 overflow-hidden animate-in slide-in-from-top-2">
                                                {suggestions.map(uni => (
                                                    <button
                                                        key={uni.id}
                                                        type="button"
                                                        onClick={() => handleSelectUniversity(uni)}
                                                        className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center justify-between group border-b border-blue-50 last:border-0"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-bold text-black group-hover:text-blue-600">{uni.name}</p>
                                                            <p className="text-[10px] text-black/40 font-medium uppercase tracking-tight">{uni.city}, {uni.country}</p>
                                                        </div>
                                                        <span className="material-symbols-outlined text-blue-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">verified</span>
                                                    </button>
                                                ))}
                                                <button type="button" onClick={handleManualEntry} className="w-full text-left px-4 py-3 hover:bg-blue-600 hover:text-white border-t border-blue-50 flex items-center gap-2 text-blue-600 bg-blue-50/30 transition-colors">
                                                    <span className="material-symbols-outlined text-sm">add_circle</span>
                                                    <span className="text-xs font-bold uppercase tracking-wider">Add Manually</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={`transition-all duration-500 ${selectedUni ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4 grayscale pointer-events-none'}`}>
                                    <div className="bg-blue-50/50 border border-dashed border-blue-200 rounded-2xl p-4 flex items-center gap-4">
                                        <div className="size-12 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-blue-500">{selectedUni ? 'verified' : 'account_balance'}</span>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-black leading-none">{selectedUni?.name || 'Partner Preview'}</h5>
                                            <p className="text-[10px] text-black/40 font-bold mt-1 tracking-wider uppercase">{selectedUni ? `Synced & Verified` : 'No Selection'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. University Information */}
                        <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl border border-blue-100 p-6 shadow-sm flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">2</div>
                                <h4 className="font-bold text-black">University Information</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {['displayName', 'legalName', 'country', 'city'].map((field) => (
                                    <div key={field} className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest pl-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                                        <input
                                            type="text"
                                            value={(formData as any)[field]}
                                            readOnly={isFieldReadOnly}
                                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none ${isFieldReadOnly ? 'bg-blue-50/30 text-black border-blue-50 font-semibold' : 'bg-white text-black border-blue-100 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600'}`}
                                        />
                                    </div>
                                ))}
                                <div className="col-span-2 space-y-1.5 pt-2 border-t border-slate-50 mt-2">
                                    <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest pl-1">Official University Logo</label>
                                    <div className="flex items-center gap-4 p-3 bg-blue-50/20 rounded-2xl border border-dashed border-blue-100 group transition-all hover:border-blue-300">
                                        <div className="size-16 rounded-xl bg-white border border-blue-50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm transition-all group-hover:scale-105">
                                            {formData.logo ? (
                                                <img src={formData.logo} alt="Logo Preview" className="h-full w-full object-contain" />
                                            ) : (
                                                <span className="material-symbols-outlined text-blue-200 text-3xl">account_balance</span>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="file"
                                                    id="university-logo-upload"
                                                    accept="image/*"
                                                    className="hidden"
                                                    disabled={isFieldReadOnly}
                                                    onChange={handleLogoUpload}
                                                />
                                                <label
                                                    htmlFor="university-logo-upload"
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border shadow-sm ${isFieldReadOnly ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed' : 'bg-white border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-95'}`}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">{formData.logo ? 'sync' : 'upload'}</span>
                                                    {formData.logo ? 'Change Logo' : 'Upload Official Logo'}
                                                </label>
                                                {formData.logo && !isFieldReadOnly && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, logo: '' })}
                                                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-[9px] text-slate-400 font-medium px-2 italic">Support: JPG, PNG. Recommended: Square ratio, visible to everyone.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* 3. Primary Contact */}
                        <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl border border-blue-100 p-6 shadow-sm flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">3</div>
                                <h4 className="font-bold text-black">Primary Contact</h4>
                            </div>
                            <div className="space-y-4">
                                {['contactName', 'contactEmail', 'contactPhone'].map((field) => (
                                    <div key={field} className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest pl-1">{field.replace('contact', '')}</label>
                                        <input
                                            type={field === 'contactEmail' ? 'email' : 'text'}
                                            value={(formData as any)[field]}
                                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-blue-100 text-sm text-black focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. University Overview */}
                        <div className="col-span-12 bg-white rounded-3xl border border-blue-100 p-6 shadow-sm flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">4</div>
                                <h4 className="font-bold text-black">University Overview</h4>
                            </div>
                            <textarea
                                className={`w-full h-32 px-4 py-4 rounded-2xl border text-sm transition-all outline-none resize-none ${isFieldReadOnly ? 'bg-blue-50/10 text-black border-blue-50 leading-relaxed font-medium' : 'bg-white text-black border-blue-100 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600'}`}
                                placeholder="Write institutional biography..."
                                value={formData.overview}
                                readOnly={isFieldReadOnly}
                                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                            />
                        </div>

                        <div className="col-span-12 space-y-8">
                            {/* 5. Program Details */}
                            <div className="bg-white rounded-3xl border border-blue-100 p-8 shadow-sm flex flex-col gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">5</div>
                                    <h4 className="font-bold text-black">Program Details</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest pl-1">Program Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. BSc Computer Science"
                                            value={formData.programName}
                                            readOnly={isFieldReadOnly}
                                            onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${isFieldReadOnly ? 'bg-blue-50/30' : 'focus:border-blue-600 focus:ring-4 focus:ring-blue-100'}`}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest pl-1">Degree Level</label>
                                        <select
                                            value={formData.degreeLevel}
                                            disabled={isFieldReadOnly}
                                            onChange={(e) => setFormData({ ...formData, degreeLevel: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none"
                                        >
                                            <option value="">Select Degree</option>
                                            <option>Bachelor</option>
                                            <option>Master</option>
                                            <option>PhD</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest pl-1">Program Duration</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 2 years"
                                            value={formData.programDuration}
                                            readOnly={isFieldReadOnly}
                                            onChange={(e) => setFormData({ ...formData, programDuration: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 6. Intake Details */}
                            <div className="bg-white rounded-3xl border border-blue-100 p-8 shadow-sm flex flex-col gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">6</div>
                                    <h4 className="font-bold text-black">Intake Details</h4>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest pl-1">Intake Months</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['January', 'May', 'September'].map(month => (
                                                <button
                                                    key={month}
                                                    type="button"
                                                    onClick={() => handleIntakeToggle(month)}
                                                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${formData.intakeMonths.includes(month) ? 'bg-blue-900/80 text-white shadow-lg' : 'bg-white border border-slate-200 text-black hover:border-blue-600'}`}
                                                >
                                                    {month}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest pl-1">Application Deadline</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={formData.applicationDeadline}
                                                    readOnly={isFieldReadOnly}
                                                    onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest pl-1">Seats Available</label>
                                            <input
                                                type="number"
                                                value={formData.seatsAvailable}
                                                readOnly={isFieldReadOnly}
                                                onChange={(e) => setFormData({ ...formData, seatsAvailable: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-white border-t border-blue-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-400 text-[20px]">verified_user</span>
                        <p className="text-[10px] text-black/50 font-bold uppercase tracking-widest">Academic vetting system active</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={onClose} className="px-8 py-3 rounded-2xl border border-blue-100 font-bold text-black/40 text-sm hover:bg-blue-50 hover:text-blue-700 transition-all active:scale-[0.98]">Cancel</button>
                        <button onClick={handleSubmit} className="px-10 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 active:scale-[0.98]">
                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            Save University Program
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUniversityModal;
