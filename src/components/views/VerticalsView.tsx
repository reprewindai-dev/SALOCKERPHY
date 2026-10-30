import React, { useState } from 'react';
import {
  Building2,
  Heart,
  Landmark,
  Shield,
  Video,
  Layers,
  CheckCircle,
  AlertCircle,
  Eye,
  FileCheck,
  RefreshCw,
  Sparkles,
  Lock,
} from 'lucide-react';
import { INDUSTRY_VERTICALS } from '../../services/mockData';
import { IndustryVertical } from '../../types/veklom';

export const VerticalsView: React.FC = () => {
  const [selectedVerticalId, setSelectedVerticalId] = useState<string>('hospital');
  const activeVertical: IndustryVertical = INDUSTRY_VERTICALS[selectedVerticalId] || INDUSTRY_VERTICALS.hospital;

  // Simulator state
  const [inputText, setInputText] = useState<string>(activeVertical.defaultSamplePrompt);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResult, setSimulatedResult] = useState<{
    sanitizedText: string;
    redactedCount: number;
    riskScore: number;
    frameworkResults: { name: string; status: 'passed' | 'warning' }[];
    generatedAuditDigest: string;
  } | null>(null);

  // Switch vertical handler
  const handleSelectVertical = (id: string) => {
    setSelectedVerticalId(id);
    const vert = INDUSTRY_VERTICALS[id];
    setInputText(vert.defaultSamplePrompt);
    setSimulatedResult(null);
  };

  const runSimulation = () => {
    setIsSimulating(true);

    setTimeout(() => {
      let text = inputText;
      let count = 0;

      // Apply vertical specific redaction rules
      activeVertical.redactionRules.forEach((rule) => {
        const matches = text.match(rule.pattern);
        if (matches) {
          count += matches.length;
          text = text.replace(rule.pattern, rule.replacement);
        }
      });

      const frameworkResults = activeVertical.complianceFrameworks.map((f) => ({
        name: f.name,
        status: 'passed' as const,
      }));

      setSimulatedResult({
        sanitizedText: text,
        redactedCount: count,
        riskScore: count > 0 ? 98 : 100,
        frameworkResults,
        generatedAuditDigest: `sha256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      });

      setIsSimulating(false);
    }, 400);
  };

  const getVerticalIcon = (id: string) => {
    switch (id) {
      case 'hospital':
        return Heart;
      case 'bank':
        return Landmark;
      case 'insurance':
        return Shield;
      case 'content_creator':
        return Video;
      default:
        return Layers;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-2">
            <Building2 className="w-3.5 h-3.5" />
            LockerSphere Vertical Security Framework
          </div>
          <h1 className="text-xl font-bold text-slate-100 font-mono tracking-tight">
            AI Security Built for Regulated Industries
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1 max-w-2xl leading-relaxed">
            Five pre-configured vertical suites with HIPAA, PCI-DSS v4.0, Solvency II, DMCA, and SOC 2 guardrails baked into every runtime execution.
          </p>
        </div>
      </div>

      {/* 5 Vertical Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
        {Object.values(INDUSTRY_VERTICALS).map((vertical) => {
          const Icon = getVerticalIcon(vertical.id);
          const isSelected = vertical.id === selectedVerticalId;

          return (
            <button
              key={vertical.id}
              onClick={() => handleSelectVertical(vertical.id)}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-orange-500 shadow-md shadow-orange-500/10'
                  : 'bg-[#0b1017] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${vertical.color}20`, color: vertical.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {vertical.displayName.split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {vertical.badge}
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 flex items-center gap-1 text-[10px] text-orange-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Active
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Vertical Details & Security Policy */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 font-mono text-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-100">{activeVertical.displayName}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-700 text-slate-300">
                {activeVertical.badge}
              </span>
            </div>
            <p className="text-xs text-orange-400 mt-0.5">{activeVertical.tagline}</p>
            <p className="text-slate-400 text-[11px] mt-1 max-w-3xl leading-relaxed">
              {activeVertical.description}
            </p>
          </div>
        </div>

        {/* Security Policy Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Audit Log Retention</div>
            <div className="text-sm font-bold text-slate-200 mt-1">
              {activeVertical.security.auditLogRetentionDays} Days
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Immutable PGL Ledger</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Session Timeout</div>
            <div className="text-sm font-bold text-slate-200 mt-1">
              {activeVertical.security.sessionTimeoutMinutes} min
            </div>
            <div className="text-[10px] text-cyan-400 mt-0.5">Auto-revoke Token</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Zero Trust & RBAC</div>
            <div className="text-sm font-bold text-slate-200 mt-1">Enforced</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">CAPPO Fail-Closed</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Data Encryption</div>
            <div className="text-sm font-bold text-slate-200 mt-1">AES-GCM-256</div>
            <div className="text-[10px] text-slate-400 mt-0.5">At Rest & In Transit</div>
          </div>
        </div>
      </div>

      {/* Interactive Compliance & Redaction Simulator */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              Live Security Gate & PHI/PII Scrubber Simulator
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Test how Lockerphycer intercepts prompt payloads before they touch external model APIs.
            </p>
          </div>

          <button
            onClick={() => setInputText(activeVertical.defaultSamplePrompt)}
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Reset Sample Prompt
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input side */}
          <div className="space-y-2">
            <label className="text-slate-400 text-[11px] block">
              Inbound Prompt Payload (Simulated Client Request):
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
            />
            <div className="flex justify-end">
              <button
                onClick={runSimulation}
                disabled={isSimulating || !inputText.trim()}
                className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium transition flex items-center gap-2 shadow-lg shadow-orange-600/20 cursor-pointer"
              >
                {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Shield className="w-3.5 h-3.5" />}
                {isSimulating ? 'Filtering...' : 'Enforce Vertical Guardrails'}
              </button>
            </div>
          </div>

          {/* Output / Redaction side */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Sanitized Output (Safe for Model Context):</span>
              {simulatedResult && (
                <span className="text-emerald-400 font-semibold">
                  {simulatedResult.redactedCount} Entities Redacted
                </span>
              )}
            </div>

            <div className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 min-h-[148px] text-slate-300 font-mono text-xs whitespace-pre-wrap">
              {simulatedResult ? (
                simulatedResult.sanitizedText
              ) : (
                <span className="text-slate-400 italic">
                  Click "Enforce Vertical Guardrails" to run PHI/PII redaction and compliance scoring...
                </span>
              )}
            </div>

            {simulatedResult && (
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Compliance Verification:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 100% Policy Bound
                  </span>
                </div>
                <div className="text-slate-400 truncate">
                  Audit Digest: <span className="text-slate-300 select-all">{simulatedResult.generatedAuditDigest}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
