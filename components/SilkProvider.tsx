"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SilkTransform = {
  x: number;
  y: number;
  scale: number;
};

export type SilkSelection = {
  product: "scarf" | "tie";
  locked: boolean;
  transform: SilkTransform;
  filename: string;
  previewUrl: string;
};

type SilkContextValue = {
  scarf: SilkSelection | null;
  tie: SilkSelection | null;
  setSelection: (selection: SilkSelection) => void;
  clearSelection: (product: "scarf" | "tie") => void;
};

const SilkContext = createContext<SilkContextValue | null>(null);

export function SilkProvider({ children }: { children: ReactNode }) {
  const [scarf, setScarf] = useState<SilkSelection | null>(null);
  const [tie, setTie] = useState<SilkSelection | null>(null);

  const setSelection = useCallback((selection: SilkSelection) => {
    if (selection.product === "scarf") setScarf(selection);
    else setTie(selection);
  }, []);

  const clearSelection = useCallback((product: "scarf" | "tie") => {
    if (product === "scarf") setScarf(null);
    else setTie(null);
  }, []);

  const value = useMemo(
    () => ({ scarf, tie, setSelection, clearSelection }),
    [scarf, tie, setSelection, clearSelection]
  );

  return <SilkContext.Provider value={value}>{children}</SilkContext.Provider>;
}

export function useSilkSelections() {
  const ctx = useContext(SilkContext);
  if (!ctx) {
    throw new Error("useSilkSelections must be used within SilkProvider");
  }
  return ctx;
}

export function formatSilkNotes(scarf: SilkSelection | null, tie: SilkSelection | null) {
  const lines: string[] = [];

  if (scarf?.locked) {
    lines.push(
      `Scarf print selection (attach ${scarf.filename}):`,
      `  x=${scarf.transform.x.toFixed(1)} y=${scarf.transform.y.toFixed(1)} scale=${scarf.transform.scale.toFixed(3)}`
    );
  }

  if (tie?.locked) {
    lines.push(
      `Tie print selection (attach ${tie.filename}):`,
      `  x=${tie.transform.x.toFixed(1)} y=${tie.transform.y.toFixed(1)} scale=${tie.transform.scale.toFixed(3)}`
    );
  }

  return lines.join("\n");
}
