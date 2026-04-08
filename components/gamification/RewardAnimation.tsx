'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RewardAnimationProps {
  score: number;
  show: boolean;
}

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  emoji: ['⭐', '✨', '🌟', '💫', '🎉', '🎊', '🏆', '💎'][i % 8],
}));

export default function RewardAnimation({ score, show }: RewardAnimationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show && score === 100) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, score]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
          {/* Confetti particles */}
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              initial={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 0,
              }}
              animate={{
                opacity: [1, 1, 0],
                x: (Math.random() - 0.5) * 600,
                y: (Math.random() - 0.5) * 600,
                scale: [0, 1.5, 0.5],
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.5,
              }}
              className="absolute text-2xl"
            >
              {particle.emoji}
            </motion.span>
          ))}

          {/* Center text */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-6xl mb-2">💯</p>
            <p className="text-2xl font-bold text-primary">Perfect Score!</p>
            <p className="text-sm text-accent">MashaAllah!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
