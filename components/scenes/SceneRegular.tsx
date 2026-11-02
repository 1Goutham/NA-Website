import type React from "react";

export default function SceneRegular() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.12"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
        <span className="gs__blob gs__blob--c" />
      </div>
      <div className="gs__floor" />
      <div className="gl gl--c" style={{"--x": "50%", "--y": "50%", "--d": "6"} as React.CSSProperties}>
        <div className="glass-card roadmap bob-sm" style={{"--t": "7s"} as React.CSSProperties}>
          <div className="roadmap__top">
            <div>
              <b>Your 12-week journey</b>
              <small>Live + Hands-on · Online / Offline</small>
            </div>
            <span className="ring"><span /></span>
          </div>
          <svg viewBox="0 0 300 96">
            <defs>
              <linearGradient id="rm-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#8b6cff" />
                <stop offset="1" stopColor="#5a2ef0" />
              </linearGradient>
            </defs>
            <path className="roadmap__path" d="M10 80 C 70 80, 60 30, 120 34 S 190 74, 230 50 S 280 14, 292 14" />
            <path className="roadmap__prog" pathLength="1" d="M10 80 C 70 80, 60 30, 120 34 S 190 74, 230 50 S 280 14, 292 14" />
            <circle className="roadmap__node" cx="10" cy="80" r="6" />
            <circle className="roadmap__node" cx="120" cy="34" r="6" />
            <circle className="roadmap__node" cx="230" cy="50" r="6" />
            <circle cx="292" cy="14" r="9" fill="#6c3bff" />
            <path d="M288 14l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <div className="roadmap__labels">
            <span>Learn</span>
            <span>Practice</span>
            <span>Build</span>
            <span>Impact</span>
          </div>
        </div>
      </div>
      <div className="gl" style={{"--x": "2%", "--y": "6%", "--d": "-16"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "6s"} as React.CSSProperties}>
          <span className="pulse-dot" />
          <span>
            Live session
            <small>Mentor-led</small>
          </span>
          <span className="avs" style={{"marginLeft": "6px"} as React.CSSProperties}>
            <i style={{"--g": "linear-gradient(140deg,#c4b5fd,#8b6cff)"} as React.CSSProperties} />
            <i style={{"--g": "linear-gradient(140deg,#f0abfc,#a78bfa)"} as React.CSSProperties} />
            <i style={{"--g": "linear-gradient(140deg,#a5b4fc,#6366f1)"} as React.CSSProperties} />
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "56%", "--y": "78%", "--d": "-12"} as React.CSSProperties}>
        <div className="glass-card gchip toast" style={{"--dl": "-2s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-folder" /></svg></span>
          <span>
            Project submitted
            <small>Portfolio +1</small>
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "72%", "--y": "4%", "--d": "-20"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "7s", "--dl": "-2s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-users" /></svg></span>
          <span>
            Beginners
            <small>
              L1{" "}
              &amp;
              {" "}L2
            </small>
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "6%", "--y": "76%", "--d": "24"} as React.CSSProperties}>
        <div className="gsphere bob" style={{"--s": "clamp(26px,8cqi,42px)", "--t": "6s"} as React.CSSProperties} />
      </div>
      <div className="gl" style={{"--x": "90%", "--y": "40%", "--d": "28"} as React.CSSProperties}>
        <div className="gsphere gsphere--soft bob" style={{"--s": "clamp(16px,5cqi,24px)", "--t": "5s", "--dl": "-1s"} as React.CSSProperties} />
      </div>
      <span className="spark" style={{"--x": "46%", "--y": "12%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "94%", "--y": "76%", "--dl": "1.4s"} as React.CSSProperties} />
    </div>
  );
}
