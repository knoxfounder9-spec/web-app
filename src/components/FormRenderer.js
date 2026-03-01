"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FormRenderer({ form, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (questionText, value) => {
    setFormData(prev => ({ ...prev, [questionText]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formattedAnswers = Object.entries(formData).map(([q, a]) => ({
      question: q,
      answer: a
    }));

    await onSubmit(formattedAnswers);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {form.questions.map((q, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="flex flex-col gap-2"
        >
          <label className="text-gray-300 font-medium">{q.text}</label>
          
          {q.type === 'text' && (
            <input 
              required={q.required}
              type="text"
              onChange={(e) => handleChange(q.text, e.target.value)}
              className="bg-white/5 border border-white/10 p-3 rounded-lg focus:ring-2 ring-blue-500 outline-none text-white"
            />
          )}

          {q.type === 'paragraph' && (
            <textarea 
              required={q.required}
              rows={4}
              onChange={(e) => handleChange(q.text, e.target.value)}
              className="bg-white/5 border border-white/10 p-3 rounded-lg focus:ring-2 ring-blue-500 outline-none text-white"
            />
          )}

          {q.type === 'multiple-choice' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {q.options.map(opt => (
                <label key={opt} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition">
                  <input 
                    type="radio" 
                    name={q.text} 
                    value={opt} 
                    onChange={(e) => handleChange(q.text, e.target.value)}
                    className="accent-blue-500"
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          )}
        </motion.div>
      ))}

      <button 
        disabled={submitting}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
      >
        {submitting ? "Submitting Application..." : "Submit Application"}
      </button>
    </form>
  );
                }
                
