import type React from "react";

export default function SceneDashboard() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.1"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
        <span className="gs__blob gs__blob--c" />
      </div>
      <div className="gs__floor" />
      <div className="gl gl--c" style={{"--x": "50%", "--y": "48%", "--d": "6"} as React.CSSProperties}>
        <div className="glass-card dash bob-sm" style={{"--t": "7s"} as React.CSSProperties}>
          <div className="dash__head">
            <b>
              From Skills to Impact
              <small>Team AI programme</small>
            </b>
            <span className="avs">
              <i style={{"--g": "linear-gradient(140deg,#c4b5fd,#8b6cff)"} as React.CSSProperties} />
              <i style={{"--g": "linear-gradient(140deg,#f0abfc,#a78bfa)"} as React.CSSProperties} />
              <i style={{"--g": "linear-gradient(140deg,#a5b4fc,#6366f1)"} as React.CSSProperties} />
              <i style={{"--g": "linear-gradient(140deg,#ddd6fe,#7c3aed)"} as React.CSSProperties} />
            </span>
          </div>
          <div className="steps4">
            <span style={{"--k": "0"} as React.CSSProperties}>
              <svg className="i"><use href="#i-box" /></svg>
              AI Fundamentals
            </span>
            <span style={{"--k": "1"} as React.CSSProperties}>
              <svg className="i"><use href="#i-code" /></svg>
              Hands-on Projects
            </span>
            <span style={{"--k": "2"} as React.CSSProperties}>
              <svg className="i"><use href="#i-chart" /></svg>
              Real Business Use Cases
            </span>
            <span style={{"--k": "3"} as React.CSSProperties}>
              <svg className="i"><use href="#i-target" /></svg>
              Measurable Outcomes
            </span>
          </div>
          <svg viewBox="0 0 300 80">
            <defs>
              <linearGradient id="dl-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#c4b5fd" />
                <stop offset="1" stopColor="#5a2ef0" />
              </linearGradient>
              <linearGradient id="da-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#8b6cff" stopOpacity=".3" />
                <stop offset="1" stopColor="#8b6cff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g stroke="#ede7ff"><path d="M0 79h300M0 52h300M0 26h300" /></g>
            <path className="dash__area" d="M0 70 C 40 66, 60 60, 90 56 S 150 48, 180 36 S 250 22, 300 8 V80 H0Z" />
            <path className="dash__line" pathLength="1" d="M0 70 C 40 66, 60 60, 90 56 S 150 48, 180 36 S 250 22, 300 8" />
          </svg>
        </div>
      </div>
      <div className="gl" style={{"--x": "0%", "--y": "4%", "--d": "-18"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "6s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-users" /></svg></span>
          <span>
            Expert-led training
            <small>Custom paths</small>
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "62%", "--y": "80%", "--d": "-14"} as React.CSSProperties}>
        <div className="glass-card gchip toast" style={{"--dl": "-1s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-trend" /></svg></span>
          <span>
            Business impact
            <small>Measured</small>
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "88%", "--y": "6%", "--d": "26"} as React.CSSProperties}>
        <div className="gsphere bob" style={{"--s": "clamp(22px,7cqi,36px)", "--t": "6s"} as React.CSSProperties} />
      </div>
      <div className="gl" style={{"--x": "2%", "--y": "84%", "--d": "22"} as React.CSSProperties}>
        <div className="gsphere gsphere--soft bob" style={{"--s": "clamp(16px,5cqi,24px)", "--t": "5s", "--dl": "-1s"} as React.CSSProperties} />
      </div>
      <span className="spark" style={{"--x": "46%", "--y": "6%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "96%", "--y": "60%", "--dl": "1.6s"} as React.CSSProperties} />
    </div>
  );
}
