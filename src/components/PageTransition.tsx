import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageTransition: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0B] cursor-pointer"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => window.dispatchEvent(new Event('dismissLoading'))}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Animated Logo Icon - rotates, company name stays */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" fill="none" className="w-full h-full">
              {/* Connecting circle */}
              <circle cx="60" cy="52" r="38" stroke="#f5f5f5" strokeWidth="3.5" strokeLinecap="round" className="opacity-95"/>
              {/* Top security shield */}
              <g transform="translate(60 15)">
                <path d="M0-12 11-7.5V3.5 C11 9.5 6 14.3 0 17 C-6 14.3-11 9.5-11 3.5v-11Z" fill="#f5f5f5"/>
                <circle r="6.1" fill="#111" />
                <path d="M3.2-3.3 C2-4.5-2.6-4.8-3-1.8 C-3.4.8 3.1.1 3 3 C2.9 5.8-1.7 5.5-3.3 4.2 M0-6v12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
              </g>
              {/* Internet shield */}
              <g transform="translate(94 73)">
                <path d="M0-12 11-7.5V3.5 C11 9.5 6 14.3 0 17 C-6 14.3-11 9.5-11 3.5v-11Z" fill="#FF6A00"/>
                <circle r="6.2" fill="#fff" />
                <circle r="5" fill="none" stroke="#FF6A00" strokeWidth="1.1"/>
                <path d="M-5 0H5 M-4.2-2.5h8.4 M-4.2 2.5h8.4 M0-5c-2.2 2.4-2.2 7.6 0 10 M0-5c2.2 2.4 2.2 7.6 0 10" stroke="#FF6A00" strokeWidth=".9" strokeLinecap="round"/>
              </g>
              {/* Eye shield */}
              <g transform="translate(26 73)">
                <path d="M0-12 11-7.5V3.5 C11 9.5 6 14.3 0 17 C-6 14.3-11 9.5-11 3.5v-11Z" fill="#93a4b8"/>
                <circle r="6.2" fill="#0f1720" />
                <path d="M-5 0 C-2.7-4.2 2.7-4.2 5 0 C2.7 4.2-2.7 4.2-5 0Z" fill="none" stroke="#78c7ef" strokeWidth="1.1"/>
                <circle r="2" fill="#78c7ef" />
                <circle r=".8" fill="#e9f8ff" />
              </g>
            </svg>
          </motion.div>

          {/* Company name - stays static */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="text-white font-bold text-2xl tracking-tight flex items-center">
              Drocol<span className="inline-block w-2 h-2 rounded-full bg-[#FF6A00] ml-0.5 mb-1"></span>
            </div>
            <div className="text-[#FF6A00] font-sans font-semibold text-[10px] tracking-[3.5px]">
              TECHNOLOGIES LIMITED
            </div>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-0.5 bg-[#E87722] rounded-full"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
