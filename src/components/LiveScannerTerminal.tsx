import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ShieldAlert, CheckCircle, Terminal, Activity, Zap, Target, AlertTriangle, Info } from 'lucide-react';
import { terminalLines, TerminalLine } from '../lib/data';

export const LiveScannerTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [targetUrl, setTargetUrl] = useState<string>('lagos-fintech-app.ng');
  const [customTarget, setCustomTarget] = useState<string>('lagos-fintech-app.ng');
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanStats, setScanStats] = useState({ critical: 0, high: 0, medium: 0, low: 0, endpoints: 0 });

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  // Update stats based on line content
  const updateStats = (text: string) => {
    const lower = text.toLowerCase();
    setScanStats(prev => {
      const newStats = { ...prev, endpoints: prev.endpoints + 1 };
      if (lower.includes('[critical]') || lower.includes('cvss 9') || lower.includes('idor')) {
        newStats.critical++;
      } else if (lower.includes('[high]') || lower.includes('cvss 7') || lower.includes('injection')) {
        newStats.high++;
      } else if (lower.includes('[medium]') || lower.includes('cvss 5')) {
        newStats.medium++;
      } else if (lower.includes('[low]')) {
        newStats.low++;
      }
      return newStats;
    });
  };

  // Handle typing simulation
  useEffect(() => {
    if (!isPlaying || !isScanning) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentIndex >= terminalLines.length) {
      // Loop scan after a delay
      timerRef.current = setTimeout(() => {
        setLines([]);
        setCurrentIndex(0);
        setScanStats({ critical: 0, high: 0, medium: 0, low: 0, endpoints: 0 });
      }, 5000);
      return;
    }

    const currentLine = terminalLines[currentIndex];
    
    // Customize target URL in logs if custom target is set
    let processedText = currentLine.text;
    if (processedText.includes('lagos-fintech-app.ng')) {
      processedText = processedText.replace(/lagos-fintech-app.ng/g, targetUrl);
    }

    // Determine typing delay based on log type
    let delay = 350 + Math.random() * 200;
    if (currentLine.t === 'dim') delay = 120 + Math.random() * 100;
    else if (currentLine.t === 'prompt') delay = 900;
    else if (currentLine.t === 'warn') delay = 600;
    else if (currentLine.t === 'success') delay = 400;

    timerRef.current = setTimeout(() => {
      const newLine = { t: currentLine.t, text: processedText };
      setLines((prev) => [...prev, newLine]);
      updateStats(processedText);
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPlaying, targetUrl, isScanning]);

  const handlePauseToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLines([]);
    setCurrentIndex(0);
    setScanStats({ critical: 0, high: 0, medium: 0, low: 0, endpoints: 0 });
    setIsScanning(true);
    setIsPlaying(true);
  };

  const handleCustomScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTarget.trim()) return;
    
    // Clean target URL
    let cleanTarget = customTarget.replace(/https?:\/\//, '').replace(/\/$/, '');
    setTargetUrl(cleanTarget);
    
    // Reset and start scan
    if (timerRef.current) clearTimeout(timerRef.current);
    setLines([]);
    setCurrentIndex(0);
    setScanStats({ critical: 0, high: 0, medium: 0, low: 0, endpoints: 0 });
    setIsScanning(true);
    setIsPlaying(true);
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case 'prompt': return 'text-[#E87722] font-semibold';
      case 'success': return 'text-green-500 font-medium';
      case 'warn': return 'text-amber-500 font-bold';
      case 'info': return 'text-blue-400';
      case 'dim': return 'text-neutral-500 font-light';
      default: return 'text-neutral-300';
    }
  };

  const getSeverityIcon = (line: { t: string; text: string }) => {
    const text = line.text.toLowerCase();
    if (line.t === 'warn' && (text.includes('critical') || text.includes('cvss 9'))) {
      return <ShieldAlert size={14} className="text-red-500" />;
    } else if (line.t === 'warn' && (text.includes('high') || text.includes('cvss 7'))) {
      return <AlertTriangle size={14} className="text-orange-500" />;
    } else if (line.t === 'warn' && (text.includes('medium') || text.includes('cvss 5'))) {
      return <Info size={14} className="text-yellow-500" />;
    } else if (line.t === 'warn') {
      return <Info size={14} className="text-amber-500" />;
    }
    return null;
  };

  return (
    <section className="bg-neutral-900 py-16 md:py-28 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E87722] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E87722] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Information */}
          <div>
            <div className="section-eyebrow text-[#E87722] font-semibold text-xs tracking-widest uppercase mb-3">
              Live Security Operations Center
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
              Real-time threat<br/>detection in <span className="italic text-[#E87722]">action.</span>
            </h2>
            <p className="text-neutral-400 font-inter leading-relaxed mb-6 sm:mb-8 max-w-lg text-sm md:text-base">
              Our Security Operations Center monitors your applications 24/7, detecting vulnerabilities, tracking threat actors, and providing instant alerts. Watch our live feed to see how we protect your infrastructure in real-time.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="bg-neutral-950 border border-red-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <Activity size={12} className="text-red-500 sm:w-4 sm:h-4" />
                  <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Critical</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-red-500">{scanStats.critical}</p>
              </div>
              <div className="bg-neutral-950 border border-orange-500/20 rounded-xl p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <Zap size={12} className="text-orange-500 sm:w-4 sm:h-4" />
                  <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">High</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-orange-500">{scanStats.high}</p>
              </div>
              <div className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <Target size={12} className="text-yellow-500 sm:w-4 sm:h-4" />
                  <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Medium</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-yellow-500">{scanStats.medium}</p>
              </div>
              <div className="bg-neutral-950 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <ShieldAlert size={12} className="text-blue-500 sm:w-4 sm:h-4" />
                  <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Low</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-blue-500">{scanStats.low}</p>
              </div>
            </div>

            {/* Custom Scan Form */}
            <form onSubmit={handleCustomScanSubmit} className="mb-6 sm:mb-8 max-w-md">
              <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2 text-[10px] sm:text-xs">
                Launch Custom Scan
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  placeholder="e.g. my-company.com.ng"
                  className="form-input flex-grow bg-neutral-950 border border-neutral-800 rounded-lg sm:rounded-xl px-3 sm:px-4.5 py-2 sm:py-3 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#E87722] transition-colors"
                />
                <button 
                  type="submit"
                  className="btn-accent px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#E87722] hover:bg-[#F08B3A] transition-all flex items-center gap-1 sm:gap-2"
                >
                  <Terminal size={16} />
                  Scan
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="btn-accent text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
              >
                Deploy Protection <span className="ml-1 hidden sm:inline">→</span>
              </a>
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="btn-ghost"
              >
                View Capabilities
              </a>
            </div>
          </div>

          {/* Right Column: Live Terminal Feed */}
          <div>
            <div className="terminal-window bg-black border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl min-h-[500px] sm:min-h-0">
              
              {/* Terminal Header */}
              <div className="terminal-header bg-neutral-950 px-3 sm:px-5 py-2.5 sm:py-3.5 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="terminal-dot w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="terminal-dot w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                  <div className="terminal-dot w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                  <span className="text-[10px] sm:text-xs text-neutral-400 ml-1 sm:ml-2 font-mono truncate max-w-[150px] sm:max-w-[280px]">
                    SOC Live Feed — {targetUrl}
                  </span>
                </div>
                
                {/* Terminal Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <div className="hidden sm:flex items-center gap-1.5 mr-1 sm:mr-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E87722] animate-pulse"></div>
                    <span className="text-[10px] text-[#E87722] font-medium uppercase tracking-wider">Live</span>
                  </div>
                  <button 
                    onClick={handlePauseToggle}
                    className="p-1 sm:p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    title={isPlaying ? 'Pause scan' : 'Resume scan'}
                  >
                    {isPlaying ? <Pause size={10} className="sm:w-3 sm:h-3" /> : <Play size={10} className="sm:w-3 sm:h-3" />}
                  </button>
                  <button 
                    onClick={handleRestart}
                    className="p-1 sm:p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    title="Restart scan"
                  >
                    <RotateCcw size={10} className="sm:w-3 sm:h-3" />
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div 
                ref={terminalBodyRef}
                className="terminal-body bg-[#030303] p-3 sm:p-6 font-mono text-[10px] sm:text-xs leading-relaxed h-[350px] sm:h-[440px] overflow-y-auto flex flex-col gap-1 text-neutral-300"
              >
                {lines.map((line, i) => (
                  <div key={i} className="terminal-line flex items-start gap-1 sm:gap-2">
                    {line.t === 'warn' ? (
                      <span className="flex-shrink-0 mt-0.5">
                        {getSeverityIcon(line)}
                      </span>
                    ) : null}
                    <span className={getLineColor(line.t)}>
                      {line.text}
                    </span>
                  </div>
                ))}
                
                {/* Simulated blinking cursor when running */}
                {isPlaying && currentIndex < terminalLines.length && (
                  <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-400 mt-1">
                    <span className="w-1 h-2 sm:w-1.5 sm:h-3.5 bg-neutral-400 animate-pulse"></span>
                    <span className="text-[9px] sm:text-[10px] italic">Analyzing threats...</span>
                  </div>
                )}

                {currentIndex >= terminalLines.length && (
                  <div className="mt-3 sm:mt-4 p-2.5 sm:p-3.5 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2 sm:gap-3 text-green-400">
                    <CheckCircle size={12} className="sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-sm">Scan cycle complete. Restarting in 5s.</span>
                  </div>
                )}
              </div>

              {/* Terminal Footer */}
              <div className="bg-neutral-950 px-3 sm:px-5 py-2 sm:py-2.5 border-t border-white/5 flex items-center justify-between text-[9px] sm:text-[10px] text-neutral-500">
                <div className="flex items-center gap-2 sm:gap-4">
                  <span>Endpoints: <span className="text-neutral-300 font-medium">{scanStats.endpoints}</span></span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Findings: <span className="text-neutral-300 font-medium">{scanStats.critical + scanStats.high + scanStats.medium + scanStats.low}</span></span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="hidden sm:inline">Connected</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};