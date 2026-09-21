import { useEffect, useRef, useState } from 'react';
import { HomeScreen } from './components/HomeScreen.tsx';
import { QuizScreen } from './components/QuizScreen.tsx';
import { ResultsScreen } from './components/ResultsScreen.tsx';
import { questionsByAge, type AgeGroup } from './data/questions.ts';
import type { AnswerRecord } from './data/results.ts';

type Phase =
  | { name: 'home' }
  | {
      name: 'quiz';
      age: AgeGroup;
      index: number;
      answers: AnswerRecord[];
      selected: number | null;
      locked: boolean;
    }
  | { name: 'results'; age: AgeGroup; answers: AnswerRecord[] };

export default function App() {
  const [phase, setPhase] = useState<Phase>({ name: 'home' });
  const lockRef = useRef(false);
  const ageAttr = phase.name === 'home' ? 'studio' : phase.age;
  const screenKey =
    phase.name === 'quiz' ? `quiz-${phase.age}-${phase.index}` : phase.name === 'results' ? `results-${phase.age}` : 'home';

  useEffect(() => {
    document.documentElement.dataset.age = ageAttr;
  }, [ageAttr]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screenKey]);

  function start(age: AgeGroup) {
    lockRef.current = false;
    setPhase({ name: 'quiz', age, index: 0, answers: [], selected: null, locked: false });
  }

  function goHome() {
    lockRef.current = false;
    setPhase({ name: 'home' });
  }

  function restart() {
    if (phase.name === 'home') return;
    lockRef.current = false;
    setPhase({ name: 'quiz', age: phase.age, index: 0, answers: [], selected: null, locked: false });
  }

  function selectOption(optionIndex: number) {
    if (lockRef.current || phase.name !== 'quiz' || phase.locked) return;
    const question = questionsByAge[phase.age][phase.index];
    if (!question) return;
    if (phase.answers.some((answer) => answer.questionId === question.id)) return;
    lockRef.current = true;
    setPhase({
      ...phase,
      locked: true,
      selected: optionIndex,
      answers: [
        ...phase.answers,
        {
          questionId: question.id,
          selectedIndex: optionIndex,
          correct: optionIndex === question.correctIndex,
        },
      ],
    });
  }

  function nextQuestion() {
    if (phase.name !== 'quiz' || !phase.locked) return;
    const total = questionsByAge[phase.age].length;
    lockRef.current = false;
    if (phase.index + 1 >= total) {
      setPhase({ name: 'results', age: phase.age, answers: phase.answers });
      return;
    }
    setPhase({
      ...phase,
      index: phase.index + 1,
      selected: null,
      locked: false,
    });
  }

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <main id="contenido" className="shell">
        {phase.name === 'home' && <HomeScreen onChoose={start} />}
        {phase.name === 'quiz' && (
          <QuizScreen
            age={phase.age}
            index={phase.index}
            answers={phase.answers}
            selected={phase.selected}
            locked={phase.locked}
            onSelect={selectOption}
            onNext={nextQuestion}
            onHome={goHome}
            onChangeAge={goHome}
            onRestart={restart}
          />
        )}
        {phase.name === 'results' && (
          <ResultsScreen
            age={phase.age}
            answers={phase.answers}
            onReplay={restart}
            onHome={goHome}
            onChangeAge={goHome}
            onRestart={restart}
          />
        )}
      </main>
    </>
  );
}
