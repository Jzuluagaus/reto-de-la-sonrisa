import type { AgeGroup } from './questions.ts';

export const POINTS_PER_CORRECT = 100;

export type ResultTier = 'intentalo' | 'vas-bien' | 'excelente';

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

export interface TierCopy {
  title: string;
  message: string;
  replayLabel: string;
}

const REPLAY: Record<ResultTier, string> = {
  intentalo: 'INTENTAR OTRA VEZ',
  'vas-bien': 'MEJORAR MI RESULTADO',
  excelente: 'JUGAR DE NUEVO',
};

const TITLES: Record<ResultTier, string> = {
  intentalo: '¡Buen comienzo!',
  'vas-bien': '¡Vas muy bien!',
  excelente: '¡Excelente!',
};

const MESSAGES: Record<AgeGroup, Record<ResultTier, string>> = {
  nino: {
    intentalo:
      'El Dr. Pandita sabe que puedes aprender mucho más. ¡Inténtalo otra vez y sigue cuidando tu sonrisa!',
    'vas-bien':
      'El Dr. Pandita está muy contento. Ya conoces varios secretos para mantener una sonrisa saludable.',
    excelente: '¡El Dr. Pandita te felicita! Sabes mucho sobre cómo cuidar tu sonrisa.',
  },
  adolescente: {
    intentalo:
      'Ya comenzaste a descubrir cómo cuidar mejor tu sonrisa. Inténtalo nuevamente y supera tu resultado.',
    'vas-bien':
      'Conoces varios hábitos importantes. Un intento más podría convertirte en experto en sonrisas.',
    excelente: '¡Excelente resultado! Estás preparado para tomar buenas decisiones sobre tu salud dental.',
  },
  adulto: {
    intentalo: 'Cada respuesta ayuda a reconocer mejores hábitos de salud dental. Inténtalo nuevamente.',
    'vas-bien': 'Tienes buenos conocimientos sobre prevención y salud dental. Continúa reforzándolos.',
    excelente:
      'Excelente conocimiento de prevención y cuidado dental. Mantener estos hábitos ayuda a proteger la salud de toda la familia.',
  },
};

const TIPS: Record<AgeGroup, string> = {
  nino: 'El flúor fortalece el esmalte. Cepillarse con ayuda de un adulto, mañana y noche, cuida las zonas que más se olvidan.',
  adolescente:
    'El hilo dental y moderar las bebidas azucaradas protegen el esmalte, también cuando hay brackets.',
  adulto: 'Revisar encías y dientes con regularidad permite atender cambios pequeños antes de que duelan.',
};

export function resultCopy(age: AgeGroup, tier: ResultTier): TierCopy {
  return {
    title: TITLES[tier],
    message: MESSAGES[age][tier],
    replayLabel: REPLAY[tier],
  };
}

export function dentalTip(age: AgeGroup): string {
  return TIPS[age];
}

/** 0–1 intentalo, 2–3 vas-bien, 4–5 excelente. */
export function tierForScore(correct: number): ResultTier {
  if (correct <= 1) return 'intentalo';
  if (correct <= 3) return 'vas-bien';
  return 'excelente';
}

export function trailingStreak(answers: readonly { correct: boolean }[]): number {
  let streak = 0;
  for (let index = answers.length - 1; index >= 0; index -= 1) {
    if (!answers[index]?.correct) break;
    streak += 1;
  }
  return streak;
}
