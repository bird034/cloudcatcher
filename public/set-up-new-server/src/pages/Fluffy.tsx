import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'fluffy';
  content: string;
  timestamp: string;
}

/* ─── FLUFFY'S BRAIN (fallback responses when backend isn't available) ─── */
const getFluffyResponse = (message: string, messageCount: number): string => {
  const lower = message.toLowerCase();

  // First message greeting
  if (messageCount === 0) {
    return pickRandom([
      "Hey! I'm so glad you're here 💜 What's on your mind today?",
      "Hi there! Welcome to a safe space. How are you doing? 😊",
      "Hey friend! I'm here to listen. What's going on with you today? ☁️",
    ]);
  }

  // Crisis detection — gentle, not alarming
  if (lower.match(/kill myself|suicide|want to die|end it all|self.?harm|cutting|hurt myself|don't want to be here/)) {
    return "I hear you, and I'm really glad you told me that. What you're feeling is real and it matters. 💜 You don't have to go through this alone — would you consider reaching out to the 988 Suicide & Crisis Lifeline? You can call or text 988 anytime. They're amazing people who truly care.";
  }

  if (lower.match(/hopeless|no point|give up|can't do this anymore|nothing matters/)) {
    return "That sounds incredibly heavy, and I'm sorry you're carrying that. 💙 Those feelings are lying to you — things can get better, even when it doesn't feel that way. Can you tell me more about what's going on? And if you ever need to talk to someone right away, 988 is always there (call or text).";
  }

  // Emotion-specific responses
  if (lower.match(/sad|crying|cry|tears|unhappy|depressed|down/)) {
    return pickRandom([
      "I hear you 💙 Sadness can feel so heavy. It's okay to sit with it for a bit — you don't have to rush past it. What do you think is making you feel this way?",
      "That sounds really tough. Being sad is exhausting in a way people don't always get. What's going on? I'm here to listen 💜",
      "I'm sorry you're feeling sad. You know, it takes courage to admit that. What's weighing on you the most right now? 🌧️",
    ]);
  }

  if (lower.match(/anxious|anxiety|worried|panic|nervous|scared|afraid|fear/)) {
    return pickRandom([
      "Anxiety is the worst — your brain is basically trying to protect you, but going way overboard. Let's take a breath together first, okay? In... hold... out... 🫧 Now, what's your brain worried about?",
      "I hear you. Anxiety can make everything feel overwhelming. Remember: you're safe right now, even if your brain says otherwise. What's making you feel anxious? 💜",
      "Ugh, anxiety. It's like your brain running worst-case scenarios on repeat. You're here though, and that's good. Want to tell me what's on your mind? 🌸",
    ]);
  }

  if (lower.match(/angry|mad|furious|pissed|rage|hate/)) {
    return pickRandom([
      "Anger is valid — it usually means something important to you has been crossed. Before we talk about it, try this: take a deep breath and drop your shoulders. 💜 What's making you angry?",
      "I hear you. Being angry is exhausting. Sometimes anger is protecting a softer feeling underneath — like hurt or fear. What happened?",
    ]);
  }

  if (lower.match(/stress|overwhelm|too much|can't handle|swamped|busy/)) {
    return pickRandom([
      "That sounds like a LOT. You're carrying more than you should have to. What if we break it down — what's the ONE thing stressing you the most right now? 💜",
      "Being overwhelmed is your brain's way of saying 'this is too much.' And that's okay to admit. Let's talk through it — what's on your plate? 🌊",
    ]);
  }

  if (lower.match(/lonely|alone|no friends|nobody|isolated|left out/)) {
    return pickRandom([
      "Loneliness is one of the most painful feelings, and I'm sorry you're dealing with it. But here's something true: feeling lonely doesn't mean you're unlovable. 💜 What's been going on?",
      "That really sucks, and I want you to know — talking to me means you reached out, which is brave. You're not as alone as it feels right now. Tell me more? 🌟",
    ]);
  }

  if (lower.match(/school|grades|homework|test|exam|gpa|college|teacher/)) {
    return pickRandom([
      "School pressure is SO real. Remember: your worth is not your GPA. You are a whole person beyond your grades. 📚 What's going on with school?",
      "Ugh, school stress. I totally get it. What's the situation? Maybe we can figure out a way to make it feel less overwhelming 💜",
    ]);
  }

  if (lower.match(/family|parents|mom|dad|brother|sister|home/)) {
    return pickRandom([
      "Family stuff can be really complicated because you can't just walk away from it. Your feelings about your family are valid, whatever they are. 💜 What's going on at home?",
      "Home should feel safe, and when it doesn't, that's really hard. I'm here to listen — what's happening with your family?",
    ]);
  }

  if (lower.match(/friend|friendship|betrayed|drama|left out|group/)) {
    return pickRandom([
      "Friend stuff hurts in a way that people sometimes underestimate. Your feelings about this are completely valid. What happened? 💜",
      "Friendship drama is so draining. Real friends make you feel good about yourself — you deserve that. Tell me what's going on? 🌈",
    ]);
  }

  if (lower.match(/tired|exhausted|burnt out|burnout|sleep|can't sleep|insomnia/)) {
    return pickRandom([
      "Being exhausted — mentally, physically, or both — is your body telling you something important. Have you been able to rest at all? 💤",
      "Burnout is real and it's not just being lazy. You might need to give yourself permission to rest. What's been draining your energy? 🛋️",
    ]);
  }

  if (lower.match(/thank|thanks|helpful|better|good|great/)) {
    return pickRandom([
      "I'm really glad I could help, even a little bit! Remember, you can always come back here whenever you need to talk. You're doing great 💜",
      "Aw, that makes me happy! You deserve good things. Take care of yourself, okay? I'm always here ☁️",
      "You're so welcome! And hey — you're the one doing the hard work by showing up and being honest. That takes real strength 💪💜",
    ]);
  }

  if (lower.match(/fine|okay|good|alright/) && lower.length < 20) {
    return pickRandom([
      "That's good to hear! But also — 'fine' can mean a lot of things. Are you genuinely fine, or is it more of an 'I don't want to talk about it' fine? Either is okay! 💜",
      "Glad to hear it! Is there anything on your mind today, or are you just stopping by to say hi? Both are cool 😊",
    ]);
  }

  // Default empathetic responses
  return pickRandom([
    "I hear you 💜 That sounds like a lot. Can you tell me more about that?",
    "Thanks for sharing that with me. It takes courage to talk about these things. What would help you feel even a tiny bit better right now? 💜",
    "That makes sense. How long have you been feeling this way? I'm here to listen 🌸",
    "I appreciate you being open with me. Your feelings are completely valid. Is there anything specific that's been on your mind? 💜",
    "I'm here for you. Sometimes just getting it out of your head and into words can help. Tell me more? ☁️",
    "That sounds really hard, and I'm sorry you're dealing with it. What do you think you need right now? 💜",
  ]);
};

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Fluffy() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'fluffy',
      content: "Hey! I'm Fluffy, your friendly cloud companion ☁️ I'm here to listen — no judgments, no lectures, just a safe space to talk. How are you doing today?",
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userMessageCount = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking delay (feels more natural)
    const delay = 800 + Math.random() * 1200;

    setTimeout(() => {
      const response = getFluffyResponse(text, userMessageCount.current);
      userMessageCount.current += 1;

      const fluffyMessage: Message = {
        role: 'fluffy',
        content: response,
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, fluffyMessage]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
      {/* Disclaimer */}
      <div className="bg-violet-50 border border-violet-200 rounded-2xl px-4 py-3 mb-4 text-center">
        <p className="text-violet-700 text-xs leading-relaxed">
          🤖 Fluffy is an AI companion, not a therapist. For real crisis
          support, call or text{' '}
          <a href="tel:988" className="font-bold underline">
            988
          </a>
          . Everything here is anonymous — nothing is saved.
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 animate-fade-in ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'fluffy' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-sm shrink-0 shadow">
                ☁️
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-violet-600 text-white rounded-br-md'
                  : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md'
              }`}
            >
              {msg.content}
              <div
                className={`text-[10px] mt-1 ${
                  msg.role === 'user' ? 'text-violet-200' : 'text-gray-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2 justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-sm shrink-0 shadow">
              ☁️
            </div>
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-white border-2 border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition"
          disabled={isTyping}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
          className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white rounded-full w-12 h-12 flex items-center justify-center transition shadow-lg disabled:shadow-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
