import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SpecularButton, specularPrimary } from './SpecularButton';

/* Partner program types — modelled on Redream's "Solutions by team" expertise card */
const partnerTabs = [
  {
    id: 'technology',
    label: 'Technology',
    title: 'Technology partners',
    lead: 'Deepen your product with security that ships.',
    today:
      'Partners build integrations without a security layer, so customers bolt on point tools, review findings by hand, and re-check everything each release.',
    withDrocol:
      'Your product surfaces live risk through the Drocol engine — assessments, attack paths, and findings flow through the UX your customers already trust.',
    before: ['Security features built from scratch, slowly', 'Point tools bolted on after launch', 'Findings managed in spreadsheets'],
    after: ['Drocol engine embedded in your product', 'Live attack-path and finding views', 'One API for assessment and reporting'],
  },
  {
    id: 'channel',
    label: 'Channel',
    title: 'Channel partners',
    lead: 'Sell security services without building a lab.',
    today:
      'Resellers and MSPs turn away security work because building the delivery capability — tooling, training, and specialists — is slow and expensive.',
    withDrocol:
      'You white-label assessments and compliance checks. We run the platform end to end; you own the client, the brand, and the relationship.',
    before: ['Security work declined for lack of capability', 'Delivery depends on scarce specialists', 'Margin eaten by tooling and training'],
    after: ['White-label assessments under your brand', 'Platform delivery handled end to end', 'Repeatable margin on every engagement'],
  },
  {
    id: 'consulting',
    label: 'Consulting',
    title: 'Consulting partners',
    lead: 'Extend your practice with certified depth.',
    today:
      'Consultancies re-perform the same baseline testing on every project, burning billable hours on repeat work while their best people stay buried in checklists.',
    withDrocol:
      'Automated coverage frees your consultants for the problems that need them — validation, prioritization, and remediation that clients actually act on.',
    before: ['Repetitive baseline testing eats billable time', 'Findings arrive without business context', 'Scaling the practice means hiring more'],
    after: ['Automation handles repeatable coverage', 'Validated, prioritized findings for clients', 'A practice that scales with your team'],
  },
  {
    id: 'community',
    label: 'Community',
    title: 'Community partners',
    lead: 'Turn security education into growth.',
    today:
      'Security content and training are generic, and communities struggle to connect what people learn to protections they can actually put in place.',
    withDrocol:
      'Co-branded training, webinars, and research turn awareness into action for your audience — and build trust that converts into real demand.',
    before: ['Generic content with no follow-through', 'Training ends when the session ends', 'Hard to measure real impact'],
    after: ['Co-branded programs that build trust', 'Learning tied to actionable protections', 'Communities that convert into clients'],
  },
];

