export function CircuitWires() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 550 520"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="wire-copper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b87333" />
          <stop offset="50%" stopColor="#d4a843" />
          <stop offset="100%" stopColor="#b87333" />
        </linearGradient>
        <linearGradient id="wire-solder" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c0c0c0" />
          <stop offset="50%" stopColor="#e8e8e8" />
          <stop offset="100%" stopColor="#c0c0c0" />
        </linearGradient>
      </defs>

      {/* Antenna (top-left): API key ↔ top bar */}
      <path
        d="M 20 30 L 20 20 L 30 10 M 20 20 L 30 30 M 20 20 L 40 10 M 20 20 L 40 30"
        stroke="url(#wire-copper)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <text x="12" y="34" fill="#b87333" fontSize="6" fontFamily="monospace" opacity="0.6">
        ANT
      </text>
      <line x1="25" y1="44" x2="120" y2="44" stroke="#b87333" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />

      {/* Ground (bottom-left) */}
      <line x1="20" y1="480" x2="60" y2="480" stroke="#c0c0c0" strokeWidth="1" opacity="0.35" />
      <line x1="10" y1="490" x2="70" y2="490" stroke="#c0c0c0" strokeWidth="1" opacity="0.25" />
      <text x="8" y="476" fill="#c0c0c0" fontSize="6" fontFamily="monospace" opacity="0.5">
        GND
      </text>

      {/* Wire from prompt area → diode → icon preview */}
      <path
        d="M 275 400 L 275 370 L 310 370 L 310 350"
        stroke="url(#wire-copper)"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* Diode symbol (between prompt and icon) */}
      <polygon points="310,340 295,355 310,355" fill="none" stroke="#e8734a" strokeWidth="1.5" />
      <line x1="310" y1="355" x2="310" y2="370" stroke="#e8734a" strokeWidth="1.5" />
      <line x1="295" y1="355" x2="295" y2="370" stroke="#e8734a" strokeWidth="1.5" />
      <text x="280" y="348" fill="#e8734a" fontSize="5" fontFamily="monospace" opacity="0.5">
        D1
      </text>

      {/* Wire from icon → Save button */}
      <path
        d="M 430 210 L 460 210 L 500 210 L 500 30 L 530 30"
        stroke="url(#wire-solder)"
        strokeWidth="1"
        fill="none"
        strokeLinejoin="round"
        opacity="0.35"
      />

      {/* Junction dots */}
      <circle cx="275" cy="400" r="2" fill="#b87333" opacity="0.6" />
      <circle cx="310" cy="350" r="2" fill="#b87333" opacity="0.6" />
      <circle cx="430" cy="210" r="2" fill="#c0c0c0" opacity="0.4" />

      {/* Annotation: wire gauge text */}
      <text x="260" y="385" fill="#b87333" fontSize="5" fontFamily="monospace" opacity="0.35">
        0.8φ
      </text>
      <text x="440" y="100" fill="#c0c0c0" fontSize="5" fontFamily="monospace" opacity="0.35">
        0.6φ
      </text>

      {/* Capacitor symbol (bottom, by VU meter area) */}
      <line x1="160" y1="460" x2="160" y2="475" stroke="#d4a843" strokeWidth="1.5" opacity="0.4" />
      <line x1="145" y1="460" x2="145" y2="475" stroke="#d4a843" strokeWidth="1.5" opacity="0.4" />
      <text x="133" y="472" fill="#d4a843" fontSize="5" fontFamily="monospace" opacity="0.4">
        C1
      </text>

      {/* Resistor zigzag (decorative) */}
      <polyline
        points="490,440 500,445 510,435 520,445 530,435 540,440"
        fill="none"
        stroke="#d4a843"
        strokeWidth="0.8"
        opacity="0.25"
      />
      <text x="492" y="438" fill="#d4a843" fontSize="5" fontFamily="monospace" opacity="0.3">
        R1
      </text>

      {/* LC parallel tank circuit (decorative, bottom-right) */}
      <line x1="490" y1="470" x2="530" y2="470" stroke="#d4a843" strokeWidth="1" opacity="0.3" />
      <path d="M 495 470 Q 510 460 525 470" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.3" />
      <line x1="510" y1="460" x2="510" y2="455" stroke="#d4a843" strokeWidth="0.8" opacity="0.3" />
      <line x1="510" y1="455" x2="506" y2="455" stroke="#d4a843" strokeWidth="0.8" opacity="0.3" />
      <line x1="506" y1="455" x2="506" y2="450" stroke="#d4a843" strokeWidth="0.5" opacity="0.2" />
      <line x1="506" y1="450" x2="514" y2="450" stroke="#d4a843" strokeWidth="0.5" opacity="0.2" />
      <line x1="514" y1="450" x2="514" y2="455" stroke="#d4a843" strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}
