const mongoose = require('mongoose');

const MessageTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    channel: { type: String, enum: ['whatsapp', 'sms', 'email'], default: 'email' },
    subject: String,
    body: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MessageTemplate', MessageTemplateSchema);