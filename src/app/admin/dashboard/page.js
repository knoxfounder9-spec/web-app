"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Eye, Search, Filter } from 'lucide-react';

export default function AdminDashboard() {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const res = await fetch('/api/applications');
    const data = await res.json();
    setApps(data);
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchApps(); // Refresh list
  };

  const filteredApps = apps.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.discordId.includes(search) || app.userName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Manage Applications</h1>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Discord ID..." 
              className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-2 rounded-lg text-white outline-none focus:ring-2 ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-white outline-none"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="review">In Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 uppercase text-xs tracking-wider">
              <th className="p-4">Applicant</th>
              <th className="p-4">Form</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            <AnimatePresence mode='popLayout'>
              {filteredApps.map((app) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={app._id} 
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4">
                    <div className="font-medium">{app.userName}</div>
                    <div className="text-xs text-gray-500">{app.discordId}</div>
                  </td>
                  <td className="p-4 text-sm">{app.formTitle}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      app.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                      app.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => updateStatus(app._id, 'accepted')} className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg transition"><CheckCircle size={18}/></button>
                    <button onClick={() => updateStatus(app._id, 'review')} className="p-2 hover:bg-yellow-500/20 text-yellow-400 rounded-lg transition"><Clock size={18}/></button>
                    <button onClick={() => updateStatus(app._id, 'rejected')} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition"><XCircle size={18}/></button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
                }
              
