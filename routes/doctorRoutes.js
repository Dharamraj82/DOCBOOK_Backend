const express = require("express");
const router = express.Router();
const {createSlot, getAppointments, updateAppointmentStatus, deleteAppointment, getDoctorProfile, updateDoctorProfile} = require("../controllers/doctorController");

// Create available appointment slot
router.post("/appointments/create", createSlot);

// View own appointments
router.post("/appointments", getAppointments);

// Update appointment status (completed/cancelled)
router.put("/appointments/update/:id", updateAppointmentStatus);

//  Deletel appointment
router.delete("/appointments/delete/:id", deleteAppointment);

// // View profile and update profile
router.get("/profile/:id", getDoctorProfile);

router.put("/profile/update/:id", updateDoctorProfile);

module.exports = router;
