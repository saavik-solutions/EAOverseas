import React, { useState } from 'react';
import UniversityLayout from '@/layouts/UniversityLayout';
import AddProgramModal from './AddProgramModal';
import EditProgramModal from './EditProgramModal';

interface Intake {
    id: string;
    period: string;
    startDate: string;
    endDate: string;
}

interface Program {
    id: string;
    name: string;
    level: string;
    department: string;
    duration: string;
    tuitionFee: string;
    description: string;
    academicBackground: string;
    gpaRequirement: string;
    intakeTimeline: Intake[];
    status: 'Active' | 'Draft' | 'Archived';
}

const UniversityPrograms = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditingProgram, setCurrentEditingProgram] = useState<Program | null>(null);

    const [programs, setPrograms] = useState<Program[]>([
        {
            id: 'CS-PG-2024',
            name: 'MSc Data Science',
            level: "Master's (MS)",
            department: 'Engineering & Tech',
            duration: '1 Year (Full Time)',
            tuitionFee: '£29,800 /yr',
            description: 'This MSc provides a comprehensive grounding in data science theory and practice. You will learn to design data-driven solutions...',
            academicBackground: 'BSc in Computer Science or related field',
            gpaRequirement: '3.5 or equivalent',
            intakeTimeline: [
                { id: '1', period: 'September', startDate: '2024-09-01', endDate: '2024-12-15' }
            ],
            status: 'Active'
        },
        {
            id: 'BS-EX-2024',
            name: 'Global MBA (Executive)',
            level: "Master's (MBA)",
            department: 'Business School',
            duration: '18 Months',
            tuitionFee: '$45,000 /yr',
            description: 'The Global Executive MBA is designed for experienced professionals...',
            academicBackground: 'Bachelors degree with 5+ years work experience',
            gpaRequirement: '3.0 or equivalent',
            intakeTimeline: [
                { id: '1', period: 'August', startDate: '2024-08-15', endDate: '2024-11-30' }
            ],
            status: 'Active'
        }
    ]);

    const handleAddProgram = (newProgram: Program) => {
        setPrograms(prev => [newProgram, ...prev]);
    };

    const handleUpdateProgram = (updatedProgram: Program) => {
        setPrograms(prev => prev.map(p => p.id === updatedProgram.id ? updatedProgram : p));
    };

    const handleEditClick = (program: Program) => {
        setCurrentEditingProgram(program);
        setIsEditModalOpen(true);
    };

    const filteredPrograms = programs.filter(program => {
        const matchesSearch =
            program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.id.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    const getStatusStyle = (status: Program['status']) => {
        switch (status) {
            case 'Active':
                return 'bg-emerald-500/10 text-emerald-600';
            case 'Draft':
                return 'bg-slate-100 text-slate-500';
            case 'Archived':
                return 'bg-rose-500/10 text-rose-600';
            default:
                return 'bg-slate-100 text-slate-500';
        }
    };

    const getStatusDot = (status: Program['status']) => {
        switch (status) {
            case 'Active': return 'bg-emerald-500';
            case 'Draft': return 'bg-slate-400';
            case 'Archived': return 'bg-rose-500';
            default: return 'bg-slate-400';
        }
    };

    return (
        <UniversityLayout title="University Programs Management">
            <div className="p-8 max-w-[1400px] mx-auto space-y-8 font-display">

                {/* Search and Action Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
                    <div className="relative flex-1 max-w-xl group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">search</span>
                        <input
                            className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-[20px] text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm outline-none"
                            placeholder="Search by program name, department, or level..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white text-[12px] font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 uppercase tracking-widest"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Add New Program
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.03)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Program Name</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Degree Level</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Department</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Duration</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tuition Fee</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredPrograms.length > 0 ? (
                                    filteredPrograms.map((program) => (
                                        <tr key={program.id} className="hover:bg-blue-50/30 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-[15px] font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{program.name}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {program.id}</div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-sm font-bold text-slate-600 uppercase tracking-tight">{program.level}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-sm font-medium text-slate-500 uppercase tracking-tight">{program.department}</span>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-bold text-slate-600">
                                                {program.duration}
                                            </td>
                                            <td className="px-8 py-6 text-sm font-black text-slate-900">
                                                {program.tuitionFee}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-2 ${getStatusStyle(program.status)}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(program.status)} animate-pulse`}></span>
                                                    {program.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(program)}
                                                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                        title="Edit"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <span className="material-symbols-outlined text-[48px] text-slate-200">search_off</span>
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No programs found matching your criteria</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Showing {filteredPrograms.length} of {programs.length} programs
                        </p>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 transition-all disabled:opacity-50" disabled>
                                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                            </button>
                            <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 transition-all">
                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AddProgramModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddProgram}
            />

            <EditProgramModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdateProgram}
                program={currentEditingProgram}
            />
        </UniversityLayout>
    );
};

export default UniversityPrograms;
