import { Link } from 'react-router-dom'

const categories = [
  { emoji: '😟', title: 'Anxiety', desc: 'Learn to manage worry, fear, and stress.', color: '#e8f4f8' },
  { emoji: '😔', title: 'Depression', desc: 'Understanding low mood and how to cope.', color: '#f0ebf8' },
  { emoji: '😤', title: 'Stress', desc: 'Tips for dealing with pressure and burnout.', color: '#fef3e8' },
  { emoji: '😴', title: 'Sleep', desc: 'Why rest matters and how to sleep better.', color: '#e8f8f0' },
  { emoji: '💔', title: 'Grief & Loss', desc: 'Processing loss and finding your way forward.', color: '#fde8f0' },
  { emoji: '🤝', title: 'Relationships', desc: 'Healthy connections, boundaries, and support.', color: '#e8f0fd' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">Free · Confidential · Made for Teens</div>
        <h2>You are not alone.</h2>
        <p>Find mental health resources, support, and guidance — made for teens, by people who care.</p>
        <div className="hero-buttons">
          <Link to="/get-help"><button className="btn-primary">Get Help Now</button></Link>
          <Link to="/resources"><button className="btn-secondary">Browse Resources</button></Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h3>What are you going through?</h3>
        <p className="categories-sub">Choose a topic to find resources, tips, and support.</p>
        <div className="categories-grid">
          {categories.map(cat => (
            <div key={cat.title} className="category-card" style={{ background: cat.color }}>
              <div className="category-emoji">{cat.emoji}</div>
              <h4>{cat.title}</h4>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}