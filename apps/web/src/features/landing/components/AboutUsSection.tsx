
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUsSection.css';
import img1 from '../../../assets/about_us_1.jpg';
import img2 from '../../../assets/about_us_2.jpg';
import img4 from '../../../assets/about_us_4.jpg';

const AboutUsSection = () => {
    const navigate = useNavigate();
    return (
        <section className="about-us-section" id="about">
            <div className="about-content">
                <div className="about-text-column">
                    <div className="about-tag">About Us</div>
                    <h2 className="about-title">
                        Your Trusted Partner For International Education
                    </h2>
                    <div className="about-description">
                        <p>
                            Since 2010, Eaoverseas has been guiding students on their journey to quality international education. Our team of experienced advisors is committed to helping you find the right program, university, and country for your academic and career goals.
                        </p>
                        <p>
                            With a success rate of over 95% in university placements and visa approvals, we take pride in our personalized approach to each student's unique situation and aspirations.
                        </p>
                    </div>
                    <button className="btn-explore-about" onClick={() => navigate('/about')}>Explore More About US</button>
                </div>

                <div className="about-image-column">
                    <div className="about-grid">
                        <img src={img1} alt="Office meeting" className="about-grid-img" />
                        <img src={img2} alt="Student counseling" className="about-grid-img" />
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop" alt="Team discussion" className="about-grid-img" />
                        <img src={img4} alt="Library study" className="about-grid-img" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
