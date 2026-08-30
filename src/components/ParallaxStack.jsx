import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import './ParallaxStack.css';

/**
 * ParallaxStack
 * Two-image cinematic depth stacking:
 *   zindex-1.jpg  →  z-index: 1  (background layer)
 *   zindex+1.jpg  →  z-index: 2  (foreground layer)
 *
 * On mouse move: foreground slides slightly toward cursor,
 * background slides slightly away — creating a convincing
 * depth-of-parallax illusion.
 */
export default function ParallaxStack() {
  const wrapRef = useRef(null);
  const bgRef   = useRef(null);
  const fgRef   = useRef(null);
  const glowRef = useRef(null);

  /* ─── helpers ─── */
  const getNormalized = useCallback((e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    return { x, y };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bg   = bgRef.current;
    const fg   = fgRef.current;
    const glow = glowRef.current;

    /* ─── ENTER ─── */
    const onEnter = () => {
      gsap.to(wrap, {
        scale: 1.03,
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.35)',
        duration: 0.6,
        ease: 'power3.out',
      });
      // Reveal zindex-1 behind zindex+1 on hover by reducing fg opacity & scaling bg
      gsap.to(fg, {
        opacity: 0.2,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(bg, {
        scale: 1.08,
        filter: 'brightness(1.1) contrast(1.15)',
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    /* ─── MOVE ─── */
    const onMove = (e) => {
      const { x, y } = getNormalized(e);

      // Foreground (zindex+1.jpg) moves smoothly within tight bounds
      gsap.to(fg, {
        x: x * 30,
        y: y * 22,
        rotateX: -y * 5,
        rotateY:  x * 5,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      // Background (zindex-1.jpg - Face) moves in opposite direction
      gsap.to(bg, {
        x: x * -20,
        y: y * -15,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      // Cursor glow
      if (glow) {
        const rect = wrap.getBoundingClientRect();
        gsap.to(glow, {
          left: e.clientX - rect.left,
          top:  e.clientY - rect.top,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(glow, { opacity: 1, duration: 0.3 });
      }
    };

    /* ─── LEAVE ─── */
    const onLeave = () => {
      gsap.to(wrap, {
        scale: 1,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.18)',
        duration: 0.8,
        ease: 'expo.out',
      });
      gsap.to(fg, {
        x: 0,
        y: 0,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'expo.out',
        overwrite: 'auto',
      });
      gsap.to(bg, {
        x: 0,
        y: 0,
        scale: 1,
        filter: 'brightness(0.95) contrast(1.05)',
        duration: 0.8,
        ease: 'expo.out',
        overwrite: 'auto',
      });
      if (glow) {
        gsap.to(glow, { opacity: 0, duration: 0.4 });
      }
    };

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mousemove',  onMove);
    wrap.addEventListener('mouseleave', onLeave);

    return () => {
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mousemove',  onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, [getNormalized]);

  return (
    <div className="pstack-outer">
      {/* floating label */}
      <p className="pstack-label">Interactive Preview</p>

      <div ref={wrapRef} className="pstack-wrap">
        {/* ── BACKGROUND IMAGE  z-index: 1 ── */}
        <img
          ref={bgRef}
          src="/zindex-1.jpg"
          alt="Background layer"
          className="pstack-img pstack-bg"
          draggable={false}
        />

        {/* ── FOREGROUND IMAGE  z-index: 2 ── */}
        <img
          ref={fgRef}
          src="/zindex+1.jpg"
          alt="Foreground layer"
          className="pstack-img pstack-fg"
          draggable={false}
        />

        {/* cursor glow */}
        <div ref={glowRef} className="pstack-glow" />

        {/* corner hint badge */}
        <div className="pstack-badge">
          <span className="pstack-badge-dot" />
          Hover to explore
        </div>
      </div>
    </div>
  );
}
