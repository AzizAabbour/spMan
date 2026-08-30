import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Code2, Globe } from 'lucide-react';
import ParallaxStack from './ParallaxStack';

export default function Hero() {
  const containerRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);



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


      {/* Main Base Hero Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* ── Two-column grid: text left, ParallaxStack right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ─── LEFT: Text content ─── */}
          <div>
            {/* Large Editorial Headline */}
            <div className="overflow-hidden">
              <h1
                ref={heading1Ref}
                className="font-outfit text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900"
              >
                CREATIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-zinc-900">DEVELOPER</span>
              </h1>
            </div>

            <div className="overflow-hidden mt-2">
              <h1
                ref={heading2Ref}
                className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter italic uppercase leading-[0.88] text-zinc-900"
              >
                & MOTION <span className="underline decoration-red-600 decoration-4 md:decoration-8 underline-offset-8">ARCHITECT</span>
              </h1>
            </div>

            {/* Description & Metrics */}
            <div ref={descRef} className="mt-8 md:mt-12 space-y-6">
              <p className="text-lg md:text-xl text-zinc-700 font-sans font-light leading-relaxed max-w-lg">
                Crafting bespoke web applications with physical motion systems, smooth GSAP ScrollTrigger choreography, and production-grade full-stack architectures.
              </p>

              <div className="flex flex-wrap gap-3 text-xs font-mono">
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

          {/* ─── RIGHT: ParallaxStack ─── */}
          <div className="hidden lg:flex justify-center items-center">
            <ParallaxStack />
          </div>

        </div>
      </div>

    </section>
  );
}
