import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Art from "@/components/ui/Art";
import Spotlight from "@/components/events/Spotlight";
import WorkshopList from "@/components/events/WorkshopList";
import AddToCalendar from "@/components/events/AddToCalendar";
import Testimonials from "@/components/sections/Testimonials";
import { Cta, Head, PageHero } from "@/components/ui/Blocks";
import { getSpotlight, getWorkshops } from "@/lib/workshops";

export const metadata: Metadata = {
  title: "Explore — Workshops, Testimonials & Community",
  description: "Upcoming and past Nunnari Academy workshops with recordings, learner stories, and the AI Tamil Nadu community.",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  const all = getWorkshops().map(({ summaryHtml: _s, ...w }) => w);
  const spot = getSpotlight(all);
  return (
    <>
      <PageHero
        pill="Explore"
        title={<>Workshops, stories and a growing <span className="grad">AI community.</span></>}
        lead="Learn from industry experts, meet fellow learners and catch up on every session you missed."
        actions={
          <nav className="seg" aria-label="Explore sections">
            <a href="#workshops"><Icon name="calendar" />Workshops</a>
            <a href="#testimonials"><Icon name="message" />Testimonials</a>
            <a href="#community"><Icon name="globe" />Community</a>
          </nav>
        }
      />

      <section className="section" id="workshops">
        <div className="container">
          <Head pill="Workshops" title={<>Learn live. <span className="grad">Watch anytime.</span></>} lead="Register for upcoming sessions, or watch recordings and summaries of completed ones." />
          {spot && <Spotlight w={spot} />}

          <div className="card featured" style={{ marginTop: 20 }} data-reveal="">
            <div className="featured__copy">
              <span className="tag">Every Saturday</span>
              <h3 className="t-h3">Free community session</h3>
              <p>Meet fellow learners and get a taste of what we build together.</p>
              <div className="actions">
                <AddToCalendar weeklySaturday title="Nunnari Academy — Free Saturday community session" description="Free community session: meet fellow learners and get a taste of what we build together." className="btn btn--primary btn--lg" />
              </div>
            </div>
            <Art name="saturday" />
          </div>

          <div style={{ marginTop: 56 }}>
            <WorkshopList items={all.filter((w) => w.slug !== spot?.slug)} />
          </div>
        </div>
      </section>

      <section className="section" id="testimonials" style={{ overflow: "hidden" }}>
        <div className="container">
          <Head pill="Testimonials" title={<>Learners who found their <span className="grad">next step.</span></>} />
        </div>
        <div data-reveal=""><Testimonials /></div>
      </section>

      <div id="community">
        <Cta
          art="community"
          title={<>Join our <span className="grad">community.</span></>}
          lead="Connect with AI learners, attend exclusive events, network with experts and discover global opportunities."
          actions={<a className="btn btn--primary btn--lg" href="https://aitamilnadu.org/" target="_blank" rel="noopener">Join the Community <Icon name="arrow-ur" className="i--ur" /></a>}
        />
      </div>
    </>
  );
}
