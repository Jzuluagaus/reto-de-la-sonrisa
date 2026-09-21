import { type AgeGroup } from '../data/questions.ts';
import { Attribution } from './Attribution.tsx';
import { BrandLockup } from './BrandLockup.tsx';

interface HomeScreenProps {
  onChoose: (age: AgeGroup) => void;
}

const AGE_CARDS: readonly {
  id: AgeGroup;
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}[] = [
  {
    id: 'nino',
    eyebrow: 'Niño(a)',
    title: 'Pequeños exploradores de sonrisas',
    text: 'Cepillado, dulces y flúor',
    image: '/images/dr-pandita/nino-excelente.png',
  },
  {
    id: 'adolescente',
    eyebrow: 'Adolescente',
    title: 'Sonríe con toda la actitud',
    text: 'Brackets, bebidas y cuidado diario',
    image: '/images/dr-pandita/adolescente-vas-bien.png',
  },
  {
    id: 'adulto',
    eyebrow: 'Adulto',
    title: 'Una sonrisa sana en cada etapa',
    text: 'Encías, prevención y revisiones',
    image: '/images/dr-pandita/adulto-excelente.png',
  },
];

export function HomeScreen({ onChoose }: HomeScreenProps) {
  return (
    <section className="screen home" data-screen="home">
      <BrandLockup />
      <div className="hero">
        <div className="hero-copy">
          <p className="kicker">Smile Alegría Dental Studio</p>
          <h1>Reto de la Sonrisa</h1>
          <p className="lead">Pon a prueba tus conocimientos y descubre cómo cuidar mejor tu sonrisa.</p>
          <p className="badge">5 preguntas · Resultado inmediato · Para toda la familia</p>
        </div>
        <div className="hero-stage">
          <span className="blob blob-peach" aria-hidden="true" />
          <span className="blob blob-mint" aria-hidden="true" />
          <span className="blob blob-lilac" aria-hidden="true" />
          <Sparkle className="spark spark-a" />
          <Sparkle className="spark spark-b" />
          <ToothMark className="tooth-mark" />
          <img
            className="cutout hero-pandita"
            src="/images/dr-pandita/nino-excelente.png"
            width={724}
            height={724}
            alt="El Dr. Pandita te da la bienvenida al Reto de la Sonrisa"
          />
        </div>
      </div>

      <h2 className="section-title">¿Quién acepta el reto?</h2>
      <div className="age-grid">
        {AGE_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            className="age-card"
            data-age={card.id}
            onClick={() => onChoose(card.id)}
          >
            <img src={card.image} alt="" width={724} height={724} className="cutout" />
            <span className="age-copy">
              <span className="age-kicker">{card.eyebrow}</span>
              <span className="age-title">{card.title}</span>
              <span className="age-text">{card.text}</span>
              <span className="age-cta">Comenzar reto</span>
            </span>
          </button>
        ))}
      </div>

      <aside className="learn-strip">
        <img
          src="/images/dr-pandita/nino-vas-bien.png"
          alt=""
          width={724}
          height={724}
          className="cutout"
        />
        <div>
          <p className="strip-title">Aprender hoy puede transformar la sonrisa de mañana.</p>
          <p>Completa el reto y descubre una promoción especial para tu edad.</p>
        </div>
      </aside>
      <Attribution />
    </section>
  );
}

function Sparkle({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 1.5l1.7 6.3L20 9.5l-6.3 1.7L12 17.5l-1.7-6.3L4 9.5l6.3-1.7L12 1.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function ToothMark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M16 8c-6 2-8 8-8 14 0 6 2 10 4 14 1.4 2.6 2 5 2 7h5c0-3 .4-5 1.6-8C22 31 23 29 24 29s2 2 3.4 6c1.2 3 1.6 5 1.6 8h5c0-2 .6-4.4 2-7 2-4 4-8 4-14 0-6-2-12-8-14-3-1-5 1-8 1s-5-2-8-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
