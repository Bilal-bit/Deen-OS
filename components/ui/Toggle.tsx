'use client';

import { motion } from 'framer-motion';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  icon?: string;
}

export default function Toggle({ label, checked, onChange, icon }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 cursor-pointer ${
        checked
          ? 'bg-primary/15 border border-primary/30'
          : 'bg-surface border border-white/5 hover:border-white/10'
      }`}
    >
      <motion.div
        animate={{ scale: checked ? 1.1 : 1 }}
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
          checked ? 'bg-primary text-white' : 'bg-white/5 text-subtext'
        }`}
      >
        {checked ? '✓' : icon || '○'}
      </motion.div>
      <span className={`text-sm font-medium ${checked ? 'text-primary' : 'text-text'}`}>
        {label}
      </span>
    </button>
  );
}
