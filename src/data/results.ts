export const POINTS_PER_CORRECT = 100;

export type ResultTier = 'motivating' | 'smiling' | 'celebrating' | 'expert';

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

export interface TierCopy {
  message: string;
  replayLabel: string;
}

export const RESULT_TIERS: Record<ResultTier, TierCopy> = {
  motivating: {
    message: '¡Buen comienzo! Cada cosa nueva que aprendes ayuda a cuidar mejor tu sonrisa.',
    replayLabel: 'INTENTAR OTRA VEZ',
  },
  smiling: {
    message: '¡Vas muy bien! Ya conoces varios hábitos importantes para una sonrisa saludable.',
    replayLabel: 'MEJORAR MI RESULTADO',
  },
  celebrating: {
    message: '¡Excelente! Sabes mucho sobre el cuidado de tu sonrisa.',
    replayLabel: 'JUGAR DE NUEVO',
  },
  expert: {
    message: '¡Resultado perfecto! El Dr. Pandita te nombra Experto(a) en Sonrisas.',
    replayLabel: 'VOLVER A JUGAR',
  },
};

export const EXPERT_BADGE = 'Experto en Sonrisas';

/**
 * Con 5 preguntas los tramos quedan así:
 * 0–1 motivating, 2–3 smiling, 4 celebrating, 5 expert.
 * Si el grupo crece, se conserva la misma proporción.
 */
export function tierForScore(correct: number, total: number): ResultTier {
  if (total <= 0 || correct <= 0) return 'motivating';
  if (correct >= total) return 'expert';
  const ratio = correct / total;
  if (ratio > 0.6) return 'celebrating';
  if (ratio > 0.2) return 'smiling';
  return 'motivating';
}

export function trailingStreak(answers: readonly { correct: boolean }[]): number {
  let streak = 0;
  for (let index = answers.length - 1; index >= 0; index -= 1) {
    if (!answers[index]?.correct) break;
    streak += 1;
  }
  return streak;
}

export function bestStreak(answers: readonly { correct: boolean }[]): number {
  let best = 0;
  let current = 0;
  for (const answer of answers) {
    current = answer.correct ? current + 1 : 0;
    if (current > best) best = current;
  }
  return best;
}
