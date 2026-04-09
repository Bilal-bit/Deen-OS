'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebarStore } from '@/stores/sidebarStore';

interface NavSection {
  title: string;
  items: { href: string; label: string; icon: string }[];
}

const navSections: NavSection[] = [
  {
    title: 'Main',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: '◫' },
      { href: '/insights', label: 'Insights', icon: '◑' },
      { href: '/streaks', label: 'Streaks', icon: '🔥' },
    ],
  },
  {
    title: 'Salah',
    items: [
      { href: '/prayer-times', label: 'Prayer Times', icon: '🕐' },
      { href: '/qaza', label: 'Qaza Tracker', icon: '📋' },
    ],
  },
  {
    title: 'Ibaadat',
    items: [
      { href: '/ibaadat', label: 'Ibaadat Hub', icon: '🕌' },
      { href: '/tasbih', label: 'Tasbih', icon: '📿' },
      { href: '/quran', label: 'Quran Tracker', icon: '📖' },
    ],
  },
  {
    title: 'Knowledge',
    items: [
      { href: '/knowledge', label: 'Learn', icon: '🧠' },
    ],
  },
  {
    title: 'Community',
    items: [
      { href: '/social', label: 'Social', icon: '👥' },
      { href: '/challenges', label: 'Challenges', icon: '🏅' },
    ],
  },
  {
    title: 'Productivity',
    items: [
      { href: '/productivity', label: 'Productivity', icon: '🎯' },
      { href: '/journal', label: 'Journal', icon: '✍️' },
      { href: '/schedule', label: 'Schedule', icon: '📅' },
    ],
  },
  {
    title: 'Growth',
    items: [
      { href: '/achievements', label: 'Achievements', icon: '🏆' },
      { href: '/profile', label: 'Profile', icon: '◉' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { mobileOpen, setMobileOpen } = useSidebarStore();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  // Close on escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [setMobileOpen]);

  // Prevent body scroll when mobile sidebar open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const sidebarContent = (
    <>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-text">
              <span className="text-primary">Deen</span> OS
            </h1>
            <p className="text-[10px] text-subtext mt-0.5">Islamic Lifestyle Tracker</p>
          </div>
        )}
        {/* Collapse button - desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-lg bg-white/5 items-center justify-center text-subtext hover:text-text cursor-pointer text-xs hidden md:flex"
        >
          {collapsed ? '→' : '←'}
        </button>
        {/* Close button - mobile only */}
        <button
          onClick={() => setMobileOpen(false)}
          className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-subtext hover:text-text cursor-pointer text-xs md:hidden"
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-4 overflow-y-auto pb-4">
        {navSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="text-[10px] text-subtext uppercase tracking-wider px-3 mb-1">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-subtext hover:text-text hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        {!collapsed && (
          <p className="text-[9px] text-subtext text-center">
            Deen OS v2.0 — Barakah in every byte
          </p>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-surface border-r border-white/5 flex-col z-50 transition-all duration-300 hidden md:flex ${collapsed ? 'w-16' : 'w-60'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile overlay + sidebar drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-72 bg-surface border-r border-white/5 flex flex-col z-50 md:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
