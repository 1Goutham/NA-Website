const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const D = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// all event times are shown in IST, whatever the server/visitor timezone
const ist = (iso: string) => new Date(new Date(iso).getTime() + 5.5 * 3600e3);

export const fmtDate = (iso: string) => { const d = ist(iso); return `${String(d.getUTCDate()).padStart(2, "0")} ${M[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
export const fmtDay = (iso: string) => D[ist(iso).getUTCDay()];
const hm = (iso: string) => { const d = ist(iso); let h = d.getUTCHours(); const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return `${String(h).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")} ${ap}`; };
export const fmtTime = (start: string, end: string) => `${hm(start).replace(/ (AM|PM)$/, hm(start).slice(-3) === hm(end).slice(-3) ? "" : " $1")} – ${hm(end)} IST`;
export const fmtDuration = (start: string, end: string) => { const m = Math.round((+new Date(end) - +new Date(start)) / 60000); return m >= 60 && m % 60 === 0 ? `${m / 60} hr${m > 60 ? "s" : ""}` : `${m} min`; };

/** YouTube id from any youtube.com / youtu.be link (or a bare id). */
export const youtubeId = (v?: string) => {
  if (!v) return null;
  const m = v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/) || v.match(/^([\w-]{11})$/);
  return m ? m[1] : null;
};
