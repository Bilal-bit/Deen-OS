'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { useStreak } from '@/hooks/useStreak';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LevelProgress from '@/components/gamification/LevelProgress';
import { getLevelForPoints } from '@/data/badges';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, signOut } = useAuthStore();
  const { language, setLanguage, theme } = useThemeStore();
  const { streak } = useStreak(user?.id);
  const router = useRouter();

  const totalPoints = 650;
  const level = getLevelForPoints(totalPoints);

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully');
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Profile</h2>

      {/* Top: Profile card + Stats side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile info */}
        <Card className="md:col-span-2">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-highlight/20 flex items-center justify-center text-primary font-bold text-3xl border border-primary/20">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="text-xl font-bold text-text">{user?.name}</h3>
              <p className="text-sm text-subtext">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg">{level.icon}</span>
                <span className="text-sm text-primary font-medium">Level {level.level} — {level.name}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-subtext mb-1 uppercase tracking-wider">Name</label>
              <div className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-text text-sm">
                {user?.name}
              </div>
            </div>
            <div>
              <label className="block text-xs text-subtext mb-1 uppercase tracking-wider">Email</label>
              <div className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-text text-sm">
                {user?.email}
              </div>
            </div>
          </div>
        </Card>

        {/* Quick stats */}
        <Card>
          <h3 className="text-sm font-medium text-subtext uppercase tracking-wider mb-4">
            Your Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-surface rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-sm font-medium text-text">Current Streak</p>
                  <p className="text-[10px] text-subtext">Keep it going!</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-highlight">{streak?.current_streak ?? 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-surface rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-sm font-medium text-text">Best Streak</p>
                  <p className="text-[10px] text-subtext">Personal record</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-accent">{streak?.best_streak ?? 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-surface rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💎</span>
                <div>
                  <p className="text-sm font-medium text-text">Total Points</p>
                  <p className="text-[10px] text-subtext">All time</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-primary">{totalPoints}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Middle: Level + Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LevelProgress totalPoints={totalPoints} />

        <div className="space-y-6">
          {/* Appearance */}
          <Card>
            <h3 className="text-sm font-medium text-subtext uppercase tracking-wider mb-4">
              Appearance
            </h3>
            <div className="flex items-center justify-between p-3 bg-surface rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-lg">{theme === 'dark' ? '🌙' : '☀️'}</span>
                <div>
                  <p className="text-sm font-medium text-text">Theme</p>
                  <p className="text-[10px] text-subtext">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </Card>

          {/* Language */}
          <Card>
            <h3 className="text-sm font-medium text-subtext uppercase tracking-wider mb-4">
              Language
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  language === 'en'
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-surface border-white/5 text-subtext hover:text-text hover:border-white/10'
                }`}
              >
                <p className="text-lg mb-1">🇬🇧</p>
                <p className="text-sm font-medium">English</p>
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  language === 'ur'
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-surface border-white/5 text-subtext hover:text-text hover:border-white/10'
                }`}
              >
                <p className="text-lg mb-1">🇵🇰</p>
                <p className="text-sm font-medium">اردو</p>
              </button>
            </div>
          </Card>

          {/* Account Actions */}
          <Card>
            <h3 className="text-sm font-medium text-subtext uppercase tracking-wider mb-4">
              Account
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => { localStorage.removeItem('deen-os-onboarding'); toast.success('Onboarding reset! Refresh to see it.'); }}
                className="w-full flex items-center gap-3 p-3 bg-surface rounded-xl border border-white/5 text-sm text-text hover:bg-white/5 cursor-pointer transition-colors text-left"
              >
                <span>🔄</span>
                <div>
                  <p className="font-medium">Replay Onboarding</p>
                  <p className="text-[10px] text-subtext">See the welcome tour again</p>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 bg-surface rounded-xl border border-red-500/10 text-sm text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors text-left"
              >
                <span>🚪</span>
                <div>
                  <p className="font-medium">Sign Out</p>
                  <p className="text-[10px] text-red-400/60">Log out of your account</p>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
