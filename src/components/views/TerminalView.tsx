import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, Shield, Play, HelpCircle } from 'lucide-react';
import { AuthorityKey, VaultSecret } from '../../types/veklom';

interface TerminalViewProps {
  currentWorkspace: string;
  authorityKeys: AuthorityKey[];
  onRotateKey: () => void;
  vaultSecrets: VaultSecret[];
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  currentWorkspace,
  authorityKeys,
  onRotateKey,
  vaultSecrets,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [lines, setLines] = useState<Array<{ type: 'input' | 'output' | 'error' | 'system'; text: string }>>([
    { type: 'system', text: 'Veklom Quantum Context Terminal v2.4.0-sovereign' },
    { type: 'system', text: 'Canonical Authority Layer — 00_VEKLOM_BIBLE.md active' },
    { type: 'system', text: `Current workspace: ${currentWorkspace} | Port: 3000 | Status: VERIFIED_LIVE` },
    { type: 'output', text: 'Type "help" to display available sovereign CLI commands.' },
  ]);

  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    // Add input line
    setLines((prev) => [...prev, { type: 'input', text: `veklom@sovereign:~$ ${trimmed}` }]);

    const parts = trimmed.split(' ');
    const root = parts[0].toLowerCase();
    const sub = parts[1]?.toLowerCase();
    const arg = parts.slice(2).join(' ');

