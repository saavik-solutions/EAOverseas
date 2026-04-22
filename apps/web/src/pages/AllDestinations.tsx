import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AllDestinations = () => {
    const navigate = useNavigate();
    // Mock Data for Destinations
    const allDestinations = [
        { name: 'United States', code: 'US', subtitle: 'Ivy League Excellence & Innovation', icon: 'school' },
        { name: 'United Kingdom', code: 'GB', subtitle: 'Historic Prestige & Global Hub', icon: 'history_edu' },
        { name: 'Canada', code: 'CA', subtitle: 'Diverse Culture & Work Rights', icon: 'work' },
        { name: 'Germany', code: 'DE', subtitle: 'Engineering Hub of Europe', icon: 'engineering' },
        { name: 'Australia', code: 'AU', subtitle: 'Sun, Sand & World-Class Research', icon: 'sunny' },
        { name: 'France', code: 'FR', subtitle: 'Art, Fashion & Culinary Capital', icon: 'brush' },
        { name: 'Japan', code: 'JP', subtitle: 'Tradition Meets Innovation', icon: 'precision_manufacturing' },
        { name: 'Ireland', code: 'IE', subtitle: 'Silicon Valley of Europe', icon: 'settings_ethernet' },
        { name: 'Netherlands', code: 'NL', subtitle: 'English-Taught & Open Minded', icon: 'wind_power' },
        { name: 'Singapore', code: 'SG', subtitle: 'Gateway to Asia & Finance', icon: 'apartment' },
        { name: 'New Zealand', code: 'NZ', subtitle: 'Innovation & Natural Beauty', icon: 'landscape' },
        { name: 'Sweden', code: 'SE', subtitle: 'Sustainability & Creativity', icon: 'lightbulb' },
        { name: 'Switzerland', code: 'CH', subtitle: 'Excellence in Hospitality', icon: 'verified' },
        { name: 'Italy', code: 'IT', subtitle: 'Art, History & Architecture', icon: 'architecture' },
        { name: 'South Korea', code: 'KR', subtitle: 'Leading Technology & Culture', icon: 'devices' },
        { name: 'Spain', code: 'ES', subtitle: 'Vibrant Culture & Heritage', icon: 'festival' },
        { name: 'Finland', code: 'FI', subtitle: 'World\'s Happiest Country', icon: 'mood' },
        { name: 'Norway', code: 'NO', subtitle: 'Nature & Sustainability', icon: 'forest' },
        { name: 'Denmark', code: 'DK', subtitle: 'Design & Innovation', icon: 'draw' },
        { name: 'Belgium', code: 'BE', subtitle: 'Heart of European Politics', icon: 'gavel' },
        { name: 'Austria', code: 'AT', subtitle: 'Classical Music & Arts', icon: 'piano' },
        { name: 'Portugal', code: 'PT', subtitle: 'Affordable Quality of Life', icon: 'savings' },
        { name: 'Malaysia', code: 'MY', subtitle: 'Diverse & Affordable Education', icon: 'diversity_3' },
        { name: 'China', code: 'CN', subtitle: 'Global Economic Powerhouse', icon: 'currency_yuan' },
        { name: 'Hong Kong', code: 'HK', subtitle: 'Global Business Hub', icon: 'business_center' },
        { name: 'UAE', code: 'AE', subtitle: 'Luxury & Modernity', icon: 'diamond' },
        { name: 'Poland', code: 'PL', subtitle: 'Emerging Tech Hub', icon: 'computer' },
        { name: 'Czech Republic', code: 'CZ', subtitle: 'Historic Beauty & Education', icon: 'castle' },
        { name: 'Hungary', code: 'HU', subtitle: 'Rich Culture & History', icon: 'menu_book' },
        { name: 'Turkey', code: 'TR', subtitle: 'Bridge Between East & West', icon: 'connecting_airports' },
        { name: 'Russia', code: 'RU', subtitle: 'Scientific Excellence', icon: 'science' },
        { name: 'Brazil', code: 'BR', subtitle: 'Biodiversity & Culture', icon: 'eco' },
        { name: 'Argentina', code: 'AR', subtitle: 'Passionate Culture', icon: 'music_note' },
        { name: 'Mexico', code: 'MX', subtitle: 'Rich History & Cuisine', icon: 'restaurant' },
        { name: 'South Africa', code: 'ZA', subtitle: 'Diversity & Opportunity', icon: 'groups' },
        { name: 'Egypt', code: 'EG', subtitle: 'Ancient Civilization', icon: 'pyramid' },
        { name: 'Thailand', code: 'TH', subtitle: 'Land of Smiles', icon: 'sentiment_satisfied' },
        { name: 'Vietnam', code: 'VN', subtitle: 'Rapid Economic Growth', icon: 'trending_up' },
        { name: 'Indonesia', code: 'ID', subtitle: 'Archipelago of Opportunity', icon: 'sailing' },
        { name: 'Philippines', code: 'PH', subtitle: 'English Speaking Hub', icon: 'translate' },
        { name: 'Greece', code: 'GR', subtitle: 'Cradle of Western Civilization', icon: 'museum' },
        { name: 'Iceland', code: 'IS', subtitle: 'Land of Fire & Ice', icon: 'ac_unit' },
        { name: 'Luxembourg', code: 'LU', subtitle: 'Financial Center', icon: 'account_balance' },
        { name: 'Cyprus', code: 'CY', subtitle: 'Mediterranean Lifestyle', icon: 'beach_access' },
        { name: 'Malta', code: 'MT', subtitle: 'Historic Island Nation', icon: 'fort' },
        { name: 'Estonia', code: 'EE', subtitle: 'Digital Society', icon: 'wifi' },
        { name: 'Latvia', code: 'LV', subtitle: 'Green & Dynamic', icon: 'park' },
        { name: 'Lithuania', code: 'LT', subtitle: 'Fintech Hub', icon: 'payments' },
        { name: 'Slovakia', code: 'SK', subtitle: 'Heart of Europe', icon: 'favorite' },
        { name: 'Slovenia', code: 'SI', subtitle: 'Green Treasure of Europe', icon: 'recycling' },
        { name: 'Romania', code: 'RO', subtitle: 'Fast Internet & Growth', icon: 'speed' },
        { name: 'Bulgaria', code: 'BG', subtitle: 'Affordable Excellence', icon: 'price_check' },
        { name: 'Croatia', code: 'HR', subtitle: 'Stunning Coastline', icon: 'water' },
        { name: 'Serbia', code: 'RS', subtitle: 'Vibrant Nightlife & Culture', icon: 'nightlife' }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-[#111418]">
            <Navbar />

            <main className="w-full">
                {/* Header Section */}
                <div className="max-w-[1280px] mx-auto px-4 md:px-12 pt-4 md:pt-8 pb-4 md:pb-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-1 md:gap-2 text-slate-500 hover:text-[#2463eb] transition-colors mb-4 md:mb-6 font-medium group text-sm md:text-base"
                    >
                        <span className="material-symbols-outlined text-lg md:text-2xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Back
                    </button>

                    <h1 className="text-2xl md:text-5xl font-black mb-2 md:mb-4 tracking-tight text-[#111218]">
                        Explore Study Destinations
                    </h1>
                    <p className="text-xs md:text-lg text-slate-600 max-w-2xl leading-relaxed">
                        Find your perfect academic home by filtering through regions, budgets, and post-study opportunities.
                    </p>
                </div>

                {/* Results Section */}
                <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-4 md:py-10">

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {allDestinations.map((dest, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/country/${dest.code}`)}
                                className={`group relative bg-white rounded-xl md:rounded-[2rem] border border-blue-100 p-3 md:p-8 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden min-h-[160px] md:min-h-[280px] flex flex-col justify-between`}
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
                                    <div className="size-10 md:size-16 rounded-xl md:rounded-2xl bg-white flex items-center justify-center mb-2 md:mb-6 shadow-sm border border-slate-100 overflow-hidden">
                                        <img
                                            src={`https://flagcdn.com/w160/${dest.code.toLowerCase()}.png`}
                                            alt={`${dest.name} flag`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-sm md:text-2xl font-bold text-[#111218] mb-1 md:mb-3 tracking-tight leading-tight">{dest.name}</h3>
                                    <p className="font-medium text-slate-500 text-[10px] md:text-sm leading-tight md:leading-relaxed max-w-[95%] line-clamp-2 md:line-clamp-none">{dest.subtitle}</p>
                                </div>

                                {/* View Insights - Visible on Mobile, Hover on Desktop */}
                                <div className="relative z-10 mt-2 md:mt-6 flex items-center gap-1 md:gap-2 text-[#2463eb] font-bold text-[9px] md:text-sm opacity-100 translate-x-0 md:opacity-0 md:-translate-x-2 group-hover:md:opacity-100 group-hover:md:translate-x-0 transition-all duration-300">
                                    View Insights <span className="material-symbols-outlined text-[10px] md:text-lg">arrow_forward</span>
                                </div>

                                {/* Watermark Icon */}
                                <div className="absolute -right-3 -bottom-3 md:-right-6 md:-bottom-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                                    <span className="material-symbols-outlined !text-[50px] md:!text-[140px]">{dest.icon || 'school'}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Trigger (Visual Only) */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium">
                            <span className="material-symbols-outlined animate-bounce">expand_more</span>
                            You've reached the end of the list
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllDestinations;
