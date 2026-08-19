import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { useSpring, useMotionValue } from 'framer-motion';

/* Marker locations — representative global cities. */
type Marker = { location: [number, number]; size: number };

const MARKERS: Marker[] = [
  { location: [14.5995, 120.9842], size: 0.03 }, // Manila
  { location: [19.076, 72.8777], size: 0.05 }, // Mumbai
  { location: [23.8103, 90.4125], size: 0.03 }, // Dhaka
  { location: [30.0444, 31.2357], size: 0.04 }, // Cairo
  { location: [39.9042, 116.4074], size: 0.06 }, // Beijing
  { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo
  { location: [19.4326, -99.1332], size: 0.04 }, // Mexico City
  { location: [40.7128, -74.006], size: 0.07 }, // New York
  { location: [34.6937, 135.5022], size: 0.04 }, // Osaka
  { location: [41.0082, 28.9784], size: 0.04 }, // Istanbul
  { location: [51.5074, -0.1278], size: 0.06 }, // London
  { location: [48.8566, 2.3522], size: 0.05 }, // Paris
];

interface InteractiveGlobeProps {
  /** Width classes on the wrapper (aspect-square keeps it circular). */
  className?: string;
}

/**
 * The draggable, auto-rotating cobe globe. Self-contained: renders the canvas,
 * drives the render loop, handles drag with spring physics, and fades in.
 * Size is controlled by the caller via `className` (wrapper is aspect-square).
 */
export function InteractiveGlobe({ className = '' }: InteractiveGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const phiRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const pointerActiveRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);

  const dragOffset = useMotionValue(0);
  const springOffset = useSpring(dragOffset, { mass: 1, stiffness: 280, damping: 40 });

  /* Fade-in: start hidden, appear 100ms later over 1000ms. */
  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setVisible(true), 100);
    return () => window.clearTimeout(fadeTimer);
  }, []);

  /* Create/destroy the WebGL globe. Resizing a canvas resets its WebGL
     context, so the globe is rebuilt (not re-scaled) on resize. */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let globe: ReturnType<typeof createGlobe> | null = null;

    const initGlobe = () => {
      globe?.destroy();
      canvas.width = Math.round(wrapper.offsetWidth) * 2;
      canvas.height = Math.round(wrapper.offsetHeight) * 2;
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: canvas.width,
        height: canvas.height,
        phi: 0,
        theta: 0.3,
        dark: 0,
        diffuse: 0.8,
        mapSamples: 16000,
        mapBrightness: 1.8,
        mapBaseBrightness: 0.01,
        baseColor: [0.95, 0.95, 0.97],
        markerColor: [0.145, 0.388, 0.922],
        glowColor: [0.82, 0.82, 0.86],
        markers: MARKERS,
        onRender: (state) => {
          // Auto-rotate; pause while the user is dragging.
          if (!draggingRef.current) phiRef.current += 0.005;
          state.phi = phiRef.current + springOffset.get();
        },
      });
    };

    initGlobe();
    window.addEventListener('resize', initGlobe);

    return () => {
      window.removeEventListener('resize', initGlobe);
      globe?.destroy();
    };
  }, [springOffset]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerActiveRef.current = true;
    dragStartXRef.current = e.clientX;
    draggingRef.current = true;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerActiveRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    const divisor = e.pointerType === 'touch' ? 100 : 200;
    dragOffset.set(delta / divisor);
  };

  const release = () => {
    if (!pointerActiveRef.current) return;
    pointerActiveRef.current = false;
    draggingRef.current = false;
    setDragging(false);
    // Fold the drag offset into the base rotation so the globe keeps spinning
    // from where it was released instead of snapping back.
    phiRef.current += springOffset.get();
    dragOffset.set(0);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative aspect-square ${className}`}
      style={{
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={release}
      onPointerCancel={release}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 1000ms ease',
          contain: 'layout paint size',
        }}
      />
      {/* Soft edge fade into the page background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.3) 45%, #FFFFFF 60%)',
        }}
      />
    </div>
  );
}

/** Full-screen white landing page with a centered, draggable globe. */
export function GlobePage() {
  /* Lock the page to a clean white full-viewport canvas while this route is live. */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlBg: html.style.background,
      bodyBg: body.style.background,
    };
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.style.background = '#FFFFFF';
    body.style.background = '#FFFFFF';

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      html.style.background = prev.htmlBg;
      body.style.background = prev.bodyBg;
    };
  }, []);

  return (
    <div
      className="flex h-screen w-full items-center justify-center"
      style={{ background: '#FFFFFF' }}
    >
      <InteractiveGlobe className="w-[min(600px,90vw)] md:w-[700px] lg:w-[800px]" />
    </div>
  );
}
