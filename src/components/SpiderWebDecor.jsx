import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpiderWebDecor({ containerRef }) {
  const leftWebRef = useRef(null);
  const rightWebRef = useRef(null);
  const leftThreadRef = useRef(null);
  const rightThreadRef = useRef(null);

  useEffect(() => {
    const scope = containerRef?.current || document.body;
    const ctx = gsap.context(() => {
      // 1. Entrance timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Drop threads and scale webs in with elastic easing
      tl.fromTo(
        [leftThreadRef.current, rightThreadRef.current],
        { scaleY: 0, transformOrigin: 'top center', opacity: 0 },
        { scaleY: 1, opacity: 0.6, duration: 1.2, ease: 'power3.out' }
      ).fromTo(
        [leftWebRef.current, rightWebRef.current],
        { y: -120, opacity: 0, scale: 0.6 },
        { y: 0, opacity: 0.25, scale: 1, duration: 1.6, ease: 'elastic.out(1, 0.5)' },
        '-=0.8'
      );

      // 2. Separate infinite ambient rotation (Left: Clockwise, Right: Counter-clockwise)
      gsap.to(leftWebRef.current, {
        rotation: 360,
        duration: 90,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(rightWebRef.current, {
        rotation: -360,
        duration: 110,
        repeat: -1,
        ease: 'none',
      });
    }, scope);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Left Web Decor */}
      <div className="absolute top-0 left-4 md:left-12 flex flex-col items-center">
        {/* Thread connecting to top section */}
        <div 
          ref={leftThreadRef} 
          className="w-[1px] h-20 md:h-32 bg-gradient-to-b from-red-600/80 via-zinc-400/40 to-transparent" 
        />
        <div ref={leftWebRef} className="w-48 h-48 md:w-72 md:h-72 text-zinc-900/30 dark:text-red-900/30 -mt-6">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-current stroke-[0.8] opacity-25">
            {/* Radial Web Rays */}
            <line x1="100" y1="100" x2="100" y2="0" />
            <line x1="100" y1="100" x2="170" y2="30" />
            <line x1="100" y1="100" x2="200" y2="100" />
            <line x1="100" y1="100" x2="170" y2="170" />
            <line x1="100" y1="100" x2="100" y2="200" />
            <line x1="100" y1="100" x2="30" y2="170" />
            <line x1="100" y1="100" x2="0" y2="100" />
            <line x1="100" y1="100" x2="30" y2="30" />
            
            {/* Concentric Web Rings */}
            <polygon points="100,20 156,44 180,100 156,156 100,180 44,156 20,100 44,44" strokeDasharray="3 3" />
            <polygon points="100,40 142,58 160,100 142,142 100,160 58,142 40,100 58,58" strokeDasharray="2 2" />
            <polygon points="100,60 128,72 140,100 128,128 100,140 72,128 60,100 72,72" />
            <polygon points="100,80 114,86 120,100 114,114 100,120 86,114 80,100 86,86" />
            <circle cx="100" cy="100" r="4" fill="#dc2626" />
          </svg>
        </div>
      </div>

      {/* Right Web Decor */}
      <div className="absolute top-0 right-4 md:right-12 flex flex-col items-center">
        {/* Thread connecting to top section */}
        <div 
          ref={rightThreadRef} 
          className="w-[1px] h-28 md:h-40 bg-gradient-to-b from-red-600/80 via-zinc-400/40 to-transparent" 
        />
        <div ref={rightWebRef} className="w-56 h-56 md:w-80 md:h-80 text-zinc-900/30 dark:text-red-900/30 -mt-8">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-current stroke-[0.8] opacity-25">
            <line x1="100" y1="100" x2="100" y2="0" />
            <line x1="100" y1="100" x2="170" y2="30" />
            <line x1="100" y1="100" x2="200" y2="100" />
            <line x1="100" y1="100" x2="170" y2="170" />
            <line x1="100" y1="100" x2="100" y2="200" />
            <line x1="100" y1="100" x2="30" y2="170" />
            <line x1="100" y1="100" x2="0" y2="100" />
            <line x1="100" y1="100" x2="30" y2="30" />

            <polygon points="100,15 160,40 185,100 160,160 100,185 40,160 15,100 40,40" strokeDasharray="3 3" />
            <polygon points="100,35 145,55 165,100 145,145 100,165 55,145 35,100 55,55" />
            <polygon points="100,55 130,70 145,100 130,130 100,145 70,130 55,100 70,70" strokeDasharray="2 2" />
            <polygon points="100,75 115,82 125,100 115,115 100,125 85,115 75,100 85,85" />
            <circle cx="100" cy="100" r="4" fill="#dc2626" />
          </svg>
        </div>
      </div>
    </div>
  );
}
