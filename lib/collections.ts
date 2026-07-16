import type { SilkTransform } from "@/components/SilkProvider";

export type Collection = {
  id: string;
  name: string;
  painting: string;
  medium: string;
  image: string;
  imageAlt: string;
  prose: string[];
  scarfInitial: SilkTransform;
  tieInitial: SilkTransform;
  scarfDesc: string;
  tieDesc: string;
  colors: [string, string, string, string, string];
};

export const collections: Collection[] = [
  {
    id: "bright-afternoon",
    name: "A Bright Afternoon",
    painting: "The Path",
    medium: "Acrylic on canvas",
    image: "/images/the-path.jpg",
    imageAlt:
      "The Path — an abstract acrylic painting with bold colour fields and winding paths of white house-like forms",
    prose: [
      "When I paint, I am looking for the balance of colour that holds what I feel — a vibration, an energy that finds its place on the canvas. In The Path, that energy becomes movement: small white forms winding across fields of red, yellow, green and blue, like a procession leaving the wall.",
      "Each cluster is drawn by hand — outlined in black, touched with blue, never quite the same. The colour blocks hold the ground; the path crosses them, restless and alive, until the whole surface begins to breathe.",
    ],
    scarfInitial: { x: -18, y: 42, scale: 2.35 },
    tieInitial: { x: 0, y: 120, scale: 1.85 },
    scarfDesc:
      "Golden yellow at its heart — drag, zoom, then lock. Your composition is saved and sent with your enquiry.",
    tieDesc:
      "Vermilion and deep blue, quietened for the collar — compose, lock, and send to the print house.",
    colors: ["#d44a2e", "#e8b923", "#7cb89a", "#2e4a8c", "#d44a2e"],
  },
  {
    id: "golden-hour",
    name: "A Golden Hour",
    painting: "The Domes",
    medium: "Acrylic on canvas",
    image: "/images/the-domes.jpg",
    imageAlt:
      "The Domes — a vibrant acrylic painting with golden domes, arches, crescents and deep blue and red fields",
    prose: [
      "Some afternoons carry ceremony — gold catching the light, domes rising like thoughts, the surface jewelled with circles and stars. The Domes holds that hour: not illustration, but atmosphere. Red and blue grounds, gold accents, forms that suggest palace and prayer without naming either.",
      "Every arch and window is placed with intention. The painting glitters without shouting — a vibration held in regal colour, ready to cross from wall to silk.",
    ],
    scarfInitial: { x: 12, y: -30, scale: 2.1 },
    tieInitial: { x: -20, y: 80, scale: 1.7 },
    scarfDesc:
      "Gold and vermilion from the upper register — ideal at the neck, where the light moves with you.",
    tieDesc:
      "Deep blue and gold, restrained — the same ceremony, quiet at the collar.",
    colors: ["#2e4a8c", "#c9a227", "#8b2635", "#1a2744", "#c9a227"],
  },
  {
    id: "hill-at-noon",
    name: "The Hill at Noon",
    painting: "Every Window",
    medium: "Acrylic on canvas",
    image: "/images/every-window.jpg",
    imageAlt:
      "Every Window — a dense acrylic painting of a colourful hillside with countless small forms and windows",
    prose: [
      "At noon the hill is never still — every window open, every shape conversing with its neighbour. Every Window is that fullness: orange, blue, red and yellow pressed together in a rhythm that refuses emptiness.",
      "Step close and the canvas becomes a city of marks. Step back and it hums — the same energy I feel when colour finds its equilibrium, multiplied across the whole surface.",
    ],
    scarfInitial: { x: -40, y: 20, scale: 2.5 },
    tieInitial: { x: 10, y: 150, scale: 2.0 },
    scarfDesc:
      "A passage from the crowded centre — colour in motion, perfect for silk that folds and reveals.",
    tieDesc:
      "A horizontal band of blue and ochre — the hill quietened to a single, confident line.",
    colors: ["#e85d3a", "#2e6ea8", "#e8b923", "#8b2635", "#5a7a9a"],
  },
];

export function getCollection(id: string) {
  return collections.find((c) => c.id === id);
}

export function silkKey(collectionId: string, product: "scarf" | "tie") {
  return `${collectionId}-${product}`;
}
