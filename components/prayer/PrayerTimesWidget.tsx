'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { PrayerTime, SalahName } from '@/types';
import { fetchPrayerTimes, getNextPrayer, formatMinutes, prayerInfo } from '@/lib/prayerTimes';
import { useAuthStore } from '@/stores/authStore';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function PrayerTimesWidget() {
  const user = useAuthStore((s) => s.user);
  const [times, setTimes] = useState<PrayerTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (user) loadTimes();
  }, [user]);

  // Countdown ticker
  useEffect(() => {
    if (!times) return;
    const tick = () => {
      const next = getNextPrayer(times);
      if (next) setCountdown(formatMinutes(next.minutesLeft));
    };
    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, [times]);

  const loadTimes = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: profile } = await supabase.from('users').select('city, country').eq('id', user!.id).single();

    if (profile?.city && profile?.country) {
      setCity(profile.city);
      setCountry(profile.country);
      const t = await fetchPrayerTimes(profile.city, profile.country);
      setTimes(t);
    } else {
      setShowSetup(true);
    }
    setLoading(false);
  };

  const saveLocation = async () => {
    if (!city || !country) { toast.error('Enter city and country'); return; }
    const supabase = createClient();
    await supabase.from('users').update({ city, country }).eq('id', user!.id);
    const t = await fetchPrayerTimes(city, country);
    if (t) {
      setTimes(t);
      setShowSetup(false);
      toast.success('Prayer times loaded!');
    } else {
      toast.error('Could not fetch times. Check city/country spelling.');
    }
  };

  if (loading) return <Card><Skeleton className="h-6 w-40 mb-4" /><Skeleton className="h-40" /></Card>;

  if (showSetup || !times) {
    return (
      <Card>
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">Prayer Times</h3>
        <p className="text-xs text-subtext mb-3">Enter your location to get accurate prayer times.</p>
        <div className="space-y-2">
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City (e.g. Karachi)"
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-text placeholder-subtext" />
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country (e.g. Pakistan)"
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-text placeholder-subtext" />
          <button onClick={saveLocation} className="w-full py-2 bg-primary text-white rounded-xl text-sm font-medium cursor-pointer hover:bg-primary/90">
            Save & Load Times
          </button>
        </div>
      </Card>
    );
  }

  const next = getNextPrayer(times);
  const allPrayers: { name: SalahName | 'sunrise'; key: keyof PrayerTime; }[] = [
    { name: 'fajr', key: 'fajr' },
    { name: 'sunrise' as SalahName, key: 'sunrise' },
    { name: 'dhuhr', key: 'dhuhr' },
    { name: 'asr', key: 'asr' },
    { name: 'maghrib', key: 'maghrib' },
    { name: 'isha', key: 'isha' },
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">Prayer Times</h3>
        <button onClick={() => setShowSetup(true)} className="text-[10px] text-primary hover:underline cursor-pointer">
          {city}, {country}
        </button>
      </div>

      {next && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-xl text-center">
          <p className="text-xs text-primary font-medium">Next: {prayerInfo[next.name]?.label || 'Sunrise'}</p>
          <p className="text-2xl font-bold text-text">{countdown}</p>
          <p className="text-[10px] text-subtext">at {next.time}</p>
        </div>
      )}

      <div className="space-y-1">
        {allPrayers.map((p) => {
          const isNext = next?.name === p.name;
          const label = p.name === 'sunrise' ? 'Sunrise' : prayerInfo[p.name as SalahName]?.label;
          return (
            <div key={p.key} className={`flex items-center justify-between p-2.5 rounded-xl ${isNext ? 'bg-primary/10 border border-primary/20' : ''}`}>
              <div className="flex items-center gap-2">
                {isNext && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                <span className={`text-sm ${isNext ? 'font-semibold text-primary' : 'text-text'}`}>{label}</span>
              </div>
              <span className={`text-sm font-mono ${isNext ? 'text-primary font-semibold' : 'text-subtext'}`}>{times[p.key]}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
