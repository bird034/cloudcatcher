import { useState, useEffect } from 'react'

const techniques = [
  { name: 'Box Breathing', sequence: [4,4,4,4], labels: ['Breathe in','Hold','Breathe out','Hold'], color: '#e8f4f8' },
  { name: '4-7-8 Breathing', sequence: [4,7,8,0], labels: ['Breathe in','Hold','Breathe out',''], color: '#f0ebf8' },
  { name: 'Calm Breath', sequence: [5,0,7,0], labels: ['Breathe in','','Breathe out',''], color: '#e8f8f0' },
]

export default function Breathe() {
  const [active, setActive] = useState(false)
  const [phase, setPhase] = useState(0)
  const [count, setCount] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [technique, setTechnique] = useState(0)

  const tech = techniques[technique]
  const seq = tech.sequence.filter(s => s > 0)
  const fullSeq = tech.sequence
  const activePhases = fullSeq.map((s, i) => s > 0 ? i : -1).filter(i => i >= 0)

  useEffect(() => {
    if (!active) return
    if (count === 0) return

    const timer = setTimeout(() => {
      setCount(c => {
        if (c <= 1) {
          const nextPhaseIdx = (activePhases.indexOf(phase) + 1) % activePhases.length
          const nextPhase = activePhases[nextPhaseIdx]
          if (nextPhaseIdx === 0) setCycles(cy => cy + 1)
          setPhase(nextPhase)
          return fullSeq[nextPhase]
        }
        return c - 1
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [active, count, phase])

  useEffect(() => {
    if (active) {
      const firstPhase = activePhases[0]
      setPhase(firstPhase)
      setCount(fullSeq[firstPhase])
      setCycles(0)
    }
  }, [active, technique])

  const currentLabel = tech.labels[phase]
  const isExpanding = phase === 0
  const isHolding = phase === 1 || phase === 3

  const bubbleSize = !active ? 120 : isExpanding ? 220 : isHolding ? (phase === 1 ? 220 : 120) : 120
  const duration = active ? fullSeq[phase] : 0

  const handleStop = () => {
    setActive(false)
    setPhase(0)
    setCount(0)
    setCycles(0)
  }

  return (
    <div className="breathe-page">
      <div className="breathe-header">
        <h2>Breathing exercises</h2>
        <p>Slow your breath, slow your mind. Follow the bubble.</p>
      </div>

      <div className="technique-tabs">
        {techniques.map((t, i) => (
          <button
            key={t.name}
            className={'technique-tab' + (technique === i ? ' technique-tab--active' : '')}
            onClick={() => { setTechnique(i); setActive(false) }}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="breathe-container" style={{background: tech.color}}>
        <div className="bubble-wrapper">
          <div
            className="bubble"
            style={{
              width: bubbleSize,
              height: bubbleSize,
              transition: active ? `width ${duration}s ease-in-out, height ${duration}s ease-in-out` : 'none',
            }}
          >
            {active && <span className="bubble-count">{count}</span>}
          </div>
          {active && (
            <div className="bubble-rings">
              <div className="ring" style={{
                width: bubbleSize + 40,
                height: bubbleSize + 40,
                transition: `width ${duration}s ease-in-out, height ${duration}s ease-in-out`,
              }}/>
              <div className="ring ring-2" style={{
                width: bubbleSize + 80,
                height: bubbleSize + 80,
                transition: `width ${duration}s ease-in-out, height ${duration}s ease-in-out`,
              }}/>
            </div>
          )}
        </div>

        <div className="breathe-label">
          {active ? currentLabel : 'Press start when ready'}
        </div>

        {active && cycles > 0 && (
          <div className="breathe-cycles">{cycles} {cycles === 1 ? 'cycle' : 'cycles'} completed</div>
        )}

        <div className="breathe-btns">
          {!active ? (
            <button className="btn-primary" onClick={() => setActive(true)}>Start</button>
          ) : (
            <button className="reset-btn" onClick={handleStop}>Stop</button>
          )}
        </div>
      </div>

      <div className="breathe-tips">
        <div className="breathe-tip-card">
          <h4>Box Breathing</h4>
          <p>Used by Navy SEALs to stay calm under pressure. Great for anxiety and stress.</p>
        </div>
        <div className="breathe-tip-card">
          <h4>4-7-8 Breathing</h4>
          <p>Developed by Dr. Andrew Weil. Helps with falling asleep and managing anger.</p>
        </div>
        <div className="breathe-tip-card">
          <h4>Calm Breath</h4>
          <p>A longer exhale activates the parasympathetic nervous system, reducing stress fast.</p>
        </div>
      </div>
    </div>
  )
}