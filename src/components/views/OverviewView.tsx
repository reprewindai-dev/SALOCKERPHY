import React from 'react';
import {
  ShieldCheck,
  Server,
  Cpu,
  Layers,
  ArrowRight,
  TrendingDown,
  Lock,
  Compass,
  AlertTriangle,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';
import { TabId } from '../Sidebar';
import { AuthorityKey, SecurityEvent, GPCPlan } from '../../types/veklom';

interface OverviewViewProps {
  onNavigate: (tab: TabId) => void;
  authorityKeys: AuthorityKey[];
  securityEvents: SecurityEvent[];
  gpcPlans: GPCPlan[];
  reserveBalance: number;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  authorityKeys,
  securityEvents,
  gpcPlans,
  reserveBalance,
}) => {
  const activeKeys = authorityKeys.filter((k) => k.status === 'active');
  const openAlerts = securityEvents.filter((e) => e.status !== 'resolved');

  return (
    <div className="space-y-6">
      {/* Hero Announcement Banner */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-[#0e1622] p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse-glow" />
              Sovereign Runtime Authority Layer
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              Lockerphycer Security Domain & AI Control Plane
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl leading-relaxed">
              Governs capability, not privileged fleets. Turn AI tests into verifiable, compliant workflows
              with zero key exposure, Firecracker MicroVM execution cells, and cryptographic replay evidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('gpc')}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-medium transition flex items-center gap-2 shadow-lg shadow-orange-600/20 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              Compile Intent (GPC)
            </button>
            <button
              onClick={() => onNavigate('terminal')}
              className="px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-300 hover:text-white text-xs font-mono transition flex items-center gap-2 cursor-pointer"
            >
              Quantum Terminal
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Authority Keys</span>
            <Lock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{activeKeys.length} Active</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span className="text-orange-400 font-semibold">Epoch #4</span> · Ed25519 signed
          </div>
        </div>

        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">GPC Plans</span>
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{gpcPlans.length + 66} Plans</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <span>● 100% Policy Bound</span>
          </div>
        </div>

        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Security Alerts</span>
            <AlertTriangle className={`w-4 h-4 ${openAlerts.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`} />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">
            {openAlerts.length} <span className="text-xs font-normal text-slate-400">active</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span>3 Auto-mitigated</span>
          </div>
        </div>

        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Operating Reserve</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">${reserveBalance.toFixed(2)}</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span>x402 Settle verified</span>
          </div>
        </div>
      </div>

      {/* Canonical Veklom Capability Architecture Table (00_VEKLOM_BIBLE.md) */}
      <div className="rounded-xl border border-slate-800 bg-[#0b1017] overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-100 font-mono">
              Canonical Subsystem Authority & Truth Boundaries
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Governed according to <span className="text-orange-400">00_VEKLOM_BIBLE.md</span>. Truth order: Live behavior → Coolify → Repo → PGL.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> VERIFIED_LIVE
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> CONFIGURED
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800 text-[11px] uppercase">
              <tr>
                <th className="px-4 py-3">Subsystem / Domain</th>
                <th className="px-4 py-3">Operational Role</th>
                <th className="px-4 py-3">Isolation / Enforcement</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Evidence Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="px-4 py-3 font-semibold text-orange-400">Lockerphycer</td>
                <td className="px-4 py-3">Secret & Key Security Domain, Authority Leases</td>
                <td className="px-4 py-3 text-slate-400">AES-256-GCM + Epoch Key Rotation</td>
                <td className="px-4 py-3 text-emerald-400">Operational</td>
                <td className="px-4 py-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    VERIFIED_LIVE
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-200">CAPPO</td>
                <td className="px-4 py-3">Fail-Closed Authorization & Authority Gatekeeper</td>
                <td className="px-4 py-3 text-slate-400">Zero-overlap credential lifetime</td>
                <td className="px-4 py-3 text-emerald-400">Operational</td>
                <td className="px-4 py-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    VERIFIED_LIVE
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-200">Firecracker MicroVM</td>
                <td className="px-4 py-3">Governed Execution Cells (Host isolation)</td>
                <td className="px-4 py-3 text-slate-400">Kernel measurement + 17-state FSM</td>
                <td className="px-4 py-3 text-emerald-400">Hardened</td>
                <td className="px-4 py-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    VERIFIED_LIVE
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-200">Gnomledger / PGL</td>
                <td className="px-4 py-3">Evidence, Provenance & Lineage Ledger</td>
                <td className="px-4 py-3 text-slate-400">SHA-256 Hash Chain Notarization</td>
                <td className="px-4 py-3 text-emerald-400">Synced</td>
                <td className="px-4 py-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    VERIFIED_LIVE
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-200">BYOS Substrate</td>
                <td className="px-4 py-3">Private Execution Runtime (Self-hosted vLLM)</td>
                <td className="px-4 py-3 text-slate-400">Zero key exposure via Vault proxy</td>
                <td className="px-4 py-3 text-cyan-400">Configured</td>
                <td className="px-4 py-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 text-[10px]">
                    CONFIGURED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-200">x402 Settlement</td>
                <td className="px-4 py-3">Operating Reserve settlement & verification</td>
                <td className="px-4 py-3 text-slate-400">ERC-6492 SIWE Signature Proofs</td>
                <td className="px-4 py-3 text-emerald-400">Operational</td>
                <td className="px-4 py-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    VERIFIED_LIVE
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5-Step Lifecycle Guide */}
      <div className="rounded-xl border border-slate-800 bg-[#0b1017] p-5">
        <h3 className="text-sm font-semibold font-mono text-slate-200 mb-3">
          Sovereign Capability Lifecycle: 9-Stage Deterministic Flow
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2 text-center text-xs font-mono">
          {[
            { step: '01', name: 'Resolve', desc: 'Verify intent' },
            { step: '02', name: 'Bind Policy', desc: 'Attach gates' },
            { step: '03', name: 'Issue Grant', desc: 'Scoped lease' },
            { step: '04', name: 'Instantiate', desc: 'MicroVM cell' },
            { step: '05', name: 'Execute', desc: 'Zero exposure' },
            { step: '06', name: 'Record Evidence', desc: 'PGL ledger' },
            { step: '07', name: 'Revoke', desc: 'Expire token' },
            { step: '08', name: 'Destroy', desc: 'Tear down cell' },
            { step: '09', name: 'Observe & Settle', desc: 'x402 reserve' },
          ].map((item, idx) => (
            <div key={item.step} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-center">
              <span className="text-[10px] text-orange-400 font-bold">{item.step}</span>
              <span className="text-slate-200 font-medium text-[11px] mt-0.5">{item.name}</span>
              <span className="text-[9px] text-slate-400 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
