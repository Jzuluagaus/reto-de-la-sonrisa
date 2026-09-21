import { useEffect, useRef } from 'react';
import { CTA_COPY, WHATSAPP_URL } from '../data/cta.ts';
import { PANDITA_ALT, panditaImage } from '../data/pandita.ts';
import { questionsByAge, type AgeGroup } from '../data/questions.ts';
import { POINTS_PER_CORRECT, resultCopy, tierForScore, type AnswerRecord } from '../data/results.ts';
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

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="screen results" data-screen="results" data-tier={tier} data-age={age}>
      <TopNav onHome={onHome} onChangeAge={onChangeAge} onRestart={onRestart} />
      <div className="results-stack">
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
        <figure className="results-art">
          <img
            src={imageSrc}
            width={724}
            height={724}
            alt={PANDITA_ALT[tier]}
            data-pandita={imageSrc}
          />
        </figure>
        <h1 ref={headingRef} tabIndex={-1} className="result-title" data-result-title>
          {copy.title}
        </h1>
        <p className="result-message" data-result-message>
          {copy.message}
        </p>
        <button type="button" className="primary replay" data-action="replay" onClick={onReplay}>
          {copy.replayLabel}
        </button>
        <aside className="cta" aria-label="Agenda en Smile Alegría">
          <h2>{CTA_COPY.title}</h2>
          <p className="cta-body">{CTA_COPY.body}</p>
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
          <p className="fine">{CTA_COPY.note}</p>
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
