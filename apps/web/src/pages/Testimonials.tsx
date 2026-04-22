import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { longFormStories } from '../data/studentStories';

const Testimonials = () => {
    const [visibleCount, setVisibleCount] = React.useState(2);
    const [expandedCard, setExpandedCard] = React.useState(null);
    const stories = longFormStories;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 2);
    };

    const handleCardClick = (index) => {
        // Only toggle on mobile (screens < 768px)
        if (window.innerWidth < 768) {
            setExpandedCard(expandedCard === index ? null : index);
        }
    };

    return (
        <div className="bg-white font-display text-[#111218] antialiased min-h-screen">
            <Navbar />

            <main className="max-w-[1200px] mx-auto px-6 py-12">
                {/* Page Heading */}
                <section className="mb-12">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-black leading-tight tracking-[-0.033em] mb-4">Real Stories, <span className="text-primary text-[#193ce6]">Real Success</span></h1>
                        <p className="text-lg text-gray-600 leading-relaxed">Discover authentic experiences from our global community of students and parents who turned their international education dreams into reality.</p>
                    </div>
                </section>

                {/* Testimonials Grid */}
                {/* Testimonials Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {/* Testimonial Data */}
                    {[
                        {
                            quote: "The step-by-step guidance for my UK university applications made a complex process feel effortless. I couldn't have done it without them.",
                            name: "Aarav Mehta",
                            role: "MSc Data Science, UK",
                            image: "/images/testimonials/aarav_mehta_portrait_1769769634237.png"
                        },
                        {
                            quote: "As a parent, I was worried about the visa process. EAOverseas was professional, transparent, and kept us updated every single day.",
                            name: "Sarah Jenkins",
                            role: "Parent of Graduate",
                            image: "/images/testimonials/sarah_jenkins_portrait_1769769651144.png"
                        },
                        {
                            quote: "The test prep courses helped me jump from a 6.5 to an 8.0 in IELTS. The teachers are truly experts in their field.",
                            name: "Li Wei",
                            role: "Test Prep Candidate",
                            image: "/images/testimonials/li_wei_portrait_1769769551760.png"
                        },
                        {
                            quote: "I was confused between Canada and Australia. Their university selection tool and counseling session gave me total clarity.",
                            name: "Pragya Singh",
                            role: "Bachelors, Australia",
                            image: "/images/testimonials/priya_singh_portrait_1769769569078.png"
                        },
                        {
                            quote: "The visa guidance was flawless. I received my F-1 visa for the USA without a single hitch. Highly recommended.",
                            name: "David Miller",
                            role: "MBA, USA",
                            image: "/images/testimonials/david_miller_portrait_1769769667933.png"
                        },
                        {
                            quote: "Finding a scholarship felt impossible until I joined EAOverseas. They found opportunities I didn't even know existed.",
                            name: "Elena Rossi",
                            role: "Scholarship Recipient, EU",
                            image: "/images/testimonials/elena_rossi_portrait_1769769684028.png"
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleCardClick(index)}
                            className="relative h-[320px] rounded-2xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            {/* Base Layer: Image (Gallery View) */}
                            <div
                                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${expandedCard === index ? 'md:scale-100 scale-110' : ''
                                    }`}
                                style={{ backgroundImage: `url('${item.image}')` }}
                            >
                                {/* Overlay gradient */}
                                <div className={`absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 ${expandedCard === index ? 'md:opacity-10 opacity-0' : ''
                                    }`}></div>
                            </div>

                            {/* Hover Layer: Details (The white card content) */}
                            <div className={`absolute inset-0 bg-white p-8 transition-all duration-300 flex flex-col justify-between ${expandedCard === index
                                ? 'opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                                : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                                }`}>
                                <div>
                                    <div className="text-[#193ce6] mb-4">
                                        <span className="material-symbols-outlined text-[40px]">format_quote</span>
                                    </div>
                                    <p className="text-gray-700 italic leading-relaxed text-lg">"{item.quote}"</p>
                                </div>
                                <div className="flex items-center gap-4 mt-4">
                                    <div
                                        className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-primary/10"
                                        style={{ backgroundImage: `url('${item.image}')` }}
                                    ></div>
                                    <div>
                                        <h4 className="font-bold text-[#111218] text-lg">{item.name}</h4>
                                        <p className="text-sm text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* In Their Own Words: Long-Form Stories */}
                <section className="mb-24">
                    <div className="flex items-center justify-between mb-6 md:mb-10 px-4">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">In Their Own Words: <span className="text-[#193ce6]">Journey Highlights</span></h2>
                        {/* View All Stories link removed as requested */}
                    </div>
                    <div className="space-y-6 md:space-y-12">
                        {stories.slice(0, visibleCount).map((story, index) => (
                            <div key={story.id} className={`bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} shadow-sm hover:shadow-lg transition-shadow`}>
                                <div className="w-full md:w-1/3 min-h-[220px] md:min-h-[300px] bg-cover bg-center" style={{ backgroundImage: `url('${story.heroImage}')` }}></div>
                                <div className="p-5 md:p-10 flex-1">
                                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                        <span className="px-2.5 md:px-3 py-1 bg-[#193ce6]/10 text-[#193ce6] text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-full">{story.badge}</span>
                                        <span className="text-gray-400 text-xs md:text-sm">• {story.readTime}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{story.title}</h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                                        <div>
                                            <h4 className="text-xs md:text-sm font-bold text-[#193ce6] uppercase tracking-widest mb-2 flex items-center gap-1.5 md:gap-2">
                                                <span className="material-symbols-outlined text-[14px] md:text-[16px]">{story.challenge.icon}</span> {story.challenge.title}
                                            </h4>
                                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                                                {story.challenge.text}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs md:text-sm font-bold text-green-600 uppercase tracking-widest mb-2 flex items-center gap-1.5 md:gap-2">
                                                <span className="material-symbols-outlined text-[14px] md:text-[16px]">{story.outcome.icon}</span> {story.outcome.title}
                                            </h4>
                                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                                                {story.outcome.text}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-8 pt-5 md:pt-8 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                                        <div className="flex items-center gap-2.5 md:gap-3">
                                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${story.student.image}')` }}></div>
                                            <div>
                                                <p className="text-xs md:text-sm font-bold">{story.student.name}</p>
                                                <p className="text-[10px] md:text-xs text-gray-500">{story.student.role}</p>
                                            </div>
                                        </div>
                                        <Link to={`/testimonials/${story.id}`} className="text-[#193ce6] font-bold text-xs md:text-sm hover:translate-x-1 transition-transform flex items-center gap-1">
                                            Read Full Narrative <span className="material-symbols-outlined text-base md:text-lg">chevron_right</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {visibleCount < stories.length && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={handleLoadMore}
                                className="group relative px-8 py-3 bg-white border-2 border-[#193ce6] text-[#193ce6] font-bold rounded-full hover:bg-[#193ce6] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-lg"
                            >
                                <span>Load More Stories</span>
                                <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform duration-300">expand_more</span>
                            </button>
                        </div>
                    )}
                </section>

                {/* CTA Section */}
                <section className="bg-[#193ce6] rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-4xl font-black mb-8">Talk to Our Consultant Now</h2>

                        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full sm:flex-1 h-12 px-6 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all"
                            />
                            <input
                                type="tel"
                                placeholder="Phone No."
                                className="w-full sm:flex-1 h-12 px-6 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 h-12 bg-[#111218] text-white font-bold rounded-lg hover:shadow-xl hover:bg-black transition-all"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Testimonials;
