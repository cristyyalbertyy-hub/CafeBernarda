import Reveal from "@/components/Reveal";
import SiteBrand from "@/components/SiteBrand";
import SalonCollections from "@/components/SalonCollections";
import { collections } from "@/lib/collections";

export default function Home() {
  return (
    <main className="page">
      <SiteBrand />

      <section className="section section--hero" aria-label="Introduction">
        <div className="container">
          <h1>Café Bernarda</h1>
          <p className="lead hero__subtitle">
            A salon where painting leaves the wall.
          </p>
          <p className="eyebrow hero__collection">Three afternoons</p>
          <nav className="hero__collections" aria-label="Collections">
            {collections.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="hero__collection-link">
                {c.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          Enter
          <span className="hero__scroll-line" />
        </div>
      </section>

      <div className="color-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <SalonCollections />

      <section
        className="section section--divider street"
        aria-labelledby="street-heading"
      >
        <div className="container container--narrow">
          <Reveal>
            <p className="eyebrow">Into the street</p>
            <h2 id="street-heading" className="visually-hidden">
              Into the street
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <div className="street__lines">
              <p className="street__line">
                She wears the painting at her neck.
              </p>
              <p className="street__line street__line--accent">
                He wears it, quiet, at his collar.
              </p>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <p className="street__closing">The salon follows you out.</p>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <p className="site-footer__name">Café Bernarda</p>
        <p className="site-footer__place">London</p>
      </footer>
    </main>
  );
}
