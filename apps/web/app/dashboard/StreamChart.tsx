'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', streamed: 0, yield: 0 },
  { time: '04:00', streamed: 120, yield: 2.1 },
  { time: '08:00', streamed: 250, yield: 5.4 },
  { time: '12:00', streamed: 410, yield: 8.9 },
  { time: '16:00', streamed: 630, yield: 11.2 },
  { time: '20:00', streamed: 850, yield: 13.6 },
  { time: '24:00', streamed: 1000, yield: 14.8 },
];

export default function StreamChart() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
      <div>
        <h3 className="font-semibold text-white">Stream Vesting & Yield Curve</h3>
        <p className="text-xs text-gray-400">Historical token release rate coupled with automated vault interest accumulation.</p>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="streamColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="yieldColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#4b5563" fontSize={12} />
            <YAxis stroke="#4b5563" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem', color: '#f3f4f6' }} 
            />
            <Area type="monotone" dataKey="streamed" stroke="#3b82f6" fillOpacity={1} fill="url(#streamColor)" name="Streamed (XLM)" />
            <Area type="monotone" dataKey="yield" stroke="#10b981" fillOpacity={1} fill="url(#yieldColor)" name="Yield Accrued (XLM)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}