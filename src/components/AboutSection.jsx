import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpiderWebDecor from './SpiderWebDecor';
import { Code, Terminal, Layers, Cpu, Database, Server, Container, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  { name: 'React 19', icon: Code, cat: 'Frontend' },
  { name: 'GSAP Motion', icon: Sparkles, cat: 'Animation' },
  { name: 'Node.js', icon: Server, cat: 'Backend' },
  { name: 'Express', icon: Terminal, cat: 'API' },
  { name: 'PostgreSQL', icon: Database, cat: 'Database' },
  { name: 'MongoDB', icon: Layers, cat: 'Database' },
  { name: 'Docker', icon: Container, cat: 'DevOps' },
  { name: 'Tailwind CSS', icon: Cpu, cat: 'Styling' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  
  // Hanging Profile Refs
  const hangingContainerRef = useRef(null);
  const profileFrameRef = useRef(null);
  
  // Content Refs
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphContainerRef = useRef(null);
  const paragraphsRef = useRef([]);

  // Tech Pills Refs
  const pillsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Timeline triggered by ScrollTrigger
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Step A: Eyebrow slide & clip-path reveal
      entranceTl.fromTo(
        eyebrowRef.current,
        { x: -60, opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        { x: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.9, ease: 'power3.out' }
      );

      // Step B: Heading clip-path reveal from below
      entranceTl.fromTo(
        headingRef.current,
        { y: 70, opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.1, ease: 'power4.out' },
        '-=0.5'
      );

      // Step C: Hanging profile drops from ceiling with physical elastic bounce (Prompt requirement: y: -800)
      entranceTl.fromTo(
        hangingContainerRef.current,
        { y: -800, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: 'elastic.out(1, 0.4)' },
        '-=0.8'
      );

      // Step D: 3D Paragraph reveal (perspective: 1000px, rotationX: -45, stagger: 0.15)
      entranceTl.fromTo(
        paragraphsRef.current,
        { y: 40, opacity: 0, rotationX: -45, transformOrigin: 'bottom center' },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.2)' },
        '-=1.0'
      );

      // Step E: Tech pills scale-in with stagger (scale: 0.5 -> 1, back.out)
      entranceTl.fromTo(
        pillsRef.current,
        { scale: 0.5, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(1.7)' },
        '-=0.6'
      );

      // 2. Decoupled Continuous Ambient Animations

      // Ambient A: Continuous pendulum swing for hanging object (transformOrigin: top center, 2-3 degrees)
      gsap.to(hangingContainerRef.current, {
        rotation: 2.5,
        transformOrigin: 'top center',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Ambient B: Breathing glow for circular profile frame (boxShadow animation)
      gsap.to(profileFrameRef.current, {
        boxShadow: '0 0 35px 8px rgba(220, 38, 38, 0.45)',
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Ambient C: Gentle vertical floating for tech stack pills (staggered randomly)
      pillsRef.current.forEach((pill, idx) => {
        if (!pill) return;
        gsap.to(pill, {
          y: (idx % 2 === 0 ? 5 : -5),
          duration: 2 + (idx % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.15,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#f8f9fa] dark:bg-[#09090b] border-t border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden transition-colors duration-300"
    >
      {/* Corner Spider Web Ambient Decor */}
      <SpiderWebDecor containerRef={sectionRef} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Hanging Profile Image Suspended from Ceiling */}
          <div className="lg:col-span-5 flex flex-col items-center justify-start pt-4 lg:pt-0">
            {/* Hanging Container Ref */}
            <div ref={hangingContainerRef} className="relative flex flex-col items-center group cursor-pointer">
              
              {/* Ceiling Anchor Point */}
              <div className="w-3 h-3 rounded-full bg-zinc-900 dark:bg-white border-2 border-red-600 shadow-md z-20" />

              {/* Long Thin Suspension Thread (Longer on Desktop as required) */}
              <div className="w-[1.5px] h-32 md:h-52 bg-gradient-to-b from-red-600 via-zinc-800 dark:via-zinc-400 to-red-600/80 shadow-sm relative">
                {/* Micro Spider Decor sliding on thread */}
                <div className="absolute top-1/2 -left-1.5 w-3 h-3 text-red-600 animate-pulse">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="6" />
                  </svg>
                </div>
              </div>

              {/* Circular Profile Frame */}
              <div
                ref={profileFrameRef}
                className="relative w-60 h-60 md:w-72 md:h-72 rounded-full p-2 bg-gradient-to-tr from-zinc-900 dark:from-zinc-800 via-red-600 to-zinc-900 dark:to-zinc-800 border-4 border-zinc-900 dark:border-zinc-950 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ boxShadow: '0 0 15px 2px rgba(220, 38, 38, 0.2)' }}
              >
                {/* Circular Profile Image (Grayscale default, full color on hover) */}
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src="/profile.jpg"
                    alt="Developer Portrait"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  {/* Subtle vignette layer */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full pointer-events-none" />
                </div>

                {/* Suspension Ring Anchor */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-red-600 bg-zinc-900 dark:bg-zinc-800 shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                </div>
              </div>

              {/* Suspension Caption */}
              <div className="mt-6 text-center">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-300/40 dark:border-zinc-700/40">
                  SRII // SUSPENDED IN MOTION
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Content & 3D Paragraph Reveal */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Eyebrow Label with Spider Graphic */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-500 mb-4"
            >
              {/* Spider Icon SVG */}
              <svg className="w-4 h-4 fill-current text-red-600 dark:text-red-500 animate-bounce" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>// 01. ABOUT THE ARCHITECT</span>
            </div>

            {/* Large Italic Uppercase Heading with Clip-Path Reveal */}
            <div className="overflow-hidden mb-8">
              <h2
                ref={headingRef}
                className="font-syne text-4xl sm:text-5xl md:text-6xl font-extrabold italic uppercase tracking-tight text-zinc-900 dark:text-white leading-tight"
              >
                CRAFTING HIGH-PERFORMANCE <span className="text-red-600 dark:text-red-500">FULL-STACK</span> WEBS.
              </h2>
            </div>

            {/* 3D Paragraph Reveal Container (perspective: 1000px) */}
            <div ref={paragraphContainerRef} className="perspective-1000 space-y-6 text-zinc-700 dark:text-zinc-300 font-sans text-base md:text-lg leading-relaxed">
              <p
                ref={(el) => (paragraphsRef.current[0] = el)}
                className="backface-hidden"
              >
                I am a senior full-stack developer dedicated to bridging raw technical horsepower with fluid, high-end creative animations. My design architecture combines minimal editorial layouts with physical GSAP motion systems.
              </p>
              <p
                ref={(el) => (paragraphsRef.current[1] = el)}
                className="backface-hidden"
              >
                Whether engineering reactive frontend interfaces in React 19, choreographing complex canvas/webGL ScrollTrigger timelines, or crafting scalable microservice APIs in Node & PostgreSQL, every detail is engineered for maximum precision.
              </p>
              <p
                ref={(el) => (paragraphsRef.current[2] = el)}
                className="backface-hidden font-medium text-zinc-900 dark:text-zinc-100 border-l-2 border-red-600 pl-4"
              >
                "Motion isn't decorative—it's spatial feedback that makes digital tools feel physically alive."
              </p>
            </div>

            {/* TECH STACK PILLS SECTION */}
            <div id="tech-stack" className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6">
                // CORE TECH STACK & ENGINE PILLS
              </h3>

              <div className="flex flex-wrap gap-3">
                {TECH_STACK.map((tech, idx) => {
                  const IconComponent = tech.icon;
                  return (
                    <div
                      key={idx}
                      ref={(el) => (pillsRef.current[idx] = el)}
                      className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-zinc-800 dark:text-zinc-200 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-zinc-900 dark:hover:bg-red-600 hover:text-white dark:hover:text-white hover:border-zinc-900 dark:hover:border-red-600 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300"
                    >
                      <IconComponent className="w-4 h-4 text-red-600 dark:text-red-500 group-hover:text-red-500 dark:group-hover:text-white transition-colors" />
                      <span>{tech.name}</span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono group-hover:text-zinc-300 ml-1">
                        [{tech.cat}]
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
