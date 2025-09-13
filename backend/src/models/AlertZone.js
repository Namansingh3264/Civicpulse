const mongoose = require('mongoose');

const PolygonSchema = new mongoose.Schema({
  type: { type: String, enum: ['Polygon'], default: 'Polygon' },
  coordinates: { type: [[[Number]]], required: true } // GeoJSON polygon
}, { _id: false });

const AlertZoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    polygon: PolygonSchema,
    status: { type: String, enum: ['monitoring', 'active'], default: 'monitoring' }
  },
  { timestamps: true }
);

AlertZoneSchema.index({ polygon: '2dsphere' });

module.exports = mongoose.model('AlertZone', AlertZoneSchema);