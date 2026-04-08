'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-5xl font-bold mb-3">
          <span className="text-primary">Deen</span>{' '}
          <span className="text-text">OS</span>
        </h1>
        <p className="text-subtext text-lg mb-8">
          Your Islamic lifestyle operating system. Track prayers, build habits,
          grow your Akhirah score.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/login">
            <Button variant="primary" size="lg">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="secondary" size="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-subtext text-xs mt-16"
      >
        Barakah in every byte
      </motion.p>
    </div>
  );
}
