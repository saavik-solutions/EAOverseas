import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { longFormStories } from '../data/studentStories';

const StudentStory = () => {
    const { id } = useParams();
    const story = longFormStories.find(s => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!story) {
        return (
            <div className="bg-white min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
                    <Link to="/testimonials" className="text-[#193ce6] hover:underline">Back to Testimonials</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-white font-display text-[#111218] antialiased min-h-screen">
            <Navbar />

            <main>
                {/* Hero Section */}
                <div className="relative h-[50vh] md:h-[60vh] min-h-[350px] md:min-h-[400px] w-full bg-cover bg-center" style={{ backgroundImage: `url('${story.heroImage}')` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-16 max-w-[1200px] mx-auto text-white">
                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                            <span className="px-2.5 md:px-3 py-1 bg-[#193ce6] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-full">{story.badge}</span>
                            <span className="text-gray-300 text-xs md:text-sm">• {story.readTime}</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 leading-tight max-w-4xl">{story.title}</h1>
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-cover bg-center border-2 border-white" style={{ backgroundImage: `url('${story.student.image}')` }}></div>
                            <div>
                                <p className="text-base md:text-lg font-bold">{story.student.name}</p>
                                <p className="text-xs md:text-sm text-gray-300">{story.student.role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 bg-gray-50 p-5 md:p-8 rounded-xl md:rounded-2xl border border-gray-100">
                            <div>
                                <h4 className="text-xs md:text-sm font-bold text-[#193ce6] uppercase tracking-widest mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">{story.challenge.icon}</span> {story.challenge.title}
                                </h4>
                                <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                                    {story.challenge.text}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xs md:text-sm font-bold text-green-600 uppercase tracking-widest mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">{story.outcome.icon}</span> {story.outcome.title}
                                </h4>
                                <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                                    {story.outcome.text}
                                </p>
                            </div>
                        </div>

                        {/* Article Content */}
                        <article className="prose prose-sm md:prose-lg prose-blue max-w-none prose-headings:font-bold prose-headings:text-[#111218] prose-p:text-gray-600 prose-p:leading-loose">
                            <div dangerouslySetInnerHTML={{ __html: story.content }} />
                        </article>

                        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-gray-100">
                            <Link to="/testimonials" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#193ce6] text-sm md:text-base font-semibold transition-colors">
                                <span className="material-symbols-outlined text-lg md:text-xl">arrow_back</span> Back to Success Stories
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar CTA */}
                    <div className="lg:col-span-4 space-y-6 md:space-y-8">
                        <div className="bg-[#193ce6] text-white p-6 md:p-8 rounded-xl md:rounded-2xl lg:sticky lg:top-24">
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Inspired by {story.student.name.split(' ')[0]}?</h3>
                            <p className="text-white/80 text-sm md:text-base mb-5 md:mb-6 leading-relaxed">
                                Your journey could be the next success story. Let's find your dream university together.
                            </p>
                            <Link
                                to="/login"
                                state={{ from: '/consultant' }}
                                className="block w-full text-center bg-white text-[#193ce6] text-sm md:text-base font-bold py-3 md:py-4 rounded-lg md:rounded-xl hover:shadow-lg hover:scale-105 transition-all mb-4"
                            >
                                Book Free Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default StudentStory;
