const bcrypt = require("bcrypt");
const PatientModel = require("../../models/patients ");
const DoctorModel = require("../../models/Doctor")

const forgotPassword = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Choose model based on role
    const UserModel =
      role === "patient"
        ? PatientModel
        : role === "doctor"
          ? DoctorModel
          : null;

    if (!UserModel) {
      return res.status(400).json({
        message: "Invalid role. Must be 'patient' or 'doctor'",
        success: false,
      });
    }

    // Find patient
    const user = await Model.findOne({ name, email });

    if (!user) {
      return res.status(404).json({
        message: "user not found with provided details",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password reset successful. Please login with new password.",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = { forgotPassword };
