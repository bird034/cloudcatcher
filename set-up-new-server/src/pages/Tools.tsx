import { useState } from 'react';

/* ─── GROUNDING EXERCISE ─── */
const groundingSteps = [
  { count: 5, sense: 'SEE', emoji: '👀', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', prompt: 'Name 5 things you can SEE right now' },
  { count: 4, sense: 'TOUCH', emoji: '✋', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', prompt: 'Name 4 things you can TOUCH' },
  { count: 3, sense: 'HEAR', emoji: '👂', color: 'from-yellow-500 to-amber-500', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', prompt: 'Name 3 things you can HEAR' },
  { count: 2, sense: 'SMELL', emoji: '👃', color: 'from-orange-500 to-red-400', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', prompt: 'Name 2 things you can SMELL' },
  { count: 1, sense: 'TASTE', emoji: '👅', color: 'from-red-500 to-pink-500', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', prompt: 'Name 1 thing you can TASTE' },
];

function GroundingExercise() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = not started, 0-4 = steps, 5 = done
  const [inputs, setInputs] = useState<string[]>(Array(5).fill(''));

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setInputs(Array(5).fill(''));
    } else {
      setCurrentStep(5);
    }
  };

  const handleRestart = () => {
    setCurrentStep(-1);
    setInputs(Array(5).fill(''));
  };

  // Not started
  if (currentStep === -1) {
    return (
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          This technique brings you back to the present moment by engaging all 5
          senses. It's great for anxiety and panic.
        </p>
        <button
          onClick={() => setCurrentStep(0)}
          className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 py-2.5 font-semibold transition shadow-lg"
        >
          Start Exercise
        </button>
      </div>
    );
  }

  // Completed
  if (currentStep === 5) {
    return (
      <div className="text-center animate-scale-in">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">You did it!</h3>
        <p className="text-gray-600 mb-4">
          You're back in the present moment. Notice how your body feels a little
          calmer? That's your nervous system settling down.
        </p>
        <button
          onClick={handleRestart}
          className="text-violet-600 hover:text-violet-800 font-medium transition"
        >
          Do it again
        </button>
      </div>
    );
  }

  // Active step
  const step = groundingSteps[currentStep];
  return (
    <div className="animate-fade-in">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-5">
        {groundingSteps.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all ${
              i <= currentStep
                ? `bg-gradient-to-r ${groundingSteps[i].color}`
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className={`${step.bg} border ${step.border} rounded-2xl p-5 mb-4`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{step.emoji}</span>
          <div>
            <p className={`font-bold ${step.text} text-lg`}>{step.prompt}</p>
            <p className="text-gray-500 text-xs">
              Step {currentStep + 1} of 5
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {Array.from({ length: step.count }).map((_, i) => (
            <input
              key={i}
              type="text"
              placeholder={`${i + 1}.`}
              value={inputs[i]}
              onChange={(e) => {
                const newInputs = [...inputs];
                newInputs[i] = e.target.value;
                setInputs(newInputs);
              }}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 bg-white"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrentStep(Math.max(0, currentStep - 1));
            setInputs(Array(5).fill(''));
          }}
          className="text-gray-400 hover:text-gray-600 text-sm transition"
          disabled={currentStep === 0}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 py-2 text-sm font-semibold transition shadow"
        >
          {currentStep === 4 ? 'Finish ✓' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

/* ─── MOTIVATION BOOST ─── */
const affirmations = [
  "You have gotten through every hard day so far. That's a 100% success rate. 💪",
  "You are not behind. You are on your own path. 🌱",
  "It's okay to not be okay. It's not okay to give up on yourself. 💜",
  "Your feelings are valid. Every single one of them. ✨",
  "You don't have to have it all figured out to move forward. 🌊",
  "Rest is not lazy. Rest is necessary. 🛋️",
  "You are more than your grades, your looks, or your social media. 🌟",
  "The fact that you're trying is enough. 🌈",
  "You deserve the same kindness you give to everyone else. 💛",
  "This moment is temporary. Better ones are coming. 🌅",
  "You are worthy of love and belonging, exactly as you are. 🤗",
  "Small steps still move you forward. Every step counts. 👣",
];

function MotivationBoost() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewAffirmation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * affirmations.length);
      } while (newIndex === currentIndex && affirmations.length > 1);
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="text-center">
      {currentIndex !== null ? (
        <div
          className={`bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-6 mb-4 min-h-[100px] flex items-center justify-center transition-opacity duration-200 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <p className="text-violet-900 text-lg font-medium leading-relaxed">
            {affirmations[currentIndex]}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 mb-4">
          Need a little pick-me-up? Press the button for a warm reminder.
        </p>
      )}

      <button
        onClick={getNewAffirmation}
        className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-full px-6 py-2.5 font-semibold transition shadow-lg hover:shadow-xl"
      >
        {currentIndex !== null ? '✨ Another one' : '✨ Boost me'}
      </button>
    </div>
  );
}

/* ─── MOOD CHECK-IN ─── */
interface MoodEntry {
  mood: string;
  emoji: string;
  note?: string;
  time: string;
}

const moodOptions = [
  { label: 'Great', emoji: '😊', color: 'bg-green-50 border-green-300 hover:bg-green-100' },
  { label: 'Okay', emoji: '🙂', color: 'bg-blue-50 border-blue-300 hover:bg-blue-100' },
  { label: 'Meh', emoji: '😐', color: 'bg-yellow-50 border-yellow-300 hover:bg-yellow-100' },
  { label: 'Low', emoji: '😔', color: 'bg-orange-50 border-orange-300 hover:bg-orange-100' },
  { label: 'Struggling', emoji: '😟', color: 'bg-red-50 border-red-300 hover:bg-red-100' },
  { label: 'Other', emoji: '❓', color: 'bg-purple-50 border-purple-300 hover:bg-purple-100' },
];

const emojiOptions = ['😊', '🙂', '😐', '😔', '😟', '😢', '😡', '😰', '😴', '🤔', '💪', '🥺', '😶', '🌈', '💜'];

function MoodCheckIn() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💜');

  const logMood = (mood: string, emoji: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEntries((prev) => [{ mood, emoji, time }, ...prev]);
  };

  const handleMoodClick = (mood: string, emoji: string) => {
    if (mood === 'Other') {
      setShowOtherInput(true);
    } else {
      logMood(mood, emoji);
    }
  };

  const submitOther = () => {
    if (otherText.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setEntries((prev) => [
        { mood: otherText.trim(), emoji: selectedEmoji, note: otherText.trim(), time },
        ...prev,
      ]);
      setOtherText('');
      setShowOtherInput(false);
    }
  };

  return (
    <div>
      <p className="text-gray-600 text-sm mb-4 text-center">
        Quick check — how are you doing right now?
      </p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {moodOptions.map((opt) => (
          <button
            key={opt.label}
            onClick={() => handleMoodClick(opt.label, opt.emoji)}
            className={`border-2 ${opt.color} rounded-xl p-3 text-center transition-all hover:shadow-md cursor-pointer`}
          >
            <div className="text-2xl mb-0.5">{opt.emoji}</div>
            <div className="text-xs font-medium text-gray-700">{opt.label}</div>
          </button>
        ))}
      </div>

      {/* Other input */}
      {showOtherInput && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-4 animate-fade-in">
          <p className="text-sm font-medium text-purple-800 mb-2">
            How would you describe how you feel?
          </p>
          <input
            type="text"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="In your own words..."
            className="w-full px-3 py-2 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 mb-3 bg-white"
            onKeyDown={(e) => e.key === 'Enter' && submitOther()}
          />
          <p className="text-xs text-purple-600 mb-2">Pick an emoji:</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {emojiOptions.map((em) => (
              <button
                key={em}
                onClick={() => setSelectedEmoji(em)}
                className={`text-xl p-1 rounded-lg transition ${
                  selectedEmoji === em
                    ? 'bg-violet-200 scale-110'
                    : 'hover:bg-violet-100'
                }`}
              >
                {em}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={submitOther}
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-4 py-1.5 text-sm font-semibold transition"
            >
              Log it
            </button>
            <button
              onClick={() => setShowOtherInput(false)}
              className="text-gray-400 hover:text-gray-600 text-sm transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mood log */}
      {entries.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
            Today's check-ins
          </h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {entries.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-100 text-sm animate-fade-in"
              >
                <span className="text-lg">{entry.emoji}</span>
                <span className="font-medium text-gray-700 flex-1">
                  {entry.mood}
                </span>
                <span className="text-gray-400 text-xs">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN TOOLS PAGE ─── */
export default function Tools() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Tools
        </h1>
        <p className="text-gray-500 text-lg">
          Quick mental health tools for when you need something right now.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Grounding Exercise */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              🌍 5-4-3-2-1 Grounding
            </h2>
            <p className="text-blue-100 text-xs">
              Come back to the present moment
            </p>
          </div>
          <div className="p-5">
            <GroundingExercise />
          </div>
        </div>

        {/* Motivation Boost */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-delay-1">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              💪 Motivation Boost
            </h2>
            <p className="text-violet-100 text-xs">
              A warm reminder when you need one
            </p>
          </div>
          <div className="p-5">
            <MotivationBoost />
          </div>
        </div>

        {/* Mood Check-In */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-delay-2">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              🎭 Mood Check-In
            </h2>
            <p className="text-pink-100 text-xs">
              Track how you're feeling today
            </p>
          </div>
          <div className="p-5">
            <MoodCheckIn />
          </div>
        </div>
      </div>
    </div>
  );
}
