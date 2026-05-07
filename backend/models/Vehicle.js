import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, default: 'Truck' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    currentLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    speed: { type: Number, default: 0 },
    heading: { type: Number, default: 0 },
    lastUpdate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
