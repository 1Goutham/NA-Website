import type React from "react";

export default function SceneCalendar() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.6"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" style={{"left": "25%", "width": "50%", "height": "80%", "top": "10%"} as React.CSSProperties} />
      </div>
      <div className="gl gl--c" style={{"--x": "50%", "--y": "52%", "--d": "8"} as React.CSSProperties}>
        <div className="cal bob" style={{"--t": "5s"} as React.CSSProperties}>
          <div className="glass-card cal__body">
            <div className="cal__top">
              <i />
              <i />
            </div>
            <div className="cal__page">
              <b>SAT</b>
              <small>FREE SESSION</small>
            </div>
          </div>
          <div className="cal__flip">
            <div className="cal__page">
              <b>FRI</b>
              <small>THIS WEEK</small>
            </div>
          </div>
        </div>
      </div>
      <div className="gl" style={{"--x": "10%", "--y": "20%", "--d": "20"} as React.CSSProperties}>
        <div className="gsphere gsphere--soft bob" style={{"--s": "18px", "--t": "5s"} as React.CSSProperties} />
      </div>
      <div className="gl" style={{"--x": "82%", "--y": "64%", "--d": "24"} as React.CSSProperties}>
        <div className="gsphere bob" style={{"--s": "24px", "--t": "6s", "--dl": "-1s"} as React.CSSProperties} />
      </div>
      <span className="spark" style={{"--x": "20%", "--y": "70%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "78%", "--y": "14%", "--dl": ".8s"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "90%", "--y": "40%", "--dl": "1.8s"} as React.CSSProperties} />
    </div>
  );
}
