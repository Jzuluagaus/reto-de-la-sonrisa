import { AGE_OPTIONS, type AgeGroup } from '../data/questions.ts';
import { Attribution } from './Attribution.tsx';

interface HomeScreenProps {
  onChoose: (age: AgeGroup) => void;
}

export function HomeScreen({ onChoose }: HomeScreenProps) {
  return (
    <section className="screen home" data-screen="home">
      <div className="home-copy">
          <p className="kicker">Smile Alegría Dental Studio</p>
          <h1>Reto de la Sonrisa</h1>
          <p className="lead">Elige tu edad y descubre cuánto sabes sobre el cuidado de tu sonrisa.</p>
          <div className="age-list">
            {AGE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className="age-btn"
                data-age={option.id}
                onClick={() => onChoose(option.id)}
              >
                <span>
                  <span className="age-label">{option.label}</span>
                  <span className="age-hint">{option.hint}</span>
                </span>
                <span className="age-go" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
      </div>
      <Attribution />
    </section>
  );
}
