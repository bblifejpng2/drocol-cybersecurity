import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Mail, Building, CheckCircle, ArrowLeft, ArrowRight, Rocket, Briefcase, Building2, Globe, Flag, HandHeart, GraduationCap, HeartPulse } from 'lucide-react';

interface ContactData {
  orgType: string;
  focus: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
}

export const DemoScheduler: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const totalSteps = 5;

  const [contactData, setContactData] = useState<ContactData>({
    orgType: '',
    focus: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    name: '',
    email: '',
    company: '',
  });

  const [lagosTimeStr, setLagosTimeStr] = useState<string>('');

  // Lagos Clock Timer
  useEffect(() => {
    const updateLagosClock = () => {
      const now = new Date();
      try {
        const lagosTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
        const h = String(lagosTime.getHours()).padStart(2, '0');
        const m = String(lagosTime.getMinutes()).padStart(2, '0');
        const s = String(lagosTime.getSeconds()).padStart(2, '0');
        const dateStr = lagosTime.toLocaleDateString('en-GB', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        });
        setLagosTimeStr(`${dateStr} · ${h}:${m}:${s} WAT`);
      } catch (e) {
        // Fallback if timezone formatting fails
        setLagosTimeStr(now.toUTCString());
      }
    };

    updateLagosClock();
    const interval = setInterval(updateLagosClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const orgTypeLabels: Record<string, string> = {
    startup: 'Startup',
    sme: 'SME',
    corporate: 'Corporate',
    enterprise: 'Enterprise',
    government: 'Government',
    ngo: 'NGO / Non-Profit',
    education: 'Education',
    healthcare: 'Healthcare',
  };

  const orgTypeEmojis: Record<string, string> = {
    startup: '🚀',
    sme: '💼',
    corporate: '🏢',
    enterprise: '🏗️',
    government: '🇳🇬',
    ngo: '🤝',
    education: '🎓',
    healthcare: '🏥',
  };

  const focusLabels: Record<string, string> = {
    cloud: 'Cloud Security',
    pentest: 'Pen Testing',
    'attack-paths': 'Attack Paths',
    full: 'Full Platform',
  };

  const handleOrgTypeSelect = (value: string) => {
    setContactData((prev) => ({ ...prev, orgType: value }));
    // Auto advance to next step after a short delay for smooth feeling
    setTimeout(() => {
      setCurrentStep(1);
    }, 350);
  };

  const handleFocusSelect = (value: string) => {
    setContactData((prev) => ({ ...prev, focus: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };


  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) return !!contactData.orgType;
    if (currentStep === 1) return !!contactData.focus;
    if (currentStep === 2) return !!contactData.date && !!contactData.time;
    if (currentStep === 3) return !!contactData.name && !!contactData.email && !!contactData.company;
    return true;
  };

  return (
    <section id="contact" className="relative py-16 md:py-28 overflow-hidden" style={{ background: '#0D0600' }}>

      {/* ══ Rich orange background ══════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* Layer 1 — deep orange-to-black base gradient */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 120% 80% at 0% 50%, rgba(180,72,0,0.45) 0%, transparent 55%), radial-gradient(ellipse 80% 100% at 100% 100%, rgba(232,119,34,0.2) 0%, transparent 55%)',
        }}/>

        {/* Layer 2 — large primary orange orb top-left */}
        <div className="absolute -top-40 -left-40 w-[900px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.35) 0%, transparent 60%)', filter: 'blur(90px)' }}/>

        {/* Layer 3 — secondary amber orb bottom-right */}
        <div className="absolute -bottom-40 -right-20 w-[700px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(245,166,35,0.22) 0%, transparent 65%)', filter: 'blur(100px)' }}/>

        {/* Layer 4 — center warm glow to lift the midfield */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}/>

        {/* Layer 5 — mesh / diagonal grid lines */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'linear-gradient(rgba(232,119,34,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}/>

        {/* Layer 6 — fine diagonal hairlines */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(232,119,34,0.6) 0px, rgba(232,119,34,0.6) 1px, transparent 1px, transparent 28px)',
        }}/>

        {/* Layer 7 — noise grain */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}/>

        {/* Layer 8 — animated shimmer sweep */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 w-[300px] opacity-[0.08] animate-[shimmer_6s_ease-in-out_infinite]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,180,60,0.4), transparent)', left: '-300px' }}/>
        </div>

        {/* Top separator */}
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.6) 30%, rgba(245,166,35,0.8) 50%, rgba(232,119,34,0.6) 70%, transparent)' }}/>

        {/* Bottom separator */}
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.3) 50%, transparent)' }}/>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { left: -300px; }
          50%  { left: 110%; }
          100% { left: 110%; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Contact Copy */}
          <div className="min-w-0">
            <div className="font-mono font-semibold uppercase tracking-widest mb-2"
              style={{ fontSize: 'clamp(8px, 1.5vw, 12px)', color: '#F5A623' }}>
              Get in Touch
            </div>
            <h2 className="font-bold tracking-tight leading-[1.05] mb-3 sm:mb-6"
              style={{
                fontSize: 'clamp(16px, 3.5vw, 56px)',
                color: '#fff',
                textShadow: '0 0 60px rgba(232,119,34,0.4)',
              }}>
              Let's build{' '}
              <span className="italic" style={{
                background: 'linear-gradient(90deg, #F5A623, #FFD580)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>confidence</span>{' '}
              together.
            </h2>

            {/* Body — hidden on mobile to save space */}
            <p className="hidden sm:block font-inter leading-relaxed mb-8 md:mb-10 max-w-md"
              style={{ fontSize: 'clamp(12px, 1.4vw, 16px)', color: 'rgba(255,220,160,0.75)' }}>
              Whether you're preparing for compliance, strengthening your security posture, or evaluating cyber risk — book a conversation with our security team. No pressure, no jargon.
            </p>

            {/* Contact details */}
            <div className="space-y-2 sm:space-y-4 font-inter">
              <div className="border-b pb-2 sm:pb-4" style={{ borderColor: 'rgba(232,119,34,0.2)' }}>
                <div className="font-mono uppercase tracking-wider mb-0.5"
                  style={{ fontSize: 'clamp(7px, 1vw, 12px)', color: 'rgba(245,166,35,0.6)' }}>Email</div>
                <a href="mailto:hello@drocol.ng" className="font-medium transition-colors block truncate"
                  style={{ fontSize: 'clamp(10px, 1.3vw, 16px)', color: 'rgba(255,220,160,0.9)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5A623')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,220,160,0.9)')}>
                  hello@drocol.ng
                </a>
              </div>
              <div className="border-b pb-2 sm:pb-4" style={{ borderColor: 'rgba(232,119,34,0.2)' }}>
                <div className="font-mono uppercase tracking-wider mb-0.5"
                  style={{ fontSize: 'clamp(7px, 1vw, 12px)', color: 'rgba(245,166,35,0.6)' }}>Phone</div>
                <a href="tel:+23412804400" className="font-medium transition-colors block"
                  style={{ fontSize: 'clamp(10px, 1.3vw, 16px)', color: 'rgba(255,220,160,0.9)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5A623')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,220,160,0.9)')}>
                  +234 1 280 4400
                </a>
              </div>
              <div>
                <div className="font-mono uppercase tracking-wider mb-0.5"
                  style={{ fontSize: 'clamp(7px, 1vw, 12px)', color: 'rgba(245,166,35,0.6)' }}>HQ</div>
                <div className="font-medium leading-relaxed"
                  style={{ fontSize: 'clamp(10px, 1.3vw, 16px)', color: 'rgba(255,220,160,0.9)' }}>
                  <span className="hidden sm:inline">Oniru, </span>Victoria Island, Lagos
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Multi-Step Form */}
          <div className="rounded-3xl p-6 md:p-8 shadow-2xl relative"
            style={{
              background: 'rgba(15,5,0,0.65)',
              border: '1px solid rgba(232,119,34,0.3)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 0 0 1px rgba(232,119,34,0.15), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(232,119,34,0.2)',
            }}
          >
            {/* Inner top-edge orange glow */}
            <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.9) 50%, transparent)' }}/>
            {/* Corner amber bloom inside panel */}
            <div className="absolute -top-20 -right-20 w-[300px] h-[200px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}/>
            
            {/* Step Indicators */}
            <div className="step-indicator flex gap-1.5 mb-8">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`step-dot h-1 rounded-full transition-all duration-300 ${
                    idx === currentStep 
                      ? 'bg-[#E87722] w-10' 
                      : idx < currentStep 
                      ? 'bg-[#E87722]/50 w-6' 
                      : 'bg-white/15 w-6'
                  }`}
                />
              ))}
            </div>

            {/* Steps Containers */}
            <div className="min-h-[320px]">
              <AnimatePresence mode="wait">
                
                {/* Step 0: Org Type */}
                {currentStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <div className="text-xl md:text-2xl font-bold text-white leading-tight mb-1.5">
                        What type of organization are you?
                      </div>
                      <div className="text-sm text-white/40 font-inter">
                        This helps us tailor the demo to your operational realities.
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {(Object.entries(orgTypeLabels) as [string, string][]).map(([key, label]) => {
                        const isSelected = contactData.orgType === key;
                        const orgMeta: Record<string, { desc: string; color: string; icon: React.ReactNode }> = {
                          startup:    { desc: 'Early-stage',    color: '#3b82f6', icon: <Rocket    size={20} strokeWidth={1.8}/> },
                          sme:        { desc: '10–250 staff',   color: '#8b5cf6', icon: <Briefcase size={20} strokeWidth={1.8}/> },
                          corporate:  { desc: '250–5K staff',   color: '#E87722', icon: <Building2 size={20} strokeWidth={1.8}/> },
                          enterprise: { desc: '5K+ staff',      color: '#f59e0b', icon: <Globe     size={20} strokeWidth={1.8}/> },
                          government: { desc: 'Public sector',  color: '#10b981', icon: <Flag      size={20} strokeWidth={1.8}/> },
                          ngo:        { desc: 'Non-profit',     color: '#06b6d4', icon: <HandHeart size={20} strokeWidth={1.8}/> },
                          education:  { desc: 'Schools & unis', color: '#ec4899', icon: <GraduationCap size={20} strokeWidth={1.8}/> },
                          healthcare: { desc: 'Hospitals',      color: '#ef4444', icon: <HeartPulse size={20} strokeWidth={1.8}/> },
                        };
                        const meta = orgMeta[key];
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleOrgTypeSelect(key)}
                            className="group relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border text-center transition-all duration-200"
                            style={{
                              background: isSelected ? `${meta.color}18` : 'rgba(255,255,255,0.03)',
                              borderColor: isSelected ? meta.color : 'rgba(255,255,255,0.08)',
                              boxShadow: isSelected ? `0 0 20px ${meta.color}22` : 'none',
                            }}
                            onMouseEnter={e => {
                              if (!isSelected) {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)';
                              }
                            }}
                            onMouseLeave={e => {
                              if (!isSelected) {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                              }
                            }}
                          >
                            {/* Lucide icon */}
                            <div
                              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                              style={{
                                background: isSelected ? `${meta.color}25` : 'rgba(255,255,255,0.05)',
                                color: isSelected ? meta.color : 'rgba(255,255,255,0.55)',
                              }}
                            >
                              {meta.icon}
                            </div>

                            {/* Label */}
                            <div className="font-semibold text-white text-xs sm:text-sm leading-tight">
                              {label}
                            </div>

                            {/* Descriptor */}
                            <div className="text-[10px] font-inter leading-none" style={{ color: isSelected ? meta.color : 'rgba(255,255,255,0.3)' }}>
                              {meta.desc}
                            </div>

                            {/* Selected checkmark */}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ background: meta.color }}
                              >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Security Focus */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {/* Selected Org Badge */}
                    {contactData.orgType && (
                      <div className="inline-flex items-center gap-2 bg-[#E87722]/10 border border-[#E87722]/30 rounded-full px-3 py-1.5 text-xs text-white font-inter">
                        <span className="font-semibold text-[#E87722]">{orgTypeLabels[contactData.orgType]}</span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(0)}
                          className="w-4 h-4 rounded-full bg-white/10 hover:bg-[#E87722] flex items-center justify-center transition-colors text-[9px] text-white/60 hover:text-white"
                        >✕</button>
                      </div>
                    )}

                    <div className="text-xl md:text-2xl font-bold text-white leading-tight">
                      What's your primary security focus?
                    </div>
                    <div className="text-sm text-white/40 font-inter">
                      Pick the area that matters most — we'll auto-advance when you choose.
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        {
                          key: 'cloud',
                          label: 'Cloud Security',
                          desc: 'AWS, Azure, or GCP posture management and misconfiguration detection.',
                          color: '#3b82f6',
                          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
                        },
                        {
                          key: 'pentest',
                          label: 'Pen Testing',
                          desc: 'Web & API vulnerability testing, including IDOR, XSS, and logic flaws.',
                          color: '#8b5cf6',
                          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
                        },
                        {
                          key: 'attack-paths',
                          label: 'Attack Paths',
                          desc: 'Link vulnerabilities into complete attack chains and prioritize remediation.',
                          color: '#E87722',
                          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                        },
                        {
                          key: 'full',
                          label: 'Full Platform',
                          desc: 'End-to-end security across cloud, apps, identities, and APIs.',
                          color: '#10b981',
                          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                        },
                      ].map(item => {
                        const isSelected = contactData.focus === item.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                              setContactData(prev => ({ ...prev, focus: item.key }));
                              setTimeout(() => setCurrentStep(2), 320);
                            }}
                            className="group relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200"
                            style={{
                              background: isSelected ? `${item.color}18` : 'rgba(255,255,255,0.03)',
                              borderColor: isSelected ? item.color : 'rgba(255,255,255,0.08)',
                              boxShadow: isSelected ? `0 0 20px ${item.color}22` : 'none',
                            }}
                            onMouseEnter={e => { if (!isSelected) { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.06)'; el.style.borderColor = 'rgba(255,255,255,0.16)'; }}}
                            onMouseLeave={e => { if (!isSelected) { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.08)'; }}}
                          >
                            {/* Icon */}
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                              style={{
                                background: isSelected ? `${item.color}25` : 'rgba(255,255,255,0.05)',
                                color: isSelected ? item.color : 'rgba(255,255,255,0.5)',
                              }}
                            >
                              {item.icon}
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-sm text-white mb-0.5">{item.label}</div>
                              <div className="text-[11px] text-white/40 font-inter leading-relaxed">{item.desc}</div>
                            </div>

                            {/* Selected check */}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                style={{ background: item.color }}
                              >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="contact-question text-xl md:text-2xl font-bold text-white leading-tight">
                      When works best for your demo?
                    </div>
                    <div className="contact-subquestion text-sm text-neutral-400 font-inter">
                      Pick a date and time — we'll confirm within 4 business hours.
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <input 
                            type="date" 
                            id="date"
                            value={contactData.date}
                            onChange={handleInputChange}
                            className="form-input bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E87722]"
                            required 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="form-label text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <input 
                            type="time" 
                            id="time"
                            value={contactData.time}
                            onChange={handleInputChange}
                            className="form-input bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E87722]"
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Lagos WAT Clock Widget */}
                    <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mb-1">
                          Current time in Lagos (SOC HQ)
                        </div>
                        <div className="text-white font-mono text-sm md:text-base font-semibold">
                          {lagosTimeStr || 'Loading Lagos Time...'}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-400">
                        <Clock size={16} className="animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="contact-question text-xl md:text-2xl font-bold text-white leading-tight">
                      How can we reach you?
                    </div>
                    <div className="contact-subquestion text-sm text-neutral-400 font-inter">
                      We'll send a confirmation and calendar invite.
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="form-label text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={contactData.name}
                          onChange={handleInputChange}
                          className="w-full rounded-xl px-4 py-3 text-white text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-[#E87722] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#E87722]/20 transition-all placeholder:text-white/30 cursor-text"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="form-label text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                          Work Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={contactData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-xl px-4 py-3 text-white text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-[#E87722] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#E87722]/20 transition-all placeholder:text-white/30 cursor-text"
                          placeholder="you@company.ng"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="company" className="form-label text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="organization"
                        autoComplete="organization"
                        value={contactData.company}
                        onChange={handleInputChange}
                        className="w-full rounded-xl px-4 py-3 text-white text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-[#E87722] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#E87722]/20 transition-all placeholder:text-white/30 cursor-text"
                        placeholder="Your company name"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success confirmation */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    
                    <div className="contact-question text-2xl font-bold text-green-500 mb-2">
                      You're all set!
                    </div>
                    <div className="text-sm text-neutral-300 font-inter mb-6">
                      Thanks {contactData.name.split(' ')[0]}! A security engineer will reach out at{' '}
                      <span className="text-white font-semibold">{contactData.email}</span> within 4 business hours.
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left max-w-md mx-auto">
                      <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mb-3 pb-2 border-b border-white/5">
                        Booking Summary
                      </div>
                      
                      <div className="space-y-2.5 text-xs font-inter">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Organization:</span>
                          <span className="text-white font-semibold">
                            {orgTypeEmojis[contactData.orgType]} {orgTypeLabels[contactData.orgType]}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Focus Area:</span>
                          <span className="text-white font-semibold">
                            {focusLabels[contactData.focus]}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Scheduled Date:</span>
                          <span className="text-white font-semibold font-mono">
                            {contactData.date}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Scheduled Time:</span>
                          <span className="text-white font-semibold font-mono">
                            {contactData.time} WAT
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Company:</span>
                          <span className="text-white font-semibold">
                            {contactData.company}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        const subject = encodeURIComponent(`Demo Request: ${contactData.name} - ${contactData.company}`);
                        const body = encodeURIComponent(
                          `Name: ${contactData.name}\nEmail: ${contactData.email}\nCompany: ${contactData.company}\nOrganization Type: ${orgTypeLabels[contactData.orgType]}\nFocus: ${focusLabels[contactData.focus]}\nDate: ${contactData.date}\nTime: ${contactData.time} WAT`
                        );
                        window.location.href = `mailto:hello@drocol.ng?subject=${subject}&body=${body}`;
                        
                        setContactData({
                          orgType: '',
                          focus: '',
                          date: new Date().toISOString().split('T')[0],
                          time: '10:00',
                          name: '',
                          email: '',
                          company: '',
                        });
                        setCurrentStep(0);
                      }}
                      className="mt-6 text-xs text-[#E87722] hover:underline font-mono font-bold"
                    >
                      Book another demo scan
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Step Navigation Buttons */}
            {currentStep < totalSteps - 1 && (
              <div className="step-nav flex gap-3 mt-6 border-t border-white/5 pt-6">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="step-back flex items-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
                  >
                    <ArrowLeft size={14} strokeWidth={2.5} />
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="btn-accent flex-grow flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};