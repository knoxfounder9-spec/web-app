import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{
    text: String,
    type: { type: String, enum: ['text', 'paragraph', 'multiple-choice', 'checkbox'] },
    options: [String], // Only for choice types
    required: { type: Boolean, default: true }
  }],
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Form || mongoose.model('Form', FormSchema);
