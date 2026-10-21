import { logoPixelSize } from "./pipeline";
import logoUrl from "../../logo.svg?url";

export async function rasterizeLogo(
  size: number,
  signal?: AbortSignal
): Promise<HTMLCanvasElement> {
  if (signal?.aborted)
    throw new DOMException("Logo rasterization aborted.", "AbortError");
  const [width, height] = logoPixelSize(size);
  const pad = 3;
  const canvas = document.createElement("canvas");
  canvas.width = width + pad * 2;
  canvas.height = height + pad * 2;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create the logo raster canvas.");
  const image = new Image();
  let abort: (() => void) | undefined;
  const loaded = new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () =>
      reject(new Error("Could not decode logo.svg."));
    abort = () => {
      image.onload = null;
      image.onerror = null;
      image.src = "";
      reject(new DOMException("Logo rasterization aborted.", "AbortError"));
    };
    signal?.addEventListener("abort", abort, { once: true });
  });
  if (signal?.aborted) abort?.();
  else image.src = logoUrl;
  try {
    await loaded;
  } finally {
    image.onload = null;
    image.onerror = null;
    if (abort) signal?.removeEventListener("abort", abort);
  }
  if (signal?.aborted)
    throw new DOMException("Logo rasterization aborted.", "AbortError");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, pad, pad, width, height);
  return canvas;
}
