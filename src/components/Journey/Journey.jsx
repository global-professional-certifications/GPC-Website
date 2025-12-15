import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../MetaTags';
import useScrollAnimation from '../Hooks/useScrollAnimation';

const Journey = () => {
    const [heroRef, isHeroVisible] = useScrollAnimation({ threshold: 0.1 });
    const [beginningRef, isBeginningVisible] = useScrollAnimation({ threshold: 0.2 });
    const [milestonesRef, isMilestonesVisible] = useScrollAnimation({ threshold: 0.1 });
    const [achievementsRef, isAchievementsVisible] = useScrollAnimation({ threshold: 0.2 });
    const [impactRef, isImpactVisible] = useScrollAnimation({ threshold: 0.2 });
    const [visionRef, isVisionVisible] = useScrollAnimation({ threshold: 0.2 });

    const milestones = [
        {
            date: 'December 2023',
            title: 'The Beginning',
            description: 'Global Professional Certifications was founded with a vision to democratize access to world-class certification training.',
            icon: '🚀',
        },
        {
            date: 'January 2024',
            title: 'First Batch Launch',
            description: 'Successfully launched our first CIA certification batch with 50+ enthusiastic professionals.',
            icon: '🎓',
        },
        {
            date: 'March 2024',
            title: 'IIA India Partnership',
            description: 'Became an official IIA India Authorized Learning Partner, validating our commitment to excellence.',
            icon: '🤝',
        },
        {
            date: 'June 2024',
            title: 'Expanding Horizons',
            description: 'Introduced CISA, CRMA, and IAP certification programs to our growing portfolio.',
            icon: '🌟',
        },
        {
            date: 'September 2024',
            title: 'Milestone Achievement',
            description: 'Crossed 1000+ enrolled students with a 95% satisfaction rate.',
            icon: '📈',
        },
        {
            date: 'December 2024',
            title: 'One Year Strong',
            description: 'Celebrating our first anniversary with 1500+ professionals trained and 250+ CIAs certified.',
            icon: '🎉',
        },
    ];

    const achievements = [
        { number: '1500+', label: 'Professionals Trained', icon: '👥' },
        { number: '250+', label: 'Certified CIAs', icon: '🏆' },
        { number: '95%', label: 'Success Rate', icon: '✅' },
        { number: '5/5', label: 'Student Rating', icon: '⭐' },
    ];

    return (
        <>
            <MetaTags
                title="Our Journey - 1 Year of Excellence | Global Professional Certifications"
                description="Celebrating one year of empowering professionals worldwide with globally recognized certifications. Discover our journey, milestones, and achievements."
                canonicalUrl="https://globalprofessionalcertifications.com/our-journey"
            />

            <div className="bg-gray-50 min-h-screen">
                {/* Hero Section */}
                {/* Hero Section */}
                <section
                    ref={heroRef}
                    className={`relative bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white py-20 md:py-32 px-4 md:px-12 lg:px-20 overflow-hidden scroll-reveal ${isHeroVisible ? 'scroll-reveal-active' : ''}`}
                >
                    {/* Doodle Background Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Polka Dot Overlay */}
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'radial-gradient(#fff 2px, transparent 2px), radial-gradient(#fff 1px, transparent 1px)',
                                backgroundSize: '50px 50px, 20px 20px',
                                backgroundPosition: '0 0, 25px 25px'
                            }}>
                        </div>

                        {/* Doodles */}
                        <svg className="absolute top-[10%] left-[5%] w-24 h-24 text-yellow-300 opacity-80 animate-bounce-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M10,50 Q25,25 40,50 T70,50 T100,50" />
                        </svg>
                        <svg className="absolute bottom-[20%] right-[10%] w-32 h-32 text-cyan-300 opacity-60 animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ animationDelay: '1s' }}>
                            <path d="M10,10 Q50,50 90,10" />
                            <path d="M10,50 Q50,90 90,50" />
                        </svg>
                        <div className="absolute top-[20%] right-[20%] w-4 h-4 bg-white rounded-full opacity-60 animate-float"></div>
                        <div className="absolute bottom-[10%] left-[15%] w-0 h-0 border-l-[15px] border-l-transparent border-b-[25px] border-b-lime-300 border-r-[15px] border-r-transparent animate-bounce-slow -rotate-12" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto text-center">
                        <div className="inline-block mb-6">
                            <span className="px-6 py-2 bg-white text-indigo-600 text-sm md:text-base font-bold rounded-full shadow-[0_4px_0_rgb(0,0,0,0.1)] transform rotate-[-2deg] hover:rotate-0 transition-transform cursor-pointer">
                                🎉 Celebrating 1 Year of Impact! 🚀
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-sm font-poppins">
                            Our <span className="text-yellow-300 relative inline-block">
                                Journey
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-white opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-medium">
                            From a bold vision to a global community. Discover how we're transforming careers worldwide.
                        </p>
                    </div>
                </section>

                {/* The Beginning */}
                <section
                    ref={beginningRef}
                    className={`py-12 md:py-16 px-4 md:px-12 lg:px-20 scroll-reveal ${isBeginningVisible ? 'scroll-reveal-active' : ''}`}
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-10">
                            <div className="w-full lg:w-1/2">
                                <div className="inline-block mb-4">
                                    <span className="text-4xl">🌱</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    The <span className="text-brand-blue italic">Beginning</span>
                                </h2>
                                <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
                                    <p>
                                        Global Professional Certifications was born from a simple yet powerful vision: to make world-class certification training accessible to professionals across the globe.
                                    </p>
                                    <p>
                                        Founded by industry experts with decades of combined experience in audit, risk management, and professional training, we recognized a gap in the market for high-quality, mentor-led certification programs.
                                    </p>
                                    <p>
                                        With Arpit Garg, a certified CIA, CISA, CRMA, and IAP professional, leading our training programs, we set out to create a learning experience that combines expert knowledge, practical insights, and personalized support.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="relative">
                                    <div className="absolute -inset-3 bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl blur opacity-15"></div>
                                    <div className="relative bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 rounded-2xl p-6 md:p-8 border-l-4 border-brand-blue shadow-lg">
                                        <blockquote className="text-lg md:text-xl font-semibold text-gray-800 italic leading-relaxed">
                                            "Our mission was clear: empower professionals with the knowledge, skills, and confidence to excel in their certification exams and advance their careers."
                                        </blockquote>
                                        <p className="mt-4 text-gray-600 font-medium text-sm">— Founding Team, GPC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Milestones - Timeline */}
                <section
                    ref={milestonesRef}
                    className={`py-12 md:py-16 px-4 md:px-12 lg:px-20 bg-white scroll-reveal ${isMilestonesVisible ? 'scroll-reveal-active' : ''}`}
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                                Key <span className="text-brand-blue italic">Milestones</span>
                            </h2>
                            <p className="text-sm md:text-base text-gray-600">Our journey through the year</p>
                        </div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-1 h-full bg-gray-200">
                                <div
                                    className={`w-full bg-gradient-to-b from-brand-blue via-brand-purple to-brand-blue transition-all duration-2000 ${isMilestonesVisible ? 'h-full' : 'h-0'}`}
                                ></div>
                            </div>

                            {/* Milestone Items */}
                            <div className="space-y-10">
                                {milestones.map((milestone, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col md:flex-row items-center gap-6 transition-all duration-700 ${isMilestonesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                            } ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                        style={{ transitionDelay: `${index * 150}ms` }}
                                    >
                                        <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-300"></div>
                                                <div className="relative bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                                                    <div className={`text-3xl mb-3 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                                        {milestone.icon}
                                                    </div>
                                                    <p className="text-brand-blue font-semibold text-xs md:text-sm mb-2">
                                                        {milestone.date}
                                                    </p>
                                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                                        {milestone.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                                        {milestone.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden md:flex w-2/12 justify-center">
                                            <div className="relative">
                                                <div className={`absolute inset-0 bg-pink-500 rounded-full animate-ping ${isMilestonesVisible ? 'opacity-75' : 'opacity-0'}`} style={{ animationDelay: `${index * 150}ms` }}></div>
                                                <div className={`relative w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-4 border-white shadow-lg transition-all ${isMilestonesVisible ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: `${index * 150}ms` }}></div>
                                            </div>
                                        </div>

                                        <div className="hidden md:block w-5/12"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Achievements */}
                <section
                    ref={achievementsRef}
                    className={`py-12 md:py-20 px-4 md:px-12 lg:px-20 scroll-reveal ${isAchievementsVisible ? 'scroll-reveal-active' : ''}`}
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic">Achievements</span>
                            </h2>
                            <p className="text-base md:text-lg text-gray-600">Milestones that make us proud</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="relative group perspective">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                                    <div className="relative bg-white rounded-3xl p-6 md:p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition duration-300 hover:-translate-y-2 border border-gray-100">
                                        <div className="text-4xl md:text-5xl mb-3 animate-bounce-slow" style={{ animationDelay: `${index * 0.2}s` }}>{achievement.icon}</div>
                                        <p className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                                            {achievement.number}
                                        </p>
                                        <p className="text-gray-600 font-bold text-xs md:text-sm uppercase tracking-wider">
                                            {achievement.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Community Impact */}
                <section
                    ref={impactRef}
                    className={`py-12 md:py-20 px-4 md:px-12 lg:px-20 bg-white scroll-reveal ${isImpactVisible ? 'scroll-reveal-active' : ''}`}
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                                Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic">Impact</span>
                            </h2>
                            <p className="text-base md:text-lg text-gray-600">Making a difference, one professional at a time</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition"></div>
                                <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden">
                                    {/* Card Doodle Overlay */}
                                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">🌍</div>

                                    <div className="relative z-10">
                                        <div className="text-5xl mb-6">🌍</div>
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Global Reach</h3>
                                        <p className="text-white/90 text-sm md:text-lg leading-relaxed font-medium">
                                            Our students span across continents, from India to the Middle East. We've built a <span className="text-yellow-300 font-bold">thriving community</span> of learners who support and inspire each other every day.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition"></div>
                                <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden">
                                    {/* Card Doodle Overlay */}
                                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">🚀</div>

                                    <div className="relative z-10">
                                        <div className="text-5xl mb-6">💼</div>
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Career Transformation</h3>
                                        <p className="text-white/90 text-sm md:text-lg leading-relaxed font-medium">
                                            From promotions to career switches, our certified professionals have achieved remarkable milestones. Their <span className="text-yellow-300 font-bold">success stories</span> fuel our passion and commitment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Future Vision */}
                <section
                    ref={visionRef}
                    className={`py-16 md:py-24 px-4 md:px-12 lg:px-20 scroll-reveal ${isVisionVisible ? 'scroll-reveal-active' : ''}`}
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="text-6xl mb-6 animate-bounce-slow">🚀</div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Looking <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 italic">Ahead</span>
                        </h2>
                        <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed mb-4 font-medium">
                            As we celebrate our first year, we're more committed than ever to our mission. We're expanding our course offerings, enhancing our learning platform, and building partnerships to bring even more value to our students.
                        </p>
                        <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed mb-10 font-medium">
                            The journey has just begun, and we're excited to have you with us!
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-base md:text-lg font-bold py-4 px-10 rounded-full hover:scale-105 transition-all shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.5)] group"
                        >
                            Join Our Journey
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </section>

                <div className="h-12 md:h-16"></div>
            </div>
        </>
    );
};

export default Journey;
