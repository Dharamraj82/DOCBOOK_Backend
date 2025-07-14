const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "patient",
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone: String,
  age:String,
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  appointments: [
    {
      appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
      },
      status: {
        type: String,
        enum: ["booked", "completed", "cancelled"],
        default: "booked",
      },
    },
  ],
});

const PatientModel = mongoose.model("Patient", patientSchema);
module.exports = PatientModel;
