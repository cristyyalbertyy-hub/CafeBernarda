"use client";

import Reveal from "@/components/Reveal";
import SilkFragmentEditor from "@/components/SilkFragmentEditor";
import { useSilkSelections } from "@/components/SilkProvider";
import type { Collection } from "@/lib/collections";
import { silkKey } from "@/lib/collections";

export default function CollectionSilk({ collection }: { collection: Collection }) {
  const { setSelection, clearSelection } = useSilkSelections();

  const scarfKey = silkKey(collection.id, "scarf");
  const tieKey = silkKey(collection.id, "tie");

  return (
    <div className="collection-silk">
      <Reveal>
        <p className="eyebrow" style={{ marginTop: "var(--space-lg)" }}>
          From wall to silk
        </p>
        <p
          className="prose"
          style={{
            margin: "var(--space-md) auto var(--space-lg)",
            textAlign: "center",
            maxWidth: "38rem",
          }}
        >
          Choose your fragment from <em>{collection.painting}</em> — move, zoom,
          lock, and it travels with your enquiry to the print house.
        </p>
      </Reveal>

      <div className="gesture-items">
        <Reveal delay={1}>
          <article className="gesture-card">
            <p className="gesture-card__label">For her</p>
            <h3 className="gesture-card__product">The scarf</h3>
            <SilkFragmentEditor
              selectionKey={scarfKey}
              collectionId={collection.id}
              product="scarf"
              imageSrc={collection.image}
              aspectRatio={1}
              outputWidth={3600}
              outputHeight={3600}
              initialTransform={collection.scarfInitial}
              label={`Compose scarf — ${collection.painting}`}
              onLock={setSelection}
              onUnlock={clearSelection}
            />
            <p className="gesture-card__desc">{collection.scarfDesc}</p>
          </article>
        </Reveal>

        <Reveal delay={2}>
          <article className="gesture-card">
            <p className="gesture-card__label">For him</p>
            <h3 className="gesture-card__product">The tie</h3>
            <SilkFragmentEditor
              selectionKey={tieKey}
              collectionId={collection.id}
              product="tie"
              imageSrc={collection.image}
              aspectRatio={4}
              outputWidth={4800}
              outputHeight={1200}
              initialTransform={collection.tieInitial}
              label={`Compose tie — ${collection.painting}`}
              onLock={setSelection}
              onUnlock={clearSelection}
            />
            <p className="gesture-card__desc">{collection.tieDesc}</p>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
