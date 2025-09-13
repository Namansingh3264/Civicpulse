const mongoose = require('mongoose');

const TechnicianSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    techCode: { type: String, unique: true, sparse: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    shift: { type: String, enum: ['morning', 'evening', 'night'], default: 'morning' },
    status: { type: String, enum: ['available', 'busy', 'off-duty'], default: 'available' },
    wards: [{ type: Number }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Technician', TechnicianSchema);