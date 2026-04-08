'use client';

import Card from '@/components/ui/Card';
import { DailyLog } from '@/types';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';

interface SalahCompletionChartProps {
  logs: DailyLog[];
}

export default function SalahCompletionChart({ logs }: SalahCompletionChartProps) {
  const totalDays = logs.length || 1;

  const data = [
    { name: 'Fajr', value: Math.round((logs.filter((l) => l.fajr).length / totalDays) * 100), fill: '#10B981' },
    { name: 'Zuhr', value: Math.round((logs.filter((l) => l.zuhr).length / totalDays) * 100), fill: '#34D399' },
    { name: 'Asr', value: Math.round((logs.filter((l) => l.asr).length / totalDays) * 100), fill: '#22D3EE' },
    { name: 'Maghrib', value: Math.round((logs.filter((l) => l.maghrib).length / totalDays) * 100), fill: '#6EE7B7' },
    { name: 'Isha', value: Math.round((logs.filter((l) => l.isha).length / totalDays) * 100), fill: '#A7F3D0' },
  ];

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Salah Completion (7 days)
      </h3>
      {logs.length === 0 ? (
        <p className="text-subtext text-sm text-center py-8">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              dataKey="value"
              background={{ fill: 'rgba(255,255,255,0.03)' }}
              cornerRadius={8}
            />
            <Legend
              iconSize={10}
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
