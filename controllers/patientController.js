const DoctorModel = require("../models/Doctor");
const AppointmentModel = require("../models/Appointment");
const PatientModel = require("../models/patients ");
// Get patient
const patient = async (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient fetched successfully",
      data: patient,
    });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const { patientId, appointmentId } = req.body;

    // Find the appointment by ID
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found", success: false });
    }

    if (appointment.status !== "available") {
      return res
        .status(400)
        .json({ message: "Appointment not available", success: false });
    }

    // Update appointment status and assign patient
    appointment.patientId = patientId;
    appointment.status = "booked";

    // Add to patient's appointment history
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ message: "Patient not found", success: false });
    }

    patient.appointments.push({
      appointmentId: appointment._id,
      status: appointment.status,
    });
    await patient.save();
    await appointment.save();

    res.status(200).json({
      message: "Appointment booked successfully",
      success: true,
      appointment,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error", success: false, error: err.message });
  }
};

// View own appointments
const getMyAppointments = async (req, res) => {
  try {
    const { patientId } = req.body;
    const appointments = await AppointmentModel.find({ patientId })
      .populate("doctorId", "name email specialization phone")
      .sort({ date: 1, time: 1 });

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { patientId } = req.body;

    // Find appointment by ID and patientId
    const appointment = await AppointmentModel.findOne({
      _id: appointmentId,
      patientId,
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
        success: false,
      });
    }

    // Only allow cancellation if booked
    if (appointment.status !== "booked") {
      return res.status(400).json({
        message: "Cannot cancel completed or already cancelled appointment",
        success: false,
      });
    }

    // Find the patient
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        success: false,
      });
    }

    // Add to patient's appointment history
    patient.appointments.push({
      appointmentId: appointment._id,
      status: "cancelled",
    });
    await patient.save();

    // Update appointment status to cancelled
    appointment.status = "cancelled";
    await appointment.save();

    return res.status(200).json({
      message: "Appointment cancelled successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Update
const updatePatients = async (req, res) => {
  try {
    const patientId = req.params.id;
    const updateData = req.body;

    const updatedPatient = await PatientModel.findByIdAndUpdate(
      patientId,
      updateData,
      { new: true } 
    );

    if (!updatedPatient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    res.json({ success: true, message: "Patient updated successfully",  updatedPatient });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  patient,
  updatePatients
};
