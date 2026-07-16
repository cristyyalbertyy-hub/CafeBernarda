"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { SilkSelection, SilkTransform } from "@/components/SilkProvider";

type SilkFragmentEditorProps = {
  product: "scarf" | "tie";
  imageSrc: string;
  aspectRatio: number;
  outputWidth: number;
  outputHeight: number;
  initialTransform?: SilkTransform;
  label: string;
  onLock: (selection: SilkSelection) => void;
  onUnlock: (product: "scarf" | "tie") => void;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function SilkFragmentEditor({
  product,
  imageSrc,
  aspectRatio,
  outputWidth,
  outputHeight,
  initialTransform = { x: 0, y: 0, scale: 1 },
  label,
  onLock,
  onUnlock,
}: SilkFragmentEditorProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [baseCover, setBaseCover] = useState(1);
  const [transform, setTransform] = useState<SilkTransform>(initialTransform);
  const [locked, setLocked] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const filename =
    product === "scarf" ? "cafebernarda-scarf-print.jpg" : "cafebernarda-tie-print.jpg";

  const totalScale = baseCover * transform.scale;

  const updateBaseCover = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || !natural.w) return;
    setBaseCover(
      Math.max(viewport.clientWidth / natural.w, viewport.clientHeight / natural.h)
    );
  }, [natural]);

  useEffect(() => {
    loadImage(imageSrc).then((img) => {
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    });
  }, [imageSrc]);

  useEffect(() => {
    updateBaseCover();
    window.addEventListener("resize", updateBaseCover);
    return () => window.removeEventListener("resize", updateBaseCover);
  }, [updateBaseCover]);

  const exportSelection = useCallback(async () => {
    const viewport = viewportRef.current;
    if (!viewport || !natural.w) return null;

    const img = await loadImage(imageSrc);
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const scale = baseCover * transform.scale;

    const imgW = img.naturalWidth * scale;
    const imgH = img.naturalHeight * scale;
    const imgLeft = vw / 2 + transform.x - imgW / 2;
    const imgTop = vh / 2 + transform.y - imgH / 2;

    const sx = Math.max(0, -imgLeft / scale);
    const sy = Math.max(0, -imgTop / scale);
    const sw = Math.min(img.naturalWidth - sx, vw / scale);
    const sh = Math.min(img.naturalHeight - sy, vh / scale);

    const canvas = document.createElement("canvas");
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outputWidth, outputHeight);

    return new Promise<{ blob: Blob; url: string } | null>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          resolve({ blob, url: URL.createObjectURL(blob) });
        },
        "image/jpeg",
        0.95
      );
    });
  }, [imageSrc, outputWidth, outputHeight, transform, baseCover, natural.w]);

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLock = async () => {
    const result = await exportSelection();
    if (!result) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setPreviewUrl(result.url);
    setLocked(true);
    downloadBlob(result.blob);

    onLock({
      product,
      locked: true,
      transform,
      filename,
      previewUrl: result.url,
    });
  };

  const handleUnlock = () => {
    setLocked(false);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onUnlock(product);
  };

  const nudgeScale = (delta: number) => {
    if (locked) return;
    setTransform((t) => ({
      ...t,
      scale: Math.min(4, Math.max(0.6, +(t.scale + delta).toFixed(3))),
    }));
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (locked) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      tx: transform.x,
      ty: transform.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || locked) return;
    setTransform((t) => ({
      ...t,
      x: dragStart.current.tx + (e.clientX - dragStart.current.x),
      y: dragStart.current.ty + (e.clientY - dragStart.current.y),
    }));
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="silk-editor">
      <div
        ref={viewportRef}
        className={`silk-editor__viewport${locked ? " silk-editor__viewport--locked" : ""}`}
        style={{ aspectRatio: `${aspectRatio}` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label={label}
      >
        {natural.w > 0 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt=""
            draggable={false}
            className="silk-editor__image"
            width={natural.w}
            height={natural.h}
            style={{
              transform: `translate(calc(-50% + ${transform.x}px), calc(-50% + ${transform.y}px)) scale(${totalScale})`,
            }}
          />
        )}
        {!locked && <span className="silk-editor__hint">Drag · + / − to zoom</span>}
        {locked && <span className="silk-editor__locked">Selection locked</span>}
      </div>

      <div className="silk-editor__controls">
        <button
          type="button"
          className="silk-editor__btn"
          onClick={() => nudgeScale(-0.15)}
          disabled={locked}
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          type="button"
          className="silk-editor__btn"
          onClick={() => nudgeScale(0.15)}
          disabled={locked}
          aria-label="Zoom in"
        >
          +
        </button>
        {!locked ? (
          <button
            type="button"
            className="silk-editor__btn silk-editor__btn--primary"
            onClick={handleLock}
          >
            Lock for print
          </button>
        ) : (
          <>
            <button
              type="button"
              className="silk-editor__btn silk-editor__btn--primary"
              onClick={async () => {
                const result = await exportSelection();
                if (result) downloadBlob(result.blob);
              }}
            >
              Download print file
            </button>
            <button type="button" className="silk-editor__btn" onClick={handleUnlock}>
              Adjust again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
