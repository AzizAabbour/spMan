import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Copy, Check, ArrowUp, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
  </svg>
);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const email = 'azizaabbour77@gamilcom';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-[#f8f9fa] dark:bg-[#09090b] border-t border-zinc-200 dark:border-zinc-800 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Contact Matrix Card */}
        <div
          ref={cardRef}
          className="relative bg-zinc-900 text-white rounded-3xl p-8 md:p-16 border border-zinc-800 shadow-2xl overflow-hidden bg-spider-grid-dark"
        >
          {/* Subtle Red Radial Light Glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-xs font-mono font-semibold uppercase tracking-wider text-red-400 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>// 04. START A CONVERSATION</span>
          </div>

          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-tight text-white mb-6">
            LET'S WEAVE SOMETHING <span className="text-red-600 italic">EXTRAORDINARY.</span>
          </h2>

          <p className="text-zinc-400 font-sans text-base md:text-lg max-w-2xl leading-relaxed mb-10">
            Have a project in mind, an architectural challenge, or looking to build a high-performance web experience? Drop me a line and let's get building.
          </p>

          {/* Email Copy Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl">
            <div className="flex-1 flex items-center justify-between bg-zinc-800/80 border border-zinc-700 rounded-2xl px-5 py-4 text-zinc-100 font-mono text-sm md:text-base">
              <span className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500" />
                {email}
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-500 transition-colors shadow-lg shadow-red-600/20 active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links & Back to Top */}
          <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-6">
              {[
                { label: 'GITHUB', href: 'https://github.com/AzizAabbour', icon: GithubIcon },
                { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/aziz-aabbour-1143b1351/', icon: LinkedinIcon },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <span className="text-red-500"><Icon /></span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
