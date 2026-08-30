import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState('enter'); // enter | hold | exit

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('exit'), 2200);
    const doneTimer = setTimeout(() => onFinish(), 3000);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-root splash-${phase}`}>
      <div className="splash-glow" />

      <div className="splash-icon-wrap">
        <svg
          className="splash-svg"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          {/* Radial spokes */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x2 = 100 + 90 * Math.sin(rad);
            const y2 = 100 - 90 * Math.cos(rad);
            return (
              <line
                key={i}
                x1="100" y1="100"
                x2={x2} y2={y2}
                stroke="#111"
                strokeWidth="1"
                className="spoke"
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            );
          })}

          {/* Concentric web rings */}
          {[20, 38, 56, 74, 90].map((r, ri) => (
            <polygon
              key={ri}
              points={[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
                .map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return `${100 + r * Math.sin(rad)},${100 - r * Math.cos(rad)}`;
                })
                .join(' ')}
              stroke="#111"
              strokeWidth="0.9"
              fill="none"
              className="ring"
              style={{ animationDelay: `${0.6 + ri * 0.1}s` }}
            />
          ))}

          {/* Abdomen */}
          <ellipse cx="100" cy="110" rx="13" ry="16" fill="#0a0a0a" className="spider-part" />
          {/* Red hourglass */}
          <path d="M96 104 L104 104 L101 111 L104 118 L96 118 L99 111 Z" fill="#e00" className="spider-part" />
          {/* Thorax */}
          <ellipse cx="100" cy="92" rx="10" ry="10" fill="#111" className="spider-part" />
          {/* Eyes */}
          <circle cx="96" cy="88" r="2.5" fill="#fff" className="spider-part" />
          <circle cx="104" cy="88" r="2.5" fill="#fff" className="spider-part" />
          <circle cx="96.5" cy="88.5" r="1.2" fill="#e00" className="spider-part" />
          <circle cx="104.5" cy="88.5" r="1.2" fill="#e00" className="spider-part" />

          {/* Legs LEFT */}
          <path d="M91 88 Q75 80 65 70" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" className="leg leg-l1" />
          <path d="M91 91 Q74 86 63 82" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" className="leg leg-l2" />
          <path d="M91 95 Q74 95 63 98" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" className="leg leg-l3" />
          <path d="M91 99 Q75 105 66 115" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" className="leg leg-l4" />
          {/* Legs RIGHT */}
          <path d="M109 88 Q125 80 135 70" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" className="leg leg-r1" />
          <path d="M109 91 Q126 86 137 82" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" className="leg leg-r2" />
          <path d="M109 95 Q126 95 137 98" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" className="leg leg-r3" />
          <path d="M109 99 Q125 105 134 115" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" className="leg leg-r4" />

          {/* Thread */}
          <line x1="100" y1="80" x2="100" y2="0" stroke="#333" strokeWidth="0.8" strokeDasharray="4 3" className="thread" />
        </svg>

        <div className="splash-pulse-ring" />
      </div>

      <div className="splash-brand">
        <span className="splash-brand-sp">sp</span>
        <span className="splash-brand-aider">aider</span>
      </div>

      <div className="splash-bar-wrap">
        <div className="splash-bar" />
      </div>
    </div>
  );
}
