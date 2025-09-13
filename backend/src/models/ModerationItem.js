const mongoose = require('mongoose');

const ModerationItemSchema = new mongoose.Schema(
  {
    contentId: { type: String, required: true },
    type: { type: String, enum: ['post', 'comment', 'image'], default: 'post' },
    reason: { type: String, default: 'flagged' },
    status: { type: String, enum: ['flagged', 'review', 'approved', 'rejected'], default: 'flagged' },
    flaggedBy: { type: String },
    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('ModerationItem', ModerationItemSchema);