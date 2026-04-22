import React, { useMemo } from 'react';
import { useSearchParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { useAuthAction } from '../hooks/useAuthAction';
import LoginModal from '../components/LoginModal';

const CollegeDetails = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const uniName = searchParams.get('name');
    const stateUniversity = location.state?.college;
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();

    // Mock Database (Same as CollegeFinder)
    const universities = [
        {
            name: "Arizona State University",
            location: "Tempe, Arizona, USA",
            country: "USA",
            match: 98,
            ranking: 56,
            tuitionVal: 38000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUdzt3vabnFKzx_oJmfKMYvm9OPQf8tRgWs_Dw85RU5_1SoBwHcAF4l8viDzOlp9uijwjvga0QXKCFwqRvbuJRjcNHvS7c5gVRPiVSZYDft5sEn1XWQmJKkl8649GeMqM69ZuGFUOv3tb0Yh2PBOFSDrcaTF95DgWInD5SDa7HYpjy5Nr0V2UgrCDtR8CmFi2U73PRjLtm5I81RCn5NrZhTv3QdR-atqwiDrwYD8BxuM37Uk3vLwjpAgO1NVEo2PnzPZTwXuuBFQ2Y",
            tags: [
                { icon: "trophy", text: "#56 QS World Rank", color: "text-primary" },
                { icon: "payments", text: "$32k - $45k / year", color: "text-gray-400" },
                { icon: "check_circle", text: "IELTS Waived", color: "text-gray-400" }
            ],
            stats: { acceptance: "88%", salary: "$75k" },
            budgetCategory: "medium",
            desc: "Arizona State University (ASU) is a public research university in the Phoenix metropolitan area. Recognized as the most innovative university in the U.S., it offers a rich academic environment."
        },
        {
            name: "University of Manchester",
            location: "Manchester, United Kingdom",
            country: "United Kingdom",
            match: 92,
            ranking: 38,
            tuitionVal: 40000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrz5opf6XSLf_jFqn-0A2HESJWZ5xcncY2JViYooxB062bvoQEfvOq77f5B3SJbDE-rW0JjKacZk6lJMAxGL65Uf0ud8ukzl4pYUxz2hMoIbP44PBG8DDRNqwhlt-XYShvpMQv9x4DOsendHngzBNlmGFdkmTD6Zb2kGPmDSM307Zz8L71EaQ3CCHMNBzehwXDJVoghPMc5TeGKBq_ENBpI94N02uMd1olu4t4wsOF3L-26cEpm8IgIPMJ-AxvJS9vjo8dQx8OkP00",
            tags: [
                { icon: "trophy", text: "#38 QS World Rank", color: "text-primary" },
                { icon: "payments", text: "£28k - £35k / year", color: "text-gray-400" }
            ],
            stats: { acceptance: "56%", salary: "£45k" },
            budgetCategory: "medium",
            desc: "The University of Manchester is a public research university in Manchester, England. It is a member of the prestigious Russell Group of British universities."
        },
        {
            name: "University of Waterloo",
            location: "Waterloo, Ontario, Canada",
            country: "Canada",
            match: 85,
            ranking: 112,
            tuitionVal: 35000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALLciL-jFVPbmbjb2E4QB4dhDnpL74OVLJsFj1YZzWnBl73kctmVbI_5v46D51g30mzquMR0xjaW9A0kO1MGsxLOe4A9ML16jRbNP4V9FqnhTZsp6gl9HZhm8URHeWPAEMgkXg0smBG-flgVU9xUjPB2gmkB4zgFlmYJgEMwX2fa_AFJIlzwLg22aI62Bj0Skk37nGzcd12_LIe9i3CNLS1jiu8czaT47OBrlgQ7Kooru4TX6x4__txvynLxVEQQK0WYUoIOeIgN33",
            tags: [
                { icon: "lightbulb", text: "Innovation Hub", color: "text-primary" },
                { icon: "payments", text: "CAD 40k - 55k / year", color: "text-gray-400" },
                { icon: "work", text: "Co-op Available", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" }
            ],
            stats: { acceptance: "53%", salary: "CAD 80k" },
            budgetCategory: "medium",
            desc: "The University of Waterloo is a public research university with a main campus in Waterloo, Ontario, Canada. It is famous for its cooperative education (co-op) programs."
        },
        {
            name: "University of Bristol",
            location: "Bristol, UK",
            country: "United Kingdom",
            match: 80,
            ranking: 61,
            tuitionVal: 38000,
            image: "",
            tags: [
                { icon: "trophy", text: "#61 QS World Rank", color: "text-primary" },
                { icon: "payments", text: "£26k - £32k / year", color: "text-gray-400" }
            ],
            stats: { acceptance: "67%", salary: "£42k" },
            budgetCategory: "medium",
            desc: "The University of Bristol is a red brick research university in Bristol, England. It is organized into six academic faculties."
        },
        {
            name: "University of Melbourne",
            location: "Melbourne, Australia",
            country: "Australia",
            match: 78,
            ranking: 14,
            tuitionVal: 45000,
            image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=300&auto=format&fit=crop",
            tags: [
                { icon: "sunny", text: "#14 Global Ranking", color: "text-orange-500" },
                { icon: "payments", text: "AUD 45k - 60k / year", color: "text-gray-400" }
            ],
            stats: { acceptance: "70%", salary: "AUD 85k" },
            budgetCategory: "high",
            desc: "The University of Melbourne is a public research university located in Melbourne, Australia. Founded in 1853, it is Australia's second oldest university."
        },
        {
            name: "Technical University of Munich",
            location: "Munich, Germany",
            country: "Germany",
            match: 95,
            ranking: 30,
            tuitionVal: 0,
            image: "https://images.unsplash.com/photo-1590240984813-98246df16298?q=80&w=300&auto=format&fit=crop",
            tags: [
                { icon: "school", text: "Tuition Free", color: "text-green-600", bg: "bg-green-50" },
                { icon: "language", text: "German/English", color: "text-gray-400" }
            ],
            stats: { acceptance: "8%", salary: "€65k" },
            budgetCategory: "low",
            desc: "The Technical University of Munich is a research university in Munich, Germany. It is one of the most prestigious universities in Europe."
        },
        {
            name: "University of Toronto",
            location: "Toronto, Canada",
            country: "Canada",
            match: 88,
            ranking: 21,
            tuitionVal: 50000,
            image: "https://images.unsplash.com/photo-1623631484736-2182068aa828?q=80&w=300&auto=format&fit=crop",
            tags: [
                { icon: "leaderboard", text: "#21 Global Ranking", color: "text-primary" },
                { icon: "payments", text: "CAD 50k - 70k / year", color: "text-gray-400" }
            ],
            stats: { acceptance: "43%", salary: "CAD 85k" },
            budgetCategory: "high",
            desc: "The University of Toronto is a public research university in Toronto, Ontario, Canada, located on the grounds that surround Queen's Park."
        },
        {
            name: "Stanford University",
            location: "Stanford, California, USA",
            country: "USA",
            match: 75,
            ranking: 3,
            tuitionVal: 65000,
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop",
            tags: [
                { icon: "rocket_launch", text: "#3 Global Ranking", color: "text-red-500" },
                { icon: "payments", text: "$60k+ / year", color: "text-gray-400" }
            ],
            stats: { acceptance: "4%", salary: "$120k+" },
            budgetCategory: "premium",
            desc: "Stanford University is a private research university in Stanford, California. It is known for its academic strength, wealth, and proximity to Silicon Valley."
        },
        {
            name: "University of Sydney",
            location: "Sydney, Australia",
            country: "Australia",
            match: 82,
            ranking: 41,
            tuitionVal: 48000,
            image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=300&auto=format&fit=crop",
            tags: [
                { icon: "water_drop", text: "Harbour City", color: "text-blue-400" },
                { icon: "payments", text: "AUD 40k - 55k / year", color: "text-gray-400" }
            ],
            stats: { acceptance: "65%", salary: "AUD 80k" },
            budgetCategory: "high",
            desc: "The University of Sydney is a public research university in Sydney, Australia. It is one of Australia's six sandstone universities."
        },
        {
            name: "Imperial College London",
            location: "London, UK",
            country: "United Kingdom",
            match: 89,
            ranking: 6,
            tuitionVal: 42000,
            image: "https://images.unsplash.com/photo-1546953304-42f025cb1f1e?q=80&w=300&auto=format&fit=crop",
            tags: [
                { icon: "science", text: "STEM Focused", color: "text-indigo-500" },
                { icon: "payments", text: "£35k - £45k / year", color: "text-gray-400" }
            ],
            stats: { acceptance: "15%", salary: "£55k" },
            budgetCategory: "high",
            desc: "Imperial College London is a public research university in London. It focuses exclusively on science, technology, medicine, and business."
        },
        // Added for Global Save Demo
        {
            name: "Harvard University",
            location: "Cambridge, MA, USA",
            country: "USA",
            match: 95,
            ranking: 4,
            tuitionVal: 55000,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/1200px-Harvard_University_coat_of_arms.svg.png",
            tags: [
                { icon: "school", text: "Ivy League", color: "text-red-700" },
                { icon: "payments", text: "$55k+ / year", color: "text-gray-400" }
            ],
            stats: { acceptance: "4%", salary: "$140k+" },
            budgetCategory: "premium",
            desc: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, it is the oldest institution of higher learning in the United States."
        },
        {
            name: "University of Oxford",
            location: "Oxford, UK",
            country: "United Kingdom",
            match: 96,
            ranking: 2,
            tuitionVal: 30000,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/University_of_Oxford_Coat_of_Arms.svg/1200px-University_of_Oxford_Coat_of_Arms.svg.png",
            tags: [
                { icon: "history_edu", text: "Historic", color: "text-blue-800" },
                { icon: "payments", text: "£30k+ / year", color: "text-gray-400" }
            ],
            stats: { acceptance: "17%", salary: "£60k+" },
            budgetCategory: "high",
            desc: "The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world."
        }
    ];

    const uni = useMemo(() => {
        // If passed via state, try to find a richer version in DB, or use state as fallback
        if (stateUniversity) {
            const found = universities.find(u => u.name === stateUniversity.name);
            if (found) return found;

            // If not in DB, construct a display object from the minimal state data
            return {
                name: stateUniversity.name,
                location: stateUniversity.location,
                country: "Unknown", // Placeholder
                match: 0,
                ranking: stateUniversity.ranking || "N/A",
                tuitionVal: 0,
                image: stateUniversity.logo || "",
                tags: [],
                stats: { acceptance: "N/A", salary: "N/A" },
                budgetCategory: "medium",
                desc: "Information for this university is currently being updated."
            };
        }

        if (!uniName) return null;
        return universities.find(u => u.name === uniName || encodeURIComponent(u.name) === uniName);
    }, [uniName, stateUniversity]);

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
    const tuitionTag = uni.tags.find(t => t.text.includes("$") || t.text.includes("£") || t.text.includes("€") || t.text.includes("CAD") || t.text.includes("AUD"));
    const tuition = tuitionTag ? tuitionTag.text : "$32,000";

    // Expense Calculation Logic
    const livingExpenses = 15500;
    const miscExpenses = 2500;
    const totalExpense = (uni.tuitionVal || 0) + livingExpenses + miscExpenses;

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
                                    {uni.image ? (
                                        <div className="size-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${uni.image}')` }}></div>
                                    ) : (
                                        <span className="material-symbols-outlined !text-[32px] text-gray-400">account_balance</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 pt-0 md:pt-1">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">{uni.name}</h2>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                                        <span className="material-symbols-outlined !text-[16px] md:!text-[18px]">location_on</span>
                                        <span>{uni.location}</span>
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
                                            <span>{uni.stats.acceptance} Acceptance Rate</span>
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
                                    <p className="mb-3">
                                        {uni.desc}
                                    </p>
                                    <p>
                                        Recognized as the most innovative university in the U.S. by U.S. News & World Report for several consecutive years, ASU offers a rich academic environment with top-tier research facilities, especially in engineering, business, and sustainability.
                                    </p>
                                </div>
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-6 border-t border-gray-100">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Total Students</div>
                                        <div className="font-semibold text-gray-900">77,000+</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Int'l Students</div>
                                        <div className="font-semibold text-gray-900">13,000+</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Campus Size</div>
                                        <div className="font-semibold text-gray-900">664 Acres</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Employability</div>
                                        <div className="font-semibold text-gray-900">92%</div>
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
                                    {/* Course Card 1 */}
                                    <div className="p-4 md:p-5 rounded-xl border border-gray-200 hover:border-blue-500/30 hover:shadow-md transition-all bg-white group cursor-pointer" onClick={() => executeAction(() => navigate(`/course-details?title=MS%20in%20Computer%20Science&university=${encodeURIComponent(uni.name)}`))}>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1.5">
                                                    <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">MS in Computer Science</h4>
                                                    <span className="w-fit px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold tracking-wide uppercase border border-green-200">High Match</span>
                                                </div>
                                                <p className="text-sm text-gray-500 font-medium">Ira A. Fulton Schools of Engineering</p>

                                                <div className="grid grid-cols-2 sm:flex sm:items-center gap-y-3 gap-x-6 mt-4 text-xs font-medium text-gray-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined !text-[16px] text-gray-400">schedule</span>
                                                        <span>2 Years</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined !text-[16px] text-gray-400">calendar_month</span>
                                                        <div className="flex flex-col leading-none gap-0.5">
                                                            <span className="text-[10px] text-gray-400 font-normal">Starts</span>
                                                            <span>Aug 2024</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined !text-[16px] text-gray-400">attach_money</span>
                                                        <div className="flex flex-col leading-none gap-0.5">
                                                            <span>{tuition}</span>
                                                            <span className="text-[10px] text-gray-400 font-normal">/ year</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="shrink-0 size-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mt-1">
                                                <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Course Card 2 */}
                                    <div className="p-4 md:p-5 rounded-xl border border-gray-200 hover:border-blue-500/30 hover:shadow-md transition-all bg-white group cursor-pointer" onClick={() => executeAction(() => navigate(`/course-details?title=Master%20of%20Data%20Science&university=${encodeURIComponent(uni.name)}`))}>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1.5">
                                                    <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">Master of Data Science</h4>
                                                    <span className="w-fit px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold tracking-wide uppercase border border-green-200">High Match</span>
                                                </div>
                                                <p className="text-sm text-gray-500 font-medium">School of Computing and Augmented Intelligence</p>

                                                <div className="grid grid-cols-2 sm:flex sm:items-center gap-y-3 gap-x-6 mt-4 text-xs font-medium text-gray-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined !text-[16px] text-gray-400">schedule</span>
                                                        <span>1.5 Years</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined !text-[16px] text-gray-400">calendar_month</span>
                                                        <div className="flex flex-col leading-none gap-0.5">
                                                            <span className="text-[10px] text-gray-400 font-normal">Starts</span>
                                                            <span>Aug 2024</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined !text-[16px] text-gray-400">attach_money</span>
                                                        <div className="flex flex-col leading-none gap-0.5">
                                                            <span>$35,500</span>
                                                            <span className="text-[10px] text-gray-400 font-normal">/ year</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="shrink-0 size-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mt-1">
                                                <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Course Card 3 */}
                                    <div className="p-4 md:p-5 rounded-xl border border-gray-200 hover:border-blue-500/30 hover:shadow-md transition-all bg-white group cursor-pointer opacity-90" onClick={() => executeAction(() => navigate(`/course-details?title=MBA%20(Business%20Analytics)&university=${encodeURIComponent(uni.name)}`))}>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1.5">
                                                    <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">MBA (Business Analytics)</h4>
                                                    <span className="w-fit px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold tracking-wide uppercase border border-orange-200">Med Match</span>
                                                </div>
                                                <p className="text-sm text-gray-500 font-medium">W. P. Carey School of Business</p>

                                                <div className="grid grid-cols-2 sm:flex sm:items-center gap-y-3 gap-x-6 mt-4 text-xs font-medium text-gray-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined !text-[16px] text-gray-400">schedule</span>
                                                        <span>2 Years</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined !text-[16px] text-gray-400">calendar_month</span>
                                                        <div className="flex flex-col leading-none gap-0.5">
                                                            <span className="text-[10px] text-gray-400 font-normal">Starts</span>
                                                            <span>Jan 2025</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined !text-[16px] text-gray-400">attach_money</span>
                                                        <div className="flex flex-col leading-none gap-0.5">
                                                            <span>$52,000</span>
                                                            <span className="text-[10px] text-gray-400 font-normal">/ year</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="shrink-0 size-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mt-1">
                                                <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2 text-sm text-primary font-medium hover:underline" onClick={() => executeAction(() => { })}>View all 12 eligible courses</button>
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
                                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2463eb" strokeDasharray={`${uni.match}, 100`} strokeWidth="3"></path>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold text-gray-900">{uni.match}%</span>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wide">High</span>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 mt-4 px-2">
                                        Your profile strongly matches their requirements for GPA and Work Experience.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-gray-400">calendar_month</span>
                                    Upcoming Intakes
                                </h3>
                                <div className="space-y-4">
                                    <div className="relative pl-4 border-l-2 border-primary">
                                        <div className="absolute -left-[5px] top-1 size-2 rounded-full bg-primary ring-4 ring-blue-50"></div>
                                        <h4 className="text-sm font-semibold text-gray-900">Fall 2024 (Primary)</h4>
                                        <p className="text-xs text-red-500 font-medium mt-1">Deadline: Dec 15, 2023</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Classes start: Aug 20, 2024</p>
                                    </div>
                                    <div className="relative pl-4 border-l-2 border-gray-200">
                                        <div className="absolute -left-[5px] top-1 size-2 rounded-full bg-gray-300"></div>
                                        <h4 className="text-sm font-semibold text-gray-900">Spring 2025</h4>
                                        <p className="text-xs text-gray-600 font-medium mt-1">Deadline: Sep 01, 2024</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Classes start: Jan 10, 2025</p>
                                    </div>
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
                                        <span className="font-medium text-gray-900">{currencySymbol}{livingExpenses.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Misc & Insurance</span>
                                        <span className="font-medium text-gray-900">{currencySymbol}{miscExpenses.toLocaleString()}</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-2"></div>
                                    <div className="flex justify-between items-center text-base">
                                        <span className="font-bold text-gray-700">Total</span>
                                        <span className="font-bold text-primary">~{currencySymbol}{totalExpense.toLocaleString()}</span>
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
