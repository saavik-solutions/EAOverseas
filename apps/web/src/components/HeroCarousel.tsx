import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';

const HeroCarousel = ({ slides, interval = 3000 }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, interval);
        return () => clearInterval(timer);
    }, [slides.length, interval]);

    return (
        <div className="hero-carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="carousel-slide">
                        {slide}
                    </div>
                ))}
            </div>
            {/* Dots */}
            <div className="carousel-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
