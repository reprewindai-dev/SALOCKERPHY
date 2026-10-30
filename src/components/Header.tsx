import React from 'react';
import { Shield, Terminal, Zap, Wallet, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentWorkspace: string;
  onSelectWorkspace: (ws: string) => void;
  reserveBalance: number;
  onOpenTopUp: () => void;
  onOpenTerminal: () => void;
  activeEpoch: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentWorkspace,
  onSelectWorkspace,
  reserveBalance,
  onOpenTopUp,
  onOpenTerminal,
  activeEpoch,
}) => {
  return (
    <header className="h-14 border-b border-slate-800 bg-[#0a0e14]/90 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-500 shadow-sm shadow-orange-500/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-sm tracking-tight">Veklom</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-semibold">
                Lockerphycer
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono leading-none">Sovereign AI Control Plane</p>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-800 mx-2 hidden sm:block" />

        {/* Live operational badge */}
        <div className="hidden md:flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span>VERIFIED_LIVE</span>
        </div>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-3">
        {/* Workspace selector */}
        <div className="relative flex items-center">
          <label className="text-xs text-slate-400 mr-2 hidden lg:inline-block font-mono">Workspace:</label>
          <div className="relative">
            <select
              value={currentWorkspace}
              onChange={(e) => onSelectWorkspace(e.target.value)}
              aria-label="Current Workspace"
              className="appearance-none bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-mono rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
            >
              <option value="veklom-core">veklom-core (EU-West)</option>
              <option value="sovereign-health">sovereign-health (HIPAA)</option>
              <option value="fintech-eu">fintech-eu (PCI-DSS)</option>
              <option value="media-creator">media-creator (DMCA)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Authority Epoch indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono bg-slate-900/80 border border-slate-700/80 px-2.5 py-1 rounded-lg text-slate-300">
          <Shield className="w-3.5 h-3.5 text-orange-400" />
          <span>Epoch #{activeEpoch}</span>
        </div>

        {/* Operating Reserve Wallet */}
        <button
          onClick={onOpenTopUp}
          title="Click to manage Operating Reserve"
          className="flex items-center gap-2 text-xs font-mono bg-orange-950/30 border border-orange-500/30 hover:border-orange-500/60 px-3 py-1.5 rounded-lg text-orange-300 transition cursor-pointer"
        >
          <Wallet className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-semibold">${reserveBalance.toFixed(2)}</span>
          <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1 rounded uppercase">Reserve</span>
        </button>

        {/* Quantum Terminal Quick Launch */}
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1.5 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Terminal</span>
        </button>
      </div>
    </header>
  );
};
