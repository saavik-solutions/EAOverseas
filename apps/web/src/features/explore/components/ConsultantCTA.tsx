import React from 'react';
import './ConsultantCTA.css';

const ConsultantCTA = () => {
    return (
        <section className="cta-wrapper">
            <div className="cta-container">
                {/* Decorative Shapes */}
                <div className="cta-shape cta-shape-tl"></div>
                <div className="cta-shape cta-shape-br"></div>

                <div className="cta-content">
                    <h2 className="cta-title">Talk to Our Consultant Now</h2>
                    <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="cta-input-group">
                            <input
                                type="text"
                                placeholder="First name"
                                className="cta-input"
                                required
                            />
                        </div>
                        <div className="cta-input-group">
                            <input
                                type="tel"
                                placeholder="Phone No"
                                className="cta-input"
                                required
                            />
                        </div>
                        <button type="submit" className="cta-submit-btn">Send</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ConsultantCTA;
