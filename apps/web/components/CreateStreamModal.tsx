'use client';

import { useState } from 'react';
import { Sparkles, X, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Address, nativeToScVal } from '@stellar/stellar-sdk';
import { invokeSorobanContract } from '@/lib/soroban';

interface CreateStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateStreamModal({ isOpen, onClose }: CreateStreamModalProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [alias, setAlias] = useState('');
  const [category, setCategory] = useState('payroll');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      toast.loading('Preparing Soroban contract transaction...');

      // FIXED: Use nativeToScVal for robust i128 serialization
      const args = [
        new Address(recipient).toScVal(),
        nativeToScVal(BigInt(amount), { type: 'i128' }),
      ];

      // Invoke the 'create_stream' method on the deployed vault contract
      const txHash = await invokeSorobanContract('create_stream', args);

      toast.dismiss();
      toast.success(`Stream deployed on Soroban Testnet! Tx: ${txHash.slice(0, 8)}...`);
      
      setIsSubmitting(false);
      onClose();
    } catch (error: any) {
      toast.dismiss();
      console.error('Soroban Stream Creation Error:', error);
      toast.error(error.message || 'Failed to deploy stream via Soroban contract.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Create Drip Stream <Sparkles size={18} className="text-indigo-400" />
          </h2>
          <button 
            onClick={onClose} 
            disabled={isSubmitting}
            className="text-slate-400 hover:text-white transition disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Stream Label / Purpose
            </label>
            <input
              type="text"
              placeholder="e.g. November Contributor Payroll"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-sans"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="payroll">Payroll</option>
                <option value="grant">Grant / Vesting</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Total XLM / USDC
              </label>
              <input
                type="number"
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Recipient Address (G...)
            </label>
            <input
              type="text"
              placeholder="GA..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Broadcasting to Soroban...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Deploy Stream on Soroban Testnet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}