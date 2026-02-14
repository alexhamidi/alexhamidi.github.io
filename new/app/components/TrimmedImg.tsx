"use client";

import { useRef, useState, useCallback } from "react";

const BRIGHTNESS_THRESHOLD = 40;
const BLACK_ROW_RATIO = 0.92;

function detectBlackBorders(img: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);

  const data = ctx.getImageData(0, 0, w, h).data;
  if (data[3] === 0) return null; // tainted canvas

  const isBlack = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    return data[i] < BRIGHTNESS_THRESHOLD && data[i + 1] < BRIGHTNESS_THRESHOLD && data[i + 2] < BRIGHTNESS_THRESHOLD;
  };

  const step = 2;

  const isBlackRow = (y: number) => {
    let black = 0;
    const samples = Math.ceil(w / step);
    for (let x = 0; x < w; x += step) {
      if (isBlack(x, y)) black++;
    }
    return black / samples >= BLACK_ROW_RATIO;
  };

  const isBlackCol = (x: number, yStart: number, yEnd: number) => {
    let black = 0;
    const samples = Math.ceil((yEnd - yStart) / step);
    for (let y = yStart; y < yEnd; y += step) {
      if (isBlack(x, y)) black++;
    }
    return black / samples >= BLACK_ROW_RATIO;
  };

  let top = 0;
  for (let y = 0; y < h; y++) {
    if (!isBlackRow(y)) break;
    top = y + 1;
  }

  let bottom = h;
  for (let y = h - 1; y >= top; y--) {
    if (!isBlackRow(y)) break;
    bottom = y;
  }

  let left = 0;
  for (let x = 0; x < w; x++) {
    if (!isBlackCol(x, top, bottom)) break;
    left = x + 1;
  }

  let right = w;
  for (let x = w - 1; x >= left; x--) {
    if (!isBlackCol(x, top, bottom)) break;
    right = x;
  }

  // only crop if border is thin (< 10% of dimension)
  const maxBorderX = w * 0.1;
  const maxBorderY = h * 0.1;
  if (top > maxBorderY) top = 0;
  if (h - bottom > maxBorderY) bottom = h;
  if (left > maxBorderX) left = 0;
  if (w - right > maxBorderX) right = w;

  if (top === 0 && bottom === h && left === 0 && right === w) return null;
  return { top, right: w - right, bottom: h - bottom, left, w, h };
}

export default function TrimmedImg({
  src,
  className,
  loading,
}: {
  src: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [clip, setClip] = useState<string | null>(null);

  const onLoad = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) return;
    try {
      const borders = detectBlackBorders(img);
      console.log("[TrimmedImg]", src, borders ?? "no borders");
      if (borders) {
        const { top, right, bottom, left } = borders;
        const tPct = (top / img.naturalHeight) * 100;
        const rPct = (right / img.naturalWidth) * 100;
        const bPct = (bottom / img.naturalHeight) * 100;
        const lPct = (left / img.naturalWidth) * 100;
        const clipVal = `inset(${tPct.toFixed(1)}% ${rPct.toFixed(1)}% ${bPct.toFixed(1)}% ${lPct.toFixed(1)}%)`;
        console.log("[TrimmedImg] applying clip:", clipVal, src);
        setClip(clipVal);
      }
    } catch {
      // canvas error — ignore
    }
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      className={className}
      loading={loading}
      decoding="async"
      crossOrigin="anonymous"
      onLoad={onLoad}
      style={clip ? { clipPath: clip } : undefined}
    />
  );
}
