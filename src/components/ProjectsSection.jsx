import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'ARACHNE // REALTIME ANALYTICS MATRIX',
    subtitle: 'High-throughput full-stack telemetry platform with dynamic GSAP canvas visualizer.',
    category: 'Full-Stack Platform',
    tags: ['React 19', 'GSAP', 'Node.js', 'PostgreSQL', 'WebSockets'],
    image: '/project1.jpg',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: '02',
    title: 'VENOM // CREATIVE MOTION ENGINE',
    subtitle: 'Physics-based micro-interaction library for React & Next.js applications with 60fps GPU acceleration.',
    category: 'Motion Framework',
    tags: ['GSAP 3', 'ScrollTrigger', 'React', 'Tailwind CSS'],
    image: '/project2.jpg',
    github: 'https://github.com',
    live: 'https://example.com',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for Project Cards
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-white border-t border-zinc-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 mb-3">
              // 03. SELECTED WORKS & CASE STUDIES
            </div>
            <h2 className="font-syne text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-zinc-900">
              FEATURED <span className="text-red-600 italic">PROJECTS</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm font-mono text-zinc-500 max-w-xs">
            Hand-crafted full-stack architectures built with intentional motion and zero compromise.
          </p>
        </div>

        {/* Projects Cards List */}
        <div className="space-y-16 md:space-y-24">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 border border-zinc-200 rounded-3xl p-6 md:p-10 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/5 transition-all duration-500"
            >
              {/* Top Corner Spider Thread Decor on hover */}
              <div className="absolute top-0 right-12 w-[1px] h-8 bg-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Project Image Preview */}
              <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-zinc-200 relative aspect-video bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent pointer-events-none" />
                
                {/* ID Badge */}
                <div className="absolute top-4 left-4 font-mono font-bold text-xs bg-zinc-900/80 backdrop-blur text-white px-3 py-1.5 rounded-full border border-white/10">
                  {project.id}
                </div>
              </div>

              {/* Project Info & Description */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
                    [{project.category}]
                  </span>

                  <h3 className="font-outfit text-2xl md:text-3xl font-extrabold uppercase text-zinc-900 tracking-tight mt-2 group-hover:text-red-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-zinc-600 font-sans text-sm md:text-base leading-relaxed">
                    {project.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono font-semibold uppercase bg-zinc-200/80 text-zinc-800 px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Action Links */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-200">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase bg-zinc-900 text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition-colors duration-300 shadow-sm"
                  >
                    Live Demo
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase border border-zinc-300 text-zinc-700 px-4 py-2.5 rounded-full hover:border-zinc-900 hover:text-zinc-900 transition-colors duration-300"
                  >
                    <GithubIcon />
                    Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
