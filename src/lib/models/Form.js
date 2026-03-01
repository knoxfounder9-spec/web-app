import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{
    text: { type: String, required: true },
    type: { type: String, enum: ['text', 'paragraph', 'multiple', 'checkbox'], required: true },
    options: [String], // Only used if type is multiple or checkbox
  }],
}, { timestamps: true });

export default mongoose.models.Form || mongoose.model('Form', FormSchema);
