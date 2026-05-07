import { useNavigate, useParams, Link } from 'react-router-dom';
import PageHeader from '../../shared/components/layout/PageHeader';
import { scholarships } from '../../shared/data/scholarships';

const ScholarshipDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const scholarship = scholarships.find(s => String(s.id) === id);

    if (!scholarship) {
        return (
            <div className="flex flex-col h-full bg-[#faf8ff] items-center justify-center p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Scholarship Not Found</h2>
                <button onClick={() => navigate('/scholarships')} className="px-6 py-2 bg-[#0053cd] text-white rounded-lg">Back to Explore</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#faf8ff] overflow-hidden">
            <PageHeader 
                title="Scholarship Details" 
                breadcrumbs={[
                    { label: 'Explore', link: '/scholarships' },
                    { label: scholarship.title }
                ]}
            />

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-[1280px] mx-auto px-8 py-8 space-y-8 pb-24 lg:pb-12">
                    
                    {/* Scholarship Hero Section */}
                    <section className="relative overflow-hidden bg-white rounded-xl border border-[#dbdfe6] shadow-sm">
                        <div className="h-64 w-full relative">
                            <img alt={scholarship.title} className="w-full h-full object-cover" src={scholarship.image} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div className="space-y-2 text-white">
                                    <span className="inline-block px-3 py-1 bg-[#2b6cee] text-white text-[10px] font-black uppercase tracking-wider rounded">{scholarship.category || 'Academic'}</span>
                                    <h2 className="font-bold text-3xl">{scholarship.title}</h2>
                                    <p className="text-gray-200 text-sm flex items-center gap-2 font-medium">
                                        <span className="material-symbols-outlined text-[18px]">account_balance</span>
                                        {scholarship.provider}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="px-8 py-3.5 bg-white text-[#0053cd] font-black uppercase tracking-widest text-[11px] rounded-2xl hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-black/10">
                                        Apply Now
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </button>
                                    <button className="p-3 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl hover:bg-white/30 transition-all active:scale-95">
                                        <span className="material-symbols-outlined">bookmark</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Key Info Strip */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-[#dbdfe6] flex items-center gap-4 transition-all hover:shadow-md">
                            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-[#0053cd]">
                                <span className="material-symbols-outlined text-2xl">payments</span>
                            </div>
                            <div>
                                <p className="text-[#424654] text-[9px] font-black uppercase tracking-widest">Award Amount</p>
                                <p className="font-bold text-xl text-slate-900">{scholarship.amount}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-[#dbdfe6] flex items-center gap-4 transition-all hover:shadow-md">
                            <div className="h-12 w-12 rounded-lg bg-red-50 flex items-center justify-center text-rose-500">
                                <span className="material-symbols-outlined text-2xl">event</span>
                            </div>
                            <div>
                                <p className="text-[#424654] text-[9px] font-black uppercase tracking-widest">Deadline</p>
                                <p className="font-bold text-xl text-slate-900">{scholarship.deadline}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-[#dbdfe6] flex items-center gap-4 transition-all hover:shadow-md">
                            <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center text-emerald-600">
                                <span className="material-symbols-outlined text-2xl">verified_user</span>
                            </div>
                            <div>
                                <p className="text-[#424654] text-[9px] font-black uppercase tracking-widest">Eligibility</p>
                                <p className="font-bold text-xl text-slate-900">{scholarship.eligibility}</p>
                            </div>
                        </div>
                    </section>

                    {/* Main Layout: Grid Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Content Area (2/3) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About Section */}
                            <div className="bg-white rounded-xl border border-[#dbdfe6] overflow-hidden">
                                <div className="px-6 py-4 bg-slate-50 border-b border-[#dbdfe6]">
                                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#0053cd] text-[20px]">info</span>
                                        About this Scholarship
                                    </h3>
                                </div>
                                <div className="p-6 text-sm text-slate-600 leading-relaxed font-medium">
                                    <p className="mb-4 text-sm leading-relaxed">{scholarship.longDescription || scholarship.description}</p>
                                </div>
                            </div>

                            {/* Eligibility & Benefits Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Eligibility */}
                                <div className="bg-white rounded-xl border border-[#dbdfe6] flex flex-col">
                                    <div className="px-6 py-4 border-b border-slate-50">
                                        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-widest">
                                            <span className="material-symbols-outlined text-[#0053cd] text-xl">checklist</span>
                                            Eligibility Criteria
                                        </h3>
                                    </div>
                                    <div className="p-6 space-y-4 flex-1">
                                        {(scholarship.criteria || [
                                            "International student status (non-resident)",
                                            "GPA of 3.8+ or 90% equivalent",
                                            "Enrollment in an accredited program",
                                            "Demonstrated financial need profile"
                                        ]).map((text, i) => (
                                            <div key={i} className="flex gap-3">
                                                <span className="material-symbols-outlined text-[#0053cd] text-[18px]">check_circle</span>
                                                <span className="text-xs text-slate-600 font-medium">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Benefits */}
                                <div className="bg-white rounded-xl border border-[#dbdfe6] flex flex-col">
                                    <div className="px-6 py-4 border-b border-slate-50">
                                        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-widest">
                                            <span className="material-symbols-outlined text-orange-600 text-xl">redeem</span>
                                            Benefits
                                        </h3>
                                    </div>
                                    <div className="p-6 space-y-4 flex-1">
                                        {(scholarship.benefits || [
                                            "Tuition fee coverage",
                                            "Monthly living stipend",
                                            "Round-trip flight allowance",
                                            "Priority access to resources"
                                        ]).map((text, i) => (
                                            <div key={i} className="flex gap-3">
                                                <span className="material-symbols-outlined text-orange-600 text-[18px]">star</span>
                                                <span className="text-xs text-slate-600 font-medium">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Required Documents */}
                            <div className="bg-white rounded-xl border border-[#dbdfe6]">
                                <div className="px-6 py-4 border-b border-slate-50">
                                    <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-[#0053cd] text-xl">folder_zip</span>
                                        Required Documents
                                    </h3>
                                </div>
                                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { icon: 'description', label: 'Academic Transcripts' },
                                        { icon: 'article', label: 'Statement of Purpose' },
                                        { icon: 'history_edu', label: 'Letters of Recommendation' },
                                        { icon: 'contact_page', label: 'Proof of English Proficiency' }
                                    ].map((doc, i) => (
                                        <div key={i} className="p-4 bg-slate-50 rounded-xl flex items-center gap-4 border border-transparent hover:border-blue-100 transition-colors cursor-pointer">
                                            <span className="material-symbols-outlined text-[#0053cd]">{doc.icon}</span>
                                            <div className="text-xs font-bold text-slate-900">{doc.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar (1/3) */}
                        <div className="space-y-8">
                            {/* Help Widget */}
                            <div className="bg-[#0053cd] rounded-xl p-6 text-white text-center space-y-4 shadow-xl shadow-blue-100 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                                    <span className="material-symbols-outlined text-2xl">support_agent</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold text-sm">Need assistance?</p>
                                    <p className="text-[11px] opacity-80 leading-relaxed font-medium px-2">Our advisors are available for application reviews and consultations.</p>
                                </div>
                                <button className="w-full py-2.5 bg-white text-[#0053cd] font-black uppercase tracking-widest text-[9px] rounded-lg hover:bg-blue-50 transition-colors shadow-lg shadow-black/10">Book a Call</button>
                            </div>

                            {/* How to Apply: Vertical Flow */}
                            <div className="bg-white rounded-xl border border-[#dbdfe6] p-6 lg:p-7">
                                <h3 className="font-bold text-base mb-8 text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#0053cd]">assignment_turned_in</span>
                                    How to Apply
                                </h3>
                                <div className="space-y-8 relative">
                                    {/* Vertical Connector Line */}
                                    <div className="absolute left-6 top-2 bottom-6 w-px bg-slate-100 -z-0"></div>
                                    
                                    {/* Step 1 */}
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="h-12 w-12 rounded-full bg-[#0053cd] text-white flex items-center justify-center font-bold shadow-lg shadow-blue-100 shrink-0">1</div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 mb-1">Online Profile</p>
                                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Create your student portal account and verify identity.</p>
                                        </div>
                                    </div>
                                    
                                    {/* Step 2 */}
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="h-12 w-12 rounded-full bg-[#0053cd] text-white flex items-center justify-center font-bold shadow-lg shadow-blue-100 shrink-0">2</div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 mb-1">Upload Dossier</p>
                                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Securely upload all academic and financial documents.</p>
                                        </div>
                                    </div>
                                    
                                    {/* Step 3 */}
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="h-12 w-12 rounded-full bg-[#0053cd] text-white flex items-center justify-center font-bold shadow-lg shadow-blue-100 shrink-0">3</div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 mb-1">Interview Prep</p>
                                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Selected finalists will be invited for a virtual panel.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipDetails;
