import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import HalftoneReveal from './HalftoneReveal';
import { Sliders, Sparkles, Layers } from 'lucide-react';
import './ParallaxStack.css';

/**
 * ParallaxStack
 * Interactive Halftone Reveal integration:
 *   Top Halftone image  → zindex+1.jpg
 *   Hover Reveal image  → zindex-1.jpg
 */
export default function ParallaxStack() {
  const wrapRef = useRef(null);
  const glowRef = useRef(null);

  const [mode, setMode] = useState('mono');
  const [shape, setShape] = useState('circle');

  const getNormalized = useCallback((e) => {
    if (!wrapRef.current) return { x: 0, y: 0 };
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    return { x, y };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap) return;

    const onEnter = () => {
      gsap.to(wrap, {
        scale: 1.02,
        boxShadow: '0 30px 80px rgba(220, 38, 38, 0.25)',
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onMove = (e) => {
      const { x, y } = getNormalized(e);

      gsap.to(wrap, {
        rotateX: -y * 8,
        rotateY: x * 8,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      if (glow) {
        const rect = wrap.getBoundingClientRect();
        gsap.to(glow, {
          left: e.clientX - rect.left,
          top: e.clientY - rect.top,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(glow, { opacity: 1, duration: 0.2 });
      }
    };

    const onLeave = () => {
      gsap.to(wrap, {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        duration: 0.8,
        ease: 'expo.out',
        overwrite: 'auto',
      });
      if (glow) {
        gsap.to(glow, { opacity: 0, duration: 0.3 });
      }
    };

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);

    return () => {
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, [getNormalized]);

  return (
    <div className="pstack-outer">
      {/* Floating Header */}
      <div className="flex items-center justify-between w-full max-w-[460px] px-1">
        <p className="pstack-label flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          Interactive Halftone Reveal
        </p>
        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-200/80 px-2 py-0.5 rounded border border-zinc-300/50">
          zindex+1 → zindex-1
        </span>
      </div>

      {/* Main Container */}
      <div ref={wrapRef} className="pstack-wrap border border-zinc-200 shadow-xl">
        <HalftoneReveal
          src="/zindex+1.jpg"
          revealSrc="/zindex-1.jpg"
          inkColor="#09090b"
          paperColor="#ffffff"
          mode={mode}
          dotDensity={71}
          angle={45}
          revealRadius={0.42}
          dotSize={1}
          shape={shape}
          contrast={1.15}
          invert={false}
          edge={0.8}
          follow={0.37}
          idleReveal={0}
          trigger="hover"
          borderRadius="24px"
          className="w-full h-full"
        />

        {/* cursor glow */}
        <div ref={glowRef} className="pstack-glow" />

        {/* corner hint badge */}
        <div className="pstack-badge">
          <span className="pstack-badge-dot" />
          Hover over zindex+1 to reveal zindex-1
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="w-full max-w-[460px] bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-zinc-200/80 shadow-sm space-y-2.5 mt-2">
        <div className="flex items-center justify-between text-xs text-zinc-600">
          <span className="font-semibold flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-red-600" /> Mode:
          </span>
          <div className="flex gap-1">
            {['mono', 'duotone', 'color'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                  mode === m
                    ? 'bg-red-600 text-white shadow-sm font-semibold'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-600">
          <span className="font-semibold flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-red-600" /> Shape:
          </span>
          <div className="flex gap-1">
            {['circle', 'square', 'diamond', 'line'].map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`px-2.5 py-0.5 text-[11px] font-mono rounded capitalize transition-all cursor-pointer ${
                  shape === s
                    ? 'bg-zinc-900 text-white font-semibold'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
