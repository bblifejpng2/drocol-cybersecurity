import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { articles } from '../data/articles';
import BorderGlow from './BorderGlow';

/* Convert a hex tag color to an HSL string so each card glows in its own hue. */
function hexToHue(hex: string): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return '40 80 80';
  const r = parseInt(m[1], 16) / 255;
  const g = parseInt(m[2], 16) / 255;
  const b = parseInt(m[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    if (max === r) h = ((g - b) / (max - min)) * 60;
    else if (max === g) h = 120 + ((b - r) / (max - min)) * 60;
    else h = 240 + ((r - g) / (max - min)) * 60;
  }
  if (h < 0) h += 360;
  return `${Math.round(h)} 70 55`;
}

const posts = articles.map(a => ({
  slug: a.slug,
  tag: a.tag,
  tagColor: a.tagColor,
  title: a.title,
  excerpt: a.excerpt,
  readTime: a.readTime,
}));

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

        {/* Idea bulb — orange light illuminating the section */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[420px] sm:w-[560px] pointer-events-none" aria-hidden="true">
          {/* halo behind the bulb */}
          <motion.div
            animate={{ opacity: [0.5, 0.95, 0.5], scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-40 h-40 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,119,34,0.45) 0%, rgba(245,166,35,0.12) 45%, transparent 72%)', filter: 'blur(6px)' }}
          />
          {/* bulb */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative left-1/2 -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(245,166,35,0.14)',
              border: '1px solid rgba(245,166,35,0.45)',
              boxShadow: '0 0 34px rgba(232,119,34,0.75), inset 0 0 14px rgba(245,166,35,0.55)',
            }}
          >
            <Lightbulb size={22} strokeWidth={1.6} className="text-[#F5A623]" fill="rgba(245,166,35,0.35)"/>
          </motion.div>
          {/* cone of light spreading down over the section */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-6 w-[240px] sm:w-[340px] h-[460px]"
            style={{
              clipPath: 'polygon(36% 0, 64% 0, 100% 100%, 0 100%)',
              background: 'linear-gradient(to bottom, rgba(232,119,34,0.30), rgba(232,119,34,0.07) 70%, transparent)',
            }}
          />
        </div>
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
          <a
            href="#insights"
            onClick={e => {
              e.preventDefault();
              document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/50 hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            View all articles <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5}/>
          </a>
        </motion.div>

        {/* Cards — whole card is clickable, bordered by the BorderGlow effect */}
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <BorderGlow
                persistent
                glowColor={hexToHue(post.tagColor)}
                backgroundColor="#120F17"
                borderRadius={18}
                glowRadius={26}
                glowIntensity={1.0}
                coneSpread={25}
                edgeSensitivity={28}
                fillOpacity={0.25}
                colors={[post.tagColor, post.tagColor, post.tagColor]}
                className="h-full"
              >
                <Link
                  to={`/insights/${post.slug}`}
                  className="group flex flex-col gap-5 p-6 h-full no-underline"
                >
                  {/* Tag + read time */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-widest"
                      style={{ color: post.tagColor }}>
                      {post.tag}
                    </span>
                    <span className="font-inter text-[11px] text-white/30">{post.readTime}</span>
                  </div>

                  <h3 className="text-[17px] font-bold text-white leading-snug tracking-tight flex-1 transition-colors duration-200 group-hover:text-[#F5A623]">
                    {post.title}
                  </h3>
                  <p className="text-[13.5px] text-white/50 font-inter leading-relaxed">{post.excerpt}</p>

                  <span
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: post.tagColor }}
                  >
                    Read article <ArrowRight size={12} strokeWidth={2.5}/>
                  </span>
                </Link>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
