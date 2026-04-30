import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';

const BASE_STUDENTS = Array.from({ length: 24 }, (_, i) => ({
    id: `EAS-${2000 + i}`,
    name: [
        'Arjun Nair', 'Sarah Peters', 'Rohan Kapoor', 'Liu Wei', 'Aman Rao',
        'Emily Dawson', 'Siddharth Mehra', 'Chloe Thompson', 'Omar Hassan', 'Elena Popa',
        'Kenji Tanaka', 'Maria Garcia', 'Fatima Aziz', 'David Miller', 'Sophie Martin',
        'Lucas Oliveira', 'Ananya Gupta', 'Maxim Volkov', 'Isabella Rossi', 'Zainab Ahmed',
        'Benjamin Lee', 'Noor Khan', 'Gabriel Santos', 'Hana Kim'
    ][i % 24],
    university: [
        'University of Manchester', 'University of Melbourne', 'Arizona State University',
        'University of Toronto', 'UBC Canada', 'NYU', 'Imperial College London',
        'University of Sydney', 'McGill University', 'Technical University of Munich',
        'University of Tokyo', 'University of Madrid', 'University of Dubai',
        'Stanford University', 'Sorbonne University', 'University of São Paulo',
        'IIT Delhi', 'Moscow State University', 'University of Rome', 'University of Cairo',
        'National University of Singapore', 'Lahore University of Management Sciences',
        'University of Lisbon', 'Seoul National University'
    ][i % 24],
    status: 'Successful',
    color: ['blue', 'orange', 'purple', 'green'][i % 4]
}));

const AssignedStudents = () => {
    const [students, setStudents] = useState(BASE_STUDENTS);

    useEffect(() => {
        // Load dynamic students from localStorage
        const savedAssigned = localStorage.getItem('assigned_students_list');
        if (savedAssigned) {
            const dynamicStudents = JSON.parse(savedAssigned);

            // Filter out any students that might already be in the BASE_STUDENTS to avoid duplicates
            const uniqueDynamic = dynamicStudents.filter(ds =>
                !BASE_STUDENTS.some(bs => bs.id === ds.id || bs.name === ds.name)
            );

            if (uniqueDynamic.length > 0) {
                // Combine and reverse so new ones appear first, or just append
                // User said "automatic added here", implies increasing count
                // Force status to "Successful" for all dynamic students
                const forcedDynamic = uniqueDynamic.map(ds => ({ ...ds, status: 'Successful' }));
                setStudents([...BASE_STUDENTS, ...forcedDynamic]);
            }
        }
    }, []);

    const statusStyles = {
        'Successful': 'bg-green-50 text-green-600 border-green-100',
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f5f7f8]">
            <PageHeader title="Assigned Students" />

            <main className="flex-1 overflow-y-auto p-4 lg:p-10 no-scrollbar">
                <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-6 md:gap-8">

                    {/* Page Title & Stats */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 animate-fade-in">
                        <div className="flex flex-col gap-0.5">
                            <h1 className="text-slate-900 text-xl md:text-3xl font-extrabold tracking-tight">Assigned Students</h1>
                            <p className="text-slate-500 text-xs md:text-base">Overview of all active student cases.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-slate-200 shadow-sm">
                                <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase mr-2">Total:</span>
                                <span className="text-slate-900 font-black text-xs md:text-sm">{students.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Students Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 animate-slide-up">
                        {students.map((student, idx) => (
                            <div key={`${student.id}-${idx}`}
                                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex flex-col p-4 md:p-6"
                                style={{ animationDelay: `${idx * 0.02}s` }}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`size-10 md:size-12 rounded-full flex items-center justify-center font-bold text-base md:text-lg ${student.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        student.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                            student.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                                'bg-green-50 text-green-600'
                                        }`}>
                                        {student.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${statusStyles['Successful']}`}>
                                        Successful
                                    </div>
                                </div>

                                <div className="flex flex-col gap-0.5 md:gap-1 mb-3 md:mb-4 flex-1">
                                    <h3 className="text-slate-900 font-bold text-base md:text-lg group-hover:text-blue-600 transition-colors truncate">{student.name}</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{student.id}</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                                        <span className="material-symbols-outlined text-[18px]">school</span>
                                        <span className="font-medium truncate">{student.university}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pb-10 text-center">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2024 EAOverseas Counsellor Portfolio Manager. All data is synchronized.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AssignedStudents;
