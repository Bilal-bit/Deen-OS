'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const steps = [
  { num: '01', icon: '📝', title: 'Sign up in seconds', desc: 'Create your free account with just your email — no credit card needed.' },
  { num: '02', icon: '🕌', title: 'Log prayers & habits', desc: 'Track all 5 daily prayers, Quran reading, dhikr, fasting, and more.' },
  { num: '03', icon: '📈', title: 'Watch your score grow', desc: 'Your Akhirah Score reflects your consistency and spiritual progress.' },
];

const features = [
  { icon: '🤲', title: 'Prayer Tracker', desc: 'Log all 5 daily prayers plus nawafil like Tahajjud, Ishraq, and Duha. Track your streaks and never miss a salah.' },
  { icon: '💪', title: 'Habit Builder', desc: 'Build Islamic habits — Quran reading, morning & evening azkar, dhikr, fasting, and custom habits you define.' },
  { icon: '⭐', title: 'Akhirah Score', desc: 'A unique 0–100 daily score that reflects your prayers, habits, and consistency. Motivating, not judgmental.' },
  { icon: '📊', title: 'Insights & Streaks', desc: 'Beautiful charts showing your weekly progress. Maintain streaks, earn badges, and level up from Seedling to Legend.' },
  { icon: '📿', title: 'Digital Tasbih', desc: 'SubhanAllah, Alhamdulillah, Allahu Akbar — count your dhikr with a beautiful interactive tasbih counter.' },
  { icon: '🧠', title: 'Daily Knowledge', desc: 'A new dua, hadith, Quran ayah, and Islamic quiz every day. Learn one of the 99 Names of Allah daily.' },
];

const scoreBreakdown = [
  { label: 'Fajr, Zuhr, Asr, Maghrib, Isha', points: '10 pts each', total: '50' },
  { label: 'Quran Reading', points: '20 pts', total: '20' },
  { label: 'Water, Sleep, Exercise', points: '10 pts each', total: '30' },
];

