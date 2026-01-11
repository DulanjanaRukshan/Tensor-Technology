import React from 'react';
import { motion } from 'framer-motion';

// Fade in up animation
export const FadeIn = ({ children, delay = 0, direction = 'up', className = '', fullWidth = false }) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
            x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants}
            className={`${className} ${fullWidth ? 'w-full' : ''}`}
        >
            {children}
        </motion.div>
    );
};

// Stagger container for lists/grids
export const StaggerContainer = ({ children, className = '', stagger = 0.1 }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: stagger
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Scale in animation (good for cards/images)
export const ScaleIn = ({ children, delay = 0, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
