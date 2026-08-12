import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, PhoneCall, MapPin, ShieldAlert, Clock, Send,
  MessageSquare, User, Building2, CheckCircle2, Instagram, Linkedin,
} from 'lucide-react';
import { SpecularButton, specularPrimary } from '../components/SpecularButton';

interface MessageData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState<boolean>(false);
  const [data, setData] = useState<MessageData>({ name: '', email: '', company: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmit = data.name.trim() !== '' && data.email.trim() !== '' && data.message.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Compose the message as an email — same pattern the old demo flow used.
    const subject = encodeURIComponent(`New contact message: ${data.name}${data.company ? ` — ${data.company}` : ''}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || '—'}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:hello@drocol.ng?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const reset = () => {
    setData({ name: '', email: '', company: '', message: '' });
    setSent(false);
  };

  const contactCards = [
    {
      icon: <Mail size={18} strokeWidth={1.8}/>,
      label: 'General Enquiries',
      value: 'hello@drocol.ng',
      href: 'mailto:hello@drocol.ng',
      desc: 'For project consultations, partnerships and general questions.',
    },
    {
      icon: <ShieldAlert size={18} strokeWidth={1.8}/>,
      label: 'Technical Support',
      value: '+234 1 280 4400',
      href: 'tel:+23412804400',
      desc: 'For urgent security concerns, incident response and managed clients.',
    },
    {
      icon: <PhoneCall size={18} strokeWidth={1.8}/>,
      label: 'Direct Line',
      value: '+234 813 642 0014',
      href: 'tel:+2348136420014',
      desc: 'Mobile line for urgent requests and follow-ups, available 24/7.',
    },
    {
      icon: <MapPin size={18} strokeWidth={1.8}/>,
      label: 'Our Location',
      value: 'Oniru, Victoria Island, Lagos',
      href: null,
      desc: 'Available 24/7, online in any time zone.',
    },
  ];

  const hours = [
    { day: 'Monday – Friday', time: '24 / 7' },
    { day: 'Saturday', time: '24 / 7' },
    { day: 'Sunday', time: '24 / 7' },
    { day: 'Public Holidays', time: '24 / 7' },
  ];

  return (
    <section id="contact" className="relative py-16 md:py-28 overflow-hidden" style={{ background: '#0D0600' }}>

      {/* ══ Rich orange background ══════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 120% 80% at 0% 50%, rgba(180,72,0,0.45) 0%, transparent 55%), radial-gradient(ellipse 80% 100% at 100% 100%, rgba(232,119,34,0.2) 0%, transparent 55%)',
        }}/>
        <div className="absolute -top-40 -left-40 w-[900px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.35) 0%, transparent 60%)', filter: 'blur(90px)' }}/>
        <div className="absolute -bottom-40 -right-20 w-[700px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(245,166,35,0.22) 0%, transparent 65%)', filter: 'blur(100px)' }}/>
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'linear-gradient(rgba(232,119,34,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}/>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(232,119,34,0.6) 0px, rgba(232,119,34,0.6) 1px, transparent 1px, transparent 28px)',
        }}/>
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.6) 30%, rgba(245,166,35,0.8) 50%, rgba(232,119,34,0.6) 70%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.3) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── 1. Heading — mirrors Noetica's "Connect With Us" block ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <div className="font-mono font-semibold uppercase tracking-widest mb-3"
            style={{ fontSize: 'clamp(10px, 1.5vw, 12px)', color: '#F5A623' }}>
            Get in Touch
          </div>
          <h1 className="font-bold tracking-tight leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(24px, 4vw, 52px)', color: '#fff', textShadow: '0 0 60px rgba(232,119,34,0.4)' }}>
            Let's build{' '}
            <span className="italic" style={{
              background: 'linear-gradient(90deg, #F5A623, #FFD580)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>confidence</span>{' '}
            together.
          </h1>
          <p className="font-inter leading-relaxed max-w-lg" style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', color: 'rgba(255,220,160,0.75)' }}>
            Have a project in mind, preparing for compliance, or strengthening your security posture?
            Our security team is ready to help — no pressure, no jargon.
          </p>
        </motion.div>

        {/* ── 2. Contact info cards — mirrors Noetica's three cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid sm:grid-cols-3 gap-3 sm:gap-5 mb-10 md:mb-16"
        >
          {contactCards.map((card) => (
            <div key={card.label}
              className="rounded-2xl border p-5 relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(232,119,34,0.2)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.14) 0%, transparent 70%)', filter: 'blur(20px)' }}/>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5"
                style={{ background: 'rgba(232,119,34,0.12)', color: '#E87722' }}>
                {card.icon}
              </div>
              <div className="font-mono uppercase tracking-wider mb-1"
                style={{ fontSize: 'clamp(8px, 1vw, 11px)', color: 'rgba(245,166,35,0.6)' }}>
                {card.label}
              </div>
              {card.href ? (
                <a href={card.href} className="font-semibold block transition-colors"
                  style={{ fontSize: 'clamp(13px, 1.4vw, 17px)', color: 'rgba(255,220,160,0.95)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5A623')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,220,160,0.95)')}>
                  {card.value}
                </a>
              ) : (
                <div className="font-semibold" style={{ fontSize: 'clamp(13px, 1.4vw, 17px)', color: 'rgba(255,220,160,0.95)' }}>
                  {card.value}
                </div>
              )}
              <div className="font-inter mt-1.5 leading-relaxed" style={{ fontSize: 'clamp(10px, 1.1vw, 13px)', color: 'rgba(255,220,160,0.45)' }}>
                {card.desc}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── 3. Message form + details sidebar ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-10 items-start">

          {/* Left: Send Us a Message */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-6 md:p-8 relative overflow-hidden"
            style={{
              background: 'rgba(15,5,0,0.65)',
              border: '1px solid rgba(232,119,34,0.3)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 0 0 1px rgba(232,119,34,0.15), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(232,119,34,0.2)',
            }}
          >
            <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.9) 50%, transparent)' }}/>

            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={15} style={{ color: '#E87722' }} strokeWidth={2}/>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">Send Us a Message</h2>
            </div>
            <p className="font-inter text-sm text-white/45 mb-6">
              Fill in the form and a member of our team will get back to you within one business day.
            </p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-green-500"/>
                  </div>
                  <div className="text-2xl font-bold text-green-500 mb-2">Message Sent!</div>
                  <p className="text-sm text-neutral-300 font-inter max-w-sm mx-auto">
                    Thank you for reaching out. A member of our team will be in touch within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 text-xs text-[#E87722] hover:underline font-mono font-bold"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={14} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
                        <input
                          type="text" id="name" name="name" autoComplete="name"
                          value={data.name} onChange={handleChange}
                          placeholder="Your full name" required
                          className="w-full rounded-xl pl-10 pr-4 py-3 text-white text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-[#E87722] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#E87722]/20 transition-all placeholder:text-white/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail size={14} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
                        <input
                          type="email" id="email" name="email" autoComplete="email"
                          value={data.email} onChange={handleChange}
                          placeholder="you@company.ng" required
                          className="w-full rounded-xl pl-10 pr-4 py-3 text-white text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-[#E87722] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#E87722]/20 transition-all placeholder:text-white/30"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 size={14} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
                      <input
                        type="text" id="company" name="company" autoComplete="organization"
                        value={data.company} onChange={handleChange}
                        placeholder="Your company name"
                        className="w-full rounded-xl pl-10 pr-4 py-3 text-white text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-[#E87722] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#E87722]/20 transition-all placeholder:text-white/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 block">
                      Message
                    </label>
                    <textarea
                      id="message" name="message" rows={5}
                      value={data.message} onChange={handleChange}
                      placeholder="Tell us about your security needs..."
                      required
                      className="w-full rounded-xl px-4 py-3 text-white text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-[#E87722] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#E87722]/20 transition-all placeholder:text-white/30 resize-none"
                    />
                  </div>
                  <SpecularButton
                    {...specularPrimary}
                    size="md"
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full"
                  >
                    Send Message
                    <Send size={14} strokeWidth={2.5}/>
                  </SpecularButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: details sidebar */}
          <div className="space-y-5 lg:space-y-6">

            {/* Contact Details */}
            <div className="rounded-2xl border p-5" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(232,119,34,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <div className="font-mono uppercase tracking-wider mb-4" style={{ fontSize: '10px', color: 'rgba(245,166,35,0.6)' }}>
                Contact Details
              </div>
              <div className="space-y-3.5 font-inter text-[13px]">
                <div>
                  <div className="text-white/35 mb-0.5">General</div>
                  <a href="mailto:hello@drocol.ng" className="text-white/85 hover:text-[#F5A623] transition-colors">hello@drocol.ng</a>
                </div>
                <div>
                  <div className="text-white/35 mb-0.5">Technical Support</div>
                  <a href="tel:+23412804400" className="text-white/85 hover:text-[#F5A623] transition-colors">+234 1 280 4400</a>
                </div>
                <div>
                  <div className="text-white/35 mb-0.5">Phone</div>
                  <a href="tel:+23412804400" className="text-white/85 hover:text-[#F5A623] transition-colors">+234 1 280 4400</a>
                </div>
                <div>
                  <div className="text-white/35 mb-0.5">Mobile / Direct</div>
                  <a href="tel:+2348136420014" className="text-white/85 hover:text-[#F5A623] transition-colors">+234 813 642 0014</a>
                </div>
                <div>
                  <div className="text-white/35 mb-0.5">Office</div>
                  <div className="text-white/85">Oniru, Victoria Island, Lagos</div>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="rounded-2xl border p-5" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(232,119,34,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <div className="font-mono uppercase tracking-wider mb-4" style={{ fontSize: '10px', color: 'rgba(245,166,35,0.6)' }}>
                Follow Us
              </div>
              <div className="flex gap-2.5">
                {[
                  { icon: <Instagram size={15}/>, label: 'Instagram', href: 'https://www.instagram.com/drocol.tech' },
                  { icon: <Linkedin size={15}/>, label: 'LinkedIn', href: '#' },
                ].map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-2xl border p-5" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(232,119,34,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={13} style={{ color: '#F5A623' }} strokeWidth={2}/>
                <div className="font-mono uppercase tracking-wider" style={{ fontSize: '10px', color: 'rgba(245,166,35,0.6)' }}>
                  Business Hours
                </div>
              </div>
              <div className="space-y-2 font-inter text-[12.5px]">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between">
                    <span className="text-white/45">{h.day}</span>
                    <span className="font-mono text-[#F5A623]">{h.time}</span>
                  </div>
                ))}
              </div>
              <p className="font-inter text-[11px] leading-relaxed text-white/35 mt-4 pt-4 border-t border-white/5">
                We are available around the clock every day of the year. All consultations, support,
                and project engagements are handled online — no downtime, no matter your time zone.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
