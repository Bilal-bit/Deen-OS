'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { getDailyQuiz } from '@/data/quiz';
import { motion, AnimatePresence } from 'framer-motion';

export default function IslamicQuiz() {
  const quiz = getDailyQuiz();
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
  };

  const isCorrect = selected === quiz.correct;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-subtext text-sm font-medium uppercase tracking-wider">
          Daily Islamic Quiz
        </h3>
        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-lg">
          {quiz.category}
        </span>
      </div>

      <p className="text-text font-medium mb-4">{quiz.question}</p>

      <div className="space-y-2">
        {quiz.options.map((option, index) => {
          let style = 'bg-surface border border-white/5 hover:border-white/10 text-text';
          if (answered) {
            if (index === quiz.correct) {
              style = 'bg-green-500/15 border border-green-500/30 text-green-400';
            } else if (index === selected && !isCorrect) {
              style = 'bg-red-500/15 border border-red-500/30 text-red-400';
            } else {
              style = 'bg-surface border border-white/5 text-subtext opacity-50';
            }
          }

          return (
            <motion.button
              key={index}
              whileTap={!answered ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(index)}
              disabled={answered}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer text-left ${style}`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                answered && index === quiz.correct ? 'bg-green-500 text-white' :
                answered && index === selected && !isCorrect ? 'bg-red-500 text-white' :
                'bg-white/5 text-subtext'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-sm">{option}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-3 rounded-xl border"
            style={{
              backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderColor: isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            }}
          >
            <p className={`text-sm font-medium mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct! MashaAllah!' : 'Incorrect. Keep learning!'}
            </p>
            <p className="text-xs text-subtext">{quiz.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
