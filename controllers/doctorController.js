const AppointmentModel = require("../models/Appointment");
const DoctorModel = require("../models/Doctor");

// Create available appointment slot
const createSlot = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const slotExists = doctor.availableSlots.some(
      (slot) => slot.date === date && slot.time === time
    );
    if (slotExists) {
      return res
        .status(409)
        .json({ message: "Slot already exists", success: false });
    }

    doctor.availableSlots.push({ date, time });

    // Create appointment
    await AppointmentModel.create({
      doctorId,
      date,
      time,
      status: "available",
    });
    await doctor.save();

    res.status(201).json({
      message: "Slot added and appointment created",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Get all appointments doctor
const getAppointments = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const appointments = await AppointmentModel.find({ doctorId }).populate(
      "patientId",
      "name email phone gender age"
    );
    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Update status of an appointment (completed or cancelled)
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { doctorId, status } = req.body;

    console.log("Appointment ID:", appointmentId);
    console.log("Doctor ID:", doctorId);
    console.log("Status:", status);

    const appointment = await AppointmentModel.findOne({
      _id: appointmentId,
      doctorId: doctorId, // let Mongoose convert
    });

    console.log("Fetched Appointment:", appointment);

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found", success: false });
    }

    appointment.status = status.toLowerCase();
    await appointment.save();

    return res.status(200).json({
      message: "Appointment status updated successfully",
      success: true,
      appointment,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const appointmentId = req.params.id;

    const appointment = await AppointmentModel.findOneAndDelete({
      _id: appointmentId,
      doctorId: doctorId,
    });

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found or already deleted" });
    }

    res.status(200).json({ message: "Appointment deleted", success: true });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Get doctor's own profile
const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ success: true, doctor });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { phone, address } = req.body;

    const doctor = await DoctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
        success: false,
      });
    }

    if (phone) doctor.phone = phone;
    if (address) doctor.address = address;

    await doctor.save();
    console.log(doctor);
    
    res
      .status(200)
      .json({ message: "Profile updated", success: true, doctor});
      
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

module.exports = {
  createSlot,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getDoctorProfile,
  updateDoctorProfile,
};
