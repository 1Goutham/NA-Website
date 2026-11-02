import type React from "react";

export default function ScenePremium() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.12"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
      </div>
      <div className="gs__floor" />
      <div className="gs__beam" style={{"left": "58%", "width": "30%", "bottom": "22%"} as React.CSSProperties} />
      <div className="gl gl--c" style={{"--x": "52%", "--y": "62%", "--d": "6"} as React.CSSProperties}>
        <div className="podium">
          <div className="pillar" style={{"--h": "clamp(60px,20cqi,110px)", "--dl": ".1s"} as React.CSSProperties} />
          <div className="pillar" style={{"--h": "clamp(90px,30cqi,165px)", "--dl": ".25s"} as React.CSSProperties} />
          <div className="pillar pillar--hl" style={{"--h": "clamp(125px,42cqi,230px)", "--dl": ".4s"} as React.CSSProperties} />
        </div>
      </div>
      <div className="gl gl--c" style={{"--x": "66%", "--y": "18%", "--d": "18"} as React.CSSProperties}>
        <div className="bob" style={{"--t": "5s"} as React.CSSProperties}>
          <svg className="crown3d" viewBox="0 0 120 96">
            <defs>
              <linearGradient id="cr-a" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c4b5fd" />
                <stop offset="1" stopColor="#5a2ef0" />
              </linearGradient>
              <linearGradient id="cr-b" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".85" />
                <stop offset=".5" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="cr-g" cx="35%" cy="30%">
                <stop offset="0" stopColor="#fff" />
                <stop offset=".4" stopColor="#ede7ff" />
                <stop offset="1" stopColor="#8b6cff" />
              </radialGradient>
            </defs>
            <path d="M10 34 L32 62 L60 18 L88 62 L110 34 L100 84 H20 Z" fill="url(#cr-a)" />
            <path d="M10 34 L32 62 L60 18 L60 84 H20 Z" fill="url(#cr-b)" />
            <rect x="18" y="80" width="84" height="12" rx="4" fill="#4b22d6" />
            <circle cx="10" cy="32" r="7" fill="url(#cr-g)" />
            <circle cx="60" cy="14" r="8" fill="url(#cr-g)" />
            <circle cx="110" cy="32" r="7" fill="url(#cr-g)" />
            <circle cx="60" cy="62" r="7" fill="url(#cr-g)" />
          </svg>
        </div>
      </div>
      <div className="gl" style={{"--x": "0%", "--y": "12%", "--d": "-16"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "6.5s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-award" /></svg></span>
          <span>
            Industry experts
            <small>Lead every session</small>
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "0%", "--y": "46%", "--d": "-10"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "7s", "--dl": "-2.5s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-briefcase" /></svg></span>
          <span>
            Board-level leaders
            <small>Mentorship</small>
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "74%", "--y": "72%", "--d": "-14"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "6s", "--dl": "-1s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-crown" /></svg></span>
          <span>
            L3+{" "}
            &amp;
            {" "}C-Suite
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "86%", "--y": "30%", "--d": "26"} as React.CSSProperties}>
        <div className="gsphere bob" style={{"--s": "clamp(22px,7cqi,36px)", "--t": "6s"} as React.CSSProperties} />
      </div>
      <span className="spark" style={{"--x": "62%", "--y": "4%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "80%", "--y": "10%", "--dl": ".8s"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "40%", "--y": "30%", "--dl": "1.6s"} as React.CSSProperties} />
    </div>
  );
}
