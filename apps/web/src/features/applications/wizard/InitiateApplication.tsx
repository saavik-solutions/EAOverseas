import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const InitiateApplication = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const uniName = searchParams.get('name') || "Arizona State University";

    const [selectedCourse, setSelectedCourse] = useState('ms-cs');

    const handleProceed = () => {
        if (!selectedCourse) {
            alert("Please select a course to proceed.");
            return;
        }
        const courseObj = courses.find(c => c.id === selectedCourse);
        // Navigate to Personal Details with course info
        navigate(`/application/details?name=${encodeURIComponent(uniName)}&title=${encodeURIComponent(courseObj.name)}&course=${selectedCourse}`);
    };

    const courses = [
        {
            id: 'ms-cs',
            name: 'MS in Computer Science',
            school: 'Ira A. Fulton Schools of Engineering',
            term: 'Fall 2024',
            match: 'High Match',
            matchColor: 'bg-green-100 text-green-700'
        },
        {
            id: 'ms-ds',
            name: 'Master of Data Science',
            school: 'School of Computing',
            term: 'Fall 2024',
            match: 'High Match',
            matchColor: 'bg-green-50 text-green-700 border border-green-100'
        },
        {
            id: 'mba',
            name: 'MBA (Business Analytics)',
            school: 'W. P. Carey School of Business',
            term: 'Spring 2025',
            match: 'Med Match',
            matchColor: 'bg-orange-50 text-orange-700 border border-orange-100'
        }
    ];

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-background-light">
            <header className="h-16 border-b border-gray-200 bg-surface flex items-center justify-between px-6 shrink-0 z-10">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Link to="/" className="hover:text-primary transition-colors">
                        <span className="material-symbols-outlined !text-[18px]">home</span>
                    </Link>
                    <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                    <Link to="/colleges" className="hover:text-gray-900 cursor-pointer transition-colors">Universities</Link>
                    <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                    <span className="hover:text-gray-900 cursor-pointer transition-colors">{uniName}</span>
                    <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                    <span className="text-gray-900 font-medium">Initiate Application</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden lg:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-[20px]">search</span>
                        <input
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-64 placeholder-gray-400"
                            placeholder="Search within university..." type="text" />
                    </div>
                    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto bg-background-light p-6 flex items-start justify-center pt-10">
                <div className="w-full max-w-2xl bg-surface rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
                    <div className="p-8 pb-6 border-b border-gray-100 flex items-start gap-5">
                        <div className="size-16 rounded-lg border border-gray-200 bg-white p-2 shrink-0 flex items-center justify-center">
                            <div className="size-full bg-contain bg-center bg-no-repeat"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUdzt3vabnFKzx_oJmfKMYvm9OPQf8tRgWs_Dw85RU5_1SoBwHcAF4l8viDzOlp9uijwjvga0QXKCFwqRvbuJRjcNHvS7c5gVRPiVSZYDft5sEn1XWQmJKkl8649GeMqM69ZuGFUOv3tb0Yh2PBOFSDrcaTF95DgWInD5SDa7HYpjy5Nr0V2UgrCDtR8CmFi2U73PRjLtm5I81RCn5NrZhTv3QdR-atqwiDrwYD8BxuM37Uk3vLwjpAgO1NVEo2PnzPZTwXuuBFQ2Y')" }}>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Initiate Application</h2>
                            <p className="text-sm text-gray-500 mt-1">You are about to start an application for <span className="font-semibold text-gray-900">{uniName}</span>. Please confirm your course selection below to proceed.</p>
                        </div>
                    </div>
                    <div className="p-8 pt-6 space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-semibold text-gray-900">Select Course</label>
                                <a className="text-xs text-primary hover:underline" href="#">View all eligible courses</a>
                            </div>
                            <div className="space-y-3">
                                {courses.map(course => (
                                    <label
                                        key={course.id}
                                        className={`relative flex items-start p-4 cursor-pointer rounded-lg transition-all ${selectedCourse === course.id
                                            ? 'border-2 border-blue-600 bg-blue-50 shadow-sm'
                                            : 'border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex h-5 items-center">
                                            <input
                                                type="radio"
                                                name="course-selection"
                                                checked={selectedCourse === course.id}
                                                onChange={() => setSelectedCourse(course.id)}
                                                className="size-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="block text-sm font-semibold text-gray-900">{course.name}</span>
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${course.matchColor}`}>
                                                    {course.match}
                                                </span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                                <span>{course.school}</span>
                                                <span className="size-1 rounded-full bg-gray-300"></span>
                                                <span className="font-medium text-gray-700">{course.term}</span>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 flex gap-3 items-start">
                            <span className="material-symbols-outlined text-primary !text-[20px] mt-0.5">info</span>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">Application Note</h4>
                                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                    Proceeding will create a draft application in your profile. You can save your progress at any time and resume later. An application fee of <strong>$115</strong> will be required upon final submission.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="px-8 py-5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                        <button
                            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                            onClick={() => navigate(-1)}>
                            Back to College Details
                        </button>
                        <div className="flex gap-3">
                            <button
                                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleProceed}
                                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg flex items-center gap-2">
                                Proceed to Application
                                <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InitiateApplication;
