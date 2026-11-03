import type React from "react";

export default function SceneStairs() {
  return (
    <div className="gs" data-scene style={{"--ar": "1.35"} as React.CSSProperties} aria-hidden="true">
      <div className="gs__bg">
        <span className="gs__blob gs__blob--a" />
        <span className="gs__blob gs__blob--b" />
      </div>
      <div className="stairs3d gl" style={{"--x": "0", "--y": "0", "--w": "100%", "height": "100%", "--d": "6"} as React.CSSProperties}>
        <svg viewBox="0 0 460 340">
          <defs>
            <linearGradient id="st-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#ede7ff" />
            </linearGradient>
            <linearGradient id="st-front" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d7cbff" />
              <stop offset="1" stopColor="#b9a8ff" />
            </linearGradient>
            <linearGradient id="st-side" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#7c5cf5" />
            </linearGradient>
            <linearGradient id="st-hl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8b6cff" />
              <stop offset="1" stopColor="#5a2ef0" />
            </linearGradient>
            <radialGradient id="st-ball" cx="35%" cy="30%">
              <stop offset="0" stopColor="#fff" />
              <stop offset=".3" stopColor="#c4b5fd" />
              <stop offset="1" stopColor="#4b22d6" />
            </radialGradient>
            <filter id="st-sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#4c2ebe" floodOpacity=".35" /></filter>
          </defs>
          <ellipse cx="240" cy="300" rx="210" ry="22" fill="#e5dcff" opacity=".8" />
          <g>
            <g>
              <path d="M30 270h80v30H30z" fill="url(#st-front)" />
              <path d="M30 270l20-14h80l-20 14z" fill="url(#st-top)" />
              <path d="M110 270l20-14v30l-20 14z" fill="url(#st-side)" />
            </g>
            <g>
              <path d="M110 240h80v60h-80z" fill="url(#st-front)" />
              <path d="M110 240l20-14h80l-20 14z" fill="url(#st-top)" />
              <path d="M190 240l20-14v60l-20 14z" fill="url(#st-side)" />
            </g>
            <g>
              <path d="M190 206h80v94h-80z" fill="url(#st-front)" />
              <path d="M190 206l20-14h80l-20 14z" fill="url(#st-top)" />
              <path d="M270 206l20-14v94l-20 14z" fill="url(#st-side)" />
            </g>
            <g>
              <path d="M270 168h90v132h-90z" fill="url(#st-hl)" />
              <path d="M270 168l20-14h90l-20 14z" fill="#c4b5fd" />
              <path d="M360 168l20-14v132l-20 14z" fill="#4b22d6" />
            </g>
          </g>
          <g fontFamily="Inter,sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
            <text x="70" y="290" fill="#5a2ef0">Learn</text>
            <text x="150" y="276" fill="#5a2ef0">Build</text>
            <text x="230" y="258" fill="#5a2ef0">Grow</text>
            <text x="315" y="240" fill="#fff">Get Hired</text>
          </g>
          <g className="hop" style={{"offsetPath": "path('M 80 254 C 80 236 150 226 160 224 C 160 206 230 194 240 190 C 240 172 310 160 322 152')"} as React.CSSProperties}><circle r="11" fill="url(#st-ball)" /></g>
          <g transform="translate(300 64)">
            <rect width="56" height="56" rx="16" fill="#fff" stroke="#ede7ff" />
            <path d="M18 26h20v14H18zM23 26v-4h10v4" fill="none" stroke="#6c3bff" strokeWidth="2.4" strokeLinejoin="round" />
          </g>
          <path d="M328 124v24" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="3 5" />
        </svg>
      </div>
      <span className="spark" style={{"--x": "84%", "--y": "8%"} as React.CSSProperties} />
      <span className="spark" style={{"--x": "20%", "--y": "40%", "--dl": "1.4s"} as React.CSSProperties} />
    </div>
  );
}
