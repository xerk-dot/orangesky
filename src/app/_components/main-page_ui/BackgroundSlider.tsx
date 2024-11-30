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
            className="transition-all duration-500 ease-in-out filter"
            style={{
                backgroundImage: `url(${images[currentImage]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '60vh', // Increased height by 25%
                width: '60vh', // Increased width by 25%
                position: 'absolute',
                top: '20%', // Adjusted top position to center the image
                left: '20%', // Adjusted left position to center the image
                zIndex: -1,
            }}
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
        </motion.div>
    );
} 