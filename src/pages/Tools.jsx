import { useState } from 'react'

const groundingSteps = [
  { number: 5, sense: 'See', instruction: 'Name 5 things you can see right now.', color: '#e8f4f8' },
  { number: 4, sense: 'Touch', instruction: 'Name 4 things you can physically feel right now.', color: '#f0ebf8' },
  { number: 3, sense: 'Hear', instruction: 'Name 3 things you can hear right now.', color: '#fef3e8' },
  { number: 2, sense: 'Smell', instruction: 'Name 2 things you can smell right now.', color: '#e8f8f0' },
  { number: 1, sense: 'Taste', instruction: 'Name 1 thing you can taste right now.', color: '#fde8e8' },
]

const boosts = [
  'You have gotten through every hard day so far.',
  'It is okay to not have everything figured out.',
  'You do not have to be perfect to be worthy of love.',
  'Rest is not laziness. Rest is necessary.',
  'You are allowed to feel whatever you are feeling.',
  'Small steps still move you forward.',
  'You matter more than you know.',
  'Asking for help is a sign of strength, not weakness.',
  'You are not behind. You are on your own path.',
  'One breath at a time is enough.',
  'Your feelings are valid, even when they are hard.',
  'You have survived 100 percent of your worst days.',
]

const moods = ['😊', '🙂', '😐', '😔', '😢', '✏️']
const moodLabels = ['Great', 'Okay', 'Meh', 'Low', 'Struggling', 'Other']

export default function Tools() {
  const [groundingStep, setGroundingStep] = useState(0)
  const [groundingDone, setGroundingDone] = useState(false)
  const [boost, setBoost] = useState(null)
  const [selectedMood, setSelectedMood] = useState(null)
const [moodLog, setMoodLog] = useState([])
const [otherMood, setOtherMood] = useState('')
const [otherEmoji, setOtherEmoji] = useState('😌')

  const handleGroundingNext = () => {
    if (groundingStep < groundingSteps.length - 1) {
      setGroundingStep(s => s + 1)
    } else {
      setGroundingDone(true)
    }
  }

  const handleGroundingReset = () => {
    setGroundingStep(0)
    setGroundingDone(false)
  }

  const handleBoost = () => {
    const random = boosts[Math.floor(Math.random() * boosts.length)]
    setBoost(random)
  }

  const handleMood = (i) => {
  setSelectedMood(i)
  if (i !== 5) {
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMoodLog(prev => [{ mood: moods[i], label: moodLabels[i], time }, ...prev].slice(0, 5))
  }
}

const handleOtherSubmit = () => {
  if (!otherMood) return
  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  setMoodLog(prev => [{ mood: otherEmoji, label: otherMood, time }, ...prev].slice(0, 5))
  setOtherMood('')
  setSelectedMood(null)
}

  const current = groundingSteps[groundingStep]

  return (
    <div className="tools-page">
      <div className="tools-header">
        <h2>Quick tools</h2>
        <p>Small things you can do right now to feel a little better.</p>
      </div>

      <div className="tools-grid">

        <div className="tool-card">
          <h3>5-4-3-2-1 Grounding</h3>
          <p className="tool-desc">Feeling anxious or overwhelmed? This brings you back to the present moment.</p>
          {!groundingDone ? (
            <div className="grounding-box" style={{background: current.color}}>
              <div className="grounding-number">{current.number}</div>
              <div className="grounding-sense">{current.sense}</div>
              <p className="grounding-instruction">{current.instruction}</p>
              <div className="grounding-progress">
                {groundingSteps.map((s, i) => (
                  <div key={i} className={'grounding-dot' + (i <= groundingStep ? ' grounding-dot--active' : '')} />
                ))}
              </div>
              <button className="btn-primary" onClick={handleGroundingNext}>
                {groundingStep < groundingSteps.length - 1 ? 'Next' : 'Finish'}
              </button>
            </div>
          ) : (
            <div className="grounding-done">
              <div style={{fontSize: 48}}>🌿</div>
              <h4>Well done.</h4>
              <p>You just brought yourself back to the present. That took courage.</p>
              <button className="reset-btn" onClick={handleGroundingReset}>Do it again</button>
            </div>
          )}
        </div>

        <div className="tool-card">
          <h3>Motivation boost</h3>
          <p className="tool-desc">Need a reminder that you are doing okay? Tap the button.</p>
          <div className="boost-box">
            {boost ? (
              <div className="boost-message">{boost}</div>
            ) : (
              <div className="boost-placeholder">Your message will appear here.</div>
            )}
            <button className="btn-primary" onClick={handleBoost}>
              {boost ? 'Another one' : 'Give me a boost'}
            </button>
          </div>
        </div>

        <div className="tool-card">
  <h3>Mood check-in</h3>
  <p className="tool-desc">How are you feeling right now? No pressure, just check in with yourself.</p>
  <div className="mood-grid-new">
    {moods.map((m, i) => (
      <button
        key={i}
        className={'mood-btn-new' + (selectedMood === i ? ' mood-btn-new--active' : '')}
        onClick={() => handleMood(i)}
      >
        <span className="mood-emoji-new">{m}</span>
        <span className="mood-label-new">{moodLabels[i]}</span>
      </button>
    ))}
  </div>
  {selectedMood === 5 && (
    <div className="mood-other-box">
      <input
        type="text"
        placeholder="How are you feeling?"
        className="mood-other-input"
        onChange={e => setOtherMood(e.target.value)}
      />
      <div className="mood-emoji-picker">
        {['😌','😓','😤','🥺','😶','😵','🤯','😴','🥱','😮'].map(em => (
          <button key={em} className={'emoji-pick-btn' + (otherEmoji === em ? ' emoji-pick-btn--active' : '')} onClick={() => setOtherEmoji(em)}>
            {em}
          </button>
        ))}
      </div>
      <button className="btn-primary" style={{marginTop: 12}} onClick={handleOtherSubmit}>Log this mood</button>
    </div>
  )}
  {moodLog.length > 0 && (
    <div className="mood-log">
      <p className="mood-log-title">Recent check-ins</p>
      {moodLog.map((entry, i) => (
        <div key={i} className="mood-log-entry">
          <span>{entry.mood} {entry.label}</span>
          <span className="mood-log-time">{entry.time}</span>
        </div>
      ))}
    </div>
  )}
</div>

      </div>
    </div>
  )
}