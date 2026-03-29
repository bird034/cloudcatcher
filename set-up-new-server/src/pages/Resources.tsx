interface Resource {
  name: string;
  description: string;
  url: string;
}

interface Category {
  title: string;
  emoji: string;
  color: string;
  cardBg: string;
  cardBorder: string;
  resources: Resource[];
}

const categories: Category[] = [
  {
    title: 'Crisis & Immediate Help',
    emoji: '🚨',
    color: 'text-red-700',
    cardBg: 'bg-red-50',
    cardBorder: 'border-red-200 hover:border-red-400',
    resources: [
      {
        name: '988 Suicide & Crisis Lifeline',
        description: 'Free, confidential 24/7 support. Call or text 988. For anyone in emotional distress or suicidal crisis.',
        url: 'https://988lifeline.org',
      },
      {
        name: 'Crisis Text Line',
        description: 'Text HOME to 741741 to connect with a trained crisis counselor. Free, 24/7, confidential.',
        url: 'https://www.crisistextline.org',
      },
      {
        name: '211 (Community Resources)',
        description: 'Dial 211 to connect with local resources for food, housing, mental health services, and more.',
        url: 'https://www.211.org',
      },
    ],
  },
  {
    title: 'Mental Health Information',
    emoji: '🧠',
    color: 'text-blue-700',
    cardBg: 'bg-blue-50',
    cardBorder: 'border-blue-200 hover:border-blue-400',
    resources: [
      {
        name: 'NAMI (National Alliance on Mental Illness)',
        description: 'Education, support groups, and advocacy for mental health. Excellent resources specifically for teens and young adults.',
        url: 'https://www.nami.org/Your-Journey/Teens-Young-Adults',
      },
      {
        name: 'Teen Mental Health',
        description: 'Evidence-based information about teen mental health, disorders, and treatments written in accessible language.',
        url: 'https://teenmentalhealth.org',
      },
      {
        name: 'TeensHealth',
        description: 'Reliable health information for teens including mental health, relationships, school, and body image topics.',
        url: 'https://teenshealth.org',
      },
      {
        name: 'NIMH (National Institute of Mental Health)',
        description: 'The leading federal agency for research on mental disorders. Detailed info on conditions, treatments, and clinical trials.',
        url: 'https://www.nimh.nih.gov',
      },
    ],
  },
  {
    title: 'Apps & Online Tools',
    emoji: '📱',
    color: 'text-emerald-700',
    cardBg: 'bg-emerald-50',
    cardBorder: 'border-emerald-200 hover:border-emerald-400',
    resources: [
      {
        name: 'Mindfulness for Teens',
        description: 'Free guided meditations, breathing exercises, and mindfulness tools designed specifically for teenagers.',
        url: 'https://mindfulnessforteens.com',
      },
      {
        name: 'ReachOut',
        description: 'Online mental health support for young people with articles, tools, and community forums.',
        url: 'https://au.reachout.com',
      },
      {
        name: 'SAMHSA Treatment Locator',
        description: 'Find mental health and substance use treatment facilities and programs near you. Confidential and free.',
        url: 'https://findtreatment.gov',
      },
    ],
  },
  {
    title: 'Support & Community',
    emoji: '🤝',
    color: 'text-purple-700',
    cardBg: 'bg-purple-50',
    cardBorder: 'border-purple-200 hover:border-purple-400',
    resources: [
      {
        name: 'Love Is Respect',
        description: 'Resources for teens about healthy relationships, dating abuse, and how to get help. Chat, text, or call.',
        url: 'https://www.loveisrespect.org',
      },
      {
        name: 'StopBullying.gov',
        description: 'Information about bullying, cyberbullying, and how to prevent it. Resources for teens, parents, and educators.',
        url: 'https://www.stopbullying.gov',
      },
      {
        name: 'The Trevor Project',
        description: 'Crisis intervention and suicide prevention for LGBTQ+ young people. Call, text, or chat 24/7.',
        url: 'https://www.thetrevorproject.org',
      },
      {
        name: '7 Cups',
        description: 'Free online chat with trained listeners. Anonymous, confidential emotional support whenever you need it.',
        url: 'https://www.7cups.com',
      },
    ],
  },
];

export default function Resources() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Resources
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Real, verified mental health resources for teens. Every link here goes
          to a trusted organization that can actually help.
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((category, catIndex) => (
          <section
            key={category.title}
            className="animate-fade-in"
            style={{ animationDelay: `${catIndex * 0.1}s` }}
          >
            <h2 className={`text-xl font-bold ${category.color} mb-4 flex items-center gap-2`}>
              <span className="text-2xl">{category.emoji}</span>
              {category.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {category.resources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block ${category.cardBg} border-2 ${category.cardBorder} rounded-2xl p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 group`}
                >
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-violet-700 transition flex items-center gap-2">
                    {resource.name}
                    <span className="text-gray-400 text-sm">↗</span>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
