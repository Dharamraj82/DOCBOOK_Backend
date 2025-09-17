const PatientModel = require("../../models/patients ");
const DoctorModel = require ("../../models/Doctor")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Patient Login
const patientSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await PatientModel.findOne({ email });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, patient.password);
    if (!isPassword) {
      return res.status(403).json({
        message: "Invalid password",
        success: false,
      });
    }

    const jwttoken = jwt.sign(
      { email: patient.email, _id: patient._id },
      process.env.JWT_SECRET,
      { expiresIn: "7day" }
    );

    res.status(200).json({
      message: "Patient login successful",
      success: true,
      jwttoken,
      patient,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Doctor Login
const docSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await DoctorModel.findOne({ email });
    if (!doctor) {
      return res.status(403).json({
        message: "Doctor not found",
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, doctor.password);
    if (!isPassword) {
      return res.status(403).json({
        message: "Invalid password",
        success: false,
      });
    }

    const jwttoken = jwt.sign(
      { email: doctor.email, _id: doctor._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Doctor login successful",
      success: true,
      jwttoken,
      doctor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  patientSignIn,docSignIn
};
