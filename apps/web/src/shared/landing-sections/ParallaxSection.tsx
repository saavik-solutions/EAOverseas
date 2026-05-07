import React, { useEffect, useRef } from 'react';

const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const scrolled = window.pageYOffset;
            const rect = sectionRef.current.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                const yPos = -(scrolled * speed);
                sectionRef.current.style.transform = `translateY(${yPos}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={sectionRef} className={className} style={{ transition: 'transform 0.1s ease-out' }}>
            {children}
        </div>
    );
};

export default ParallaxSection;
