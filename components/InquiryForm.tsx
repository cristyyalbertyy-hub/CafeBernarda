"use client";

import { FormEvent, useState } from "react";
import { SITE_EMAIL } from "@/lib/site";
import { formatSilkNotes, useSilkSelections } from "@/components/SilkProvider";
import Reveal from "@/components/Reveal";

const PIECES = [
  { value: "painting", label: "The painting — The Path" },
  { value: "scarf", label: "The scarf" },
  { value: "tie", label: "The tie" },
  { value: "collection", label: "The full collection" },
] as const;

export default function InquiryForm() {
  const { scarf, tie } = useSilkSelections();
  const [submitted, setSubmitted] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState("painting");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const piece = data.get("piece") as string;
    const message = (data.get("message") as string) || "";

    const pieceLabel =
      PIECES.find((p) => p.value === piece)?.label ?? piece;

    const silkNotes = formatSilkNotes(scarf, tie);
    const silkReminder =
      silkNotes.length > 0
        ? "\n\nPlease attach the downloaded print file(s) to this email.\n"
        : "";

    const subject = encodeURIComponent(
      `Café Bernarda — Enquiry: ${pieceLabel}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPiece: ${pieceLabel}\n\n${message}${silkReminder}${silkNotes ? `\n${silkNotes}` : ""}`
    );

    window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  function scrollToForm(piece: string) {
    setSelectedPiece(piece);
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="inquiry">
        <p className="form-success">
          Thank you. Your enquiry is ready to send — attach your print file if
          you locked a silk selection. We respond within one day.
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

      <div className="reserve-items">
        <div className="reserve-item">
          <p className="reserve-item__name">The painting</p>
          <p className="reserve-item__note">The Path · Unique work</p>
          <button
            type="button"
            className="reserve-item__action"
            onClick={() => scrollToForm("painting")}
          >
            Enquire
          </button>
        </div>
        <div className="reserve-item">
          <p className="reserve-item__name">The scarf</p>
          <p className="reserve-item__note">
            Silk · Limited edition{scarf?.locked ? " · Selection locked" : ""}
          </p>
          <button
            type="button"
            className="reserve-item__action"
            onClick={() => scrollToForm("scarf")}
          >
            Enquire
          </button>
        </div>
        <div className="reserve-item">
          <p className="reserve-item__name">The tie</p>
          <p className="reserve-item__note">
            Silk · Limited edition{tie?.locked ? " · Selection locked" : ""}
          </p>
          <button
            type="button"
            className="reserve-item__action"
            onClick={() => scrollToForm("tie")}
          >
            Enquire
          </button>
        </div>
      </div>

      <form className="inquiry" onSubmit={handleSubmit}>
        <p className="inquiry__note">We respond within one day.</p>

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

        <button type="submit" className="form-submit">
          Send enquiry
        </button>
      </form>
    </>
  );
}
