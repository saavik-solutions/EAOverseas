import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
    return (
        <div className="bg-[#f6f6f8] text-[#475569] font-display min-h-screen flex flex-col">
            <Navbar />

            <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-6 md:py-10 flex-1 w-full">
                {/* Page Heading Section */}
                <div className="flex flex-wrap justify-between items-end gap-4 md:gap-6 mb-8 md:mb-12">
                    <div className="flex min-w-72 flex-col gap-2 md:gap-3 max-w-2xl">
                        <h1 className="text-[#1e293b] text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Terms & Conditions</h1>
                        <p className="text-[#475569] text-base md:text-lg font-normal leading-relaxed">
                            Welcome to EAOverseas. By accessing or using our website and platform, you agree to comply with and be bound by these Terms of Service.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 md:gap-12">
                    {/* Left Column: Sticky Sidebar */}
                    <aside className="lg:w-72 flex-shrink-0 hidden lg:block">
                        <div className="sticky top-24 flex flex-col gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="mb-2">
                                <h3 className="text-[#1e293b] text-base font-bold uppercase tracking-wider">Navigation</h3>
                                <p className="text-[#475569] text-xs font-medium">Quick Jump to Section</p>
                            </div>
                            <nav className="flex flex-col gap-1">
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#3f6ee4] font-semibold bg-slate-50" href="#acceptance">
                                    <span className="material-symbols-outlined text-[20px]">info</span>
                                    <span className="text-sm">Acceptance of Terms</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#1e293b]" href="#eligibility">
                                    <span className="material-symbols-outlined text-[20px]">person_check</span>
                                    <span className="text-sm font-semibold">Eligibility & Use</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#1e293b]" href="#content">
                                    <span className="material-symbols-outlined text-[20px]">copyright</span>
                                    <span className="text-sm font-semibold">Content & IP</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#1e293b]" href="#disclaimer">
                                    <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
                                    <span className="text-sm font-semibold">Educational Disclaimer</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#1e293b]" href="#liability">
                                    <span className="material-symbols-outlined text-[20px]">balance</span>
                                    <span className="text-sm font-semibold">Limitation of Liability</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#1e293b]" href="#responsibilities">
                                    <span className="material-symbols-outlined text-[20px]">task</span>
                                    <span className="text-sm font-semibold">User Responsibilities</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#1e293b]" href="#indemnification">
                                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                                    <span className="text-sm font-semibold">Indemnification</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#1e293b]" href="#modifications">
                                    <span className="material-symbols-outlined text-[20px]">update</span>
                                    <span className="text-sm font-semibold">Modifications</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#1e293b]" href="#law">
                                    <span className="material-symbols-outlined text-[20px]">gavel</span>
                                    <span className="text-sm font-semibold">Governing Law</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-all text-[#1e293b]" href="#contact">
                                    <span className="material-symbols-outlined text-[20px]">contact_support</span>
                                    <span className="text-sm font-semibold">Contact Information</span>
                                </a>
                            </nav>
                        </div>
                    </aside>

                    {/* Right Column: Main Content */}
                    <div className="flex-1 max-w-[800px] flex flex-col gap-10">
                        {/* Section 1: Acceptance of Terms */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="acceptance">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">01.</span> Acceptance of Terms
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] text-sm md:text-base">
                                <p>By visiting, registering, or using EAOverseas, you confirm that you have read, understood, and agreed to these Terms of Service, along with any applicable policies referenced on the platform.</p>
                                <p>These terms apply to all users, including students, parents, counsellors, partners, and visitors.</p>
                                <p className="text-sm italic text-slate-500">If you do not agree with these terms, please refrain from using the platform.</p>
                            </div>
                        </section>

                        {/* Section 2: Eligibility and Use of the Platform */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="eligibility">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">02.</span> Eligibility and Use of the Platform
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] text-sm md:text-base">
                                <div>
                                    <p className="font-semibold text-[#1e293b] mb-2">Eligibility</p>
                                    <p>You must be at least 13 years of age, or the minimum legal age required in your jurisdiction, to use this platform. If you are under the age of majority, you confirm that you are using the platform with parental or legal guardian consent.</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1e293b] mb-2">Acceptable Use</p>
                                    <p>You agree to use EAOverseas only for lawful purposes and in a manner that does not disrupt, damage, or misuse the platform.</p>
                                </div>
                                <div className="bg-[#3f6ee4]/5 border-l-4 border-[#3f6ee4] p-3 md:p-4 rounded-r-lg">
                                    <p className="font-semibold text-[#3f6ee4] mb-2 text-sm md:text-base">You must not:</p>
                                    <ul className="list-disc pl-5 md:pl-6 space-y-1.5 md:space-y-2 marker:text-[#3f6ee4] text-sm md:text-base">
                                        <li>Attempt unauthorized access to any part of the platform</li>
                                        <li>Upload malicious code, viruses, or harmful data</li>
                                        <li>Misrepresent your identity or provide false information</li>
                                        <li>Engage in spamming, scraping, or abusive behavior</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Platform Content and Intellectual Property */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="content">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">03.</span> Platform Content and Intellectual Property
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] text-sm md:text-base">
                                <p>All content available on EAOverseas — including text, designs, logos, graphics, illustrations, software, and platform features — is owned by EAOverseas or its licensed partners and is protected under applicable intellectual property laws.</p>
                                <p>You may not copy, reproduce, modify, distribute, or use any content without prior written permission, except for personal and non-commercial use.</p>
                            </div>
                        </section>

                        {/* Section 4: Educational Information Disclaimer */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="disclaimer">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">04.</span> Educational Information Disclaimer
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] text-sm md:text-base">
                                <p>EAOverseas provides informational and guidance-based content related to overseas education, exams, universities, and processes.</p>
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-3 md:p-4 rounded-r-lg">
                                    <p className="font-semibold text-amber-700 mb-2">Important Notice:</p>
                                    <ul className="list-disc pl-5 md:pl-6 space-y-1.5 md:space-y-2 marker:text-amber-600 text-sm md:text-base text-amber-900">
                                        <li>We do not guarantee admissions, visas, scholarships, or outcomes</li>
                                        <li>All decisions made using the platform are at the user's discretion</li>
                                        <li>Information may change based on universities, governments, or third-party institutions</li>
                                        <li>Users are encouraged to verify details independently where required</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 5: Limitation of Liability */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="liability">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">05.</span> Limitation of Liability
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] bg-slate-50 p-4 md:p-6 rounded-lg md:rounded-xl border border-slate-200 text-sm md:text-base">
                                <p className="font-bold text-[#1e293b] uppercase text-xs md:text-sm tracking-wide mb-2">Notice of Exclusion of Liability</p>
                                <p>EAOverseas is provided on an "as is" and "as available" basis.</p>
                                <p className="font-semibold text-[#1e293b]">To the fullest extent permitted by law, EAOverseas shall not be liable for:</p>
                                <ul className="list-disc pl-5 md:pl-6 space-y-1.5 md:space-y-2 marker:text-[#3f6ee4] text-sm md:text-base">
                                    <li>Any direct or indirect losses</li>
                                    <li>Data loss or service interruptions</li>
                                    <li>Decisions made based on platform information</li>
                                    <li>Delays caused by third-party institutions</li>
                                </ul>
                                <p className="font-semibold text-[#1e293b] mt-4">Your use of the platform is at your own risk.</p>
                            </div>
                        </section>

                        {/* Section 6: User Responsibilities */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="responsibilities">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">06.</span> User Responsibilities
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] text-sm md:text-base">
                                <p>You are responsible for:</p>
                                <ul className="list-disc pl-5 md:pl-6 space-y-1.5 md:space-y-2 marker:text-[#3f6ee4] text-sm md:text-base">
                                    <li>Maintaining the confidentiality of your account credentials</li>
                                    <li>Providing accurate and updated information</li>
                                    <li>All activities conducted under your account</li>
                                </ul>
                                <p className="font-semibold text-[#1e293b] mt-4">EAOverseas reserves the right to suspend or terminate access if these terms are violated.</p>
                            </div>
                        </section>

                        {/* Section 7: Indemnification */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="indemnification">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">07.</span> Indemnification
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] text-sm md:text-base">
                                <p>You agree to indemnify and hold harmless EAOverseas, its team members, partners, and affiliates from any claims, losses, damages, or expenses arising from:</p>
                                <ul className="list-disc pl-5 md:pl-6 space-y-1.5 md:space-y-2 marker:text-[#3f6ee4] text-sm md:text-base">
                                    <li>Your misuse of the platform</li>
                                    <li>Violation of these Terms</li>
                                    <li>Infringement of any third-party rights</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 8: Modifications to These Terms */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="modifications">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">08.</span> Modifications to These Terms
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] text-sm md:text-base">
                                <p>EAOverseas may update or revise these Terms of Service at any time. Any changes will be reflected on this page with an updated revision date.</p>
                                <p className="font-semibold text-[#1e293b]">Continued use of the platform after updates constitutes acceptance of the revised terms.</p>
                            </div>
                        </section>

                        {/* Section 9: Governing Law and Jurisdiction */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="law">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">09.</span> Governing Law and Jurisdiction
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] text-sm md:text-base">
                                <p>These Terms shall be governed by and interpreted in accordance with the laws of India.</p>
                                <p>Any disputes arising from the use of EAOverseas shall be subject to the exclusive jurisdiction of courts located in India.</p>
                            </div>
                        </section>

                        {/* Section 10: Contact Information */}
                        <section className="scroll-mt-32 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md" id="contact">
                            <h2 className="text-[#1e293b] text-xl md:text-2xl font-bold leading-tight mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="text-[#3f6ee4]/40 text-lg md:text-2xl">10.</span> Contact Information
                            </h2>
                            <div className="space-y-3 md:space-y-4 leading-relaxed text-[#475569] text-sm md:text-base">
                                <p>If you have any questions or concerns regarding these Terms of Service, you may contact us at:</p>
                                <div className="bg-[#3f6ee4]/5 border border-[#3f6ee4]/20 p-4 md:p-5 rounded-lg">
                                    <ul className="space-y-2 text-sm md:text-base">
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[#3f6ee4] text-[20px]">mail</span>
                                            <span><span className="font-semibold">Email:</span> info@eaoverseas.com</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[#3f6ee4] text-[20px]">phone</span>
                                            <span><span className="font-semibold">Phone:</span> +91 9701563362</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Important Note - Highlighted Box */}
                        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 md:p-8 rounded-xl md:rounded-2xl border-2 border-blue-200 shadow-lg">
                            <div className="flex items-start gap-3 md:gap-4">
                                <span className="material-symbols-outlined text-blue-600 text-3xl md:text-4xl mt-1">info</span>
                                <div className="space-y-2 md:space-y-3">
                                    <h3 className="text-[#1e293b] text-lg md:text-xl font-bold">Important Note</h3>
                                    <p className="text-[#475569] text-sm md:text-base leading-relaxed">
                                        EAOverseas is a guidance and information platform. We aim to support informed decision-making, not replace official authorities or institutions.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;
