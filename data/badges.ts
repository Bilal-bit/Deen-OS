import { Badge } from '@/types';

export const allBadges: Badge[] = [
  // Streak badges
  { id: 'streak-3', name: '3 Day Streak', description: 'Maintain a 3-day streak', icon: '🔥', category: 'streak', requirement: 3 },
  { id: 'streak-7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '⚡', category: 'streak', requirement: 7 },
  { id: 'streak-14', name: 'Two Week Champion', description: 'Maintain a 14-day streak', icon: '💫', category: 'streak', requirement: 14 },
  { id: 'streak-30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '🌟', category: 'streak', requirement: 30 },
  { id: 'streak-60', name: 'Diamond Streak', description: 'Maintain a 60-day streak', icon: '💎', category: 'streak', requirement: 60 },
  { id: 'streak-100', name: 'Century Legend', description: 'Maintain a 100-day streak', icon: '👑', category: 'streak', requirement: 100 },
  { id: 'streak-365', name: 'Year of Devotion', description: 'Maintain a 365-day streak', icon: '🏆', category: 'streak', requirement: 365 },

  // Salah badges
  { id: 'salah-perfect-1', name: 'Perfect Day', description: 'Pray all 5 salah in one day', icon: '🕌', category: 'salah', requirement: 1 },
  { id: 'salah-perfect-7', name: 'Salah Week', description: 'Pray all 5 salah for 7 days straight', icon: '🌙', category: 'salah', requirement: 7 },
  { id: 'salah-perfect-30', name: 'Salah Month', description: 'Pray all 5 salah for 30 days', icon: '⭐', category: 'salah', requirement: 30 },
  { id: 'salah-fajr-7', name: 'Fajr Fighter', description: 'Pray Fajr for 7 days straight', icon: '🌅', category: 'salah', requirement: 7 },
  { id: 'salah-fajr-30', name: 'Fajr Master', description: 'Pray Fajr for 30 days straight', icon: '☀️', category: 'salah', requirement: 30 },

  // Quran badges
  { id: 'quran-7', name: 'Quran Lover', description: 'Read Quran for 7 days straight', icon: '📖', category: 'quran', requirement: 7 },
  { id: 'quran-30', name: 'Quran Devotee', description: 'Read Quran for 30 days', icon: '📚', category: 'quran', requirement: 30 },
  { id: 'quran-juz-5', name: '5 Juz Done', description: 'Complete 5 Juz of Quran', icon: '📕', category: 'quran', requirement: 5 },
  { id: 'quran-juz-15', name: 'Halfway There', description: 'Complete 15 Juz of Quran', icon: '📗', category: 'quran', requirement: 15 },
  { id: 'quran-khatm', name: 'Quran Khatm', description: 'Complete full Quran recitation', icon: '🎉', category: 'quran', requirement: 30 },

  // Habit badges
  { id: 'habit-water-7', name: 'Hydrated', description: 'Log water for 7 days', icon: '💧', category: 'habit', requirement: 7 },
  { id: 'habit-exercise-7', name: 'Active Muslim', description: 'Exercise for 7 days', icon: '💪', category: 'habit', requirement: 7 },
  { id: 'habit-sleep-7', name: 'Well Rested', description: 'Good sleep for 7 days', icon: '😴', category: 'habit', requirement: 7 },
  { id: 'habit-all-7', name: 'All Habits Week', description: 'Complete all habits for 7 days', icon: '✨', category: 'habit', requirement: 7 },

  // Special badges
  { id: 'score-100', name: 'Perfect Score', description: 'Achieve 100/100 score in a day', icon: '💯', category: 'special', requirement: 1 },
  { id: 'score-100-7', name: 'Perfect Week', description: 'Score 100 for 7 days straight', icon: '🏅', category: 'special', requirement: 7 },
  { id: 'tasbih-1000', name: 'Dhikr Master', description: 'Complete 1000 tasbih total', icon: '📿', category: 'special', requirement: 1000 },
  { id: 'quiz-10', name: 'Knowledge Seeker', description: 'Answer 10 quizzes correctly', icon: '🧠', category: 'special', requirement: 10 },
  { id: 'journal-7', name: 'Reflector', description: 'Write journal for 7 days', icon: '✍️', category: 'special', requirement: 7 },
  { id: 'ramadan-complete', name: 'Ramadan Mubarak', description: 'Complete Ramadan tracking', icon: '🌙', category: 'special', requirement: 30 },
  { id: 'first-day', name: 'New Beginning', description: 'Complete your first day', icon: '🌱', category: 'special', requirement: 1 },
];

export const levels = [
  { level: 1, name: 'Seedling', minPoints: 0, icon: '🌱' },
  { level: 2, name: 'Sprout', minPoints: 100, icon: '🌿' },
  { level: 3, name: 'Sapling', minPoints: 300, icon: '🌳' },
  { level: 4, name: 'Seeker', minPoints: 600, icon: '🔍' },
  { level: 5, name: 'Learner', minPoints: 1000, icon: '📖' },
  { level: 6, name: 'Practitioner', minPoints: 1500, icon: '⭐' },
  { level: 7, name: 'Devoted', minPoints: 2500, icon: '💫' },
  { level: 8, name: 'Guardian', minPoints: 4000, icon: '🛡️' },
  { level: 9, name: 'Scholar', minPoints: 6000, icon: '🎓' },
  { level: 10, name: 'Hafiz', minPoints: 9000, icon: '👑' },
  { level: 11, name: 'Master', minPoints: 13000, icon: '💎' },
  { level: 12, name: 'Legend', minPoints: 20000, icon: '🏆' },
];

export function getLevelForPoints(totalPoints: number) {
  let current = levels[0];
  for (const level of levels) {
    if (totalPoints >= level.minPoints) {
      current = level;
    } else {
      break;
    }
  }
  const nextLevel = levels.find((l) => l.minPoints > totalPoints) || null;
  const progress = nextLevel
    ? ((totalPoints - current.minPoints) / (nextLevel.minPoints - current.minPoints)) * 100
    : 100;
  return { ...current, progress, nextLevel };
}
