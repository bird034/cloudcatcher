import { useState, useEffect, useRef, useCallback } from 'react';

interface Phase {
  label: string;
  duration: number;
}

interface Technique {
  name: string;
  description: string;
  phases: Phase[];
  tip: string;
  science: string;
  emoji: string;
}

const techniques: Technique[] = [
  {
    name: 'Box Breathing',
    description: 'Used by Navy SEALs for stress management',
    emoji: '🟦',
    phases: [
      { label: 'Breathe in', duration: 4 },
      { label: 'Hold', duration: 4 },
      { label: 'Breathe out', duration: 4 },
      { label: 'Hold', duration: 4 },
    ],
    tip: 'Great for acute stress and anxiety. The equal timing of all four phases creates a sense of control and balance.',
    science: 'Box breathing activates the parasympathetic nervous system, reducing cortisol levels and calming the fight-or-flight response. The structured pattern gives your mind something to focus on.',
  },
  {
    name: '4-7-8 Breathing',
    description: 'Developed by Dr. Andrew Weil for deep relaxation',
    emoji: '🌙',
    phases: [
      { label: 'Breathe in', duration: 4 },
      { label: 'Hold', duration: 7 },
      { label: 'Breathe out', duration: 8 },
    ],
    tip: 'Best for falling asleep, managing anger, or calming down before a big event. The long hold and exhale are key.',
    science: 'The extended exhale activates the vagus nerve, signaling your body to relax. The long hold increases oxygen absorption, and the slow release triggers your natural calming response.',
  },
  {
    name: 'Calm Breath',
    description: 'Simple and gentle — perfect for beginners',
    emoji: '🌿',
    phases: [
      { label: 'Breathe in', duration: 5 },
      { label: 'Breathe out', duration: 7 },
    ],
    tip: 'Use this anytime, anywhere — it\'s subtle enough to do in class or on the bus. The longer exhale naturally calms you down.',
    science: 'When your exhale is longer than your inhale, it activates the parasympathetic nervous system — your body\'s built-in calm-down switch. No fancy technique needed, just longer exhales.',
  },
];

export default function Breathe() {
  const [selectedTechnique, setSelectedTechnique] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [bubbleScale, setBubbleScale] = useState(1);
  const [transitionDuration, setTransitionDuration] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const technique = techniques[selectedTechnique];

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const updateBubble = useCallback(
    (phaseIndex: number) => {
      const phase = technique.phases[phaseIndex];
      if (phase.label === 'Breathe in') {
        setTransitionDuration(phase.duration);
        setBubbleScale(1.6);
      } else if (phase.label === 'Breathe out') {
        setTransitionDuration(phase.duration);
        setBubbleScale(1);
      } else {
        setTransitionDuration(0.3);
      }
    },
    [technique]
  );

  const startExercise = useCallback(() => {
    setIsRunning(true);
    setCurrentPhaseIndex(0);
    setCycles(0);
    const firstPhase = technique.phases[0];
    setCountdown(firstPhase.duration);
    updateBubble(0);

    clearTimer();
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCurrentPhaseIndex((prevPhase) => {
            const nextPhase = prevPhase + 1;
            if (nextPhase >= technique.phases.length) {
              setCycles((c) => c + 1);
              const newPhase = 0;
              setCountdown(technique.phases[newPhase].duration);
              updateBubble(newPhase);
              return newPhase;
            } else {
              setCountdown(technique.phases[nextPhase].duration);
              updateBubble(nextPhase);
              return nextPhase;
            }
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [technique, clearTimer, updateBubble]);

  const stopExercise = useCallback(() => {
    setIsRunning(false);
    clearTimer();
    setCurrentPhaseIndex(0);
    setCountdown(0);
    setBubbleScale(1);
    setTransitionDuration(0.5);
  }, [clearTimer]);

  const switchTechnique = (index: number) => {
    if (isRunning) stopExercise();
    setSelectedTechnique(index);
    setCycles(0);
  };

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const currentPhase = technique.phases[currentPhaseIndex];
  const phaseColor =
    currentPhase?.label === 'Breathe in'
      ? 'text-emerald-600'
      : currentPhase?.label === 'Breathe out'
        ? 'text-blue-600'
        : 'text-amber-600';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Breathe
        </h1>
        <p className="text-gray-500 text-lg">
          Follow the bubble. Let your body relax.
        </p>
      </div>

      {/* Technique Selector */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {techniques.map((t, i) => (
          <button
            key={t.name}
            onClick={() => switchTechnique(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTechnique === i
                ? 'bg-violet-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            {t.emoji} {t.name}
          </button>
        ))}
      </div>

      {/* Breathing Bubble */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative flex items-center justify-center mb-8" style={{ width: 240, height: 240 }}>
          {/* Pulse rings */}
          {isRunning && (
            <>
              <div
                className="absolute rounded-full border-2 border-violet-300 animate-pulse-ring"
                style={{
                  width: 200,
                  height: 200,
                  top: 20,
                  left: 20,
                }}
              />
              <div
                className="absolute rounded-full border-2 border-purple-200 animate-pulse-ring-delayed"
                style={{
                  width: 200,
                  height: 200,
                  top: 20,
                  left: 20,
                }}
              />
            </>
          )}

          {/* Main bubble */}
          <div
            className={`rounded-full flex items-center justify-center ${
              isRunning
                ? 'bg-gradient-to-br from-violet-400 via-purple-400 to-indigo-500 shadow-2xl'
                : 'bg-gradient-to-br from-violet-300 via-purple-300 to-indigo-400 shadow-lg animate-float'
            }`}
            style={{
              width: 180,
              height: 180,
              transform: `scale(${bubbleScale})`,
              transition: `transform ${transitionDuration}s ease-in-out`,
            }}
          >
            <span className="text-white text-5xl font-bold">
              {isRunning ? countdown : '🫧'}
            </span>
          </div>
        </div>

        {/* Phase label */}
        <div className="h-8 mb-4">
          {isRunning && (
            <p className={`text-xl font-semibold ${phaseColor} animate-fade-in`}>
              {currentPhase?.label}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={isRunning ? stopExercise : startExercise}
            className={`px-8 py-3 rounded-full text-lg font-semibold transition shadow-lg hover:shadow-xl ${
              isRunning
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-violet-600 text-white hover:bg-violet-700'
            }`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>

        {/* Cycle counter */}
        {(isRunning || cycles > 0) && (
          <p className="text-gray-400 text-sm mt-4">
            Cycles completed: <span className="font-bold text-violet-600">{cycles}</span>
          </p>
        )}
      </div>

      {/* Technique description */}
      <div className="text-center mb-10">
        <h3 className="font-bold text-gray-700 text-lg mb-1">{technique.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{technique.description}</p>
        <div className="flex justify-center gap-2 flex-wrap">
          {technique.phases.map((phase, i) => (
            <span
              key={i}
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                isRunning && currentPhaseIndex === i
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {phase.label}: {phase.duration}s
            </span>
          ))}
        </div>
      </div>

      {/* Tip Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {techniques.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-2xl border-2 border-gray-100 p-5 hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">{t.emoji}</div>
            <h4 className="font-bold text-gray-800 mb-2">{t.name}</h4>
            <p className="text-gray-600 text-sm mb-3">{t.tip}</p>
            <div className="bg-violet-50 rounded-xl p-3">
              <p className="text-violet-800 text-xs leading-relaxed">
                🔬 <span className="font-semibold">The science:</span> {t.science}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
