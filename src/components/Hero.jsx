import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Sparkles, Code2, Globe } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  // Mouse spotlight mask coordinates
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovered(true));
      container.addEventListener('mouseleave', () => setIsHovered(false));
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovered(true));
        container.removeEventListener('mouseleave', () => setIsHovered(false));
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
      )
        .fromTo(
          heading1Ref.current,
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 80, opacity: 0 },
          { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, opacity: 1 },
          '-=0.4'
        )
        .fromTo(
          heading2Ref.current,
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 80, opacity: 0 },
          { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, opacity: 1 },
          '-=0.8'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)' },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center overflow-hidden bg-spider-grid"
    >
      {/* Dark Reveal Spotlight Mask Layer */}
      <div
        className="absolute inset-0 bg-[#09090b] text-white pointer-events-none transition-opacity duration-500 bg-spider-grid-dark"
        style={{
          clipPath: isHovered
            ? `circle(180px at ${mousePos.x}px ${mousePos.y}px)`
            : `circle(0px at 0px 0px)`,
          WebkitClipPath: isHovered
            ? `circle(180px at ${mousePos.x}px ${mousePos.y}px)`
            : `circle(0px at 0px 0px)`,
        }}
      >
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 opacity-90">
          <p className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4">
            [ MATRIX SPIDER REVEAL MODE ACTIVE ]
          </p>
          <h1 className="font-outfit text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-100 uppercase leading-[0.9]">
            SRII TECH
          </h1>
          <p className="mt-6 text-zinc-400 font-sans max-w-xl text-lg">
            High-velocity web architecture, interactive GSAP motion physics, and clean scalable React engineering.
          </p>
        </div>
      </div>

      {/* Main Base Hero Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Eyebrow */}
        <div ref={tagRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/5 border border-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider text-red-600 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-red-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Full-Stack Engineer & GSAP Motion Specialist</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
        </div>

        {/* Large Editorial Headline */}
        <div className="overflow-hidden">
          <h1
            ref={heading1Ref}
            className="font-outfit text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900"
          >
            CREATIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-zinc-900">DEVELOPER</span>
          </h1>
        </div>

        <div className="overflow-hidden mt-2">
          <h1
            ref={heading2Ref}
            className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter italic uppercase leading-[0.88] text-zinc-900"
          >
            & MOTION <span className="underline decoration-red-600 decoration-4 md:decoration-8 underline-offset-8">ARCHITECT</span>
          </h1>
        </div>

        {/* Description & Metrics Grid */}
        <div ref={descRef} className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-7 text-lg md:text-2xl text-zinc-700 font-sans font-light leading-relaxed">
            Crafting bespoke web applications with physical motion systems, smooth GSAP ScrollTrigger choreography, and production-grade full-stack architectures.
          </p>

          <div className="md:col-span-5 flex flex-wrap md:justify-end gap-6 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-600 bg-white/80 backdrop-blur px-3 py-2 rounded-lg border border-zinc-200 shadow-sm">
              <Code2 className="w-4 h-4 text-red-600" />
              <span>React 19 + GSAP 3</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 bg-white/80 backdrop-blur px-3 py-2 rounded-lg border border-zinc-200 shadow-sm">
              <Globe className="w-4 h-4 text-red-600" />
              <span>Available for Hire</span>
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div ref={ctaRef} className="mt-10 md:mt-14 flex flex-wrap items-center gap-4">
          <a
            href="#about"
            className="group relative px-8 py-4 rounded-full bg-red-600 text-white font-bold text-sm uppercase tracking-wider overflow-hidden shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Portfolio
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
            <span className="absolute inset-0 bg-zinc-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </a>

          <a
            href="#projects"
            className="px-8 py-4 rounded-full border border-zinc-900/20 hover:border-zinc-900 text-zinc-900 font-bold text-sm uppercase tracking-wider hover:bg-zinc-900 hover:text-white transition-all duration-300"
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400 text-xs font-mono">
        <span className="uppercase tracking-widest">Scroll to explore</span>
        <div className="w-5 h-9 rounded-full border-2 border-zinc-300 p-1 flex justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
