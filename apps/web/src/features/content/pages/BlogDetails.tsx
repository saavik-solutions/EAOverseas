import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { blogs } from '@/features/content/data/blogs';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const foundBlog = blogs.find(b => b.id === parseInt(id));
        if (foundBlog) {
            setBlog(foundBlog);
        } else {
            // Handle not found
            navigate('/blogs');
        }
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (!blog) return null;

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <main className="max-w-[900px] mx-auto px-4 py-6 md:py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-1 md:gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 font-medium group text-sm md:text-base"
                >
                    <span className="material-symbols-outlined text-lg md:text-2xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back
                </button>

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                        {blog.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        {blog.title}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-gray-500">
                        <div className="flex items-center gap-2">
                            <img
                                src={blog.authorImg}
                                alt={blog.author}
                                className="size-8 rounded-full object-cover"
                            />
                            <span className="font-medium text-gray-900">{blog.author}</span>
                        </div>
                        <span>•</span>
                        <span>{blog.date}</span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-500">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                </div>

                {/* Advertisement Placeholder */}
                <div className="my-12 bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-gray-500 mb-1 font-medium tracking-wider uppercase">Advertisement</p>
                    <p className="text-lg font-bold text-gray-400">Your Brand Here</p>
                </div>

                {/* Related Blogs */}
                <section className="mt-16 border-t border-gray-100 pt-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Related Stories</h2>
                        <button
                            onClick={() => navigate('/blogs')}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            View all
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {blogs.filter(b => b.id !== blog.id).slice(0, 2).map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/blogs/${item.id}`)}
                                className="group cursor-pointer space-y-4"
                            >
                                <div className="aspect-video rounded-xl overflow-hidden shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2">
                                        Learn more about {item.title.toLowerCase()} and how it impacts your study abroad journey.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default BlogDetails;
