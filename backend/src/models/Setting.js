const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema(
  {
    slaHours: {
      critical: { type: Number, default: 2 },
      high: { type: Number, default: 24 },
      medium: { type: Number, default: 72 },
      low: { type: Number, default: 168 }
    },
    communications: {
      whatsapp: { type: Boolean, default: false },
      sms: { type: Boolean, default: false },
      email: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', SettingsSchema);