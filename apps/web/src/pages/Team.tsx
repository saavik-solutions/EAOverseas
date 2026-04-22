import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { experts } from '../data/experts';

const Team = () => {
    const navigate = useNavigate();
    const teamMembers = experts;

    return (
        <div className="bg-[#f6f6f8] text-[#111218] font-sans antialiased min-h-screen">
            <Navbar />

            <main className="max-w-[1200px] mx-auto py-12 px-6">
                {/* Page Heading */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">Our Expert Team</h1>
                        <p className="text-[#636988] text-lg leading-relaxed">
                            Meet the dedicated professionals at EAOverseas committed to guiding your global education journey with integrity and expertise.
                        </p>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/expert-profile/${member.id}`)}
                            className="group bg-white rounded-xl p-4 shadow-sm transition-all duration-300 border border-transparent cursor-pointer hover:shadow-md"
                        >
                            <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                                <div
                                    className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-500"
                                    style={{ backgroundImage: `url(${member.image})` }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-lg font-bold leading-tight">{member.name}</h3>
                                <p className="text-[#193ce6] text-sm font-semibold mb-3">{member.role}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {member.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-1 bg-[#193ce6]/10 text-[#193ce6] text-[10px] font-bold uppercase rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                { /* Bio commented out or removed to follow 'only image' hover instruction strictly */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Talk to Consultant CTA */}
                <section className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#2563eb] mt-24 mb-10 text-center">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
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

export default Team;
