const asyncHandler = require('../middleware/asyncHandler');
const { Joi, validate } = require('../middleware/validate');
const Report = require('../models/Report');
const Department = require('../models/Department');
const Settings = require('../models/Settings');

async function getSLAHours(priority) {
  const s = await Settings.findOne();
  const defaults = { critical: 2, high: 24, medium: 72, low: 168 };
  const map = s?.slaHours || defaults;
  return map[priority] || defaults.medium;
}

const createSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  category: Joi.string().valid('Infrastructure', 'Utilities', 'Sanitation', 'Traffic', 'Other'),
  priority: Joi.string().valid('low', 'medium', 'high', 'critical').default('medium'),
  ward: Joi.number().integer().min(1).max(100).optional(),
  address: Joi.string().allow(''),
  department: Joi.string().optional(),
  location: Joi.object({
    type: Joi.string().valid('Point').default('Point'),
    coordinates: Joi.array().items(Joi.number()).length(2)
  }).optional(),
  citizenName: Joi.string().allow(''),
  citizenContact: Joi.string().allow('')
});

const updateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(''),
  category: Joi.string(),
  priority: Joi.string().valid('low', 'medium', 'high', 'critical'),
  ward: Joi.number(),
  address: Joi.string().allow(''),
  department: Joi.string().allow(null),
  location: Joi.object({
    type: Joi.string().valid('Point').default('Point'),
    coordinates: Joi.array().items(Joi.number()).length(2)
  }).optional()
});

const createReport = [
  validate(createSchema),
  asyncHandler(async (req, res) => {
    const body = req.body;
    if (body.department) {
      const exists = await Department.findById(body.department);
      if (!exists) return res.status(400).json({ success: false, message: 'Invalid department' });
    }
    const hours = await getSLAHours(body.priority);
    const slaDueAt = new Date(Date.now() + hours * 3600_000);
    const report = await Report.create({ ...body, slaDueAt, status: 'new' });
    res.status(201).json({ success: true, data: report });
  })
];

const listReports = asyncHandler(async (req, res) => {
  const { status, priority, q, ward, department, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (ward) filter.ward = Number(ward);
  if (department) filter.department = department;
  if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { code: new RegExp(q, 'i') }];

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Report.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate('department assignedTo'),
    Report.countDocuments(filter)
  ]);
  res.json({ success: true, data: items, total });
});

const getReport = asyncHandler(async (req, res) => {
  const r = await Report.findById(req.params.id).populate('department assignedTo');
  if (!r) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: r });
});

const updateReport = [
  validate(updateSchema),
  asyncHandler(async (req, res) => {
    const r = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!r) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: r });
  })
];

const assignSchema = Joi.object({
  department: Joi.string().optional(),
  assignedTo: Joi.string().optional()
}).or('department', 'assignedTo');

const assignReport = [
  validate(assignSchema),
  asyncHandler(async (req, res) => {
    const { department, assignedTo } = req.body;
    const update = {};
    if (department) update.department = department;
    if (assignedTo) update.assignedTo = assignedTo;
    update.status = 'in_progress';
    const r = await Report.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!r) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: r });
  })
];

const statusSchema = Joi.object({
  status: Joi.string().valid('new', 'in_progress', 'resolved', 'closed').required(),
  note: Joi.string().allow('')
});

const updateStatus = [
  validate(statusSchema),
  asyncHandler(async (req, res) => {
    const { status } = req.body;
    const update = { status };
    if 