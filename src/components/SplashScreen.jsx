import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900 overflow-hidden"
        >
          {/* Animated Background Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600 rounded-full blur-[120px]"
          />

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-600 shadow-2xl flex items-center justify-center mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-white/30 rounded-3xl border-dashed"
              />
              <span className="text-5xl font-bold text-white relative z-10">R</span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                Raise <span className="text-blue-400">Me</span>
              </h1>
              <p className="text-blue-200/60 text-sm tracking-[0.2em] uppercase font-medium">
                Unlock Your Potential
              </p>
            </motion.div>
          </motion.div>

          {/* Loading Indicator */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent absolute bottom-20 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
