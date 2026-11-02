import Link from "next/link";
import Icon from "@/components/Icon";
import Constellation from "@/components/canvas/Constellation";

export default function NotFound() {
  return (
    <section className="hero" data-hero style={{ minHeight: "80svh", display: "grid", alignItems: "center" }}>
      <Constellation />
      <div className="container hero__inner">
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
