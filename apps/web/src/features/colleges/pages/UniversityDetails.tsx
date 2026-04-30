import { useParams, Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { jsPDF } from 'jspdf';
import { universitiesData } from '@/features/content/data/universities';
import { useAuthAction } from '@/hooks/useAuthAction';
import { useAuth } from '@/features/auth/context/AuthContext';
import LoginModal from '@/features/auth/components/LoginModal';

const UniversityDetails = () => {
    const { id } = useParams();
    const university = universitiesData.find(u => u.id === Number(id));
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { user } = useAuth();

    if (!university) {
        return (
            <div className="flex flex-col flex-1 h-full bg-[#F8FAFC]">
                <PageHeader title="University Not Found" />
                <div className="flex-1 flex flex-col items-center justify-center p-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">University details not available.</h2>
                    <Link to="/consultant/university-directory" className="text-blue-600 font-bold hover:underline">Back to Directory</Link>
                </div>
            </div>
        );
    }

    const handleDownload = () => {
        executeAction(() => {
            const doc = new jsPDF();

            // Title
            doc.setFontSize(22);
            doc.setTextColor(43, 108, 238); // #2b6cee
            doc.text(university.name, 20, 20);

            doc.setFontSize(14);
            doc.setTextColor(100);
            doc.text("University Brochure", 20, 30);
            doc.line(20, 35, 190, 35);

            // General Info
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text(`Location: ${university.city}, ${university.country}`, 20, 45);
            doc.text(`Ranking: #${university.globalRanking} Global Ranking`, 20, 52);
            doc.text(`Type: ${university.type}`, 20, 59);

            // Overview
            doc.setFontSize(14);
            doc.text("University Overview", 20, 75);
            doc.setFontSize(10);
            const splitOverview = doc.splitTextToSize(university.overview, 170);
            doc.text(splitOverview, 20, 82);

            // Stats
            doc.setFontSize(14);
            doc.text("Quick Snapshot", 20, 105);
            doc.setFontSize(10);
            doc.text([
                `- ${university.coursesCount} Courses`,
                `- ${university.avgTuition} Avg Tuition per Year`,
                `- ${university.livingExpense} Living Expense per Month`,
                `- ${university.intakes}`,
                `- ${university.partTimeRights} Part-time Work Rights`
            ], 20, 112);

            // Admission
            doc.setFontSize(14);
            doc.text("Admission Process", 20, 145);
            doc.setFontSize(10);
            doc.text(university.admissionSteps.map(s => `${s.step}. ${s.title}`), 20, 152);

            // Requirements
            doc.setFontSize(14);
            doc.text("Entrance Requirements", 20, 185);
            doc.setFontSize(10);
            doc.text(university.testRequirements.map(r => `- ${r.label}: ${r.value}`), 20, 192);

            // Disclaimer
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text("Disclaimer: This brochure is generated for informational purposes by EAOverseas.", 20, 280);

            doc.save(`${university.name.replace(/\s+/g, '_')}_Brochure.pdf`);
        });
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#F8FAFC]">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            {/* Headers are usually handled by the layout, but the template has a specific one. 
                Since this is inside ConsultantLayout, we might have double headers.
                The user asked for this specific page design.
                I will include the header from the template for now, but if it conflicts, I might need to remove it later.
                However, existing layouts likely have a sidebar/header.
                Let's keep it as a standalone page content or try to integrate.
                The user said "don't navigate it into students /user login ( make it in the counsellor login)".
                ConsultantLayout likely has a sidebar.
                The provided HTML has a full header. 
                I will render the MainHeader as part of the component for now.
            */}

            {/* Breadcrumb Header */}
            <PageHeader
                breadcrumbs={[
                    { label: 'University Directory', link: '/consultant/university-directory' },
                    { label: university.name }
                ]}
            />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                <div className="max-w-[95%] lg:max-w-[1400px] mx-auto pb-6 md:pb-10">
                    {/* BEGIN: HeroSection */}
                    <section className="mb-6 md:mb-12" data-purpose="university-identity">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-3 md:mb-4">
                                    <span className="bg-blue-50 text-[#2b6cee] text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-wider">#{university.globalRanking} GLOBAL RANKING</span>
                                    <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-wider">{university.type}</span>
                                </div>
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-1.5 md:mb-2">{university.name}</h1>
                                <p className="text-sm md:text-lg text-gray-500 flex items-center gap-1.5 mb-3 md:mb-4">
                                    <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
                                    </svg>
                                    {university.city}, {university.country}
                                </p>
                                <p className="text-xs md:text-base text-gray-600 max-w-2xl leading-relaxed">
                                    {university.overview}
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* END: HeroSection */}

                    {/* BEGIN: QuickSnapshot */}
                    <section className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-10 md:mb-16" data-purpose="university-stats">
                        {/* Item 1 */}
                        <div className="bg-white p-3.5 md:p-5 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
                            <span className="text-xl md:text-2xl mb-1.5 md:mb-2">🎓</span>
                            <span className="text-[11px] md:text-sm font-bold text-gray-900 leading-tight">{university.coursesCount} Courses</span>
                            <span className="text-[9px] md:text-xs text-gray-400 mt-0.5">Popular Programs</span>
                        </div>
                        {/* Item 2 */}
                        <div className="bg-white p-3.5 md:p-5 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
                            <span className="text-xl md:text-2xl mb-1.5 md:mb-2">💰</span>
                            <span className="text-[11px] md:text-sm font-bold text-gray-900 leading-tight">{university.avgTuition} Avg Tuition</span>
                            <span className="text-[9px] md:text-xs text-gray-400 mt-0.5 whitespace-nowrap">Per Academic Year</span>
                        </div>
                        {/* Item 3 */}
                        <div className="bg-white p-3.5 md:p-5 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
                            <span className="text-xl md:text-2xl mb-1.5 md:mb-2">🏠</span>
                            <span className="text-[11px] md:text-sm font-bold text-gray-900 leading-tight">{university.livingExpense} Living</span>
                            <span className="text-[9px] md:text-xs text-gray-400 mt-0.5">Average per month</span>
                        </div>
                        {/* Item 4 */}
                        <div className="bg-white p-3.5 md:p-5 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
                            <span className="text-xl md:text-2xl mb-1.5 md:mb-2">📅</span>
                            <span className="text-[11px] md:text-sm font-bold text-gray-900 leading-tight">Available Intakes</span>
                            <span className="text-[9px] md:text-xs text-gray-400 mt-0.5 truncate w-full">{university.intakes}</span>
                        </div>
                        {/* Item 5 */}
                        <div className="bg-white p-3.5 md:p-5 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center text-center col-span-2 md:col-span-1">
                            <span className="text-xl md:text-2xl mb-1.5 md:mb-2">🕒</span>
                            <span className="text-[11px] md:text-sm font-bold text-gray-900 leading-tight">{university.partTimeRights}</span>
                            <span className="text-[9px] md:text-xs text-gray-400 mt-0.5">Part-time Work Rights</span>
                        </div>
                    </section>
                    {/* END: QuickSnapshot */}

                    <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                        {/* BEGIN: LeftColumn */}
                        <div className="lg:col-span-2 space-y-10 md:space-y-16">
                            {/* BEGIN: AdmissionProcess */}
                            <section data-purpose="admission-steps">
                                <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
                                    <span className="w-1 h-6 md:h-8 bg-[#2b6cee] rounded-full"></span>
                                    Admission Process
                                </h2>
                                <div className="space-y-3 md:space-y-4">
                                    {university.admissionSteps.map((step) => (
                                        <div key={step.step} className="flex items-center gap-3 md:gap-5 p-3.5 md:p-5 bg-white border border-gray-100 rounded-xl transition-all hover:border-[#2b6cee]/20 shadow-sm">
                                            <span className="bg-[#2b6cee15] text-[#2b6cee] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold rounded-lg flex-shrink-0 text-base md:text-lg">{step.step}</span>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-gray-900 text-sm md:text-base">{step.title}</h4>
                                                <p className="text-[11px] md:text-sm text-gray-500 leading-tight">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            {/* END: AdmissionProcess */}

                            {/* BEGIN: FeesStructure */}
                            <section data-purpose="fees-breakdown">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-[#2b6cee] rounded-full"></span>
                                    Tuition & Cost Breakdown
                                </h2>
                                <div className="overflow-hidden border border-gray-100 rounded-[12px] bg-white">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="p-4 font-semibold text-sm text-gray-600 border-b">Expense Type</th>
                                                <th className="p-4 font-semibold text-sm text-gray-600 border-b">Estimated Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            <tr>
                                                <td className="p-4 text-sm font-medium">Tuition Fees</td>
                                                <td className="p-4 text-sm">{university.avgTuition} / year</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-sm font-medium">Living Expenses</td>
                                                <td className="p-4 text-sm">{university.livingExpense} / month</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-sm font-medium text-[#2b6cee]">Other Expenses</td>
                                                <td className="p-4 text-sm">Varies by program</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                            {/* END: FeesStructure */}

                            {/* BEGIN: Scholarships */}
                            <section data-purpose="scholarship-info">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-[#2b6cee] rounded-full"></span>
                                    Scholarships & Financial Aid
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {university.scholarships.map((sch, index) => (
                                        <div key={index} className="p-6 bg-white border border-gray-100 rounded-[12px] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] group hover:border-[#2b6cee]/30 transition-all">
                                            <div className="mb-4">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${sch.type === 'Fully Funded' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>{sch.type}</span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#2b6cee] transition-colors">{sch.title}</h4>
                                            <p className="text-xs text-gray-400 mb-4 font-semibold">Deadline: {sch.deadline}</p>
                                            <p className="text-sm text-gray-500 leading-relaxed">{sch.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            {/* END: Scholarships */}
                        </div>
                        {/* END: LeftColumn */}

                        {/* BEGIN: RightSidebar */}
                        <div className="space-y-8 md:space-y-12">
                            {/* BEGIN: TestRequirements */}
                            <aside className="bg-white p-8 rounded-[12px] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-50" data-purpose="requirements-sidebar">
                                <h3 className="text-lg font-bold mb-6">Entrance Requirements</h3>
                                <ul className="space-y-6">
                                    {university.testRequirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="h-5 w-5 text-[#2b6cee] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                                            </svg>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{req.label}</p>
                                                <p className="text-sm text-gray-500">{req.value}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                            {/* END: TestRequirements */}

                            {/* BEGIN: IntakeTimeline */}
                            <aside className="bg-gray-900 text-white p-8 rounded-[12px] shadow-xl" data-purpose="intake-timeline">
                                <h3 className="text-lg font-bold mb-6">Available Intakes</h3>
                                <div className="space-y-8 relative">
                                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                                    <div className="relative pl-10">
                                        <div className="absolute left-[9px] top-1.5 w-1.5 h-1.5 rounded-full bg-green-500 ring-4 ring-green-500/20"></div>
                                        <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-1">Fall Intake</p>
                                        <h4 className="font-bold">{university.deadlineFall === 'No Winter Intake' ? 'Annual Intake' : 'Main Intake'}</h4>
                                        <p className="text-sm text-gray-400">Deadline: {university.deadlineFall}</p>
                                    </div>
                                    {university.deadlineWinter !== 'No Winter Intake' && (
                                        <div className="relative pl-10">
                                            <div className="absolute left-[9px] top-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 ring-4 ring-orange-500/20"></div>
                                            <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Winter Intake</p>
                                            <h4 className="font-bold">Secondary Intake</h4>
                                            <p className="text-sm text-gray-400">Deadline: {university.deadlineWinter}</p>
                                        </div>
                                    )}
                                </div>
                            </aside>
                            {/* END: IntakeTimeline */}

                            {/* BEGIN: VisaSummary */}
                            <aside className="bg-blue-50 p-8 rounded-[12px] border border-blue-100" data-purpose="visa-loan-info">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Visa & Loan Summary</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-bold text-[#2b6cee] uppercase mb-1">Visa Type</p>
                                        <p className="text-sm text-gray-700">{university.visaType}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#2b6cee] uppercase mb-1">Processing Time</p>
                                        <p className="text-sm text-gray-700">{university.processingTime}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#2b6cee] uppercase mb-1">Education Loans</p>
                                        <p className="text-sm text-gray-700 leading-relaxed">Interest rates between <span className="font-bold">{university.loanInterestRate}</span>.</p>
                                    </div>
                                </div>
                            </aside>
                            {/* END: VisaSummary */}
                        </div>
                        {/* END: RightSidebar */}
                    </div>

                    {/* BEGIN: BottomAction */}
                    <div className="mt-12 md:mt-24 text-center pb-12 md:pb-20">
                        <div className="inline-block p-6 md:p-12 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
                            <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 px-2">Ready to start your application?</h2>
                            <p className="text-[11px] md:text-base text-gray-500 mb-6 md:mb-8 leading-relaxed px-4">Get the complete university brochure including detailed course modules and alumni insights.</p>
                            <button
                                onClick={handleDownload}
                                className="w-full sm:w-auto bg-[#2b6cee] text-white px-6 py-3 md:px-10 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-lg shadow-blue-600/20 mx-auto active:scale-95"
                            >
                                <svg className="h-4 w-4 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                                </svg>
                                Download {university.name.length > 20 ? 'Info' : university.name} (PDF)
                            </button>
                        </div>
                    </div>
                    {/* END: BottomAction */}
                </div>
            </main>

            {/* BEGIN: FooterSimple */}
            <footer className="bg-white border-t border-gray-100 py-4 md:py-8 shrink-0">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-[10px] md:text-sm text-gray-400">© 2023 EAOverseas Education Platform. All rights reserved.</p>
                </div>
            </footer>
            {/* END: FooterSimple */}
        </div>
    );
};

export default UniversityDetails;
