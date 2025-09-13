const mongoose = require('mongoose');

const WorkOrderSchema = new mongoose.Schema(
  {
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // technician
    status: { type: String, enum: ['open', 'assigned', 'in_progress', 'completed', 'closed'], default: 'open' },
    notes: String,
    startedAt: Date,
    completedAt: Date,
    attachments: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkOrder', WorkOrderSchema);