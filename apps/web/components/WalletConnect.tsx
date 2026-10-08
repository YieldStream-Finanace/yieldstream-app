'use client';

import React, { useState } from 'react';
import { requestAccess, getAddress } from '@stellar/freighter-api';

export default function WalletConnect() {
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleConnect = async () => {
    setLoading(true);
    setError('');
    try {
      const userObj = await getAddress();
      if (userObj && userObj.address) {
        setAddress(userObj.address);
      } else {
        const access = await requestAccess();
        if (access && access.address) {
          setAddress(access.address);
        } else {
          setError('Could not retrieve address.');
        }
      }
    } catch (err: any) {
      console.error('Wallet error:', err);
      setError('Freighter extension not responding or unauthenticated.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {address ? (
        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded text-emerald-400 font-mono text-sm">
          {address.slice(0, 6)}...{address.slice(-6)}
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={loading}
          type="button"
          className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-semibold px-4 py-2 rounded transition-colors"
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </div>
  );
}