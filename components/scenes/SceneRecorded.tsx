import type React from "react";

export default function SceneRecorded() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.12"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
        <span className="gs__blob gs__blob--c" />
      </div>
      <div className="gs__floor" />
      <div className="gl" style={{"--x": "6%", "--y": "16%", "--w": "70%", "--d": "6"} as React.CSSProperties}>
        <div className="bob-sm" style={{"--t": "7s"} as React.CSSProperties}>
          <div className="laptop">
            <div className="laptop__screen">
              <div className="laptop__display">
                <div className="player">
                  <div className="player__art">
                    <svg viewBox="0 0 320 170" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <radialGradient id="pl-n">
                          <stop offset="0" stopColor="#fff" />
                          <stop offset="1" stopColor="#a78bfa" />
                        </radialGradient>
                      </defs>
                      <g stroke="rgb(196 181 253 / .35)" strokeWidth="1" fill="none">
                        <path d="M30 120 L80 70 L140 100 L200 50 L260 90 L300 40" />
                        <path d="M30 40 L80 70 L140 30 L200 50 L260 20" />
                        <path d="M80 70 L80 140 L140 100 L200 140 L260 90" />
                      </g>
                      <g fill="url(#pl-n)">
                        <circle cx="80" cy="70" r="4" />
                        <circle cx="140" cy="100" r="3" />
                        <circle cx="200" cy="50" r="4" />
                        <circle cx="260" cy="90" r="3" />
                        <circle cx="140" cy="30" r="2.5" />
                        <circle cx="200" cy="140" r="2.5" />
                        <circle cx="300" cy="40" r="2.5" />
                        <circle cx="30" cy="120" r="2.5" />
                      </g>
                      <text x="18" y="26" fill="#ede7ff" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" letterSpacing="1.5">MODULE 01 · AI BASICS</text>
                    </svg>
                    <span className="player__play" />
                  </div>
                  <div className="player__bar">
                    <span>12:40</span>
                    <span className="player__track"><i /></span>
                    <span>38:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="laptop__base" />
          </div>
        </div>
      </div>
      <div className="gl" style={{"--x": "58%", "--y": "4%", "--d": "-14"} as React.CSSProperties}>
        <div className="glass-card bob" style={{"--t": "6.5s"} as React.CSSProperties}>
          <ul className="mlist">
            <li className="mlist__h">Your path</li>
            <li>
              <span className="mlist__ck" style={{"--k": "0"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
              <span>
                AI basics
                <small>Self-paced</small>
              </span>
            </li>
            <li>
              <span className="mlist__ck" style={{"--k": "1"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
              <span>
                Projects
                <small>Hands-on</small>
              </span>
            </li>
            <li>
              <span className="mlist__ck" style={{"--k": "2"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
              <span>
                Real examples
                <small>Portfolio</small>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="gl" style={{"--x": "0%", "--y": "62%", "--d": "-18"} as React.CSSProperties}>
        <div className="glass-card bob" style={{"--t": "5.5s", "--dl": "-2s", "padding": "12px 14px"} as React.CSSProperties}>
          <div className="mbars">
            <i style={{"--h": "40%"} as React.CSSProperties} />
            <i style={{"--h": "62%", "--dl": "-.6s"} as React.CSSProperties} />
            <i style={{"--h": "48%", "--dl": "-1.2s"} as React.CSSProperties} />
            <i style={{"--h": "84%", "--dl": "-1.8s"} as React.CSSProperties} />
            <i style={{"--h": "100%", "--dl": "-2.4s"} as React.CSSProperties} />
          </div>
        </div>
      </div>
      <div className="gl" style={{"--x": "58%", "--y": "68%", "--d": "-10"} as React.CSSProperties}>
        <div className="glass-card gchip toast" style={{"--dl": "-1s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-award" /></svg></span>
          <span>
            Certificate unlocked
            <small>Completion award</small>
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "84%", "--y": "46%", "--d": "22"} as React.CSSProperties}>
        <div className="gsphere bob" style={{"--s": "clamp(28px,9cqi,46px)", "--t": "7s"} as React.CSSProperties} />
      </div>
      <div className="gl" style={{"--x": "2%", "--y": "6%", "--d": "26"} as React.CSSProperties}>
        <div className="glass-card gtile bob" style={{"--t": "6s", "--dl": "-3s"} as React.CSSProperties}><svg className="i"><use href="#i-code" /></svg></div>
      </div>
      <div className="gl" style={{"--x": "44%", "--y": "-2%", "--d": "30"} as React.CSSProperties}>
        <div className="gsphere gsphere--soft bob" style={{"--s": "clamp(16px,5cqi,24px)", "--t": "5s"} as React.CSSProperties} />
      </div>
      <span className="spark" style={{"--x": "52%", "--y": "84%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "92%", "--y": "20%", "--dl": "1.2s"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "22%", "--y": "2%", "--dl": "2s"} as React.CSSProperties} />
    </div>
  );
}
