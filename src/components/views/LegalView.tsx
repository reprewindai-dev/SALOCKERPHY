import React, { useState } from 'react';
import { FileText, Shield, CheckCircle, Scale } from 'lucide-react';

export const LegalView: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<'license' | 'vendor'>('license');

  return (
    <div className="space-y-6 font-mono text-xs max-w-4xl">
      {/* Header */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs mb-2">
            <Scale className="w-3.5 h-3.5 text-orange-400" />
            Veklom Legal & Compliance Contracts
          </div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            Software License & Vendor Services Agreements
          </h1>
          <p className="text-slate-400 mt-1 leading-relaxed">
            Legal contracts governing capability execution, data custody, zero key liability, and vendor agreements.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setActiveDoc('license')}
            className={`px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              activeDoc === 'license'
                ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            License Agreement
          </button>
          <button
            onClick={() => setActiveDoc('vendor')}
            className={`px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              activeDoc === 'vendor'
                ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Vendor Agreement
          </button>
        </div>
      </div>

      {/* Document Body */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-6 space-y-5 text-slate-300 leading-relaxed font-mono">
        {activeDoc === 'license' ? (
          <>
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-100">VEKLOM SOFTWARE LICENSE AGREEMENT</h2>
              <div className="text-[11px] text-slate-400 mt-1">Effective Date: October 2026 | Version 2.4-Sovereign</div>
            </div>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-200 uppercase text-xs">1. Grant of Sovereign Capability License</h3>
              <p>
                Subject to the terms and conditions of this Agreement, Veklom grants Licensee a non-exclusive, non-transferable, revocable license to deploy, operate, and invoke the Veklom Sovereign AI Hub, Lockerphycer Security Domain, and Governed Plan Compiler (GPC) within designated private tenant boundaries.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-200 uppercase text-xs">2. Zero Key Exposure & Security Boundary</h3>
              <p>
                Veklom's Lockerphycer domain utilizes isolated execution cells (Firecracker MicroVM or OS-enforced) to execute governed tasks. Customer private API keys and secrets stored in the BYOK Vault are decrypted strictly inside transient cell perimeters and are never logged, persisted in plaintext, or transmitted outside authorized target proxies.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-200 uppercase text-xs">3. Evidence & Gnomledger Provenance</h3>
              <p>
                Every capability transition emits a cryptographic hash chain notarized into Gnomledger. Licensee maintains complete ownership of all generated evidence receipts, attestation records, and compliance artifacts.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-200 uppercase text-xs">4. No Warranty on Third-Party Model Outputs</h3>
              <p>
                In accordance with 00_VEKLOM_BIBLE.md, Veklom acts as the capability authority and runtime guardrail layer. While Lockerphycer intercepts prompt injections and sanitizes PHI/PII according to selected vertical policies, underlying foundation models (OpenAI, Anthropic, Gemini, Mistral) are provided AS-IS by respective providers.
              </p>
            </section>
          </>
        ) : (
          <>
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-100">VEKLOM VENDOR SERVICES AGREEMENT</h2>
              <div className="text-[11px] text-slate-400 mt-1">Marketplace Terms & Developer Remittance | Version 1.8</div>
            </div>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-200 uppercase text-xs">1. Marketplace Tool Publishing</h3>
              <p>
                Vendors publishing capability packs, policy rules, or redactor tools on the Veklom Marketplace agree to undergo automated security screening by CAPPO and RepoGate before listing publication.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-200 uppercase text-xs">2. Operating Reserve Settlement</h3>
              <p>
                Usage of fee-based marketplace tools is compensated directly through workspace Operating Reserve deductions settled via x402 protocol proofs. Vendor payouts are settled weekly to verified ERC-6492 SIWE wallets.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-200 uppercase text-xs">3. Auditability & Compliance Certification</h3>
              <p>
                Vendor tools may not bypass local sandbox isolation or attempt direct network exfiltration. Violations result in immediate key revocation, marketplace de-listing, and forfeiture of accrued reserve balances.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
