import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';

const SavedCourses = () => {
    const navigate = useNavigate();
    const { savedCourses, toggleCourse } = useSavedItems();

    const handleRemove = (id) => {
        const courseToRemove = savedCourses.find(c => (c.id || (c.title + c.university).toLowerCase().replace(/[^a-z0-9]+/g, '-')) === id);
        if (courseToRemove) {
            toggleCourse(courseToRemove);
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            <PageHeader title={
                <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Link to="/profile" className="md:hidden text-slate-500 hover:text-blue-600 mr-1 flex items-center">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </Link>
                    <Link to="/profile" className="hidden md:flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px] md:text-[20px]">home</span>
                    </Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <Link to="/profile" className="hidden md:block text-gray-500 hover:text-blue-600 transition-colors">
                        Profile
                    </Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <span className="text-[#111418] font-semibold">Saved Courses</span>
                </div>
            } />

            <div className="flex-1 overflow-y-auto w-full p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-[1000px] flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-[#111418]">Saved Courses ({savedCourses.length})</h1>
                        <button className="text-blue-600 text-sm font-semibold hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                            Explore More
                        </button>
                    </div>

                    {savedCourses.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {savedCourses.map((course) => (
                                <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="size-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
                                            <span className="material-symbols-outlined text-[24px]">school</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#111418] text-lg mb-1">{course.title}</h3>
                                            <p className="text-slate-600 text-sm font-medium mb-2">{course.university}</p>

                                            <div className="flex flex-wrap gap-3">
                                                <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-gray-50 px-2 py-1 rounded">
                                                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                    {course.duration}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-gray-50 px-2 py-1 rounded">
                                                    <span className="material-symbols-outlined text-[14px]">payments</span>
                                                    {course.fees}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100">
                                                    <span className="material-symbols-outlined text-[14px]">event</span>
                                                    Deadline: {course.deadline}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                                        <button
                                            onClick={() => navigate(`/course-details?title=${encodeURIComponent(course.title)}&university=${encodeURIComponent(course.university)}`, { state: { course } })}
                                            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors whitespace-nowrap"
                                        >
                                            View Course
                                        </button>
                                        <button
                                            onClick={() => handleRemove(course.id)}
                                            className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                            title="Remove from saved"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">bookmark_remove</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <div className="p-4 bg-gray-50 rounded-full mb-4">
                                <span className="material-symbols-outlined text-gray-400 text-4xl">bookmarks</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#111418] mb-1">No courses saved yet</h3>
                            <p className="text-slate-500 text-sm mb-6">Find programs that match your interests and career goals.</p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                                Browse Courses
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedCourses;
