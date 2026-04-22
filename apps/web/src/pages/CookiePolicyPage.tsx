import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicy = () => {
    return (
        <div className="bg-white text-[#111418] font-sans antialiased">
            <Navbar />
            <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12">
                <section className="mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4">Cookie Policy</h1>
                    <p className="text-base md:text-lg text-gray-600">
                        Learn how we use cookies to improve your experience on EAOverseas.
                    </p>
                </section>

                <section className="space-y-6 md:space-y-8">
                    <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#307de8]">What are Cookies?</h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Cookies are small text files placed on your device when you visit our website. They help us recognize your browser and remember certain information to enhance your experience.
                        </p>
                    </div>

                    <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#307de8]">How We Use Cookies</h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                            We use cookies for various purposes:
                        </p>
                        <ul className="list-disc pl-5 md:pl-6 space-y-1.5 md:space-y-2 text-gray-600 text-sm md:text-base">
                            <li>Authentication & Security - To keep your account safe</li>
                            <li>Preferences - To remember your settings</li>
                            <li>Analytics - To understand how you use our site</li>
                            <li>Performance - To ensure fast page loading</li>
                        </ul>
                    </div>

                    <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#307de8]">Types of Cookies</h2>
                        <div className="space-y-3 md:space-y-4">
                            <div className="border-l-4 border-blue-600 pl-3 md:pl-4">
                                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Essential Cookies</h3>
                                <p className="text-gray-600 text-xs md:text-sm">
                                    Required for the website to function. Cannot be disabled.
                                </p>
                            </div>
                            <div className="border-l-4 border-green-600 pl-3 md:pl-4">
                                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Analytics Cookies</h3>
                                <p className="text-gray-600 text-xs md:text-sm">
                                    Help us understand visitor behavior and improve our platform.
                                </p>
                            </div>
                            <div className="border-l-4 border-purple-600 pl-3 md:pl-4">
                                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Marketing Cookies</h3>
                                <p className="text-gray-600 text-xs md:text-sm">
                                    Used to show you relevant advertisements on other sites.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#307de8]">Your Choices</h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            You can control cookies through your browser settings. However, blocking certain cookies may impact your experience on our website. Most modern browsers allow you to manage cookie preferences in their privacy settings.
                        </p>
                    </div>

                    <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#307de8]">Contact Us</h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                            If you have questions about our cookie policy, please contact us:
                        </p>
                        <div className="space-y-1.5 md:space-y-2 text-gray-600 text-sm md:text-base">
                            <p>Email: info@eaoverseas.com</p>
                            <p>Phone: +1 (555) 123-4367</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CookiePolicy;
