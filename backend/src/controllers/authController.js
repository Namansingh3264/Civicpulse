const jwt = require('jsonwebtoken');
const { Joi, validate } = require('../middleware/validate');
const { JWT_SECRET, JWT_EXPIRES } = require('../config/env');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

function sign(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'manager', 'technician', 'analyst', 'moderator').optional(),
  department: Joi.string().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email(),
  phone: Joi.string(),
  password: Joi.string().required()
}).xor('email', 'phone');

const register = [
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    const token = sign(user);
    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
  })
];

const login = [
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, phone, password } = req.body;
    const query = email ? { email } : { phone };
    const user = await User.findOne(query).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = sign(user);
    res.json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
  })
];

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = { register, login, me };