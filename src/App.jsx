import { useState, useEffect } from "react";
import "./App.css";

const INITIAL_CLOUDS = [
  { id: 1, x: 5,  y: 12, duration: 28, scale: 1.4, opacity: 0.95 },
  { id: 2, x: 20, y: 6,  duration: 22, scale: 1.0, opacity: 0.8  },
  { id: 3, x: 40, y: 20, duration: 35, scale: 1.7, opacity: 0.85 },
  { id: 4, x: 60, y: 8,  duration: 20, scale: 1.2, opacity: 0.7  },
  { id: 5, x: 75, y: 18, duration: 30, scale: 0.9, opacity: 0.9  },
  { id: 6, x: 88, y: 4,  duration: 25, scale: 1.5, opacity: 0.75 },
];

const CLOUD_FACTS = [
  "Cumulus clouds can weigh over 500,000 kg.",
  "A single thunderstorm can release 100+ million gallons of water.",
  "Clouds move at up to 100 mph in the jet stream.",
  "The highest clouds form at 12km above Earth.",
  "Fog is just a cloud touching the ground.",
  "Lightning strikes Earth 100 times per second.",
  "Cumulonimbus clouds can reach 20km tall.",
  "Cloud iridescence occurs when light diffracts through tiny droplets.",
];

function CloudSVG({ scale = 1, caught = false }) {
  return (
    <svg
      width={120 * scale}
      height={70 * scale}
      viewBox="0 0 120 70"
      style={{
        filter: caught
          ? "drop-shadow(0 0 18px #7ee8fa) drop-shadow(0 0 8px #0891b2)"
          : "drop-shadow(0 4px 16px rgba(0,0,0,0.18))",
        transition: "filter 0.4s",
        display: "block",
      }}
    >
      <ellipse cx="60" cy="50" rx="52" ry="22" fill={caught ? "#b2f5ff" : "white"} />
      <ellipse cx="40" cy="42" rx="28" ry="22" fill={caught ? "#cffafe" : "white"} />
      <ellipse cx="72" cy="38" rx="24" ry="20" fill={caught ? "#cffafe" : "white"} />
      <ellipse cx="55" cy="32" rx="20" ry="18" fill={caught ? "#e0feff" : "white"} />
      {caught && (
        <text x="60" y="48" textAnchor="middle" fontSize="22" fill="#0891b2">✓</text>
      )}
    </svg>
  );
}

function FloatingCloud({ cloud, caught, onCatch }) {
  const [popped, setPopped] = useState(false);

  const handleClick = () => {
    if (!caught) {
      onCatch(cloud.id);
      setPopped(true);
      setTimeout(() => setPopped(false), 900);
    }
  };

  return (
    <div
      className="floating-cloud"
      style={{
        top: `${cloud.y}%`,
        animationDuration: `${cloud.duration}s`,
        animationDelay: `-${cloud.duration * (cloud.x / 100)}s`,
        zIndex: caught ? 6 : 4,
        cursor: caught ? "default" : "pointer",
      }}
      onClick={handleClick}
    >
      {popped && (
        <div className="pop-label">Caught! ☁️</div>
      )}
      <CloudSVG scale={cloud.scale} caught={caught} />
    </div>
  );
}

function RainDrop({ x, delay, duration }) {
  return (
    <div
      className="raindrop"
      style={{
        left: `${x}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

export default function App() {
  const [caughtClouds, setCaughtClouds] = useState([]);
  const [score, setScore] = useState(0);
  const [factIdx, setFactIdx] = useState(0);
  const [showFact, setShowFact] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState("day");
  const [lightning, setLightning] = useState(false);
  const [raindrops] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 0.5 + Math.random() * 0.7,
    }))
  );
  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 65,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 4,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFact(false);
      setTimeout(() => {
        setFactIdx(i => (i + 1) % CLOUD_FACTS.length);
        setShowFact(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const allCaught = caughtClouds.length === INITIAL_CLOUDS.length;

  useEffect(() => {
    if (allCaught) {
      const flash = () => {
        setLightning(true);
        setTimeout(() => setLightning(false), 180);
      };
      flash();
      setTimeout(flash, 500);
      setTimeout(flash, 900);
    }
  }, [allCaught]);

  const handleCatch = (id) => {
    if (!caughtClouds.includes(id)) {
      setCaughtClouds(prev => [...prev, id]);
      setScore(s => s + 1);
    }
  };

  const handleReset = () => {
    setCaughtClouds([]);
    setScore(0);
  };

  return (
    <div className={`sky sky--${timeOfDay}`}>

      {/* Stars */}
      {timeOfDay === "night" && stars.map(s => (
        <div key={s.id} className="star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          opacity: s.opacity,
          animationDuration: `${s.duration}s`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}

      {/* Lightning */}
      {lightning && <div className="lightning-flash" />}

      {/* Rain */}
      {allCaught && (
        <div className="rain-layer">
          {raindrops.map(r => <RainDrop key={r.id} {...r} />)}
        </div>
      )}

      {/* Clouds */}
      {INITIAL_CLOUDS.map(cloud => (
        <FloatingCloud
          key={cloud.id}
          cloud={cloud}
          caught={caughtClouds.includes(cloud.id)}
          onCatch={handleCatch}
        />
      ))}

      {/* UI */}
      <div className="ui-layer">

        <div className="title-block">
          <h1 className={`title title--${timeOfDay}`}>
            Cloud<span className="title-accent">Catcher</span>
          </h1>
          <p className="subtitle">catch every cloud in the sky</p>
        </div>

        <div className="score-card">
          <div className="score-number">{score}</div>
          <div className="score-label">clouds caught</div>
          <div className="score-dots">
            {INITIAL_CLOUDS.map(c => (
              <span key={c.id} className={`dot ${caughtClouds.includes(c.id) ? "dot--caught" : ""}`}>
                {caughtClouds.includes(c.id) ? "☁️" : "○"}
              </span>
            ))}
          </div>
        </div>

        {allCaught && (
          <div className="win-card">
            <div style={{ fontSize: 36 }}>🌧️</div>
            <div className="win-title">You caught them all!</div>
            <div className="win-sub">The rain begins to fall...</div>
            <button className="reset-btn" onClick={handleReset}>
              Release the Clouds ↺
            </button>
          </div>
        )}

        <div className="time-toggle">
          {[["day", "☀️ Day"], ["dusk", "🌅 Dusk"], ["night", "🌙 Night"]].map(([key, label]) => (
            <button
              key={key}
              className={`time-btn ${timeOfDay === key ? "time-btn--active" : ""}`}
              onClick={() => setTimeOfDay(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={`fact-card ${showFact ? "fact-card--visible" : "fact-card--hidden"}`}>
          <span className="fact-label">Cloud Fact</span>
          <p className="fact-text">{CLOUD_FACTS[factIdx]}</p>
        </div>

        {score === 0 && (
          <p className="hint">👆 Click the clouds to catch them</p>
        )}
      </div>

      <div className={`horizon horizon--${timeOfDay}`} />
    </div>
  );
}
