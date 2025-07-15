const express = require("express");
const router = express.Router();
const AppointmentModel = require("../models/Appointment");

// GET only available appointments
router.get("/", async (req, res) => {
  try {
    const availableAppointments = await AppointmentModel.find({ status: "available" })
      .populate("doctorId", "name email specialization address imageUrl experience gender")
      .populate("patientId", "name email phone");

    res.status(200).json({
      message: "Available appointments fetched successfully",
      success: true,
      appointments: availableAppointments,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch appointments",
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
