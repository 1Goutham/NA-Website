import { Head } from "@/components/ui/Blocks";

const data: [number, number][] = [[2019, 42], [2020, 58], [2021, 64], [2022, 71], [2023, 68], [2024, 96], [2025, 112], [2026, 158]];

function LineChart() {
  const X = (i: number) => 40 + (i * 560) / (data.length - 1);
  const Y = (v: number) => 200 - (v / 170) * 150;
  const pts = data.map(([, v], i) => [X(i), Y(v)]);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    const t = 0.18;
    d += ` C${(p1[0] + (p2[0] - p0[0]) * t).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) * t).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) * t).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) * t).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return (
    <figure className="card chart-card linechart" data-inview="">
      <h3>Training &amp; speaking engagements per year</h3>
      <svg viewBox="0 0 640 236" role="img" aria-label={data.map(([y, v]) => `${y}: ${v}`).join(", ")}>
        <defs><linearGradient id="lc-grad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#5b2ee8" stopOpacity=".18" /><stop offset="1" stopColor="#5b2ee8" stopOpacity="0" /></linearGradient></defs>
        <g className="grid"><line x1="20" x2="620" y1="200" y2="200" /></g>
        <path className="area" d={`${d} L${pts.at(-1)![0]} 200 L${pts[0][0]} 200Z`} />
        <path className="line" pathLength={1} d={d} />
        {data.map(([y, v], k) => (
          <g key={y} style={{ "--k": k } as React.CSSProperties}>
            <circle className="pt" cx={pts[k][0]} cy={pts[k][1]} r={k === data.length - 1 ? 6 : 4.5} style={{ "--k": k } as React.CSSProperties} />
            <text className="val" x={pts[k][0]} y={pts[k][1] - 14} style={{ "--k": k } as React.CSSProperties}>{v}</text>
            <text x={pts[k][0]} y={224} textAnchor="middle">{y}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Trust & credibility (doc §1.5): numbers and graph reveal on scroll. */
export default function Impact() {
  return (
    <section className="section" id="impact">
      <div className="container">
        <Head pill="Our impact" title={<>Creating real opportunities through <span className="grad">AI programs.</span></>} lead="From classrooms to corporates, our programs keep creating opportunities every year." />
        <div className="stats" data-reveal="">
          <div className="stat"><strong data-count="10000" data-suffix="+">10,000+</strong><span>Learners trained</span></div>
          <div className="stat"><strong data-count="85" data-suffix="+">85+</strong><span>Universities &amp; colleges</span></div>
          <div className="stat"><strong data-count="25" data-suffix="+">25+</strong><span>Corporate &amp; government organisations</span></div>
        </div>
        <div style={{ marginTop: 28 }}><LineChart /></div>
      </div>
    </section>
  );
}
