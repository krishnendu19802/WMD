import React, { useContext, useEffect, useState } from "react";
import img from "../../assets/backgoround.jpg";
import Navbar from "../Navbar/NavBar";
import "./Patientpages.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorSearchForm from "./doctorSearchForm";
import DoctorCard from "./DoctorCard";
import { AuthContext } from '../../context/AuthProvider';
import NavBar from "../Navbar/NavBar";
import Modal from "./Modal";

const Patientpages = () => {

  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const [locations, setLocation] = useState([]);
  const [specialties, setSpecialities] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  // const [bookingDetails,setBookingDetails]=useState('')
  const navigate = useNavigate();



  //getting the locations available
  const fetchlocations = async () => {
    await axios.get(`http://localhost:3000/patient/get-locations`).then((result) => {
      console.log(result.data)
      setLocation(result.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const fetchSpecialities = async () => {
    await axios.get(`http://localhost:3000/patient/get-specialities`).then((result) => {
      setSpecialities(result.data)
    }).catch((error) => {
      console.log(error)
    })

  }
  useEffect(() => {
    fetchlocations();
    fetchSpecialities();
  }, [])

  useEffect(() => {
    if (isAuthenticated[0] === false)
      navigate('/login')
    else {
      setBookingDetails({ ...bookingDetails, patient_email: isAuthenticated[1].email })  //if user authenticated set patient_email for booking details
    }
  }, [isAuthenticated])

  //getting the dates available
  const currentDate = new Date();
  let minDate = new Date(currentDate);
  minDate.setDate(currentDate.getDate() + 1); // Adding 7 days to the current date
  let maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + 7);
  // Format the dates in yyyy-mm-dd format for the input field
  minDate = minDate.toISOString().split('T')[0];
  maxDate = maxDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    specialisation: specialties[0],
    location: locations[0],
    date: minDate,
  });

  useEffect(()=>{
    setFilteredDoctors([])
  },[formData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //for booking the slot
  const [bookingDetails, setBookingDetails] = useState({
    doctor_email: '',
    patient_email: '',  //it will be fetched from the context api
    date_of_appointment: minDate,
    slot_booked: 0
  });

  const handlechangeBookingDetails = (name,value) => {
    // console.log(obj)
    console.log(name,value)
    setBookingDetails((details) => {
      return { ...details, [name]: value }
    })
    // setBookingDetails((prevobj)=>{
    //   return {...prevobj,...obj}
    // })
    console.log(bookingDetails);
  }



  const bookDoctor = async () => {
    // console.log("Booking details before the api call ", bookingDetails);
    // const res = await axios.post(`http://localhost:3000/patient/book-doctor`, bookingDetails);
    console.log(bookingDetails)
    const btn=document.getElementById('openmodalpatientbooking')
    btn.click()
    // navigate("/");   //write here required destination

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData); // Logging form data to console for demonstration
    if (formData.location != 'hulu') {
      axios.post(`http://localhost:3000/patient/find-doctor`, formData).then((result) => {
        console.log(result.data)
        setFilteredDoctors(result.data)
      }).catch((error) => {
        crossOriginIsolated.log(error)
      })
    }
  };

  const doctorSubmit = (e) => {
    e.preventDefault();

    // Filter doctors based on the selected specialisation
    const selectedDoctors = filteredDoctors.filter((doctor) => doctor.selected);
    console.log("Selected Doctors:", selectedDoctors);

    // Clear form fields after logging data
    setFormData({
      specialisation: "",
      location: "",
      date: "",
    });

    // Reset selected state for doctors
    setFilteredDoctors(
      filteredDoctors.map((doctor) => ({ ...doctor, selected: false }))
    );
  };

  const handleDoctorSelection = (index) => {
    const updatedDoctors = filteredDoctors.map((doctor, i) => {
      if (i === index) {
        return { ...doctor, selected: !doctor.selected };
      }
      return doctor;
    });
    setFilteredDoctors(updatedDoctors);
  };

  return (
    <div>
      <NavBar />
       <Modal bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} refreshpage={handleSubmit}/>
       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id='openmodalpatientbooking' style={{ display: 'none' }}>

          Launch demo modal
        </button>
      <DoctorSearchForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} handlechangeBookingDetails={handlechangeBookingDetails} specialties={specialties} locations={locations} minDate={minDate} maxDate={maxDate}></DoctorSearchForm>



      <h2 style={{ color: "black",textAlign:'center', marginBottom: "20px", marginTop:'.5rem' }}>
        Available Doctors
      </h2>
      <ul style={{ margin: "0px", padding: "0px" }}>
        {filteredDoctors.map((doctor, index) => (
          <DoctorCard
            index={index}
            handlechangeBookingDetails={handlechangeBookingDetails}
            doctor={doctor}
            bookingDetails={bookingDetails}
            date={formData.date}
            loc={formData.location}

          />
        ))}
      </ul>
      <div style={{
        textAlign: "center",
        paddingBottom: "30px"
      }}>

        <button
          onClick={bookDoctor}
          style={{
            width: "50%",
            padding: "10px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "20px", // Added marginTop

          }}
        >
          {bookingDetails.doctor_email !== "" ? "Book Your Slot" : "Select Your Slot"}
        </button>
      </div>
    </div>
  );
};

export default Patientpages;
