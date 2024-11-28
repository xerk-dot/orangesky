'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
    '/images/0001.jpeg',
    '/images/0002.jpeg',
    '/images/0003.jpeg'
];

export function BackgroundSlider() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 30000); // Change image every 30 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            style={{
                backgroundImage: `url(${images[currentImage]})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                height: '50vh',
                width: '50%',
                position: 'absolute',
                top: '25%',
                left: '25%',
                zIndex: -1,
            }}
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Gradient Overlay */}
            <div className="gradient-overlay" />
        </motion.div>
    );
} 