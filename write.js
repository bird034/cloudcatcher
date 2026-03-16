const fs = require('fs');

const code = `const resources = [
  { category: 'Crisis Help', color: '#fde8e8', items: [
    { name: '988 Lifeline', desc: 'Call or text 988. Free and confidential 24/7.', url: 'https://988lifeline.org', tag: 'Call 988' },
    { name: 'Crisis Text Line', desc: 'Text HOME to 741741 anytime.', url: 'https://www.crisistextline.org', tag: 'Text 741741' },
  ]},
  { category: 'Mental Health Info', color: '#f0ebf8', items: [
    { name: 'NAMI Teens', desc: 'Resources from the National Alliance on Mental Illness.', url: 'https://www.nami.org/Support-Education/Teens-Young-Adults', tag: 'nami.org' },
    { name: 'Teen Mental Health', desc: 'Videos and learning tools for teens.', url: 'https://teenmentalhealth.org', tag: 'teenmentalhealth.org' },
    { name: 'Teens Health', desc: 'Honest information for teens on mental health.', url: 'https://teenshealth.org/en/teens/your-mind/', tag: 'teenshealth.org' },
  ]},
  { category: 'Apps and Tools', color: '#e8f4f8', items: [
    { name: 'Mindfulness for Teens', desc: 'Guided meditations and stress relief tools.', url: 'http://mindfulnessforteens.com', tag: 'mindfulnessforteens.com' },
    { name: 'SAMHSA Locator', desc: 'Find local mental health treatment centers.', url: 'https://findtreatment.samhsa.gov', tag: 'samhsa.gov' },
  ]},
  { category: 'Support and Community', color: '#e8f8f0', items: [
    { name: 'Love is Respect', desc: 'Support for abusive relationships. Call 1-866-331-9474.', url: 'https://www.loveisrespect.org', tag: 'loveisrespect.org' },
    { name: 'Stop Bullying', desc: 'Resources for teens dealing with bullying.', url: 'https://www.stopbullying.gov', tag: 'stopbullying.gov' },
  ]},
];

export default function Resources() {
  return (
    <div className="resources-page">
      <div className="page-header">
        <h2>Resources</h2>
        <p>Trusted mental health resources for teens. Help is always available.</p>
      </div>
      {resources.map(section => (
        <div key={section.category} className="resource-section">
          <h3>{section.category}</h3>
          <div className="resource-grid">
            {section.items.map(item => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="resource-card" style={{ background: section.color }}>
                <div className="resource-tag">{item.tag}</div>
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <span className="resource-link">Visit site</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}`;

fs.writeFileSync('src/pages/Resources.jsx', code);
console.log('Done!');