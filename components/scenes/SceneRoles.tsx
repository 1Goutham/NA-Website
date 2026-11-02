import type React from "react";

export default function SceneRoles() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.25"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
      </div>
      <div className="gs__floor" />
      <div className="gs__beam" style={{"bottom": "20%", "height": "56%"} as React.CSSProperties} />
      <div className="disc" style={{"bottom": "12%", "--w": "44%"} as React.CSSProperties} />
      <div className="gl gl--c" style={{"--x": "50%", "--y": "30%", "--d": "10"} as React.CSSProperties}>
        <div className="salary bob" style={{"--t": "5s"} as React.CSSProperties}>
          <strong>₹8.5 LPA</strong>
          <span>Average Salary</span>
        </div>
      </div>
      <div className="orbit3d" style={{"--oy": "62%"} as React.CSSProperties}>
        <div className="orbit3d__ring">
          <div className="orbit3d__item" style={{"--a": "0deg"} as React.CSSProperties}>
            <span className="gchip">
              <span className="gchip__ic"><svg className="i"><use href="#i-cpu" /></svg></span>
              AI Engineer
            </span>
          </div>
          <div className="orbit3d__item" style={{"--a": "60deg"} as React.CSSProperties}>
            <span className="gchip">
              <span className="gchip__ic"><svg className="i"><use href="#i-layers" /></svg></span>
              Machine Learning Engineer
            </span>
          </div>
          <div className="orbit3d__item" style={{"--a": "120deg"} as React.CSSProperties}>
            <span className="gchip">
              <span className="gchip__ic"><svg className="i"><use href="#i-chart" /></svg></span>
              ML Scientist
            </span>
          </div>
          <div className="orbit3d__item" style={{"--a": "180deg"} as React.CSSProperties}>
            <span className="gchip">
              <span className="gchip__ic"><svg className="i"><use href="#i-spark" /></svg></span>
              Generative AI Engineer
            </span>
          </div>
          <div className="orbit3d__item" style={{"--a": "240deg"} as React.CSSProperties}>
            <span className="gchip">
              <span className="gchip__ic"><svg className="i"><use href="#i-infinity" /></svg></span>
              MLOps Engineer
            </span>
          </div>
          <div className="orbit3d__item" style={{"--a": "300deg"} as React.CSSProperties}>
            <span className="gchip">
              <span className="gchip__ic"><svg className="i"><use href="#i-network" /></svg></span>
              Applied AI Engineer
            </span>
          </div>
        </div>
      </div>
      <span className="spark" style={{"--x": "30%", "--y": "16%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "72%", "--y": "12%", "--dl": "1.2s"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "86%", "--y": "60%", "--dl": "2s"} as React.CSSProperties} />
    </div>
  );
}
