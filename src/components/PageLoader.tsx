import React from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center pointer-events-none ${
        isLoading ? 'pointer-events-auto' : ''
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full rounded-full border-4 border-golden-yellow border-t-dark-purple"
          />
        </div>
        <p className="text-dark-purple font-semibold text-sm">Loading...</p>
      </div>
    </motion.div>
  );
}
