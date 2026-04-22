import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { experts } from '../data/experts';

const ExpertProfile = () => {
    const { expertId } = useParams();
    const expert = experts.find(e => e.id === expertId);

    if (!expert) {
        return (
            <div className="bg-white font-display text-[#111218] min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Expert Not Found</h2>
                        <p className="mb-6">Sorry, we couldn't find the expert you're looking for.</p>
                        <Link to="/team" className="text-blue-600 hover:underline">Back to Team</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-white font-display text-[#111218] transition-colors duration-300">
            <Navbar />
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header was here, replaced by Navbar */}

                <main className="max-w-[1280px] mx-auto w-full px-6 py-12">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row gap-8 mb-16">
                                <div className="w-full md:w-64 lg:w-80 aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
                                    <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${expert.image})` }}></div>
                                </div>
                                <div className="flex flex-col justify-center py-2">
                                    {/* Premium Expert badge removed */}
                                    <h1 className="text-4xl lg:text-5xl font-black text-[#111218] mb-2">{expert.name}</h1>
                                    <p className="text-xl text-[#636988] font-medium mb-8">{expert.role}</p>
                                    <div className="flex flex-wrap gap-8 py-6 border-y border-gray-100">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-[#193ce6]">{expert.stats.studentsGuided}</span>
                                            <span className="text-sm text-[#636988]">Students Guided</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-[#193ce6]">{expert.stats.visaSuccess}</span>
                                            <span className="text-sm text-[#636988]">Visa Success</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-[#193ce6]">{expert.stats.yearsExperience}</span>
                                            <span className="text-sm text-[#636988]">Years Experience</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="mb-16">
                                <h3 className="text-2xl font-bold mb-6 text-[#111218]">Professional Journey</h3>
                                <div className="prose prose-blue max-w-none space-y-4 text-[#4a4e69] leading-relaxed text-lg">
                                    {expert.journey.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </section>
                            <section className="mb-16">
                                <h3 className="text-2xl font-bold mb-8 text-[#111218]">Areas of Expertise</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {expert.expertise.map((item, index) => (
                                        <div key={index} className="p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#193ce6] mb-4">
                                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                            </div>
                                            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                            <p className="text-sm text-[#636988]">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                        {/* Sidebar removed */}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ExpertProfile;
