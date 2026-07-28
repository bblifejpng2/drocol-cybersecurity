import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#F3EDE2]">

      {/* ── Aurora background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}/>
        {/* Primary orange aurora */}
        <div className="absolute -top-40 -left-40 w-[900px] h-[700px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        {/* Secondary blue aurora */}
        <div className="absolute -bottom-60 right-0 w-[700px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)', filter: 'blur(100px)' }}/>
        {/* Tertiary purple */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        {/* Fine dot grid */}
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}/>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F3EDE2] to-transparent"/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left Column ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-neutral-900/10 bg-neutral-900/[0.04] backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E87722] opacity-75"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E87722]"/>
              </span>
              <span className="text-[11px] font-inter font-semibold tracking-widest text-neutral-600 uppercase">Protecting 250+ Nigerian Organizations</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-[80px] font-bold leading-[1.0] tracking-[-0.03em] mb-6 text-neutral-900 font-sans">
              Enterprise<br/>
              <span className="text-neutral-900">Cyber</span><span className="text-transparent bg-clip-text" style={{
                backgroundImage: 'linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)',
              }}>security</span><br/>
              <span className="italic font-light text-neutral-500 text-4xl sm:text-5xl md:text-[64px] tracking-[-0.02em]">Made Intelligent.</span>
            </h1>

            <p className="text-base md:text-lg text-neutral-600 max-w-lg mb-10 font-inter leading-relaxed">
              Real-time threat detection, attack path analysis, and developer-ready APIs. Built by Nigerians, for Nigerian enterprises.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #E87722 0%, #F5A623 100%)', boxShadow: '0 0 0 1px rgba(232,119,34,0.3), 0 8px 32px rgba(232,119,34,0.25)' }}
              >
                Start Free Trial
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5}/>
              </a>
              <a
                href="#features"
                onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-neutral-700 border border-neutral-900/10 bg-neutral-900/[0.04] backdrop-blur-sm hover:bg-neutral-900/[0.08] hover:text-neutral-900 transition-all duration-300"
              >
                Learn About Us
              </a>
            </div>

            {/* Trust stats row */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900/[0.06] border border-neutral-900/10 flex items-center justify-center">
                  <Shield size={14} className="text-[#E87722]"/>
                </div>
                <div>
                  <div className="text-neutral-900 font-semibold text-xs">99.98% Uptime</div>
                  <div className="text-neutral-500 text-[11px] font-inter">SLA guaranteed</div>
                </div>
              </div>
              <div className="w-px h-8 bg-neutral-900/10"/>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900/[0.06] border border-neutral-900/10 flex items-center justify-center">
                  <Zap size={14} className="text-[#E87722]"/>
                </div>
                <div>
                  <div className="text-neutral-900 font-semibold text-xs">45M+ Threats</div>
                  <div className="text-neutral-500 text-[11px] font-inter">Blocked this month</div>
                </div>
              </div>
              <div className="w-px h-8 bg-neutral-900/10"/>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                <span className="text-neutral-600 text-[11px] font-inter font-medium">24/7 Nigerian Support</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Image frame */}
            <div className="relative w-full max-w-[520px] mx-auto">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-3xl opacity-30"
                style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.3) 0%, transparent 70%)', filter: 'blur(20px)' }}/>

              {/* Main image card */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-900/10"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)', boxShadow: '0 32px 80px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)' }}>
                <img
                  src="/17851250071b80.png"
                  alt="Drocol layered security intelligence visualization"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '1/1' }}
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"/>
              </div>

              {/* Floating badge — threats */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-5 -left-4 md:-left-8 flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-xl"
                style={{ background: 'rgba(8,8,8,0.85)', boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: 'linear-gradient(135deg, #E87722, #F5A623)', boxShadow: '0 4px 12px rgba(232,119,34,0.4)' }}>
                  🛡️
                </div>
                <div>
                  <div className="text-xs font-bold text-white">45M+ Threats Blocked</div>
                  <div className="text-[10px] text-white/40 font-inter">This month across Nigeria</div>
                </div>
              </motion.div>

              {/* Floating badge — uptime */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-4 -right-4 md:-right-6 px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-xl"
                style={{ background: 'rgba(8,8,8,0.85)', boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)' }}
              >
                <div className="text-[10px] font-inter text-white/40 mb-0.5">System Uptime</div>
                <div className="text-lg font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]"/>
                  99.98%
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
