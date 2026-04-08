'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: 'Assalamu Alaikum!',
    subtitle: 'Welcome to Deen OS',
    description: 'Your Islamic lifestyle operating system. Track prayers, habits, and grow spiritually.',
    icon: '🕌',
  },
  {
    title: 'Track Your Salah',
    subtitle: '5 Daily Prayers',
    description: 'Log all 5 daily prayers and optional nawafil. Earn points for consistency.',
    icon: '🤲',
  },
  {
    title: 'Build Good Habits',
    subtitle: 'Daily Tracking',
    description: 'Water, sleep, exercise, Quran reading — plus create your own custom habits.',
    icon: '💪',
  },
  {
    title: 'Earn & Grow',
    subtitle: 'Gamification',
    description: 'Earn badges, level up, compete on leaderboards, and maintain your streak.',
    icon: '🏆',
  },
  {
    title: 'Learn Daily',
    subtitle: 'Knowledge',
    description: 'Daily dua, hadith, Quran ayah, Islamic quiz, and 99 Names of Allah.',
    icon: '📖',
  },
  {
    title: 'You\'re Ready!',
    subtitle: 'Bismillah',
    description: 'Start your journey towards a better deen. May Allah bless your efforts.',
    icon: '✨',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const skip = () => onComplete();

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentStep ? 'bg-primary w-6' : i < currentStep ? 'bg-primary/50' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-7xl block mb-6"
            >
              {step.icon}
            </motion.span>

            <h2 className="text-2xl font-bold text-text mb-1">{step.title}</h2>
            <p className="text-sm text-primary font-medium mb-4">{step.subtitle}</p>
            <p className="text-sm text-subtext leading-relaxed mb-8">{step.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3">
          {currentStep < steps.length - 1 && (
            <Button variant="ghost" onClick={skip} className="flex-1">
              Skip
            </Button>
          )}
          <Button onClick={next} className="flex-1">
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
