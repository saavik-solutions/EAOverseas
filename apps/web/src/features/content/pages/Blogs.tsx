import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { blogs } from '@/features/content/data/blogs';

const Blogs = () => {
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <main className="max-w-[1200px] mx-auto px-4 py-8">

                {/* Featured Blog (Hero) */}
                <section className="mb-8 md:mb-16 relative rounded-xl md:rounded-2xl overflow-hidden h-[300px] md:h-[450px] group">
                    <img
                        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2940&auto=format&fit=crop"
                        alt="Featured Blog"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                        <span className="bg-[#4B6BFB] text-white px-2 py-0.5 md:px-3 md:py-1 rounded-md text-[10px] md:text-sm font-medium w-fit mb-2 md:mb-4">
                            Technology
                        </span>
                        <h1 className="text-xl md:text-4xl font-bold text-white mb-4 md:mb-6 max-w-2xl leading-tight">
                            Best countries to study in Europe for International student 2025
                        </h1>
                        <div className="flex items-center gap-3 md:gap-4 text-white/90 text-[10px] md:text-sm">
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                                    alt="Author"
                                    className="size-6 md:size-8 rounded-full border border-white/20"
                                />
                                <span className="font-medium">Tracey Wilson</span>
                            </div>
                            <span>•</span>
                            <span>August 20, 2022</span>
                        </div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="mb-10 md:mb-16">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {blogs.slice(0, visibleCount).map((blog, index) => (
                            <div
                                key={blog.id}
                                onClick={() => navigate(`/blogs/${blog.id}`)}
                                className="group cursor-pointer border border-gray-100 rounded-lg md:rounded-xl p-2 md:p-4 hover:shadow-lg transition-all bg-white flex flex-col h-full"
                            >
                                <div className="aspect-[3/2] rounded-md md:rounded-lg overflow-hidden mb-2 md:mb-4">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="space-y-1.5 md:space-y-3 flex-1">
                                    <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[8px] md:text-xs font-semibold">
                                        {blog.category}
                                    </span>
                                    <h3 className="text-xs md:text-xl font-bold text-gray-900 leading-tight md:leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 md:line-clamp-none">
                                        {blog.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-1.5 md:gap-3 text-gray-500 text-[8px] md:text-xs mt-1 md:mt-2">
                                        <div className="flex items-center gap-1 md:gap-2">
                                            <img
                                                src={blog.authorImg}
                                                alt={blog.author}
                                                className="size-4 md:size-6 rounded-full object-cover"
                                            />
                                            <span className="font-medium text-gray-700">{blog.author}</span>
                                        </div>
                                        <span className="hidden sm:inline">•</span>
                                        <span>{blog.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < blogs.length && (
                        <div className="mt-8 md:mt-12 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                className="px-6 md:px-8 py-2.5 md:py-3 border border-gray-200 text-gray-500 text-sm md:text-base font-medium rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </section>

                {/* Advertisement Placeholder */}
                <section className="mb-12 md:mb-20">
                    <div className="w-full h-20 md:h-24 bg-gray-50 md:bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 text-[10px] md:text-sm">
                        <span>Advertisement</span>
                        <span className="font-bold text-gray-500">You can place ads</span>
                    </div>
                </section>

                {/* Talk to Consultant CTA */}
                <section className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#2563eb] mb-10 text-center">
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

export default Blogs;
