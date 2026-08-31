import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';

export default function Navbar({ darkMode, toggleDarkMode }) {
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
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 backdrop-blur-md bg-[#f8f9fa]/80 dark:bg-[#09090b]/80 border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          ref={logoRef}
          className="group flex items-center gap-2 text-xl font-bold font-syne tracking-tight"
        >
          <span className="relative text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-300">
            AZIZ<span className="text-red-600">.</span>AABBOUR
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 font-sans uppercase">
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
              className="relative py-1 group hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Action Controls: Theme Toggle + CTA Button */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all duration-300 cursor-pointer flex items-center justify-center border border-zinc-300/60 dark:border-zinc-700/60 shadow-sm"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 overflow-hidden shadow-sm hover:shadow-red-600/20 hover:shadow-lg transition-all duration-300"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Let's Connect
            </span>
            <ArrowUpRight className="w-4 h-4 relative z-10 text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span className="absolute inset-0 bg-red-600 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </a>
        </div>
      </div>
    </header>
  );
}
