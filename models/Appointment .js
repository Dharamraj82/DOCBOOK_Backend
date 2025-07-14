const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    default: null,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked", "completed", "cancelled"],
    default: "available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//  Prevent same doctor slot duplication
appointmentSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);
module.exports = AppointmentModel;
