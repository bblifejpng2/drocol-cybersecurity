import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Info, AlertTriangle, CalendarDays, Clock, MapPin,
} from 'lucide-react';
import { SpecularButton, specularPrimary } from '../components/SpecularButton';
import { getArticle, relatedArticles, ArticleBlock } from '../data/articles';

const Block: React.FC<{ block: ArticleBlock; index: number }> = ({ block, index }) => {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          className="flex items-start gap-3.5 mt-12 mb-5"
          style={{ scrollMarginTop: '96px' }}
          id={`sec-${index}`}
        >
          <span className="font-mono text-[13px] font-bold text-[#E87722] pt-1 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[22px] sm:text-[24px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-snug">
            {block.text}
          </span>
        </h2>
      );
    case 'h3':
      return (
        <h3 className="mt-8 mb-3 text-[16px] font-bold text-[#1A1A1A]/90 tracking-tight">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p className="mb-6 text-[15.5px] text-[#1A1A1A]/60 font-inter leading-[1.85]">
          {block.text}
        </p>
      );
    case 'list':
      return block.ordered ? (
        <ol className="mb-6 space-y-3 pl-0 list-none">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] text-[#1A1A1A]/65 font-inter leading-relaxed">
              <span className="font-mono text-[12px] font-bold text-[#E87722] pt-0.5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="mb-6 space-y-3 pl-0 list-none">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] text-[#1A1A1A]/65 font-inter leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722] mt-[9px] shrink-0"/>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      const isWarn = block.tone === 'warn';
      return (
        <div
          className="mb-6 rounded-2xl border p-5 md:p-6"
          style={{
            background: isWarn ? 'rgba(232,119,34,0.08)' : 'rgba(59,130,246,0.07)',
            borderColor: isWarn ? 'rgba(232,119,34,0.35)' : 'rgba(59,130,246,0.3)',
            borderLeftWidth: 3,
          }}
        >
          <div className="flex items-center gap-2.5 mb-2">
            {isWarn
              ? <AlertTriangle size={16} className="text-[#E87722]" strokeWidth={2}/>
              : <Info size={16} className="text-[#3b82f6]" strokeWidth={2}/>}
            <span className="font-mono text-[12px] font-semibold tracking-wider uppercase"
              style={{ color: isWarn ? '#C4630F' : '#2563eb' }}>
              {block.title}
            </span>
          </div>
          <p className="text-[14.5px] leading-relaxed font-inter" style={{ color: isWarn ? 'rgba(92,48,8,0.9)' : 'rgba(30,58,138,0.9)' }}>
            {block.text}
          </p>
        </div>
      );
    case 'table':
      return (
        <div className="mb-6 overflow-x-auto rounded-2xl border border-[#1A1A1A]/10">
          <table className="w-full text-left text-[13.5px]">
            <thead>
              <tr className="font-mono text-[11px] uppercase tracking-wider"
                style={{ background: 'rgba(26,26,26,0.05)' }}>
                {block.headers.map(h => (
                  <th key={h} className="px-5 py-3.5 text-[#1A1A1A]/50 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-[#1A1A1A]/[0.08]">
                  {row.map((cell, ci) => (
                    <td key={ci}
                      className="px-5 py-3.5 text-[#1A1A1A]/70 font-inter align-top"
                      style={{ minWidth: ci === 0 ? 200 : undefined }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'takeaways':
      return (
        <div className="mt-10 mb-4 rounded-2xl border border-[#E87722]/25 p-6 md:p-7"
          style={{ background: 'linear-gradient(160deg, rgba(232,119,34,0.10), rgba(255,255,255,0.4))' }}>
          <div className="font-mono text-[12px] font-semibold tracking-widest text-[#E87722] uppercase mb-5">
            Key takeaways
          </div>
          <ul className="space-y-3.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[14.5px] text-[#1A1A1A]/75 font-inter leading-relaxed">
                <CheckCircle2 size={17} className="text-[#E87722] mt-0.5 shrink-0" strokeWidth={2}/>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
  }
};

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;
  const related = slug ? relatedArticles(slug) : [];

  if (!article) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: '#F8EFD2' }}>

      {/* ── Background: amber ambience + grid + noise (butter theme) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.16) 0%, transparent 65%)', filter: 'blur(100px)' }}/>
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(26,26,26,0.4) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}/>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.45) 50%, transparent)',
        }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        <div className="max-w-3xl mx-auto">

          {/* Back link */}
          <Link
            to="/research#insights"
            className="group inline-flex items-center gap-2 mb-10 text-[13px] font-semibold text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" strokeWidth={2.2}/>
            Back to Insights
          </Link>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: article.tagColor }}>
                {article.tag}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/20"/>
              <span className="inline-flex items-center gap-1.5 font-inter text-[12px] text-[#1A1A1A]/50">
                <Clock size={12}/> {article.readTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/20"/>
              <span className="inline-flex items-center gap-1.5 font-inter text-[12px] text-[#1A1A1A]/50">
                <CalendarDays size={12}/> {article.date}
              </span>
            </div>

            <h1 className="font-bold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] mb-6"
              style={{ fontSize: 'clamp(26px, 4.5vw, 46px)' }}>
              {article.title}
            </h1>

            <p className="text-[16.5px] text-[#1A1A1A]/65 font-inter leading-[1.8] mb-8">
              {article.excerpt}
            </p>

            {/* Author row */}
            <div className="flex items-center gap-3.5 pb-8"
              style={{ borderBottom: '1px solid rgba(26,26,26,0.1)' }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-mono text-[12px] font-bold"
                style={{ background: 'rgba(232,119,34,0.14)', color: '#C4630F', border: '1px solid rgba(232,119,34,0.3)' }}>
                DR
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#1A1A1A]">{article.author}</div>
                <div className="inline-flex items-center gap-1.5 font-inter text-[12px] text-[#1A1A1A]/50">
                  <MapPin size={11}/> {article.role} · Lagos, Nigeria
                </div>
              </div>
            </div>
          </motion.header>

          {/* Lead paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 text-[17px] text-[#1A1A1A]/75 font-inter leading-[1.85]"
          >
            {article.intro}
          </motion.p>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {article.body.map((block, i) => <Block key={i} block={block} index={i}/>)}
          </motion.div>

          {/* End CTA */}
          <div className="mt-14 rounded-3xl border border-[#E87722]/25 p-6 md:p-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(160deg, rgba(232,119,34,0.12), rgba(255,255,255,0.55))' }}>
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.25) 0%, transparent 70%)', filter: 'blur(40px)' }}/>
            <h3 className="text-[19px] md:text-[21px] font-bold text-[#1A1A1A] mb-2 relative">
              Want to know what this means for your organization?
            </h3>
            <p className="text-[14px] text-[#1A1A1A]/55 font-inter leading-relaxed mb-5 relative max-w-lg">
              Talk to our security team. No pressure, no jargon — just a practical conversation about your exposure.
            </p>
            <SpecularButton {...specularPrimary} size="md" to="/contact" className="relative">
              Let's talk
              <ArrowRight size={14} strokeWidth={2.5}/>
            </SpecularButton>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-14">
              <div className="font-mono text-[12px] font-semibold tracking-widest text-[#E87722] uppercase mb-5">
                More from Drocol
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map(post => (
                  <Link
                    key={post.slug}
                    to={`/insights/${post.slug}`}
                    className="group rounded-2xl border border-[#1A1A1A]/10 p-5 transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.45)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-widest"
                        style={{ color: post.tagColor }}>
                        {post.tag}
                      </span>
                      <span className="font-inter text-[11px] text-[#1A1A1A]/40">{post.readTime}</span>
                    </div>
                    <h4 className="text-[14.5px] font-bold text-[#1A1A1A] leading-snug tracking-tight mb-3">
                      {post.title}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#E87722] transition-all duration-200 group-hover:gap-2.5">
                      Read article <ArrowRight size={12} strokeWidth={2.5}/>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
