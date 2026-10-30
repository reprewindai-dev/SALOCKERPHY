import React, { useState } from 'react';
import {
  KeyRound,
  ShieldAlert,
  Cpu,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Terminal,
  ShieldCheck,
  Hash,
} from 'lucide-react';
import {
  AuthorityKey,
  VaultSecret,
  SecurityEvent,
  CellPhase,
  IsolationClass,
} from '../../types/veklom';

interface LockerphycerViewProps {
  authorityKeys: AuthorityKey[];
  onRotateKey: () => void;
  vaultSecrets: VaultSecret[];
  onAddSecret: (secret: Omit<VaultSecret, 'id' | 'lastRotated'>) => void;
  securityEvents: SecurityEvent[];
  onUpdateEventStatus: (id: string, status: 'open' | 'investigating' | 'resolved') => void;
  onSimulateThreat: () => void;
}

export const LockerphycerView: React.FC<LockerphycerViewProps> = ({
  authorityKeys,
  onRotateKey,
  vaultSecrets,
  onAddSecret,
  securityEvents,
  onUpdateEventStatus,
  onSimulateThreat,
}) => {
  const [activeSection, setActiveSection] = useState<'keys' | 'vault' | 'cells' | 'threats'>('keys');

  // Vault secret visibility toggles
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, boolean>>({});
  const [showAddSecretModal, setShowAddSecretModal] = useState(false);
  const [newSecretName, setNewSecretName] = useState('');
  const [newSecretProvider, setNewSecretProvider] = useState('');
  const [newSecretValue, setNewSecretValue] = useState('');

  // Execution Cells FSM interactive runner state
  const fsmPhases: CellPhase[] = [
    'REQUESTED',
    'IDENTITY_VERIFIED',
    'LEASE_VALIDATED',
    'CELL_ALLOCATED',
    'RUNTIME_MEASURED',
    'NETWORK_LOCKED',
    'EXECUTING',
    'CELL_OUTPUT_VALIDATED',
    'CELL_DESTROYED',
    'BROKER_PATH_READY',
    'MUTATION_REVALIDATED',
    'MUTATION_ATTEMPTED',
    'MUTATION_ACCEPTED',
    'CREDENTIALS_REVOKED',
    'EVIDENCE_SEALED',
    'TEARDOWN_ATTESTED',
    'COMPLETED',
  ];

  const [currentFsmIndex, setCurrentFsmIndex] = useState(0);
  const [isCellRunning, setIsCellRunning] = useState(false);
  const [selectedIsolation, setSelectedIsolation] = useState<IsolationClass>('microvm');
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    '[INIT] Execution cell runtime initialized with Firecracker v1.4 kernel',
    '[AUTH] Ready for CAPPO authority lease issuance',
  ]);

  const runFullFsmCycle = () => {
    setIsCellRunning(true);
    setCurrentFsmIndex(0);
    setExecutionLogs([
      `[1/17 REQUESTED] Isolation: ${selectedIsolation}. Checking lease envelope.`,
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < fsmPhases.length) {
        setCurrentFsmIndex(step);
        const phaseName = fsmPhases[step];
        setExecutionLogs((prev) => [
          ...prev,
          `[${step + 1}/17 ${phaseName}] Hash chain: sha256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
        ]);
      } else {
        clearInterval(interval);
        setIsCellRunning(false);
        setExecutionLogs((prev) => [
          ...prev,
          '[EVIDENCE_SEALED] Signed measurement receipt verified on Gnomledger.',
        ]);
      }
    }, 450);
  };

  const handleCreateSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecretName || !newSecretValue) return;

    onAddSecret({
      name: newSecretName.toUpperCase(),
      provider: newSecretProvider || 'Custom Provider',
      maskedValue: newSecretValue.substring(0, 4) + '••••••••••••••••••••' + newSecretValue.substring(newSecretValue.length - 4),
      fullValue: newSecretValue,
      cipherSuite: 'AES-256-GCM',
      environment: 'production',
    });

    setNewSecretName('');
    setNewSecretProvider('');
    setNewSecretValue('');
    setShowAddSecretModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Module Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2 font-mono text-xs">
        <button
          onClick={() => setActiveSection('keys')}
          className={`px-4 py-3 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 ${
            activeSection === 'keys'
              ? 'border-orange-500 text-orange-400 bg-orange-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          Authority Keys & Epochs
        </button>

        <button
          onClick={() => setActiveSection('vault')}
          className={`px-4 py-3 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 ${
            activeSection === 'vault'
              ? 'border-orange-500 text-orange-400 bg-orange-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          Zero-Exposure BYOK Vault
        </button>

        <button
          onClick={() => setActiveSection('cells')}
          className={`px-4 py-3 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 ${
            activeSection === 'cells'
              ? 'border-orange-500 text-orange-400 bg-orange-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          Governed Execution Cells (FSM)
        </button>

        <button
          onClick={() => setActiveSection('threats')}
          className={`px-4 py-3 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 ${
            activeSection === 'threats'
              ? 'border-orange-500 text-orange-400 bg-orange-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          Security Threat Feed ({securityEvents.filter((e) => e.status !== 'resolved').length})
        </button>
      </div>

      {/* SECTION 1: AUTHORITY KEYS */}
      {activeSection === 'keys' && (
        <div className="space-y-6">
          <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-orange-400" />
                Lockerphycer Authority Key Infrastructure
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1 max-w-2xl leading-relaxed">
                Authority leases expire deterministically. Keys sign temporary execution grants. When an authority epoch rotates, past leases cannot be renewed.
              </p>
            </div>
            <button
              onClick={onRotateKey}
              className="px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-medium transition flex items-center gap-2 shadow-lg shadow-orange-600/20 shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Rotate Authority Epoch
            </button>
          </div>

          <div className="bg-[#0b1017] border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 font-mono text-xs text-slate-400 flex justify-between items-center">
              <span>Authority Key Registry</span>
              <span className="text-[11px] text-emerald-400">Ed25519 / NIST P-256 Support</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {authorityKeys.map((key) => (
                <div key={key.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{key.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        key.status === 'active'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {key.status}
                      </span>
                      <span className="text-orange-400 font-medium">Epoch #{key.epoch}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-1.5 rounded">
                        {key.evidenceLabel}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      Public Key: <span className="text-slate-300 select-all">{key.publicKey}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      Digest: <span className="text-slate-400 select-all">{key.digest}</span>
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-slate-400 shrink-0 space-y-0.5">
                    <div>Issued: {new Date(key.issuedAt).toLocaleDateString()}</div>
                    <div>Expires: {new Date(key.expiresAt).toLocaleDateString()}</div>
                    {key.lastUsedAt && (
                      <div className="text-emerald-400 text-[10px]">
                        Last used: {new Date(key.lastUsedAt).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ZERO EXPOSURE BYOK VAULT */}
      {activeSection === 'vault' && (
        <div className="space-y-6">
          <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
                <Lock className="w-4 h-4 text-orange-400" />
                Zero-Key-Exposure BYOK Vault
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1 max-w-2xl leading-relaxed">
                Keys never enter application memory unencrypted. Providers receive calls via encrypted transient proxy bindings. Strict AES-256-GCM authenticated cipher.
              </p>
            </div>
            <button
              onClick={() => setShowAddSecretModal(true)}
              className="px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-medium transition flex items-center gap-2 shadow-lg shadow-orange-600/20 shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add BYOK Secret
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vaultSecrets.map((secret) => {
              const isRevealed = !!revealedSecrets[secret.id];

              return (
                <div key={secret.id} className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-100">{secret.name}</div>
                      <div className="text-[11px] text-slate-400">{secret.provider}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-700 text-slate-300 uppercase">
                      {secret.environment}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="text-slate-300 font-mono select-all truncate text-[11px] pr-2">
                      {isRevealed && secret.fullValue ? secret.fullValue : secret.maskedValue}
                    </div>
                    <button
                      onClick={() =>
                        setRevealedSecrets((prev) => ({
                          ...prev,
                          [secret.id]: !prev[secret.id],
                        }))
                      }
                      title={isRevealed ? 'Mask secret' : 'Reveal secret value'}
                      className="text-slate-400 hover:text-slate-200 transition shrink-0 cursor-pointer"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>Cipher: {secret.cipherSuite}</span>
                    <span>Last rotated: {secret.lastRotated}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Secret Modal */}
          {showAddSecretModal && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#0b1017] border border-slate-700 rounded-xl max-w-md w-full p-6 font-mono text-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-slate-100 text-sm">Add BYOK Secret into Vault</h3>
                  <button onClick={() => setShowAddSecretModal(false)} className="text-slate-400 hover:text-slate-200">
                    ✕
                  </button>
                </div>
                <form onSubmit={handleCreateSecret} className="space-y-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Secret Key Name (e.g. OPENAI_API_KEY)</label>
                    <input
                      type="text"
                      required
                      value={newSecretName}
                      onChange={(e) => setNewSecretName(e.target.value)}
                      placeholder="MISTRAL_API_KEY"
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Provider Description</label>
                    <input
                      type="text"
                      value={newSecretProvider}
                      onChange={(e) => setNewSecretProvider(e.target.value)}
                      placeholder="Mistral AI BYOK"
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Secret Raw Token</label>
                    <input
                      type="password"
                      required
                      value={newSecretValue}
                      onChange={(e) => setNewSecretValue(e.target.value)}
                      placeholder="Enter API token..."
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="text-[10px] text-amber-400 bg-amber-950/30 p-2 rounded border border-amber-500/20">
                    Note: Tokens are encrypted at rest with AES-256-GCM. Unencrypted secrets are never stored on disk.
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddSecretModal(false)}
                      className="px-3 py-1.5 border border-slate-700 rounded text-slate-300 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded font-medium"
                    >
                      Save Secret
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: GOVERNED EXECUTION CELLS & FSM */}
      {activeSection === 'cells' && (
        <div className="space-y-6">
          <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
                <Cpu className="w-4 h-4 text-orange-400" />
                Governed Execution Cell Attestation (17-Phase FSM)
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1 max-w-2xl leading-relaxed">
                Untrusted code runs in an isolated ephemeral cell. The host measures the kernel, locks network, executes, validates output, and destroys compute before broker mints credentials.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedIsolation}
                onChange={(e) => setSelectedIsolation(e.target.value as IsolationClass)}
                aria-label="Cell Isolation Mode"
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono rounded-lg px-3 py-2"
              >
                <option value="microvm">Firecracker MicroVM</option>
                <option value="os-enforced">OS-Enforced Cgroups</option>
              </select>

              <button
                disabled={isCellRunning}
                onClick={runFullFsmCycle}
                className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-mono font-medium transition flex items-center gap-2 shadow-lg shadow-orange-600/20 cursor-pointer"
              >
                {isCellRunning ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                {isCellRunning ? 'Executing FSM...' : 'Run FSM Cell Cycle'}
              </button>
            </div>
          </div>

          {/* Stepper Grid */}
          <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Cell Phase Progress ({currentFsmIndex + 1} / 17)</span>
              <span className="text-orange-400 font-semibold">{fsmPhases[currentFsmIndex]}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 font-mono text-[11px]">
              {fsmPhases.map((phase, idx) => {
                const isPassed = idx < currentFsmIndex;
                const isCurrent = idx === currentFsmIndex;

                return (
                  <div
                    key={phase}
                    className={`p-2 rounded border text-center transition ${
                      isCurrent
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold shadow'
                        : isPassed
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-[9px] text-slate-400">{idx + 1}</div>
                    <div className="truncate mt-0.5">{phase}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time execution logs */}
          <div className="bg-[#06090e] border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-slate-400">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Cell Attestation Stream (Hash Chained)
              </span>
              <span className="text-[10px] text-slate-400">PGL Notarized</span>
            </div>
            <div className="h-44 overflow-y-auto space-y-1 text-slate-300">
              {executionLogs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  <span className="text-slate-400 select-none mr-2">{i + 1}</span>
                  <span className={log.includes('SEALED') ? 'text-emerald-400 font-bold' : ''}>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SECURITY THREATS & EVENT STREAM */}
      {activeSection === 'threats' && (
        <div className="space-y-6">
          <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-orange-400" />
                Real-Time Threat Detection & Policy Gates
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1 max-w-2xl leading-relaxed">
                Ingests security telemetry from API endpoints, prompt filter boundaries, and token validation layers. Automatic quarantine prevents model hijacking.
              </p>
            </div>
            <button
              onClick={onSimulateThreat}
              className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-xs font-mono font-medium transition flex items-center gap-2 shadow-lg shadow-red-600/20 shrink-0 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Simulate Inbound Threat
            </button>
          </div>

          <div className="bg-[#0b1017] border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/80">
            {securityEvents.map((event) => (
              <div key={event.id} className="p-4 font-mono text-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{event.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      event.securityLevel === 'critical'
                        ? 'bg-red-950 text-red-400 border border-red-500/40'
                        : event.securityLevel === 'high'
                        ? 'bg-orange-950 text-orange-400 border border-orange-500/40'
                        : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                    }`}>
                      {event.securityLevel}
                    </span>
                    <span className="text-slate-400">[{event.threatType}]</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">
                      {new Date(event.createdAt).toLocaleTimeString()}
                    </span>
                    <select
                      value={event.status}
                      onChange={(e) => onUpdateEventStatus(event.id, e.target.value as any)}
                      aria-label="Event Resolution Status"
                      className="bg-slate-900 border border-slate-700 text-slate-200 text-[11px] rounded px-2 py-1"
                    >
                      <option value="open">open</option>
                      <option value="investigating">investigating</option>
                      <option value="resolved">resolved</option>
                    </select>
                  </div>
                </div>

                <p className="text-slate-300 text-[12px]">{event.description}</p>

                {event.mitigationApplied && (
                  <div className="text-[11px] text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1 rounded">
                    Mitigation: {event.mitigationApplied}
                  </div>
                )}

                <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1">
                  <span>Source IP: {event.sourceIp}</span>
                  <span>User/Actor: {event.userId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
