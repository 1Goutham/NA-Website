import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHero } from "@/components/ui/Blocks";

export default function NotFound() {
  return (
    <PageHero
      pill="404"
      title={<>This page doesn’t <span className="grad">exist yet.</span></>}
      lead="The link may be old or mistyped. Let’s get you back on track."
      actions={<>
        <Link className="btn btn--primary btn--lg" href="/">Back to home <Icon name="arrow" className="i--arrow" /></Link>
        <Link className="btn btn--ghost btn--lg" href="/programs">Explore programs</Link>
      </>}
    />
  );
}
