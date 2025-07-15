
# 🩺 DOCBOOK – Doctor Appointment Web App

**DOCBOOK** is a simple and easy-to-use web application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). It allows doctors to manage their availability and patients to book appointments online.

🎥 **Demo Video**: [Watch on Loom](https://www.loom.com/share/82ed6c376f084c19a38d0e09e71bc2aa?sid=99b8090a-cf23-480d-84a0-1cfa4ec968a4)

🌐 **Live Website**: [docbook-frontend-taupe.vercel.app](https://docbook-frontend-taupe.vercel.app/)

📦 **GitHub Repositories**:
- [Frontend Code](https://github.com/Dharamraj82/DOCBOOK_Frontend)
- [Backend Code](https://github.com/Dharamraj82/DOCBOOK_Backend)

---

## ✨ Key Features

### 👨‍⚕️ Doctor Functionality:
- Register and login securely
- Set availability slots for appointments
- View all booked appointments
- Cancel or mark appointments as completed 
- Create new slots

### 👨‍💻 Patient Functionality:
- Register and login securely
- Browse list of available doctors
- Book appointments based on available slots
- Cancel booked appointments 
- Filter doctors by type or available dates (coming soon)

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** – UI development
- **Tailwind CSS** – Styling
- **React Router** – Page navigation
- **Axios** – API communication
- **React Toastify** – Notifications

### Backend:
- **Node.js + Express.js** – API and server
- **MongoDB + Mongoose** – Database
- **JWT** – Authentication
- **Bcrypt** – Password hashing
- **CORS, Dotenv, Joi** – API support, environment variables, validation

---

## 🗃️ Folder Structure

**Frontend:**
- `/src/components` – Reusable UI components
- `/src/pages` – Main screens (Login, Register, Home, Dashboard)
- `/src/context` – Auth and global state

**Backend:**
- `/routes` – API endpoints (auth, doctors, appointments)
- `/models` – MongoDB models
- `/controllers` – Logic for handling requests
- `/middleware` – Auth, validation

---

## 🚀 Setup Instructions

### 1. Clone the Repos
```bash
git clone https://github.com/Dharamraj82/DOCBOOK_Backend
git clone https://github.com/Dharamraj82/DOCBOOK_Frontend
```

### 2. Backend Setup
```bash
cd DOCBOOK_Backend
npm install
# Create .env file with Mongo URI and JWT_SECRET
node app.js
```

### 3. Frontend Setup
```bash
cd DOCBOOK_Frontend
npm install
npm run dev
```

---

## 🧪 Upcoming Features
- [ ] Filter doctors by specialization (e.g., dentist, cardiologist)
- [ ] Filter by available date
- [ ] Email/SMS reminders (future plan)
