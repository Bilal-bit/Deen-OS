'use client';

import Card from '@/components/ui/Card';
import { DailyLog } from '@/types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface HabitConsistencyChartProps {
  logs: DailyLog[];
}

export default function HabitConsistencyChart({ logs }: HabitConsistencyChartProps) {
  const totalDays = logs.length || 1;

  const data = [
    { habit: 'Water', pct: Math.round((logs.filter((l) => l.water).length / totalDays) * 100) },
    { habit: 'Sleep', pct: Math.round((logs.filter((l) => l.sleep).length / totalDays) * 100) },
    { habit: 'Exercise', pct: Math.round((logs.filter((l) => l.exercise).length / totalDays) * 100) },
    { habit: 'Quran', pct: Math.round((logs.filter((l) => l.quran).length / totalDays) * 100) },
  ];

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Habit Consistency (7 days)
      </h3>
      {logs.length === 0 ? (
        <p className="text-subtext text-sm text-center py-8">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="habit" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 100]} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#E5E7EB',
              }}
            />
            <Bar dataKey="pct" fill="#34D399" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
