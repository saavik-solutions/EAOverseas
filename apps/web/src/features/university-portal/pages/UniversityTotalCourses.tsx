import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UniversityLayout from '@/layouts/UniversityLayout';

const UniversityTotalCourses = () => {
    const { universityName } = useParams<{ universityName: string }>();
    const navigate = useNavigate();
    const [courses, setCourses] = useState<any[]>([]);

    const universityRegistry: Record<string, any> = {
        'university-of-toronto': {
             courses: [
                { id: 1, name: 'MSc Artificial Intelligence & Data Science', level: 'Postgraduate', intakes: ['Sept 2024'], deadlines: ['Jul 15'], interest: '1,248', status: 'Active' },
                { id: 2, name: 'BEng Mechanical Engineering', level: 'Undergraduate', intakes: ['Sept 2024'], deadlines: ['Aug 01'], interest: '856', status: 'Active' },
                { id: 3, name: 'BA International Relations', level: 'Undergraduate', intakes: ['Jan 2024'], deadlines: ['Dec 10'], interest: '231', status: 'Closed' }
            ]
        },
        'kings-college-london': {
            courses: [
                { id: 1, name: 'Global Health MSc', level: 'Postgraduate', intakes: ['Sept 2024'], deadlines: ['Jun 30'], interest: '942', status: 'Active' },
                { id: 2, name: 'Law LLB', level: 'Undergraduate', intakes: ['Sept 2024'], deadlines: ['Jun 15'], interest: '2,104', status: 'Active' },
                { id: 3, name: 'Business Management BSc', level: 'Undergraduate', intakes: ['Jan 2025'], deadlines: ['Nov 30'], interest: '1,562', status: 'Active' }
            ]
        },
        'university-of-melbourne': {
            courses: [
                { id: 1, name: 'Master of Data Science', level: 'Postgraduate', intakes: ['July 2024'], deadlines: ['May 15'], interest: '512', status: 'Active' },
                { id: 2, name: 'Bachelor of Commerce', level: 'Undergraduate', intakes: ['Feb 2024'], deadlines: ['Jan 31'], interest: '842', status: 'Active' }
            ]
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('ea_universities');
        const allUnis = saved ? JSON.parse(saved) : [];
        const found = allUnis.find((u: any) => 
            u.id === Number(universityName) || 
            u.name.toLowerCase().replace(/\s+/g, '-') === universityName
        );

        if (found) {
            setCourses(Array.isArray(found.courses) ? found.courses : []);
        } else {
            const freshData = universityRegistry[universityName || ''] || { courses: [] };
            setCourses(freshData.courses);
        }
    }, [universityName]);

    const displayName = (universityName || 'University')
        .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <UniversityLayout universityName={displayName} pageTitle="Total Courses Inventory">
            <div className="p-6 md:p-8 max-w-[1200px] mx-auto w-full space-y-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 leading-tight">Total Courses Inventory</h2>
                            <p className="text-xs text-slate-400 font-medium tracking-wide">Detailed linear view of all academic programs listed by {displayName}.</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-3">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Total Active</span>
                        <span className="text-lg font-black text-blue-900">{courses.length}</span>
                    </div>
                </div>

                {/* Courses List - "Line View" */}
                <div className="space-y-4">
                    {courses.length === 0 ? (
                        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                            <span className="material-symbols-outlined text-slate-200 text-6xl mb-4">inventory_2</span>
                            <p className="text-slate-400 font-medium uppercase tracking-widest text-[10px]">No courses listed in the inventory yet</p>
                        </div>
                    ) : (
                        courses.map((course, idx) => (
                            <div 
                                key={course.id} 
                                className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
                            >
                                {/* Row Index/Number - subtle bg */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-50 group-hover:bg-blue-600 transition-all"></div>
                                
                                <div className="flex items-center gap-6 flex-1">
                                    <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                        <span className="font-black text-sm">{idx + 1}</span>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">{course.name}</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="px-2 py-0.5 bg-slate-100 text-[8px] font-black uppercase tracking-widest rounded text-slate-500">{course.level}</span>
                                            <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                            <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">group</span>
                                                {course.interest} Students Interested
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex flex-col gap-1 pr-6 border-r border-slate-50">
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Intake Available</span>
                                        <div className="flex gap-1">
                                            {(course.intakes || ['TBD']).map((intk: string) => (
                                                <span key={intk} className="text-[9px] font-bold text-slate-600 px-2 py-0.5 bg-slate-50 rounded border border-slate-100">{intk}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="px-6 border-r border-slate-50 flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${course.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{course.status}</span>
                                    </div>
                                    <button 
                                        onClick={() => navigate(`/university-panel/${universityName}/courses`)}
                                        className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                    >
                                        <span className="material-symbols-outlined">settings</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityTotalCourses;
