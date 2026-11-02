import Mark from "@/components/Mark";
import type React from "react";

export default function SceneNetwork() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.1"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
        <span className="gs__blob gs__blob--c" />
      </div>
      <div className="gs__floor" />
      <svg className="wires" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wire-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#c4b5fd" />
            <stop offset="1" stopColor="#6c3bff" />
          </linearGradient>
        </defs>
        <g vectorEffect="non-scaling-stroke">
          <path d="M50 50 C 40 40, 30 26, 20 18" vectorEffect="non-scaling-stroke" />
          <path className="flow" pathLength="1" d="M50 50 C 40 40, 30 26, 20 18" vectorEffect="non-scaling-stroke" />
          <path d="M50 50 C 60 38, 70 24, 80 14" vectorEffect="non-scaling-stroke" />
          <path className="flow" pathLength="1" style={{"--dl": "-.8s"} as React.CSSProperties} d="M50 50 C 60 38, 70 24, 80 14" vectorEffect="non-scaling-stroke" />
          <path d="M50 50 C 38 58, 26 64, 16 70" vectorEffect="non-scaling-stroke" />
          <path className="flow" pathLength="1" style={{"--dl": "-1.6s"} as React.CSSProperties} d="M50 50 C 38 58, 26 64, 16 70" vectorEffect="non-scaling-stroke" />
          <path d="M50 50 C 62 62, 72 74, 80 84" vectorEffect="non-scaling-stroke" />
          <path className="flow" pathLength="1" style={{"--dl": "-2.4s"} as React.CSSProperties} d="M50 50 C 62 62, 72 74, 80 84" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      <div className="gl gl--c" style={{"--x": "50%", "--y": "50%", "--d": "8"} as React.CSSProperties}>
        <div className="bob-sm" style={{"--t": "6s", "position": "relative"} as React.CSSProperties}>
          <span className="gring" />
          <div className="glass-card hub">
            <Mark />
            <b>
              NUNNARI
              <br />
              ACADEMY
            </b>
            <small>SCHOOL OF AI</small>
          </div>
        </div>
      </div>
      <div className="gl gl--c" style={{"--x": "20%", "--y": "18%", "--d": "-16"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "6s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-uni" /></svg></span>
          Institutions
        </div>
      </div>
      <div className="gl gl--c" style={{"--x": "80%", "--y": "14%", "--d": "-20"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "7s", "--dl": "-2s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-chart" /></svg></span>
          Industry Experts
        </div>
      </div>
      <div className="gl gl--c" style={{"--x": "16%", "--y": "70%", "--d": "-12"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "6.5s", "--dl": "-1s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-target" /></svg></span>
          Real Projects
        </div>
      </div>
      <div className="gl gl--c" style={{"--x": "80%", "--y": "84%", "--d": "-18"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "5.5s", "--dl": "-3s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-briefcase" /></svg></span>
          Career Opportunities
        </div>
      </div>
      <div className="gl" style={{"--x": "88%", "--y": "44%", "--d": "26"} as React.CSSProperties}>
        <div className="gsphere bob" style={{"--s": "clamp(22px,7cqi,36px)", "--t": "6s"} as React.CSSProperties} />
      </div>
      <div className="gl" style={{"--x": "4%", "--y": "38%", "--d": "24"} as React.CSSProperties}>
        <div className="gsphere gsphere--soft bob" style={{"--s": "clamp(14px,4.5cqi,22px)", "--t": "5s", "--dl": "-2s"} as React.CSSProperties} />
      </div>
      <span className="spark" style={{"--x": "50%", "--y": "10%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "42%", "--y": "90%", "--dl": "1.2s"} as React.CSSProperties} />
    </div>
  );
}
