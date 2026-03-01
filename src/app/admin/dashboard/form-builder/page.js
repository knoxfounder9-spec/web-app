"use client";
import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Plus, Trash, Save, Type, List, CheckSquare, AlignLeft } from 'lucide-react';

export default function FormBuilder() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      type: type,
      options: type === 'multiple-choice' || type === 'checkbox' ? ['Option 1'] : []
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSave = async () => {
    const res = await fetch('/api/forms', {
      method: 'POST',
      body: JSON.stringify({ title, questions }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) alert('Form Saved Successfully!');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
        <input 
          type="text" 
          placeholder="Form Title (e.g. Jujutsu High Recruitment)" 
          className="w-full bg-transparent text-3xl font-bold border-b border-white/20 pb-2 mb-8 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button onClick={() => addQuestion('text')} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition"><Type size={18}/> Text</button>
          <button onClick={() => addQuestion('paragraph')} className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition"><AlignLeft size={18}/> Paragraph</button>
          <button onClick={() => addQuestion('multiple-choice')} className="flex items-center gap-2 bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-500 transition"><List size={18}/> Multiple Choice</button>
        </div>

        <Reorder.Group axis="y" values={questions} onReorder={setQuestions} className="space-y-4">
          {questions.map((q, idx) => (
            <Reorder.Item key={q.id} value={q} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Question {idx + 1} ({q.type})</span>
                <button onClick={() => setQuestions(questions.filter(item => item.id !== q.id))}><Trash size={16} className="text-red-400"/></button>
              </div>
              <input 
                className="w-full bg-white/5 p-2 rounded mb-2" 
                placeholder="Enter Question Text"
                value={q.text}
                onChange={(e) => {
                  const newQs = [...questions];
                  newQs[idx].text = e.target.value;
                  setQuestions(newQs);
                }}
              />
              {/* Option logic for multiple choice here */}
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <button 
          onClick={handleSave}
          className="mt-8 w-full bg-green-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-500 transition"
        >
          <Save size={20}/> Save Application Form
        </button>
      </motion.div>
    </div>
  );
            }
            
