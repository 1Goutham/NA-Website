import type React from "react";

export default function SceneCode() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.1"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
        <span className="gs__blob gs__blob--c" />
      </div>
      <div className="gs__floor" />
      <div className="gl" style={{"--x": "8%", "--y": "18%", "--w": "72%", "--d": "6"} as React.CSSProperties}>
        <div className="bob-sm" style={{"--t": "7s"} as React.CSSProperties}>
          <div className="laptop">
            <div className="laptop__screen">
              <div className="laptop__display">
                <div className="code">
                  <div className="code__dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span className="code__ln" style={{"--w": "62%"} as React.CSSProperties}>
                    <b>import</b>
                    {" "}pandas{" "}
                    <b>as</b>
                    {" "}pd
                  </span>
                  <span className="code__ln" style={{"--w": "80%", "--dl": ".5s"} as React.CSSProperties}>
                    <b>from</b>
                    {" "}sklearn{" "}
                    <b>import</b>
                    {" "}
                    <em>tree</em>
                  </span>
                  <span className="code__ln" style={{"--w": "70%", "--dl": "1s"} as React.CSSProperties}>
                    df = pd.
                    <em>read_csv</em>
                    (
                    <u>"data.csv"</u>
                    )
                  </span>
                  <span className="code__ln" style={{"--w": "86%", "--dl": "1.5s"} as React.CSSProperties}>
                    model = tree.
                    <em>DecisionTree</em>
                    ()
                  </span>
                  <span className="code__ln" style={{"--w": "66%", "--dl": "2s"} as React.CSSProperties}>
                    model.
                    <em>fit</em>
                    (X, y){" "}
                    <u># 12 weeks</u>
                  </span>
                </div>
              </div>
            </div>
            <div className="laptop__base" />
          </div>
        </div>
      </div>
      <div className="gl" style={{"--x": "62%", "--y": "52%", "--d": "-14"} as React.CSSProperties}>
        <div className="glass-card bob" style={{"--t": "6.5s", "padding": "10px", "display": "grid", "gap": "6px", "minWidth": "clamp(120px,36cqi,190px)"} as React.CSSProperties}>
          <span className="gchip" style={{"padding": "4px 4px", "fontSize": "clamp(.62rem,2.3cqi,.78rem)"} as React.CSSProperties}>
            <span className="gchip__ic" style={{"width": "24px", "height": "24px"} as React.CSSProperties}><svg className="i"><use href="#i-layers" /></svg></span>
            Deep Learning
          </span>
          <span className="gchip" style={{"padding": "4px 4px", "fontSize": "clamp(.62rem,2.3cqi,.78rem)"} as React.CSSProperties}>
            <span className="gchip__ic" style={{"width": "24px", "height": "24px"} as React.CSSProperties}><svg className="i"><use href="#i-cpu" /></svg></span>
            Machine Learning
          </span>
          <span className="gchip" style={{"padding": "4px 4px", "fontSize": "clamp(.62rem,2.3cqi,.78rem)"} as React.CSSProperties}>
            <span className="gchip__ic" style={{"width": "24px", "height": "24px"} as React.CSSProperties}><svg className="i"><use href="#i-code" /></svg></span>
            Python
          </span>
        </div>
      </div>
      <div className="gl" style={{"--x": "70%", "--y": "4%", "--d": "-20"} as React.CSSProperties}>
        <div className="glass-card bob" style={{"--t": "6s", "--dl": "-2s", "padding": "12px 14px"} as React.CSSProperties}>
          <div className="mbars">
            <i style={{"--h": "44%"} as React.CSSProperties} />
            <i style={{"--h": "70%", "--dl": "-.6s"} as React.CSSProperties} />
            <i style={{"--h": "52%", "--dl": "-1.2s"} as React.CSSProperties} />
            <i style={{"--h": "88%", "--dl": "-1.8s"} as React.CSSProperties} />
            <i style={{"--h": "100%", "--dl": "-2.4s"} as React.CSSProperties} />
          </div>
        </div>
      </div>
      <div className="gl" style={{"--x": "0%", "--y": "4%", "--d": "24"} as React.CSSProperties}>
        <div className="glass-card gtile bob" style={{"--t": "5.5s"} as React.CSSProperties}><svg className="i"><use href="#i-trend" /></svg></div>
      </div>
      <div className="gl" style={{"--x": "4%", "--y": "74%", "--d": "20"} as React.CSSProperties}>
        <div className="gsphere bob" style={{"--s": "clamp(26px,8cqi,40px)", "--t": "6s", "--dl": "-1s"} as React.CSSProperties} />
      </div>
      <div className="gl" style={{"--x": "52%", "--y": "0%", "--d": "28"} as React.CSSProperties}>
        <div className="gsphere gsphere--soft bob" style={{"--s": "clamp(14px,4.5cqi,22px)", "--t": "5s"} as React.CSSProperties} />
      </div>
      <span className="spark" style={{"--x": "40%", "--y": "88%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "94%", "--y": "40%", "--dl": "1s"} as React.CSSProperties} />
    </div>
  );
}
