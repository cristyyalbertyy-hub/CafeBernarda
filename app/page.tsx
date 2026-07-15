import Image from "next/image";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";

export default function Home() {
  return (
    <main className="page">
      <header className="site-header" aria-hidden="true">
        <span className="site-header__name">Café Bernarda</span>
      </header>

      {/* ─── Hero ─── */}
      <section className="section section--hero" aria-label="Introduction">
        <div className="container">
          <h1>Café Bernarda</h1>
          <p className="lead hero__subtitle">
            A salon where painting leaves the wall.
          </p>
          <p className="eyebrow hero__collection">A Fine Vibration</p>
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
            <h2 id="painting-heading">Equilibrium</h2>
          </Reveal>

          <div className="painting-grid" style={{ marginTop: "var(--space-lg)" }}>
            <Reveal delay={1}>
              <figure className="painting-frame">
                <Image
                  src="/images/equilibrium.png"
                  alt="Equilibrium — an abstract oil painting with layered blues, vermilion reds, and bursts of yellow"
                  width={800}
                  height={1000}
                  priority
                  sizes="(max-width: 768px) 92vw, 45vw"
                />
              </figure>
              <figcaption className="painting-meta">
                <p className="painting-meta__detail">
                  Oil on canvas · Unique work
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
                  When I paint, I am not chasing an image. I am looking for
                  equilibrium — a balance of colour that holds what I feel in
                  that moment. Not a mood I can name. More like a vibration. An
                  energy that needs to settle on the canvas before it can leave
                  the wall.
                </p>
                <p>
                  Blues run horizontally, like breath. Reds fall vertically —
                  sudden, decisive. Yellow appears in small bursts, as if the
                  surface itself were catching light. Layer upon layer, stroke
                  against stroke, until the painting stops asking for more.
                </p>
                <p>
                  <em>This is where the salon begins.</em>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── The gesture continues ─── */}
      <section
        className="section gesture"
        aria-labelledby="gesture-heading"
      >
        <div className="container">
          <Reveal>
            <div className="gesture-intro">
              <p className="eyebrow">The gesture continues</p>
              <h2 id="gesture-heading">From wall to silk</h2>
              <p className="lead">
                Art does not end at the frame.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="prose" style={{ margin: "0 auto var(--space-xl)", textAlign: "center", maxWidth: "40rem" }}>
              From <em>Equilibrium</em>, a fragment is chosen — not the whole
              painting, but the moment within it where colour vibrates most
              clearly. Printed on silk. Made in small numbers. The canvas
              remains singular.
            </p>
          </Reveal>

          <div className="gesture-items">
            <Reveal delay={1}>
              <article className="gesture-card">
                <p className="gesture-card__label">For her</p>
                <h3 className="gesture-card__product">The scarf</h3>
                <p className="gesture-card__desc">
                  The upper register: vermilion falling into deep blue, with
                  sparks of yellow — worn at the neck, the painting moves with
                  you.
                </p>
              </article>
            </Reveal>

            <Reveal delay={2}>
              <article className="gesture-card">
                <p className="gesture-card__label">For him</p>
                <h3 className="gesture-card__product">The tie</h3>
                <p className="gesture-card__desc">
                  The horizontal pulse: cobalt and turquoise, restrained, with a
                  thread of gold — the same energy, quietened for the collar.
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal>
            <p className="gesture-bridge">
              Same certainty of the brush. Another surface. Another life.
            </p>
          </Reveal>
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

      {/* ─── Reserve ─── */}
      <section
        className="section"
        id="enquire"
        aria-labelledby="reserve-heading"
      >
        <div className="container container--narrow">
          <Reveal>
            <div className="reserve-header">
              <p className="eyebrow">Reserve</p>
              <h2 id="reserve-heading">Take a piece with you</h2>
              <p className="lead">
                Each piece is made in small numbers. The painting is singular.
                The silk, limited.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <InquiryForm />
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="site-footer">
        <p className="site-footer__name">Café Bernarda</p>
        <p className="site-footer__place">London</p>
      </footer>
    </main>
  );
}
