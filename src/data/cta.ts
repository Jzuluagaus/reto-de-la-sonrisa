import type { AgeGroup } from './questions.ts';

export type DayPart = 'AM' | 'PM';

/** Número de Smile Alegría en wa.me, sin signo +. */
export const WHATSAPP_NUMBER = '524771547387';

export interface AgePromo {
  title: string;
  offer: string;
  benefit?: string;
  benefits?: readonly string[];
  info?: readonly string[];
  scheduleQuestion: string;
  button: string;
  messageBase: string;
}

export const PROMOS: Record<AgeGroup, AgePromo> = {
  nino: {
    title: '¡Una sonrisa limpia y protegida!',
    offer: 'Menores de 12 años: consulta + limpieza por $650',
    benefit: 'Incluye GRATIS aplicación de flúor y pastilla reveladora de placa.',
    info: [
      'Citas de lunes a sábado.',
      'Los sábados se solicita un apartado de $100, aplicado al total de la visita.',
    ],
    scheduleQuestion: '¿Prefieres una cita por la mañana o por la tarde?',
    button: 'Agendar limpieza infantil',
    messageBase:
      'Hola, completamos el Reto de la Sonrisa y quiero agendar la promoción para menor de 12 años: consulta + limpieza por $650, con flúor y pastilla reveladora sin costo.',
  },
  adolescente: {
    title: '¡Es un gran momento para transformar tu sonrisa!',
    offer: 'Valoración de ortodoncia por $999 MXN',
    benefits: ['Evaluación', 'Radiografías', 'Limpieza', 'Plan de tratamiento personalizado'],
    scheduleQuestion: '¿Prefieres una cita por la mañana o por la tarde?',
    button: 'Agendar valoración de ortodoncia',
    messageBase:
      'Hola, completé el Reto de la Sonrisa y quiero agendar la valoración de ortodoncia por $999, que incluye evaluación, radiografías, limpieza y plan de tratamiento.',
  },
  adulto: {
    title: 'Tu sonrisa también merece atención.',
    offer: 'Limpieza + evaluación + pastilla reveladora por $850',
    info: [
      'Citas de lunes a sábado.',
      'Los sábados se solicita un apartado de $100, aplicado al total de la visita.',
    ],
    scheduleQuestion: '¿Prefieres una cita por la mañana o por la tarde?',
    button: 'Agendar limpieza para adulto',
    messageBase:
      'Hola, completé el Reto de la Sonrisa y quiero agendar la limpieza + evaluación + pastilla reveladora por $850.',
  },
};

export function scheduleLine(part: DayPart | null): string {
  if (part === 'AM') return 'Prefiero horario AM.';
  if (part === 'PM') return 'Prefiero horario PM.';
  return 'Quisiera conocer los horarios disponibles.';
}

export function promoMessage(age: AgeGroup, part: DayPart | null): string {
  return `${PROMOS[age].messageBase} ${scheduleLine(part)}`;
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function promoWhatsappUrl(age: AgeGroup, part: DayPart | null): string {
  return whatsappUrl(promoMessage(age, part));
}

export const STUDIO_ATTRIBUTION = '🐼 Una iniciativa educativa de Smile Alegría Dental Studio';

const FORBIDDEN: Record<AgeGroup, readonly RegExp[]> = {
  nino: [/ortodoncia/i, /\$850/, /\$999/, /Miraflores/i, /colegio/i, /\[AM\/PM\]/],
  adolescente: [/infantil/i, /\$650/, /\$850/, /Miraflores/i, /colegio/i, /\[AM\/PM\]/],
  adulto: [/infantil/i, /ortodoncia/i, /\$650/, /\$999/, /Miraflores/i, /colegio/i, /\[AM\/PM\]/],
};

function promoText(age: AgeGroup): string {
  const promo = PROMOS[age];
  return [
    promo.title,
    promo.offer,
    promo.benefit ?? '',
    ...(promo.benefits ?? []),
    ...(promo.info ?? []),
    promo.scheduleQuestion,
    promo.button,
    promoMessage(age, 'AM'),
    promoMessage(age, 'PM'),
    promoMessage(age, null),
  ].join('\n');
}

for (const age of Object.keys(PROMOS) as AgeGroup[]) {
  const text = promoText(age);
  if (/fluor/i.test(text)) {
    throw new Error(`La promoción de ${age} debe escribir «flúor», no «fluor».`);
  }
  if ((PROMOS[age].benefits?.length ?? 0) > 4) {
    throw new Error(`La promoción de ${age} tiene más de 4 beneficios.`);
  }
  for (const pattern of FORBIDDEN[age]) {
    if (pattern.test(text)) {
      throw new Error(`La promoción de ${age} mezcla un texto que no le corresponde (${pattern}).`);
    }
  }
}

const ninoCopy = promoText('nino');
if (!ninoCopy.includes('flúor') || !ninoCopy.includes('pastilla reveladora') || !ninoCopy.includes('$650')) {
  throw new Error('La promoción infantil debe mencionar flúor, pastilla reveladora y $650.');
}
if (!promoText('adolescente').includes('$999') || !promoText('adolescente').includes('ortodoncia')) {
  throw new Error('La promoción de adolescente debe ser la valoración de ortodoncia por $999.');
}
if (!promoText('adulto').includes('pastilla reveladora') || !promoText('adulto').includes('$850')) {
  throw new Error('La promoción de adulto debe mencionar la pastilla reveladora y $850.');
}
