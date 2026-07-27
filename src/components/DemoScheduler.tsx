import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Mail, Building, CheckCircle, ArrowLeft, ArrowRight, Zap } from 'lucide-react';

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
    const { id, value } = e.target;
    setContactData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAutofill = () => {
    setContactData((prev) => ({
      ...prev,
      name: 'Chinedu Okafor',
      email: 'c.okafor@lagosfinance.ng',
      company: 'Lagos Finance Group',
    }));
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
    <section id="contact" className="bg-[#0B0B0B] py-16 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Contact Copy */}
          <div>
            <div className="section-eyebrow text-[#E87722] font-semibold text-xs tracking-widest uppercase mb-3">
              Get in Touch
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              Let's secure what<br/><span className="italic text-[#E87722]">you've built.</span>
            </h2>
            <p className="text-neutral-400 font-inter leading-relaxed mb-8 md:mb-10 max-w-md text-sm md:text-base">
              Book a 30-minute demo with our Nigerian security engineers. We'll show you the top 3 attack paths in your environment — free.
            </p>
            
            <div className="space-y-4 font-inter">
              <div className="contact-info-item border-b border-white/5 pb-4">
                <div className="contact-info-label text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">Email</div>
                <a href="mailto:hello@drocol.ng" className="contact-info-value text-white text-base font-medium hover:text-[#E87722] transition-colors">hello@drocol.ng</a>
              </div>
              <div className="contact-info-item border-b border-white/5 pb-4">
                <div className="contact-info-label text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">Phone (Lagos)</div>
                <a href="tel:+23412804400" className="contact-info-value text-white text-base font-medium hover:text-[#E87722] transition-colors">+234 1 280 4400</a>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">HQ</div>
                <div className="contact-info-value text-white text-base font-medium leading-relaxed">
                  142b Adeola Odeku, Victoria Island, Lagos
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Multi-Step Form */}
          <div className="bg-white/3 border border-white/8 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
            
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
                        const orgMeta: Record<string, { desc: string; color: string }> = {
                          startup:    { desc: 'Early-stage',    color: '#3b82f6' },
                          sme:        { desc: '10–250 staff',   color: '#8b5cf6' },
                          corporate:  { desc: '250–5K staff',   color: '#E87722' },
                          enterprise: { desc: '5K+ staff',      color: '#f59e0b' },
                          government: { desc: 'Public sector',  color: '#10b981' },
                          ngo:        { desc: 'Non-profit',     color: '#06b6d4' },
                          education:  { desc: 'Schools & unis', color: '#ec4899' },
                          healthcare: { desc: 'Hospitals',      color: '#ef4444' },
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
                            {/* Emoji icon */}
                            <div
                              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xl transition-transform duration-200 group-hover:scale-110"
                              style={{ background: isSelected ? `${meta.color}25` : 'rgba(255,255,255,0.05)' }}
                            >
                              {orgTypeEmojis[key]}
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
                      <div className="selection-badge inline-flex items-center gap-2 bg-[#E87722]/12 border border-[#E87722]/35 rounded-full px-3.5 py-1.5 text-xs text-white font-inter">
                        <span>{orgTypeEmojis[contactData.orgType]}</span>
                        <span className="font-semibold">{orgTypeLabels[contactData.orgType]}</span>
                        <button 
                          type="button"
                          onClick={() => setCurrentStep(0)}
                          className="w-4.5 h-4.5 rounded-full bg-white/10 hover:bg-[#E87722] text-neutral-300 hover:text-white flex items-center justify-center transition-colors text-[9px]"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    <div className="contact-question text-xl md:text-2xl font-bold text-white leading-tight">
                      What's your primary security focus?
                    </div>
                    <div className="contact-subquestion text-sm text-neutral-400 font-inter">
                      Pick the area that matters most to you right now.
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleFocusSelect('cloud')}
                        className={`option-card p-4.5 rounded-xl border text-left transition-all ${
                          contactData.focus === 'cloud'
                            ? 'bg-[#E87722]/15 border-[#E87722] ring-2 ring-[#E87722]/20'
                            : 'bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20'
                        }`}
                      >
                        <div className="option-card-title text-sm font-bold text-white flex items-center gap-2 mb-1">
                          ☁️ Cloud Security
                        </div>
                        <div className="text-[11px] text-neutral-400 leading-relaxed font-inter">
                          AWS, Azure, or GCP posture management and misconfiguration detection.
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleFocusSelect('pentest')}
                        className={`option-card p-4.5 rounded-xl border text-left transition-all ${
                          contactData.focus === 'pentest'
                            ? 'bg-[#E87722]/15 border-[#E87722] ring-2 ring-[#E87722]/20'
                            : 'bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20'
                        }`}
                      >
                        <div className="option-card-title text-sm font-bold text-white flex items-center gap-2 mb-1">
                          🔍 Pen Testing
                        </div>
                        <div className="text-[11px] text-neutral-400 leading-relaxed font-inter">
                          Web & API vulnerability testing, including IDOR, XSS, and logic flaws.
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleFocusSelect('attack-paths')}
                        className={`option-card p-4.5 rounded-xl border text-left transition-all ${
                          contactData.focus === 'attack-paths'
                            ? 'bg-[#E87722]/15 border-[#E87722] ring-2 ring-[#E87722]/20'
                            : 'bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20'
                        }`}
                      >
                        <div className="option-card-title text-sm font-bold text-white flex items-center gap-2 mb-1">
                          🎯 Attack Paths
                        </div>
                        <div className="text-[11px] text-neutral-400 leading-relaxed font-inter">
                          Link vulnerabilities into complete attack chains and prioritize remediation.
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleFocusSelect('full')}
                        className={`option-card p-4.5 rounded-xl border text-left transition-all ${
                          contactData.focus === 'full'
                            ? 'bg-[#E87722]/15 border-[#E87722] ring-2 ring-[#E87722]/20'
                            : 'bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20'
                        }`}
                      >
                        <div className="option-card-title text-sm font-bold text-white flex items-center gap-2 mb-1">
                          🛡️ Full Platform
                        </div>
                        <div className="text-[11px] text-neutral-400 leading-relaxed font-inter">
                          End-to-end security across cloud, apps, identities, and APIs.
                        </div>
                      </button>
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

                    {/* Autofill Button */}
                    <button 
                      type="button" 
                      onClick={handleAutofill}
                      className="autofill-btn flex items-center gap-2 bg-[#E87722]/10 border border-[#E87722]/30 text-[#E87722] px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#E87722]/20 transition-all"
                    >
                      <Zap size={12} />
                      Simulate Autofill
                    </button>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          id="name"
                          value={contactData.name}
                          onChange={handleInputChange}
                          className="form-input bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E87722]"
                          placeholder="Chinedu Okafor" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="form-label text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                          Work Email
                        </label>
                        <input 
                          type="email" 
                          id="email"
                          value={contactData.email}
                          onChange={handleInputChange}
                          className="form-input bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E87722]"
                          placeholder="you@company.ng" 
                          required 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                        Company Name
                      </label>
                      <input 
                        type="text" 
                        id="company"
                        value={contactData.company}
                        onChange={handleInputChange}
                        className="form-input bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E87722]"
                        placeholder="e.g. Lagos Finance Group" 
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