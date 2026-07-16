"use client";

import Reveal from "@/components/Reveal";
import SilkFragmentEditor from "@/components/SilkFragmentEditor";
import { useSilkSelections } from "@/components/SilkProvider";

const PAINTING_SRC = "/images/the-path.jpg";

export default function GestureSection() {
  const { setSelection, clearSelection } = useSilkSelections();

  return (
    <section className="section gesture" aria-labelledby="gesture-heading">
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
            From <em>The Path</em>, choose your fragment — move and zoom until
            the passage feels right, then lock your selection for the print
            house. The canvas remains singular.
          </p>
        </Reveal>

        <div className="gesture-items">
          <Reveal delay={1}>
            <article className="gesture-card">
              <p className="gesture-card__label">For her</p>
              <h3 className="gesture-card__product">The scarf</h3>
              <SilkFragmentEditor
                product="scarf"
                imageSrc={PAINTING_SRC}
                aspectRatio={1}
                outputWidth={3600}
                outputHeight={3600}
                initialTransform={{ x: -18, y: 42, scale: 2.35 }}
                label="Compose your scarf fragment"
                onLock={setSelection}
                onUnlock={clearSelection}
              />
              <p className="gesture-card__desc">
                Golden yellow at its heart — drag, zoom, then lock. Your
                composition is saved and ready to send to the print house.
              </p>
            </article>
          </Reveal>

          <Reveal delay={2}>
            <article className="gesture-card">
              <p className="gesture-card__label">For him</p>
              <h3 className="gesture-card__product">The tie</h3>
              <SilkFragmentEditor
                product="tie"
                imageSrc={PAINTING_SRC}
                aspectRatio={4}
                outputWidth={4800}
                outputHeight={1200}
                initialTransform={{ x: 0, y: 120, scale: 1.85 }}
                label="Compose your tie fragment"
                onLock={setSelection}
                onUnlock={clearSelection}
              />
              <p className="gesture-card__desc">
                Vermilion and deep blue, quietened for the collar — compose,
                lock, and download your print file.
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
  );
}
