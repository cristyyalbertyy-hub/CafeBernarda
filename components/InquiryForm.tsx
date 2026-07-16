"use client";

import { FormEvent, useState } from "react";
import { collections } from "@/lib/collections";
import { formatSilkNotes, useSilkSelections } from "@/components/SilkProvider";
import Reveal from "@/components/Reveal";

const PAINTING_OPTIONS = collections.map((c) => ({
  value: `painting-${c.id}`,
  label: `The painting — ${c.painting}`,
  collectionId: c.id,
}));

const SILK_OPTIONS = collections.flatMap((c) => [
  { value: `scarf-${c.id}`, label: `The scarf — ${c.painting}`, collectionId: c.id },
  { value: `tie-${c.id}`, label: `The tie — ${c.painting}`, collectionId: c.id },
]);

const PIECES = [
  ...PAINTING_OPTIONS,
  ...SILK_OPTIONS,
  { value: "collection-all", label: "The full salon", collectionId: null },
] as const;

export default function InquiryForm() {
  const { selections, getSelectionsList } = useSilkSelections();
  const [submitted, setSubmitted] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(PAINTING_OPTIONS[0].value);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const lockedSelections = getSelectionsList();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const silkNotes = formatSilkNotes(lockedSelections);

    const payload = new FormData();
    payload.set("name", String(data.get("name")));
    payload.set("email", String(data.get("email")));
    payload.set(
      "piece",
      PIECES.find((p) => p.value === selectedPiece)?.label ?? selectedPiece
    );
    payload.set("message", String(data.get("message") ?? ""));
    if (silkNotes) payload.set("silkNotes", silkNotes);

    lockedSelections.forEach((sel) => {
      if (sel.printBlob) {
        payload.append(
          `printFile_${sel.key}`,
          sel.printBlob,
          sel.filename
        );
      }
    });

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        body: payload,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          json.error ??
            "Could not send. Please write to hello@cafebernarda.co.uk"
        );
        setSending(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Connection error. Please try again or email hello@cafebernarda.co.uk");
      setSending(false);
    }
  }

  function scrollToForm(piece: string) {
    setSelectedPiece(piece);
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="inquiry">
        <p className="form-success">
          Thank you. Your enquiry has been sent — we respond within one day.
        </p>
      </div>
    );
  }

  return (
    <>
      <Reveal>
        <div className="reserve-header">
          <p className="eyebrow">Reserve</p>
          <h2 id="reserve-heading">Take a piece with you</h2>
          <p className="lead">
            Each piece is made in small numbers. The painting is singular. The
            silk, limited.
          </p>
        </div>
      </Reveal>

      <div className="reserve-items reserve-items--collections">
        {collections.map((c) => (
          <div key={c.id} className="reserve-collection">
            <p className="reserve-collection__name">{c.name}</p>
            <div className="reserve-collection__actions">
              <button
                type="button"
                className="reserve-item__action"
                onClick={() => scrollToForm(`painting-${c.id}`)}
              >
                Painting
              </button>
              <button
                type="button"
                className="reserve-item__action"
                onClick={() => scrollToForm(`scarf-${c.id}`)}
              >
                Scarf
                {selections[`${c.id}-scarf`]?.locked ? " ✓" : ""}
              </button>
              <button
                type="button"
                className="reserve-item__action"
                onClick={() => scrollToForm(`tie-${c.id}`)}
              >
                Tie
                {selections[`${c.id}-tie`]?.locked ? " ✓" : ""}
              </button>
            </div>
          </div>
        ))}
      </div>

      <form className="inquiry" onSubmit={handleSubmit}>
        <p className="inquiry__note">
          We respond within one day. Locked silk files are sent automatically.
        </p>

        {error && <p className="inquiry__error">{error}</p>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required autoComplete="name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="piece">Piece</label>
          <select
            id="piece"
            name="piece"
            value={selectedPiece}
            onChange={(e) => setSelectedPiece(e.target.value)}
          >
            {PIECES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message (optional)</label>
          <textarea id="message" name="message" rows={3} />
        </div>

        <button type="submit" className="form-submit" disabled={sending}>
          {sending ? "Sending…" : "Send enquiry"}
        </button>
      </form>
    </>
  );
}
