import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Shield, Search, BookOpen, Users, Cpu, 
  CheckCircle, Globe, Lock, Zap, Target,
  Mail, Phone, MapPin, ChevronDown, Star, Award,
  Eye, FileSearch, ClipboardCheck, Wrench, Quote
} from 'lucide-react';

/* ── Stats Data ── */
const stats = [
  { value: '50+', label: 'Audits Completed' },
  { value: '₦500M+', label: 'Assets Secured' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Support' },
];

/* ── Trusted By Logos ── */
const trustedLogos = [
  { name: 'GTBank', width: 'w-24' },
  { name: 'MTN', width: 'w-20' },
  { name: 'Dangote', width: 'w-28' },
  { name: 'Interswitch', width: 'w-24' },
  { name: 'Flutterwave', width: 'w-28' },
  { name: 'Paystack', width: 'w-24' },
];

/* ── Process Steps ── */
const processSteps = [
  {
    step: '01',
    icon: <Eye size={24} />,
    title: 'Discover',
    description: 'We analyze your infrastructure, applications, and security posture to understand your unique risk landscape.',
  },
  {
    step: '02',
    icon: <FileSearch size={24} />,
    title: 'Assess',
    description: 'Comprehensive vulnerability assessment and penetration testing across all attack surfaces.',
  },
  {
    step: '03',
    icon: <ClipboardCheck size={24} />,
    title: 'Report',
    description: 'Clear, actionable findings with risk prioritization and executive-ready summaries.',
  },
  {
    step: '04',
    icon: <Wrench size={24} />,
    title: 'Remediate',
    description: 'Hands-on support to fix vulnerabilities and implement security improvements.',
  },
];

/* ── Services Data ── */
const services = [
  {
    icon: <Search size={24} />,
    title: 'Assess',
    description: 'Identify vulnerabilities, weaknesses, and attack paths across your applications, infrastructure, APIs, and cloud environments.',
    items: ['Vulnerability Assessment & Penetration Testing', 'Web Application Security', 'API Security', 'Cloud Security'],
    color: '#3b82f6',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Advise',
    description: 'Turn security risks into practical decisions, stronger security programs, and measurable improvements.',
    items: ['Cybersecurity Strategy', 'Risk Assessment', 'NDPA Compliance', 'ISO 27001', 'PCI DSS'],
    color: '#8b5cf6',
  },
  {
    icon: <Users size={24} />,
    title: 'Train',
    description: 'Build the knowledge and capabilities your people need to recognize, prevent, and respond to security threats.',
    items: ['Security Awareness', 'Cybersecurity Training', 'Secure Development Training', 'Incident Response Exercises'],
    color: '#10b981',
  },
  {
    icon: <Cpu size={24} />,
    title: 'Build',
    description: 'Build security capabilities, automation, and technology that make security more effective and scalable.',
    items: ['Security Engineering', 'Security Automation', 'AI Security', 'Security Integrations'],
    color: '#E87722',
  },
];

/* ── Why Choose Us ── */
const reasons = [
  {
    icon: <Shield size={20} />,
    title: 'Research-Driven',
    description: 'Our approach is grounded in deep research and continuous learning, ensuring we stay ahead of emerging threats.',
  },
  {
    icon: <Target size={20} />,
    title: 'Practical Solutions',
    description: 'We focus on actionable recommendations that actually work in your environment, not theoretical idealism.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Fast Response',
    description: 'Rapid turnaround on assessments and continuous support throughout your security journey.',
  },
  {
    icon: <Globe size={20} />,
    title: 'Local Expertise',
    description: 'Built by Nigerians, for Nigerian enterprises. We understand the local threat landscape and regulatory requirements.',
  },
];

/* ── Testimonials ── */
const testimonials = [
  {
    quote: "Drocol transformed our security posture. Their team identified critical vulnerabilities we had missed for years and provided clear, actionable remediation steps.",
    author: 'Adebayo Ogundimu',
    role: 'CTO, FinTech Solutions Ltd',
    rating: 5,
  },
  {
    quote: "Professional, thorough, and genuinely invested in our success. Their NDPA compliance guidance was invaluable for our organization.",
    author: 'Ngozi Okafor',
    role: 'CISO, MajorBank Nigeria',
    rating: 5,
  },
  {
    quote: "The best security assessment we've ever had. Drocol's team explained everything in terms our board could understand and act on.",
    author: 'Emeka Nwosu',
    role: 'VP Engineering, TechCorp',
    rating: 5,
  },
];

/* ── FAQ Data ── */
const faqs = [
  {
    question: 'How long does a typical security assessment take?',
    answer: 'Most assessments are completed within 2-4 weeks, depending on the scope and complexity. We provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We work across all industries but have deep expertise in financial services, fintech, healthcare, and technology companies operating in Nigeria and across Africa.',
  },
  {
    question: 'Do you offer ongoing support after the assessment?',
    answer: 'Yes. We provide remediation support, security training, and can engage as your virtual CISO for ongoing security program management.',
  },
  {
    question: 'How do you ensure confidentiality of our data?',
    answer: 'We sign NDAs before every engagement, use secure data handling practices, and all our team members are security-cleared professionals.',
  },
];

/* ── FAQ Accordion Component ── */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Enhanced Drocol Professional Page
 * 
 * Professional, serious design with:
 * - Trusted By logo cloud
 * - How It Works process section
 * - Enhanced services with hover effects
 * - Testimonials section
 * - FAQ accordion
 * - Professional animations
 */
export const DrocolProPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ═══════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/drocol-icon.png" alt="Drocol" className="h-8 w-auto" />
            <span className="font-bold text-lg tracking-tight">Drocol</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-gray-600 hover:text-[#E87722] transition-colors">Services</a>
            <a href="#process" className="text-sm font-medium text-gray-600 hover:text-[#E87722] transition-colors">Process</a>
            <a href="#why-us" className="text-sm font-medium text-gray-600 hover:text-[#E87722] transition-colors">Why Us</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-[#E87722] transition-colors">Contact</a>
          </nav>
          
          <Link 
            to="/contact" 
            className="px-5 py-2.5 bg-[#E87722] text-white text-sm font-semibold rounded-full hover:bg-[#D06A1F] transition-all hover:shadow-lg hover:shadow-[#E87722]/25"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-orange-50/50 to-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #E87722 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E87722]/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#E87722] rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-[#E87722]">Enterprise Cybersecurity</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Security intelligence{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E87722] to-[#F5A623]">
                you can trust
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mb-8 leading-relaxed">
              Drocol helps Nigerian organizations identify vulnerabilities, manage cyber risk, and build stronger security capabilities through expert consulting and technology.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E87722] text-white font-semibold rounded-full hover:bg-[#D06A1F] transition-all hover:shadow-lg hover:shadow-[#E87722]/25"
              >
                Book a Call <ArrowRight size={16} />
              </Link>
              <a 
                href="#services" 
                className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-[#E87722] hover:text-[#E87722] transition-colors"
              >
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUSTED BY SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Trusted by leading organizations</p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-60">
            {trustedLogos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="h-8 flex items-center text-gray-400 font-bold text-xl tracking-tight">
                  {logo.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-orange-50/30 border border-gray-100"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#E87722] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS / PROCESS SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="process" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E87722]/10 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#E87722] rounded-full"></span>
              <span className="text-xs font-bold text-[#E87722] tracking-wider uppercase">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              How we work
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A proven methodology that delivers measurable security improvements for your organization.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#E87722]/20 via-[#E87722] to-[#E87722]/20"></div>
            
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#E87722]/30 hover:shadow-xl transition-all duration-300 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#E87722] flex items-center justify-center text-white mb-4 mx-auto relative">
                    {step.icon}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E87722]/10 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#E87722] rounded-full"></span>
              <span className="text-xs font-bold text-[#E87722] tracking-wider uppercase">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Comprehensive security solutions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              From identifying vulnerabilities to building long-term security capabilities, we help organizations understand and improve their security posture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-[#E87722]/30 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: `${service.color}15`, color: service.color }}
                >
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-[#E87722]" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/solutions" 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#E87722] hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHY CHOOSE US SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="why-us" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E87722]/10 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-[#E87722] rounded-full"></span>
                <span className="text-xs font-bold text-[#E87722] tracking-wider uppercase">Why Drocol</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Confidence before crisis
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Organizations should not have to wait for a breach to understand their risk. We help you identify weaknesses early and build resilience before a crisis happens.
              </p>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#E87722]/10 flex items-center justify-center">
                  <Lock size={20} className="text-[#E87722]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Trusted by Leading Organizations</div>
                  <div className="text-xs text-gray-500">Protecting critical assets across Nigeria</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {reasons.map((reason, i) => (
                <div 
                  key={reason.title}
                  className="p-6 bg-white rounded-xl border border-gray-100 hover:border-[#E87722]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E87722]/10 flex items-center justify-center text-[#E87722] mb-4">
                    {reason.icon}
                  </div>
                  <h4 className="font-bold mb-2">{reason.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E87722]/10 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#E87722] rounded-full"></span>
              <span className="text-xs font-bold text-[#E87722] tracking-wider uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              What our clients say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Trusted by organizations across Nigeria to deliver real security improvements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-[#E87722]/30 hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="absolute top-6 right-6 text-[#E87722]/20">
                  <Quote size={48} />
                </div>
                
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-[#E87722] text-[#E87722]" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E87722] to-[#F5A623] flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E87722]/10 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#E87722] rounded-full"></span>
              <span className="text-xs font-bold text-[#E87722] tracking-wider uppercase">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to know about working with Drocol.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#E87722] to-[#D06A1F] rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}></div>
            
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full mb-6">
                <Award size={14} />
                <span className="text-xs font-bold tracking-wider uppercase">Ready to get started?</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to build confidence together?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Talk to our security team. No pressure, no jargon — just a practical conversation about your security.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#E87722] font-semibold rounded-full hover:bg-gray-100 transition-all hover:shadow-lg"
                >
                  Let's Talk <ArrowRight size={16} />
                </Link>
                <a 
                  href="mailto:hello@drocol.ng" 
                  className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                >
                  <Mail size={16} /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/drocol-icon.png" alt="Drocol" className="h-8 w-auto" />
              <span className="font-bold text-lg">Drocol Technologies</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="mailto:hello@drocol.ng" className="flex items-center gap-2 hover:text-[#E87722] transition-colors">
                <Mail size={14} /> hello@drocol.ng
              </a>
              <a href="tel:+2348001234567" className="flex items-center gap-2 hover:text-[#E87722] transition-colors">
                <Phone size={14} /> +234 800 123 4567
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> Lagos, Nigeria
              </span>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 Drocol Technologies Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#E87722] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#E87722] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#E87722] transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
