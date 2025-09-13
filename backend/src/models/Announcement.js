const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema(
  {
    title: String,
    message: { type: String, required: true },
    channels: [{ type: String, enum: ['whatsapp', 'sms', 'email'] }],
    audience: { type: String, enum: ['all', 'ward', 'department'], default: 'all' },
    ward: Number,
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', AnnouncementSchema);