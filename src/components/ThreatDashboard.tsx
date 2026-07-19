import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, Eye, Server, Key, Database, UserCheck, AlertTriangle } from 'lucide-react';
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
      setFindings((prevFindings) => {
        const nextFinding = mockNewFindings[tickerIndex % mockNewFindings.length];
        const findingWithId = {
          ...nextFinding,
          age: '1m',
          risk: parseFloat((nextFinding.risk + (Math.random() * 0.2 - 0.1)).toFixed(1))
        };
        const updated = [findingWithId, ...prevFindings];
        if (updated.length > 5) {
          updated.pop();
        }
        return updated;
      });
      setTotalFindings((prev) => prev + 1);
      setTickerIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [tickerIndex]);

  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % graphNodes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const activeNode = clickedNode || hoveredNode || (isAutoCycling ? graphNodes[cycleIndex] : null);
  const activeSignal = activeNode
    ? graphSignals[graphNodes.findIndex((n) => n.id === activeNode.id) % graphSignals.length]
    : null;

  const isEdgeHighlighted = (from: string, to: string) => {
    if (!activeNode) return false;
    return activeNode.id === from || activeNode.id === to;
  };

  const filteredFindings = findings.filter((f) => {
    if (activeTab === 'OPEN') return f.status === 'OPEN' || f.status === 'IN PROG';
    if (activeTab === 'RESOLVED') return f.status === 'ACK';
    return true;
  });

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'api':
        return <Server size={18} className="text-blue-500" />;
      case 'auth':
        return <Eye size={18} className="text-purple-500" />;
      case 'secret':
        return <Key size={18} className="text-pink-500" />;
      case 's3':
        return <Database size={18} className="text-emerald-500" />;
      case 'analyst':
        return <UserCheck size={18} className="text-white" />;
      default:
        return <Server size={18} />;
    }
  };

  return (
    <section id="threats" className="bg-[#0B0B0B] py-16 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#E87722] blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-500 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500" />
          </span>
          <span className="text-xs font-inter font-semibold tracking-widest text-red-400 uppercase">
            Live Security Operations Center
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12 md:mb-14">
          <div className="lg:col-span-2">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              Real-time findings<br/>across <span className="text-[#E87722] italic">your entire stack.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-neutral-400 font-inter leading-relaxed text-sm md:text-base">
              Every second, our engine analyses millions of signals from cloud workloads, APIs, and endpoints — surfacing only the risks that matter.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="findings-panel h-full flex flex-col bg-white border border-neutral-200/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="findings-header bg-neutral-50/50 border-b border-neutral-200/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="findings-dots flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="findings-title font-mono font-medium text-neutral-800">findings — inbox</div>
                </div>
                <div className="findings-status flex items-center gap-2 font-mono text-xs text-neutral-500">
                  <span className="live-dot w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-600 font-bold">LIVE</span>
                  <span>
                    · 5 groups · <span id="findingCount" className="text-neutral-800 font-bold">{totalFindings}</span> findings
                  </span>
                </div>
              </div>

              <div className="findings-tabs flex gap-6 px-6 py-3 border-b border-neutral-100 bg-white">
                {(['OPEN', 'RESOLVED', 'ALL'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`findings-tab font-mono text-xs font-bold tracking-wider uppercase border-b-2 pb-1 transition-all ${
                      activeTab === tab ? 'text-neutral-900 border-[#E87722]' : 'text-neutral-400 border-transparent hover:text-neutral-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto flex-grow bg-white">
                <table className="findings-table w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                  <thead>
                    <tr className="border-b border-neutral-100">
                      <th className="font-mono text-[10px] font-bold text-neutral-400 text-left px-6 py-3 uppercase tracking-wider">Src</th>
                      <th className="font-mono text-[10px] font-bold text-neutral-400 text-left px-6 py-3 uppercase tracking-wider">Finding</th>
                      <th className="font-mono text-[10px] font-bold text-neutral-400 text-left px-6 py-3 uppercase tracking-wider">Risk</th>
                      <th className="font-mono text-[10px] font-bold text-neutral-400 text-left px-6 py-3 uppercase tracking-wider">Status</th>
                      <th className="font-mono text-[10px] font-bold text-neutral-400 text-left px-6 py-3 uppercase tracking-wider">Age</th>
                    </tr>
                  </thead>
                  <tbody id="findingsBody" className="divide-y divide-neutral-100">
                    {filteredFindings.map((f, i) => (
                      <tr
                        key={`${f.finding}-${i}`}
                        className={`transition-colors border-l-4 ${
                          f.srcClass === 'api'
                            ? 'border-l-red-500'
                            : f.srcClass === 'web'
                            ? 'border-l-blue-500'
                            : f.srcClass === 'cspm'
                            ? 'border-l-pink-500'
                            : f.srcClass === 'iam'
                            ? 'border-l-purple-500'
                            : 'border-l-emerald-500'
                        }`}
                      >
                        <td className="px-6 py-4.5 whitespace-nowrap">
                          <span
                            className={`finding-src font-mono text-[10px] font-bold px-2.5 py-1 rounded-md ${
                              f.srcClass === 'api'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200/50'
                                : f.srcClass === 'web'
                                ? 'bg-blue-50 text-blue-800 border border-blue-200/50'
                                : f.srcClass === 'cspm'
                                ? 'bg-pink-50 text-pink-800 border border-pink-200/50'
                                : f.srcClass === 'iam'
                                ? 'bg-purple-50 text-purple-800 border border-purple-200/50'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200/50'
                            }`}
                          >
                            {f.src}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-neutral-800 font-inter text-sm font-medium">{f.finding}</td>
                        <td className="px-6 py-4.5 whitespace-nowrap">
                          <span
                            className={`finding-risk font-mono font-bold text-sm ${
                              f.riskClass === 'critical'
                                ? 'text-red-600'
                                : f.riskClass === 'high'
                                ? 'text-orange-600'
                                : 'text-yellow-600'
                            }`}
                          >
                            {f.risk}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 whitespace-nowrap">
                          <span
                            className={`status-badge font-mono text-[10px] font-bold px-3 py-1 rounded-full ${
                              f.statusClass === 'in-prog'
                                ? 'bg-blue-50 text-blue-700'
                                : f.statusClass === 'open'
                                ? 'bg-neutral-100 text-neutral-600'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {f.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 whitespace-nowrap text-neutral-400 font-mono text-xs">{f.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="graph-panel h-full flex flex-col bg-white border border-neutral-200/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="graph-header bg-neutral-50/50 border-b border-neutral-200/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="findings-dots flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  </div>
                  <div className="graph-title font-mono font-medium text-neutral-800">cloud — inventory graph</div>
                </div>
                <div className="findings-status flex items-center gap-2 font-mono text-xs text-neutral-500">
                  <span className="live-dot w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-600 font-bold">LIVE</span>
                  <span>· 128 assets</span>
                </div>
              </div>

              <div
                className="graph-canvas relative flex-grow min-h-[360px] bg-neutral-50/30 overflow-hidden cursor-crosshair"
                onClick={() => {
                  setClickedNode(null);
                  setIsAutoCycling(true);
                }}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {graphEdges.map((edge, index) => {
                    const fromNode = graphNodes.find((n) => n.id === edge.from);
                    const toNode = graphNodes.find((n) => n.id === edge.to);
                    if (!fromNode || !toNode) return null;
                    const highlighted = isEdgeHighlighted(edge.from, edge.to);
                    return (
                      <line
                        key={index}
                        x1={`${fromNode.x}%`}
                        y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`}
                        y2={`${toNode.y}%`}
                        stroke={highlighted ? '#E87722' : 'rgba(0,0,0,0.1)'}
                        strokeWidth={highlighted ? 3.5 : 2}
                        className="transition-all duration-500"
                        strokeDasharray={highlighted ? '5, 5' : 'none'}
                        style={{ animation: highlighted ? 'dash 15s linear infinite' : 'none' }}
                      />
                    );
                  })}
                </svg>

                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -100;
                    }
                  }
                `}</style>

                {graphNodes.map((node) => {
                  const isHighlighted = activeNode?.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onMouseEnter={() => {
                        setIsAutoCycling(false);
                        setHighlightedNode(node);
                      }}
                      onMouseLeave={() => {
                        setHighlightedNode(null);
                        if (!clickedNode) setIsAutoCycling(true);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoCycling(false);
                        setClickedNode(node);
                      }}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)',
                        willChange: 'transform'
                      }}
                      className={`graph-node absolute w-[52px] h-[52px] rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 z-10 border-2 ${
                        node.type === 'analyst'
                          ? 'bg-[#E87722] text-white border-[#E87722]'
                          : 'bg-white text-neutral-800 border-neutral-200'
                      } ${
                        isHighlighted
                          ? 'ring-4 ring-[#E87722]/20 border-[#E87722] scale-115 shadow-xl shadow-[#E87722]/15'
                          : 'hover:scale-110 hover:border-[#E87722]/50 hover:shadow-lg'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        {getNodeIcon(node.type)}
                        <span className={`text-[9px] mt-0.5 ${node.type === 'analyst' ? 'text-white' : 'text-neutral-500'}`}>
                          {node.label}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {activeNode && activeSignal && (
                  <div
                    style={{
                      left: `${activeNode.x}%`,
                      top: `${activeNode.y}%`,
                      transform: `translate(${activeNode.x > 60 ? '-115%' : '20%'}, calc(-50% - 50px))`,
                      willChange: 'transform'
                    }}
                    className="graph-tooltip absolute bg-neutral-950 text-white border border-white/10 rounded-xl p-3 shadow-2xl z-20 pointer-events-none transition-all duration-300 max-w-[180px]"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#E87722] mb-1.5 uppercase tracking-wider">
                      <AlertTriangle size={12} />
                      {activeSignal.title}
                    </div>
                    <div
                      className="text-[11px] text-neutral-300 font-inter leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: activeSignal.desc }}
                    />
                  </div>
                )}
              </div>

              <div className="graph-stats bg-neutral-50/50 border-t border-neutral-200/10 px-6 py-4 font-mono text-xs text-neutral-500">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <span className="graph-stat-value text-neutral-800 font-bold">14</span> public
                  </div>
                  <div>
                    <span className="graph-stat-value text-neutral-800 font-bold">6</span> sensitive
                  </div>
                  <div>
                    <span className="graph-stat-value text-neutral-800 font-bold">9</span> edges
                  </div>
                </div>
                {(!isAutoCycling || clickedNode) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setClickedNode(null);
                      setIsAutoCycling(true);
                    }}
                    className="mt-3 sm:mt-0 sm:ml-auto text-[#E87722] hover:underline font-bold flex items-center gap-1"
                  >
                    <RefreshCw size={10} />
                    Resume Auto-Cycle
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">Map the systems attackers can reach</h3>
            <p className="text-neutral-400 font-inter text-sm md:text-base leading-relaxed">
              Bring apps, APIs, cloud assets, identities, secrets, and data stores into one security view. Understand access paths and critical nodes in real-time.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">One unified asset graph</h3>
            <p className="text-neutral-400 font-inter text-sm md:text-base leading-relaxed">
              Every asset, edge, and identity in a single live graph. Correlate misconfigurations with active threats to block attack paths before they are exploited.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};