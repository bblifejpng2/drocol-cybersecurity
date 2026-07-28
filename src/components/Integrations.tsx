import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cloud, GitBranch, Shield, Slack, MessageSquare, AlertCircle, BarChart, Settings, Activity, Server } from 'lucide-react';
import { integrations, Integration } from '../lib/data';

export const Integrations: React.FC = () => {
  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'aws':        return <Cloud size={20} className="text-white"/>;
      case 'azure':      return <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M0 4.75h6v6H0zM9 4.75h6v6H9zM0 12.75h6v6H0zM9 12.75h6v6H9z"/></svg>;
      case 'gcp':        return <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>;
      case 'k8s':        return <Server size={20} className="text-white"/>;
      case 'github':     return <GitBranch size={20} className="text-white"/>;
      case 'okta':       return <Shield size={20} className="text-white"/>;
      case 'jira':       return <Settings size={20} className="text-white"/>;
      case 'slack':      return <Slack size={20} className="text-white"/>;
      case 'pagerduty':  return <MessageSquare size={20} className="text-white"/>;
      case 'splunk':     return <AlertCircle size={20} className="text-white"/>;
      case 'terraform':  return <Settings size={20} className="text-white"/>;
      case 'datadog':    return <Activity size={20} className="text-white"/>;
      default:           return <Cloud size={20} className="text-white"/>;
    }
  };

  return (
    <section id="integrations" className="relative bg-[#080808] py-24 md:py-32 overflow-hidden">

      {/* ── Background ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px',
        }}/>
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.09]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}/>
        {/* Centre glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(100px)' }}/>
        {/* Separators */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 40%, rgba(232,119,34,0.12) 60%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-8 mb-14 md:mb-18">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
              <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">Integrations</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.0]">
              Plugs into the stack<br/>
              <span className="text-transparent bg-clip-text italic font-light"
                style={{ backgroundImage: 'linear-gradient(90deg, #E87722, #F5A623)' }}>
                you already run.
              </span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-white/40 font-inter text-sm leading-relaxed">
              Drocol integrates with your existing cloud infrastructure, CI/CD pipelines, identity providers, SIEMs, and collaboration platforms — no rip-and-replace required.
            </p>
          </div>
        </div>

        {/* ── Integration Grid ───────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {integrations.map((item: Integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(232,119,34,0.3)';
                el.style.background = 'rgba(232,119,34,0.04)';
                el.style.transform = 'translateY(-3px)';
                el.style.boxShadow = '0 8px 32px rgba(232,119,34,0.12)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.07)';
                el.style.background = 'rgba(255,255,255,0.02)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }}/>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: item.gradient, boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}
              >
                {getIntegrationIcon(item.iconType)}
              </div>

              {/* Text */}
              <div className="text-center min-w-0 w-full">
                <div className="text-white text-xs font-semibold truncate transition-colors duration-300 group-hover:text-[#E87722]">
                  {item.name}
                </div>
                <div className="text-[10px] text-white/30 font-inter truncate mt-0.5">
                  {item.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div>
            <span className="text-white/40 font-inter text-sm">+ 40 more integrations available</span>
          </div>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#E87722] hover:text-[#F5A623] transition-colors duration-200"
          >
            Request a custom connector
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5}/>
          </a>
        </motion.div>

      </div>
    </section>
  );
};
