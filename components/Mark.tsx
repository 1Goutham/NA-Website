import type React from "react";

/** The Nunnari mark: a 5×5 dot diamond with the zig-zag line. Animates in via CSS. */
export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={`mark ${className}`} viewBox="20 -2 112 112" aria-hidden="true" focusable="false">
      <g className="mark__dots">
        <circle cx="75.72" cy="2.6" r="2.6" style={{"--i": "0"} as React.CSSProperties} />
        <circle cx="88.54" cy="15.42" r="2.6" style={{"--i": "1"} as React.CSSProperties} />
        <circle cx="101.37" cy="28.24" r="2.6" style={{"--i": "2"} as React.CSSProperties} />
        <circle cx="114.19" cy="41.07" r="2.6" style={{"--i": "3"} as React.CSSProperties} />
        <circle cx="127.01" cy="53.89" r="2.6" style={{"--i": "4"} as React.CSSProperties} />
        <circle cx="62.85" cy="15.47" r="2.6" style={{"--i": "5"} as React.CSSProperties} />
        <circle cx="75.67" cy="28.29" r="2.6" style={{"--i": "6"} as React.CSSProperties} />
        <circle cx="88.5" cy="41.11" r="2.6" style={{"--i": "7"} as React.CSSProperties} />
        <circle cx="101.32" cy="53.94" r="2.6" style={{"--i": "8"} as React.CSSProperties} />
        <circle cx="114.14" cy="66.76" r="2.6" style={{"--i": "9"} as React.CSSProperties} />
        <circle cx="49.98" cy="28.34" r="2.6" style={{"--i": "10"} as React.CSSProperties} />
        <circle cx="62.8" cy="41.16" r="2.6" style={{"--i": "11"} as React.CSSProperties} />
        <circle cx="75.62" cy="53.99" r="2.6" style={{"--i": "12"} as React.CSSProperties} />
        <circle cx="88.45" cy="66.81" r="2.6" style={{"--i": "13"} as React.CSSProperties} />
        <circle cx="101.27" cy="79.63" r="2.6" style={{"--i": "14"} as React.CSSProperties} />
        <circle cx="37.11" cy="41.21" r="2.6" style={{"--i": "15"} as React.CSSProperties} />
        <circle cx="49.93" cy="54.03" r="2.6" style={{"--i": "16"} as React.CSSProperties} />
        <circle cx="62.75" cy="66.86" r="2.6" style={{"--i": "17"} as React.CSSProperties} />
        <circle cx="75.58" cy="79.68" r="2.6" style={{"--i": "18"} as React.CSSProperties} />
        <circle cx="88.4" cy="92.5" r="2.6" style={{"--i": "19"} as React.CSSProperties} />
        <circle cx="24.24" cy="54.08" r="2.6" style={{"--i": "20"} as React.CSSProperties} />
        <circle cx="37.06" cy="66.9" r="2.6" style={{"--i": "21"} as React.CSSProperties} />
        <circle cx="49.88" cy="79.73" r="2.6" style={{"--i": "22"} as React.CSSProperties} />
        <circle cx="62.71" cy="92.55" r="2.6" style={{"--i": "23"} as React.CSSProperties} />
        <circle cx="75.53" cy="105.37" r="2.6" style={{"--i": "24"} as React.CSSProperties} />
      </g>
      <polyline className="mark__line" pathLength="1" points="37.11,66.76 62.85,41.02 88.5,66.66 114.24,40.92" />
      <g className="mark__nodes">
        <circle cx="37.11" cy="66.76" r="4.46" />
        <circle cx="49.98" cy="53.89" r="4.46" />
        <circle cx="62.85" cy="41.02" r="4.46" />
        <circle cx="75.58" cy="53.79" r="4.46" />
        <circle cx="88.5" cy="66.66" r="4.46" />
        <circle cx="101.37" cy="53.79" r="4.46" />
        <circle cx="114.24" cy="40.92" r="4.46" />
      </g>
    </svg>
  );
}
