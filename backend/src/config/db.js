const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

module.exports = async function connectDB() {
  if (!MONGODB_URI) throw new Error('MONGODB_URI missing');
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGODB_URI);
  console.log('Mongo connected');
};