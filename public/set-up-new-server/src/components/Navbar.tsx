import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/resources', label: 'Resources', emoji: '📚' },
  { to: '/get-help', label: 'Get Help', emoji: '💜' },
  { to: '/breathe', label: 'Breathe', emoji: '🫧' },
  { to: '/tools', label: 'Tools', emoji: '🧰' },
  { to: '/fluffy', label: 'Fluffy', emoji: '☁️' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-purple-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-violet-700 hover:text-violet-800 transition"
          >
            <span className="text-2xl">☁️</span>
            <span className="tracking-tight">CloudCatcher</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.to
                    ? 'bg-violet-100 text-violet-700 shadow-sm'
                    : 'text-gray-600 hover:text-violet-600 hover:bg-violet-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-violet-50 transition text-xl"
            aria-label="Toggle menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden pb-3 border-t border-purple-50 animate-fade-in">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition mt-1 ${
                  location.pathname === link.to
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-gray-600 hover:text-violet-600 hover:bg-violet-50'
                }`}
              >
                <span>{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
