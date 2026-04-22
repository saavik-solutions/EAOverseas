import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useNotification } from '../context/NotificationContext';

const VisaPrep = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    // Search Bar Component to pass to PageHeader actions
    const SearchAction = (
        <div className="relative flex items-center hidden md:flex">
            <span className="material-symbols-outlined absolute left-3 text-gray-400">search</span>
            <input
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                placeholder="Search countries, docs..."
                type="text"
            />
        </div>
    );

    return (
        <div className="flex-1 flex flex-col h-full min-w-0 bg-[#f6f6f8] relative overflow-hidden font-display">
            <div className="hidden lg:block">
                <PageHeader title="Visas" actions={SearchAction} />
            </div>

            <div className="flex-1 overflow-y-auto p-8 scroll-smooth z-10">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Section 1: Visa Entry Card */}
                    <section className="relative overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row min-h-[300px]">
                        {/* Left Content */}
                        <div className="flex-1 p-5 md:p-12 flex flex-col justify-center gap-6 z-10">
                            <div className="space-y-3">
                                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">New Application</span>
                                <h3 className="text-2xl md:text-3xl font-bold text-[#111318] leading-tight">Apply for Your Student Visa</h3>
                                <p className="text-[#616f89] text-sm md:text-lg max-w-lg leading-relaxed">
                                    Fast, guided visa application with document tracking and real-time updates for all major study destinations.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4 items-start">
                                <button
                                    onClick={() => {
                                        addNotification({
                                            title: 'Visa Application Initiated',
                                            message: 'You have started the visa application process.',
                                            type: 'info',
                                            icon: 'airplane_ticket',
                                            actionUrl: '/visa-application/confirm'
                                        });
                                        navigate('/visa-application/confirm');
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 md:py-3 md:px-8 rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 text-sm md:text-base"
                                >
                                    Start Visa Application
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </button>
                                <a className="text-blue-600 text-sm font-semibold underline underline-offset-4 hover:text-blue-700" href="#">Check visa eligibility</a>
                            </div>
                        </div>
                        {/* Right Content (Visual) */}
                        <div className="hidden md:flex flex-1 relative bg-gradient-to-br from-blue-600/5 via-blue-50 to-indigo-50 items-center justify-center p-8 overflow-hidden">
                            <div className="absolute inset-0 opacity-30 pointer-events-none bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/world-map.png')" }}></div>
                            {/* Floating Pills */}
                            {/* Map Pins */}
                            <div className="relative w-full h-full">
                                {/* USA */}
                                <div className="absolute top-[35%] left-[20%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                                    <span className="material-symbols-outlined text-red-600 text-3xl drop-shadow-md animate-bounce" style={{ animationDuration: '3s' }}>location_on</span>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-800 whitespace-nowrap z-20">USA</div>
                                </div>
                                {/* Canada */}
                                <div className="absolute top-[15%] left-[22%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                                    <span className="material-symbols-outlined text-red-600 text-3xl drop-shadow-md animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>location_on</span>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-800 whitespace-nowrap z-20">Canada</div>
                                </div>
                                {/* UK */}
                                <div className="absolute top-[24%] left-[48%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                                    <span className="material-symbols-outlined text-red-600 text-3xl drop-shadow-md animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>location_on</span>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-800 whitespace-nowrap z-20">UK</div>
                                </div>
                                {/* Germany */}
                                <div className="absolute top-[28%] left-[53%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                                    <span className="material-symbols-outlined text-red-600 text-3xl drop-shadow-md animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>location_on</span>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-800 whitespace-nowrap z-20">Germany</div>
                                </div>
                                {/* India */}
                                <div className="absolute top-[48%] left-[70%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                                    <span className="material-symbols-outlined text-red-600 text-3xl drop-shadow-md animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2.5s' }}>location_on</span>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-800 whitespace-nowrap z-20">India</div>
                                </div>
                                {/* Australia */}
                                <div className="absolute top-[78%] left-[88%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                                    <span className="material-symbols-outlined text-red-600 text-3xl drop-shadow-md animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.8s' }}>location_on</span>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-800 whitespace-nowrap z-20">Australia</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Country Selection (Endless Carousel) */}
                    <section className="space-y-4 overflow-hidden">
                        <style>
                            {`
                                @keyframes scroll {
                                    0% { transform: translateX(-50%); }
                                    100% { transform: translateX(0); }
                                }
                                .animate-infinite-scroll {
                                    animation: scroll 40s linear infinite;
                                }
                                .animate-infinite-scroll:hover {
                                    animation-play-state: paused;
                                }
                            `}
                        </style>
                        <h2 className="text-xl md:text-[22px] font-bold tracking-tight text-[#111318]">Choose Your Destination</h2>
                        <div className="flex w-full overflow-hidden mask-gradient-sides">
                            <div className="flex gap-4 w-max animate-infinite-scroll">
                                {/* Country Cards - Doubled for seamless loop */}
                                {[
                                    { name: 'United States', image: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=400' },
                                    { name: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400' },
                                    { name: 'Canada', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400' },
                                    { name: 'Australia', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=400' },
                                    { name: 'Germany', image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=400' },
                                    { name: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400' },
                                    { name: 'Ireland', image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=400' },
                                    { name: 'New Zealand', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=400' },
                                    { name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=400' },
                                    { name: 'Netherlands', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a2?auto=format&fit=crop&w=400' },
                                    { name: 'Sweden', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=400' },
                                    { name: 'Japan', image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=400' },
                                    { name: 'South Korea', image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=400' },
                                    { name: 'Italy', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400' },
                                    { name: 'Spain', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=400' },
                                    // Duplicate
                                    { name: 'United States', image: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=400' },
                                    { name: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400' },
                                    { name: 'Canada', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400' },
                                    { name: 'Australia', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=400' },
                                    { name: 'Germany', image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=400' },
                                    { name: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400' },
                                    { name: 'Ireland', image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=400' },
                                    { name: 'New Zealand', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=400' },
                                    { name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=400' },
                                    { name: 'Netherlands', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a2?auto=format&fit=crop&w=400' },
                                    { name: 'Sweden', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=400' },
                                    { name: 'Japan', image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=400' },
                                    { name: 'South Korea', image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=400' },
                                    { name: 'Italy', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400' },
                                    { name: 'Spain', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=400' }
                                ].map((country, idx) => (
                                    <div key={idx} className="group cursor-pointer bg-white rounded-xl border border-gray-200 hover:border-blue-600 transition-all shadow-sm w-[200px] flex-shrink-0 overflow-hidden">
                                        <div className="h-32 w-full overflow-hidden">
                                            <img
                                                src={country.image}
                                                alt={country.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <p className="font-bold text-sm text-[#111318] text-center">{country.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Section 3: How This Works */}
                    <section className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold tracking-tight text-[#111318]">How This Works</h2>
                        <div className="flex flex-row overflow-x-auto md:grid md:grid-cols-4 snap-x snap-mandatory pt-2 pb-4 gap-4 no-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
                            {[
                                { step: '01', title: 'Select Country & Visa Type', desc: 'Choose your study destination and find specific requirements.', icon: 'map' },
                                { step: '02', title: 'Upload Documents', desc: 'Securely store and submit transcripts, IDs, and admission letters.', icon: 'upload_file' },
                                { step: '03', title: 'Complete Financial Proof', desc: 'Verify your funding through automated statements or certificates.', icon: 'account_balance' },
                                { step: '04', title: 'Track Visa Status', desc: 'Get real-time updates as your application moves through the process.', icon: 'notifications_active' }
                            ].map((item, idx) => (
                                <div key={idx} className="min-w-[85%] snap-center p-4 md:p-5 border border-gray-200 rounded-xl bg-white flex flex-col gap-3 shadow-sm md:shadow-none">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-2 rounded-lg">{item.icon}</span>
                                        <span className="text-xs font-bold text-gray-400">STEP {item.step}</span>
                                    </div>
                                    <p className="text-sm font-bold text-[#111318]">{item.title}</p>
                                    <p className="text-xs text-[#616f89] leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>


                </div>
            </div>
        </div>
    );
};

export default VisaPrep;
