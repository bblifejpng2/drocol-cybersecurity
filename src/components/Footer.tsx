import React, { useState } from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSpinning(true);
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      setIsSpinning(false);
    }, 900);
  };

  return (
    <footer className="bg-[#141414] py-12 md:py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10">
          
          {/* Column 1: Logo & Info */}
          <div className="col-span-2 md:col-span-1">
            <a 
              href="#home" 
              onClick={handleLogoClick} 
              className="logo-container dark footer-logo mb-5 inline-flex items-center gap-3 select-none no-underline"
            >
              <div className={`logo-mark w-10 h-10 relative flex-shrink-0 ${isSpinning ? 'spin-once' : ''}`} title="Click to spin">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" fill="none" className="w-full h-full object-contain block origin-center transition-all duration-400">
                  <defs>
                    <filter id="footerGlow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="1.3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Connecting lines */}
                  <path d="M60 15A39 39 0 0 1 94 73 M94 73A39 39 0 0 1 26 73 M26 73A39 39 0 0 1 60 15" stroke="#f5f5f5" strokeWidth="3.5" strokeLinecap="round" opacity=".95"/>
                  {/* Top security shield */}
                  <g transform="translate(60 15)" filter="url(#footerGlow)">
                    <path d="M0-12 11-7.5V3.5 C11 9.5 6 14.3 0 17 C-6 14.3-11 9.5-11 3.5v-11Z" fill="#f5f5f5"/>
                    <circle r="6.1" fill="#111" />
                    <path d="M3.2-3.3 C2-4.5-2.6-4.8-3-1.8 C-3.4.8 3.1.1 3 3 C2.9 5.8-1.7 5.5-3.3 4.2 M0-6v12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
                  </g>
                  {/* Internet shield */}
                  <g transform="translate(94 73)" filter="url(#footerGlow)">
                    <path d="M0-12 11-7.5V3.5 C11 9.5 6 14.3 0 17 C-6 14.3-11 9.5-11 3.5v-11Z" fill="#ff6a00"/>
                    <circle r="6.2" fill="#fff" />
                    <circle r="5" fill="none" stroke="#ff6a00" strokeWidth="1.1"/>
                    <path d="M-5 0H5 M-4.2-2.5h8.4 M-4.2 2.5h8.4 M0-5c-2.2 2.4-2.2 7.6 0 10 M0-5c2.2 2.4 2.2 7.6 0 10" stroke="#ff6a00" strokeWidth=".9" strokeLinecap="round"/>
                  </g>
                  {/* Eye shield */}
                  <g transform="translate(26 73)" filter="url(#footerGlow)">
                    <path d="M0-12 11-7.5V3.5 C11 9.5 6 14.3 0 17 C-6 14.3-11 9.5-11 3.5v-11Z" fill="#93a4b8"/>
                    <circle r="6.2" fill="#0f1720" />
                    <path d="M-5 0 C-2.7-4.2 2.7-4.2 5 0 C2.7 4.2-2.7 4.2-5 0Z" fill="none" stroke="#78c7ef" stroke-width="1.1"/>
                    <circle r="2" fill="#78c7ef" />
                    <circle r=".8" fill="#e9f8ff" />
                  </g>
                </svg>
              </div>
              <div className="logo-wordmark-wrap h-10 flex items-center">
                <svg viewBox="0 0 260 78" xmlns="http://www.w3.org/2000/svg" aria-label="Drocol Technologies Limited" className="h-full w-auto block">
                  <text className="wordmark-text fill-white font-bold tracking-tighter" x="0" y="44" fontSize="52">Drocol</text>
                  <rect className="wordmark-o-accent fill-[#FF6A00] origin-center" x="125.5" y="27.5" width="7" height="7" rx="1.5" ry="1.5" />
                  <text className="wordmark-sub-text fill-[#FF6A00] font-sans font-semibold tracking-[3.5px]" x="0" y="65" fontSize="9.5">TECHNOLOGIES LIMITED</text>
                </svg>
              </div>
            </a>
            <p className="text-sm text-neutral-500 font-inter leading-relaxed mt-4">
              Enterprise cybersecurity, built in Lagos for Africa.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-semibold mb-5 font-sans text-sm tracking-wide uppercase">Product</h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-inter">
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hover:text-[#E87722] transition-colors"
                >
                  Cloud Security
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hover:text-[#E87722] transition-colors"
                >
                  Pen Testing
                </a>
              </li>
              <li>
                <a 
                  href="#attack-path" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('attack-path')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hover:text-[#E87722] transition-colors"
                >
                  Attack Paths
                </a>
              </li>
              <li>
                <a 
                  href="#integrations" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('integrations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hover:text-[#E87722] transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 font-sans text-sm tracking-wide uppercase">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-inter">
              <li><a href="#" className="hover:text-[#E87722] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#E87722] transition-colors">Blog</a></li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hover:text-[#E87722] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-semibold mb-5 font-sans text-sm tracking-wide uppercase">Legal</h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-inter">
              <li><a href="#" className="hover:text-[#E87722] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#E87722] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#E87722] transition-colors">Security Disclosure</a></li>
              <li><a href="#" className="hover:text-[#E87722] transition-colors">NDPR Compliance</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/5 mb-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-neutral-500 font-inter text-center md:text-left">
            © 2026 Drocol Technologies Ltd. RC: 1742893. Made with ❤️ in Lagos.
          </p>
          <div className="flex gap-3">
            <a 
              href="#" 
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E87722] hover:border-[#E87722] text-white transition-all duration-300"
              aria-label="Twitter link"
            >
              <Twitter size={16} />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E87722] hover:border-[#E87722] text-white transition-all duration-300"
              aria-label="LinkedIn link"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E87722] hover:border-[#E87722] text-white transition-all duration-300"
              aria-label="GitHub link"
            >
              <Github size={16} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
