import React, { useState } from 'react';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  Plus,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { WalletTransaction } from '../../types/veklom';

interface WalletViewProps {
  reserveBalance: number;
  transactions: WalletTransaction[];
  onTopUp: (amount: number) => void;
  currentWorkspace: string;
}

export const WalletView: React.FC<WalletViewProps> = ({
  reserveBalance,
  transactions,
  onTopUp,
  currentWorkspace,
}) => {
  const [topUpAmount, setTopUpAmount] = useState('100');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(topUpAmount);
    if (isNaN(val) || val <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      onTopUp(val);
      setIsProcessing(false);
      setShowTopUpModal(false);
    }, 500);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Treasury Header */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-2">
            <Wallet className="w-3.5 h-3.5" />
            Operating Reserve & x402 Settlement
          </div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            Deterministic Capability Funding
          </h1>
          <p className="text-slate-400 mt-1 max-w-2xl leading-relaxed">
            No recurring subscription traps or token fiction. Fund an operating reserve in USDC or fiat; every governed execution, compilation, and evidence seal settles transparently.
          </p>
        </div>

        <button
          onClick={() => setShowTopUpModal(true)}
          className="px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium transition flex items-center gap-2 shadow-lg shadow-orange-600/20 shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Fund Reserve Balance
        </button>
      </div>

      {/* Balance & Wallet Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="text-[11px] text-slate-400 uppercase">Available Reserve Balance</div>
          <div className="text-3xl font-bold text-emerald-400">${reserveBalance.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            Workspace: {currentWorkspace}
          </div>
        </div>

        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="text-[11px] text-slate-400 uppercase">Settlement Mechanism</div>
          <div className="text-sm font-bold text-slate-100">x402 Micro-Settlement</div>
          <div className="text-[10px] text-slate-400">
            Cryptographic receipts signed on each execution cell cycle with zero chargeback drift.
          </div>
        </div>

        <div className="bg-[#0b1017] border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="text-[11px] text-slate-400 uppercase">SIWE Bound Address</div>
          <div className="text-xs font-bold text-slate-200 select-all truncate">
            0x71C94B32A9d82103E481F0824bA7c12A
          </div>
          <div className="text-[10px] text-cyan-400">ERC-6492 Smart Contract Treasury</div>
        </div>
      </div>

      {/* Transactions Ledger */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center text-slate-400 text-xs">
          <span>Operating Reserve Transaction Ledger</span>
          <span className="text-emerald-400 text-[11px]">100% x402 Notarized</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  tx.amount > 0
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}>
                  {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>

                <div className="min-w-0">
                  <div className="font-bold text-slate-200 truncate">{tx.description}</div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Hash: <span className="text-slate-400 select-all">{tx.digest}</span> · {new Date(tx.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className={`font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                </div>
                <div className="text-[10px] text-slate-400">Balance: ${tx.balanceAfter.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top up modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1017] border border-slate-700 rounded-xl max-w-sm w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-slate-100 text-sm">Top Up Operating Reserve</h3>
              <button onClick={() => setShowTopUpModal(false)} className="text-slate-400 hover:text-slate-200">
                ✕
              </button>
            </div>

            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs mb-1">Deposit Amount (USD)</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {['50', '100', '250'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-1.5 rounded border text-xs cursor-pointer ${
                        topUpAmount === amt
                          ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  step="1"
                  min="10"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div className="text-[10px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
                <div>Funding source: Treasury Wallet (SIWE / USDC)</div>
                <div className="text-emerald-400">Zero transaction fees on internal x402 settlement.</div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowTopUpModal(false)}
                  className="px-3 py-1.5 border border-slate-700 rounded text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded font-medium cursor-pointer"
                >
                  {isProcessing ? 'Confirming...' : 'Deposit Funds'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
