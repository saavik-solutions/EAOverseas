import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import blogDestinations from '@/features/landing/assets/blog_destinations.png';
import blogIelts from '@/features/landing/assets/blog_ielts.png';
import blogVisa from '@/features/landing/assets/blog_visa.png';

const Counter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);

            setCount(Math.floor(easeOutQuart * end));

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{count.toLocaleString()}</span>;
};

const AboutUs = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleExplore = () => {
        if (user) {
            navigate('/colleges');
        } else {
            navigate('/login', { state: { from: '/colleges' } });
        }
    };

    const handleBrowseCourses = () => {
        if (user) {
            navigate('/courses');
        } else {
            navigate('/login', { state: { from: '/courses' } });
        }
    };

    useEffect(() => {
        // Tailwind config is already in the project, so we don't need the script tag
        // Material symbols are likely already imported in index.html, if not we might need to add them or use existing icons
    }, []);

    return (
        <div className="bg-white text-[#111418] font-sans antialiased">
            <Navbar />
            <main className="max-w-[1200px] mx-auto px-6">
                {/* Hero Section */}
                <section className="py-8 md:py-24">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="flex flex-col gap-4 md:gap-6">
                            <div className="space-y-4 md:space-y-6">
                                <h1 className="text-2xl md:text-6xl font-black leading-[1.1] tracking-tight text-[#111418]">
                                    Shaping Global Education Decisions with Clarity and Confidence
                                </h1>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-[500px]">
                                    We are building a platform where students make informed study-abroad decisions backed by data, experience, and ethical guidance — not guesswork.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] bg-[#307de8]/10 rounded-3xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop')" }}></div>
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-12 bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl max-w-[200px] md:max-w-[280px]">
                                <p className="text-[#307de8] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 md:mb-2">OUR MISSION</p>
                                <p className="text-sm md:text-xl font-bold text-[#111418] leading-tight">
                                    Connectivity & Opportunity for every student.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who We Are - Modernized Redesign */}
                <section className="py-16 md:py-28 relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] pointer-events-none opacity-20">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400 rounded-full blur-[140px]"></div>
                    </div>

                    <div className="relative z-10 space-y-16">
                        <div className="text-center max-w-3xl mx-auto space-y-6">
                            <h2 className="text-sm md:text-base font-bold text-blue-600 tracking-[0.2em] uppercase">The Platform</h2>
                            <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1]">
                                Who We Are
                            </h3>
                            <p className="text-lg md:text-2xl text-gray-700 font-medium leading-relaxed italic">
                                "EAOverseas is built to help students make confident, well-informed decisions about studying abroad."
                            </p>
                        </div>

                        {/* Core Pillars Grid */}
                        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
                            {[
                                {
                                    icon: 'analytics',
                                    title: 'Data-Driven Insights',
                                    desc: 'We bring structure to a fragmented process using verified global education data to guide every recommendation.'
                                },
                                {
                                    icon: 'verified_user',
                                    title: 'Ethical Guidance',
                                    desc: 'Rather than promoting predefined paths, we focus on understanding your unique profile and long-term aspirations.'
                                },
                                {
                                    icon: 'auto_awesome',
                                    title: 'Modern Technology',
                                    desc: 'Every tool within EAOverseas is designed to provide clarity and transparency, simplifying your international education journey.'
                                }
                            ].map((pillar, idx) => (
                                <div key={idx} className="bg-white/40 backdrop-blur-xl border border-gray-100 p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                        <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">{pillar.title}</h4>
                                    <p className="text-gray-600 leading-relaxed text-base">
                                        {pillar.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="max-w-3xl mx-auto text-center">
                            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                                We see international education not as a single milestone, but as a long-term journey — one that deserves <strong>clarity, responsibility, and trust</strong> at every step.
                            </p>
                        </div>
                    </div>
                </section>



                {/* Our Process */}
                <section className="py-10 md:py-20 bg-[#307de8]/5 rounded-[1.5rem] md:rounded-[2.5rem] px-6 md:px-10 my-6 md:my-10">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold">Our Simple 5-Step Process</h2>
                        <p className="text-sm md:text-gray-500 mt-2 md:mt-4 text-gray-500">We make the complex journey of studying abroad remarkably simple</p>
                    </div>
                    <div className="relative flex flex-col md:flex-row justify-between items-center md:items-center gap-6 md:gap-10">
                        {/* Progress Line */}
                        <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-[#307de8]/20 -z-10"></div>

                        {[
                            { step: 1, title: 'Understand Goals', desc: 'Deep dive into your interests and past profile.' },
                            { step: 2, title: 'Prepare for Exams', desc: 'IELTS, TOEFL, GRE, or GMAT training.' },
                            { step: 3, title: 'University Selection', desc: 'Shortlisting the best fit for your budget.' },
                            { step: 4, title: 'Application & Visa', desc: 'Documentation support and mock interviews.' },
                            { step: 5, title: 'Ready to Fly', desc: 'Pre-departure briefing and ticketing.' }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-center gap-2 md:gap-4 flex-1">
                                <div className="size-12 md:size-20 rounded-full bg-white shadow-lg border-2 md:border-4 border-[#307de8] flex items-center justify-center text-[#307de8] font-bold text-base md:text-xl">{item.step}</div>
                                <h4 className="font-bold text-sm md:text-base">{item.title}</h4>
                                <p className="text-[10px] md:text-xs text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Our Impact */}
                <section className="py-6 md:py-12 bg-white text-[#111418] rounded-xl md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden my-4 md:my-8 relative">
                    <div className="absolute inset-0 bg-blue-50/50 mix-blend-multiply"></div>
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center px-4 md:px-8">
                        {[
                            { count: 10000, suffix: '+', label: 'STUDENTS GUIDED' },
                            { count: 500, suffix: '+', label: 'UNIVERSITIES' },
                            { count: 20, suffix: '+', label: 'COUNTRIES' },
                            { count: 95, suffix: '%+', label: 'VISA SUCCESS' }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="text-xl md:text-4xl font-black text-[#307de8] mb-1 md:mb-2 flex items-center justify-center">
                                    <Counter end={item.count} duration={2000} />
                                    <span>{item.suffix}</span>
                                </div>
                                <div className="text-gray-400 md:text-gray-500 font-bold text-[10px] md:text-sm tracking-wider uppercase">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Students Choose Us - High-End Redesign */}
                <section className="py-20 md:py-32 relative">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-12">
                            <div className="space-y-4 pl-14 sm:pl-0">
                                <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">Our Philosophy</h2>
                                <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                    Why Students Choose <span className="text-blue-600">EAOverseas</span>
                                </h3>
                                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                                    Our approach is defined by modern aesthetics and rigorous academic ethics. We don't just process applications; we curate futures.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 relative sm:-ml-10">
                                {/* Subtle decorative line for mobile */}
                                <div className="absolute left-4 top-10 bottom-10 w-0.5 bg-blue-50 sm:hidden"></div>

                                {[
                                    {
                                        icon: 'lightbulb',
                                        title: 'Clarity Over Complexity',
                                        desc: 'We simplify the daunting study-abroad process into clear, actionable steps.'
                                    },
                                    {
                                        icon: 'psychology',
                                        title: 'Profile-First Thinking',
                                        desc: 'Your aspirations drive our strategy. We build paths around people, not vice versa.'
                                    },
                                    {
                                        icon: 'public',
                                        title: 'Global Perspective',
                                        desc: 'Access to a network of 500+ universities across 20+ top study destinations.'
                                    },
                                    {
                                        icon: 'gavel',
                                        title: 'Ethical Guidance',
                                        desc: 'Unbiased, transparent counseling that always puts the student’s best interest first.'
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="group relative pl-14 p-6 sm:p-10 bg-white sm:border sm:border-gray-50 sm:rounded-3xl sm:shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500">
                                        <div className="absolute left-4 sm:static w-8 h-8 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                            <span className="material-symbols-outlined text-lg sm:text-2xl">{item.icon}</span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Creative Visuals */}
                        <div className="lg:col-span-5 relative">
                            {/* Decorative base shape */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -z-10"></div>

                            <div className="relative z-10">
                                {/* Main Image Card */}
                                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl transition-transform duration-700">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110 rounded-[4rem]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-[4rem]"></div>
                                </div>

                                {/* Floating Glass Card */}
                                <div className="absolute -bottom-6 -left-8 bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 max-w-[200px] md:max-w-[240px] hidden md:block animate-float">
                                    <div className="flex gap-0.5 mb-2">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <span key={i} className="material-symbols-outlined text-yellow-400 text-xs md:text-sm fill-current">star</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-900 font-bold text-base mb-1">"Life Changing Experience"</p>
                                    <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed">Trusted by over 10,000 students worldwide to fulfill their academic dreams.</p>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute top-4 -right-6 w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-transform duration-300 cursor-default">
                                    <span className="text-base md:text-xl font-black leading-none">95%</span>
                                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">Success</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-10 md:py-20 grid md:grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 group hover:bg-[#307de8] hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-blue-500/20">
                        <span className="material-symbols-outlined text-[#307de8] text-3xl md:text-4xl mb-4 md:mb-6 group-hover:text-white transition-colors">rocket_launch</span>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#111418] group-hover:text-white transition-colors">Our Mission</h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-blue-50 transition-colors">
                            To democratize access to global education by providing transparent, expert-led, and personalized guidance that helps every student reach their maximum potential, regardless of their background.
                        </p>
                    </div>
                    <div className="bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 group hover:bg-[#307de8] hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-blue-500/20">
                        <span className="material-symbols-outlined text-[#307de8] text-3xl md:text-4xl mb-4 md:mb-6 group-hover:text-white transition-colors">visibility</span>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#111418] group-hover:text-white transition-colors">Our Vision</h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-blue-50 transition-colors">
                            To become the world's most trusted platform for international student mobility, where technology and human empathy come together to bridge the gap between local talent and global opportunities.
                        </p>
                    </div>
                </section>

                {/* Our Initiatives */}
                <section className="py-10 md:py-20 mb-6 md:mb-10">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#111418]">Blogs</h2>
                        <p className="text-sm md:text-lg text-gray-600 max-w-2xl leading-relaxed">
                            Stay updated with the latest insights, news, and guides from EAOverseas. Our experts share valuable information to help you navigate your global education journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {[
                            {
                                id: 2,
                                img: blogDestinations,
                                title: 'Top 10 Study Destinations for 2026',
                                desc: 'Exploring the most vibrant and student-friendly cities across the globe for the upcoming academic year.',
                                className: 'col-span-2 md:col-span-1'
                            },
                            {
                                id: 1,
                                img: blogIelts,
                                title: 'Mastering the IELTS: Expert Tips',
                                desc: 'A comprehensive guide on how to prepare for and excel in your language proficiency tests with confidence.'
                            },
                            {
                                id: 3,
                                img: blogVisa,
                                title: 'Navigating Visa Regulations',
                                desc: 'Understanding the latest changes in international student visa policies and how they impact your plans.'
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/blogs/${item.id}`)}
                                className={`bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer ${item.className || ''}`}
                            >
                                <div className="h-40 md:h-56 overflow-hidden">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-[#111418]">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-xs md:text-sm">{item.desc}</p>
                                    <button className="text-[#307de8] text-sm md:text-base font-bold hover:underline inline-flex items-center gap-1">
                                        Read more
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Talk to Consultant CTA */}
                <section className="relative rounded-[1.5rem] md:rounded-3xl overflow-hidden bg-[#2563eb] mb-10 md:mb-20 text-center">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        {/* Abstract background circles similar to image */}
                        <div className="absolute -top-12 md:-top-24 -left-12 md:-left-24 size-40 md:size-80 border-2 border-white/10 rounded-full"></div>
                        <div className="absolute top-1/2 -right-12 md:-right-24 size-48 md:size-96 border-2 border-white/10 rounded-full"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center py-10 md:py-16 px-6 text-center">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-10">
                            Talk to Our Consultant Now
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-2xl">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 md:py-3 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 backdrop-blur-sm text-sm md:text-base"
                            />
                            <input
                                type="text"
                                placeholder="Phone No."
                                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 md:py-3 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 backdrop-blur-sm text-sm md:text-base"
                            />
                            <button className="bg-[#0f172a] hover:bg-black text-white font-medium px-8 py-2.5 md:py-3 rounded-lg transition-colors shadow-lg text-sm md:text-base">
                                Send
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
