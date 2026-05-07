import React, { useState } from 'react';

interface Intake {
    id: string;
    period: string;
    startDate: string;
    endDate: string;
}

interface AddProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (program: any) => void;
}

const AddProgramModal: React.FC<AddProgramModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        level: "Master's (MS)",
        department: 'Engineering & Tech',
        duration: '',
        tuitionFee: '',
        description: '',
        academicBackground: '',
        gpaRequirement: '',
        intake_period: 'September',
        intake_start: '',
        intake_end: '',
        status: 'Active' as const
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const intakeTimeline: Intake[] = [];
        if (formData.intake_start || formData.intake_end) {
            intakeTimeline.push({
                id: '1',
                period: formData.intake_period,
                startDate: formData.intake_start,
                endDate: formData.intake_end
            });
        }

        const newProgram = {
            id: `${formData.name.substring(0, 3).toUpperCase()}-${formData.level.substring(0, 2).toUpperCase()}-${new Date().getFullYear()}`,
            name: formData.name,
            level: formData.level,
            department: formData.department,
            duration: formData.duration,
            tuitionFee: `$${formData.tuitionFee} /yr`,
            description: formData.description,
            academicBackground: formData.academicBackground,
            gpaRequirement: formData.gpaRequirement,
            intakeTimeline,
            status: formData.status
        };

        onAdd(newProgram);
        onClose();

        // Reset form
        setFormData({
            name: '',
            level: "Master's (MS)",
            department: 'Engineering & Tech',
            duration: '',
            tuitionFee: '',
            description: '',
            academicBackground: '',
            gpaRequirement: '',
            intake_period: 'September',
            intake_start: '',
            intake_end: '',
            status: 'Active'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-500/10 backdrop-blur-[2px] animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[32px] shadow-[0_30px_100px_rgba(30,99,243,0.15)] border border-blue-100 animate-in slide-in-from-bottom-8 duration-500 font-display relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg transition-all z-20 group"
                >
                    <span className="material-symbols-outlined text-[24px] group-hover:rotate-90 transition-transform duration-300">close</span>
                </button>

                <div className="p-8 md:p-12">
                    <div className="flex flex-col gap-3 mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200/50">
                                <span className="material-symbols-outlined text-[28px]">school</span>
                            </div>
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">New Offering</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                            Add New Program
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info Section */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Basic Information</h3>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Program Name</label>
                                <input
                                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                    placeholder="e.g. MSc Data Science"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Degree Level</label>
                                    <select
                                        className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    >
                                        <option>Master's (MS)</option>
                                        <option>Master's (MBA)</option>
                                        <option>Undergraduate (BS)</option>
                                        <option>Undergraduate (LLB)</option>
                                        <option>PHD</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                                    <select
                                        className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    >
                                        <option>Engineering & Tech</option>
                                        <option>Business School</option>
                                        <option>Medicine & Health</option>
                                        <option>Law School</option>
                                        <option>Arts & Design</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                                    <input
                                        className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                        placeholder="e.g. 1 Year (FT)"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tuition (USD/yr)</label>
                                    <input
                                        className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                        placeholder="e.g. 35000"
                                        value={formData.tuitionFee}
                                        onChange={(e) => setFormData({ ...formData, tuitionFee: e.target.value })}
                                        required
                                        type="number"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course Overview</label>
                                <textarea
                                    className="min-h-[120px] rounded-xl border-slate-100 bg-slate-50/50 p-4 text-sm font-medium focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200 resize-none"
                                    placeholder="Describe the program objectives and core curriculum..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Eligibility Section */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Eligibility & Prerequisites</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Background</label>
                                    <input
                                        className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                        placeholder="e.g. BSc in Computer Science"
                                        value={formData.academicBackground}
                                        onChange={(e) => setFormData({ ...formData, academicBackground: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">GPA Requirement</label>
                                    <input
                                        className="h-12 rounded-xl border-slate-100 bg-slate-50/50 px-4 text-sm font-bold focus:border-blue-500 focus:ring-0 focus:bg-white transition-all outline-none border hover:border-blue-200"
                                        placeholder="e.g. 3.5 or equivalent"
                                        value={formData.gpaRequirement}
                                        onChange={(e) => setFormData({ ...formData, gpaRequirement: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Intake Timeline */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Intake Timeline</h3>
                            <div className="ring-1 ring-slate-100 p-8 rounded-2xl bg-slate-50/30">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    <div className="flex flex-col gap-2 min-w-[200px]">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Intake Period</label>
                                        <select
                                            className="h-11 rounded-xl border-slate-100 bg-white px-4 text-sm font-bold focus:border-blue-500 transition-all outline-none border uppercase tracking-tight cursor-pointer hover:border-blue-200"
                                            value={formData.intake_period}
                                            onChange={(e) => setFormData({ ...formData, intake_period: e.target.value })}
                                            required
                                        >
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </select>
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                                            <input
                                                className="h-11 rounded-xl border-slate-100 bg-white px-4 text-sm font-bold focus:border-blue-500 transition-all outline-none border"
                                                type="date"
                                                value={formData.intake_start}
                                                onChange={(e) => setFormData({ ...formData, intake_start: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                                            <input
                                                className="h-11 rounded-xl border-slate-100 bg-white px-4 text-sm font-bold focus:border-blue-500 transition-all outline-none border"
                                                type="date"
                                                value={formData.intake_end}
                                                onChange={(e) => setFormData({ ...formData, intake_end: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                className="w-full py-5 rounded-2xl bg-blue-600 text-white text-[12px] font-black uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-200"
                            >
                                Publish Academic Program
                                <span className="material-symbols-outlined text-[20px]">verified</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProgramModal;
