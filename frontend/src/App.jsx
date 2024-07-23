import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Patientpages from "./Components/Patient.jsx/Patientpages";
import Doctorpages from "./Components/Doctor/Doctorpages";

import Home from "./Components/Homepage/Home";
import PatientProfile from "./Components/Patient.jsx/PatientProfile";
import DoctorProfile from "./Components/UserProfile/DoctorProfile";
import ProfilePatient from "./Components/UserProfile/ProfilePatient";
import DoctorBookingRecords from "./Components/Doctor/DoctorBookingRecords";
import PredictDoc from "./Components/PredictDoc/PredictDoc";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
    <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    <BrowserRouter>
      <Routes>
        <Route exact path="" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/doctor" element={<Doctorpages />} />
        <Route
          exact
          path="/doctor-booking-history"
          element={<DoctorBookingRecords />}
        />
        <Route exact path="/patient" element={<Patientpages />} />
        <Route exact path="/patient-profile" element={<PatientProfile />} />
        <Route exact path="/doctor-user-prof" element={<DoctorProfile />} />
        <Route exact path="/patient-user-prof" element={<ProfilePatient />} />
        <Route exact path="/predict-doctor" element={<PredictDoc />} />

        <Route
          exact
          path="*"
          element={
            <div
              style={{
                fontSize: "50px",
                textAlign: "center",
                marginTop: "40vh",
              }}
            >
              Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
