"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function StatusPage() {
  const [discordId, setDiscordId] = useState('');
  const [results, setResults] = useState(null);

  const checkStatus = async () => {
    const res = await fetch(`/api/applications/status?id=${discordId}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <Sidebar />
      <div className="max-w-xl mx-auto pt-24 text-center">
        <h1 className="text-4xl font-black mb-8">Check Application Status</h1>
        <div className="flex gap-2">
          <input 
            className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none" 
            placeholder="Enter Discord ID"
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
          />
          <button onClick={checkStatus} className="bg-white text-black px-6 rounded-xl font-bold">Search</button>
        </div>

        <div className="mt-10 space-y-4">
          {results?.map(app => (
            <div key={app._id} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{app.formTitle}</p>
                <p className="text-lg font-bold">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase ${
                app.status === 'accepted' ? 'bg-green-500/20 text-green-400' : 
                app.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
