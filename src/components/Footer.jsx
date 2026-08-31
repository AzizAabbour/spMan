import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 bg-[#f8f9fa] dark:bg-[#09090b] border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} <span className="font-bold text-zinc-900 dark:text-white">AZIZ AABBOUR </span> — ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>SYSTEMS OPERATIONAL // REACT 19 + GSAP 3</span>
        </div>
      </div>
    </footer>
  );
}
