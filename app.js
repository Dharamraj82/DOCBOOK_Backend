const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const AuthRouter = require("./routes/authRoutes")
require("./models/db");
const DoctorRouter = require("./routes/doctorRoutes")
const PatientRouter = require("./routes/patientRoutes")
const AppointmentsRouter = require("./routes/appointmentRoutes")


const port = 3000 || process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/auth", AuthRouter)

app.use("/doctor", DoctorRouter)
app.use("/patient", PatientRouter)
app.use("/appointments", AppointmentsRouter)




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
