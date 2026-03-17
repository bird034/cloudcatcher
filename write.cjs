const fs = require('fs');

const code = `import { useState } from 'react'

const emotions = [
  { emoji: '😰', label: 'Anxious', color: '#e8f4f8', crisis: false },
  { emoji: '😔', label: 'Sad', color: '#f0ebf8', crisis: false },
  { emoji: '😤', label: 'Angry', color: '#fde8e8', crisis: false },
  { emoji: '😩', label: 'Overwhelmed', color: '#fef3e8', crisis: false },
  { emoji: '😴', label: 'Exhausted', color: '#e8f8f0', crisis: false },
  { emoji: '😶', label: 'Numb', color: '#f5f5f5', crisis: false },
  { emoji: '🔥', label: 'Burnt out', color: '#fde8e8', crisis: false },
  { emoji: '😞', label: 'Lonely', color: '#f0ebf8', crisis: false },
  { emoji: '😒', label: 'Unmotivated', color: '#fef3e8', crisis: false },
  { emoji: '😳', label: 'Ashamed', color: '#fde8e8', crisis: false },
  { emoji: '😬', label: 'Stressed about school', color: '#e8f4f8', crisis: false },
  { emoji: '😣', label: 'Social anxiety', color: '#f0ebf8', crisis: false },
  { emoji: '😟', label: 'Jealous', color: '#fef3e8', crisis: false },
  { emoji: '😦', label: 'Hopeless', color: '#f5f5f5', crisis: true },
  { emoji: '💭', label: 'Having dark thoughts', color: '#f5f5f5', crisis: true },
]

const causes = [
  'School or grades',
  'Friends or social life',
  'Family',
  'Body image',
  'Future or uncertainty',
  'Loneliness',
  'Something else',
]

const responses = {
  Anxious: {
    color: '#e8f4f8',
    reset1min: 'Try box breathing: in for 4, hold for 4, out for 4, hold for 4. Repeat 4 times.',
    activity5min: 'Put on a song you like and just listen. Do not do anything else. Just be with the music.',
    longterm: 'You could try keeping a worry journal. Write down what is making you anxious, then write one small thing you can do about it.',
    resources: [
      { name: '988 Lifeline', url: 'https://988lifeline.org', desc: 'Talk to someone right now' },
      { name: 'Mindfulness for Teens', url: 'http://mindfulnessforteens.com', desc: 'Guided meditations for anxiety' },
    ],
  },
  Sad: {
    color: '#f0ebf8',
    reset1min: 'Try slow breathing: in for 5, out for 7. The longer exhale calms your body.',
    activity5min: 'Write down 3 things, however small, that went okay today.',
    longterm: 'Sadness that sticks around for more than 2 weeks might be worth talking to someone about.',
    resources: [
      { name: '988 Lifeline', url: 'https://988lifeline.org', desc: 'Talk to someone right now' },
      { name: 'Teen Mental Health', url: 'https://teenmentalhealth.org', desc: 'Learn about depression' },
    ],
  },
  Angry: {
    color: '#fde8e8',
    reset1min: 'Try 4-7-8 breathing: in for 4, hold for 7, out for 8. Do this twice.',
    activity5min: 'Go somewhere private and say out loud exactly what you are feeling. Get it out of your head.',
    longterm: 'Notice what keeps triggering your anger. Patterns are useful information, not flaws.',
    resources: [
      { name: 'Teens Health', url: 'https://teenshealth.org/en/teens/your-mind/', desc: 'Tips for managing anger' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org', desc: 'Text HOME to 741741' },
    ],
  },
  Overwhelmed: {
    color: '#fef3e8',
    reset1min: 'Look around and name 5 things you see, 4 you can touch, 3 you hear. Then take 3 slow breaths.',
    activity5min: 'Write down everything on your mind. Then circle just one thing. That is your only focus right now.',
    longterm: 'Overwhelm usually means too much at once. Try breaking things into smaller pieces.',
    resources: [
      { name: '211 Helpline', url: 'https://www.211.org', desc: 'Get connected to local support' },
      { name: 'SAMHSA Locator', url: 'https://findtreatment.samhsa.gov', desc: 'Find a counselor near you' },
    ],
  },
  Exhausted: {
    color: '#e8f8f0',
    reset1min: 'Put one hand on your belly. Breathe in slowly and feel it rise. Out and feel it fall. Repeat 6 times.',
    activity5min: 'Give yourself permission to do nothing for 5 minutes. That is enough.',
    longterm: 'Exhaustion that does not go away with sleep might be burnout. Talking to someone can help.',
    resources: [
      { name: 'Mindfulness for Teens', url: 'http://mindfulnessforteens.com', desc: 'Rest and recharge techniques' },
      { name: 'NAMI Teens', url: 'https://www.nami.org/Support-Education/Teens-Young-Adults', desc: 'Support and guidance' },
    ],
  },
  Numb: {
    color: '#f5f5f5',
    reset1min: 'Hold something cold or warm. Focus only on that sensation. Let it bring you back to right now.',
    activity5min: 'Put on a show or music you used to love. You do not have to feel anything, just let it play.',
    longterm: 'Feeling numb for a long time can be a sign of depression. Reaching out to a counselor could really help.',
    resources: [
      { name: '988 Lifeline', url: 'https://988lifeline.org', desc: 'Talk to someone right now' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org', desc: 'Text HOME to 741741' },
    ],
  },
  'Burnt out': {
    color: '#fde8e8',
    reset1min: 'Take 5 deep breaths. With each one, say to yourself: I am allowed to rest.',
    activity5min: 'Step outside for 5 minutes. No phone. Just fresh air.',
    longterm: 'Burnout is a signal that something needs to change. Try talking to a trusted adult about what is draining you.',
    resources: [
      { name: 'Teens Health', url: 'https://teenshealth.org/en/teens/your-mind/', desc: 'Understanding burnout' },
      { name: 'NAMI Teens', url: 'https://www.nami.org/Support-Education/Teens-Young-Adults', desc: 'Support and guidance' },
    ],
  },
  Lonely: {
    color: '#f0ebf8',
    reset1min: 'Put your hand on your heart. Take 3 breaths. You are here, and you matter.',
    activity5min: 'Send one message to someone you have not talked to in a while. Just a simple check-in.',
    longterm: 'Loneliness is more common than people admit. A school counselor can help you find ways to connect.',
    resources: [
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org', desc: 'Text HOME to 741741' },
      { name: 'NAMI Teens', url: 'https://www.nami.org/Support-Education/Teens-Young-Adults', desc: 'Community and support' },
    ],
  },
  Unmotivated: {
    color: '#fef3e8',
    reset1min: 'Stand up and stretch for 60 seconds. Sometimes the body needs to move before the mind follows.',
    activity5min: 'Do the smallest possible version of one thing you have been avoiding. Even 5 minutes counts.',
    longterm: 'Lack of motivation that lasts a long time can be linked to depression. It is worth paying attention to.',
    resources: [
      { name: 'Teen Mental Health', url: 'https://teenmentalhealth.org', desc: 'Understanding low motivation' },
      { name: 'Teens Health', url: 'https://teenshealth.org/en/teens/your-mind/', desc: 'Tips for getting unstuck' },
    ],
  },
  Ashamed: {
    color: '#fde8e8',
    reset1min: 'Take 3 slow breaths. Shame grows in silence. You are not your mistakes.',
    activity5min: 'Write down what happened without judging yourself. Then write one kind thing you would say to a friend in your situation.',
    longterm: 'Shame is one of the hardest feelings to carry alone. Talking to someone you trust can make it lighter.',
    resources: [
      { name: '988 Lifeline', url: 'https://988lifeline.org', desc: 'Talk to someone right now' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org', desc: 'Text HOME to 741741' },
    ],
  },
  'Stressed about school': {
    color: '#e8f4f8',
    reset1min: 'Close your eyes and take 5 deep breaths. School stress is real but you have handled hard things before.',
    activity5min: 'Write down every school task stressing you out. Then pick just one to start with.',
    longterm: 'If school stress is constant, talking to a school counselor about strategies might really help.',
    resources: [
      { name: 'Teens Health', url: 'https://teenshealth.org/en/teens/your-mind/', desc: 'Managing school stress' },
      { name: 'NAMI Teens', url: 'https://www.nami.org/Support-Education/Teens-Young-Adults', desc: 'Support for students' },
    ],
  },
  'Social anxiety': {
    color: '#f0ebf8',
    reset1min: 'Before a social situation, try breathing in for 4 and out for 6. It slows your heart rate.',
    activity5min: 'Write down one small social goal for this week. Something tiny, like saying hi to one person.',
    longterm: 'Social anxiety is very common and very treatable. A counselor who specializes in anxiety can make a real difference.',
    resources: [
      { name: 'Mindfulness for Teens', url: 'http://mindfulnessforteens.com', desc: 'Techniques for social anxiety' },
      { name: 'SAMHSA Locator', url: 'https://findtreatment.samhsa.gov', desc: 'Find a counselor near you' },
    ],
  },
  Jealous: {
    color: '#fef3e8',
    reset1min: 'Take 3 slow breaths. Jealousy is a signal, not a flaw. It tells you what you care about.',
    activity5min: 'Write down what you are jealous of and what it tells you about what you want.',
    longterm: 'If jealousy is affecting your relationships, talking to a counselor can help.',
    resources: [
      { name: 'Teens Health', url: 'https://teenshealth.org/en/teens/your-mind/', desc: 'Understanding difficult emotions' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org', desc: 'Text HOME to 741741' },
    ],
  },
}

export default function Home() {
  const [selected, setSelected] = useState([])
  const [cause, setCause] = useState(null)
  const [showCrisis, setShowCrisis] = useState(false)
  const [step, setStep] = useState('emotions')

  const toggleEmotion = (emotion) => {
    if (emotion.crisis) {
      setShowCrisis(true)
      return
    }
    setSelected(prev =>
      prev.includes(emotion.label)
        ? prev.filter(e => e !== emotion.label)
        : [...prev, emotion.label]
    )
  }

  const handleReset = () => {
    setSelected([])
    setCause(null)
    setStep('emotions')
    setShowCrisis(false)
  }

  const selectedResponses = selected.filter(label => responses[label]).map(label => responses[label])

  return (
    <div>
      {showCrisis && (
        <div className="crisis-popup-overlay">
          <div className="crisis-popup">
            <div className="crisis-popup-emoji">💙</div>
            <h3>You do not have to face this alone.</h3>
            <p>Whatever you are going through right now, there are people who want to help. You matter.</p>
            <a href="https://988lifeline.org" target="_blank" className="crisis-popup-btn">Call or text 988 now</a>
            <a href="https://www.crisistextline.org" target="_blank" className="crisis-popup-link">Or text HOME to 741741</a>
            <button className="crisis-popup-close" onClick={() => setShowCrisis(false)}>I am okay for now</button>
          </div>
        </div>
      )}

      <section className="hero">
        <div className="hero-badge">Free and Confidential</div>
        <h2>How are you feeling right now?</h2>
        <p>Pick everything that feels true. There are no wrong answers.</p>
      </section>

      {step === 'emotions' && (
        <section className="emotion-picker">
          <div className="emotion-grid">
            {emotions.map(e => (
              <button
                key={e.label}
                className={'emotion-btn' + (selected.includes(e.label) ? ' emotion-btn--active' : '')}
                style={{background: selected.includes(e.label) ? e.color : 'white'}}
                onClick={() => toggleEmotion(e)}
              >
                <span className="emotion-emoji">{e.emoji}</span>
                <span className="emotion-label">{e.label}</span>
              </button>
            ))}
          </div>
          {selected.length > 0 && (
            <div className="emotion-next">
              <p className="emotion-selected-text">You picked: {selected.join(', ')}</p>
              <button className="btn-primary" onClick={() => setStep('cause')}>Continue</button>
            </div>
          )}
        </section>
      )}

      {step === 'cause' && (
        <section className="cause-picker">
          <h3>What is contributing to this?</h3>
          <p>Pick the one that feels most relevant right now.</p>
          <div className="cause-grid">
            {causes.map(c => (
              <button key={c} className="cause-btn" onClick={() => { setCause(c); setStep('response') }}>
                {c}
              </button>
            ))}
          </div>
          <button className="reset-btn" onClick={handleReset}>Back</button>
        </section>
      )}

      {step === 'response' && selectedResponses.length > 0 && (
        <section className="response-section" style={{background: selectedResponses[0].color}}>
          <h3>Here is what might help right now.</h3>
          {cause && <p className="cause-tag">Related to: {cause}</p>}
          {selectedResponses.map((r, i) => (
            <div key={i} className="response-block">
              <h4 className="response-emotion-title">{selected[i]}</h4>
              <div className="response-grid">
                <div className="response-card">
                  <div className="response-icon">⏱️</div>
                  <h4>1-minute reset</h4>
                  <p>{r.reset1min}</p>
                </div>
                <div className="response-card">
                  <div className="response-icon">🎯</div>
                  <h4>5-minute activity</h4>
                  <p>{r.activity5min}</p>
                </div>
                <div className="response-card">
                  <div className="response-icon">💡</div>
                  <h4>If this keeps happening</h4>
                  <p>{r.longterm}</p>
                </div>
              </div>
              <div className="response-resources">
                <h4>Helpful resources</h4>
                <div className="resource-grid">
                  {r.resources.map(res => (
                    <div key={res.name} className="resource-card" style={{background:'white'}}>
                      <h4>{res.name}</h4>
                      <p>{res.desc}</p>
                      <a href={res.url} target="_blank">Visit site</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button className="reset-btn" onClick={handleReset}>Start over</button>
        </section>
      )}
    </div>
  )
}`;

fs.writeFileSync('src/pages/Home.jsx', code);
console.log('Done!');