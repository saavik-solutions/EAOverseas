import React, { useState, useRef } from 'react';
import './TeamSection.css';
import riyaImg from '../assets/riya_mehta.png';
import arjunImg from '../assets/arjun_singh.png';
import snehaImg from '../assets/sneha_kapoor.png';
import rohanImg from '../assets/rohan_mehra.png';
import anjaliImg from '../assets/anjali_rao.png';
import kabirImg from '../assets/kabir_malhotra.png';

import { useNavigate } from 'react-router-dom';

import { experts } from '../../../data/experts';

const TeamSection = () => {
    const navigate = useNavigate();
    const gridRef = useRef(null);

    // Use the first 6 experts for the landing page section
    const team = experts.slice(0, 6);

    const scroll = (direction) => {
        const container = gridRef.current;
        if (container) {
            const scrollAmount = 350 + 30; // card width + gap
            const maxScroll = container.scrollWidth - container.clientWidth;

            if (direction === 'left') {
                if (container.scrollLeft <= 10) { // small buffer for accuracy
                    container.scrollTo({
                        left: maxScroll,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollTo({
                        left: container.scrollLeft - scrollAmount,
                        behavior: 'smooth'
                    });
                }
            } else {
                if (container.scrollLeft >= maxScroll - 10) { // small buffer for accuracy
                    container.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollTo({
                        left: container.scrollLeft + scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        }
    };

    return (
        <section className="team-section">
            <div className="team-header">
                <div className="team-tag">Our Team</div>
                <h2 className="team-title">Experts to make your application Stand Out</h2>
            </div>

            <div className="team-carousel-wrapper">
                <button
                    className="nav-arrow-btn prev"
                    onClick={() => scroll('left')}
                    aria-label="Scroll Left"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>

                <div className="team-carousel-container">
                    <div className="team-grid" ref={gridRef}>
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="team-card cursor-pointer"
                                onClick={() => navigate(`/expert-profile/${member.id}`)}
                            >
                                <div
                                    className="team-card-image"
                                    style={{ backgroundImage: `linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, #FFFFFF 100%), url(${member.image})` }}
                                >
                                    <div className="team-card-content">
                                        <h3 className="member-name" style={{ color: member.color }}>{member.name}</h3>
                                        <div className="member-divider" style={{ borderColor: member.color }}></div>
                                        <div className="member-role-tag" style={{ backgroundColor: member.tagBg, color: member.color }}>
                                            {member.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="nav-arrow-btn next"
                    onClick={() => scroll('right')}
                    aria-label="Scroll Right"
                >
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>

            <div className="team-navigation-controls">
                <button className="meet-team-btn" onClick={() => navigate('/team')}>Meet our team</button>
            </div>
        </section>
    );
};

export default TeamSection;
