import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import HalftoneReveal from './HalftoneReveal';
import { Sparkles } from 'lucide-react';
import './ParallaxStack.css';

/**
 * ParallaxStack
 * Interactive Cursor Reveal:
 *   Top image  → zindex+1.jpg (clean, full color image)
 *   Hover lens → zindex-1.jpg (gelatin liquid drop reveal)
 */
export default function ParallaxStack() {
  const wrapRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap) return;

    let rect = wrap.getBoundingClientRect();
    const updateRect = () => {
      if (wrap) rect = wrap.getBoundingClientRect();
    };

    const xTo = gsap.quickTo(wrap, "rotateY", { duration: 0.25, ease: "power2.out" });
    const yTo = gsap.quickTo(wrap, "rotateX", { duration: 0.25, ease: "power2.out" });
    const glowXTo = glow ? gsap.quickTo(glow, "left", { duration: 0.15, ease: "power2.out" }) : null;
    const glowYTo = glow ? gsap.quickTo(glow, "top", { duration: 0.15, ease: "power2.out" }) : null;

    const onEnter = () => {
      updateRect();
      gsap.to(wrap, {
        scale: 1.02,
        boxShadow: '0 30px 80px rgba(220, 38, 38, 0.25)',
        duration: 0.4,
        ease: 'power2.out',
      });
      if (glow) gsap.to(glow, { opacity: 1, duration: 0.2 });
    };

    const onMove = (e) => {
      if (!rect || rect.width === 0) updateRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      xTo(normX * 10);
      yTo(-normY * 10);

      if (glow && glowXTo && glowYTo) {
        glowXTo(e.clientX - rect.left);
        glowYTo(e.clientY - rect.top);
      }
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(wrap, {
        scale: 1,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        duration: 0.6,
        ease: 'power2.out',
      });
      if (glow) gsap.to(glow, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    wrap.addEventListener('mouseenter', onEnter, { passive: true });
    wrap.addEventListener('mousemove', onMove, { passive: true });
    wrap.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="pstack-outer">
      {/* Floating Header */}
      <div className="flex items-center justify-between w-full max-w-[460px] px-1">
        <p className="pstack-label flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
          Interactive Gelatin Reveal
        </p>
        <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-200/80 dark:bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-300/50 dark:border-zinc-700/50">
          zindex+1 → zindex-1
        </span>
      </div>

      {/* Main Container */}
      <div ref={wrapRef} className="pstack-wrap border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <HalftoneReveal
          src="/zindex+1.jpg"
          revealSrc="/zindex-1.jpg"
          enableHalftone={false}
          enableDistortion={false}
          enableGelatin={true}
          contrast={1.0}
          revealRadius={0.14}
          edge={0.8}
          follow={0.06}
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
          Hover to reveal zindex-1
        </div>
      </div>
    </div>
  );
}