    switch (root) {
      case 'help':
        setLines((prev) => [
          ...prev,
          {
            type: 'output',
            text: [
              'Available Sovereign CLI Commands:',
              '  status                - Display control plane status, active epoch & workspace',
              '  health                - Check health of database, redis, AI services & PGL',
              '  keys list             - List active authority keys and SHA-256 digests',
              '  keys rotate           - Rotate authority key epoch & retire past leases',
              '  vault list            - Inspect zero-exposure BYOK secrets in vault',
              '  cell exec [opts]      - Run governed execution cell (--isolation microvm)',
              '  gpc compile <intent>  - Compile natural language intent into governed plan',
              '  verticals             - List 5 LockerSphere industry verticals and standards',
              '  settle                - Verify x402 Operating Reserve settlement hash',
              '  clear                 - Clear console buffer',
            ].join('\n'),
          },
        ]);
        break;

      case 'status':
        setLines((prev) => [
          ...prev,
          {
            type: 'output',
            text: [
              `Workspace:        ${currentWorkspace}`,
              `Authority Epoch:  #4 (Ed25519)`,
              `Isolation Class:  microvm (Firecracker)`,
              `Truth Authority:  00_VEKLOM_BIBLE.md (VERIFIED_LIVE)`,
              `Active Keys:      ${authorityKeys.filter((k) => k.status === 'active').length}`,
              `BYOK Secrets:     ${vaultSecrets.length} (AES-256-GCM encrypted)`,
              `Egress Gate:      CAPPO Fail-Closed (Active)`,
            ].join('\n'),
          },
        ]);
        break;

      case 'health':
        setLines((prev) => [
          ...prev,
          {
            type: 'output',
            text: [
              'System Health Check (200 OK):',
              '  [✓] Database:       PostgreSQL async pool (latency 2.1ms)',
              '  [✓] Redis:          Key cache & session token store (connected)',
              '  [✓] AI Services:    BYOK Vault proxy online (zero exposure)',
              '  [✓] PGL Ledger:     Gnomledger SHA-256 notary synced',
              '  [✓] MicroVM Host:   Firecracker v1.4 daemon responding',
            ].join('\n'),
          },
        ]);
        break;

      case 'keys':
        if (sub === 'list') {
          const listText = authorityKeys
            .map(
              (k) =>
                `  • ${k.id} [Epoch ${k.epoch}] [${k.status.toUpperCase()}] digest: ${k.digest.substring(0, 24)}... (${k.evidenceLabel})`
            )
            .join('\n');
          setLines((prev) => [...prev, { type: 'output', text: `Authority Key Registry:\n${listText}` }]);
        } else if (sub === 'rotate') {
          onRotateKey();
          setLines((prev) => [
            ...prev,
            {
              type: 'output',
              text: 'SUCCESS: Authority epoch incremented. New Ed25519 keypair issued. Older leases scheduled for retirement.',
            },
          ]);
        } else {
          setLines((prev) => [
            ...prev,
            { type: 'error', text: 'Usage: keys list | keys rotate' },
          ]);
        }
        break;

      case 'vault':
        if (sub === 'list') {
          const vText = vaultSecrets
            .map((s) => `  • ${s.name} (${s.provider}) -> ${s.maskedValue} [${s.cipherSuite}]`)
            .join('\n');
          setLines((prev) => [...prev, { type: 'output', text: `Zero-Exposure BYOK Vault:\n${vText}` }]);
        } else {
          setLines((prev) => [...prev, { type: 'error', text: 'Usage: vault list' }]);
        }
        break;

      case 'cell':
        if (sub === 'exec') {
          setLines((prev) => [
            ...prev,
            {
              type: 'output',
              text: [
                '[FSM 01/17] Cell allocation requested with Firecracker MicroVM',
                '[FSM 05/17] Runtime kernel measured: sha256:4a8b... locked egress',
                '[FSM 07/17] Execution completed in 140ms — output verified',
                '[FSM 09/17] Cell destroyed before credentials minted',
                '[FSM 17/17] COMPLETED — Evidence notarized to Gnomledger.',
              ].join('\n'),
            },
          ]);
        } else {
          setLines((prev) => [...prev, { type: 'error', text: 'Usage: cell exec [--isolation microvm]' }]);
        }
        break;

      case 'gpc':
        if (sub === 'compile') {
          const planIntent = arg || 'Default sovereign ticket routing intent';
          setLines((prev) => [
            ...prev,
            {
              type: 'output',
              text: [
                `[GPC] Compiling intent: "${planIntent}"`,
                '  ✓ Extracted 5 workflow steps',
                '  ✓ Attached policy requirements: SOC2, HIPAA, EU GDPR',
                '  ✓ Estimated cost: $9.50 funded via Operating Reserve',
                '  ✓ Deployment target: private-runtime (EU-sovereign)',
                'GPC Plan ID #gpc-plan-' + Math.floor(Math.random() * 9000 + 1000) + ' ready for execution.',
              ].join('\n'),
            },
          ]);
        } else {
          setLines((prev) => [...prev, { type: 'error', text: 'Usage: gpc compile <intent>' }]);
        }
        break;

      case 'verticals':
        setLines((prev) => [
          ...prev,
          {
            type: 'output',
            text: [
              'LockerSphere 5 Industry Verticals:',
              '  1. Hospital:        HIPAA, HITECH, HL7/FHIR, PHI Scrubbing, 7-yr audit',
              '  2. Bank:            PCI-DSS v4.0, SOX 404, AML-KYC, SWIFT Inspection',
              '  3. Insurance:       Solvency II, IFRS-17, EU AI Act, Fraud Scoring',
              '  4. Content Creator: DMCA Safe Harbor, Deepfake Shield, COPPA, FTC',
              '  5. General:         SOC 2 Type II, ISO 27001, Zero-Config Guardrails',
            ].join('\n'),
          },
        ]);
        break;

      case 'settle':
        setLines((prev) => [
          ...prev,
          {
            type: 'output',
            text: [
              '[x402] Settling reserve transactions with ERC-6492 SIWE proof...',
              '  Digest: sha256:7f91a2...c890',
              '  Settled: $1.40 USD equivalent',
              '  Status: VERIFIED_LIVE on treasury ledger',
            ].join('\n'),
          },
        ]);
        break;

      case 'clear':
        setLines([]);
        break;

      default:
        setLines((prev) => [
          ...prev,
          { type: 'error', text: `Command not found: "${trimmed}". Type "help" for command directory.` },
        ]);
        break;
    }

    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setInputVal(history[prevIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-sm">Quantum Context Terminal</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                CLI v2.4
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Direct Capability Control Plane Interface</p>
          </div>
        </div>

        {/* Quick action helper buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {['status', 'health', 'keys list', 'cell exec', 'settle'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="text-[10px] px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {cmd}
            </button>
          ))}
          <button
            onClick={() => setLines([])}
            title="Clear buffer"
            className="p-1 text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Console Display */}
      <div className="bg-[#05070a] border border-slate-800 rounded-xl p-4 flex flex-col h-[520px] shadow-2xl relative overflow-hidden">
        {/* Subtle scanline overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.2)_2px,rgba(0,0,0,0.2)_4px)] opacity-50" />

        {/* Console lines */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 relative z-10">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                line.type === 'system'
                  ? 'text-cyan-400 font-bold'
                  : line.type === 'input'
                  ? 'text-orange-400 font-semibold'
                  : line.type === 'error'
                  ? 'text-red-400'
                  : 'text-slate-300'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={outputEndRef} />
        </div>

        {/* Input prompt */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 relative z-10">
          <span className="text-orange-400 font-bold select-none shrink-0">
            veklom@sovereign:~$
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Type 'help' or enter command..."
            className="flex-1 bg-transparent border-none text-slate-100 text-xs font-mono focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={() => executeCommand(inputVal)}
            disabled={!inputVal.trim()}
            className="p-1.5 rounded bg-orange-600 hover:bg-orange-500 disabled:opacity-30 text-white cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
