const jwt = require("jsonwebtoken");

const isDocLogin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid", success: false });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "doctor") {
      return res.status(403).json({ message: "Access denied: Not a doctor", success: false });
    }

    req.doctorId = decoded.id;  // doctorId will be used in controllers
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

module.exports = isDocLogin;


