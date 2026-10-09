'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { isConnected, requestAccess, signTransaction } from '@stellar/freighter-api';

export default function CreateStreamPage() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [durationDays, setDurationDays] = useState('30');
  const [loading, setLoading] = useState(false);

  const handleCreateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !amount) {
      toast.error('Please fill in all required stream fields.');
      return;
    }

    try {
      setLoading(true);
      toast.info('Checking Freighter connection...');

      const connected = await isConnected();
      if (!connected) {
        toast.error('Freighter wallet not found. Please install the extension.');
        setLoading(false);
        return;
      }

      await requestAccess();
      toast.success('Wallet access authorized!');

      // Simulate Soroban contract invocation transaction build & sign
      toast.loading('Building Soroban transaction...', { id: 'tx-process' });
      
      setTimeout(() => {
        toast.dismiss('tx-process');
        toast.success(`Successfully created stream of ${amount} XLM to ${recipient.slice(0, 4)}...${recipient.slice(-4)}!`);
        setRecipient('');
        setAmount('');
        setLoading(false);
      }, 2500);

    } catch (err) {
      toast.dismiss('tx-process');
      toast.error('Transaction failed or was rejected by user.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Create Yield Stream</h1>
        <p className="text-sm text-gray-400 mt-1">
          Lock capital into a continuous stream while routing unvested balances into Soroban yield vaults.
        </p>
      </div>

      <form onSubmit={handleCreateStream} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-xs uppercase text-gray-400 font-semibold tracking-wider mb-2">
            Recipient Stellar Address
          </label>
          <input
            type="text"
            placeholder="G..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs uppercase text-gray-400 font-semibold tracking-wider mb-2">
            Total Deposit Amount (XLM)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
          />
        </div>

        <div>
          <label className="block text-xs uppercase text-gray-400 font-semibold tracking-wider mb-2">
            Stream Duration: <span className="text-blue-400">{durationDays} Days</span>
          </label>
          <input
            type="range"
            min="1"
            max="365"
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            className="w-full accent-blue-600 bg-gray-800 rounded-lg h-2 cursor-pointer"
          />
        </div>

        <div className="pt-4 border-t border-gray-800 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg font-medium transition text-sm w-full md:w-auto"
          >
            {loading ? 'Processing Transaction...' : 'Initialize & Deploy Stream'}
          </button>
        </div>
      </form>
    </div>
  );
}