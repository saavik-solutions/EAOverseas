import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './StudentStoriesSection.css';
import story1 from '../assets/story_card_manish.jpg';
import story2 from '../assets/story_card_manisha.jpg';
import story3 from '../assets/story_card_sanjukta.jpg';
import story4 from '../assets/student_girl.jpg';

const StudentStoriesSection = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleStartJourney = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    const stories = [
        { image: story1, alt: "Happy Student 1" },
        { image: story2, alt: "Graduation Day" },
        { image: story3, alt: "Group Friends" },
        { image: story4, alt: "Campus Life" },
    ];

    return (
        <section className="student-stories-section">
            <h2 className="stories-title">Hear from Our Students</h2>
            <p className="stories-subtitle">
                Real stories of success, growth, and global adventures from our alumni
            </p>

            <div className="stories-grid">
                {stories.map((story, index) => (
                    <div key={index} className="story-card">
                        <img src={story.image} alt={story.alt} />
                    </div>
                ))}
            </div>

            <button
                className="btn-start-journey"
                onClick={handleStartJourney}
            >
                Start Your Journey Today
            </button>
        </section>
    );
};

export default StudentStoriesSection;
