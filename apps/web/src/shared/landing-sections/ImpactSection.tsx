import React from 'react';
import './ImpactSection.css';
import loanHero from '../../../assets/loan_hero.png';

const ImpactSection = () => {
    return (
        <section className="impact-section">
            <div className="impact-container">
                <div className="impact-stats">
                    {/* Stat 1: Universities */}
                    <div className="stat-box">
                        <div className="stat-icon-wrapper">
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div className="stat-content">
                            <h3>850+</h3>
                            <p>Recommend Universites</p>
                        </div>
                    </div>

                    {/* Stat 2: Courses */}
                    <div className="stat-box">
                        <div className="stat-icon-wrapper">
                            <span className="material-symbols-outlined">auto_stories</span>
                        </div>
                        <div className="stat-content">
                            <h3>150K+</h3>
                            <p>Courses</p>
                        </div>
                    </div>

                    {/* Stat 3: Scholarships */}
                    <div className="stat-box">
                        <div className="stat-icon-wrapper">
                            <span className="material-symbols-outlined">savings</span>
                        </div>
                        <div className="stat-content">
                            <h3>$40M+</h3>
                            <p>Scholarships Facilitated</p>
                        </div>
                    </div>
                </div>

                <div className="impact-visual">
                    <img src={loanHero} alt="Loan Statistics" className="impact-img" />
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
