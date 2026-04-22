import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Countries = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleAIAssistant = () => {
        if (user) {
            navigate('/ai-profile');
        } else {
            navigate('/login', { state: { from: '/ai-profile' } });
        }
    };

    const destinations = [
        {
            name: 'United States',
            code: 'US',
            flag: '🇺🇸',
            tag: 'Top Tier',
            tagColor: 'bg-green-100 text-green-700',
            subtitle: 'Ivy League Excellence & Innovation',
            icon: 'school'
        },
        {
            name: 'United Kingdom',
            code: 'GB',
            flag: '🇬🇧',
            tag: 'High ROI',
            tagColor: 'bg-blue-100 text-blue-700',
            subtitle: 'Historic Prestige & Global Hub',
            icon: 'history_edu'
        },
        {
            name: 'Canada',
            code: 'CA',
            flag: '🇨🇦',
            tag: 'Permanent Residency',
            tagColor: 'bg-red-100 text-red-700',
            subtitle: 'Diverse Culture & Work Rights',
            icon: 'work'
        },
        {
            name: 'Australia',
            code: 'AU',
            flag: '🇦🇺',
            tag: 'Lifestyle',
            tagColor: 'bg-indigo-100 text-indigo-700',
            subtitle: 'Sun, Sand & World-Class Research',
            icon: 'sunny'
        },
        {
            name: 'Germany',
            code: 'DE',
            flag: '🇩🇪',
            tag: 'No Tuition',
            tagColor: 'bg-orange-100 text-orange-700',
            subtitle: 'Engineering Hub of Europe',
            icon: 'engineering'
        },
        {
            name: 'Ireland',
            code: 'IE',
            flag: '🇮🇪',
            tag: 'Tech Hub',
            tagColor: 'bg-purple-100 text-purple-700',
            subtitle: 'Silicon Valley of Europe',
            icon: 'settings_ethernet'
        },
        {
            name: 'France',
            code: 'FR',
            flag: '🇫🇷',
            tag: 'Culture',
            tagColor: 'bg-pink-100 text-pink-700',
            subtitle: 'Art, Fashion & Culinary Capital',
            icon: 'brush'
        },
        {
            name: 'New Zealand',
            code: 'NZ',
            flag: '🇳🇿',
            tag: 'Adventure',
            tagColor: 'bg-teal-100 text-teal-700',
            subtitle: 'Innovation & Natural Beauty',
            icon: 'landscape'
        },
        {
            name: 'Japan',
            code: 'JP',
            flag: '🇯🇵',
            tag: 'Technology',
            tagColor: 'bg-red-50 text-red-600',
            subtitle: 'Tradition Meets Innovation',
            icon: 'precision_manufacturing'
        },
        {
            name: 'Singapore',
            code: 'SG',
            flag: '🇸🇬',
            tag: 'Global Hub',
            tagColor: 'bg-cyan-100 text-cyan-700',
            subtitle: 'Gateway to Asia & Finance',
            icon: 'apartment'
        },
        {
            name: 'Netherlands',
            code: 'NL',
            flag: '🇳🇱',
            tag: 'Sustainability',
            tagColor: 'bg-amber-100 text-amber-700',
            subtitle: 'English-Taught & Open Minded',
            icon: 'wind_power'
        },
        {
            name: 'Sweden',
            code: 'SE',
            flag: '🇸🇪',
            tag: 'Innovation',
            tagColor: 'bg-blue-50 text-blue-600',
            subtitle: 'Sustainability & Creativity',
            icon: 'lightbulb'
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-[#111418] overflow-x-hidden">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section with Abstract Map */}
                <div className="relative w-full bg-[#f4f8ff] overflow-hidden py-12 md:py-20 px-4 md:px-20 lg:px-40">
                    {/* Abstract Map Background Decoration */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" data-location="world">
                        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
                            <circle className="map-pin text-[#2463eb] animate-[float_3s_ease-in-out_infinite]" cx="200" cy="150" fill="currentColor" r="2" style={{ animationDelay: '0s' }}></circle>
                            <circle className="map-pin text-[#2463eb] animate-[float_3s_ease-in-out_infinite]" cx="450" cy="280" fill="currentColor" r="2" style={{ animationDelay: '0.5s' }}></circle>
                            <circle className="map-pin text-[#2463eb] animate-[float_3s_ease-in-out_infinite]" cx="700" cy="120" fill="currentColor" r="2" style={{ animationDelay: '1.2s' }}></circle>
                            <circle className="map-pin text-[#2463eb] animate-[float_3s_ease-in-out_infinite]" cx="850" cy="350" fill="currentColor" r="2" style={{ animationDelay: '0.8s' }}></circle>
                            <path className="text-[#2463eb]/30" d="M150 100 Q 300 50 450 150 T 800 100" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                            <path className="text-[#2463eb]/30" d="M100 300 Q 400 350 700 250 T 900 400" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                        </svg>
                    </div>
                    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                        <span className="px-4 py-1.5 rounded-full bg-[#2463eb]/10 text-[#2463eb] text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">Discover the World</span>
                        <h1 className="text-3xl md:text-6xl font-black leading-tight tracking-[-0.033em] mb-4 md:mb-6 text-[#111218]">
                            Choose Your <span className="text-[#2463eb]">Study Destination</span>
                        </h1>
                        <p className="text-sm md:text-lg text-slate-600 mb-6 md:mb-10 max-w-2xl">
                            AI-powered insights to help you find your perfect academic home. Compare tuition, lifestyle, and career outcomes in one place.
                        </p>
                    </div>
                </div>

                {/* Grey Background Section */}
                <div className="w-full bg-[#f8f9fc] pb-20 pt-6 md:pt-10">
                    {/* Showcase Grid */}
                    <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-10">
                        <div className="mb-8 md:mb-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111218]">Popular Study Destinations</h2>
                                {/* Desktop Button */}
                                <button
                                    onClick={() => navigate('/all-destinations')}
                                    className="hidden md:flex bg-white text-[#2463eb] px-6 py-3 rounded-full font-bold text-base items-center gap-2 shadow-sm hover:shadow-md hover:gap-3 transition-all"
                                >
                                    View more countries <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                </button>
                            </div>
                            <p className="text-slate-500 max-w-lg mb-6 md:mb-0">Handpicked locations with high student satisfaction and globally recognized credentials.</p>

                            {/* Mobile Button - Below Text */}
                            <button
                                onClick={() => navigate('/all-destinations')}
                                className="md:hidden w-full bg-white text-[#2463eb] px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm border border-slate-100"
                            >
                                View more countries <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {destinations.map((dest, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/country/${dest.code}`)}
                                    className="group relative bg-white rounded-[1.5rem] md:rounded-[2rem] border border-blue-100 p-5 md:p-8 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden min-h-[220px] md:min-h-[280px] flex flex-col justify-between"
                                >
                                    {/* Flowing Lines Background */}
                                    <div className="absolute inset-0 opacity-10 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <svg className="w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>
                                            </defs>
                                            <path d="M0,100 C100,150 200,50 400,100" fill="none" stroke="#2463eb" strokeWidth="2" opacity="0.4" filter="url(#glow)" />
                                            <path d="M0,200 C150,250 250,150 400,200" fill="none" stroke="#2463eb" strokeWidth="2" opacity="0.2" filter="url(#glow)" />
                                        </svg>
                                    </div>

                                    <div className="relative z-10 flex flex-col items-start text-left">
                                        <div className="size-12 md:size-16 rounded-2xl bg-white flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-slate-100 overflow-hidden">
                                            <img
                                                src={`https://flagcdn.com/w160/${dest.code.toLowerCase()}.png`}
                                                alt={`${dest.name} flag`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-[#111218] mb-2 md:mb-3 tracking-tight">{dest.name}</h3>
                                        <p className="font-medium text-slate-500 text-xs md:text-sm leading-relaxed max-w-[90%]">{dest.subtitle}</p>
                                    </div>

                                    {/* View Insights - Visible on Mobile, Hover on Desktop */}
                                    <div className="relative z-10 mt-2 md:mt-6 flex items-center gap-1 md:gap-2 text-[#2463eb] font-bold text-[10px] md:text-sm opacity-100 translate-x-0 md:opacity-0 md:-translate-x-2 group-hover:md:opacity-100 group-hover:md:translate-x-0 transition-all duration-300">
                                        View Insights <span className="material-symbols-outlined text-sm md:text-lg">arrow_forward</span>
                                    </div>

                                    {/* Watermark Icon */}
                                    <div className="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                                        <span className="material-symbols-outlined !text-[100px] md:!text-[140px]">{dest.icon}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* AI Callout Section */}
                    <section className="px-4 md:px-6 relative z-10">
                        <div className="max-w-4xl mx-auto rounded-[2rem] md:rounded-[3rem] relative overflow-hidden text-center p-6 md:p-16 border border-white/60 shadow-[0_20px_50px_-12px_rgba(36,99,235,0.15)] bg-gradient-to-br from-white/80 via-white/50 to-white/80 backdrop-blur-xl">
                            {/* Designer Background Elements */}
                            <div className="absolute -top-24 -right-24 size-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute -bottom-24 -left-24 size-96 bg-[#2463eb]/15 rounded-full blur-3xl pointer-events-none"></div>

                            {/* Flowing Lines SVG */}
                            <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0,100 C150,200 350,0 500,100 C650,200 750,50 800,150" stroke="#2463eb" strokeWidth="2" fill="none" />
                                    <path d="M0,200 C200,100 300,300 500,200 C700,100 800,250 800,250" stroke="#2463eb" strokeWidth="2" fill="none" />
                                    <path d="M0,300 C100,200 400,400 600,300 C750,200 800,350 800,350" stroke="#2463eb" strokeWidth="1.5" fill="none" />
                                </svg>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="size-12 md:size-16 rounded-2xl bg-gradient-to-br from-[#2463eb]/10 to-[#2463eb]/5 flex items-center justify-center mb-4 md:mb-8 ring-1 ring-[#2463eb]/20 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-[#2463eb] text-2xl md:text-3xl">auto_awesome</span>
                                </div>

                                <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-6 tracking-tight text-slate-900 leading-tight">
                                    Still not sure where to go?
                                </h2>

                                <p className="text-slate-600 mb-6 md:mb-10 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
                                    Our AI advisor can suggest the perfect country and university based on your background and career goals.
                                </p>

                                <button
                                    onClick={handleAIAssistant}
                                    className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-[#2463eb] px-6 py-3 md:px-10 md:py-4 text-white font-bold shadow-xl shadow-blue-600/20 transition-all hover:scale-105 hover:shadow-blue-600/40"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    <span className="relative flex items-center gap-2 md:gap-3 text-sm md:text-base">
                                        Try AI Assistant
                                        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Countries;
