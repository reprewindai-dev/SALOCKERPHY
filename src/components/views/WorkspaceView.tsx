import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  ShoppingBag,
  GitBranch,
  Play,
  RotateCcw,
  CheckCircle,
  ExternalLink,
  Search,
  Check,
  Shield,
  FileCode,
  Flame,
} from 'lucide-react';
import { INITIAL_MODELS, INITIAL_TOOLS } from '../../services/mockData';
import { ModelProvider, MarketplaceTool } from '../../types/veklom';

interface WorkspaceViewProps {
  currentWorkspace: string;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({ currentWorkspace }) => {
  const [activeTab, setActiveTab] = useState<'models' | 'tools' | 'pipelines'>('models');
  const [tools, setTools] = useState<MarketplaceTool[]>(INITIAL_TOOLS);
  const [toolSearch, setToolSearch] = useState('');

  // 7-Stage Pipeline State
  const pipelineStages = [
    { id: '1', name: 'Intake & AST Dependency Parse', time: '1.2s' },
    { id: '2', name: 'Policy Binding & ABIDE Compilation', time: '0.8s' },
    { id: '3', name: 'Ephemeral MicroVM Cell Allocation', time: '1.5s' },
    { id: '4', name: 'Kernel & Network Hash Attestation', time: '0.9s' },
    { id: '5', name: 'Canary Rollout (10% Traffic)', time: '2.0s' },
    { id: '6', name: 'Full Sovereign Promotion', time: '1.1s' },
    { id: '7', name: 'Gnomledger PGL Evidence Notarization', time: '0.7s' },
  ];

  const [currentPipelineStage, setCurrentPipelineStage] = useState<number>(-1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([
    '[STANDBY] Git commit 9f8a2c1 ready for deployment on branch main',
  ]);

  const handleToggleTool = (toolId: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, installed: !t.installed } : t))
    );
  };

  const runPipelineDeploy = () => {
    setIsDeploying(true);
    setCurrentPipelineStage(0);
    setPipelineLogs([
      `[STAGE 1/7] Ingesting commit sha:7e91a0c for workspace ${currentWorkspace}...`,
      '[STAGE 1/7] Dependencies resolved: zero untrusted external egress permitted.',
    ]);

    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage < pipelineStages.length) {
        setCurrentPipelineStage(stage);
        const stageObj = pipelineStages[stage];
        setPipelineLogs((prev) => [
          ...prev,
          `[STAGE ${stage + 1}/7] ${stageObj.name} completed in ${stageObj.time}`,
          `[EVIDENCE] SHA-256 seal: sha256:${Math.random().toString(36).substring(2, 12)}`,
        ]);
      } else {
        clearInterval(interval);
        setIsDeploying(false);
        setPipelineLogs((prev) => [
          ...prev,
          '[SUCCESS] Pipeline completed. Service active in EU-Frankfurt private perimeter.',
          '[PGL] Permanent audit bundle stored in Gnomledger: block #941,204.',
        ]);
      }
    }, 600);
  };

  const filteredTools = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(toolSearch.toLowerCase()) ||
      t.category.toLowerCase().includes(toolSearch.toLowerCase()) ||
      t.description.toLowerCase().includes(toolSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('models')}
          className={`px-4 py-3 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'models'
              ? 'border-orange-500 text-orange-400 bg-orange-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          Model Catalog (BYOK)
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-3 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'tools'
              ? 'border-orange-500 text-orange-400 bg-orange-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Tool Hub & Marketplace
        </button>

        <button
          onClick={() => setActiveTab('pipelines')}
          className={`px-4 py-3 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'pipelines'
              ? 'border-orange-500 text-orange-400 bg-orange-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          7-Stage Railway Deploy Pipelines
        </button>
      </div>

      {/* MODELS TAB */}
      {activeTab === 'models' && (
        <div className="space-y-4">
          <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-orange-400" />
                BYOK Sovereign Model Catalog
              </h2>
              <p className="text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Connect external providers with zero API key exposure or route directly into private single-node vLLM instances hosted on your own server.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INITIAL_MODELS.map((model) => (
              <div key={model.id} className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-100 text-sm">{model.name}</div>
                    <div className="text-[11px] text-slate-400">{model.provider}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-900 border border-slate-700 text-slate-300">
                    {model.tier}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <div className="flex justify-between">
                    <span>Latency:</span>
                    <span className="text-emerald-400">{model.latencyMs} ms avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Context:</span>
                    <span className="text-slate-300">{model.maxTokens.toLocaleString()} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Key Exposure:</span>
                    <span className="text-emerald-400 font-semibold">Zero Exposure (Vault Bound)</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Policy Attached
                  </span>
                  <button className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-[11px] transition">
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOLS TAB */}
      {activeTab === 'tools' && (
        <div className="space-y-4">
          <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-orange-400" />
                Veklom Tool Hub & Capability Marketplace
              </h2>
              <p className="text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Browse pre-audited security tools, compliance packs, and telemetry collectors. Installed tools become available across all workspace agents.
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
                placeholder="Search tools & categories..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-100 text-sm">{tool.name}</div>
                      <div className="text-[11px] text-slate-400">{tool.author}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-700 text-slate-300">
                      {tool.category}
                    </span>
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-200 font-semibold">{tool.pricing}</span> · {tool.downloads.toLocaleString()} installs
                  </div>

                  <button
                    onClick={() => handleToggleTool(tool.id)}
                    className={`px-3 py-1 rounded text-xs transition cursor-pointer flex items-center gap-1.5 ${
                      tool.installed
                        ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-red-950 hover:border-red-500/40 hover:text-red-300'
                        : 'bg-orange-600 hover:bg-orange-500 text-white'
                    }`}
                  >
                    {tool.installed ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Installed
                      </>
                    ) : (
                      'Install'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PIPELINES TAB */}
      {activeTab === 'pipelines' && (
        <div className="space-y-6">
          <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-orange-400" />
                7-Stage Railway Deployment Pipeline
              </h2>
              <p className="text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Deterministic deployment path with policy compilation, sandbox isolation, cryptographic attestation, and evidence recording.
              </p>
            </div>

            <button
              onClick={runPipelineDeploy}
              disabled={isDeploying}
              className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-medium transition flex items-center gap-2 shadow-lg shadow-orange-600/20 cursor-pointer"
            >
              {isDeploying ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              {isDeploying ? 'Deploying Pipeline...' : 'Trigger Pipeline Rollout'}
            </button>
          </div>

          {/* 7 Stage Visual Flow */}
          <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Pipeline Stage Progression</span>
              <span className="text-orange-400 font-bold">
                {currentPipelineStage >= 0
                  ? `Stage ${currentPipelineStage + 1} of 7: ${pipelineStages[currentPipelineStage]?.name}`
                  : 'Ready to deploy'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
              {pipelineStages.map((stage, idx) => {
                const isPassed = currentPipelineStage > idx;
                const isCurrent = currentPipelineStage === idx;

                return (
                  <div
                    key={stage.id}
                    className={`p-3 rounded-lg border text-center transition ${
                      isCurrent
                        ? 'bg-orange-500/20 border-orange-500 text-orange-200 font-bold shadow'
                        : isPassed
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400">Stage {idx + 1}</div>
                    <div className="font-semibold text-[11px] mt-1 leading-snug">{stage.name}</div>
                    <div className="text-[10px] mt-2 opacity-70">est. {stage.time}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streaming Console Logs */}
          <div className="bg-[#06090e] border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
              <span className="text-slate-300 font-bold">Pipeline Execution Output</span>
              <span>Host Port: 3000</span>
            </div>
            <div className="h-44 overflow-y-auto space-y-1 text-slate-300 text-[11px]">
              {pipelineLogs.map((log, i) => (
                <div key={i}>
                  <span className="text-slate-400 select-none mr-2">{i + 1}</span>
                  <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : ''}>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
