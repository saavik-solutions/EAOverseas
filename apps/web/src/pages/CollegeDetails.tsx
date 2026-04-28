import React, { useMemo } from 'react';
import { useSearchParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { useAuthAction } from '../hooks/useAuthAction';
import LoginModal from '../components/LoginModal';
import { getCombinedUniversities } from '../utils/universityData';

const CollegeDetails = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const uniName = searchParams.get('name');
    const stateUniversity = location.state?.college;
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();

    const universities = useMemo(() => getCombinedUniversities(), []);

    const uni = useMemo(() => {
        // If passed via state, try to find a richer version in DB, or use state as fallback
        if (stateUniversity) {
            const found = universities.find(u => u.name === stateUniversity.name);
            if (found) return {
                ...found,
                desc: found.overview || found.desc || "Information for this university is currently being updated.",
                stats: found.stats || { acceptance: found.acceptanceRate || "N/A", salary: "N/A" },
                ranking: found.rankingQS || found.globalRanking || found.ranking || "N/A"
            };

            return {
                ...stateUniversity,
                desc: stateUniversity.overview || "Information for this university is currently being updated.",
                stats: { acceptance: stateUniversity.acceptanceRate || "N/A", salary: "N/A" },
                ranking: stateUniversity.rankingQS || stateUniversity.globalRanking || "N/A"
            };
        }

        if (!uniName) return null;
        const found = universities.find(u => u.name === uniName || encodeURIComponent(u.name) === uniName);
        if (found) {
            return {
                ...found,
                desc: found.overview || found.desc || "Information for this university is currently being updated.",
                stats: found.stats || { acceptance: found.acceptanceRate || "N/A", salary: "N/A" },
                ranking: found.rankingQS || found.globalRanking || found.ranking || "N/A"
            };
        }
        return null;
    }, [uniName, stateUniversity, universities]);

    const { addNotification } = useNotification();

    const handleApply = () => {
        executeAction(() => {
            if (uni) {
                addNotification({
                    title: 'Application Started',
                    message: `You started an application for ${uni.name}`,
                    type: 'info',
                    icon: 'school',
                    actionUrl: `/application/payment?name=${encodeURIComponent(uni.name)}`
                });
                navigate(`/application/payment?name=${encodeURIComponent(uni.name)}`);
            }
        });
    };

    if (!uni) {
        return (
            <main className="flex-1 overflow-y-auto bg-background-light p-4 md:p-6 flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900">University Not Found</h2>
                    <p className="text-gray-500 mt-2">We couldn't find the university you're looking for.</p>
                    <button
                        onClick={() => navigate('/colleges')}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                    >
                        Back to Finder
                    </button>
                </div>
            </main>
        );
    }

    // Extract tuition for display
    const tuitionTag = uni.tags?.find(t => t.text.includes("$") || t.text.includes("£") || t.text.includes("€") || t.text.includes("CAD") || t.text.includes("AUD"));
    const tuition = tuitionTag ? tuitionTag.text : "$32,000";

    // Expense Calculation Logic
    const livingExpenses = 15500;
    const miscExpenses = 2500;
    const totalExpense = (uni.tuitionValue || 0) + livingExpenses + miscExpenses;

    // Determine Currency Symbol
    let currencySymbol = "$";
    if (uni.country === "United Kingdom") currencySymbol = "£";
    else if (uni.country === "Germany" || uni.country.includes("Europe")) currencySymbol = "€";
    else if (uni.country === "Canada") currencySymbol = "CAD $";
    else if (uni.country === "Australia") currencySymbol = "AUD $";

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            {/* Header */}
            <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-10">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Link to="/" className="hover:text-primary transition-colors">
                        <span className="material-symbols-outlined !text-[18px]">home</span>
                    </Link>
                    <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                    <Link to="/colleges" className="hover:text-gray-900 cursor-pointer transition-colors">Universities</Link>
                    <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                    <span className="text-gray-900 font-medium">{uni.name}</span>
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

            <main className="flex-1 overflow-y-auto bg-background-light p-4 md:p-6">
                <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-6">
                    <section className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6">
                            <div className="flex gap-4 md:gap-5">
                                <div className="size-20 md:size-24 rounded-lg border border-gray-200 bg-white p-2 shrink-0 flex items-center justify-center overflow-hidden">
                                    {(uni.image || uni.logo) ? (
                                        <div className="size-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${uni.image || uni.logo}')` }}></div>
                                    ) : (
                                        <span className="material-symbols-outlined !text-[32px] text-gray-400">account_balance</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 pt-0 md:pt-1">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">{uni.name}</h2>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                                        <span className="material-symbols-outlined !text-[16px] md:!text-[18px]">location_on</span>
                                        <span>{uni.location || `${uni.city}, ${uni.country}`}</span>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-3 flex-wrap">
                                        <div className="flex items-center gap-1.5 px-2 py-1 md:px-2.5 md:py-1 rounded bg-blue-50 text-blue-700 text-[10px] md:text-xs font-semibold border border-blue-100">
                                            <span className="material-symbols-outlined !text-[14px]">trophy</span>
                                            <span>#{uni.ranking} QS World Rank</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-2 py-1 md:px-2.5 md:py-1 rounded bg-gray-50 text-gray-600 text-[10px] md:text-xs font-medium border border-gray-200">
                                            <span className="material-symbols-outlined !text-[14px]">school</span>
                                            Public University
                                        </div>
                                        <div className="flex items-center gap-1.5 px-2 py-1 md:px-2.5 md:py-1 rounded bg-gray-50 text-gray-600 text-[10px] md:text-xs font-medium border border-gray-200">
                                            <span className="material-symbols-outlined !text-[14px]">check_circle</span>
                                            <span>{uni.stats?.acceptance || uni.acceptanceRate} Acceptance Rate</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row md:flex-col gap-3 shrink-0">
                                <button
                                    onClick={handleApply}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-blue-600 text-white rounded-lg transition-colors font-medium text-sm"
                                >
                                    Apply Now
                                </button>
                                <button
                                    onClick={() => executeAction(() => { })}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                                    <span className="material-symbols-outlined !text-[18px]">bookmark_add</span>
                                    Save / Shortlist
                                </button>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                        <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6">
                            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-gray-400">info</span>
                                    Overview
                                </h3>
                                <div className="prose prose-sm text-gray-600 max-w-none">
                                    <p>
                                        {uni.overview || uni.desc || "Institutional overview is currently being updated by the university administration."}
                                    </p>
                                </div>
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-6 border-t border-gray-100">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Total Students</div>
                                        <div className="font-semibold text-gray-900">{uni.studentsCount || "Updates Soon"}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Int'l Students</div>
                                        <div className="font-semibold text-gray-900">{uni.internationalStudents || "Updates Soon"}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Campus Size</div>
                                        <div className="font-semibold text-gray-900">{uni.campusSize || "Updates Soon"}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Employability</div>
                                        <div className="font-semibold text-gray-900">{uni.employability || "Updates Soon"}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-4 md:mb-5">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-gray-400">book</span>
                                        Eligible Courses for You
                                    </h3>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 rounded bg-green-50 text-green-700 text-xs font-medium border border-green-100">High Match Only</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {/* Only show courses if data exists, otherwise show empty state */}
                                    {uni.courses && uni.courses.length > 0 ? (
                                        uni.courses.map((course: any, idx: number) => (
                                            <div key={idx} className="p-4 md:p-5 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all bg-white group cursor-pointer">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="flex-1">
                                                        <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors">{course.name}</h4>
                                                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                                <span className="material-symbols-outlined !text-[14px]">school</span>
                                                                {course.level}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                                <span className="material-symbols-outlined !text-[14px]">calendar_today</span>
                                                                {(course.intakes || []).join(', ')}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-primary">
                                                                <span className="material-symbols-outlined !text-[14px]">event_busy</span>
                                                                Deadline: {(course.deadlines || []).join(', ')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="size-8 md:size-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                                                        <span className="material-symbols-outlined">chevron_right</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-12 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-center px-6">
                                            <span className="material-symbols-outlined text-gray-300 !text-[48px] mb-3">book_off</span>
                                            <h4 className="text-gray-900 font-bold mb-1">No Courses Added Yet</h4>
                                            <p className="text-gray-500 text-sm max-w-xs">Specific course details for {uni.name} are currently being onboarded by administrators.</p>
                                        </div>
                                    )}
                                </div>
                                {uni.courses && uni.courses.length > 0 && (
                                    <button className="w-full mt-4 py-2 text-sm text-primary font-medium hover:underline" onClick={() => executeAction(() => { })}>View all eligible courses</button>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
                            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-600">auto_awesome</span>
                                    Admission Chances
                                </h3>
                                <div className="flex flex-col items-center justify-center py-2">
                                    <div className="relative size-32">
                                        <svg className="size-full" viewBox="0 0 36 36">
                                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="3"></path>
                                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2463eb" strokeDasharray={`${uni.match || 0}, 100`} strokeWidth="3"></path>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold text-gray-900">{uni.match ? `${uni.match}%` : "TBD"}</span>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wide">{uni.match ? "Match" : "Pending"}</span>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 mt-4 px-2">
                                        {uni.match 
                                            ? "Your profile strongly matches their requirements for GPA and Work Experience."
                                            : "Our AI is currently analyzing this university's requirements against your profile."}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-gray-400">calendar_month</span>
                                    Upcoming Intakes
                                </h3>
                                <div className="space-y-4">
                                    {uni.intakes ? (
                                        <div className="relative pl-4 border-l-2 border-primary">
                                            <div className="absolute -left-[5px] top-1 size-2 rounded-full bg-primary ring-4 ring-blue-50"></div>
                                            <h4 className="text-sm font-semibold text-gray-900">{uni.intakes}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">Contact administration for specific deadlines.</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">Intake dates are currently being updated.</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-gray-400">payments</span>
                                    Est. Annual Expense
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Tuition Fees</span>
                                        <span className="font-medium text-gray-900">{tuition}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Living Expenses</span>
                                        <span className="font-medium text-gray-900">{uni.livingExpense || "TBD"}</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-2"></div>
                                    <div className="flex justify-between items-center text-base">
                                        <span className="font-bold text-gray-700">Total Est.</span>
                                        <span className="font-bold text-primary">{uni.avgTuition ? `~${uni.avgTuition}` : "Calculating..."}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-primary/5 to-white rounded-xl border border-primary/20 p-4 md:p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">savings</span>
                                    Scholarships
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3 items-start">
                                        <span className="material-symbols-outlined text-green-600 !text-[18px] mt-0.5">check_circle</span>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">New American University Scholar</h4>
                                            <p className="text-xs text-gray-500">Up to $10,000 / year</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="material-symbols-outlined text-gray-300 !text-[18px] mt-0.5">check_circle</span>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">Graduate College Fellowship</h4>
                                            <p className="text-xs text-gray-500">Merit based • Requires separate app</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CollegeDetails;
