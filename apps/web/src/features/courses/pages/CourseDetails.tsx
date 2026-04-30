import React, { useMemo } from 'react';
import { useSearchParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';
import { useNotification } from '@/features/notifications/context/NotificationContext';
import { useAuthAction } from '@/hooks/useAuthAction';
import LoginModal from '@/features/auth/components/LoginModal';

const CourseDetails = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const courseTitle = searchParams.get('title');
    const universityName = searchParams.get('university');

    // Add auth action hook
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const stateCourse = location.state?.course;

    // Mock Data - In a real app, this would come from an API or shared context
    // Merging recommendedCourses and allCourses from Courses.jsx structure
    const coursesDB = [
        {
            title: "MS in Computer Science",
            university: "Arizona State University",
            location: "Tempe, Arizona, USA",
            match: 98,
            duration: "2 Years",
            tuition: "$32,000 / year",
            intake: "August 2024",
            intakeStatus: "Open",
            deadline: "Dec 15, 2023",
            desc: "The MS in Computer Science at ASU offers a curriculum grounded in the fundamentals of computer science while providing the flexibility to tailor your degree to your interests. Areas of study include artificial intelligence, cybersecurity, big data, and software engineering. You will engage in cutting-edge research and gain practical skills highly valued by top tech employers.",
            career: ["Software Engineer", "Systems Architect", "AI Specialist", "Full Stack Developer", "Research Scientist"],
            type: "Masters Degree",
            field: "Computer Science"
        },
        {
            title: "Master of Data Science",
            university: "Arizona State University",
            location: "Tempe, Arizona, USA",
            match: 95,
            duration: "1.5 Years",
            tuition: "$35,500 / year",
            intake: "August 2024",
            intakeStatus: "Open",
            deadline: "Dec 15, 2023",
            desc: "The Master of Data Science program prepares you for advanced careers in data analytics. The curriculum covers statistical modeling, machine learning, data visualization, and big data management. You will work on real-world projects, learning to extract actionable insights from complex datasets.",
            career: ["Data Scientist", "Data Analyst", "Machine Learning Engineer", "Business Intelligence Analyst"],
            type: "Masters Degree",
            field: "Data Science"
        },
        {
            title: "MBA (Business Analytics)",
            university: "Arizona State University",
            location: "Tempe, Arizona, USA",
            match: 85,
            duration: "2 Years",
            tuition: "$52,000 / year",
            intake: "January 2025",
            intakeStatus: "Upcoming",
            deadline: "Sep 01, 2024",
            desc: "The MBA with a concentration in Business Analytics combines core business administration training with specialized skills in data analysis. You will learn to use data to drive strategic business decisions, optimize operations, and predict market trends. This program is ideal for professionals looking to bridge the gap between business and technology.",
            career: ["Business Analyst", "Marketing Analyst", "Operations Manager", "Strategy Consultant", "Product Manager"],
            type: "Masters Degree",
            field: "Business"
        },
        {
            title: "MSc Data Science",
            university: "University of Bristol, United Kingdom",
            location: "Bristol, UK",
            match: 85,
            duration: "1 Year (Full Time)",
            tuition: "£29,800 / year",
            intake: "September 2024",
            intakeStatus: "Open",
            deadline: "July 31, 2024",
            desc: "This MSc provides a comprehensive grounding in data science theory and practice. You will learn to design data-driven solutions, master statistical analysis, and gain hands-on experience with big data technologies like Hadoop and Spark. Industry-relevant projects are core to the curriculum.",
            career: ["Data Analyst", "ML Engineer", "BI Developer", "Data Scientist", "AI Researcher"],
            type: "Masters Degree",
            field: "Computer Science"
        },
        {
            title: "Generic Course",
            university: "Generic University",
            location: "Unknown",
            match: 85,
            duration: "Varies",
            tuition: "Varies",
            intake: "Rolling",
            deadline: "Open",
            desc: "This is a placeholder for courses not explicitly defined in the mock database.",
            career: ["Professional Role"],
            type: "Degree",
            field: "Field of Study"
        }
    ];

    const similarCourses = [
        { uni: "University of Bristol", loc: "United Kingdom", intake: "Sep 2024", tuition: "£28,500", match: 95, matchLabel: "High Match", logo: "school" },
        { uni: "University of Toronto", loc: "Canada", intake: "Jan 2025", tuition: "$42,000", match: 88, matchLabel: "High Match", logo: "account_balance" },
        { uni: "University of Melbourne", loc: "Australia", intake: "Feb 2025", tuition: "$45,000", match: 75, matchLabel: "Med Match", logo: "apartment" },
        { uni: "National University of Singapore", loc: "Singapore", intake: "Aug 2024", tuition: "$35,000", match: 92, matchLabel: "High Match", logo: "menu_book" },
        { uni: "New York University", loc: "USA", intake: "Sep 2024", tuition: "$58,000", match: 60, matchLabel: "Low Match", logo: "local_library" },
        { uni: "University of Amsterdam", loc: "Netherlands", intake: "Sep 2024", tuition: "€18,000", match: 82, matchLabel: "High Match", logo: "history_edu" },
    ];

    const course = useMemo(() => {
        // 1. Use State Data if available (from SavedCourses)
        if (stateCourse) {
            // Attempt to merge with DB data if possible for richer details
            const foundInDB = coursesDB.find(c => c.title === stateCourse.title && c.university === stateCourse.university);
            if (foundInDB) return foundInDB;

            // Otherwise return state data with defaults
            return {
                title: stateCourse.title,
                university: stateCourse.university,
                location: "Location Unknown",
                match: 0,
                duration: stateCourse.duration || "N/A",
                tuition: stateCourse.fees || "N/A",
                intake: "Rolling",
                intakeStatus: "Open",
                deadline: stateCourse.deadline || "Varies",
                desc: "Course details are being updated.",
                career: [],
                type: "Course",
                field: "General"
            };
        }

        if (!courseTitle) return coursesDB[0]; // Default to first if no param

        // 2. Try Exact Match First
        const foundExact = coursesDB.find(c =>
            c.title === courseTitle &&
            (universityName && c.university === universityName)
        );
        if (foundExact) return foundExact;

        // 3. Fallback: Find Course Base Info (for desc/career)
        // and overlay University details from similarCourses or URL
        const courseBase = coursesDB.find(c => c.title === courseTitle) || coursesDB[0];
        const similarUni = similarCourses.find(s => s.uni === universityName);

        if (universityName) {
            return {
                ...courseBase,
                title: courseTitle,
                university: universityName,
                // Use data from similarCourses if available, else fallback or keep original
                location: similarUni ? similarUni.loc : (courseBase.location || "Location Unknown"),
                tuition: similarUni ? similarUni.tuition : (courseBase.tuition || "Tuition Varies"),
                match: similarUni ? similarUni.match : (courseBase.match || 75),
                intake: similarUni ? similarUni.intake : (courseBase.intake || "Rolling")
            };
        }

        return courseBase;
    }, [courseTitle, universityName, coursesDB, similarCourses, stateCourse]);

    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo(0, 0);
        }
    }, [courseTitle, universityName]);

    const { savedCourses, toggleCourse } = useSavedItems();
    const { addNotification } = useNotification();

    const isSaved = useMemo(() => {
        if (!course) return false;
        return savedCourses.some(c =>
            (c.id && c.id === (course as any).id) ||
            (c.title === course.title && c.university === course.university)
        );
    }, [savedCourses, course]);

    return (
        <div ref={containerRef} className="flex flex-col flex-1 h-full bg-white overflow-y-auto pb-20">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            {/* Main Content Container */}
            <div className="max-w-[1400px] mx-auto w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6">

                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-slate-500">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span className="mx-2 text-slate-300">/</span>
                    <Link to="/courses" className="hover:text-blue-600 transition-colors">Courses</Link>
                    <span className="mx-2 text-slate-300">/</span>
                    <span className="text-slate-900 font-medium">Course Detail</span>
                </nav>

                {/* 1. Header Section */}
                <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{course.title}</h1>
                        <div className="flex items-center gap-2 text-slate-500 text-sm md:text-lg">
                            <span className="material-symbols-outlined filled !text-[18px] md:!text-[24px]">school</span>
                            <span className="font-medium">{course.university}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => executeAction(() => toggleCourse(course as any))}
                            className={`flex items-center justify-center gap-2 h-9 md:h-10 px-4 md:px-5 rounded-lg border text-sm font-bold shadow-sm transition-all ${isSaved
                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                }`}
                        >
                            <span className={`material-symbols-outlined text-[18px] ${isSaved ? 'filled' : ''}`}>
                                {isSaved ? 'bookmark' : 'bookmark_add'}
                            </span>
                            <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                        <button
                            onClick={() => executeAction(() => {
                                addNotification({
                                    title: 'Application Started',
                                    message: `You started an application for ${course.title}`,
                                    type: 'info',
                                    icon: 'school',
                                    actionUrl: `/application/review?title=${encodeURIComponent(courseTitle || '')}&university=${encodeURIComponent(universityName || '')}`
                                });
                                navigate(`/application/review?title=${encodeURIComponent(courseTitle || '')}&university=${encodeURIComponent(universityName || '')}`);
                            })}
                            className="flex items-center justify-center gap-2 h-9 md:h-10 px-4 md:px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-all"
                        >
                            <span>Apply Now</span>
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">

                    {/* Left Column (Main Analysis) */}
                    <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">

                        {/* AI Analysis Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                            {/* Match Ring */}
                            <div className="shrink-0 relative size-20 md:size-24">
                                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-100" strokeWidth="2.5"></circle>
                                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-600" strokeWidth="2.5" strokeDasharray={`${course.match}, 100`} strokeLinecap="round"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl md:text-2xl font-extrabold text-blue-600 leading-none">{course.match}%</span>
                                    <span className="text-[8px] md:text-[10px] font-bold text-blue-600 mt-0.5">MATCH</span>
                                </div>
                            </div>

                            {/* Analysis Content */}
                            <div className="flex-1 flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600 filled">auto_awesome</span>
                                    <h3 className="text-lg font-bold text-slate-900">AI Eligibility Analysis</h3>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    This course aligns well with your academic background in Computer Science and fills key skill gaps required for your target career in Data Engineering.
                                </p>
                                <div className="bg-blue-50 text-blue-800 text-xs font-medium px-4 py-2.5 rounded-lg flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[16px] mt-0.5">info</span>
                                    <span>High match probability based on 1,200+ similar profiles accepted in 2023.</span>
                                </div>
                            </div>
                        </div>

                        {/* Eligibility Breakdown */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900">Eligibility Breakdown</h3>
                                <button className="text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-blue-600 transition-colors">Detailed Report</button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {/* Item 1 */}
                                <div className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-green-600 text-[18px]">check</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-bold text-slate-900">Academic Background</h4>
                                            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase">Match</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">Your BSc in Computer Science meets the prerequisite.</p>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-yellow-600 text-[18px]">warning</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-bold text-slate-900">GPA Requirement</h4>
                                            <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase">Competitive</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">Requires 3.5, your current profile is 3.2.</p>
                                    </div>
                                </div>

                                {/* Item 3 */}
                                <div className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-red-600 text-[18px]">close</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-bold text-slate-900">English Test (IELTS)</h4>
                                            <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold uppercase">Missing</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">Score not submitted. Band 7.0 required.</p>
                                    </div>
                                </div>

                                {/* Item 4 */}
                                <div className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-green-600 text-[18px]">check</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-bold text-slate-900">Intake Availability</h4>
                                            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase">Open</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">September 2024 intake is currently open.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Overview & Career Outcomes Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Course Overview */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 flex flex-col h-full">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Course Overview</h3>
                                <p className="text-xs text-slate-500 leading-relaxed flex-1">
                                    {course.desc}
                                </p>
                            </div>

                            {/* Career Outcomes */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 flex flex-col h-full">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Career Outcomes</h3>
                                <div className="flex flex-wrap gap-2 content-start">
                                    {course.career.map((role, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* How to Improve */}
                        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 md:p-6 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-blue-700">How to Improve Your Chances</h3>
                                <a href="#" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                                    Get Profile Review
                                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                </a>
                            </div>
                            <p className="text-xs text-slate-500 mb-4">Actionable steps to increase your match score</p>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-600 text-[20px]">task_alt</span>
                                    <span className="text-sm font-medium text-slate-700">Aim for an IELTS score of 7.5 to compensate for GPA.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-600 text-[20px]">task_alt</span>
                                    <span className="text-sm font-medium text-slate-700">Highlight your Python capstone project in your SOP.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-600 text-[20px]">task_alt</span>
                                    <span className="text-sm font-medium text-slate-700">Consider applying for the January 2025 intake if more preparation time is needed.</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="flex flex-col gap-4 md:gap-6">

                        {/* Analysis Status Card (Yellow) */}
                        <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-4 md:p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="size-2 rounded-full bg-yellow-600"></span>
                                <span className="text-[10px] font-bold uppercase text-yellow-800 tracking-wider">Analysis Status</span>
                            </div>
                            <h3 className="text-xl font-bold text-yellow-900 mb-2">Competitive</h3>
                            <p className="text-xs text-yellow-800/80 leading-relaxed">
                                This program is competitive because the average admitted GPA is slightly higher than yours. Strong SOP required.
                            </p>
                        </div>

                        {/* Key Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-6">Key Information</h3>

                            <div className="flex flex-col gap-6">
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-gray-500">schedule</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration</p>
                                        <p className="text-sm font-bold text-slate-900">{course.duration}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-gray-500">payments</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tuition (Intl)</p>
                                        <p className="text-sm font-bold text-slate-900">{course.tuition}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-gray-500">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</p>
                                        <p className="text-sm font-bold text-slate-900">{course.location.split(',')[0]}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="mt-6 h-32 w-full bg-slate-200 rounded-lg relative overflow-hidden group cursor-pointer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Bristol_street_map.png/640px-Bristol_street_map.png" alt="Map" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-white px-3 py-1.5 rounded shadow-sm text-xs font-bold text-slate-900 group-hover:scale-105 transition-transform">View on Map</button>
                                </div>
                            </div>
                        </div>

                        {/* Intake Timeline */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-6">Intake Timeline</h3>

                            <div className="relative border-l-2 border-slate-100 ml-2.5 pb-2">
                                {/* Item 1 */}
                                <div className="mb-8 pl-6 relative">
                                    <div className="absolute -left-[7px] top-1.5 size-3.5 rounded-full bg-green-500 border-2 border-white"></div>
                                    <h4 className="text-sm font-bold text-slate-900">September 2024</h4>
                                    <span className="inline-block bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded mt-1">Open - Apply Now</span>
                                    <p className="text-xs text-slate-400 mt-1">Deadline: July 31, 2024</p>
                                </div>

                                {/* Item 2 */}
                                <div className="pl-6 relative opacity-60">
                                    <div className="absolute -left-[7px] top-1.5 size-3.5 rounded-full bg-gray-300 border-2 border-white"></div>
                                    <h4 className="text-sm font-bold text-slate-900">January 2025</h4>
                                    <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded mt-1">Not Open Yet</span>
                                    <p className="text-xs text-slate-400 mt-1">Opens: Oct 1, 2024</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Similar Courses Section (Preserved) */}
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900">Same Course at Other Universities</h3>
                        <p className="text-sm text-slate-500 mt-1">Compare this course with similar offerings from other top universities.</p>
                    </div>

                    {/* Desktop Table View (Hidden on Mobile) */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Logo</th>
                                    <th className="px-6 py-4">University & Location</th>
                                    <th className="px-6 py-4">Next Intake</th>
                                    <th className="px-6 py-4">Tuition / Yr</th>
                                    <th className="px-6 py-4">Eligibility Match</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {similarCourses.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <span className="material-symbols-outlined">{item.logo}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900">{item.uni}</p>
                                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                                <span className="material-symbols-outlined !text-[14px]">location_on</span>
                                                {item.loc}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                                                {item.intake}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {item.tuition}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5 w-32">
                                                <div className="flex justify-between text-xs font-bold">
                                                    <span className={item.match >= 80 ? "text-green-600" : item.match >= 60 ? "text-orange-500" : "text-red-500"}>{item.matchLabel}</span>
                                                    <span className="text-slate-900">{item.match}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${item.match >= 80 ? "bg-green-500" : item.match >= 60 ? "bg-orange-400" : "bg-red-500"}`} style={{ width: `${item.match}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => executeAction(() => navigate(`/course-details?title=${encodeURIComponent(courseTitle || 'MSc Data Science')}&university=${encodeURIComponent(item.uni)}`))}
                                                className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View (Visible only on Mobile) */}
                    <div className="lg:hidden flex flex-col divide-y divide-slate-100">
                        {similarCourses.map((item, idx) => (
                            <div key={idx} className="p-4 flex flex-col gap-4 hover:bg-slate-50 transition-colors">
                                {/* Header: Logo, Name, Location, Action */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                                            <span className="material-symbols-outlined">{item.logo}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm leading-tight">{item.uni}</h4>
                                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                                <span className="material-symbols-outlined !text-[14px]">location_on</span>
                                                {item.loc}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => executeAction(() => navigate(`/course-details?title=${encodeURIComponent(courseTitle || 'MSc Data Science')}&university=${encodeURIComponent(item.uni)}`))}
                                        className="text-blue-600 font-bold text-xs whitespace-nowrap"
                                    >
                                        Details
                                    </button>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Intake</span>
                                        <span className="text-xs font-medium text-slate-900 mt-0.5">{item.intake}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tuition</span>
                                        <span className="text-xs font-bold text-slate-900 mt-0.5">{item.tuition}</span>
                                    </div>
                                    <div className="flex flex-col col-span-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Eligibility Match</span>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${item.match >= 80 ? "bg-green-500" : item.match >= 60 ? "bg-orange-400" : "bg-red-500"}`} style={{ width: `${item.match}%` }}></div>
                                            </div>
                                            <span className={`text-xs font-bold ${item.match >= 80 ? "text-green-600" : item.match >= 60 ? "text-orange-500" : "text-red-500"}`}>{item.match}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseDetails;
