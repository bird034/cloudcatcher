import { useState } from 'react';

interface EmotionType {
  id: string;
  label: string;
  emoji: string;
  crisis?: boolean;
  reset: string;
  activity: string;
  longTerm: string;
  resources: { name: string; url: string }[];
}

interface CauseType {
  id: string;
  label: string;
  emoji: string;
  message: string;
}

const emotions: EmotionType[] = [
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😢',
    reset: 'Close your eyes. Take 5 slow, deep breaths. With each exhale, imagine the sadness softening just a little — like a cloud slowly drifting away.',
    activity: 'Write down 3 things that made you smile this week — even tiny ones like a good song or a funny text. Then put on one of those songs and listen to the whole thing.',
    longTerm: "If sadness sticks around for more than two weeks, or you're losing interest in things you used to enjoy, talk to a school counselor or trusted adult. You deserve support.",
    resources: [
      { name: 'Teen Line', url: 'https://teenline.org' },
      { name: 'NAMI for Teens', url: 'https://www.nami.org/Your-Journey/Teens-Young-Adults' },
    ],
  },
  {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😰',
    reset: 'Try the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This brings you back to the present moment.',
    activity: 'Grab a piece of paper and do a "brain dump" — write every anxious thought without judging it. Then crumple up the paper and throw it away. Your thoughts are not facts.',
    longTerm: "If anxiety is making it hard to go to school, sleep, or hang out with friends, consider talking to someone. Anxiety is super treatable and you don't have to white-knuckle through it.",
    resources: [
      { name: 'Anxiety & Depression Association', url: 'https://adaa.org' },
      { name: 'Mindfulness for Teens', url: 'https://mindfulnessforteens.com' },
    ],
  },
  {
    id: 'angry',
    label: 'Angry',
    emoji: '😡',
    reset: 'Hold an ice cube in your hand or splash cold water on your face. The cold sensation interrupts the anger cycle and activates your body\'s dive reflex, instantly calming you down.',
    activity: 'Do something physical: 20 push-ups, a brisk walk, or punch a pillow. Then sit down and write one sentence about what made you angry and what you actually need right now.',
    longTerm: "Anger is a valid emotion — it usually means a boundary has been crossed. If you find yourself angry a lot, learning to identify the emotion underneath (hurt, fear, frustration) can help. A counselor can teach you healthy ways to express it.",
    resources: [
      { name: 'Teen Line', url: 'https://teenline.org' },
      { name: 'ReachOut', url: 'https://au.reachout.com' },
    ],
  },
  {
    id: 'stressed',
    label: 'Stressed',
    emoji: '😫',
    reset: 'Progressive muscle relaxation: Starting from your toes, tense each muscle group for 5 seconds, then release. Work up to your shoulders and face. Feel the tension melt away.',
    activity: 'Write down everything on your plate right now. Circle the ONE most important thing. Do just the next tiny step for that one thing. Everything else can wait.',
    longTerm: "Chronic stress takes a real toll on your body and mind. Talk to a parent or counselor about your load — you might need to drop something, and that's okay. You're not a machine.",
    resources: [
      { name: 'Mindfulness for Teens', url: 'https://mindfulnessforteens.com' },
      { name: 'JED Foundation', url: 'https://jedfoundation.org' },
    ],
  },
  {
    id: 'lonely',
    label: 'Lonely',
    emoji: '🥺',
    reset: 'Text or message one person right now — even just "hey, how\'s it going?" Sometimes loneliness lies to us and says nobody cares. This is a way to test that lie.',
    activity: 'Go somewhere with other people — a library, a park, a coffee shop. You don\'t have to talk to anyone. Just being around humans can help. Or find an online community for something you love.',
    longTerm: "Loneliness is more common than you think, especially among teens. Consider joining a club, volunteering, or trying a group activity. Building connections takes time, but you're worth the effort.",
    resources: [
      { name: '7 Cups (free online chat)', url: 'https://7cups.com' },
      { name: 'Teen Line', url: 'https://teenline.org' },
    ],
  },
  {
    id: 'burnt-out',
    label: 'Burnt Out',
    emoji: '🔥',
    reset: 'Lie flat on the ground or your bed. Close your eyes. Do absolutely nothing for 60 seconds. Not on your phone. Just... nothing. Let your body remember what rest feels like.',
    activity: 'Cancel or postpone one thing today — guilt-free. Then do something that has zero productivity value: watch a funny video, pet an animal, eat a snack slowly. Burnout means you need fuel, not more work.',
    longTerm: "Burnout is your body screaming for a break. Look at your commitments and be honest: are you doing too much? It's okay to quit something. Talk to a trusted adult about how to lighten your load.",
    resources: [
      { name: 'NAMI for Teens', url: 'https://www.nami.org/Your-Journey/Teens-Young-Adults' },
      { name: 'JED Foundation', url: 'https://jedfoundation.org' },
    ],
  },
  {
    id: 'numb',
    label: 'Numb',
    emoji: '😶',
    reset: 'Engage your senses: Hold ice, splash cold water on your face, smell something strong like peppermint, or eat something sour. Physical sensation can help you reconnect with your body.',
    activity: 'Put on a song that used to make you feel something — anything. Or grab a pen and just scribble. Draw lines, shapes, whatever. Sometimes creativity can unlock feelings that words can\'t.',
    longTerm: "Numbness is often your brain's way of protecting you from overwhelming emotions. It can also be a sign of depression. If you've been feeling nothing for a while, please talk to a counselor. You deserve to feel again.",
    resources: [
      { name: 'NAMI for Teens', url: 'https://www.nami.org/Your-Journey/Teens-Young-Adults' },
      { name: 'Psychology Today (Find a Therapist)', url: 'https://www.psychologytoday.com/us/therapists' },
    ],
  },
  {
    id: 'ashamed',
    label: 'Ashamed',
    emoji: '😞',
    reset: 'Say this out loud (or in your head): "I am human, and humans make mistakes. This feeling is temporary. I am not defined by my worst moments." Take 3 deep breaths.',
    activity: 'Write a letter of forgiveness — to yourself. Describe what happened without judgment, acknowledge the shame, and then write what you\'d say to a friend in the same situation. You deserve that same kindness.',
    longTerm: "Shame is different from guilt: guilt says 'I did something bad,' shame says 'I am bad.' You are not bad. If shame is eating at you, talking to someone you trust can take away its power. Shame thrives in secrecy.",
    resources: [
      { name: 'ReachOut', url: 'https://au.reachout.com' },
      { name: 'Teen Line', url: 'https://teenline.org' },
    ],
  },
  {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    emoji: '🌊',
    reset: 'Name one thing you can control right now. Just one. Focus all your energy there. Everything else can wait. You don\'t have to solve everything at once.',
    activity: 'Take a piece of paper and draw a line down the middle. Left side: things you CAN control. Right side: things you CAN\'T control. Let go of the right side — it was never yours to carry.',
    longTerm: "Feeling overwhelmed regularly might mean you need to set some boundaries. It's okay to say no, to ask for extensions, to admit you need help. Talk to someone about what's on your plate.",
    resources: [
      { name: 'JED Foundation', url: 'https://jedfoundation.org' },
      { name: 'Headspace (meditation)', url: 'https://headspace.com' },
    ],
  },
  {
    id: 'social-anxiety',
    label: 'Social Anxiety',
    emoji: '🫣',
    reset: 'Ground yourself: feel your feet on the floor. Look around — notice that nobody is actually staring at you. Take 3 slow breaths. Remind yourself: most people are too busy thinking about themselves to judge you.',
    activity: 'Practice one small, low-stakes social interaction today: say hi to someone, compliment a stranger, or order something at a counter. Each small step builds your confidence muscle. You don\'t have to be perfect.',
    longTerm: "Social anxiety is incredibly common and very treatable. Cognitive Behavioral Therapy (CBT) is especially effective. You don't have to live in fear of social situations — talking to a school counselor is a great first step.",
    resources: [
      { name: 'Anxiety & Depression Association', url: 'https://adaa.org' },
      { name: 'Social Anxiety Institute', url: 'https://socialanxietyinstitute.org' },
    ],
  },
  {
    id: 'school-stress',
    label: 'Stressed About School',
    emoji: '📚',
    reset: 'Step away from your work. Look out a window or up at the sky for 60 seconds. Take 3 deep breaths. Your brain needs mini-breaks to function well — this isn\'t slacking, it\'s science.',
    activity: 'Try the Pomodoro Technique: Set a timer for 25 minutes and work on ONE thing. When it rings, take a 5-minute break. No phone during work time, no work during break time. Repeat.',
    longTerm: "Your worth is not measured by your GPA. If school pressure is making you miserable, talk to a teacher or counselor about your workload. Accommodations, tutoring, and adjusted expectations are not signs of weakness.",
    resources: [
      { name: 'NAMI for Teens', url: 'https://www.nami.org/Your-Journey/Teens-Young-Adults' },
      { name: 'TeensHealth', url: 'https://teenshealth.org' },
    ],
  },
  {
    id: 'jealous',
    label: 'Jealous',
    emoji: '💚',
    reset: 'Acknowledge it without judgment: "I feel jealous, and that\'s a normal human emotion." Don\'t beat yourself up for feeling it — just notice it. Take 3 breaths and let the feeling exist without acting on it.',
    activity: 'Write down 3 things going well in YOUR life right now — not compared to anyone else. Then, if you can, compliment the person you\'re jealous of. It sounds counterintuitive, but it takes jealousy\'s power away.',
    longTerm: "Comparison really is the thief of joy. If social media is making you feel inadequate, consider setting time limits or unfollowing accounts that make you feel bad. Curate your feed like you'd curate your friend group.",
    resources: [
      { name: 'ReachOut', url: 'https://au.reachout.com' },
      { name: 'Teen Line', url: 'https://teenline.org' },
    ],
  },
  {
    id: 'frustrated',
    label: 'Frustrated',
    emoji: '😤',
    reset: 'Take 3 slow breaths. On each exhale, consciously drop your shoulders away from your ears. Unclench your jaw. Relax your fists. Your body holds frustration — let it go physically first.',
    activity: 'Write down what\'s frustrating you in one sentence. Then ask: "What can I actually change about this?" Focus your energy on that. If the answer is "nothing," practice letting it go — not because it doesn\'t matter, but because holding it hurts you.',
    longTerm: "Frustration often means you care deeply about something. That's not a bad thing. Channel that energy into action where you can, and practice acceptance where you can't. A counselor can help you figure out which is which.",
    resources: [
      { name: 'Mindfulness for Teens', url: 'https://mindfulnessforteens.com' },
      { name: 'TeensHealth', url: 'https://teenshealth.org' },
    ],
  },
  {
    id: 'scared',
    label: 'Scared',
    emoji: '😨',
    reset: 'Put your hand on your chest. Feel your heartbeat. You are alive and you are safe in this moment. Say: "I am safe right now." Breathe in for 4, out for 6. Repeat 3 times.',
    activity: 'Write down what you\'re afraid of, then write the most likely realistic outcome — not the worst case. Often our brains catastrophize. What would you tell a friend who was scared of this?',
    longTerm: "If fear is constant or stopping you from doing normal things, it might be anxiety, which is very treatable. You don't have to live in fear. Talk to someone — a counselor, a trusted adult, or a helpline.",
    resources: [
      { name: 'Anxiety & Depression Association', url: 'https://adaa.org' },
      { name: 'TeensHealth', url: 'https://teenshealth.org' },
    ],
  },
  {
    id: 'hopeless',
    label: 'Hopeless',
    emoji: '🖤',
    crisis: true,
    reset: 'Put both hands on your chest. Feel your heartbeat. You are alive, and that matters more than you know right now. This feeling is lying to you — it is temporary, even if it doesn\'t feel that way.',
    activity: 'Write one sentence about something — anything — you\'d like to do tomorrow. It can be tiny: eat your favorite food, see the sky, hear a song. Hold onto that one thing.',
    longTerm: "Hopelessness can be a symptom of depression, and depression is treatable. Please reach out to 988, a school counselor, or a trusted adult. You don't have to feel this way forever. Help is real and it works.",
    resources: [
      { name: '988 Suicide & Crisis Lifeline', url: 'https://988lifeline.org' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org' },
      { name: 'NAMI for Teens', url: 'https://www.nami.org/Your-Journey/Teens-Young-Adults' },
    ],
  },
  {
    id: 'dark-thoughts',
    label: 'Having Dark Thoughts',
    emoji: '🌑',
    crisis: true,
    reset: 'You don\'t have to act on these thoughts. They are thoughts, not commands. Right now, take a deep breath. You reached out by being here, and that takes real courage.',
    activity: 'Tell one person how you\'re feeling right now. Text a friend, call a family member, or reach out to 988 (call or text). You don\'t have to explain everything — just say "I\'m not doing great and I need to talk."',
    longTerm: "Dark thoughts feel permanent, but they\'re not. With the right support, things can and do get better. You deserve that support. Please talk to a professional — a counselor, therapist, or call 988. This is what they're here for.",
    resources: [
      { name: '988 Suicide & Crisis Lifeline', url: 'https://988lifeline.org' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org' },
      { name: 'Trevor Project', url: 'https://www.thetrevorproject.org' },
    ],
  },
  {
    id: 'confused',
    label: 'Confused',
    emoji: '😵‍💫',
    reset: 'Write down the single question that\'s bothering you most. Not all the questions — just the biggest one. Sometimes naming the confusion is the first step to clarity.',
    activity: 'Talk to someone you trust about what\'s confusing you. Sometimes saying things out loud — even to a pet or a voice memo — helps your brain organize thoughts that feel like a tangled mess inside.',
    longTerm: "It\'s okay to not have answers. You don\'t need to have your whole life figured out. Focus on the next small step, not the whole staircase. If confusion is overwhelming, a counselor can help you sort through it.",
    resources: [
      { name: '7 Cups (free online chat)', url: 'https://7cups.com' },
      { name: 'Teen Line', url: 'https://teenline.org' },
    ],
  },
];

const causes: CauseType[] = [
  { id: 'school', label: 'School / Academics', emoji: '🏫', message: "School pressure is so real, and you're definitely not alone. Remember: your worth isn't measured by grades or test scores." },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧', message: "Family stuff is tough because you can't always control it. Focus on what you CAN control — your reactions and your boundaries." },
  { id: 'friends', label: 'Friends', emoji: '👫', message: "Friend issues can hurt more than people realize. Real friendships take work, but you also deserve people who treat you right." },
  { id: 'romantic', label: 'Romantic Relationship', emoji: '💕', message: "Relationship feelings are intense, and whatever you're going through, it's valid. You deserve someone who makes you feel safe." },
  { id: 'body-image', label: 'Body Image', emoji: '🪞', message: "Your body is doing amazing things every day just by keeping you alive. Social media isn't reality — you are enough exactly as you are." },
  { id: 'future', label: 'Future Uncertainty', emoji: '🔮', message: "Not knowing what's next is scary, but you don't need to have it all figured out right now. Focus on today — future-you will thank you." },
  { id: 'social-media', label: 'Social Media', emoji: '📱', message: "Social media shows highlight reels, not real life. Consider taking a break — even 24 hours can make a surprising difference." },
  { id: 'money', label: 'Money / Finances', emoji: '💰', message: "Financial stress is heavy, especially when you're young and have limited control. There are resources and people who can help." },
  { id: 'health', label: 'Health', emoji: '🏥', message: "Health worries are valid. If something feels wrong, it's always okay to talk to a doctor or trusted adult about it." },
  { id: 'other', label: 'Something Else', emoji: '❓', message: "Whatever you're going through, it matters. You took a brave step by checking in with yourself today." },
];

const emotionColors: Record<string, { border: string; bg: string; ring: string }> = {
  sad: { border: 'border-blue-300', bg: 'bg-blue-50', ring: 'ring-blue-200' },
  anxious: { border: 'border-amber-300', bg: 'bg-amber-50', ring: 'ring-amber-200' },
  angry: { border: 'border-red-300', bg: 'bg-red-50', ring: 'ring-red-200' },
  stressed: { border: 'border-orange-300', bg: 'bg-orange-50', ring: 'ring-orange-200' },
  lonely: { border: 'border-indigo-300', bg: 'bg-indigo-50', ring: 'ring-indigo-200' },
  'burnt-out': { border: 'border-yellow-400', bg: 'bg-yellow-50', ring: 'ring-yellow-200' },
  numb: { border: 'border-gray-300', bg: 'bg-gray-50', ring: 'ring-gray-200' },
  ashamed: { border: 'border-rose-300', bg: 'bg-rose-50', ring: 'ring-rose-200' },
  overwhelmed: { border: 'border-teal-300', bg: 'bg-teal-50', ring: 'ring-teal-200' },
  'social-anxiety': { border: 'border-purple-300', bg: 'bg-purple-50', ring: 'ring-purple-200' },
  'school-stress': { border: 'border-emerald-300', bg: 'bg-emerald-50', ring: 'ring-emerald-200' },
  jealous: { border: 'border-green-300', bg: 'bg-green-50', ring: 'ring-green-200' },
  frustrated: { border: 'border-orange-400', bg: 'bg-orange-50', ring: 'ring-orange-200' },
  scared: { border: 'border-violet-300', bg: 'bg-violet-50', ring: 'ring-violet-200' },
  hopeless: { border: 'border-slate-400', bg: 'bg-slate-50', ring: 'ring-slate-300' },
  'dark-thoughts': { border: 'border-slate-500', bg: 'bg-slate-100', ring: 'ring-slate-300' },
  confused: { border: 'border-cyan-300', bg: 'bg-cyan-50', ring: 'ring-cyan-200' },
};

type Step = 'emotions' | 'causes' | 'results';

export default function Home() {
  const [step, setStep] = useState<Step>('emotions');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const toggleEmotion = (id: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleContinueFromEmotions = () => {
    const hasCrisis = selectedEmotions.some(
      (id) => emotions.find((e) => e.id === id)?.crisis
    );
    if (hasCrisis) {
      setShowCrisisModal(true);
    } else {
      setStep('causes');
    }
  };

  const handleCrisisContinue = () => {
    setShowCrisisModal(false);
    setStep('causes');
  };

  const handleSelectCause = (id: string) => {
    setSelectedCause(id);
    setStep('results');
  };

  const handleStartOver = () => {
    setStep('emotions');
    setSelectedEmotions([]);
    setSelectedCause(null);
  };

  const selectedCauseData = causes.find((c) => c.id === selectedCause);
  const selectedEmotionData = emotions.filter((e) =>
    selectedEmotions.includes(e.id)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in text-center">
            <div className="text-4xl mb-4">💜</div>
            <h2 className="text-2xl font-bold text-purple-900 mb-3">
              You Matter
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We're really glad you're here. What you're feeling is real, and you
              don't have to go through it alone.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="tel:988"
                className="block bg-purple-100 border-2 border-purple-300 rounded-2xl p-4 hover:bg-purple-200 transition"
              >
                <div className="font-bold text-purple-900 text-lg">
                  Call or text 988
                </div>
                <div className="text-purple-700 text-sm">
                  Suicide & Crisis Lifeline — Free • Confidential • 24/7
                </div>
              </a>
              <a
                href="sms:741741&body=HOME"
                className="block bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 hover:bg-blue-100 transition"
              >
                <div className="font-bold text-blue-900 text-lg">
                  Text HOME to 741741
                </div>
                <div className="text-blue-700 text-sm">
                  Crisis Text Line — Free • Confidential • 24/7
                </div>
              </a>
            </div>

            <p className="text-sm text-gray-500 mb-6 italic">
              You are not your worst moment. There are people who care about you
              and want to help.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleCrisisContinue}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-full py-3 font-semibold transition shadow-lg"
              >
                Continue to resources
              </button>
              <button
                onClick={() => setShowCrisisModal(false)}
                className="w-full text-gray-400 hover:text-gray-600 py-2 text-sm transition"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Emotion Picker */}
      {step === 'emotions' && (
        <div className="animate-fade-in">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              How are you feeling right now?
            </h1>
            <p className="text-gray-500 text-lg">
              Select all that apply — it's okay to feel more than one thing.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {emotions.map((emotion) => {
              const isSelected = selectedEmotions.includes(emotion.id);
              const colors = emotionColors[emotion.id];
              return (
                <button
                  key={emotion.id}
                  onClick={() => toggleEmotion(emotion.id)}
                  className={`relative border-2 rounded-2xl p-4 text-center transition-all duration-200 cursor-pointer hover:shadow-md ${
                    isSelected
                      ? `${colors.border} ${colors.bg} ring-2 ${colors.ring} shadow-md scale-[1.02]`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-1">{emotion.emoji}</div>
                  <div
                    className={`text-sm font-medium ${
                      isSelected ? 'text-gray-800' : 'text-gray-600'
                    }`}
                  >
                    {emotion.label}
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedEmotions.length > 0 && (
            <div className="text-center animate-fade-in">
              <button
                onClick={handleContinueFromEmotions}
                className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-10 py-3.5 text-lg font-semibold transition shadow-lg hover:shadow-xl"
              >
                Continue →
              </button>
              <p className="text-gray-400 text-sm mt-3">
                {selectedEmotions.length} emotion
                {selectedEmotions.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Cause Picker */}
      {step === 'causes' && (
        <div className="animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              What's contributing to how you feel?
            </h2>
            <p className="text-gray-500 text-lg">
              Pick the one that fits best — this helps us personalize your
              response.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {causes.map((cause) => (
              <button
                key={cause.id}
                onClick={() => handleSelectCause(cause.id)}
                className="border-2 border-gray-200 bg-white rounded-2xl p-4 text-center transition-all hover:border-violet-300 hover:bg-violet-50 hover:shadow-md cursor-pointer"
              >
                <div className="text-2xl mb-1">{cause.emoji}</div>
                <div className="text-sm font-medium text-gray-600">
                  {cause.label}
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setStep('emotions')}
              className="text-violet-600 hover:text-violet-800 text-sm font-medium transition"
            >
              ← Back to emotions
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 'results' && (
        <div className="animate-fade-in">
          {/* Cause message */}
          {selectedCauseData && (
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 mb-8 text-center">
              <p className="text-violet-800 font-medium text-lg">
                {selectedCauseData.emoji} {selectedCauseData.message}
              </p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Here's what might help right now
          </h2>

          {/* Results for each emotion */}
          <div className="space-y-8">
            {selectedEmotionData.map((emotion, index) => {
              const colors = emotionColors[emotion.id];
              return (
                <div
                  key={emotion.id}
                  className={`bg-white rounded-3xl shadow-lg border ${colors.border} overflow-hidden`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`${colors.bg} px-6 py-4 border-b ${colors.border}`}>
                    <h3 className="text-xl font-bold text-gray-800">
                      {emotion.emoji} {emotion.label}
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">⏱️</span>
                          <h4 className="font-bold text-green-800 text-sm uppercase tracking-wide">
                            1-Minute Reset
                          </h4>
                        </div>
                        <p className="text-green-900 text-sm leading-relaxed">
                          {emotion.reset}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">🎯</span>
                          <h4 className="font-bold text-blue-800 text-sm uppercase tracking-wide">
                            5-Minute Activity
                          </h4>
                        </div>
                        <p className="text-blue-900 text-sm leading-relaxed">
                          {emotion.activity}
                        </p>
                      </div>

                      <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">📌</span>
                          <h4 className="font-bold text-purple-800 text-sm uppercase tracking-wide">
                            If This Keeps Happening
                          </h4>
                        </div>
                        <p className="text-purple-900 text-sm leading-relaxed">
                          {emotion.longTerm}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-semibold text-gray-500 mr-1">
                        🔗 Resources:
                      </span>
                      {emotion.resources.map((r) => (
                        <a
                          key={r.url}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm bg-violet-100 text-violet-700 px-3 py-1 rounded-full hover:bg-violet-200 transition font-medium"
                        >
                          {r.name} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={handleStartOver}
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8 py-3 font-semibold transition shadow-lg"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
