'use client';

import Card from '@/components/ui/Card';
import { DailyLog } from '@/types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parseISO } from 'date-fns';

interface WeeklyScoreChartProps {
  logs: DailyLog[];
}

export default function WeeklyScoreChart({ logs }: WeeklyScoreChartProps) {
  const data = logs.map((log) => ({
    date: format(parseISO(log.date), 'EEE'),
    score: log.score,
  }));

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Weekly Score
      </h3>
      {data.length === 0 ? (
        <p className="text-subtext text-sm text-center py-8">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#E5E7EB',
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#scoreColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
