"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function StatusPage() {
  const [discordId, setDiscordId] = useState('');
  const [results, setResults] = useState(null);

  const checkStatus = async () => {
    const res = await fetch(`/api/applications/${discordId}/status`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-slate-950 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Track Your Application</h1>
        <div className="flex gap-2 mb-12">
          <input 
            className="flex-1 bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 ring-blue-500 outline-none"
            placeholder="Enter your Discord ID (e.g. 123456789...)"
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
          />
          <button onClick={checkStatus} className="bg-blue-600 px-6 rounded-xl hover:bg-blue-500">
            <Search size={24}/>
          </button>
        </div>

        {results && results.map(app => (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            key={app._id}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-4 text-left"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{app.formTitle}</h3>
                <p className="text-gray-400 text-sm">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase ${
                app.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                app.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {app.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
