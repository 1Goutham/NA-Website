import Globe from "@/components/canvas/Globe";
import type React from "react";

export default function SceneGlobe() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.2"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
      </div>
      <div className="gl" style={{"--x": "0", "--y": "0", "--w": "100%", "height": "100%", "--d": "6"} as React.CSSProperties} data-globe>
        <Globe />
      </div>
      <div className="gl" style={{"--x": "34%", "--y": "2%", "--d": "-16"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "6s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-users" /></svg></span>
          Networking
        </div>
      </div>
      <div className="gl" style={{"--x": "0%", "--y": "46%", "--d": "-12"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "7s", "--dl": "-2s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-calendar" /></svg></span>
          Events{" "}
          &amp;
          {" "}Webinars
        </div>
      </div>
      <div className="gl" style={{"--x": "62%", "--y": "80%", "--d": "-18"} as React.CSSProperties}>
        <div className="glass-card gchip bob" style={{"--t": "6.5s", "--dl": "-3s"} as React.CSSProperties}>
          <span className="gchip__ic"><svg className="i"><use href="#i-globe" /></svg></span>
          Global Opportunities
        </div>
      </div>
      <span className="spark" style={{"--x": "84%", "--y": "14%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "12%", "--y": "84%", "--dl": "1.4s"} as React.CSSProperties} />
    </div>
  );
}
