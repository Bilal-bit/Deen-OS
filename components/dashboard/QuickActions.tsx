'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import { motion } from 'framer-motion';

const actions = [
  { label: 'Tasbih', icon: '📿', href: '/tasbih', color: 'from-primary/20 to-primary/5' },
  { label: 'Quran', icon: '📖', href: '/quran', color: 'from-accent/20 to-accent/5' },
  { label: 'Dua', icon: '🤲', href: '/ibaadat', color: 'from-highlight/20 to-highlight/5' },
  { label: 'Quiz', icon: '🧠', href: '/knowledge', color: 'from-purple-500/20 to-purple-500/5' },
  { label: 'Goals', icon: '🎯', href: '/productivity', color: 'from-amber-500/20 to-amber-500/5' },
  { label: 'Journal', icon: '✍️', href: '/journal', color: 'from-indigo-500/20 to-indigo-500/5' },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(action.href)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${action.color} border border-white/5 cursor-pointer hover:border-white/10 transition-all`}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs font-medium text-text">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </Card>
  );
}
