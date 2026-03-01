import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  formTitle: String,
  userName: { type: String, required: true },
  discordId: { type: String, required: true },
  answers: [{
    question: String,
    answer: mongoose.Schema.Types.Mixed
  }],
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'review'], 
    default: 'pending' 
  }
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
