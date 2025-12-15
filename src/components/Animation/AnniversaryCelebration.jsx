'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnniversaryCelebration() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const hasSeen = sessionStorage.getItem('anniversary-celebration')
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (!hasSeen && !prefersReducedMotion) {
            setShow(true)
            sessionStorage.setItem('anniversary-celebration', 'true')
            setTimeout(() => setShow(false), 4000)
        }
    }, [])

    // Generate confetti particles
    const confetti = [...Array(80)].map((_, i) => ({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
        delay: Math.random() * 0.3,
        duration: 2.5 + Math.random() * 1.5,
        rotation: Math.random() * 720,
        color: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB', '#32CD32'][i % 6],
        size: Math.random() > 0.5 ? 'w-3 h-3' : 'w-2 h-2'
    }))

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Simple Confetti */}
                    {confetti.map((item) => (
                        <motion.div
                            key={`confetti-${item.id}`}
                            className={`absolute ${item.size} rounded-sm`}
                            style={{
                                backgroundColor: item.color,
                                top: '-5%',
                                left: item.x
                            }}
                            initial={{
                                y: -20,
                                rotate: 0,
                                opacity: 0
                            }}
                            animate={{
                                y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
                                rotate: item.rotation,
                                opacity: [0, 1, 1, 0.7, 0],
                                x: [0, Math.sin(item.id) * 30]
                            }}
                            transition={{
                                delay: item.delay,
                                duration: item.duration,
                                ease: 'linear'
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
