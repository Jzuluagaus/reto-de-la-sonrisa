import { useEffect, useId, useRef, useState } from 'react';
import { promoWhatsappUrl, PROMOS, type DayPart } from '../data/cta.ts';
import { PANDITA_ALT, panditaImage } from '../data/pandita.ts';
import { questionsByAge, type AgeGroup } from '../data/questions.ts';
import {
  dentalTip,
  POINTS_PER_CORRECT,
  resultCopy,
  tierForScore,
  type AnswerRecord,
} from '../data/results.ts';
import { Attribution } from './Attribution.tsx';
import { TopNav } from './TopNav.tsx';

interface ResultsScreenProps {
  age: AgeGroup;
  answers: readonly AnswerRecord[];
  onReplay: () => void;
  onHome: () => void;
  onChangeAge: () => void;
  onRestart: () => void;
}

export function ResultsScreen({
  age,
  answers,
  onReplay,
  onHome,
  onChangeAge,
  onRestart,
}: ResultsScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const questions = questionsByAge[age];
  const total = questions.length;
  const correctCount = questions.filter((question) =>
    answers.some((answer) => answer.questionId === question.id && answer.correct),
  ).length;
  const score = correctCount * POINTS_PER_CORRECT;
  const maxScore = total * POINTS_PER_CORRECT;
  const tier = tierForScore(correctCount);
  const copy = resultCopy(age, tier);
  const imageSrc = panditaImage(age, tier);
  const review = questions.map((question, index) => {
    const answer = answers.find((item) => item.questionId === question.id);
    return {
      question,
      correct: Boolean(answer?.correct),
      index,
    };
  });
  const misses = review.filter((item) => !item.correct);
  const promo = PROMOS[age];
  const scheduleId = useId();
  const [dayPart, setDayPart] = useState<DayPart | null>(null);
  const whatsappHref = promoWhatsappUrl(age, dayPart);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="screen results" data-screen="results" data-tier={tier} data-age={age}>
      <TopNav onHome={onHome} onChangeAge={onChangeAge} onRestart={onRestart} />
      <div className="reward">
        <figure className="results-art">
          <span className="blob blob-peach" aria-hidden="true" />
          <img
            className="cutout"
            src={imageSrc}
            width={724}
            height={724}
            alt={PANDITA_ALT[tier]}
            data-pandita={imageSrc}
          />
        </figure>
        <div className="reward-copy">
          <div className="stats">
            <p>
              Respuestas correctas: <strong data-correct-count>{correctCount} de {total}</strong>
            </p>
            <p>
              Puntaje: <strong data-score>{score} de {maxScore}</strong>
            </p>
          </div>
          <ol className="summary-row" aria-label="Resumen visual">
            {review.map((item) => (
              <li key={item.question.id} data-ok={item.correct ? 'true' : 'false'}>
                <span className="sr-only">
                  Pregunta {item.index + 1} {item.correct ? 'correcta' : 'incorrecta'}.
                </span>
              </li>
            ))}
          </ol>
          <h1 ref={headingRef} tabIndex={-1} className="result-title" data-result-title>
            {copy.title}
          </h1>
          <p className="result-message" data-result-message>
            {copy.message}
          </p>
          <p className="tip">
            <span>Consejo</span>
            {dentalTip(age)}
          </p>
        </div>
      </div>

      <aside className="cta" aria-label="Promoción de Smile Alegría" data-promo={age}>
        <h2 data-promo-title>{promo.title}</h2>
        <p className="cta-price" data-price>
          {promo.offer}
        </p>
        {promo.benefit ? <p className="cta-benefit">{promo.benefit}</p> : null}
        {promo.benefits ? (
          <ul className="cta-benefits">
            {promo.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        ) : null}
        {promo.info ? (
          <ul className="cta-info">
            {promo.info.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
        <fieldset className="dayparts" id={scheduleId}>
          <legend>{promo.scheduleQuestion}</legend>
          <div className="daypart-row">
            <button
              type="button"
              className="daypart"
              data-daypart="AM"
              aria-pressed={dayPart === 'AM'}
              onClick={() => setDayPart('AM')}
            >
              Mañana
            </button>
            <button
              type="button"
              className="daypart"
              data-daypart="PM"
              aria-pressed={dayPart === 'PM'}
              onClick={() => setDayPart('PM')}
            >
              Tarde
            </button>
          </div>
        </fieldset>
        <a
          className="primary whatsapp"
          data-action="whatsapp"
          data-daypart={dayPart ?? 'open'}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {promo.button}
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
        <button type="button" className="replay" data-action="replay" onClick={onReplay}>
          {copy.replayLabel}
        </button>
      </aside>

      {misses.length > 0 && (
        <section className="review" aria-label="Respuestas para repasar">
          <h2>Para seguir aprendiendo</h2>
          <ul className="misses">
            {misses.map((item) => (
              <li key={item.question.id}>
                <p>{item.question.prompt}</p>
                <p className="fix">Respuesta correcta: {item.question.options[item.question.correctIndex]}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Attribution />
    </section>
  );
}
