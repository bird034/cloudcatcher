export default function Resources() {
  return (
    <div className="resources-page">
      <div className="page-header">
        <h2>Resources</h2>
        <p>Trusted mental health resources for teens.</p>
      </div>

      <div className="resource-section">
        <h3>Crisis Help</h3>
        <div className="resource-grid">
          <div className="resource-card" style={{background:'#fde8e8'}}>
            <h4>988 Lifeline</h4>
            <p>Call or text 988. Free and confidential 24/7.</p>
            <a href="https://988lifeline.org" target="_blank">Visit site</a>
          </div>
          <div className="resource-card" style={{background:'#fde8e8'}}>
            <h4>Crisis Text Line</h4>
            <p>Text HOME to 741741 to reach a counselor anytime.</p>
            <a href="https://www.crisistextline.org" target="_blank">Visit site</a>
          </div>
        </div>
      </div>

      <div className="resource-section">
        <h3>Mental Health Info</h3>
        <div className="resource-grid">
          <div className="resource-card" style={{background:'#f0ebf8'}}>
            <h4>NAMI Teens</h4>
            <p>Resources from the National Alliance on Mental Illness.</p>
            <a href="https://www.nami.org/Support-Education/Teens-Young-Adults" target="_blank">Visit site</a>
          </div>
          <div className="resource-card" style={{background:'#f0ebf8'}}>
            <h4>Teen Mental Health</h4>
            <p>Videos and learning tools on mental illness for teens.</p>
            <a href="https://teenmentalhealth.org" target="_blank">Visit site</a>
          </div>
          <div className="resource-card" style={{background:'#f0ebf8'}}>
            <h4>Teens Health</h4>
            <p>Honest information for teens on mental health issues.</p>
            <a href="https://teenshealth.org/en/teens/your-mind/" target="_blank">Visit site</a>
          </div>
        </div>
      </div>

      <div className="resource-section">
        <h3>Support and Community</h3>
        <div className="resource-grid">
          <div className="resource-card" style={{background:'#e8f8f0'}}>
            <h4>Love is Respect</h4>
            <p>Support for abusive relationships. Call 1-866-331-9474.</p>
            <a href="https://www.loveisrespect.org" target="_blank">Visit site</a>
          </div>
          <div className="resource-card" style={{background:'#e8f8f0'}}>
            <h4>Stop Bullying</h4>
            <p>Resources for teens dealing with bullying.</p>
            <a href="https://www.stopbullying.gov" target="_blank">Visit site</a>
          </div>
        </div>
      </div>

    </div>
  )
}