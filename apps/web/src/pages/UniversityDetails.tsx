import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { jsPDF } from 'jspdf';
import { getCombinedUniversities } from '../utils/universityData';
import { useAuthAction } from '../hooks/useAuthAction';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';

const UniversityDetails = () => {
    const { id } = useParams();
    const universities = getCombinedUniversities();
    const university = universities.find(u => u.id === Number(id));
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
            const pageWidth = doc.internal.pageSize.getWidth();

            // Helper for centered text
            const centerText = (text: string, y: number, size = 12) => {
                doc.setFontSize(size);
                const textWidth = doc.getTextWidth(text);
                doc.text(text, (pageWidth - textWidth) / 2, y);
            };

            // Header Section
            doc.setFillColor(43, 108, 238); // Blue
            doc.rect(0, 0, pageWidth, 40, 'F');
            
            doc.setTextColor(255, 255, 255);
            centerText(university.name, 20, 24);
            centerText(`Global Ranking: #${university.globalRanking} | ${university.city}, ${university.country}`, 30, 12);

            // Overview Section
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(16);
            doc.text("University Overview", 20, 55);
            doc.line(20, 58, 70, 58);
            
            doc.setFontSize(10);
            const splitOverview = doc.splitTextToSize(university.overview, 170);
            doc.text(splitOverview, 20, 65);

            // Quick Stats Table
            doc.setFontSize(14);
            doc.text("Quick Snapshot", 20, 95);
            doc.line(20, 98, 60, 98);

            const stats = [
                ["Category", "Details"],
                ["Available Courses", university.coursesCount],
                ["Avg. Tuition Fees", university.avgTuition],
                ["Living Expenses", university.livingExpense],
                ["Work Rights", university.partTimeRights],
                ["Intakes", university.intakes]
            ];

            let startY = 105;
            stats.forEach((row, i) => {
                doc.setFont(undefined, i === 0 ? 'bold' : 'normal');
                doc.text(row[0], 25, startY);
                doc.text(row[1], 100, startY);
                doc.line(20, startY + 2, 190, startY + 2);
                startY += 10;
            });

            // Eligibility & Requirements
            doc.setFontSize(14);
            doc.text("Eligibility & Entrance Requirements", 20, 180);
            doc.line(20, 183, 100, 183);
            
            let reqY = 190;
            university.testRequirements.forEach(req => {
                doc.setFontSize(10);
                doc.setFont(undefined, 'bold');
                doc.text(`${req.label}:`, 25, reqY);
                doc.setFont(undefined, 'normal');
                doc.text(req.value, 80, reqY);
                reqY += 8;
            });

            // Application Journey (New Page)
            doc.addPage();
            doc.setFontSize(18);
            doc.setTextColor(43, 108, 238);
            doc.text("Your Application Journey", 20, 25);
            doc.line(20, 28, 190, 28);

            let journeyY = 40;
            university.admissionSteps.forEach(step => {
                doc.setFillColor(240, 247, 255);
                doc.rect(20, journeyY, 170, 20, 'F');
                doc.setFontSize(11);
                doc.setTextColor(43, 108, 238);
                doc.setFont(undefined, 'bold');
                doc.text(`Step ${step.step}: ${step.title}`, 25, journeyY + 8);
                doc.setFontSize(9);
                doc.setTextColor(100);
                doc.setFont(undefined, 'normal');
                doc.text(step.description, 25, journeyY + 14);
                journeyY += 25;
            });

            // Popular Courses
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text("Popular Programs", 20, journeyY + 10);
            doc.line(20, journeyY + 13, 70, journeyY + 13);

            const sampleCourses = [
                `• Bachelor of ${university.course} (${university.courseType})`,
                `• Master of ${university.course} (Postgraduate)`,
                `• Research Doctorate (PhD) in ${university.course}`,
                `• Diploma & Vocational Programs`
            ];
            doc.setFontSize(10);
            doc.text(sampleCourses, 25, journeyY + 23);

            // Footer
            doc.setFontSize(8);
            doc.setTextColor(150);
            const footerText = "Generated by EAOverseas Education Portal | © 2026 EAOverseas Global";
            doc.text(footerText, (pageWidth - doc.getTextWidth(footerText)) / 2, 285);

            doc.save(`${university.name.replace(/\s+/g, '_')}_Portfolio.pdf`);
        });
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#F8FAFC]">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            
            <PageHeader
                breadcrumbs={[
                    { label: 'University Directory', link: '/consultant/university-directory' },
                    { label: university.name }
                ]}
            />

            <main className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth text-sm">
                <div className="max-w-[95%] lg:max-w-5xl mx-auto pb-6 md:pb-8">
                    {/* Hero Section */}
                    <section className="mb-6 md:mb-8">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-blue-50 text-blue-600 text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">#{university.globalRanking} GLOBAL RANKING</span>
                                    <span className="bg-emerald-50 text-emerald-600 text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">{university.type}</span>
                                </div>
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tight">{university.name}</h1>
                                <p className="text-sm md:text-lg text-gray-500 flex items-center gap-2 mb-4 font-medium">
                                    <span className="material-symbols-outlined text-blue-500 text-[20px]">location_on</span>
                                    {university.city}, {university.country}
                                </p>
                                <div className="mb-6">
                                    <button 
                                        onClick={handleDownload}
                                        className="flex w-max items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                                        Export PDF Brochure
                                    </button>
                                </div>
                                <div className="p-4 md:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                                        University Overview
                                    </h3>
                                    <p className="text-xs md:text-base text-gray-600 leading-relaxed font-medium">
                                        {university.overview}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden lg:block w-72 shrink-0">
                                <div className="bg-white rounded-3xl p-6 text-gray-900 border border-blue-100 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                    <h3 className="text-lg font-black mb-6 relative z-10 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-blue-600">bar_chart</span>
                                        Quick Stats
                                    </h3>
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Acceptance Rate</span>
                                            <span className="font-black text-emerald-600">{university.acceptanceRate || '18%'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Satisfaction</span>
                                            <span className="font-black text-blue-600">4.8/5.0</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Employment</span>
                                            <span className="font-black text-purple-600">92%</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">QS Ranking</span>
                                            <span className="font-black text-orange-500">#{university.rankingQS || university.globalRanking}</span>
                                        </div>
                                    </div>
                                    <button onClick={handleDownload} className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-xl font-black text-xs hover:bg-blue-700 transition-colors uppercase tracking-widest shadow-md shadow-blue-600/20 active:scale-95">
                                        Get Prospectus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stats Grid */}
                    <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8 md:mb-12">
                        <div className="bg-white p-3 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-blue-200 transition-all">
                            <div className="size-8 md:size-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[20px] md:text-[24px]">school</span>
                            </div>
                            <span className="text-[11px] md:text-sm font-black text-gray-900 leading-tight">{university.coursesCount} Courses</span>
                            <span className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-widest">Available Programs</span>
                        </div>
                        <div className="bg-white p-3 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-emerald-200 transition-all">
                            <div className="size-8 md:size-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[20px] md:text-[24px]">payments</span>
                            </div>
                            <span className="text-[11px] md:text-sm font-black text-gray-900 leading-tight">{university.avgTuition} Avg</span>
                            <span className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-widest">Tuition Per Year</span>
                        </div>
                        <div className="bg-white p-3 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-orange-200 transition-all">
                            <div className="size-8 md:size-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-2 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[20px] md:text-[24px]">home_work</span>
                            </div>
                            <span className="text-[11px] md:text-sm font-black text-gray-900 leading-tight">{university.livingExpense}</span>
                            <span className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-widest">Living Cost/mo</span>
                        </div>
                        <div className="bg-white p-3 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-purple-200 transition-all">
                            <div className="size-8 md:size-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[20px] md:text-[24px]">calendar_today</span>
                            </div>
                            <span className="text-[11px] md:text-sm font-black text-gray-900 leading-tight">{university.intakes.split(' ')[0]} / {university.intakes.split(' ')[2] || 'Annual'}</span>
                            <span className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-widest">Major Intakes</span>
                        </div>
                        <div className="bg-white p-3 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-indigo-200 transition-all col-span-2 md:col-span-1">
                            <div className="size-8 md:size-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[20px] md:text-[24px]">work_history</span>
                            </div>
                            <span className="text-[11px] md:text-sm font-black text-gray-900 leading-tight">{university.partTimeRights}</span>
                            <span className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-widest">Post-study Work</span>
                        </div>
                    </section>

                    <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Courses Section (New) */}
                            <section id="courses">
                                <h2 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 text-gray-900">
                                    <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                                    Popular Available Courses
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: `Bachelor of ${university.course}`, type: university.courseType, duration: '3-4 Years', fee: university.avgTuition },
                                        { name: `Master of ${university.course}`, type: 'Postgraduate', duration: '1-2 Years', fee: `£${parseInt(university.avgTuition.replace(/[^0-9]/g, '')) + 5000}` },
                                        { name: `PhD in ${university.course}`, type: 'Research', duration: '3-5 Years', fee: 'Full Funding Available' },
                                        { name: `Diploma in ${university.course}`, type: 'Vocational', duration: '1 Year', fee: '£15,000' }
                                    ].map((course, i) => (
                                        <div key={i} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-black text-gray-900 text-sm md:text-base group-hover:text-blue-600 transition-colors">{course.name}</h4>
                                                <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">{course.type}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="material-symbols-outlined text-[14px]">timer</span>
                                                    <span>Duration: {course.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="material-symbols-outlined text-[14px]">payments</span>
                                                    <span>Est. Fee: {course.fee}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Application Journey Section */}
                            <section id="journey">
                                <h2 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 text-gray-900">
                                    <span className="w-1.5 h-8 bg-emerald-600 rounded-full"></span>
                                    Application Journey
                                </h2>
                                <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                                    {university.admissionSteps.map((step) => (
                                        <div key={step.step} className="relative group">
                                            <div className="absolute -left-[31px] top-0 size-6 rounded-full bg-white border-4 border-gray-100 group-hover:border-emerald-500 transition-colors z-10"></div>
                                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group-hover:border-emerald-100 transition-all">
                                                <h4 className="font-black text-gray-900 text-sm md:text-base mb-1">Step {step.step}: {step.title}</h4>
                                                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Eligibility Section */}
                            <section id="eligibility">
                                <h2 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 text-gray-900">
                                    <span className="w-1.5 h-8 bg-orange-600 rounded-full"></span>
                                    Eligibility & Requirements
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-orange-500">verified</span>
                                            Entrance Exams
                                        </h3>
                                        <ul className="space-y-4">
                                            {university.testRequirements.map((req, index) => (
                                                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                                    <span className="text-xs font-bold text-gray-600">{req.label}</span>
                                                    <span className="text-xs font-black text-gray-900">{req.value}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-orange-500">description</span>
                                            Required Documents
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Academic Transcripts', 'Passport Copy', 'CV / Resume', 'Personal Statement', '2 Recommendation Letters', 'Financial Proof'].map((doc, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-lg border border-gray-100 uppercase tracking-wider">{doc}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Fees & Funding Section */}
                            <section id="fees">
                                <h2 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 text-gray-900">
                                    <span className="w-1.5 h-8 bg-purple-600 rounded-full"></span>
                                    Fees & Funding
                                </h2>
                                <div className="space-y-6">
                                    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="p-5 font-black text-[10px] uppercase tracking-widest text-gray-500">Expense Category</th>
                                                    <th className="p-5 font-black text-[10px] uppercase tracking-widest text-gray-500 text-right">Estimated Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                <tr>
                                                    <td className="p-5 text-sm font-bold text-gray-900 flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-blue-500 text-[18px]">payments</span>
                                                        Tuition Fees
                                                    </td>
                                                    <td className="p-5 text-sm font-black text-gray-900 text-right">{university.avgTuition} <span className="text-[10px] text-gray-400 font-bold">/ YEAR</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-5 text-sm font-bold text-gray-900 flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-emerald-500 text-[18px]">home</span>
                                                        Living Expenses
                                                    </td>
                                                    <td className="p-5 text-sm font-black text-gray-900 text-right">{university.livingExpense} <span className="text-[10px] text-gray-400 font-bold">/ MONTH</span></td>
                                                </tr>
                                                <tr className="bg-blue-50/30">
                                                    <td className="p-5 text-sm font-black text-blue-600">Total Estimated (1st Year)</td>
                                                    <td className="p-5 text-sm font-black text-blue-600 text-right">
                                                        {`£${(parseInt(university.avgTuition.replace(/[^0-9]/g, '')) + (parseInt(university.livingExpense.replace(/[^0-9]/g, '')) * 12)).toLocaleString()}`}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {university.scholarships.map((sch, index) => (
                                            <div key={index} className="p-5 bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest border ${
                                                        sch.type === 'Fully Funded' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                                    }`}>{sch.type}</span>
                                                    <span className="text-[10px] font-black text-gray-400">{sch.deadline}</span>
                                                </div>
                                                <h4 className="font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-sm">{sch.title}</h4>
                                                <p className="text-xs text-gray-500 leading-relaxed font-medium">{sch.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <aside className="bg-white text-gray-900 border border-blue-100 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl"></div>
                                <h3 className="text-base font-black mb-6 relative z-10 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600 text-[20px]">event_available</span>
                                    Intake Deadlines
                                </h3>
                                <div className="space-y-6 relative z-10">
                                    <div className="relative pl-6 border-l-2 border-gray-100 pb-1">
                                        <div className="absolute -left-[9px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Fall Intake</p>
                                        <h4 className="font-black text-xs mb-0.5">{university.deadlineFall === 'No Winter Intake' ? 'Annual Intake' : 'Main Intake'}</h4>
                                        <p className="text-[11px] text-gray-500 font-bold">Apply by: {university.deadlineFall}</p>
                                    </div>
                                    {university.deadlineWinter !== 'No Winter Intake' && (
                                        <div className="relative pl-6 border-l-2 border-gray-100">
                                            <div className="absolute -left-[9px] top-1 w-3.5 h-3.5 rounded-full bg-orange-500 ring-4 ring-orange-50"></div>
                                            <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-1">Winter Intake</p>
                                            <h4 className="font-black text-xs mb-0.5">Secondary Intake</h4>
                                            <p className="text-[11px] text-gray-500 font-bold">Apply by: {university.deadlineWinter}</p>
                                        </div>
                                    )}
                                </div>
                            </aside>

                            <aside className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">article</span>
                                    Visa & Loans
                                </h3>
                                <div className="space-y-6">
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Visa Processing</p>
                                        <p className="text-xs font-black text-gray-900 mb-1">{university.visaType}</p>
                                        <p className="text-[11px] font-medium text-gray-500">{university.processingTime} Est. time</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Financing Options</p>
                                        <p className="text-xs font-black text-gray-900 mb-1">Education Loans Available</p>
                                        <p className="text-[11px] font-medium text-gray-500">Interest: {university.loanInterestRate}</p>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="bg-white border-t border-gray-100 py-6 md:py-10 shrink-0">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-[11px] md:text-sm text-gray-400 font-bold uppercase tracking-widest">© 2026 EAOverseas Education Global. Premium University Directory.</p>
                </div>
            </footer>
        </div>
    );
};

export default UniversityDetails;
