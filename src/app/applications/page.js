"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';

export default function ApplicationsPage() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({ userName: '', discordId: '' });
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch('/api/forms').then(res => res.json()).then(data => setForms(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/applications', {
      method: 'POST',
      body: JSON.stringify({
        formId: selectedForm._id,
        formTitle: selectedForm.title,
        ...formData,
        answers: selectedForm.questions.map(q => ({
          question: q.text,
          answer: answers[q.text]
        }))
      })
    });
    if (res.ok) alert("Application Submitted!");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8">
      <Sidebar />
      <div className="max-w-2xl mx-auto pt-20">
        {!selectedForm ? (
          <div className="grid gap-4">
            <h1 className="text-3xl font-bold mb-6">Available Positions</h1>
            {forms.map(form => (
              <button 
                key={form._id}
                onClick={() => setSelectedForm(form)}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition"
              >
                {form.title}
              </button>
            ))}
          </div>
        ) : (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold">{selectedForm.title}</h2>
            <input 
              placeholder="Your Name" 
              className="w-full p-3 bg-black/40 border border-white/10 rounded-lg"
              onChange={e => setFormData({...formData, userName: e.target.value})}
              required 
            />
            <input 
              placeholder="Discord ID (e.g. user#0000)" 
              className="w-full p-3 bg-black/40 border border-white/10 rounded-lg"
              onChange={e => setFormData({...formData, discordId: e.target.value})}
              required 
            />
            
            {selectedForm.questions.map((q, i) => (
              <div key={i} className="space-y-2">
                <label className="text-sm text-gray-400">{q.text}</label>
                {q.type === 'text' && (
                  <input className="w-full p-3 bg-black/40 border border-white/10 rounded-lg" onChange={e => setAnswers({...answers, [q.text]: e.target.value})} />
                )}
                {q.type === 'paragraph' && (
                  <textarea className="w-full p-3 bg-black/40 border border-white/10 rounded-lg" rows={4} onChange={e => setAnswers({...answers, [q.text]: e.target.value})} />
                )}
              </div>
            ))}
            <button type="submit" className="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition">Submit Application</button>
          </motion.form>
        )}
      </div>
    </main>
  );
                  }
          
