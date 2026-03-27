import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ textAlign: 'center' }}
        >
            <motion.h1 
                className="main-heading"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                OnIt
            </motion.h1>
            <motion.p 
                className="tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                I am available for you <span className="highlight">24/7</span>
            </motion.p>
            <motion.p 
                className="sub-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
            >
                How may I assist you?
            </motion.p>
        </motion.div>
    );
};

export default Header;
