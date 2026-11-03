import Link from "next/link";
import type React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="deco" aria-hidden="true">
        <svg className="deco-lines" viewBox="0 0 1440 520" preserveAspectRatio="none">
          <path d="M-20 380 C 300 300, 520 520, 900 420 S 1300 160, 1460 220" />
          <path className="travel" pathLength="1" d="M-20 380 C 300 300, 520 520, 900 420 S 1300 160, 1460 220" />
          <path d="M1460 40 C 1200 120, 1180 300, 1460 380" />
        </svg>
      </div>
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/assets/logos/academy-ta-white.png" alt="Nunnari Academy" width="175" height="203" loading="lazy" />
          <h2>
            Building real opportunities{" "}
            <span>through AI.</span>
          </h2>
          <p>
            Practical learning. Real skills.
            <br />
            A future ready community.
          </p>
          <div className="socials">
            <a href="https://www.linkedin.com/company/nunnari-academy/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg className="i"><use href="#i-linkedin" /></svg></a>
            <a href="https://x.com/NunnariLabs" target="_blank" rel="noopener" aria-label="X"><svg className="i"><use href="#i-x" /></svg></a>
            <a href="https://www.instagram.com/nunnari.academy/" target="_blank" rel="noopener" aria-label="Instagram"><svg className="i"><use href="#i-instagram" /></svg></a>
            <a href="https://www.youtube.com/@NunnariAcademy-v6y" target="_blank" rel="noopener" aria-label="YouTube"><svg className="i"><use href="#i-youtube" /></svg></a>
          </div>
        </div>
        <nav className="footer__col" aria-label="Programmes">
          <h3>Programmes</h3>
          <ul>
            <li><Link prefetch={false} href="/programs/recorded">Recorded Programmes</Link></li>
            <li><Link prefetch={false} href="/programs/regular">Regular Programmes</Link></li>
            <li><Link prefetch={false} href="/programs/premium">Premium Programmes</Link></li>
            <li><hr /></li>
            <li>
              <Link prefetch={false} href="/partner/institutions">
                Institutional Programmes
                <small>Academia (MoU)</small>
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/partner/corporates">
                Corporate Programs
                <small>
                  For Teams{" "}
                  &amp;
                  {" "}Organisations
                </small>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Explore">
          <h3>Explore</h3>
          <ul>
            <li><Link prefetch={false} href="/explore#events">Workshops</Link></li>
            <li><Link prefetch={false} href="/explore#testimonials">Testimonials</Link></li>
            <li><Link prefetch={false} href="/explore#community">Community</Link></li>
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Home">
          <h3>Home</h3>
          <ul>
            <li><Link prefetch={false} href="/#who-we-are">Our Mission</Link></li>
            <li>
              <Link prefetch={false} href="/#backed-by">
                Nunnari Labs{" "}
                &amp;
                {" "}DeepWeaver
              </Link>
            </li>
            <li><Link prefetch={false} href="/#learners-partners">Partners</Link></li>
            <li><Link prefetch={false} href="/#programs">Programs</Link></li>
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Support">
          <h3>Support</h3>
          <ul>
            <li><Link prefetch={false} href="/help">Help Center</Link></li>
            <li><Link prefetch={false} href="/help#contact">Contact Us</Link></li>
            <li><Link prefetch={false} href="/terms">Terms of Service</Link></li>
            <li><Link prefetch={false} href="/privacy">Privacy Policy</Link></li>
            <li><Link prefetch={false} href="/refund">Refund Policy</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container footer__bottom">
        <p>
          ©{" "}
          {new Date().getFullYear()}
          {" "}Nunnari Academy. Made with purpose for curious learners.
        </p>
        <div className="footer__contact">
          <a href="mailto:enquiry@nunnari.academy">
            <svg className="i"><use href="#i-mail" /></svg>
            {" "}enquiry@nunnari.academy
          </a>
          <a href="tel:+919003313175">
            <svg className="i"><use href="#i-phone" /></svg>
            {" "}+91 90033 13175
          </a>
          <button className="to-top" type="button" data-to-top>
            <span><svg className="i"><use href="#i-arrow-up" /></svg></span>
            {" "}Back to top
          </button>
        </div>
      </div>
    </footer>
    
  );
}
