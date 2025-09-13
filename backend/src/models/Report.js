const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  type: { type: String, enum: ['Point'], default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' } // [lng, lat]
}, { _id: false });

const ReportSchema = new mongoose.Schema(
  {
    code: { type: String, index: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, enum: ['Infrastructure', 'Utilities', 'Sanitation', 'Traffic', 'Other'], default: 'Other' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium', index: true },
    status: { type: String, enum: ['new', 'in_progress', 'resolved', 'closed'], default: 'new', index: true },
    ward: Number,
    address: String,
    location: locationSchema,
    citizenName: String,
    citizenContact: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // technician or staff
    slaDueAt: Date,
    resolvedAt: Date,
    attachments: [String],
    meta: Object
  },
  { timestamps: true }
);

ReportSchema.pre('save', function (next) {
  if (!this.code) {
    const y = new Date().getFullYear();
    this.code = `R-${y}-${Math.random().toString().slice(2, 6)}`;
  }
  next();
});

module.exports = mongoose.model('Report', ReportSchema);