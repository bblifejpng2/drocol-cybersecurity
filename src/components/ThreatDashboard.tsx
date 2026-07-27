import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Eye, Server, Key, Database, UserCheck, AlertTriangle } from 'lucide-react';
import { Finding, initialFindings, mockNewFindings, graphNodes, graphEdges, graphSignals, GraphNode } from '../lib/data';

export const ThreatDashboard: React.FC = () => {
  const [findings, setFindings] = useState<Finding[]>(initialFindings);
  const [totalFindings, setTotalFindings] = useState<number>(142);
  const [activeTab, setActiveTab] = useState<'OPEN' | 'RESOLVED' | 'ALL'>('OPEN');
  const [tickerIndex, setTickerIndex] = useState<number>(0);
  const [hoveredNode, setHighlightedNode] = useState<GraphNode | null>(null);
  const [clickedNode, setClickedNode] = useState<GraphNode | null>(null);
  const [cycleIndex, setCycleIndex] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  const autoCycleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFindings((prev) => {
        const next = mockNewFindings[tickerIndex % mockNewFindings.length];
        const item = { ...next, age: '1m', risk: parseFloat((next.risk + (Math.random() * 0.2 - 0.1)).toFixed(1)) };
        const updated = [item, ...prev];
        if (updated.length > 5) updated.pop();
        return updated;
      });
      setTotalFindings(p => p + 1);
      setTickerIndex(p => p + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [tickerIndex]);

  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => setCycleIndex(p => (p + 1) % graphNodes.length), 5000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const activeNode = clickedNode || hoveredNode || (isAutoCycling ? graphNodes[cycleIndex] : null);
  const activeSignal = activeNode ? graphSignals[graphNodes.findIndex(n => n.id === activeNode.id) % graphSignals.length] : null;
  const isEdgeHighlighted = (from: string, to: string) => activeNode ? activeNode.id === from || activeNode.id === to : false;

  const filteredFindings = findings.filter(f => {
    if (activeTab === 'OPEN') return f.status === 'OPEN' || f.status === 'IN PROG';
    if (activeTab === 'RESOLVED') return f.status === 'ACK';
    return true;
  });

  const srcColors: Record<string, { bg: string; text: string; dot: string }> = {
    api:  { bg: 'rgba(239,68,68,0.1)',   text: '#f87171', dot: '#ef4444' },
    web:  { bg: 'rgba(59,130,246,0.1)',  text: '#60a5fa', dot: '#3b82f6' },
    cspm: { bg: 'rgba(236,72,153,0.1)',  text: '#f472b6', dot: '#ec4899' },
    iam:  { bg: 'rgba(167,139,250,0.1)', text: '#a78bfa', dot: '#8b5cf6' },
    auth: { bg: 'rgba(16,185,129,0.1)',  text: '#34d399', dot: '#10b981' },
  };

  const getNodeIcon = (type: string) => {
    const cls = 'transition-colors duration-300';
    switch (type) {
      case 'api':     return <Server size={16} className={`text-blue-400 ${cls}`}/>;
      case 'auth':    return <Eye size={16} className={`text-purple-400 ${cls}`}/>;
      case 'secret':  return <Key size={16} className={`text-pink-400 ${cls}`}/>;
      case 's3':      return <Database size={16} className={`text-emerald-400 ${cls}`}/>;
      case 'analyst': return <UserCheck size={16} className={`text-white ${cls}`}/>;
      default:        return <Server size={16} className={cls}/>;
    }
  };

  return (
    <section id="threats" className="relative bg-[#080808] py-24 md:py-32 overflow-hidden">

      {/* ── Background ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px',
        }}/>
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}/>
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(100px)' }}/>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)', filter: 'blur(100px)' }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.12) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 mb-6 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/[0.06]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"/>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"/>
            </span>
            <span className="text-[11px] font-inter font-semibold tracking-widest text-red-400 uppercase">Live Security Operations Center</span>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.0]">
                Real-time findings<br/>
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #E87722, #F5A623)' }}>
                  across your entire stack.
                </span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-white/40 font-inter text-sm leading-relaxed">
                Every second, our engine analyses millions of signals from cloud workloads, APIs, and endpoints — surfacing only the risks that matter.
              </p>
            </div>
          </div>
        </div>

        {/* ── Panels ───────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-4 md:gap-5">

          {/* Findings Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col rounded-2xl overflow-hidden border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)', boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px rgba(0,0,0,0.4)' }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"/>
                </div>
                <span className="font-mono text-xs font-medium text-white/50">findings — inbox</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-white/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]"/>
                <span className="text-green-400 font-bold">LIVE</span>
                <span>· 5 groups ·</span>
                <span className="text-white/60 font-bold">{totalFindings}</span>
                <span>findings</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 px-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
              {(['OPEN', 'RESOLVED', 'ALL'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative font-mono text-[11px] font-bold tracking-wider uppercase px-4 py-3 transition-colors duration-200"
                  style={{ color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.3)' }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-px bg-[#E87722]"/>
                  )}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-grow">
              <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {['Src', 'Finding', 'Risk', 'Status', 'Age'].map(h => (
                      <th key={h} className="font-mono text-[10px] font-bold text-left px-5 py-3 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredFindings.map((f, i) => {
                    const sc = srcColors[f.srcClass] || srcColors.api;
                    return (
                      <motion.tr
                        key={`${f.finding}-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="transition-colors duration-150 group/row"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', borderLeft: `3px solid ${sc.dot}` }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                      >
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className="font-mono text-[10px] font-bold px-2 py-1 rounded-md"
                            style={{ background: sc.bg, color: sc.text }}>
                            {f.src}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-inter text-xs text-white/70 font-medium">{f.finding}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className="font-mono font-bold text-sm" style={{
                            color: f.riskClass === 'critical' ? '#f87171' : f.riskClass === 'high' ? '#fb923c' : '#fbbf24'
                          }}>{f.risk}</span>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full" style={{
                            background: f.statusClass === 'in-prog' ? 'rgba(59,130,246,0.15)' : f.statusClass === 'open' ? 'rgba(255,255,255,0.06)' : 'rgba(245,158,11,0.12)',
                            color: f.statusClass === 'in-prog' ? '#60a5fa' : f.statusClass === 'open' ? 'rgba(255,255,255,0.5)' : '#fbbf24',
                          }}>{f.status}</span>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap font-mono text-[11px] text-white/30">{f.age}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Graph Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col rounded-2xl overflow-hidden border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)', boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px rgba(0,0,0,0.4)' }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20"/>
                </div>
                <span className="font-mono text-xs font-medium text-white/50">cloud — inventory graph</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-white/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]"/>
                <span className="text-green-400 font-bold">LIVE</span>
                <span>· 128 assets</span>
              </div>
            </div>

            {/* Graph canvas */}
            <div
              className="relative flex-grow min-h-[320px] overflow-hidden cursor-crosshair"
              style={{ background: 'rgba(255,255,255,0.01)' }}
              onClick={() => { setClickedNode(null); setIsAutoCycling(true); }}
            >
              {/* Dot grid on canvas */}
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}/>

              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="rgba(232,119,34,0.6)"/>
                  </marker>
                </defs>
                {graphEdges.map((edge, index) => {
                  const from = graphNodes.find(n => n.id === edge.from);
                  const to = graphNodes.find(n => n.id === edge.to);
                  if (!from || !to) return null;
                  const highlighted = isEdgeHighlighted(edge.from, edge.to);
                  return (
                    <line
                      key={index}
                      x1={`${from.x}%`} y1={`${from.y}%`}
                      x2={`${to.x}%`} y2={`${to.y}%`}
                      stroke={highlighted ? '#E87722' : 'rgba(255,255,255,0.08)'}
                      strokeWidth={highlighted ? 2 : 1.5}
                      strokeDasharray={highlighted ? '5,4' : 'none'}
                      markerEnd={highlighted ? 'url(#arrowhead)' : undefined}
                      className="transition-all duration-500"
                      style={{ animation: highlighted ? 'dash 12s linear infinite' : 'none' }}
                    />
                  );
                })}
              </svg>

              <style>{`@keyframes dash { to { stroke-dashoffset: -100; } }`}</style>

              {graphNodes.map(node => {
                const isHighlighted = activeNode?.id === node.id;
                const nodeColors: Record<string, string> = {
                  api: '#3b82f6', auth: '#8b5cf6', secret: '#ec4899', s3: '#10b981', analyst: '#E87722'
                };
                const nc = nodeColors[node.type] || '#fff';
                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => { setIsAutoCycling(false); setHighlightedNode(node); }}
                    onMouseLeave={() => { setHighlightedNode(null); if (!clickedNode) setIsAutoCycling(true); }}
                    onClick={e => { e.stopPropagation(); setIsAutoCycling(false); setClickedNode(node); }}
                    style={{
                      left: `${node.x}%`, top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)',
                      background: isHighlighted ? nc : 'rgba(20,20,20,0.95)',
                      borderColor: isHighlighted ? nc : 'rgba(255,255,255,0.12)',
                      boxShadow: isHighlighted ? `0 0 0 4px ${nc}22, 0 0 20px ${nc}44` : 'none',
                    }}
                    className="absolute w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono text-[9px] font-bold transition-all duration-300 z-10 border"
                  >
                    {getNodeIcon(node.type)}
                    <span className="mt-0.5" style={{ color: isHighlighted ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                      {node.label}
                    </span>
                  </button>
                );
              })}

              {activeNode && activeSignal && (
                <div
                  className="absolute z-20 pointer-events-none rounded-xl border p-3 max-w-[180px]"
                  style={{
                    left: `${activeNode.x}%`,
                    top: `${activeNode.y}%`,
                    transform: `translate(${activeNode.x > 60 ? '-115%' : '20%'}, calc(-50% - 54px))`,
                    background: 'rgba(12,12,12,0.95)',
                    borderColor: 'rgba(232,119,34,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#E87722] mb-1.5 uppercase tracking-wider">
                    <AlertTriangle size={11}/>
                    {activeSignal.title}
                  </div>
                  <div className="text-[11px] text-white/50 font-inter leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: activeSignal.desc }}/>
                </div>
              )}
            </div>

            {/* Graph footer stats */}
            <div className="px-5 py-3.5 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
              <div className="flex gap-5 font-mono text-[11px] text-white/30">
                {[['14', 'public'], ['6', 'sensitive'], ['9', 'edges']].map(([val, label]) => (
                  <div key={label}><span className="text-white/60 font-bold">{val}</span> {label}</div>
                ))}
              </div>
              {(!isAutoCycling || clickedNode) && (
                <button
                  onClick={e => { e.stopPropagation(); setClickedNode(null); setIsAutoCycling(true); }}
                  className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#E87722] hover:text-[#F5A623] transition-colors"
                >
                  <RefreshCw size={10}/>
                  Resume
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom info cards ─────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          {[
            { title: 'Map the systems attackers can reach', body: 'Bring apps, APIs, cloud assets, identities, secrets, and data stores into one security view. Understand access paths and critical nodes in real-time.' },
            { title: 'One unified asset graph', body: 'Every asset, edge, and identity in a single live graph. Correlate misconfigurations with active threats to block attack paths before they are exploited.' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl border transition-all duration-300 group"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,119,34,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(232,119,34,0.03)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <h3 className="text-lg font-bold text-white tracking-[-0.01em] mb-2">{card.title}</h3>
              <p className="text-white/40 font-inter text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
