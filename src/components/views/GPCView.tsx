import React, { useState } from 'react';
import {
  Compass,
  Play,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  DollarSign,
  Download,
  Share2,
  Sparkles,
  FileCode,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { GPCPlan, WorkflowStep, RiskItem } from '../../types/veklom';

interface GPCViewProps {
  plans: GPCPlan[];
  onCompileIntent: (intent: string) => void;
  currentWorkspace: string;
}

export const GPCView: React.FC<GPCViewProps> = ({
  plans,
  onCompileIntent,
  currentWorkspace,
}) => {
  const [intentInput, setIntentInput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans[0]?.id || '');

  const presets = [
    'Triage incoming support tickets using AI with strict EU GDPR data residency',
    'Audit high-frequency SWIFT wire transfers for AML sanctions and OFAC matches',
    'Clinical patient medical discharge summary with HIPAA Safe Harbor de-identification',
    'Automated code review & secret leak detection in GitHub pull requests',
  ];

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentInput.trim() || isCompiling) return;

    setIsCompiling(true);
    setTimeout(() => {
      onCompileIntent(intentInput.trim());
      setIsCompiling(false);
      setIntentInput('');
    }, 800);
  };

  const activePlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  const handleExportJSON = () => {
    if (!activePlan) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activePlan, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${activePlan.id}-governed-plan.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono mb-2">
            <Compass className="w-3.5 h-3.5" />
            Governed Plan Compiler (GPC)
          </div>
          <h1 className="text-xl font-bold text-slate-100 font-mono tracking-tight">
            Turn Intent into Governed Architecture Before Code Ships
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1 max-w-2xl leading-relaxed">
            Most teams get a model to answer; the challenge is the workflow. GPC extracts steps, attaches policy requirements, quantifies risks, and estimates execution cost.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-slate-400">Total Compiled: {plans.length}</span>
        </div>
      </div>

      {/* Compiler input interface */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
          <span className="font-semibold text-slate-200">Natural Language Intent Input</span>
          <span>Workspace: <span className="text-orange-400">{currentWorkspace}</span></span>
        </div>

        <form onSubmit={handleCompile} className="space-y-3">
          <textarea
            value={intentInput}
            onChange={(e) => setIntentInput(e.target.value)}
            rows={3}
            placeholder="Describe your AI workflow intent (e.g. 'Triage patient inquiries, detect urgent symptoms, redact PHI, and prepare physician summary')..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-orange-500 placeholder:text-slate-400 resize-none"
          />

          {/* Quick presets */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-400" /> Presets:
            </span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setIntentInput(preset)}
                className="text-[11px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                {preset.substring(0, 36)}...
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isCompiling || !intentInput.trim()}
              className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-mono font-medium transition flex items-center gap-2 shadow-lg shadow-orange-600/20 cursor-pointer"
            >
              {isCompiling ? (
                <>
                  <Compass className="w-4 h-4 animate-spin text-orange-200" />
                  Synthesizing Plan & Risks...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  Compile with GPC →
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Plan Details Inspector */}
      {activePlan && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Workflow Steps & Execution Target */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-200">{activePlan.id}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-semibold">
                      {activePlan.status}
                    </span>
                  </div>
                  <h2 className="text-sm font-bold text-slate-100 font-mono mt-1">
                    "{activePlan.intent}"
                  </h2>
                </div>

                <button
                  onClick={handleExportJSON}
                  className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Signed Proof
                </button>
              </div>

              {/* Extracted 5-Step Workflow */}
              <div>
                <h3 className="text-xs font-mono font-semibold uppercase text-slate-400 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Extracted Workflow Pipeline ({activePlan.workflowSteps.length} Steps)
                </h3>
                <div className="space-y-2">
                  {activePlan.workflowSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-orange-400 text-xs">
                          {step.step}
                        </span>
                        <span className="text-slate-200">{step.action}</span>
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {step.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deployment Path & Dependencies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Deployment Target</div>
                  <div className="font-semibold text-cyan-400 mt-1">{activePlan.deploymentPath}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Required Models</div>
                  <div className="font-semibold text-slate-200 mt-1 truncate">
                    {activePlan.modelsRequired.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Identified Risks & Mitigations */}
            <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs">
              <h3 className="font-semibold text-slate-200 uppercase text-xs flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Pre-Execution Risk Assessment & Mitigations ({activePlan.risks.length})
              </h3>
              <div className="space-y-2">
                {activePlan.risks.map((riskItem, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200 font-semibold">{riskItem.risk}</span>
                      <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-bold ${
                        riskItem.severity === 'critical'
                          ? 'bg-red-950 text-red-400 border border-red-500/40'
                          : riskItem.severity === 'high'
                          ? 'bg-orange-950 text-orange-400 border border-orange-500/40'
                          : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                      }`}>
                        {riskItem.severity}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Mitigation: <span className="text-emerald-400">{riskItem.mitigation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Policies & Cost Estimate */}
          <div className="space-y-6">
            {/* Policy requirements */}
            <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs">
              <h3 className="font-semibold text-slate-200 uppercase text-xs flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" />
                Attached Policy Gates
              </h3>
              <ul className="space-y-2">
                {activePlan.policyRequirements.map((policy, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cost Estimate Breakdown */}
            <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs">
              <h3 className="font-semibold text-slate-200 uppercase text-xs flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Deterministic Cost Estimate
              </h3>
              <div className="space-y-2 divide-y divide-slate-800">
                <div className="flex justify-between py-1 text-slate-400">
                  <span>Compilation & Risk Gate:</span>
                  <span className="text-slate-200">{activePlan.costEstimate.compile}</span>
                </div>
                <div className="flex justify-between py-1 text-slate-400">
                  <span>Execution In MicroVM:</span>
                  <span className="text-slate-200">{activePlan.costEstimate.execution}</span>
                </div>
                <div className="flex justify-between py-1 text-slate-400">
                  <span>Signed Evidence Artifact:</span>
                  <span className="text-slate-200">{activePlan.costEstimate.artifactGeneration}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold text-slate-100 text-sm">
                  <span>Total Estimated:</span>
                  <span className="text-emerald-400">{activePlan.costEstimate.totalEstimated}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">
                Funded from workspace Operating Reserve via x402 settlement. No surprise token invoices.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
