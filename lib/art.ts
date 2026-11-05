/** Line-art library (320×200 viewBox). One visual language for the whole site. */
const workshopArts: Record<string, string> = {
  robot: `
    <g class="ln-soft"><path d="M40 170h240"/><ellipse cx="160" cy="170" rx="70" ry="10"/></g>
    <g class="ln"><rect x="128" y="150" width="64" height="16" rx="4"/>
      <g style="transform-origin:160px 150px;animation:arm 5s ease-in-out infinite">
        <path d="M160 150V112"/><circle cx="160" cy="112" r="6" class="fill-soft"/>
        <g style="transform-origin:160px 112px;animation:arm2 5s ease-in-out infinite">
          <path d="M160 112l38-24"/><circle cx="198" cy="88" r="5" class="fill-soft"/>
          <path d="M198 88l12 10m-12-10 4 15"/>
        </g>
      </g>
    </g>
    <g class="float" style="--d:-1s"><rect class="ln fill-soft" x="44" y="40" width="44" height="34" rx="8"/><path class="ln" d="M56 64l8-10 8 6 8-12"/></g>
    <g class="float" style="--d:-3s"><rect class="ln fill-soft" x="236" y="34" width="44" height="34" rx="8"/><circle class="ln" cx="258" cy="51" r="7"/><path class="ln" d="M258 44v-4m0 22v-4m-7-7h-4m22 0h-4"/></g>
    <g class="float" style="--d:-2s"><rect class="ln fill-soft" x="238" y="100" width="40" height="30" rx="8"/><path class="ln" d="M248 122v-8h20v8m-24-8 14-6 14 6"/></g>
    <style>@keyframes arm{50%{transform:rotate(-8deg)}}@keyframes arm2{50%{transform:rotate(14deg)}}</style>`,
  store: `
    <g class="ln-soft"><path d="M40 172h240"/></g>
    <g class="ln"><path d="M104 172V110h112v62"/><path d="M96 110l10-22h108l10 22z" class="fill-soft"/>
      <path d="M118 88l-4 22m24-22-2 22m24-22v22m22-22 2 22m22-22 4 22"/>
      <rect x="120" y="128" width="36" height="44" rx="3"/><rect x="170" y="128" width="32" height="24" rx="3"/></g>
    <g class="float"><circle class="ln fill-soft" cx="160" cy="58" r="20"/><text x="160" y="64" text-anchor="middle" fill="#fff" font-size="15" font-weight="600" font-family="Inter,sans-serif">AI</text>
      <circle class="ln pulse" cx="160" cy="58" r="20" style="fill:none"/></g>
    <g class="float" style="--d:-2s"><rect class="ln fill-soft" x="236" y="54" width="46" height="38" rx="8"/>
      <rect class="fill-p grow" x="246" y="74" width="5" height="10" style="--d:-.4s"/><rect class="fill-p grow" x="255" y="68" width="5" height="16" style="--d:-.8s"/><rect class="fill-p grow" x="264" y="62" width="5" height="22" style="--d:-1.2s"/></g>
    <g class="float" style="--d:-4s"><rect class="ln fill-soft" x="38" y="60" width="46" height="38" rx="8"/><path class="ln" d="M48 70h4l5 16h16l4-11H54"/><circle class="ln" cx="59" cy="91" r="1.5"/><circle class="ln" cx="71" cy="91" r="1.5"/></g>`,
  agent: `
    <g class="ln"><rect x="96" y="70" width="128" height="80" rx="8" class="fill-soft"/><path d="M84 150h152l-10 14H94z"/>
      <path class="type" d="M110 90h50" style="--d:0s"/><path class="type" d="M110 104h76" style="--d:.5s"/><path class="type" d="M118 118h44" style="--d:1s"/><path class="type" d="M110 132h62" style="--d:1.5s"/>
      <rect class="blink fill-p" x="176" y="128" width="6" height="8" style="stroke:none"/></g>
    <g class="float" style="--d:-1s"><rect class="ln fill-soft" x="40" y="40" width="40" height="40" rx="10"/><circle class="ln" cx="60" cy="60" r="9"/><path class="ln" d="M60 51v18m-9-9h18"/></g>
    <g class="float" style="--d:-3s"><rect class="ln fill-soft" x="244" y="34" width="40" height="40" rx="10"/><path class="ln" d="M254 46l10-5 10 5v12l-10 5-10-5z"/></g>
    <g class="float" style="--d:-2s"><rect class="ln fill-soft" x="250" y="96" width="36" height="36" rx="10"/><ellipse class="ln" cx="268" cy="106" rx="9" ry="3"/><path class="ln" d="M259 106v14c0 2 4 3 9 3s9-1 9-3v-14"/></g>
    <path class="ln-soft dash" d="M80 60c20 0 20 20 40 14M244 54c-20 0-24 14-40 16"/>`,
  graph: `
    <g class="ln"><text x="90" y="44" text-anchor="middle" fill="#e5dcff" font-size="15" font-weight="600" letter-spacing="2" font-family="Inter,sans-serif">LOOP</text>
      <text x="230" y="44" text-anchor="middle" fill="#e5dcff" font-size="15" font-weight="600" letter-spacing="2" font-family="Inter,sans-serif">GRAPH</text>
      <g class="spin" style="animation-duration:6s"><path d="M90 78a32 32 0 1 1-30 21" /><path d="M54 92l6 8 8-5"/></g>
      <text x="160" y="118" text-anchor="middle" fill="#bda7ff" font-size="14" font-weight="600" font-family="Inter,sans-serif">VS</text>
      <path d="M230 80l-26 26m26-26 26 26m-26-26v44m-26-18 26 18 26-18"/>
      <circle class="fill-soft" cx="230" cy="80" r="7"/><circle class="fill-soft" cx="204" cy="106" r="7"/><circle class="fill-soft" cx="256" cy="106" r="7"/><circle class="fill-soft" cx="230" cy="124" r="7"/>
      <circle class="pulse" cx="230" cy="80" r="7" style="fill:none"/><circle class="pulse" cx="230" cy="124" r="7" style="fill:none;--d:1.3s"/></g>`,
  agentic: `
    <g class="ln"><rect x="40" y="76" width="56" height="48" rx="10" class="fill-soft"/><path d="M54 92h28M54 102h20M54 112h24"/>
      <circle cx="160" cy="100" r="26" class="fill-soft"/><path d="M150 92c0-6 20-6 20 0 0 6-10 6-10 12m0 6v1"/>
      <rect x="224" y="76" width="56" height="48" rx="10" class="fill-soft"/><path d="M240 100l8 8 16-16"/>
      <circle class="pulse" cx="160" cy="100" r="26" style="fill:none"/></g>
    <path class="ln dash" d="M98 100h34M188 100h34"/>
    <g fill="#e5dcff" font-size="10" font-family="Inter,sans-serif" text-anchor="middle" letter-spacing="1.5"><text x="68" y="146">GENERATE</text><text x="160" y="146">REASON</text><text x="252" y="146">ACT</text></g>`,
  stack: `
    <g class="ln">
      <g class="float" style="--d:0s"><path class="fill-soft" d="M160 52l70 26-70 26-70-26z"/></g>
      <g class="float" style="--d:-.6s"><path d="M90 102l70 26 70-26" /></g>
      <g class="float" style="--d:-1.2s"><path d="M90 126l70 26 70-26"/></g>
    </g>
    <g fill="#e5dcff" font-size="9" font-family="Inter,sans-serif" letter-spacing="1.5"><text x="236" y="80">UI</text><text x="236" y="106">API</text><text x="236" y="130">DATA</text></g>
    <g class="float" style="--d:-2s"><circle class="ln fill-soft" cx="62" cy="52" r="16"/><path class="ln" d="M62 44v16m-8-8h16"/><circle class="ln pulse" cx="62" cy="52" r="16" style="fill:none"/></g>`,
};

