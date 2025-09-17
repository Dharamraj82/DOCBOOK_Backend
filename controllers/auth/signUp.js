const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PatientModel = require("../../models/patients ");
const DoctorModel = require ("../../models/Doctor")

// Register Patient
const patientSignup = async (req, res) => {
  try {
    const { name, email, password, phone, gender } = req.body;

    const patient = await PatientModel.findOne({ email });
    if (patient) {
      return res.status(409).json({
        message: "Patient Already Registered",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new PatientModel({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
    });

    await newPatient.save();
    res.status(200).json({
      message: "Patient Registered Sucessfully Please Login",
      success: true,
    });
  } catch (err) {
    res.status(404).json({ message: "Internal Server Error", err });
  }
};



// Doctor Register 
const docSignUp = async (req, res) => {
  try {
    const { name, email, password, phone, gender, specialization, experience } = req.body;

    const doctor = await DoctorModel.findOne({ email });
    if (doctor) {
      return res.status(409).json({
        message: "Doctor Already Registered",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new DoctorModel({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      specialization,
      experience,
    });

    await newDoctor.save();

    res.status(201).json({
      message: "Doctor Registered Successfully. Please login.",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

module.exports = {
  patientSignup,
  docSignUp
};
