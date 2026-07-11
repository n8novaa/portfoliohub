import { useEffect, useRef } from "react";

type HeroBackgroundProps = {
  className?: string;
  intensity?: number;
  interactive?: boolean;
  initialOffset?: {
    x?: number;
    y?: number;
  };
  dark?: boolean;
};

export default function HeroBackground({
  className = "",
  intensity = 1,
  interactive = true,
  initialOffset,
  dark = true,
}: HeroBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<PointerEvent | Touch | null>(null);

  const schedule = () => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;

      const host = ref.current;
      const ev = pendingRef.current;

      if (!host || !ev) return;

      const rect = host.getBoundingClientRect();

      const px =
        ("clientX" in ev ? ev.clientX : 0) -
        rect.left -
        rect.width / 2;

      const py =
        ("clientY" in ev ? ev.clientY : 0) -
        rect.top -
        rect.height / 2;

      const prefersReduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const k = prefersReduced ? 0.05 : intensity * 0.22;

      host.style.setProperty("--posX", String(px * k));
      host.style.setProperty("--posY", String(py * k));
    });
  };

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    host.style.setProperty("--posX", String(initialOffset?.x ?? 0));
    host.style.setProperty("--posY", String(initialOffset?.y ?? 0));

    if (!interactive) return;

    const pointer = (e: PointerEvent) => {
      pendingRef.current = e;
      schedule();
    };

    const touch = (e: TouchEvent) => {
      if (!e.touches.length) return;
      pendingRef.current = e.touches[0];
      schedule();
    };

    const reset = () => {
      host.style.setProperty("--posX", "0");
      host.style.setProperty("--posY", "0");
    };

    host.addEventListener("pointermove", pointer, { passive: true });
    host.addEventListener("touchmove", touch, { passive: true });
    host.addEventListener("pointerleave", reset);
    host.addEventListener("touchend", reset);

    return () => {
      host.removeEventListener("pointermove", pointer);
      host.removeEventListener("touchmove", touch);
      host.removeEventListener("pointerleave", reset);
      host.removeEventListener("touchend", reset);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interactive, intensity, initialOffset?.x, initialOffset?.y]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,

          "--posX": "0",
          "--posY": "0",
        } as React.CSSProperties
      }
    >
      {/* Base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#09090B",
        }}
      />

      {/* Interactive Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transition: "opacity .4s ease",

          background: `
          
          linear-gradient(
          180deg,
          #09090B 0%,
          #09090B 100%
          ),

          radial-gradient(
          140% 140%
          at calc(20% + var(--posX)*1px)
          calc(15% + var(--posY)*1px),
          rgba(124,58,237,.45),
          transparent 65%
          ),

          radial-gradient(
          130% 130%
          at calc(80% - var(--posX)*1px)
          calc(20% - var(--posY)*1px),
          rgba(37,99,235,.38),
          transparent 65%
          ),

          radial-gradient(
          180% 180%
          at calc(50% + var(--posX)*0.5px)
          calc(90% + var(--posY)*0.5px),
          rgba(6,182,212,.18),
          transparent 70%
          ),

          radial-gradient(
          120% 120%
          at calc(95% - var(--posX)*0.7px)
          calc(60% - var(--posY)*0.7px),
          rgba(168,85,247,.18),
          transparent 65%
          )

          `,

          backgroundBlendMode:
            "normal, screen, screen, soft-light, overlay",
        }}
      />

      {/* Noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.35) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Top fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(9,9,11,.05), rgba(9,9,11,.55) 80%, rgba(9,9,11,.9))",
        }}
      />
    </div>
  );
}