export const PartnerMarquee: React.FC = () => {
  const [activeId, setActiveId] = useState(partnerTabs[0].id);
  const active = partnerTabs.find(t => t.id === activeId) ?? partnerTabs[0];

  return (
    <section className="relative bg-[#F3EDE2] py-16 md:py-24 overflow-hidden">
      {/* ── Background: cream + scattered dot grid + faint amber bloom ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.5) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
        }}/>
        <div className="absolute bottom-0 right-0 w-[700px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(90px)' }}/>
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(23,23,23,0.1) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.2) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ──────────────────────────────────────── */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
            <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">Strategic Partners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-neutral-900 leading-[1.05]">
            Different partners. Same goal:{' '}
            <span className="italic text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)',
            }}>safer enterprises.</span>
          </h2>
          <p className="text-neutral-600 font-inter text-[16px] leading-relaxed mt-4 max-w-xl">
            Whether you build technology, sell security, or grow communities — expertise stays aligned when
            Drocol's platform is built into the way your team already works. Proudly partnering with Redream Solutions.
          </p>
        </div>

        {/* ── Tabbed partner card (Redream-style) ─────────── */}
        <div className="rounded-2xl border" style={{
          background: 'linear-gradient(168deg, #ffffff 0%, #f8f9fb 55%, #f0f3f8 100%)',
          borderColor: 'rgba(23,23,23,0.08)',
          boxShadow: '0 20px 50px rgba(23,23,23,0.06)',
          padding: 'clamp(18px, 3vw, 30px)',
        }}>
          {/* Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 border-b pb-2.5 mb-5" style={{ borderColor: 'rgba(23,23,23,0.08)' }}>
            {partnerTabs.map(tab => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={`relative text-left pb-2 transition-colors duration-200 font-inter cursor-pointer appearance-none border-0 bg-transparent ${
                    isActive ? 'text-neutral-900 font-semibold' : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                  style={{ fontSize: '0.88rem' }}
                >
                  {tab.label}
                  <span
                    className="absolute left-0 right-0 -bottom-2.5 h-[2px] rounded-full bg-[#E87722] origin-left transition-transform duration-200"
                    style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                  />
                </button>
              );
            })}
          </div>

          {/* Tab content — keyed mount animation (no exit), matching the reference */}
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-6 lg:gap-8 items-start">
            {/* Copy */}
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-neutral-900 font-bold mb-2 leading-[1.15]" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)' }}>
                {active.title}
              </h3>
              <p className="text-neutral-800 font-inter mb-4 leading-[1.4]" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}>
                {active.lead}
              </p>
              <h4 className="text-[12px] font-inter font-semibold uppercase tracking-[0.08em] text-neutral-500 mt-4 mb-1.5">Today</h4>
              <p className="text-neutral-600 font-inter text-[14px] leading-relaxed">{active.today}</p>
              <h4 className="text-[12px] font-inter font-semibold uppercase tracking-[0.08em] text-[#E87722] mt-5 mb-1.5">With Drocol</h4>
              <p className="text-neutral-600 font-inter text-[14px] leading-relaxed">{active.withDrocol}</p>
            </motion.article>

            {/* Before / After panel */}
            <motion.aside
              key={`panel-${active.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border p-5 md:p-6"
              style={{ background: 'linear-gradient(168deg, #ffffff, #f8f9fb 55%, #f0f3f8)', borderColor: 'rgba(23,23,23,0.08)' }}
            >
              <h4 className="text-[12px] font-inter font-semibold uppercase tracking-[0.08em] text-neutral-800 mb-2.5">Before</h4>
              <ul className="space-y-2 mb-6">
                {active.before.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-neutral-500 font-inter text-[13px] leading-relaxed">
                    <span className="mt-[7px] shrink-0 w-[5px] h-[5px] rounded-full bg-neutral-400"/>
                    {item}
                  </li>
                ))}
              </ul>
              <h4 className="text-[12px] font-inter font-semibold uppercase tracking-[0.08em] text-[#E87722] mb-2.5">After</h4>
              <ul className="space-y-2">
                {active.after.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-neutral-700 font-inter text-[13px] leading-relaxed">
                    <span className="mt-[7px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#E87722]"/>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </div>

        {/* ── CTA band (dark panel) ───────────────────────── */}
        <div className="mt-8 md:mt-10">
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 rounded-2xl border"
            style={{ background: 'rgba(15,15,15,0.96)', borderColor: 'rgba(255,255,255,0.09)' }}
          >
            <div>
              <div className="text-white font-semibold text-sm">Become a partner</div>
              <div className="text-white/40 font-inter text-xs mt-0.5">Join our ecosystem and help secure African enterprises together.</div>
            </div>
            <SpecularButton
              {...specularPrimary}
              size="md"
              href="mailto:hello@drocol.ng?subject=Partnership%20Enquiry%20%E2%80%94%20Drocol%20Technologies&body=Hi%20Drocol%20Team%2C%0A%0AI%20am%20interested%20in%20exploring%20a%20partnership%20with%20Drocol%20Technologies.%0A%0AOrganisation%3A%20%0AContact%20name%3A%20%0AWebsite%3A%20%0A%0APlease%20get%20in%20touch%20at%20your%20earliest%20convenience.%0A%0AThank%20you."
              className="shrink-0"
            >
              Partner With Us
              <ArrowRight size={13} strokeWidth={2.5}/>
            </SpecularButton>
          </div>
        </div>
      </div>
    </section>
  );
};
