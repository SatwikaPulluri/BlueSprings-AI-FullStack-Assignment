const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  role: { type: String, enum: ['user', 'assistant', 'system'] },
  content: String,
  provider: String,
  model: String,
  tokensUsed: { type: Number, default: 0 },
  metadata: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
