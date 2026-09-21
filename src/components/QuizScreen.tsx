import { useEffect, useRef } from 'react';
import { AGE_OPTIONS, questionsByAge, type AgeGroup } from '../data/questions.ts';
import { trailingStreak, type AnswerRecord } from '../data/results.ts';
import { Attribution } from './Attribution.tsx';
import { TopNav } from './TopNav.tsx';

const LETTERS = ['A', 'B', 'C', 'D'] as const;

interface QuizScreenProps {
  age: AgeGroup;
  index: number;
  answers: readonly AnswerRecord[];
  selected: number | null;
  locked: boolean;
  onSelect: (optionIndex: number) => void;
  onNext: () => void;
  onHome: () => void;
  onChangeAge: () => void;
  onRestart: () => void;
}

export function QuizScreen({
  age,
  index,
  answers,
  selected,
  locked,
  onSelect,
  onNext,
  onHome,
  onChangeAge,
  onRestart,
}: QuizScreenProps) {
  const questions = questionsByAge[age];
  const question = questions[index];
  const total = questions.length;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const ageLabel = AGE_OPTIONS.find((option) => option.id === age)?.label ?? '';
  const streak = trailingStreak(answers);
  const isCorrect = locked && selected === question?.correctIndex;

  useEffect(() => {
    headingRef.current?.focus();
  }, [question?.id]);

  useEffect(() => {
    if (locked) {
      feedbackRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [locked, question?.id]);

  if (!question) return null;

  return (
    <section className="screen quiz" data-screen="quiz" data-age={age}>
      <TopNav onHome={onHome} onChangeAge={onChangeAge} onRestart={onRestart} />
      <article className="quiz-card" key={question.id}>
        <div className="quiz-head">
          <div className="quiz-progress">
            <p className="level">{ageLabel}</p>
            <p className="progress-label">Pregunta {index + 1} de {total}</p>
            <div className="dots" aria-hidden="true">
              {questions.map((item, dotIndex) => {
                const answer = answers.find((entry) => entry.questionId === item.id);
                const state = answer ? (answer.correct ? 'ok' : 'miss') : dotIndex === index ? 'current' : 'upcoming';
                return <span key={item.id} className="dot" data-state={state} />;
              })}
            </div>
          </div>
          {streak >= 2 && <p className="streak">Racha de {streak}</p>}
        </div>

        <h1 ref={headingRef} tabIndex={-1} className="prompt" data-question={question.id}>
          {question.prompt}
        </h1>

        <div className="options" role="group" aria-label="Opciones de respuesta">
          {question.options.map((option, optionIndex) => {
            const state = optionState(optionIndex, question.correctIndex, selected, locked);
            const letter = LETTERS[optionIndex];
            const status =
              state === 'correct' ? ' Correcta.' : state === 'wrong' ? ' Tu respuesta.' : '';
            return (
              <button
                key={option}
                type="button"
                className="option"
                data-option={optionIndex}
                data-state={state}
                disabled={locked}
                aria-pressed={selected === optionIndex}
                aria-label={`${letter}. ${option}.${status}`}
                onClick={() => onSelect(optionIndex)}
              >
                <span className="letter" aria-hidden="true">
                  {letter}
                </span>
                <span className="option-label">{option}</span>
                {state === 'correct' && (
                  <span className="mark" aria-hidden="true">
                    ✓
                  </span>
                )}
                {state === 'wrong' && (
                  <span className="mark" aria-hidden="true">
                    ✗
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {locked && (
          <div ref={feedbackRef} className="feedback" role="status" data-ok={isCorrect ? 'true' : 'false'}>
            <h2>{isCorrect ? '¡Muy bien!' : 'Así se cuida mejor la sonrisa'}</h2>
            <p>{question.explanation}</p>
            <button type="button" className="primary" data-action="next" onClick={onNext}>
              {index + 1 >= total ? 'Ver resultado' : 'Siguiente pregunta'}
            </button>
          </div>
        )}
      </article>
      <Attribution />
    </section>
  );
}

function optionState(
  optionIndex: number,
  correctIndex: number,
  selected: number | null,
  locked: boolean,
): 'open' | 'correct' | 'wrong' | 'idle' {
  if (!locked || selected === null) return 'open';
  if (optionIndex === correctIndex) return 'correct';
  if (optionIndex === selected) return 'wrong';
  return 'idle';
}
