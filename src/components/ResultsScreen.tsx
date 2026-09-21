import { useEffect, useRef } from 'react';
import { CTA_COPY, WHATSAPP_URL } from '../data/cta.ts';
import { PANDITA_IMAGES } from '../data/pandita.ts';
import { questionsByAge, type AgeGroup } from '../data/questions.ts';
import {
  bestStreak,
  EXPERT_BADGE,
  POINTS_PER_CORRECT,
  RESULT_TIERS,
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
  const tier = tierForScore(correctCount, total);
  const copy = RESULT_TIERS[tier];
  const streak = bestStreak(answers);
  const showSparkles = age !== 'adulto' && (tier === 'celebrating' || tier === 'expert');
  const review = questions.map((question, index) => {
    const answer = answers.find((item) => item.questionId === question.id);
    return {
      question,
      correct: Boolean(answer?.correct),
      index,
    };
  });
  const misses = review.filter((item) => !item.correct);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="screen results" data-screen="results" data-tier={tier} data-age={age}>
      <TopNav onHome={onHome} onChangeAge={onChangeAge} onRestart={onRestart} />
      <div className="results-grid">
        <div className={showSparkles ? 'results-hero spark' : 'results-hero'}>
          <div className="results-identity">
            <figure className="photo-frame results-photo" data-tier={tier}>
              <img src={PANDITA_IMAGES[tier]} width={900} height={900} alt="Dr. Pandita" />
            </figure>
            {tier === 'expert' && <p className="badge">{EXPERT_BADGE}</p>}
          </div>
          <div className="results-copy">
            <p className="speaker">Dr. Pandita</p>
            <h1 ref={headingRef} tabIndex={-1} className="message" data-result-message>
              {copy.message}
            </h1>
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
                  <span aria-hidden="true">{item.correct ? '✓' : '✗'}</span>
                  <span className="sr-only">
                    Pregunta {item.index + 1} {item.correct ? 'correcta' : 'incorrecta'}.
                  </span>
                </li>
              ))}
            </ol>
            {streak >= 2 && <p className="streak best-streak">Mejor racha: {streak}</p>}
          </div>
          <button type="button" className="primary replay" data-action="replay" onClick={onReplay}>
            {copy.replayLabel}
          </button>
        </div>

        <aside className="cta" aria-label="Agenda en Smile Alegría">
          <h2>{CTA_COPY.title}</h2>
          <p className="cta-intro">{CTA_COPY.intro}</p>
          <ul className="perk-list">
            {CTA_COPY.perks.map((perk) => (
              <li key={perk}>
                <span className="perk-check" aria-hidden="true">
                  ✓
                </span>
                {perk}
              </li>
            ))}
          </ul>
          <p className="fine">{CTA_COPY.note}</p>
          <a
            className="primary whatsapp"
            data-action="whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CTA_COPY.button}
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
          <p className="cta-footer">{CTA_COPY.footer}</p>
        </aside>
      </div>

      {misses.length > 0 && (
        <section className="review" aria-label="Respuestas para repasar">
          <h2>Resumen</h2>
          <ul className="misses">
            {misses.map((item) => (
              <li key={item.question.id} className="miss">
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
