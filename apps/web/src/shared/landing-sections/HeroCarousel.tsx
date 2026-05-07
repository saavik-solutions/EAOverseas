import React, { useState, useEffect, useRef } from 'react';
import './HeroCarousel.css';

interface HeroCarouselProps {
    slides: React.ReactNode[];
    interval?: number;
}

const HeroCarousel = ({ slides, interval = 3000 }: HeroCarouselProps) => {
    // Create extended slides: [Last, 1, 2, ..., Last, First]
    // This allows seamless transition from Last -> First (Forward) and First -> Last (Backward)
    const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

    // Start at index 1 (the first real slide)
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);

    const startInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            handleNext();
        }, interval);
    };

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, [interval, slides.length]);

    const handleNext = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    // Handle seamless reset when transition ends
    const handleTransitionEnd = () => {
        if (!isTransitioning) return;

        // If at the end clone (First Slide Clone), jump to real First Slide
        if (currentIndex >= extendedSlides.length - 1) {
            setIsTransitioning(false);
            setCurrentIndex(1);
        }
        // If at the start clone (Last Slide Clone), jump to real Last Slide
        else if (currentIndex <= 0) {
            setIsTransitioning(false);
            setCurrentIndex(extendedSlides.length - 2);
        }
    };

    const handleDotClick = (index: number) => {
        setIsTransitioning(true);
        setCurrentIndex(index + 1); // Map visual index 0..N to extended 1..N+1
        startInterval(); // Reset timer on interaction
    };

    // Map current extended index to visual index (0..N-1)
    const getActiveDotIndex = () => {
        if (currentIndex === 0) return slides.length - 1; // Clone of Last -> Last
        if (currentIndex === extendedSlides.length - 1) return 0; // Clone of First -> First
        return currentIndex - 1;
    };

    return (
        <div className="hero-carousel-container">
            <div
                className="hero-carousel-track"
                onTransitionEnd={handleTransitionEnd}
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none'
                }}
            >
                {extendedSlides.map((slide, index) => (
                    <div key={index} className="hero-carousel-slide">
                        {slide}
                    </div>
                ))}
            </div>


        </div>
    );
};

export default HeroCarousel;
