import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Art from "@/components/ui/Art";
import Faq from "@/components/ui/Faq";
import TrackList from "@/components/sections/TrackList";
import { Cta, Head, PageHero } from "@/components/ui/Blocks";
import { programList } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Programs — Recorded, Regular & Premium",
  description: "Three 12-week AI programmes: Recorded for K12 & college students, Regular for beginners (L1), Premium for advanced learners (L3+) and the C-Suite.",
  alternates: { canonical: "/programs" },
};

const faqCats = [{ key: "choose", label: "Choosing" }, { key: "enrol", label: "Enrolling" }];
const faq = [
  { q: "Which programme is right for me?", cats: ["choose"], a: "Recorded is for K12 and college students, Regular for beginners (L1), and Premium for advanced learners (L3+) and the C-Suite." },
  { q: "How long are the programmes?", cats: ["choose"], a: "All three programmes are 12 weeks." },
  { q: "Which languages are the classes in?", cats: ["choose"], a: "English and Tamil." },
  { q: "How do I enroll?", cats: ["enrol"], a: "Choose a programme and click Enroll Now, or talk to our team. We reach out within 24–48 hours." },
  { q: "Do I get access to the learning platform?", cats: ["enrol"], a: "Yes, one year of access to our LMS with all course resources and updates." },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        pill="Programs"
        title={<>Learn AI at your own <span className="grad">pace and path.</span></>}
        lead="Three 12-week programmes, from your first steps in AI to leading it."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid--3">
          {programList.map((p, i) => (
            <Link key={p.key} href={`/programs/${p.key}`} className="card event card--link" data-reveal="" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
              <Art name={p.art} />
              <div className="event__body">
                <div className="event__top"><span className="tag">{p.short}</span><span className="num">{p.num}</span></div>
                <h3>{p.name}</h3>
                <p className="clamp3">{p.lead}</p>
                <span className="link">View details <Icon name="arrow-ur" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="Regular programme tracks" title={<>12-week tracks for <span className="grad">every path.</span></>} />
          <TrackList />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="FAQ" title={<>Questions, <span className="grad">answered.</span></>} />
          <Faq cats={faqCats} items={faq} />
        </div>
      </section>

      <Cta
        art="regular"
        title={<>Not sure where <span className="grad">to start?</span></>}
        lead="Talk to our team and we will help you choose the right programme."
        actions={<button className="btn btn--primary btn--lg" type="button" data-enquire="Help me choose a programme">Talk to us <Icon name="arrow" className="i--arrow" /></button>}
      />
    </>
  );
}
