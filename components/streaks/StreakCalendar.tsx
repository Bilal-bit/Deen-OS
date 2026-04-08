'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { DailyLog } from '@/types';
import { useCalendarLogs } from '@/hooks/useCalendarLogs';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
} from 'date-fns';

interface StreakCalendarProps {
  userId: string;
}

export default function StreakCalendar({ userId }: StreakCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { logs, loading } = useCalendarLogs(userId, currentMonth);

  const logMap = new Map<string, DailyLog>();
  logs.forEach((log) => logMap.set(log.date, log));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="text-subtext hover:text-text p-1 cursor-pointer"
        >
          ←
        </button>
        <h3 className="text-text font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="text-subtext hover:text-text p-1 cursor-pointer"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-[10px] text-subtext font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const log = logMap.get(dateStr);
          const hasScore = log && log.score > 0;
          const today = isToday(day);

          return (
            <div
              key={dateStr}
              className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                hasScore
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : today
                  ? 'bg-white/5 text-text border border-white/10'
                  : 'text-subtext'
              }`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="text-xs text-subtext text-center mt-3">Loading...</p>
      )}
    </Card>
  );
}
