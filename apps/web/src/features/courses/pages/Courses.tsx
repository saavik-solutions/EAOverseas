import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';
import { useAuthAction } from '@/hooks/useAuthAction';
import { useAuth } from '@/features/auth/context/AuthContext';
import LoginModal from '@/features/auth/components/LoginModal';

const recommendedCourses = [
    {
        match: 98,
        title: "MSc Data Science",
        university: "University of Manchester",
        location: "United Kingdom",
        students: 120,
        expertApproved: true,
        cost: "£28k - £32k",
        color: "green"
    },
    {
        match: 95,
        title: "Global MBA",
        university: "University of Toronto",
        location: "Canada",
        tags: ["High ROI", "Top 50 Global"],
        cost: "$45k - $55k",
        color: "green"
    },
    {
        match: 92,
        title: "Master of IT",
        university: "Monash University",
        location: "Australia",
        tags: ["Scholarship", "85 Shortlisted"],
        cost: "AUD 35k - 40k",
        color: "green"
    },
    {
        match: 89,
        title: "Computer Science",
        university: "TU Munich",
        location: "Germany",
        tags: ["Low Tuition", "Tech Focus"],
        cost: "€300 - €1.5k",
        color: "blue"
    }
];

// Expanded to 10 courses
const allCourses = [
    {
        title: "MSc Computer Science",
        university: "Stanford University",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw5qVJRMNfEeB5AtGu7D4AdLKyDEnkAlTShTiOl8ZcqIUxz9koDcUn7kvkWHmWR5LPJIn_QKsGb3qfOWJQTrxmQhBLpNaxB53bJPAIpP_J1dswXK-q5tve46fNc9siR52bDKG8zIorQgKamcUkVyjpdGMU4VFy1ax9tW2eocGEfXEN20q-HeIku4bcSm5n-B_EwuOS0b_Wwz0g_cZRXYxmmMUHAprmfnhC8xZv9sJ0IT2FNxw5zj3kHnL0mOUUiu9aQXpRQQIQAuKh",
        eligibility: "High Eligibility",
        eligibilityColor: "green",
        duration: "2 Years",
        start: "Sep 2024",
        fee: "$55,000 / year",
        icon: "school",
        country: "USA",
        field: "Computer Science",
        degree: "Masters"
    },
    {
        title: "MBA International",
        university: "INSEAD",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnOxGCK4TIzU6vf9dzuqMq8ozUMApeEinUd3RjgCjKZh_-kgtBIL7rbTrzyP3JjVMIcoctIZITaJ15i4-vaDHyjGOZIK8trZKyQFyQyXjrl-aLZLCFMeWEF473F8Rh0EY4yhWK7pIcOFevpgOoI34g0ocbMzpdi4E282BekWb-xHoErCfu-ZYhJqI1uLyserQuacqI53TDvrpov6lpjNpSmqbR1-zNmi929HYjdfyzbN8eM6pR964Uyvn9Npb3FixM8zRmY01uodY",
        eligibility: "Borderline",
        eligibilityColor: "yellow",
        duration: "1 Year",
        start: "Jan 2025",
        fee: "€89,000 / year",
        icon: "account_balance",
        country: "France",
        field: "Business",
        degree: "MBA"
    },
    {
        title: "MA History",
        university: "University of Oxford",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcv7DpfgkNXrVtcrSWwcir2TgEcqcXVbphzKft_j-y6lgOGwZegUmkgvYBcdIdac87yHol_O3b-pSQRLA0NZ9PEv_9Iup97lgH0Ijw4wI4c03mZKvMi7Sy6v4mHYL5TWiuZxjS5p2Syal1y-nibc9fTJr34LLwsNYYWNOJnv-TqWwP1ENZhWJPIbmqdxKj5gW1KYXWbQsCHE1wJDHPEiXGiITyplrSRFn1Tq6ofY1H0456jrqvi4oirz7QDSH_rxRLt7PFh8mivK6z",
        eligibility: "Eligible",
        eligibilityColor: "green",
        duration: "1 Year",
        start: "Oct 2024",
        fee: "£32,000 / year",
        icon: "history_edu",
        country: "UK",
        field: "Humanities",
        degree: "Masters"
    },
    {
        title: "MSc Biotechnology",
        university: "ETH Zurich",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtZkHt9gkhtkfXH_oK2Nf2R2jRkK7FODEypwalU8ZIhAe6BX1Y7dSuMekoFiBAy-H_AqSYUUwa_YNMPqCJ5tEYR_UBMYd0fcrNrhvH-q_pg67XkA20lP4h9uFBUMhqNZX5fSBdsygyY2WmCb-vx-YGHgrTbiHgs29QdP_bzgS0JdZmIceOWHAamVF5my9VP8aJiEibkThhWDqmhcaR8prSinIrCwcmQ12HEpmK8D374r672LVTCxIW7ukVmg3j_M0qe734WKHCTTUJ",
        eligibility: "Eligible",
        eligibilityColor: "green",
        duration: "2 Years",
        start: "Sep 2024",
        fee: "CHF 1,500 / sem",
        icon: "biotech",
        country: "Switzerland",
        field: "Science",
        degree: "Masters"
    },
    {
        title: "LLM Law",
        university: "Yale University",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrrBw1hBK0JmrC3NGxGBbPEHeavb4dImHPcreWq7WQjI6oYjbwhGAWP2bMSVzntj61LBSmCBDjMk-YPdsuat6TutIapK4Q7Z9T-PuDWrfmCbAOwAs6jLY3Rf-0nPGGJPbUzsqF6H72uoztivSez_r_3pGEWK0NpceQXRKjm-g-4tLZL3VUdAsNvizF3-hKi3ytXn3WpXeyt_KM2fkPMLOHHB65ZZAPqLVHFRGUBXyfrrMpHALAKaT0IUm4tCCEaCNnQLNE1ctD7aMS",
        eligibility: "Low Chance",
        eligibilityColor: "red",
        duration: "1 Year",
        start: "Aug 2024",
        fee: "$70,000 / year",
        icon: "gavel",
        country: "USA",
        field: "Law",
        degree: "Masters"
    },
    {
        title: "Master of Design",
        university: "RMIT University",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLswjN4rsRlUcInOlcwJ29Bp9S4s2137jU4BDTAurS5CDZigiIECLpCfzxsh4bWrcqqYA75xHJ0ZaeEccUhbzWXKVBRV_tflv1shcc6vVbX18t5pmikGYKa6kdFi5k3UfnhMc4idwKTFoDazgzK6FqnkNPhDq16p3i_1jsMCSZHOhZL1EmUyHW1yVMQp1IcZcH3ng6tBUCA6IzjZcXKy8EQ25ZvVH7KJQcfj5zmVW9woGYb8yzlsnDNEAqBcy8p9fJF8lcXb9pp65t",
        eligibility: "Eligible",
        eligibilityColor: "green",
        duration: "2 Years",
        start: "Feb 2025",
        fee: "AUD 33,000 / year",
        icon: "design_services",
        country: "Australia",
        field: "Arts",
        degree: "Masters"
    },
    // New Courses
    {
        title: "MSc Mechanical Eng",
        university: "TU Delft",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/TU_Delft_Library.jpg/640px-TU_Delft_Library.jpg",
        eligibility: "Eligible",
        eligibilityColor: "green",
        duration: "2 Years",
        start: "Sep 2024",
        fee: "€18,000 / year",
        icon: "engineering",
        country: "Netherlands",
        field: "Engineering",
        degree: "Masters"
    },
    {
        title: "Bachelor of Business",
        university: "Singapore Management University",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Singapore_Management_University_School_of_Information_Systems.jpg/640px-Singapore_Management_University_School_of_Information_Systems.jpg",
        eligibility: "Borderline",
        eligibilityColor: "yellow",
        duration: "4 Years",
        start: "Aug 2024",
        fee: "SGD 45,000 / year",
        icon: "business_center",
        country: "Singapore",
        field: "Business",
        degree: "Bachelors"
    },
    {
        title: "MSc Psychology",
        university: "University of Melbourne",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/University_of_Melbourne_Old_Arts.jpg/640px-University_of_Melbourne_Old_Arts.jpg",
        eligibility: "High Eligibility",
        eligibilityColor: "green",
        duration: "2 Years",
        start: "Feb 2025",
        fee: "AUD 42,000 / year",
        icon: "psychology",
        country: "Australia",
        field: "Psychology",
        degree: "Masters"
    },
    {
        title: "Data Science Certificate",
        university: "MIT Professional",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_dome_night1.jpg/640px-MIT_dome_night1.jpg",
        eligibility: "Eligible",
        eligibilityColor: "green",
        duration: "6 Months",
        start: "Rolling",
        fee: "$12,000",
        icon: "analytics",
        country: "USA",
        field: "Data Science",
        degree: "Certificate"
    }
];

