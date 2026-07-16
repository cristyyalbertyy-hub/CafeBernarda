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
          <p className="eyebrow hero__collection">A Bright Afternoon</p>
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
              <p className="lead">Art does not end at the frame.</p>
            </div>
          </Reveal>

          <Reveal>
            <p
              className="prose"
              style={{
                margin: "0 auto var(--space-xl)",
                textAlign: "center",
                maxWidth: "40rem",
              }}
            >
              From <em>The Path</em>, a fragment is chosen — not the whole
              painting, but the passage where colour and form are most alive.
              Enlarged for silk. Printed in small numbers. The canvas remains
              singular.
            </p>
          </Reveal>

          <div className="gesture-items">
            <Reveal delay={1}>
              <article className="gesture-card">
                <p className="gesture-card__label">For her</p>
                <h3 className="gesture-card__product">The scarf</h3>
                <figure className="gesture-card__fragment">
                  <Image
                    src="/images/scarf-fragment.jpg"
                    alt="Scarf fragment — yellow and blue colour fields with white house-like forms, cropped from The Path"
                    width={900}
                    height={900}
                    sizes="(max-width: 640px) 88vw, 40vw"
                  />
                </figure>
                <p className="gesture-card__desc">
                  The central passage: golden yellow at its heart, touched with
                  green and blue — the white path in full, worn at the neck,
                  the painting unfolds with every fold.
                </p>
              </article>
            </Reveal>

            <Reveal delay={2}>
              <article className="gesture-card">
                <p className="gesture-card__label">For him</p>
                <h3 className="gesture-card__product">The tie</h3>
                <figure className="gesture-card__fragment gesture-card__fragment--tie">
                  <Image
                    src="/images/tie-fragment.jpg"
                    alt="Tie fragment — vermilion and blue band cropped from The Path"
                    width={1200}
                    height={300}
                    sizes="(max-width: 640px) 88vw, 40vw"
                  />
                </figure>
                <p className="gesture-card__desc">
                  The lower register: vermilion and deep blue, the path
                  quietened to a single line — the same energy, restrained for
                  the collar.
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