export default function Home() {
  const router = useRouter();
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemo = async () => {
    setDemoLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: 'demo@deenos.app',
      password: 'demo123456',
    });
    if (error) {
      toast.error('Demo not available right now. Please sign up!');
      setDemoLoading(false);
      return;
    }
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ============ STICKY NAVBAR ============ */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold"><span className="text-primary">Deen</span> OS</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-subtext hover:text-text transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} custom={0} className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary font-medium mb-6">
              Free Islamic Lifestyle Tracker
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
              Your Islamic Lifestyle{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-highlight">
                Operating System
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-subtext leading-relaxed mb-8 max-w-lg">
              Track your 5 daily prayers, build habits like Quran reading and dhikr, and watch your Akhirah Score grow.
              Everything you need to stay consistent on your deen — in one beautiful app.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary/20"
              >
                Get Started 
              </Link>
              <a
                href="#how-it-works"
                className="px-6 py-3 bg-surface hover:bg-white/5 text-text font-medium rounded-xl border border-white/10 transition-colors"
              >
                See How It Works
              </a>
           
            </motion.div>

       
          </motion.div>

          {/* Right: App mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-card rounded-3xl border border-white/10 shadow-2xl shadow-black/30 p-6 overflow-hidden">
              {/* Fake dashboard */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-text font-semibold">Assalamu Alaikum, <span className="text-primary">User</span></p>
                  <p className="text-xs text-subtext">Wednesday, April 9 &bull; 23 Shawwal 1446 AH</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">U</div>
              </div>

              {/* Score */}
              <div className="bg-surface rounded-2xl p-5 mb-4 border border-white/5 text-center">
                <p className="text-[10px] text-subtext uppercase tracking-wider mb-2">Akhirah Score</p>
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="none" className="text-white/5" />
                    <circle cx="50" cy="50" r="42" stroke="#10B981" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * 0.28} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-text">72</span>
                </div>
                <p className="text-[10px] text-subtext">72/100 points today</p>
              </div>

              {/* Prayer pills */}
              <div className="grid grid-cols-5 gap-1.5 mb-4">
                {['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'].map((s, i) => (
                  <div key={s} className={`text-center py-2 rounded-xl text-[10px] font-medium ${i < 3 ? 'bg-primary/15 text-primary border border-primary/20' : 'bg-surface text-subtext border border-white/5'}`}>
                    <div className={`w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center text-[8px] ${i < 3 ? 'bg-primary text-white' : 'bg-white/5 text-subtext'}`}>
                      {i < 3 ? '✓' : '○'}
                    </div>
                    {s}
                  </div>
                ))}
              </div>

              {/* Streak */}
              <div className="flex items-center gap-4 bg-surface rounded-xl p-3 border border-white/5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-highlight">12</p>
                  <p className="text-[9px] text-subtext">Current</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">30</p>
                  <p className="text-[9px] text-subtext">Best</p>
                </div>
                <span className="ml-auto text-xl">🔥</span>
              </div>

              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-highlight/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="bg-surface/50 border-y border-white/5 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <motion.p variants={fadeUp} custom={0} className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Simple Process</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-text">How It Works</motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl mx-auto mb-4">
                  {step.icon}
                </div>
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Step {step.num}</span>
                <h3 className="text-lg font-semibold text-text mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-subtext leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <motion.p variants={fadeUp} custom={0} className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Everything You Need</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-text">Features Built for Your Deen</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-subtext mt-3 max-w-lg mx-auto">Track, learn, and grow — all in one place designed with love for the Muslim ummah.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-sm text-subtext leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AKHIRAH SCORE EXPLANATION ============ */}
      <section className="bg-surface/50 border-y border-white/5 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Visual */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="bg-card rounded-3xl p-8 border border-white/5 max-w-sm mx-auto lg:mx-0">
                <p className="text-xs text-subtext uppercase tracking-wider mb-4 text-center">Today&apos;s Score Breakdown</p>
                <div className="space-y-3">
                  {scoreBreakdown.map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-surface rounded-xl border border-white/5">
                      <div>
                        <p className="text-sm text-text font-medium">{item.label}</p>
                        <p className="text-[10px] text-subtext">{item.points}</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{item.total}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <p className="text-sm text-primary font-semibold">Maximum Daily Score</p>
                    <span className="text-lg font-bold text-primary">100</span>
                  </div>
                </div>
                <p className="text-[10px] text-subtext text-center mt-4">+ bonus points for nawafil, azkar & Ramadan ibaadat</p>
              </div>
            </motion.div>

            {/* Right: Copy */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p variants={fadeUp} custom={0} className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Your Spiritual Progress</motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-text mb-6">
                What is Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-highlight">Akhirah Score</span>?
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="space-y-4 text-subtext leading-relaxed">
                <p>
                  Your Akhirah Score is a daily reflection of how you&apos;re investing in your akhirah (hereafter).
                  It&apos;s <strong className="text-text">not a judgment</strong> — it&apos;s a gentle reminder and a tool for growth.
                </p>
                <p>
                  Every time you pray, read Quran, complete your dhikr, or take care of your body,
                  your score goes up. The goal isn&apos;t perfection — it&apos;s <strong className="text-text">consistency</strong>.
                </p>
                <p>
                  Maintain streaks, earn badges, level up from <span className="text-primary">Seedling</span> to <span className="text-primary">Legend</span>,
                  and let the barakah compound over time. Your future self will thank you.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} custom={3} className="mt-8">
                <Link
                  href="/signup"
                  className="inline-flex px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary/20"
                >
                  Start Tracking Your Score
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeUp} custom={0} className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-highlight mb-3">
              500+
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="text-lg text-text font-medium mb-2">
              Muslims tracking their deen
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-subtext max-w-md mx-auto mb-10">
              Join a growing community of believers using Deen OS to build consistency in their prayers, habits, and spiritual growth.
            </motion.p>
          </motion.div>

          {/* Testimonial placeholders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Ahmed R.', text: 'Deen OS helped me never miss Fajr again. The streak feature keeps me motivated every single day.', location: 'Toronto, Canada' },
              { name: 'Fatima S.', text: 'I love the Akhirah Score concept. It makes tracking ibaadat feel rewarding instead of like a chore.', location: 'London, UK' },
              { name: 'Omar K.', text: 'The tasbih counter and daily azkar checklist are my favorite features. Simple, clean, and beautiful.', location: 'Karachi, Pakistan' },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-2xl p-5 border border-white/5 text-left"
              >
                <p className="text-sm text-text leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-medium text-text">{t.name}</p>
                  <p className="text-[11px] text-subtext">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold text-text mb-4">
              Ready to Invest in Your Akhirah?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-subtext mb-8 max-w-md mx-auto">
              Every prayer tracked, every habit built, every dhikr counted — it all adds up. Start your journey today.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-3">
              <Link
                href="/signup"
                className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary/20 text-base"
              >
                Get Started Free
              </Link>
        
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold">
                <span className="text-primary">Deen</span> OS
              </p>
              <p className="text-[11px] text-subtext mt-0.5">Barakah in every byte</p>
            </div>

            <div className="flex items-center gap-6 text-xs text-subtext">
              <Link href="/privacy" className="hover:text-text transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-text transition-colors">Terms of Service</Link>
              <a href="mailto:contact@deenos.app" className="hover:text-text transition-colors">Contact</a>
            </div>

            <p className="text-[11px] text-subtext">
              &copy; {new Date().getFullYear()} Deen OS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
