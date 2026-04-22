import React, { useState } from 'react';
import './SupportSection.css';
import leavesImage from '../assets/support_palm_leaves.png';
import fabricImage from '../assets/support_fabric_texture.png';

const steps = [
    {
        number: '01',
        title: 'Counseling',
        description: 'Expert guidance to help you choose the right career path and university based on your aspirations.'
    },
    {
        number: '02',
        title: 'Test Preparation',
        description: 'Comprehensive training for IELTS, TOEFL, GRE, GMAT, and SAT to help you achieve your target scores.'
    },
    {
        number: '03',
        title: 'University Selection',
        description: 'Personalized recommendations based on your profile, goals, and budget with direct connections to 500+ institutions worldwide.'
    },
    {
        number: '04',
        title: 'Visa Assistance',
        description: 'End-to-end support for visa application, documentation, and mock interviews to ensure a high success rate.'
    },
    {
        number: '05',
        title: 'Pre-departure',
        description: 'Guidance on accommodation, travel, insurance, and settling in a new country to make your transition smooth.'
    }
];

const SupportSection = () => {
    const [currentStep, setCurrentStep] = useState(2); // Start at 03 (Index 2) as per original design, or 0? keeping 2 to match original view for now

    const nextStep = () => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    };

    return (
        <section className="support-section">
            <div className="success-tag">Our Services</div>
            <h2 className="support-heading">
                Comprehensive Support for Your Study <br /> Abroad Journey
            </h2>

            <div className="support-container">
                <div className="support-card">
                    <div className="step-indicator">
                        {steps.map((_, index) => (
                            <span
                                key={index}
                                className={index === currentStep ? 'indicator-pill' : 'dot'}
                            ></span>
                        ))}
                    </div>

                    <div className="card-content">
                        <h1 className="step-number">{steps[currentStep].number}</h1>
                        <h3 className="card-title">{steps[currentStep].title}</h3>

                        <p className="card-description">
                            {steps[currentStep].description}
                        </p>

                        <div className="card-navigation">
                            <div className="nav-arrow" onClick={prevStep}>&lt;</div>
                            <div className="nav-arrow" onClick={nextStep}>&gt;</div>
                        </div>

                        <button className="btn-schedule">Schedule a Free Meeting</button>
                    </div>
                </div>

                <div className="support-images">
                    <div className="image-frame frame-top">
                        <img src={leavesImage} alt="Palm leaves" />
                    </div>
                    <div className="image-frame frame-bottom">
                        <img src={fabricImage} alt="Fabric texture" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportSection;
