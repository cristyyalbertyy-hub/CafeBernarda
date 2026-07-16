import Image from "next/image";
import Reveal from "@/components/Reveal";
import SiteBrand from "@/components/SiteBrand";
import SilkAndReserve from "@/components/SilkAndReserve";

export default function Home() {
  return (
    <main className="page">
      <SiteBrand />

      {/* ─── Hero ─── */}
      <section className="section section--hero" aria-label="Introduction">
        <div className="container">
          <h1>A Bright Afternoon</h1>
          <p className="lead hero__subtitle">
            A salon where painting leaves the wall.
          </p>
          <p className="eyebrow hero__collection">Café Bernarda</p>
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

      {/* ─── The painting ─── */}
      <section
        className="section section--divider"
        aria-labelledby="painting-heading"
      >
        <div className="container">
          <Reveal>
            <p className="eyebrow">The painting</p>
            <h2 id="painting-heading">The Path</h2>
          </Reveal>

          <div className="painting-grid" style={{ marginTop: "var(--space-lg)" }}>
            <Reveal delay={1}>
              <figure className="painting-frame">
                <Image
                  src="/images/the-path.jpg"
                  alt="The Path — an abstract acrylic painting with bold colour fields and winding paths of white house-like forms"
                  width={826}
                  height={1024}
                  priority
                  sizes="(max-width: 768px) 92vw, 45vw"
                />
              </figure>
              <figcaption className="painting-meta">
                <p className="painting-meta__detail">
                  Acrylic on canvas · Unique work
                </p>
                <p
                  className="painting-meta__detail"
                  style={{ marginTop: "0.25rem" }}
                >
                  The artist of the salon
                </p>
              </figcaption>
            </Reveal>

            <Reveal delay={2}>
              <div className="painting-text prose">
                <p>
                  When I paint, I am looking for the balance of colour that
                  holds what I feel — a vibration, an energy that finds its
                  place on the canvas. In <em>The Path</em>, that energy
                  becomes movement: small white forms winding across fields of
                  red, yellow, green and blue, like a procession leaving the
                  wall.
                </p>
                <p>
                  Each cluster is drawn by hand — outlined in black, touched
                  with blue, never quite the same. The colour blocks hold the
                  ground; the path crosses them, restless and alive, until the
                  whole surface begins to breathe.
                </p>
                <p>
                  <em>This is where the salon begins.</em>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Into the street ─── */}
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

      <div className="color-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <SilkAndReserve />

      <footer className="site-footer">
        <p className="site-footer__name">Café Bernarda</p>
        <p className="site-footer__place">London</p>
      </footer>
    </main>
  );
}
