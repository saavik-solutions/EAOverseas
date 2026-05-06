import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="bg-[#f6f6f8] text-[#111317] font-sans antialiased">
            <Navbar />

            <main className="max-w-[1000px] mx-auto px-6 py-12">
                {/* Page Header */}
                <section className="mb-16">
                    <div className="mb-4">
                        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
                            How we collect, use, and protect your personal information on your journey overseas.
                        </p>
                    </div>
                </section>

                {/* Privacy at a Glance */}
                <section className="mb-20" id="summary">
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <span className="material-symbols-outlined text-[#3f6ee4]">dashboard</span>
                        <h2 className="text-2xl font-bold tracking-tight">Privacy at a Glance</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-blue-50 text-[#3f6ee4] rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-xl">data_usage</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">What We Collect</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Personal and academic data required for your applications.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-blue-50 text-[#3f6ee4] rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-xl">lightbulb</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Why We Collect It</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">To personalize your experience and improve our services.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-blue-50 text-[#3f6ee4] rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-xl">encrypted</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">How We Protect It</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Enterprise-grade encryption and secure infrastructure.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-blue-50 text-[#3f6ee4] rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-xl">settings_accessibility</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Your Control</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">You always own your data and can request deletion anytime.</p>
                        </div>
                    </div>
                </section>

                {/* Main Content Sections */}
                <div className="flex flex-col gap-12">
                    {/* Data Collection */}
                    <section className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100" id="collection">
                        <div className="max-w-3xl">
                            <h2 className="text-[#3f6ee4] text-sm font-black uppercase tracking-widest mb-4">Section 1</h2>
                            <h3 className="text-3xl font-bold mb-6">Data Collection</h3>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                We collect information to provide better services to all our users. This includes everything from basic details like your name to complex data like academic transcripts.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col gap-3">
                                    <span className="material-symbols-outlined text-[#3f6ee4] text-3xl">person_search</span>
                                    <h4 className="font-bold text-lg">Personal Data</h4>
                                    <ul className="text-gray-500 text-sm space-y-2">
                                        <li>• Name & Email</li>
                                        <li>• Contact Information</li>
                                        <li>• Identification Documents</li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="material-symbols-outlined text-[#3f6ee4] text-3xl">school</span>
                                    <h4 className="font-bold text-lg">Academic Data</h4>
                                    <ul className="text-gray-500 text-sm space-y-2">
                                        <li>• Transcripts & Grades</li>
                                        <li>• Test Scores (IELTS, GRE)</li>
                                        <li>• University Preferences</li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="material-symbols-outlined text-[#3f6ee4] text-3xl">devices</span>
                                    <h4 className="font-bold text-lg">Usage Data</h4>
                                    <ul className="text-gray-500 text-sm space-y-2">
                                        <li>• IP Address</li>
                                        <li>• Browser Type</li>
                                        <li>• Interaction Logs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Usage & Sharing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Usage */}
                        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#3f6ee4]">trending_up</span>
                                Data Usage
                            </h3>
                            <p className="text-gray-500 mb-6 text-sm">We use your data to improve our platform and personalize your journey.</p>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-[#3f6ee4]">check_circle</span>
                                    <span className="text-sm font-medium">To personalize university recommendations</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-[#3f6ee4]">check_circle</span>
                                    <span className="text-sm font-medium">To facilitate your application process</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-[#3f6ee4]">check_circle</span>
                                    <span className="text-sm font-medium">To improve site navigation and performance</span>
                                </li>
                            </ul>
                        </section>
                        {/* Sharing */}
                        <section className="bg-blue-50 rounded-xl p-8 shadow-sm border border-blue-100">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#3f6ee4]">handshake</span>
                                Data Sharing
                            </h3>
                            <p className="text-gray-500 mb-6 text-sm">We prioritize your trust. Here is how we handle sharing.</p>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-green-500">verified</span>
                                    <span className="text-sm font-semibold">We NEVER sell your data to third parties</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-[#3f6ee4]">info</span>
                                    <span className="text-sm font-medium">Shared only with selected universities</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-[#3f6ee4]">info</span>
                                    <span className="text-sm font-medium">Trusted service providers (AWS, Stripe)</span>
                                </li>
                            </ul>
                        </section>
                    </div>

                    {/* Security & Rights */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8" id="security">
                        <div className="bg-[#3f6ee4] text-white rounded-xl p-8 shadow-lg">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-white">admin_panel_settings</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Security Measures</h3>
                            <p className="text-white/80 text-sm leading-relaxed mb-6">
                                We use industry-standard encryption protocols (SSL/TLS) to protect your data during transmission and rest. Our systems are monitored 24/7 for potential threats.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold bg-white/10 p-2 rounded w-fit">
                                <span className="material-symbols-outlined text-xs">lock</span>
                                AES-256 ENCRYPTION
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100" id="rights">
                            <div className="w-12 h-12 bg-[#3f6ee4]/10 rounded-lg flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#3f6ee4]">gavel</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Your Rights</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                You have the right to access, update, or delete your personal data. We provide tools in your account settings to manage these preferences easily.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-[#f6f6f8] px-3 py-1 rounded-full text-xs font-bold">DATA PORTABILITY</span>
                                <span className="bg-[#f6f6f8] px-3 py-1 rounded-full text-xs font-bold">RIGHT TO FORGET</span>
                                <span className="bg-[#f6f6f8] px-3 py-1 rounded-full text-xs font-bold">CORRECTION</span>
                            </div>
                        </div>
                    </section>

                    {/* Cookies & Final Notes */}
                    <section className="border-t border-gray-200 pt-12 pb-20">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Cookies & Tracking</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Our website uses cookies to distinguish you from other users and help us provide you with a good experience when you browse. You can adjust your browser settings to refuse cookies, though some parts of the site may not function correctly.
                            </p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
