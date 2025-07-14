const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  patient,
  updatePatients
} = require("../controllers/patientController");

// Book an appointment
router.get("/:id", patient);

// Book an appointment
router.post("/appointments/book", bookAppointment);

// View patient’s own appointments
router.post("/appointments", getMyAppointments);

// Cancel an appointment
router.delete("/appointments/:id", cancelAppointment);

router.put("/update/:id", updatePatients);

module.exports = router;
