const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'high' },
    status: { type: String, enum: ['active', 'monitoring', 'resolved'], default: 'active' },
    startedAt: { type: Date, default: Date.now },
    endedAt: Date,
    responseTeams: { type: Number, default: 0 },
    zones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AlertZone' }]
  },
  { timestamps: true }
);
module.exports = mongoose.model('Emergency', EmergencySchema);