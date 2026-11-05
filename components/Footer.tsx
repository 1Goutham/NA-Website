import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";

const cols = [
  { title: "Programs", links: [["/programs/recorded", "Recorded"], ["/programs/regular", "Regular"], ["/programs/premium", "Premium"], ["/programs", "All programs"]] },
  { title: "Partner with us", links: [["/partner/institutions", "Institutions"], ["/partner/corporates", "Corporates"]] },
  { title: "Explore", links: [["/explore#workshops", "Workshops"], ["/explore#testimonials", "Testimonials"], ["/explore#community", "Community"], ["/#company", "Nunnari Labs & DeepWeaver"]] },
  { title: "Support", links: [["/help", "Help & contact"], ["/terms", "Terms"], ["/privacy", "Privacy"], ["/refund", "Refund policy"]] },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Image src="/assets/brand/academy-horizontal-white.png" alt="Nunnari Academy" width={617} height={216} />
          <p>Practical AI learning in English and Tamil, and a pioneering AI community that builds together.</p>
          <div className="socials">
            {site.socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener" aria-label={s.label}><Icon name={s.icon} /></a>)}
          </div>
        </div>
        {cols.map((c) => (
          <nav className="footer__col" key={c.title} aria-label={c.title}>
            <h3>{c.title}</h3>
            <ul>{c.links.map(([href, label]) => <li key={href}><Link prefetch={false} href={href}>{label}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Nunnari Academy.</p>
        <div className="footer__contact">
          <a href={`mailto:${site.email}`}><Icon name="mail" />{site.email}</a>
          <a href={site.phone.href}><Icon name="phone" />{site.phone.label}</a>
          <button className="to-top" type="button" data-to-top=""><Icon name="arrow-up" />Back to top</button>
        </div>
      </div>
    </footer>
  );
}
