import type { CSSProperties } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Collection } from "@/lib/collections";
import CollectionSilk from "@/components/CollectionSilk";

export default function CollectionSection({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) {
  const delay = index > 0 ? 1 : 0;

  return (
    <section
      className="section section--divider collection"
      id={collection.id}
      aria-labelledby={`${collection.id}-heading`}
    >
      <div className="container">
        <Reveal delay={delay as 0 | 1 | 2 | 3}>
          <p className="eyebrow">{collection.name}</p>
          <h2 id={`${collection.id}-heading`}>{collection.painting}</h2>
        </Reveal>

        <div
          className="painting-grid"
          style={{ marginTop: "var(--space-lg)" }}
        >
          <Reveal delay={1}>
            <figure className="painting-frame">
              <Image
                src={collection.image}
                alt={collection.imageAlt}
                width={826}
                height={1024}
                sizes="(max-width: 768px) 92vw, 45vw"
              />
            </figure>
            <figcaption className="painting-meta">
              <p className="painting-meta__detail">
                {collection.medium} · Unique work
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
              {collection.prose.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              {index === 0 && (
                <p>
                  <em>This is where the salon begins.</em>
                </p>
              )}
            </div>
          </Reveal>
        </div>

        <div
          className="color-strip collection__strip"
          aria-hidden="true"
          style={
            {
              "--c1": collection.colors[0],
              "--c2": collection.colors[1],
              "--c3": collection.colors[2],
              "--c4": collection.colors[3],
              "--c5": collection.colors[4],
            } as CSSProperties
          }
        >
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <CollectionSilk collection={collection} />
      </div>
    </section>
  );
}
