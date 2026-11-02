import type React from "react";

export default function SceneCtaCorporates() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.3"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
      </div>
      <div className="gs__floor" />
      <div className="gl gl--c" style={{"--x": "50%", "--y": "46%", "--d": "8"} as React.CSSProperties}>
        <div className="glass-card bob-sm team" style={{"--t": "7s"} as React.CSSProperties}>
          <p className="mlist__h">Upskill your teams</p>
          <div className="team__row">
            <span className="avs"><i style={{"--g": "linear-gradient(140deg,#c4b5fd,#8b6cff)"} as React.CSSProperties} /></span>
            <span className="team__bar"><i style={{"--to": ".92"} as React.CSSProperties} /></span>
            <b>Engineering</b>
          </div>
          <div className="team__row">
            <span className="avs"><i style={{"--g": "linear-gradient(140deg,#f0abfc,#a78bfa)"} as React.CSSProperties} /></span>
            <span className="team__bar"><i style={{"--to": ".78", "--dl": ".4s"} as React.CSSProperties} /></span>
            <b>Product</b>
          </div>
          <div className="team__row">
            <span className="avs"><i style={{"--g": "linear-gradient(140deg,#a5b4fc,#6366f1)"} as React.CSSProperties} /></span>
            <span className="team__bar"><i style={{"--to": ".86", "--dl": ".8s"} as React.CSSProperties} /></span>
            <b>Analytics</b>
          </div>
        </div>
      </div>
      <div className="gl" style={{"--x": "0%", "--y": "4%", "--d": "-18"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "6s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-box" /></svg></span>
          Custom Training Programmes
        </div>
      </div>
      <div className="gl" style={{"--x": "56%", "--y": "82%", "--d": "-14"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "7s", "--dl": "-2s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-chart" /></svg></span>
          Drive Business Impact
        </div>
      </div>
      <div className="gl" style={{"--x": "86%", "--y": "8%", "--d": "24"} as React.CSSProperties}>
        <div className="gsphere bob" style={{"--s": "clamp(24px,8cqi,40px)", "--t": "6s"} as React.CSSProperties} />
      </div>
      <span className="spark" style={{"--x": "40%", "--y": "92%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "94%", "--y": "46%", "--dl": "1.2s"} as React.CSSProperties} />
    </div>
  );
}
