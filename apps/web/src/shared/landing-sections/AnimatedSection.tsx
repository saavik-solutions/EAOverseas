import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AnimatedSection = ({ children, animation = 'fade-in', threshold = 0.1 }) => {
    const [ref, isVisible] = useScrollAnimation(threshold);

    return (
        <div ref={ref} className={`${animation} ${isVisible ? 'visible' : ''}`}>
            {children}
        </div>
    );
};

export default AnimatedSection;
