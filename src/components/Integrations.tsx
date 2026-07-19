import React from 'react';
import { Cloud, GitBranch, Shield, Slack, MessageSquare, AlertCircle, BarChart, Settings, Activity, Server } from 'lucide-react';
import { integrations, Integration } from '../lib/data';

export const Integrations: React.FC = () => {
  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'aws': 
        return <Cloud size={22} className="text-white" />;
      case 'azure': 
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
            <path d="M0 4.75h6v6H0zM9 4.75h6v6H9zM0 12.75h6v6H0zM9 12.75h6v6H9z"/>
          </svg>
        );
      case 'gcp': 
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
          </svg>
        );
      case 'k8s': 
        return <Server size={22} className="text-white" />;
      case 'github': 
        return <GitBranch size={22} className="text-white" />;
      case 'okta': 
        return <Shield size={22} className="text-white" />;
      case 'jira': 
        return <Settings size={22} className="text-white" />;
      case 'slack': 
        return <Slack size={22} className="text-white" />;
      case 'pagerduty': 
        return <MessageSquare size={22} className="text-white" />;
      case 'splunk': 
        return <AlertCircle size={22} className="text-white" />;
      case 'terraform': 
        return <Settings size={22} className="text-white" />;
      case 'datadog': 
        return <Activity size={22} className="text-white" />;
      default: 
        return <Cloud size={22} className="text-white" />;
    }
  };

  return (
    <section id="integrations" className="bg-[#0B0B0B] py-16 md:py-28 relative">
      {/* Background line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-10 mb-12 md:mb-14">
          <div className="lg:col-span-2">
            <div className="section-eyebrow text-[#E87722] font-semibold text-xs tracking-widest uppercase mb-3">
              Integrations
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.05]">
              Plugs into the stack<br/><span className="italic text-[#E87722]">you already run.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-neutral-400 font-inter text-sm md:text-base leading-relaxed">
              Drocol integrates with your existing cloud infrastructure, CI/CD pipelines, identity providers, SIEMs, and collaboration platforms—no rip-and-replace required.
            </p>
          </div>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {integrations.map((item: Integration, index) => (
            <div 
              key={index}
              className="integration-tile group bg-white/3 border border-white/8 rounded-xl md:rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-3.5 transition-all duration-300 hover:bg-white/6 hover:border-[#E87722] hover:-translate-y-1 cursor-pointer min-h-[72px] md:min-h-[88px]"
            >
              <div 
                style={{ background: item.gradient }}
                className="integration-icon w-10 h-10 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300"
              >
                {getIntegrationIcon(item.iconType)}
              </div>
              <div className="min-w-0">
                <div className="text-white text-xs md:text-sm font-semibold truncate group-hover:text-[#E87722] transition-colors duration-300">
                  {item.name}
                </div>
                <div className="text-xs text-neutral-500 font-inter truncate">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-neutral-500 font-inter text-sm">
            + 40 more integrations ·{' '}
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-[#E87722] hover:underline font-semibold"
            >
              Request a custom connector
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
