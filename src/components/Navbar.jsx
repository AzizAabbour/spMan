import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for Navbar
      gsap.fromTo(
        navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.4 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 backdrop-blur-md bg-[#f8f9fa]/80 border-b border-zinc-200/60"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          ref={logoRef}
          className="group flex items-center gap-2 text-xl font-bold font-syne tracking-tight"
        >
          <span className="relative text-zinc-900 group-hover:text-red-600 transition-colors duration-300">
            SRII<span className="text-red-600">.</span>TECH
          </span>
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse group-hover:scale-150 transition-transform duration-300" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-zinc-600 font-sans uppercase">
          {[
            { label: '// 01. About', href: '#about' },
            { label: '// 02. Tech Stack', href: '#tech-stack' },
            { label: '// 03. Projects', href: '#projects' },
            { label: '// 04. Contact', href: '#contact' },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              ref={(el) => (linksRef.current[idx] = el)}
              className="relative py-1 group hover:text-zinc-900 transition-colors"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white overflow-hidden shadow-sm hover:shadow-red-600/20 hover:shadow-lg transition-all duration-300"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Let's Connect
          </span>
          <ArrowUpRight className="w-4 h-4 relative z-10 text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          <span className="absolute inset-0 bg-red-600 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
        </a>
      </div>
    </header>
  );
}
