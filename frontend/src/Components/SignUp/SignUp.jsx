import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
// import img from "../../assets/img-back.jpg";
import img from '../../assets/doctor_login.png'
import axios from "axios";
import { toast } from "react-hot-toast";
import NavBar from "../Navbar/NavBar";

export default function SignUp() {
  const [type, setType] = useState("doctor");
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    age: 0,
    sex: "",
  });

  const [doctor, setDoctor] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    regno: "",
    qualification: "",
    specialisation: "",
    experience: 0,
    fees: 0,
    timeslot_start: 6,
    timeslot_end: 7,
    location: "",
  });

  const handlechangePatient = (e) => {
    setPatient((pat) => {
      if (e.target.name !== "age")
        return { ...pat, [e.target.name]: e.target.value };
      else return { ...pat, [e.target.name]: parseInt(e.target.value) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {};
      if (type === "patient") {
        // if(patient.password.length<8){
        //     alert('Password must of at least 8 character')
        //     return
        // }
        data = {
          ...patient,
          type,
        };
        console.log("Patient data ", data);
      } else {
        // if(doctor.password.length<8){
        //     alert('Password must of at least 8 character')
        //     return
        // }
        // if(doctor.timeslot_start>=doctor.timeslot_end){
        //     alert('Sarting time must be before ending time')
        //     return
        // }

        data = {
          ...doctor,
          type,
        };
      }
      console.log("Data before axios ", data);
      const res = await axios.post(`http://localhost:3000/register`, data);

      console.log("Response", res.data);
      if (res.data.status) {
        console.log("successfully Registerred");
        toast.success("Registerred successfully");
        navigate("/login");
      } else {
        console.log("Problem in register");
        toast.error(res.data.message);
      }
    } catch (error) { }
  };

  const handlechangeDoctor = (e) => {
    setDoctor((doc) => {
      if (
        e.target.name !== "age" &&
        e.target.name !== "experience" &&
        e.target.name !== "fees"
      )
        return { ...doc, [e.target.name]: e.target.value };
      else return { ...doc, [e.target.name]: parseInt(e.target.value) };
    });
  };

  console.log(patient);
  const handletype = (e) => {
    setType(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <NavBar />
      <div className="container-main  d-flex ailgn-content-center ">
        <div className="main-box  m-auto row">
          <div className="col-6 p-0 ">
            <img src={img} alt="" className="signup-img" />
          </div>
          {type === "doctor" && (
            <div className="col-6 form-inp overflow-auto">
              <h1 className="text-center mt-3">Register</h1>
              <form className="my-5 ps-2" onSubmit={handleSubmit}>
                <div className="d-flex  input-div type-sel align-items-center justify-content-center fs-5">
                  Select the type of User
                  <select
                    id="dropdown  "
                    name="dropdown"
                    value={type}
                    onChange={handletype}
                    className="mx-2 p-1 rounded"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                </div>
                <hr />
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Email</p>
                  <input
                    type="email"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your email"
                    name="email"
                    onChange={handlechangeDoctor}
                    value={doctor.email}
                  />
                </div>
                <hr />
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Username</p>
                  <input
                    type="text"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your username"
                    name="username"
                    onChange={handlechangeDoctor}
                    value={doctor.username}
                  />
                </div>
                <hr />
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Name</p>

                  <input
                    type="text"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your name"
                    name="name"
                    onChange={handlechangeDoctor}
                    value={doctor.name}
                  />
                </div>
                <hr />

                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your password</p>

                  <input
                    type="password"
                    visible
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your password"
                    name="password"
                    onChange={handlechangeDoctor}
                    value={doctor.password}
                  />
                </div>
                <hr />
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Fees</p>

                  <input
                    type="number"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your fees"
                    min={0}
                    name="fees"
                    onChange={handlechangeDoctor}
                    value={doctor.fees}
                  />
                </div>
                <hr />
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Registration Number</p>

                  <input
                    type="text"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your Registration number"
                    name="regno"
                    onChange={handlechangeDoctor}
                    value={doctor.regno}
                  />
                </div>
                <hr />
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Qualification</p>

                  <input
                    type="text"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your qualification"
                    name="qualification"
                    onChange={handlechangeDoctor}
                    value={doctor.qualification}
                  />
                </div>
                <hr />

                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Specialisation</p>

                  <input
                    type="text"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your specialisation"
                    name="specialisation"
                    onChange={handlechangeDoctor}
                    value={doctor.specialisation}
                  />
                </div>
                <hr />

                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Experience</p>

                  <input
                    type="number"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your experience"
                    min={0}
                    name="experience"
                    onChange={handlechangeDoctor}
                    value={doctor.experience}
                  />
                </div>
                <hr />

                <div className=" input-div my-3 fs-5">
                  <p className="d-block">
                    Enter your Sarting of timeslot (24hrs format)
                  </p>

                  <input
                    type="number"
                    className="p-1 b-0 rounded"
                    required
                    placeholder=""
                    min={6}
                    max={21}
                    name="timeslot_start"
                    onChange={handlechangeDoctor}
                    value={doctor.timeslot_start}
                  />
                </div>
                <hr />

                <div className=" input-div my-3 fs-5">
                  <p className="d-block">
                    Enter your Ending of Timeslot(24 hrs format)
                  </p>

                  <input
                    type="number"
                    className="p-1 b-0 rounded"
                    required
                    placeholder=""
                    min={7}
                    max={23}
                    name="timeslot_end"
                    onChange={handlechangeDoctor}
                    value={doctor.timeslot_end}
                  />
                </div>

                <hr />
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">
                    Enter your Location
                  </p>

                  <input
                    type="text"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your location"
                    name="location"
                    onChange={handlechangeDoctor}
                    value={doctor.location}
                  />
                </div>
                <hr />

                <div className="submit-button mt-5 d-flex justify-content-center">
                  <button className="btn btn-success">Register</button>
                </div>
                <div className="link-to-signup mt-2 text-center">
                  Already have an account?
                  <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          )}

          {type === "patient" && (
            <div className="col-6 form-inp overflow-auto ">
              <h1 className="text-center mt-3 ">Register</h1>
              <form className="my-5 ps-2" onSubmit={handleSubmit}>
                <div className="d-flex  input-div type-sel align-items-center justify-content-center fs-5">
                  Select the type of User
                  <select
                    id="dropdown  "
                    name="dropdown"
                    value={type}
                    onChange={handletype}
                    className="mx-2"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                </div>
                <hr />
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Email</p>
                  <input
                    type="email"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your email"
                    name="email"
                    onChange={handlechangePatient}
                    value={patient.email}
                  />
                  <hr />
                </div>
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Username</p>
                  <input
                    type="text"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your username"
                    name="username"
                    onChange={handlechangePatient}
                    value={patient.username}
                  />
                  <hr />
                </div>
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your Name</p>

                  <input
                    type="text"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your name"
                    name="name"
                    onChange={handlechangePatient}
                    value={patient.name}
                  />
                </div>
                <hr />

                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your password</p>

                  <input
                    type="password"
                    visible
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your password"
                    name="password"
                    onChange={handlechangePatient}
                    value={patient.password}
                  />
                </div>
                <hr />
                <div className=" input-div my-3 fs-5">
                  <p className="d-block">Enter your age</p>

                  <input
                    type="number"
                    className="p-1 b-0 rounded"
                    required
                    placeholder="Enter your age"
                    min={0}
                    name="age"
                    onChange={handlechangePatient}
                    value={patient.age}
                  />
                </div>
                <hr />
                <div className="input-div-gen my-3  align-items-center fs-5 ">
                  Select Your gender
                  <select
                    id="dropdown "
                    name="sex"
                    className="mx-2"
                    onChange={handlechangePatient}
                    value={patient.sex}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <hr />
                <div className="submit-button mt-5 d-flex justify-content-center">
                  <button className="btn btn-success">Register</button>
                </div>
                <div className="link-to-signup mt-2 text-center">
                  Already have an account?
                  <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
