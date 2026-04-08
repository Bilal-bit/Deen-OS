'use client';

import { useThemeStore } from '@/stores/themeStore';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-surface border border-white/10 cursor-pointer flex items-center px-1 transition-colors"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        animate={{ x: theme === 'dark' ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </motion.div>
    </button>
  );
}
