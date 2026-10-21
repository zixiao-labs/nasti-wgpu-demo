import { useEffect, useRef, useState } from "react";

import { createRenderer } from "./renderer";

export function FlareCanvas({ colorMode }: { readonly colorMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ReturnType<typeof createRenderer>>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;
    const renderer = createRenderer({ canvas });
    rendererRef.current = renderer;
    void renderer.ready.catch((cause: unknown) => {
      console.error("Could not initialize the flare renderer.", cause);
      if (mounted) {
        setError("WebGPU is unavailable. Try a current WebGPU-enabled browser.");
      }
    });

    return () => {
      mounted = false;
      if (rendererRef.current === renderer) rendererRef.current = null;
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    rendererRef.current?.setColorMode(colorMode);
  }, [colorMode]);

  return (
    <div className="flare-canvas">
      <canvas
        ref={canvasRef}
        className="flare-canvas__surface"
        aria-label="Interactive illuminated Zixiao Laboratories logo"
      />
      {error ? (
        <div className="flare-canvas__error" role="status">
          {error}
        </div>
      ) : null}
    </div>
  );
}
