import Marquee from "@/components/ui/Marquee";
import { learnerQuotes } from "@/lib/testimonials";

const Quote = ({ q }: { q: (typeof learnerQuotes)[number] }) => (
  <figure className="card quote">
    <blockquote>“{q.quote}”</blockquote>
    <figcaption><span className="avatar" aria-hidden="true">{q.role[0]}</span><span><b>{q.role}</b><span>{q.org}</span></span></figcaption>
  </figure>
);

/** Dual-row infinite marquee: top row scrolls left, bottom row scrolls right. */
export default function Testimonials() {
  return (
    <>
      <Marquee duration={60}>{learnerQuotes.slice(0, 5).map((q) => <Quote key={q.quote} q={q} />)}</Marquee>
      <Marquee duration={54} reverse>{learnerQuotes.slice(5).map((q) => <Quote key={q.quote} q={q} />)}</Marquee>
    </>
  );
}
