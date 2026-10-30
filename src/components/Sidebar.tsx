import React from 'react';
import {
  Activity,
  Layers,
  Radio,
  Building2,
  Compass,
  KeyRound,
  Terminal,
  Wallet,
  Users,
  FileText,
  Shield,
  Zap,
  CheckCircle,
} from 'lucide-react';

export type TabId =
  | 'continuum'
  | 'scanners'
  | 'verticals'
  | 'gpc'
  | 'security'
  | 'workspace'
  | 'terminal'
  | 'wallet'
  | 'agents'
  | 'legal';

interface SidebarProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
  openThreatsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  openThreatsCount,
}) => {
  const menuSections = [
    {
      group: 'CONTINUUM NERVE CENTER',
      items: [
        {
          id: 'continuum' as TabId,
          label: 'Continuum Cockpit',
          subtitle: 'All-in-One Live Flow',
          icon: Zap,
          badge: 'Live Stream',
          badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
        },
        {
          id: 'scanners' as TabId,
          label: 'Background Telemetry',
          subtitle: 'How & How Often We Scan',
          icon: Radio,
          badge: '5 Scanners',
          badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40',
        },
        {
          id: 'verticals' as TabId,
          label: 'Vertical Blueprints',
          subtitle: 'HIPAA · PCI-DSS · Solvency',
          icon: Building2,
          badge: '5 Suites',
          badgeColor: 'text-orange-400 bg-orange-950/60 border-orange-500/40',
        },
      ],
    },
    {
      group: 'GOVERNANCE & EXECUTION',
      items: [
        {
          id: 'gpc' as TabId,
          label: 'Governed Plan Compiler',
          subtitle: 'Intent → Policy Plan',
          icon: Compass,
        },
        {
          id: 'security' as TabId,
          label: 'Lockerphycer Security',
          subtitle: 'Authority Leases & Vault',
          icon: KeyRound,
          badge: openThreatsCount > 0 ? `${openThreatsCount} alerts` : undefined,
          badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
        },
        {
          id: 'workspace' as TabId,
          label: 'Models & Tool Hub',
          subtitle: 'BYOK Models & Pipelines',
          icon: Layers,
        },
      ],
    },
    {
      group: 'SETTLEMENT & OPERATOR',
      items: [
        {
          id: 'terminal' as TabId,
          label: 'Quantum Terminal',
          subtitle: 'Direct Operator CLI',
          icon: Terminal,
        },
        {
          id: 'wallet' as TabId,
          label: 'Operating Reserve',
          subtitle: 'x402 Micro-Settle',
          icon: Wallet,
        },
        {
          id: 'agents' as TabId,
          label: 'Agent Workforce',
          subtitle: '120 Autonomous Units',
          icon: Users,
          badge: '120',
          badgeColor: 'text-slate-400 bg-slate-800 border-slate-700',
        },
        {
          id: 'legal' as TabId,
          label: 'Legal & SLA Terms',
          subtitle: 'Vendor & License',
          icon: FileText,
        },
      ],
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#090d13] flex flex-col justify-between shrink-0 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="p-3 space-y-4">
        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">
              {section.group}
            </div>

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-orange-500/15 text-orange-300 border border-orange-500/30 font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition ${
                        isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                    <div className="truncate">
                      <div className={`truncate ${isActive ? 'text-slate-100 font-medium' : ''}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{item.subtitle}</div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                        item.badgeColor || 'text-slate-400 bg-slate-800 border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Continuity Contract Footer */}
      <div className="p-3 m-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[10px] font-mono space-y-1.5">
        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center gap-1 font-semibold text-emerald-400">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> Continuum Core
          </span>
          <span className="text-slate-400">VERIFIED_LIVE</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Nothing dies: prompt → envelope → microVM cell → Gnomledger proof.
        </p>
      </div>
    </aside>
  );
};
