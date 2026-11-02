import Marquee from "@/components/ui/Marquee";
import { learnerQuotes } from "@/lib/testimonials";

const Quote = ({ q }: { q: (typeof learnerQuotes)[number] }) => (
  <figure className="card quote-card">
    <span className="quote-mark" aria-hidden="true">“</span>
    <blockquote>{q.quote}</blockquote>
    <figcaption className="person">
      <span className="avatar" aria-hidden="true">{q.role[0]}</span>
      <span><b>{q.role}</b><span>{q.org}</span></span>
    </figcaption>
  </figure>
);

/** Two counter-scrolling rows of learner quotes. */
export default function Testimonials() {
  return (
    <>
      <Marquee duration={60} className="quote-row">{learnerQuotes.slice(0, 5).map((q) => <Quote key={q.quote} q={q} />)}</Marquee>
      <Marquee duration={54} reverse className="quote-row">{learnerQuotes.slice(5).map((q) => <Quote key={q.quote} q={q} />)}</Marquee>
    </>
  );
}
