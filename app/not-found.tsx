import Link from "next/link";
import Icon from "@/components/Icon";
import Aurora from "@/components/canvas/Aurora";

export default function NotFound() {
  return (
    <section className="hx" data-hero style={{ display: "grid", alignItems: "center" }}>
      <div className="hx__bg"><Aurora /><div className="hx__fallback" aria-hidden="true" /></div>
      <div className="container hx__inner">
        <p className="hero__tag">ERROR <i>|</i> 404</p>
        <h1 className="display" style={{ maxWidth: "none" }}>This page doesn’t <span className="accent">exist yet.</span></h1>
        <p className="lead">The link may be old or mistyped. Let’s get you back on track.</p>
        <div className="hero__actions">
          <Link className="btn btn--primary btn--lg" href="/">Back to home <Icon name="arrow" className="i--arrow" /></Link>
          <Link className="btn btn--ghost btn--lg" href="/programs">Explore programs</Link>
        </div>
      </div>
    </section>
  );
}
