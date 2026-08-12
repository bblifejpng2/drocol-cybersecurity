import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    tag: 'Compliance',
    tagColor: '#3b82f6',
    title: 'The NDPA in practice: what compliance actually requires',
    excerpt: 'The practical steps Nigerian organizations need to take, and the common gaps we see.',
    readTime: '6 min read',
  },
  {
    tag: 'Offensive Security',
    tagColor: '#8b5cf6',
    title: 'Inside a penetration test: what happens, what you receive, and how to prepare',
    excerpt: 'A clear walkthrough of a professional engagement, written for teams commissioning their first test.',
    readTime: '8 min read',
  },
  {
    tag: 'Technology',
    tagColor: '#E87722',
    title: "AI in security assessments: where automation helps, and where it doesn't",
    excerpt: "An honest look at what machines do well, what they miss, and why expert judgment still decides what matters.",
    readTime: '5 min read',
  },
];

export const Insights: React.FC = () => {
  return (
    <section id="insights" className="relative bg-[#080808] py-24 md:py-32 overflow-hidden">

      {/* ── Background: dark + waveform SVG bands + bottom amber pool ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Sine-wave bands */}
        <svg className="absolute inset-x-0 bottom-0 w-full opacity-[0.06]" viewBox="0 0 1440 220" preserveAspectRatio="none" fill="none">
          <path d="M0 110 C240 60 480 160 720 110 S1200 60 1440 110 V220 H0Z" fill="rgba(232,119,34,0.25)"/>
          <path d="M0 140 C240 90 480 190 720 140 S1200 90 1440 140 V220 H0Z" fill="rgba(232,119,34,0.15)"/>
          <path d="M0 170 C240 130 480 210 720 170 S1200 130 1440 170 V220 H0Z" fill="rgba(232,119,34,0.1)"/>
        </svg>
        {/* Bottom amber pool */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-[0.1]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.2) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
              <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">Insights</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-white">
              Latest thinking<br/>from Drocol.
            </h2>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/50 hover:text-white transition-colors shrink-0">
            View all articles <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5}/>
          </a>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-5 rounded-2xl border p-6 transition-all duration-300 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${post.tagColor}0c`;
                el.style.borderColor = `${post.tagColor}30`;
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(255,255,255,0.03)';
                el.style.borderColor = 'rgba(255,255,255,0.07)';
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${post.tagColor}, ${post.tagColor}60)` }}/>

              {/* Tag + read time */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: post.tagColor }}>
                  {post.tag}
                </span>
                <span className="font-inter text-[11px] text-white/30">{post.readTime}</span>
              </div>

              <h3 className="text-[17px] font-bold text-white leading-snug tracking-tight flex-1">{post.title}</h3>
              <p className="text-[13.5px] text-white/50 font-inter leading-relaxed">{post.excerpt}</p>

              <a href="#"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-all duration-200 group-hover:gap-2.5"
                style={{ color: post.tagColor }}
              >
                Read article <ArrowRight size={12} strokeWidth={2.5}/>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
