import type { AgeGroup } from './questions.ts';
import type { ResultTier } from './results.ts';

/**
 * Ilustraciones oficiales del Dr. Pandita.
 * Ruta: /images/dr-pandita/{edad}-{resultado}.png
 * Edad: nino | adolescente | adulto
 * Resultado: intentalo | vas-bien | excelente
 */
export function panditaImage(age: AgeGroup, tier: ResultTier): string {
  return `/images/dr-pandita/${age}-${tier}.png`;
}

export const PANDITA_ALT: Record<ResultTier, string> = {
  intentalo: 'Dr. Pandita con el pulgar arriba, animando a intentarlo otra vez',
  'vas-bien': 'Dr. Pandita sonriendo, contento con el avance',
  excelente: 'Dr. Pandita celebrando un resultado excelente',
};
