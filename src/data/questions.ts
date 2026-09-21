export type AgeGroup = 'nino' | 'adolescente' | 'adulto';

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: readonly [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface AgeOption {
  id: AgeGroup;
  label: string;
  hint: string;
}

export const AGE_OPTIONS: readonly AgeOption[] = [
  {
    id: 'nino',
    label: 'Niño(a)',
    hint: 'Cepillado, dulces y flúor',
  },
  {
    id: 'adolescente',
    label: 'Adolescente',
    hint: 'Brackets, bebidas e hilo dental',
  },
  {
    id: 'adulto',
    label: 'Adulto',
    hint: 'Encías, revisiones y prevención',
  },
];

/**
 * Cada grupo es un arreglo independiente.
 * Para sumar preguntas, agrega objetos con el mismo formato:
 * el reto usa todas las del grupo, suma 100 puntos por acierto
 * y el máximo es 100 × cantidad de preguntas.
 */
export const questionsByAge: Record<AgeGroup, readonly QuizQuestion[]> = {
  nino: [
    {
      id: 'nino-frecuencia',
      prompt: '¿Cuántas veces al día debes cepillarte los dientes?',
      options: [
        'Una vez por semana',
        'Al menos dos veces al día',
        'Solo cuando como dulces',
        'Solo antes de ir al dentista',
      ],
      correctIndex: 1,
      explanation:
        'Cepillarte al menos dos veces al día ayuda a eliminar restos de comida y placa que pueden producir caries.',
    },
    {
      id: 'nino-tiempo',
      prompt: '¿Cuánto tiempo debe durar un buen cepillado?',
      options: [
        '20 segundos',
        '30 segundos',
        'Aproximadamente 2 minutos',
        'Hasta que se termine la pasta',
      ],
      correctIndex: 2,
      explanation: 'Dos minutos permiten limpiar con calma todas las superficies de los dientes.',
    },
    {
      id: 'nino-azucar',
      prompt: '¿Qué alimento debes consumir con menor frecuencia para cuidar tus dientes?',
      options: ['Frutas y verduras', 'Queso', 'Dulces y bebidas azucaradas', 'Agua'],
      correctIndex: 2,
      explanation: 'El azúcar alimenta a las bacterias que producen los ácidos causantes de las caries.',
    },
    {
      id: 'nino-pastilla',
      prompt: '¿Qué hace la pastilla reveladora de placa?',
      options: [
        'Pinta temporalmente la placa que quedó en los dientes',
        'Cambia el color de los dientes para siempre',
        'Sustituye el cepillado',
        'Cura una caries',
      ],
      correctIndex: 0,
      explanation:
        'La pastilla revela con color las zonas que necesitan cepillarse mejor. ¡A los pequeños les encanta descubrirlas!',
    },
    {
      id: 'nino-esmalte',
      prompt: '¿Para qué sirve el flúor?',
      options: [
        'Para cambiar el tamaño de los dientes',
        'Para fortalecer el esmalte y ayudar a prevenir caries',
        'Para sustituir la pasta dental',
        'Para evitar visitar al dentista',
      ],
      correctIndex: 1,
      explanation:
        'El flúor ayuda a fortalecer el esmalte y hace que los dientes estén mejor protegidos contra las caries.',
    },
  ],
  adolescente: [
    {
      id: 'adolescente-brackets',
      prompt: 'Si utilizas brackets, ¿qué debes hacer?',
      options: [
        'Cepillarte con más cuidado alrededor de cada bracket',
        'Dejar de usar hilo dental',
        'Cepillarte solamente por la mañana',
        'Evitar limpiar los brackets',
      ],
      correctIndex: 0,
      explanation:
        'Los brackets pueden retener alimentos y placa, por lo que necesitan una limpieza especialmente cuidadosa.',
    },
    {
      id: 'adolescente-bebidas',
      prompt: '¿Qué bebidas pueden aumentar el riesgo de caries y desgaste dental?',
      options: [
        'Agua natural',
        'Bebidas azucaradas, energéticas y refrescos',
        'Agua sin azúcar',
        'Leche sin azúcar añadida',
      ],
      correctIndex: 1,
      explanation:
        'Muchas bebidas azucaradas o energéticas combinan azúcar y acidez, dos factores que pueden afectar los dientes.',
    },
    {
      id: 'adolescente-encias',
      prompt: '¿Qué debes hacer si tus encías sangran con frecuencia?',
      options: [
        'Ignorarlo',
        'Dejar de cepillarte',
        'Mejorar la higiene y pedir una valoración dental',
        'Comer más dulces',
      ],
      correctIndex: 2,
      explanation:
        'El sangrado frecuente puede ser una señal de inflamación. Una valoración permite encontrar la causa y atenderla.',
    },
    {
      id: 'adolescente-hilo',
      prompt: '¿Por qué es importante usar hilo dental?',
      options: [
        'Porque reemplaza el cepillo',
        'Porque limpia entre los dientes, donde el cepillo no llega bien',
        'Porque blanquea los dientes inmediatamente',
        'Porque evita usar pasta dental',
      ],
      correctIndex: 1,
      explanation: 'El hilo dental ayuda a retirar placa y restos de comida de los espacios entre los dientes.',
    },
    {
      id: 'adolescente-dolor',
      prompt: '¿Qué debes hacer si sientes dolor o sensibilidad dental frecuente?',
      options: [
        'Esperar indefinidamente',
        'Ocultarlo',
        'Consultar al dentista para identificar la causa',
        'Dejar de lavarte los dientes',
      ],
      correctIndex: 2,
      explanation:
        'El dolor y la sensibilidad pueden tener diferentes causas. Una revisión permite encontrar el problema oportunamente.',
    },
  ],
  adulto: [
    {
      id: 'adulto-sangrado',
      prompt: '¿El sangrado frecuente de las encías es normal?',
      options: [
        'Sí, siempre',
        'No; puede indicar inflamación y debe revisarse',
        'Solo después de comer',
        'Es una señal de dientes fuertes',
      ],
      correctIndex: 1,
      explanation: 'Las encías sanas no deberían sangrar regularmente. El sangrado frecuente merece atención profesional.',
    },
    {
      id: 'adulto-interdental',
      prompt: '¿Qué limpieza diaria ayuda a prevenir problemas entre los dientes?',
      options: [
        'Solo enjuagarse con agua',
        'Cepillado y limpieza interdental con hilo o accesorios indicados',
        'Masticar chicle',
        'Cepillarse una vez por semana',
      ],
      correctIndex: 1,
      explanation:
        'El cepillo no siempre alcanza bien los espacios interdentales; por eso es importante complementar la higiene.',
    },
    {
      id: 'adulto-revisiones',
      prompt: '¿Por qué son importantes las revisiones dentales aunque no exista dolor?',
      options: [
        'Porque muchos problemas comienzan sin síntomas evidentes',
        'Porque todos los tratamientos son obligatorios',
        'Porque sustituyen el cepillado',
        'Solamente para cambiar el cepillo',
      ],
      correctIndex: 0,
      explanation:
        'Las revisiones preventivas pueden detectar problemas antes de que produzcan dolor o requieran tratamientos más complejos.',
    },
    {
      id: 'adulto-tabaco',
      prompt: '¿Qué efecto puede tener el tabaco sobre la salud bucal?',
      options: [
        'Fortalece las encías',
        'Puede aumentar el riesgo de enfermedad periodontal y otros problemas',
        'Evita la placa',
        'Sustituye la limpieza profesional',
      ],
      correctIndex: 1,
      explanation:
        'El tabaco afecta las encías, puede ocultar algunas señales de inflamación y aumenta distintos riesgos para la salud bucal.',
    },
    {
      id: 'adulto-bruxismo',
      prompt: 'Si aprietas o rechinas los dientes durante la noche, ¿qué debes hacer?',
      options: [
        'Ignorarlo siempre',
        'Pedir una valoración para revisar desgaste, músculos y articulación',
        'Dejar de cepillarte',
        'Masticar hielo',
      ],
      correctIndex: 1,
      explanation:
        'Apretar o rechinar puede provocar desgaste, dolor muscular o molestias en la articulación. Una valoración ayuda a determinar qué sucede.',
    },
  ],
};

for (const [age, items] of Object.entries(questionsByAge) as [AgeGroup, readonly QuizQuestion[]][]) {
  const ids = new Set<string>();
  if (items.length === 0) {
    throw new Error(`El grupo ${age} no tiene preguntas.`);
  }
  for (const question of items) {
    if (ids.has(question.id)) {
      throw new Error(`Identificador repetido: ${question.id}`);
    }
    ids.add(question.id);
    if (question.options.length !== 4 || question.correctIndex < 0 || question.correctIndex > 3) {
      throw new Error(`La pregunta ${question.id} necesita 4 opciones y una respuesta válida.`);
    }
  }
}
