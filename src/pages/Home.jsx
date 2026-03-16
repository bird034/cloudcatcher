import { useState } from 'react'

const emotions = [
  { emoji: '😰', label: 'Anxious', color: '#e8f4f8' },
  { emoji: '😔', label: 'Sad', color: '#f0ebf8' },
  { emoji: '😤', label: 'Angry', color: '#fde8e8' },
  { emoji: '😩', label: 'Overwhelmed', color: '#fef3e8' },
  { emoji: '😴', label: 'Exhausted', color: '#e8f8f0' },
  { emoji: '😶', label: 'Numb', color: '#f5f5f5' },
]

const responses = {
  Anxious: {
    color: '#e8f4f8',
    breathing: 'Try box breathing: breathe in for 4 counts, hold for 4, breathe out for 4, hold for 4. Repeat 4 times.',
    meditation: 'Close your eyes and focus only on your breath. When your mind wanders, gently bring it back. Even 2 minutes helps.',
    resources: [
      { name: '988 Lifeline', url: 'https://988lifeline.org', desc: 'Talk to someone right now' },
      { name: 'Mindfulness for Teens', url: 'http://mindfulnessforteens.com', desc: 'Guided meditations for anxiety' },
      { name: 'Teens Health', url: 'https://teenshealth.org/en/teens/your-mind/', desc: 'Learn about anxiety' },
    ],
  },
  Sad: {
    color: '#f0ebf8',
    breathing: 'Try slow breathing: breathe in for 5 counts, breathe out for 7 counts. The longer exhale calms your nervous system.',
    meditation: 'Place your hand on your heart. Take 3 deep breaths and remind yourself that this feeling is temporary and it is okay to feel sad.',
    resources: [
      { name: '988 Lifeline', url: 'https://988lifeline.org', desc: 'Talk to someone right now' },
      { name: 'Teen Mental Health', url: 'https://teenmentalhealth.org', desc: 'Learn about depression and sadness' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org', desc: 'Text HOME to 741741' },
    ],
  },
  Angry: {
    color: '#fde8e8',
    breathing: 'Try 4-7-8 breathing: breathe in for 4 counts, hold for 7, breathe out slowly for 8. This calms your body quickly.',
    meditation: 'Find a quiet spot. Imagine your anger as a color or shape. With each breath out, picture it slowly leaving your body.',
    resources: [
      { name: 'Teens Health', url: 'https://teenshealth.org/en/teens/your-mind/', desc: 'Tips for managing anger' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org', desc: 'Text HOME to 741741' },
      { name: 'Stop Bullying', url: 'https://www.stopbullying.gov', desc: 'If anger is related to bullying' },
    ],
  },
  Overwhelmed: {
    color: '#fef3e8',
    breathing: 'Try 5-5-5: look around and name 5 things you see, 5 you can touch, 5 you can hear. Then take 5 slow breaths.',
    meditation: 'You do not have to do everything at once. Take one breath. Then take one small step. That is enough for right now.',
    resources: [
      { name: '211 Helpline', url: 'https://www.211.org', desc: 'Get connected to local support' },
      { name: 'SAMHSA Locator', url: 'https://findtreatment.samhsa.gov', desc: 'Find a counselor near you' },
      { name: '988 Lifeline', url: 'https://988lifeline.org', desc: 'Talk to someone right now' },
    ],
  },
  Exhausted: {
    color: '#e8f8f0',
    breathing: 'Try belly breathing: put one hand on your belly. Breathe in slowly and feel your belly rise. Breathe out and feel it fall. Repeat 6 times.',
    meditation: 'Give yourself permission to rest. You are doing your best. Close your eyes for just 2 minutes and let your body be still.',
    resources: [
      { name: 'Mindfulness for Teens', url: 'http://mindfulnessforteens.com', desc: 'Rest and recharge techniques' },
      { name: 'Teens Health', url: 'https://teenshealth.org/en/teens/your-mind/', desc: 'Tips for sleep and rest' },
      { name: 'NAMI Teens', url: 'https://www.nami.org/Support-Education/Teens-Young-Adults', desc: 'Support for burnout and fatigue' },
    ],
  },
  Numb: {
    color: '#f5f5f5',
    breathing: 'Try energizing breath: take a sharp inhale through your nose, then a short second inhale, then a long exhale. Repeat 5 times.',
    meditation: 'Feeling numb is okay. Hold something cold or warm in your hands and focus on that sensation. Gently bring yourself back to the present.',
    resources: [
      { name: '988 Lifeline', url: 'https://988lifeline.org', desc: 'Talk to someone right now' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org', desc: 'Text HOME to 741741' },
      { name: 'Teen Mental Health', url: 'https://teenmentalhealth.org', desc: 'Learn about dissociation and numbness' },
    ],
  },
}

export default function Home() {
  const [selected, setSelected] = useState(null)

  const response = selected ? responses[selected] : null

  return (
    <div>
      <section className="hero">
        <div className="hero-badge">Free and Confidential</div>
        <h2>How are you feeling right now?</h2>
        <p>Pick the emotion that feels closest to how you are doing today.</p>
      </section>

      <section className="emotion-picker">
        <div className="emotion-grid">
          {emotions.map(e => (
            <button
              key={e.label}
              className={'emotion-btn' + (selected === e.label ? ' emotion-btn--active' : '')}
              style={{background: selected === e.label ? e.color : 'white'}}
              onClick={() => setSelected(e.label)}
            >
              <span className="emotion-emoji">{e.emoji}</span>
              <span className="emotion-label">{e.label}</span>
            </button>
          ))}
        </div>
      </section>

      {response && (
        <section className="response-section" style={{background: response.color}}>
          <h3>You feel {selected}. That is okay.</h3>

          <div className="response-grid">
            <div className="response-card">
              <div className="response-icon">🫁</div>
              <h4>Breathing exercise</h4>
              <p>{response.breathing}</p>
            </div>

            <div className="response-card">
              <div className="response-icon">🧘</div>
              <h4>Meditation moment</h4>
              <p>{response.meditation}</p>
            </div>
          </div>

          <div className="response-resources">
            <h4>Resources for when you feel {selected}</h4>
            <div className="resource-grid">
              {response.resources.map(r => (
                <div key={r.name} className="resource-card" style={{background:'white'}}>
                  <h4>{r.name}</h4>
                  <p>{r.desc}</p>
                  <a href={r.url} target="_blank">Visit site</a>
                </div>
              ))}
            </div>
          </div>

          <button className="reset-btn" onClick={() => setSelected(null)}>
            Pick a different emotion
          </button>
        </section>
      )}
    </div>
  )
}