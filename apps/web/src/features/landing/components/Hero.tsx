import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import chatIcon from '../assets/icon_chat.png';
import whatsappIcon from '../assets/icon_whatsapp.png';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    Discover the Future <br /> with EAOverseas
                </h1>
                <p className="hero-subtitle">
                    We empower students to study abroad with affordable guidance and end-to-
                    end support. Whether it's your dream university, visa processing, or career
                    counseling — we've got you covered.
                </p>
                <button
                    className="btn-explore"
                    onClick={() => navigate('/about')}
                >
                    Explore More About Us
                </button>
            </div>

            <div className="hero-partners">
                <div className="partner-logo">logoipsum</div>
                <div className="partner-logo">logoipsum</div>
                <div className="partner-logo">logoipsum</div>
                <div className="partner-logo">logoipsum</div>
                <div className="partner-logo">logoipsum</div>
            </div>

            <div className="floating-icons">
                <a href="#chat" className="icon-chat" aria-label="Chat with us">
                    <img src={chatIcon} alt="Chat" />
                </a>
                <a href="https://wa.me/1234567890" className="icon-whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappIcon} alt="WhatsApp" />
                </a>
            </div>
        </section>
    );
};

export default Hero;
