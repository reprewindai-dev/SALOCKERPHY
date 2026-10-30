import React, { useState } from 'react';
import { Users, Shield, Cpu, Terminal, Search, CheckCircle, Lock } from 'lucide-react';
import { AGENT_WORKFORCE } from '../../services/mockData';
import { AgentWorkforceMember } from '../../types/veklom';

export const AgentsView: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const domains = ['All', 'Security', 'Operations', 'Governance', 'Infrastructure', 'Intelligence'];

  const filteredAgents = AGENT_WORKFORCE.filter((agent) => {
    const matchesDomain = selectedDomain === 'All' || agent.domain === selectedDomain;
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.boundPolicy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-2">
            <Users className="w-3.5 h-3.5" />
            Veklom 120-Agent Autonomous Workforce
          </div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            Specialized Capability Agents with Deterministic Authority Leases
          </h1>
          <p className="text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Unlike permanently privileged bot fleets, each Veklom agent is instantiated inside an ephemeral Firecracker MicroVM or OS-enforced cell, bound strictly to scoped policies, and destroyed upon completion.
          </p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-slate-100">120 Units</div>
          <div className="text-[10px] text-emerald-400">Zero Privilege Overlap</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-lg border text-xs transition cursor-pointer ${
                selectedDomain === dom
                  ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents or policy..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {agent.name}
                </div>
                <div className="text-[11px] text-orange-400 mt-0.5">{agent.domain} Domain</div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                agent.isolation === 'microvm'
                  ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                  : 'bg-blue-950/80 text-blue-300 border border-blue-500/40'
              }`}>
                {agent.isolation}
              </span>
            </div>

            <p className="text-slate-300 text-[11px] leading-relaxed">
              {agent.role}
            </p>

            <div className="pt-2 border-t border-slate-800/60 space-y-1 text-[10px] text-slate-400">
              <div className="flex justify-between">
                <span>Bound Policy:</span>
                <span className="text-slate-300 font-medium">{agent.boundPolicy}</span>
              </div>
              <div className="flex justify-between">
                <span>Execution Status:</span>
                <span className="text-emerald-400 capitalize">{agent.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
