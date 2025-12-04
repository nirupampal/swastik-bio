// src/components/Parallax.jsx
import React, { useRef, useEffect } from "react";

/**
 * Simple, performant Parallax wrapper.
 * Props:
 *  - depth: multiplier (small number). Larger => more movement. Default 0.08
 *  - pointerFactor: how strong pointer movement maps to transform. Default 18
 *  - scrollFactor: how much page scroll affects translateY. Default 0.08
 *  - className/style passthrough.
 */
export default function Parallax({
  children,
  depth = 0.08,
  pointerFactor = 18,
  scrollFactor = 0.08,
  className = "",
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  const state = useRef({
    targetX: 0,
    targetY: 0,
    lastX: 0,
    lastY: 0,
    lastScroll: 0,
    ticking: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Handler: pointer move (global)
    function onPointerMove(e) {
      // disable pointer parallax on small devices
      if (window.innerWidth < 640) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // normalize by size to make movement consistent
      const nx = (e.clientX - cx) / rect.width;
      const ny = (e.clientY - cy) / rect.height;
      state.current.targetX = nx * pointerFactor * depth;
      state.current.targetY = ny * pointerFactor * depth;
      requestTick();
    }

    // Handler: scroll
    function onScroll() {
      state.current.lastScroll = window.scrollY || window.pageYOffset;
      requestTick();
    }

    function update() {
      state.current.ticking = false;
      // smooth toward target
      state.current.lastX += (state.current.targetX - state.current.lastX) * 0.12;
      state.current.lastY += (state.current.targetY - state.current.lastY) * 0.12;

      const scrollTranslate = -state.current.lastScroll * scrollFactor * depth;

      const x = state.current.lastX;
      const y = state.current.lastY + scrollTranslate;

      // Use translate3d for GPU acceleration
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.style.willChange = "transform";
    }

    function requestTick() {
      if (!state.current.ticking) {
        state.current.ticking = true;
        requestAnimationFrame(update);
      }
    }

    // initial scroll
    state.current.lastScroll = window.scrollY || window.pageYOffset;
    requestTick();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [depth, pointerFactor, scrollFactor]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "transform 0.08s linear",
        transform: "translate3d(0,0,0)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
