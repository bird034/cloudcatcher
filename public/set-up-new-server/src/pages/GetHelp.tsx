export default function GetHelp() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Get Help
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          If you need help right now, you're in the right place. Everything here
          is free and confidential.
        </p>
      </div>

      {/* Section 1: Crisis */}
      <section className="mb-10 animate-fade-in">
        <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
          <span className="text-2xl">🚨</span>
          If you are in crisis right now
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a
            href="tel:988"
            className="block bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-red-400 hover:-translate-y-1 transition-all"
          >
            <div className="text-4xl mb-3">📞</div>
            <h3 className="font-bold text-red-900 text-lg mb-1">Call or Text 988</h3>
            <p className="text-red-700 text-sm">
              Suicide & Crisis Lifeline
            </p>
            <p className="text-red-600 text-xs mt-2">
              Free • Confidential • 24/7
            </p>
          </a>

          <a
            href="sms:741741&body=HOME"
            className="block bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all"
          >
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-bold text-blue-900 text-lg mb-1">
              Text HOME to 741741
            </h3>
            <p className="text-blue-700 text-sm">Crisis Text Line</p>
            <p className="text-blue-600 text-xs mt-2">
              Free • Confidential • 24/7
            </p>
          </a>

          <a
            href="tel:911"
            className="block bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-orange-400 hover:-translate-y-1 transition-all"
          >
            <div className="text-4xl mb-3">🚑</div>
            <h3 className="font-bold text-orange-900 text-lg mb-1">Call 911</h3>
            <p className="text-orange-700 text-sm">
              If you are in immediate danger
            </p>
            <p className="text-orange-600 text-xs mt-2">
              Emergency Services
            </p>
          </a>
        </div>
      </section>

      {/* Section 2: Talk to Someone */}
      <section className="mb-10 animate-fade-in-delay-1">
        <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <span className="text-2xl">🗣️</span>
          Talk to someone
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="tel:211"
            className="block bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-violet-300 hover:-translate-y-0.5 transition-all group"
          >
            <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-violet-700 transition">
              📞 Dial 211
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Connect with local resources — mental health services, support
              groups, and community programs near you.
            </p>
          </a>

          <a
            href="https://findtreatment.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-violet-300 hover:-translate-y-0.5 transition-all group"
          >
            <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-violet-700 transition">
              🔍 SAMHSA Treatment Locator
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Find mental health treatment facilities, programs, and providers
              near you. Free and confidential.
            </p>
          </a>

          <div className="sm:col-span-2 bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-3">
              👥 Trusted Adults Who Can Help
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { emoji: '👩‍🏫', label: 'School counselor' },
                { emoji: '👨‍⚕️', label: 'Doctor' },
                { emoji: '👩‍👦', label: 'Parent or guardian' },
                { emoji: '🧑‍🤝‍🧑', label: 'Coach or mentor' },
                { emoji: '👨‍🏫', label: 'Teacher you trust' },
                { emoji: '🙏', label: 'Religious leader' },
                { emoji: '👨‍👩‍👧', label: 'Relative you trust' },
                { emoji: '🏥', label: 'School nurse' },
              ].map((adult) => (
                <div
                  key={adult.label}
                  className="bg-violet-50 rounded-xl p-3 text-center text-sm"
                >
                  <div className="text-xl mb-1">{adult.emoji}</div>
                  <div className="text-violet-800 font-medium">
                    {adult.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: You Are Not Alone */}
      <section className="animate-fade-in-delay-2">
        <div className="bg-gradient-to-br from-violet-100 via-purple-50 to-pink-50 border-2 border-violet-200 rounded-3xl p-8 sm:p-10 text-center">
          <div className="text-5xl mb-4">💜</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-4">
            You are not alone
          </h2>
          <div className="max-w-lg mx-auto space-y-4 text-purple-800 leading-relaxed">
            <p>
              Reaching out for help isn't a sign of weakness — it's one of the
              bravest things you can do.
            </p>
            <p>
              Millions of teens deal with mental health challenges every year.
              You are not broken. You are not "too much." You are a person going
              through something hard, and you deserve support.
            </p>
            <p className="font-bold text-lg text-purple-900">
              It's okay to not be okay. It's not okay to go through it alone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