/* Programmes, partners and community — same 320×200 line language as the workshop art. */
const pageArts: Record<string, string> = {
  recorded: `
    <g class="ln-soft"><path d="M40 176h240"/></g>
    <g class="ln"><rect x="92" y="54" width="136" height="88" rx="8" class="fill-soft"/><path d="M80 142h160l-10 14H90z"/>
      <circle cx="160" cy="98" r="18" class="fill-p" style="stroke:none"/><path d="M155 89l14 9-14 9z" fill="#0b0920" stroke="none"/>
      <path d="M106 128h108" class="ln-soft"/><path class="la-grow" d="M106 128h44" style="stroke-width:3"/></g>
    <g class="float" style="--d:-1.5s"><rect class="ln fill-soft" x="34" y="44" width="40" height="40" rx="10"/><path class="ln" d="M46 58l-6 6 6 6m16-12 6 6-6 6"/></g>
    <g class="float" style="--d:-3s"><rect class="ln fill-soft" x="246" y="56" width="42" height="46" rx="10"/><path class="ln" d="M256 70h22M256 80h16M256 90h20"/></g>`,
  regular: `
    <path class="ln-soft" d="M30 160 C 90 160, 80 100, 140 104 S 210 150, 250 116 S 286 62, 294 54"/>
    <path class="ln dash" d="M30 160 C 90 160, 80 100, 140 104 S 210 150, 250 116 S 286 62, 294 54"/>
    <g class="ln"><circle class="fill-soft" cx="30" cy="160" r="7"/><circle class="fill-soft" cx="140" cy="104" r="7"/><circle class="fill-soft" cx="250" cy="116" r="7"/></g>
    <g><circle class="fill-p" cx="294" cy="54" r="9"/><circle class="ln pulse" cx="294" cy="54" r="9" style="fill:none"/></g>
    <g fill="#c9bcff" font-size="9" font-family="Inter,sans-serif" letter-spacing="1.4" text-anchor="middle"><text x="30" y="182">WEEK 1</text><text x="140" y="126">LEARN</text><text x="250" y="138">BUILD</text><text x="286" y="36">WEEK 12</text></g>`,
  premium: `
    <g class="ln-soft"><path d="M40 176h240"/></g>
    <g class="ln"><rect x="92" y="130" width="38" height="46" rx="6" class="fill-soft"/><rect x="141" y="100" width="38" height="76" rx="6" class="fill-soft"/><rect x="190" y="70" width="38" height="106" rx="6" class="fill-soft"/></g>
    <g class="float"><path class="ln fill-soft" d="M188 52l7-22 12 12 12-18 12 18 12-12 7 22z"/></g>
    <circle class="fill-p" cx="209" cy="88" r="4"/><circle class="ln pulse" cx="209" cy="88" r="10" style="fill:none"/>`,
  institutions: `
    <g class="ln-soft"><path d="M30 176h260"/></g>
    <g class="ln"><path d="M104 176V104h112v72"/><path d="M92 106l68-40 68 40z" class="fill-soft"/>
      <path d="M122 176v-50M146 176v-50M174 176v-50M198 176v-50"/><rect x="148" y="146" width="24" height="30" rx="12" class="fill-soft"/></g>
    <g class="float" style="--d:-1s"><path class="ln fill-soft" d="M30 64l26-12 26 12-26 12z"/><path class="ln" d="M42 70v12c8 6 20 6 28 0V70"/></g>
    <g class="float" style="--d:-2.6s"><rect class="ln fill-soft" x="246" y="50" width="44" height="40" rx="10"/><circle class="ln" cx="268" cy="66" r="6"/><path class="ln" d="M258 82c3-6 17-6 20 0"/></g>
    <path class="ln-soft dash" d="M82 70c20-6 30 0 40 14M246 70c-20-4-32 2-42 18"/>`,
  corporates: `
    <g class="ln"><rect x="70" y="40" width="180" height="120" rx="12" class="fill-soft"/>
      <path d="M86 60h60M86 72h36" class="ln-soft"/>
      <path class="dash" d="M90 140 C 120 136, 140 120, 166 116 S 214 90, 232 70"/>
      <circle class="fill-p" cx="232" cy="70" r="5" style="stroke:none"/></g>
    <g class="ln-soft"><path d="M90 148h140"/></g>
    <g class="float" style="--d:-1.4s"><rect class="ln fill-soft" x="26" y="96" width="40" height="40" rx="10"/><circle class="ln" cx="40" cy="112" r="5"/><circle class="ln" cx="54" cy="112" r="5"/><path class="ln" d="M32 126c2-5 14-5 16 0m-2 0c2-5 14-5 16 0"/></g>
    <g class="float" style="--d:-3s"><rect class="ln fill-soft" x="258" y="38" width="40" height="40" rx="10"/><path class="ln" d="M268 64l7-8 6 5 9-11"/></g>`,
  community: `
    <g class="ln"><circle cx="160" cy="100" r="62" class="fill-soft"/>
      <ellipse cx="160" cy="100" rx="62" ry="22" class="ln-soft"/><ellipse cx="160" cy="100" rx="26" ry="62" class="ln-soft"/><path d="M98 100h124" class="ln-soft"/></g>
    <g class="spin" style="transform-origin:160px 100px"><ellipse class="ln-soft dash" cx="160" cy="100" rx="110" ry="40" transform="rotate(-12 160 100)"/></g>
    <g class="fill-p"><circle cx="128" cy="78" r="4"/><circle cx="188" cy="112" r="4"/><circle cx="150" cy="130" r="4"/></g>
    <g class="ln"><path d="M128 78 L188 112 L150 130 Z" class="ln-soft"/></g>
    <circle class="ln pulse" cx="128" cy="78" r="4" style="fill:none"/>`,
  saturday: `
    <g class="float-sm"><rect class="ln fill-soft" x="110" y="40" width="100" height="112" rx="14"/>
      <path class="ln" d="M110 72h100"/><path class="ln" d="M136 32v18M184 32v18" style="stroke-width:3"/>
      <text x="160" y="124" text-anchor="middle" font-size="26" font-weight="700" font-family="Inter,sans-serif" fill="#e9e3ff" letter-spacing="1">SAT</text>
      <text x="160" y="140" text-anchor="middle" font-size="8" font-family="Inter,sans-serif" fill="#a99cf0" letter-spacing="2">FREE SESSION</text></g>
    <g class="ln-soft"><path d="M60 176h200"/></g>
    <circle class="fill-p" cx="226" cy="58" r="4"/><circle class="ln pulse" cx="226" cy="58" r="8" style="fill:none"/>`,
};

export const arts: Record<string, string> = { ...workshopArts, ...pageArts };
