import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentStoriesSection.css';
// Adding Avneet card back as requested
import avneetCard from '../../../assets/story_card_avneet.png';
import sanjuktaCard from '../../../assets/story_card_sanjukta.jpg';
import manishCard from '../../../assets/story_card_manish.jpg';
import manishaCard from '../../../assets/story_card_manisha.jpg';

const StudentStoriesSection = () => {
    const navigate = useNavigate();

    const stories = [
        {
            name: "Avneet Kaur",
            image: avneetCard,
            review: "EAOverseas made my dream of studying in USA a reality. The visa process was incredibly smooth and the support was always there when I needed it.",
            theme: { bg: "bg-purple-50", border: "border-purple-100", iconBg: "bg-purple-100", iconText: "text-purple-600", nameText: "text-purple-600" }
        },
        {
            name: "Sanjukta Koli",
            image: sanjuktaCard,
            review: "I was confused about choosing the right college in Canada. The team guided me to Durham College which perfectly fits my career goals. Highly recommended!",
            theme: { bg: "bg-orange-50", border: "border-orange-100", iconBg: "bg-orange-100", iconText: "text-orange-600", nameText: "text-orange-600" }
        },
        {
            name: "Manish Gupta",
            image: manishCard,
            review: "From university application to finding accommodation, EAOverseas handled everything. Studying at University of Winnipeg has been a life-changing experience.",
            theme: { bg: "bg-green-50", border: "border-green-200", iconBg: "bg-green-100", iconText: "text-green-600", nameText: "text-green-600" }
        },
        {
            name: "Manisha Rani",
            image: manishaCard,
            review: "The counseling sessions were very detailed. They helped me secure admission at Arizona State University with a scholarship. Thank you EAOverseas!",
            theme: { bg: "bg-blue-50", border: "border-blue-100", iconBg: "bg-blue-100", iconText: "text-blue-600", nameText: "text-blue-600" }
        }
    ];

    // Double repeat for robust seamless infinite scroll with -50% translation
    const displayStories = [...stories, ...stories];

    return (
        <section className="py-16 bg-white overflow-hidden relative font-sans">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-12 px-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-4">
                    Success stories
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                    Hear from Our Students
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Real stories from students who have successfully achieved their international education goals with our guidance.
                </p>
            </div>

            {/* Auto-Sliding Cards Container - NO SCROLLBAR */}
            <div className="max-w-[1600px] mx-auto px-1 mb-12 overflow-hidden relative">
                {/* Left Fade Overlay */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

                {/* Right Fade Overlay */}
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-slide">
                    {displayStories.map((story, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[320px] md:w-[400px] h-[520px] md:h-[580px] pr-5 group perspective"
                        >
                            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 cursor-pointer">
                                {/* Front Face */}
                                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-xl font-bold">{story.name}</h3>
                                        <p className="text-sm">Click to see review</p>
                                    </div>
                                </div>

                                {/* Back Face (Review) */}
                                <div className={`absolute inset-0 ${story.theme.bg} backface-hidden rotate-y-180 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center border-2 ${story.theme.border}`}>
                                    <div className={`w-16 h-16 ${story.theme.iconBg} rounded-full flex items-center justify-center mb-6`}>
                                        <svg className={`w-8 h-8 ${story.theme.iconText}`} fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01701V14H12.017C14.2261 14 16.017 12.2091 16.017 10V5C16.017 3.89543 15.1216 3 14.017 3H5.01701C3.91244 3 3.01701 3.89543 3.01701 5V15C3.01701 16.1046 3.91244 17 5.01701 17H7.01701V21L14.017 21ZM17.017 16V14H20.017V5C20.017 3.89543 19.1216 3 18.017 3H14.017V5H18.017V14H17.017C15.9124 14 15.017 14.8954 15.017 16V21L17.017 16Z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 text-lg italic leading-relaxed mb-6">
                                        "{story.review}"
                                    </p>
                                    <div className="mt-auto">
                                        <h3 className={`${story.theme.nameText} font-bold text-xl`}>{story.name}</h3>
                                        <p className="text-gray-500 text-sm">Satisfied Student</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default StudentStoriesSection;
