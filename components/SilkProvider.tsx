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
  key: string;
  collectionId: string;
  product: "scarf" | "tie";
  locked: boolean;
  transform: SilkTransform;
  filename: string;
  previewUrl: string;
  printBlob?: Blob;
};

type SilkContextValue = {
  selections: Record<string, SilkSelection>;
  setSelection: (selection: SilkSelection) => void;
  clearSelection: (key: string) => void;
  getSelectionsList: () => SilkSelection[];
};

const SilkContext = createContext<SilkContextValue | null>(null);

export function SilkProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<Record<string, SilkSelection>>(
    {}
  );

  const setSelection = useCallback((selection: SilkSelection) => {
    setSelections((prev) => ({ ...prev, [selection.key]: selection }));
  }, []);

  const clearSelection = useCallback((key: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const getSelectionsList = useCallback(
    () => Object.values(selections).filter((s) => s.locked),
    [selections]
  );

  const value = useMemo(
    () => ({ selections, setSelection, clearSelection, getSelectionsList }),
    [selections, setSelection, clearSelection, getSelectionsList]
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

export function formatSilkNotes(selections: SilkSelection[]) {
  if (selections.length === 0) return "";

  return selections
    .map(
      (s) =>
        `${s.collectionId} · ${s.product} (${s.filename}):\n  x=${s.transform.x.toFixed(1)} y=${s.transform.y.toFixed(1)} scale=${s.transform.scale.toFixed(3)}`
    )
    .join("\n");
}
