import React, { useState, useEffect } from 'react';
import {
  Activity,
  Radio,
  Clock,
  Shield,
  Lock,
  Cpu,
  FileCheck2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { BackgroundScanner } from '../../types/veklom';

interface BackgroundScannersViewProps {
  scanners: BackgroundScanner[];
  onTriggerScan: (scannerId: string) => void;
}

export const BackgroundScannersView: React.FC<BackgroundScannersViewProps> = ({
  scanners,
  onTriggerScan,
}) => {
  // Real-time ticking timers to show how often the system scans
  const [ticker, setTicker] = useState(0);
  const [activeScanningId, setActiveScanningId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualScan = (scannerId: string) => {
    setActiveScanningId(scannerId);
    onTriggerScan(scannerId);
    setTimeout(() => {
      setActiveScanningId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header Banner */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            Telemetry & Background Engine Architecture
          </div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            How Veklom Scans in the Background & What Happens Behind the Scenes
          </h1>
          <p className="text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Security to security: Real-time visibility into the five continuous background engines guarding memory, API tokens, model egress, and cryptographic proof.
          </p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400">5 Scanning Engines</div>
          <div className="text-[10px] text-slate-400">Zero Unattended Execution Gaps</div>
        </div>
      </div>

      {/* The 4 Architectural Questions Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 space-y-1.5">
          <div className="text-[10px] uppercase text-orange-400 font-bold flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> Behind the Scenes
          </div>
          <div className="text-slate-200 font-bold text-xs">Continuous Interception</div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Every token is evaluated before context assembly. Models never ingest raw unsanitized inputs or see credentials.
          </p>
        </div>

        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 space-y-1.5">
          <div className="text-[10px] uppercase text-cyan-400 font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> How Often Does It Scan?
          </div>
          <div className="text-slate-200 font-bold text-xs">Deterministic Cadences</div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Prompt radars scan in sub-3ms real time. Memory barriers sweep every 2s. Vault tokens audit every 10s.
          </p>
        </div>

        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 space-y-1.5">
          <div className="text-[10px] uppercase text-emerald-400 font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> How Is It Scanning?
          </div>
          <div className="text-slate-200 font-bold text-xs">Heuristics & Cgroups</div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Combines AST delimiter parsers, neural Safe Harbor regex cascades, Firecracker kernel measurements, and Ed25519 hash chains.
          </p>
        </div>

        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 space-y-1.5">
          <div className="text-[10px] uppercase text-purple-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Continuity & Continuum
          </div>
          <div className="text-slate-200 font-bold text-xs">Nothing Dies Unnotarized</div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Data transforms continuously across layers: prompt becomes envelope, envelope becomes MicroVM cell, cell becomes immutable Gnomledger block.
          </p>
        </div>
      </div>

      {/* Detailed Background Scanner Engines */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Radio className="w-4 h-4 text-orange-400" />
          Active Background Scanners: Real-Time Engine Profiles
        </h2>

        <div className="space-y-3">
          {scanners.map((scanner) => {
            const isScanning = activeScanningId === scanner.id;
            const secondsLeft = scanner.intervalSeconds - (ticker % scanner.intervalSeconds);

            return (
              <div
                key={scanner.id}
                className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg hover:border-slate-700 transition"
              >
                {/* Engine Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100 text-sm">{scanner.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-700 text-slate-300">
                          {scanner.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-orange-400 mt-0.5 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>Cadence: <strong>{scanner.frequency}</strong></span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">Next auto-sweep in {secondsLeft}s</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-[11px]">
                      <div className="text-slate-200 font-bold">{scanner.totalInspected.toLocaleString()} inspected</div>
                      <div className="text-emerald-400">{scanner.threatsNeutralized} threats neutralized</div>
                    </div>

                    <button
                      onClick={() => handleManualScan(scanner.id)}
                      disabled={isScanning}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      {isScanning ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5 animate-spin text-orange-400" />
                          Sweeping...
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-emerald-400" />
                          Sweep Now
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* What's Going On & Why It Matters Dual Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-orange-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> What's Going On In The Background:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {scanner.whatIsGoingOn}
                    </p>
                    <div className="text-[10px] text-slate-500 pt-1">
                      Active Rule Set: <span className="text-slate-400 select-all">{scanner.currentRule}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Why It Matters Natively In Veklom:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {scanner.whyItMatters}
                    </p>
                    <div className="text-[10px] text-emerald-400 pt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Security-to-Security SLA: Zero plaintext leakage</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
