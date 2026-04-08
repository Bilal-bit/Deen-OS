'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { useSidebarStore } from '@/stores/sidebarStore';
import { toHijri } from '@/lib/hijri';
import { format } from 'date-fns';
import ThemeToggle from '@/components/ui/ThemeToggle';
import toast from 'react-hot-toast';

const dropdownItems = [
  { label: 'Profile', icon: '👤', href: '/profile' },
  { label: 'Achievements', icon: '🏆', href: '/achievements' },
  { label: 'Settings', icon: '⚙️', href: '/profile' },
  { label: 'divider', icon: '', href: '' },
  { label: 'logout', icon: '', href: '' },
];

export default function Header() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const toggleMobile = useSidebarStore((s) => s.toggleMobile);
  const router = useRouter();
  const today = new Date();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await signOut();
    toast.success('Logged out successfully');
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="h-14 md:h-16 border-b border-white/5 bg-surface/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      {/* Left side */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger - mobile only */}
        <button
          onClick={toggleMobile}
          className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text cursor-pointer md:hidden flex-shrink-0"
          aria-label="Open menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Greeting */}
        <div className="min-w-0">
          <h2 className="text-text font-semibold text-sm md:text-base truncate">
            Assalamu Alaikum, <span className="text-primary">{user?.name || 'User'}</span>
          </h2>
          <p className="text-[10px] md:text-xs text-subtext truncate">
            <span className="hidden sm:inline">{format(today, 'EEEE, MMMM d, yyyy')}</span>
            <span className="sm:hidden">{format(today, 'EEE, MMM d')}</span>
            {' '}&bull; {toHijri(today)}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 md:gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs md:text-sm border-2 border-transparent hover:border-primary/30 transition-all">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <svg
              className={`w-3 h-3 text-subtext transition-transform hidden sm:block ${open ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-white/10 rounded-xl shadow-lg shadow-black/30 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-medium text-text truncate">{user?.name}</p>
                <p className="text-xs text-subtext truncate">{user?.email}</p>
              </div>

              {/* Theme toggle - mobile only in dropdown */}
              <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between sm:hidden">
                <span className="text-sm text-text">Theme</span>
                <ThemeToggle />
              </div>

              <div className="py-1">
                {dropdownItems.map((item, i) => {
                  if (item.label === 'divider') {
                    return <div key={i} className="my-1 border-t border-white/5" />;
                  }
                  if (item.label === 'logout') {
                    return (
                      <button
                        key={i}
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors"
                      >
                        <span>🚪</span>
                        Sign Out
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
