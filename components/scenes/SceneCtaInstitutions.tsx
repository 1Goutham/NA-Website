import type React from "react";

export default function SceneCtaInstitutions() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.3"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
      </div>
      <div className="gs__floor" />
      <div className="gl gl--c" style={{"--x": "50%", "--y": "46%", "--d": "8"} as React.CSSProperties}>
        <div className="glass-card bob-sm" style={{"--t": "7s"} as React.CSSProperties}>
          <ul className="mlist">
            <li className="mlist__h">Your institution's AI journey</li>
            <li>
              <span className="mlist__ck" style={{"--k": "0"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
              <span>
                Custom Programmes
                <small>Built for your students</small>
              </span>
            </li>
            <li>
              <span className="mlist__ck" style={{"--k": "1"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
              <span>
                Strategic Partnerships
                <small>Academia (MoU)</small>
              </span>
            </li>
            <li>
              <span className="mlist__ck" style={{"--k": "2"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
              <span>
                Long-term Impact
                <small>Industry-ready graduates</small>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="gl" style={{"--x": "64%", "--y": "76%", "--d": "-14"} as React.CSSProperties}>
        <div className="glass-card gchip toast">
          <span className="gchip__ic"><svg className="i"><use href="#i-clock" /></svg></span>
          <span>
            We'll connect
            <small>within 24 – 48 hrs</small>
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "2%", "--y": "6%", "--d": "-18"} as React.CSSProperties}>
        <div className="glass-card gtile bob" style={{"--t": "6s"} as React.CSSProperties}><svg className="i"><use href="#i-uni" /></svg></div>
      </div>
      <div className="gl" style={{"--x": "84%", "--y": "4%", "--d": "24"} as React.CSSProperties}>
        <div className="gsphere bob" style={{"--s": "clamp(24px,8cqi,40px)", "--t": "6s"} as React.CSSProperties} />
      </div>
      <div className="gl" style={{"--x": "8%", "--y": "78%", "--d": "20"} as React.CSSProperties}>
        <div className="gsphere gsphere--soft bob" style={{"--s": "clamp(14px,4.5cqi,22px)", "--t": "5s", "--dl": "-1s"} as React.CSSProperties} />
      </div>
      <span className="spark" style={{"--x": "40%", "--y": "6%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "92%", "--y": "50%", "--dl": "1.4s"} as React.CSSProperties} />
    </div>
  );
}
