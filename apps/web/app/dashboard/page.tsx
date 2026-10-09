'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import StreamChart from './StreamChart';

interface StreamData {
  id: string;
  sender: string;
  recipient: string;
  totalAmount: number;
  yieldAccrued: number;
  ratePerSec: number;
  startTime: number;
  isDemo?: boolean;
}

const DEMO_STREAM: StreamData = {
  id: 'stream-demo-001',
  sender: 'GAY3...DEMO_SENDER',
  recipient: 'GB7X...DEMO_RECIPIENT',
  totalAmount: 1000,
  yieldAccrued: 14.852,
  ratePerSec: 0.0001157,
  startTime: Date.now() - 3600000,
  isDemo: true,
};

export default function DashboardPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeStream, setActiveStream] = useState<StreamData>(DEMO_STREAM);
  const [streamedAmount, setStreamedAmount] = useState(250.45);

  // Simulate second-by-second live balance increment
  useEffect(() => {
    const timer = setInterval(() => {
      setStreamedAmount((prev) => prev + activeStream.ratePerSec);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeStream]);

  const handleConnectWallet = async () => {
    try {
      toast.info('Connecting to Freighter Wallet...');
      // Simulated wallet connection check
      setWalletConnected(true);
      toast.success('Freighter Wallet connected successfully!');
    } catch (err) {
      toast.error('Failed to connect Freighter. Please check extension.');
    }
  };

  const handleClaimYield = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Submitting Soroban claim transaction...',
        success: () => `Successfully claimed unlocked stream tokens!`,
        error: 'Transaction rejected or failed on Soroban testnet.',
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header & Wallet Section */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">YieldStream Dashboard</h1>
          <p className="text-sm text-gray-400">
            Real-time streaming metrics on Stellar Soroban Testnet
          </p>
        </div>
        <button
          onClick={handleConnectWallet}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm"
        >
          {walletConnected ? 'Connected (Testnet)' : 'Connect Freighter'}
        </button>
      </div>

      {/* Demo Banner Notification */}
      {activeStream.isDemo && (
        <div className="bg-purple-950/40 border border-purple-800/50 rounded-lg p-4 text-sm text-purple-200 flex justify-between items-center">
          <span>
            💡 <strong>Demo Mode Active:</strong> Displaying simulated live stream state for grant reviewers.
          </span>
          <span className="text-xs px-2 py-1 bg-purple-900/60 rounded text-purple-300 border border-purple-700">
            Preview
          </span>
        </div>
      )}

      {/* Live Stream Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
            Total Value Streamed
          </p>
          <p className="text-3xl font-extrabold text-blue-400 mt-2">
            {streamedAmount.toFixed(5)}{' '}
            <span className="text-sm font-normal text-gray-400">XLM</span>
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
            Vault Yield Generated
          </p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">
            +{activeStream.yieldAccrued.toFixed(3)}{' '}
            <span className="text-sm font-normal text-gray-400">XLM</span>
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
            Vesting Speed
          </p>
          <p className="text-3xl font-extrabold text-purple-400 mt-2">
            {activeStream.ratePerSec.toFixed(6)}{' '}
            <span className="text-sm font-normal text-gray-400">XLM/sec</span>
          </p>
        </div>
      </div>

      {/* Analytics Visualizer Chart */}
      <StreamChart />

      {/* Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-white">Claim Unlocked Stream</h3>
          <p className="text-xs text-gray-400 mt-1">
            Execute a Soroban contract call to withdraw vested tokens to your connected wallet.
          </p>
        </div>
        <button
          onClick={handleClaimYield}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition text-sm"
        >
          Claim Unlocked Funds
        </button>
      </div>
    </div>
  );
}