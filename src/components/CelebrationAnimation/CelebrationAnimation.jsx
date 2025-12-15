import React, { useEffect, useState } from 'react';
import './CelebrationAnimation.css';

const CelebrationAnimation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const hasShown = sessionStorage.getItem('anniversary-celebration-shown');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!hasShown && !prefersReducedMotion) {
            const newParticles = [];

            // Professional confetti (60 pieces) - subtle and elegant
            for (let i = 0; i < 60; i++) {
                newParticles.push({
                    id: `confetti-${i}`,
                    type: 'confetti',
                    left: Math.random() * 100,
                    delay: Math.random() * 1.5,
                    duration: 3 + Math.random() * 2,
                    color: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#FFD93D', '#6BCF7F'][Math.floor(Math.random() * 6)],
                    rotation: Math.random() * 360,
                });
            }

            // Subtle sparkles (25 pieces)
            for (let i = 0; i < 25; i++) {
                newParticles.push({
                    id: `sparkle-${i}`,
                    type: 'sparkle',
                    left: Math.random() * 100,
                    top: Math.random() * 100,
                    delay: Math.random() * 2,
                    duration: 1.5 + Math.random() * 1.5,
                });
            }

            setParticles(newParticles);
            setIsVisible(true);
            sessionStorage.setItem('anniversary-celebration-shown', 'true');

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div className="celebration-overlay" aria-hidden="true">
            <div className="celebration-container">
                {particles.map((particle) => {
                    if (particle.type === 'confetti') {
                        return (
                            <div
                                key={particle.id}
                                className="confetti-particle"
                                style={{
                                    left: `${particle.left}%`,
                                    animationDelay: `${particle.delay}s`,
                                    animationDuration: `${particle.duration}s`,
                                    backgroundColor: particle.color,
                                    transform: `rotate(${particle.rotation}deg)`,
                                }}
                            />
                        );
                    } else if (particle.type === 'sparkle') {
                        return (
                            <div
                                key={particle.id}
                                className="sparkle-particle"
                                style={{
                                    left: `${particle.left}%`,
                                    top: `${particle.top}%`,
                                    animationDelay: `${particle.delay}s`,
                                    animationDuration: `${particle.duration}s`,
                                }}
                            >
                                ✨
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default CelebrationAnimation;
