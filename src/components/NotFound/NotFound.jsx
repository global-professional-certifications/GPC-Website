import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-brand-dark flex items-center justify-center px-6 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-3xl w-full text-center relative z-10">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-[120px] md:text-[180px] font-black leading-none bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue bg-[length:200%_auto] bg-clip-text text-transparent animate-pulse-slow">
                        404
                    </h1>
                </m.div>

                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mt-4 mb-6">
                        Lost in Space?
                    </h2>
                    <p className="text-lg text-brand-gray dark:text-gray-400 mb-10 max-w-lg mx-auto">
                        The page you are looking for might have been moved, deleted, or never existed in this dimension. Let's get you back on track.
                    </p>
                </m.div>

                <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        to="/"
                        className="group flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold transition-all duration-300 hover:bg-brand-purple hover:shadow-[0_10px_20px_-10px_rgba(166,34,225,0.5)] hover:scale-105 active:scale-95"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-brand-blue/20 dark:border-white/10 text-brand-blue dark:text-white rounded-xl font-bold transition-all duration-300 hover:border-brand-blue dark:hover:border-white hover:bg-brand-blue/5 active:scale-95"
                    >
                        <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                        Go Back
                    </button>
                </m.div>

                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-16 text-sm text-brand-gray/50 dark:text-gray-500 font-medium tracking-widest uppercase"
                >
                    Global Professional Certifications
                </m.div>
            </div>

            {/* Subtle floating shapes for extra premium feel */}
            <m.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 right-[15%] hidden lg:block"
            >
                <div className="w-12 h-12 border-2 border-brand-purple/20 rounded-lg rotate-12" />
            </m.div>

            <m.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-1/4 left-[15%] hidden lg:block"
            >
                <div className="w-16 h-16 border-2 border-brand-blue/20 rounded-full" />
            </m.div>
        </div>
    );
};

export default NotFound;