const Courses = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        country: '',
        degree: '',
        field: '',
        intake: '',
        eligibility: 'Eligible'
    });
    const [sortBy, setSortBy] = useState('Best Match');
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 8;

    // Derived courses logic
    const derivedCourses = useMemo(() => {
        let result = [...allCourses];

        // Filter
        if (filters.country) result = result.filter(c => c.country === filters.country);
        if (filters.degree) result = result.filter(c => c.degree === filters.degree);
        if (filters.field) result = result.filter(c => c.field === filters.field);
        if (filters.intake) result = result.filter(c => c.start.includes(filters.intake));
        if (filters.eligibility && filters.eligibility !== 'All') {
            if (filters.eligibility === 'Eligible') {
                result = result.filter(c => c.eligibilityColor === 'green');
            } else if (filters.eligibility === 'Borderline') {
                result = result.filter(c => c.eligibilityColor === 'yellow');
            }
        }

        // Sort
        if (sortBy === 'Lowest Cost') {
            result.sort((a, b) => {
                const getVal = (str) => parseInt(str.replace(/[^0-9]/g, '')) || 0;
                return getVal(a.fee) - getVal(b.fee);
            });
        }
        // Add other sorts as complex logic if needed, avoiding for simplicity now

        return result;
    }, [filters, sortBy]);

    const totalPages = Math.ceil(derivedCourses.length / ITEMS_PER_PAGE);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleFilterChange = (key, value) => {
        executeAction(() => {
            setFilters(prev => ({ ...prev, [key]: value }));
            setCurrentPage(0); // Reset to first page
        });
    };

    const { toggleCourse, isCourseSaved } = useSavedItems();
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { user } = useAuth();

    return (
        <div className="flex flex-col flex-1 h-full bg-[#f8f9fc] overflow-hidden">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            {/* Header */}
            <div className="hidden lg:block">
                <PageHeader
                    title="Courses"
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

            <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-8">

                    {/* Section 1: Top 5 Recommended */}
                    <section className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600 !text-[20px]">auto_awesome</span>
                                <h3 className="text-lg font-bold text-gray-900">Top 5 Recommended</h3>
                            </div>
                            <p className="text-sm text-gray-500">Curated based on your profile eligibility and community success rates.</p>
                        </div>

                        {/* Horizontal Scroll Container */}
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                            {recommendedCourses.map((course, idx) => (
                                <div key={idx} className="min-w-[320px] max-w-[320px] bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group snap-start flex flex-col justify-between h-64 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/60"></div>
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`px-2 py-1 bg-${course.color === 'blue' ? 'blue' : 'green'}-50 text-${course.color === 'blue' ? 'blue' : 'green'}-700 text-[10px] font-bold uppercase tracking-wider rounded border border-${course.color === 'blue' ? 'blue' : 'green'}-100`}>
                                                {course.match}% Match
                                            </span>
                                            <span className="material-symbols-outlined text-gray-300 group-hover:text-blue-600 cursor-pointer transition-colors !text-[20px]">bookmark</span>
                                        </div>
                                        <div className="mb-1">
                                            <h4 className="text-base font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{course.title}</h4>
                                            <p className="text-sm font-medium text-gray-600 mt-1">{course.university}</p>
                                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                                <span className="material-symbols-outlined !text-[14px]">location_on</span>
                                                <span>{course.location}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {course.students && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                                                    <span className="material-symbols-outlined !text-[12px] text-blue-600">groups</span>
                                                    {course.students} Shortlisted
                                                </span>
                                            )}
                                            {course.expertApproved && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                                                    <span className="material-symbols-outlined !text-[12px] text-blue-600">verified</span>
                                                    Expert Approved
                                                </span>
                                            )}
                                            {course.tags && course.tags.map((tag, t) => (
                                                <span key={t} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                                                    <span className="material-symbols-outlined !text-[12px] text-blue-600">{tag.includes('ROI') ? 'trending_up' : tag.includes('Tuition') ? 'euro' : 'school'}</span>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 mt-2 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400 uppercase">Est. Cost</span>
                                            <span className="text-sm font-bold text-gray-900">{course.cost}</span>
                                        </div>
                                        <button
                                            onClick={() => executeAction(() => navigate(`/course-details?title=${encodeURIComponent(course.title)}&university=${encodeURIComponent(course.university)}`))}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                                        >
                                            View Course
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 2: All Courses + Filters */}
                    <section className="flex flex-col gap-6 overflow-hidden">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <h3 className="text-lg font-bold text-gray-900">All Courses</h3>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => executeAction(() => setSortBy(e.target.value))}
                                        className="appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-40 p-2.5 pr-8 cursor-pointer font-medium"
                                    >
                                        <option>Best Match</option>
                                        <option>Popularity</option>
                                        <option>Lowest Cost</option>
                                        <option>Highest ROI</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <span className="material-symbols-outlined !text-[20px]">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter Bar */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Country Filter */}
                                <select
                                    value={filters.country}
                                    onChange={(e) => handleFilterChange('country', e.target.value)}
                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Country</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Singapore">Singapore</option>
                                </select>

                                {/* Degree Filter */}
                                <select
                                    value={filters.degree}
                                    onChange={(e) => handleFilterChange('degree', e.target.value)}
                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Degree Level</option>
                                    <option value="Masters">Masters</option>
                                    <option value="MBA">MBA</option>
                                    <option value="Bachelors">Bachelors</option>
                                    <option value="Certificate">Certificate</option>
                                </select>

                                {/* Field Filter */}
                                <select
                                    value={filters.field}
                                    onChange={(e) => handleFilterChange('field', e.target.value)}
                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Field of Study</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Business">Business</option>
                                    <option value="Arts">Arts</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Law">Law</option>
                                </select>

                                <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto md:ml-auto justify-center md:justify-start mt-2 md:mt-0">
                                    <button
                                        onClick={() => handleFilterChange('eligibility', 'Eligible')}
                                        className={`flex-1 md:flex-none px-3 py-1.5 rounded-md shadow-sm text-xs font-semibold transition-colors ${filters.eligibility === 'Eligible' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        Eligible
                                    </button>
                                    <button
                                        onClick={() => handleFilterChange('eligibility', 'Borderline')}
                                        className={`flex-1 md:flex-none px-3 py-1.5 rounded-md shadow-sm text-xs font-semibold transition-colors ${filters.eligibility === 'Borderline' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        Borderline
                                    </button>
                                    <button
                                        onClick={() => handleFilterChange('eligibility', 'All')}
                                        className={`flex-1 md:flex-none px-3 py-1.5 rounded-md shadow-sm text-xs font-semibold transition-colors ${filters.eligibility === 'All' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        All
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course Grid with horizontal slide animation */}
                        <div className="relative overflow-hidden min-h-[500px]">
                            <div
                                className="flex transition-transform duration-500 ease-in-out gap-6"
                                style={{ transform: `translateX(-${currentPage * 100}%)` }}
                            >
                                {/* Page 0 */}
                                <div className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
                                    {derivedCourses.slice(0, ITEMS_PER_PAGE).map((course, idx) => (
                                        <CourseCard
                                            key={idx}
                                            course={course}
                                            navigate={navigate}
                                            isSaved={isCourseSaved(course as any)}
                                            onToggle={() => executeAction(() => toggleCourse(course as any))}
                                            onClick={() => executeAction(() => navigate(`/course-details?title=${encodeURIComponent(course.title)}&university=${encodeURIComponent(course.university)}`))}
                                        />
                                    ))}
                                    {derivedCourses.length === 0 && (
                                        <div className="col-span-full py-10 text-center text-gray-500">No courses found matching filters.</div>
                                    )}
                                </div>

                                {/* Page 1 (if exists) */}
                                {totalPages > 1 && (
                                    <div className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
                                        {derivedCourses.slice(ITEMS_PER_PAGE, ITEMS_PER_PAGE * 2).map((course, idx) => (
                                            <CourseCard
                                                key={idx + ITEMS_PER_PAGE}
                                                course={course}
                                                navigate={navigate}
                                                isSaved={isCourseSaved(course as any)}
                                                onToggle={() => executeAction(() => toggleCourse(course as any))}
                                                onClick={() => executeAction(() => navigate(`/course-details?title=${encodeURIComponent(course.title)}&university=${encodeURIComponent(course.university)}`))}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-gray-200 pt-6 pb-2">
                            <span className="text-sm text-gray-500">
                                Showing {Math.min((currentPage + 1) * ITEMS_PER_PAGE, derivedCourses.length)} of {derivedCourses.length} courses
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentPage === 0}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage >= totalPages - 1}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                    </section>
                    <div className="h-10"></div>
                </div>
            </main>
        </div>
    );
};

const CourseCard = ({ course, navigate, isSaved, onToggle, onClick }) => (
    <div
        className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-600/50 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col"
        onClick={onClick}
    >
        <div className="relative h-40 bg-gray-100 overflow-hidden shrink-0">
            <img alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={course.image} />
            <div className={`absolute top-3 left-3 px-2 py-1 rounded shadow-sm text-[10px] font-bold text-white ${course.eligibilityColor === 'green' ? 'bg-green-500' : course.eligibilityColor === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                {course.eligibility}
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className={`absolute top-3 right-3 p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all ${isSaved ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
            >
                <span className={`material-symbols-outlined !text-[20px] ${isSaved ? 'filled' : ''}`}>
                    bookmark
                </span>
            </button>
        </div>
        <div className="p-4 flex flex-col gap-3 flex-1">
            <div className="flex gap-3 items-start">
                <div className="h-10 w-10 rounded bg-white p-1 border border-gray-100 shadow-sm flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-400">{course.icon}</span>
                </div>
                <div>
                    <h4 className="text-base font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{course.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{course.university}</p>
                </div>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-gray-600 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-gray-400 !text-[16px]">schedule</span>
                    <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-gray-400 !text-[16px]">calendar_month</span>
                    <span>{course.start}</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 mt-1">
                    <span className="material-symbols-outlined text-gray-400 !text-[16px]">payments</span>
                    <span className="font-semibold text-gray-900">{course.fee}</span>
                </div>
            </div>
        </div>
    </div>
);

export default Courses;
